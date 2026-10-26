import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { Dato, FechaISO, TablaResultado } from "@/motor/tipos";
import { diasEntre, sumarDias, vigente } from "@/motor/vigencia";
import datos from "../datos.json";

// En lang periode går over flere halvår med ulik sats, og motoren gir bare satsen på datoen. Derfor
// leser vi de verifiserte periodene direkte fra datos.json.
const RENTE = datos.datos.find((d) => d.id === "no.forsinkelsesrente") as unknown as Dato<"numero">;

export default definirCalculadora({
  id: "no.forsinkelsesrente",
  mercado: "no",
  concepto: "propio",
  slug: "forsinkelsesrente",
  estado: "publicado",
  requiere: { "no.forsinkelsesrente": "numero" },
  campos: [
    { id: "belop", tipo: "moneda", etiqueta: "Beløpet som skulle vært betalt", min: 0, porDefecto: 10000 },
    { id: "forfall", tipo: "fecha", etiqueta: "Forfallsdato", min: "2026-01-01", porDefecto: "2026-03-31" },
    { id: "betalt", tipo: "fecha", etiqueta: "Dato for betaling", min: "2026-01-01", porDefecto: "hoy" },
  ],
  tablas: [{ clave: "perioder", titulo: "Forsinkelsesrente per periode", filasVisibles: 6 }],
  calcular(e, v, { redondear }) {
    if (e.belop <= 0) throw new ErrorEntrada("Skriv inn et beløp over null.", "belop");
    if (e.betalt <= e.forfall) throw new ErrorEntrada("Betalingsdatoen må være etter forfallsdatoen.", "betalt");
    const filas: (string | number)[][] = [];
    let sum = 0;
    let dag: FechaISO = sumarDias(e.forfall, 1);
    while (dag <= e.betalt) {
      const tramo = vigente(RENTE, dag);
      if (!tramo) throw new ErrorEntrada("Vi har ikke en verifisert sats for hele perioden.", "forfall");
      const slutt = tramo.hasta && tramo.hasta < e.betalt ? tramo.hasta : e.betalt;
      const dager = diasEntre(dag, slutt) + 1;
      const rente = (e.belop * tramo.valor * dager) / 100 / 365;
      sum += rente;
      filas.push([dag, slutt, dager, tramo.valor, redondear(rente)]);
      dag = sumarDias(slutt, 1);
    }
    const perioder: TablaResultado = {
      tipo: "tabla",
      columnas: [
        { clave: "fra", etiqueta: "Fra", formato: "fecha" },
        { clave: "til", etiqueta: "Til", formato: "fecha" },
        { clave: "dager", etiqueta: "Dager", formato: "dias" },
        { clave: "sats", etiqueta: "Sats per år", formato: "porcentaje" },
        { clave: "rente", etiqueta: "Rente", formato: "moneda" },
      ],
      filas,
    };
    const rente = redondear(sum);
    return {
      rente,
      totalt: redondear(e.belop + rente),
      dager: diasEntre(e.forfall, e.betalt),
      satsNa: v["no.forsinkelsesrente"],
      perioder,
      observaciones: ["Renten er regnet for hver dag fra dagen etter forfall til og med betalingsdagen, med 365 dager i året."],
    };
  },
  resultado: [
    { clave: "rente", etiqueta: "Forsinkelsesrente", formato: "moneda", destacada: true },
    { clave: "totalt", etiqueta: "Beløp med rente", formato: "moneda" },
    { clave: "dager", etiqueta: "Dager forsinket", formato: "dias", decimales: 0 },
    { clave: "satsNa", etiqueta: "Forsinkelsesrente nå (per år)", formato: "porcentaje", decimales: 2 },
  ],
});
