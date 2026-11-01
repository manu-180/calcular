import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { nahoru } from "../lib/mzda";

export default definirCalculadora({
  id: "cz.zalohy-osvc",
  mercado: "cz",
  concepto: "aportes-seguridad-social",
  slug: "zalohy-osvc",
  estado: "publicado",
  requiere: {
    "cz.osvc-podil-zakladu": "mapa",
    "cz.osvc-socialni-sazba": "numero",
    "cz.zdravotni-pojisteni": "numero",
    "cz.osvc-min-zaloha-socialni": "mapa",
    "cz.osvc-min-zaloha-zdravotni": "numero",
    "cz.osvc-rozhodna-castka": "numero",
    "cz.max-vymerovaci-zaklad": "numero",
  },
  campos: [
    { id: "prijmy", tipo: "moneda", etiqueta: "Příjmy z podnikání za minulý rok", min: 0, porDefecto: 1000000 },
    { id: "vydaje", tipo: "moneda", etiqueta: "Výdaje za minulý rok (skutečné nebo paušální)", min: 0, porDefecto: 600000 },
    { id: "mesice", tipo: "entero", etiqueta: "Počet měsíců podnikání v minulém roce", min: 1, max: 12, porDefecto: 12 },
    {
      id: "cinnost",
      tipo: "opcion",
      etiqueta: "Podnikání je",
      opciones: [
        { valor: "hlavni", etiqueta: "Hlavní činnost" },
        { valor: "vedlejsi", etiqueta: "Vedlejší činnost" },
        { valor: "zacinajici", etiqueta: "Hlavní činnost po 20 letech bez podnikání" },
      ],
      porDefecto: "hlavni",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.prijmy <= 0) throw new ErrorEntrada("Zadejte příjmy vyšší než nula.", "prijmy");
    const zaklad = Math.max(0, e.prijmy - e.vydaje);
    const podil = v["cz.osvc-podil-zakladu"];
    const observaciones: string[] = [];
    const vedlejsiBezPojisteni = e.cinnost === "vedlejsi" && zaklad < (v["cz.osvc-rozhodna-castka"] * e.mesice) / 12;
    const vzSocialni = nahoru(((zaklad / e.mesice) * enMapa(podil, "socialni")) / 100);
    const maxZaloha = nahoru(((v["cz.max-vymerovaci-zaklad"] / 12) * v["cz.osvc-socialni-sazba"]) / 100);
    const minSocialni = enMapa(v["cz.osvc-min-zaloha-socialni"], e.cinnost);
    let socialni = 0;
    if (vedlejsiBezPojisteni) {
      observaciones.push("Základ daně z vedlejší činnosti nedosáhl rozhodné částky, zálohy na sociální pojištění proto platit nemusíte.");
    } else {
      socialni = Math.min(Math.max(nahoru((vzSocialni * v["cz.osvc-socialni-sazba"]) / 100), minSocialni), maxZaloha);
      if (socialni === minSocialni) observaciones.push("Platíte minimální zálohu na sociální pojištění.");
    }
    const vzZdravotni = nahoru(((zaklad / e.mesice) * enMapa(podil, "zdravotni")) / 100);
    let zdravotni = nahoru((vzZdravotni * v["cz.zdravotni-pojisteni"]) / 100);
    if (e.cinnost === "vedlejsi") {
      zdravotni = 0;
      observaciones.push("Při vedlejší činnosti měsíční zálohy na zdravotní pojištění platit nemusíte. Pojistné doplatíte po podání přehledu.");
    } else {
      zdravotni = Math.max(zdravotni, v["cz.osvc-min-zaloha-zdravotni"]);
    }
    observaciones.push("Nové zálohy platí od měsíce po podání přehledů za minulý rok.");
    return {
      celkem: socialni + zdravotni,
      socialni,
      zdravotni,
      zaklad: redondear(zaklad),
      vzSocialni,
      vzZdravotni,
      observaciones,
    };
  },
  resultado: [
    { clave: "celkem", etiqueta: "Zálohy celkem za měsíc", formato: "moneda", destacada: true },
    { clave: "socialni", etiqueta: "Záloha na sociální pojištění (ČSSZ)", formato: "moneda" },
    { clave: "zdravotni", etiqueta: "Záloha na zdravotní pojištění", formato: "moneda" },
    { clave: "zaklad", etiqueta: "Základ daně za minulý rok", formato: "moneda" },
    { clave: "vzSocialni", etiqueta: "Měsíční vyměřovací základ pro sociální pojištění", formato: "moneda" },
    { clave: "vzZdravotni", etiqueta: "Měsíční vyměřovací základ pro zdravotní pojištění", formato: "moneda" },
  ],
});
