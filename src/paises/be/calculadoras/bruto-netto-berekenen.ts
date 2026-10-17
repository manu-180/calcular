import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { bbszPerMaand, bedrijfsvoorheffing, GEZIN_OPCIONES, REQ_BBSZ, REQ_BV, REQ_RSZ, rszWerknemer, STATUUT_OPCIONES } from "../lib/loon";

export default definirCalculadora({
  id: "be.bruto-netto-berekenen",
  mercado: "be",
  concepto: "sueldo-neto",
  slug: "bruto-netto-berekenen",
  estado: "publicado",
  requiere: { ...REQ_RSZ, ...REQ_BBSZ, ...REQ_BV },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Brutomaandloon", min: 0, porDefecto: 3500 },
    { id: "statuut", tipo: "opcion", etiqueta: "Statuut", opciones: STATUUT_OPCIONES, porDefecto: "bediende" },
    { id: "gezin", tipo: "opcion", etiqueta: "Gezinssituatie", opciones: GEZIN_OPCIONES, porDefecto: "alleenstaand" },
    { id: "kinderen", tipo: "entero", etiqueta: "Kinderen ten laste", min: 0, max: 15, porDefecto: 0, ayuda: "Een kind met een handicap telt voor twee." },
    { id: "alleenstaandeOuder", tipo: "si-no", etiqueta: "Je voedt je kinderen alleen op", porDefecto: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.bruto <= 0) throw new ErrorEntrada("Vul een brutoloon boven nul in.", "bruto");
    const rsz = rszWerknemer(entrada.bruto, entrada.statuut, v["be.rsz-werknemer"], v["be.werkbonus"], redondear);
    const belastbaar = redondear(entrada.bruto - rsz.netto);
    const bv = bedrijfsvoorheffing(
      belastbaar,
      { gezin: entrada.gezin, kinderen: entrada.kinderen, alleenstaandeOuder: entrada.alleenstaandeOuder && entrada.kinderen > 0, werkbonusA: rsz.werkbonusA, werkbonusB: rsz.werkbonusB },
      v,
      redondear,
    );
    const bbsz = bbszPerMaand(entrada.bruto, entrada.statuut, entrada.gezin, v, redondear);
    const netto = redondear(belastbaar - bv.teBetalen - bbsz);
    const observaciones = [
      "Dit is je nettoloon voor een voltijdse maand zonder extra's. Maaltijdcheques, een bedrijfswagen, overuren, premies of een groepsverzekering veranderen het bedrag.",
      "De bedrijfsvoorheffing is een voorschot op je personenbelasting. Met je belastingaangifte krijg je later geld terug of betaal je bij, onder meer door de gemeentebelasting van je gemeente.",
    ];
    if (entrada.statuut === "arbeider") observaciones.push("Als arbeider krijg je je vakantiegeld van de RJV of een vakantiefonds. Daarom worden de RSZ-bijdragen berekend op 108 % van je brutoloon.");
    return {
      netto,
      bruto: entrada.bruto,
      rsz: rsz.bijdrage,
      werkbonus: rsz.werkbonus,
      belastbaar,
      bedrijfsvoorheffing: bv.teBetalen,
      werkbonusFiscaal: bv.werkbonusFiscaal,
      bbsz,
      aandeel: redondear((netto / entrada.bruto) * 100),
      observaciones,
    };
  },
  resultado: [
    { clave: "netto", etiqueta: "Nettoloon per maand", formato: "moneda", destacada: true },
    { clave: "bruto", etiqueta: "Brutoloon", formato: "moneda" },
    { clave: "rsz", etiqueta: "Min: persoonlijke RSZ-bijdrage", formato: "moneda" },
    { clave: "werkbonus", etiqueta: "Plus: sociale werkbonus", formato: "moneda", ocultarSiCero: true },
    { clave: "belastbaar", etiqueta: "Belastbaar loon", formato: "moneda" },
    { clave: "bedrijfsvoorheffing", etiqueta: "Min: bedrijfsvoorheffing", formato: "moneda" },
    { clave: "werkbonusFiscaal", etiqueta: "Waarvan al afgetrokken: fiscale werkbonus", formato: "moneda", ocultarSiCero: true },
    { clave: "bbsz", etiqueta: "Min: bijzondere bijdrage sociale zekerheid", formato: "moneda", ocultarSiCero: true },
    { clave: "aandeel", etiqueta: "Netto in procent van bruto", formato: "porcentaje", decimales: 1 },
  ],
});
