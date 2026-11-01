import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ge.shvebulebis-anazghaureba",
  mercado: "ge",
  concepto: "vacaciones",
  slug: "shvebulebis-anazghaureba",
  estado: "publicado",
  requiere: { "ge.shvebuleba": "numero", "ge.shvebuleba-mdzime": "numero", "ge.shvebuleba-ugasamrjelo": "numero" },
  campos: [
    { id: "khelpasi", tipo: "moneda", etiqueta: "საშუალო თვიური ხელფასი (ბოლო 3 თვე)", min: 0, porDefecto: 2100 },
    { id: "dghe", tipo: "entero", etiqueta: "შვებულების სამუშაო დღეები", min: 1, max: 366, porDefecto: 24 },
    { id: "samushao", tipo: "entero", etiqueta: "სამუშაო დღეები თვეში", min: 1, max: 31, porDefecto: 21, ayuda: "კოდექსი დღიური გაანგარიშების წესს არ ადგენს. შეიყვანეთ ის, რასაც თქვენი დამსაქმებელი იყენებს." },
    { id: "tve", tipo: "entero", etiqueta: "ნამუშევარი თვეები ამ წელს", min: 0, max: 12, porDefecto: 12 },
  ],
  calcular(e, v, { redondear }) {
    if (e.khelpasi <= 0) throw new ErrorEntrada("შეიყვანეთ ნულზე მეტი თანხა.", "khelpasi");
    if (e.samushao < 1) throw new ErrorEntrada("სამუშაო დღეები ერთი მაინც უნდა იყოს.", "samushao");
    const dghiuri = redondear(e.khelpasi / e.samushao);
    const ufleba = redondear((v["ge.shvebuleba"] * e.tve) / 12);
    const observaciones: string[] = [];
    if (e.dghe > v["ge.shvebuleba"]) observaciones.push("შეყვანილი დღეები კანონით გარანტირებულ მინიმუმზე მეტია. ასეთი შვებულება ხელშეკრულებით უნდა იყოს გათვალისწინებული.");
    return { anazghaureba: redondear((e.khelpasi / e.samushao) * e.dghe), dghiuri, ufleba, observaciones };
  },
  resultado: [
    { clave: "anazghaureba", etiqueta: "შვებულების ანაზღაურება (ბრუტო)", formato: "moneda", destacada: true },
    { clave: "dghiuri", etiqueta: "ერთი სამუშაო დღის ანაზღაურება", formato: "moneda" },
    { clave: "ufleba", etiqueta: "ნამუშევარი თვეების პროპორციული მინიმუმი", formato: "dias", decimales: 1 },
  ],
});
