import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "sr.overuren-berekenen",
  mercado: "sr",
  concepto: "horas-extra",
  slug: "overuren-berekenen",
  estado: "publicado",
  requiere: {
    "sr.overwerk-factor": "numero",
    "sr.overwerk-factor-rustdag": "numero",
    "sr.overwerk-tarief": "escala",
  },
  campos: [
    { id: "uurloon", tipo: "moneda", etiqueta: "Je uurloon", min: 0, porDefecto: 100 },
    { id: "urenWerkdag", tipo: "numero", etiqueta: "Overuren op gewone werkdagen deze maand", min: 0, porDefecto: 10 },
    { id: "urenRustdag", tipo: "numero", etiqueta: "Overuren op rustdagen en zondagen deze maand", min: 0, porDefecto: 0 },
    {
      id: "apartBelast",
      tipo: "si-no",
      etiqueta: "Je vraagt het aparte tarief voor overwerk aan",
      porDefecto: true,
      ayuda: "Op jouw verzoek belast de werkgever overwerk met lagere tarieven per maand in plaats van samen met je gewone loon.",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.urenWerkdag + entrada.urenRustdag > 400) throw new ErrorEntrada("Zoveel overuren passen niet in een maand.", "urenWerkdag");
    const werkdag = redondear(entrada.uurloon * valores["sr.overwerk-factor"] * entrada.urenWerkdag);
    const rustdag = redondear(entrada.uurloon * valores["sr.overwerk-factor-rustdag"] * entrada.urenRustdag);
    const bruto = redondear(werkdag + rustdag);
    const belasting = entrada.apartBelast ? redondear(aplicarEscalaMarginal(valores["sr.overwerk-tarief"], bruto)) : null;
    return {
      bruto,
      werkdag,
      rustdag,
      belasting,
      naBelasting: belasting === null ? null : redondear(bruto - belasting),
      observaciones: entrada.apartBelast ? [] : ["Zonder verzoek telt het overwerk mee als gewoon loon en betaal je loonbelasting volgens de gewone schijven."],
    };
  },
  resultado: [
    { clave: "bruto", etiqueta: "Bruto overwerkloon deze maand", formato: "moneda", destacada: true },
    { clave: "werkdag", etiqueta: "Overuren op werkdagen", formato: "moneda" },
    { clave: "rustdag", etiqueta: "Overuren op rustdagen en zondagen", formato: "moneda", ocultarSiCero: true },
    { clave: "belasting", etiqueta: "Loonbelasting op overwerk (apart tarief)", formato: "moneda" },
    { clave: "naBelasting", etiqueta: "Overwerkloon na loonbelasting", formato: "moneda" },
  ],
});
