// Experimentos A/B sin servidor: las páginas siguen estáticas. Un script inline en <head> asigna la
// variante antes del primer pintado (hash del ca_vid, el mismo id que usa src/lib/rastreo.ts) y la deja
// en <html data-x-<id>="b">; el CSS generado acá esconde las variantes que no tocan. Sin JS, bots
// incluidos, se ve siempre la "a". Quién los abre y cierra: docs/medicion/AGENTE.md.

export type Experimento = {
  id: string;
  // Regex sobre el pathname (el del navegador, /mx/x en calcularya). Fuera de esas rutas no se asigna.
  rutas: string;
  variantes: readonly string[];
  // Fecha (AAAA-MM-DD) en que el informe lo da por cerrado aunque no haya ganador.
  hasta: string;
  hipotesis: string;
  metrica: "usos" | "resultados" | "acciones" | "compras" | "rebotes";
};

export const EXPERIMENTOS: readonly Experimento[] = [];

export const ID_EXPERIMENTO = /^[a-z0-9-]{1,24}$/;
export const VARIANTE = /^[a-z]$/;

export const atributo = (id: string) => `data-x-${id}`;

// FNV-1a de 32 bits: el script inline y el informe tienen que dar la misma variante para el mismo vid.
export function asignar(vid: string, exp: Pick<Experimento, "id" | "variantes">): string {
  let h = 0x811c9dc5;
  const s = `${vid}:${exp.id}`;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return exp.variantes[h % exp.variantes.length];
}

export function activos(hoy: string, lista: readonly Experimento[] = EXPERIMENTOS): Experimento[] {
  return lista.filter((e) => e.hasta >= hoy);
}

export function cssExperimentos(lista: readonly Experimento[]): string {
  const reglas: string[] = [];
  for (const e of lista) {
    const a = atributo(e.id);
    const [base, ...resto] = e.variantes;
    reglas.push(`html[${a}]:not([${a}="${base}"]) [data-xv="${e.id}:${base}"]`);
    for (const v of resto) reglas.push(`html:not([${a}="${v}"]) [data-xv="${e.id}:${v}"]`);
  }
  return reglas.length ? `${reglas.join(",")}{display:none!important}` : "";
}

// Corre antes de React: no puede importar nada. Si localStorage falla (modo privado estricto), no asigna
// y la persona ve la "a" sin contar en el experimento.
export function scriptExperimentos(lista: readonly Experimento[]): string {
  if (!lista.length) return "";
  const datos = JSON.stringify(lista.map((e) => ({ id: e.id, r: e.rutas, v: e.variantes }))).replace(/</g, "\\u003c");
  return `(function(){try{var L=${datos},s=localStorage,k="ca_vid",d=s.getItem(k)||"";if(d.length!==36){if(!crypto.randomUUID)return;d=crypto.randomUUID();s.setItem(k,d)}var p=location.pathname,h=document.documentElement;for(var i=0;i<L.length;i++){var e=L[i];if(!new RegExp(e.r).test(p))continue;var x=0x811c9dc5,t=d+":"+e.id;for(var j=0;j<t.length;j++){x^=t.charCodeAt(j);x=Math.imul(x,0x01000193)>>>0}h.setAttribute("data-x-"+e.id,e.v[x%e.v.length])}}catch(_){}})();`;
}

// Lo que la vista vio, para mandarlo con ella: los experimentos asignados en <html> cuyas rutas
// incluyen esta página. Tras una navegación interna el atributo sigue puesto, pero otra página no
// es parte del experimento.
export function expDeLaVista(path: string, lista: readonly Experimento[] = EXPERIMENTOS): Record<string, string> | null {
  if (typeof document === "undefined" || !lista.length) return null;
  const h = document.documentElement;
  const out: Record<string, string> = {};
  for (const e of lista) {
    if (!new RegExp(e.rutas).test(path)) continue;
    const v = h.getAttribute(atributo(e.id));
    if (v && VARIANTE.test(v)) out[e.id] = v;
  }
  return Object.keys(out).length ? out : null;
}
