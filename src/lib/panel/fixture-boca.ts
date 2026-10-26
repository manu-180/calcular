import type { BocaDatos, CompartidoTop, FilaBoca, PaginaBoca, Sitio } from "@/lib/panel/tipos";

// Boca en boca de ejemplo para /dashboard?demo=1. Mismo orden de magnitud que la base real de octubre
// (decenas de compartidos por semana, pocas llegadas) pero con volumen para ver cada bloque lleno.

function semilla(texto: string): () => number {
  let a = 0;
  for (let i = 0; i < texto.length; i++) a = (Math.imul(a, 31) + texto.charCodeAt(i)) >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const PAGINAS: { path: string; titulo: string; sitio: Sitio; mercado: string; peso: number; viral: number }[] = [
  { path: "/sueldo-neto", titulo: "Sueldo neto", sitio: "ar", mercado: "ar", peso: 0.24, viral: 0.62 },
  { path: "/aguinaldo", titulo: "Aguinaldo", sitio: "ar", mercado: "ar", peso: 0.16, viral: 0.48 },
  { path: "/indemnizacion", titulo: "Indemnización por despido", sitio: "ar", mercado: "ar", peso: 0.11, viral: 0.71 },
  { path: "/mx/sueldo-neto", titulo: "Sueldo neto · México", sitio: "intl", mercado: "mx", peso: 0.1, viral: 0.4 },
  { path: "/mundo", titulo: "Tu sueldo en el mundo", sitio: "intl", mercado: "global", peso: 0.09, viral: 0.9 },
  { path: "/vacaciones", titulo: "Vacaciones", sitio: "ar", mercado: "ar", peso: 0.07, viral: 0.3 },
  { path: "/co/liquidacion", titulo: "Liquidación · Colombia", sitio: "intl", mercado: "co", peso: 0.06, viral: 0.55 },
  { path: "/monotributo", titulo: "Monotributo", sitio: "ar", mercado: "ar", peso: 0.05, viral: 0.2 },
  { path: "/cl/sueldo-liquido", titulo: "Sueldo líquido · Chile", sitio: "intl", mercado: "cl", peso: 0.05, viral: 0.35 },
  { path: "/horas-extras", titulo: "Horas extras", sitio: "ar", mercado: "ar", peso: 0.04, viral: 0.25 },
  { path: "/es/sueldo-neto", titulo: "Sueldo neto · España", sitio: "intl", mercado: "es", peso: 0.03, viral: 0.15 },
];

const CANALES: [string, number, number][] = [
  ["whatsapp", 0.38, 0.95],
  ["nativo", 0.24, 0.7],
  ["copiar", 0.14, 0.5],
  ["link", 0.1, 0.45],
  ["x", 0.06, 0.3],
  ["telegram", 0.05, 0.4],
  ["linkedin", 0.03, 0.25],
];

const ORIGENES: [string, number][] = [
  ["calculadora", 0.58],
  ["mundo", 0.14],
  ["sueldos", 0.09],
  ["duelo", 0.07],
  ["ranking", 0.05],
  ["horas", 0.04],
  ["calendario", 0.03],
];

function repartir(total: number, pesos: number[]): number[] {
  const suma = pesos.reduce((a, b) => a + b, 0) || 1;
  const base = pesos.map((p) => Math.floor((total * p) / suma));
  let falta = total - base.reduce((a, b) => a + b, 0);
  for (let i = 0; falta > 0; i = (i + 1) % base.length, falta--) base[i]++;
  return base;
}

const deCanal = (clave: string, compartidos: number, rnd: () => number, factor: number): FilaBoca => {
  const personas = Math.max(compartidos ? 1 : 0, Math.round(compartidos * (0.62 + rnd() * 0.12)));
  const llegadas = Math.round(compartidos * factor * (0.35 + rnd() * 0.15));
  const nuevas = Math.round(llegadas * (0.6 + rnd() * 0.15));
  return { clave, compartidos, personas, llegadas, nuevas, usaron: Math.round(llegadas * (0.45 + rnd() * 0.2)) };
};

export function bocaDeEjemplo(
  rango: string,
  ts: number[],
  granularidad: "hora" | "dia",
  mercado: string | null,
): BocaDatos {
  const rnd = semilla(`boca-${rango}-${mercado ?? "*"}`);
  const paginasDelFiltro = PAGINAS.filter((p) => !mercado || p.mercado === mercado);
  const escala = mercado ? Math.max(0.15, paginasDelFiltro.reduce((a, p) => a + p.peso, 0)) : 1;
  const porCubo = (granularidad === "hora" ? 0.9 : 19) * escala;
  const serie = ts.map((t, i) => {
    const ultimo = i === ts.length - 1;
    const compartidos = Math.round(porCubo * (0.55 + rnd() * 0.9) * (ultimo ? 0.45 : 1) * (1 + (0.25 * i) / Math.max(1, ts.length)));
    const llegadas = Math.round(compartidos * (0.32 + rnd() * 0.25));
    return { t: new Date(t).toISOString(), compartidos, llegadas, nuevas: Math.round(llegadas * (0.62 + rnd() * 0.12)) };
  });
  const compartidos = serie.reduce((a, s) => a + s.compartidos, 0);
  const llegadas = serie.reduce((a, s) => a + s.llegadas, 0);
  const nuevas = serie.reduce((a, s) => a + s.nuevas, 0);
  const personas = Math.round(compartidos * 0.68);
  const usaron = Math.round(llegadas * 0.54);

  const canales = repartir(compartidos, CANALES.map((c) => c[1])).map((n, i) => deCanal(CANALES[i][0], n, rnd, CANALES[i][2] * 2));
  const origenes = repartir(compartidos, ORIGENES.map((o) => o[1])).map((n, i) => deCanal(ORIGENES[i][0], n, rnd, 1.1));

  const paginas: PaginaBoca[] = repartir(compartidos, paginasDelFiltro.map((p) => p.peso)).map((n, i) => {
    const p = paginasDelFiltro[i];
    const f = deCanal(p.path, n, rnd, p.viral * 1.6);
    return { ...f, path: p.path, titulo: mercado ? p.titulo.split(" · ")[0] : p.titulo, sitio: p.sitio, mercado: p.mercado };
  });

  const porMercado = new Map<string, { sitio: Sitio; compartidos: number; personas: number; llegadas: number; nuevas: number }>();
  for (const p of paginas) {
    const m = porMercado.get(p.mercado) ?? { sitio: p.sitio, compartidos: 0, personas: 0, llegadas: 0, nuevas: 0 };
    m.compartidos += p.compartidos;
    m.personas += p.personas;
    m.llegadas += p.llegadas;
    m.nuevas += p.nuevas;
    porMercado.set(p.mercado, m);
  }

  const ahora = ts[ts.length - 1] ?? Date.now();
  const top: CompartidoTop[] = paginas
    .filter((p) => p.llegadas > 0)
    .slice(0, 8)
    .map((p, i) => {
      const l = Math.max(1, Math.round(p.llegadas * (0.5 - i * 0.04)));
      return {
        ref: Array.from({ length: 8 }, () => "abcdefghijkmnpqrstuvwxyz23456789"[Math.floor(rnd() * 32)]).join(""),
        path: p.path,
        titulo: p.titulo,
        sitio: p.sitio,
        mercado: p.mercado,
        canal: CANALES[i % 3][0],
        origen: p.path === "/mundo" ? "mundo" : "calculadora",
        fecha: new Date(ahora - (i * 1.7 + 0.4) * 86_400_000).toISOString(),
        llegadas: l,
        nuevas: Math.round(l * 0.7),
        usaron: Math.round(l * 0.55),
      };
    })
    .sort((a, b) => b.llegadas - a.llegadas);

  const dias = granularidad === "hora" ? 1 : ts.length;
  const expo = (base: number) => Math.round(base * dias * escala);
  const con = expo(58);
  const sin = expo(56);

  return {
    granularidad,
    resumen: {
      compartidos,
      compartidosAntes: Math.round(compartidos * 0.82),
      personas,
      llegadas,
      nuevas,
      usaron,
      nuevasUsaron: Math.round(usaron * 0.66),
      propias: Math.round(compartidos * 0.09),
      sinCompartido: Math.round(llegadas * 0.04),
    },
    serie,
    canales,
    origenes,
    paginas,
    mercados: [...porMercado].map(([m, v]) => ({ mercado: m, ...v })).sort((a, b) => b.compartidos - a.compartidos),
    top,
    puente:
      !mercado || mercado !== "ar"
        ? [
            { v: "con", exposiciones: con, personas: Math.round(con * 0.8), clics: Math.round(con * 0.061), compartieron: Math.round(con * 0.072), siguieron: Math.round(con * 0.31) },
            { v: "sin", exposiciones: sin, personas: Math.round(sin * 0.8), clics: 0, compartieron: Math.round(sin * 0.079), siguieron: Math.round(sin * 0.295) },
          ]
        : [],
    embebidos:
      mercado === "ar"
        ? { vistas: 0, visitantes: 0, usos: 0, sitios: [], calculadoras: [] }
        : {
            vistas: expo(21),
            visitantes: expo(17),
            usos: expo(9),
            sitios: [
              { host: "blog.contadoresmx.com", vistas: expo(9), visitantes: expo(7), usos: expo(4) },
              { host: "finanzasparatodos.co", vistas: expo(6), visitantes: expo(5), usos: expo(3) },
              { host: "", vistas: expo(4), visitantes: expo(3), usos: expo(1) },
              { host: "rrhh-al-dia.cl", vistas: expo(2), visitantes: expo(2), usos: 0 },
            ],
            calculadoras: [
              { path: "/mx/embed/sueldo-neto", titulo: "Sueldo neto · México", mercado: "mx", vistas: expo(11), sitios: 2, usos: expo(5) },
              { path: "/co/embed/liquidacion", titulo: "Liquidación · Colombia", mercado: "co", vistas: expo(7), sitios: 1, usos: expo(3) },
              { path: "/cl/embed/sueldo-liquido", titulo: "Sueldo líquido · Chile", mercado: "cl", vistas: expo(3), sitios: 1, usos: expo(1) },
            ],
          },
    afiliados: [],
    sueldos: {
      aportes: [
        { mercado: "mx", aportes: expo(4), pendientes: 3 },
        { mercado: "ar", aportes: expo(3), pendientes: 2 },
        { mercado: "co", aportes: expo(2), pendientes: 0 },
        { mercado: "es", aportes: expo(1), pendientes: 1 },
      ].filter((a) => !mercado || a.mercado === mercado),
      celdas: [
        { mercado: "mx", publicadas: 6, cerca: 4, ocupaciones: 3 },
        { mercado: "ar", publicadas: 3, cerca: 5, ocupaciones: 2 },
        { mercado: "co", publicadas: 0, cerca: 2, ocupaciones: 0 },
      ].filter((c) => !mercado || c.mercado === mercado),
      publicadoEl: new Date(ahora - 86_400_000).toISOString().slice(0, 10),
    },
    sociales: [
      { fuente: "WhatsApp", sesiones: expo(31), personas: expo(28), usaron: expo(14) },
      { fuente: "Facebook", sesiones: expo(9), personas: expo(8), usaron: expo(3) },
      { fuente: "Compartido", sesiones: expo(6), personas: expo(6), usaron: expo(3) },
      { fuente: "X", sesiones: expo(4), personas: expo(4), usaron: expo(1) },
      { fuente: "LinkedIn", sesiones: expo(2), personas: expo(2), usaron: expo(1) },
    ],
  };
}

export function bocaVacia(granularidad: "hora" | "dia", ts: number[]): BocaDatos {
  return {
    granularidad,
    resumen: { compartidos: 0, compartidosAntes: 0, personas: 0, llegadas: 0, nuevas: 0, usaron: 0, nuevasUsaron: 0, propias: 0, sinCompartido: 0 },
    serie: ts.map((t) => ({ t: new Date(t).toISOString(), compartidos: 0, llegadas: 0, nuevas: 0 })),
    canales: [],
    origenes: [],
    paginas: [],
    mercados: [],
    top: [],
    puente: [],
    embebidos: { vistas: 0, visitantes: 0, usos: 0, sitios: [], calculadoras: [] },
    afiliados: [],
    sueldos: null,
    sociales: [],
  };
}
