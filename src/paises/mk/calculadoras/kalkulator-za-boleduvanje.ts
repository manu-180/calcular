import { definirCalculadora, ErrorEntrada, enMapa, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "mk.kalkulator-za-boleduvanje",
  mercado: "mk",
  concepto: "propio",
  slug: "kalkulator-za-boleduvanje",
  estado: "publicado",
  requiere: { "mk.boleduvanje-javen": "mapa", "mk.boleduvanje-na-tovar": "numero" },
  campos: [
    { id: "osnovica", tipo: "moneda", etiqueta: "Просечна бруто-плата во последните 12 месеци", min: 0, porDefecto: 60000 },
    { id: "denovi", tipo: "entero", etiqueta: "Денови боледување", min: 1, max: 30, porDefecto: 10 },
    { id: "rabotni", tipo: "entero", etiqueta: "Денови на кои се пресметува плата во месецот", min: 1, max: 31, porDefecto: 30 },
  ],
  calcular(e, v, { redondear }) {
    if (e.osnovica <= 0) throw new ErrorEntrada("Внесете основица поголема од нула.", "osnovica");
    if (e.denovi > v["mk.boleduvanje-na-tovar"]) throw new ErrorEntrada("Над 30 дена надоместокот оди на товар на здравственото осигурување.", "denovi");
    const m = v["mk.boleduvanje-javen"];
    const procent = enMapa(m, e.denovi <= 7 ? "do7" : e.denovi <= 15 ? "do15" : "nad15");
    const zaDenovi = (e.osnovica / e.rabotni) * e.denovi;
    return { nadomest: redondear(porcentaje(zaDenovi, procent)), procent, zaDenovi: redondear(zaDenovi) };
  },
  resultado: [
    { clave: "nadomest", etiqueta: "Надоместок на плата", formato: "moneda", destacada: true },
    { clave: "procent", etiqueta: "Применет процент", formato: "porcentaje" },
    { clave: "zaDenovi", etiqueta: "Основица за овие денови", formato: "moneda" },
  ],
});
