import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { pula } from "../lib/impuestos";

export default definirCalculadora({
  id: "bw.withholding-tax-calculator",
  mercado: "bw",
  concepto: "propio",
  slug: "withholding-tax-calculator",
  estado: "publicado",
  requiere: {
    "bw.wht-resident": "mapa",
    "bw.wht-non-resident": "mapa",
    "bw.wht-domestic-threshold": "numero",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Gross amount of the payment", min: 0, porDefecto: 10000 },
    {
      id: "residencia",
      tipo: "opcion",
      etiqueta: "Who receives the payment?",
      opciones: [
        { valor: "resident", etiqueta: "A resident of Botswana" },
        { valor: "non-resident", etiqueta: "A non-resident" },
      ],
      porDefecto: "resident",
    },
    { id: "tipoResidente", tipo: "opcion-dato", etiqueta: "Type of payment", dato: "bw.wht-resident", porDefecto: "dividends", visibleSi: { residencia: ["resident"] } },
    { id: "tipoNoResidente", tipo: "opcion-dato", etiqueta: "Type of payment", dato: "bw.wht-non-resident", porDefecto: "dividends", visibleSi: { residencia: ["non-resident"] } },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.monto <= 0) throw new ErrorEntrada("Enter the amount of the payment.", "monto");
    const residente = entrada.residencia === "resident";
    const tasa = residente ? enMapa(v["bw.wht-resident"], entrada.tipoResidente) : enMapa(v["bw.wht-non-resident"], entrada.tipoNoResidente);
    const retencion = redondear(porcentaje(entrada.monto, tasa));
    const observaciones: string[] = [];
    if (residente && (entrada.tipoResidente === "rent" || entrada.tipoResidente === "commission")) {
      observaciones.push(`No tax is withheld when the total you pay in the tax year is less than ${pula(v["bw.wht-domestic-threshold"])}.`);
    }
    if (residente && entrada.tipoResidente === "rent") {
      observaciones.push("There is no withholding on rent an individual pays privately, not as a business expense, or on payments for a hotel, motel, guesthouse or lodge.");
    }
    return { retencion, neto: redondear(entrada.monto - retencion), tasa, observaciones };
  },
  resultado: [
    { clave: "retencion", etiqueta: "Tax to withhold", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "Amount paid to the recipient", formato: "moneda" },
    { clave: "tasa", etiqueta: "Withholding tax rate", formato: "porcentaje", decimales: 0 },
  ],
});
