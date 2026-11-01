import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { brutoIzNeto, izracunPlace, prispevkiDelodajalca, REQ_PLACA } from "../lib/placa";

export default definirCalculadora({
  id: "si.neto-bruto-kalkulator",
  mercado: "si",
  concepto: "propio",
  slug: "neto-bruto-kalkulator",
  estado: "publicado",
  requiere: { ...REQ_PLACA },
  campos: [
    { id: "neto", tipo: "moneda", etiqueta: "Želena mesečna neto plača", min: 0, porDefecto: 1600 },
    { id: "otroci", tipo: "entero", etiqueta: "Število vzdrževanih otrok, ki jih uveljavljate", min: 0, max: 15, porDefecto: 0 },
    { id: "do29", tipo: "si-no", etiqueta: "V tem letu dopolnite največ 29 let", porDefecto: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.neto <= 0) throw new ErrorEntrada("Vnesite neto plačo, večjo od nič.", "neto");
    const raz = { otroci: e.otroci, do29: e.do29, delez: 100 };
    const bruto = brutoIzNeto(e.neto, raz, v, redondear);
    const p = izracunPlace(bruto, raz, v, redondear);
    const d = prispevkiDelodajalca(bruto, 100, v, redondear);
    return { bruto, netoDobljeno: p.neto, prispevki: p.prispevki.skupaj, akontacija: p.akontacija, strosek: redondear(bruto + d.skupaj) };
  },
  resultado: [
    { clave: "bruto", etiqueta: "Potrebna bruto plača", formato: "moneda", destacada: true },
    { clave: "netoDobljeno", etiqueta: "Neto plača pri tem bruto znesku", formato: "moneda" },
    { clave: "prispevki", etiqueta: "Prispevki delavca z OZP", formato: "moneda" },
    { clave: "akontacija", etiqueta: "Akontacija dohodnine", formato: "moneda" },
    { clave: "strosek", etiqueta: "Mesečni strošek delodajalca", formato: "moneda" },
  ],
});
