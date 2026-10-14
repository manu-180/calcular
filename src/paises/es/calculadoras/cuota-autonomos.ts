import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

const REDUCIDA = ["r1", "r2", "r3"] as const;
const GENERAL = ["g1", "g2", "g3", "g4", "g5", "g6", "g7", "g8", "g9", "g10", "g11"] as const;

const EUROS = new Intl.NumberFormat("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function nombreTramo(clave: string): string {
  return clave.startsWith("r") ? `Tramo ${clave.slice(1)} de la tabla reducida` : `Tramo ${clave.slice(1)} de la tabla general`;
}

export default definirCalculadora({
  id: "es.cuota-autonomos",
  mercado: "es",
  concepto: "propio",
  slug: "cuota-autonomos",
  estado: "publicado",
  requiere: {
    "es.autonomos-limite-tramo": "mapa",
    "es.autonomos-base-minima": "mapa",
    "es.autonomos-base-maxima": "mapa",
    "es.autonomos-tipos": "mapa",
    "es.autonomos-gastos-genericos": "mapa",
  },
  campos: [
    {
      id: "rendimiento",
      tipo: "moneda",
      etiqueta: "Rendimiento neto previsto del año",
      min: 0,
      porDefecto: 24000,
      ayuda: "Ingresos menos gastos de tu actividad, sin restar la propia cuota de autónomos.",
    },
    { id: "tipoAutonomo", tipo: "opcion-dato", etiqueta: "Tipo de autónomo", dato: "es.autonomos-gastos-genericos", porDefecto: "general" },
    {
      id: "base",
      tipo: "moneda",
      etiqueta: "Base de cotización elegida",
      min: 0,
      requerido: false,
      ayuda: "Si la dejas vacía, usamos la base mínima de tu tramo.",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const gastos = valores["es.autonomos-gastos-genericos"][entrada.tipoAutonomo];
    if (gastos === undefined) throw new ErrorEntrada({ codigo: "opcion-invalida" });
    const limites = valores["es.autonomos-limite-tramo"];
    const mensual = redondear((entrada.rendimiento - porcentaje(entrada.rendimiento, gastos)) / 12);
    let tramo: string;
    if (mensual < limites.r3) tramo = REDUCIDA.find((k) => (k === "r3" ? mensual < limites[k] : mensual <= limites[k])) ?? "r3";
    else tramo = GENERAL.find((k) => mensual <= limites[k]) ?? "g12";
    const minima = valores["es.autonomos-base-minima"][tramo];
    const maxima = valores["es.autonomos-base-maxima"][tramo];
    const base = entrada.base ?? minima;
    if (base < minima || base > maxima) {
      throw new ErrorEntrada(`En tu tramo la base tiene que estar entre ${EUROS.format(minima)} y ${EUROS.format(maxima)} euros.`, "base");
    }
    const t = valores["es.autonomos-tipos"];
    const tipoTotal = t["contingencias-comunes"] + t["contingencias-profesionales"] + t["cese-actividad"] + t.formacion + t.mei;
    const cuota = redondear(porcentaje(base, tipoTotal));
    return {
      rendimientoMensual: mensual,
      tramo: nombreTramo(tramo),
      baseMinima: minima,
      baseMaxima: maxima,
      base,
      tipoTotal: redondear(tipoTotal),
      cuota,
      cuotaAnual: redondear(cuota * 12),
      cuotaMinima: redondear(porcentaje(minima, tipoTotal)),
      cuotaMaxima: redondear(porcentaje(maxima, tipoTotal)),
      observaciones: [
        "Al año siguiente la Seguridad Social regulariza tu cuota con los rendimientos que comunica Hacienda: si ganaste más, pagas la diferencia; si ganaste menos, te devuelven.",
        "No incluye la tarifa plana de nuevos autónomos ni otras bonificaciones.",
      ],
    };
  },
  resultado: [
    { clave: "cuota", etiqueta: "Cuota de autónomos al mes", formato: "moneda", destacada: true },
    { clave: "cuotaAnual", etiqueta: "Cuota al año", formato: "moneda" },
    { clave: "tramo", etiqueta: "Tu tramo", formato: "texto" },
    { clave: "rendimientoMensual", etiqueta: "Rendimiento neto mensual computable", formato: "moneda" },
    { clave: "base", etiqueta: "Base de cotización", formato: "moneda" },
    { clave: "baseMinima", etiqueta: "Base mínima del tramo", formato: "moneda" },
    { clave: "baseMaxima", etiqueta: "Base máxima del tramo", formato: "moneda" },
    { clave: "cuotaMinima", etiqueta: "Cuota con la base mínima", formato: "moneda" },
    { clave: "cuotaMaxima", etiqueta: "Cuota con la base máxima", formato: "moneda" },
    { clave: "tipoTotal", etiqueta: "Tipo de cotización total", formato: "porcentaje" },
  ],
});
