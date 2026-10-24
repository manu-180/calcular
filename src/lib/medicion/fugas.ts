// Análisis del informe semanal de fugas: qué paso pierde más gente, en qué página y en qué mercado,
// qué cambió contra el período anterior y cómo van los experimentos. Lo corre
// scripts/medicion/informe.ts sobre la salida de ca_fugas (20261024160000); sin red ni base acá.
//
// Criterio: una fuga es una tasa peor que la referencia del sitio con evidencia (la cota de Wilson al
// 95 % no llega a la referencia) y se ordena por personas perdidas por período, no por porcentaje:
// un 10 % de caída en la página que más gente recibe vale más que un 50 % en una que casi nadie ve.

export type Pagina = {
  sitio: string;
  mercado: string;
  path: string;
  vistas: number;
  visitantes: number;
  entradas: number;
  rebotes: number;
  usos: number;
  usos_medidos?: number;
  resultados: number;
  acciones: number;
  compras: number;
  salidas: number;
  con_rabia: number;
  con_error: number;
  movil: number;
  scroll_p50: number | null;
  activo_p50: number | null;
  resultado_p50: number | null;
  lcp_p75_movil: number | null;
  lcp_p75_escritorio: number | null;
  inp_p75: number | null;
  cls_p75_milli: number | null;
  ttfb_p75: number | null;
  con_vitals: number;
};

type Conteo = { sitio: string; mercado: string; path: string; n: number };
export type DatosFugas = {
  desde: string;
  hasta: string;
  mercados: Array<{ sitio: string; mercado: string; sesiones: number; visitantes: number; vistas: number; rebotes: number; usos: number; usos_medidos?: number; resultados: number; acciones: number; compras: number; movil: number }>;
  paginas: Pagina[];
  campos: Array<Conteo & { campo: string }>;
  rabia: Array<Conteo & { el: string }>;
  lentos: Array<Conteo & { el: string }>;
  trabados: Array<Conteo & { el: string }>;
  errores: Array<Conteo & { m: string }>;
  experimentos: Array<{ sitio: string; exp: string; variante: string; vistas: number; visitantes: number; usos: number; resultados: number; acciones: number; compras: number; rebotes: number; entradas: number }>;
};

export type Consulta = { q: string; impresiones: number; clics: number; posicion: number };
// esperado = clics que daría cada consulta con el CTR típico de su posición, sumados por página.
export type FilaBuscador = { sitio: string; path: string; clics: number; impresiones: number; esperado: number; posicion: number; consultas: Consulta[] };

export type Paso = "buscador" | "rebote" | "uso" | "resultado" | "accion" | "velocidad" | "interaccion" | "estabilidad" | "errores" | "rabia";

export type Fuga = {
  paso: Paso;
  sitio: string;
  mercado: string;
  path: string;
  base: number;
  tasa: number;
  referencia: number;
  perdidas: number;
  detalle: string;
  pistas: string[];
};

export type Cambio = { sitio: string; mercado: string; path: string; metrica: string; antes: number; ahora: number; n: number; p: number };

export type VeredictoExp = {
  exp: string;
  sitio: string;
  metrica: string;
  variantes: Array<{ v: string; n: number; exitos: number; tasa: number; pMejorQueA: number | null }>;
  srm: boolean;
  estado: "ganador" | "perdedor" | "sigue" | "vencido" | "sin-datos";
  ganadora: string | null;
};

export type Analisis = { fugas: Fuga[]; cambios: Cambio[]; experimentos: VeredictoExp[] };

export const MIN_VISTAS = 30;
const SHRINK = 20;
// Umbrales "pobre" de web.dev para el p75: ahí Google y la gente empiezan a castigar.
export const UMBRAL = { lcp: 2500, inp: 200, cls: 100 } as const;

export function wilson(x: number, n: number, z = 1.96): [number, number] {
  if (n <= 0) return [0, 1];
  const p = x / n;
  const d = 1 + (z * z) / n;
  const c = p + (z * z) / (2 * n);
  const m = z * Math.sqrt((p * (1 - p)) / n + (z * z) / (4 * n * n));
  return [Math.max(0, (c - m) / d), Math.min(1, (c + m) / d)];
}

