// Medición de fugas: lo nuevo del protocolo de /api/e (resultado, campo, rabia, vitals, experimentos),
// el registro de experimentos y que el script inline asigne la misma variante que asignar().
// Sin red. Correr con: npx tsx scripts/check_medicion_fugas.ts  (o vía scripts/check-all.ts)

import assert from "node:assert/strict";
import vm from "node:vm";
import { limpiarCampo, limpiarExp, limpiarSelector, validarLote, type Lote } from "../src/app/api/e/protocolo";
import {
  EXPERIMENTOS,
  ID_EXPERIMENTO,
  VARIANTE,
  activos,
  asignar,
  cssExperimentos,
  scriptExperimentos,
  type Experimento,
} from "../src/lib/experimentos";
import { analizar, betaBinomial, wilson } from "../src/lib/medicion/fugas";

let fallas = 0;
let total = 0;
function prueba(nombre: string, fn: () => void) {
  total++;
  try {
    fn();
  } catch (e) {
    fallas++;
    console.error(`✗ ${nombre}\n  ${e instanceof Error ? e.message : e}`);
  }
}

const VID = "0e7f3c1a-5b2d-4c8e-9f10-2a3b4c5d6e7f";
const SID = "1e7f3c1a-5b2d-4c8e-9f10-2a3b4c5d6e7f";
const VISTA = "2e7f3c1a-5b2d-4c8e-9f10-2a3b4c5d6e7f";
const ctx = { dispositivo: "movil" as const, pais: "AR" };
const lote = (i: unknown[]) => validarLote({ vid: VID, sid: SID, i }, ctx) as Lote;

prueba("el cierre trae resultado, campo y rabia", () => {
  const l = lote([{ t: "x", id: VISTA, a: 1000, n: 2, s: 50, u: true, r: 4200.4, c: "Sueldo bruto", g: 3, ge: 'button#calcular[data-x="1"]' }]);
  assert.deepEqual(l.cierres, [
    { p_id: VISTA, p_activo_ms: 1000, p_interacciones: 2, p_scroll: 50, p_uso: true, p_resultado_ms: 4200, p_campo_ult: "Sueldo bruto", p_rabia: 3, p_rabia_el: "button#calculardata-x1" },
  ]);
});

prueba("los vitals se fusionan con el cierre de la misma vista", () => {
  const l = lote([
    { t: "w", id: VISTA, lcp: 2600.7, le: "main>h1" },
    { t: "x", id: VISTA, a: 500, n: 0, s: 10, u: false },
    { t: "w", id: VISTA, inp: 300, ie: "button.a" },
    { t: "w", id: VISTA, inp: 120, cls: 80 },
  ]);
  assert.equal(l.cierres.length, 1);
  assert.deepEqual(l.cierres[0], {
    p_id: VISTA, p_lcp_ms: 2601, p_lcp_el: "main>h1", p_activo_ms: 500, p_interacciones: 0, p_scroll: 10, p_uso: false, p_inp_ms: 300, p_inp_el: "button.a", p_cls_milli: 80,
  });
});

prueba("un vitals vacío o con id roto se descarta", () => {
  const l = lote([{ t: "w", id: VISTA }, { t: "w", id: "x", lcp: 100 }, { t: "w", id: VISTA, lcp: -5 }]);
  assert.deepEqual(l.cierres, []);
  assert.deepEqual(l.descartados, ["vitals", "vitals", "vitals"]);
});

prueba("la vista lleva su experimento; uno mal formado tira la vista", () => {
  const ok = lote([{ t: "v", id: VISTA, p: "/sueldo-neto", x: { "hero-corto": "b" } }]);
  assert.deepEqual(ok.vistas[0].exp, { "hero-corto": "b" });
  const mal = lote([{ t: "v", id: VISTA, p: "/sueldo-neto", x: { hero: "bb" } }]);
  assert.deepEqual(mal.vistas, []);
  assert.equal(limpiarExp({ a: "a", b: "b", c: "c", d: "d", e: "e" }), undefined);
  assert.equal(limpiarExp(undefined), null);
});

prueba("campo y selector no dejan pasar datos de la persona", () => {
  assert.equal(limpiarCampo("juan@gmail.com"), "[email]");
  assert.equal(limpiarCampo("CUIT 20-12345678-9"), "CUIT [num]");
  assert.equal(limpiarSelector('<img onerror="x">'), "img onerrorx>");
  assert.equal(limpiarSelector("a".repeat(120))?.length, 80);
  assert.equal(limpiarSelector(42), null);
});

const PRUEBA: Experimento[] = [
  { id: "hero-corto", rutas: "^/sueldo-neto$", variantes: ["a", "b"], hasta: "2099-01-01", hipotesis: "", metrica: "usos" },
  { id: "cta", rutas: "^/(mx|co)/", variantes: ["a", "b", "c"], hasta: "2000-01-01", hipotesis: "", metrica: "acciones" },
];

