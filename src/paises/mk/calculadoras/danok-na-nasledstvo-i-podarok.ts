import { definirCalculadora, ErrorEntrada, enMapa, porcentaje } from "@/motor/calculo";
import { proveriStapka } from "../lib/plata";

export default definirCalculadora({
  id: "mk.danok-na-nasledstvo-i-podarok",
  mercado: "mk",
  concepto: "propio",
  slug: "danok-na-nasledstvo-i-podarok",
  estado: "publicado",
  requiere: { "mk.danok-na-nasledstvo": "mapa" },
  campos: [
    { id: "vrednost", tipo: "moneda", etiqueta: "Пазарна вредност на наследството или подарокот", min: 0, porDefecto: 2000000 },
    { id: "dolgovi", tipo: "moneda", etiqueta: "Долгови и трошоци поврзани со имотот", min: 0, porDefecto: 0 },
    {
      id: "red",
      tipo: "opcion",
      etiqueta: "Наследен ред",
      porDefecto: "vtor",
      opciones: [
        { valor: "prv", etiqueta: "Прв наследен ред" },
        { valor: "vtor", etiqueta: "Втор наследен ред" },
        { valor: "tret", etiqueta: "Трет наследен ред или без сродство" },
      ],
    },
    { id: "stapka", tipo: "porcentaje", etiqueta: "Стапка на вашата општина (не е задолжително)", min: 0, requerido: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.vrednost <= 0) throw new ErrorEntrada("Внесете вредност поголема од нула.", "vrednost");
    const osnovica = Math.max(0, e.vrednost - e.dolgovi);
    if (e.red === "prv") {
      return { spored: 0, najmalku: 0, najmnogu: 0, osnovica: redondear(osnovica), observaciones: ["Прв наследен ред е ослободен од данок."] };
    }
    const m = v["mk.danok-na-nasledstvo"];
    const min = enMapa(m, e.red === "vtor" ? "vtor-min" : "tret-min");
    const max = enMapa(m, e.red === "vtor" ? "vtor-max" : "tret-max");
    proveriStapka(e.stapka, min, max, "stapka");
    return {
      spored: e.stapka === null ? null : redondear(porcentaje(osnovica, e.stapka)),
      najmalku: redondear(porcentaje(osnovica, min)),
      najmnogu: redondear(porcentaje(osnovica, max)),
      osnovica: redondear(osnovica),
      observaciones: [],
    };
  },
  resultado: [
    { clave: "spored", etiqueta: "Данок според вашата стапка", formato: "moneda", destacada: true },
    { clave: "najmalku", etiqueta: "Данок со најниската стапка", formato: "moneda" },
    { clave: "najmnogu", etiqueta: "Данок со највисоката стапка", formato: "moneda" },
    { clave: "osnovica", etiqueta: "Основица", formato: "moneda" },
  ],
});
