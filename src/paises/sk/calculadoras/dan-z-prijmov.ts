import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { danProgresivna, nezdanitelnaCast } from "../lib/mzda";
import { najblizsie } from "../lib/zaokruhlenie";

export default definirCalculadora({
  id: "sk.dan-z-prijmov",
  mercado: "sk",
  concepto: "impuesto-renta",
  slug: "dan-z-prijmov",
  estado: "publicado",
  requiere: {
    "sk.dan-z-prijmov": "escala",
    "sk.dan-znizena": "numero",
    "sk.hranica-zniz-dane": "numero",
    "sk.nezdanitelna-cast": "numero",
    "sk.nczd-hranica": "numero",
    "sk.nczd-suma": "numero",
    "sk.zivotne-minimum": "numero",
  },
  campos: [
    { id: "zaklad", tipo: "moneda", etiqueta: "Základ dane za rok pred nezdaniteľnou časťou", min: 0, porDefecto: 25000 },
    {
      id: "typ",
      tipo: "opcion",
      etiqueta: "Druh príjmu",
      porDefecto: "zamestnanec",
      opciones: [
        { valor: "zamestnanec", etiqueta: "Zamestnanie" },
        { valor: "szco", etiqueta: "Podnikanie" },
      ],
    },
    { id: "prijmy", tipo: "moneda", etiqueta: "Zdaniteľné príjmy z podnikania za rok", min: 0, porDefecto: 50000, visibleSi: { typ: ["szco"] } },
  ],
  calcular(e, v) {
    if (e.zaklad <= 0) throw new ErrorEntrada("Zadajte základ dane vyšší ako nula.", "zaklad");
    const nczd = nezdanitelnaCast(e.zaklad, v["sk.nezdanitelna-cast"], v["sk.nczd-hranica"], v["sk.nczd-suma"]);
    const poNczd = Math.max(0, najblizsie(e.zaklad - nczd));
    const znizena = e.typ === "szco" && (e.prijmy ?? 0) <= v["sk.hranica-zniz-dane"];
    const dan = znizena ? najblizsie((poNczd * v["sk.dan-znizena"]) / 100) : danProgresivna(poNczd, v["sk.dan-z-prijmov"]);
    const efektivna = (dan / e.zaklad) * 100;
    return { dan, nczd, poNczd, efektivna, mesacne: najblizsie(dan / 12) };
  },
  resultado: [
    { clave: "dan", etiqueta: "Daň z príjmov za rok", formato: "moneda", destacada: true },
    { clave: "nczd", etiqueta: "Nezdaniteľná časť", formato: "moneda" },
    { clave: "poNczd", etiqueta: "Základ dane po nezdaniteľnej časti", formato: "moneda" },
    { clave: "efektivna", etiqueta: "Efektívna sadzba", formato: "porcentaje", decimales: 2 },
    { clave: "mesacne", etiqueta: "Daň v priemere za mesiac", formato: "moneda" },
  ],
});
