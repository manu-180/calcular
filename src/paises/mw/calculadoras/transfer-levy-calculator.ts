import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "mw.transfer-levy-calculator",
  mercado: "mw",
  concepto: "propio",
  slug: "transfer-levy-calculator",
  estado: "publicado",
  requiere: {
    "mw.transfer-levy-rate": "numero",
    "mw.transfer-levy-threshold": "numero",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Amount you are sending", min: 0, porDefecto: 250000 },
    {
      id: "canal",
      tipo: "opcion",
      etiqueta: "How you are sending it",
      opciones: [
        { valor: "mobile", etiqueta: "Mobile money (Airtel Money, TNM Mpamba and others)" },
        { valor: "bank", etiqueta: "Bank transfer through the bank's electronic system" },
      ],
      porDefecto: "mobile",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.monto <= 0) throw new ErrorEntrada("Enter the amount you are sending.", "monto");
    const umbral = v["mw.transfer-levy-threshold"];
    const aplica = e.canal === "bank" || e.monto > umbral;
    const levy = aplica ? redondear(porcentaje(e.monto, v["mw.transfer-levy-rate"])) : 0;
    const observaciones = aplica
      ? []
      : [`Mobile money transfers of up to K${umbral.toLocaleString("en-MW")} do not pay the levy.`];
    return { levy, total: redondear(e.monto + levy), observaciones };
  },
  resultado: [
    { clave: "levy", etiqueta: "Levy you pay", formato: "moneda", destacada: true },
    { clave: "total", etiqueta: "Amount plus levy", formato: "moneda" },
  ],
});
