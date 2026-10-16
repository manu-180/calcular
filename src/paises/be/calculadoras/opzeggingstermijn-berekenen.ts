import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { datumTekst, maandagNa, plusDagen, volledigeMaanden } from "../lib/datum";

type Mapa = Readonly<Record<string, number>>;

function opTrap(maanden: number, tabel: Mapa, prefix: string): number {
  let weken = 0;
  for (const [sleutel, w] of Object.entries(tabel)) {
    const m = new RegExp(`^${prefix}-(\\d+)$`).exec(sleutel);
    if (m && maanden >= Number(m[1])) weken = Math.max(weken, w);
  }
  return weken;
}

// Art. 37/2, § 1: na 5 jaar komt er per begonnen jaar anciënniteit 3 weken bij, vanaf 20 jaar 2
// weken en vanaf 21 jaar 1 week. Wie 5 jaar en 0 maanden telt, zit al in het zesde begonnen jaar.
function werkgever(maanden: number, t: Mapa, nieuwContract: boolean): number {
  const jaren = Math.floor(maanden / 12);
  let weken: number;
  if (jaren < 5) weken = opTrap(maanden, t, "m");
  else {
    weken = opTrap(48, t, "m") + t["per-jaar-vanaf-5"] * (Math.min(jaren, 19) - 4);
    if (jaren >= 20) weken += t["per-jaar-vanaf-20"];
    if (jaren >= 21) weken += t["per-jaar-vanaf-21"] * (jaren - 20);
  }
  if (nieuwContract && jaren >= t["plafond-vanaf-jaren"]) weken = t["plafond-nieuwe-contracten"];
  return weken;
}

export default definirCalculadora({
  id: "be.opzeggingstermijn-berekenen",
  mercado: "be",
  concepto: "preaviso",
  slug: "opzeggingstermijn-berekenen",
  estado: "publicado",
  requiere: {
    "be.opzegging-werkgever": "mapa",
    "be.opzegging-werknemer": "mapa",
  },
  campos: [
    {
      id: "wie",
      tipo: "opcion",
      etiqueta: "Wie zegt op?",
      opciones: [
        { valor: "werkgever", etiqueta: "De werkgever ontslaat mij" },
        { valor: "werknemer", etiqueta: "Ik neem zelf ontslag" },
        { valor: "tegenopzegging", etiqueta: "Ik ben ontslagen en heb een nieuwe job (tegenopzegging)" },
      ],
      porDefecto: "werkgever",
    },
    { id: "indienst", tipo: "fecha", etiqueta: "Datum van indiensttreding", porDefecto: "2020-01-01" },
    { id: "kennisgeving", tipo: "fecha", etiqueta: "Datum waarop de opzegging ter kennis wordt gegeven", porDefecto: "hoy" },
    { id: "maandloon", tipo: "moneda", etiqueta: "Brutomaandloon (voor de opzeggingsvergoeding)", min: 0, requerido: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.kennisgeving < entrada.indienst) throw new ErrorEntrada("De opzegging kan niet vóór de indiensttreding liggen.", "kennisgeving");
    const start = maandagNa(entrada.kennisgeving);
    const maanden = volledigeMaanden(entrada.indienst, start);
    const wn = v["be.opzegging-werknemer"];
    const weken =
      entrada.wie === "werkgever"
        ? werkgever(maanden, v["be.opzegging-werkgever"], entrada.indienst >= "2026-06-01")
        : entrada.wie === "werknemer"
          ? opTrap(maanden, wn, "m")
          : opTrap(maanden, wn, "t");
    const einde = plusDagen(start, weken * 7 - 1);
    // Een maandloon omzetten naar een weekloon gebeurt met 3 maanden = 13 weken.
    const vergoeding = entrada.maandloon === null ? null : redondear(((entrada.maandloon * 3) / 13) * weken);
    return {
      weken,
      ancienniteit: `${Math.floor(maanden / 12)} jaar en ${maanden % 12} maanden`,
      start: datumTekst(start),
      einde: datumTekst(einde),
      vergoeding,
      observaciones: [
        "De opzeggingstermijn start op de maandag na de week waarin de opzegging ter kennis werd gegeven. Hoe en wanneer de kennisgeving geldt, hangt af van de manier waarop ze gebeurt.",
      ],
    };
  },
  resultado: [
    { clave: "weken", etiqueta: "Opzeggingstermijn in weken", formato: "numero", destacada: true },
    { clave: "ancienniteit", etiqueta: "Anciënniteit bij de start van de opzegging", formato: "texto" },
    { clave: "start", etiqueta: "De opzegging loopt vanaf", formato: "texto" },
    { clave: "einde", etiqueta: "Laatste dag", formato: "texto" },
    { clave: "vergoeding", etiqueta: "Brutoloon voor de duur van de termijn (ruwe schatting, zonder voordelen)", formato: "moneda" },
  ],
});
