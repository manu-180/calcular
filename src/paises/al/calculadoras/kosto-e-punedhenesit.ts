import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { llogaritPagen, REQUIERE_PAGA } from "../lib/paga";

export default definirCalculadora({
  id: "al.kosto-e-punedhenesit",
  mercado: "al",
  concepto: "costo-empleador",
  slug: "kosto-e-punedhenesit",
  estado: "publicado",
  requiere: REQUIERE_PAGA,
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Paga bruto në muaj", min: 0, porDefecto: 90000 },
    { id: "punonjes", tipo: "entero", etiqueta: "Numri i punonjësve me këtë pagë", min: 1, max: 10000, porDefecto: 1 },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Vendosni një pagë bruto më të madhe se zero.", "bruto");
    const p = llogaritPagen(e.bruto, v, redondear);
    return {
      kosto: redondear(p.kosto * e.punonjes),
      shoqerore: redondear(p.shoqerorePunedhenes * e.punonjes),
      shendetesore: redondear(p.shendetesorePunedhenes * e.punonjes),
      vjetore: redondear(p.kosto * e.punonjes * 12),
      neto: p.neto,
      perqindje: ((p.kosto - e.bruto) / e.bruto) * 100,
    };
  },
  resultado: [
    { clave: "kosto", etiqueta: "Kostoja totale në muaj", formato: "moneda", destacada: true },
    { clave: "shoqerore", etiqueta: "Sigurime shoqërore të punëdhënësit", formato: "moneda" },
    { clave: "shendetesore", etiqueta: "Sigurime shëndetësore të punëdhënësit", formato: "moneda" },
    { clave: "vjetore", etiqueta: "Kostoja në vit", formato: "moneda" },
    { clave: "neto", etiqueta: "Paga neto e një punonjësi", formato: "moneda" },
    { clave: "perqindje", etiqueta: "Sa shtohet mbi bruto", formato: "porcentaje", decimales: 1 },
  ],
});
