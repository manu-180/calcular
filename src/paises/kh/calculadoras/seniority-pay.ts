import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { salarioDiario } from "../lib/salario";

export default definirCalculadora({
  id: "kh.seniority-pay",
  mercado: "kh",
  concepto: "bono-semestral",
  slug: "seniority-pay",
  estado: "publicado",
  requiere: { "kh.seniority-days-year": "numero", "kh.seniority-days-half": "numero" },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "ប្រាក់ឈ្នួល និងប្រាក់បន្ទាប់បន្សំប្រចាំខែ (រៀល)", min: 0, porDefecto: 2600000 },
    { id: "diasMes", tipo: "entero", etiqueta: "ចំនួនថ្ងៃធ្វើការក្នុងមួយខែ", min: 1, max: 31, porDefecto: 26 },
  ],
  calcular(e, v, { redondear }) {
    if (e.salario <= 0) throw new ErrorEntrada("សូមបញ្ចូលប្រាក់ឈ្នួល។", "salario");
    const diario = salarioDiario(e.salario, e.diasMes);
    return {
      semestre: redondear(diario * v["kh.seniority-days-half"]),
      anual: redondear(diario * v["kh.seniority-days-year"]),
      diario: redondear(diario),
    };
  },
  resultado: [
    { clave: "semestre", etiqueta: "ប្រាក់បើកក្នុងខែមិថុនា ឬខែធ្នូ", formato: "moneda", destacada: true },
    { clave: "anual", etiqueta: "សរុបក្នុងមួយឆ្នាំ", formato: "moneda" },
    { clave: "diario", etiqueta: "ប្រាក់ឈ្នួលមួយថ្ងៃ", formato: "moneda" },
  ],
});
