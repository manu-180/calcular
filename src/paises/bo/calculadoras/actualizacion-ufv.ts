import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "bo.actualizacion-ufv",
  mercado: "bo",
  concepto: "propio",
  slug: "actualizacion-ufv",
  estado: "publicado",
  requiere: {
    "bo.ufv": "serie",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Monto en bolivianos de la fecha inicial", min: 0 },
    {
      id: "ufvInicial",
      tipo: "numero",
      etiqueta: "Valor de la UFV de la fecha inicial",
      ayuda: "Lo publica el Banco Central de Bolivia para cada día.",
      min: 1,
      max: 10,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const ufv = valores["bo.ufv"];
    const actualizado = redondear((entrada.monto * ufv.valor) / entrada.ufvInicial);
    return {
      ufvs: redondear(entrada.monto / entrada.ufvInicial),
      ufvHoy: ufv.valor,
      fecha: ufv.fecha,
      actualizado,
      diferencia: redondear(actualizado - entrada.monto),
      variacion: redondear((ufv.valor / entrada.ufvInicial - 1) * 100),
      observaciones: ["Es el mantenimiento de valor: el monto expresado en UFV y vuelto a bolivianos con la UFV de hoy."],
    };
  },
  resultado: [
    { clave: "ufvs", etiqueta: "El monto equivale a (UFV)", formato: "numero", decimales: 2 },
    { clave: "ufvHoy", etiqueta: "UFV de hoy", formato: "numero", decimales: 5 },
    { clave: "fecha", etiqueta: "Fecha del valor", formato: "fecha" },
    { clave: "variacion", etiqueta: "Variación de la UFV", formato: "porcentaje" },
    { clave: "diferencia", etiqueta: "Mantenimiento de valor", formato: "moneda" },
    { clave: "actualizado", etiqueta: "Monto actualizado a hoy", formato: "moneda", destacada: true },
  ],
});
