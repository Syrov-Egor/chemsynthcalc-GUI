import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.xiB2RRUi.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/BtsWN2a7.js","_app/immutable/chunks/D3naMzxk.js","_app/immutable/chunks/zTYiz74T.js"];
export const stylesheets = ["_app/immutable/assets/0.DZFKBz3z.css"];
export const fonts = [];
