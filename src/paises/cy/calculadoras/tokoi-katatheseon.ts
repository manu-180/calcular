import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "cy.tokoi-katatheseon",
  mercado: "cy",
  concepto: "plazo-fijo",
  slug: "tokoi-katatheseon",
  estado: "publicado",
  requiere: { "cy.ektakti-eisfora-amynas": "mapa", "cy.eisfores-gesy": "mapa" },
  campos: [
    { id: "kefalaio", tipo: "moneda", etiqueta: "Ποσό κατάθεσης", min: 0, porDefecto: 10000 },
    { id: "epitokio", tipo: "porcentaje", etiqueta: "Ετήσιο επιτόκιο", min: 0, max: 30, porDefecto: 3 },
    { id: "mines", tipo: "entero", etiqueta: "Διάρκεια σε μήνες", min: 1, max: 120, porDefecto: 12 },
  ],
  calcular(e, v, { redondear }) {
    if (e.kefalaio <= 0) throw new ErrorEntrada("Εισάγετε ποσό μεγαλύτερο από το μηδέν.", "kefalaio");
    if (e.mines < 1) throw new ErrorEntrada("Η διάρκεια πρέπει να είναι τουλάχιστον ένας μήνας.", "mines");
    const tokos = redondear((e.kefalaio * e.epitokio * e.mines) / 1200);
    const amyna = redondear(porcentaje(tokos, enMapa(v["cy.ektakti-eisfora-amynas"], "tokoi")));
    const gesy = redondear(porcentaje(tokos, enMapa(v["cy.eisfores-gesy"], "eisodimatias")));
    const kathara = redondear(tokos - amyna - gesy);
    return { kathara, tokos, amyna, gesy, teliko: redondear(e.kefalaio + kathara), apodosi: redondear((kathara / e.kefalaio) * (1200 / e.mines)) };
  },
  resultado: [
    { clave: "kathara", etiqueta: "Καθαροί τόκοι", formato: "moneda", destacada: true },
    { clave: "tokos", etiqueta: "Μεικτοί τόκοι", formato: "moneda" },
    { clave: "amyna", etiqueta: "Έκτακτη εισφορά για την άμυνα", formato: "moneda" },
    { clave: "gesy", etiqueta: "Εισφορά ΓεΣΥ", formato: "moneda" },
    { clave: "teliko", etiqueta: "Ποσό στη λήξη", formato: "moneda" },
    { clave: "apodosi", etiqueta: "Καθαρή ετήσια απόδοση", formato: "porcentaje", decimales: 2 },
  ],
});
