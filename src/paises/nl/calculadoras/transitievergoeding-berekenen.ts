import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { euro } from "../lib/belasting";
import { duurTotEnMet } from "../lib/datum";

export default definirCalculadora({
  id: "nl.transitievergoeding-berekenen",
  mercado: "nl",
  concepto: "indemnizacion-despido",
  slug: "transitievergoeding-berekenen",
  estado: "publicado",
  requiere: {
    "nl.transitievergoeding-max": "numero",
    "nl.vakantiebijslag": "numero",
  },
  campos: [
    { id: "begin", tipo: "fecha", etiqueta: "Eerste werkdag", min: "1970-01-01" },
    { id: "eind", tipo: "fecha", etiqueta: "Laatste dag van je contract", porDefecto: "hoy" },
    { id: "salaris", tipo: "moneda", etiqueta: "Bruto maandsalaris (zonder vakantiegeld)", min: 0, porDefecto: 3500 },
    { id: "vakantiegeld", tipo: "si-no", etiqueta: "Je krijgt vakantiegeld", porDefecto: true },
    { id: "toeslagen", tipo: "moneda", etiqueta: "Vaste toeslagen per maand (bijvoorbeeld ploegentoeslag)", min: 0, porDefecto: 0 },
    { id: "eindejaarsuitkering", tipo: "moneda", etiqueta: "Vaste eindejaarsuitkering of dertiende maand per jaar", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.eind < entrada.begin) throw new ErrorEntrada("De laatste dag moet na je eerste werkdag liggen.", "eind");
    if (entrada.salaris <= 0) throw new ErrorEntrada("Vul je bruto maandsalaris in.", "salaris");
    const vast = entrada.salaris + entrada.toeslagen;
    const vakantiegeld = entrada.vakantiegeld ? porcentaje(vast, v["nl.vakantiebijslag"]) : 0;
    const maandloon = vast + vakantiegeld + entrada.eindejaarsuitkering / 12;
    const duur = duurTotEnMet(entrada.begin, entrada.eind);
    const deelPerJaar = maandloon / 3;
    const bedrag = deelPerJaar * duur.jaren + (deelPerJaar / 12) * duur.maanden + (deelPerJaar * duur.dagen) / 365;
    const maximum = Math.max(v["nl.transitievergoeding-max"], maandloon * 12);
    const vergoeding = redondear(Math.min(bedrag, maximum));
    const observaciones: string[] = [];
    if (bedrag > maximum) observaciones.push(`Je vergoeding is begrensd op het maximum van ${euro(maximum)}.`);
    return {
      vergoeding,
      maandloon: redondear(maandloon),
      perJaar: redondear(deelPerJaar),
      jaren: duur.jaren,
      maanden: duur.maanden,
      dagen: duur.dagen,
      maximum: redondear(maximum),
      observaciones,
    };
  },
  resultado: [
    { clave: "vergoeding", etiqueta: "Transitievergoeding (bruto)", formato: "moneda", destacada: true },
    { clave: "maandloon", etiqueta: "Maandloon voor de berekening", formato: "moneda" },
    { clave: "perJaar", etiqueta: "Vergoeding per gewerkt jaar (een derde maandloon)", formato: "moneda" },
    { clave: "jaren", etiqueta: "Jaren in dienst", formato: "anios" },
    { clave: "maanden", etiqueta: "Plus maanden", formato: "meses" },
    { clave: "dagen", etiqueta: "Plus dagen", formato: "dias" },
    { clave: "maximum", etiqueta: "Maximum voor jou", formato: "moneda" },
  ],
});
