import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "am.shahabazhni-hark",
  mercado: "am",
  concepto: "propio",
  slug: "shahabazhni-hark",
  estado: "publicado",
  requiere: { "am.shahabazhni-dedq": "numero", "am.shahutahark": "numero", "am.aha-tarekan-shem": "numero" },
  campos: [{ id: "shahabazhin", tipo: "moneda", etiqueta: "Շահաբաժինը մինչև հարկումը", min: 0, porDefecto: 1000000 }],
  calcular(e, v, { redondear }) {
    if (e.shahabazhin <= 0) throw new ErrorEntrada("Մուտքագրեք զրոյից մեծ շահաբաժին։", "shahabazhin");
    const hark = redondear(porcentaje(e.shahabazhin, v["am.shahabazhni-dedq"]));
    const shahuyt = redondear(e.shahabazhin / (1 - v["am.shahutahark"] / 100));
    const shahutahark = shahuyt - e.shahabazhin;
    const berr = v["am.shahutahark"] + (100 - v["am.shahutahark"]) * (v["am.shahabazhni-dedq"] / 100);
    return { zut: e.shahabazhin - hark, hark, shahuyt, shahutahark, berr };
  },
  resultado: [
    { clave: "zut", etiqueta: "Շահաբաժինը հարկումից հետո", formato: "moneda", destacada: true },
    { clave: "hark", etiqueta: "Եկամտային հարկ", formato: "moneda" },
    { clave: "shahuyt", etiqueta: "Համապատասխան շահույթը մինչև շահութահարկը", formato: "moneda" },
    { clave: "shahutahark", etiqueta: "Շահութահարկը այդ շահույթից", formato: "moneda" },
    { clave: "berr", etiqueta: "Ընդհանուր հարկային բեռը շահույթի վրա", formato: "porcentaje", decimales: 1 },
  ],
});
