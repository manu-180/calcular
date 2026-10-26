import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { Dato, FechaISO, TablaResultado } from "@/motor/tipos";
import { diasEntre, sumarDias, vigente } from "@/motor/vigencia";
import datos from "../datos.json";

// Odsetki za dłuższy okres przechodzą przez kilka stóp referencyjnych NBP, a silnik podaje tylko
// stopę na dziś, więc zweryfikowane przedziały czytamy wprost z datos.json.
const STOPA = datos.datos.find((d) => d.id === "pl.stopa-referencyjna") as unknown as Dato<"numero">;

export default definirCalculadora({
  id: "pl.kalkulator-odsetek-ustawowych",
  mercado: "pl",
  concepto: "propio",
  slug: "kalkulator-odsetek-ustawowych",
  estado: "publicado",
  requiere: {
    "pl.stopa-referencyjna": "numero",
    "pl.marza-odsetek-za-opoznienie": "numero",
    "pl.marza-odsetek-handlowych": "numero",
  },
  campos: [
    { id: "kwota", tipo: "moneda", etiqueta: "Kwota zaległości", min: 0, porDefecto: 10000 },
    { id: "termin", tipo: "fecha", etiqueta: "Termin zapłaty (ostatni dzień na zapłatę)", min: "2023-10-05", porDefecto: "2026-01-31" },
    { id: "zaplata", tipo: "fecha", etiqueta: "Dzień zapłaty", min: "2023-10-05", porDefecto: "hoy" },
    {
      id: "rodzaj",
      tipo: "opcion",
      etiqueta: "Rodzaj odsetek",
      opciones: [
        { valor: "opoznienie", etiqueta: "Odsetki ustawowe za opóźnienie (art. 481 k.c.)" },
        { valor: "handlowe", etiqueta: "Odsetki w transakcjach handlowych między firmami" },
      ],
      porDefecto: "opoznienie",
    },
  ],
  tablas: [{ clave: "okresy", titulo: "Odsetki w kolejnych okresach", filasVisibles: 10 }],
  calcular(e, v, { redondear }) {
    if (e.kwota <= 0) throw new ErrorEntrada("Wpisz kwotę większą od zera.", "kwota");
    if (e.zaplata <= e.termin) throw new ErrorEntrada("Dzień zapłaty musi być późniejszy niż termin.", "zaplata");
    const marza = e.rodzaj === "handlowe" ? v["pl.marza-odsetek-handlowych"] : v["pl.marza-odsetek-za-opoznienie"];
    const filas: (string | number)[][] = [];
    let razem = 0;
    let dzien: FechaISO = sumarDias(e.termin, 1);
    while (dzien <= e.zaplata) {
      const tramo = vigente(STOPA, dzien);
      if (!tramo) throw new ErrorEntrada("Nie mamy zweryfikowanej stopy referencyjnej NBP dla tego okresu.", "termin");
      const koniecStopy = tramo.hasta && tramo.hasta < e.zaplata ? tramo.hasta : e.zaplata;
      const dni = diasEntre(dzien, koniecStopy) + 1;
      const stopa = tramo.valor + marza;
      const odsetki = (e.kwota * stopa * dni) / 100 / 365;
      razem += odsetki;
      filas.push([dzien, koniecStopy, dni, stopa, redondear(odsetki)]);
      dzien = sumarDias(koniecStopy, 1);
    }
    const okresy: TablaResultado = {
      tipo: "tabla",
      columnas: [
        { clave: "od", etiqueta: "Od", formato: "fecha" },
        { clave: "do", etiqueta: "Do", formato: "fecha" },
        { clave: "dni", etiqueta: "Dni", formato: "dias" },
        { clave: "stopa", etiqueta: "Stopa roczna", formato: "porcentaje" },
        { clave: "odsetki", etiqueta: "Odsetki", formato: "moneda" },
      ],
      filas,
    };
    const odsetki = redondear(razem);
    return {
      odsetki,
      razem: redondear(e.kwota + odsetki),
      dni: diasEntre(e.termin, e.zaplata),
      stopaDzis: v["pl.stopa-referencyjna"] + marza,
      okresy,
      observaciones: ["Odsetki liczone za każdy dzień od dnia po terminie do dnia zapłaty włącznie, przy roku 365 dni."],
    };
  },
  resultado: [
    { clave: "odsetki", etiqueta: "Odsetki", formato: "moneda", destacada: true },
    { clave: "razem", etiqueta: "Kwota z odsetkami", formato: "moneda" },
    { clave: "dni", etiqueta: "Dni opóźnienia", formato: "dias", decimales: 0 },
    { clave: "stopaDzis", etiqueta: "Obecna stopa odsetek w skali roku", formato: "porcentaje", decimales: 2 },
  ],
});
