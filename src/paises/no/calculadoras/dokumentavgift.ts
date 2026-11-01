import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "no.dokumentavgift",
  mercado: "no",
  concepto: "propio",
  slug: "dokumentavgift",
  estado: "publicado",
  requiere: {
    "no.dokumentavgift": "numero",
    "no.dokumentavgift-minimum": "numero",
    "no.tinglysingsgebyr": "numero",
  },
  campos: [
    { id: "verdi", tipo: "moneda", etiqueta: "Markedsverdi på eiendommen (vanligvis kjøpesummen)", min: 0, porDefecto: 4500000 },
    { id: "pant", tipo: "si-no", etiqueta: "Du tinglyser også et pantedokument (boliglån)", porDefecto: true },
  ],
  calcular(e, v, { redondear }) {
    if (e.verdi <= 0) throw new ErrorEntrada("Skriv inn verdien på eiendommen.", "verdi");
    // Kartverket runder avgiftsgrunnlaget ned til nærmeste 1 000 kr.
    const grunnlag = Math.floor(e.verdi / 1000) * 1000;
    const avgift = redondear(Math.max((grunnlag * v["no.dokumentavgift"]) / 100, v["no.dokumentavgift-minimum"]));
    const gebyrSkjote = v["no.tinglysingsgebyr"];
    const gebyrPant = e.pant ? v["no.tinglysingsgebyr"] : 0;
    return {
      totalt: redondear(avgift + gebyrSkjote + gebyrPant),
      avgift,
      gebyrSkjote,
      gebyrPant,
      grunnlag,
      observaciones: ["Avgiften regnes av markedsverdien når skjøtet tinglyses, også om kjøpesummen er lavere, for eksempel ved gave eller overtatt gjeld."],
    };
  },
  resultado: [
    { clave: "totalt", etiqueta: "Til sammen", formato: "moneda", destacada: true },
    { clave: "avgift", etiqueta: "Dokumentavgift", formato: "moneda" },
    { clave: "gebyrSkjote", etiqueta: "Tinglysingsgebyr for skjøtet", formato: "moneda" },
    { clave: "gebyrPant", etiqueta: "Tinglysingsgebyr for pantedokumentet", formato: "moneda", ocultarSiCero: true },
    { clave: "grunnlag", etiqueta: "Avgiftsgrunnlag (rundet ned til hele tusen)", formato: "moneda" },
  ],
});
