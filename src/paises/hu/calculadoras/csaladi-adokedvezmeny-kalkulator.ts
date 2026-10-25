import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { NINCS_KEDVEZMENY, nettoBer, type Parameterek } from "../lib/ber";

export default definirCalculadora({
  id: "hu.csaladi-adokedvezmeny-kalkulator",
  mercado: "hu",
  concepto: "propio",
  slug: "csaladi-adokedvezmeny-kalkulator",
  estado: "publicado",
  requiere: {
    "hu.szja": "numero",
    "hu.tb-jarulek": "numero",
    "hu.fiatalok-kedvezmenye-hatar": "numero",
    "hu.csaladi-kedvezmeny": "mapa",
    "hu.csaladi-kedvezmeny-beteg": "numero",
    "hu.elso-hazasok-kedvezmenye": "numero",
    "hu.minimalber": "mapa",
  },
  campos: [
    { id: "gyerekek", tipo: "entero", etiqueta: "Gyermekek, akik után családi pótlék jár", min: 1, max: 15, porDefecto: 2 },
    {
      id: "eltartottak",
      tipo: "entero",
      etiqueta: "Eltartottak száma összesen (nem kötelező)",
      ayuda: "Akkor írd be, ha a családban több eltartott van, mint kedvezményezett gyermek.",
      min: 0,
      max: 15,
      requerido: false,
    },
    { id: "tartosanBeteg", tipo: "entero", etiqueta: "Ebből tartósan beteg vagy súlyosan fogyatékos gyermek", min: 0, max: 15, porDefecto: 0 },
    { id: "brutto", tipo: "moneda", etiqueta: "Havi bruttó béred", ayuda: "Ebből látszik, mennyit tudsz ténylegesen érvényesíteni.", min: 0, porDefecto: 500000 },
  ],
  calcular(e, v, { redondear }) {
    if (e.gyerekek < 1) throw new ErrorEntrada("Legalább egy gyermekkel számolj.", "gyerekek");
    if (e.tartosanBeteg > e.gyerekek) throw new ErrorEntrada("A tartósan beteg gyermekek nem lehetnek többen, mint a gyermekek.", "tartosanBeteg");
    if (e.brutto < 0) throw new ErrorEntrada("A bér nem lehet negatív.", "brutto");
    const p: Parameterek = {
      szja: v["hu.szja"],
      tb: v["hu.tb-jarulek"],
      hatar25: v["hu.fiatalok-kedvezmenye-hatar"],
      csaladi: v["hu.csaladi-kedvezmeny"],
      csaladiBeteg: v["hu.csaladi-kedvezmeny-beteg"],
      elsoHazasok: v["hu.elso-hazasok-kedvezmenye"],
      minimalber: enMapa(v["hu.minimalber"], "havi"),
    };
    const vele = nettoBer(e.brutto, { ...NINCS_KEDVEZMENY, gyerekek: e.gyerekek, eltartottak: e.eltartottak ?? e.gyerekek, tartosanBeteg: e.tartosanBeteg }, p, redondear);
    const nelkule = nettoBer(e.brutto, NINCS_KEDVEZMENY, p, redondear);
    const maximum = redondear((vele.csaladiKedvezmeny * p.szja) / 100);
    const szjaBol = redondear(nelkule.szja - vele.szja);
    const havi = redondear(vele.netto - nelkule.netto);
    const observaciones: string[] = [];
    if (havi < maximum) {
      observaciones.push("A béredből nem jön ki a teljes kedvezmény. A fennmaradó részt a veled egy háztartásban élő házastársad vagy élettársad érvényesítheti, ha közösen veszitek igénybe vagy megosztjátok.");
    }
    return {
      havi,
      kedvezmeny: vele.csaladiKedvezmeny,
      maximum,
      szjaBol,
      jarulekbol: vele.jarulekKedvezmeny,
      eves: redondear(havi * 12),
      elveszo: redondear(maximum - havi),
      observaciones,
    };
  },
  resultado: [
    { clave: "havi", etiqueta: "Ennyivel több a nettó béred havonta", formato: "moneda", destacada: true },
    { clave: "kedvezmeny", etiqueta: "Családi kedvezmény (adóalap-csökkentés) havonta", formato: "moneda" },
    { clave: "maximum", etiqueta: "A kedvezmény legnagyobb értéke havonta", formato: "moneda" },
    { clave: "szjaBol", etiqueta: "Ebből az SZJA csökkenése", formato: "moneda" },
    { clave: "jarulekbol", etiqueta: "Ebből a családi járulékkedvezmény", formato: "moneda", ocultarSiCero: true },
    { clave: "eves", etiqueta: "Egy évre", formato: "moneda" },
    { clave: "elveszo", etiqueta: "A béredből nem érvényesíthető rész havonta", formato: "moneda", ocultarSiCero: true },
  ],
});
