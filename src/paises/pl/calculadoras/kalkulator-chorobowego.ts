import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { doGroszy } from "../lib/podatki";

export default definirCalculadora({
  id: "pl.kalkulator-chorobowego",
  mercado: "pl",
  concepto: "propio",
  slug: "kalkulator-chorobowego",
  estado: "publicado",
  requiere: {
    "pl.zasilek-chorobowy": "mapa",
    "pl.skladki-pracownika": "mapa",
  },
  campos: [
    { id: "brutto", tipo: "moneda", etiqueta: "Przeciętne wynagrodzenie brutto z ostatnich 12 miesięcy", min: 0, porDefecto: 6000 },
    { id: "dni", tipo: "entero", etiqueta: "Liczba dni na zwolnieniu lekarskim (L4)", min: 1, max: 182, porDefecto: 10 },
    { id: "rodzaj", tipo: "opcion-dato", dato: "pl.zasilek-chorobowy", etiqueta: "Powód zwolnienia", porDefecto: "podstawowy" },
  ],
  calcular(e, v, { redondear }) {
    if (e.brutto <= 0) throw new ErrorEntrada("Wpisz wynagrodzenie większe od zera.", "brutto");
    const s = v["pl.skladki-pracownika"];
    const skladki = ["emerytalne", "rentowe", "chorobowe"].reduce((suma, k) => suma + doGroszy((e.brutto * enMapa(s, k)) / 100), 0);
    const podstawa = doGroszy(e.brutto - skladki);
    const procent = enMapa(v["pl.zasilek-chorobowy"], e.rodzaj);
    const dzienny = doGroszy(((podstawa / 30) * procent) / 100);
    const razem = redondear(dzienny * e.dni);
    const pelnaPensjaZaTeDni = redondear((podstawa / 30) * e.dni);
    return {
      razem,
      dzienny,
      podstawa,
      procent,
      strata: redondear(pelnaPensjaZaTeDni - razem),
      observaciones: [
        "Za pierwsze dni choroby w roku (33 dni, a po 50. roku życia 14 dni) płaci pracodawca jako wynagrodzenie chorobowe, dalej ZUS jako zasiłek. Kwota liczy się tak samo.",
      ],
    };
  },
  resultado: [
    { clave: "razem", etiqueta: "Za cały okres zwolnienia (brutto)", formato: "moneda", destacada: true },
    { clave: "dzienny", etiqueta: "Za jeden dzień", formato: "moneda" },
    { clave: "podstawa", etiqueta: "Podstawa (brutto minus składki ZUS pracownika)", formato: "moneda" },
    { clave: "procent", etiqueta: "Wysokość świadczenia", formato: "porcentaje", decimales: 0 },
    { clave: "strata", etiqueta: "Mniej niż przy pełnej podstawie za te dni", formato: "moneda", ocultarSiCero: true },
  ],
});
