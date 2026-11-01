import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { CAMPOS_ENTITET, obracunaj, REQUIERE_PLATA } from "../lib/plata";

export default definirCalculadora({
  id: "ba.kalkulator-plate",
  mercado: "ba",
  concepto: "sueldo-neto",
  slug: "kalkulator-plate",
  estado: "publicado",
  requiere: REQUIERE_PLATA,
  campos: [{ id: "bruto", tipo: "moneda", etiqueta: "Mjesečna bruto plata", min: 0, porDefecto: 2000 }, ...CAMPOS_ENTITET],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Unesite bruto platu veću od nule.", "bruto");
    const o = obracunaj(e.bruto, e, v, redondear);
    return {
      neto: o.neto,
      doprinosi: o.doprinosi,
      porez: o.porez,
      odbitak: o.odbitak,
      osnovicaPoreza: o.osnovicaPoreza,
      netoGodisnje: redondear(o.neto * 12),
      trosak: o.trosak,
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "Neto plata mjesečno", formato: "moneda", destacada: true },
    { clave: "doprinosi", etiqueta: "Doprinosi iz plate", formato: "moneda" },
    { clave: "porez", etiqueta: "Porez na dohodak", formato: "moneda" },
    { clave: "odbitak", etiqueta: "Lični odbitak", formato: "moneda" },
    { clave: "osnovicaPoreza", etiqueta: "Osnovica poreza", formato: "moneda" },
    { clave: "netoGodisnje", etiqueta: "Neto plata za godinu", formato: "moneda" },
    { clave: "trosak", etiqueta: "Mjesečni trošak poslodavca", formato: "moneda" },
  ],
  mundo: { bruto: "bruto", periodoBruto: "mes", neto: "neto", periodoNeto: "mes", entrada: { region: "fbih", faktor: 1 } },
});
