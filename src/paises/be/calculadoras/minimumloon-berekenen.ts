import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "be.minimumloon-berekenen",
  mercado: "be",
  concepto: "salario-minimo",
  slug: "minimumloon-berekenen",
  estado: "publicado",
  requiere: {
    "be.ggmmi": "numero",
  },
  campos: [
    { id: "voltijds", tipo: "numero", etiqueta: "Voltijdse uren per week in je sector", min: 1, max: 40, porDefecto: 38 },
    { id: "uren", tipo: "numero", etiqueta: "Jouw uren per week", min: 1, max: 40, porDefecto: 38 },
    { id: "loon", tipo: "moneda", etiqueta: "Jouw brutomaandloon (om te vergelijken)", min: 0, requerido: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.uren > entrada.voltijds) throw new ErrorEntrada("Je uren kunnen niet hoger zijn dan een voltijdse week.", "uren");
    const voltijdsMaand = v["be.ggmmi"];
    const perMaand = redondear((voltijdsMaand * entrada.uren) / entrada.voltijds);
    // Een kwartaal telt 13 weken: maandloon × 3 ÷ 13 geeft het weekloon.
    const perUur = redondear((voltijdsMaand * 3) / 13 / entrada.voltijds);
    const verschil = entrada.loon === null ? null : redondear(entrada.loon - perMaand);
    const observaciones: string[] = [];
    if (verschil !== null && verschil < 0) observaciones.push("Je loon ligt onder het minimum. Kijk ook naar het minimumloon van je paritair comité, want je sector kan een hoger minimum hebben.");
    return { perMaand, voltijdsMaand, perUur, perJaar: redondear(perMaand * 12), verschil, observaciones };
  },
  resultado: [
    { clave: "perMaand", etiqueta: "Minimum brutomaandloon voor jouw uren", formato: "moneda", destacada: true },
    { clave: "voltijdsMaand", etiqueta: "Minimum voor een voltijdse job", formato: "moneda" },
    { clave: "perUur", etiqueta: "Omgerekend per uur", formato: "moneda" },
    { clave: "perJaar", etiqueta: "Per jaar (12 maanden, zonder vakantiegeld en eindejaarspremie)", formato: "moneda" },
    { clave: "verschil", etiqueta: "Verschil met jouw loon", formato: "moneda" },
  ],
});
