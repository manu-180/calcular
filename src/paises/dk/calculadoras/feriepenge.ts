import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "dk.feriepenge",
  mercado: "dk",
  concepto: "vacaciones",
  slug: "feriepenge",
  estado: "publicado",
  requiere: {
    "dk.feriegodtgoerelse": "numero",
    "dk.ferietillaeg": "numero",
    "dk.ferie-optjening": "numero",
    "dk.ferie-uger": "numero",
  },
  campos: [
    {
      id: "type",
      tipo: "opcion",
      etiqueta: "Hvordan får du ferie betalt?",
      opciones: [
        { valor: "feriegodtgoerelse", etiqueta: "Feriepenge (timeløn eller fratrådt)" },
        { valor: "ferietillaeg", etiqueta: "Løn under ferie med ferietillæg (fast månedsløn)" },
      ],
      porDefecto: "feriegodtgoerelse",
    },
    {
      id: "loen",
      tipo: "moneda",
      etiqueta: "Løn før skat i optjeningsperioden",
      ayuda: "Al skattepligtig løn i perioden, også din egen pensionsindbetaling og am-bidraget. Typisk et helt ferieår fra 1. september til 31. august.",
      min: 0,
      porDefecto: 400000,
    },
    { id: "maaneder", tipo: "entero", etiqueta: "Måneder med ansættelse i perioden", min: 1, max: 12, porDefecto: 12 },
  ],
  calcular(e, v, { redondear }) {
    if (e.loen <= 0) throw new ErrorEntrada("Skriv den løn, du har tjent i perioden.", "loen");
    if (e.maaneder < 1 || e.maaneder > 12) throw new ErrorEntrada("Et ferieår har 12 måneder. Skriv et tal fra 1 til 12.", "maaneder");
    const dage = redondear(Math.min(e.maaneder * v["dk.ferie-optjening"], v["dk.ferie-uger"] * 5));
    const godtgoerelse = e.type === "feriegodtgoerelse";
    const sats = godtgoerelse ? v["dk.feriegodtgoerelse"] : v["dk.ferietillaeg"];
    const beloeb = redondear(porcentaje(e.loen, sats));
    return {
      beloeb,
      sats,
      dage,
      prDag: godtgoerelse ? redondear(beloeb / dage) : null,
      observaciones: godtgoerelse
        ? ["Feriepengene udbetales, når du holder ferien. Arbejdsgiveren indbetaler dem typisk til FerieKonto eller en feriekasse."]
        : ["Du får din almindelige løn, når du holder ferie. Ferietillægget kommer oven i og udbetales typisk med lønnen for maj og august."],
    };
  },
  resultado: [
    { clave: "beloeb", etiqueta: "Feriepenge eller ferietillæg før skat", formato: "moneda", destacada: true },
    { clave: "sats", etiqueta: "Sats", formato: "porcentaje", decimales: 1 },
    { clave: "dage", etiqueta: "Optjente feriedage", formato: "dias", decimales: 2 },
    { clave: "prDag", etiqueta: "Feriepenge pr. feriedag", formato: "moneda" },
  ],
});
