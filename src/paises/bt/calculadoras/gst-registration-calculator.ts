import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "bt.gst-registration-calculator",
  mercado: "bt",
  concepto: "propio",
  slug: "gst-registration-calculator",
  estado: "publicado",
  requiere: {
    "bt.gst-rate": "numero",
    "bt.gst-threshold": "numero",
    "bt.gst-voluntary-threshold": "numero",
  },
  campos: [{ id: "ventas", tipo: "moneda", etiqueta: "Your business turnover for a year", min: 0, porDefecto: 3000000 }],
  calcular(e, v, { redondear }) {
    if (e.ventas < 0) throw new ErrorEntrada("The amount cannot be negative.", "ventas");
    const umbral = v["bt.gst-threshold"];
    const voluntario = v["bt.gst-voluntary-threshold"];
    const situacion = e.ventas >= umbral ? "You must register for GST" : e.ventas >= voluntario ? "You may register voluntarily" : "You do not need to register";
    return {
      situacion,
      faltante: e.ventas >= umbral ? 0 : redondear(umbral - e.ventas),
      gst: redondear(porcentaje(e.ventas, v["bt.gst-rate"])),
      umbral,
      voluntario,
    };
  },
  resultado: [
    { clave: "situacion", etiqueta: "Where you stand", formato: "texto", destacada: true },
    { clave: "faltante", etiqueta: "Below the required registration level by", formato: "moneda", ocultarSiCero: true },
    { clave: "gst", etiqueta: "GST on this turnover if you charge it", formato: "moneda" },
    { clave: "umbral", etiqueta: "Required registration from", formato: "moneda" },
    { clave: "voluntario", etiqueta: "Voluntary registration from", formato: "moneda" },
  ],
});
