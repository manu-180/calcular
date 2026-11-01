import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "fj.contract-payment-tax-calculator",
  mercado: "fj",
  concepto: "retencion-honorarios",
  slug: "contract-payment-tax-calculator",
  estado: "publicado",
  requiere: { "fj.contract-withholding-rate": "numero", "fj.contract-withholding-threshold": "numero" },
  campos: [{ id: "contrato", tipo: "moneda", etiqueta: "Amount of the contract payment", min: 0, porDefecto: 5000 }],
  calcular(e, v, { redondear }) {
    if (e.contrato <= 0) throw new ErrorEntrada("Enter the contract amount.", "contrato");
    const aplica = e.contrato > v["fj.contract-withholding-threshold"];
    const retencion = aplica ? redondear(porcentaje(e.contrato, v["fj.contract-withholding-rate"])) : 0;
    return { retencion, neto: redondear(e.contrato - retencion), aplica: aplica ? "Withholding applies" : "Below the threshold, no withholding" };
  },
  resultado: [
    { clave: "retencion", etiqueta: "Tax the payer withholds", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "Amount paid to the contractor", formato: "moneda" },
    { clave: "aplica", etiqueta: "Status", formato: "texto" },
  ],
});
