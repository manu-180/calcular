import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "al.leja-vjetore",
  mercado: "al",
  concepto: "vacaciones",
  slug: "leja-vjetore",
  estado: "borrador",
  requiere: { "al.leje-vjetore": "numero" },
  campos: [
    { id: "muaj", tipo: "entero", etiqueta: "Muaj pune gjatë vitit", min: 1, max: 12, porDefecto: 12 },
    { id: "paga", tipo: "moneda", etiqueta: "Paga bruto në muaj", min: 0, porDefecto: 90000 },
  ],
  calcular(e, v, { redondear }) {
    if (e.paga <= 0) throw new ErrorEntrada("Vendosni një pagë më të madhe se zero.", "paga");
    const dite = redondear((v["al.leje-vjetore"] * e.muaj) / 12);
    return { dite, pagesa: redondear((e.paga / v["al.leje-vjetore"]) * dite) };
  },
  resultado: [
    { clave: "dite", etiqueta: "Ditë leje", formato: "dias", destacada: true },
    { clave: "pagesa", etiqueta: "Pagesa e lejes", formato: "moneda" },
  ],
});
