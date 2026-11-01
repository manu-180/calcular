import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ge.daavadebis-anazghaureba",
  mercado: "ge",
  concepto: "propio",
  slug: "daavadebis-anazghaureba",
  estado: "publicado",
  requiere: { "ge.shromisuunaroba-zedized": "numero", "ge.shromisuunaroba-6tve": "numero" },
  campos: [
    { id: "khelpasi", tipo: "moneda", etiqueta: "ხელფასი თვეში", min: 0, porDefecto: 3000 },
    { id: "zedized", tipo: "entero", etiqueta: "ავადმყოფობის დღეები ზედიზედ", min: 1, porDefecto: 10 },
    { id: "sul", tipo: "entero", etiqueta: "ავადმყოფობის დღეები ბოლო 6 თვეში სულ", min: 1, porDefecto: 10 },
    { id: "procenti", tipo: "porcentaje", etiqueta: "ანაზღაურება ხელშეკრულებით", min: 0, max: 100, porDefecto: 0, ayuda: "კოდექსი ანაზღაურებას არ ავალდებულებს. შეიყვანეთ ის პროცენტი, რაც ხელშეკრულებაში წერია." },
  ],
  calcular(e, v, { redondear }) {
    if (e.khelpasi <= 0) throw new ErrorEntrada("შეიყვანეთ ნულზე მეტი თანხა.", "khelpasi");
    if (e.sul < e.zedized) throw new ErrorEntrada("ჯამური დღეები ზედიზედ დღეებზე ნაკლები ვერ იქნება.", "sul");
    const dacva = e.zedized <= v["ge.shromisuunaroba-zedized"] && e.sul <= v["ge.shromisuunaroba-6tve"];
    return {
      anazghaureba: redondear(((e.khelpasi / 30) * e.zedized * e.procenti) / 100),
      statusi: dacva ? "შეჩერების ფარგლებშია" : "ვადა გადაჭარბებულია",
      zedizedDarcha: Math.max(0, v["ge.shromisuunaroba-zedized"] - e.zedized),
      sulDarcha: Math.max(0, v["ge.shromisuunaroba-6tve"] - e.sul),
    };
  },
  resultado: [
    { clave: "anazghaureba", etiqueta: "ანაზღაურება ამ პერიოდისთვის", formato: "moneda", destacada: true },
    { clave: "statusi", etiqueta: "შრომითი ურთიერთობის შეჩერება", formato: "texto" },
    { clave: "zedizedDarcha", etiqueta: "ზედიზედ ვადამდე დარჩა", formato: "dias" },
    { clave: "sulDarcha", etiqueta: "6 თვის ვადამდე დარჩა", formato: "dias" },
  ],
});
