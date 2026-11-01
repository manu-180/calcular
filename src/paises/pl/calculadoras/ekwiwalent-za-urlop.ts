import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { wspolczynnikUrlopowy } from "../lib/kalendarz";

export default definirCalculadora({
  id: "pl.ekwiwalent-za-urlop",
  mercado: "pl",
  concepto: "propio",
  slug: "ekwiwalent-za-urlop",
  estado: "publicado",
  requiere: {},
  campos: [
    { id: "wynagrodzenie", tipo: "moneda", etiqueta: "Wynagrodzenie brutto miesięcznie (stałe składniki)", min: 0, porDefecto: 6000 },
    { id: "dni", tipo: "numero", etiqueta: "Niewykorzystane dni urlopu", min: 0, max: 100, porDefecto: 5 },
    { id: "data", tipo: "fecha", etiqueta: "Dzień zakończenia umowy", min: "2025-01-01", max: "2035-12-31", porDefecto: "hoy" },
    { id: "etat", tipo: "numero", etiqueta: "Wymiar etatu (1 to pełny etat)", min: 0.01, max: 1, porDefecto: 1 },
  ],
  calcular(e, _v, { redondear }) {
    if (e.wynagrodzenie <= 0) throw new ErrorEntrada("Wpisz wynagrodzenie większe od zera.", "wynagrodzenie");
    if (e.dni <= 0) throw new ErrorEntrada("Wpisz liczbę niewykorzystanych dni urlopu.", "dni");
    if (e.etat <= 0 || e.etat > 1) throw new ErrorEntrada("Wymiar etatu wpisz jako liczbę od 0,01 do 1.", "etat");
    const rok = Number(e.data.slice(0, 4));
    const wspolczynnik = wspolczynnikUrlopowy(rok) * e.etat;
    const zaDzien = redondear(e.wynagrodzenie / wspolczynnik);
    const zaGodzine = redondear(zaDzien / 8);
    const godziny = e.dni * 8;
    return {
      ekwiwalent: redondear(zaGodzine * godziny),
      wspolczynnik,
      zaDzien,
      zaGodzine,
      godziny,
      observaciones: [
        "Zmienne składniki pensji (premie, prowizje) dolicza się w średniej z 3 miesięcy przed zakończeniem umowy. Wpisz je razem z pensją zasadniczą.",
      ],
    };
  },
  resultado: [
    { clave: "ekwiwalent", etiqueta: "Ekwiwalent za urlop (brutto)", formato: "moneda", destacada: true },
    { clave: "wspolczynnik", etiqueta: "Współczynnik urlopowy", formato: "numero", decimales: 2 },
    { clave: "zaDzien", etiqueta: "Ekwiwalent za 1 dzień", formato: "moneda" },
    { clave: "zaGodzine", etiqueta: "Ekwiwalent za 1 godzinę", formato: "moneda" },
    { clave: "godziny", etiqueta: "Niewykorzystany urlop w godzinach", formato: "horas", decimales: 1 },
  ],
});
