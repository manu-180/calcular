import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { dvzZMzdy, redukovanyDvz } from "../lib/davky";

export default definirCalculadora({
  id: "cz.rodicovsky-prispevek",
  mercado: "cz",
  concepto: "propio",
  slug: "rodicovsky-prispevek",
  estado: "publicado",
  requiere: {
    "cz.rodicovsky-prispevek": "mapa",
    "cz.rodicovsky-limit": "numero",
    "cz.rodicovsky-podil": "numero",
    "cz.redukcni-hranice": "mapa",
  },
  campos: [
    { id: "narozeni", tipo: "opcion-dato", dato: "cz.rodicovsky-prispevek", etiqueta: "Kdy se nejmladší dítě narodilo", porDefecto: "do-2026" },
    { id: "vicercata", tipo: "si-no", etiqueta: "Dvojčata nebo více dětí najednou", porDefecto: false },
    {
      id: "mzda",
      tipo: "moneda",
      etiqueta: "Vyšší z hrubých mezd rodičů za měsíc (průměr za rok před porodem)",
      ayuda: "Pokud ani jeden z rodičů neměl příjem z pojištěného zaměstnání nebo podnikání, zadejte 0.",
      min: 0,
      porDefecto: 40000,
    },
    { id: "mesicne", tipo: "moneda", etiqueta: "Kolik chcete čerpat měsíčně", min: 0, porDefecto: 15000 },
  ],
  calcular(e, v, { redondear }) {
    if (e.mesicne <= 0) throw new ErrorEntrada("Zadejte měsíční částku vyšší než nula.", "mesicne");
    const nasobek = e.vicercata ? 2 : 1;
    const celkem = enMapa(v["cz.rodicovsky-prispevek"], e.narozeni) * nasobek;
    const r = v["cz.redukcni-hranice"];
    const dvz = e.mzda > 0 ? redukovanyDvz(dvzZMzdy(e.mzda), { prvni: enMapa(r, "prvni"), druha: enMapa(r, "druha"), treti: enMapa(r, "treti") }, "materstvi") : 0;
    const zDvz = Math.floor((30 * dvz * v["cz.rodicovsky-podil"]) / 100);
    const maximum = Math.max(v["cz.rodicovsky-limit"], zDvz) * nasobek;
    if (e.mesicne > maximum) throw new ErrorEntrada("Tolik měsíčně čerpat nemůžete. Zadejte nižší částku, nejvyšší možnou pak uvidíte ve výsledku.", "mesicne");
    const mesice = Math.ceil(celkem / e.mesicne - 1e-9);
    const nejkratsi = Math.ceil(celkem / maximum - 1e-9);
    const observaciones: string[] = [];
    if (mesice > 36) {
      observaciones.push("Rodičovský příspěvek se vyplácí nejdéle do 3 let věku dítěte. Při této částce byste celý příspěvek do té doby nevyčerpali, zbytek propadne.");
    }
    observaciones.push("Výši měsíčního čerpání můžete změnit nejdříve po 3 celých měsících.");
    return {
      mesice,
      celkem,
      maximum,
      nejkratsi,
      posledni: redondear(celkem - e.mesicne * (mesice - 1)),
      observaciones,
    };
  },
  resultado: [
    { clave: "mesice", etiqueta: "Doba čerpání", formato: "meses", decimales: 0, destacada: true },
    { clave: "celkem", etiqueta: "Celková částka rodičovského příspěvku", formato: "moneda" },
    { clave: "maximum", etiqueta: "Nejvyšší možná měsíční částka", formato: "moneda" },
    { clave: "nejkratsi", etiqueta: "Nejkratší možná doba čerpání", formato: "meses", decimales: 0 },
    { clave: "posledni", etiqueta: "Výplata v posledním měsíci", formato: "moneda" },
  ],
});
