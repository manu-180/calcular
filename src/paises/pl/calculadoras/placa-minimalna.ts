import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { rokNaEtacie } from "../lib/podatki";

export default definirCalculadora({
  id: "pl.placa-minimalna",
  mercado: "pl",
  concepto: "salario-minimo",
  slug: "placa-minimalna",
  estado: "publicado",
  requiere: {
    "pl.placa-minimalna": "numero",
    "pl.stawka-godzinowa": "numero",
    "pl.skala-pit": "escala",
    "pl.kwota-zmniejszajaca": "numero",
    "pl.skladki-pracownika": "mapa",
    "pl.skladka-zdrowotna": "numero",
    "pl.limit-30-krotnosci": "numero",
    "pl.koszty-pracownicze": "mapa",
  },
  campos: [
    { id: "etat", tipo: "numero", etiqueta: "Wymiar etatu (1 to pełny etat, 0,5 to pół etatu)", min: 0.01, max: 1, porDefecto: 1 },
    { id: "godziny", tipo: "numero", etiqueta: "Liczba godzin na umowie zlecenia w miesiącu (opcjonalnie)", min: 0, requerido: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.etat <= 0 || e.etat > 1) throw new ErrorEntrada("Wymiar etatu wpisz jako liczbę od 0,01 do 1.", "etat");
    const brutto = redondear(v["pl.placa-minimalna"] * e.etat);
    const s = v["pl.skladki-pracownika"];
    const rok = rokNaEtacie(brutto, {
      skala: { progi: v["pl.skala-pit"], kwotaZmniejszajaca: v["pl.kwota-zmniejszajaca"] },
      skladki: { emerytalne: enMapa(s, "emerytalne"), rentowe: enMapa(s, "rentowe"), chorobowe: enMapa(s, "chorobowe") },
      zdrowotna: v["pl.skladka-zdrowotna"],
      limit30: v["pl.limit-30-krotnosci"],
      koszty: enMapa(v["pl.koszty-pracownicze"], "standard"),
      pit2: true,
      limitMlodych: null,
    });
    const stawka = v["pl.stawka-godzinowa"];
    return {
      brutto,
      netto: rok[0].netto,
      stawka,
      zlecenie: e.godziny === null ? null : redondear(e.godziny * stawka),
      roczne: redondear(brutto * 12),
      observaciones: ["Netto policzone dla umowy o pracę z PIT-2, podstawowymi kosztami uzyskania przychodu i bez ulgi dla młodych."],
    };
  },
  resultado: [
    { clave: "brutto", etiqueta: "Minimalne wynagrodzenie brutto", formato: "moneda", destacada: true },
    { clave: "netto", etiqueta: "Na rękę (umowa o pracę)", formato: "moneda" },
    { clave: "stawka", etiqueta: "Minimalna stawka godzinowa", formato: "moneda" },
    { clave: "zlecenie", etiqueta: "Minimum za podane godziny na zleceniu", formato: "moneda" },
    { clave: "roczne", etiqueta: "Brutto w roku", formato: "moneda" },
  ],
});
