import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ge.zeganakveturi-anazghaureba",
  mercado: "ge",
  concepto: "horas-extra",
  slug: "zeganakveturi-anazghaureba",
  estado: "publicado",
  requiere: { "ge.kvira-saati": "numero", "ge.kvira-saati-spetsialuri": "numero" },
  campos: [
    { id: "khelpasi", tipo: "moneda", etiqueta: "ხელფასი თვეში", min: 0, porDefecto: 2080 },
    { id: "saati", tipo: "numero", etiqueta: "ზეგანაკვეთური საათები", min: 0, porDefecto: 10 },
    { id: "damateba", tipo: "porcentaje", etiqueta: "ხელშეკრულებით შეთანხმებული დანამატი", min: 0, max: 500, porDefecto: 25, ayuda: "კოდექსი ამბობს, რომ განაკვეთი გაზრდილი უნდა იყოს, მაგრამ ციფრს მხარეებს ანდობს. ეს რიცხვი მხოლოდ მაგალითია." },
    { id: "kvira", tipo: "numero", etiqueta: "სამუშაო საათები კვირაში (სურვილისამებრ)", min: 1, requerido: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.khelpasi <= 0) throw new ErrorEntrada("შეიყვანეთ ნულზე მეტი თანხა.", "khelpasi");
    const kvira = e.kvira ?? v["ge.kvira-saati"];
    if (kvira > v["ge.kvira-saati-spetsialuri"]) throw new ErrorEntrada("ნორმირებული სამუშაო დრო კანონით დადგენილ ზღვარს ვერ გადააჭარბებს.", "kvira");
    if (e.damateba <= 0) throw new ErrorEntrada("კოდექსი გაზრდილ განაკვეთს ითხოვს: დანამატი ნულზე მეტი უნდა იყოს.", "damateba");
    const saatobrivi = (e.khelpasi * 12) / (kvira * 52);
    const gazrdili = saatobrivi * (1 + e.damateba / 100);
    return { anazghaureba: redondear(gazrdili * e.saati), saatobrivi: redondear(saatobrivi), gazrdili: redondear(gazrdili), kvira };
  },
  resultado: [
    { clave: "anazghaureba", etiqueta: "ზეგანაკვეთური ანაზღაურება (ბრუტო)", formato: "moneda", destacada: true },
    { clave: "saatobrivi", etiqueta: "ჩვეულებრივი საათობრივი განაკვეთი", formato: "moneda" },
    { clave: "gazrdili", etiqueta: "გაზრდილი საათობრივი განაკვეთი", formato: "moneda" },
    { clave: "kvira", etiqueta: "გაანგარიშებაში გამოყენებული საათები კვირაში", formato: "horas" },
  ],
});
