import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { CAMPOS_ENTITET, obracunaj, REQUIERE_PLATA } from "../lib/plata";

export default definirCalculadora({
  id: "ba.porez-na-dohodak",
  mercado: "ba",
  concepto: "impuesto-renta",
  slug: "porez-na-dohodak",
  estado: "publicado",
  requiere: { ...REQUIERE_PLATA, "ba.topli-obrok-fbih": "numero", "ba.regres-fbih": "numero" },
  campos: [{ id: "bruto", tipo: "moneda", etiqueta: "Mjesečna bruto plata", min: 0, porDefecto: 2000 }, ...CAMPOS_ENTITET],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Unesite bruto platu veću od nule.", "bruto");
    const o = obracunaj(e.bruto, e, v, redondear);
    return {
      porez: o.porez,
      stopa: v["ba.porez"][e.region],
      odbitak: o.odbitak,
      osnovica: o.osnovicaPoreza,
      godisnje: redondear(o.porez * 12),
      efektivna: redondear((o.porez / e.bruto) * 100),
    };
  },
  resultado: [
    { clave: "porez", etiqueta: "Porez na dohodak mjesečno", formato: "moneda", destacada: true },
    { clave: "stopa", etiqueta: "Stopa poreza", formato: "porcentaje", decimales: 0 },
    { clave: "odbitak", etiqueta: "Lični odbitak", formato: "moneda" },
    { clave: "osnovica", etiqueta: "Osnovica poreza", formato: "moneda" },
    { clave: "godisnje", etiqueta: "Porez za godinu", formato: "moneda" },
    { clave: "efektivna", etiqueta: "Porez kao dio bruta", formato: "porcentaje", decimales: 2 },
  ],
});
