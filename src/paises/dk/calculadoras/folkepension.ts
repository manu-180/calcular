import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { plusMaaneder } from "../lib/datoer";

export default definirCalculadora({
  id: "dk.folkepension",
  mercado: "dk",
  concepto: "jubilacion",
  slug: "folkepension",
  estado: "publicado",
  requiere: {
    "dk.folkepensionsalder": "mapa",
    "dk.folkepension-grundbeloeb": "numero",
    "dk.pensionstillaeg": "mapa",
    "dk.pensionstillaeg-fradrag": "mapa",
    "dk.pensionstillaeg-nedsaettelse": "mapa",
  },
  campos: [
    { id: "foedt", tipo: "fecha", etiqueta: "Din fødselsdato", min: "1920-01-01", porDefecto: "1965-06-15" },
    {
      id: "civil",
      tipo: "opcion",
      etiqueta: "Bor du alene?",
      opciones: [
        { valor: "enlig", etiqueta: "Jeg bor alene" },
        { valor: "gift", etiqueta: "Gift eller samlevende, og min partner er også pensionist" },
      ],
      porDefecto: "enlig",
    },
    {
      id: "indtaegt",
      tipo: "moneda",
      etiqueta: "Anden indkomst om året (indtægtsgrundlag)",
      ayuda: "Fx pension fra arbejdsmarkedspension og renter. Er I gift, så skriv jeres samlede indkomst. Udbetaling Danmark opgør det præcise grundlag.",
      min: 0,
      porDefecto: 0,
    },
  ],
  calcular(e, v, { redondear }) {
    const aldre = Object.entries(v["dk.folkepensionsalder"]).sort(([a], [b]) => a.localeCompare(b));
    if (!aldre.length || e.foedt < aldre[0][0]) throw new ErrorEntrada({ codigo: "calculo-fallido" });
    // Nøglerne er den første fødselsdato, aldersgrænsen gælder for.
    const alder = aldre.filter(([fra]) => e.foedt >= fra).at(-1)?.[1];
    if (alder === undefined) throw new ErrorEntrada({ codigo: "calculo-fallido" });
    const dato = plusMaaneder(e.foedt, Math.round(alder * 12));
    const grund = v["dk.folkepension-grundbeloeb"];
    const fradrag = enMapa(v["dk.pensionstillaeg-fradrag"], e.civil) + enMapa(v["dk.pensionstillaeg-fradrag"], `${e.civil}-midlertidig`);
    const nedsaettelse = redondear(porcentaje(Math.max(0, e.indtaegt - fradrag), enMapa(v["dk.pensionstillaeg-nedsaettelse"], e.civil)));
    const fuldtTillaeg = enMapa(v["dk.pensionstillaeg"], e.civil);
    const tillaeg = redondear(Math.max(0, fuldtTillaeg - nedsaettelse));
    const aar = redondear(grund + tillaeg);
    return {
      maaned: redondear(aar / 12),
      aar,
      grund,
      tillaeg,
      nedsaettelse: Math.min(nedsaettelse, fuldtTillaeg),
      alder,
      dato,
      observaciones: [
        "Folkepensionsalderen kan blive sat op, fordi den følger udviklingen i levetiden.",
        "Beløbene er før skat og med 2026-satserne. Den supplerende pensionsydelse (ældrecheck), boligstøtte og andre tillæg er ikke med.",
      ],
    };
  },
  resultado: [
    { clave: "maaned", etiqueta: "Folkepension pr. måned før skat", formato: "moneda", destacada: true },
    { clave: "aar", etiqueta: "Folkepension pr. år før skat", formato: "moneda" },
    { clave: "grund", etiqueta: "Grundbeløb pr. år", formato: "moneda" },
    { clave: "tillaeg", etiqueta: "Pensionstillæg pr. år", formato: "moneda" },
    { clave: "nedsaettelse", etiqueta: "Nedsættelse af pensionstillægget", formato: "moneda", ocultarSiCero: true },
    { clave: "alder", etiqueta: "Din folkepensionsalder", formato: "anios", decimales: 1 },
    { clave: "dato", etiqueta: "Du når folkepensionsalderen", formato: "fecha" },
  ],
});
