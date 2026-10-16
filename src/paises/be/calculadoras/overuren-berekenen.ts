import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "be.overuren-berekenen",
  mercado: "be",
  concepto: "horas-extra",
  slug: "overuren-berekenen",
  estado: "publicado",
  requiere: {
    "be.overloon": "mapa",
  },
  campos: [
    { id: "maandloon", tipo: "moneda", etiqueta: "Brutomaandloon", min: 0, porDefecto: 3250 },
    { id: "uren", tipo: "numero", etiqueta: "Uren per week in je contract", min: 1, max: 40, porDefecto: 38 },
    { id: "week", tipo: "numero", etiqueta: "Overuren op weekdagen en zaterdag", min: 0, porDefecto: 5 },
    { id: "zondag", tipo: "numero", etiqueta: "Overuren op zondag of een feestdag", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.maandloon <= 0) throw new ErrorEntrada("Vul je brutomaandloon in.", "maandloon");
    const t = v["be.overloon"];
    // Een kwartaal telt 13 weken: maandloon × 3 ÷ 13 is het weekloon.
    const uurloon = redondear((entrada.maandloon * 3) / 13 / entrada.uren);
    const loonWeek = redondear(uurloon * entrada.week);
    const loonZondag = redondear(uurloon * entrada.zondag);
    const toeslag = redondear(porcentaje(loonWeek, t.week) + porcentaje(loonZondag, t["zondag-feestdag"]));
    return {
      totaal: redondear(loonWeek + loonZondag + toeslag),
      uurloon,
      gewoonLoon: redondear(loonWeek + loonZondag),
      toeslag,
      observaciones: ["Het overloon wordt berekend op je gewone loon, met de premies die er rechtstreeks bij horen, zoals een ploegenpremie. Je cao of arbeidsreglement kan meer toekennen."],
    };
  },
  resultado: [
    { clave: "totaal", etiqueta: "Bruto voor je overuren", formato: "moneda", destacada: true },
    { clave: "uurloon", etiqueta: "Bruto uurloon", formato: "moneda" },
    { clave: "gewoonLoon", etiqueta: "Gewoon loon voor die uren", formato: "moneda" },
    { clave: "toeslag", etiqueta: "Overloon (toeslag)", formato: "moneda" },
  ],
});
