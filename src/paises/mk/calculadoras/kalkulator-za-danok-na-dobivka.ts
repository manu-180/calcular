import { definirCalculadora, ErrorEntrada, enMapa, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "mk.kalkulator-za-danok-na-dobivka",
  mercado: "mk",
  concepto: "propio",
  slug: "kalkulator-za-danok-na-dobivka",
  estado: "publicado",
  requiere: { "mk.danok-na-dobivka": "numero", "mk.danok-vkupen-prihod": "numero", "mk.prihod-pragovi": "mapa" },
  campos: [
    { id: "prihod", tipo: "moneda", etiqueta: "Вкупен годишен приход", min: 0, porDefecto: 5000000 },
    { id: "dobivka", tipo: "moneda", etiqueta: "Даночна основица (добивка за оданочување)", min: 0, porDefecto: 1000000 },
  ],
  calcular(e, v, { redondear }) {
    if (e.prihod <= 0) throw new ErrorEntrada("Внесете приход поголем од нула.", "prihod");
    const prag1 = enMapa(v["mk.prihod-pragovi"], "osloboduvanje");
    const prag2 = enMapa(v["mk.prihod-pragovi"], "godishen");
    const redoven = redondear(porcentaje(e.dobivka, v["mk.danok-na-dobivka"]));
    const moze = e.prihod > prag1 && e.prihod <= prag2;
    const naPrihod = moze ? redondear(porcentaje(e.prihod, v["mk.danok-vkupen-prihod"])) : null;
    const observaciones: string[] = [];
    if (e.prihod <= prag1) observaciones.push("Со приход до овој праг микро и малите друштва може да бидат ослободени, ако ги исполнуваат законските услови.");
    if (moze) observaciones.push("Во овој опсег друштвото може да избере годишен данок на вкупен приход, ако ги исполнува законските услови.");
    return { redoven, naPrihod, povolno: naPrihod === null ? redoven : Math.min(redoven, naPrihod), observaciones };
  },
  resultado: [
    { clave: "povolno", etiqueta: "Пониска обврска", formato: "moneda", destacada: true },
    { clave: "redoven", etiqueta: "Данок на добивка", formato: "moneda" },
    { clave: "naPrihod", etiqueta: "Годишен данок на вкупен приход", formato: "moneda" },
  ],
});
