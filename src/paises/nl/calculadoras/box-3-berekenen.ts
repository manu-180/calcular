import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";
import { redondear as afronden } from "@/motor/formato";

export default definirCalculadora({
  id: "nl.box-3-berekenen",
  mercado: "nl",
  concepto: "propio",
  slug: "box-3-berekenen",
  estado: "publicado",
  // De Belastingdienst rondt in box 3 af op hele euro's in het voordeel van de belastingplichtige:
  // rendement, aandeel en belasting naar beneden, het rendement op schulden naar boven (zie de rekenvoorbeelden).
  redondeo: { decimales: 0, modo: "truncar" },
  requiere: {
    "nl.box3-rendement": "mapa",
    "nl.box3-heffingsvrij": "numero",
    "nl.box3-drempel": "numero",
    "nl.box3-tarief": "numero",
  },
  campos: [
    { id: "bank", tipo: "moneda", etiqueta: "Banktegoeden en spaargeld op 1 januari", min: 0, porDefecto: 100000 },
    { id: "overige", tipo: "moneda", etiqueta: "Beleggingen en andere bezittingen op 1 januari", min: 0, porDefecto: 0, ayuda: "Aandelen, obligaties, crypto, een tweede woning of verhuurde woning (WOZ-waarde)." },
    { id: "schulden", tipo: "moneda", etiqueta: "Schulden in box 3 op 1 januari", min: 0, porDefecto: 0 },
    { id: "partner", tipo: "si-no", etiqueta: "Je hebt het hele jaar een fiscale partner (bedragen samen)", porDefecto: false },
  ],
  calcular(entrada, v, { redondear }) {
    const personen = entrada.partner ? 2 : 1;
    const r = v["nl.box3-rendement"];
    const drempel = v["nl.box3-drempel"] * personen;
    const aftrekbareSchulden = Math.max(0, entrada.schulden - drempel);
    const rendementBank = redondear(porcentaje(entrada.bank, enMapa(r, "banktegoeden")));
    const rendementOverige = redondear(porcentaje(entrada.overige, enMapa(r, "overige")));
    const rendementSchulden = Math.ceil(porcentaje(aftrekbareSchulden, enMapa(r, "schulden")));
    const rendement = rendementBank + rendementOverige - rendementSchulden;
    const grondslag = entrada.bank + entrada.overige - aftrekbareSchulden;
    const heffingsvrij = v["nl.box3-heffingsvrij"] * personen;
    const grondslagSparen = Math.max(0, grondslag - heffingsvrij);
    // Met een fiscale partner rekenen we zoals de Belastingdienst in zijn voorbeeld: ieder de helft
    // van de grondslag, en per persoon afronden.
    const deel = redondear(grondslagSparen / personen);
    const aandeel = grondslag > 0 ? afronden((deel / grondslag) * 100, { decimales: 2, modo: "truncar" }) : 0;
    const voordeelPerPersoon = rendement > 0 ? redondear(porcentaje(rendement, aandeel)) : 0;
    const belastingPerPersoon = redondear(porcentaje(voordeelPerPersoon, v["nl.box3-tarief"]));
    const voordeel = voordeelPerPersoon * personen;
    const belasting = belastingPerPersoon * personen;
    const observaciones: string[] = [];
    if (grondslagSparen === 0) observaciones.push("Je vermogen blijft onder het heffingsvrij vermogen, dus je betaalt geen box 3-belasting.");
    if (entrada.partner) observaciones.push("Met een fiscale partner mogen jullie de grondslag sparen en beleggen verdelen zoals jullie willen. Hier krijgt ieder de helft. De belasting hierboven is voor jullie samen.");
    return {
      belasting,
      rendement,
      grondslag,
      heffingsvrij,
      grondslagSparen,
      aandeel,
      voordeel,
      observaciones,
    };
  },
  resultado: [
    { clave: "belasting", etiqueta: "Box 3-belasting over 2026", formato: "moneda", destacada: true },
    { clave: "rendement", etiqueta: "Forfaitair rendement", formato: "moneda" },
    { clave: "grondslag", etiqueta: "Rendementsgrondslag (bezittingen min aftrekbare schulden)", formato: "moneda" },
    { clave: "heffingsvrij", etiqueta: "Heffingsvrij vermogen", formato: "moneda" },
    { clave: "grondslagSparen", etiqueta: "Grondslag sparen en beleggen", formato: "moneda" },
    { clave: "aandeel", etiqueta: "Aandeel in de rendementsgrondslag (per persoon)", formato: "porcentaje", decimales: 2 },
    { clave: "voordeel", etiqueta: "Voordeel uit sparen en beleggen (box 3-inkomen)", formato: "moneda" },
  ],
});
