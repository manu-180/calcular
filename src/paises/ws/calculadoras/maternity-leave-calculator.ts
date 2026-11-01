import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { esFechaISO, sumarDias } from "@/motor/vigencia";

export default definirCalculadora({
  id: "ws.maternity-leave-calculator",
  mercado: "ws",
  concepto: "propio",
  slug: "maternity-leave-calculator",
  estado: "publicado",
  requiere: {
    "ws.maternity-full-pay-weeks": "numero",
    "ws.maternity-unpaid-weeks": "numero",
    "ws.maternity-reduced-weeks": "numero",
    "ws.maternity-reduced-pay-share": "numero",
    "ws.paternity-days": "numero",
  },
  campos: [
    { id: "inicio", tipo: "fecha", etiqueta: "First day of leave", porDefecto: "hoy" },
    {
      id: "opcion",
      tipo: "opcion",
      etiqueta: "Payment option",
      opciones: [
        { valor: "a", etiqueta: "Option A: full pay for part, then unpaid" },
        { valor: "b", etiqueta: "Option B: two-thirds pay throughout" },
      ],
      porDefecto: "a",
    },
    { id: "pagoMensual", tipo: "moneda", etiqueta: "Monthly pay", min: 0, porDefecto: 3000 },
  ],
  calcular(e, v, { redondear }) {
    if (!esFechaISO(e.inicio)) throw new ErrorEntrada("Enter the first day of leave.", "inicio");
    const semanal = (e.pagoMensual * 12) / 52;
    const a = e.opcion === "a";
    const semanasPagadas = a ? v["ws.maternity-full-pay-weeks"] : v["ws.maternity-reduced-weeks"];
    const semanasTotal = a ? v["ws.maternity-full-pay-weeks"] + v["ws.maternity-unpaid-weeks"] : v["ws.maternity-reduced-weeks"];
    const pago = a ? semanal * semanasPagadas : porcentaje(semanal * semanasPagadas, v["ws.maternity-reduced-pay-share"]);
    const ultimo = sumarDias(e.inicio, semanasTotal * 7 - 1);
    return {
      semanasTotal,
      semanasPagadas,
      pago: redondear(pago),
      ultimo,
      regreso: sumarDias(ultimo, 1),
      observaciones: [
        "To qualify you need a medical certificate of pregnancy and at least 12 months of continuous service with the employer. These are minimum periods, so a contract or your employer may offer more.",
        "Tell your employer in writing when you plan to start and when you expect to return.",
      ],
    };
  },
  resultado: [
    { clave: "pago", etiqueta: "Pay over the leave", formato: "moneda", destacada: true },
    { clave: "semanasTotal", etiqueta: "Length of leave", formato: "semanas" },
    { clave: "semanasPagadas", etiqueta: "Weeks that are paid", formato: "semanas" },
    { clave: "ultimo", etiqueta: "Last day of leave", formato: "fecha" },
    { clave: "regreso", etiqueta: "Day you return to work", formato: "fecha" },
  ],
});
