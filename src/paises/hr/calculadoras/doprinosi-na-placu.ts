import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { CAMPO_DRUGI_STUP, obracunaj, REQUIERE_PLACA } from "../lib/placa";

export default definirCalculadora({
  id: "hr.doprinosi-na-placu",
  mercado: "hr",
  concepto: "aportes-seguridad-social",
  slug: "doprinosi-na-placu",
  estado: "publicado",
  requiere: { ...REQUIERE_PLACA, "hr.prosjek-naredba": "numero", "hr.najniza-osnovica": "numero", "hr.najvisa-godisnja": "numero" },
  campos: [{ id: "bruto", tipo: "moneda", etiqueta: "Bruto plaća mjesečno", min: 0, porDefecto: 2000 }, CAMPO_DRUGI_STUP],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Unesite bruto plaću veću od nule.", "bruto");
    const o = obracunaj(e.bruto, { grad: "zagreb", drugiStup: e.drugiStup, djeca: 0, uzdrzavani: 0 }, v, redondear);
    return { ukupno: redondear(o.doprinosi + o.zdravstveno), mioI: o.mioI, mioII: o.mioII, umanjenje: o.umanjenje, doprinosi: o.doprinosi, zdravstveno: o.zdravstveno };
  },
  resultado: [
    { clave: "ukupno", etiqueta: "Svi doprinosi mjesečno", formato: "moneda", destacada: true },
    { clave: "mioI", etiqueta: "Mirovinsko, I. stup (iz plaće)", formato: "moneda" },
    { clave: "mioII", etiqueta: "Mirovinsko, II. stup (iz plaće)", formato: "moneda", ocultarSiCero: true },
    { clave: "umanjenje", etiqueta: "Umanjenje osnovice I. stupa", formato: "moneda", ocultarSiCero: true },
    { clave: "doprinosi", etiqueta: "Ukupno iz plaće", formato: "moneda" },
    { clave: "zdravstveno", etiqueta: "Zdravstveno (na plaću)", formato: "moneda" },
  ],
});
