import { definirCalculadora, ErrorEntrada, enMapa, porcentaje } from "@/motor/calculo";
import { proveriStapka } from "../lib/plata";

export default definirCalculadora({
  id: "mk.danok-na-promet-na-nedvizhnosti",
  mercado: "mk",
  concepto: "propio",
  slug: "danok-na-promet-na-nedvizhnosti",
  estado: "publicado",
  requiere: { "mk.danok-na-promet": "mapa" },
  campos: [
    { id: "vrednost", tipo: "moneda", etiqueta: "Пазарна вредност на недвижноста", min: 0, porDefecto: 3000000 },
    { id: "stapka", tipo: "porcentaje", etiqueta: "Стапка на вашата општина (не е задолжително)", min: 0, requerido: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.vrednost <= 0) throw new ErrorEntrada("Внесете вредност поголема од нула.", "vrednost");
    const m = v["mk.danok-na-promet"];
    proveriStapka(e.stapka, enMapa(m, "min"), enMapa(m, "max"), "stapka");
    const najmalku = redondear(porcentaje(e.vrednost, enMapa(m, "min")));
    const najmnogu = redondear(porcentaje(e.vrednost, enMapa(m, "max")));
    return { najmalku, najmnogu, spored: e.stapka === null ? null : redondear(porcentaje(e.vrednost, e.stapka)) };
  },
  resultado: [
    { clave: "spored", etiqueta: "Данок според вашата стапка", formato: "moneda", destacada: true },
    { clave: "najmalku", etiqueta: "Данок со најниската стапка", formato: "moneda" },
    { clave: "najmnogu", etiqueta: "Данок со највисоката стапка", formato: "moneda" },
  ],
});
