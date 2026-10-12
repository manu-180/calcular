import { definirCalculadora, porcentaje } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

// En las bancas la ley fija una tasa por tramo que se aplica sobre todo el premio, no sobre el
// excedente: por eso no sirve aplicarEscala.
function tasaDelTramo(escala: readonly FilaEscala[], premio: number): number {
  let tasa = 0;
  for (const f of escala) if (premio >= f.desde) tasa = f.tasa;
  return tasa;
}

export default definirCalculadora({
  id: "do.impuesto-premios",
  mercado: "do",
  concepto: "propio",
  slug: "impuesto-premios",
  estado: "publicado",
  requiere: {
    "do.retencion-premios-loteria": "numero",
    "do.retencion-premios-bancas": "escala",
  },
  campos: [
    { id: "premio", tipo: "moneda", etiqueta: "Monto del premio", min: 0 },
    {
      id: "origen",
      tipo: "opcion",
      etiqueta: "De dónde viene el premio",
      opciones: [
        { valor: "loteria", etiqueta: "Lotería, rifa, loto o promoción" },
        { valor: "banca", etiqueta: "Banca de lotería o banca deportiva" },
      ],
      porDefecto: "loteria",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const tasa = entrada.origen === "banca" ? tasaDelTramo(valores["do.retencion-premios-bancas"], entrada.premio) : valores["do.retencion-premios-loteria"];
    const impuesto = redondear(porcentaje(entrada.premio, tasa));
    const observaciones: string[] = ["La retención es pago definitivo: el premio no se vuelve a declarar."];
    if (entrada.origen === "banca" && tasa === 0) observaciones.push("Los premios de bancas de este monto no tienen retención.");
    return { tasa, impuesto, neto: redondear(entrada.premio - impuesto), observaciones };
  },
  resultado: [
    { clave: "tasa", etiqueta: "Porcentaje de retención", formato: "porcentaje" },
    { clave: "impuesto", etiqueta: "Impuesto retenido", formato: "moneda" },
    { clave: "neto", etiqueta: "Lo que cobras", formato: "moneda", destacada: true },
  ],
});
