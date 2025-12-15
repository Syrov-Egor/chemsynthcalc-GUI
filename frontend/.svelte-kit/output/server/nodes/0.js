import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.DgboYO8x.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/x_oHaOdR.js","_app/immutable/chunks/CkO2iYvd.js"];
export const stylesheets = ["_app/immutable/assets/0.DZFKBz3z.css"];
export const fonts = [];
