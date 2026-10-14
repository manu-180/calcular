import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "nl.minimumloon-berekenen",
  mercado: "nl",
  concepto: "salario-minimo",
  slug: "minimumloon-berekenen",
  estado: "publicado",
  requiere: {
    "nl.minimumloon": "mapa",
    "nl.vakantiebijslag": "numero",
  },
  campos: [
    { id: "leeftijd", tipo: "opcion-dato", dato: "nl.minimumloon", etiqueta: "Je leeftijd", porDefecto: "21-plus" },
    { id: "uren", tipo: "numero", etiqueta: "Uren per week volgens je contract", min: 0, max: 80, porDefecto: 36 },
    { id: "uurloon", tipo: "moneda", etiqueta: "Je eigen bruto uurloon (optioneel, om te vergelijken)", min: 0, requerido: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.uren <= 0) throw new ErrorEntrada("Vul in hoeveel uur je per week werkt.", "uren");
    const perUur = enMapa(v["nl.minimumloon"], entrada.leeftijd);
    const perWeek = redondear(perUur * entrada.uren);
    const perJaar = redondear(perUur * entrada.uren * 52);
    const perMaand = redondear(perJaar / 12);
    const vakantiegeld = redondear(porcentaje(perJaar, v["nl.vakantiebijslag"]));
    const observaciones: string[] = [];
    let verschil: number | null = null;
    if (entrada.uurloon !== null) {
      verschil = redondear(entrada.uurloon - perUur);
      observaciones.push(
        verschil < 0
          ? "Je verdient minder dan het minimumloon voor je leeftijd. Je werkgever moet je minstens het wettelijk minimumloon betalen, dus bespreek het met je werkgever."
          : "Je uurloon is gelijk aan of hoger dan het minimumloon voor je leeftijd.",
      );
    }
    return { perUur, perWeek, perMaand, perJaar, vakantiegeld, verschil, observaciones };
  },
  resultado: [
    { clave: "perUur", etiqueta: "Minimumloon per uur", formato: "moneda", destacada: true },
    { clave: "perWeek", etiqueta: "Per week", formato: "moneda" },
    { clave: "perMaand", etiqueta: "Per maand (gemiddeld, 52 weken ÷ 12)", formato: "moneda" },
    { clave: "perJaar", etiqueta: "Per jaar (52 weken)", formato: "moneda" },
    { clave: "vakantiegeld", etiqueta: "Vakantiegeld per jaar daarbovenop", formato: "moneda" },
    { clave: "verschil", etiqueta: "Jouw uurloon min het minimumloon", formato: "moneda" },
  ],
});
