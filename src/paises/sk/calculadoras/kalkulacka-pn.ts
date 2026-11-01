import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { dennyZaklad } from "../lib/davky";
import { nahor, nahor10, nahor4, najblizsie } from "../lib/zaokruhlenie";

export default definirCalculadora({
  id: "sk.kalkulacka-pn",
  mercado: "sk",
  concepto: "propio",
  slug: "kalkulacka-pn",
  estado: "publicado",
  requiere: { "sk.davky": "mapa", "sk.nahrada-prijmu": "mapa", "sk.max-dvz": "numero", "sk.max-vymeriavaci-zaklad": "numero" },
  campos: [
    { id: "mzda", tipo: "moneda", etiqueta: "Hrubá mzda za mesiac v minulom roku", min: 0, porDefecto: 1500 },
    { id: "dni", tipo: "entero", etiqueta: "Počet kalendárnych dní PN", min: 1, max: 364, porDefecto: 20 },
    {
      id: "kto",
      tipo: "opcion",
      etiqueta: "Ste",
      porDefecto: "zamestnanec",
      opciones: [
        { valor: "zamestnanec", etiqueta: "zamestnanec" },
        { valor: "szco", etiqueta: "SZČO alebo dobrovoľne poistený" },
      ],
    },
  ],
  calcular(e, v) {
    if (e.mzda <= 0) throw new ErrorEntrada("Zadajte mzdu vyššiu ako nula.", "mzda");
    const d = v["sk.davky"];
    const dvz = dennyZaklad(e.mzda, v["sk.max-dvz"]);
    let firma = 0;
    let poistovna = 0;
    if (e.kto === "zamestnanec") {
      const dvzFirma = nahor4((Math.min(e.mzda, v["sk.max-vymeriavaci-zaklad"]) * 12) / 365);
      const n = v["sk.nahrada-prijmu"];
      const prve = Math.min(e.dni, 3);
      const dalsie = Math.max(0, Math.min(e.dni, 14) - 3);
      firma = najblizsie(nahor((prve * dvzFirma * n["prve-dni"]) / 100) + nahor((dalsie * dvzFirma * n["dalsie-dni"]) / 100));
      poistovna = nahor10((Math.max(0, e.dni - 14) * dvz * d.nemocenske) / 100);
    } else {
      poistovna = nahor10((Math.min(e.dni, 3) * dvz * d["prve-dni"]) / 100 + (Math.max(0, e.dni - 3) * dvz * d.nemocenske) / 100);
    }
    return { spolu: najblizsie(firma + poistovna), firma, poistovna, dvz };
  },
  resultado: [
    { clave: "spolu", etiqueta: "Spolu za PN", formato: "moneda", destacada: true },
    { clave: "firma", etiqueta: "Náhrada príjmu od zamestnávateľa", formato: "moneda", ocultarSiCero: true },
    { clave: "poistovna", etiqueta: "Nemocenské od Sociálnej poisťovne", formato: "moneda" },
    { clave: "dvz", etiqueta: "Denný vymeriavací základ", formato: "moneda", decimales: 4 },
  ],
});
