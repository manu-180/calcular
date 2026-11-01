import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ge.konebis-gadasakhadi",
  mercado: "ge",
  concepto: "propio",
  slug: "konebis-gadasakhadi",
  estado: "publicado",
  requiere: { "ge.qoneba-min": "numero", "ge.qoneba-max": "numero", "ge.qoneba-ojakhi": "numero" },
  campos: [
    { id: "ghirebuleba", tipo: "moneda", etiqueta: "ქონების საბაზრო ღირებულება წინა წლის ბოლოს", min: 0, porDefecto: 300000 },
    { id: "ojakhi", tipo: "moneda", etiqueta: "ოჯახის შემოსავალი წინა წელს", min: 0, porDefecto: 150000 },
    { id: "ganakveti", tipo: "porcentaje", etiqueta: "განაკვეთი, რომელიც თქვენმა მუნიციპალიტეტმა დაადგინა", min: 0, max: 100, porDefecto: 1, ayuda: "კანონი მხოლოდ ქვედა და ზედა ზღვარს ადგენს. ზუსტი რიცხვი იკითხეთ მუნიციპალიტეტში." },
    { id: "tve", tipo: "entero", etiqueta: "რამდენი თვე ფლობდით ქონებას წელიწადში", min: 1, max: 12, porDefecto: 12 },
  ],
  calcular(e, v, { redondear }) {
    if (e.ghirebuleba <= 0) throw new ErrorEntrada("შეიყვანეთ ნულზე მეტი თანხა.", "ghirebuleba");
    if (e.ganakveti < v["ge.qoneba-min"] || e.ganakveti > v["ge.qoneba-max"]) throw new ErrorEntrada("განაკვეთი კანონით დადგენილ ფარგლებში უნდა იყოს.", "ganakveti");
    const tavisufali = e.ojakhi <= v["ge.qoneba-ojakhi"];
    const gadasakhadi = tavisufali ? 0 : redondear((e.ghirebuleba * e.ganakveti * e.tve) / 1200);
    const observaciones = tavisufali ? ["ოჯახის შემოსავალი ზღვარს არ აღემატება, ამიტომ მიწის გარდა ქონება გადასახადისგან თავისუფალია."] : [];
    return { gadasakhadi, statusi: tavisufali ? "გათავისუფლებულია" : "იბეგრება", minimumi: redondear((e.ghirebuleba * v["ge.qoneba-min"]) / 100), maximumi: redondear((e.ghirebuleba * v["ge.qoneba-max"]) / 100), observaciones };
  },
  resultado: [
    { clave: "gadasakhadi", etiqueta: "ქონების გადასახადი წელიწადში", formato: "moneda", destacada: true },
    { clave: "statusi", etiqueta: "სტატუსი", formato: "texto" },
    { clave: "minimumi", etiqueta: "წლიური გადასახადი ქვედა ზღვრით", formato: "moneda" },
    { clave: "maximumi", etiqueta: "წლიური გადასახადი ზედა ზღვრით", formato: "moneda" },
  ],
});
