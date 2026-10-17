import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { bedrijfsvoorheffing, GEZIN_OPCIONES, REQ_BV } from "../lib/loon";

export default definirCalculadora({
  id: "be.bedrijfsvoorheffing-berekenen",
  mercado: "be",
  concepto: "impuesto-renta",
  slug: "bedrijfsvoorheffing-berekenen",
  estado: "publicado",
  requiere: REQ_BV,
  campos: [
    {
      id: "belastbaar",
      tipo: "moneda",
      etiqueta: "Belastbaar maandloon (bruto min RSZ)",
      min: 0,
      porDefecto: 2500,
      ayuda: "Je brutoloon min je persoonlijke RSZ-bijdrage. Je vindt het op je loonbrief.",
    },
    { id: "gezin", tipo: "opcion", etiqueta: "Gezinssituatie", opciones: GEZIN_OPCIONES, porDefecto: "alleenstaand" },
    { id: "kinderen", tipo: "entero", etiqueta: "Kinderen ten laste", min: 0, max: 15, porDefecto: 0, ayuda: "Een kind met een handicap telt voor twee." },
    { id: "alleenstaandeOuder", tipo: "si-no", etiqueta: "Je voedt je kinderen alleen op", porDefecto: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.belastbaar <= 0) throw new ErrorEntrada("Vul een belastbaar loon boven nul in.", "belastbaar");
    const bv = bedrijfsvoorheffing(
      entrada.belastbaar,
      { gezin: entrada.gezin, kinderen: entrada.kinderen, alleenstaandeOuder: entrada.alleenstaandeOuder && entrada.kinderen > 0, werkbonusA: 0, werkbonusB: 0 },
      v,
      redondear,
    );
    return {
      perMaand: bv.teBetalen,
      brutoJaar: bv.brutoJaar,
      beroepskosten: bv.beroepskosten,
      belastbaarJaar: bv.belastbaarJaar,
      basisbelasting: bv.basisbelasting,
      kinderen: bv.kinderen,
      andereLasten: bv.andereLasten,
      jaarbelasting: bv.jaarbelasting,
      gemiddeld: redondear((bv.teBetalen / entrada.belastbaar) * 100),
      observaciones: [
        "Heb je recht op de werkbonus, dan gaat er nog een fiscale werkbonus af. Die zit in de bruto-nettoberekening.",
        "De bedrijfsvoorheffing is een voorschot. Je definitieve personenbelasting volgt uit je belastingaangifte.",
      ],
    };
  },
  resultado: [
    { clave: "perMaand", etiqueta: "Bedrijfsvoorheffing per maand", formato: "moneda", destacada: true },
    { clave: "brutoJaar", etiqueta: "Belastbaar loon op jaarbasis", formato: "moneda" },
    { clave: "beroepskosten", etiqueta: "Min: forfaitaire beroepskosten", formato: "moneda" },
    { clave: "belastbaarJaar", etiqueta: "Belastbaar netto jaarinkomen", formato: "moneda" },
    { clave: "basisbelasting", etiqueta: "Basisbelasting na belastingvrije som", formato: "moneda" },
    { clave: "kinderen", etiqueta: "Min: vermindering voor kinderen ten laste", formato: "moneda", ocultarSiCero: true },
    { clave: "andereLasten", etiqueta: "Min: vermindering alleenstaande ouder", formato: "moneda", ocultarSiCero: true },
    { clave: "jaarbelasting", etiqueta: "Jaarbelasting", formato: "moneda" },
    { clave: "gemiddeld", etiqueta: "Bedrijfsvoorheffing in procent van je belastbaar loon", formato: "porcentaje", decimales: 1 },
  ],
});
