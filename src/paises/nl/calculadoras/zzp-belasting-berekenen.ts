import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { berekenBox1, REQ_BOX1, tariefsaanpassing } from "../lib/belasting";

export default definirCalculadora({
  id: "nl.zzp-belasting-berekenen",
  mercado: "nl",
  concepto: "retencion-honorarios",
  slug: "zzp-belasting-berekenen",
  estado: "publicado",
  requiere: {
    ...REQ_BOX1,
    "nl.zelfstandigenaftrek": "numero",
    "nl.startersaftrek": "numero",
    "nl.mkb-winstvrijstelling": "numero",
    "nl.aftrek-maximumtarief": "numero",
    "nl.zvw-bijdrage": "numero",
    "nl.zvw-maximum": "numero",
  },
  campos: [
    { id: "winst", tipo: "moneda", etiqueta: "Winst per jaar (omzet min kosten)", min: 0, porDefecto: 50000 },
    { id: "urencriterium", tipo: "si-no", etiqueta: "Je werkt minstens 1.225 uur per jaar aan je onderneming (urencriterium)", porDefecto: true },
    { id: "starter", tipo: "si-no", etiqueta: "Je bent starter en hebt recht op de startersaftrek", porDefecto: false },
    { id: "loon", tipo: "moneda", etiqueta: "Loon uit een baan ernaast per jaar", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.starter && !entrada.urencriterium) throw new ErrorEntrada("De startersaftrek krijg je alleen als je aan het urencriterium voldoet.", "starter");
    const zelfstandig = entrada.urencriterium ? (entrada.starter ? v["nl.zelfstandigenaftrek"] : Math.min(v["nl.zelfstandigenaftrek"], entrada.winst)) : 0;
    const starters = entrada.starter ? v["nl.startersaftrek"] : 0;
    const ondernemersaftrek = zelfstandig + starters;
    const naAftrek = entrada.winst - ondernemersaftrek;
    const mkb = naAftrek > 0 ? porcentaje(naAftrek, v["nl.mkb-winstvrijstelling"]) : 0;
    const belastbareWinst = naAftrek - mkb;
    const aftrek = ondernemersaftrek + mkb;
    const inkomenVoorAftrek = entrada.winst + entrada.loon;
    const aanpassing = tariefsaanpassing(inkomenVoorAftrek, aftrek, v["nl.box1-schijven"], v["nl.aftrek-maximumtarief"]);
    const box1 = berekenBox1(v, {
      inkomen: Math.max(0, belastbareWinst + entrada.loon),
      arbeidsinkomen: inkomenVoorAftrek,
      aftrekVoorBeperking: aanpassing,
    });
    const ruimteZvw = Math.max(0, v["nl.zvw-maximum"] - entrada.loon);
    const zvw = porcentaje(Math.min(Math.max(0, belastbareWinst), ruimteZvw), v["nl.zvw-bijdrage"]);
    const totaal = box1.teBetalen + zvw;
    const observaciones = ["Heb je loon uit een baan, dan heeft je werkgever daar al loonheffing op ingehouden. Die gaat nog af van de inkomstenbelasting hierboven."];
    if (!entrada.urencriterium) observaciones.push("Zonder urencriterium krijg je geen zelfstandigenaftrek, maar wel de mkb-winstvrijstelling.");
    return {
      totaal: redondear(totaal),
      perMaand: redondear(totaal / 12),
      zelfstandigenaftrek: redondear(zelfstandig),
      startersaftrek: redondear(starters),
      mkb: redondear(mkb),
      belastbareWinst: redondear(belastbareWinst),
      inkomstenbelasting: redondear(box1.teBetalen),
      tariefsaanpassing: redondear(aanpassing),
      ahk: redondear(box1.ahk),
      arbeidskorting: redondear(box1.arbeidskorting),
      zvw: redondear(zvw),
      netto: redondear(entrada.winst + entrada.loon - totaal),
      observaciones: entrada.loon > 0 ? observaciones : observaciones.slice(1),
    };
  },
  resultado: [
    { clave: "totaal", etiqueta: "Inkomstenbelasting en Zvw-bijdrage samen", formato: "moneda", destacada: true },
    { clave: "perMaand", etiqueta: "Om per maand opzij te zetten", formato: "moneda" },
    { clave: "zelfstandigenaftrek", etiqueta: "Zelfstandigenaftrek", formato: "moneda", ocultarSiCero: true },
    { clave: "startersaftrek", etiqueta: "Startersaftrek", formato: "moneda", ocultarSiCero: true },
    { clave: "mkb", etiqueta: "Mkb-winstvrijstelling", formato: "moneda" },
    { clave: "belastbareWinst", etiqueta: "Belastbare winst", formato: "moneda" },
    { clave: "inkomstenbelasting", etiqueta: "Inkomstenbelasting box 1 (na heffingskortingen)", formato: "moneda" },
    { clave: "tariefsaanpassing", etiqueta: "Waarvan tariefsaanpassing", formato: "moneda", ocultarSiCero: true },
    { clave: "ahk", etiqueta: "Algemene heffingskorting", formato: "moneda" },
    { clave: "arbeidskorting", etiqueta: "Arbeidskorting", formato: "moneda" },
    { clave: "zvw", etiqueta: "Inkomensafhankelijke bijdrage Zvw", formato: "moneda" },
    { clave: "netto", etiqueta: "Wat je overhoudt", formato: "moneda" },
  ],
});
