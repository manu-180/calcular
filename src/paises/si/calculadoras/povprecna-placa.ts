import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "si.povprecna-placa",
  mercado: "si",
  concepto: "propio",
  slug: "povprecna-placa",
  estado: "publicado",
  requiere: { "si.povprecna-placa": "serie", "si.povprecna-letna-placa": "numero" },
  campos: [{ id: "bruto", tipo: "moneda", etiqueta: "Vaša mesečna bruto plača", min: 0, porDefecto: 2500 }],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Vnesite bruto plačo, večjo od nič.", "bruto");
    const p = v["si.povprecna-placa"].valor;
    return { delez: redondear((e.bruto / p) * 100), povprecna: p, razlika: redondear(e.bruto - p), letna: v["si.povprecna-letna-placa"] };
  },
  resultado: [
    { clave: "delez", etiqueta: "Vaša plača v odstotku povprečne", formato: "porcentaje", decimales: 1, destacada: true },
    { clave: "povprecna", etiqueta: "Zadnja objavljena povprečna bruto plača", formato: "moneda" },
    { clave: "razlika", etiqueta: "Razlika do povprečja", formato: "moneda" },
    { clave: "letna", etiqueta: "Povprečje preteklega leta", formato: "moneda" },
  ],
});
