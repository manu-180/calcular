import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { plusMaanden } from "../lib/datum";

type Mapa = Readonly<Record<string, number>>;

function leeftijdUit(tabel: Mapa, geboren: string): number | null {
  let maanden: number | null = null;
  for (const [vanaf, m] of Object.entries(tabel).sort(([a], [b]) => a.localeCompare(b))) if (geboren >= vanaf) maanden = m;
  return maanden;
}

function leeftijdTekst(maanden: number): string {
  const jaren = Math.floor(maanden / 12);
  const rest = maanden % 12;
  return rest === 0 ? `${jaren} jaar` : `${jaren} jaar en ${rest} ${rest === 1 ? "maand" : "maanden"}`;
}

const EERSTE_VASTGESTELD = "1956-06-01";
const LAATSTE_VERWACHT = "2000-12-31";

export default definirCalculadora({
  id: "nl.aow-berekenen",
  mercado: "nl",
  concepto: "jubilacion",
  slug: "aow-berekenen",
  estado: "publicado",
  requiere: {
    "nl.aow-leeftijd": "mapa",
    "nl.aow-leeftijd-verwacht": "mapa",
    "nl.aow-bruto": "mapa",
    "nl.aow-vakantiegeld": "mapa",
    "nl.aow-korting": "numero",
  },
  campos: [
    { id: "geboren", tipo: "fecha", etiqueta: "Je geboortedatum", min: "1940-01-01", max: "2010-12-31" },
    { id: "situatie", tipo: "opcion-dato", dato: "nl.aow-bruto", etiqueta: "Je woonsituatie", porDefecto: "alleenstaand" },
    {
      id: "jarenNiet",
      tipo: "entero",
      etiqueta: "Jaren dat je niet verzekerd bent (bijvoorbeeld in het buitenland gewoond en gewerkt) in de 50 jaar voor je AOW-leeftijd",
      min: 0,
      max: 50,
      porDefecto: 0,
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.geboren > LAATSTE_VERWACHT) {
      throw new ErrorEntrada("Voor wie na 31 december 2000 is geboren, geeft de SVB nog geen verwachte AOW-leeftijd.", "geboren");
    }
    const observaciones: string[] = [];
    let maanden: number | null = null;
    let status: string;
    if (entrada.geboren < EERSTE_VASTGESTELD) {
      status = "Je hebt de AOW-leeftijd al bereikt.";
    } else {
      maanden = leeftijdUit(v["nl.aow-leeftijd-verwacht"], entrada.geboren) ?? leeftijdUit(v["nl.aow-leeftijd"], entrada.geboren);
      const verwacht = leeftijdUit(v["nl.aow-leeftijd-verwacht"], entrada.geboren) !== null;
      status = verwacht ? "Verwacht (nog niet definitief)" : "Vastgesteld";
      if (verwacht) observaciones.push("Je AOW-leeftijd ligt nog niet vast. De SVB schat hem op basis van de levensverwachting, en die schatting kan nog veranderen.");
    }
    const opbouw = Math.max(0, 100 - entrada.jarenNiet * v["nl.aow-korting"]);
    const bruto = redondear(porcentaje(enMapa(v["nl.aow-bruto"], entrada.situatie), opbouw));
    const vakantiegeld = redondear(porcentaje(enMapa(v["nl.aow-vakantiegeld"], entrada.situatie), opbouw));
    observaciones.push("Het bedrag is de bruto AOW volgens de bedragen van nu. De SVB past de bedragen elk half jaar aan.");
    return {
      leeftijd: maanden === null ? null : leeftijdTekst(maanden),
      datum: maanden === null ? null : plusMaanden(entrada.geboren, maanden),
      status,
      opbouw,
      bruto,
      vakantiegeld,
      observaciones,
    };
  },
  resultado: [
    { clave: "datum", etiqueta: "Je bereikt de AOW-leeftijd op", formato: "fecha", destacada: true },
    { clave: "leeftijd", etiqueta: "Je AOW-leeftijd", formato: "texto" },
    { clave: "status", etiqueta: "Status", formato: "texto" },
    { clave: "opbouw", etiqueta: "Opgebouwde AOW", formato: "porcentaje" },
    { clave: "bruto", etiqueta: "Bruto AOW per maand (zonder vakantiegeld)", formato: "moneda" },
    { clave: "vakantiegeld", etiqueta: "Vakantiegeld per maand, bruto", formato: "moneda" },
  ],
});
