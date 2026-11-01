import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "np.employer-cost-calculator",
  mercado: "np",
  concepto: "costo-empleador",
  slug: "employer-cost-calculator",
  estado: "publicado",
  requiere: {
    "np.ssf-employer-rate": "numero",
    "np.ssf-provident-rate": "numero",
    "np.gratuity-rate": "numero",
    "np.festival-allowance-months": "numero",
  },
  campos: [
    { id: "basico", tipo: "moneda", etiqueta: "Basic pay for the month", min: 0, porDefecto: 40000 },
    { id: "asignaciones", tipo: "moneda", etiqueta: "Allowances for the month", min: 0, porDefecto: 10000, ayuda: "Allowances are outside the Fund and gratuity base." },
    { id: "ssf", tipo: "si-no", etiqueta: "Your workers are in the Social Security Fund", porDefecto: true },
  ],
  calcular(e, v, { redondear }) {
    if (e.basico <= 0) throw new ErrorEntrada("Enter the basic pay for the month.", "basico");
    const aporte = e.ssf
      ? redondear(porcentaje(e.basico, v["np.ssf-employer-rate"]))
      : redondear(porcentaje(e.basico, v["np.ssf-provident-rate"] + v["np.gratuity-rate"]));
    const festival = redondear((e.basico * v["np.festival-allowance-months"]) / 12);
    const total = redondear(e.basico + e.asignaciones + aporte + festival);
    return {
      total,
      aporte,
      festival,
      anual: redondear(total * 12),
      sobrecosto: redondear(aporte + festival),
      observaciones: e.ssf ? [] : ["Without the Fund the employer owes the provident fund match and gratuity under the Labour Act. The Fund's other schemes are not counted."],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Monthly cost to the employer", formato: "moneda", destacada: true },
    { clave: "aporte", etiqueta: "Fund or provident fund and gratuity contribution", formato: "moneda" },
    { clave: "festival", etiqueta: "Festival allowance set aside", formato: "moneda" },
    { clave: "sobrecosto", etiqueta: "Cost on top of pay", formato: "moneda" },
    { clave: "anual", etiqueta: "Cost over 12 months", formato: "moneda" },
  ],
});
