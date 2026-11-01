import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { podatkyIzSumy } from "../lib/serednia";

export default definirCalculadora({
  id: "ua.ponadnormovi",
  mercado: "ua",
  concepto: "horas-extra",
  slug: "ponadnormovi",
  estado: "publicado",
  requiere: {
    "ua.nadurochni": "numero",
    "ua.pdfo": "numero",
    "ua.viiskovyi-zbir": "numero",
  },
  campos: [
    {
      id: "sposib",
      tipo: "opcion",
      etiqueta: "Як вам платять",
      opciones: [
        { valor: "oklad", etiqueta: "Місячний оклад" },
        { valor: "hodynna", etiqueta: "Погодинна ставка" },
      ],
      porDefecto: "oklad",
    },
    { id: "oklad", tipo: "moneda", etiqueta: "Оклад за місяць", min: 0, porDefecto: 25000, visibleSi: { sposib: ["oklad"] } },
    { id: "norma", tipo: "numero", etiqueta: "Норма робочих годин у місяці", min: 1, max: 300, porDefecto: 168, visibleSi: { sposib: ["oklad"] }, ayuda: "За графіком вашого підприємства. При пʼятиденці по 8 годин це кількість робочих днів, помножена на 8." },
    { id: "stavka", tipo: "moneda", etiqueta: "Годинна ставка", min: 0, porDefecto: 150, visibleSi: { sposib: ["hodynna"] } },
    { id: "hodyny", tipo: "numero", etiqueta: "Надурочних годин", min: 0, max: 500, porDefecto: 10 },
  ],
  calcular(e, v, { redondear }) {
    if (e.hodyny <= 0) throw new ErrorEntrada("Введіть кількість надурочних годин.", "hodyny");
    let hodynna: number;
    if (e.sposib === "oklad") {
      if (!e.oklad || e.oklad <= 0) throw new ErrorEntrada("Введіть оклад, більший за нуль.", "oklad");
      if (!e.norma || e.norma <= 0) throw new ErrorEntrada("Введіть норму робочих годин.", "norma");
      hodynna = redondear(e.oklad / e.norma);
    } else {
      if (!e.stavka || e.stavka <= 0) throw new ErrorEntrada("Введіть годинну ставку, більшу за нуль.", "stavka");
      hodynna = e.stavka;
    }
    const k = v["ua.nadurochni"];
    const oplata = redondear(hodynna * k * e.hodyny);
    const p = podatkyIzSumy(oplata, v["ua.pdfo"], v["ua.viiskovyi-zbir"], redondear);
    return {
      oplata,
      hodynna,
      nadurochnaHodyna: redondear(hodynna * k),
      dodatkovo: redondear(oplata - hodynna * e.hodyny),
      naRuky: p.naRuky,
    };
  },
  resultado: [
    { clave: "oplata", etiqueta: "Оплата надурочних годин", formato: "moneda", destacada: true },
    { clave: "hodynna", etiqueta: "Звичайна годинна ставка", formato: "moneda" },
    { clave: "nadurochnaHodyna", etiqueta: "Одна надурочна година", formato: "moneda" },
    { clave: "dodatkovo", etiqueta: "Більше, ніж за звичайні години", formato: "moneda" },
    { clave: "naRuky", etiqueta: "На руки після ПДФО і військового збору", formato: "moneda" },
  ],
});
