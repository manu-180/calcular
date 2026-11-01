import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { CAMPO_DRUGI_STUP, CAMPO_GRAD, obracunaj, REQUIERE_PLACA } from "../lib/placa";

export default definirCalculadora({
  id: "hr.trosak-poslodavca",
  mercado: "hr",
  concepto: "costo-empleador",
  slug: "trosak-poslodavca",
  estado: "publicado",
  requiere: { ...REQUIERE_PLACA, "hr.prehrana": "numero", "hr.nagrade-rezultati": "numero" },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Bruto plaća mjesečno", min: 0, porDefecto: 2000 },
    { id: "neoporezivo", tipo: "moneda", etiqueta: "Neoporezivi primici mjesečno", ayuda: "Na primjer naknada za prehranu u propisanoj svoti. Doprinosi i porez na njih se ne plaćaju.", min: 0, porDefecto: 0 },
    CAMPO_GRAD,
    CAMPO_DRUGI_STUP,
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Unesite bruto plaću veću od nule.", "bruto");
    const o = obracunaj(e.bruto, { grad: e.grad, drugiStup: e.drugiStup, djeca: 0, uzdrzavani: 0 }, v, redondear);
    const mjesecno = redondear(o.trosak + e.neoporezivo);
    return {
      mjesecno,
      zdravstveno: o.zdravstveno,
      godisnje: redondear(mjesecno * 12),
      neto: redondear(o.neto + e.neoporezivo),
      udio: redondear((redondear(o.neto + e.neoporezivo) / mjesecno) * 100),
    };
  },
  resultado: [
    { clave: "mjesecno", etiqueta: "Ukupan mjesečni trošak", formato: "moneda", destacada: true },
    { clave: "zdravstveno", etiqueta: "Zdravstveno na plaću", formato: "moneda" },
    { clave: "godisnje", etiqueta: "Trošak za 12 mjeseci", formato: "moneda" },
    { clave: "neto", etiqueta: "Radnik dobiva, s neoporezivim primicima", formato: "moneda" },
    { clave: "udio", etiqueta: "Udio isplate radniku u trošku", formato: "porcentaje", decimales: 1 },
  ],
});
