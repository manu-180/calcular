import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "mn.khalagdsany-tetgemj",
  mercado: "mn",
  concepto: "indemnizacion-despido",
  slug: "khalagdsany-tetgemj",
  estado: "borrador",
  requiere: {
    "mn.tsutslalt-sar": "mapa",
    "mn.medegdel-khonog": "numero",
  },
  campos: [
    { id: "undsen", tipo: "moneda", etiqueta: "Сарын үндсэн цалин", min: 0, porDefecto: 1500000 },
    { id: "jil", tipo: "numero", etiqueta: "Тухайн байгууллагад ажилласан жил", min: 0, porDefecto: 3 },
  ],
  calcular(e, v, { redondear }) {
    if (e.undsen <= 0) throw new ErrorEntrada("Сарын үндсэн цалингаа оруулна уу.", "undsen");
    const m = v["mn.tsutslalt-sar"];
    const sar = e.jil < 0.5 ? 0 : e.jil < 2 ? m.j05 : e.jil < 5 ? m.j2 : e.jil < 10 ? m.j5 : m.j10;
    const observaciones = ["82.1 хэсэгт заасан үндэслэлээр цуцалсан үед хамаарна. Хууль, хамтын гэрээгээр илүү өндөр тогтоож болно."];
    if (sar === 0) observaciones.push("Зургаан сараас бага ажилласан бол 82.1 хэсэгт дүн заагаагүй.");
    return { tetgemj: redondear(e.undsen * sar), sar, observaciones };
  },
  resultado: [
    { clave: "tetgemj", etiqueta: "Цуцалсны тэтгэмжийн доод дүн", formato: "moneda", destacada: true },
    { clave: "sar", etiqueta: "Сарын үндсэн цалингаар", formato: "meses" },
  ],
});
