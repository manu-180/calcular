import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { brutoIzNeta, CAMPO_DJECA, CAMPO_DRUGI_STUP, CAMPO_GRAD, CAMPO_UZDRZAVANI, REQUIERE_PLACA } from "../lib/placa";

export default definirCalculadora({
  id: "hr.neto-bruto-kalkulator",
  mercado: "hr",
  concepto: "propio",
  slug: "neto-bruto-kalkulator",
  estado: "publicado",
  requiere: REQUIERE_PLACA,
  campos: [
    { id: "neto", tipo: "moneda", etiqueta: "Neto plaća koju želite", min: 0, porDefecto: 1500 },
    CAMPO_GRAD,
    CAMPO_DRUGI_STUP,
    CAMPO_DJECA,
    CAMPO_UZDRZAVANI,
  ],
  calcular(e, v, { redondear }) {
    if (e.neto <= 0) throw new ErrorEntrada("Unesite neto plaću veću od nule.", "neto");
    const o = brutoIzNeta(e.neto, e, v, redondear);
    return { bruto: o.bruto, doprinosi: o.doprinosi, porez: o.porez, zdravstveno: o.zdravstveno, trosak: o.trosak };
  },
  resultado: [
    { clave: "bruto", etiqueta: "Potrebna bruto plaća", formato: "moneda", destacada: true },
    { clave: "doprinosi", etiqueta: "Mirovinski doprinosi iz plaće", formato: "moneda" },
    { clave: "porez", etiqueta: "Porez na dohodak", formato: "moneda" },
    { clave: "zdravstveno", etiqueta: "Zdravstveno na plaću", formato: "moneda" },
    { clave: "trosak", etiqueta: "Ukupan trošak poslodavca", formato: "moneda" },
  ],
});
