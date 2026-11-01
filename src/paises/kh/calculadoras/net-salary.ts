import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { baseResidente, impuestoResidente, REQ_SALARIO } from "../lib/salario";

export default definirCalculadora({
  id: "kh.net-salary",
  mercado: "kh",
  concepto: "sueldo-neto",
  slug: "net-salary",
  estado: "borrador",
  requiere: { ...REQ_SALARIO, "kh.nssf-pension-employee": "numero", "kh.nssf-wage-ceiling": "numero" },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "ប្រាក់ខែសរុបប្រចាំខែ (រៀល)", min: 0, porDefecto: 2500000 },
    { id: "dependientes", tipo: "entero", etiqueta: "ចំនួនកូន និងសហព័ទ្ធជាមេផ្ទះក្នុងបន្ទុក", min: 0, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.salario <= 0) throw new ErrorEntrada("សូមបញ្ចូលប្រាក់ខែ។", "salario");
    const aporte = redondear(porcentaje(Math.min(e.salario, v["kh.nssf-wage-ceiling"]), v["kh.nssf-pension-employee"]));
    const impuesto = redondear(impuestoResidente(v["kh.tos-brackets"], baseResidente(e.salario, e.dependientes, v["kh.dependent-allowance"])));
    return { neto: redondear(e.salario - aporte - impuesto), aporte, impuesto };
  },
  resultado: [
    { clave: "neto", etiqueta: "ប្រាក់ខែសុទ្ធ", formato: "moneda", destacada: true },
    { clave: "impuesto", etiqueta: "ពន្ធលើប្រាក់បៀវត្ស", formato: "moneda" },
    { clave: "aporte", etiqueta: "ភាគទានសោធននិវត្តន៍", formato: "moneda" },
  ],
});
