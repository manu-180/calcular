import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { CAMPOS_ENTITET, obracunaj, REQUIERE_PLATA } from "../lib/plata";

export default definirCalculadora({
  id: "ba.doprinosi",
  mercado: "ba",
  concepto: "aportes-seguridad-social",
  slug: "doprinosi",
  estado: "publicado",
  requiere: REQUIERE_PLATA,
  campos: [{ id: "bruto", tipo: "moneda", etiqueta: "Mjesečna bruto plata", min: 0, porDefecto: 2000 }, ...CAMPOS_ENTITET],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Unesite bruto platu veću od nule.", "bruto");
    const o = obracunaj(e.bruto, { ...e, faktor: 1, izdrzavani: 0 }, v, redondear);
    return { ukupno: o.doprinosi, pio: o.pio, zdravstvo: o.zdravstvo, nezaposlenost: o.nezaposlenost, djecija: e.region === "rs" ? o.djecija : null, poslodavac: o.naPlatu };
  },
  resultado: [
    { clave: "ukupno", etiqueta: "Doprinosi iz plate ukupno", formato: "moneda", destacada: true },
    { clave: "pio", etiqueta: "Penzijsko i invalidsko osiguranje", formato: "moneda" },
    { clave: "zdravstvo", etiqueta: "Zdravstveno osiguranje", formato: "moneda" },
    { clave: "nezaposlenost", etiqueta: "Osiguranje od nezaposlenosti", formato: "moneda" },
    { clave: "djecija", etiqueta: "Dječija zaštita", formato: "moneda" },
    { clave: "poslodavac", etiqueta: "Doprinosi poslodavca povrh bruta", formato: "moneda", ocultarSiCero: true },
  ],
});
