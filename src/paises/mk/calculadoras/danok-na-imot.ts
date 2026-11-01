import { definirCalculadora, ErrorEntrada, enMapa, porcentaje } from "@/motor/calculo";
import { proveriStapka } from "../lib/plata";

export default definirCalculadora({
  id: "mk.danok-na-imot",
  mercado: "mk",
  concepto: "propio",
  slug: "danok-na-imot",
  estado: "publicado",
  requiere: { "mk.danok-na-imot": "mapa" },
  campos: [
    { id: "vrednost", tipo: "moneda", etiqueta: "Пазарна вредност на имотот", min: 0, porDefecto: 3000000 },
    { id: "stapka", tipo: "porcentaje", etiqueta: "Стапка на вашата општина (не е задолжително)", min: 0, requerido: false },
    { id: "neobrabotlivo", tipo: "si-no", etiqueta: "Земјоделско земјиште што не се користи за земјоделско производство", porDefecto: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.vrednost <= 0) throw new ErrorEntrada("Внесете вредност поголема од нула.", "vrednost");
    const m = v["mk.danok-na-imot"];
    proveriStapka(e.stapka, enMapa(m, "min"), enMapa(m, "max"), "stapka");
    const faktor = e.neobrabotlivo ? 3 : 1;
    return {
      najmalku: redondear(porcentaje(e.vrednost, enMapa(m, "min")) * faktor),
      najmnogu: redondear(porcentaje(e.vrednost, enMapa(m, "max")) * faktor),
      spored: e.stapka === null ? null : redondear(porcentaje(e.vrednost, e.stapka) * faktor),
    };
  },
  resultado: [
    { clave: "spored", etiqueta: "Годишен данок според вашата стапка", formato: "moneda", destacada: true },
    { clave: "najmalku", etiqueta: "Годишен данок со најниската стапка", formato: "moneda" },
    { clave: "najmnogu", etiqueta: "Годишен данок со највисоката стапка", formato: "moneda" },
  ],
});