function normal(x: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(x));
  const d = 0.3989423 * Math.exp((-x * x) / 2);
  const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return x > 0 ? 1 - p : p;
}

// P(tasa de b > tasa de a) con posteriores Beta(1+x, 1+n-x), por aproximación normal: con las
// muestras que exige el informe para dar un veredicto (≥ 200 por brazo) el error es despreciable.
export function betaBinomial(b: { exitos: number; n: number }, a: { exitos: number; n: number }): number {
  const mom = ({ exitos, n }: { exitos: number; n: number }) => {
    const al = 1 + exitos;
    const be = 1 + n - exitos;
    return { m: al / (al + be), v: (al * be) / ((al + be) ** 2 * (al + be + 1)) };
  };
  const x = mom(b);
  const y = mom(a);
  return normal((x.m - y.m) / Math.sqrt(x.v + y.v));
}

function zDosProporciones(x1: number, n1: number, x2: number, n2: number): number {
  if (!n1 || !n2) return 1;
  const p = (x1 + x2) / (n1 + n2);
  const se = Math.sqrt(p * (1 - p) * (1 / n1 + 1 / n2));
  if (!se) return 1;
  const z = (x2 / n2 - x1 / n1) / se;
  return 2 * (1 - normal(Math.abs(z)));
}

const mediana = (xs: number[]) => {
  if (!xs.length) return 0;
  const o = [...xs].sort((a, b) => a - b);
  const m = o.length >> 1;
  return o.length % 2 ? o[m] : (o[m - 1] + o[m]) / 2;
};

// CTR esperado por posición media en Google (curvas públicas de 2024-2025, redondeadas a la baja para no
// marcar de más). Debajo de la mitad de lo esperado, el título y la descripción no están convenciendo.
export function ctrEsperado(posicion: number): number {
  const curva = [0.28, 0.15, 0.1, 0.07, 0.05, 0.04, 0.03, 0.025, 0.02, 0.018];
  const i = Math.max(1, Math.round(posicion));
  return i <= 10 ? curva[i - 1] : 0.01;
}

type Metrica = { paso: Paso; exitos: (p: Pagina) => number; base: (p: Pagina) => number; mejorAlto: boolean; aplica: (p: Pagina) => boolean; detalle: string };

const esCalculadora = (p: Pagina) => p.usos / Math.max(p.vistas, 1) >= 0.15 || p.resultados > 0;

const METRICAS: Metrica[] = [
  { paso: "rebote", exitos: (p) => p.rebotes, base: (p) => p.entradas, mejorAlto: false, aplica: () => true, detalle: "llegan y se van sin tocar nada en menos de 10 s" },
  { paso: "uso", exitos: (p) => p.usos, base: (p) => p.vistas, mejorAlto: true, aplica: esCalculadora, detalle: "abren la calculadora y no completan ningún campo" },
  {
    paso: "resultado",
    exitos: (p) => Math.min(p.resultados, p.usos_medidos ?? 0),
    base: (p) => p.usos_medidos ?? 0,
    mejorAlto: true,
    aplica: esCalculadora,
    detalle: "empiezan a completar y no llegan a ver un resultado",
  },
  {
    paso: "accion",
    exitos: (p) => p.acciones,
    base: (p) => p.resultados,
    mejorAlto: true,
    aplica: esCalculadora,
    detalle: "ven el resultado y no hacen nada con él (compartir, copiar, guardar, comprar)",
  },
  { paso: "errores", exitos: (p) => p.con_error, base: (p) => p.vistas, mejorAlto: false, aplica: () => true, detalle: "ven un error de JavaScript" },
  { paso: "rabia", exitos: (p) => p.con_rabia, base: (p) => p.vistas, mejorAlto: false, aplica: () => true, detalle: "tocan varias veces seguidas algo que no responde" },
];

const clave = (x: { sitio: string; mercado: string; path: string }) => `${x.sitio}|${x.mercado}|${x.path}`;

