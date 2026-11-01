import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { CAMPO_PRIREZ } from "../lib/zarada";

export default definirCalculadora({
  id: "me.porez-na-dohodak",
  mercado: "me",
  concepto: "impuesto-renta",
  slug: "porez-na-dohodak",
  estado: "publicado",
  requiere: { "me.porez-zarada": "escala" },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Mjesečna bruto zarada", min: 0, porDefecto: 1500 },
    CAMPO_PRIREZ,
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Unesite bruto zaradu veću od nule.", "bruto");
    const skala = v["me.porez-zarada"];
    const porez = redondear(aplicarEscalaMarginal(skala, e.bruto));
    const prirez = redondear((porez * e.prirez) / 100);
    const ukupno = redondear(porez + prirez);
    return {
      ukupno,
      porez,
      prirez,
      razred9: redondear(aplicarEscalaMarginal(skala.slice(0, 2), e.bruto)),
      razred15: redondear(porez - aplicarEscalaMarginal(skala.slice(0, 2), e.bruto)),
      efektivna: (ukupno / e.bruto) * 100,
      godisnje: redondear(ukupno * 12),
    };
  },
  resultado: [
    { clave: "ukupno", etiqueta: "Porez i prirez mjesečno", formato: "moneda", destacada: true },
    { clave: "porez", etiqueta: "Porez na dohodak", formato: "moneda" },
    { clave: "prirez", etiqueta: "Prirez opštini", formato: "moneda" },
    { clave: "razred9", etiqueta: "Porez iz srednjeg razreda", formato: "moneda" },
    { clave: "razred15", etiqueta: "Porez iz najvišeg razreda", formato: "moneda" },
    { clave: "efektivna", etiqueta: "Stvarna stopa na bruto", formato: "porcentaje", decimales: 2 },
    { clave: "godisnje", etiqueta: "Za dvanaest mjeseci", formato: "moneda" },
  ],
});
