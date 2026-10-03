import { localize, t } from "../i18n.js";
import { containerClass, pageHeader } from "../components/common.js";
import { renderWorkBrowser } from "../components/work-browser.js";

export const renderProjects = (route = { filters: {} }) => `
  <section>
    ${pageHeader({
      title: t("projects.title"),
      description: localize({
        ja: "眼球運動の計測に関する研究と、これまでに制作・公開したWebアプリケーション。",
        en: "Research on eye-movement sensing, alongside web applications I have built and published.",
      }),
    })}
    <div class="${containerClass} works-page-content">
      ${renderWorkBrowser(route.filters, { headingLevel: 2 })}
    </div>
  </section>
`;
