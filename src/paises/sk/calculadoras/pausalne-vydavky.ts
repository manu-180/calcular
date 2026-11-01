import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { danProgresivna, nezdanitelnaCast } from "../lib/mzda";
import { najblizsie } from "../lib/zaokruhlenie";

export default definirCalculadora({
  id: "sk.pausalne-vydavky",
  mercado: "sk",
  concepto: "regimen-simplificado",
  slug: "pausalne-vydavky",
  estado: "publicado",
  requiere: {
    "sk.pausalne-percento": "numero",
    "sk.pausalne-max": "numero",
    "sk.dan-z-prijmov": "escala",
    "sk.dan-znizena": "numero",
    "sk.hranica-zniz-dane": "numero",
    "sk.nezdanitelna-cast": "numero",
    "sk.nczd-hranica": "numero",
    "sk.nczd-suma": "numero",
  },
  campos: [
    { id: "prijmy", tipo: "moneda", etiqueta: "Príjmy z podnikania za rok", min: 0, porDefecto: 30000 },
    { id: "odvody", tipo: "moneda", etiqueta: "Zaplatené povinné odvody za rok", min: 0, porDefecto: 5000, ayuda: "Sociálne a zdravotné poistenie sa pripočítava k paušálu." },
  ],
  calcular(e, v) {
    if (e.prijmy <= 0) throw new ErrorEntrada("Zadajte príjmy vyššie ako nula.", "prijmy");
    const pausal = najblizsie(Math.min((e.prijmy * v["sk.pausalne-percento"]) / 100, v["sk.pausalne-max"]));
    const zaklad = Math.max(0, najblizsie(e.prijmy - pausal - e.odvody));
    const nczd = nezdanitelnaCast(zaklad, v["sk.nezdanitelna-cast"], v["sk.nczd-hranica"], v["sk.nczd-suma"]);
    const poNczd = Math.max(0, najblizsie(zaklad - nczd));
    const znizena = e.prijmy <= v["sk.hranica-zniz-dane"];
    const dan = znizena ? najblizsie((poNczd * v["sk.dan-znizena"]) / 100) : danProgresivna(poNczd, v["sk.dan-z-prijmov"]);
    const observaciones: string[] = ["Paušál si môže uplatniť daňovník, ktorý nie je platiteľom DPH celý rok."];
    return { dan, pausal, zaklad, nczd, poNczd, cistyPrijem: najblizsie(e.prijmy - e.odvody - dan), observaciones };
  },
  resultado: [
    { clave: "dan", etiqueta: "Daň z príjmov za rok", formato: "moneda", destacada: true },
    { clave: "pausal", etiqueta: "Paušálne výdavky", formato: "moneda" },
    { clave: "zaklad", etiqueta: "Základ dane", formato: "moneda" },
    { clave: "nczd", etiqueta: "Nezdaniteľná časť", formato: "moneda" },
    { clave: "poNczd", etiqueta: "Základ dane po nezdaniteľnej časti", formato: "moneda" },
    { clave: "cistyPrijem", etiqueta: "Príjem po odvodoch a dani", formato: "moneda" },
  ],
});
