import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "cz.odstupne",
  mercado: "cz",
  concepto: "indemnizacion-despido",
  slug: "odstupne",
  estado: "publicado",
  requiere: { "cz.odstupne": "mapa" },
  campos: [
    {
      id: "vydelek",
      tipo: "moneda",
      etiqueta: "Průměrný měsíční výdělek",
      ayuda: "Spočítáte ho v kalkulačce průměrného výdělku z mzdy za předchozí čtvrtletí.",
      min: 0,
      porDefecto: 45000,
    },
    {
      id: "duvod",
      tipo: "opcion",
      etiqueta: "Důvod skončení pracovního poměru",
      opciones: [
        { valor: "organizacni", etiqueta: "Výpověď nebo dohoda z organizačních důvodů (zrušení, přemístění, nadbytečnost)" },
        { valor: "uraz", etiqueta: "Pracovní úraz nebo nemoc z povolání (zákaz další práce)" },
      ],
      porDefecto: "organizacni",
    },
    { id: "roky", tipo: "numero", etiqueta: "Jak dlouho pracovní poměr trval (v letech)", min: 0, max: 60, porDefecto: 3 },
  ],
  calcular(e, v, { redondear }) {
    if (e.vydelek <= 0) throw new ErrorEntrada("Zadejte průměrný měsíční výdělek vyšší než nula.", "vydelek");
    const m = v["cz.odstupne"];
    const klic = e.duvod === "uraz" ? "uraz" : e.roky < 1 ? "mene-nez-rok" : e.roky < 2 ? "rok-az-dva" : "dva-a-vice";
    const nasobek = enMapa(m, klic);
    return {
      odstupne: redondear(e.vydelek * nasobek),
      nasobek,
      observaciones: [
        "Jde o zákonné minimum, kolektivní nebo pracovní smlouva může určit víc. Z odstupného se neplatí sociální pojištění, daň ano.",
        "Pokud se ke stejnému zaměstnavateli vrátíte dříve, než uplyne doba odpovídající počtu násobků, musíte odstupné nebo jeho část vrátit.",
      ],
    };
  },
  resultado: [
    { clave: "odstupne", etiqueta: "Odstupné (hrubé)", formato: "moneda", destacada: true },
    { clave: "nasobek", etiqueta: "Násobek průměrného měsíčního výdělku", formato: "numero", decimales: 0 },
  ],
});
