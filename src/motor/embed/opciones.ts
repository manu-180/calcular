// Opciones de la calculadora embebida (?tema= y ?acento=) y del generador. Puro y sin imports de
// alias: lo usan el generador, el check y next.config.ts. Lo que llega por la URL es input de un
// tercero, así que todo se valida contra una lista o una regex antes de llegar a un atributo o a un
// style; la misma regla está a mano en SCRIPT_OPCIONES (el script que aplica el tema antes del
// primer pintado) y scripts/check_embed.ts comprueba que las dos digan lo mismo.

export const TEMAS = ["claro", "oscuro"] as const;
export type TemaEmbed = (typeof TEMAS)[number];

export const TEMA_BASE: TemaEmbed = "claro";
export const ACENTO_BASE = "#10b981";

// Alias para quien escribe el código a mano en un sitio que no es en español.
const ALIAS_TEMA: Readonly<Record<string, TemaEmbed>> = { claro: "claro", light: "claro", oscuro: "oscuro", dark: "oscuro" };

export function temaDe(valor: unknown): TemaEmbed {
  return typeof valor === "string" ? (ALIAS_TEMA[valor.toLowerCase()] ?? TEMA_BASE) : TEMA_BASE;
}

const RE_ACENTO = /^#?([0-9a-f]{6}|[0-9a-f]{3})$/i;

function canal(c: number): number {
  const v = c / 255;
  return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
}

// Contraste contra blanco: el acento pinta bordes, foco y la opción elegida. Uno muy claro
// desaparece sobre la tarjeta blanca, así que se descarta y queda el verde de la marca.
export const CONTRASTE_MINIMO = 3;

export function contrasteConBlanco(hex: string): number {
  const n = Number.parseInt(hex.slice(1), 16);
  const l = 0.2126 * canal((n >> 16) & 255) + 0.7152 * canal((n >> 8) & 255) + 0.0722 * canal(n & 255);
  return 1.05 / (l + 0.05);
}

export function acentoDe(valor: unknown): string | null {
  if (typeof valor !== "string") return null;
  const m = RE_ACENTO.exec(valor.trim());
  if (!m) return null;
  const digitos = m[1].length === 3 ? [...m[1]].map((d) => d + d).join("") : m[1];
  const hex = `#${digitos.toLowerCase()}`;
  return contrasteConBlanco(hex) >= CONTRASTE_MINIMO ? hex : null;
}

export const ANCHOS = [
  { id: "completo", px: null },
  { id: "720", px: 720 },
  { id: "520", px: 520 },
  { id: "360", px: 360 },
] as const;
export type AnchoId = (typeof ANCHOS)[number]["id"];

export const ACENTOS = ["#10b981", "#2563eb", "#ea580c", "#e11d48", "#475569"] as const;

// Se ejecuta en <head> antes del primer pintado: sin él, una calculadora oscura destellaría blanca
// mientras React hidrata. Es una constante (no lleva nada de la URL adentro), y lo que lee de la URL
// lo valida con las mismas reglas que temaDe y acentoDe.
export const SCRIPT_OPCIONES = `(function(){try{var q=new URLSearchParams(location.search),d=document.documentElement,t=(q.get("tema")||"").toLowerCase();if(t==="oscuro"||t==="dark")d.setAttribute("data-tema","oscuro");var a=(q.get("acento")||"").trim(),m=/^#?([0-9a-f]{6}|[0-9a-f]{3})$/i.exec(a);if(m){var h=m[1];if(h.length===3)h=h.charAt(0)+h.charAt(0)+h.charAt(1)+h.charAt(1)+h.charAt(2)+h.charAt(2);var n=parseInt(h,16),c=function(x){x/=255;return x<=0.03928?x/12.92:Math.pow((x+0.055)/1.055,2.4)},l=0.2126*c((n>>16)&255)+0.7152*c((n>>8)&255)+0.0722*c(n&255);if(1.05/(l+0.05)>=${CONTRASTE_MINIMO})d.style.setProperty("--cye-acento","#"+h.toLowerCase())}}catch(e){}})();`;
