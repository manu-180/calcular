import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "hu.csaladi-potlek-kalkulator",
  mercado: "hu",
  concepto: "propio",
  slug: "csaladi-potlek-kalkulator",
  estado: "publicado",
  requiere: {
    "hu.csaladi-potlek": "mapa",
  },
  campos: [
    { id: "gyerekek", tipo: "entero", etiqueta: "Gyermekek száma a családban", ayuda: "Akiket a családi pótlék összegénél figyelembe vesznek.", min: 1, max: 15, porDefecto: 2 },
    { id: "beteg", tipo: "entero", etiqueta: "Ebből tartósan beteg vagy súlyosan fogyatékos gyermek", min: 0, max: 15, porDefecto: 0 },
    { id: "egyedulallo", tipo: "si-no", etiqueta: "Egyedül neveled a gyermekeidet", porDefecto: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.gyerekek < 1) throw new ErrorEntrada("Legalább egy gyermekkel számolj.", "gyerekek");
    if (e.beteg > e.gyerekek) throw new ErrorEntrada("A beteg gyermekek nem lehetnek többen, mint a gyermekek.", "beteg");
    const m = v["hu.csaladi-potlek"];
    const sav = e.gyerekek >= 3 ? "tobb" : e.gyerekek === 2 ? "ketto" : "egy";
    const egy = enMapa(m, e.egyedulallo ? `${sav}-egyedul` : sav);
    const betegre = enMapa(m, e.egyedulallo ? "beteg-egyedul" : "beteg");
    const havi = redondear((e.gyerekek - e.beteg) * egy + e.beteg * betegre);
    return {
      havi,
      gyermekenkent: egy,
      betegre: e.beteg > 0 ? betegre : null,
      eves: redondear(havi * 12),
      observaciones: ["Az összegek a családok támogatásáról szóló törvényből valók. A családi pótlékot a Magyar Államkincstár folyósítja."],
    };
  },
  resultado: [
    { clave: "havi", etiqueta: "Családi pótlék havonta", formato: "moneda", destacada: true },
    { clave: "gyermekenkent", etiqueta: "Gyermekenként", formato: "moneda" },
    { clave: "betegre", etiqueta: "Tartósan beteg gyermek után", formato: "moneda" },
    { clave: "eves", etiqueta: "Egy évre", formato: "moneda" },
  ],
});
