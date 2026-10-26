import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { ortachaOylik } from "../lib/ortacha";

export default definirCalculadora({
  id: "uz.ortacha-ish-haqi-hisoblash",
  mercado: "uz",
  concepto: "propio",
  slug: "ortacha-ish-haqi-hisoblash",
  estado: "publicado",
  requiere: {
    "uz.ish-kunlari-ortacha": "numero",
    "uz.mhtekm": "numero",
  },
  campos: [
    { id: "jami", tipo: "moneda", etiqueta: "Oxirgi oylarda hisoblangan jami ish haqi (mukofotlar bilan)", min: 0, porDefecto: 72000000 },
    { id: "oylar", tipo: "entero", etiqueta: "Shu summa necha oyga tegishli", min: 1, max: 12, porDefecto: 12 },
    { id: "soatlar", tipo: "numero", etiqueta: "Oxirgi oyda ishlangan soatlar (soatlik ish haqi uchun)", min: 1, max: 400, porDefecto: 168, requerido: false },
  ],
  calcular(e, v, { redondear }) {
    const o = ortachaOylik("jami", e.jami, e.oylar, null, v["uz.mhtekm"]);
    const kunlik = o.oylik / v["uz.ish-kunlari-ortacha"];
    if (e.soatlar !== null && e.soatlar <= 0) throw new ErrorEntrada("Soatlar sonini kiriting.", "soatlar");
    return {
      oylik: redondear(o.oylik),
      kunlik: redondear(kunlik),
      soatlik: e.soatlar === null ? null : redondear(o.oylik / e.soatlar),
      observaciones: o.eslatma ? [o.eslatma] : [],
    };
  },
  resultado: [
    { clave: "oylik", etiqueta: "Oʻrtacha oylik ish haqi", formato: "moneda", decimales: 0, destacada: true },
    { clave: "kunlik", etiqueta: "Oʻrtacha kunlik ish haqi", formato: "moneda", decimales: 0 },
    { clave: "soatlik", etiqueta: "Oʻrtacha soatlik ish haqi", formato: "moneda", decimales: 0 },
  ],
});
