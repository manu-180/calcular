import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "sr.hypotheekrenteaftrek-berekenen",
  mercado: "sr",
  concepto: "propio",
  slug: "hypotheekrenteaftrek-berekenen",
  estado: "publicado",
  requiere: {
    "sr.ib-tarief": "escala",
    "sr.hypotheek-max-schuld": "numero",
  },
  campos: [
    { id: "inkomen", tipo: "moneda", etiqueta: "Zuiver inkomen per jaar zonder de renteaftrek", min: 0, porDefecto: 400000 },
    { id: "schuld", tipo: "moneda", etiqueta: "Hypotheekschuld op je eigen woning", min: 0, porDefecto: 800000 },
    { id: "rente", tipo: "moneda", etiqueta: "Betaalde hypotheekrente per jaar", min: 0, porDefecto: 64000 },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.rente > 0 && entrada.schuld <= 0) throw new ErrorEntrada("Vul de hypotheekschuld in waarover je de rente betaalt.", "schuld");
    const max = valores["sr.hypotheek-max-schuld"];
    const deel = entrada.schuld > max ? max / entrada.schuld : 1;
    const aftrek = redondear(entrada.rente * deel);
    const zonder = aplicarEscalaMarginal(valores["sr.ib-tarief"], entrada.inkomen);
    const met = aplicarEscalaMarginal(valores["sr.ib-tarief"], Math.max(0, entrada.inkomen - aftrek));
    return {
      voordeel: redondear(zonder - met),
      aftrek,
      belastingZonder: redondear(zonder),
      belastingMet: redondear(met),
      observaciones: deel < 1 ? ["Je schuld is hoger dan het maximum. Alleen de rente over dat maximum is aftrekbaar."] : [],
    };
  },
  resultado: [
    { clave: "voordeel", etiqueta: "Minder inkomstenbelasting per jaar", formato: "moneda", destacada: true },
    { clave: "aftrek", etiqueta: "Aftrekbare hypotheekrente", formato: "moneda" },
    { clave: "belastingZonder", etiqueta: "Inkomstenbelasting zonder aftrek", formato: "moneda" },
    { clave: "belastingMet", etiqueta: "Inkomstenbelasting met aftrek", formato: "moneda" },
  ],
});
