import { tokensToCssVarMap } from "./css-vars";
import { ALL_BRAND_IDS, OEM_THEMES } from "./oem-palettes";
import { STORAGE_APPEARANCE, STORAGE_BRAND } from "./storage";

/**
 * Synchronous first-paint theme restore. Keep in sync with `applyBrandToRoot` + storage keys.
 */
export function getThemeBootInlineScript(): string {
  const payload: Record<
    string,
    { light: Record<string, string>; dark: Record<string, string> }
  > = {};
  for (const id of ALL_BRAND_IDS) {
    const d = OEM_THEMES[id];
    payload[id] = {
      light: tokensToCssVarMap(d.light),
      dark: tokensToCssVarMap(d.dark),
    };
  }
  const json = JSON.stringify(payload);
  const sa = STORAGE_APPEARANCE;
  const sb = STORAGE_BRAND;
  return (
    `!function(){try{var P=${json};var SA=${JSON.stringify(sa)},SB=${JSON.stringify(sb)};` +
    `var LA="theme",LB="team";var a=localStorage.getItem(SA)||localStorage.getItem(LA)||"system";` +
    `var b=localStorage.getItem(SB)||localStorage.getItem(LB)||"default";` +
    `if(!P[b])b="default";` +
    `var m=a==="light"||a==="dark"?a:(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");` +
    `var T=P[b][m==="dark"?"dark":"light"];var r=document.documentElement;` +
    `r.setAttribute("data-theme",m);r.setAttribute("data-brand",b);` +
    `for(var k in T)r.style.setProperty(k,T[k]);` +
    `}catch(e){}}();`
  );
}
