import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { baseResidente, impuestoResidente, REQ_SALARIO } from "../lib/salario";

export default definirCalculadora({
  id: "kh.bonus-tax",
  mercado: "kh",
  concepto: "propio",
  slug: "bonus-tax",
  estado: "publicado",
  requiere: REQ_SALARIO,
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "ប្រាក់បៀវត្សប្រចាំខែ (រៀល)", min: 0, porDefecto: 2500000 },
    { id: "bono", tipo: "moneda", etiqueta: "ប្រាក់រង្វាន់ក្នុងខែនេះ (រៀល)", min: 0, porDefecto: 2500000 },
    { id: "dependientes", tipo: "entero", etiqueta: "ចំនួនកូន និងសហព័ទ្ធជាមេផ្ទះក្នុងបន្ទុក", min: 0, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.bono <= 0) throw new ErrorEntrada("សូមបញ្ចូលប្រាក់រង្វាន់។", "bono");
    const rebaja = v["kh.dependent-allowance"];
    const sin = redondear(impuestoResidente(v["kh.tos-brackets"], baseResidente(e.salario, e.dependientes, rebaja)));
    const con = redondear(impuestoResidente(v["kh.tos-brackets"], baseResidente(e.salario + e.bono, e.dependientes, rebaja)));
    const extra = redondear(con - sin);
    return { extra, neto: redondear(e.bono - extra), con, sin };
  },
  resultado: [
    { clave: "neto", etiqueta: "ប្រាក់រង្វាន់ដែលនៅសល់", formato: "moneda", destacada: true },
    { clave: "extra", etiqueta: "ពន្ធបន្ថែមដោយសារប្រាក់រង្វាន់", formato: "moneda" },
    { clave: "con", etiqueta: "ពន្ធក្នុងខែដែលមានប្រាក់រង្វាន់", formato: "moneda" },
    { clave: "sin", etiqueta: "ពន្ធក្នុងខែធម្មតា", formato: "moneda" },
  ],
});
