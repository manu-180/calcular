import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ge.khelpasis-dagvianeba",
  mercado: "ge",
  concepto: "propio",
  slug: "khelpasis-dagvianeba",
  estado: "publicado",
  requiere: { "ge.dagvianeba": "numero" },
  campos: [
    { id: "tanxa", tipo: "moneda", etiqueta: "დაყოვნებული თანხა", min: 0, porDefecto: 1000 },
    { id: "dghe", tipo: "entero", etiqueta: "დაყოვნების დღეები", min: 1, porDefecto: 30 },
  ],
  calcular(e, v, { redondear }) {
    if (e.tanxa <= 0) throw new ErrorEntrada("შეიყვანეთ ნულზე მეტი თანხა.", "tanxa");
    if (e.dghe < 1) throw new ErrorEntrada("დღეები ერთი მაინც უნდა იყოს.", "dghe");
    const pirgasamtekhlo = redondear((e.tanxa * v["ge.dagvianeba"] * e.dghe) / 100);
    return { pirgasamtekhlo, dghiuri: redondear((e.tanxa * v["ge.dagvianeba"]) / 100), sul: redondear(e.tanxa + pirgasamtekhlo) };
  },
  resultado: [
    { clave: "pirgasamtekhlo", etiqueta: "დაყოვნებისთვის გადასახდელი თანხა", formato: "moneda", destacada: true },
    { clave: "dghiuri", etiqueta: "ერთი დღისთვის", formato: "moneda" },
    { clave: "sul", etiqueta: "დაყოვნებულ თანხასთან ერთად", formato: "moneda" },
  ],
});
