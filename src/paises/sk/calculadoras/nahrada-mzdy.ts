import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { nahor, najblizsie } from "../lib/zaokruhlenie";

export default definirCalculadora({
  id: "sk.nahrada-mzdy",
  mercado: "sk",
  concepto: "propio",
  slug: "nahrada-mzdy",
  estado: "publicado",
  requiere: { "sk.minimalna-mzda-hodinova": "numero" },
  campos: [
    { id: "mzda", tipo: "moneda", etiqueta: "Mzda zúčtovaná za predchádzajúci štvrťrok", min: 0, porDefecto: 6000 },
    { id: "hodiny", tipo: "numero", etiqueta: "Odpracované hodiny v tomto štvrťroku", min: 1, porDefecto: 520 },
    { id: "dni", tipo: "numero", etiqueta: "Počet dní dovolenky alebo inej prekážky", min: 0, porDefecto: 5 },
    { id: "hodinyDenne", tipo: "numero", etiqueta: "Hodiny za jeden deň", min: 1, max: 24, porDefecto: 8 },
  ],
  calcular(e, v) {
    if (e.hodiny <= 0) throw new ErrorEntrada("Zadajte počet odpracovaných hodín.", "hodiny");
    const vlastny = Math.round((e.mzda / e.hodiny) * 10000) / 10000;
    const min = v["sk.minimalna-mzda-hodinova"];
    const hodinovy = Math.max(vlastny, min);
    const observaciones: string[] = [];
    if (vlastny < min) observaciones.push("Priemerný zárobok bol nižší ako minimálna mzda, preto sa zvýšil na jej sumu (§ 134 ods. 5 Zákonníka práce).");
    if (e.hodiny < 168) observaciones.push("Pri menej ako 21 dňoch alebo 168 hodinách práce vo štvrťroku sa používa pravdepodobný zárobok, výsledok berte len orientačne.");
    return { nahrada: najblizsie(hodinovy * e.dni * e.hodinyDenne), hodinovy, mesacny: nahor(hodinovy * 174), observaciones };
  },
  resultado: [
    { clave: "nahrada", etiqueta: "Náhrada mzdy", formato: "moneda", destacada: true },
    { clave: "hodinovy", etiqueta: "Priemerný hodinový zárobok", formato: "moneda", decimales: 4 },
    { clave: "mesacny", etiqueta: "Priemerný mesačný zárobok pri 174 hodinách", formato: "moneda" },
  ],
});
