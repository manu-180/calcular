import type {
  Busqueda,
  Compra,
  EmbudoProducto,
  FilaFuente,
  FilaPagina,
  Kpi,
  KpiClave,
  Lectura,
  FilaMercado,
  PanelDatos,
  Punto,
  Rango,
  Reparto,
} from "@/lib/panel/tipos";
import { deCada100, numero } from "@/lib/panel/formato";

type Opciones = { ahora?: Date; mercado?: string | null };

const REPARTO_MERCADOS: [string, number, number][] = [
  ["ar", 0.86, 1],
  ["mx", 0.05, 0],
  ["co", 0.03, 0],
  ["cl", 0.02, 0],
  ["pe", 0.015, 0],
  ["global", 0.012, 0],
  ["uy", 0.008, 0],
];

function mercadosDeEjemplo(visitantes: number, usos: number, ventas: number, ingresos: number): FilaMercado[] {
  return REPARTO_MERCADOS.map(([mercado, parte, deVentas]) => ({
    mercado,
    visitantes: Math.round(visitantes * parte),
    usos: mercado === "global" ? 0 : Math.round(usos * parte),
    ventas: Math.round(ventas * deVentas),
    ingresos: deVentas && ingresos ? [{ moneda: "ARS", monto: ingresos }] : [],
  }));
}

const HORA = 3600 * 1000;
const DIA = 24 * HORA;
const OFFSET_AR = -3 * HORA;

