import clsx$1, { clsx as clsx$2 } from "clsx";
import { s as setContext, j as getContext, k as escape_html } from "../../chunks/context.js";
import { tv } from "tailwind-variants";
import { y as attributes, z as clsx, F as attr_class, G as spread_props, J as element, w as head, K as bind_props, x as attr, N as ensure_array_like } from "../../chunks/index.js";
import { twMerge } from "tailwind-merge";
function html(value) {
  var html2 = String(value);
  var open = "<!---->";
  return open + html2 + "<!---->";
}
const closeButton = tv({
  base: "focus:outline-hidden whitespace-normal disabled:cursor-not-allowed disabled:opacity-50",
  variants: {
    // primary, secondary, gray, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose
    color: {
      primary: "text-primary-500 focus:ring-primary-400 hover:bg-primary-200 dark:hover:bg-primary-800 dark:hover:text-primary-300",
      secondary: "text-secondary-500 focus:ring-secondary-400 hover:bg-secondary-200 dark:hover:bg-secondary-800 dark:hover:text-secondary-300",
      gray: "text-gray-500 focus:ring-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-300",
      red: "text-red-500 focus:ring-red-400 hover:bg-red-200 dark:hover:bg-red-800 dark:hover:text-red-300",
      orange: "text-orange-500 focus:ring-orange-400 hover:bg-orange-200 dark:hover:bg-orange-800 dark:hover:text-orange-300",
      amber: "text-amber-500 focus:ring-amber-400 hover:bg-amber-200 dark:hover:bg-amber-800 dark:hover:text-amber-300",
      yellow: "text-yellow-500 focus:ring-yellow-400 hover:bg-yellow-200 dark:hover:bg-yellow-800 dark:hover:text-yellow-300",
      lime: "text-lime-500 focus:ring-lime-400 hover:bg-lime-200 dark:hover:bg-lime-800 dark:hover:text-lime-300",
      green: "text-green-500 focus:ring-green-400 hover:bg-green-200 dark:hover:bg-green-800 dark:hover:text-green-300",
      emerald: "text-emerald-500 focus:ring-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-800 dark:hover:text-emerald-300",
      teal: "text-teal-500 focus:ring-teal-400 hover:bg-teal-200 dark:hover:bg-teal-800 dark:hover:text-teal-300",
      cyan: "text-cyan-500 focus:ring-cyan-400 hover:bg-cyan-200 dark:hover:bg-cyan-800 dark:hover:text-cyan-300",
      sky: "text-sky-500 focus:ring-sky-400 hover:bg-sky-200 dark:hover:bg-sky-800 dark:hover:text-sky-300",
      blue: "text-blue-500 focus:ring-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800 dark:hover:text-blue-300",
      indigo: "text-indigo-500 focus:ring-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-800 dark:hover:text-indigo-300",
      violet: "text-violet-500 focus:ring-violet-400 hover:bg-violet-200 dark:hover:bg-violet-800 dark:hover:text-violet-300",
      purple: "text-purple-500 focus:ring-purple-400 hover:bg-purple-200 dark:hover:bg-purple-800 dark:hover:text-purple-300",
      fuchsia: "text-fuchsia-500 focus:ring-fuchsia-400 hover:bg-fuchsia-200 dark:hover:bg-fuchsia-800 dark:hover:text-fuchsia-300",
      pink: "text-pink-500 focus:ring-pink-400 hover:bg-pink-200 dark:hover:bg-pink-800 dark:hover:text-pink-300",
      rose: "text-rose-500 focus:ring-rose-400 hover:bg-rose-200 dark:hover:bg-rose-800 dark:hover:text-rose-300",
      none: ""
    },
    size: {
      xs: "m-0.5 rounded-xs focus:ring-1 p-0.5",
      sm: "m-0.5 rounded-sm focus:ring-1 p-0.5",
      md: "m-0.5 rounded-lg focus:ring-2 p-1.5",
      lg: "m-0.5 rounded-lg focus:ring-2 p-2.5"
    }
  },
  defaultVariants: {
    color: "gray",
    size: "md",
    href: null
  },
  slots: {
    svg: ""
  },
  compoundVariants: [
    {
      size: "xs",
      class: {
        svg: "w-3 h-3"
      }
    },
    {
      size: "sm",
      class: {
        svg: "w-3.5 h-3.5"
      }
    },
    {
      size: ["md", "lg"],
      class: {
        svg: "w-5 h-5"
      }
    },
    {
      size: ["xs", "sm", "md", "lg"],
      color: "none",
      class: "focus:ring-0 rounded-none m-0"
    }
  ]
});
const DISMISSABLE_KEY = Symbol("dismissable");
function createDismissableContext(onDismiss) {
  const context = {
    dismiss: onDismiss
  };
  return setContext(DISMISSABLE_KEY, context);
}
function useDismiss() {
  const context = getContext(DISMISSABLE_KEY);
  return context;
}
function CloseButton($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      children,
      color = "gray",
      onclick: onclickorg,
      name = "Close",
      ariaLabel,
      size = "md",
      class: className,
      svgClass,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const { base, svg } = closeButton({ color, size });
    useDismiss();
    if (restProps.href === void 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<button${attributes({
        type: "button",
        ...restProps,
        class: clsx(base({ class: clsx$1(className) })),
        "aria-label": ariaLabel ?? name
      })}>`);
      if (name) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span class="sr-only">${escape_html(name)}</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (children) {
        $$renderer2.push("<!--[-->");
        children($$renderer2);
        $$renderer2.push(`<!---->`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<svg${attr_class(clsx(svg({ class: svgClass })))} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>`);
      }
      $$renderer2.push(`<!--]--></button>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<a${attributes({
        ...restProps,
        class: clsx(base({ class: clsx$1(className) })),
        "aria-label": ariaLabel ?? name
      })}>`);
      if (name) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span class="sr-only">${escape_html(name)}</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (children) {
        $$renderer2.push("<!--[-->");
        children($$renderer2);
        $$renderer2.push(`<!---->`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<svg${attr_class(clsx(svg()))} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>`);
      }
      $$renderer2.push(`<!--]--></a>`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function cubic_out(t) {
  const f = t - 1;
  return f * f * f + 1;
}
function slide(node, { delay = 0, duration = 400, easing = cubic_out, axis = "y" } = {}) {
  const style = getComputedStyle(node);
  const opacity = +style.opacity;
  const primary_property = axis === "y" ? "height" : "width";
  const primary_property_value = parseFloat(style[primary_property]);
  const secondary_properties = axis === "y" ? ["top", "bottom"] : ["left", "right"];
  const capitalized_secondary_properties = secondary_properties.map(
    (e) => (
      /** @type {'Left' | 'Right' | 'Top' | 'Bottom'} */
      `${e[0].toUpperCase()}${e.slice(1)}`
    )
  );
  const padding_start_value = parseFloat(style[`padding${capitalized_secondary_properties[0]}`]);
  const padding_end_value = parseFloat(style[`padding${capitalized_secondary_properties[1]}`]);
  const margin_start_value = parseFloat(style[`margin${capitalized_secondary_properties[0]}`]);
  const margin_end_value = parseFloat(style[`margin${capitalized_secondary_properties[1]}`]);
  const border_width_start_value = parseFloat(
    style[`border${capitalized_secondary_properties[0]}Width`]
  );
  const border_width_end_value = parseFloat(
    style[`border${capitalized_secondary_properties[1]}Width`]
  );
  return {
    delay,
    duration,
    easing,
    css: (t) => `overflow: hidden;opacity: ${Math.min(t * 20, 1) * opacity};${primary_property}: ${t * primary_property_value}px;padding-${secondary_properties[0]}: ${t * padding_start_value}px;padding-${secondary_properties[1]}: ${t * padding_end_value}px;margin-${secondary_properties[0]}: ${t * margin_start_value}px;margin-${secondary_properties[1]}: ${t * margin_end_value}px;border-${secondary_properties[0]}-width: ${t * border_width_start_value}px;border-${secondary_properties[1]}-width: ${t * border_width_end_value}px;min-${primary_property}: 0`
  };
}
function getTheme(componentKey) {
  const theme = getContext("theme");
  return theme?.[componentKey];
}
tv({
  base: "w-full",
  variants: {
    color: {
      primary: "text-primary-500 dark:text-primary-400",
      secondary: "text-secondary-500 dark:text-secondary-400"
    },
    flush: {
      true: "",
      false: "border border-gray-200 dark:border-gray-700 rounded-t-xl"
    }
  }
});
tv({
  slots: {
    base: "group",
    button: "flex items-center justify-between w-full font-medium text-left group-first:rounded-t-xl border-gray-200 dark:border-gray-700 border-b",
    content: "border-b border-gray-200 dark:border-gray-700",
    active: "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800",
    inactive: "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
  },
  variants: {
    flush: {
      true: {
        button: "py-5",
        content: "py-5"
      },
      false: {
        button: "p-5 border-s border-e group-first:border-t",
        content: "p-5 border-s border-e"
      }
    },
    open: {
      true: {},
      false: {}
    }
  },
  compoundVariants: [
    {
      flush: true,
      open: true,
      class: {
        button: "text-gray-900 dark:text-white"
      }
    },
    {
      flush: true,
      open: false,
      class: {
        button: "text-gray-500 dark:text-gray-400"
      }
    }
  ],
  defaultVariants: {
    flush: false,
    open: false
  }
});
tv({
  base: "p-4 gap-3 text-sm",
  variants: {
    color: {
      // primary, secondary, gray, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose
      primary: "bg-primary-50 dark:bg-gray-800 text-primary-800 dark:text-primary-400",
      secondary: "bg-secondary-50 dark:bg-secondary-800 text-secondary-800 dark:text-secondary-400",
      gray: "bg-gray-100 text-gray-500 focus:ring-gray-400 dark:bg-gray-700 dark:text-gray-300",
      red: "bg-red-100 text-red-500 focus:ring-red-400 dark:bg-red-200 dark:text-red-600",
      orange: "bg-orange-100 text-orange-500 focus:ring-orange-400 dark:bg-orange-200 dark:text-orange-600",
      amber: "bg-amber-100 text-amber-500 focus:ring-amber-400 dark:bg-amber-200 dark:text-amber-600",
      yellow: "bg-yellow-100 text-yellow-500 focus:ring-yellow-400 dark:bg-yellow-200 dark:text-yellow-600",
      lime: "bg-lime-100 text-lime-500 focus:ring-lime-400 dark:bg-lime-200 dark:text-lime-600",
      green: "bg-green-100 text-green-500 focus:ring-green-400 dark:bg-green-200 dark:text-green-600",
      emerald: "bg-emerald-100 text-emerald-500 focus:ring-emerald-400 dark:bg-emerald-200 dark:text-emerald-600",
      teal: "bg-teal-100 text-teal-500 focus:ring-teal-400 dark:bg-teal-200 dark:text-teal-600",
      cyan: "bg-cyan-100 text-cyan-500 focus:ring-cyan-400 dark:bg-cyan-200 dark:text-cyan-600",
      sky: "bg-sky-100 text-sky-500 focus:ring-sky-400 dark:bg-sky-200 dark:text-sky-600",
      blue: "bg-blue-100 text-blue-500 focus:ring-blue-400 dark:bg-blue-200 dark:text-blue-600",
      indigo: "bg-indigo-100 text-indigo-500 focus:ring-indigo-400 dark:bg-indigo-200 dark:text-indigo-600",
      violet: "bg-violet-100 text-violet-500 focus:ring-violet-400 dark:bg-violet-200 dark:text-violet-600",
      purple: "bg-purple-100 text-purple-500 focus:ring-purple-400 dark:bg-purple-200 dark:text-purple-600",
      fuchsia: "bg-fuchsia-100 text-fuchsia-500 focus:ring-fuchsia-400 dark:bg-fuchsia-200 dark:text-fuchsia-600",
      pink: "bg-pink-100 text-pink-500 focus:ring-pink-400 dark:bg-pink-200 dark:text-pink-600",
      rose: "bg-rose-100 text-rose-500 focus:ring-rose-400 dark:bg-rose-200 dark:text-rose-600"
    },
    rounded: {
      true: "rounded-lg"
    },
    border: {
      true: "border"
    },
    icon: {
      true: "flex items-center"
    },
    dismissable: {
      true: "flex items-center"
    }
  },
  compoundVariants: [
    // primary, secondary, gray, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose
    {
      border: true,
      color: "primary",
      class: "border-primary-500 dark:border-primary-200 divide-primary-500 dark:divide-primary-200"
    },
    {
      border: true,
      color: "secondary",
      class: "border-secondary-500 dark:border-secondary-200 divide-secondary-500 dark:divide-secondary-200"
    },
    {
      border: true,
      color: "gray",
      class: "border-gray-300 dark:border-gray-800 divide-gray-300 dark:divide-gray-800"
    },
    {
      border: true,
      color: "red",
      class: "border-red-300 dark:border-red-800 divide-red-300 dark:divide-red-800"
    },
    {
      border: true,
      color: "orange",
      class: "border-orange-300 dark:border-orange-800 divide-orange-300 dark:divide-orange-800"
    },
    {
      border: true,
      color: "amber",
      class: "border-amber-300 dark:border-amber-800 divide-amber-300 dark:divide-amber-800"
    },
    {
      border: true,
      color: "yellow",
      class: "border-yellow-300 dark:border-yellow-800 divide-yellow-300 dark:divide-yellow-800"
    },
    {
      border: true,
      color: "lime",
      class: "border-lime-300 dark:border-lime-800 divide-lime-300 dark:divide-lime-800"
    },
    {
      border: true,
      color: "green",
      class: "border-green-300 dark:border-green-800 divide-green-300 dark:divide-green-800"
    },
    {
      border: true,
      color: "emerald",
      class: "border-emerald-300 dark:border-emerald-800 divide-emerald-300 dark:divide-emerald-800"
    },
    {
      border: true,
      color: "teal",
      class: "border-teal-300 dark:border-teal-800 divide-teal-300 dark:divide-teal-800"
    },
    {
      border: true,
      color: "cyan",
      class: "border-cyan-300 dark:border-cyan-800 divide-cyan-300 dark:divide-cyan-800"
    },
    {
      border: true,
      color: "sky",
      class: "border-sky-300 dark:border-sky-800 divide-sky-300 dark:divide-sky-800"
    },
    {
      border: true,
      color: "blue",
      class: "border-blue-300 dark:border-blue-800 divide-blue-300 dark:divide-blue-800"
    },
    {
      border: true,
      color: "indigo",
      class: "border-indigo-300 dark:border-indigo-800 divide-indigo-300 dark:divide-indigo-800"
    },
    //  violet, purple, fuchsia, pink, rose
    {
      border: true,
      color: "violet",
      class: "border-violet-300 dark:border-violet-800 divide-violet-300 dark:divide-violet-800"
    },
    {
      border: true,
      color: "purple",
      class: "border-purple-300 dark:border-purple-800 divide-purple-300 dark:divide-purple-800"
    },
    {
      border: true,
      color: "fuchsia",
      class: "border-fuchsia-300 dark:border-fuchsia-800 divide-fuchsia-300 dark:divide-fuchsia-800"
    },
    {
      border: true,
      color: "pink",
      class: "border-pink-300 dark:border-pink-800 divide-pink-300 dark:divide-pink-800"
    },
    {
      border: true,
      color: "rose",
      class: "border-rose-300 dark:border-rose-800 divide-rose-300 dark:divide-rose-800"
    }
  ],
  defaultVariants: {
    color: "primary",
    rounded: true
  }
});
tv({
  base: "relative flex items-center justify-center bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300",
  variants: {
    cornerStyle: {
      rounded: "rounded-sm",
      circular: "rounded-full"
    },
    border: {
      true: "p-1 ring-2 ring-gray-300 dark:ring-gray-500",
      false: ""
    },
    stacked: {
      true: "border-2 not-first:-ms-4 border-white dark:border-gray-800",
      false: ""
    },
    size: {
      xs: "w-6 h-6",
      sm: "w-8 h-8",
      md: "w-10 h-10",
      lg: "w-20 h-20",
      xl: "w-36 h-36"
    }
  },
  defaultVariants: {
    cornerStyle: "circular",
    border: false,
    stacked: false,
    size: "md"
  }
});
tv({
  base: "shrink-0",
  variants: {
    color: {
      // 'primary' secondary 'gray' | 'red' | 'orange' | 'amber' | 'yellow' | 'lime' | 'green' | 'emerald' | 'teal' | 'cyan' | 'sky' | 'blue' | 'indigo' | 'violet' | 'purple' | 'fuchsia' | 'pink' | 'rose'
      primary: "bg-primary-500",
      secondary: "bg-secondary-500",
      gray: "bg-gray-200",
      red: "bg-red-500",
      orange: "bg-orange-600",
      amber: "bg-amber-500",
      yellow: "bg-yellow-300",
      lime: "bg-lime-500",
      green: "bg-green-500",
      emerald: "bg-emerald-500",
      teal: "bg-teal-500",
      cyan: "bg-cyan-500",
      sky: "bg-sky-500",
      blue: "bg-blue-500",
      indigo: "bg-indigo-500",
      violet: "bg-violet-500",
      purple: "bg-purple-500",
      fuchsia: "bg-fuchsia-500",
      pink: "bg-pink-500",
      rose: "bg-rose-500"
    },
    size: {
      xs: "w-2 h-2",
      sm: "w-2.5 h-2.5",
      md: "w-3 h-3",
      lg: "w-3.5 h-3.5",
      xl: "w-6 h-6"
    },
    cornerStyle: {
      rounded: "rounded-sm",
      circular: "rounded-full"
    },
    border: {
      true: "border border-gray-300 dark:border-gray-300",
      false: {}
    },
    hasChildren: {
      true: "inline-flex items-center justify-center",
      false: {}
    },
    placement: {
      default: "",
      "top-left": "absolute top-0 start-0",
      "top-center": "absolute top-0 start-1/2 -translate-x-1/2 rtl:translate-x-1/2",
      "top-right": "absolute top-0 end-0",
      "center-left": "absolute top-1/2 -translate-y-1/2 start-0",
      center: "absolute top-1/2 -translate-y-1/2 start-1/2 -translate-x-1/2 rtl:translate-x-1/2",
      "center-right": "absolute top-1/2 -translate-y-1/2 end-0",
      "bottom-left": "absolute bottom-0 start-0",
      "bottom-center": "absolute bottom-0 start-1/2 -translate-x-1/2 rtl:translate-x-1/2",
      "bottom-right": "absolute bottom-0 end-0"
    },
    offset: {
      true: {},
      false: {}
    }
  },
  compoundVariants: [
    {
      placement: "top-left",
      offset: true,
      class: "-translate-x-1/3 rtl:translate-x-1/3 -translate-y-1/3"
    },
    {
      placement: "top-center",
      offset: true,
      class: "-translate-y-1/3"
    },
    {
      placement: "top-right",
      offset: true,
      class: "translate-x-1/3 rtl:-translate-x-1/3 -translate-y-1/3"
    },
    {
      placement: "center-left",
      offset: true,
      class: "-translate-x-1/3 rtl:translate-x-1/3"
    },
    {
      placement: "center-right",
      offset: true,
      class: "translate-x-1/3 rtl:-translate-x-1/3"
    },
    {
      placement: "bottom-left",
      offset: true,
      class: "-translate-x-1/3 rtl:translate-x-1/3 translate-y-1/3"
    },
    {
      placement: "bottom-center",
      offset: true,
      class: "translate-y-1/3"
    },
    {
      placement: "bottom-right",
      offset: true,
      class: "translate-x-1/3 rtl:-translate-x-1/3 translate-y-1/3"
    }
  ],
  defaultVariants: {
    color: "primary",
    size: "md",
    cornerStyle: "circular",
    border: false,
    offset: true,
    hasChildren: false
  }
});
tv({
  slots: {
    linkClass: "flex align-middle",
    base: "font-medium inline-flex items-center justify-center px-2.5 py-0.5"
  },
  variants: {
    color: {
      // primary, secondary, gray, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose
      primary: { base: "bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300" },
      secondary: { base: "bg-secondary-100 text-secondary-800 dark:bg-secondary-900 dark:text-secondary-300" },
      gray: { base: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300" },
      red: { base: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" },
      orange: { base: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300" },
      amber: { base: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300" },
      yellow: { base: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" },
      lime: { base: "bg-lime-100 text-lime-800 dark:bg-lime-900 dark:text-lime-300" },
      green: { base: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" },
      emerald: { base: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300" },
      teal: { base: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300" },
      cyan: { base: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300" },
      sky: { base: "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300" },
      blue: { base: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" },
      indigo: { base: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300" },
      violet: { base: "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-300" },
      fuchsia: { base: "bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900 dark:text-fuchsia-300" },
      purple: { base: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300" },
      pink: { base: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300" },
      rose: { base: "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300" }
    },
    size: {
      small: "text-xs",
      large: "text-sm"
    },
    border: {
      true: { base: "border" }
    },
    rounded: {
      true: { base: "rounded-full" },
      false: "rounded-sm"
    }
  },
  compoundVariants: [
    {
      border: true,
      color: "primary",
      class: "dark:bg-transparent dark:text-primary-400 border-primary-400 dark:border-primary-400"
    },
    {
      border: true,
      color: "secondary",
      class: "dark:bg-transparent dark:text-secondary-400 border-secondary-400 dark:border-secondary-400"
    },
    {
      border: true,
      color: "gray",
      class: "dark:bg-transparent dark:text-gray-400 border-gray-400 dark:border-gray-400"
    },
    {
      border: true,
      color: "red",
      class: "dark:bg-transparent dark:text-red-400 border-red-400 dark:border-red-400"
    },
    {
      border: true,
      color: "orange",
      class: "dark:bg-transparent dark:text-orange-400 border-orange-400 dark:border-orange-400"
    },
    {
      border: true,
      color: "amber",
      class: "dark:bg-transparent dark:text-amber-400 border-amber-400 dark:border-amber-400"
    },
    {
      border: true,
      color: "yellow",
      class: "dark:bg-transparent dark:text-yellow-300 border-yellow-300 dark:border-yellow-300"
    },
    {
      border: true,
      color: "lime",
      class: "dark:bg-transparent dark:text-lime-400 border-lime-400 dark:border-lime-400"
    },
    {
      border: true,
      color: "green",
      class: "dark:bg-transparent dark:text-green-400 border-green-400 dark:border-green-400"
    },
    {
      border: true,
      color: "emerald",
      class: "dark:bg-transparent dark:text-emerald-400 border-emerald-400 dark:border-emerald-400"
    },
    {
      border: true,
      color: "teal",
      class: "dark:bg-transparent dark:text-teal-400 border-teal-400 dark:border-teal-400"
    },
    {
      border: true,
      color: "cyan",
      class: "dark:bg-transparent dark:text-cyan-400 border-cyan-400 dark:border-cyan-400"
    },
    {
      border: true,
      color: "sky",
      class: "dark:bg-transparent dark:text-sky-400 border-sky-400 dark:border-sky-400"
    },
    {
      border: true,
      color: "blue",
      class: "dark:bg-transparent dark:text-blue-400 border-blue-400 dark:border-blue-400"
    },
    {
      border: true,
      color: "indigo",
      class: "dark:bg-transparent dark:text-indigo-400 border-indigo-400 dark:border-indigo-400"
    },
    {
      border: true,
      color: "violet",
      class: "dark:bg-transparent dark:text-violet-400 border-violet-400 dark:border-violet-400"
    },
    {
      border: true,
      color: "purple",
      class: "dark:bg-transparent dark:text-purple-400 border-purple-400 dark:border-purple-400"
    },
    {
      border: true,
      color: "fuchsia",
      class: "dark:bg-transparent dark:text-fuchsia-400 border-fuchsia-400 dark:border-fuchsia-400"
    },
    {
      border: true,
      color: "pink",
      class: "dark:bg-transparent dark:text-pink-400 border-pink-400 dark:border-pink-400"
    },
    {
      border: true,
      color: "rose",
      class: "dark:bg-transparent dark:text-rose-400 border-rose-400 dark:border-rose-400"
    },
    {
      href: true,
      color: "primary",
      class: "hover:bg-primary-200"
    },
    {
      href: true,
      color: "secondary",
      class: "hover:bg-secondary-200"
    },
    {
      href: true,
      color: "gray",
      class: "hover:bg-gray-200"
    },
    {
      href: true,
      color: "red",
      class: "hover:bg-red-200"
    },
    {
      href: true,
      color: "orange",
      class: "hover:bg-orange-200"
    },
    {
      href: true,
      color: "amber",
      class: "hover:bg-amber-200"
    },
    {
      href: true,
      color: "yellow",
      class: "hover:bg-yellow-200"
    },
    {
      href: true,
      color: "lime",
      class: "hover:bg-lime-200"
    },
    {
      href: true,
      color: "green",
      class: "hover:bg-green-200"
    },
    {
      href: true,
      color: "emerald",
      class: "hover:bg-emerald-200"
    },
    {
      href: true,
      color: "teal",
      class: "hover:bg-teal-200"
    },
    {
      href: true,
      color: "cyan",
      class: "hover:bg-cyan-200"
    },
    {
      href: true,
      color: "sky",
      class: "hover:bg-sky-200"
    },
    {
      href: true,
      color: "blue",
      class: "hover:bg-blue-200"
    },
    {
      href: true,
      color: "indigo",
      class: "hover:bg-indigo-200"
    },
    {
      href: true,
      color: "violet",
      class: "hover:bg-violet-200"
    },
    {
      href: true,
      color: "purple",
      class: "hover:bg-purple-200"
    },
    {
      href: true,
      color: "fuchsia",
      class: "hover:bg-fuchsia-200"
    },
    {
      href: true,
      color: "pink",
      class: "hover:bg-pink-200"
    },
    {
      href: true,
      color: "rose",
      class: "hover:bg-rose-200"
    }
  ],
  defaultVariants: {
    color: "primary",
    size: "small",
    rounded: false
  }
});
tv({
  slots: {
    base: "fixed z-50 flex justify-between p-4 mx-auto dark:bg-gray-700 dark:border-gray-600",
    insideDiv: "flex flex-col md:flex-row md:items-center gap-2 mx-auto",
    dismissable: "absolute end-2.5 top-2.5 md:static md:end-auto md:top-auto"
  },
  variants: {
    type: {
      top: {
        base: "top-0 start-0 w-full border-b border-gray-200 bg-gray-50"
      },
      bottom: {
        base: "bottom-0 start-0 w-full border-t border-gray-200 bg-gray-50"
      }
    },
    color: {
      // 'primary' secondary, | 'gray' | 'red' | 'orange' | 'amber' | 'yellow' | 'lime' | 'green' | 'emerald' | 'teal' | 'cyan' | 'sky' | 'blue' | 'indigo' | 'violet' | 'purple' | 'fuchsia' | 'pink' | 'rose'
      primary: { base: "bg-primary-50 dark:bg-primary-900" },
      secondary: { base: "bg-secondary-50 dark:bg-secondary-900" },
      gray: { base: "bg-gray-50 dark:bg-gray-700" },
      red: { base: "bg-red-50 dark:bg-red-900" },
      orange: { base: "bg-orange-50 dark:bg-orange-900" },
      amber: { base: "bg-amber-50 dark:bg-amber-900" },
      yellow: { base: "bg-yellow-50 dark:bg-yellow-900" },
      lime: { base: "bg-lime-50 dark:bg-lime-900" },
      green: { base: "bg-green-50 dark:bg-green-900" },
      emerald: { base: "bg-emerald-50 dark:bg-emerald-900" },
      teal: { base: "bg-teal-50 dark:bg-teal-900" },
      cyan: { base: "bg-cyan-50 dark:bg-cyan-900" },
      sky: { base: "bg-sky-50 dark:bg-sky-900" },
      blue: { base: "bg-blue-50 dark:bg-blue-900" },
      indigo: { base: "bg-indigo-50 dark:bg-indigo-900" },
      violet: { base: "bg-violet-50 dark:bg-violet-900" },
      purple: { base: "bg-purple-50 dark:bg-purple-900" },
      fuchsia: { base: "bg-fuchsia-50 dark:bg-fuchsia-900" },
      pink: { base: "bg-pink-50 dark:bg-pink-900" },
      rose: { base: "bg-rose-50 dark:bg-rose-900" }
    }
  },
  defaultVariants: {
    type: "top",
    multiline: true
  }
});
tv({
  slots: {
    base: "w-full z-30 border-gray-200 dark:bg-gray-700 dark:border-gray-600",
    inner: "grid h-full max-w-lg mx-auto"
  },
  variants: {
    position: {
      static: { base: "static" },
      fixed: { base: "fixed" },
      absolute: { base: "absolute" },
      relative: { base: "relative" },
      sticky: { base: "sticky" }
    },
    navType: {
      default: { base: "bottom-0 start-0 h-16 bg-white border-t" },
      border: { base: "bottom-0 start-0 h-16 bg-white border-t" },
      application: {
        base: "h-16 max-w-lg -translate-x-1/2 rtl:translate-x-1/2 bg-white border rounded-full bottom-4 start-1/2"
      },
      pagination: {
        base: "bottom-0 h-16 -translate-x-1/2 rtl:translate-x-1/2 bg-white border-t start-1/2"
      },
      group: {
        base: "bottom-0 -translate-x-1/2 rtl:translate-x-1/2 bg-white border-t start-1/2"
      },
      card: { base: "bottom-0 start-0 h-16 bg-white border-t" },
      meeting: {
        base: "bottom-0 start-0 grid h-16 grid-cols-1 px-8 bg-white border-t md:grid-cols-3",
        inner: "flex items-center justify-center mx-auto"
      },
      video: {
        base: "bottom-0 start-0 grid h-24 grid-cols-1 px-8 bg-white border-t md:grid-cols-3",
        inner: "flex items-center w-full"
      }
    }
  },
  defaultVariants: {
    position: "fixed",
    navType: "default"
  }
});
tv({
  slots: {
    base: "inline-flex flex-col items-center justify-center",
    span: "text-sm"
  },
  variants: {
    navType: {
      default: {
        base: "px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group",
        span: "text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500"
      },
      border: {
        base: "px-5 border-gray-200 border-x hover:bg-gray-50 dark:hover:bg-gray-800 group dark:border-gray-600",
        span: "text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500"
      },
      application: {
        base: "",
        span: "sr-only"
      },
      pagination: {
        base: "px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group",
        span: "sr-only"
      },
      group: {
        base: "p-4 hover:bg-gray-50 dark:hover:bg-gray-800 group",
        span: "sr-only"
      },
      card: {
        base: "px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group",
        span: "text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500"
      },
      meeting: {
        base: "",
        span: ""
      },
      video: {
        base: "",
        span: ""
      }
    },
    appBtnPosition: {
      left: {
        base: "px-5 rounded-s-full hover:bg-gray-50 dark:hover:bg-gray-800 group"
      },
      middle: { base: "px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group" },
      right: {
        base: "px-5 rounded-e-full hover:bg-gray-50 dark:hover:bg-gray-800 group"
      }
    }
  },
  defaultVariants: {
    navType: "default",
    appBtnPosition: "middle",
    active: false
  }
});
tv({
  slots: {
    base: "w-full",
    innerDiv: "grid max-w-xs grid-cols-3 gap-1 p-1 mx-auto my-2 bg-gray-100 rounded-lg dark:bg-gray-600"
  }
});
tv({
  base: "px-5 py-1.5 text-xs font-medium rounded-lg",
  variants: {
    active: {
      true: "text-white bg-gray-900 dark:bg-gray-300 dark:text-gray-900",
      false: "text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
    }
  }
});
tv({
  slots: {
    base: "flex",
    list: "inline-flex items-center space-x-1 rtl:space-x-reverse md:space-x-3 rtl:space-x-reverse"
  },
  variants: {
    solid: {
      true: {
        base: "px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
      },
      false: ""
    }
  },
  defaultVariants: {
    solid: false
  }
});
tv({
  slots: {
    base: "inline-flex items-center",
    separator: "h-6 w-6 text-gray-400 rtl:-scale-x-100"
  },
  variants: {
    home: {
      true: "",
      false: ""
    },
    hasHref: {
      true: "",
      false: ""
    }
  },
  compoundVariants: [
    {
      home: true,
      class: {
        base: "inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white",
        separator: "me-2 h-4 w-4"
      }
    },
    {
      home: false,
      hasHref: true,
      class: {
        base: "ms-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ms-2 dark:text-gray-400 dark:hover:text-white"
      }
    },
    {
      home: false,
      hasHref: false,
      class: {
        base: "ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400"
      }
    }
  ]
});
tv({
  base: "inline-flex rounded-lg shadow-xs",
  variants: {
    size: {
      sm: "",
      md: "",
      lg: ""
    }
  },
  defaultVariants: {
    size: "md"
  }
});
const button = tv({
  slots: {
    base: "text-center font-medium inline-flex items-center justify-center",
    outline: "bg-transparent border hover:text-white dark:bg-transparent dark:hover-text-white",
    shadow: "shadow-lg",
    spinner: "ms-2"
  },
  variants: {
    color: {
      // "primary" | "dark" | "alternative" | "light" | "secondary" | "gray" | "red" | "orange" | "amber" | "yellow" | "lime" | "green" | "emerald" | "teal" | "cyan" | "sky" | "blue" | "indigo" | "violet" | "purple" | "fuchsia" | "pink" | "rose"
      primary: {
        base: "text-white bg-primary-700 hover:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700 focus-within:ring-primary-300 dark:focus-within:ring-primary-800",
        outline: "text-primary-700 border-primary-700 hover:bg-primary-800 dark:border-primary-500 dark:text-primary-500 dark:hover:bg-primary-600",
        shadow: "shadow-primary-500/50 dark:shadow-primary-800/80"
      },
      dark: {
        base: "text-white bg-gray-800 hover:bg-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700 focus-within:ring-gray-300 dark:focus-within:ring-gray-700",
        outline: "text-gray-900 border-gray-800 hover:bg-gray-900 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-600",
        shadow: "shadow-gray-500/50 gray:shadow-gray-800/80"
      },
      alternative: {
        base: "text-gray-900 bg-transparent border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 hover:text-primary-700 focus-within:text-primary-700 dark:focus-within:text-white dark:hover:text-white dark:hover:bg-gray-700 focus-within:ring-gray-200 dark:focus-within:ring-gray-700",
        outline: "text-gray-700 border-gray-700 hover:bg-gray-800 dark:border-gray-400 dark:text-gray-400 dark:hover:bg-gray-500",
        shadow: "_shadow-gray-500/50 dark:shadow-gray-800/80"
      },
      light: {
        base: "text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 focus-within:ring-gray-200 dark:focus-within:ring-gray-700",
        outline: "text-gray-700 border-gray-700 hover:bg-gray-800 dark:border-gray-400 dark:text-gray-400 dark:hover:bg-gray-500",
        shadow: "shadow-gray-500/50 dark:shadow-gray-800/80"
      },
      secondary: {
        base: "text-white bg-secondary-700 hover:bg-secondary-800 dark:bg-secondary-600 dark:hover:bg-secondary-700 focus-within:ring-secondary-300 dark:focus-within:ring-secondary-800",
        outline: "text-secondary-700 border-secondary-700 hover:bg-secondary-800 dark:border-secondary-400 dark:text-secondary-400 dark:hover:bg-secondary-500",
        shadow: "shadow-secondary-500/50 dark:shadow-secondary-800/80"
      },
      gray: {
        base: "text-white bg-gray-700 hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-700 focus-within:ring-gray-300 dark:focus-within:ring-gray-800",
        outline: "text-gray-700 border-gray-700 hover:bg-gray-800 dark:border-gray-400 dark:text-gray-400 dark:hover:bg-gray-500",
        shadow: "shadow-gray-500/50 dark:shadow-gray-800/80"
      },
      red: {
        base: "text-white bg-red-700 hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700 focus-within:ring-red-300 dark:focus-within:ring-red-900",
        outline: "text-red-700 border-red-700 hover:bg-red-800 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600",
        shadow: "shadow-red-500/50 dark:shadow-red-800/80"
      },
      orange: {
        base: "text-white bg-orange-700 hover:bg-orange-800 dark:bg-orange-600 dark:hover:bg-orange-700 focus-within:ring-orange-300 dark:focus-within:ring-orange-900",
        outline: "text-orange-700 border-orange-700 hover:bg-orange-800 dark:border-orange-400 dark:text-orange-400 dark:hover:bg-orange-500",
        shadow: "shadow-orange-500/50 dark:shadow-orange-800/80"
      },
      amber: {
        base: "text-white bg-amber-700 hover:bg-amber-800 dark:bg-amber-600 dark:hover:bg-amber-700 focus-within:ring-amber-300 dark:focus-within:ring-amber-900",
        outline: "text-amber-700 border-amber-700 hover:bg-amber-800 dark:border-amber-400 dark:text-amber-400 dark:hover:bg-amber-500",
        shadow: "shadow-amber-500/50 dark:shadow-amber-800/80"
      },
      yellow: {
        base: "text-white bg-yellow-400 hover:bg-yellow-500 focus-within:ring-yellow-300 dark:focus-within:ring-yellow-900",
        outline: "text-yellow-400 border-yellow-400 hover:bg-yellow-500 dark:border-yellow-300 dark:text-yellow-300 dark:hover:bg-yellow-400",
        shadow: "shadow-yellow-500/50 dark:shadow-yellow-800/80"
      },
      lime: {
        base: "text-white bg-lime-700 hover:bg-lime-800 dark:bg-lime-600 dark:hover:bg-lime-700 focus-within:ring-lime-300 dark:focus-within:ring-lime-800",
        outline: "text-lime-700 border-lime-700 hover:bg-lime-800 dark:border-lime-400 dark:text-lime-400 dark:hover:bg-lime-500",
        shadow: "shadow-lime-500/50 dark:shadow-lime-800/80"
      },
      green: {
        base: "text-white bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 focus-within:ring-green-300 dark:focus-within:ring-green-800",
        outline: "text-green-700 border-green-700 hover:bg-green-800 dark:border-green-500 dark:text-green-500 dark:hover:bg-green-600",
        shadow: "shadow-green-500/50 dark:shadow-green-800/80"
      },
      emerald: {
        base: "text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 focus-within:ring-emerald-300 dark:focus-within:ring-emerald-800",
        outline: "text-emerald-700 border-emerald-700 hover:bg-emerald-800 dark:border-emerald-400 dark:text-emerald-400 dark:hover:bg-emerald-500",
        shadow: "shadow-emerald-500/50 dark:shadow-emerald-800/80"
      },
      teal: {
        base: "text-white bg-teal-700 hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-700 focus-within:ring-teal-300 dark:focus-within:ring-teal-800",
        outline: "text-teal-700 border-teal-700 hover:bg-teal-800 dark:border-teal-400 dark:text-teal-400 dark:hover:bg-teal-500",
        shadow: "shadow-teal-500/50 dark:shadow-teal-800/80"
      },
      cyan: {
        base: "text-white bg-cyan-700 hover:bg-cyan-800 dark:bg-cyan-600 dark:hover:bg-cyan-700 focus-within:ring-cyan-300 dark:focus-within:ring-cyan-800",
        outline: "text-cyan-700 border-cyan-700 hover:bg-cyan-800 dark:border-cyan-400 dark:text-cyan-400 dark:hover:bg-cyan-500",
        shadow: "shadow-cyan-500/50 dark:shadow-cyan-800/80"
      },
      sky: {
        base: "text-white bg-sky-700 hover:bg-sky-800 dark:bg-sky-600 dark:hover:bg-sky-700 focus-within:ring-sky-300 dark:focus-within:ring-sky-800",
        outline: "text-sky-700 border-sky-700 hover:bg-sky-800 dark:border-sky-400 dark:text-sky-400 dark:hover:bg-sky-500",
        shadow: "shadow-sky-500/50 dark:shadow-sky-800/80"
      },
      blue: {
        base: "text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus-within:ring-blue-300 dark:focus-within:ring-blue-800",
        outline: "text-blue-700 border-blue-700 hover:bg-blue-800 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-500",
        shadow: "shadow-blue-500/50 dark:shadow-blue-800/80"
      },
      indigo: {
        base: "text-white bg-indigo-700 hover:bg-indigo-800 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus-within:ring-indigo-300 dark:focus-within:ring-indigo-800",
        outline: "text-indigo-700 border-indigo-700 hover:bg-indigo-800 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-indigo-500",
        shadow: "shadow-indigo-500/50 dark:shadow-indigo-800/80"
      },
      violet: {
        base: "text-white bg-violet-700 hover:bg-violet-800 dark:bg-violet-600 dark:hover:bg-violet-700 focus-within:ring-violet-300 dark:focus-within:ring-violet-800",
        outline: "text-violet-700 border-violet-700 hover:bg-violet-800 dark:border-violet-400 dark:text-violet-400 dark:hover:bg-violet-500",
        shadow: "shadow-violet-500/50 dark:shadow-violet-800/80"
      },
      purple: {
        base: "text-white bg-purple-700 hover:bg-purple-800 dark:bg-purple-600 dark:hover:bg-purple-700",
        outline: "text-purple-700 border-purple-700 hover:bg-purple-800 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-500",
        shadow: "shadow-purple-500/50 dark:shadow-purple-800/80"
      },
      fuchsia: {
        base: "text-white bg-fuchsia-700 hover:bg-fuchsia-800 dark:bg-fuchsia-600 dark:hover:bg-fuchsia-700",
        outline: "text-fuchsia-700 border-fuchsia-700 hover:bg-fuchsia-800 dark:border-fuchsia-400 dark:text-fuchsia-400 dark:hover:bg-fuchsia-500",
        shadow: "shadow-fuchsia-500/50 dark:shadow-fuchsia-800/80"
      },
      pink: {
        base: "text-white bg-pink-700 hover:bg-pink-800 dark:bg-pink-600 dark:hover:bg-pink-700",
        outline: "text-pink-700 border-pink-700 hover:bg-pink-800 dark:border-pink-400 dark:text-pink-400 dark:hover:bg-pink-500",
        shadow: "shadow-pink-500/50 dark:shadow-pink-800/80"
      },
      rose: {
        base: "text-white bg-rose-700 hover:bg-rose-800 dark:bg-rose-600 dark:hover:bg-rose-700",
        outline: "text-rose-700 border-rose-700 hover:bg-rose-800 dark:border-rose-400 dark:text-rose-400 dark:hover:bg-rose-500",
        shadow: "shadow-rose-500/50 dark:shadow-rose-800/80"
      }
    },
    size: {
      xs: "px-3 py-2 text-xs",
      sm: "px-4 py-2 text-sm",
      md: "px-5 py-2.5 text-sm",
      lg: "px-5 py-3 text-base",
      xl: "px-6 py-3.5 text-base"
    },
    group: {
      true: "focus-within:ring-2 focus-within:z-10 [&:not(:first-child)]:rounded-s-none [&:not(:last-child)]:rounded-e-none [&:not(:last-child)]:border-e-0",
      false: "focus-within:ring-4 focus-within:outline-hidden"
    },
    disabled: {
      true: "cursor-not-allowed opacity-50",
      false: ""
    },
    pill: {
      true: "rounded-full",
      false: "rounded-lg"
    },
    checked: {
      true: "",
      false: ""
    }
  },
  compoundVariants: [],
  defaultVariants: {
    pill: false
  }
});
tv({
  slots: {
    base: "inline-flex items-center justify-center transition-all duration-75 ease-in text-white bg-linear-to-r ",
    outlineWrapper: "inline-flex items-center justify-center w-full border-0!"
  },
  variants: {
    color: {
      blue: { base: "from-blue-500 via-blue-600 to-blue-700 hover:bg-linear-to-br focus:ring-blue-300 dark:focus:ring-blue-800" },
      green: { base: "from-green-400 via-green-500 to-green-600 hover:bg-linear-to-br focus:ring-green-300 dark:focus:ring-green-800" },
      cyan: { base: "text-white bg-linear-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-linear-to-br focus:ring-cyan-300 dark:focus:ring-cyan-800" },
      teal: { base: "text-white bg-linear-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-linear-to-br focus:ring-teal-300 dark:focus:ring-teal-800" },
      lime: { base: "text-gray-900 bg-linear-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-linear-to-br focus:ring-lime-300 dark:focus:ring-lime-800" },
      red: { base: "text-white bg-linear-to-r from-red-400 via-red-500 to-red-600 hover:bg-linear-to-br focus:ring-red-300 dark:focus:ring-red-800" },
      pink: { base: "text-white bg-linear-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-linear-to-br focus:ring-pink-300 dark:focus:ring-pink-800" },
      purple: { base: "text-white bg-linear-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-linear-to-br focus:ring-purple-300 dark:focus:ring-purple-800" },
      purpleToBlue: { base: "text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-blue-300 dark:focus:ring-blue-800" },
      cyanToBlue: { base: "text-white bg-linear-to-r from-cyan-500 to-blue-500 hover:bg-linear-to-bl focus:ring-cyan-300 dark:focus:ring-cyan-800" },
      greenToBlue: { base: "text-white bg-linear-to-br from-green-400 to-blue-600 hover:bg-linear-to-bl focus:ring-green-200 dark:focus:ring-green-800" },
      purpleToPink: { base: "text-white bg-linear-to-r from-purple-500 to-pink-500 hover:bg-linear-to-l focus:ring-purple-200 dark:focus:ring-purple-800" },
      pinkToOrange: { base: "text-white bg-linear-to-br from-pink-500 to-orange-400 hover:bg-linear-to-bl focus:ring-pink-200 dark:focus:ring-pink-800" },
      tealToLime: { base: "text-gray-900 bg-linear-to-r from-teal-200 to-lime-200 hover:bg-linear-to-l focus:ring-lime-200 dark:focus:ring-teal-700" },
      redToYellow: { base: "text-gray-900 bg-linear-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-linear-to-bl focus:ring-red-100 dark:focus:ring-red-400" }
    },
    outline: {
      true: {
        base: "p-0.5",
        outlineWrapper: "bg-white text-gray-900! dark:bg-gray-900 dark:text-white! hover:bg-transparent hover:text-inherit! group-hover:opacity-0! group-hover:text-inherit!"
      }
    },
    pill: {
      true: {
        base: "rounded-full",
        outlineWrapper: "rounded-full"
      },
      false: {
        base: "rounded-lg",
        outlineWrapper: "rounded-lg"
      }
    },
    size: {
      xs: "px-3 py-2 text-xs",
      sm: "px-4 py-2 text-sm",
      md: "px-5 py-2.5 text-sm",
      lg: "px-5 py-3 text-base",
      xl: "px-6 py-3.5 text-base"
    },
    shadow: {
      true: {
        base: "shadow-lg"
      }
    },
    group: {
      true: "rounded-none",
      false: ""
    },
    disabled: {
      true: { base: "opacity-50 cursor-not-allowed" }
    }
  },
  compoundVariants: [
    {
      shadow: true,
      color: "blue",
      class: { base: "shadow-blue-500/50 dark:shadow-blue-800/80" }
    },
    {
      shadow: true,
      color: "green",
      class: { base: "shadow-green-500/50 dark:shadow-green-800/80" }
    },
    {
      shadow: true,
      color: "cyan",
      class: { base: "shadow-cyan-500/50 dark:shadow-cyan-800/80" }
    },
    {
      shadow: true,
      color: "teal",
      class: { base: "shadow-teal-500/50 dark:shadow-teal-800/80" }
    },
    {
      shadow: true,
      color: "lime",
      class: { base: "shadow-lime-500/50 dark:shadow-lime-800/80" }
    },
    {
      shadow: true,
      color: "red",
      class: { base: "shadow-red-500/50 dark:shadow-red-800/80" }
    },
    {
      shadow: true,
      color: "pink",
      class: { base: "shadow-pink-500/50 dark:shadow-pink-800/80" }
    },
    {
      shadow: true,
      color: "purple",
      class: { base: "shadow-purple-500/50 dark:shadow-purple-800/80" }
    },
    {
      shadow: true,
      color: "purpleToBlue",
      class: { base: "shadow-blue-500/50 dark:shadow-blue-800/80" }
    },
    {
      shadow: true,
      color: "cyanToBlue",
      class: { base: "shadow-cyan-500/50 dark:shadow-cyan-800/80" }
    },
    {
      shadow: true,
      color: "greenToBlue",
      class: { base: "shadow-green-500/50 dark:shadow-green-800/80" }
    },
    {
      shadow: true,
      color: "purpleToPink",
      class: { base: "shadow-purple-500/50 dark:shadow-purple-800/80" }
    },
    {
      shadow: true,
      color: "pinkToOrange",
      class: { base: "shadow-pink-500/50 dark:shadow-pink-800/80" }
    },
    {
      shadow: true,
      color: "tealToLime",
      class: { base: "shadow-lime-500/50 dark:shadow-teal-800/80" }
    },
    {
      shadow: true,
      color: "redToYellow",
      class: { base: "shadow-red-500/50 dark:shadow-red-800/80" }
    },
    {
      group: true,
      pill: true,
      class: "first:rounded-s-full last:rounded-e-full"
    },
    {
      group: true,
      pill: false,
      class: "first:rounded-s-lg last:rounded-e-lg"
    }
  ]
});
function Button($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const group = getContext("group");
    const ctxDisabled = getContext("disabled");
    let {
      children,
      pill,
      outline = false,
      size = "md",
      color,
      shadow = false,
      tag = "button",
      disabled,
      loading = false,
      spinnerProps = { size: "4" },
      class: className,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const theme = getTheme("button");
    let actualSize = group ? "sm" : size;
    let actualColor = color ?? (group ? outline ? "dark" : "alternative" : "primary");
    let isDisabled = Boolean(ctxDisabled) || Boolean(disabled) || loading;
    const { base, outline: outline_, shadow: shadow_, spinner: spinner2 } = button({
      color: actualColor,
      size: actualSize,
      disabled: isDisabled,
      pill,
      group: !!group
    });
    let btnCls = base({
      class: clsx$1(outline && outline_(), shadow && shadow_(), theme?.base, className)
    });
    if (restProps.href !== void 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<a${attributes({ ...restProps, class: clsx(btnCls) })}>`);
      children?.($$renderer2);
      $$renderer2.push(`<!----></a>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (tag === "button") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<button${attributes({
          type: "button",
          ...restProps,
          class: clsx(btnCls),
          disabled: isDisabled
        })}>`);
        children?.($$renderer2);
        $$renderer2.push(`<!----> `);
        if (loading) {
          $$renderer2.push("<!--[-->");
          Spinner($$renderer2, spread_props([spinnerProps, { class: spinner2() }]));
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></button>`);
      } else {
        $$renderer2.push("<!--[!-->");
        element(
          $$renderer2,
          tag,
          () => {
            $$renderer2.push(`${attributes({ ...restProps, class: clsx(btnCls) })}`);
          },
          () => {
            children?.($$renderer2);
            $$renderer2.push(`<!---->`);
          }
        );
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
tv({
  slots: {
    base: "w-full flex max-w-sm bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700",
    image: "rounded-t-lg"
  },
  variants: {
    size: {
      xs: { base: "max-w-xs" },
      sm: { base: "max-w-sm" },
      md: { base: "max-w-lg" },
      lg: { base: "max-w-2xl" },
      xl: { base: "max-w-none" }
    },
    color: {
      // primary, secondary, gray, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose
      gray: { base: "border-gray-200 dark:bg-gray-800 dark:border-gray-700" },
      primary: { base: "border-primary-200 bg-primary-400 dark:bg-primary-800 dark:border-primary-700" },
      secondary: { base: "border-secondary-200 bg-secondary-400 dark:bg-secondary-800 dark:border-secondary-700" },
      red: { base: "border-red-200 bg-red-400 dark:bg-red-800 dark:border-red-700" },
      orange: { base: "border-orange-200 bg-orange-400 dark:bg-orange-800 dark:border-orange-700" },
      amber: { base: "border-amber-200 bg-amber-400 dark:bg-amber-800 dark:border-amber-700" },
      yellow: { base: "border-yellow-200 bg-yellow-400 dark:bg-yellow-800 dark:border-yellow-700" },
      lime: { base: "border-lime-200 bg-lime-400 dark:bg-lime-800 dark:border-lime-700" },
      green: { base: "border-green-200 bg-green-400 dark:bg-green-800 dark:border-green-700" },
      emerald: { base: "border-emerald-200 bg-emerald-400 dark:bg-emerald-800 dark:border-emerald-700" },
      teal: { base: "border-teal-200 bg-teal-400 dark:bg-teal-800 dark:border-teal-700" },
      cyan: { base: "border-cyan-200 bg-cyan-400 dark:bg-cyan-800 dark:border-cyan-700" },
      sky: { base: "border-sky-200 bg-sky-400 dark:bg-sky-800 dark:border-sky-700" },
      blue: { base: "border-blue-200 bg-blue-400 dark:bg-blue-800 dark:border-blue-700" },
      indigo: { base: "border-indigo-200 bg-indigo-400 dark:bg-indigo-800 dark:border-indigo-700" },
      violet: { base: "border-violet-200 bg-violet-400 dark:bg-violet-800 dark:border-violet-700" },
      purple: { base: "border-purple-200 bg-purple-400 dark:bg-purple-800 dark:border-purple-700" },
      fuchsia: { base: "border-fuchsia-200 bg-fuchsia-400 dark:bg-fuchsia-800 dark:border-fuchsia-700" },
      pink: { base: "border-pink-200 bg-pink-400 dark:bg-pink-800 dark:border-pink-700" },
      rose: { base: "border-rose-200 bg-rose-400 dark:bg-rose-800 dark:border-rose-700" }
    },
    shadow: {
      xs: { base: "shadow-xs" },
      sm: { base: "shadow-sm" },
      normal: { base: "shadow" },
      md: { base: "shadow-md" },
      lg: { base: "shadow-lg" },
      xl: { base: "shadow-xl" },
      "2xl": { base: "shadow-2xl" },
      inner: { base: "shadow-inner" }
    },
    horizontal: {
      true: {
        base: "md:flex-row",
        image: "object-cover w-full h-96 md:h-auto md:w-48 md:rounded-none"
      }
    },
    reverse: {
      true: { base: "flex-col-reverse", image: "rounded-b-lg rounded-tl-none" },
      false: { base: "flex-col", image: "rounded-t-lg" }
    },
    href: {
      true: "",
      false: ""
    },
    hasImage: {
      true: "",
      false: ""
    }
  },
  compoundVariants: [
    {
      horizontal: true,
      reverse: true,
      class: { base: "md:flex-row-reverse", image: "md:rounded-e-lg" }
    },
    {
      horizontal: true,
      reverse: false,
      class: { base: "md:flex-row", image: "md:rounded-s-lg" }
    },
    // gray, primary, secondary, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose
    {
      href: true,
      color: "gray",
      class: { base: "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700" }
    },
    {
      href: true,
      color: "primary",
      class: { base: "cursor-pointer hover:bg-primary-500 dark:hover:bg-primary-700" }
    },
    {
      href: true,
      color: "secondary",
      class: { base: "cursor-pointer hover:bg-secondary-500 dark:hover:bg-secondary-700" }
    },
    {
      href: true,
      color: "red",
      class: { base: "cursor-pointer hover:bg-red-500 dark:hover:bg-red-700" }
    },
    {
      href: true,
      color: "orange",
      class: { base: "cursor-pointer hover:bg-orange-500 dark:hover:bg-orange-700" }
    },
    {
      href: true,
      color: "amber",
      class: { base: "cursor-pointer hover:bg-amber-500 dark:hover:bg-amber-700" }
    },
    {
      href: true,
      color: "yellow",
      class: { base: "cursor-pointer hover:bg-yellow-500 dark:hover:bg-yellow-700" }
    },
    {
      href: true,
      color: "lime",
      class: { base: "cursor-pointer hover:bg-lime-500 dark:hover:bg-lime-700" }
    },
    {
      href: true,
      color: "green",
      class: { base: "cursor-pointer hover:bg-green-500 dark:hover:bg-green-700" }
    },
    {
      href: true,
      color: "emerald",
      class: { base: "cursor-pointer hover:bg-emerald-500 dark:hover:bg-emerald-700" }
    },
    {
      href: true,
      color: "teal",
      class: { base: "cursor-pointer hover:bg-teal-500 dark:hover:bg-teal-700" }
    },
    {
      href: true,
      color: "cyan",
      class: { base: "cursor-pointer hover:bg-cyan-500 dark:hover:bg-cyan-700" }
    },
    {
      href: true,
      color: "sky",
      class: { base: "cursor-pointer hover:bg-sky-500 dark:hover:bg-sky-700" }
    },
    {
      href: true,
      color: "blue",
      class: { base: "cursor-pointer hover:bg-blue-500 dark:hover:bg-blue-700" }
    },
    {
      href: true,
      color: "indigo",
      class: { base: "cursor-pointer hover:bg-indigo-500 dark:hover:bg-indigo-700" }
    },
    {
      href: true,
      color: "violet",
      class: { base: "cursor-pointer hover:bg-violet-500 dark:hover:bg-violet-700" }
    },
    {
      href: true,
      color: "purple",
      class: { base: "cursor-pointer hover:bg-purple-500 dark:hover:bg-purple-700" }
    },
    {
      href: true,
      color: "fuchsia",
      class: { base: "cursor-pointer hover:bg-fuchsia-500 dark:hover:bg-fuchsia-700" }
    },
    {
      href: true,
      color: "pink",
      class: { base: "cursor-pointer hover:bg-pink-500 dark:hover:bg-pink-700" }
    },
    {
      href: true,
      color: "rose",
      class: { base: "cursor-pointer hover:bg-rose-500 dark:hover:bg-rose-700" }
    }
  ],
  defaultVariants: {
    size: "sm",
    shadow: "normal",
    horizontal: false,
    reverse: false
  }
});
tv({
  slots: {
    base: "grid overflow-hidden relative rounded-lg h-56 sm:h-64 xl:h-80 2xl:h-96",
    slide: ""
  },
  variants: {},
  compoundVariants: [],
  defaultVariants: {}
});
tv({
  slots: {
    base: "absolute start-1/2 z-30 flex -translate-x-1/2 space-x-3 rtl:translate-x-1/2 rtl:space-x-reverse",
    indicator: "bg-gray-100 hover:bg-gray-300"
  },
  variants: {
    selected: {
      true: { indicator: "opacity-100" },
      false: { indicator: "opacity-60" }
    },
    position: {
      top: { base: "top-5" },
      bottom: { base: "bottom-5" }
    }
  }
});
tv({
  slots: {
    base: "flex absolute top-0 z-30 justify-center items-center px-4 h-full group focus:outline-hidden text-white dark:text-gray-300",
    span: "inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-hidden sm:h-10 sm:w-10 dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70"
  },
  variants: {
    forward: {
      true: "end-0",
      false: "start-0"
    }
  }
});
tv({
  base: "flex flex-row justify-center bg-gray-100 w-full"
});
tv({
  base: "",
  variants: {
    selected: {
      true: "opacity-100",
      false: "opacity-60"
    }
  },
  defaultVariants: {
    selected: false
  }
});
tv({
  base: "absolute block w-full h-full",
  variants: {
    fit: {
      contain: "object-contain",
      cover: "object-cover",
      fill: "object-fill",
      none: "object-none",
      "scale-down": "object-scale-down"
    }
  },
  defaultVariants: {
    fit: "cover"
  }
});
tv({
  base: "gap-2",
  variants: {
    embedded: {
      true: "px-1 py-1 focus-within:ring-0 bg-transparent hover:bg-transparent text-inherit",
      false: ""
    }
  },
  defaultVariants: {
    embedded: false
  }
});
const darkmode = tv({
  base: "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-hidden rounded-lg text-sm p-2.5"
});
function DarkMode($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      class: className,
      lightIcon,
      darkIcon,
      size = "md",
      ariaLabel = "Dark mode",
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const theme = getTheme("darkmode");
    const sizes = { sm: "w-4 h-4", md: "w-5 h-5", lg: "w-6 h-6" };
    head($$renderer2, ($$renderer3) => {
      $$renderer3.push(`<script lang="ts">
    if ("THEME_PREFERENCE_KEY" in localStorage) {
      localStorage.getItem("THEME_PREFERENCE_KEY") === "dark" ? window.document.documentElement.classList.add("dark") : window.document.documentElement.classList.remove("dark");
    } else {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) window.document.documentElement.classList.add("dark");
    }
  <\/script><!---->`);
    });
    $$renderer2.push(`<button${attributes({
      "aria-label": ariaLabel,
      type: "button",
      ...restProps,
      class: clsx(darkmode({ class: clsx$1(theme, className) })),
      tabindex: 0
    })}><span class="hidden dark:block">`);
    if (lightIcon) {
      $$renderer2.push("<!--[-->");
      lightIcon($$renderer2);
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<svg role="img" aria-label="Light mode"${attr_class(clsx(sizes[size]))} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1
    0 100-2H3a1 1 0 000 2h1z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`);
    }
    $$renderer2.push(`<!--]--></span> <span class="block dark:hidden">`);
    if (darkIcon) {
      $$renderer2.push("<!--[-->");
      darkIcon($$renderer2);
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<svg role="img" aria-label="Dark mode"${attr_class(clsx(sizes[size]))} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>`);
    }
    $$renderer2.push(`<!--]--></span></button>`);
  });
}
tv({
  slots: {
    base: "flex justify-between items-center",
    content: "flex flex-wrap items-center"
  },
  variants: {
    embedded: {
      true: {},
      false: {
        base: "py-2 px-3 rounded-lg dark:border"
      }
    },
    color: {
      default: {
        base: "bg-gray-50 dark:bg-gray-800 dark:border-gray-600",
        content: "divide-gray-300 dark:divide-gray-800"
      },
      primary: {
        base: "bg-primary-50 dark:bg-gray-800 dark:border-primary-800",
        content: "divide-primary-300 dark:divide-primary-800"
      },
      secondary: {
        base: "bg-secondary-50 dark:bg-gray-800 dark:border-secondary-800",
        content: "divide-secondary-300 dark:divide-primary-800"
      },
      gray: {
        base: "bg-gray-50 dark:bg-gray-800 dark:border-gray-800",
        content: "divide-gray-300 dark:divide-gray-800"
      },
      red: {
        base: "bg-red-50 dark:bg-gray-800 dark:border-red-800",
        content: "divide-red-300 dark:divide-red-800"
      },
      yellow: {
        base: "bg-yellow-50 dark:bg-gray-800 dark:border-yellow-800",
        content: "divide-yellow-300 dark:divide-yellow-800"
      },
      green: {
        base: "bg-green-50 dark:bg-gray-800 dark:border-green-800",
        content: "divide-green-300 dark:divide-green-800"
      },
      indigo: {
        base: "bg-indigo-50 dark:bg-gray-800 dark:border-indigo-800",
        content: "divide-indigo-300 dark:divide-indigo-800"
      },
      purple: {
        base: "bg-purple-50 dark:bg-gray-800 dark:border-purple-800",
        content: "divide-purple-300 dark:divide-purple-800"
      },
      pink: {
        base: "bg-pink-50 dark:bg-gray-800 dark:border-pink-800",
        content: "divide-pink-300 dark:divide-pink-800"
      },
      blue: {
        base: "bg-blue-50 dark:bg-gray-800 dark:border-blue-800",
        content: "divide-blue-300 dark:divide-blue-800"
      },
      dark: {
        base: "bg-gray-50 dark:bg-gray-800 dark:border-gray-800",
        content: "divide-gray-300 dark:divide-gray-800"
      }
    },
    separators: {
      true: {
        content: "sm:divide-x rtl:divide-x-reverse"
      }
    }
  },
  compoundVariants: [
    {
      embedded: true,
      color: "default",
      class: {
        base: "bg-transparent"
      }
    }
  ],
  defaultVariants: {
    color: "default"
  }
});
tv({
  base: "flex items-center",
  variants: {
    spacing: {
      default: "space-x-1 rtl:space-x-reverse",
      tight: "space-x-0.5 rtl:space-x-reverse",
      loose: "space-x-2 rtl:space-x-reverse"
    },
    padding: {
      default: "sm:not(:last):pe-4 sm:not(:first):ps-4",
      none: ""
    },
    position: {
      middle: "",
      first: "sm:ps-0",
      last: "sm:pe-0"
    }
  },
  compoundVariants: [
    {
      position: ["first", "last"],
      class: "sm:px-0"
    }
  ],
  defaultVariants: {
    spacing: "default",
    padding: "default"
  }
});
const toolbarButton = tv({
  base: "focus:outline-hidden whitespace-normal",
  variants: {
    color: {
      dark: "text-gray-500 hover:text-gray-900 hover:bg-gray-200 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600",
      gray: "text-gray-500 focus:ring-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-300",
      red: "text-red-500 focus:ring-red-400 hover:bg-red-200 dark:hover:bg-red-800 dark:hover:text-red-300",
      yellow: "text-yellow-500 focus:ring-yellow-400 hover:bg-yellow-200 dark:hover:bg-yellow-800 dark:hover:text-yellow-300",
      green: "text-green-500 focus:ring-green-400 hover:bg-green-200 dark:hover:bg-green-800 dark:hover:text-green-300",
      indigo: "text-indigo-500 focus:ring-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-800 dark:hover:text-indigo-300",
      purple: "text-purple-500 focus:ring-purple-400 hover:bg-purple-200 dark:hover:bg-purple-800 dark:hover:text-purple-300",
      pink: "text-pink-500 focus:ring-pink-400 hover:bg-pink-200 dark:hover:bg-pink-800 dark:hover:text-pink-300",
      blue: "text-blue-500 focus:ring-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800 dark:hover:text-blue-300",
      primary: "text-primary-500 focus:ring-primary-400 hover:bg-primary-200 dark:hover:bg-primary-800 dark:hover:text-primary-300",
      default: "focus:ring-gray-400 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-50"
    },
    size: {
      xs: "m-0.5 rounded-xs focus:ring-1 p-0.5",
      sm: "m-0.5 rounded-sm focus:ring-1 p-0.5",
      md: "m-0.5 rounded-lg focus:ring-2 p-1.5",
      lg: "m-0.5 rounded-lg focus:ring-2 p-2.5"
    },
    background: {
      true: "",
      false: ""
    }
  },
  compoundVariants: [
    {
      color: "default",
      background: true,
      class: "dark:hover:bg-gray-600"
    },
    {
      color: "default",
      background: false,
      class: "dark:hover:bg-gray-700"
    }
  ],
  defaultVariants: {
    color: "default",
    size: "md"
  }
});
function ToolbarButton($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const background = getContext("background");
    let {
      children,
      color,
      name,
      "aria-label": ariaLabel,
      size,
      class: className,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const theme = getTheme("toolbarButton");
    const buttonCls = toolbarButton({
      color,
      size,
      background: !!background,
      class: clsx$1(theme, className)
    });
    if (restProps.href === void 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<button${attributes({
        type: "button",
        ...restProps,
        class: clsx(buttonCls),
        "aria-label": ariaLabel ?? name
      })}>`);
      if (name) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span class="sr-only">${escape_html(name)}</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      children?.($$renderer2);
      $$renderer2.push(`<!----></button>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<a${attributes({
        ...restProps,
        class: clsx(buttonCls),
        "aria-label": ariaLabel ?? name
      })}>`);
      if (name) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span class="sr-only">${escape_html(name)}</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      children?.($$renderer2);
      $$renderer2.push(`<!----></a>`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
tv({
  slots: {
    base: "inline-block rounded-lg bg-white dark:bg-gray-700 shadow-lg p-4",
    input: "w-full rounded-md border px-4 py-2 text-sm focus:ring-2 focus:outline-none outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900",
    titleVariant: "mb-2 text-lg font-semibold text-gray-900 dark:text-white",
    polite: "text-sm rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 font-semibold py-2.5 px-5 hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-200",
    button: "absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 focus:outline-hidden dark:text-gray-400",
    actionButtons: "mt-4 flex justify-between",
    columnHeader: "text-center text-sm font-medium text-gray-500 dark:text-gray-400",
    grid: "grid grid-cols-7 gap-1 w-64",
    nav: "mb-4 flex items-center justify-between",
    dayButton: "h-8 w-full block flex-1 leading-9 border-0 rounded-lg cursor-pointer text-center font-semibold text-sm day p-0",
    monthButton: "rounded-lg px-3 py-2 text-sm hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:hover:bg-gray-700",
    actionSlot: ""
  },
  variants: {
    color: {
      primary: { input: "focus:ring-primary-500 dark:focus:ring-primary-400", dayButton: "bg-primary-300 dark:bg-primary-900" },
      blue: { input: "focus:ring-blue-500 dark:focus:ring-blue-400", dayButton: "bg-blue-300 dark:bg-blue-900" },
      red: { input: "focus:ring-red-500 dark:focus:ring-red-400", dayButton: "bg-red-300 dark:bg-red-900" },
      green: { input: "focus:ring-green-500 dark:focus:ring-green-400", dayButton: "bg-green-300 dark:bg-green-900" },
      yellow: { input: "focus:ring-yellow-500 dark:focus:ring-yellow-400", dayButton: "bg-yellow-300 dark:bg-yellow-900" },
      purple: { input: "focus:ring-purple-500 dark:focus:ring-purple-400", dayButton: "bg-purple-300 dark:bg-purple-900" },
      dark: { input: "focus:ring-gray-500 dark:focus:ring-gray-400", dayButton: "bg-gray-300 dark:bg-gray-900" },
      light: { input: "focus:ring-gray-500 dark:focus:ring-gray-400", dayButton: "bg-gray-300 dark:bg-gray-900" },
      alternative: { input: "focus:ring-alternative-500 dark:focus:ring-alternative-400", dayButton: "bg-alternative-300 dark:bg-alternative-900" },
      secondary: { input: "focus:ring-secondary-500 dark:focus:ring-secondary-400", dayButton: "bg-secondary-300 dark:bg-secondary-900" },
      gray: { input: "focus:ring-gray-500 dark:focus:ring-gray-400", dayButton: "bg-gray-300 dark:bg-gray-900" },
      orange: { input: "focus:ring-orange-500 dark:focus:ring-orange-400", dayButton: "bg-orange-300 dark:bg-orange-900" },
      amber: { input: "focus:ring-amber-500 dark:focus:ring-amber-400", dayButton: "bg-amber-300 dark:bg-amber-900" },
      lime: { input: "focus:ring-lime-500 dark:focus:ring-lime-400", dayButton: "bg-lime-300 dark:bg-lime-900" },
      emerald: { input: "focus:ring-emerald-500 dark:focus:ring-emerald-400", dayButton: "bg-emerald-300 dark:bg-emerald-900" },
      teal: { input: "focus:ring-teal-500 dark:focus:ring-teal-400", dayButton: "bg-teal-300 dark:bg-teal-900" },
      cyan: { input: "focus:ring-cyan-500 dark:focus:ring-cyan-400", dayButton: "bg-cyan-300 dark:bg-cyan-900" },
      sky: { input: "focus:ring-sky-500 dark:focus:ring-sky-400", dayButton: "bg-sky-300 dark:bg-sky-900" },
      indigo: { input: "focus:ring-indigo-500 dark:focus:ring-indigo-400", dayButton: "bg-indigo-300 dark:bg-indigo-900" },
      violet: { input: "focus:ring-violet-500 dark:focus:ring-violet-400", dayButton: "bg-violet-300 dark:bg-violet-900" },
      fuchsia: { input: "focus:ring-fuchsia-500 dark:focus:ring-fuchsia-400", dayButton: "bg-fuchsia-300 dark:bg-fuchsia-900" },
      pink: { input: "focus:ring-pink-500 dark:focus:ring-pink-400", dayButton: "bg-pink-300 dark:bg-pink-900" },
      rose: { input: "focus:ring-rose-500 dark:focus:ring-rose-400", dayButton: "bg-rose-300 dark:bg-rose-900" }
    },
    inline: {
      false: { base: "absolute z-10 mt-1" }
    },
    current: {
      true: { dayButton: "text-gray-400 dark:text-gray-500" }
    },
    today: {
      true: { dayButton: "font-bold" }
    },
    unavailable: {
      true: { dayButton: "opacity-50 cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700" }
    }
  },
  compoundVariants: []
});
tv({
  slots: {
    base: "relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-xl h-[600px] w-[300px] shadow-xl",
    slot: "rounded-xl overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800",
    top: "w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute",
    leftTop: "h-[32px] w-[3px] bg-gray-800 absolute -left-[17px] top-[72px] rounded-l-lg",
    leftMid: "h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg",
    leftBot: "h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg",
    right: "h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"
  }
});
tv({
  slots: {
    base: "relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px]",
    slot: "rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800",
    top: "h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[72px] rounded-l-lg",
    leftTop: "h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg",
    leftBot: "h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg",
    right: "h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"
  }
});
tv({
  slots: {
    base: "relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[16px] rounded-t-xl h-[172px] max-w-[301px] md:h-[294px] md:max-w-[512px]",
    inner: "rounded-xl overflow-hidden h-[140px] md:h-[262px]",
    bot: "relative mx-auto bg-gray-900 dark:bg-gray-700 rounded-b-xl h-[24px] max-w-[301px] md:h-[42px] md:max-w-[512px]",
    botUnder: "relative mx-auto bg-gray-800 rounded-b-xl h-[55px] max-w-[83px] md:h-[95px] md:max-w-[142px]"
  }
});
tv({
  slots: {
    base: "relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl",
    slot: "rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800",
    top: "w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute",
    leftTop: "h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg",
    leftBot: "h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg",
    right: "h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"
  }
});
tv({
  slots: {
    base: "relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[8px] rounded-t-xl h-[172px] max-w-[301px] md:h-[294px] md:max-w-[512px]",
    inner: "rounded-lg overflow-hidden h-[156px] md:h-[278px] bg-white dark:bg-gray-800",
    bot: "relative mx-auto bg-gray-900 dark:bg-gray-700 rounded-b-xl rounded-t-sm h-[17px] max-w-[351px] md:h-[21px] md:max-w-[597px]",
    botCen: "absolute left-1/2 top-0 -translate-x-1/2 rounded-b-xl w-[56px] h-[5px] md:w-[96px] md:h-[8px] bg-gray-800"
  }
});
tv({
  slots: {
    base: "relative mx-auto bg-gray-800 dark:bg-gray-700 rounded-t-[2.5rem] h-[63px] max-w-[133px]",
    slot: "rounded-[2rem] overflow-hidden h-[193px] w-[188px]",
    rightTop: "h-[41px] w-[6px] bg-gray-800 dark:bg-gray-800 absolute -right-[16px] top-[40px] rounded-r-lg",
    rightBot: "h-[32px] w-[6px] bg-gray-800 dark:bg-gray-800 absolute -right-[16px] top-[88px] rounded-r-lg",
    top: "relative mx-auto border-gray-900 dark:bg-gray-800 dark:border-gray-800 border-[10px] rounded-[2.5rem] h-[213px] w-[208px]",
    bot: "relative mx-auto bg-gray-800 dark:bg-gray-700 rounded-b-[2.5rem] h-[63px] max-w-[133px]"
  }
});
tv({
  slots: {
    base: "relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[454px] max-w-[341px] md:h-[682px] md:max-w-[512px]",
    slot: "rounded-[2rem] overflow-hidden h-[426px] md:h-[654px] bg-white dark:bg-gray-800",
    leftTop: "h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[72px] rounded-l-lg",
    leftMid: "h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg",
    leftBot: "h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg",
    right: "h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"
  }
});
const dialog = tv({
  slots: {
    base: "backdrop:bg-gray-900/50 open:flex flex-col bg-white dark:bg-gray-800",
    form: "flex flex-col w-full border-inherit dark:border-inherit divide-inherit dark:divide-inherit",
    close: "absolute top-2.5 end-2.5"
  },
  variants: {
    // position: {
    //     fixed: { base: "fixed" },
    //     absolute: { base: "absolute" }
    // },
  },
  defaultVariants: {
    // position: "fixed"
  }
});
tv({
  extend: dialog,
  slots: {
    base: "p-4 max-h-none max-w-none border border-gray-200 dark:border-gray-700 transform-gpu will-change-transform"
  },
  variants: {
    placement: {
      left: { base: "me-auto h-full" },
      right: { base: "ms-auto h-full" },
      top: { base: "mb-auto !w-full" },
      bottom: { base: "mt-auto !w-full" }
    },
    width: {
      default: { base: "w-80" },
      full: { base: "w-full" },
      half: { base: "w-1/2" }
    },
    modal: {
      false: { base: "fixed inset-0" },
      true: { base: "" }
    },
    shifted: {
      true: {},
      false: {}
    }
  },
  compoundVariants: [
    {
      shifted: false,
      modal: false,
      class: { base: "z-50" }
    },
    {
      shifted: true,
      placement: "left",
      class: { base: "-translate-x-full" }
    },
    {
      shifted: true,
      placement: "right",
      class: { base: "translate-x-full" }
    },
    {
      shifted: true,
      placement: "top",
      class: { base: "-translate-y-full" }
    },
    {
      shifted: true,
      placement: "bottom",
      class: { base: "translate-y-full" }
    }
  ],
  defaultVariants: {
    placement: "left",
    width: "default",
    modal: true
  }
});
tv({
  slots: {
    base: "flex items-center justify-between",
    button: "ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white",
    svg: "h-4 w-4"
  }
});
tv({
  slots: {
    base: "p-4 absolute flex select-none cursor-grab active:cursor-grabbing focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 dark:focus-visible:ring-gray-500",
    handle: "absolute rounded-lg bg-gray-300 dark:bg-gray-600"
  },
  variants: {
    placement: {
      left: { base: "inset-y-0 right-0 touch-pan-x", handle: "w-1 h-8 top-1/2 -translate-y-1/2" },
      right: { base: "inset-y-0 left-0 touch-pan-x", handle: "w-1 h-8 top-1/2 -translate-y-1/2" },
      top: { base: "inset-x-0 bottom-0 touch-pan-y", handle: "w-8 h-1 left-1/2 -translate-x-1/2" },
      bottom: { base: "inset-x-0 top-0 touch-pan-y", handle: "w-8 h-1 left-1/2 -translate-x-1/2" }
    }
  }
});
tv({
  base: "mt-2 divide-y divide-gray-300 dark:divide-gray-500 overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-700"
});
tv({
  base: "my-1 h-px bg-gray-100 dark:bg-gray-500"
});
tv({
  base: "px-4 py-3 text-sm text-gray-900 dark:text-white"
});
tv({
  slots: {
    base: "block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white",
    active: "block px-4 py-2 text-primary-700 dark:text-primary-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white",
    li: ""
  }
});
tv({
  base: "py-2 text-sm text-gray-700 dark:text-gray-200"
});
tv({
  base: "bg-white dark:bg-gray-800",
  variants: {
    footerType: {
      default: "p-4 rounded-lg shadow md:flex md:items-center md:justify-between md:p-6",
      sitemap: "bg-white dark:bg-gray-900",
      socialmedia: "p-4 sm:p-6",
      logo: "p-4 rounded-lg shadow md:px-6 md:py-8",
      sticky: "fixed bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600"
    }
  }
});
tv({
  slots: {
    base: "flex items-center",
    span: "self-center text-2xl font-semibold whitespace-nowrap dark:text-white",
    img: "me-3 h-8"
  }
});
tv({
  slots: {
    base: "block text-sm text-gray-500 sm:text-center dark:text-gray-400",
    link: "hover:underline",
    bySpan: "ms-1"
  }
});
tv({
  base: "text-gray-500 hover:text-gray-900 dark:hover:text-white"
});
tv({
  base: "text-gray-600 dark:text-gray-400"
});
tv({
  slots: {
    base: "me-4 last:me-0 md:me-6",
    link: "hover:underline"
  }
});
tv({
  slots: {
    image: "h-auto max-w-full rounded-lg",
    div: "grid"
  }
});
tv({
  base: "px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500"
});
tv({
  base: "flex bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 divide-gray-200 dark:divide-gray-600",
  variants: {
    rounded: {
      true: "rounded-lg",
      false: ""
    },
    border: {
      true: "border border-gray-200 dark:border-gray-700",
      false: ""
    },
    horizontal: {
      true: "flex-row divide-x",
      false: "flex-col divide-y"
    }
  },
  compoundVariants: [
    {
      border: true,
      class: "divide-gray-200 dark:divide-gray-700"
    }
  ],
  defaultVariants: {
    rounded: true,
    border: true,
    horizontal: false
  }
});
tv({
  base: "py-2 px-4 w-full text-sm font-medium list-none flex items-center text-left gap-2",
  variants: {
    state: {
      normal: "",
      current: "text-white bg-primary-700 dark:text-white dark:bg-gray-800",
      disabled: "text-gray-900 bg-gray-100 dark:bg-gray-600 dark:text-gray-400"
    },
    active: {
      true: "",
      false: ""
    },
    horizontal: {
      true: "first:rounded-s-lg last:rounded-e-lg",
      false: "first:rounded-t-lg last:rounded-b-lg"
    }
  },
  compoundVariants: [
    {
      active: true,
      state: "disabled",
      class: "cursor-not-allowed"
    },
    {
      active: true,
      state: "normal",
      class: "hover:bg-gray-100 hover:text-primary-700 dark:hover:bg-gray-600 dark:hover:text-white focus:z-40 focus:outline-hidden focus:ring-2 focus:ring-primary-700 focus:text-primary-700 dark:focus:ring-gray-500 dark:focus:text-white"
    }
    // {
    //   horizontal: true,
    //   class: "focus:first:rounded-s-lg focus:last:rounded-e-lg"
    // },
    // {
    //   horizontal: false,
    //   class: "focus:first:rounded-t-lg focus:last:rounded-b-lg"
    // }
  ]
});
tv({
  slots: {
    base: "w-fit bg-white shadow-md dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg border border-gray-100 dark:border-gray-600 divide-gray-100 dark:divide-gray-600",
    div: "flex flex-col md:flex-row p-4 max-w-(--breakpoint-md) justify-center mx-auto mt-2",
    ul: "grid grid-flow-row gap-y-4 md:gap-x-0 auto-col-max auto-row-max grid-cols-2 md:grid-cols-3 text-sm font-medium",
    extra: "md:w-1/3 mt-4 md:mt-0"
  },
  variants: {
    full: {
      true: { base: "border-y shadow-xs w-full ml-0 rounded-none" }
    },
    hasExtra: {
      true: {}
    }
  },
  compoundVariants: [
    {
      full: true,
      hasExtra: true,
      class: { ul: "grid-cols-2 md:w-2/3" }
    }
  ]
});
tv({
  extend: dialog,
  slots: {
    base: "w-full rounded-lg divide-y text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-700 divide-gray-300 dark:divide-gray-700 bg-white dark:bg-gray-800 pointer-events-auto",
    form: "rounded-lg divide-y",
    header: "flex items-center p-4 md:p-5 justify-between rounded-t-lg shrink-0 text-xl font-semibold text-gray-900 dark:text-white",
    footer: "flex items-center p-4 md:p-5 space-x-3 rtl:space-x-reverse rounded-b-lg shrink-0",
    body: "p-4 md:p-5 space-y-4 overflow-y-auto overscroll-contain"
  },
  variants: {
    fullscreen: {
      true: {
        base: "fixed inset-0 w-screen h-screen max-w-none max-h-none m-0 p-0 border-none rounded-none bg-white dark:bg-gray-900"
      }
    },
    placement: {
      "top-left": { base: "mb-auto mr-auto" },
      "top-center": { base: "mb-auto mx-auto" },
      "top-right": { base: "mb-auto ml-auto" },
      "center-left": { base: "my-auto mr-auto" },
      center: { base: "my-auto mx-auto" },
      "center-right": { base: "my-auto ml-auto" },
      "bottom-left": { base: "mt-auto mr-auto" },
      "bottom-center": { base: "mt-auto mx-auto" },
      "bottom-right": { base: "mt-auto ml-auto" }
    },
    size: {
      none: { base: "" },
      xs: { base: "max-w-md" },
      sm: { base: "max-w-lg" },
      md: { base: "max-w-2xl" },
      lg: { base: "max-w-4xl" },
      xl: { base: "max-w-7xl" }
    }
  },
  defaultVariants: {
    placement: "center",
    size: "md"
  }
});
const navbar = tv({
  base: "relative w-full px-2 py-2.5 sm:px-4"
});
tv({
  base: "flex items-center"
});
const navbarContainer = tv({
  base: "mx-auto flex flex-wrap items-center justify-between ",
  variants: {
    fluid: { true: "w-full", false: "container" }
  }
});
const navbarUl = tv({
  slots: {
    base: "",
    ul: "flex flex-col p-4 mt-0 rtl:space-x-reverse",
    active: "text-white bg-primary-700 dark:bg-primary-600",
    nonActive: "hover:text-primary-500 text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
  },
  variants: {
    breakpoint: {
      sm: {
        base: "w-full sm:block sm:w-auto",
        ul: "sm:flex-row sm:text-sm sm:font-medium",
        active: "sm:bg-transparent sm:text-primary-700 sm:dark:text-white sm:dark:bg-transparent",
        nonActive: "sm:hover:bg-transparent sm:border-0 sm:hover:text-primary-700 dark:sm:text-gray-400 sm:dark:hover:text-white sm:dark:hover:bg-transparent"
      },
      md: {
        base: "w-full md:block md:w-auto",
        ul: "md:flex-row md:text-sm md:font-medium",
        active: "md:bg-transparent md:text-primary-700 md:dark:text-white md:dark:bg-transparent",
        nonActive: "md:hover:bg-transparent md:border-0 md:hover:text-primary-700 dark:md:text-gray-400 md:dark:hover:text-white md:dark:hover:bg-transparent"
      },
      lg: {
        base: "w-full lg:block lg:w-auto",
        ul: "lg:flex-row lg:text-sm lg:font-medium",
        active: "lg:bg-transparent lg:text-primary-700 lg:dark:text-white lg:dark:bg-transparent",
        nonActive: "lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 dark:lg:text-gray-400 lg:dark:hover:text-white lg:dark:hover:bg-transparent"
      },
      xl: {
        base: "w-full xl:block xl:w-auto",
        ul: "xl:flex-row xl:text-sm xl:font-medium",
        active: "xl:bg-transparent xl:text-primary-700 xl:dark:text-white xl:dark:bg-transparent",
        nonActive: "xl:hover:bg-transparent xl:border-0 xl:hover:text-primary-700 dark:xl:text-gray-400 xl:dark:hover:text-white xl:dark:hover:bg-transparent"
      }
    },
    hidden: {
      false: {
        base: "absolute top-full left-0 right-0 z-50 w-full",
        ul: "border rounded-lg bg-white shadow-lg dark:bg-gray-800 dark:border-gray-700 text-gray-700 dark:text-gray-400 border-gray-100 dark:border-gray-700 divide-gray-100 dark:divide-gray-700"
      },
      true: {
        base: "hidden"
      }
    }
  },
  compoundVariants: [
    // Compound variants for breakpoint + hidden combinations
    {
      breakpoint: "sm",
      hidden: false,
      class: {
        base: "sm:static sm:z-auto",
        ul: "sm:border-none sm:rounded-none sm:bg-inherit dark:sm:bg-inherit sm:shadow-none"
      }
    },
    {
      breakpoint: "md",
      hidden: false,
      class: {
        base: "md:static md:z-auto",
        ul: "md:border-none md:rounded-none md:bg-inherit dark:md:bg-inherit md:shadow-none"
      }
    },
    {
      breakpoint: "lg",
      hidden: false,
      class: {
        base: "lg:static lg:z-auto",
        ul: "lg:border-none lg:rounded-none lg:bg-inherit dark:lg:bg-inherit lg:shadow-none"
      }
    },
    {
      breakpoint: "xl",
      hidden: false,
      class: {
        base: "xl:static xl:z-auto",
        ul: "xl:border-none xl:rounded-none xl:bg-inherit dark:xl:bg-inherit xl:shadow-none"
      }
    }
  ],
  defaultVariants: {
    breakpoint: "md"
  }
});
const navbarLi = tv({
  base: "block py-2 pe-4 ps-3 rounded-sm",
  variants: {
    breakpoint: {
      sm: "sm:p-2 sm:border-0",
      md: "md:p-2 md:border-0",
      lg: "lg:p-2 lg:border-0",
      xl: "xl:p-2 xl:border-0"
    },
    hidden: {
      false: "text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
    }
  },
  compoundVariants: [
    {
      breakpoint: "sm",
      hidden: false,
      class: "sm:hover:bg-transparent sm:hover:text-primary-700 sm:dark:hover:text-white sm:dark:hover:bg-transparent"
    },
    {
      breakpoint: "md",
      hidden: false,
      class: "md:hover:bg-transparent md:hover:text-primary-700 md:dark:hover:text-white md:dark:hover:bg-transparent"
    },
    {
      breakpoint: "lg",
      hidden: false,
      class: "lg:hover:bg-transparent lg:hover:text-primary-700 lg:dark:hover:text-white lg:dark:hover:bg-transparent"
    },
    {
      breakpoint: "xl",
      hidden: false,
      class: "xl:hover:bg-transparent xl:hover:text-primary-700 xl:dark:hover:text-white xl:dark:hover:bg-transparent"
    }
  ],
  defaultVariants: {
    breakpoint: "md"
  }
});
const navbarHamburger = tv({
  slots: {
    base: "ms-3",
    menu: "h-6 w-6 shrink-0"
  },
  variants: {
    breakpoint: {
      sm: {
        base: "sm:hidden"
      },
      md: {
        base: "md:hidden"
      },
      lg: {
        base: "lg:hidden"
      },
      xl: {
        base: "xl:hidden"
      }
    }
  },
  defaultVariants: {
    breakpoint: "md"
  }
});
function NavContainer($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      children,
      fluid,
      class: className,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const theme = getTheme("navbarContainer");
    $$renderer2.push(`<div${attributes({
      ...restProps,
      class: clsx(navbarContainer({ fluid, class: clsx$1(theme, className) }))
    })}>`);
    children?.($$renderer2);
    $$renderer2.push(`<!----></div>`);
  });
}
function Navbar($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      children,
      fluid,
      navContainerClass,
      class: className,
      closeOnClickOutside = true,
      breakpoint = "md",
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const theme = getTheme("navbar");
    let navState = { hidden: true };
    setContext("navState", navState);
    setContext("breakpoint", breakpoint);
    let toggle2 = () => {
      navState.hidden = !navState.hidden;
    };
    $$renderer2.push(`<nav><div${attributes({
      ...restProps,
      class: clsx(navbar({ class: clsx$1(theme, className) }))
    })}>`);
    NavContainer($$renderer2, {
      fluid,
      class: clsx$1(navContainerClass),
      children: ($$renderer3) => {
        children($$renderer3, { hidden: navState.hidden, toggle: toggle2, NavContainer });
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div></nav>`);
  });
}
function NavLi($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let navState = getContext("navState");
    let navBreakpoint = getContext("breakpoint");
    let {
      children,
      onclick,
      activeClass,
      nonActiveClass,
      class: className,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const theme = getTheme("navbarLi");
    let active = navState.activeUrl ? restProps.href === navState.activeUrl : false;
    let liClass = navbarLi({
      breakpoint: navBreakpoint,
      hidden: navState.hidden,
      class: clsx$1(
        active ? activeClass ?? navState.activeClass : nonActiveClass ?? navState.nonActiveClass,
        theme,
        className
      )
    });
    $$renderer2.push(`<li>`);
    if (restProps.href === void 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<button${attributes({ role: "presentation", ...restProps, class: clsx(liClass) })}>`);
      children?.($$renderer2);
      $$renderer2.push(`<!----></button>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<a${attributes({ ...restProps, class: clsx(liClass) })}>`);
      children?.($$renderer2);
      $$renderer2.push(`<!----></a>`);
    }
    $$renderer2.push(`<!--]--></li>`);
  });
}
function NavUl($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let navState = getContext("navState");
    let navBreakpoint = getContext("breakpoint");
    let {
      children,
      activeUrl = void 0,
      ulClass,
      slideParams,
      transition = slide,
      transitionParams,
      activeClass,
      nonActiveClass,
      respectMotionPreference = true,
      class: className,
      classes,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const styling = classes ?? { ul: ulClass };
    const theme = getTheme("navbarUl");
    let hidden = navState.hidden ?? true;
    let { base, ul, active, nonActive } = navbarUl({ hidden, breakpoint: navBreakpoint });
    let divCls = base({ class: clsx$1(theme?.base, className) });
    let ulCls = ul({ class: clsx$1(theme?.ul, styling.ul) });
    if (!hidden) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div${attributes({ ...restProps, class: clsx(divCls) })}><ul${attr_class(clsx(ulCls))}>`);
      children?.($$renderer2);
      $$renderer2.push(`<!----></ul></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div${attributes({ ...restProps, class: clsx(divCls) })}><ul${attr_class(clsx(ulCls))}>`);
      children?.($$renderer2);
      $$renderer2.push(`<!----></ul></div>`);
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { activeUrl });
  });
}
function Menu($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      size = "24",
      color = "currentColor",
      variation = "outline",
      ariaLabel = "bars 3",
      class: className,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    let viewBox = "0 0 24 24";
    let svgpath = "";
    $$renderer2.push(`<svg${attributes(
      {
        xmlns: "http://www.w3.org/2000/svg",
        role: "button",
        tabindex: "0",
        width: size,
        height: size,
        class: clsx(clsx$1(className)),
        ...restProps,
        "aria-label": ariaLabel,
        fill: "none",
        viewBox,
        "stroke-width": "2"
      },
      void 0,
      void 0,
      void 0,
      3
    )}>${html(svgpath)}</svg>`);
  });
}
function NavHamburger($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      children,
      onclick,
      menuClass,
      class: className,
      classes,
      name = "Open main menu",
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const styling = classes ?? { menu: menuClass };
    const theme = getTheme("navbarHamburger");
    const navState = getContext("navState");
    const navBreakpoint = getContext("breakpoint");
    const { base, menu } = navbarHamburger({ breakpoint: navBreakpoint });
    const toggle2 = () => {
      navState.hidden = !navState.hidden;
    };
    ToolbarButton($$renderer2, spread_props([
      { name, onclick: onclick || toggle2 },
      restProps,
      {
        class: base({ class: clsx$1(theme?.base, className) }),
        children: ($$renderer3) => {
          Menu($$renderer3, { class: menu({ class: clsx$1(theme?.menu, styling.menu) }) });
        },
        $$slots: { default: true }
      }
    ]));
  });
}
tv({
  slots: {
    base: "inline-flex -space-x-px rtl:space-x-reverse items-center",
    tableDiv: "flex items-center text-sm mb-4",
    span: "font-semibold mx-1",
    prev: "rounded-none",
    next: "rounded-none",
    active: ""
  },
  variants: {
    size: {
      default: "",
      large: ""
    },
    layout: {
      table: {
        prev: "rounded-s bg-gray-800 hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white text-white  hover:text-gray-200",
        next: "text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 hover:text-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
      },
      navigation: { prev: "rounded-s-lg", next: "rounded-e-lg" },
      pagination: { prev: "rounded-s-lg", next: "rounded-e-lg" }
    }
  },
  defaultVariants: {
    table: false,
    size: "default"
  }
});
tv({
  base: "flex items-center font-medium",
  variants: {
    size: {
      default: "h-8 px-3 text-sm",
      large: "h-10 px-4 text-base"
    },
    active: {
      true: "text-primary-600 border border-gray-300 bg-primary-50 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white",
      false: "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
    },
    group: {
      true: "",
      false: "rounded-lg"
    },
    table: {
      true: "rounded-sm",
      false: "border"
    },
    disabled: {
      true: "cursor-not-allowed opacity-50",
      false: ""
    }
  },
  compoundVariants: [
    {
      group: false,
      table: false,
      class: "rounded-lg"
    }
  ],
  defaultVariants: {
    size: "default",
    active: false,
    group: false,
    table: false
  }
});
tv({
  base: "flex items-center font-medium",
  variants: {
    size: {
      default: "h-8 px-3 text-sm",
      large: "h-10 px-4 text-base"
    },
    active: {
      true: "text-primary-600 border border-gray-300 bg-primary-50 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white",
      false: "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
    },
    group: {
      true: "",
      false: "rounded-lg"
    },
    table: {
      true: "rounded-sm",
      false: "border"
    }
  },
  compoundVariants: [
    {
      group: false,
      table: false,
      class: "rounded-lg"
    }
  ],
  defaultVariants: {
    size: "default",
    active: false,
    group: false,
    table: false
  }
});
tv({
  base: "inline-flex -space-x-px rtl:space-x-reverse items-center",
  variants: {
    table: {
      true: "divide-x rtl:divide-x-reverse dark divide-gray-700 dark:divide-gray-700",
      false: ""
    },
    size: {
      default: "",
      large: ""
    }
  },
  defaultVariants: {
    table: false,
    size: "default"
  }
});
tv({
  slots: {
    base: "rounded-lg shadow-md bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 divide-gray-200 dark:divide-gray-700",
    content: "p-2",
    title: "py-2 px-3 rounded-t-md border-b ",
    h3: "font-semibold"
  },
  variants: {
    color: {
      default: {
        title: "bg-gray-100 border-gray-200 dark:border-gray-600 dark:bg-gray-700",
        h3: "text-gray-900 dark:text-white"
      },
      primary: {
        title: "bg-primary-700",
        h3: "text-white"
      },
      secondary: {
        title: "bg-secondary-700",
        h3: "text-white"
      },
      gray: {
        title: "bg-gray-700",
        h3: "text-white"
      },
      red: {
        title: "bg-red-700",
        h3: "text-white"
      },
      orange: {
        title: "bg-orange-700",
        h3: "text-white"
      },
      amber: {
        title: "bg-amber-700",
        h3: "text-white"
      },
      yellow: {
        title: "bg-yellow-500",
        h3: "text-gray-800"
      },
      lime: {
        title: "bg-lime-700",
        h3: "text-white"
      },
      green: {
        title: "bg-green-700",
        h3: "text-white"
      },
      emerald: {
        title: "bg-emerald-700",
        h3: "text-white"
      },
      teal: {
        title: "bg-teal-700",
        h3: "text-white"
      },
      cyan: {
        title: "bg-cyan-700",
        h3: "text-white"
      },
      sky: {
        title: "bg-sky-700",
        h3: "text-white"
      },
      blue: {
        title: "bg-blue-700",
        h3: "text-white"
      },
      indigo: {
        title: "bg-indigo-700",
        h3: "text-white"
      },
      violet: {
        title: "bg-violet-700",
        h3: "text-white"
      },
      purple: {
        title: "bg-purple-700",
        h3: "text-white"
      },
      fuchsia: {
        title: "bg-fuchsia-700",
        h3: "text-white"
      },
      pink: {
        title: "bg-pink-700",
        h3: "text-white"
      },
      rose: {
        title: "bg-rose-700",
        h3: "text-white"
      }
    }
  }
});
tv({
  slots: {
    base: "w-full bg-gray-200 rounded-full dark:bg-gray-700",
    label: "text-primary-100 text-xs font-medium text-center leading-none rounded-full",
    inside: "rounded-full",
    outside: "mb-1 flex justify-between",
    span: "text-base font-medium dark:text-white",
    progressCls: "text-sm font-medium dark:text-white"
  },
  variants: {
    color: {
      primary: {
        label: "bg-primary-600",
        inside: "bg-primary-600"
      },
      secondary: {
        label: "bg-secondary-600",
        inside: "bg-secondary-600"
      },
      gray: {
        label: "bg-gray-600 dark:bg-gray-300",
        inside: "bg-gray-600 dark:bg-gray-300"
      },
      red: {
        label: "bg-red-600 dark:bg-red-500",
        inside: "bg-red-600 dark:bg-red-500"
      },
      orange: {
        label: "bg-orange-600 dark:bg-orange-500",
        inside: "bg-orange-600 dark:bg-orange-500"
      },
      amber: {
        label: "bg-amber-600 dark:bg-amber-500",
        inside: "bg-amber-600 dark:bg-amber-500"
      },
      yellow: {
        label: "bg-yellow-400",
        inside: "bg-yellow-400"
      },
      lime: {
        label: "bg-lime-600 dark:bg-lime-500",
        inside: "bg-lime-600 dark:bg-lime-500"
      },
      green: {
        label: "bg-green-600 dark:bg-green-500",
        inside: "bg-green-600 dark:bg-green-500"
      },
      emerald: {
        label: "bg-emerald-600 dark:bg-emerald-500",
        inside: "bg-emerald-600 dark:bg-emerald-500"
      },
      teal: {
        label: "bg-teal-600 dark:bg-teal-500",
        inside: "bg-teal-600 dark:bg-teal-500"
      },
      cyan: {
        label: "bg-cyan-600 dark:bg-cyan-500",
        inside: "bg-cyan-600 dark:bg-cyan-500"
      },
      sky: {
        label: "bg-sky-600 dark:bg-sky-500",
        inside: "bg-sky-600 dark:bg-sky-500"
      },
      blue: {
        label: "bg-blue-600",
        inside: "bg-blue-600"
      },
      indigo: {
        label: "bg-indigo-600 dark:bg-indigo-500",
        inside: "bg-indigo-600 dark:bg-indigo-500"
      },
      violet: {
        label: "bg-violet-600 dark:bg-violet-500",
        inside: "bg-violet-600 dark:bg-violet-500"
      },
      purple: {
        label: "bg-purple-600 dark:bg-purple-500",
        inside: "bg-purple-600 dark:bg-purple-500"
      },
      fuchsia: {
        label: "bg-fuchsia-600 dark:bg-fuchsia-500",
        inside: "bg-fuchsia-600 dark:bg-fuchsia-500"
      },
      pink: {
        label: "bg-pink-600 dark:bg-pink-500",
        inside: "bg-pink-600 dark:bg-pink-500"
      },
      rose: {
        label: "bg-rose-600 dark:bg-rose-500",
        inside: "bg-rose-600 dark:bg-rose-500"
      }
    },
    labelInside: {
      true: "",
      false: ""
    }
  },
  compoundVariants: [
    {
      labelInside: true,
      class: {
        base: "text-primary-100 text-xs font-medium text-center leading-none rounded-full",
        label: "p-0.5"
      }
    },
    {
      labelInside: false,
      class: { base: "rounded-full" }
    }
  ],
  defaultVariants: {
    color: "primary",
    labelInside: false
  }
});
tv({
  slots: {
    base: "relative inline-flex",
    label: "absolute inset-0 flex items-center justify-center text-sm font-medium",
    background: "opacity-25",
    foreground: "transition-all",
    outside: "flex flex-col items-center mb-2 text-center",
    span: "text-base font-medium",
    progressCls: "text-sm font-medium ml-1"
  },
  variants: {
    color: {
      primary: {
        background: "stroke-primary-600",
        foreground: "stroke-primary-600"
      },
      secondary: {
        background: "stroke-secondary-600",
        foreground: "stroke-secondary-600"
      },
      gray: {
        background: "stroke-gray-600 dark:stroke-gray-300",
        foreground: "stroke-gray-600 dark:stroke-gray-300"
      },
      red: {
        background: "stroke-red-600 dark:stroke-red-500",
        foreground: "stroke-red-600 dark:stroke-red-500"
      },
      orange: {
        background: "stroke-orange-600 dark:stroke-orange-500",
        foreground: "stroke-orange-600 dark:stroke-orange-500"
      },
      amber: {
        background: "stroke-amber-600 dark:stroke-amber-500",
        foreground: "stroke-amber-600 dark:stroke-amber-500"
      },
      yellow: {
        background: "stroke-yellow-400",
        foreground: "stroke-yellow-400"
      },
      lime: {
        background: "stroke-lime-600 dark:stroke-lime-500",
        foreground: "stroke-lime-600 dark:stroke-lime-500"
      },
      green: {
        background: "stroke-green-600 dark:stroke-green-500",
        foreground: "stroke-green-600 dark:stroke-green-500"
      },
      emerald: {
        background: "stroke-emerald-600 dark:stroke-emerald-500",
        foreground: "stroke-emerald-600 dark:stroke-emerald-500"
      },
      teal: {
        background: "stroke-teal-600 dark:stroke-teal-500",
        foreground: "stroke-teal-600 dark:stroke-teal-500"
      },
      cyan: {
        background: "stroke-cyan-600 dark:stroke-cyan-500",
        foreground: "stroke-cyan-600 dark:stroke-cyan-500"
      },
      sky: {
        background: "stroke-sky-600 dark:stroke-sky-500",
        foreground: "stroke-sky-600 dark:stroke-sky-500"
      },
      blue: {
        background: "stroke-blue-600",
        foreground: "stroke-blue-600"
      },
      indigo: {
        background: "stroke-indigo-600 dark:stroke-indigo-500",
        foreground: "stroke-indigo-600 dark:stroke-indigo-500"
      },
      violet: {
        background: "stroke-violet-600 dark:stroke-violet-500",
        foreground: "stroke-violet-600 dark:stroke-violet-500"
      },
      purple: {
        background: "stroke-purple-600 dark:stroke-purple-500",
        foreground: "stroke-purple-600 dark:stroke-purple-500"
      },
      fuchsia: {
        background: "stroke-fuchsia-600 dark:stroke-fuchsia-500",
        foreground: "stroke-fuchsia-600 dark:stroke-fuchsia-500"
      },
      pink: {
        background: "stroke-pink-600 dark:stroke-pink-500",
        foreground: "stroke-pink-600 dark:stroke-pink-500"
      },
      rose: {
        background: "stroke-rose-600 dark:stroke-rose-500",
        foreground: "stroke-rose-600 dark:stroke-rose-500"
      }
    },
    labelInside: {
      true: {}
    }
  }
});
tv({
  // divClass = 'flex items-center mt-4', spanClass = 'text-sm font-medium text-gray-600 dark:text-gray-500', div2Class = 'mx-4 w-2/4 h-5 bg-gray-200 rounded-sm dark:bg-gray-700', div3Class = 'h-5 bg-yellow-400 rounded-sm', span2Class = 'text-sm font-medium text-gray-600 dark:text-gray-500',
  slots: {
    base: "flex items-center mt-4",
    span: "text-sm font-medium text-gray-600 dark:text-gray-500",
    div2: "mx-4 w-2/4 h-5 bg-gray-200 rounded-sm dark:bg-gray-700",
    div3: "h-5 bg-yellow-400 rounded-sm",
    span2: "text-sm font-medium text-gray-600 dark:text-gray-500"
  }
});
tv({
  slots: {
    base: "flex items-center",
    p: "ms-2 text-sm font-bold text-gray-900 dark:text-white"
  }
});
tv({
  slots: {
    article: "md:grid md:grid-cols-3 md:gap-8",
    div: "mb-6 flex items-center space-x-4 rtl:space-x-reverse",
    div2: "space-y-1 font-medium dark:text-white",
    div3: "flex items-center text-sm text-gray-500 dark:text-gray-400",
    img: "h-10 w-10 rounded-full",
    ul: "space-y-4 text-sm text-gray-500 dark:text-gray-400",
    li: "flex items-center"
  }
});
tv({
  slots: {
    desc1: "bg-primary-100 w-8 text-primary-800 text-sm font-semibold inline-flex items-center p-1.5 rounded-sm dark:bg-primary-200 dark:text-primary-800",
    desc2: "ms-2 font-medium text-gray-900 dark:text-white",
    desc3span: "text-sm w-24 font-medium text-gray-500 dark:text-gray-400",
    desc3p: "text-sm w-24 font-medium text-gray-500 dark:text-gray-400",
    link: "ms-auto w-32 text-sm font-medium text-primary-600 hover:underline dark:text-primary-500",
    bar: "bg-primary-600 h-2.5 rounded-sm dark:bg-primary-500"
  }
});
tv({
  slots: {
    base: "top-0 left-0 z-50 w-64 transition-transform bg-gray-50 dark:bg-gray-800",
    active: "flex items-center group-has-[ul]:ms-6 p-2 text-base font-normal text-gray-900 bg-gray-200 dark:bg-gray-700 rounded-sm dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700",
    nonactive: "flex items-center group-has-[ul]:ms-6 p-2 text-base font-normal text-gray-900 rounded-sm dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700",
    div: "overflow-y-auto px-3 py-4 bg-gray-50 dark:bg-gray-800",
    backdrop: "fixed top-0 start-0 z-40 w-full h-full"
  },
  variants: {
    position: {
      fixed: { base: "fixed" },
      absolute: { base: "absolute" },
      static: { base: "static" }
    },
    isOpen: {
      true: "block",
      false: "hidden"
    },
    breakpoint: {
      sm: { base: "sm:block" },
      md: { base: "md:block" },
      lg: { base: "lg:block" },
      xl: { base: "xl:block" },
      "2xl": { base: "2xl:block" }
    },
    alwaysOpen: {
      true: { base: "block" }
      // Always display the sidebar when alwaysOpen is true
    },
    backdrop: {
      true: { backdrop: "bg-gray-900 opacity-75" }
    }
  },
  compoundVariants: [
    // When alwaysOpen is true, override the breakpoint display classes
    {
      alwaysOpen: true,
      class: {
        base: "!block"
      }
    }
  ]
});
tv({
  slots: {
    base: "inline-flex items-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600",
    svg: "h-6 w-6 m-2"
  },
  variants: {
    breakpoint: {
      sm: "sm:hidden",
      md: "md:hidden",
      lg: "lg:hidden",
      xl: "xl:hidden",
      "2xl": "2xl:hidden"
    }
  }
});
tv({
  slots: {
    base: "flex items-center ps-2.5 mb-5",
    img: "h-6 me-3 sm:h-7",
    span: "self-center text-xl font-semibold whitespace-nowrap dark:text-white"
  }
});
tv({
  slots: {
    base: "p-4 mt-6 bg-primary-50 rounded-lg dark:bg-primary-900",
    div: "flex items-center mb-3",
    span: "bg-primary-100 text-primary-800 text-sm font-semibold me-2 px-2.5 py-0.5 rounded-sm dark:bg-primary-200 dark:text-primary-900"
  }
});
tv({
  slots: {
    base: "group",
    btn: "flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-sm transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
    span: "flex-1 ms-3 text-left whitespace-nowrap",
    svg: "h-3 w-3 text-gray-800 dark:text-white",
    ul: "py-2 space-y-0"
  }
});
tv({
  slots: {
    base: "p-4 rounded-sm border border-gray-200 shadow-sm animate-pulse md:p-6 dark:border-gray-700",
    area: "mb-4 flex h-48 items-center justify-center rounded-sm bg-gray-300 dark:bg-gray-700",
    icon: "text-gray-200 dark:text-gray-600",
    line: "rounded-full bg-gray-200 dark:bg-gray-700",
    footer: "mt-4 flex items-center space-x-3 rtl:space-x-reverse"
  },
  variants: {
    size: {
      sm: { base: "max-w-sm" },
      md: { base: "max-w-md" },
      lg: { base: "max-w-lg" },
      xl: { base: "max-w-xl" },
      "2xl": { base: "max-w-2xl" }
    }
  }
});
tv({
  slots: {
    base: "space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center",
    image: "flex w-full items-center justify-center rounded-sm bg-gray-300 sm:w-96 dark:bg-gray-700",
    svg: "text-gray-200",
    content: "w-full",
    line: "rounded-full bg-gray-200 dark:bg-gray-700"
  },
  variants: {
    size: {
      sm: {
        image: "h-32",
        content: "space-y-2"
      },
      md: {
        image: "h-48",
        content: "space-y-3"
      },
      lg: {
        image: "h-64",
        content: "space-y-4"
      }
    },
    rounded: {
      none: {
        image: "rounded-none",
        line: "rounded-none"
      },
      sm: {
        image: "rounded-xs",
        line: "rounded-xs"
      },
      md: {
        image: "rounded-sm",
        line: "rounded-sm"
      },
      lg: {
        image: "rounded-lg",
        line: "rounded-lg"
      },
      full: {
        image: "rounded-full",
        line: "rounded-full"
      }
    }
  }
});
tv({
  slots: {
    base: "p-4 space-y-4 max-w-md rounded-sm border border-gray-200 divide-y divide-gray-200 shadow-sm animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700",
    item: "flex items-center justify-between",
    content: "",
    title: "mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600",
    subTitle: "h-2 w-32 rounded-full bg-gray-200 dark:bg-gray-700",
    extra: "h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700"
  },
  variants: {
    size: {
      sm: {
        base: "p-3 space-y-3 max-w-sm md:p-4",
        title: "mb-2 h-2 w-20",
        subTitle: "h-1.5 w-28",
        extra: "h-2 w-10"
      },
      md: {},
      // default size
      lg: {
        base: "p-5 space-y-5 max-w-lg md:p-7",
        title: "mb-3 h-3 w-28",
        subTitle: "h-2.5 w-36",
        extra: "h-3 w-14"
      }
    },
    rounded: {
      none: { base: "rounded-none" },
      sm: { base: "rounded-xs" },
      md: { base: "rounded-sm" },
      lg: { base: "rounded-lg" },
      full: { base: "rounded-full p-8 md:p-16" }
    }
  }
});
tv({
  slots: {
    wrapper: "animate-pulse",
    line: "rounded-full bg-gray-200 dark:bg-gray-700"
  },
  variants: {
    size: {
      sm: {
        wrapper: "max-w-sm"
      },
      md: {
        wrapper: "max-w-md"
      },
      lg: {
        wrapper: "max-w-lg"
      },
      xl: {
        wrapper: "max-w-xl"
      },
      "2xl": {
        wrapper: "max-w-2xl"
      }
    }
  }
});
tv({
  slots: {
    base: "animate-pulse",
    lineA: "rounded-full bg-gray-200 dark:bg-gray-700",
    lineB: "rounded-full bg-gray-300 dark:bg-gray-700",
    svg: "me-2 h-10 w-10 text-gray-200 dark:text-gray-700",
    content: "mt-4 flex items-center justify-center"
  }
});
tv({
  slots: {
    base: "space-y-2.5 animate-pulse",
    div: "flex items-center space-x-2 rtl:space-x-reverse",
    lineA: "rounded-full bg-gray-200 dark:bg-gray-700",
    lineB: "rounded-full bg-gray-300 dark:bg-gray-600"
  },
  variants: {
    size: {
      sm: { base: "max-w-sm" },
      md: { base: "max-w-md" },
      lg: { base: "max-w-lg" },
      xl: { base: "max-w-xl" },
      "2xl": { base: "max-w-2xl" }
    }
  }
});
tv({
  base: "flex justify-center items-center h-56 bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700",
  variants: {
    size: {
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
      xl: "max-w-xl",
      "2xl": "max-w-2xl"
    }
  }
});
tv({
  slots: {
    base: "p-4 max-w-sm rounded-sm border border-gray-200 shadow-sm animate-pulse md:p-6 dark:border-gray-700",
    wrapper: "mt-4 flex items-baseline space-x-6 rtl:space-x-reverse",
    hLine: "rounded-full bg-gray-200 dark:bg-gray-700",
    vLine: "w-full rounded-t-lg bg-gray-200 dark:bg-gray-700"
  }
});
tv({
  slots: {
    base: "group bg-transparent",
    popper: "flex items-center gap-2 bg-transparent text-inherit"
  },
  variants: {
    vertical: {
      true: { popper: "flex-col" }
    }
  },
  defaultVariants: {
    vertical: false
  }
});
tv({
  slots: {
    base: "w-[52px] h-[52px] shadow-xs p-0",
    span: "mb-px text-xs font-medium"
  },
  variants: {
    noTooltip: {
      false: {},
      true: {}
    },
    textOutside: {
      true: {
        base: "relative",
        span: "absolute -start-12 top-1/2 mb-px text-sm font-medium -translate-y-1/2"
      }
    }
  },
  compoundVariants: [{ noTooltip: true, textOutside: false, class: { base: "flex flex-col" } }],
  defaultVariants: {}
});
tv({
  base: "px-3 py-2 rounded-lg text-sm z-50 pointer-events-none",
  variants: {
    type: {
      light: "bg-white text-gray-800 dark:bg-white dark:text-gray-800 border border-gray-200 dark:border-gray-200",
      auto: "bg-white text-gray-800 dark:bg-gray-800 dark:text-white border border-gray-200 dark:border-gray-700",
      dark: "bg-gray-800 text-white dark:bg-gray-800 dark:text-white dark:border dark:border-gray-700",
      custom: ""
    },
    color: {
      // default: "bg-gray-800 dark:bg-gray-300 dark:text-gray-800",
      primary: "bg-primary-600 dark:bg-primary-600",
      secondary: "bg-secondary-600 dark:bg-secondary-600",
      gray: "bg-gray-600 dark:bg-gray-600",
      red: "bg-red-600 dark:bg-red-600",
      orange: "bg-orange-600 dark:bg-orange-600",
      amber: "bg-amber-600 dark:bg-amber-600",
      yellow: "bg-yellow-400 dark:bg-yellow-400",
      lime: "bg-lime-600 dark:bg-lime-600",
      green: "bg-green-600 dark:bg-green-600",
      emerald: "bg-emerald-600 dark:bg-emerald-600",
      teal: "bg-teal-600 dark:bg-teal-600",
      cyan: "bg-cyan-600 dark:bg-cyan-600",
      sky: "bg-sky-600 dark:bg-sky-600",
      blue: "bg-blue-600 dark:bg-blue-600",
      indigo: "bg-indigo-600 dark:bg-indigo-600",
      violet: "bg-violet-600 dark:bg-violet-600",
      purple: "bg-purple-600 dark:bg-purple-600",
      fuchsia: "bg-fuchsia-600 dark:bg-fuchsia-600",
      pink: "bg-pink-600 dark:bg-pink-600",
      rose: "bg-rose-800 dark:bg-rose-800"
    }
  },
  compoundVariants: [
    {
      color: ["primary", "secondary", "gray", "red", "orange", "amber", "yellow", "lime", "green", "emerald", "teal", "cyan", "sky", "blue", "indigo", "violet", "purple", "fuchsia", "pink", "rose"],
      class: "border-0 dark:border-0"
    }
  ],
  defaultVariants: {
    type: "dark",
    color: void 0
  }
});
const spinner = tv({
  base: "inline-block",
  variants: {
    type: {
      default: "animate-spin",
      dots: "inline-flex items-center justify-center",
      bars: "inline-flex items-center justify-center",
      pulse: "animate-pulse",
      orbit: ""
    },
    color: {
      primary: "fill-primary-600 text-gray-300",
      secondary: "fill-secondary-600 text-gray-300",
      gray: "fill-gray-600 dark:fill-gray-300 text-gray-300",
      red: "fill-red-600 text-gray-300",
      orange: "fill-orange-500 text-gray-300",
      amber: "fill-amber-500 text-gray-300",
      yellow: "fill-yellow-400 text-gray-300",
      lime: "fill-lime-500 text-gray-300",
      green: "fill-green-500 text-gray-300",
      emerald: "fill-emerald-500 text-gray-300",
      teal: "fill-teal-500 text-gray-300",
      cyan: "fill-cyan-500 text-gray-300",
      sky: "fill-sky-500 text-gray-300",
      blue: "fill-blue-600 text-gray-300",
      indigo: "fill-indigo-600 text-gray-300",
      violet: "fill-violet-600 text-gray-300",
      purple: "fill-purple-600 text-gray-300",
      fuchsia: "fill-fuchsia-600 text-gray-300",
      pink: "fill-pink-600 text-gray-300",
      rose: "fill-rose-600 text-gray-300"
    },
    size: {
      "4": "w-4 h-4",
      "5": "w-5 h-5",
      "6": "w-6 h-6",
      "8": "w-8 h-8",
      "10": "w-10 h-10",
      "12": "w-12 h-12",
      "16": "w-16 h-16"
    }
  },
  defaultVariants: {
    type: "default",
    color: "primary",
    size: "8"
  }
});
function Spinner($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      type = "default",
      color = "primary",
      size = "8",
      class: className,
      currentFill = "inherit",
      currentColor = "currentColor",
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const theme = getTheme("spinner");
    let spinnerClass = spinner({ type, color, size, class: clsx$1(theme, className) });
    if (type === "default") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<svg${attributes(
        {
          ...restProps,
          role: "status",
          class: clsx(spinnerClass),
          viewBox: "0 0 100 101",
          fill: "none"
        },
        void 0,
        void 0,
        void 0,
        3
      )}><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"${attr("fill", currentColor)}></path><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"${attr("fill", currentFill)}></path></svg>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (type === "dots") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<svg${attributes(
          {
            ...restProps,
            role: "status",
            class: clsx(spinnerClass),
            viewBox: "0 0 120 30",
            fill: "currentColor"
          },
          void 0,
          void 0,
          void 0,
          3
        )}><circle cx="15" cy="15" r="15"><animate attributeName="r" values="15;9;15" dur="0.8s" repeatCount="indefinite"></animate><animate attributeName="fill-opacity" values="1;.5;1" dur="0.8s" repeatCount="indefinite"></animate></circle><circle cx="60" cy="15" r="9" fill-opacity="0.3"><animate attributeName="r" values="9;15;9" dur="0.8s" begin="0.2s" repeatCount="indefinite"></animate><animate attributeName="fill-opacity" values=".5;1;.5" dur="0.8s" begin="0.2s" repeatCount="indefinite"></animate></circle><circle cx="105" cy="15" r="15"><animate attributeName="r" values="15;9;15" dur="0.8s" begin="0.4s" repeatCount="indefinite"></animate><animate attributeName="fill-opacity" values="1;.5;1" dur="0.8s" begin="0.4s" repeatCount="indefinite"></animate></circle></svg>`);
      } else {
        $$renderer2.push("<!--[!-->");
        if (type === "bars") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<svg${attributes(
            {
              ...restProps,
              role: "status",
              class: clsx(spinnerClass),
              viewBox: "0 0 135 140",
              fill: "currentColor"
            },
            void 0,
            void 0,
            void 0,
            3
          )}><rect y="10" width="15" height="120" rx="6"><animate attributeName="height" values="120;60;120" dur="1.2s" repeatCount="indefinite"></animate><animate attributeName="y" values="10;40;10" dur="1.2s" repeatCount="indefinite"></animate></rect><rect x="30" y="10" width="15" height="120" rx="6"><animate attributeName="height" values="120;60;120" dur="1.2s" begin="0.2s" repeatCount="indefinite"></animate><animate attributeName="y" values="10;40;10" dur="1.2s" begin="0.2s" repeatCount="indefinite"></animate></rect><rect x="60" y="10" width="15" height="120" rx="6"><animate attributeName="height" values="120;60;120" dur="1.2s" begin="0.4s" repeatCount="indefinite"></animate><animate attributeName="y" values="10;40;10" dur="1.2s" begin="0.4s" repeatCount="indefinite"></animate></rect></svg>`);
        } else {
          $$renderer2.push("<!--[!-->");
          if (type === "pulse") {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<svg${attributes(
              {
                ...restProps,
                role: "status",
                class: clsx(spinnerClass),
                viewBox: "0 0 100 100"
              },
              void 0,
              void 0,
              void 0,
              3
            )}><circle cx="50" cy="50" r="8"${attr("fill", currentFill)}><animate attributeName="r" values="8;45" dur="1.5s" repeatCount="indefinite"></animate><animate attributeName="opacity" values="0.9;0" dur="1.5s" repeatCount="indefinite"></animate></circle><circle cx="50" cy="50" r="8"${attr("fill", currentFill)}><animate attributeName="r" values="8;45" begin="0.5s" dur="1.5s" repeatCount="indefinite"></animate><animate attributeName="opacity" values="0.9;0" begin="0.5s" dur="1.5s" repeatCount="indefinite"></animate></circle><circle cx="50" cy="50" r="8"${attr("fill", currentFill)}><animate attributeName="r" values="8;45" begin="1s" dur="1.5s" repeatCount="indefinite"></animate><animate attributeName="opacity" values="0.9;0" begin="1s" dur="1.5s" repeatCount="indefinite"></animate></circle></svg>`);
          } else {
            $$renderer2.push("<!--[!-->");
            if (type === "orbit") {
              $$renderer2.push("<!--[-->");
              $$renderer2.push(`<svg${attributes(
                {
                  ...restProps,
                  role: "status",
                  class: clsx(spinnerClass),
                  viewBox: "0 0 100 100",
                  fill: "currentColor"
                },
                void 0,
                void 0,
                void 0,
                3
              )}><g><circle cx="50" cy="20" r="8"></circle><circle cx="73.66" cy="65" r="8"></circle><circle cx="26.34" cy="65" r="8"></circle><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="1.2s" repeatCount="indefinite"></animateTransform></g></svg>`);
            } else {
              $$renderer2.push("<!--[!-->");
            }
            $$renderer2.push(`<!--]-->`);
          }
          $$renderer2.push(`<!--]-->`);
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
tv({
  slots: {
    base: "flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base",
    item: "flex items-center",
    content: "flex items-center"
  },
  variants: {
    status: {
      completed: {
        item: "text-primary-600 dark:text-primary-500 md:w-full sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700",
        content: "after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500"
      },
      current: {
        item: "md:w-full sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700",
        content: "after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500"
      },
      pending: {
        item: "md:w-full sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700",
        content: "after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500"
      }
    },
    isLast: {
      true: {
        item: "after:content-none after:hidden",
        content: "after:content-none"
      },
      false: {}
    }
  },
  defaultVariants: {
    status: "pending",
    isLast: false
  }
});
tv({
  slots: {
    base: "flex items-center w-full",
    item: "flex items-center w-full",
    circle: "flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0"
  },
  variants: {
    status: {
      completed: {
        item: "text-primary-600 dark:text-primary-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-primary-100 after:border-4 after:inline-block dark:after:border-primary-800",
        circle: "bg-primary-100 dark:bg-primary-800"
      },
      current: {
        item: "after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700",
        circle: "bg-gray-100 dark:bg-gray-700"
      },
      pending: {
        item: "after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700",
        circle: "bg-gray-100 dark:bg-gray-700"
      }
    },
    isLast: {
      true: {
        item: "after:content-none"
      },
      false: {}
    }
  },
  defaultVariants: {
    status: "pending",
    isLast: false
  }
});
tv({
  slots: {
    base: "items-center w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse",
    item: "flex items-center space-x-2.5 rtl:space-x-reverse",
    indicator: "flex items-center justify-center w-8 h-8 rounded-full shrink-0"
  },
  variants: {
    status: {
      completed: {
        item: "text-primary-600 dark:text-primary-500",
        indicator: "border border-primary-600 dark:border-primary-500 bg-primary-600 dark:bg-primary-500 text-white"
      },
      current: {
        item: "text-gray-500 dark:text-gray-400",
        indicator: "border border-gray-500 dark:border-gray-400 text-gray-500 dark:text-gray-400"
      },
      pending: {
        item: "text-gray-500 dark:text-gray-400",
        indicator: "border border-gray-500 dark:border-gray-400 text-gray-500 dark:text-gray-400"
      }
    }
  },
  defaultVariants: {
    status: "pending"
  }
});
tv({
  slots: {
    base: "space-y-4 w-72",
    card: "w-full p-4 border rounded-lg",
    content: "flex items-center justify-between"
  },
  variants: {
    status: {
      completed: {
        card: "text-green-700 border-green-300 bg-green-50 dark:bg-gray-800 dark:border-green-800 dark:text-green-400"
      },
      current: {
        card: "text-primary-700 bg-primary-100 border-primary-300 dark:bg-gray-800 dark:border-primary-800 dark:text-primary-400"
      },
      pending: {
        card: "text-gray-900 bg-gray-100 border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
      }
    }
  },
  defaultVariants: {
    status: "pending"
  }
});
tv({
  slots: {
    base: "flex items-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-xs dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4 rtl:space-x-reverse",
    item: "flex items-center",
    indicator: "flex items-center justify-center w-5 h-5 me-2 text-xs rounded-full shrink-0"
  },
  variants: {
    status: {
      completed: {
        item: "text-primary-600 dark:text-primary-500",
        indicator: "border border-primary-600 dark:border-primary-500 bg-primary-600 dark:bg-primary-500 text-white"
      },
      current: {
        item: "text-gray-500 dark:text-gray-400",
        indicator: "border border-gray-500 dark:border-gray-400 text-gray-500 dark:text-gray-400"
      },
      pending: {
        item: "text-gray-500 dark:text-gray-400",
        indicator: "border border-gray-500 dark:border-gray-400 text-gray-500 dark:text-gray-400"
      }
    },
    hasChevron: {
      true: {},
      false: {}
    }
  },
  defaultVariants: {
    status: "pending",
    hasChevron: false
  }
});
tv({
  slots: {
    base: "relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400",
    item: "ms-6",
    circle: "absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900"
  },
  variants: {
    status: {
      completed: {
        circle: "bg-green-200 dark:bg-green-900"
      },
      current: {
        circle: "bg-gray-100 dark:bg-gray-700"
      },
      pending: {
        circle: "bg-gray-100 dark:bg-gray-700"
      }
    },
    isLast: {
      true: {},
      false: {
        item: "mb-10"
      }
    }
  },
  defaultVariants: {
    status: "pending",
    isLast: false
  }
});
const table = tv({
  slots: {
    div: "relative overflow-x-auto",
    table: "w-full text-left text-sm"
  },
  variants: {
    color: {
      // default, primary, secondary, gray, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose
      default: { table: "text-gray-500 dark:text-gray-400" },
      primary: { table: "text-primary-100 dark:text-primary-100" },
      secondary: { table: "text-secondary-100 dark:text-secondary-100" },
      gray: { table: "text-gray-100 dark:text-gray-100" },
      red: { table: "text-red-100 dark:text-red-100" },
      orange: { table: "text-orange-100 dark:text-orange-100" },
      amber: { table: "text-amber-100 dark:text-amber-100" },
      yellow: { table: "text-yellow-100 dark:text-yellow-100" },
      lime: { table: "text-lime-100 dark:text-lime-100" },
      green: { table: "text-green-100 dark:text-green-100" },
      emerald: { table: "text-emerald-100 dark:text-emerald-100" },
      teal: { table: "text-teal-100 dark:text-teal-100" },
      cyan: { table: "text-cyan-100 dark:text-cyan-100" },
      sky: { table: "text-sky-100 dark:text-sky-100" },
      blue: { table: "text-blue-100 dark:text-blue-100" },
      indigo: { table: "text-indigo-100 dark:text-indigo-100" },
      violet: { table: "text-violet-100 dark:text-violet-100" },
      purple: { table: "text-purple-100 dark:text-purple-100" },
      fuchsia: { table: "text-fuchsia-100 dark:text-fuchsia-100" },
      pink: { table: "text-pink-100 dark:text-pink-100" },
      rose: { table: "text-rose-100 dark:text-rose-100" }
    },
    shadow: {
      true: { div: "shadow-md sm:rounded-lg" }
    }
  }
});
const tableBodyRow = tv({
  base: "",
  variants: {
    color: {
      default: "bg-white dark:bg-gray-800 dark:border-gray-700",
      primary: "bg-white bg-primary-500 border-primary-400",
      secondary: "bg-white bg-secondary-500 border-secondary-400",
      gray: "bg-gray-500 border-gray-400",
      red: "bg-red-500 border-red-400",
      orange: "bg-orange-500 border-orange-400",
      amber: "bg-amber-500 border-amber-400",
      yellow: "bg-yellow-500 border-yellow-400",
      lime: "bg-lime-500 border-lime-400",
      green: "bg-white bg-green-500 border-green-400",
      emerald: "bg-emerald-500 border-emerald-400",
      teal: "bg-teal-500 border-teal-400",
      cyan: "bg-cyan-500 border-cyan-400",
      sky: "bg-sky-500 border-sky-400",
      blue: "bg-white bg-blue-500 border-blue-400",
      indigo: "bg-indigo-500 border-indigo-400",
      violet: "bg-violet-500 border-violet-400",
      purple: "bg-purple-500 border-purple-400",
      fuchsia: "bg-fuchsia-500 border-fuchsia-400",
      pink: "bg-pink-500 border-pink-400",
      rose: "bg-rose-500 border-rose-400"
    },
    hoverable: {
      true: ""
    },
    striped: {
      true: ""
    },
    border: {
      true: "border-b last:border-b-0"
    }
  },
  compoundVariants: [
    {
      hoverable: true,
      color: "default",
      class: "hover:bg-gray-50 dark:hover:bg-gray-600"
    },
    {
      hoverable: true,
      color: "primary",
      class: "hover:bg-primary-400 dark:hover:bg-primary-400"
    },
    {
      hoverable: true,
      color: "secondary",
      class: "hover:bg-secondary-400 dark:hover:bg-secondary-400"
    },
    {
      hoverable: true,
      color: "gray",
      class: "hover:bg-gray-400 dark:hover:bg-gray-400"
    },
    {
      hoverable: true,
      color: "red",
      class: "hover:bg-red-400 dark:hover:bg-red-400"
    },
    {
      hoverable: true,
      color: "orange",
      class: "hover:bg-orange-400 dark:hover:bg-orange-400"
    },
    {
      hoverable: true,
      color: "amber",
      class: "hover:bg-amber-400 dark:hover:bg-amber-400"
    },
    {
      hoverable: true,
      color: "yellow",
      class: "hover:bg-yellow-400 dark:hover:bg-yellow-400"
    },
    {
      hoverable: true,
      color: "lime",
      class: "hover:bg-lime-400 dark:hover:bg-lime-400"
    },
    {
      hoverable: true,
      color: "green",
      class: "hover:bg-green-400 dark:hover:bg-green-400"
    },
    {
      hoverable: true,
      color: "emerald",
      class: "hover:bg-emerald-400 dark:hover:bg-emerald-400"
    },
    {
      hoverable: true,
      color: "teal",
      class: "hover:bg-teal-400 dark:hover:bg-teal-400"
    },
    {
      hoverable: true,
      color: "cyan",
      class: "hover:bg-cyan-400 dark:hover:bg-cyan-400"
    },
    {
      hoverable: true,
      color: "sky",
      class: "hover:bg-sky-400 dark:hover:bg-sky-400"
    },
    {
      hoverable: true,
      color: "blue",
      class: "hover:bg-blue-400 dark:hover:bg-blue-400"
    },
    {
      hoverable: true,
      color: "indigo",
      class: "hover:bg-indigo-400 dark:hover:bg-indigo-400"
    },
    {
      hoverable: true,
      color: "violet",
      class: "hover:bg-violet-400 dark:hover:bg-violet-400"
    },
    {
      hoverable: true,
      color: "purple",
      class: "hover:bg-purple-400 dark:hover:bg-purple-400"
    },
    {
      hoverable: true,
      color: "fuchsia",
      class: "hover:bg-fuchsia-400 dark:hover:bg-fuchsia-400"
    },
    {
      hoverable: true,
      color: "pink",
      class: "hover:bg-pink-400 dark:hover:bg-pink-400"
    },
    {
      hoverable: true,
      color: "rose",
      class: "hover:bg-rose-400 dark:hover:bg-rose-400"
    },
    {
      striped: true,
      color: "default",
      class: "odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-700"
    },
    {
      striped: true,
      color: "primary",
      class: "odd:bg-primary-500 even:bg-primary-600 dark:odd:bg-primary-500 dark:even:bg-primary-600"
    },
    {
      striped: true,
      color: "secondary",
      class: "odd:bg-secondary-500 even:bg-secondary-600 dark:odd:bg-secondary-500 dark:even:bg-secondary-600"
    },
    {
      striped: true,
      color: "gray",
      class: "odd:bg-gray-500 even:bg-gray-600 dark:odd:bg-gray-500 dark:even:bg-gray-600"
    },
    // default, primary, secondary, gray, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose
    {
      striped: true,
      color: "red",
      class: "odd:bg-red-500 even:bg-red-600 dark:odd:bg-red-500 dark:even:bg-red-600"
    },
    {
      striped: true,
      color: "orange",
      class: "odd:bg-orange-500 even:bg-orange-600 dark:odd:bg-orange-500 dark:even:bg-orange-600"
    },
    {
      striped: true,
      color: "amber",
      class: "odd:bg-amber-500 even:bg-amber-600 dark:odd:bg-amber-500 dark:even:bg-amber-600"
    },
    {
      striped: true,
      color: "yellow",
      class: "odd:bg-yellow-500 even:bg-yellow-600 dark:odd:bg-yellow-500 dark:even:bg-yellow-600"
    },
    {
      striped: true,
      color: "lime",
      class: "odd:bg-lime-500 even:bg-lime-600 dark:odd:bg-lime-500 dark:even:bg-lime-600"
    },
    {
      striped: true,
      color: "green",
      class: "odd:bg-green-500 even:bg-green-600 dark:odd:bg-green-500 dark:even:bg-green-600"
    },
    {
      striped: true,
      color: "emerald",
      class: "odd:bg-emerald-500 even:bg-emerald-600 dark:odd:bg-emerald-500 dark:even:bg-emerald-600"
    },
    {
      striped: true,
      color: "teal",
      class: "odd:bg-teal-500 even:bg-teal-600 dark:odd:bg-teal-500 dark:even:bg-teal-600"
    },
    {
      striped: true,
      color: "cyan",
      class: "odd:bg-cyan-500 even:bg-cyan-600 dark:odd:bg-cyan-500 dark:even:bg-cyan-600"
    },
    {
      striped: true,
      color: "sky",
      class: "odd:bg-sky-500 even:bg-sky-600 dark:odd:bg-sky-500 dark:even:bg-sky-600"
    },
    {
      striped: true,
      color: "blue",
      class: "odd:bg-blue-500 even:bg-blue-600 dark:odd:bg-blue-500 dark:even:bg-blue-600"
    },
    {
      striped: true,
      color: "indigo",
      class: "odd:bg-indigo-500 even:bg-indigo-600 dark:odd:bg-indigo-500 dark:even:bg-indigo-600"
    },
    {
      striped: true,
      color: "violet",
      class: "odd:bg-violet-500 even:bg-violet-600 dark:odd:bg-violet-500 dark:even:bg-violet-600"
    },
    {
      striped: true,
      color: "purple",
      class: "odd:bg-purple-500 even:bg-purple-600 dark:odd:bg-purple-500 dark:even:bg-purple-600"
    },
    {
      striped: true,
      color: "fuchsia",
      class: "odd:bg-fuchsia-500 even:bg-fuchsia-600 dark:odd:bg-fuchsia-500 dark:even:bg-fuchsia-600"
    },
    {
      striped: true,
      color: "pink",
      class: "odd:bg-pink-500 even:bg-pink-600 dark:odd:bg-pink-500 dark:even:bg-pink-600"
    },
    {
      striped: true,
      color: "rose",
      class: "odd:bg-rose-500 even:bg-rose-600 dark:odd:bg-rose-500 dark:even:bg-rose-600"
    }
  ]
});
const tableHead = tv({
  base: "text-xs uppercase",
  variants: {
    color: {
      // default, primary, secondary, gray, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose
      default: "text-gray-700 dark:text-gray-400 bg-gray-50 dark:bg-gray-700",
      primary: "text-white dark:text-white bg-primary-700 dark:bg-primary-700",
      secondary: "text-white dark:text-white bg-secondary-700 dark:bg-secondary-700",
      gray: "text-white dark:text-white bg-gray-700 dark:bg-gray-700",
      red: "text-white dark:text-white bg-red-700 dark:bg-red-700",
      orange: "text-white dark:text-white bg-orange-700 dark:bg-orange-700",
      amber: "text-white dark:text-white bg-amber-700 dark:bg-amber-700",
      yellow: "text-white dark:text-white bg-yellow-700 dark:bg-yellow-700",
      lime: "text-white dark:text-white bg-lime-700 dark:bg-lime-700",
      green: "text-white dark:text-white bg-green-700 dark:bg-green-700",
      emerald: "text-white dark:text-white bg-emerald-700 dark:bg-emerald-700",
      teal: "text-white dark:text-white bg-teal-700 dark:bg-teal-700",
      cyan: "text-white dark:text-white bg-cyan-700 dark:bg-cyan-700",
      sky: "text-white dark:text-white bg-sky-700 dark:bg-sky-700",
      blue: "text-white dark:text-white bg-blue-700 dark:bg-blue-700",
      indigo: "text-white dark:text-white bg-indigo-700 dark:bg-indigo-700",
      violet: "text-white dark:text-white bg-violet-700 dark:bg-violet-700",
      purple: "text-white dark:text-white bg-purple-700 dark:bg-purple-700",
      fuchsia: "text-white dark:text-white bg-fuchsia-700 dark:bg-fuchsia-700",
      pink: "text-white dark:text-white bg-pink-700 dark:bg-pink-700",
      rose: "text-white dark:text-white bg-rose-700 dark:bg-rose-700"
    },
    border: {
      true: "",
      false: ""
    },
    striped: {
      true: "",
      false: ""
    }
  },
  compoundVariants: [
    {
      color: "default",
      border: true,
      class: ""
      //"bg-transparent dark:bg-transparent"
    },
    {
      color: "default",
      striped: true,
      class: ""
      //"bg-transparent dark:bg-transparent border-gray-700"
    },
    {
      striped: true,
      color: "blue",
      class: "border-blue-400"
    },
    {
      striped: true,
      color: "green",
      class: "border-green-400"
    },
    {
      striped: true,
      color: "red",
      class: "border-red-400"
    },
    {
      striped: true,
      color: "yellow",
      class: "border-yellow-400"
    },
    {
      striped: true,
      color: "purple",
      class: "border-purple-400"
    },
    {
      striped: true,
      color: "indigo",
      class: "border-indigo-400"
    },
    {
      striped: true,
      color: "pink",
      class: "border-pink-400"
    }
  ]
});
const tableBodyCell = tv({
  base: "px-6 py-4 whitespace-nowrap font-medium"
});
const tableHeadCell = tv({
  base: "px-6 py-3"
});
tv({
  slots: {
    root: "relative overflow-x-auto shadow-md sm:rounded-lg",
    inner: "p-4",
    search: "relative mt-1",
    svgDiv: "absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none",
    svg: "w-5 h-5",
    input: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 ps-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
    table: "w-full text-left text-sm"
  },
  variants: {
    color: {
      default: {
        svg: "text-gray-500 dark:text-gray-400",
        table: "text-gray-500 dark:text-gray-400"
      },
      blue: {
        svg: "text-blue-500 dark:text-blue-400",
        table: "text-blue-100 dark:text-blue-100"
      },
      green: {
        svg: "text-green-500 dark:text-green-400",
        table: "text-green-100 dark:text-green-100"
      },
      red: {
        svg: "text-red-500 dark:text-red-400",
        table: "text-red-100 dark:text-red-100"
      },
      yellow: {
        svg: "text-yellow-500 dark:text-yellow-400",
        table: "text-yellow-100 dark:text-yellow-100"
      },
      purple: {
        svg: "text-purple-500 dark:text-purple-400",
        table: "text-purple-100 dark:text-purple-100"
      },
      indigo: {
        svg: "text-indigo-500 dark:text-indigo-400",
        table: "text-indigo-100 dark:text-indigo-100"
      },
      pink: {
        svg: "text-pink-500 dark:text-pink-400",
        table: "text-pink-100 dark:text-pink-100"
      }
    },
    striped: {
      true: {
        table: "[&_tbody_tr:nth-child(odd)]:bg-white [&_tbody_tr:nth-child(odd)]:dark:bg-gray-900 [&_tbody_tr:nth-child(even)]:bg-gray-50 [&_tbody_tr:nth-child(even)]:dark:bg-gray-800"
      },
      false: {}
    },
    hoverable: {
      true: {
        table: "[&_tbody_tr]:hover:bg-gray-50 [&_tbody_tr]:dark:hover:bg-gray-600"
      },
      false: {}
    }
  },
  defaultVariants: {
    color: "default",
    striped: false,
    hoverable: false
  }
});
function TableHeadCell($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { children, class: className, $$slots, $$events, ...restProps } = $$props;
    const theme = getTheme("tableHeadCell");
    $$renderer2.push(`<th${attributes({
      ...restProps,
      class: clsx(tableHeadCell({ class: clsx$1(theme, className) }))
    })}>`);
    if (children) {
      $$renderer2.push("<!--[-->");
      children($$renderer2);
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></th>`);
  });
}
function TableHead($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      children,
      headerSlot,
      color,
      striped,
      border,
      class: className,
      headItems,
      defaultRow = true,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const theme = getTheme("tableHead");
    const tableCtx = getContext("tableCtx");
    let compoColor = color ? color : tableCtx.color || "default";
    let compoStriped = striped ? striped : tableCtx.striped || false;
    let compoBorder = border ? border : tableCtx.border || false;
    const base = tableHead({
      color: compoColor,
      border: compoBorder,
      striped: compoStriped,
      class: clsx$1(theme, className)
    });
    function getItemText(item) {
      if (typeof item === "object" && "text" in item) {
        return item.text;
      }
      return String(item);
    }
    $$renderer2.push(`<thead${attributes({ ...restProps, class: clsx(base) })}>`);
    if (headItems) {
      $$renderer2.push("<!--[-->");
      if (headerSlot) {
        $$renderer2.push("<!--[-->");
        headerSlot($$renderer2);
        $$renderer2.push(`<!---->`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <tr><!--[-->`);
      const each_array = ensure_array_like(headItems);
      for (let i = 0, $$length = each_array.length; i < $$length; i++) {
        let item = each_array[i];
        TableHeadCell($$renderer2, {
          children: ($$renderer3) => {
            $$renderer3.push(`<!---->${escape_html(getItemText(item))}`);
          },
          $$slots: { default: true }
        });
      }
      $$renderer2.push(`<!--]--></tr>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (children) {
        $$renderer2.push("<!--[-->");
        if (defaultRow) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<tr>`);
          children($$renderer2);
          $$renderer2.push(`<!----></tr>`);
        } else {
          $$renderer2.push("<!--[!-->");
          children($$renderer2);
          $$renderer2.push(`<!---->`);
        }
        $$renderer2.push(`<!--]-->`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></thead>`);
  });
}
function TableBodyRow($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      children,
      class: className,
      color,
      striped,
      hoverable,
      border,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const theme = getTheme("tableBodyRow");
    const tableCtx = getContext("tableCtx");
    let compoColor = color || tableCtx.color || "default";
    let compoHoverable = hoverable || tableCtx.hoverable || false;
    let compoStriped = striped || tableCtx.striped || false;
    let compoBorder = border || tableCtx.border || false;
    const base = tableBodyRow({
      color: compoColor,
      hoverable: compoHoverable,
      striped: compoStriped,
      border: compoBorder,
      class: clsx$1(theme, className)
    });
    $$renderer2.push(`<tr${attributes({ ...restProps, class: clsx(base) })}>`);
    if (children) {
      $$renderer2.push("<!--[-->");
      children($$renderer2);
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></tr>`);
  });
}
function TableBodyCell($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      children,
      class: className,
      colspan,
      onclick,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const theme = getTheme("tableBodyCell");
    $$renderer2.push(`<td${attributes({
      ...restProps,
      class: clsx(tableBodyCell({ class: clsx$1(theme, className) })),
      colspan: colspan ?? 1
    })}>`);
    if (onclick) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<button>`);
      if (children) {
        $$renderer2.push("<!--[-->");
        children($$renderer2);
        $$renderer2.push(`<!---->`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></button>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (children) {
        $$renderer2.push("<!--[-->");
        children($$renderer2);
        $$renderer2.push(`<!---->`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></td>`);
  });
}
function TableBody($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      children,
      bodyItems,
      class: className,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    function getCellValues(row) {
      if (Array.isArray(row)) {
        return row;
      } else {
        return Object.values(row);
      }
    }
    $$renderer2.push(`<tbody${attributes({ ...restProps, class: clsx(clsx$1(className)) })}>`);
    if (bodyItems) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<!--[-->`);
      const each_array = ensure_array_like(bodyItems);
      for (let i = 0, $$length = each_array.length; i < $$length; i++) {
        let row = each_array[i];
        TableBodyRow($$renderer2, {
          children: ($$renderer3) => {
            $$renderer3.push(`<!--[-->`);
            const each_array_1 = ensure_array_like(getCellValues(row));
            for (let j = 0, $$length2 = each_array_1.length; j < $$length2; j++) {
              let cellValue = each_array_1[j];
              TableBodyCell($$renderer3, {
                children: ($$renderer4) => {
                  $$renderer4.push(`<!---->${escape_html(cellValue ?? "")}`);
                },
                $$slots: { default: true }
              });
            }
            $$renderer3.push(`<!--]-->`);
          },
          $$slots: { default: true }
        });
      }
      $$renderer2.push(`<!--]-->`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (children) {
        $$renderer2.push("<!--[-->");
        children($$renderer2);
        $$renderer2.push(`<!---->`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></tbody>`);
  });
}
function Table($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      children,
      footerSlot,
      captionSlot,
      items,
      divClass,
      striped,
      hoverable,
      border = true,
      shadow,
      color = "default",
      class: className,
      classes,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const styling = classes ?? { div: divClass };
    const theme = getTheme("table");
    const { div, table: table$1 } = table({ color, shadow });
    let tableCtx = {
      get striped() {
        return striped;
      },
      get hoverable() {
        return hoverable;
      },
      get border() {
        return border;
      },
      get color() {
        return color;
      }
    };
    setContext("tableCtx", tableCtx);
    let headItems = items && items.length > 0 ? Object.keys(items[0]).map((key) => ({ text: key.charAt(0).toUpperCase() + key.slice(1) })) : [];
    let bodyItems = items && items.length > 0 ? items.map((item) => Object.values(item)) : [];
    $$renderer2.push(`<div${attr_class(clsx(div({ class: clsx$1(theme?.div, styling.div) })))}><table${attributes({
      ...restProps,
      class: clsx(table$1({ class: clsx$1(theme?.table, className) }))
    })}>`);
    if (captionSlot) {
      $$renderer2.push("<!--[-->");
      captionSlot($$renderer2);
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    if (items && items.length > 0) {
      $$renderer2.push("<!--[-->");
      TableHead($$renderer2, { headItems });
      $$renderer2.push(`<!----> `);
      TableBody($$renderer2, { bodyItems });
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (children) {
        $$renderer2.push("<!--[-->");
        children($$renderer2);
        $$renderer2.push(`<!---->`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]-->`);
    if (footerSlot) {
      $$renderer2.push("<!--[-->");
      footerSlot($$renderer2);
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></table></div>`);
  });
}
tv({
  slots: {
    base: "flex space-x-2 rtl:space-x-reverse",
    content: "p-4 bg-gray-50 rounded-lg dark:bg-gray-800 mt-4",
    divider: "h-px bg-gray-200 dark:bg-gray-700",
    active: "p-4 text-primary-600 bg-gray-100 rounded-t-lg dark:bg-gray-800 dark:text-primary-500",
    inactive: "p-4 text-gray-500 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
  },
  variants: {
    tabStyle: {
      full: {
        active: "p-4 w-full rounded-none group-first:rounded-s-lg group-last:rounded-e-lg text-gray-900 bg-gray-100 focus:ring-4 focus:ring-primary-300 focus:outline-hidden dark:bg-gray-700 dark:text-white",
        inactive: "p-4 w-full rounded-none group-first:rounded-s-lg group-last:rounded-e-lg text-gray-500 dark:text-gray-400 bg-white hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-primary-300 focus:outline-hidden dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
      },
      pill: {
        active: "py-3 px-4 text-white bg-primary-600 rounded-lg",
        inactive: "py-3 px-4 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
      },
      underline: {
        base: "-mb-px",
        active: "p-4 text-primary-600 border-b-2 border-primary-600 dark:text-primary-500 dark:border-primary-500 bg-transparent",
        inactive: "p-4 border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 text-gray-500 dark:text-gray-400 bg-transparent"
      },
      none: {
        active: "",
        inactive: ""
      }
    },
    hasDivider: {
      true: {}
    }
  },
  compoundVariants: [
    {
      tabStyle: ["full", "pill"],
      hasDivider: true,
      class: {
        divider: "hidden"
      }
    }
  ],
  defaultVariants: {
    tabStyle: "none",
    hasDivider: true
  }
});
tv({
  slots: {
    base: "group focus-within:z-10",
    button: "inline-block text-sm font-medium text-center disabled:cursor-not-allowed"
  },
  variants: {
    open: {
      true: {
        button: "active"
      }
    },
    disabled: {
      true: {
        button: "cursor-not-allowed"
      }
    }
  },
  compoundVariants: [
    {
      open: true,
      class: {
        button: ""
        // We'll merge this with activeClasses from context
      }
    },
    {
      open: false,
      class: {
        button: ""
        // We'll merge this with inactiveClasses from context
      }
    }
  ],
  defaultVariants: {
    open: false,
    disabled: false
  }
});
tv({
  base: "relative border-s border-gray-200 dark:border-gray-700"
});
tv({
  slots: {
    li: "mb-10 ms-6",
    span: "flex absolute -start-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900",
    img: "rounded-full shadow-lg",
    outer: "p-4 bg-white rounded-lg border border-gray-200 shadow-xs dark:bg-gray-700 dark:border-gray-600",
    inner: "justify-between items-center mb-3 sm:flex",
    time: "mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0",
    title: "text-sm font-normal text-gray-500 lex dark:text-gray-300",
    text: "p-3 text-xs italic font-normal text-gray-500 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-300"
  }
});
tv({
  slots: {
    div: "p-5 mb-4 bg-gray-50 rounded-lg border border-gray-100 dark:bg-gray-800 dark:border-gray-700",
    time: "text-lg font-semibold text-gray-900 dark:text-white",
    ol: "mt-3 divide-y divider-gray-200 dark:divide-gray-700"
  }
});
tv({
  slots: {
    base: "",
    a: "block items-center p-3 sm:flex hover:bg-gray-100 dark:hover:bg-gray-700",
    img: "me-3 mb-3 w-12 h-12 rounded-full sm:mb-0",
    div: "text-gray-600 dark:text-gray-400",
    title: "text-base font-normal",
    span: "inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400",
    svg: "me-1 h-3 w-3"
  }
});
const colorVariants = {
  primary: {
    dot: "bg-primary-200 dark:bg-primary-900",
    ring: "ring-white dark:ring-gray-900",
    icon: "text-primary-600 dark:text-primary-400"
  },
  green: {
    dot: "bg-green-200 dark:bg-green-900",
    ring: "ring-white dark:ring-gray-900",
    icon: "text-green-600 dark:text-green-400"
  },
  orange: {
    dot: "bg-orange-200 dark:bg-orange-900",
    ring: "ring-white dark:ring-gray-900",
    icon: "text-orange-600 dark:text-orange-400"
  },
  red: {
    dot: "bg-red-200 dark:bg-red-900",
    ring: "ring-white dark:ring-gray-900",
    icon: "text-red-600 dark:text-red-400"
  },
  blue: {
    dot: "bg-blue-200 dark:bg-blue-900",
    ring: "ring-white dark:ring-gray-900",
    icon: "text-blue-600 dark:text-blue-400"
  },
  purple: {
    dot: "bg-purple-200 dark:bg-purple-900",
    ring: "ring-white dark:ring-gray-900",
    icon: "text-purple-600 dark:text-purple-400"
  },
  gray: {
    dot: "bg-gray-200 dark:bg-gray-700",
    ring: "ring-white dark:ring-gray-900",
    icon: "text-gray-600 dark:text-gray-400"
  }
};
tv({
  variants: {
    order: {
      group: "p-5 mb-4 bg-gray-50 rounded-lg border border-gray-100 dark:bg-gray-800 dark:border-gray-700",
      horizontal: "sm:flex",
      activity: "relative",
      vertical: "relative",
      default: "relative border-s border-gray-200 dark:border-gray-700"
    }
  },
  defaultVariants: {
    order: "default"
  }
});
tv({
  slots: {
    base: "relative",
    div: "",
    time: "",
    h3: "",
    svg: "w-4 h-4",
    connector: "absolute top-6 left-3 w-px h-full"
  },
  variants: {
    order: {
      default: {
        base: "mb-10 ms-4",
        div: "absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700",
        time: "mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500",
        h3: "text-lg font-semibold text-gray-900 dark:text-white"
      },
      vertical: {
        base: "mb-10 ms-6 relative",
        div: "flex absolute -left-4 top-1.5 justify-center items-center w-6 h-6 rounded-full ring-8",
        time: "mb-1 pl-4 text-sm font-normal leading-none text-gray-400 dark:text-gray-500",
        h3: "flex ml-4 items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white",
        connector: "absolute top-7 -left-1.5 w-px h-full"
      },
      horizontal: {
        base: "relative mb-6 sm:mb-0",
        div: "flex items-center",
        time: "mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500",
        h3: "text-lg font-semibold text-gray-900 dark:text-white"
      },
      activity: {
        base: "mb-10 ms-6 relative",
        div: "flex absolute -left-4 top-1.5 justify-center items-center w-6 h-6 rounded-full ring-8",
        time: "mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500",
        h3: "text-lg font-semibold text-gray-900 dark:text-white",
        connector: "absolute top-7 -left-4 w-px h-full"
      },
      group: {
        base: "",
        div: "p-5 mb-4 bg-gray-50 rounded-lg border border-gray-100 dark:bg-gray-800 dark:border-gray-700",
        time: "text-lg font-semibold text-gray-900 dark:text-white",
        h3: "text-lg font-semibold text-gray-900 dark:text-white"
      }
    },
    color: {
      primary: {},
      green: {},
      orange: {},
      red: {},
      blue: {},
      purple: {},
      gray: {}
    },
    isLast: {
      true: {},
      false: {}
    }
  },
  compoundVariants: [
    // Vertical color variants
    {
      order: "vertical",
      color: "primary",
      class: {
        div: colorVariants.primary.dot + " " + colorVariants.primary.ring,
        svg: colorVariants.primary.icon,
        connector: "bg-primary-200 dark:bg-primary-700"
      }
    },
    {
      order: "vertical",
      color: "green",
      class: {
        div: colorVariants.green.dot + " " + colorVariants.green.ring,
        svg: colorVariants.green.icon,
        connector: "bg-green-200 dark:bg-green-700"
      }
    },
    {
      order: "vertical",
      color: "orange",
      class: {
        div: colorVariants.orange.dot + " " + colorVariants.orange.ring,
        svg: colorVariants.orange.icon,
        connector: "bg-orange-200 dark:bg-orange-700"
      }
    },
    {
      order: "vertical",
      color: "red",
      class: {
        div: colorVariants.red.dot + " " + colorVariants.red.ring,
        svg: colorVariants.red.icon,
        connector: "bg-red-200 dark:bg-red-700"
      }
    },
    {
      order: "vertical",
      color: "blue",
      class: {
        div: colorVariants.blue.dot + " " + colorVariants.blue.ring,
        svg: colorVariants.blue.icon,
        connector: "bg-blue-200 dark:bg-blue-700"
      }
    },
    {
      order: "vertical",
      color: "purple",
      class: {
        div: colorVariants.purple.dot + " " + colorVariants.purple.ring,
        svg: colorVariants.purple.icon,
        connector: "bg-purple-200 dark:bg-purple-700"
      }
    },
    {
      order: "vertical",
      color: "gray",
      class: {
        div: colorVariants.gray.dot + " " + colorVariants.gray.ring,
        svg: colorVariants.gray.icon,
        connector: "bg-gray-200 dark:bg-gray-700"
      }
    },
    // Horizontal color variants
    {
      order: "horizontal",
      color: "primary",
      class: {
        div: colorVariants.primary.dot + " " + colorVariants.primary.ring,
        svg: colorVariants.primary.icon
      }
    },
    {
      order: "horizontal",
      color: "green",
      class: {
        div: colorVariants.green.dot + " " + colorVariants.green.ring,
        svg: colorVariants.green.icon
      }
    },
    {
      order: "horizontal",
      color: "orange",
      class: {
        div: colorVariants.orange.dot + " " + colorVariants.orange.ring,
        svg: colorVariants.orange.icon
      }
    },
    {
      order: "horizontal",
      color: "red",
      class: {
        div: colorVariants.red.dot + " " + colorVariants.red.ring,
        svg: colorVariants.red.icon
      }
    },
    {
      order: "horizontal",
      color: "blue",
      class: {
        div: colorVariants.blue.dot + " " + colorVariants.blue.ring,
        svg: colorVariants.blue.icon
      }
    },
    {
      order: "horizontal",
      color: "purple",
      class: {
        div: colorVariants.purple.dot + " " + colorVariants.purple.ring,
        svg: colorVariants.purple.icon
      }
    },
    {
      order: "horizontal",
      color: "gray",
      class: {
        div: colorVariants.gray.dot + " " + colorVariants.gray.ring,
        svg: colorVariants.gray.icon
      }
    },
    // Hide connector on last item
    {
      isLast: true,
      class: {
        connector: "hidden"
      }
    }
  ],
  defaultVariants: {
    order: "default",
    color: "primary",
    isLast: false
  }
});
tv({
  slots: {
    base: "flex w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow-sm dark:text-gray-400 dark:bg-gray-800 gap-3",
    icon: "w-8 h-8 inline-flex items-center justify-center shrink-0 rounded-lg",
    content: "w-full text-sm font-normal",
    close: "ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
  },
  variants: {
    position: {
      "top-left": { base: "absolute top-5 start-5" },
      "top-right": { base: "absolute top-5 end-5" },
      "bottom-left": { base: "absolute bottom-5 start-5" },
      "bottom-right": { base: "absolute bottom-5 end-5" }
    },
    color: {
      // primary, gray, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose
      primary: {
        icon: "text-primary-500 bg-primary-100 dark:bg-primary-800 dark:text-primary-200",
        close: "text-primary-500 dark:text-primary-200 hover:text-primary-600 dark:hover:text-primary-500"
      },
      gray: {
        icon: "text-gray-500 bg-gray-100 dark:bg-gray-700 dark:text-gray-200",
        close: "text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-500"
      },
      red: {
        icon: "text-red-500 bg-red-100 dark:bg-red-800 dark:text-red-200",
        close: "text-red-500 dark:text-red-200 hover:text-red-600 dark:hover:text-red-500"
      },
      orange: {
        icon: "text-orange-500 bg-orange-100 dark:bg-orange-700 dark:text-orange-200",
        close: "text-orange-500 dark:text-orange-200 hover:text-orange-600 dark:hover:text-orange-500"
      },
      amber: {
        icon: "text-amber-500 bg-amber-100 dark:bg-amber-700 dark:text-amber-200",
        close: "text-amber-500 dark:text-amber-200 hover:text-amber-600 dark:hover:text-amber-500"
      },
      yellow: {
        icon: "text-yellow-500 bg-yellow-100 dark:bg-yellow-800 dark:text-yellow-200",
        close: "text-yellow-500 dark:text-yellow-200 hover:text-yellow-600 dark:hover:text-yellow-500"
      },
      lime: {
        icon: "text-lime-500 bg-lime-100 dark:bg-lime-700 dark:text-lime-200",
        close: "text-lime-500 dark:text-lime-200 hover:text-lime-600 dark:hover:text-lime-500"
      },
      green: {
        icon: "text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-200",
        close: "text-green-500 dark:text-green-200 hover:text-green-600 dark:hover:text-green-500"
      },
      emerald: {
        icon: "text-emerald-500 bg-emerald-100 dark:bg-emerald-800 dark:text-emerald-200",
        close: "text-emerald-500 dark:text-emerald-200 hover:text-emerald-600 dark:hover:text-emerald-500"
      },
      teal: {
        icon: "text-teal-500 bg-teal-100 dark:bg-teal-800 dark:text-teal-200",
        close: "text-teal-500 dark:text-teal-200 hover:text-teal-600 dark:hover:text-teal-500"
      },
      cyan: {
        icon: "text-cyan-500 bg-cyan-100 dark:bg-cyan-800 dark:text-cyan-200",
        close: "text-cyan-500 dark:text-cyan-200 hover:text-cyan-600 dark:hover:text-cyan-500"
      },
      sky: {
        icon: "text-sky-500 bg-sky-100 dark:bg-sky-800 dark:text-sky-200",
        close: "text-sky-500 dark:text-sky-200 hover:text-sky-600 dark:hover:text-sky-500"
      },
      blue: {
        icon: "text-blue-500 bg-blue-100 dark:bg-blue-800 dark:text-blue-200",
        close: "text-blue-500 dark:text-blue-200 hover:text-blue-600 dark:hover:text-blue-500"
      },
      indigo: {
        icon: "text-indigo-500 bg-indigo-100 dark:bg-indigo-800 dark:text-indigo-200",
        close: "text-indigo-500 dark:text-indigo-200 hover:text-indigo-600 dark:hover:text-indigo-500"
      },
      violet: {
        icon: "text-violet-500 bg-violet-100 dark:bg-violet-800 dark:text-violet-200",
        close: "text-violet-500 dark:text-violet-200 hover:text-violet-600 dark:hover:text-violet-500"
      },
      purple: {
        icon: "text-purple-500 bg-purple-100 dark:bg-purple-800 dark:text-purple-200",
        close: "text-purple-500 dark:text-purple-200 hover:text-purple-600 dark:hover:text-purple-500"
      },
      fuchsia: {
        icon: "text-fuchsia-500 bg-fuchsia-100 dark:bg-fuchsia-800 dark:text-fuchsia-200",
        close: "text-fuchsia-500 dark:text-fuchsia-200 hover:text-fuchsia-600 dark:hover:text-fuchsia-500"
      },
      pink: {
        icon: "text-pink-500 bg-pink-100 dark:bg-pink-700 dark:text-pink-200",
        close: "text-pink-500 dark:text-pink-200 hover:text-pink-600 dark:hover:text-pink-500"
      },
      rose: {
        icon: "text-rose-500 bg-rose-100 dark:bg-rose-700 dark:text-rose-200",
        close: "text-rose-500 dark:text-rose-200 hover:text-rose-600 dark:hover:text-rose-500"
      }
    },
    align: {
      true: { base: "items-center" },
      false: { base: "items-start" }
    }
  }
});
tv({
  base: "fixed z-50 space-y-3"
});
tv({
  slots: {
    base: "w-4 h-4 bg-gray-100 border-gray-300 dark:ring-offset-gray-800 focus:ring-2 me-2 rounded-sm",
    div: "flex items-center"
  },
  variants: {
    color: {
      // primary, secondary, gray, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose
      primary: {
        base: "text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600"
      },
      secondary: {
        base: "text-secondary-600 focus:ring-secondary-500 dark:focus:ring-secondary-600"
      },
      gray: {
        base: "text-gray-600 focus:ring-gray-600 dark:ring-offset-gray-800 dark:focus:ring-gray-600"
      },
      red: {
        base: "text-red-600 focus:ring-red-600 dark:ring-offset-red-600 dark:focus:ring-red-600"
      },
      orange: {
        base: "text-orange-600 focus:ring-orange-600 dark:ring-offset-orange-600 dark:focus:ring-orange-600"
      },
      amber: {
        base: "text-amber-600 focus:ring-amber-600 dark:ring-offset-amber-600 dark:focus:ring-amber-600"
      },
      yellow: {
        base: "text-yellow-400 focus:ring-yellow-400 dark:ring-offset-yellow-400 dark:focus:ring-yellow-400"
      },
      lime: {
        base: "text-lime-700 focus:ring-lime-700 dark:ring-offset-lime-700 dark:focus:ring-lime-700"
      },
      green: {
        base: "text-green-600 focus:ring-green-600 dark:ring-offset-green-600 dark:focus:ring-green-600"
      },
      emerald: {
        base: "text-emerald-600 focus:ring-emerald-600 dark:ring-offset-emerald-600 dark:focus:ring-emerald-600"
      },
      teal: {
        base: "text-teal-600 focus:ring-teal-600 dark:ring-offset-teal-600 dark:focus:ring-teal-600"
      },
      cyan: {
        base: "text-cyan-600 focus:ring-cyan-600 dark:ring-offset-cyan-600 dark:focus:ring-cyan-600"
      },
      sky: {
        base: "text-sky-600 focus:ring-sky-600 dark:ring-offset-sky-600 dark:focus:ring-sky-600"
      },
      blue: {
        base: "text-blue-700 focus:ring-blue-600 dark:ring-offset-blue-700 dark:focus:ring-blue-700"
      },
      indigo: {
        base: "text-indigo-700 focus:ring-indigo-700 dark:ring-offset-indigo-700 dark:focus:ring-indigo-700"
      },
      violet: {
        base: "text-violet-600 focus:ring-violet-600 dark:ring-offset-violet-600 dark:focus:ring-violet-600"
      },
      purple: {
        base: "text-purple-600 focus:ring-purple-600 dark:ring-offset-purple-600 dark:focus:ring-purple-600"
      },
      fuchsia: {
        base: "text-fuchsia-600 focus:ring-fuchsia-600 dark:ring-offset-fuchsia-600 dark:focus:ring-fuchsia-600"
      },
      pink: {
        base: "text-pink-600 focus:ring-pink-600 dark:ring-offset-pink-600 dark:focus:ring-pink-600"
      },
      rose: {
        base: "text-rose-600 focus:ring-rose-600 dark:ring-offset-rose-600 dark:focus:ring-rose-600"
      }
    },
    tinted: {
      true: { base: "dark:bg-gray-600 dark:border-gray-500" },
      false: { base: "dark:bg-gray-700 dark:border-gray-600" }
    },
    custom: {
      true: { base: "sr-only peer" }
    },
    rounded: {
      true: { base: "rounded-sm" }
    },
    inline: {
      true: {
        div: "inline-flex",
        false: "flex items-center"
      }
    },
    disabled: {
      true: {
        base: "cursor-not-allowed opacity-50 bg-gray-200 border-gray-300",
        div: "cursor-not-allowed opacity-70"
      },
      false: {}
    }
  },
  defaultVariants: {
    color: "primary",
    disabled: false
  }
});
tv({
  base: "",
  variants: {
    inline: {
      true: "inline-flex",
      false: "flex"
    },
    checked: {
      true: "outline-4 outline-green-500"
    }
  },
  defaultVariants: {
    inline: true
  }
});
const label = tv({
  base: "text-sm rtl:text-right font-medium block",
  variants: {
    color: {
      disabled: "text-gray-500 dark:text-gray-500",
      primary: "text-primary-700 dark:text-primary-500",
      secondary: "text-secondary-700 dark:text-secondary-500",
      green: "text-green-700 dark:text-green-500",
      emerald: "text-emerald-700 dark:text-emerald-500",
      red: "text-red-700 dark:text-red-500",
      blue: "text-blue-700 dark:text-blue-500",
      yellow: "text-yellow-700 dark:text-yellow-500",
      orange: "text-orange-700 dark:text-orange-500",
      gray: "text-gray-700 dark:text-gray-200",
      teal: "text-teal-700 dark:text-teal-500",
      cyan: "text-cyan-700 dark:text-cyan-500",
      sky: "text-sky-700 dark:text-sky-500",
      indigo: "text-indigo-700 dark:text-indigo-500",
      lime: "text-lime-700 dark:text-lime-500",
      amber: "text-amber-700 dark:text-amber-500",
      violet: "text-violet-700 dark:text-violet-500",
      purple: "text-purple-700 dark:text-purple-500",
      fuchsia: "text-fuchsia-700 dark:text-fuchsia-500",
      pink: "text-pink-700 dark:text-pink-500",
      rose: "text-rose-700 dark:text-rose-500"
    }
  }
});
function Label($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      children,
      color = "gray",
      show = true,
      class: className,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const theme = getTheme("label");
    let base = label({ color, class: clsx$1(theme, className) });
    if (show) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<label${attributes({ ...restProps, class: clsx(base) })}>`);
      children($$renderer2);
      $$renderer2.push(`<!----></label>`);
    } else {
      $$renderer2.push("<!--[!-->");
      children($$renderer2);
      $$renderer2.push(`<!---->`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
tv({
  base: "flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
});
tv({
  slots: {
    base: "block w-full disabled:cursor-not-allowed disabled:opacity-50 rtl:text-right p-2.5 focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500 bg-gray-50 text-gray-900 dark:bg-gray-700 dark:placeholder-gray-400 border-gray-300 dark:border-gray-600 text-sm rounded-lg border p-0! dark:text-gray-400",
    wrapper: "relative w-full",
    close: "flex absolute inset-y-0 items-center text-gray-500 dark:text-gray-400 end-0 p-2.5",
    svg: ""
  },
  variants: {
    size: {
      sm: { base: "text-xs ps-9 pe-9 p-2" },
      md: { base: "text-sm ps-10 pe-10 p-2.5" },
      lg: { base: "sm:text-base ps-11 pe-11 p-3" }
    }
  }
});
tv({
  slots: {
    base: "relative",
    input: "block w-full text-sm text-gray-900 bg-transparent appearance-none dark:text-white focus:outline-hidden focus:ring-0 peer disabled:cursor-not-allowed disabled:opacity-50",
    label: "absolute text-sm duration-300 transform scale-75 z-10 origin-left rtl:origin-right peer-placeholder-shown:scale-100 peer-focus:scale-75",
    close: "absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black",
    combo: "absolute top-full right-0 left-0 z-10 mt-1 max-h-60 overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800",
    svg: ""
  },
  variants: {
    variant: {
      filled: {
        base: "relative",
        input: "rounded-t-lg border-0 border-b-2 bg-gray-50 dark:bg-gray-700",
        label: "-translate-y-4 start-2.5 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-4"
      },
      outlined: {
        base: "relative",
        input: "rounded-lg border",
        label: "-translate-y-4 bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 start-1"
      },
      standard: {
        base: "relative z-0",
        input: "border-0 border-b-2",
        label: "-translate-y-6 -z-10 peer-focus:start-0 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6"
      }
    },
    size: {
      small: {},
      default: {}
    },
    color: {
      default: {
        input: "border-gray-300 dark:border-gray-600 dark:focus:border-primary-500 focus:border-primary-600",
        label: "text-gray-500 dark:text-gray-400 peer-focus:text-primary-600 dark:peer-focus:text-primary-500"
      },
      primary: {
        input: "border-gray-300 dark:border-gray-600 dark:focus:border-primary-500 focus:border-primary-600",
        label: "text-primary-500 dark:text-primary-400 peer-focus:text-primary-600 dark:peer-focus:text-primary-500"
      },
      secondary: {
        input: "border-gray-300 dark:border-gray-600 dark:focus:border-secondary-500 focus:border-secondary-600",
        label: "text-secondary-500 dark:text-secondary-400 peer-focus:text-secondary-600 dark:peer-focus:text-secondary-500"
      },
      gray: {
        input: "border-gray-300 dark:border-gray-600 dark:focus:border-gray-500 focus:border-gray-600",
        label: "text-gray-500 dark:text-gray-400 peer-focus:text-gray-600 dark:peer-focus:text-gray-500"
      },
      red: {
        input: "border-gray-300 dark:border-gray-600 dark:focus:border-red-500 focus:border-red-600",
        label: "text-red-500 dark:text-red-400 peer-focus:text-red-600 dark:peer-focus:text-red-500"
      },
      orange: {
        input: "border-gray-300 dark:border-gray-600 dark:focus:border-orange-500 focus:border-orange-600",
        label: "text-orange-500 dark:text-orange-400 peer-focus:text-orange-600 dark:peer-focus:text-orange-500"
      },
      amber: {
        input: "border-gray-300 dark:border-gray-600 dark:focus:border-amber-500 focus:border-amber-600",
        label: "text-amber-500 dark:text-amber-400 peer-focus:text-amber-600 dark:peer-focus:text-amber-500"
      },
      yellow: {
        input: "border-gray-300 dark:border-gray-600 dark:focus:border-yellow-500 focus:border-yellow-600",
        label: "text-yellow-500 dark:text-yellow-400 peer-focus:text-yellow-600 dark:peer-focus:text-yellow-500"
      },
      lime: {
        input: "border-gray-300 dark:border-gray-600 dark:focus:border-lime-500 focus:border-lime-600",
        label: "text-lime-500 dark:text-lime-400 peer-focus:text-lime-600 dark:peer-focus:text-lime-500"
      },
      green: {
        input: "border-gray-300 dark:border-gray-600 dark:focus:border-green-500 focus:border-green-600",
        label: "text-green-500 dark:text-green-400 peer-focus:text-green-600 dark:peer-focus:text-green-500"
      },
      emerald: {
        input: "border-gray-300 dark:border-gray-600 dark:focus:border-emerald-500 focus:border-emerald-600",
        label: "text-emerald-500 dark:text-emerald-400 peer-focus:text-emerald-600 dark:peer-focus:text-emerald-500"
      },
      teal: {
        input: "border-gray-300 dark:border-gray-600 dark:focus:border-teal-500 focus:border-teal-600",
        label: "text-teal-500 dark:text-teal-400 peer-focus:text-teal-600 dark:peer-focus:text-teal-500"
      },
      cyan: {
        input: "border-gray-300 dark:border-gray-600 dark:focus:border-cyan-500 focus:border-cyan-600",
        label: "text-cyan-500 dark:text-cyan-400 peer-focus:text-cyan-600 dark:peer-focus:text-cyan-500"
      },
      sky: {
        input: "border-gray-300 dark:border-gray-600 dark:focus:border-sky-500 focus:border-sky-600",
        label: "text-sky-500 dark:text-sky-400 peer-focus:text-sky-600 dark:peer-focus:text-sky-500"
      },
      blue: {
        input: "border-gray-300 dark:border-gray-600 dark:focus:border-blue-500 focus:border-blue-600",
        label: "text-blue-500 dark:text-blue-400 peer-focus:text-blue-600 dark:peer-focus:text-blue-500"
      },
      indigo: {
        input: "border-gray-300 dark:border-gray-600 dark:focus:border-indigo-500 focus:border-indigo-600",
        label: "text-indigo-500 dark:text-indigo-400 peer-focus:text-indigo-600 dark:peer-focus:text-indigo-500"
      },
      violet: {
        input: "border-gray-300 dark:border-gray-600 dark:focus:border-violet-500 focus:border-violet-600",
        label: "text-violet-600 dark:text-violet-500 peer-focus:text-violet-600 dark:peer-focus:text-violet-500"
      },
      purple: {
        input: "border-gray-300 dark:border-gray-600 dark:focus:border-purple-500 focus:border-purple-600",
        label: "text-purple-600 dark:text-purple-500 peer-focus:text-purple-600 dark:peer-focus:text-purple-500"
      },
      fuchsia: {
        input: "border-gray-300 dark:border-gray-600 dark:focus:border-fuchsia-500 focus:border-fuchsia-600",
        label: "text-fuchsia-600 dark:text-fuchsia-500 peer-focus:text-fuchsia-600 dark:peer-focus:text-fuchsia-500"
      },
      pink: {
        input: "border-gray-300 dark:border-gray-600 dark:focus:border-pink-500 focus:border-pink-600",
        label: "text-pink-600 dark:text-pink-500 peer-focus:text-pink-600 dark:peer-focus:text-pink-500"
      },
      rose: {
        input: "border-gray-300 dark:border-gray-600 dark:focus:border-rose-500 focus:border-rose-600",
        label: "text-rose-600 dark:text-rose-500 peer-focus:text-rose-600 dark:peer-focus:text-rose-500"
      }
    }
  },
  compoundVariants: [
    {
      variant: "filled",
      size: "small",
      class: {
        input: "px-2.5 pb-1.5 pt-4",
        label: "top-3"
      }
    },
    {
      variant: "filled",
      size: "default",
      class: {
        input: "px-2.5 pb-2.5 pt-5",
        label: "top-4"
      }
    },
    {
      variant: "outlined",
      size: "small",
      class: {
        input: "px-2.5 pb-1.5 pt-3",
        label: "top-1"
      }
    },
    {
      variant: "outlined",
      size: "default",
      class: {
        input: "px-2.5 pb-2.5 pt-4",
        label: "top-2"
      }
    },
    {
      variant: "standard",
      size: "small",
      class: {
        input: "py-2 px-0",
        label: "top-3"
      }
    },
    {
      variant: "standard",
      size: "default",
      class: {
        input: "py-2.5 px-0",
        label: "top-3"
      }
    },
    {
      variant: "filled",
      color: "primary",
      class: {
        input: "dark:focus:border-primary-500 focus:border-primary-600"
      }
    }
  ],
  defaultVariants: {
    variant: "standard",
    size: "default",
    color: "primary"
  }
});
tv({
  base: "text-xs font-normal text-gray-500 dark:text-gray-300",
  variants: {
    color: {
      disabled: "text-gray-400 dark:text-gray-500",
      primary: "text-primary-500 dark:text-primary-400",
      secondary: "text-secondary-500 dark:text-secondary-400",
      green: "text-green-500 dark:text-green-400",
      emerald: "text-emerald-500 dark:text-emerald-400",
      red: "text-red-500 dark:text-red-400",
      blue: "text-blue-500 dark:text-blue-400",
      yellow: "text-yellow-500 dark:text-yellow-400",
      orange: "text-orange-500 dark:text-orange-400",
      gray: "text-gray-500 dark:text-gray-400",
      teal: "text-teal-500 dark:text-teal-400",
      cyan: "text-cyan-500 dark:text-cyan-400",
      sky: "text-sky-500 dark:text-sky-400",
      indigo: "text-indigo-500 dark:text-indigo-400",
      lime: "text-lime-500 dark:text-lime-400",
      amber: "text-amber-500 dark:text-amber-400",
      violet: "text-violet-500 dark:text-violet-400",
      purple: "text-purple-500 dark:text-purple-400",
      fuchsia: "text-fuchsia-500 dark:text-fuchsia-400",
      pink: "text-pink-500 dark:text-pink-400",
      rose: "text-rose-500 dark:text-rose-400"
    }
  }
});
const input = tv({
  slots: {
    base: "relative w-full",
    input: "block w-full disabled:cursor-not-allowed disabled:opacity-50 rtl:text-right focus:outline-hidden",
    left: "flex absolute inset-y-0 items-center text-gray-500 dark:text-gray-400 pointer-events-none start-0 p-2.5",
    right: "flex absolute inset-y-0 items-center text-gray-500 dark:text-gray-400 end-0 p-2.5",
    close: "absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black",
    combo: "absolute top-full right-0 left-0 z-20 mt-1 max-h-60 overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800",
    comboItem: "text-gray-900 dark:text-gray-50",
    div: "",
    svg: ""
  },
  variants: {
    size: {
      sm: { input: "text-xs px-2 py-1" },
      md: { input: "text-sm px-2.5 py-2.5" },
      lg: { input: "sm:text-base px-3 py-3" }
    },
    color: {
      default: {
        input: "border border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500 bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
      },
      tinted: {
        input: "border border-gray-300 dark:border-gray-500 bg-gray-50 text-gray-900 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
      },
      primary: {
        input: "border border-primary-200 dark:border-primary-400 focus:ring-primary-500 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 bg-primary-50 text-primary-900 placeholder-primary-700 dark:text-primary-400 dark:placeholder-primary-500 dark:bg-gray-700"
      },
      secondary: {
        input: "border border-secondary-200 dark:border-secondary-400 focus:ring-secondary-500 focus:border-secondary-600 dark:focus:ring-secondary-500 dark:focus:border-secondary-500 bg-secondary-50 text-secondary-900 placeholder-secondary-700 dark:text-secondary-400 dark:placeholder-secondary-500 dark:bg-gray-700"
      },
      green: {
        input: "border border-green-200 dark:border-green-400 focus:ring-green-500 focus:border-green-600 dark:focus:ring-green-500 dark:focus:border-green-500 bg-green-50 text-green-900 placeholder-green-700 dark:text-green-400 dark:placeholder-green-500 dark:bg-gray-700"
      },
      emerald: {
        input: "border border-emerald-200 dark:border-emerald-400 focus:ring-emerald-500 focus:border-emerald-600 dark:focus:ring-emerald-500 dark:focus:border-emerald-500 bg-emerald-50 text-emerald-900 placeholder-emerald-700 dark:text-emerald-400 dark:placeholder-emerald-500 dark:bg-gray-700"
      },
      red: {
        input: "border border-red-200 dark:border-red-400 focus:ring-red-500 focus:border-red-600 dark:focus:ring-red-500 dark:focus:border-red-500 bg-red-50 text-red-900 placeholder-red-700 dark:text-red-400 dark:placeholder-red-500 dark:bg-gray-700"
      },
      blue: {
        input: "border border-blue-200 dark:border-blue-400 focus:ring-blue-500 focus:border-blue-600 dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-blue-50 text-blue-900 placeholder-blue-700 dark:text-blue-400 dark:placeholder-blue-500 dark:bg-gray-700"
      },
      yellow: {
        input: "border border-yellow-200 dark:border-yellow-400 focus:ring-yellow-500 focus:border-yellow-600 dark:focus:ring-yellow-500 dark:focus:border-yellow-500 bg-yellow-50 text-yellow-900 placeholder-yellow-700 dark:text-yellow-400 dark:placeholder-yellow-500 dark:bg-gray-700"
      },
      orange: {
        input: "border border-orange-200 dark:border-orange-400 focus:ring-orange-500 focus:border-orange-600 dark:focus:ring-orange-500 dark:focus:border-orange-500 bg-orange-50 text-orange-900 placeholder-orange-700 dark:text-orange-400 dark:placeholder-orange-500 dark:bg-gray-700"
      },
      gray: {
        input: "border border-gray-200 dark:border-gray-400 focus:ring-gray-500 focus:border-gray-600 dark:focus:ring-gray-500 dark:focus:border-gray-500 bg-gray-50 text-gray-900 placeholder-gray-700 dark:text-gray-400 dark:placeholder-gray-500 dark:bg-gray-700"
      },
      teal: {
        input: "border border-teal-200 dark:border-teal-400 focus:ring-teal-500 focus:border-teal-600 dark:focus:ring-teal-500 dark:focus:border-teal-500 bg-teal-50 text-teal-900 placeholder-teal-700 dark:text-teal-400 dark:placeholder-teal-500 dark:bg-gray-700"
      },
      cyan: {
        input: "border border-cyan-200 dark:border-cyan-400 focus:ring-cyan-500 focus:border-cyan-600 dark:focus:ring-cyan-500 dark:focus:border-cyan-500 bg-cyan-50 text-cyan-900 placeholder-cyan-700 dark:text-cyan-400 dark:placeholder-cyan-500 dark:bg-gray-700"
      },
      sky: {
        input: "border border-sky-200 dark:border-sky-400 focus:ring-sky-500 focus:border-sky-600 dark:focus:ring-sky-500 dark:focus:border-sky-500 bg-sky-50 text-sky-900 placeholder-sky-700 dark:text-sky-400 dark:placeholder-sky-500 dark:bg-gray-700"
      },
      indigo: {
        input: "border border-indigo-200 dark:border-indigo-400 focus:ring-indigo-500 focus:border-indigo-600 dark:focus:ring-indigo-500 dark:focus:border-indigo-500 bg-indigo-50 text-indigo-900 placeholder-indigo-700 dark:text-indigo-400 dark:placeholder-indigo-500 dark:bg-gray-700"
      },
      lime: {
        input: "border border-lime-200 dark:border-lime-400 focus:ring-lime-500 focus:border-lime-600 dark:focus:ring-lime-500 dark:focus:border-lime-500 bg-lime-50 text-lime-900 placeholder-lime-700 dark:text-lime-400 dark:placeholder-lime-500 dark:bg-gray-700"
      },
      amber: {
        input: "border border-amber-200 dark:border-amber-400 focus:ring-amber-500 focus:border-amber-600 dark:focus:ring-amber-500 dark:focus:border-amber-500 bg-amber-50 text-amber-900 placeholder-amber-700 dark:text-amber-400 dark:placeholder-amber-500 dark:bg-gray-700"
      },
      violet: {
        input: "border border-violet-200 dark:border-violet-400 focus:ring-violet-500 focus:border-violet-600 dark:focus:ring-violet-500 dark:focus:border-violet-500 bg-violet-50 text-violet-900 placeholder-violet-700 dark:text-violet-400 dark:placeholder-violet-500 dark:bg-gray-700"
      },
      purple: {
        input: "border border-purple-200 dark:border-purple-400 focus:ring-purple-500 focus:border-purple-600 dark:focus:ring-purple-500 dark:focus:border-purple-500 bg-purple-50 text-purple-900 placeholder-purple-700 dark:text-purple-400 dark:placeholder-purple-500 dark:bg-gray-700"
      },
      fuchsia: {
        input: "border border-fuchsia-200 dark:border-fuchsia-400 focus:ring-fuchsia-500 focus:border-fuchsia-600 dark:focus:ring-fuchsia-500 dark:focus:border-fuchsia-500 bg-fuchsia-50 text-fuchsia-900 placeholder-fuchsia-700 dark:text-fuchsia-400 dark:placeholder-fuchsia-500 dark:bg-gray-700"
      },
      pink: {
        input: "border border-pink-200 dark:border-pink-400 focus:ring-pink-500 focus:border-pink-600 dark:focus:ring-pink-500 dark:focus:border-pink-500 bg-pink-50 text-pink-900 placeholder-pink-700 dark:text-pink-400 dark:placeholder-pink-500 dark:bg-gray-700"
      },
      rose: {
        input: "border border-rose-200 dark:border-rose-400 focus:ring-rose-500 focus:border-rose-600 dark:focus:ring-rose-500 dark:focus:border-rose-500 bg-rose-50 text-rose-900 placeholder-rose-700 dark:text-rose-400 dark:placeholder-rose-500 dark:bg-gray-700"
      }
    },
    grouped: {
      false: { base: "rounded-lg", input: "rounded-lg" },
      true: {
        base: "first:rounded-s-lg last:rounded-e-lg not-first:-ms-px group",
        input: "group-first:rounded-s-lg group-last:rounded-e-lg group-not-first:-ms-px h-full"
      }
    }
  },
  defaultVariants: {
    size: "md",
    color: "default"
  }
});
function Input($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      children,
      left,
      right,
      value = void 0,
      elementRef = void 0,
      clearable = false,
      size,
      color = "default",
      class: className,
      classes,
      wrapperClass,
      leftClass,
      rightClass,
      divClass,
      clearableSvgClass,
      clearableColor = "none",
      clearableClass,
      clearableOnClick,
      data = [],
      maxSuggestions = 5,
      onSelect,
      comboClass,
      comboItemClass,
      onInput,
      onFocus,
      onBlur,
      onKeydown,
      oninput,
      onfocus,
      onblur,
      onkeydown,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const styling = classes ?? {
      left: leftClass,
      right: rightClass,
      div: divClass,
      svg: clearableSvgClass,
      close: clearableClass
    };
    const theme = getTheme("input");
    const isCombobox = Array.isArray(data) && data.length > 0;
    let background = getContext("background");
    let group = getContext("group");
    let isGroup = !!group;
    let _size = size || clampSize(group?.size) || "md";
    const _color = color === "default" && background ? "tinted" : color;
    const {
      base,
      input: inputCls,
      left: leftCls,
      right: rightCls,
      close,
      combo,
      comboItem
    } = input({ size: _size, color: _color, grouped: isGroup });
    const clearAll = () => {
      if (elementRef) {
        const input2 = elementRef;
        input2.value = "";
        value = "";
        setTimeout(
          () => {
            input2.focus();
          },
          100
        );
      }
      if (clearableOnClick) clearableOnClick();
    };
    createDismissableContext(clearAll);
    function inputContent($$renderer3, wrapped) {
      if (children) {
        $$renderer3.push("<!--[-->");
        children($$renderer3, { ...restProps, class: inputCls() });
        $$renderer3.push(`<!---->`);
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push(`<input${attributes(
          {
            ...restProps,
            value,
            class: clsx([
              wrapped || base(),
              inputCls({ class: clsx$1(theme?.input, className) })
            ])
          },
          void 0,
          void 0,
          void 0,
          4
        )}/> `);
        if (value !== void 0 && value !== "" && clearable) {
          $$renderer3.push("<!--[-->");
          CloseButton($$renderer3, {
            class: close({ class: clsx$1(theme?.close, styling.close) }),
            color: clearableColor,
            "aria-label": "Clear search value",
            svgClass: clsx$1(styling.svg)
          });
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]-->`);
      }
      $$renderer3.push(`<!--]-->`);
    }
    if (clearable) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div tabindex="-1" class="sr-only"></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (isCombobox || right || left || clearable) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div${attr_class(clsx(base({ class: clsx$1(theme?.base, styling.div) })))}>`);
      if (left) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div${attr_class(clsx(leftCls({ class: clsx$1(theme?.left, styling.left) })))}>`);
        left($$renderer2);
        $$renderer2.push(`<!----></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      inputContent($$renderer2, true);
      $$renderer2.push(`<!----> `);
      if (right) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div${attr_class(clsx(rightCls({ class: clsx$1(theme?.right, styling.right) })))}>`);
        right($$renderer2);
        $$renderer2.push(`<!----></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      inputContent($$renderer2, false);
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { value, elementRef });
  });
}
function clampSize(s) {
  return s && s === "xs" ? "sm" : s === "xl" ? "lg" : s;
}
tv({
  slots: {
    div: "absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none",
    svg: "w-4 h-4 text-gray-500 dark:text-gray-400",
    input: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 disabled:cursor-not-allowed disabled:opacity-50",
    span: "absolute start-0 bottom-3 text-gray-500 dark:text-gray-400",
    floatingInput: "block py-2.5 ps-6 pe-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary-500 focus:outline-none focus:ring-0 focus:border-primary-600 peer disabled:cursor-not-allowed disabled:opacity-50",
    label: "absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:start-6 peer-focus:start-0 peer-focus:text-primary-600 peer-focus:dark:text-primary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
  },
  variants: {
    phoneType: {
      default: {},
      floating: {
        svg: "w-4 h-4 rtl:rotate-[270deg]"
      },
      countryCode: {
        input: "rounded-none rounded-e-lg"
      },
      copy: {},
      advanced: {}
    },
    phoneIcon: {
      true: { input: "ps-10" },
      false: {}
    }
  }
});
const radio = tv({
  slots: {
    input: "flex items-center w-4 h-4 bg-gray-100 border-gray-300 dark:ring-offset-gray-800 focus:ring-2 mr-2",
    label: "flex items-center"
  },
  variants: {
    color: {
      // primary, secondary, gray, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose
      primary: {
        input: "text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600"
      },
      secondary: {
        input: "text-secondary-600 focus:ring-secondary-500 dark:focus:ring-secondary-600"
      },
      gray: {
        input: "text-gray-600 focus:ring-gray-500 dark:focus:ring-gray-600"
      },
      red: { input: "text-red-600 focus:ring-red-500 dark:focus:ring-red-600" },
      orange: {
        input: "text-orange-500 focus:ring-orange-500 dark:focus:ring-orange-600"
      },
      amber: {
        input: "text-amber-600 focus:ring-amber-500 dark:focus:ring-amber-600"
      },
      yellow: {
        input: "text-yellow-400 focus:ring-yellow-500 dark:focus:ring-yellow-600"
      },
      lime: {
        input: "text-lime-600 focus:ring-lime-500 dark:focus:ring-lime-600"
      },
      green: {
        input: "text-green-600 focus:ring-green-500 dark:focus:ring-green-600"
      },
      emerald: {
        input: "text-emerald-600 focus:ring-emerald-500 dark:focus:ring-emerald-600"
      },
      teal: {
        input: "text-teal-600 focus:ring-teal-500 dark:focus:ring-teal-600"
      },
      cyan: {
        input: "text-cyan-600 focus:ring-cyan-500 dark:focus:ring-cyan-600"
      },
      sky: { input: "text-sky-600 focus:ring-sky-500 dark:focus:ring-sky-600" },
      blue: {
        input: "text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600"
      },
      indigo: {
        input: "text-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600"
      },
      violet: {
        input: "text-violet-600 focus:ring-violet-500 dark:focus:ring-violet-600"
      },
      purple: {
        input: "text-purple-600 focus:ring-purple-500 dark:focus:ring-purple-600"
      },
      fuchsia: {
        input: "text-fuchsia-600 focus:ring-fuchsia-500 dark:focus:ring-fuchsia-600"
      },
      pink: {
        input: "text-pink-600 focus:ring-pink-500 dark:focus:ring-pink-600"
      },
      rose: {
        input: "text-rose-600 focus:ring-rose-500 dark:focus:ring-rose-600"
      }
    },
    tinted: {
      true: { input: "dark:bg-gray-600 dark:border-gray-500" },
      false: { input: "dark:bg-gray-700 dark:border-gray-600" }
    },
    custom: {
      true: { input: "sr-only peer" },
      false: { input: "relative" }
    },
    inline: {
      true: { label: "inline-flex" },
      false: { label: "flex" }
    }
  },
  defaultVariants: {
    color: "primary"
  }
});
tv({
  base: "",
  variants: {
    inline: {
      true: "inline-flex",
      false: "flex"
    }
  },
  defaultVariants: {
    inline: true
  }
});
function Radio($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      children,
      "aria-describedby": ariaDescribedby,
      inline = false,
      labelClass,
      color = "primary",
      custom = false,
      group = void 0,
      value = void 0,
      class: className,
      inputClass,
      classes,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const styling = classes ?? { label: labelClass };
    const theme = getTheme("radio");
    const { input: input2, label: label2 } = radio({ color, tinted: !!getContext("background"), custom, inline });
    Label($$renderer2, {
      class: label2({ class: clsx$1(theme?.label, styling.label) }),
      children: ($$renderer3) => {
        $$renderer3.push(`<input${attributes(
          {
            type: "radio",
            checked: group === value,
            value,
            "aria-describedby": ariaDescribedby,
            ...restProps,
            class: clsx(input2({ class: clsx$1(theme?.input, className ?? inputClass) }))
          },
          void 0,
          void 0,
          void 0,
          4
        )}/> `);
        children?.($$renderer3);
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
    bind_props($$props, { group, value });
  });
}
tv({
  base: "w-full bg-gray-200 rounded-lg cursor-pointer dark:bg-gray-700",
  variants: {
    size: {
      sm: "h-1 range-sm",
      md: "h-2",
      lg: "h-3 range-lg"
    },
    color: {
      // other colors do not work
      gray: "",
      red: "",
      blue: "",
      indigo: "",
      violet: "",
      purple: "",
      fuchsia: "",
      pink: "",
      rose: ""
    },
    appearance: {
      auto: "range accent-red-500",
      none: "appearance-none"
    }
  },
  compoundVariants: [
    {
      appearance: "auto",
      color: "gray",
      class: "accent-gray-500"
    },
    {
      appearance: "auto",
      color: "red",
      class: "accent-red-500"
    },
    {
      appearance: "auto",
      color: "blue",
      class: "accent-blue-500"
    },
    {
      appearance: "auto",
      color: "indigo",
      class: "accent-indigo-500"
    },
    {
      appearance: "auto",
      color: "violet",
      class: "accent-violet-500"
    },
    {
      appearance: "auto",
      color: "purple",
      class: "accent-purple-500"
    },
    {
      appearance: "auto",
      color: "fuchsia",
      class: "accent-fuchsia-500"
    },
    {
      appearance: "auto",
      color: "pink",
      class: "accent-pink-500"
    },
    {
      appearance: "auto",
      color: "rose",
      class: "accent-rose-500"
    }
  ]
});
tv({
  slots: {
    base: "relative w-full",
    left: "absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none",
    icon: "text-gray-500 dark:text-gray-400",
    content: "absolute inset-y-0 end-0 flex items-center text-gray-500 dark:text-gray-400",
    input: "block w-full text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 disabled:cursor-not-allowed disabled:opacity-50",
    close: "absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black",
    svg: ""
  },
  variants: {
    size: {
      sm: {
        input: "text-xs p-2 ps-9 pe-9 ",
        icon: "w-3 h-3"
        // leftDiv: 'ps-2.5',
      },
      md: {
        input: "text-sm p-2.5 ps-10 pe-10",
        icon: "w-4 h-4"
        // leftDiv: 'ps-10',
      },
      lg: {
        input: "sm:text-base p-3 ps-11 pe-11",
        icon: "w-6 h-6"
        // leftDiv: 'ps-11',
      }
    }
  },
  defaultVariants: {
    size: "lg"
  }
});
const select = tv({
  slots: {
    base: "relative w-full",
    select: "block w-full rtl:text-right",
    close: "absolute right-8 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black",
    svg: ""
  },
  variants: {
    underline: {
      true: {
        select: "text-gray-500 bg-transparent rounded-none! border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-hidden focus:ring-0 focus:border-gray-200 peer px-0!"
      },
      false: {
        select: "text-gray-900 bg-gray-50 border border-gray-300 focus:outline-hidden focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
      }
    },
    size: {
      sm: { select: "text-xs px-2.5 py-2.5" },
      md: { select: "text-sm px-2.5 py-2.5" },
      lg: { select: "text-base py-3 px-4" }
    },
    disabled: {
      true: {
        select: "cursor-not-allowed opacity-50"
      },
      false: {}
    },
    grouped: {
      false: { base: "rounded-lg", select: "rounded-lg" },
      true: {
        base: "first:rounded-s-lg last:rounded-e-lg not-first:-ms-px group",
        select: "group-first:rounded-s-lg group-last:rounded-e-lg group-not-first:-ms-px h-full"
      }
    }
  },
  defaultVariants: {
    underline: false,
    size: "md"
  }
});
tv({
  slots: {
    base: "relative border border-gray-300 w-full flex items-center gap-2 dark:border-gray-600 ring-primary-500 dark:ring-primary-500 focus-visible:outline-hidden",
    select: "",
    dropdown: "absolute z-50 p-3 flex flex-col gap-1 max-h-64 bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-600 start-0 top-[calc(100%+1rem)] rounded-lg cursor-pointer overflow-y-scroll w-full",
    item: "py-2 px-3 rounded-lg text-gray-600 hover:text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:text-gray-300 dark:hover:bg-gray-600",
    close: "p-0 focus:ring-gray-400 dark:text-white",
    span: "",
    placeholder: "text-gray-400",
    svg: "ms-1 h-3 w-3 cursor-pointer text-gray-800 dark:text-white"
  },
  variants: {
    size: {
      sm: "px-2.5 py-2.5 min-h-[2.4rem] text-xs",
      md: "px-2.5 py-2.5 min-h-[2.7rem] text-sm",
      lg: "px-3 py-3 min-h-[3.2rem] sm:text-base"
    },
    disabled: {
      true: {
        base: "cursor-not-allowed opacity-50 pointer-events-none",
        item: "cursor-not-allowed opacity-50",
        close: "cursor-not-allowed"
      },
      false: { base: "focus-within:border-primary-500 dark:focus-within:border-primary-500 focus-within:ring-1" }
    },
    active: {
      true: {
        item: "bg-primary-100 text-primary-500 dark:bg-primary-500 dark:text-primary-100 hover:bg-primary-100 dark:hover:bg-primary-500 hover:text-primary-600 dark:hover:text-primary-100"
      }
    },
    selected: {
      true: {
        item: "bg-gray-100 text-black font-semibold hover:text-black dark:text-white dark:bg-gray-600 dark:hover:text-white"
      }
    },
    grouped: {
      false: { base: "rounded-lg", select: "rounded-lg" },
      true: {
        base: "first:rounded-s-lg last:rounded-e-lg not-first:-ms-px group",
        select: "group-first:rounded-s-lg group-last:rounded-e-lg group-not-first:-ms-px h-full"
      }
    }
  },
  // Add compoundVariants here
  compoundVariants: [
    {
      selected: true,
      active: true,
      class: {
        item: "bg-primary-200 dark:bg-primary-600 text-primary-700 dark:text-primary-100 font-semibold"
        // Adjust colors as needed
      }
    }
  ],
  defaultVariants: {
    underline: false,
    size: "md"
  }
});
function Select($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      children,
      items,
      value = void 0,
      elementRef = void 0,
      underline,
      size = "md",
      disabled,
      placeholder = "Choose option ...",
      clearable,
      clearableColor = "none",
      clearableOnClick,
      onClear,
      clearableSvgClass,
      clearableClass,
      selectClass,
      class: className,
      classes,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const styling = classes ?? {
      select: selectClass,
      svg: clearableSvgClass,
      close: clearableClass
    };
    const theme = getTheme("select");
    let group = getContext("group");
    const { base, select: select$1, close } = select({ underline, size, disabled, grouped: !!group });
    const clearAll = () => {
      if (elementRef) {
        elementRef.value = "";
        elementRef.dispatchEvent(new Event("change", { bubbles: true }));
      }
      value = "";
      if (onClear) onClear();
      if (clearableOnClick) clearableOnClick();
    };
    createDismissableContext(clearAll);
    $$renderer2.push(`<div${attr_class(clsx(base({ class: clsx$1(theme?.base, className) })))}>`);
    $$renderer2.select(
      {
        disabled,
        ...restProps,
        value,
        this: elementRef,
        class: select$1({ class: clsx$1(theme?.select, styling.select) })
      },
      ($$renderer3) => {
        if (placeholder) {
          $$renderer3.push("<!--[-->");
          $$renderer3.option(
            {
              disabled: true,
              selected: value === "" || value === void 0,
              value: ""
            },
            ($$renderer4) => {
              $$renderer4.push(`${escape_html(placeholder)}`);
            }
          );
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]-->`);
        if (items) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<!--[-->`);
          const each_array = ensure_array_like(items);
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            let item = each_array[$$index];
            $$renderer3.option({ value: item.value, disabled: item.disabled }, ($$renderer4) => {
              $$renderer4.push(`${escape_html(item.name)}`);
            });
          }
          $$renderer3.push(`<!--]-->`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]-->`);
        if (children) {
          $$renderer3.push("<!--[-->");
          children($$renderer3);
          $$renderer3.push(`<!---->`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]-->`);
      }
    );
    $$renderer2.push(` `);
    if (value !== void 0 && value !== "" && clearable) {
      $$renderer2.push("<!--[-->");
      CloseButton($$renderer2, {
        class: close({ class: clsx$1(theme?.close, styling.close) }),
        color: clearableColor,
        "aria-label": "Clear search value",
        svgClass: clsx$1(styling.svg),
        disabled
      });
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
    bind_props($$props, { value, elementRef });
  });
}
tv({
  slots: {
    div: "relative",
    base: "block w-full text-sm border-0 px-0 bg-inherit dark:bg-inherit focus:outline-hidden focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50",
    wrapper: "text-sm rounded-lg bg-gray-50 dark:bg-gray-600 text-gray-900 dark:placeholder-gray-400 dark:text-white border border-gray-200 dark:border-gray-500 disabled:cursor-not-allowed disabled:opacity-50",
    inner: "py-2 px-4 bg-white dark:bg-gray-800",
    header: "py-2 px-3 border-gray-200 dark:border-gray-500",
    footer: "py-2 px-3 border-gray-200 dark:border-gray-500",
    addon: "absolute top-2 right-2 z-10",
    close: "absolute right-2 top-5 -translate-y-1/2 text-gray-400 hover:text-black",
    svg: ""
  },
  variants: {
    wrapped: {
      false: {
        wrapper: "p-2.5 text-sm focus:outline-hidden focus:ring-primary-500 border-gray-300 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 disabled:cursor-not-allowed disabled:opacity-50"
      }
    },
    hasHeader: {
      true: {
        header: "border-b"
      },
      false: {
        inner: "rounded-t-lg"
      }
    },
    hasFooter: {
      true: {
        footer: "border-t"
      },
      false: {
        inner: "rounded-b-lg"
      }
    }
  }
});
const toggle = tv({
  slots: {
    span: "me-3 shrink-0 bg-gray-200 rounded-full peer-focus:ring-4 peer-checked:after:translate-x-full peer-checked:rtl:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:bg-white after:border-gray-300 after:border after:rounded-full after:transition-all dark:bg-gray-600 dark:border-gray-500 relative ",
    label: "flex items-center",
    input: "w-4 h-4 bg-gray-100 border-gray-300 dark:ring-offset-gray-800 focus:ring-2 rounded-sm dark:bg-gray-700 dark:border-gray-600 sr-only peer"
  },
  variants: {
    disabled: {
      true: { label: "cursor-not-allowed opacity-50" }
    },
    checked: {
      true: "",
      false: ""
    },
    off_state_label: {
      true: { span: "ms-3" }
    },
    color: {
      // primary, secondary, gray, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose
      primary: {
        span: "peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 peer-checked:bg-primary-600"
      },
      secondary: {
        span: "peer-focus:ring-secondary-300 dark:peer-focus:ring-secondary-800 peer-checked:bg-secondary-600"
      },
      gray: {
        span: "peer-focus:ring-gray-300 dark:peer-focus:ring-gray-800 peer-checked:bg-gray-500"
      },
      red: {
        span: "peer-focus:ring-red-300 dark:peer-focus:ring-red-800 peer-checked:bg-red-600"
      },
      orange: {
        span: "peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 peer-checked:bg-orange-500"
      },
      amber: {
        span: "peer-focus:ring-amber-300 dark:peer-focus:ring-amber-800 peer-checked:bg-amber-600"
      },
      yellow: {
        span: "peer-focus:ring-yellow-300 dark:peer-focus:ring-yellow-800 peer-checked:bg-yellow-400"
      },
      lime: {
        span: "peer-focus:ring-lime-300 dark:peer-focus:ring-lime-800 peer-checked:bg-lime-500"
      },
      green: {
        span: "peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:bg-green-600"
      },
      emerald: {
        span: "peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 peer-checked:bg-emerald-600"
      },
      teal: {
        span: "peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:bg-teal-600"
      },
      cyan: {
        span: "peer-focus:ring-cyan-300 dark:peer-focus:ring-cyan-800 peer-checked:bg-cyan-600"
      },
      sky: {
        span: "peer-focus:ring-sky-300 dark:peer-focus:ring-sky-800 peer-checked:bg-sky-600"
      },
      blue: {
        span: "peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 peer-checked:bg-blue-600"
      },
      indigo: {
        span: "peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 peer-checked:bg-indigo-600"
      },
      violet: {
        span: "peer-focus:ring-violet-300 dark:peer-focus:ring-violet-800 peer-checked:bg-violet-600"
      },
      purple: {
        span: "peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 peer-checked:bg-purple-600"
      },
      fuchsia: {
        span: "peer-focus:ring-fuchsia-300 dark:peer-focus:ring-fuchsia-800 peer-checked:bg-fuchsia-600"
      },
      pink: {
        span: "peer-focus:ring-pink-300 dark:peer-focus:ring-pink-800 peer-checked:bg-pink-600"
      },
      rose: {
        span: "peer-focus:ring-rose-300 dark:peer-focus:ring-rose-800 peer-checked:bg-rose-600"
      }
    },
    size: {
      small: {
        span: "w-9 h-5 after:top-[2px] after:start-[2px] after:h-4 after:w-4"
      },
      default: {
        span: "w-11 h-6 after:top-0.5 after:start-[2px] after:h-5 after:w-5"
      },
      large: {
        span: "w-14 h-7 after:top-0.5 after:start-[4px]  after:h-6 after:w-6"
      }
    }
  },
  defaultVariants: {
    color: "primary"
  }
});
function Toggle($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      children,
      size = "default",
      value,
      checked = void 0,
      disabled,
      color = "primary",
      class: className,
      classes,
      inputClass,
      spanClass,
      offLabel,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const styling = classes ?? { input: inputClass, span: spanClass };
    const theme = getTheme("toggle");
    const { input: input2, label: label2, span } = toggle({ color, checked, size, disabled, off_state_label: !!offLabel });
    Label($$renderer2, {
      class: label2({ class: clsx$1(theme?.label, className) }),
      children: ($$renderer3) => {
        if (offLabel) {
          $$renderer3.push("<!--[-->");
          offLabel($$renderer3);
          $$renderer3.push(`<!---->`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--> <input${attributes(
          {
            type: "checkbox",
            checked,
            value,
            ...restProps,
            disabled,
            class: clsx(input2({ class: clsx$1(theme?.input, styling.input) }))
          },
          void 0,
          void 0,
          void 0,
          4
        )}/> <span${attr_class(clsx(span({ class: clsx$1(theme?.span, styling.span) })))}></span> `);
        if (children) {
          $$renderer3.push("<!--[-->");
          children($$renderer3);
          $$renderer3.push(`<!---->`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]-->`);
      },
      $$slots: { default: true }
    });
    bind_props($$props, { checked });
  });
}
tv({
  slots: {
    buttonGroup: "inline-flex rounded-lg shadow-sm relative",
    input: "block disabled:cursor-not-allowed disabled:opacity-50 rtl:text-right focus:ring-0 focus:outline-none",
    inputWithIcon: "relative px-2 pr-8",
    iconWrapper: "pointer-events-none absolute inset-y-0 end-0 top-0 flex items-center pe-3.5",
    icon: "h-4 w-4 text-gray-500 dark:text-gray-400",
    select: "text-gray-900 disabled:text-gray-400 bg-gray-50 border border-gray-300 focus:ring-0 focus:outline-none block w-full border-l-1 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:disabled:text-gray-500 dark:focus:ring-primary-500 dark:focus:border-primary-500",
    button: "!rounded-r-lg",
    buttonIcon: "ml-2 h-4 w-4",
    rangeSeparator: "flex items-center justify-center px-2 text-gray-500 dark:text-gray-400",
    rangeInputWrapper: "relative",
    rangeInput: "relative pr-8",
    rangeButton: "pointer-events-none absolute inset-y-0 top-0 right-0 flex items-center border-0 bg-transparent pe-3.5",
    dropdownContent: "p-4 last:rounded-r-lg",
    dropdownInner: "flex flex-col space-y-4",
    dropdownTimeRow: "flex space-x-4",
    dropdownTimeCol: "flex flex-col",
    dropdownTimeInput: "w-24 rounded-l-lg !border-r px-2",
    dropdownButton: "w-full !rounded-l-lg",
    toggleWrapper: "flex w-full flex-col space-y-2",
    toggleRow: "flex items-center justify-between",
    toggleTimeRow: "flex space-x-4 p-2.5",
    toggleTimeCol: "flex flex-col",
    toggleTimeInput: "w-24 rounded-lg !border-r px-2",
    inlineGrid: "grid w-full gap-2",
    inlineButton: "rounded-lg"
  },
  variants: {
    type: {
      default: {
        input: "rounded-e-lg"
      },
      select: {
        input: "w-1/3 rounded-l-lg rounded-e-none",
        select: "rounded-r-lg rounded-l-none"
      },
      dropdown: {
        input: "rounded-l-lg rounded-e-none"
      },
      range: {},
      "timerange-dropdown": {},
      "timerange-toggle": {},
      "inline-buttons": {}
    },
    columns: {
      1: {
        inlineGrid: "grid-cols-1"
      },
      2: {
        inlineGrid: "grid-cols-2"
      },
      3: {
        inlineGrid: "grid-cols-3"
      },
      4: {
        inlineGrid: "grid-cols-4"
      }
    },
    disabled: {
      true: {
        input: "disabled:cursor-not-allowed disabled:opacity-50"
      }
    }
  },
  defaultVariants: {
    type: "default",
    columns: 2,
    disabled: false
  }
});
tv({
  base: "inline-flex items-center hover:underline",
  variants: {
    color: {
      // primary, secondary, gray, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose
      primary: "text-primary-600 dark:text-primary-500",
      secondary: "text-secondary-600 dark:text-secondary-500",
      gray: "text-gray-600 dark:text-gray-500",
      red: "text-red-600 dark:text-red-500",
      orange: "text-orange-600 dark:text-orange-500",
      amber: "text-amber-600 dark:text-amber-500",
      yellow: "text-yellow-600 dark:text-yellow-500",
      lime: "text-lime-600 dark:text-lime-500",
      green: "text-green-600 dark:text-green-500",
      emerald: "text-emerald-600 dark:text-emerald-500",
      teal: "text-teal-600 dark:text-teal-500",
      cyan: "text-cyan-600 dark:text-cyan-500",
      sky: "text-sky-600 dark:text-sky-500",
      blue: "text-blue-600 dark:text-blue-500",
      indigo: "text-indigo-600 dark:text-indigo-500",
      violet: "text-violet-600 dark:text-violet-500",
      purple: "text-purple-600 dark:text-purple-500",
      fuchsia: "text-fuchsia-600 dark:text-fuchsia-500",
      pink: "text-pink-600 dark:text-pink-500",
      rose: "text-rose-600 dark:text-rose-500"
    }
  }
});
tv({
  base: "font-semibold text-gray-900 dark:text-white",
  variants: {
    border: {
      true: "border-s-4 border-gray-300 dark:border-gray-500",
      false: ""
    },
    italic: {
      true: "italic",
      false: ""
    },
    bg: {
      true: "bg-gray-50 dark:bg-gray-800",
      false: ""
    },
    alignment: {
      left: "text-left",
      center: "text-center",
      right: "text-right"
    },
    size: {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
      "5xl": "text-5xl",
      "6xl": "text-6xl",
      "7xl": "text-7xl",
      "8xl": "text-8xl",
      "9xl": "text-9xl"
    }
  },
  defaultVariants: {
    border: false,
    italic: true,
    bg: false,
    alignment: "left",
    size: "lg"
  }
});
tv({
  variants: {
    tag: {
      dt: "text-gray-500 md:text-lg dark:text-gray-400",
      dd: "text-lg font-semibold"
    }
  },
  defaultVariants: {
    tag: "dt"
  }
});
const heading = tv({
  base: "font-bold text-gray-900 dark:text-white",
  variants: {
    tag: {
      h1: "text-5xl font-extrabold",
      h2: "text-4xl",
      h3: "text-3xl",
      h4: "text-2xl",
      h5: "text-xl",
      h6: "text-lg"
    }
  },
  defaultVariants: {
    tag: "h1"
  }
});
function Heading($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      children,
      tag = "h1",
      class: className,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const theme = getTheme("heading");
    let headingCls = heading({ tag, class: clsx$1(theme, className) });
    element(
      $$renderer2,
      tag,
      () => {
        $$renderer2.push(`${attributes({ ...restProps, class: clsx(headingCls) })}`);
      },
      () => {
        children($$renderer2);
        $$renderer2.push(`<!---->`);
      }
    );
  });
}
tv({
  slots: {
    base: "h-px my-8 border-0",
    div: "inline-flex items-center justify-center w-full",
    content: "absolute px-4 -translate-x-1/2 rtl:translate-x-1/2 bg-white start-1/2 dark:bg-gray-900",
    bg: ""
  },
  variants: {
    withChildren: {
      true: {
        base: "w-full",
        div: "relative"
      }
    }
  },
  defaultVariants: {
    withChildren: false
  }
});
tv({
  slots: {
    base: "max-w-full h-auto",
    figure: "",
    caption: "mt-2 text-sm text-center text-gray-500 dark:text-gray-400"
  },
  variants: {
    size: {
      xs: { base: "max-w-xs", figure: "max-w-xs" },
      sm: { base: "max-w-sm", figure: "max-w-sm" },
      md: { base: "max-w-md", figure: "max-w-md" },
      lg: { base: "max-w-lg", figure: "max-w-lg" },
      xl: { base: "max-w-xl", figure: "max-w-xl" },
      "2xl": { base: "max-w-2xl", figure: "max-w-2xl" },
      full: { base: "max-w-full", figure: "max-w-full" }
    },
    effect: {
      grayscale: {
        base: "cursor-pointer rounded-lg grayscale filter transition-all duration-300 hover:grayscale-0"
      },
      blur: { base: "blur-xs transition-all duration-300 hover:blur-none" },
      invert: {
        base: "invert filter transition-all duration-300 hover:invert-0"
      },
      sepia: {
        base: "sepia filter transition-all duration-300 hover:sepia-0"
      },
      saturate: {
        base: "saturate-50 filter transition-all duration-300 hover:saturate-100"
      },
      "hue-rotate": {
        base: "hue-rotate-60 filter transition-all duration-300 hover:hue-rotate-0"
      }
    },
    align: {
      left: { base: "mx-0", figure: "mx-0" },
      center: { base: "mx-auto", figure: "mx-auto" },
      right: { base: "ml-auto mr-0", figure: "ml-auto mr-0" }
    }
  }
});
tv({
  base: "grid grid-cols-1 sm:grid-cols-2"
});
tv({
  base: "",
  variants: {
    tag: {
      ul: "list-disc",
      dl: "list-none",
      ol: "list-decimal"
    },
    position: {
      inside: "list-inside",
      outside: "list-outside"
    }
  },
  defaultVariants: {
    position: "inside",
    tag: "ul"
  }
});
tv({
  base: "text-white dark:bg-blue-500 bg-blue-600 px-2 rounded-sm"
});
const paragraph = tv({
  base: "text-gray-900 dark:text-white",
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
      "5xl": "text-5xl",
      "6xl": "text-6xl",
      "7xl": "text-7xl",
      "8xl": "text-8xl",
      "9xl": "text-9xl"
    },
    weight: {
      thin: "font-thin",
      extralight: "font-extralight",
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      extrabold: "font-extrabold",
      black: "font-black"
    },
    space: {
      tighter: "tracking-tighter",
      tight: "tracking-tight",
      normal: "tracking-normal",
      wide: "tracking-wide",
      wider: "tracking-wider",
      widest: "tracking-widest"
    },
    height: {
      none: "leading-none",
      tight: "leading-tight",
      snug: "leading-snug",
      normal: "leading-normal",
      relaxed: "leading-relaxed",
      loose: "leading-loose",
      "3": "leading-3",
      "4": "leading-4",
      "5": "leading-5",
      "6": "leading-6",
      "7": "leading-7",
      "8": "leading-8",
      "9": "leading-9",
      "10": "leading-10"
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right"
    },
    whitespace: {
      normal: "whitespace-normal",
      nowrap: "whitespace-nowrap",
      pre: "whitespace-pre",
      preline: "whitespace-pre-line",
      prewrap: "whitespace-pre-wrap"
    },
    italic: {
      true: "italic"
    },
    firstUpper: {
      true: "first-line:uppercase first-line:tracking-widest first-letter:text-7xl first-letter:font-bold first-letter:text-gray-900 dark:first-letter:text-gray-100 first-letter:me-3 first-letter:float-left",
      false: ""
    },
    justify: {
      true: "text-justify",
      false: ""
    }
  }
});
function P($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      children,
      class: className = "text-gray-900 dark:text-white",
      height = "normal",
      align = "left",
      justify = false,
      italic,
      firstUpper = false,
      whitespace = "normal",
      size = "base",
      space = "normal",
      weight = "normal",
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const theme = getTheme("paragraph");
    let classP = paragraph({
      height,
      size,
      weight,
      space,
      align,
      justify,
      italic,
      firstUpper,
      whitespace,
      class: clsx$1(theme, className)
    });
    $$renderer2.push(`<p${attributes({ ...restProps, class: clsx(classP) })}>`);
    children($$renderer2);
    $$renderer2.push(`<!----></p>`);
  });
}
tv({
  base: "text-gray-500 dark:text-gray-400 font-semibold"
});
tv({
  variants: {
    italic: {
      true: "italic"
    },
    underline: {
      true: "underline decoration-2 decoration-blue-400 dark:decoration-blue-600"
    },
    linethrough: {
      true: "line-through"
    },
    uppercase: {
      true: "uppercase"
    },
    gradient: {
      skyToEmerald: "text-transparent bg-clip-text bg-linear-to-r to-emerald-600 from-sky-400",
      purpleToBlue: "text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-blue-500",
      pinkToOrange: "text-transparent bg-clip-text bg-linear-to-r from-pink-500 to-orange-400",
      tealToLime: "text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-lime-300",
      redToYellow: "text-transparent bg-clip-text bg-linear-to-r from-red-600 to-yellow-500",
      indigoToCyan: "text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-cyan-400",
      fuchsiaToRose: "text-transparent bg-clip-text bg-linear-to-r from-fuchsia-500 to-rose-500",
      amberToEmerald: "text-transparent bg-clip-text bg-linear-to-r from-amber-400 to-emerald-500",
      violetToRed: "text-transparent bg-clip-text bg-linear-to-r from-violet-600 to-red-500",
      blueToGreen: "text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-teal-500 to-green-400",
      orangeToPurple: "text-transparent bg-clip-text bg-linear-to-r from-orange-400 via-pink-500 to-purple-500",
      yellowToRed: "text-transparent bg-clip-text bg-linear-to-r from-yellow-200 via-indigo-400 to-red-600",
      none: ""
    },
    highlight: {
      blue: "text-blue-600 dark:text-blue-500",
      green: "text-green-600 dark:text-green-500",
      red: "text-red-600 dark:text-red-500",
      yellow: "text-yellow-600 dark:text-yellow-500",
      purple: "text-purple-600 dark:text-purple-500",
      pink: "text-pink-600 dark:text-pink-500",
      indigo: "text-indigo-600 dark:text-indigo-500",
      teal: "text-teal-600 dark:text-teal-500",
      orange: "text-orange-600 dark:text-orange-500",
      cyan: "text-cyan-600 dark:text-cyan-500",
      fuchsia: "text-fuchsia-600 dark:text-fuchsia-500",
      amber: "text-amber-600 dark:text-amber-500",
      lime: "text-lime-600 dark:text-lime-500",
      none: ""
    },
    decoration: {
      solid: "underline decoratio-solid",
      double: "underline decoration-double",
      dotted: "underline decoration-dotted",
      dashed: "underline decoration-dashed",
      wavy: "underline decoration-wavy",
      none: "decoration-none"
    },
    decorationColor: {
      // blue, green, red, yellow, purple, pink, indigo, teal, orange, cyan, fuchsia, amber, lime, none
      // radio
      // primary, secondary, gray, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose
      primary: "underline decoration-primary-400 dark:decoration-primary-600",
      secondary: "underline decoration-secondary-400 dark:decoration-secondary-600",
      gray: "underline decoration-gray-400 dark:decoration-gray-600",
      orange: "underline decoration-orange-400 dark:decoration-orange-600",
      red: "underline decoration-red-400 dark:decoration-red-600",
      yellow: "underline decoration-yellow-400 dark:decoration-yellow-600",
      lime: "underline decoration-lime-400 dark:decoration-lime-600",
      green: "underline decoration-green-400 dark:decoration-green-600",
      emerald: "underline decoration-emerald-400 dark:decoration-emerald-600",
      teal: "underline decoration-teal-400 dark:decoration-teal-600",
      cyan: "underline decoration-cyan-400 dark:decoration-cyan-600",
      sky: "underline decoration-sky-400 dark:decoration-sky-600",
      blue: "underline decoration-blue-400 dark:decoration-blue-600",
      indigo: "underline decoration-indigo-400 dark:decoration-indigo-600",
      violet: "underline decoration-violet-400 dark:decoration-violet-600",
      purple: "underline decoration-purple-400 dark:decoration-purple-600",
      fuchsia: "underline decoration-fuchsia-400 dark:decoration-fuchsia-600",
      pink: "underline decoration-pink-400 dark:decoration-pink-600",
      rose: "underline decoration-rose-400 dark:decoration-rose-600",
      none: "decoration-none"
    },
    decorationThickness: {
      "1": "underline decoration-1",
      "2": "underline decoration-2",
      "4": "underline decoration-4",
      "8": "underline decoration-8",
      "0": "decoration-0"
    }
  }
});
tv({
  base: "inline-flex border border-gray-300 overflow-hidden",
  variants: {
    roundedSize: {
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      full: "rounded-full"
    }
  }
});
tv({
  slots: {
    button: "relative flex items-center transition-all duration-200 focus:outline-none border-r last:border-r-0 dark:bg-white dark:text-gray-800 disabled:cursor-not-allowed disabled:opacity-50",
    content: "flex items-center w-full overflow-hidden relative",
    text: "transition-all duration-200 ml-0",
    icon: "absolute left-0 flex-shrink-0 text-green-600"
  },
  variants: {
    selected: {
      true: {
        text: "ml-5"
      },
      false: {}
    },
    size: {
      sm: {
        button: "p-1 px-2 text-sm"
      },
      md: {
        button: "p-2 px-4 text-base"
      },
      lg: {
        button: "p-3 px-5 text-lg"
      },
      xl: {
        button: "p-4 px-6 text-xl"
      }
    },
    roundedSize: {
      sm: {
        button: "first:rounded-s-sm last:rounded-e-sm"
      },
      md: {
        button: "first:rounded-s-md last:rounded-e-md"
      },
      lg: {
        button: "first:rounded-s-lg last:rounded-e-lg"
      },
      xl: {
        button: "first:rounded-s-xl last:rounded-e-xl"
      },
      full: {
        button: "first:rounded-s-full last:rounded-e-full"
      }
    },
    color: {
      primary: {
        button: "data-[selected=true]:bg-primary-200 data-[selected=false]:hover:bg-gray-100"
      },
      secondary: {
        button: "data-[selected=true]:bg-secondary-200 data-[selected=false]:hover:bg-gray-100"
      },
      gray: {
        button: "data-[selected=true]:bg-gray-200 data-[selected=false]:hover:bg-gray-100"
      },
      red: {
        button: "data-[selected=true]:bg-red-200 data-[selected=false]:hover:bg-red-50"
      },
      orange: {
        button: "data-[selected=true]:bg-orange-200 data-[selected=false]:hover:bg-orange-50"
      },
      amber: {
        button: "data-[selected=true]:bg-amber-200 data-[selected=false]:hover:bg-amber-50"
      },
      yellow: {
        button: "data-[selected=true]:bg-yellow-200 data-[selected=false]:hover:bg-yellow-50"
      },
      lime: {
        button: "data-[selected=true]:bg-lime-200 data-[selected=false]:hover:bg-lime-50"
      },
      green: {
        button: "data-[selected=true]:bg-green-200 data-[selected=false]:hover:bg-green-50"
      },
      emerald: {
        button: "data-[selected=true]:bg-emerald-200 data-[selected=false]:hover:bg-emerald-50"
      },
      teal: {
        button: "data-[selected=true]:bg-teal-200 data-[selected=false]:hover:bg-teal-50"
      },
      cyan: {
        button: "data-[selected=true]:bg-cyan-200 data-[selected=false]:hover:bg-cyan-50"
      },
      sky: {
        button: "data-[selected=true]:bg-sky-200 data-[selected=false]:hover:bg-sky-50"
      },
      blue: {
        button: "data-[selected=true]:bg-blue-200 data-[selected=false]:hover:bg-blue-50"
      },
      indigo: {
        button: "data-[selected=true]:bg-indigo-200 data-[selected=false]:hover:bg-indigo-50"
      },
      violet: {
        button: "data-[selected=true]:bg-violet-200 data-[selected=false]:hover:bg-violet-50"
      },
      purple: {
        button: "data-[selected=true]:bg-purple-200 data-[selected=false]:hover:bg-purple-50"
      },
      fuchsia: {
        button: "data-[selected=true]:bg-fuchsia-200 data-[selected=false]:hover:bg-fuchsia-50"
      },
      pink: {
        button: "data-[selected=true]:bg-pink-200 data-[selected=false]:hover:bg-pink-50"
      },
      rose: {
        button: "data-[selected=true]:bg-rose-200 data-[selected=false]:hover:bg-rose-50"
      },
      none: {}
    }
  },
  defaultVariants: {
    selected: false,
    color: "primary",
    size: "md",
    roundedSize: "md"
  }
});
tv({
  slots: {
    base: "relative max-w-2xl mx-auto p-4 space-y-4",
    // Input section
    inputSection: "space-y-2",
    inputWrapper: "flex gap-2",
    input: "flex-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 dark:text-white",
    // Search section
    searchWrapper: "flex gap-2",
    searchContainer: "relative flex-1",
    searchInput: "w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 dark:text-white",
    searchIcon: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400",
    // Items list
    itemsList: "space-y-2 max-h-[500px] overflow-y-auto",
    // Empty state
    emptyState: "text-center py-8",
    emptyIcon: "w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3",
    emptyText: "text-sm text-gray-500 dark:text-gray-400",
    emptySubtext: "text-xs text-gray-400 dark:text-gray-500 mt-1",
    // Item
    item: "group flex items-start gap-3 rounded-lg border border-gray-200 dark:border-gray-700 p-3 transition hover:bg-gray-50 dark:hover:bg-gray-800/50",
    itemContent: "flex-1 min-w-0",
    itemHeader: "flex items-center gap-2 mb-1",
    itemTimestamp: "text-xs text-gray-500 dark:text-gray-400",
    itemText: "text-sm text-gray-900 dark:text-gray-100 break-words line-clamp-2",
    // Actions
    itemActions: "flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity",
    actionButton: "p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition flex items-center justify-center",
    actionIcon: "w-4 h-4 flex-shrink-0",
    pinButton: "p-1.5 rounded transition",
    deleteButton: "p-1.5 rounded text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20 transition",
    // Toast
    toastContainer: "fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-[slideIn_0.2s_ease-out]",
    toast: "flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg",
    toastIcon: "w-5 h-5",
    toastText: "text-sm font-medium",
    // buttons
    addToClipboard: "whitespace-nowrap rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50",
    clearAll: "rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700",
    // Selection bubble menu
    selectionMenu: "selection-menu fixed z-50 -translate-x-1/2 -translate-y-full",
    selectionBubble: "mb-2 flex items-center gap-2 rounded-lg bg-gray-900 px-3 py-2 text-white shadow-xl",
    selectionText: "max-w-[200px] truncate text-xs",
    selectionButton: "rounded bg-primary-700 px-2 py-1 text-xs font-medium whitespace-nowrap transition hover:bg-primary-500",
    selectionArrow: "absolute bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-gray-900"
  },
  variants: {
    pinned: {
      true: {
        pinButton: "text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/20"
      },
      false: {
        pinButton: "hover:bg-gray-200 dark:hover:bg-gray-700"
      }
    },
    type: {
      success: {
        toast: "bg-green-500 text-white"
      },
      error: {
        toast: "bg-red-500 text-white"
      },
      info: {
        toast: "bg-blue-500 text-white"
      }
    }
  },
  defaultVariants: {
    pinned: false,
    type: "success"
  }
});
tv({
  slots: {
    base: "w-full mx-auto mt-20 max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-2xl ring-1 ring-black/5 dark:ring-white/10 overflow-hidden transform transition-all",
    search: "rounded-b-none border-0 py-3",
    list: "max-h-80 scroll-py-2 overflow-y-auto border-t border-gray-200 dark:border-gray-700",
    item: "cursor-pointer select-none px-4 py-2 text-sm text-gray-900 dark:text-gray-100 aria-selected:bg-primary-600 aria-selected:text-white",
    itemDescription: "text-xs truncate text-gray-500 dark:text-gray-400 aria-selected:text-primary-100",
    empty: "px-4 py-14 text-center border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400",
    footer: "flex flex-wrap items-center justify-between gap-2 bg-gray-50 dark:bg-gray-900/50 px-4 py-2.5 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700",
    kbd: "inline-flex items-center gap-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-2 py-1 font-sans text-xs"
  },
  variants: {
    selected: { true: {} }
  },
  defaultVariants: {}
});
tv({
  slots: {
    container: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 p-2 md:p-4",
    column: "w-full rounded-xl shadow-sm p-3 md:p-4 flex flex-col bg-surface-elevated text-surface-foreground transition-colors",
    columnTitle: "text-sm md:text-base font-semibold mb-2 md:mb-3 dark:text-white",
    cardList: "flex flex-col gap-2 flex-1 min-h-[60px]",
    card: "bg-surface text-surface-foreground rounded-lg p-2.5 md:p-3 shadow-sm cursor-grab active:cursor-grabbing transition-all hover:bg-surface-hover hover:shadow-md",
    cardTitle: "font-medium text-sm md:text-base",
    cardDescription: "text-xs md:text-sm text-muted mt-1",
    cardTags: "flex flex-wrap gap-1 mt-2",
    cardTag: "text-[10px] md:text-xs bg-primary/10 text-primary px-1.5 md:px-2 py-0.5 rounded-full",
    addButton: "mt-2 md:mt-3 w-full bg-primary text-primary-foreground rounded-lg py-1.5 text-xs md:text-sm dark:text-primary-500 font-medium hover:bg-primary/90 transition-colors focus:ring-2 focus:ring-primary focus:ring-offset-2"
  },
  variants: {
    isDragOver: {
      true: {
        column: "ring-2 ring-primary"
      }
    },
    isDragging: {
      true: {
        card: "opacity-50"
      }
    }
  }
});
tv({
  slots: {
    card: "bg-surface text-surface-foreground rounded-lg p-2.5 md:p-3 shadow-sm shadow-black/20 dark:shadow-white/10 cursor-grab active:cursor-grabbing transition-all hover:bg-surface-hover hover:shadow-md",
    cardTitle: "font-medium text-sm md:text-base dark:text-white",
    cardDescription: "text-xs md:text-sm text-muted mt-1 dark:text-white",
    cardTags: "flex flex-wrap gap-1 mt-2 dark:text-white",
    cardTag: "text-[10px] md:text-xs bg-primary/10 text-primary px-1.5 md:px-2 py-0.5 rounded-full dark:text-white"
  },
  variants: {
    isDragging: {
      true: {
        card: "opacity-50"
      }
    }
  }
});
tv({
  slots: {
    base: "bg-white dark:bg-gray-900 p-2 transition-all duration-300 z-40 border-b border-gray-200 dark:border-gray-700",
    container: "",
    list: "",
    link: "px-4 py-2.5 transition-all duration-200 cursor-pointer rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900",
    li: "p-2 m-1"
  },
  variants: {
    position: {
      top: {
        base: "top-0 left-0 right-0 w-full",
        container: "container mx-auto px-4",
        list: "flex space-x-1 overflow-x-auto scrollbar-none"
      },
      left: {
        base: "fixed left-0 top-0 bottom-0 h-full w-64 overflow-y-auto",
        container: "px-4 py-4",
        list: "flex flex-col space-y-1"
      },
      right: {
        base: "fixed right-0 top-0 bottom-0 h-full w-64 overflow-y-auto",
        container: "px-4 py-4",
        list: "flex flex-col space-y-1"
      }
    },
    sticky: {
      true: {
        base: ""
      },
      false: {
        base: ""
      }
    },
    isSticky: {
      true: {
        base: "shadow-lg"
      },
      false: {
        base: ""
      }
    },
    active: {
      true: {
        link: "text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 font-semibold focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
      },
      false: {
        link: "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
      }
    }
  },
  defaultVariants: {
    position: "top",
    sticky: true,
    isSticky: false,
    active: false
  },
  compoundVariants: [
    {
      position: "top",
      sticky: true,
      class: { base: "sticky" }
    }
  ]
});
tv({
  base: "relative flex h-full w-full overflow-hidden select-none",
  variants: {
    direction: {
      horizontal: "",
      vertical: "flex-col"
    }
  },
  defaultVariants: {
    direction: "horizontal"
  }
});
tv({
  base: "flex flex-col relative overflow-hidden shrink-0 min-w-0 min-h-0"
});
tv({
  base: "bg-gray-300 shrink-0 relative z-10 transition-colors duration-200 hover:bg-gray-400 focus:bg-gray-400 focus:outline focus:outline-2 focus:outline-blue-500 focus:-outline-offset-2",
  variants: {
    direction: {
      horizontal: "w-1 cursor-col-resize",
      vertical: "h-1 cursor-row-resize"
    },
    isDragging: {
      true: "bg-blue-500",
      false: ""
    }
  },
  defaultVariants: {
    direction: "horizontal",
    isDragging: false
  }
});
tv({
  base: "absolute bg-transparent",
  variants: {
    direction: {
      horizontal: "w-3 h-full -left-1 top-0",
      vertical: "h-3 w-full -top-1 left-0"
    }
  },
  defaultVariants: {
    direction: "horizontal"
  }
});
tv({
  slots: {
    base: "space-y-2 dark:text-white",
    label: "text-base font-semibold",
    container: "flex w-full justify-between gap-2",
    wrapper: "relative h-full w-full",
    step: "h-full w-full rounded-xs",
    glow: "absolute -inset-1 rounded-xs opacity-30 blur-sm dark:opacity-25",
    incomplete: "h-full w-full rounded-xs bg-gray-200 dark:bg-gray-700"
  },
  variants: {
    size: {
      xs: { container: "h-1.5" },
      sm: { container: "h-2" },
      md: { container: "h-2.5" },
      lg: { container: "h-3" },
      xl: { container: "h-4" }
    },
    color: {
      primary: {
        step: "data-[state=completed]:bg-primary-500 data-[state=completed]:dark:bg-primary-900 data-[state=current]:bg-primary-800 data-[state=current]:dark:bg-primary-400",
        glow: "bg-primary-800 dark:bg-primary-400"
      },
      secondary: {
        step: "data-[state=completed]:bg-secondary-500 data-[state=completed]:dark:bg-secondary-900 data-[state=current]:bg-secondary-800 data-[state=current]:dark:bg-secondary-400",
        glow: "bg-secondary-800 dark:bg-secondary-400"
      },
      gray: {
        step: "data-[state=completed]:bg-gray-400 data-[state=completed]:dark:bg-gray-500 data-[state=current]:bg-gray-700 data-[state=current]:dark:bg-gray-200",
        glow: "bg-gray-700 dark:bg-gray-200"
      },
      red: {
        step: "data-[state=completed]:bg-red-600 data-[state=completed]:dark:bg-red-900 data-[state=current]:bg-red-900 data-[state=current]:dark:bg-red-500",
        glow: "bg-red-900 dark:bg-red-500"
      },
      yellow: {
        step: "data-[state=completed]:bg-yellow-400 data-[state=completed]:dark:bg-yellow-600 data-[state=current]:bg-yellow-600 data-[state=current]:dark:bg-yellow-400",
        glow: "bg-yellow-600 dark:bg-yellow-400"
      },
      green: {
        step: "data-[state=completed]:bg-green-500 data-[state=completed]:dark:bg-green-900 data-[state=current]:bg-green-800 data-[state=current]:dark:bg-green-400",
        glow: "bg-green-800 dark:bg-green-400"
      },
      indigo: {
        step: "data-[state=completed]:bg-indigo-500 data-[state=completed]:dark:bg-indigo-900 data-[state=current]:bg-indigo-800 data-[state=current]:dark:bg-indigo-400",
        glow: "bg-indigo-800 dark:bg-indigo-400"
      },
      purple: {
        step: "data-[state=completed]:bg-purple-500 data-[state=completed]:dark:bg-purple-900 data-[state=current]:bg-purple-800 data-[state=current]:dark:bg-purple-400",
        glow: "bg-purple-800 dark:bg-purple-400"
      },
      pink: {
        step: "data-[state=completed]:bg-pink-500 data-[state=completed]:dark:bg-pink-900 data-[state=current]:bg-pink-800 data-[state=current]:dark:bg-pink-400",
        glow: "bg-pink-800 dark:bg-pink-400"
      },
      blue: {
        step: "data-[state=completed]:bg-blue-500 data-[state=completed]:dark:bg-blue-900 data-[state=current]:bg-blue-800 data-[state=current]:dark:bg-blue-400",
        glow: "bg-blue-800 dark:bg-blue-400"
      },
      custom: {
        step: "",
        glow: ""
      }
    },
    glow: {
      true: {},
      false: {}
    },
    hideLabel: {
      true: {},
      false: {}
    }
  },
  compoundVariants: [
    {
      glow: false,
      class: {
        glow: "hidden"
      }
    },
    {
      hideLabel: true,
      class: {
        label: "hidden"
      }
    }
  ],
  defaultVariants: {
    size: "md",
    color: "primary",
    glow: false,
    hideLabel: false
  }
});
tv({
  slots: {
    base: "border border-gray-300 dark:border-gray-600 rounded-lg flex focus-within:ring-primary-500 focus-within:ring-1 focus-within:border-primary-500 scrollbar-hidden bg-gray-50 dark:bg-gray-700",
    tag: "flex items-center rounded-lg bg-gray-100 text-gray-900 border border-gray-300 my-1 ml-1 px-2 text-sm max-w-full min-w-fit",
    span: "items-center",
    close: "my-auto ml-1",
    input: "block text-sm m-2.5 p-0 bg-transparent border-none outline-none text-gray-900 h-min w-full min-w-fit focus:ring-0 placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50",
    info: "mt-1 text-sm text-blue-500 dark:text-blue-400",
    warning: "mt-1 text-sm text-yellow-400 dark:text-yellow-300",
    error: "mt-1 text-sm text-red-500 dark:text-red-400"
  }
});
tv({
  slots: {
    overlay: "fixed inset-0 bg-black/50 backdrop-blur-sm",
    highlight: ["fixed border-2 pointer-events-none transition-all duration-300", "border-blue-500", "shadow-[0_0_0_4px_rgba(59,130,246,0.2)]"],
    tooltip: ["fixed bg-white rounded-xl shadow-2xl", "w-80 max-w-[calc(100vw-2rem)]"],
    arrow: "absolute w-2 h-2 rotate-45 bg-white",
    content: "p-5 relative z-10 bg-white rounded-xl",
    title: "text-lg font-semibold text-gray-900 mb-3",
    description: "text-sm leading-relaxed text-gray-600 mb-4",
    progressContainer: "flex gap-2 justify-center",
    progressDot: ["w-2 h-2 rounded-full bg-gray-300", "hover:bg-gray-400 transition-all duration-200 hover:scale-110"],
    progressDotActive: "!bg-blue-500 !w-6 rounded",
    actions: ["flex justify-between items-center px-5 py-4", "border-t border-gray-200 relative z-10 bg-white rounded-b-xl"],
    navigation: "flex gap-2",
    button: ["px-4 py-2 rounded-md text-sm font-medium", "transition-all duration-200"],
    buttonPrimary: ["text-white bg-blue-500 hover:bg-blue-600"],
    buttonSecondary: ["text-gray-600 border border-gray-300", "hover:bg-gray-50 hover:border-gray-400"]
  },
  variants: {
    size: {
      sm: {
        tooltip: "w-64",
        content: "p-4",
        actions: "px-4 py-3",
        title: "text-base",
        description: "text-xs",
        button: "px-3 py-1.5 text-xs"
      },
      md: {
        tooltip: "w-80",
        content: "p-5",
        actions: "px-5 py-4",
        title: "text-lg",
        description: "text-sm",
        button: "px-4 py-2 text-sm"
      },
      lg: {
        tooltip: "w-96",
        content: "p-6",
        actions: "px-6 py-5",
        title: "text-xl",
        description: "text-base",
        button: "px-5 py-2.5 text-base"
      }
    },
    color: {
      primary: {
        highlight: "border-primary-500 shadow-[0_0_0_4px_rgba(59,130,246,0.2)]",
        progressDotActive: "!bg-primary-500",
        buttonPrimary: "bg-primary-500 hover:bg-primary-600"
      },
      blue: {
        highlight: "border-blue-500 shadow-[0_0_0_4px_rgba(59,130,246,0.2)]",
        progressDotActive: "!bg-blue-500",
        buttonPrimary: "bg-blue-500 hover:bg-blue-600"
      },
      purple: {
        highlight: "border-purple-500 shadow-[0_0_0_4px_rgba(168,85,247,0.2)]",
        progressDotActive: "!bg-purple-500",
        buttonPrimary: "bg-purple-500 hover:bg-purple-600"
      },
      green: {
        highlight: "border-green-500 shadow-[0_0_0_4px_rgba(34,197,94,0.2)]",
        progressDotActive: "!bg-green-500",
        buttonPrimary: "bg-green-500 hover:bg-green-600"
      },
      red: {
        highlight: "border-red-500 shadow-[0_0_0_4px_rgba(239,68,68,0.2)]",
        progressDotActive: "!bg-red-500",
        buttonPrimary: "bg-red-500 hover:bg-red-600"
      }
    }
  },
  defaultVariants: {
    size: "md",
    color: "blue"
  }
});
tv({
  slots: {
    container: "overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent",
    spacer: "relative",
    content: "absolute top-0 left-0 right-0",
    item: ""
  },
  variants: {
    contained: {
      true: { item: "[contain:layout_style_paint]" },
      false: {}
    }
  },
  defaultVariants: {
    contained: false
  }
});
tv({
  slots: {
    container: "overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent",
    spacer: "relative",
    content: "relative w-full",
    item: ""
  },
  variants: {
    contained: {
      true: { item: "[contain:layout_style_paint]" },
      false: {}
    }
  },
  defaultVariants: {
    contained: false
  }
});
function cn(...inputs) {
  return twMerge(clsx$2(inputs));
}
function GithubSolid($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const ctx = getContext("iconCtx") ?? {};
    const sizes = {
      xs: "w-3 h-3",
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
      xl: "w-8 h-8"
    };
    let {
      size = ctx.size || "md",
      color = ctx.color || "currentColor",
      title,
      desc,
      class: className,
      ariaLabel,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    let ariaDescribedby = `${title?.id || ""} ${desc?.id || ""}`.trim();
    const hasDescription = !!(title?.id || desc?.id);
    const isLabeled = !!ariaLabel || hasDescription;
    $$renderer2.push(`<svg${attributes(
      {
        xmlns: "http://www.w3.org/2000/svg",
        fill: color,
        ...restProps,
        class: clsx(cn("shrink-0", sizes[size], className)),
        viewBox: "0 0 24 24",
        "aria-label": ariaLabel,
        "aria-describedby": hasDescription ? ariaDescribedby : void 0,
        "aria-hidden": !isLabeled
      },
      void 0,
      void 0,
      void 0,
      3
    )}>`);
    if (title?.id && title.title) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<title${attr("id", title.id)}>${escape_html(title.title)}</title>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    if (desc?.id && desc.desc) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<desc${attr("id", desc.id)}>${escape_html(desc.desc)}</desc>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--><path fill-rule="evenodd" d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z" clip-rule="evenodd"></path></svg>`);
  });
}
const version = "0.1.5";
function BrowserOpenURL(url) {
  window.runtime.BrowserOpenURL(url);
}
function TopNavBar($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const downloadLink = "https://github.com/Syrov-Egor/chemsynthcalc-GUI/releases";
    const wikiLink = "https://github.com/Syrov-Egor/chemsynthcalc-GUI/wiki";
    const githubLink = "https://github.com/Syrov-Egor/chemsynthcalc-web";
    function openExternal(url) {
      BrowserOpenURL(url);
    }
    Navbar($$renderer2, {
      fluid: true,
      class: "p-0 sm:px-0",
      children: ($$renderer3) => {
        NavHamburger($$renderer3, {});
        $$renderer3.push(`<!----> `);
        NavUl($$renderer3, {
          children: ($$renderer4) => {
            NavLi($$renderer4, {
              href: "#",
              onclick: (e) => {
                e.preventDefault();
                openExternal(wikiLink);
              },
              children: ($$renderer5) => {
                P($$renderer5, {
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->How to use`);
                  },
                  $$slots: { default: true }
                });
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----> `);
            NavLi($$renderer4, {
              href: "#",
              onclick: (e) => {
                e.preventDefault();
                openExternal(downloadLink);
              },
              children: ($$renderer5) => {
                P($$renderer5, {
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Download desktop app`);
                  },
                  $$slots: { default: true }
                });
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----> `);
            NavLi($$renderer4, {
              href: "#",
              onclick: (e) => {
                e.preventDefault();
                openExternal(githubLink);
              },
              children: ($$renderer5) => {
                GithubSolid($$renderer5, { class: "shrink-0 h-7 w-7" });
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----> `);
            NavLi($$renderer4, {
              children: ($$renderer5) => {
                P($$renderer5, {
                  class: "text-emerald-700 dark:text-emerald-500",
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->chemsynthcalc ${escape_html(version)}`);
                  },
                  $$slots: { default: true }
                });
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----> `);
            DarkMode($$renderer4, {});
            $$renderer4.push(`<!---->`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
  });
}
function Algorithm($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { mode, algorithm = void 0 } = $$props;
    let disabled = mode === "formula" || mode === "masses";
    let algos = [
      { value: "auto", name: "Auto" },
      { value: "inv", name: "Inv" },
      { value: "gpinv", name: "GPinv" },
      { value: "ppinv", name: "PPinv" },
      { value: "comb", name: "Comb" }
    ];
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      Label($$renderer3, {
        class: "flex flex-col",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Algorithm `);
          Select($$renderer4, {
            items: algos,
            disabled,
            placeholder: "",
            get value() {
              return algorithm;
            },
            set value($$value) {
              algorithm = $$value;
              $$settled = false;
            }
          });
          $$renderer4.push(`<!---->`);
        },
        $$slots: { default: true }
      });
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { algorithm });
  });
}
function RunMode($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { mode, runMode = void 0 } = $$props;
    let disabled = mode === "formula" || mode === "balance";
    let runModes = [
      { value: "balance", name: "Balance" },
      { value: "check", name: "Check" },
      { value: "force", name: "Force" }
    ];
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      Label($$renderer3, {
        class: "flex flex-col",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Run mode `);
          Select($$renderer4, {
            items: runModes,
            disabled,
            placeholder: "",
            get value() {
              return runMode;
            },
            set value($$value) {
              runMode = $$value;
              $$settled = false;
            }
          });
          $$renderer4.push(`<!---->`);
        },
        $$slots: { default: true }
      });
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { runMode });
  });
}
function TargetNumber($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { mode, targetNumber = void 0 } = $$props;
    let disabled = mode === "formula" || mode === "balance";
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div>`);
      Label($$renderer3, {
        for: "target-num",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Target #`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Input($$renderer3, {
        type: "number",
        id: "target-num",
        disabled,
        get value() {
          return targetNumber;
        },
        set value($$value) {
          targetNumber = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----></div>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { targetNumber });
  });
}
function TargetMass($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { mode, targetMass = void 0 } = $$props;
    let disabled = mode === "formula" || mode === "balance";
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div class="flex flex-col">`);
      Label($$renderer3, {
        for: "target-mass",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Target Mass (g)`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Input($$renderer3, {
        type: "number",
        id: "target-mass",
        min: "0",
        step: "1.000000",
        disabled,
        get value() {
          return targetMass;
        },
        set value($$value) {
          targetMass = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----></div>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { targetMass });
  });
}
function Intify($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { mode, intify = void 0 } = $$props;
    let disabled = mode === "formula";
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div>`);
      Label($$renderer3, {
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Coefs to integers`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Toggle($$renderer3, {
        color: "emerald",
        size: "large",
        id: "intify-toggle",
        disabled,
        get checked() {
          return intify;
        },
        set checked($$value) {
          intify = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----></div>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { intify });
  });
}
function OutputPrecision($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { mode, outputPrecision = void 0 } = $$props;
    let disabled = mode === "balance";
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div class="flex flex-col">`);
      Label($$renderer3, {
        for: "output-precision",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Output Precision`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Input($$renderer3, {
        type: "number",
        id: "output-precision",
        min: "0",
        max: "20",
        disabled,
        get value() {
          return outputPrecision;
        },
        set value($$value) {
          outputPrecision = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----></div>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { outputPrecision });
  });
}
function FloatTolerance($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { mode, floatTolerance = void 0 } = $$props;
    let disabled = mode === "formula";
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div class="flex flex-col">`);
      Label($$renderer3, {
        for: "float-tolerance",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Float Tolerance (1e-x)`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Input($$renderer3, {
        type: "number",
        id: "float-tolerance",
        min: "1",
        max: "15",
        disabled,
        get value() {
          return floatTolerance;
        },
        set value($$value) {
          floatTolerance = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----></div>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { floatTolerance });
  });
}
function MaxCombinations($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { mode, maxCombinations = void 0 } = $$props;
    let disabled = mode === "formula" || mode === "masses";
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div class="flex flex-col">`);
      Label($$renderer3, {
        for: "max-comb",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Max coefficient`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Input($$renderer3, {
        type: "number",
        id: "max-comb",
        min: "1",
        disabled,
        get value() {
          return maxCombinations;
        },
        set value($$value) {
          maxCombinations = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----></div>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { maxCombinations });
  });
}
function ModeControl($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { controlInput = void 0 } = $$props;
    let mode = controlInput.mode;
    let algorithm = controlInput.algorithm;
    let runMode = controlInput.runMode;
    let targetNumber = controlInput.targetNumber;
    let targetMass = controlInput.targetMass;
    let intify = controlInput.intify;
    let outputPrecision = controlInput.outputPrecision;
    let floatTolerance = controlInput.floatTolerance;
    let maxCombinations = controlInput.maxCombinations;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div class="grid grid-cols-1 lg:grid-cols-5 xl:grid-cols-9 gap-2 py-2"><div class="flex flex-row lg:flex-col gap-2">`);
      Radio($$renderer3, {
        name: "modes",
        value: "formula",
        get group() {
          return mode;
        },
        set group($$value) {
          mode = $$value;
          $$settled = false;
        },
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Formula`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Radio($$renderer3, {
        name: "modes",
        value: "balance",
        get group() {
          return mode;
        },
        set group($$value) {
          mode = $$value;
          $$settled = false;
        },
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Balance`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Radio($$renderer3, {
        name: "modes",
        value: "masses",
        get group() {
          return mode;
        },
        set group($$value) {
          mode = $$value;
          $$settled = false;
        },
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Masses`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></div> `);
      Algorithm($$renderer3, {
        mode,
        get algorithm() {
          return algorithm;
        },
        set algorithm($$value) {
          algorithm = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----> `);
      RunMode($$renderer3, {
        mode,
        get runMode() {
          return runMode;
        },
        set runMode($$value) {
          runMode = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----> `);
      TargetNumber($$renderer3, {
        mode,
        get targetNumber() {
          return targetNumber;
        },
        set targetNumber($$value) {
          targetNumber = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----> `);
      TargetMass($$renderer3, {
        mode,
        get targetMass() {
          return targetMass;
        },
        set targetMass($$value) {
          targetMass = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----> `);
      Intify($$renderer3, {
        mode,
        get intify() {
          return intify;
        },
        set intify($$value) {
          intify = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----> `);
      OutputPrecision($$renderer3, {
        mode,
        get outputPrecision() {
          return outputPrecision;
        },
        set outputPrecision($$value) {
          outputPrecision = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----> `);
      FloatTolerance($$renderer3, {
        mode,
        get floatTolerance() {
          return floatTolerance;
        },
        set floatTolerance($$value) {
          floatTolerance = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----> `);
      MaxCombinations($$renderer3, {
        mode,
        get maxCombinations() {
          return maxCombinations;
        },
        set maxCombinations($$value) {
          maxCombinations = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----></div>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { controlInput });
  });
}
function inputPlaceholder() {
  const EXAMPLE_EQUATIONS = [
    "H2+O2=H2O",
    "K2Cr2O7+H2S+H2SO4=Cr2(SO4)3+S+K2SO4+H2O",
    "NH3+KMnO4=N2+MnO2+KOH+H2O",
    "Bi2O3+TiO2=Bi4Ti3O12",
    "NaNO2+KMnO4+H2SO4=MnSO4+NaNO3+K2SO4+H2O",
    "KMnO4+Na2SO3+H2SO4=MnSO4+K2SO4+Na2SO4+H2O",
    "HCl+K2Cr2O7=Cl2+CrCl3+KCl+H2O",
    "K2Cr2O7+NaNO2+H2SO4=NaNO3+Cr2(SO4)3+K2SO4+H2O",
    "K2Cr2O7+KI+H2SO4=I2+Cr2(SO4)3+K2SO4+H2O",
    "FeSO4+KClO3+H2SO4=Fe2(SO4)3+KCl+H2O",
    "MnSO4+KClO3+KOH=K2MnO4+KCl+K2SO4+H2O",
    "NaNO2+NaI+H2SO4=NO+I2+Na2SO4+H2O",
    "Cl2+KOH=KClO3+KCl+H2O",
    "Cr2(SO4)3+KMnO4+KOH=K2CrO4+K2MnO4+K2SO4+H2O",
    "Al+K2Cr2O7+H2SO4=Al2(SO4)3+Cr2(SO4)3+K2SO4+H2O",
    "MnO2+KBr+H2SO4=MnSO4+Br2+K2SO4+H2O",
    "NO+HClO4+H2O=HNO3+HCl",
    "NaNO2+Na2Cr2O7+HNO3=NaNO3+Cr(NO3)3+H2O",
    "Si+HNO3+HF=H2SiF6+NO+H2O",
    "CuI+H2SO4=CuSO4+I2+H2O+SO2"
  ];
  const randomIndex = Math.floor(Math.random() * EXAMPLE_EQUATIONS.length);
  let placeholder = EXAMPLE_EQUATIONS[randomIndex];
  return placeholder;
}
function EquationInput($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { textInput = void 0 } = $$props;
    let placeholder = inputPlaceholder();
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      Input($$renderer3, {
        type: "text",
        id: "equation-input",
        size: "lg",
        class: "placeholder:text-gray-500 placeholder:opacity-50",
        placeholder,
        clearable: true,
        get value() {
          return textInput;
        },
        set value($$value) {
          textInput = $$value;
          $$settled = false;
        }
      });
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { textInput });
  });
}
function IsCalculating() {
  return window["go"]["main"]["App"]["IsCalculating"]();
}
function PerformCalculation(arg1) {
  return window["go"]["main"]["App"]["PerformCalculation"](arg1);
}
function StopCalculation() {
  return window["go"]["main"]["App"]["StopCalculation"]();
}
class WailsCalculationService {
  isLoading = false;
  currentCalculation = null;
  get isLoaded() {
    return true;
  }
  get isCalculating() {
    try {
      return IsCalculating();
    } catch (error) {
      console.warn("Failed to check calculation status:", error);
      return false;
    }
  }
  canCalculate() {
    return !this.isLoading && !this.isCalculating;
  }
  async calculate(params) {
    if (this.currentCalculation) {
      this.currentCalculation.reject(new Error("New calculation started before previous completed"));
      this.currentCalculation = null;
    }
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        if (this.currentCalculation) {
          this.currentCalculation.reject(new Error("Calculation timeout"));
          this.currentCalculation = null;
        }
      }, 3e6);
      this.currentCalculation = { resolve, reject };
      this.isLoading = true;
      PerformCalculation(params).then((result) => {
        clearTimeout(timeout);
        this.isLoading = false;
        this.currentCalculation = null;
        resolve(JSON.stringify(result));
      }).catch((error) => {
        clearTimeout(timeout);
        this.isLoading = false;
        this.currentCalculation = null;
        const errorResult = {
          success: false,
          message: error.message || "Calculation failed",
          details: "",
          cancelled: false
        };
        resolve(JSON.stringify(errorResult));
      });
    });
  }
  abort() {
    try {
      StopCalculation();
    } catch (error) {
      console.error("Failed to stop calculation:", error);
    }
    if (this.currentCalculation) {
      this.currentCalculation.reject(new Error("Calculation aborted by user"));
      this.currentCalculation = null;
    }
  }
  terminate() {
    if (this.isCalculating) {
      this.abort();
    }
    this.isLoading = false;
  }
}
const wailsService = new WailsCalculationService();
class CalculationManager {
  isCalculating = false;
  parsedResult = null;
  calculationError = null;
  shouldAbort = false;
  async run(controlInput, textInput) {
    if (this.isCalculating) {
      this.shouldAbort = true;
      this.abort();
      return;
    }
    this.shouldAbort = false;
    this.isCalculating = true;
    this.parsedResult = null;
    this.calculationError = null;
    try {
      const params = {
        equation: textInput,
        mode: controlInput.mode,
        algorithm: controlInput.algorithm,
        runMode: controlInput.runMode,
        targetNum: controlInput.targetNumber,
        targetMass: controlInput.targetMass,
        intify: controlInput.intify,
        outputPrecision: controlInput.outputPrecision,
        floatTolerance: controlInput.floatTolerance,
        maxComb: controlInput.maxCombinations
      };
      const result = await wailsService.calculate(params);
      if (this.shouldAbort) {
        return;
      }
      try {
        const parsed = JSON.parse(result);
        this.calculationError = null;
        if (parsed.cancelled) {
          this.parsedResult = null;
        } else if (parsed.success) {
          this.parsedResult = parsed;
        } else {
          console.error("✗ Calculation failed:", parsed.message);
          if (parsed.details) {
            console.error("Error details:", parsed.details);
          }
          this.parsedResult = null;
          this.calculationError = parsed.message || "Calculation failed";
        }
      } catch (e) {
        console.error("Parse error:", e);
        console.log("Raw result:", result);
        this.parsedResult = null;
        this.calculationError = "Invalid result format";
      }
    } catch (error) {
      if (this.shouldAbort) ;
      else {
        this.calculationError = error instanceof Error ? error.message : String(error);
        console.error("Calculation error:", this.calculationError);
      }
    } finally {
      this.isCalculating = false;
      this.shouldAbort = false;
    }
  }
  abort() {
    wailsService.abort();
  }
  // Reset the manager state
  reset() {
    this.isCalculating = false;
    this.parsedResult = null;
    this.calculationError = null;
    this.shouldAbort = false;
    wailsService.terminate();
  }
}
const calculationManager = new CalculationManager();
function RunButton($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { controlInput, textInput } = $$props;
    function onClickButtonRun() {
      calculationManager.run(controlInput, textInput);
    }
    Button($$renderer2, {
      id: "run-button",
      onclick: onClickButtonRun,
      color: calculationManager.isCalculating ? "red" : "green",
      class: calculationManager.isCalculating ? "calculating" : "",
      disabled: wailsService.isLoading,
      children: ($$renderer3) => {
        $$renderer3.push(`<span id="button-text">${escape_html(calculationManager.isCalculating ? "Stop" : "Run")}</span>`);
      },
      $$slots: { default: true }
    });
  });
}
function InputGroup($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { textInput = "", controlInput = void 0 } = $$props;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div class="w-full max-w-full">`);
      ModeControl($$renderer3, {
        get controlInput() {
          return controlInput;
        },
        set controlInput($$value) {
          controlInput = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----></div> `);
      Label($$renderer3, {
        for: "input-group",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Input`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> <div id="input-group" class="flex flex-col md:flex-row gap-1 py-2 w-full">`);
      EquationInput($$renderer3, {
        get textInput() {
          return textInput;
        },
        set textInput($$value) {
          textInput = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----> `);
      RunButton($$renderer3, { controlInput, textInput });
      $$renderer3.push(`<!----></div>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { textInput, controlInput });
  });
}
function prettyPrint(obj, prefix = "") {
  if (obj == null) return "null";
  if (typeof obj !== "object") return String(obj);
  let str = "";
  const indent = prefix + "  ";
  if (Array.isArray(obj)) {
    str += "[\n";
    for (let i = 0; i < obj.length; i++) {
      str += indent + prettyPrint(obj[i], indent) + (i < obj.length - 1 ? "," : "") + "\n";
    }
    str += prefix + "]";
  } else {
    str += "{\n";
    for (const [key, value] of Object.entries(obj)) {
      str += indent + `${key}: ${prettyPrint(value, indent)},
`;
    }
    str += prefix + "}";
  }
  return str;
}
function ResultDetails($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { parsedResult, mode = void 0 } = $$props;
    let isOpen = mode === "formula" || mode === "balance";
    if (parsedResult?.details) {
      $$renderer2.push("<!--[-->");
      P($$renderer2, {
        size: "base",
        weight: "semibold",
        class: "pb-4",
        children: ($$renderer3) => {
          $$renderer3.push(`<details${attr("open", isOpen, true)} class="svelte-1rkuvqn"><summary class="svelte-1rkuvqn">Details</summary> <pre>${escape_html(prettyPrint(parsedResult.details))}</pre></details>`);
        },
        $$slots: { default: true }
      });
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { mode });
  });
}
function ResultTable($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { parsedResult } = $$props;
    if (parsedResult?.tabular && parsedResult.tabular.length > 0) {
      $$renderer2.push("<!--[-->");
      Table($$renderer2, {
        class: "relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-round",
        children: ($$renderer3) => {
          TableHead($$renderer3, {
            children: ($$renderer4) => {
              TableHeadCell($$renderer4, {
                children: ($$renderer5) => {
                  P($$renderer5, {
                    weight: "semibold",
                    children: ($$renderer6) => {
                      $$renderer6.push(`<!---->Formula`);
                    },
                    $$slots: { default: true }
                  });
                },
                $$slots: { default: true }
              });
              $$renderer4.push(`<!----> `);
              TableHeadCell($$renderer4, {
                children: ($$renderer5) => {
                  P($$renderer5, {
                    weight: "semibold",
                    children: ($$renderer6) => {
                      $$renderer6.push(`<!---->Molar mass (g/mol)`);
                    },
                    $$slots: { default: true }
                  });
                },
                $$slots: { default: true }
              });
              $$renderer4.push(`<!----> `);
              TableHeadCell($$renderer4, {
                children: ($$renderer5) => {
                  P($$renderer5, {
                    weight: "semibold",
                    children: ($$renderer6) => {
                      $$renderer6.push(`<!---->Mass (g)`);
                    },
                    $$slots: { default: true }
                  });
                },
                $$slots: { default: true }
              });
              $$renderer4.push(`<!---->`);
            },
            $$slots: { default: true }
          });
          $$renderer3.push(`<!----> `);
          TableBody($$renderer3, {
            children: ($$renderer4) => {
              $$renderer4.push(`<!--[-->`);
              const each_array = ensure_array_like(parsedResult.tabular);
              for (let i = 0, $$length = each_array.length; i < $$length; i++) {
                let row = each_array[i];
                TableBodyRow($$renderer4, {
                  children: ($$renderer5) => {
                    $$renderer5.push(`<!--[-->`);
                    const each_array_1 = ensure_array_like(Object.values(row));
                    for (let j = 0, $$length2 = each_array_1.length; j < $$length2; j++) {
                      let value = each_array_1[j];
                      TableBodyCell($$renderer5, {
                        children: ($$renderer6) => {
                          P($$renderer6, {
                            weight: "semibold",
                            children: ($$renderer7) => {
                              $$renderer7.push(`<!---->${escape_html(value)}`);
                            },
                            $$slots: { default: true }
                          });
                        },
                        $$slots: { default: true }
                      });
                    }
                    $$renderer5.push(`<!--]-->`);
                  },
                  $$slots: { default: true }
                });
              }
              $$renderer4.push(`<!--]-->`);
            },
            $$slots: { default: true }
          });
          $$renderer3.push(`<!---->`);
        },
        $$slots: { default: true }
      });
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function Results($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { controlInput } = $$props;
    let mode = controlInput.mode;
    $$renderer2.push(`<div id="results-section" class="py-2"><div id="regular-results-header">`);
    Heading($$renderer2, {
      tag: "h5",
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->Results`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> <div>`);
    if (calculationManager.isCalculating) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span id="status-text" class="calculating">`);
      Spinner($$renderer2, { type: "dots", color: "emerald" });
      $$renderer2.push(`<!----></span>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (calculationManager.calculationError) {
        $$renderer2.push("<!--[-->");
        P($$renderer2, {
          class: "text-red-700 dark:text-red-500 py-2",
          size: "lg",
          children: ($$renderer3) => {
            $$renderer3.push(`<span id="status-text" class="error">Error: ${escape_html(calculationManager.calculationError)}</span>`);
          },
          $$slots: { default: true }
        });
      } else {
        $$renderer2.push("<!--[!-->");
        if (calculationManager.parsedResult) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div id="status-text">`);
          ResultDetails($$renderer2, { parsedResult: calculationManager.parsedResult, mode });
          $$renderer2.push(`<!----> `);
          ResultTable($$renderer2, { parsedResult: calculationManager.parsedResult });
          $$renderer2.push(`<!----></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
          P($$renderer2, {
            class: "py-2",
            children: ($$renderer3) => {
              $$renderer3.push(`<span id="status-text">Ready</span>`);
            },
            $$slots: { default: true }
          });
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div></div></div>`);
  });
}
function App($$renderer) {
  let textInput = "";
  let controlInput = {
    mode: "masses",
    algorithm: "auto",
    runMode: "balance",
    targetNumber: 0,
    targetMass: 1,
    intify: true,
    outputPrecision: 4,
    floatTolerance: 8,
    maxCombinations: 15
  };
  let $$settled = true;
  let $$inner_renderer;
  function $$render_inner($$renderer2) {
    $$renderer2.push(`<div class="p-4 dark:bg-gray-900">`);
    TopNavBar($$renderer2);
    $$renderer2.push(`<!----> `);
    InputGroup($$renderer2, {
      get textInput() {
        return textInput;
      },
      set textInput($$value) {
        textInput = $$value;
        $$settled = false;
      },
      get controlInput() {
        return controlInput;
      },
      set controlInput($$value) {
        controlInput = $$value;
        $$settled = false;
      }
    });
    $$renderer2.push(`<!----> `);
    Results($$renderer2, { controlInput });
    $$renderer2.push(`<!----></div>`);
  }
  do {
    $$settled = true;
    $$inner_renderer = $$renderer.copy();
    $$render_inner($$inner_renderer);
  } while (!$$settled);
  $$renderer.subsume($$inner_renderer);
}
function _page($$renderer) {
  App($$renderer);
}
export {
  _page as default
};
