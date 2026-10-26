import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import type { TablaResultado } from "@/motor/tipos";
import { nazwaMiesiaca } from "../lib/kalendarz";
import { rokNaEtacie, suma } from "../lib/podatki";

export default definirCalculadora({
  id: "pl.kalkulator-wynagrodzen",
  mercado: "pl",
  concepto: "sueldo-neto",
  slug: "kalkulator-wynagrodzen",
  estado: "publicado",
  requiere: {
    "pl.skala-pit": "escala",
    "pl.kwota-zmniejszajaca": "numero",
    "pl.skladki-pracownika": "mapa",
    "pl.skladka-zdrowotna": "numero",
    "pl.limit-30-krotnosci": "numero",
    "pl.koszty-pracownicze": "mapa",
    "pl.limit-ulgi-dla-mlodych": "numero",
  },
  campos: [
    { id: "brutto", tipo: "moneda", etiqueta: "Wynagrodzenie brutto miesięcznie", min: 0, porDefecto: 8000 },
    { id: "koszty", tipo: "opcion-dato", dato: "pl.koszty-pracownicze", etiqueta: "Koszty uzyskania przychodu", porDefecto: "standard" },
    { id: "pit2", tipo: "si-no", etiqueta: "PIT-2 złożony u pracodawcy (kwota zmniejszająca podatek)", porDefecto: true },
    { id: "mlody", tipo: "si-no", etiqueta: "Masz mniej niż 26 lat (ulga dla młodych)", porDefecto: false },
  ],
  tablas: [{ clave: "miesiace", titulo: "Wynagrodzenie miesiąc po miesiącu", filasVisibles: 12 }],
  calcular(e, v, { redondear }) {
    if (e.brutto <= 0) throw new ErrorEntrada("Wpisz wynagrodzenie brutto większe od zera.", "brutto");
    const s = v["pl.skladki-pracownika"];
    const rok = rokNaEtacie(e.brutto, {
      skala: { progi: v["pl.skala-pit"], kwotaZmniejszajaca: v["pl.kwota-zmniejszajaca"] },
      skladki: { emerytalne: enMapa(s, "emerytalne"), rentowe: enMapa(s, "rentowe"), chorobowe: enMapa(s, "chorobowe") },
      zdrowotna: v["pl.skladka-zdrowotna"],
      limit30: v["pl.limit-30-krotnosci"],
      koszty: enMapa(v["pl.koszty-pracownicze"], e.koszty),
      pit2: e.pit2,
      limitMlodych: e.mlody ? v["pl.limit-ulgi-dla-mlodych"] : null,
    });
    const pierwszy = rok[0];
    const ostatni = rok[11];
    const nettoRoczne = suma(rok, "netto");
    const spoleczneRoczne = redondear(suma(rok, "emerytalne") + suma(rok, "rentowe") + suma(rok, "chorobowe"));
    const miesiace: TablaResultado = {
      tipo: "tabla",
      columnas: [
        { clave: "miesiac", etiqueta: "Miesiąc", formato: "texto" },
        { clave: "spoleczne", etiqueta: "Składki ZUS", formato: "moneda" },
        { clave: "zdrowotna", etiqueta: "Składka zdrowotna", formato: "moneda" },
        { clave: "zaliczka", etiqueta: "Zaliczka na PIT", formato: "moneda" },
        { clave: "netto", etiqueta: "Na rękę", formato: "moneda" },
      ],
      filas: rok.map((m) => [nazwaMiesiaca(m.miesiac), redondear(m.emerytalne + m.rentowe + m.chorobowe), m.zdrowotna, m.zaliczka, m.netto]),
    };
    const observaciones: string[] = [];
    if (ostatni.netto !== pierwszy.netto) {
      observaciones.push("Kwota na rękę zmienia się w ciągu roku: po przekroczeniu progu 120 000 zł rośnie podatek, a po przekroczeniu limitu 30-krotności znikają składki emerytalna i rentowa.");
    }
    if (e.mlody) observaciones.push("Ulga dla młodych zwalnia z PIT przychód do limitu rocznego. Składki ZUS i zdrowotną płacisz normalnie.");
    return {
      nettoSrednio: redondear(nettoRoczne / 12),
      nettoStyczen: pierwszy.netto,
      nettoGrudzien: ostatni.netto,
      emerytalne: pierwszy.emerytalne,
      rentowe: pierwszy.rentowe,
      chorobowe: pierwszy.chorobowe,
      zdrowotna: pierwszy.zdrowotna,
      zaliczka: pierwszy.zaliczka,
      bruttoRoczne: redondear(e.brutto * 12),
      nettoRoczne,
      spoleczneRoczne,
      pitRoczny: suma(rok, "zaliczka"),
      miesiace,
      observaciones,
    };
  },
  resultado: [
    { clave: "nettoSrednio", etiqueta: "Na rękę miesięcznie (średnio w roku)", formato: "moneda", destacada: true },
    { clave: "nettoStyczen", etiqueta: "Na rękę w styczniu", formato: "moneda" },
    { clave: "nettoGrudzien", etiqueta: "Na rękę w grudniu", formato: "moneda" },
    { clave: "emerytalne", etiqueta: "Składka emerytalna (styczeń)", formato: "moneda" },
    { clave: "rentowe", etiqueta: "Składka rentowa (styczeń)", formato: "moneda" },
    { clave: "chorobowe", etiqueta: "Składka chorobowa (styczeń)", formato: "moneda" },
    { clave: "zdrowotna", etiqueta: "Składka zdrowotna (styczeń)", formato: "moneda" },
    { clave: "zaliczka", etiqueta: "Zaliczka na PIT (styczeń)", formato: "moneda" },
    { clave: "bruttoRoczne", etiqueta: "Brutto w roku", formato: "moneda" },
    { clave: "spoleczneRoczne", etiqueta: "Składki ZUS w roku", formato: "moneda" },
    { clave: "pitRoczny", etiqueta: "Zaliczki na PIT w roku", formato: "moneda" },
    { clave: "nettoRoczne", etiqueta: "Na rękę w roku", formato: "moneda" },
  ],
  mundo: { bruto: "brutto", periodoBruto: "mes", neto: "nettoSrednio", periodoNeto: "mes", entrada: { koszty: "standard", pit2: true, mlody: false } },
});
