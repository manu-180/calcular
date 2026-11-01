import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "hu.tappenz-kalkulator",
  mercado: "hu",
  concepto: "propio",
  slug: "tappenz-kalkulator",
  estado: "publicado",
  requiere: {
    "hu.tappenz": "mapa",
    "hu.minimalber": "mapa",
    "hu.szja": "numero",
    "hu.betegszabadsag": "mapa",
  },
  campos: [
    { id: "havi", tipo: "moneda", etiqueta: "Havi bruttó átlagkereset", ayuda: "Az elmúlt időszak átlagos havi bruttó jövedelme.", min: 0, porDefecto: 500000 },
    { id: "napok", tipo: "entero", etiqueta: "Táppénzes napok száma (naptári nap)", min: 1, max: 365, porDefecto: 30 },
    { id: "biztositas", tipo: "si-no", etiqueta: "Legalább 730 nap biztosítási időd van", ayuda: "Ha kevesebb, a táppénz kisebb százalékkal jár.", porDefecto: true },
    { id: "korhaz", tipo: "si-no", etiqueta: "Kórházban ápolnak", porDefecto: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.havi <= 0) throw new ErrorEntrada("Adj meg nullánál nagyobb átlagkeresetet.", "havi");
    const t = v["hu.tappenz"];
    const szazalek = e.korhaz ? enMapa(t, "korhaz") : e.biztositas ? enMapa(t, "alap") : enMapa(t, "rovid");
    const napiAlap = e.havi / 30;
    const maximum = redondear((enMapa(v["hu.minimalber"], "havi") * 2) / 30);
    const szamitott = redondear((napiAlap * szazalek) / 100);
    const napi = Math.min(szamitott, maximum);
    const brutto = redondear(napi * e.napok);
    const szja = redondear((brutto * v["hu.szja"]) / 100);
    const b = v["hu.betegszabadsag"];
    const observaciones = [
      `Évente az első ${enMapa(b, "napok")} munkanap betegség miatti távollétre betegszabadság jár a munkáltatótól, a távolléti díj ${enMapa(b, "mertek")} százalékával. A táppénz ezután következik.`,
      "A napi alapot a havi átlagkereset harmincad részével közelítjük. A pontos összeget az egészségbiztosító a korábbi jövedelmeidből állapítja meg.",
    ];
    if (szamitott > maximum) observaciones.unshift("A táppénz elérte a napi felső határt, ami a minimálbér kétszeresének harmincad része.");
    return { brutto, napi, szazalek, maximum, szja, netto: redondear(brutto - szja), observaciones };
  },
  resultado: [
    { clave: "brutto", etiqueta: "Táppénz bruttó összege", formato: "moneda", destacada: true },
    { clave: "napi", etiqueta: "Táppénz naponta", formato: "moneda" },
    { clave: "szazalek", etiqueta: "A napi alap ennyi százaléka", formato: "porcentaje" },
    { clave: "maximum", etiqueta: "Napi felső határ", formato: "moneda" },
    { clave: "szja", etiqueta: "SZJA-előleg, kedvezmények nélkül", formato: "moneda" },
    { clave: "netto", etiqueta: "Nettó táppénz, kedvezmények nélkül", formato: "moneda" },
  ],
});
