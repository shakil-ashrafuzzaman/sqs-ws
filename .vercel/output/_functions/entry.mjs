import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_DutahSxF.mjs';
import { manifest } from './manifest_BL7uKUmJ.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/about.astro.mjs');
const _page2 = () => import('./pages/admin.astro.mjs');
const _page3 = () => import('./pages/api/contact.astro.mjs');
const _page4 = () => import('./pages/blog/_slug_.astro.mjs');
const _page5 = () => import('./pages/blog.astro.mjs');
const _page6 = () => import('./pages/careers.astro.mjs');
const _page7 = () => import('./pages/contact.astro.mjs');
const _page8 = () => import('./pages/industries/_slug_.astro.mjs');
const _page9 = () => import('./pages/industries.astro.mjs');
const _page10 = () => import('./pages/privacy-policy.astro.mjs');
const _page11 = () => import('./pages/services/_slug_.astro.mjs');
const _page12 = () => import('./pages/services.astro.mjs');
const _page13 = () => import('./pages/terms-and-conditions.astro.mjs');
const _page14 = () => import('./pages/security-company-_localarea_.astro.mjs');
const _page15 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/about.astro", _page1],
    ["node_modules/@sanity/astro/dist/studio/studio-route-hash.astro", _page2],
    ["src/pages/api/contact.ts", _page3],
    ["src/pages/blog/[slug].astro", _page4],
    ["src/pages/blog/index.astro", _page5],
    ["src/pages/careers.astro", _page6],
    ["src/pages/contact.astro", _page7],
    ["src/pages/industries/[slug].astro", _page8],
    ["src/pages/industries/index.astro", _page9],
    ["src/pages/privacy-policy.astro", _page10],
    ["src/pages/services/[slug].astro", _page11],
    ["src/pages/services/index.astro", _page12],
    ["src/pages/terms-and-conditions.astro", _page13],
    ["src/pages/security-company-[localArea].astro", _page14],
    ["src/pages/index.astro", _page15]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "e055d28b-d5d6-4e20-b66c-d0272f5f558a",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
