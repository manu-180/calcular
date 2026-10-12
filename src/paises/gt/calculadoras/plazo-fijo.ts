import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { DIAS_ANIO } from "../prestaciones";

export default definirCalculadora({
  id: "gt.plazo-fijo",
  mercado: "gt",
  concepto: "plazo-fijo",
  slug: "plazo-fijo",
  estado: "publicado",
  requiere: {
    "gt.isr-rentas-capital": "numero",
    "gt.tasa-pasiva": "serie",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Monto a invertir", min: 0 },
    {
      id: "tasa",
      tipo: "porcentaje",
      etiqueta: "Tasa de interés anual que le ofrece el banco",
      min: 0,
      max: 100,
      requerido: false,
      ayuda: "Si la deja vacía, usamos la tasa pasiva promedio del sistema bancario.",
    },
    { id: "dias", tipo: "entero", etiqueta: "Plazo en días", min: 1, max: 3650, porDefecto: 180 },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.dias < 1) throw new ErrorEntrada("Indique un plazo de al menos un día.", "dias");
    const referencia = valores["gt.tasa-pasiva"].valor;
    const tasa = entrada.tasa ?? referencia;
    const interes = redondear((porcentaje(entrada.monto, tasa) * entrada.dias) / DIAS_ANIO);
    const isr = redondear(porcentaje(interes, valores["gt.isr-rentas-capital"]));
    const neto = redondear(interes - isr);
    const observaciones = ["El banco retiene el ISR de los intereses al pagarlos."];
    if (entrada.tasa === null) observaciones.push("Se usó la tasa pasiva promedio del Banco de Guatemala. Su banco puede ofrecerle otra.");
    return { tasa, referencia, interes, isr, neto, total: redondear(entrada.monto + neto), observaciones };
  },
  resultado: [
    { clave: "tasa", etiqueta: "Tasa usada", formato: "porcentaje" },
    { clave: "interes", etiqueta: "Intereses", formato: "moneda" },
    { clave: "isr", etiqueta: "ISR retenido", formato: "moneda" },
    { clave: "neto", etiqueta: "Ganancia neta", formato: "moneda", destacada: true },
    { clave: "total", etiqueta: "Recibe al vencer", formato: "moneda" },
    { clave: "referencia", etiqueta: "Tasa pasiva promedio del sistema bancario", formato: "porcentaje" },
  ],
});
