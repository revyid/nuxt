import { defineComponent, ref, withAsyncContext, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from "vue/server-renderer";
import "/workspaces/nuxt/node_modules/.pnpm/hookable@5.5.3/node_modules/hookable/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "profile",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: session, signOut } = useAuth();
    const refreshing = ref(false);
    const { data: user, pending, refresh } = ([__temp, __restore] = withAsyncContext(() => $fetch("/api/user/profile")), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 py-12" }, _attrs))}><div class="max-w-md mx-auto bg-white rounded-lg shadow-md p-6"><div class="text-center"><h1 class="text-2xl font-bold text-gray-900 mb-6">Profil Pengguna</h1>`);
      if (unref(pending)) {
        _push(`<div class="text-gray-500"> Loading... </div>`);
      } else if (unref(user)) {
        _push(`<div class="space-y-4"><div class="flex justify-center"><img${ssrRenderAttr("src", unref(user).avatar_url || "/default-avatar.png")}${ssrRenderAttr("alt", unref(user).username)} class="w-20 h-20 rounded-full"></div><div><p class="text-sm text-gray-500">Username</p><p class="font-medium">${ssrInterpolate(unref(user).username)}</p></div><div><p class="text-sm text-gray-500">Email</p><p class="font-medium">${ssrInterpolate(unref(user).email)}</p></div><div><p class="text-sm text-gray-500">Provider</p><p class="font-medium capitalize">${ssrInterpolate(unref(user).provider)}</p></div><div class="flex space-x-4"><button${ssrIncludeBooleanAttr(unref(refreshing)) ? " disabled" : ""} class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50">${ssrInterpolate(unref(refreshing) ? "Refreshing..." : "Refresh Profile")}</button><button class="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"> Logout </button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/profile.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=profile-mO_hkWuy.js.map
