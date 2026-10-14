import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { Dato, FechaISO, TablaResultado } from "@/motor/tipos";
import { diasEntre, sumarDias, vigente } from "@/motor/vigencia";
import datos from "../datos.json";

// El cálculo cruza varios años y cada uno tiene su saggio: no alcanza con el valor vigente que
// llega en `valores`, así que se leen los tramos verificados directamente de datos.json.
const SAGGIO = datos.datos.find((d) => d.id === "it.interesse-legale") as unknown as Dato<"numero">;

function bisestile(anno: number): boolean {
  return (anno % 4 === 0 && anno % 100 !== 0) || anno % 400 === 0;
}

export default definirCalculadora({
  id: "it.interessi-legali",
  mercado: "it",
  concepto: "propio",
  slug: "calcolo-interessi-legali",
  estado: "publicado",
  requiere: {
    "it.interesse-legale": "numero",
  },
  campos: [
    { id: "capitale", tipo: "moneda", etiqueta: "Somma dovuta", min: 0, porDefecto: 10000 },
    { id: "dal", tipo: "fecha", etiqueta: "Dal giorno", min: "2023-01-01", porDefecto: "2025-01-01" },
    { id: "al", tipo: "fecha", etiqueta: "Al giorno", min: "2023-01-01", porDefecto: "hoy" },
  ],
  tablas: [{ clave: "dettaglio", titulo: "Interessi anno per anno", filasVisibles: 6 }],
  calcular(e, _v, { redondear }) {
    if (e.al <= e.dal) throw new ErrorEntrada("La data finale deve essere successiva a quella iniziale.", "al");
    let inizio: FechaISO = e.dal;
    let totale = 0;
    const filas: (string | number)[][] = [];
    while (inizio < e.al) {
      const anno = Number(sumarDias(inizio, 1).slice(0, 4));
      const fineAnno = `${anno}-12-31` as FechaISO;
      const fine = e.al < fineAnno ? e.al : fineAnno;
      const tramo = vigente(SAGGIO, fine);
      if (!tramo) throw new ErrorEntrada(`Non abbiamo il saggio degli interessi legali verificato per il ${anno}.`, "dal");
      const giorni = diasEntre(inizio, fine);
      const interessi = (e.capitale * tramo.valor * giorni) / 100 / (bisestile(anno) ? 366 : 365);
      totale += interessi;
      filas.push([anno, giorni, tramo.valor, redondear(interessi)]);
      inizio = fine;
    }
    const dettaglio: TablaResultado = {
      tipo: "tabla",
      columnas: [
        { clave: "anno", etiqueta: "Anno", formato: "numero" },
        { clave: "giorni", etiqueta: "Giorni", formato: "dias" },
        { clave: "saggio", etiqueta: "Saggio", formato: "porcentaje" },
        { clave: "interessi", etiqueta: "Interessi", formato: "moneda" },
      ],
      filas,
    };
    const interessi = redondear(totale);
    return {
      interessi,
      totale: redondear(e.capitale + interessi),
      giorni: diasEntre(e.dal, e.al),
      dettaglio,
    };
  },
  resultado: [
    { clave: "interessi", etiqueta: "Interessi legali", formato: "moneda", destacada: true },
    { clave: "totale", etiqueta: "Somma più interessi", formato: "moneda" },
    { clave: "giorni", etiqueta: "Giorni conteggiati", formato: "dias", decimales: 0 },
  ],
});
