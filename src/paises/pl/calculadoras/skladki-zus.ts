import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { progRyczaltu, skladkiOdPodstawy, stopyPrzedsiebiorcy, ZERO } from "../lib/dzialalnosc";
import { doGroszy } from "../lib/podatki";

export default definirCalculadora({
  id: "pl.skladki-zus",
  mercado: "pl",
  concepto: "aportes-seguridad-social",
  slug: "skladki-zus",
  estado: "publicado",
  requiere: {
    "pl.skladki-pracownika": "mapa",
    "pl.skladki-platnika": "mapa",
    "pl.skladka-wypadkowa": "numero",
    "pl.fundusze": "mapa",
    "pl.podstawa-zus-pelna": "numero",
    "pl.podstawa-zus-preferencyjna": "numero",
    "pl.skladka-zdrowotna": "numero",
    "pl.skladka-zdrowotna-liniowa": "numero",
    "pl.zdrowotna-podstawa-minimalna": "numero",
    "pl.zdrowotna-ryczalt": "mapa",
  },
  campos: [
    {
      id: "wariant",
      tipo: "opcion",
      etiqueta: "Składki społeczne",
      opciones: [
        { valor: "pelny", etiqueta: "Pełny ZUS" },
        { valor: "preferencyjny", etiqueta: "Preferencyjny ZUS (mały ZUS przez 24 miesiące)" },
        { valor: "ulga-na-start", etiqueta: "Ulga na start (tylko składka zdrowotna)" },
      ],
      porDefecto: "pelny",
    },
    { id: "chorobowe", tipo: "si-no", etiqueta: "Dobrowolne ubezpieczenie chorobowe", porDefecto: true },
    { id: "fpFs", tipo: "si-no", etiqueta: "Płacisz Fundusz Pracy i Fundusz Solidarnościowy", porDefecto: true, ayuda: "Nie płacą ich kobiety po 55. i mężczyźni po 60. roku życia." },
    {
      id: "forma",
      tipo: "opcion",
      etiqueta: "Forma opodatkowania",
      opciones: [
        { valor: "skala", etiqueta: "Skala podatkowa" },
        { valor: "liniowy", etiqueta: "Podatek liniowy" },
        { valor: "ryczalt", etiqueta: "Ryczałt od przychodów ewidencjonowanych" },
      ],
      porDefecto: "skala",
    },
    { id: "dochod", tipo: "moneda", etiqueta: "Dochód z poprzedniego miesiąca (przychód minus koszty)", min: 0, porDefecto: 10000, visibleSi: { forma: ["skala", "liniowy"] } },
    { id: "przychodRoczny", tipo: "moneda", etiqueta: "Przychód od początku roku", min: 0, porDefecto: 100000, visibleSi: { forma: ["ryczalt"] } },
  ],
  calcular(e, v, { redondear }) {
    const stopy = stopyPrzedsiebiorcy(v["pl.skladki-pracownika"], v["pl.skladki-platnika"], v["pl.skladka-wypadkowa"], v["pl.fundusze"]);
    const s =
      e.wariant === "ulga-na-start"
        ? ZERO
        : e.wariant === "preferencyjny"
          ? skladkiOdPodstawy(v["pl.podstawa-zus-preferencyjna"], stopy, { chorobowe: e.chorobowe, fpFs: false })
          : skladkiOdPodstawy(v["pl.podstawa-zus-pelna"], stopy, { chorobowe: e.chorobowe, fpFs: e.fpFs });
    const minimalna = doGroszy((v["pl.zdrowotna-podstawa-minimalna"] * v["pl.skladka-zdrowotna"]) / 100);
    let zdrowotna: number;
    if (e.forma === "ryczalt") {
      if (e.przychodRoczny === null) throw new ErrorEntrada({ codigo: "requerido" });
      zdrowotna = doGroszy((enMapa(v["pl.zdrowotna-ryczalt"], progRyczaltu(e.przychodRoczny)) * v["pl.skladka-zdrowotna"]) / 100);
    } else {
      if (e.dochod === null) throw new ErrorEntrada({ codigo: "requerido" });
      const podstawa = Math.max(0, e.dochod - s.spoleczne);
      const stopa = e.forma === "liniowy" ? v["pl.skladka-zdrowotna-liniowa"] : v["pl.skladka-zdrowotna"];
      zdrowotna = Math.max(minimalna, doGroszy((podstawa * stopa) / 100));
    }
    const observaciones: string[] = [];
    if (e.wariant === "ulga-na-start") observaciones.push("Przy uldze na start nie płacisz składek społecznych, tylko składkę zdrowotną.");
    return {
      razem: redondear(s.razem + zdrowotna),
      podstawa: s.podstawa,
      emerytalne: s.emerytalne,
      rentowe: s.rentowe,
      chorobowe: s.chorobowe,
      wypadkowe: s.wypadkowe,
      fpFs: s.fpFs,
      spoleczne: s.razem,
      zdrowotna,
      observaciones,
    };
  },
  resultado: [
    { clave: "razem", etiqueta: "Razem do zapłaty w miesiącu", formato: "moneda", destacada: true },
    { clave: "spoleczne", etiqueta: "Składki społeczne z FP i FS", formato: "moneda" },
    { clave: "zdrowotna", etiqueta: "Składka zdrowotna", formato: "moneda" },
    { clave: "podstawa", etiqueta: "Podstawa składek społecznych", formato: "moneda", ocultarSiCero: true },
    { clave: "emerytalne", etiqueta: "Emerytalna", formato: "moneda", ocultarSiCero: true },
    { clave: "rentowe", etiqueta: "Rentowa", formato: "moneda", ocultarSiCero: true },
    { clave: "chorobowe", etiqueta: "Chorobowa", formato: "moneda", ocultarSiCero: true },
    { clave: "wypadkowe", etiqueta: "Wypadkowa", formato: "moneda", ocultarSiCero: true },
    { clave: "fpFs", etiqueta: "Fundusz Pracy i Fundusz Solidarnościowy", formato: "moneda", ocultarSiCero: true },
  ],
});