function correrScript(lista: Experimento[], path: string, vid: string) {
  const attrs: Record<string, string> = {};
  const almacen: Record<string, string> = { ca_vid: vid };
  const sandbox = {
    localStorage: { getItem: (k: string) => almacen[k] ?? null, setItem: (k: string, v: string) => (almacen[k] = v) },
    location: { pathname: path },
    document: { documentElement: { setAttribute: (k: string, v: string) => (attrs[k] = v) } },
    crypto: { randomUUID: () => VID },
    Math,
    RegExp,
  };
  vm.runInNewContext(scriptExperimentos(lista), sandbox);
  return attrs;
}

prueba("el script inline asigna lo mismo que asignar()", () => {
  const vids = Array.from({ length: 200 }, (_, i) => `${String(i).padStart(8, "0")}-5b2d-4c8e-9f10-2a3b4c5d6e7f`);
  const cuenta = { a: 0, b: 0 } as Record<string, number>;
  for (const v of vids) {
    const attrs = correrScript(PRUEBA, "/sueldo-neto", v);
    const esperado = asignar(v, PRUEBA[0]);
    assert.equal(attrs["data-x-hero-corto"], esperado);
    assert.equal(attrs["data-x-cta"], undefined);
    cuenta[esperado]++;
  }
  assert.ok(cuenta.a > 70 && cuenta.b > 70, `reparto parejo: ${JSON.stringify(cuenta)}`);
  assert.deepEqual(correrScript(PRUEBA, "/aguinaldo", VID), {});
});

prueba("el CSS esconde las variantes ajenas y sin JS se ve la a", () => {
  assert.equal(
    cssExperimentos([PRUEBA[0]]),
    'html[data-x-hero-corto]:not([data-x-hero-corto="a"]) [data-xv="hero-corto:a"],html:not([data-x-hero-corto="b"]) [data-xv="hero-corto:b"]{display:none!important}',
  );
  assert.equal(cssExperimentos([]), "");
  assert.equal(scriptExperimentos([]), "");
  assert.deepEqual(activos("2026-10-24", PRUEBA).map((e) => e.id), ["hero-corto"]);
});

prueba("registro de experimentos bien formado", () => {
  const ids = new Set<string>();
  for (const e of EXPERIMENTOS) {
    assert.ok(ID_EXPERIMENTO.test(e.id), `id ${e.id}`);
    assert.ok(!ids.has(e.id), `id repetido ${e.id}`);
    ids.add(e.id);
    assert.ok(e.variantes.length >= 2 && new Set(e.variantes).size === e.variantes.length, `${e.id}: variantes`);
    assert.ok(e.variantes.every((v) => VARIANTE.test(v)) && e.variantes[0] === "a", `${e.id}: variantes a, b, c…`);
    assert.ok(/^\d{4}-\d{2}-\d{2}$/.test(e.hasta), `${e.id}: hasta`);
    assert.ok(!e.rutas.includes("<"), `${e.id}: rutas`);
    new RegExp(e.rutas);
    assert.ok(e.hipotesis.length >= 20, `${e.id}: hipótesis escrita`);
  }
  assert.ok(activos(new Date().toISOString().slice(0, 10)).length <= 3, "máximo 3 experimentos activos a la vez");
});

prueba("Wilson y beta-binomial", () => {
  const [lo, hi] = wilson(50, 100);
  assert.ok(Math.abs(lo - 0.404) < 0.002 && Math.abs(hi - 0.596) < 0.002, `${lo} ${hi}`);
  assert.deepEqual(wilson(0, 0), [0, 1]);
  const p = betaBinomial({ exitos: 60, n: 100 }, { exitos: 40, n: 100 });
  assert.ok(p > 0.99, `P(b>a) con 60 vs 40: ${p}`);
  const q = betaBinomial({ exitos: 50, n: 100 }, { exitos: 50, n: 100 });
  assert.ok(Math.abs(q - 0.5) < 0.03, `iguales: ${q}`);
});

prueba("analizar ordena fugas por gente perdida y no alarma con muestras chicas", () => {
  const pag = (path: string, vistas: number, usos: number, resultados: number) => ({
    sitio: "ar", mercado: "ar", path, vistas, visitantes: vistas, entradas: vistas, rebotes: 0, usos, resultados, acciones: 0, compras: 0,
    salidas: vistas, con_rabia: 0, con_error: 0, movil: 0, scroll_p50: 50, activo_p50: 1, resultado_p50: 1,
    lcp_p75_movil: null, lcp_p75_escritorio: null, inp_p75: null, cls_p75_milli: null, ttfb_p75: null, con_vitals: 0,
  });
  const datos = {
    desde: "", hasta: "", mercados: [], campos: [], rabia: [], lentos: [], trabados: [], errores: [], experimentos: [],
    paginas: [pag("/a", 1000, 100, 80), pag("/b", 1000, 600, 500), pag("/c", 1000, 650, 520), pag("/chica", 8, 0, 0)],
  };
  const r = analizar(datos, null);
  const uso = r.fugas.filter((f) => f.paso === "uso");
  assert.equal(uso[0]?.path, "/a");
  assert.ok(!r.fugas.some((f) => f.path === "/chica"), "una página con 8 vistas no genera fuga");
});

console.log(`${fallas === 0 ? "✅" : "❌"} check_medicion_fugas: ${total - fallas}/${total}`);
process.exit(fallas === 0 ? 0 : 1);
