import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { bbszPerMaand, GEZIN_OPCIONES, REQ_BBSZ, REQ_RSZ, rszBasis, rszWerknemer, STATUUT_OPCIONES } from "../lib/loon";

export default definirCalculadora({
  id: "be.rsz-berekenen",
  mercado: "be",
  concepto: "aportes-seguridad-social",
  slug: "rsz-berekenen",
  estado: "publicado",
  requiere: { ...REQ_RSZ, ...REQ_BBSZ },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Brutomaandloon", min: 0, porDefecto: 2800 },
    { id: "statuut", tipo: "opcion", etiqueta: "Statuut", opciones: STATUUT_OPCIONES, porDefecto: "bediende" },
    { id: "gezin", tipo: "opcion", etiqueta: "Gezinssituatie (voor de bijzondere bijdrage)", opciones: GEZIN_OPCIONES, porDefecto: "alleenstaand" },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.bruto <= 0) throw new ErrorEntrada("Vul een brutoloon boven nul in.", "bruto");
    const rsz = rszWerknemer(entrada.bruto, entrada.statuut, v["be.rsz-werknemer"], v["be.werkbonus"], redondear);
    const bbsz = bbszPerMaand(entrada.bruto, entrada.statuut, entrada.gezin, v, redondear);
    return {
      basis: redondear(rszBasis(entrada.bruto, entrada.statuut)),
      bijdrage: rsz.bijdrage,
      werkbonusA: rsz.werkbonusA,
      werkbonusB: rsz.werkbonusB,
      teBetalen: rsz.netto,
      bbsz,
      totaal: redondear(rsz.netto + bbsz),
      belastbaar: redondear(entrada.bruto - rsz.netto),
      observaciones: ["De werkbonus is berekend voor een voltijdse werknemer met een volledige maand prestaties. Werk je deeltijds of was je een deel van de maand afwezig, dan wordt hij in verhouding verminderd."],
    };
  },
  resultado: [
    { clave: "totaal", etiqueta: "Totaal ingehouden per maand", formato: "moneda", destacada: true },
    { clave: "basis", etiqueta: "Loon waarop de RSZ berekend wordt", formato: "moneda" },
    { clave: "bijdrage", etiqueta: "Persoonlijke RSZ-bijdrage", formato: "moneda" },
    { clave: "werkbonusA", etiqueta: "Min: werkbonus voor lage lonen (luik A)", formato: "moneda", ocultarSiCero: true },
    { clave: "werkbonusB", etiqueta: "Min: werkbonus voor zeer lage lonen (luik B)", formato: "moneda", ocultarSiCero: true },
    { clave: "teBetalen", etiqueta: "RSZ na werkbonus", formato: "moneda" },
    { clave: "bbsz", etiqueta: "Bijzondere bijdrage sociale zekerheid", formato: "moneda", ocultarSiCero: true },
    { clave: "belastbaar", etiqueta: "Belastbaar loon (bruto min RSZ)", formato: "moneda" },
  ],
});
