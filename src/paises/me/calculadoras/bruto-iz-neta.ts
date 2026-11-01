import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { brutoIzNeta, CAMPO_PRIREZ, parametri, REQUIERE_ZARADA } from "../lib/zarada";

export default definirCalculadora({
  id: "me.bruto-iz-neta",
  mercado: "me",
  concepto: "propio",
  slug: "bruto-iz-neta",
  estado: "publicado",
  requiere: { ...REQUIERE_ZARADA, "me.minimalna-do-v": "numero", "me.minimalna-vi": "numero" },
  campos: [
    { id: "neto", tipo: "moneda", etiqueta: "Željena neto zarada", min: 0, porDefecto: 1000 },
    CAMPO_PRIREZ,
  ],
  calcular(e, v, { redondear }) {
    if (e.neto <= 0) throw new ErrorEntrada("Unesite neto zaradu veću od nule.", "neto");
    const o = brutoIzNeta(e.neto, parametri(v), e.prirez, redondear);
    return { bruto: o.bruto, doprinosi: o.doprinosi, porez: o.porez, prirez: o.prirez, dobijeniNeto: o.neto, trosakPoslodavca: o.trosakPoslodavca };
  },
  resultado: [
    { clave: "bruto", etiqueta: "Potrebna bruto zarada", formato: "moneda", destacada: true },
    { clave: "doprinosi", etiqueta: "Doprinosi iz zarade", formato: "moneda" },
    { clave: "porez", etiqueta: "Porez na dohodak", formato: "moneda" },
    { clave: "prirez", etiqueta: "Prirez", formato: "moneda" },
    { clave: "dobijeniNeto", etiqueta: "Neto iz tog bruta", formato: "moneda" },
    { clave: "trosakPoslodavca", etiqueta: "Mjesečni trošak poslodavca", formato: "moneda" },
  ],
});
