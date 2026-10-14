import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

function edadEnTexto(meses: number): string {
  const anios = Math.floor(meses / 12);
  const resto = meses % 12;
  return resto === 0 ? `${anios} años` : `${anios} años y ${resto} ${resto === 1 ? "mes" : "meses"}`;
}

export default definirCalculadora({
  id: "es.jubilacion",
  mercado: "es",
  concepto: "jubilacion",
  slug: "pension-jubilacion",
  estado: "publicado",
  requiere: {
    "es.jubilacion-porcentajes": "mapa",
    "es.edad-jubilacion": "mapa",
    "es.pension-maxima": "numero",
  },
  campos: [
    {
      id: "base",
      tipo: "moneda",
      etiqueta: "Base reguladora mensual",
      min: 0,
      porDefecto: 2000,
      ayuda: "La media de tus bases de cotización de los últimos años, actualizadas con el IPC. La puedes consultar en tu informe de la Seguridad Social.",
    },
    { id: "anios", tipo: "entero", etiqueta: "Años cotizados", min: 0, max: 60, porDefecto: 35 },
    { id: "meses", tipo: "entero", etiqueta: "Meses cotizados además de los años", min: 0, max: 11, porDefecto: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    const p = valores["es.jubilacion-porcentajes"];
    const total = entrada.anios * 12 + entrada.meses;
    const minimo = p["anios-base"] * 12;
    if (total < minimo) throw new ErrorEntrada(`Para cobrar la pensión contributiva necesitas al menos ${p["anios-base"]} años cotizados.`, "anios");
    const extra = total - minimo;
    const tramo1 = Math.min(extra, p["meses-1"]);
    const tramo2 = Math.min(Math.max(0, extra - p["meses-1"]), p["meses-2"]);
    const pct = Math.min(100, p.base + tramo1 * p["coeficiente-1"] + tramo2 * p["coeficiente-2"]);
    const sinTope = porcentaje(entrada.base, pct);
    const maxima = valores["es.pension-maxima"];
    const pension = redondear(Math.min(sinTope, maxima));
    const e = valores["es.edad-jubilacion"];
    const edad = total >= e["cotizacion-requerida"] ? e["edad-con-cotizacion"] : e["edad-sin-cotizacion"];
    const observaciones: string[] = [];
    if (sinTope > maxima) observaciones.push("Tu pensión llega a la pensión máxima, así que cobras el tope.");
    observaciones.push("Es la pensión ordinaria. Si te jubilas antes se aplican coeficientes reductores, y si te jubilas más tarde, un complemento por demora.");
    return {
      porcentaje: redondear(pct),
      pension,
      anual: redondear(pension * 14),
      edad: edadEnTexto(edad),
      observaciones,
    };
  },
  resultado: [
    { clave: "pension", etiqueta: "Pensión mensual (14 pagas)", formato: "moneda", destacada: true },
    { clave: "porcentaje", etiqueta: "Porcentaje de la base reguladora", formato: "porcentaje" },
    { clave: "anual", etiqueta: "Pensión al año", formato: "moneda" },
    { clave: "edad", etiqueta: "Edad ordinaria de jubilación en 2026 con tu cotización", formato: "texto" },
  ],
});
