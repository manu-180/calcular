import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pl.koszt-pracodawcy",
  h1: "Kalkulator kosztów pracodawcy",
  title: "Koszt pracodawcy: ile kosztuje pracownik w Polsce",
  description:
    "Policz całkowity koszt zatrudnienia na umowie o pracę: składki emerytalna, rentowa, wypadkowa, Fundusz Pracy, Fundusz Solidarnościowy i FGŚP od pensji brutto.",
  intro: [
    "Pensja brutto to nie wszystko, co płaci firma. Pracodawca dokłada od siebie składki do ZUS i na fundusze, zwykle około jednej piątej pensji.",
    "Wpisz wynagrodzenie brutto, a kalkulator pokaże każdą składkę i łączny koszt.",
  ],
  comoSeCalcula: [
    "Składka emerytalna płacona przez pracodawcę: {{pl.skladki-platnika[emerytalne]}} pensji brutto. Rentowa: {{pl.skladki-platnika[rentowe]}}.",
    "Składka wypadkowa zależy od firmy. ZUS w swoich wyliczeniach przyjmuje {{pl.skladka-wypadkowa}}.",
    "Fundusz Pracy {{pl.fundusze[fp]}}, Fundusz Solidarnościowy {{pl.fundusze[fs]}} i FGŚP {{pl.fundusze[fgsp]}} według ustawy budżetowej.",
    "Koszt pracodawcy to brutto plus wszystkie te składki.",
  ],
  ejemplo: [
    "Pracownik z pensją 8000 zł brutto kosztuje firmę 9638,40 zł miesięcznie, jeśli stopa wypadkowa wynosi 1,67 %.",
  ],
  faq: [
    {
      pregunta: "Ile kosztuje pracodawcę płaca minimalna?",
      respuesta: "Wpisz kwotę minimalnego wynagrodzenia jako brutto. Do pensji dochodzą te same składki co przy każdej innej kwocie.",
    },
    {
      pregunta: "Skąd wziąć swoją stopę składki wypadkowej?",
      respuesta: "Stopa zależy od zagrożeń w firmie i od liczby ubezpieczonych. Znajdziesz ją w informacji z ZUS albo w deklaracjach rozliczeniowych firmy. Jeśli jej nie znasz, zostaw pole puste.",
    },
    {
      pregunta: "Czy składki pracodawcy obniżają pensję pracownika?",
      respuesta: "Nie. Pracodawca płaci je ponad pensję brutto. Z pensji brutto potrąca się tylko składki pracownika, składkę zdrowotną i zaliczkę na PIT.",
    },
  ],
  glosario: [
    { termino: "FGŚP", definicion: "Fundusz Gwarantowanych Świadczeń Pracowniczych. Wypłaca pensje, gdy pracodawca stanie się niewypłacalny." },
    { termino: "Narzut", definicion: "Składki, które pracodawca płaci ponad pensję brutto." },
  ],
});
