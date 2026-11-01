import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { baseResidente, impuestoResidente, REQ_SALARIO, tasaMarginal } from "../lib/salario";

export default definirCalculadora({
  id: "kh.salary-tax",
  mercado: "kh",
  concepto: "impuesto-renta",
  slug: "salary-tax",
  estado: "publicado",
  requiere: { ...REQ_SALARIO, "kh.nonresident-salary-rate": "numero" },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "ប្រាក់បៀវត្សប្រចាំខែ (រៀល)", min: 0, porDefecto: 2500000 },
    {
      id: "residencia",
      tipo: "opcion",
      etiqueta: "ស្ថានភាពនិយោជិត",
      opciones: [
        { valor: "residente", etiqueta: "និវាសនជន" },
        { valor: "no-residente", etiqueta: "អនិវាសនជន" },
      ],
      porDefecto: "residente",
    },
    { id: "conyuge", tipo: "si-no", etiqueta: "មានសហព័ទ្ធជាមេផ្ទះ", porDefecto: false, visibleSi: { residencia: ["residente"] } },
    { id: "hijos", tipo: "entero", etiqueta: "ចំនួនកូនក្នុងបន្ទុក", min: 0, porDefecto: 0, visibleSi: { residencia: ["residente"] } },
  ],
  calcular(e, v, { redondear }) {
    if (e.salario <= 0) throw new ErrorEntrada("សូមបញ្ចូលប្រាក់បៀវត្សប្រចាំខែ។", "salario");
    const residente = e.residencia === "residente";
    const dependientes = residente ? (e.conyuge ? 1 : 0) + (e.hijos ?? 0) : 0;
    const base = residente ? baseResidente(e.salario, dependientes, v["kh.dependent-allowance"]) : e.salario;
    const impuesto = redondear(
      residente ? impuestoResidente(v["kh.tos-brackets"], base) : porcentaje(base, v["kh.nonresident-salary-rate"]),
    );
    return {
      impuesto,
      base,
      rebaja: redondear(e.salario - base),
      tasa: residente ? tasaMarginal(v["kh.tos-brackets"], base) : v["kh.nonresident-salary-rate"],
      despues: redondear(e.salario - impuesto),
      observaciones: ["លទ្ធផលនេះមិនទាន់ដកភាគទាន បសស ទេ។"],
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "ពន្ធលើប្រាក់បៀវត្សត្រូវបង់", formato: "moneda", destacada: true },
    { clave: "base", etiqueta: "មូលដ្ឋានគិតពន្ធ", formato: "moneda" },
    { clave: "rebaja", etiqueta: "ការកាត់បន្ថយតាមបន្ទុកគ្រួសារ", formato: "moneda", ocultarSiCero: true },
    { clave: "tasa", etiqueta: "អត្រាពន្ធនៃកម្រិតខ្ពស់បំផុត", formato: "porcentaje" },
    { clave: "despues", etiqueta: "ប្រាក់បៀវត្សក្រោយពន្ធ", formato: "moneda" },
  ],
});
