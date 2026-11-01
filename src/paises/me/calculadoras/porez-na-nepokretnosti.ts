import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "me.porez-na-nepokretnosti",
  mercado: "me",
  concepto: "propio",
  slug: "porez-na-nepokretnosti",
  estado: "publicado",
  requiere: { "me.nepokretnosti-min": "numero", "me.nepokretnosti-max": "numero" },
  campos: [
    { id: "vrijednost", tipo: "moneda", etiqueta: "Tržišna vrijednost nepokretnosti", min: 0, porDefecto: 100000 },
    { id: "stopa", tipo: "numero", etiqueta: "Stopa vaše opštine, u procentima", ayuda: "Nije obavezno. Bez nje kalkulator daje raspon od najniže do najviše opšte stope.", min: 0, max: 100, requerido: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.vrijednost <= 0) throw new ErrorEntrada("Unesite vrijednost veću od nule.", "vrijednost");
    const min = redondear((e.vrijednost * v["me.nepokretnosti-min"]) / 100);
    const max = redondear((e.vrijednost * v["me.nepokretnosti-max"]) / 100);
    const observaciones: string[] = [];
    if (e.stopa != null && (e.stopa < v["me.nepokretnosti-min"] || e.stopa > v["me.nepokretnosti-max"])) observaciones.push("Unijeta stopa je van opšteg raspona. Provjerite odluku opštine.");
    return { porez: e.stopa == null ? max : redondear((e.vrijednost * e.stopa) / 100), min, max, observaciones };
  },
  resultado: [
    { clave: "porez", etiqueta: "Godišnji porez", formato: "moneda", destacada: true },
    { clave: "min", etiqueta: "Po najnižoj stopi", formato: "moneda" },
    { clave: "max", etiqueta: "Po najvišoj opštoj stopi", formato: "moneda" },
  ],
});
