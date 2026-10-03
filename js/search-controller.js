export const createSearchController = ({ onSearch, delay = 240, schedule = setTimeout, cancel = clearTimeout }) => {
  let timer;
  let composing = false;
  const clear = () => { cancel(timer); timer = undefined; };
  const queue = (input) => {
    clear();
    timer = schedule(() => {
      timer = undefined;
      if (composing || !input.isConnected) return;
      onSearch(input.value, input.selectionStart);
    }, delay);
  };
  return {
    input(event) {
      if (composing || event.isComposing) { clear(); return; }
      queue(event.target);
    },
    compositionStart() { composing = true; clear(); },
    compositionEnd(event) { composing = false; queue(event.target); },
    reset() { clear(); composing = false; },
  };
};
