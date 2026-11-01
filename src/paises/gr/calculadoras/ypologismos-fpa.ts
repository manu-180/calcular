import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "gr.ypologismos-fpa",
  mercado: "gr",
  concepto: "iva",
  slug: "ypologismos-fpa",
  estado: "publicado",
  requiere: { "gr.fpa": "mapa", "gr.fpa-nisia": "mapa" },
  campos: [
    {
      id: "operacion",
      tipo: "opcion",
      etiqueta: "Τι θέλετε να κάνετε;",
      opciones: [
        { valor: "prosthesi", etiqueta: "Προσθήκη ΦΠΑ σε τιμή χωρίς ΦΠΑ" },
        { valor: "afairesi", etiqueta: "Αφαίρεση ΦΠΑ από τιμή με ΦΠΑ" },
      ],
      porDefecto: "prosthesi",
    },
    { id: "poso", tipo: "moneda", etiqueta: "Ποσό", min: 0, porDefecto: 100 },
    { id: "syntelestis", tipo: "opcion-dato", dato: "gr.fpa", etiqueta: "Συντελεστής ΦΠΑ", porDefecto: "kanonikos" },
    {
      id: "nisia",
      tipo: "si-no",
      etiqueta: "Νησί με συντελεστές μειωμένους κατά 30%",
      ayuda: "Λέσβος, Χίος, Σάμος, Κως και τα νησιά του Βορείου Αιγαίου, η Σαμοθράκη και τα Δωδεκάνησα με έως 20.000 κατοίκους.",
      porDefecto: false,
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.poso <= 0) throw new ErrorEntrada("Εισάγετε ποσό μεγαλύτερο από το μηδέν.", "poso");
    const tasa = enMapa(e.nisia ? v["gr.fpa-nisia"] : v["gr.fpa"], e.syntelestis);
    const neto = e.operacion === "prosthesi" ? redondear(e.poso) : redondear(e.poso / (1 + tasa / 100));
    const synolo = e.operacion === "prosthesi" ? redondear(e.poso + porcentaje(e.poso, tasa)) : redondear(e.poso);
    return { synolo, neto, fpa: redondear(synolo - neto), tasa };
  },
  resultado: [
    { clave: "synolo", etiqueta: "Τιμή με ΦΠΑ", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "Τιμή χωρίς ΦΠΑ", formato: "moneda" },
    { clave: "fpa", etiqueta: "ΦΠΑ", formato: "moneda" },
    { clave: "tasa", etiqueta: "Συντελεστής που εφαρμόστηκε", formato: "porcentaje" },
  ],
});
