// Pruebas de lo que afirma "datos vivos": frescura (sello de cada calculadora e inicio del país),
// el registro automático de /<m>/novedades (feedDe) y el destino del selector de país. Primero con
// un país sintético y fecha fija (sin red, sin reloj), después contra el registro real: ninguna
// fecha mostrada puede estar en el futuro, ninguna serie vencida puede figurar como al día y el feed
// tiene que venir ordenado y con ids únicos (son los <id> del Atom).
// Uso: npx tsx scripts/check_frescura.ts
import { cercania, frescuraDeCalculadora, frescuraDePais, frescuraDeUsados } from "../src/motor/frescura";
import { feedDe, ultimaEntrada, type EntradaFeed } from "../src/motor/novedades";
import { crearRegistro, resolverValores } from "../src/motor/registro";
import type { Dato, DefinicionCalculadora, EntradaCalculadora, FechaISO, Fuente, PaisDefinido, Serie } from "../src/motor/tipos";
import { destinoEquivalente, type MapaEquivalentes } from "../src/motor/ui/geo-cliente";
import { diasEntre, hoyEn, valorSerie } from "../src/motor/vigencia";
import { mercado as mercadoZz } from "../src/paises/zz/mercado";
import { registro as registroReal } from "../src/paises";

delete process.env.CALCULAR_HOY;

let ok = 0;
const fallas: string[] = [];
function igual(nombre: string, real: unknown, esperado: unknown) {
  const a = JSON.stringify(real);
  const b = JSON.stringify(esperado);
  if (a === b) ok++;
  else fallas.push(`${nombre}: dio ${a}, esperado ${b}`);
}
function verdad(nombre: string, cond: boolean, detalle = "") {
  if (cond) ok++;
  else fallas.push(`${nombre}${detalle ? `: ${detalle}` : ""}`);
}

// ---------- País sintético ----------

const HOY: FechaISO = "2026-10-12";
const fuente = (verificadoEl: FechaISO, organismo = "Organismo Z"): Fuente & { url: `https://${string}`; tipo: "primaria" } => ({
  organismo,
  titulo: `Norma ${verificadoEl}`,
  url: `https://zz.example/${organismo.replace(/\s/g, "-")}/${verificadoEl}`,
  tipo: "primaria",
  verificadoEl,
});
const verificado = (desde: FechaISO, verificadoEl: FechaISO, valor: number, extra: { hasta?: FechaISO; region?: string } = {}) => ({
  estado: "verificado" as const,
  desde,
  valor,
  fuente: fuente(verificadoEl),
  ...extra,
});

const datos: Dato[] = [
  {
    id: "zz.a",
    nombre: "Dato A",
    tipo: "numero",
    unidad: "XTS",
    tramos: [verificado("2026-01-01", "2026-01-05", 100, { hasta: "2026-09-30" }), verificado("2026-10-01", "2026-10-02", 110)],
  },
  { id: "zz.b", nombre: "Dato B", tipo: "numero", unidad: "%", tramos: [verificado("2025-01-01", "2026-10-08", 5)] },
  { id: "zz.c", nombre: "Dato C", tipo: "numero", unidad: "%", tramos: [verificado("2025-01-01", "2026-10-08", 6)] },
  {
    id: "zz.d",
    nombre: "Dato D",
    tipo: "numero",
    unidad: "XTS",
    tramos: [verificado("2025-01-01", "2025-01-01", 7, { hasta: "2026-10-31" }), verificado("2026-11-01", "2026-10-10", 8)],
  },
  { id: "zz.e", nombre: "Dato E", tipo: "numero", unidad: "XTS", tramos: [verificado("2025-01-01", "2025-01-01", 1, { hasta: "2027-05-31" }), verificado("2027-06-01", "2026-10-10", 2)] },
  {
    id: "zz.f",
    nombre: "Dato F",
    tipo: "numero",
    unidad: "XTS",
    regiones: ["norte", "sur"],
    tramos: [verificado("2026-09-01", "2026-09-02", 10, { region: "norte" }), verificado("2026-09-01", "2026-09-02", 12, { region: "sur" })],
  },
  {
    id: "zz.g",
    nombre: "Dato G",
    tipo: "numero",
    unidad: "XTS",
    tramos: [verificado("2025-01-01", "2025-01-01", 3), { estado: "no-verificado", desde: "2026-10-05", motivo: "sin norma" }].map((t, i) =>
      i === 0 ? { ...t, hasta: "2026-10-04" as FechaISO } : t,
    ) as Dato["tramos"],
  },
];

const serieViva: Serie = {
  id: "zz.s",
  nombre: "Serie S",
  unidad: "XTS",
  frecuencia: "diaria",
  maxAntiguedadDias: 7,
  fuente: fuente("2026-10-11", "Banco Z"),
  puntos: [
    ["2026-10-10", 1],
    ["2026-10-11", 1.1],
  ],
};
const serieVieja: Serie = { ...serieViva, id: "zz.t", nombre: "Serie T", puntos: [["2026-09-01", 2]] };

