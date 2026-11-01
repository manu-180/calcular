import { definirCalculadora } from "@/motor/calculo";
import { CAMPO_DRUGI_STUP, CAMPO_GRAD, obracunaj, REQUIERE_PLACA } from "../lib/placa";

export default definirCalculadora({
  id: "hr.minimalna-placa",
  mercado: "hr",
  concepto: "salario-minimo",
  slug: "minimalna-placa",
  estado: "publicado",
  requiere: { ...REQUIERE_PLACA, "hr.minimalna-placa": "numero" },
  campos: [CAMPO_GRAD, CAMPO_DRUGI_STUP],
  calcular(e, v, { redondear }) {
    const o = obracunaj(v["hr.minimalna-placa"], { grad: e.grad, drugiStup: e.drugiStup, djeca: 0, uzdrzavani: 0 }, v, redondear);
    return { neto: o.neto, bruto: o.bruto, doprinosi: o.doprinosi, porez: o.porez, trosak: o.trosak };
  },
  resultado: [
    { clave: "neto", etiqueta: "Neto minimalna plaća", formato: "moneda", destacada: true },
    { clave: "bruto", etiqueta: "Bruto minimalna plaća", formato: "moneda" },
    { clave: "doprinosi", etiqueta: "Mirovinski doprinosi", formato: "moneda" },
    { clave: "porez", etiqueta: "Porez na dohodak", formato: "moneda" },
    { clave: "trosak", etiqueta: "Trošak poslodavca", formato: "moneda" },
  ],
});
