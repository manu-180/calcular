import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { brutoIzNeta as izracunaj, CAMPOS_ENTITET, REQUIERE_PLATA } from "../lib/plata";

export default definirCalculadora({
  id: "ba.bruto-iz-neta",
  mercado: "ba",
  concepto: "propio",
  slug: "bruto-iz-neta",
  estado: "publicado",
  requiere: { ...REQUIERE_PLATA, "ba.minimalna-fbih": "numero", "ba.minimalna-rs-neto": "mapa" },
  campos: [{ id: "neto", tipo: "moneda", etiqueta: "Neto plata koju želite", min: 0, porDefecto: 1500 }, ...CAMPOS_ENTITET],
  calcular(e, v, { redondear }) {
    if (e.neto <= 0) throw new ErrorEntrada("Unesite neto platu veću od nule.", "neto");
    const o = izracunaj(e.neto, e, v, redondear);
    return { bruto: o.bruto, doprinosi: o.doprinosi, porez: o.porez, trosak: o.trosak };
  },
  resultado: [
    { clave: "bruto", etiqueta: "Potrebna bruto plata", formato: "moneda", destacada: true },
    { clave: "doprinosi", etiqueta: "Doprinosi iz plate", formato: "moneda" },
    { clave: "porez", etiqueta: "Porez na dohodak", formato: "moneda" },
    { clave: "trosak", etiqueta: "Mjesečni trošak poslodavca", formato: "moneda" },
  ],
});
