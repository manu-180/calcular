import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "no.overtidstillegg",
  mercado: "no",
  concepto: "horas-extra",
  slug: "overtidstillegg",
  estado: "publicado",
  requiere: {
    "no.overtidstillegg": "numero",
    "no.overtid-grenser": "mapa",
  },
  campos: [
    {
      id: "modus",
      tipo: "opcion",
      etiqueta: "Jeg vet",
      opciones: [
        { valor: "time", etiqueta: "Timelønnen min" },
        { valor: "mnd", etiqueta: "Månedslønnen min" },
      ],
      porDefecto: "time",
    },
    { id: "timelonn", tipo: "moneda", etiqueta: "Timelønn", min: 0, porDefecto: 300, visibleSi: { modus: ["time"] } },
    { id: "manedslonn", tipo: "moneda", etiqueta: "Månedslønn", min: 0, porDefecto: 50000, visibleSi: { modus: ["mnd"] } },
    { id: "ukeTimer", tipo: "numero", etiqueta: "Arbeidstid per uke (timer)", min: 1, max: 60, porDefecto: 37.5, visibleSi: { modus: ["mnd"] } },
    { id: "timer", tipo: "numero", etiqueta: "Antall overtidstimer", min: 0, porDefecto: 10 },
    { id: "tillegg", tipo: "porcentaje", etiqueta: "Overtidstillegg", min: 0, max: 200, porDefecto: 40, ayuda: "Arbeidsmiljøloven gir et minstetillegg. Gir arbeidsavtalen eller tariffavtalen mer, skriv inn den satsen." },
  ],
  calcular(e, v, { redondear }) {
    const minste = v["no.overtidstillegg"];
    if (e.tillegg < minste) throw new ErrorEntrada(`Arbeidsmiljøloven krever et tillegg på minst ${minste} %.`, "tillegg");
    let timelonn: number;
    if (e.modus === "mnd") {
      if (!e.manedslonn || e.manedslonn <= 0) throw new ErrorEntrada("Skriv inn månedslønnen.", "manedslonn");
      timelonn = (e.manedslonn * 12) / ((e.ukeTimer ?? 37.5) * 52);
    } else {
      if (!e.timelonn || e.timelonn <= 0) throw new ErrorEntrada("Skriv inn timelønnen.", "timelonn");
      timelonn = e.timelonn;
    }
    if (e.timer <= 0) throw new ErrorEntrada("Skriv inn antall overtidstimer.", "timer");
    const tilleggPerTime = redondear((timelonn * e.tillegg) / 100);
    const perTime = redondear(timelonn + tilleggPerTime);
    const observaciones: string[] = [];
    if (e.modus === "mnd") observaciones.push("Timelønnen er regnet som årslønn delt på arbeidstimer i 52 uker. Arbeidsgiveren kan bruke en annen deler.");
    const g = v["no.overtid-grenser"];
    if (e.timer > enMapa(g, "uke")) observaciones.push(`Loven setter grenser for overtid: ${enMapa(g, "uke")} timer på sju dager, ${enMapa(g, "fire-uker")} timer på fire uker og ${enMapa(g, "ar")} timer på 52 uker, med unntak etter avtale.`);
    return {
      totalt: redondear(perTime * e.timer),
      perTime,
      tilleggPerTime,
      tilleggTotalt: redondear(tilleggPerTime * e.timer),
      timelonn: redondear(timelonn),
      observaciones,
    };
  },
  resultado: [
    { clave: "totalt", etiqueta: "Betaling for overtiden", formato: "moneda", destacada: true },
    { clave: "perTime", etiqueta: "Betaling per overtidstime", formato: "moneda" },
    { clave: "tilleggPerTime", etiqueta: "Overtidstillegg per time", formato: "moneda" },
    { clave: "tilleggTotalt", etiqueta: "Overtidstillegg til sammen", formato: "moneda" },
    { clave: "timelonn", etiqueta: "Ordinær timelønn", formato: "moneda" },
  ],
});
