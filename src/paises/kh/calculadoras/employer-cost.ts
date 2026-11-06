import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "kh.employer-cost",
  mercado: "kh",
  concepto: "costo-empleador",
  slug: "employer-cost",
  estado: "borrador",
  requiere: {
    "kh.nssf-pension-employer": "numero",
    "kh.nssf-health-employer": "numero",
    "kh.nssf-risk-employer": "numero",
    "kh.nssf-wage-ceiling": "numero",
    "kh.seniority-days-year": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "ប្រាក់ឈ្នួលប្រចាំខែ (រៀល)", min: 0, porDefecto: 2600000 },
    { id: "diasMes", tipo: "entero", etiqueta: "ចំនួនថ្ងៃធ្វើការក្នុងមួយខែ", min: 1, max: 31, porDefecto: 26 },
  ],
  calcular(e, v, { redondear }) {
    if (e.salario <= 0) throw new ErrorEntrada("សូមបញ្ចូលប្រាក់ឈ្នួល។", "salario");
    const base = Math.min(e.salario, v["kh.nssf-wage-ceiling"]);
    const aportes = redondear(porcentaje(base, v["kh.nssf-pension-employer"] + v["kh.nssf-health-employer"] + v["kh.nssf-risk-employer"]));
    const antiguedad = redondear((e.salario / e.diasMes) * v["kh.seniority-days-year"] / 12);
    return { costo: redondear(e.salario + aportes + antiguedad), aportes, antiguedad };
  },
  resultado: [
    { clave: "costo", etiqueta: "ថ្លៃដើមនិយោជកក្នុងមួយខែ", formato: "moneda", destacada: true },
    { clave: "aportes", etiqueta: "ភាគទាន បសស", formato: "moneda" },
    { clave: "antiguedad", etiqueta: "ប្រាក់អតីតភាពក្នុងមួយខែ", formato: "moneda" },
  ],
});