function pistasDe(d: DatosFugas, p: Pagina, paso: Paso): string[] {
  const de = <T extends Conteo>(xs: T[], txt: (x: T) => string) =>
    xs.filter((x) => clave(x) === clave(p)).slice(0, 3).map((x) => `${txt(x)} (${x.n})`);
  if (paso === "resultado") return de(d.campos, (x) => `se quedan en «${x.campo}»`);
  if (paso === "rabia") return de(d.rabia, (x) => x.el);
  if (paso === "errores") return de(d.errores, (x) => x.m);
  if (paso === "velocidad") return de(d.lentos, (x) => `LCP: ${x.el}`);
  if (paso === "interaccion") return de(d.trabados, (x) => `INP: ${x.el}`);
  return [];
}

export function analizar(d: DatosFugas, anterior: DatosFugas | null, buscador: FilaBuscador[] = [], hoy = new Date().toISOString().slice(0, 10), experimentosVigentes: Record<string, { hasta: string; metrica: string }> = {}): Analisis {
  const fugas: Fuga[] = [];
  const paginas = d.paginas.filter((p) => p.vistas >= MIN_VISTAS);

  for (const m of METRICAS) {
    for (const sitio of new Set(paginas.map((p) => p.sitio))) {
      const grupo = paginas.filter((p) => p.sitio === sitio && m.aplica(p) && m.base(p) >= MIN_VISTAS);
      if (grupo.length < 3) continue;
      const ref = mediana(grupo.map((p) => m.exitos(p) / m.base(p)));
      for (const p of grupo) {
        const n = m.base(p);
        const x = m.exitos(p);
        const [lo, hi] = wilson(x, n);
        const peor = m.mejorAlto ? hi < ref : lo > ref;
        if (!peor) continue;
        const suav = (x + SHRINK * ref) / (n + SHRINK);
        const perdidas = Math.round(n * Math.abs(suav - ref));
        if (perdidas < 3) continue;
        fugas.push({ paso: m.paso, sitio: p.sitio, mercado: p.mercado, path: p.path, base: n, tasa: x / n, referencia: ref, perdidas, detalle: m.detalle, pistas: pistasDe(d, p, m.paso) });
      }
    }
  }

  // Velocidad: sin experimento que lo pruebe, el costo se estima en un 10 % de quienes cargan la página
  // lenta (orden de magnitud de los estudios de Google sobre LCP y abandono). Va marcado como estimado.
  for (const p of paginas) {
    const vel: Array<[Paso, number | null, number, string]> = [
      ["velocidad", p.lcp_p75_movil, UMBRAL.lcp, "el contenido principal tarda en aparecer en el celular (LCP p75)"],
      ["interaccion", p.inp_p75, UMBRAL.inp, "la página tarda en responder al tocar (INP p75)"],
      ["estabilidad", p.cls_p75_milli, UMBRAL.cls, "la página salta mientras carga (CLS p75 ×1000)"],
    ];
    for (const [paso, valor, umbral, detalle] of vel) {
      if (valor == null || p.con_vitals < MIN_VISTAS || valor <= umbral) continue;
      const base = paso === "velocidad" ? p.movil : p.vistas;
      fugas.push({ paso, sitio: p.sitio, mercado: p.mercado, path: p.path, base, tasa: valor, referencia: umbral, perdidas: Math.round(base * 0.1), detalle: `${detalle} (pérdida estimada)`, pistas: pistasDe(d, p, paso) });
    }
  }

  // Por consulta y no por página: una página que sale 3.ª para «paritarias comercio» y 40.ª para
  // «convenio» tiene una posición media engañosa. Se compara contra lo que darían sus consultas.
  for (const b of buscador) {
    if (b.impresiones < 200 || b.esperado < 10 || b.clics >= b.esperado / 2) continue;
    fugas.push({
      paso: "buscador",
      sitio: b.sitio,
      mercado: b.sitio === "ar" ? "ar" : "global",
      path: b.path,
      base: b.impresiones,
      tasa: b.clics / b.impresiones,
      referencia: b.esperado / b.impresiones,
      perdidas: Math.round(b.esperado - b.clics),
      detalle: `sale en Google (posición media ${b.posicion.toFixed(1)}) y la eligen la mitad o menos de lo esperable: título y descripción`,
      pistas: b.consultas.slice(0, 3).map((c) => `«${c.q}» pos ${c.posicion.toFixed(1)}, ${c.clics}/${c.impresiones}`),
    });
  }

  fugas.sort((a, b) => b.perdidas - a.perdidas);

  const cambios: Cambio[] = [];
  if (anterior) {
    const previas = new Map(anterior.paginas.map((p) => [clave(p), p]));
    for (const p of paginas) {
      const q = previas.get(clave(p));
      if (!q) continue;
      for (const m of METRICAS) {
        const n1 = m.base(q);
        const n2 = m.base(p);
        if (n1 < MIN_VISTAS || n2 < MIN_VISTAS) continue;
        const pv = zDosProporciones(m.exitos(q), n1, m.exitos(p), n2);
        if (pv < 0.05) cambios.push({ sitio: p.sitio, mercado: p.mercado, path: p.path, metrica: m.paso, antes: m.exitos(q) / n1, ahora: m.exitos(p) / n2, n: n2, p: pv });
      }
    }
    cambios.sort((a, b) => a.p - b.p);
  }

  return { fugas, cambios, experimentos: veredictos(d, hoy, experimentosVigentes) };
}

