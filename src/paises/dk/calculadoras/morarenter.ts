import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import type { TablaResultado } from "@/motor/tipos";
import { dagNummer, datoTekst } from "../lib/datoer";
import datos from "../datos.json";

interface Periode {
  desde: string;
  hasta?: string;
  valor: number;
}

// Motoren giver kun referencesatsen på beregningsdagen. Perioden kan gå over flere halvår, så de
// verificerede halvår hentes fra datos.json og skæres ved beregningsdagen.
const SATSER = ((datos.datos.find((d) => d.id === "dk.referencesats")?.tramos ?? []) as unknown as (Periode & { estado: string })[])
  .filter((t) => t.estado === "verificado")
  .map(({ desde, hasta, valor }) => ({ desde, hasta, valor }));

export default definirCalculadora({
  id: "dk.morarenter",
  mercado: "dk",
  concepto: "propio",
  slug: "morarenter",
  estado: "publicado",
  requiere: {
    "dk.referencesats": "numero",
    "dk.morarente-tillaeg": "numero",
    "dk.rykkergebyr": "numero",
  },
  campos: [
    { id: "beloeb", tipo: "moneda", etiqueta: "Skyldigt beløb", min: 0, porDefecto: 10000 },
    { id: "forfald", tipo: "fecha", etiqueta: "Forfaldsdato", min: "2025-07-01", porDefecto: "2026-08-01" },
    { id: "betalt", tipo: "fecha", etiqueta: "Betalingsdato", min: "2025-07-01", porDefecto: "hoy" },
    { id: "rykkere", tipo: "entero", etiqueta: "Antal rykkere med gebyr", min: 0, max: 3, porDefecto: 0 },
  ],
  tablas: [{ clave: "perioder", titulo: "Renter halvår for halvår", filasVisibles: 4 }],
  calcular(e, v, { redondear, fecha }) {
    if (e.beloeb <= 0) throw new ErrorEntrada("Skriv et beløb, der er større end 0.", "beloeb");
    if (e.betalt <= e.forfald) throw new ErrorEntrada("Betalingsdatoen skal ligge efter forfaldsdatoen.", "betalt");
    if (e.rykkere < 0 || e.rykkere > 3) throw new ErrorEntrada("Der kan højst kræves gebyr for 3 rykkere.", "rykkere");
    const tillaeg = v["dk.morarente-tillaeg"];
    const kendte = SATSER.filter((s) => s.desde <= fecha);
    if (!kendte.length || e.forfald < kendte[0].desde) throw new ErrorEntrada(`Beregneren har referencesatsen fra ${datoTekst(kendte[0]?.desde ?? fecha)}.`, "forfald");
    const sidste = kendte[kendte.length - 1];
    if (sidste.hasta && e.betalt > sidste.hasta) {
      throw new ErrorEntrada(`Referencesatsen efter ${datoTekst(sidste.hasta)} kendes ikke endnu.`, "betalt");
    }
    const filas: (string | number)[][] = [];
    let renter = 0;
    let dageIAlt = 0;
    // Renten løber for hver dag efter forfaldsdagen til og med betalingsdagen, med satsen for det halvår,
    // dagen ligger i.
    for (const s of kendte) {
      const fra = Math.max(dagNummer(e.forfald), dagNummer(s.desde) - 1);
      const til = Math.min(dagNummer(e.betalt), s.hasta ? dagNummer(s.hasta) : Number.POSITIVE_INFINITY);
      const dage = Math.max(0, til - fra);
      if (dage <= 0) continue;
      const sats = s.valor + tillaeg;
      const r = redondear((porcentaje(e.beloeb, sats) * dage) / 365);
      renter += r;
      dageIAlt += dage;
      filas.push([datoTekst(s.desde), dage, sats, r]);
    }
    const perioder: TablaResultado = {
      tipo: "tabla",
      columnas: [
        { clave: "periode", etiqueta: "Halvår fra", formato: "texto" },
        { clave: "dage", etiqueta: "Dage", formato: "numero" },
        { clave: "sats", etiqueta: "Rente", formato: "porcentaje" },
        { clave: "renter", etiqueta: "Renter", formato: "moneda" },
      ],
      filas,
    };
    const gebyr = e.rykkere * v["dk.rykkergebyr"];
    renter = redondear(renter);
    return {
      renter,
      gebyr,
      ialt: redondear(e.beloeb + renter + gebyr),
      dage: dageIAlt,
      satsNu: v["dk.referencesats"] + tillaeg,
      perioder,
    };
  },
  resultado: [
    { clave: "renter", etiqueta: "Morarenter", formato: "moneda", destacada: true },
    { clave: "gebyr", etiqueta: "Rykkergebyrer", formato: "moneda", ocultarSiCero: true },
    { clave: "ialt", etiqueta: "Skyldigt beløb i alt", formato: "moneda" },
    { clave: "dage", etiqueta: "Dage med renter", formato: "dias" },
    { clave: "satsNu", etiqueta: "Morarente lige nu (pr. år)", formato: "porcentaje", decimales: 2 },
  ],
});
