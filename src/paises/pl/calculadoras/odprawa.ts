import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "pl.odprawa",
  mercado: "pl",
  concepto: "indemnizacion-despido",
  slug: "odprawa",
  estado: "publicado",
  requiere: {
    "pl.odprawa": "mapa",
    "pl.limit-odprawy": "numero",
    "pl.placa-minimalna": "numero",
  },
  campos: [
    { id: "wynagrodzenie", tipo: "moneda", etiqueta: "Wynagrodzenie brutto miesięcznie (jak do ekwiwalentu za urlop)", min: 0, porDefecto: 7000 },
    { id: "staz", tipo: "numero", etiqueta: "Lata pracy u tego pracodawcy", min: 0, max: 60, porDefecto: 5 },
  ],
  calcular(e, v, { redondear }) {
    if (e.wynagrodzenie <= 0) throw new ErrorEntrada("Wpisz wynagrodzenie większe od zera.", "wynagrodzenie");
    const o = v["pl.odprawa"];
    const pensje = e.staz < 2 ? enMapa(o, "krocej-niz-2") : e.staz <= 8 ? enMapa(o, "od-2-do-8") : enMapa(o, "ponad-8");
    const limit = redondear(v["pl.limit-odprawy"] * v["pl.placa-minimalna"]);
    const wyliczona = redondear(e.wynagrodzenie * pensje);
    const odprawa = Math.min(wyliczona, limit);
    return {
      odprawa,
      pensje,
      limit,
      obcieta: wyliczona > limit ? redondear(wyliczona - limit) : 0,
      observaciones: [
        "Odprawa przysługuje przy zwolnieniu z przyczyn niedotyczących pracownika (likwidacja stanowiska, zwolnienia grupowe) u pracodawcy, który zatrudnia co najmniej 20 osób.",
      ],
    };
  },
  resultado: [
    { clave: "odprawa", etiqueta: "Odprawa (brutto)", formato: "moneda", destacada: true },
    { clave: "pensje", etiqueta: "Liczba pensji", formato: "numero", decimales: 0 },
    { clave: "limit", etiqueta: "Górny limit odprawy", formato: "moneda" },
    { clave: "obcieta", etiqueta: "Kwota ponad limit (nie przysługuje)", formato: "moneda", ocultarSiCero: true },
  ],
});
