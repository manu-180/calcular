import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "hr.prosjecna-placa",
  mercado: "hr",
  concepto: "propio",
  slug: "prosjecna-placa",
  estado: "publicado",
  requiere: { "hr.prosjecna-neto": "serie", "hr.prosjecna-bruto": "serie", "hr.medijalna-neto": "serie", "hr.medijalna-bruto": "serie" },
  campos: [{ id: "neto", tipo: "moneda", etiqueta: "Vaša neto plaća", min: 0, porDefecto: 1400 }],
  calcular(e, v, { redondear }) {
    if (e.neto <= 0) throw new ErrorEntrada("Unesite plaću veću od nule.", "neto");
    const p = v["hr.prosjecna-neto"].valor;
    const m = v["hr.medijalna-neto"].valor;
    return {
      odnos: redondear((e.neto / p) * 100),
      prema: redondear(e.neto - p),
      odnosMedijan: redondear((e.neto / m) * 100),
      prosjek: p,
      medijan: m,
      bruto: v["hr.prosjecna-bruto"].valor,
      brutoMedijan: v["hr.medijalna-bruto"].valor,
      fecha: v["hr.prosjecna-neto"].fecha,
    };
  },
  resultado: [
    { clave: "odnos", etiqueta: "Vaš neto u odnosu na prosjek", formato: "porcentaje", decimales: 1, destacada: true },
    { clave: "prema", etiqueta: "Razlika do prosječne neto plaće", formato: "moneda" },
    { clave: "odnosMedijan", etiqueta: "Vaš neto u odnosu na medijan", formato: "porcentaje", decimales: 1 },
    { clave: "prosjek", etiqueta: "Prosječna neto plaća", formato: "moneda" },
    { clave: "medijan", etiqueta: "Medijalna neto plaća", formato: "moneda" },
    { clave: "bruto", etiqueta: "Prosječna bruto plaća", formato: "moneda" },
    { clave: "brutoMedijan", etiqueta: "Medijalna bruto plaća", formato: "moneda" },
    { clave: "fecha", etiqueta: "Mjesec podatka", formato: "fecha" },
  ],
});
