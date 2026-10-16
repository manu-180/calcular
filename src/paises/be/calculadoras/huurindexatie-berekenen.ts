import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { PuntoSerieTupla } from "@/motor/tipos";
import { maandTekst } from "../lib/datum";
import { indexVan, vorigeMaand } from "../lib/prijsindex";
import series from "../series.json";

const GEZONDHEIDSINDEX = (series.series.find((s) => s.id === "be.gezondheidsindex")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];

export default definirCalculadora({
  id: "be.huurindexatie-berekenen",
  mercado: "be",
  concepto: "propio",
  slug: "huurindexatie-berekenen",
  estado: "borrador",
  requiere: {
    "be.gezondheidsindex": "serie",
  },
  campos: [
    { id: "basishuur", tipo: "moneda", etiqueta: "Basishuurprijs uit je huurcontract", min: 0, porDefecto: 900 },
    { id: "ingang", tipo: "fecha", etiqueta: "Datum waarop het huurcontract inging", porDefecto: "2025-02-01" },
    { id: "verjaardag", tipo: "fecha", etiqueta: "Verjaardag van het contract waarop je indexeert", porDefecto: "2026-02-01" },
    {
      id: "aanvangsindex",
      tipo: "numero",
      etiqueta: "Aanvangsindex (gezondheidsindex, basis 2013 = 100)",
      min: 0,
      requerido: false,
      ayuda: "Laat leeg als je contract na december 2024 inging: dan zoeken we het cijfer zelf op.",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.basishuur <= 0) throw new ErrorEntrada("Vul de basishuurprijs in.", "basishuur");
    if (entrada.verjaardag <= entrada.ingang) throw new ErrorEntrada("De verjaardag moet na de ingangsdatum liggen.", "verjaardag");
    const laatste = v["be.gezondheidsindex"];
    const aanvangsmaand = vorigeMaand(entrada.ingang);
    const nieuwmaand = vorigeMaand(entrada.verjaardag);
    const aanvang = entrada.aanvangsindex ?? indexVan(GEZONDHEIDSINDEX, laatste, aanvangsmaand);
    if (aanvang === null || aanvang <= 0) throw new ErrorEntrada(`We hebben de gezondheidsindex van ${maandTekst(aanvangsmaand)} niet. Vul de aanvangsindex zelf in.`, "aanvangsindex");
    const nieuw = indexVan(GEZONDHEIDSINDEX, laatste, nieuwmaand);
    if (nieuw === null) throw new ErrorEntrada(`De gezondheidsindex van ${maandTekst(nieuwmaand)} is nog niet gepubliceerd.`, "verjaardag");
    const huur = redondear((entrada.basishuur * nieuw) / aanvang);
    return {
      huur,
      verschil: redondear(huur - entrada.basishuur),
      aanvang,
      nieuw,
      aanvangsmaand: maandTekst(aanvangsmaand),
      nieuwmaand: maandTekst(nieuwmaand),
    };
  },
  resultado: [
    { clave: "huur", etiqueta: "Geïndexeerde huurprijs", formato: "moneda", destacada: true },
    { clave: "verschil", etiqueta: "Stijging tegenover de basishuur", formato: "moneda" },
    { clave: "aanvang", etiqueta: "Aanvangsindex", formato: "numero", decimales: 2 },
    { clave: "aanvangsmaand", etiqueta: "Maand van de aanvangsindex", formato: "texto" },
    { clave: "nieuw", etiqueta: "Nieuw indexcijfer", formato: "numero", decimales: 2 },
    { clave: "nieuwmaand", etiqueta: "Maand van het nieuwe indexcijfer", formato: "texto" },
  ],
});
