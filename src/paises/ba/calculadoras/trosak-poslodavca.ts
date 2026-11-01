import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { CAMPOS_ENTITET, obracunaj, REQUIERE_PLATA } from "../lib/plata";

export default definirCalculadora({
  id: "ba.trosak-poslodavca",
  mercado: "ba",
  concepto: "costo-empleador",
  slug: "trosak-poslodavca",
  estado: "publicado",
  requiere: REQUIERE_PLATA,
  campos: [{ id: "bruto", tipo: "moneda", etiqueta: "Mjesečna bruto plata radnika", min: 0, porDefecto: 2000 }, ...CAMPOS_ENTITET],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Unesite bruto platu veću od nule.", "bruto");
    const o = obracunaj(e.bruto, e, v, redondear);
    return {
      trosak: o.trosak,
      naPlatu: o.naPlatu,
      godisnje: redondear(o.trosak * 12),
      neto: o.neto,
      observaciones: e.region === "fbih" ? ["Obračun obuhvata samo doprinose na platu. Kantonalne i posebne naknade na platu nisu uključene."] : [],
    };
  },
  resultado: [
    { clave: "trosak", etiqueta: "Mjesečni trošak poslodavca", formato: "moneda", destacada: true },
    { clave: "naPlatu", etiqueta: "Doprinosi poslodavca povrh bruta", formato: "moneda" },
    { clave: "godisnje", etiqueta: "Trošak za godinu", formato: "moneda" },
    { clave: "neto", etiqueta: "Radniku na račun", formato: "moneda" },
  ],
});
