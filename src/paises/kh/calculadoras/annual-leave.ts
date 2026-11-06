import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { salarioDiario } from "../lib/salario";

export default definirCalculadora({
  id: "kh.annual-leave",
  mercado: "kh",
  concepto: "vacaciones",
  slug: "annual-leave",
  estado: "publicado",
  requiere: { "kh.leave-days-month": "numero", "kh.leave-seniority-years": "numero" },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "ប្រាក់ខែប្រចាំខែ (រៀល)", min: 0, porDefecto: 2600000 },
    { id: "anios", tipo: "entero", etiqueta: "ឆ្នាំអតីតភាពការងារ", min: 0, porDefecto: 3 },
    { id: "meses", tipo: "entero", etiqueta: "ខែដែលគិតក្នុងឆ្នាំនេះ", min: 1, max: 12, porDefecto: 12 },
    { id: "diasMes", tipo: "entero", etiqueta: "ចំនួនថ្ងៃធ្វើការក្នុងមួយខែ", min: 1, max: 31, porDefecto: 26 },
  ],
  calcular(e, v, { redondear }) {
    if (e.salario <= 0) throw new ErrorEntrada("សូមបញ្ចូលប្រាក់ខែ។", "salario");
    const extra = Math.floor(e.anios / v["kh.leave-seniority-years"]);
    const anual = 12 * v["kh.leave-days-month"] + extra;
    const dias = (anual * e.meses) / 12;
    return { dias, anual, extra, pago: redondear(dias * salarioDiario(e.salario, e.diasMes)) };
  },
  resultado: [
    { clave: "dias", etiqueta: "ថ្ងៃឈប់សម្រាកដែលទទួលបាន", formato: "dias", destacada: true },
    { clave: "anual", etiqueta: "ថ្ងៃឈប់ពេញមួយឆ្នាំ", formato: "dias" },
    { clave: "extra", etiqueta: "ថ្ងៃថែមតាមអតីតភាព", formato: "dias", ocultarSiCero: true },
    { clave: "pago", etiqueta: "តម្លៃប្រាក់ឈ្នួលនៃថ្ងៃទាំងនោះ", formato: "moneda" },
  ],
});
