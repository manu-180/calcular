import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { Dato, FechaISO, TablaResultado } from "@/motor/tipos";
import { diasEntre, sumarDias, vigente } from "@/motor/vigencia";
import datos from "../datos.json";

// Dröjsmålsräntan följer referensräntan halvår för halvår, och motorn ger bara dagens värde.
// Därför läses de verifierade halvåren direkt från datos.json.
const REFERENSRANTA = datos.datos.find((d) => d.id === "se.referensranta") as unknown as Dato<"numero">;

export default definirCalculadora({
  id: "se.drojsmalsranta",
  mercado: "se",
  concepto: "propio",
  slug: "drojsmalsranta",
  estado: "publicado",
  requiere: {
    "se.referensranta": "numero",
    "se.drojsmalsranta-tillagg": "numero",
  },
  campos: [
    { id: "belopp", tipo: "moneda", etiqueta: "Obetalt belopp", min: 0, porDefecto: 10000 },
    { id: "forfallodag", tipo: "fecha", etiqueta: "Förfallodag", min: "2024-01-01", porDefecto: "2026-06-30" },
    { id: "betalning", tipo: "fecha", etiqueta: "Dag då skulden betalas", min: "2024-01-01", porDefecto: "hoy" },
  ],
  tablas: [{ clave: "perioder", titulo: "Ränta per period", filasVisibles: 6 }],
  calcular(e, v, { redondear }) {
    if (e.belopp <= 0) throw new ErrorEntrada("Skriv ett belopp som är större än noll.", "belopp");
    if (e.betalning <= e.forfallodag) throw new ErrorEntrada("Betalningsdagen måste komma efter förfallodagen.", "betalning");
    const tillagg = v["se.drojsmalsranta-tillagg"];
    const filas: (string | number)[][] = [];
    let summa = 0;
    let dag: FechaISO = sumarDias(e.forfallodag, 1);
    while (dag <= e.betalning) {
      const tramo = vigente(REFERENSRANTA, dag);
      if (!tramo) throw new ErrorEntrada("Vi har ingen verifierad referensränta för hela perioden.", "forfallodag");
      const slut = tramo.hasta && tramo.hasta < e.betalning ? tramo.hasta : e.betalning;
      const dagar = diasEntre(dag, slut) + 1;
      const sats = tramo.valor + tillagg;
      const ranta = (e.belopp * sats * dagar) / 100 / 365;
      summa += ranta;
      filas.push([dag, slut, dagar, sats, redondear(ranta)]);
      dag = sumarDias(slut, 1);
    }
    const perioder: TablaResultado = {
      tipo: "tabla",
      columnas: [
        { clave: "fran", etiqueta: "Från", formato: "fecha" },
        { clave: "till", etiqueta: "Till", formato: "fecha" },
        { clave: "dagar", etiqueta: "Dagar", formato: "dias" },
        { clave: "sats", etiqueta: "Räntesats per år", formato: "porcentaje" },
        { clave: "ranta", etiqueta: "Ränta", formato: "moneda" },
      ],
      filas,
    };
    const ranta = redondear(summa);
    return {
      ranta,
      totalt: redondear(e.belopp + ranta),
      dagar: diasEntre(e.forfallodag, e.betalning),
      satsIdag: v["se.referensranta"] + tillagg,
      perioder,
      observaciones: ["Räntan räknas för varje dag från dagen efter förfallodagen till och med betalningsdagen, med 365 dagar per år."],
    };
  },
  resultado: [
    { clave: "ranta", etiqueta: "Dröjsmålsränta", formato: "moneda", destacada: true },
    { clave: "totalt", etiqueta: "Belopp med ränta", formato: "moneda" },
    { clave: "dagar", etiqueta: "Dagar i dröjsmål", formato: "dias" },
    { clave: "satsIdag", etiqueta: "Dröjsmålsränta just nu, per år", formato: "porcentaje", decimales: 2 },
  ],
});
