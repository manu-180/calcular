import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "cl.tope-imponible",
  mercado: "cl",
  concepto: "propio",
  slug: "tope-imponible",
  estado: "publicado",
  requiere: {
    "cl.tope-imponible": "numero",
    "cl.tope-imponible-cesantia": "numero",
    "cl.tope-indemnizacion": "numero",
    "cl.uf": "serie",
  },
  campos: [
    {
      id: "sueldo",
      tipo: "moneda",
      etiqueta: "Tu sueldo imponible (opcional)",
      ayuda: "Si lo escribes, te decimos sobre cuánto se calculan tus cotizaciones.",
      min: 0,
      porDefecto: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const uf = valores["cl.uf"];
    const tope = redondear(valores["cl.tope-imponible"] * uf.valor);
    const topeCesantia = redondear(valores["cl.tope-imponible-cesantia"] * uf.valor);
    const topeIndemnizacion = redondear(valores["cl.tope-indemnizacion"] * uf.valor);
    const observaciones: string[] = [];
    if (entrada.sueldo > tope) observaciones.push("Tu sueldo pasa el tope: AFP y salud se calculan solo hasta el tope, no sobre todo tu sueldo.");
    return {
      tope,
      topeCesantia,
      topeIndemnizacion,
      valorUf: uf.valor,
      fechaUf: uf.fecha,
      baseAfp: entrada.sueldo > 0 ? Math.min(entrada.sueldo, tope) : null,
      baseCesantia: entrada.sueldo > 0 ? Math.min(entrada.sueldo, topeCesantia) : null,
      observaciones,
    };
  },
  resultado: [
    { clave: "tope", etiqueta: "Tope imponible para AFP, salud y accidentes", formato: "moneda", destacada: true },
    { clave: "topeCesantia", etiqueta: "Tope imponible del seguro de cesantía", formato: "moneda" },
    { clave: "topeIndemnizacion", etiqueta: "Tope de la remuneración para indemnizaciones", formato: "moneda" },
    { clave: "baseAfp", etiqueta: "Tu base para AFP y salud", formato: "moneda" },
    { clave: "baseCesantia", etiqueta: "Tu base para el seguro de cesantía", formato: "moneda" },
    { clave: "valorUf", etiqueta: "Valor de la UF usada", formato: "moneda", decimales: 2 },
    { clave: "fechaUf", etiqueta: "Fecha de la UF", formato: "fecha" },
  ],
});
