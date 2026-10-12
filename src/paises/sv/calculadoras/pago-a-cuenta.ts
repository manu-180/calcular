import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "sv.pago-a-cuenta",
  mercado: "sv",
  concepto: "propio",
  slug: "pago-a-cuenta",
  estado: "publicado",
  requiere: {
    "sv.pago-a-cuenta": "mapa",
  },
  campos: [
    { id: "ingresos", tipo: "moneda", etiqueta: "Ingresos brutos del mes", min: 0 },
    { id: "actividad", tipo: "opcion-dato", etiqueta: "Actividad", dato: "sv.pago-a-cuenta", porDefecto: "general" },
  ],
  calcular(entrada, valores, { redondear }) {
    const tasa = enMapa(valores["sv.pago-a-cuenta"], entrada.actividad);
    return {
      tasa,
      pago: redondear(porcentaje(entrada.ingresos, tasa)),
      observaciones: ["Se declara y se paga dentro de los diez días hábiles del mes siguiente. Al final del año lo resta de su impuesto sobre la renta."],
    };
  },
  resultado: [
    { clave: "tasa", etiqueta: "Porcentaje", formato: "porcentaje" },
    { clave: "pago", etiqueta: "Pago a cuenta del mes", formato: "moneda", destacada: true },
  ],
});
