import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { sumarDias } from "@/motor/vigencia";
import { forsteIManedenEtter, sisteDagEtterManeder } from "../lib/kalender";

export default definirCalculadora({
  id: "no.oppsigelsestid",
  mercado: "no",
  concepto: "preaviso",
  slug: "oppsigelsestid",
  estado: "publicado",
  requiere: {
    "no.oppsigelsestid": "mapa",
    "no.oppsigelsestid-provetid": "numero",
  },
  campos: [
    {
      id: "hvem",
      tipo: "opcion",
      etiqueta: "Hvem sier opp",
      opciones: [
        { valor: "arbeidsgiver", etiqueta: "Arbeidsgiveren" },
        { valor: "arbeidstaker", etiqueta: "Jeg sier opp selv" },
      ],
      porDefecto: "arbeidsgiver",
    },
    { id: "provetid", tipo: "si-no", etiqueta: "Du er i prøvetid", porDefecto: false },
    { id: "ar", tipo: "entero", etiqueta: "Hele år sammenhengende ansatt i virksomheten", min: 0, max: 60, porDefecto: 3 },
    { id: "alder", tipo: "entero", etiqueta: "Alderen din når oppsigelsen blir gitt", min: 15, max: 80, porDefecto: 40 },
    { id: "dato", tipo: "fecha", etiqueta: "Dato oppsigelsen blir gitt", porDefecto: "hoy" },
  ],
  calcular(e, v) {
    if (e.ar < 0) throw new ErrorEntrada("Ansettelsestiden kan ikke være negativ.", "ar");
    const frister = v["no.oppsigelsestid"];
    if (e.provetid) {
      const dager = v["no.oppsigelsestid-provetid"];
      return {
        frist: `${dager} dager`,
        maneder: null,
        start: e.dato,
        slutt: sumarDias(e.dato, dager),
        observaciones: [`I prøvetiden er fristen ${dager} dager hvis ikke annet er avtalt skriftlig eller står i tariffavtale. Fristen regnes fra oppsigelsen er gitt.`],
      };
    }
    let nokkel = "grunn";
    if (e.ar >= 10) {
      if (e.hvem === "arbeidstaker") nokkel = e.alder >= 50 ? "arbeidstaker-ti-ar-50" : "ti-ar";
      else nokkel = e.alder >= 60 ? "ti-ar-60" : e.alder >= 55 ? "ti-ar-55" : e.alder >= 50 ? "ti-ar-50" : "ti-ar";
    } else if (e.ar >= 5) nokkel = "fem-ar";
    const maneder = enMapa(frister, nokkel);
    const start = forsteIManedenEtter(e.dato);
    const observaciones = ["Dette er minstefristene i arbeidsmiljøloven. Arbeidsavtalen eller tariffavtalen kan gi lengre frist."];
    if (e.hvem === "arbeidstaker" && e.ar >= 10 && e.alder >= 50) observaciones.push("De lengre fristene etter fylte 50 år gjelder når arbeidsgiveren sier opp. Sier du opp selv, holder det med tre måneder.");
    return {
      frist: `${maneder} ${maneder === 1 ? "måned" : "måneder"}`,
      maneder,
      start,
      slutt: sisteDagEtterManeder(start, maneder),
      observaciones,
    };
  },
  resultado: [
    { clave: "slutt", etiqueta: "Siste dag i oppsigelsestiden", formato: "fecha", destacada: true },
    { clave: "frist", etiqueta: "Oppsigelsesfrist", formato: "texto" },
    { clave: "start", etiqueta: "Fristen begynner å løpe", formato: "fecha" },
  ],
});
