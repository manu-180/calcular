import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "tt.stamp-duty-calculator",
  mercado: "tt",
  concepto: "propio",
  slug: "stamp-duty-calculator",
  estado: "publicado",
  requiere: {
    "tt.stamp-duty-residential": "escala",
    "tt.stamp-duty-land": "escala",
    "tt.stamp-duty-first-home-exemption": "numero",
  },
  campos: [
    { id: "valor", tipo: "moneda", etiqueta: "Purchase price or value of the property", min: 0, porDefecto: 1500000 },
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "What are you buying?",
      opciones: [
        { valor: "house", etiqueta: "A house, or a house and land" },
        { valor: "land", etiqueta: "Residential land only" },
      ],
      porDefecto: "house",
    },
    { id: "primeraVivienda", tipo: "si-no", etiqueta: "Every buyer is a first-time homeowner", porDefecto: false, visibleSi: { tipo: ["house"] } },
  ],
  calcular(e, v, { redondear }) {
    if (e.valor <= 0) throw new ErrorEntrada("Enter the value of the property.", "valor");
    const escala = e.tipo === "land" ? v["tt.stamp-duty-land"] : v["tt.stamp-duty-residential"];
    const primera = e.tipo === "house" && e.primeraVivienda === true;
    const exencion = primera ? v["tt.stamp-duty-first-home-exemption"] : escala[1].desde;
    // La exención de primera vivienda libera el valor hasta el tope; lo que pasa del tope paga la tasa
    // del tramo de la escala en que cae.
    const duty = redondear(aplicarEscalaMarginal(escala, e.valor) - (primera ? aplicarEscalaMarginal(escala, Math.min(e.valor, exencion)) : 0));
    const observaciones: string[] = [];
    if (duty === 0) observaciones.push("The value is within the exempt amount, so no stamp duty is due on the deed of conveyance.");
    if (primera) observaciones.push("The first-time homeowner exemption applies to deeds dated on or after January 1, 2019, and only if every buyer qualifies.");
    if (e.tipo === "land") observaciones.push("The exemption for residential land depends on the land meeting the IRD's criteria and an application being made.");
    return { duty, exento: Math.min(e.valor, exencion), efectiva: (duty / e.valor) * 100, observaciones };
  },
  resultado: [
    { clave: "duty", etiqueta: "Stamp duty on the conveyance", formato: "moneda", destacada: true },
    { clave: "exento", etiqueta: "Exempt part of the value", formato: "moneda" },
    { clave: "efectiva", etiqueta: "Stamp duty as a share of the price", formato: "porcentaje", decimales: 2 },
  ],
});
