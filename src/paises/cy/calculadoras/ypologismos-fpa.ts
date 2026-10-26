import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "cy.ypologismos-fpa",
  mercado: "cy",
  concepto: "iva",
  slug: "ypologismos-fpa",
  estado: "publicado",
  requiere: { "cy.fpa": "mapa" },
  campos: [
    { id: "poso", tipo: "moneda", etiqueta: "Ποσό", min: 0, porDefecto: 100 },
    { id: "syntelestis", tipo: "opcion-dato", dato: "cy.fpa", etiqueta: "Συντελεστής ΦΠΑ", porDefecto: "19" },
    {
      id: "kateuthynsi",
      tipo: "opcion",
      etiqueta: "Το ποσό είναι",
      opciones: [
        { valor: "xoris", etiqueta: "Χωρίς ΦΠΑ (θέλω να τον προσθέσω)" },
        { valor: "me", etiqueta: "Με ΦΠΑ (θέλω να τον αφαιρέσω)" },
      ],
      porDefecto: "xoris",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.poso <= 0) throw new ErrorEntrada("Εισάγετε ποσό μεγαλύτερο από το μηδέν.", "poso");
    const t = enMapa(v["cy.fpa"], e.syntelestis);
    const kathari = e.kateuthynsi === "xoris" ? e.poso : redondear(e.poso / (1 + t / 100));
    const fpa = e.kateuthynsi === "xoris" ? redondear(porcentaje(e.poso, t)) : redondear(e.poso - kathari);
    return { synolo: redondear(kathari + fpa), kathari, fpa, syntelestis: t };
  },
  resultado: [
    { clave: "synolo", etiqueta: "Τελική τιμή με ΦΠΑ", formato: "moneda", destacada: true },
    { clave: "kathari", etiqueta: "Καθαρή αξία χωρίς ΦΠΑ", formato: "moneda" },
    { clave: "fpa", etiqueta: "ΦΠΑ", formato: "moneda" },
    { clave: "syntelestis", etiqueta: "Συντελεστής", formato: "porcentaje", decimales: 0 },
  ],
});
