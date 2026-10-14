import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { berekenBox1, combinatiekorting, procent, REQ_BOX1, tariefsaanpassing } from "../lib/belasting";

export default definirCalculadora({
  id: "nl.inkomstenbelasting-berekenen",
  mercado: "nl",
  concepto: "impuesto-renta",
  slug: "inkomstenbelasting-berekenen",
  estado: "publicado",
  requiere: {
    ...REQ_BOX1,
    "nl.iack": "mapa",
    "nl.iack-tarief": "numero",
    "nl.aftrek-maximumtarief": "numero",
  },
  campos: [
    { id: "inkomen", tipo: "moneda", etiqueta: "Inkomen uit werk en woning per jaar (voor aftrekposten)", min: 0, porDefecto: 50000 },
    { id: "arbeidsinkomen", tipo: "moneda", etiqueta: "Waarvan arbeidsinkomen (loon of winst)", min: 0, requerido: false, ayuda: "Laat leeg als al je inkomen uit werk komt." },
    { id: "aftrek", tipo: "moneda", etiqueta: "Aftrekposten (bijvoorbeeld hypotheekrente of giften)", min: 0, porDefecto: 0 },
    { id: "jongKind", tipo: "si-no", etiqueta: "Je hebt een kind jonger dan 12 en bent alleenstaand of de minstverdienende partner", porDefecto: false },
    { id: "betaald", tipo: "moneda", etiqueta: "Al ingehouden loonheffing (optioneel)", min: 0, requerido: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.aftrek > entrada.inkomen) throw new ErrorEntrada("Je aftrekposten zijn hoger dan je inkomen. Vul een lager bedrag in.", "aftrek");
    const arbeidsinkomen = entrada.arbeidsinkomen ?? entrada.inkomen;
    if (arbeidsinkomen > entrada.inkomen) throw new ErrorEntrada("Je arbeidsinkomen kan niet hoger zijn dan je totale inkomen.", "arbeidsinkomen");
    const belastbaar = entrada.inkomen - entrada.aftrek;
    const aanpassing = tariefsaanpassing(entrada.inkomen, entrada.aftrek, v["nl.box1-schijven"], v["nl.aftrek-maximumtarief"]);
    const iack = entrada.jongKind ? combinatiekorting(arbeidsinkomen, v["nl.iack"], v["nl.iack-tarief"]) : 0;
    const box1 = berekenBox1(v, { inkomen: belastbaar, arbeidsinkomen, aftrekVoorBeperking: aanpassing, combinatiekorting: iack });
    const teBetalen = redondear(box1.teBetalen);
    const verschil = entrada.betaald === null ? null : redondear(teBetalen - entrada.betaald);
    const observaciones: string[] = [];
    if (verschil !== null) observaciones.push(verschil > 0 ? "Je moet waarschijnlijk bijbetalen." : verschil < 0 ? "Je krijgt waarschijnlijk geld terug." : "Je loonheffing komt precies uit.");
    if (aanpassing > 0) {
      observaciones.push(`Een deel van je aftrekposten valt in de hoogste schijf. Daarover krijg je maar ${procent(v["nl.aftrek-maximumtarief"])} terug, daarom komt er een tariefsaanpassing bij.`);
    }
    return {
      teBetalen,
      belastbaar: redondear(belastbaar),
      belasting: redondear(box1.belasting),
      tariefsaanpassing: redondear(aanpassing),
      ahk: redondear(box1.ahk),
      arbeidskorting: redondear(box1.arbeidskorting),
      combinatiekorting: redondear(iack),
      kortingen: redondear(box1.kortingen),
      verschil,
      observaciones,
    };
  },
  resultado: [
    { clave: "teBetalen", etiqueta: "Inkomstenbelasting box 1", formato: "moneda", destacada: true },
    { clave: "belastbaar", etiqueta: "Belastbaar inkomen uit werk en woning", formato: "moneda" },
    { clave: "belasting", etiqueta: "Belasting en premies volgens de schijven", formato: "moneda" },
    { clave: "tariefsaanpassing", etiqueta: "Plus: tariefsaanpassing aftrekposten", formato: "moneda", ocultarSiCero: true },
    { clave: "ahk", etiqueta: "Min: algemene heffingskorting", formato: "moneda" },
    { clave: "arbeidskorting", etiqueta: "Min: arbeidskorting", formato: "moneda" },
    { clave: "combinatiekorting", etiqueta: "Min: inkomensafhankelijke combinatiekorting", formato: "moneda", ocultarSiCero: true },
    { clave: "kortingen", etiqueta: "Heffingskortingen die je gebruikt", formato: "moneda" },
    { clave: "verschil", etiqueta: "Bijbetalen (plus) of terugkrijgen (min)", formato: "moneda" },
  ],
});
