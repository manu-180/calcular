import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { nazivMjeseca } from "../lib/inflacija";

export default definirCalculadora({
  id: "me.prosjecna-zarada",
  mercado: "me",
  concepto: "propio",
  slug: "prosjecna-zarada",
  estado: "publicado",
  requiere: { "me.prosjecna-neto": "serie", "me.prosjecna-bruto": "serie", "me.minimalna-do-v": "numero", "me.prosjecna-bruto-2025": "numero", "me.prosjecna-neto-2025": "numero" },
  campos: [{ id: "plata", tipo: "moneda", etiqueta: "Vaša neto zarada", min: 0, porDefecto: 1000 }],
  calcular(e, v, { redondear }) {
    if (e.plata <= 0) throw new ErrorEntrada("Unesite neto zaradu veću od nule.", "plata");
    const neto = v["me.prosjecna-neto"].valor;
    return {
      odnos: (e.plata / neto) * 100,
      neto,
      bruto: v["me.prosjecna-bruto"].valor,
      razlika: redondear(e.plata - neto),
      prema: (e.plata / v["me.minimalna-do-v"]) * 100,
      mjesec: nazivMjeseca(v["me.prosjecna-neto"].fecha),
    };
  },
  resultado: [
    { clave: "odnos", etiqueta: "Vaša zarada u odnosu na prosjek", formato: "porcentaje", decimales: 1, destacada: true },
    { clave: "neto", etiqueta: "Prosječna neto zarada", formato: "moneda" },
    { clave: "bruto", etiqueta: "Prosječna bruto zarada", formato: "moneda" },
    { clave: "razlika", etiqueta: "Razlika prema prosjeku", formato: "moneda" },
    { clave: "prema", etiqueta: "U odnosu na minimalac do V nivoa", formato: "porcentaje", decimales: 1 },
    { clave: "mjesec", etiqueta: "Mjesec podatka", formato: "texto" },
  ],
});
