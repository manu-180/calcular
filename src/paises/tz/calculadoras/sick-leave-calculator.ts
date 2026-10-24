import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "tz.sick-leave-calculator",
  mercado: "tz",
  concepto: "propio",
  slug: "sick-leave-calculator",
  estado: "publicado",
  requiere: {
    "tz.sick-full-days": "numero",
    "tz.sick-half-days": "numero",
  },
  campos: [
    { id: "dias", tipo: "entero", etiqueta: "Sick days in this leave cycle, with a medical certificate", min: 0, porDefecto: 70 },
    { id: "diario", tipo: "moneda", etiqueta: "Your full wage for one day (optional)", min: 0, requerido: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.dias < 0) throw new ErrorEntrada("Days cannot be negative.", "dias");
    const completos = Math.min(e.dias, v["tz.sick-full-days"]);
    const medios = Math.min(Math.max(0, e.dias - completos), v["tz.sick-half-days"]);
    const sinPaga = e.dias - completos - medios;
    const paga = e.diario !== null && e.diario > 0 ? redondear(e.diario * completos + (e.diario * medios) / 2) : null;
    const observaciones = sinPaga > 0 ? ["Days beyond the paid sick leave in the Act are not paid unless your contract gives more."] : [];
    return { completos, medios, sinPaga, paga, observaciones };
  },
  resultado: [
    { clave: "completos", etiqueta: "Days on full wages", formato: "dias", destacada: true },
    { clave: "medios", etiqueta: "Days on half wages", formato: "dias" },
    { clave: "sinPaga", etiqueta: "Days without sick pay", formato: "dias" },
    { clave: "paga", etiqueta: "Sick pay for these days", formato: "moneda" },
  ],
});