const definicion = {
  id: "zz-prueba",
  mercado: "zz",
  concepto: "propio",
  slug: "prueba",
  estado: "publicado",
  requiere: { "zz.a": "numero", "zz.s": "serie" },
  campos: [],
  calcular: () => ({}),
  resultado: [],
} as unknown as DefinicionCalculadora;
const entrada: EntradaCalculadora = {
  definicion,
  contenido: { calculadora: "zz-prueba", h1: "Prueba", title: "Prueba", description: "Prueba", intro: [], comoSeCalcula: [], faq: [], glosario: [] },
  cliente: async () => ({ default: () => null }),
};

const pais: PaisDefinido = {
  mercado: { ...mercadoZz, estado: "publicado" },
  datos,
  series: [serieViva, serieVieja],
  avisos: [],
  calculadoras: [entrada],
  novedades: [
    { id: "nota-1", fecha: "2026-10-05", titulo: "Nota", texto: "Texto", calculadoras: ["zz-prueba"], fuente: fuente("2026-10-05") },
    { id: "nota-futura", fecha: "2026-12-01", titulo: "Futura", texto: "No sale todavía", calculadoras: [], fuente: fuente("2026-10-05") },
  ],
  detectores: [
    { id: "det-s", carril: "serie", serie: "zz.s", metodo: "api-json", url: "https://zz.example/api", banda: { min: 0, max: 10, saltoRelativoMax: 1 }, traer: async () => null },
  ],
  errores: [],
};
const reg = crearRegistro([pais]);

// cercania
igual("cercania hoy", cercania("2026-10-12", HOY), "hoy");
igual("cercania ayer", cercania("2026-10-11", HOY), "ayer");
igual("cercania antes", cercania("2026-10-09", HOY), "fecha");
igual("cercania futuro no es hoy", cercania("2026-10-13", HOY), "fecha");

// frescura de una calculadora
const fc = frescuraDeCalculadora(reg, "zz", "prueba", HOY);
igual("calculadora: verificado = revisión del tramo vigente", fc?.verificadoEl, "2026-10-02");
igual("calculadora: actualizado = último punto de la serie", fc?.actualizadoEl, "2026-10-11");
igual("calculadora: la serie con detector es automática", fc?.series.map((s) => [s.id, s.automatica]), [["zz.s", true]]);
igual("calculadora: fuentes únicas", fc?.fuentes.length, 2);
igual("calculadora inexistente", frescuraDeCalculadora(reg, "zz", "no-existe", HOY), null);
const r = resolverValores(pais, definicion, HOY);
igual("frescuraDeUsados sin país: automática desconocida", r.ok ? frescuraDeUsados(r.usados).series[0]?.automatica : "sin resolver", null);

// frescura del país
const fp = frescuraDePais(reg, "zz", HOY);
igual("país: revisión más reciente entre los tramos vigentes", fp?.verificadoEl, "2026-10-08");
igual("país: último dato de las series vigentes", fp?.actualizadoEl, "2026-10-11");
igual("país: la serie vencida no cuenta como al día", fp?.seriesAtrasadas, ["zz.t"]);
igual("país: vigilado si tiene detectores", fp?.vigilado, true);
verdad("país: la serie vencida no está entre las series mostradas", !fp?.series.some((s) => s.id === "zz.t"));

// feed
const feed = feedDe(reg, "zz", HOY);
const porId = new Map(feed.map((e) => [e.id, e]));
const tipos = (t: EntradaFeed["tipo"]) => feed.filter((e) => e.tipo === t);
verdad("feed: nota publicada", porId.has("nota-nota-1"));
verdad("feed: nota con fecha futura no sale", !porId.has("nota-nota-futura"));
const a = porId.get("dato-zz.a-2026-10-01");
igual("feed: tramo que empezó a regir", a && a.tipo === "dato" ? [a.fecha, a.proximo, a.valor.tipo] : null, ["2026-10-01", false, "numero"]);
const d = porId.get("dato-zz.d-2026-11-01");
igual("feed: tramo ya cargado que rige pronto lleva la fecha de carga", d && d.tipo === "dato" ? [d.fecha, d.desde, d.proximo] : null, ["2026-10-10", "2026-11-01", true]);
verdad("feed: un tramo a más de 90 días no se anuncia", !porId.has("dato-zz.e-2027-06-01"));
const f = porId.get("dato-zz.f-2026-09-01");
igual("feed: dato por zona se anuncia una vez, como rango", f && f.tipo === "dato" ? f.valor.tipo : null, "rango");
verdad("feed: tramo no verificado no se anuncia", !feed.some((e) => e.id.startsWith("dato-zz.g-2026-10-05")));
const rev = porId.get("revision-2026-10-08");
igual("feed: revisiones del mismo día agrupadas", rev && rev.tipo === "revision" ? rev.datos.map((x) => x.id) : null, ["zz.b", "zz.c"]);
verdad("feed: un tramo anunciado como nuevo no se repite como revisión", !tipos("revision").some((e) => e.tipo === "revision" && e.datos.some((x) => x.id === "zz.a")));
const s = porId.get("serie-zz.s-2026-10-11");
igual("feed: último punto de la serie con el anterior", s && s.tipo === "serie" ? [s.fecha, s.anterior?.fecha] : null, ["2026-10-11", "2026-10-10"]);
verdad("feed: la serie vencida no aparece", !feed.some((e) => e.tipo === "serie" && e.serie === "zz.t"));
igual("feed: última entrada", ultimaEntrada(feed), "2026-10-11");

