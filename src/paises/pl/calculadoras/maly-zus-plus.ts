import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { skladkiOdPodstawy, stopyPrzedsiebiorcy } from "../lib/dzialalnosc";
import { doGroszy } from "../lib/podatki";

function dniWRoku(rok: number): number {
  return (rok % 4 === 0 && rok % 100 !== 0) || rok % 400 === 0 ? 366 : 365;
}

export default definirCalculadora({
  id: "pl.maly-zus-plus",
  mercado: "pl",
  concepto: "propio",
  slug: "maly-zus-plus",
  estado: "publicado",
  requiere: {
    "pl.skladki-pracownika": "mapa",
    "pl.skladki-platnika": "mapa",
    "pl.skladka-wypadkowa": "numero",
    "pl.fundusze": "mapa",
    "pl.podstawa-zus-pelna": "numero",
    "pl.podstawa-zus-preferencyjna": "numero",
    "pl.limit-malego-zus": "numero",
    "pl.wspolczynnik-malego-zus": "numero",
  },
  campos: [
    { id: "przychod", tipo: "moneda", etiqueta: "Przychód z działalności w poprzednim roku", min: 0, porDefecto: 100000 },
    { id: "dochod", tipo: "moneda", etiqueta: "Dochód z działalności w poprzednim roku", min: 0, porDefecto: 60000 },
    { id: "dni", tipo: "entero", etiqueta: "Liczba dni prowadzenia działalności w poprzednim roku", min: 1, max: 366, porDefecto: 365 },
    { id: "chorobowe", tipo: "si-no", etiqueta: "Dobrowolne ubezpieczenie chorobowe", porDefecto: true },
    { id: "fpFs", tipo: "si-no", etiqueta: "Płacisz Fundusz Pracy i Fundusz Solidarnościowy", porDefecto: true, ayuda: "Nie płacą ich kobiety po 55. i mężczyźni po 60. roku życia." },
  ],
  calcular(e, v, { fecha, redondear }) {
    const rokPoprzedni = Number(fecha.slice(0, 4)) - 1;
    const dniRoku = dniWRoku(rokPoprzedni);
    if (e.dni > dniRoku) throw new ErrorEntrada(`Poprzedni rok miał ${dniRoku} dni.`, "dni");
    const limit = redondear((v["pl.limit-malego-zus"] / dniRoku) * e.dni);
    if (e.przychod > limit) {
      throw new ErrorEntrada("Mały ZUS plus przysługuje tylko wtedy, gdy przychód z poprzedniego roku nie przekroczył limitu. Twój przychód jest wyższy.", "przychod");
    }
    const sredniDochod = doGroszy((e.dochod / e.dni) * 30);
    const wyliczona = doGroszy(sredniDochod * v["pl.wspolczynnik-malego-zus"]);
    const podstawa = Math.min(v["pl.podstawa-zus-pelna"], Math.max(v["pl.podstawa-zus-preferencyjna"], wyliczona));
    const stopy = stopyPrzedsiebiorcy(v["pl.skladki-pracownika"], v["pl.skladki-platnika"], v["pl.skladka-wypadkowa"], v["pl.fundusze"]);
    const s = skladkiOdPodstawy(podstawa, stopy, { chorobowe: e.chorobowe, fpFs: e.fpFs });
    const pelny = skladkiOdPodstawy(v["pl.podstawa-zus-pelna"], stopy, { chorobowe: e.chorobowe, fpFs: e.fpFs });
    const observaciones: string[] = [];
    if (wyliczona < v["pl.podstawa-zus-preferencyjna"]) observaciones.push("Wyliczona podstawa jest niższa od minimum, więc składki liczy się od 30 % minimalnego wynagrodzenia.");
    if (wyliczona > v["pl.podstawa-zus-pelna"]) observaciones.push("Wyliczona podstawa przekracza maksimum, więc mały ZUS plus nie obniża składek.");
    return {
      razem: s.razem,
      podstawa,
      sredniDochod,
      emerytalne: s.emerytalne,
      rentowe: s.rentowe,
      chorobowe: s.chorobowe,
      wypadkowe: s.wypadkowe,
      fpFs: s.fpFs,
      oszczednosc: redondear(pelny.razem - s.razem),
      limit,
      observaciones,
    };
  },
  resultado: [
    { clave: "razem", etiqueta: "Składki społeczne z FP i FS w miesiącu", formato: "moneda", destacada: true },
    { clave: "podstawa", etiqueta: "Podstawa składek", formato: "moneda" },
    { clave: "sredniDochod", etiqueta: "Przeciętny miesięczny dochód z poprzedniego roku", formato: "moneda" },
    { clave: "emerytalne", etiqueta: "Emerytalna", formato: "moneda" },
    { clave: "rentowe", etiqueta: "Rentowa", formato: "moneda" },
    { clave: "chorobowe", etiqueta: "Chorobowa", formato: "moneda", ocultarSiCero: true },
    { clave: "wypadkowe", etiqueta: "Wypadkowa", formato: "moneda" },
    { clave: "fpFs", etiqueta: "Fundusz Pracy i Fundusz Solidarnościowy", formato: "moneda", ocultarSiCero: true },
    { clave: "oszczednosc", etiqueta: "Oszczędność wobec pełnego ZUS", formato: "moneda" },
    { clave: "limit", etiqueta: "Limit przychodu dla Twojej liczby dni", formato: "moneda" },
  ],
});
