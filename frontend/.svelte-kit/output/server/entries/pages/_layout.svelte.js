import { w as head, x as attr } from "../../chunks/index.js";
const favicon = "/chemsynthcalc-web/_app/immutable/assets/favicon.B5XovYGk.svg";
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { children } = $$props;
    head($$renderer2, ($$renderer3) => {
      $$renderer3.push(`<link rel="icon"${attr("href", favicon)}/>`);
    });
    children?.($$renderer2);
    $$renderer2.push(`<!---->`);
  });
}
export {
  _layout as default
};