function semilla(texto: string): () => number {
  let h = 2166136261;
  for (let i = 0; i < texto.length; i++) {
    h ^= texto.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  let a = h >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function entre(rnd: () => number, min: number, max: number) {
  return min + (max - min) * rnd();
}

function repartir(total: number, pesos: number[]): number[] {
  const suma = pesos.reduce((a, b) => a + b, 0) || 1;
  const crudos = pesos.map((p) => (total * p) / suma);
  const base = crudos.map(Math.floor);
  let falta = total - base.reduce((a, b) => a + b, 0);
  const orden = crudos.map((c, i) => [c - Math.floor(c), i] as const).sort((a, b) => b[0] - a[0]);
  for (let k = 0; falta > 0 && k < orden.length; k++, falta--) base[orden[k][1]]++;
  return base;
}

const PRODUCTOS = [
  { producto: "planilla-comercio", titulo: "Planilla Comercio 2026", precio: 14900, peso: 0.42 },
  { producto: "planilla-monotributo", titulo: "Planilla Monotributo 2026", precio: 9900, peso: 0.2 },
  {
    producto: "planilla-casas-particulares",
    titulo: "Planilla Casas Particulares 2026",
    precio: 9900,
    peso: 0.2,
  },
  { producto: "planilla-uocra", titulo: "Planilla UOCRA 2026", precio: 14900, peso: 0.1 },
  { producto: "planilla-alquileres", titulo: "Planilla de alquileres 2026", precio: 9900, peso: 0.05 },
  { producto: "informe-cuota-alimentaria", titulo: "Informe de cuota alimentaria", precio: 4900, peso: 0.03 },
] as const;

type Prod = (typeof PRODUCTOS)[number]["producto"];

const PAGINAS: {
  path: string;
  titulo: string;
  peso: number;
  tasa: number;
  tiempo: number;
  producto: Prod | null;
  tendencia: number;
}[] = [
  { path: "/sueldo-neto", titulo: "Sueldo neto", peso: 0.16, tasa: 0.44, tiempo: 102_000, producto: null, tendencia: 1.04 },
  { path: "/aguinaldo", titulo: "Aguinaldo", peso: 0.13, tasa: 0.49, tiempo: 84_000, producto: null, tendencia: 1.34 },
  { path: "/monotributo", titulo: "Monotributo", peso: 0.09, tasa: 0.41, tiempo: 118_000, producto: "planilla-monotributo", tendencia: 1.08 },
  { path: "/indemnizacion", titulo: "Indemnización por despido", peso: 0.08, tasa: 0.52, tiempo: 156_000, producto: null, tendencia: 0.97 },
  { path: "/vacaciones", titulo: "Vacaciones", peso: 0.065, tasa: 0.38, tiempo: 71_000, producto: null, tendencia: 1.12 },
  { path: "/empleada-domestica", titulo: "Empleada doméstica", peso: 0.06, tasa: 0.46, tiempo: 97_000, producto: "planilla-casas-particulares", tendencia: 1.06 },
  { path: "/ganancias", titulo: "Impuesto a las Ganancias", peso: 0.055, tasa: 0.35, tiempo: 133_000, producto: null, tendencia: 0.91 },
  { path: "/sueldo-neto/comercio", titulo: "Sueldo neto de Comercio", peso: 0.05, tasa: 0.47, tiempo: 109_000, producto: "planilla-comercio", tendencia: 1.1 },
  { path: "/plazo-fijo", titulo: "Plazo fijo", peso: 0.045, tasa: 0.57, tiempo: 46_000, producto: null, tendencia: 0.88 },
  { path: "/inflacion", titulo: "Inflación", peso: 0.04, tasa: 0.29, tiempo: 52_000, producto: null, tendencia: 1.02 },
  { path: "/monotributo/recategorizacion", titulo: "Recategorización de monotributo", peso: 0.035, tasa: 0.43, tiempo: 124_000, producto: "planilla-monotributo", tendencia: 1.21 },
  { path: "/convenios/comercio", titulo: "Escala de Comercio", peso: 0.03, tasa: 0.21, tiempo: 64_000, producto: "planilla-comercio", tendencia: 1.05 },
  { path: "/horas-extras", titulo: "Horas extras", peso: 0.028, tasa: 0.51, tiempo: 58_000, producto: null, tendencia: 1.0 },
  { path: "/renuncia", titulo: "Liquidación por renuncia", peso: 0.025, tasa: 0.48, tiempo: 121_000, producto: null, tendencia: 1.03 },
  { path: "/despido-empleada-domestica", titulo: "Despido de empleada doméstica", peso: 0.02, tasa: 0.5, tiempo: 142_000, producto: "planilla-casas-particulares", tendencia: 0.99 },
  { path: "/convenios/uocra", titulo: "Escala UOCRA", peso: 0.018, tasa: 0.24, tiempo: 69_000, producto: "planilla-uocra", tendencia: 1.07 },
  { path: "/salario-minimo", titulo: "Salario mínimo", peso: 0.017, tasa: 0.22, tiempo: 38_000, producto: null, tendencia: 0.94 },
  { path: "/jubilacion", titulo: "Jubilación", peso: 0.016, tasa: 0.37, tiempo: 99_000, producto: null, tendencia: 1.0 },
  { path: "/licencia-por-maternidad", titulo: "Licencia por maternidad", peso: 0.013, tasa: 0.45, tiempo: 62_000, producto: null, tendencia: 1.01 },
  { path: "/asignaciones-familiares", titulo: "Asignaciones familiares", peso: 0.012, tasa: 0.4, tiempo: 57_000, producto: null, tendencia: 1.09 },
  { path: "/planillas", titulo: "Planillas (catálogo)", peso: 0.011, tasa: 0.08, tiempo: 41_000, producto: "planilla-comercio", tendencia: 1.15 },
  { path: "/desempleo", titulo: "Seguro de desempleo", peso: 0.01, tasa: 0.42, tiempo: 76_000, producto: null, tendencia: 0.96 },
  { path: "/canasta-basica", titulo: "Canasta básica", peso: 0.009, tasa: 0.33, tiempo: 49_000, producto: null, tendencia: 1.0 },
  { path: "/cuota-alimentaria", titulo: "Cuota alimentaria", peso: 0.008, tasa: 0.55, tiempo: 138_000, producto: "informe-cuota-alimentaria", tendencia: 1.02 },
];

const FUENTES = [
  { fuente: "Google", peso: 0.71, tasa: 0.38 },
  { fuente: "Directo", peso: 0.12, tasa: 0.33 },
  { fuente: "WhatsApp", peso: 0.06, tasa: 0.47 },
  { fuente: "ChatGPT", peso: 0.04, tasa: 0.52 },
  { fuente: "Bing", peso: 0.025, tasa: 0.36 },
  { fuente: "Facebook", peso: 0.02, tasa: 0.29 },
  { fuente: "Otros", peso: 0.025, tasa: 0.31 },
];

const BUSQUEDAS: { q: string; peso: number; sinResultados: boolean }[] = [
  { q: "aguinaldo", peso: 1, sinResultados: false },
  { q: "sueldo neto comercio", peso: 0.72, sinResultados: false },
  { q: "planilla gastronómicos", peso: 0.41, sinResultados: true },
  { q: "monotributo categorías 2026", peso: 0.38, sinResultados: false },
  { q: "liquidación final", peso: 0.33, sinResultados: false },
  { q: "escala uatre", peso: 0.27, sinResultados: true },
  { q: "vacaciones proporcionales", peso: 0.24, sinResultados: false },
  { q: "sueldo camioneros", peso: 0.21, sinResultados: false },
  { q: "bono jubilados octubre", peso: 0.18, sinResultados: true },
  { q: "planilla sanidad", peso: 0.14, sinResultados: true },
  { q: "feriados octubre", peso: 0.12, sinResultados: false },
];

const DOW = [0.62, 1.12, 1.08, 1.05, 1.02, 0.92, 0.66];
const DIURNO = [
  0.012, 0.007, 0.005, 0.004, 0.004, 0.007, 0.016, 0.03, 0.048, 0.062, 0.07, 0.072, 0.065, 0.061,
  0.066, 0.069, 0.067, 0.062, 0.055, 0.05, 0.047, 0.042, 0.032, 0.022,
];
const EMAILS = [
  "ma***@gmail.com",
  "ca***@hotmail.com",
  "es***@estudiorios.com.ar",
  "lu***@gmail.com",
  "ad***@yahoo.com.ar",
  "ro***@outlook.com",
  "gr***@gmail.com",
  "co***@contadoresunidos.com",
];

function buckets(rango: Rango, ahora: number) {
  const local = ahora + OFFSET_AR;
  const inicioHoy = Math.floor(local / DIA) * DIA - OFFSET_AR;
  if (rango === "hoy") {
    const horas = Math.floor((ahora - inicioHoy) / HORA) + 1;
    return {
      desde: inicioHoy,
      granularidad: "hora" as const,
      ts: Array.from({ length: horas }, (_, i) => inicioHoy + i * HORA),
    };
  }
  const dias = rango === "7d" ? 7 : rango === "30d" ? 30 : 90;
  const desde = inicioHoy - (dias - 1) * DIA;
  return {
    desde,
    granularidad: "dia" as const,
    ts: Array.from({ length: dias }, (_, i) => desde + i * DIA),
  };
}

function iso(ms: number) {
  return new Date(ms).toISOString();
}

export function panelDeEjemplo(rango: Rango, opciones: Opciones = {}): PanelDatos {
  const ahora = (opciones.ahora ?? new Date()).getTime();
  const rnd = semilla(`calcular-${rango}`);
  const { desde, granularidad, ts } = buckets(rango, ahora);
  const n = ts.length;
  const horaActual = new Date(ahora + OFFSET_AR).getUTCHours();
  const avanceDelDia = DIURNO.slice(0, horaActual + 1).reduce((a, b) => a + b, 0);

  const visitantesSerie = ts.map((t, i) => {
    if (granularidad === "hora") {
      const h = new Date(t + OFFSET_AR).getUTCHours();
      const parcial = i === n - 1 ? (new Date(ahora).getUTCMinutes() + 1) / 60 : 1;
      return Math.round(1450 * DIURNO[h] * entre(rnd, 0.85, 1.15) * parcial);
    }
    const dow = new Date(t + OFFSET_AR).getUTCDay();
    const tendencia = 1 + (0.18 * i) / Math.max(1, n - 1);
    const parcial = i === n - 1 ? avanceDelDia : 1;
    return Math.round(1320 * DOW[dow] * tendencia * entre(rnd, 0.9, 1.1) * parcial);
  });
  const usosSerie = visitantesSerie.map((v) => Math.round(v * entre(rnd, 0.36, 0.41)));
  const tiempoSerie = visitantesSerie.map((v) => (v === 0 ? 0 : Math.round(entre(rnd, 82_000, 112_000))));
  const interesSerie = visitantesSerie.map((v) => Math.round(v * 0.0088 * entre(rnd, 0.7, 1.3)));
  const checkoutsSerie = interesSerie.map((v) => Math.round(v * 0.4 * entre(rnd, 0.75, 1.25)));
  const ventasSerie = ts.map(() => 0);
  const totalCheckouts = checkoutsSerie.reduce((a, b) => a + b, 0);
  const objetivoVentas = rango === "hoy" ? 0 : Math.max(1, Math.round(totalCheckouts / 40));
  for (let k = 0; k < objetivoVentas; k++) {
    let r = rnd() * totalCheckouts;
    const i = checkoutsSerie.findIndex((c) => (r -= c) < 0);
    ventasSerie[i < 0 ? n - 1 : i]++;
  }

  const compras: Compra[] = [];
  const ingresosSerie = ts.map(() => 0);
  ventasSerie.forEach((cant, i) => {
    for (let k = 0; k < cant; k++) {
      const r = rnd();
      let acum = 0;
      const prod = PRODUCTOS.find((p) => (acum += p.peso) >= r) ?? PRODUCTOS[0];
      const paginasDelProducto = PAGINAS.filter((p) => p.producto === prod.producto);
      const desdePagina = paginasDelProducto[Math.floor(rnd() * paginasDelProducto.length)];
      const largo = granularidad === "hora" ? HORA : DIA;
      const fin = Math.min(ts[i] + largo, ahora);
      const fecha = ts[i] + Math.floor((fin - ts[i]) * entre(rnd, 0.2, 0.95));
      ingresosSerie[i] += prod.precio;
      compras.push({
        id: `demo-${rango}-${compras.length + 1}`,
        fecha: iso(fecha),
        producto: prod.producto,
        monto: prod.precio,
        moneda: "ARS",
        emailEnmascarado: EMAILS[compras.length % EMAILS.length],
        conCuenta: rnd() < 0.4,
        desde: desdePagina?.path ?? null,
        estado: rango === "90d" && compras.length === 2 ? "reembolsado" : "aprobado",
      });
    }
  });
  compras.sort((a, b) => Date.parse(b.fecha) - Date.parse(a.fecha));

  const serie = (valores: number[]): Punto[] => valores.map((v, i) => ({ t: iso(ts[i]), v }));
  const suma = (valores: number[]) => valores.reduce((a, b) => a + b, 0);
  const unicos = rango === "hoy" ? 1 : rango === "7d" ? 0.9 : rango === "30d" ? 0.82 : 0.76;
  const visitantes = Math.round(suma(visitantesSerie) * unicos);
  const usos = suma(usosSerie);
  const conTiempo = tiempoSerie.filter((v) => v > 0).sort((a, b) => a - b);
  const tiempo = conTiempo.length ? conTiempo[Math.floor(conTiempo.length / 2)] : 0;
  const interes = suma(interesSerie);
  const checkouts = suma(checkoutsSerie);
  const ventas = suma(ventasSerie);
  const ingresos = suma(ingresosSerie);

  const ventasAnteriores = rango === "hoy" ? 1 : Math.max(0, ventas - 1);
  const ingresosAnteriores = compras
    .slice(0, ventasAnteriores)
    .reduce((a, c) => a + c.monto, ventasAnteriores > compras.length ? 9900 : 0);

  const kpi = (clave: KpiClave, valor: number, anterior: number, valores: number[]): Kpi => ({
    clave,
    valor,
    anterior: Math.round(anterior),
    serie: serie(valores),
  });
  const kpis: Kpi[] = [
    kpi("visitantes", visitantes, visitantes / entre(rnd, 1.08, 1.16), visitantesSerie),
    kpi("usos", usos, usos / entre(rnd, 1.1, 1.2), usosSerie),
    kpi("tiempo", tiempo, tiempo * entre(rnd, 0.9, 0.97), tiempoSerie),
    kpi("interes", interes, interes / entre(rnd, 0.88, 1.02), interesSerie),
    kpi("checkouts", checkouts, checkouts / entre(rnd, 0.95, 1.12), checkoutsSerie),
    kpi("ventas", ventas, ventasAnteriores, ventasSerie),
    kpi("ingresos", ingresos, ingresosAnteriores, ingresosSerie),
  ];

  const vieronOferta = Math.round(visitantes * 0.31);
  const pesos = PRODUCTOS.map((p) => p.peso);
  const vio = repartir(vieronOferta, pesos);
  const abrio = repartir(interes, pesos);
  const fue = repartir(checkouts, pesos);
  const embudos: EmbudoProducto[] = PRODUCTOS.map((p, i) => {
    const pagaron = compras.filter((c) => c.producto === p.producto && c.estado === "aprobado");
    const pago = pagaron.length;
    const fueAPagar = Math.max(fue[i], pago);
    const abrioCompra = Math.max(abrio[i], fueAPagar);
    return {
      producto: p.producto,
      titulo: p.titulo,
      precio: p.precio,
      pasos: [
        { paso: "vio_oferta", n: Math.max(vio[i], abrioCompra) },
        { paso: "abrio_compra", n: abrioCompra },
        { paso: "fue_a_pagar", n: fueAPagar },
        { paso: "pago", n: pago },
      ],
      ingresos: pagaron.reduce((a, c) => a + c.monto, 0),
    };
  });

  const visitasPorPagina = repartir(
    visitantes,
    PAGINAS.map((p) => p.peso * entre(rnd, 0.85, 1.15)),
  );
  const pesoInteres = PAGINAS.map((p, i) => (p.producto ? visitasPorPagina[i] * (p.path === "/planillas" ? 6 : 1) : 0));
  const interesPorPagina = repartir(interes, pesoInteres);
  const checkoutsPorPagina = repartir(checkouts, pesoInteres);
  const paginas: FilaPagina[] = PAGINAS.map((p, i) => {
    const vis = visitasPorPagina[i];
    const usosPagina = Math.round(vis * p.tasa * entre(rnd, 0.93, 1.07));
    const ventasPagina = compras.filter((c) => c.desde === p.path && c.estado === "aprobado").length;
    const factor = usos > 0 ? usosPagina / usos : 0;
    return {
      path: p.path,
      titulo: p.titulo,
      vistas: Math.round(vis * entre(rnd, 1.18, 1.34)),
      visitantes: vis,
      usos: usosPagina,
      tasaUso: vis > 0 ? usosPagina / vis : 0,
      tiempoMedianoMs: Math.round(p.tiempo * entre(rnd, 0.92, 1.08)),
      compartidos: Math.round(usosPagina * entre(rnd, 0.004, 0.02)),
      interesCompra: interesPorPagina[i],
      checkouts: Math.max(checkoutsPorPagina[i], ventasPagina),
      ventas: ventasPagina,
      producto: p.producto,
      serieUsos: usosSerie.map((u, k) => {
        const inclinacion = 1 + (p.tendencia - 1) * (k / Math.max(1, n - 1) - 0.5) * 2;
        return Math.max(0, Math.round(u * factor * inclinacion * entre(rnd, 0.85, 1.15)));
      }),
    };
  }).sort((a, b) => b.usos - a.usos);

  const visPorFuente = repartir(visitantes, FUENTES.map((f) => f.peso));
  const ventasPorFuente = repartir(ventas, [0.62, 0.2, 0.1, 0.08, 0, 0, 0]);
  const fuentes: FilaFuente[] = FUENTES.map((f, i) => ({
    fuente: f.fuente,
    visitantes: visPorFuente[i],
    usos: Math.round(visPorFuente[i] * f.tasa),
    ventas: ventasPorFuente[i],
  }));

  const dispositivos: Reparto[] = [
    { clave: "movil", n: 0 },
    { clave: "escritorio", n: 0 },
    { clave: "tablet", n: 0 },
  ];
  repartir(visitantes, [0.71, 0.26, 0.03]).forEach((v, i) => (dispositivos[i].n = v));

  const paisesCodigos = ["AR", "UY", "ES", "CL", "PY", "US", "MX"];
  const paises: Reparto[] = repartir(visitantes, [0.93, 0.018, 0.012, 0.009, 0.008, 0.007, 0.005]).map(
    (v, i) => ({ clave: paisesCodigos[i], n: v }),
  );

  const escalaBusquedas = rango === "hoy" ? 0.12 : rango === "7d" ? 1 : rango === "30d" ? 4.1 : 11.6;
  const busquedas: Busqueda[] = BUSQUEDAS.map((b) => ({
    q: b.q,
    n: Math.max(1, Math.round(56 * b.peso * escalaBusquedas * entre(rnd, 0.85, 1.15))),
    sinResultados: b.sinResultados,
  })).sort((a, b) => b.n - a.n);

  const nuevas = rango === "hoy" ? 1 : rango === "7d" ? 6 : rango === "30d" ? 19 : 37;
  const cuentas = {
    total: 37,
    nuevas,
    verificadas: 29,
    conCompras: 3,
    perfiles: [
      { clave: "empleado", n: 14 },
      { clave: "empleador", n: 9 },
      { clave: "contador", n: 6 },
      { clave: "monotributista", n: 5 },
      { clave: "otro", n: 2 },
      { clave: "estudio", n: 1 },
    ],
  };

  const vivo = {
    ahora: 7,
    paginas: [
      { clave: "/sueldo-neto", n: 3 },
      { clave: "/aguinaldo", n: 2 },
      { clave: "/monotributo", n: 1 },
      { clave: "/empleada-domestica", n: 1 },
    ],
  };

  return {
    rango,
    mercado: opciones.mercado ?? null,
    desde: iso(desde),
    hasta: iso(ahora),
    generado: iso(ahora),
    granularidad,
    kpis,
    paginas,
    embudos,
    fuentes,
    dispositivos,
    paises,
    busquedas,
    compras,
    cuentas,
    vivo,
    mercados: mercadosDeEjemplo(visitantes, usos, compras.filter((c) => c.estado === "aprobado").length, compras.reduce((a, c) => a + (c.estado === "aprobado" ? c.monto : 0), 0)),
    lecturas: lecturasDeEjemplo(rango, embudos, busquedas, paginas, fuentes, dispositivos, visitantes),
    sinDatos: false,
  };
}

function lecturasDeEjemplo(
  rango: Rango,
  embudos: EmbudoProducto[],
  busquedas: Busqueda[],
  paginas: FilaPagina[],
  fuentes: FilaFuente[],
  dispositivos: Reparto[],
  visitantes: number,
): Lectura[] {
  const lecturas: Lectura[] = [];
  const comercio = embudos.find((e) => e.producto === "planilla-comercio");
  if (comercio) {
    const [, abrio, fue, pago] = comercio.pasos.map((p) => p.n);
    lecturas.push({
      id: "embudo-comercio",
      tono: "alerta",
      titulo: "La Planilla Comercio se cae justo en el pago",
      detalle: `De ${numero(abrio)} que abrieron la compra, ${numero(fue)} fueron a pagar y ${
        pago === 1 ? "1 pagó" : `${numero(pago)} pagaron`
      }. El interés está: lo que falla es el último paso. Probaría sumar transferencia además de Mercado Pago.`,
      accion: { texto: "Ver el embudo", href: "#embudo" },
    });
  }
  const sinResultado = busquedas.find((b) => b.sinResultados);
  if (sinResultado) {
    lecturas.push({
      id: "busqueda-sin-resultado",
      tono: "oportunidad",
      titulo: `Buscaron «${sinResultado.q}» ${numero(sinResultado.n)} veces y no encontraron nada`,
      detalle:
        "Es gente pidiendo algo que todavía no vendés. Una planilla para el convenio gastronómico sale con la misma receta que la de Comercio.",
      accion: { texto: "Ver qué buscan", href: "#busquedas" },
    });
  }
  const aguinaldo = paginas.find((p) => p.path === "/aguinaldo");
  if (aguinaldo && rango !== "hoy") {
    lecturas.push({
      id: "logro-aguinaldo",
      tono: "logro",
      titulo: "Aguinaldo viene en subida",
      detalle: `La usaron ${numero(aguinaldo.usos)} personas ${
        rango === "7d" ? "esta semana" : "en el período"
      } y la curva sigue para arriba. Es buen lugar para mostrar la Planilla Comercio: hoy no ofrece nada.`,
      accion: { texto: "Abrir la calculadora", href: "/aguinaldo" },
    });
  }
  const chatgpt = fuentes.find((f) => f.fuente === "ChatGPT");
  const movil = dispositivos.find((d) => d.clave === "movil");
  if (chatgpt && visitantes > 0) {
    lecturas.push({
      id: "dato-chatgpt",
      tono: "dato",
      titulo: `ChatGPT ya te manda ${deCada100(chatgpt.visitantes / visitantes)} visitas`,
      detalle: `Y esas personas usan más la calculadora que las que llegan por Google (${deCada100(
        chatgpt.usos / Math.max(1, chatgpt.visitantes),
      )}).${movil ? ` Ojo que ${deCada100(movil.n / visitantes)} entran desde el celular.` : ""}`,
    });
  }
  return lecturas;
}

export function panelSinDatos(rango: Rango, opciones: Opciones = {}): PanelDatos {
  const ahora = (opciones.ahora ?? new Date()).getTime();
  const { desde, granularidad, ts } = buckets(rango, ahora);
  const vacia = ts.map((t) => ({ t: iso(t), v: 0 }));
  const claves: KpiClave[] = ["visitantes", "usos", "tiempo", "interes", "checkouts", "ventas", "ingresos"];
  return {
    rango,
    mercado: opciones.mercado ?? null,
    desde: iso(desde),
    hasta: iso(ahora),
    generado: iso(ahora),
    granularidad,
    kpis: claves.map((clave) => ({ clave, valor: 0, anterior: 0, serie: vacia })),
    paginas: [],
    embudos: PRODUCTOS.map((p) => ({
      producto: p.producto,
      titulo: p.titulo,
      precio: p.precio,
      pasos: [
        { paso: "vio_oferta", n: 0 },
        { paso: "abrio_compra", n: 0 },
        { paso: "fue_a_pagar", n: 0 },
        { paso: "pago", n: 0 },
      ],
      ingresos: 0,
    })),
    fuentes: [],
    dispositivos: [],
    paises: [],
    busquedas: [],
    compras: [],
    cuentas: { total: 0, nuevas: 0, verificadas: 0, conCompras: 0, perfiles: [] },
    vivo: { ahora: 0, paginas: [] },
    mercados: [],
    lecturas: [],
    sinDatos: true,
  };
}