// destino del selector
const mapa: MapaEquivalentes = {
  porMercado: { mx: { aguinaldo: "bono-semestral", ptu: "reparto-utilidades" }, pe: { gratificacion: "bono-semestral" }, cl: {} },
  ar: { "bono-semestral": "https://calcular.ar/aguinaldo" },
  origenAR: "https://calcular.ar",
};
igual("selector: misma calculadora en otro país", destinoEquivalente(mapa, "/mx/aguinaldo", { codigo: "pe", href: "/pe" }), { href: "/pe/gratificacion", mismaCalculadora: true });
igual("selector: sin equivalente va al inicio", destinoEquivalente(mapa, "/mx/ptu", { codigo: "pe", href: "/pe" }), { href: "/pe", mismaCalculadora: false });
igual("selector: Argentina va a calcular.ar", destinoEquivalente(mapa, "/mx/aguinaldo", { codigo: "ar", href: "https://calcular.ar" }), {
  href: "https://calcular.ar/aguinaldo",
  mismaCalculadora: true,
});
igual("selector: misma sección", destinoEquivalente(mapa, "/mx/fuentes", { codigo: "cl", href: "/cl" }), { href: "/cl/fuentes", mismaCalculadora: false });
igual("selector: sin mapa, al inicio", destinoEquivalente(null, "/mx/aguinaldo", { codigo: "pe", href: "/pe" }), { href: "/pe", mismaCalculadora: false });
igual("selector: desde la raíz, al inicio", destinoEquivalente(mapa, "/", { codigo: "pe", href: "/pe" }), { href: "/pe", mismaCalculadora: false });
igual("selector: el país actual se queda en la página", destinoEquivalente(mapa, "/mx/aguinaldo", { codigo: "mx", href: "/mx" }), { href: "/mx/aguinaldo", mismaCalculadora: false });

// ---------- Registro real ----------

let calculadoras = 0;
for (const m of registroReal.mercados("interno")) {
  if (m.codigo === "global") continue;
  const hoy = hoyEn(m);
  const p = registroReal.pais(m.codigo)!;
  for (const c of registroReal.calculadorasPublicables(m.codigo, hoy, "interno")) {
    calculadoras++;
    const fr = frescuraDeCalculadora(registroReal, m.codigo, c.definicion.slug, hoy);
    if (!fr) {
      fallas.push(`${m.codigo}/${c.definicion.slug}: sin frescura aunque es publicable`);
      continue;
    }
    if (fr.verificadoEl && fr.verificadoEl > hoy) fallas.push(`${m.codigo}/${c.definicion.slug}: verificado en el futuro (${fr.verificadoEl})`);
    if (fr.actualizadoEl && fr.actualizadoEl > hoy) fallas.push(`${m.codigo}/${c.definicion.slug}: serie con fecha futura (${fr.actualizadoEl})`);
    for (const se of fr.series) {
      const serie = p.series.find((x) => x.id === se.id)!;
      if (diasEntre(se.fecha, hoy) > serie.maxAntiguedadDias) fallas.push(`${m.codigo}/${c.definicion.slug}: ${se.id} se muestra al día con un punto de hace ${diasEntre(se.fecha, hoy)} días`);
    }
    ok++;
  }
  const fpr = frescuraDePais(registroReal, m.codigo, hoy);
  verdad(`${m.codigo}: el inicio tiene una fecha de revisión`, Boolean(fpr?.verificadoEl));
  for (const id of fpr?.seriesAtrasadas ?? []) verdad(`${m.codigo}: ${id} atrasada de verdad`, valorSerie(p.series.find((x) => x.id === id)!, hoy) === null);

  const fe = feedDe(registroReal, m.codigo, hoy);
  const ids = fe.map((e) => e.id);
  verdad(`${m.codigo}: ids del feed únicos`, new Set(ids).size === ids.length, ids.filter((x, i) => ids.indexOf(x) !== i).join(", "));
  verdad(`${m.codigo}: feed sin fechas futuras`, fe.every((e) => e.fecha <= hoy), fe.filter((e) => e.fecha > hoy).map((e) => e.id).join(", "));
  verdad(`${m.codigo}: feed ordenado del más nuevo al más viejo`, fe.every((e, i) => i === 0 || fe[i - 1].fecha >= e.fecha));
  verdad(`${m.codigo}: el feed tiene entradas`, fe.length > 0);
}
verdad("registro real: hay calculadoras para revisar", calculadoras > 50, String(calculadoras));

if (fallas.length) {
  console.error(`check_frescura: ${fallas.length} fallas (${ok} ok)`);
  for (const x of fallas) console.error(`  - ${x}`);
  process.exit(1);
}
console.log(`check_frescura: ${ok} pruebas ok (${calculadoras} calculadoras reales)`);
