import test from "node:test";
import assert from "node:assert/strict";
import { createMotionController } from "../js/motion.js";

const makeClassList = () => {
  const classes = new Set();
  return {
    add: (...names) => names.forEach((name) => classes.add(name)),
    remove: (...names) => names.forEach((name) => classes.delete(name)),
    contains: (name) => classes.has(name),
  };
};

const harness = ({ reduced = false, failure = "", missingObserver = false, legacyMedia = false } = {}) => {
  let elements = [];
  const listeners = new Map();
  const mediaListeners = new Set();
  const instances = [];
  const app = {
    classList: makeClassList(),
    querySelectorAll: () => elements,
    addEventListener: (event, callback) => listeners.set(event, callback),
    removeEventListener: (event) => listeners.delete(event),
    contains: (element) => {
      for (let node = element; node; node = node.parentElement) if (node === app) return true;
      return false;
    },
  };
  const node = (parent = app) => ({ classList: makeClassList(), parentElement: parent });
  const media = { matches: reduced };
  if (legacyMedia) {
    media.addListener = (callback) => mediaListeners.add(callback);
    media.removeListener = (callback) => mediaListeners.delete(callback);
  } else {
    media.addEventListener = (_, callback) => mediaListeners.add(callback);
    media.removeEventListener = (_, callback) => mediaListeners.delete(callback);
  }
  class Observer {
    constructor(callback, options) {
      if (failure === "constructor") throw new Error("Unavailable");
      this.callback = callback;
      this.options = options;
      this.observed = new Set();
      this.disconnectCount = 0;
      instances.push(this);
    }
    observe(element) {
      if (failure === "observe") throw new Error("Observation failed");
      this.observed.add(element);
    }
    unobserve(element) {
      if (failure === "unobserve") throw new Error("Unobserve failed");
      this.observed.delete(element);
    }
    disconnect() { this.observed.clear(); this.disconnectCount += 1; }
  }
  const controller = createMotionController(app, {
    Observer: missingObserver ? null : Observer,
    matchMedia: () => media,
  });
  const setElements = (next) => { elements = next; };
  const emitPreference = (matches) => {
    media.matches = matches;
    mediaListeners.forEach((callback) => callback({ matches }));
  };
  return { app, controller, node, setElements, instances, listeners, mediaListeners, emitPreference };
};

const assertVisible = (elements) => elements.forEach((element) => {
  assert.equal(element.classList.contains("reveal-pending"), false);
  assert.equal(element.classList.contains("is-visible"), true);
});

test("motion starts visible and reveals each intersecting item once", () => {
  const h = harness();
  const first = h.node();
  const belowFold = h.node();
  h.setElements([first, belowFold]);
  assert.equal(first.classList.contains("reveal-pending"), false);
  h.controller.setup();
  const observer = h.instances[0];
  assert.equal(observer.options.threshold, 0.06);
  assert.equal(first.classList.contains("reveal-pending"), true);
  observer.callback([{ target: first, isIntersecting: false }]);
  assert.equal(first.classList.contains("reveal-pending"), true);
  observer.callback([{ target: first, isIntersecting: true }]);
  assertVisible([first]);
  assert.equal(observer.observed.has(first), false);
  assert.equal(belowFold.classList.contains("reveal-pending"), true);
});

test("navigation reuses one observer and disconnects stale elements", () => {
  const h = harness();
  const oldNode = h.node();
  h.setElements([oldNode]);
  h.controller.setup();
  const observer = h.instances[0];
  h.controller.reset();
  oldNode.parentElement = null;
  const next = h.node();
  h.setElements([next]);
  h.controller.setup();
  assert.equal(h.instances.length, 1);
  assert.ok(observer.disconnectCount >= 2);
  assertVisible([oldNode]);
  assert.deepEqual([...observer.observed], [next]);
  observer.callback([{ target: oldNode, isIntersecting: true }]);
  assert.equal(next.classList.contains("reveal-pending"), true);
});

test("non-animated filter/language renders show everything immediately", () => {
  const h = harness();
  const item = h.node();
  h.setElements([item]);
  h.controller.setup();
  h.controller.setup({ animate: false });
  assertVisible([item]);
  assert.equal(h.instances[0].observed.size, 0);
});

test("reduced motion does not instantiate an observer", () => {
  const h = harness({ reduced: true });
  const item = h.node();
  h.setElements([item]);
  h.controller.setup();
  assertVisible([item]);
  assert.equal(h.instances.length, 0);
  assert.equal(h.controller.isReducedMotion(), true);
});

test("changing motion preference reveals pending items and ends app fade", () => {
  for (const legacyMedia of [false, true]) {
    const h = harness({ legacyMedia });
    const item = h.node();
    h.setElements([item]);
    h.controller.setup();
    h.app.classList.add("is-switching");
    h.emitPreference(true);
    assertVisible([item]);
    assert.equal(h.app.classList.contains("is-switching"), false);
    assert.equal(h.instances[0].observed.size, 0);
    h.emitPreference(false);
    assertVisible([item]);
  }
});

test("keyboard focus reveals a pending element and its pending ancestors", () => {
  const h = harness();
  const parent = h.node();
  const child = h.node(parent);
  const link = h.node(child);
  h.setElements([parent, child]);
  h.controller.setup();
  h.listeners.get("focusin")({ target: link });
  assertVisible([parent, child]);
  assert.equal(h.instances[0].observed.size, 0);
});

test("missing or throwing observers never leave content hidden", () => {
  for (const options of [{ missingObserver: true }, { failure: "constructor" }, { failure: "observe" }, { failure: "unobserve" }]) {
    const h = harness(options);
    const elements = [h.node(), h.node()];
    h.setElements(elements);
    h.controller.setup();
    if (options.failure === "unobserve") h.instances[0].callback([{ target: elements[0], isIntersecting: true }]);
    assertVisible(elements);
  }
});

test("unavailable preference API falls back safely to visible content", () => {
  const h = harness();
  const item = h.node();
  h.setElements([item]);
  const controller = createMotionController(h.app, {
    Observer: class { constructor() { throw new Error("Should not instantiate"); } },
    matchMedia: () => { throw new Error("Unavailable"); },
  });
  controller.setup();
  assertVisible([item]);
  assert.equal(controller.isReducedMotion(), true);
  controller.destroy();
});

test("destroy cleans listeners, pending styles and observer without re-hiding", () => {
  const h = harness();
  const item = h.node();
  h.setElements([item]);
  h.controller.setup();
  h.controller.destroy();
  assertVisible([item]);
  assert.equal(h.listeners.size, 0);
  assert.equal(h.mediaListeners.size, 0);
  assert.equal(h.instances[0].observed.size, 0);
  h.controller.setup();
  assertVisible([item]);
});
