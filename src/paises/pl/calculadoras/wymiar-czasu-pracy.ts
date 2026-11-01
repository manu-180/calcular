import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { TablaResultado } from "@/motor/tipos";
import { nazwaMiesiaca, wymiarCzasuPracy, wymiarMiesiaca } from "../lib/kalendarz";

export default definirCalculadora({
  id: "pl.wymiar-czasu-pracy",
  mercado: "pl",
  concepto: "propio",
  slug: "wymiar-czasu-pracy",
  estado: "publicado",
  requiere: {},
  campos: [
    { id: "data", tipo: "fecha", etiqueta: "Miesiąc (wybierz dowolny dzień)", min: "2025-01-01", max: "2035-12-31", porDefecto: "hoy" },
    {
      id: "zakres",
      tipo: "opcion",
      etiqueta: "Okres",
      opciones: [
        { valor: "miesiac", etiqueta: "Wybrany miesiąc" },
        { valor: "rok", etiqueta: "Cały rok" },
      ],
      porDefecto: "miesiac",
    },
    { id: "etat", tipo: "numero", etiqueta: "Wymiar etatu (1 to pełny etat)", min: 0.01, max: 1, porDefecto: 1 },
  ],
  tablas: [{ clave: "miesiace", titulo: "Wymiar czasu pracy w kolejnych miesiącach", filasVisibles: 12 }],
  calcular(e, _v, { redondear }) {
    if (e.etat <= 0 || e.etat > 1) throw new ErrorEntrada("Wymiar etatu wpisz jako liczbę od 0,01 do 1.", "etat");
    const rok = Number(e.data.slice(0, 4));
    const miesiac = Number(e.data.slice(5, 7));
    const w = e.zakres === "rok" ? wymiarCzasuPracy(`${rok}-01-01`, `${rok}-12-31`) : wymiarMiesiaca(rok, miesiac);
    const miesiace: TablaResultado = {
      tipo: "tabla",
      columnas: [
        { clave: "miesiac", etiqueta: "Miesiąc", formato: "texto" },
        { clave: "dni", etiqueta: "Dni pracy", formato: "dias" },
        { clave: "godziny", etiqueta: "Godziny (pełny etat)", formato: "horas" },
      ],
      filas: Array.from({ length: 12 }, (_, i) => {
        const m = wymiarMiesiaca(rok, i + 1);
        return [`${nazwaMiesiaca(i + 1)} ${rok}`, m.dniRobocze, m.godziny];
      }),
    };
    const observaciones: string[] = [];
    if (w.swietaWSobote > 0) {
      observaciones.push("Święto w sobotę obniża wymiar czasu pracy o 8 godzin, więc pracodawca musi wyznaczyć inny dzień wolny w tym okresie rozliczeniowym.");
    }
    return {
      godziny: redondear(w.godziny * e.etat),
      dni: w.dniRobocze,
      godzinyPelny: w.godziny,
      swietaWDniPowszedni: w.swietaWDniPowszedni,
      swietaWSobote: w.swietaWSobote,
      okres: e.zakres === "rok" ? `rok ${rok}` : `${nazwaMiesiaca(miesiac)} ${rok}`,
      miesiace,
      observaciones,
    };
  },
  resultado: [
    { clave: "godziny", etiqueta: "Wymiar czasu pracy", formato: "horas", decimales: 2, destacada: true },
    { clave: "okres", etiqueta: "Okres", formato: "texto" },
    { clave: "dni", etiqueta: "Dni pracy (pełny etat)", formato: "dias", decimales: 0 },
    { clave: "godzinyPelny", etiqueta: "Godziny na pełny etat", formato: "horas", decimales: 0 },
    { clave: "swietaWDniPowszedni", etiqueta: "Święta od poniedziałku do piątku", formato: "dias", decimales: 0 },
    { clave: "swietaWSobote", etiqueta: "Święta w sobotę (dodatkowy dzień wolny)", formato: "dias", decimales: 0, ocultarSiCero: true },
  ],
});
