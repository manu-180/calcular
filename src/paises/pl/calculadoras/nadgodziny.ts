import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { nazwaMiesiaca, wymiarMiesiaca } from "../lib/kalendarz";

export default definirCalculadora({
  id: "pl.nadgodziny",
  mercado: "pl",
  concepto: "horas-extra",
  slug: "nadgodziny",
  estado: "publicado",
  requiere: {
    "pl.dodatek-za-nadgodziny": "mapa",
  },
  campos: [
    { id: "wynagrodzenie", tipo: "moneda", etiqueta: "Wynagrodzenie zasadnicze brutto miesięcznie", min: 0, porDefecto: 6000 },
    { id: "data", tipo: "fecha", etiqueta: "Miesiąc nadgodzin (wybierz dowolny dzień)", min: "2025-01-01", max: "2035-12-31", porDefecto: "hoy" },
    { id: "godziny50", tipo: "numero", etiqueta: "Nadgodziny w zwykłe dni pracy", min: 0, porDefecto: 10 },
    { id: "godziny100", tipo: "numero", etiqueta: "Nadgodziny w nocy, w niedziele i święta", min: 0, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.wynagrodzenie <= 0) throw new ErrorEntrada("Wpisz wynagrodzenie większe od zera.", "wynagrodzenie");
    if (e.godziny50 + e.godziny100 <= 0) throw new ErrorEntrada("Wpisz liczbę nadgodzin.", "godziny50");
    const rok = Number(e.data.slice(0, 4));
    const miesiac = Number(e.data.slice(5, 7));
    const wymiar = wymiarMiesiaca(rok, miesiac).godziny;
    const stawka = e.wynagrodzenie / wymiar;
    const d = v["pl.dodatek-za-nadgodziny"];
    const normalne = redondear(stawka * (e.godziny50 + e.godziny100));
    const dodatek50 = redondear((stawka * enMapa(d, "zwykly") * e.godziny50) / 100);
    const dodatek100 = redondear((stawka * enMapa(d, "noc-swieto") * e.godziny100) / 100);
    return {
      razem: redondear(normalne + dodatek50 + dodatek100),
      normalne,
      dodatek50,
      dodatek100,
      stawka: redondear(stawka),
      wymiar,
      miesiac: `${nazwaMiesiaca(miesiac)} ${rok}`,
    };
  },
  resultado: [
    { clave: "razem", etiqueta: "Do wypłaty za nadgodziny (brutto)", formato: "moneda", destacada: true },
    { clave: "normalne", etiqueta: "Normalne wynagrodzenie za nadgodziny", formato: "moneda" },
    { clave: "dodatek50", etiqueta: "Dodatek 50 %", formato: "moneda", ocultarSiCero: true },
    { clave: "dodatek100", etiqueta: "Dodatek 100 %", formato: "moneda", ocultarSiCero: true },
    { clave: "stawka", etiqueta: "Stawka za godzinę", formato: "moneda" },
    { clave: "wymiar", etiqueta: "Wymiar czasu pracy w miesiącu", formato: "horas", decimales: 0 },
    { clave: "miesiac", etiqueta: "Miesiąc", formato: "texto" },
  ],
});
