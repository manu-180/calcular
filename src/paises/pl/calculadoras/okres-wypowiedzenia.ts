import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import type { FechaISO } from "@/motor/tipos";
import { sumarDias } from "@/motor/vigencia";
import { ostatniDzienMiesiaca } from "../lib/kalendarz";

function dodajMiesiace(data: string, miesiace: number): string {
  const r = Number(data.slice(0, 4));
  const m = Number(data.slice(5, 7)) - 1 + miesiace;
  const rok = r + Math.floor(m / 12);
  const mies = (m % 12) + 1;
  const ostatni = Number(ostatniDzienMiesiaca(rok, mies).slice(8, 10));
  const dzien = Math.min(Number(data.slice(8, 10)), ostatni);
  return `${rok}-${String(mies).padStart(2, "0")}-${String(dzien).padStart(2, "0")}`;
}

function dzienTygodnia(data: string): number {
  return new Date(`${data}T00:00:00Z`).getUTCDay();
}

export default definirCalculadora({
  id: "pl.okres-wypowiedzenia",
  mercado: "pl",
  concepto: "preaviso",
  slug: "okres-wypowiedzenia",
  estado: "publicado",
  requiere: {
    "pl.okres-wypowiedzenia": "mapa",
  },
  campos: [
    { id: "zatrudnienie", tipo: "fecha", etiqueta: "Data rozpoczęcia pracy u tego pracodawcy", min: "1970-01-01", porDefecto: "2024-01-01" },
    { id: "wypowiedzenie", tipo: "fecha", etiqueta: "Data złożenia wypowiedzenia", min: "2000-01-01", porDefecto: "hoy" },
  ],
  calcular(e, v) {
    if (e.wypowiedzenie < e.zatrudnienie) throw new ErrorEntrada("Wypowiedzenie nie może być wcześniejsze niż rozpoczęcie pracy.", "wypowiedzenie");
    const o = v["pl.okres-wypowiedzenia"];
    const trzyLata = dodajMiesiace(e.zatrudnienie, 36) <= e.wypowiedzenie;
    const polRoku = dodajMiesiace(e.zatrudnienie, 6) <= e.wypowiedzenie;
    let tygodnie = 0;
    let miesiace = 0;
    let koniec: string;
    if (trzyLata || polRoku) {
      miesiace = trzyLata ? enMapa(o, "od-3-lat") : enMapa(o, "od-6-mies");
      const docelowy = dodajMiesiace(`${e.wypowiedzenie.slice(0, 7)}-01`, miesiace);
      koniec = ostatniDzienMiesiaca(Number(docelowy.slice(0, 4)), Number(docelowy.slice(5, 7)));
    } else {
      tygodnie = enMapa(o, "krocej-niz-6-mies");
      const doNiedzieli = 7 - dzienTygodnia(e.wypowiedzenie);
      const start = sumarDias(e.wypowiedzenie as FechaISO, doNiedzieli);
      koniec = sumarDias(start, 7 * tygodnie - 1);
    }
    return {
      koniec,
      tygodnie,
      miesiace,
      observaciones: [
        "Okres liczony w tygodniach kończy się w sobotę, a liczony w miesiącach w ostatnim dniu miesiąca. Strony mogą też rozwiązać umowę wcześniej na mocy porozumienia.",
      ],
    };
  },
  resultado: [
    { clave: "koniec", etiqueta: "Ostatni dzień pracy", formato: "fecha", destacada: true },
    { clave: "tygodnie", etiqueta: "Okres wypowiedzenia", formato: "semanas", decimales: 0, ocultarSiCero: true },
    { clave: "miesiace", etiqueta: "Okres wypowiedzenia", formato: "meses", decimales: 0, ocultarSiCero: true },
  ],
});
