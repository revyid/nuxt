import { _ as __nuxt_component_0 } from "./nuxt-link-BaM8_JM5.js";
import { defineComponent, computed, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { u as useRoute } from "../server.mjs";
import "/workspaces/nuxt/node_modules/.pnpm/ufo@1.6.1/node_modules/ufo/dist/index.mjs";
import "node:http";
import "node:https";
import "node:zlib";
import "node:stream";
import "node:buffer";
import "node:util";
import "node:url";
import "node:net";
import "node:fs";
import "node:path";
import "/workspaces/nuxt/node_modules/.pnpm/destr@2.0.5/node_modules/destr/dist/index.mjs";
import "#internal/nuxt/paths";
import "/workspaces/nuxt/node_modules/.pnpm/hookable@5.5.3/node_modules/hookable/dist/index.mjs";
import "/workspaces/nuxt/node_modules/.pnpm/unctx@2.4.1/node_modules/unctx/dist/index.mjs";
import "/workspaces/nuxt/node_modules/.pnpm/h3@1.15.3/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/workspaces/nuxt/node_modules/.pnpm/radix3@1.1.2/node_modules/radix3/dist/index.mjs";
import "/workspaces/nuxt/node_modules/.pnpm/defu@6.1.4/node_modules/defu/dist/defu.mjs";
import "pg";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "error",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const errorMessage = computed(() => {
      const error = route.query.error;
      if (error == null ? void 0 : error.includes("Email sudah terdaftar")) {
        return error;
      }
      return "Terjadi kesalahan saat proses autentikasi. Silakan coba lagi.";
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex items-center justify-center bg-gray-50" }, _attrs))}><div class="max-w-md w-full space-y-8"><div class="text-center"><h2 class="mt-6 text-3xl font-extrabold text-gray-900"> Terjadi Kesalahan </h2><div class="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">${ssrInterpolate(unref(errorMessage))}</div><div class="mt-6">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/auth/signin",
        class: "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Kembali ke Login `);
          } else {
            return [
              createTextVNode(" Kembali ke Login ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/error.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=error-DrCVbaEL.js.map