export const MIN_POR_BRAZO = 200;

function veredictos(d: DatosFugas, hoy: string, vigentes: Record<string, { hasta: string; metrica: string }>): VeredictoExp[] {
  const grupos = new Map<string, DatosFugas["experimentos"]>();
  for (const x of d.experimentos) grupos.set(`${x.exp}|${x.sitio}`, [...(grupos.get(`${x.exp}|${x.sitio}`) ?? []), x]);
  for (const exp of Object.keys(vigentes)) if (![...grupos.keys()].some((k) => k.startsWith(`${exp}|`))) grupos.set(`${exp}|-`, []);

  return [...grupos].map(([k, filas]) => {
    const [exp, sitio] = k.split("|");
    const conf = vigentes[exp];
    const metrica = conf?.metrica ?? "usos";
    const contar = (f: DatosFugas["experimentos"][number]) =>
      metrica === "rebotes" ? { exitos: f.rebotes, n: f.entradas } : { exitos: Number((f as Record<string, unknown>)[metrica] ?? 0), n: f.vistas };
    const orden = [...filas].sort((x, y) => x.variante.localeCompare(y.variante));
    const a = orden.find((f) => f.variante === "a");
    const variantes = orden.map((f) => {
      const c = contar(f);
      const pa = a && f !== a ? betaBinomial(c, contar(a)) : null;
      return { v: f.variante, n: c.n, exitos: c.exitos, tasa: c.n ? c.exitos / c.n : 0, pMejorQueA: pa === null ? null : metrica === "rebotes" ? 1 - pa : pa };
    });
    // Sample ratio mismatch: si el reparto de vistas se aleja del parejo, la asignación está rota y
    // ningún veredicto vale. χ² con k-1 grados de libertad, p < 0,001.
    const total = orden.reduce((s, f) => s + f.vistas, 0);
    const esperado = total / Math.max(orden.length, 1);
    const chi = orden.reduce((s, f) => s + (f.vistas - esperado) ** 2 / Math.max(esperado, 1), 0);
    const srm = orden.length >= 2 && total >= 100 && chi > (orden.length === 2 ? 10.83 : 13.82);
    const retadoras = variantes.filter((v) => v.pMejorQueA !== null);
    const suficiente = variantes.length >= 2 && variantes.every((v) => v.n >= MIN_POR_BRAZO);
    const mejor = [...retadoras].sort((x, y) => (y.pMejorQueA ?? 0) - (x.pMejorQueA ?? 0))[0];
    let estado: VeredictoExp["estado"] = orden.length ? "sigue" : "sin-datos";
    let ganadora: string | null = null;
    if (!srm && suficiente && mejor && (mejor.pMejorQueA ?? 0) >= 0.95) {
      estado = "ganador";
      ganadora = mejor.v;
    } else if (!srm && suficiente && retadoras.length && retadoras.every((v) => (v.pMejorQueA ?? 1) <= 0.05)) {
      estado = "perdedor";
      ganadora = "a";
    } else if (conf && conf.hasta < hoy) {
      estado = "vencido";
      ganadora = "a";
    }
    return { exp, sitio, metrica, variantes, srm, estado, ganadora };
  });
}
