import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "kz.minimalnaya-zarplata",
  mercado: "kz",
  concepto: "salario-minimo",
  slug: "minimalnaya-zarplata",
  estado: "publicado",
  requiere: { "kz.mzp": "numero" },
  campos: [
    { id: "oklad", tipo: "moneda", etiqueta: "Ваша зарплата за месяц (до вычета налогов)", min: 0, porDefecto: 85000 },
    { id: "dolya", tipo: "porcentaje", etiqueta: "Какую часть месячной нормы рабочего времени вы отработали", min: 1, max: 100, porDefecto: 100 },
    { id: "normaChasov", tipo: "numero", etiqueta: "Норма часов в месяц по балансу рабочего времени (необязательно)", min: 1, max: 300, requerido: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.oklad < 0) throw new ErrorEntrada("Зарплата не может быть отрицательной.", "oklad");
    const mzp = v["kz.mzp"];
    const minimum = redondear((mzp * e.dolya) / 100);
    const raznitsa = redondear(e.oklad - minimum);
    return {
      minimum,
      mzp,
      raznitsa,
      vyvod: raznitsa >= 0 ? "Зарплата не ниже минимальной" : "Зарплата ниже минимальной",
      chasovoy: e.normaChasov ? redondear(mzp / e.normaChasov) : null,
      zaGod: redondear(mzp * 12),
    };
  },
  resultado: [
    { clave: "minimum", etiqueta: "Минимальная зарплата за отработанное время", formato: "moneda", destacada: true },
    { clave: "vyvod", etiqueta: "Итог", formato: "texto" },
    { clave: "raznitsa", etiqueta: "Разница с минимумом", formato: "moneda" },
    { clave: "mzp", etiqueta: "МЗП за полный месяц", formato: "moneda" },
    { clave: "chasovoy", etiqueta: "Минимальная оплата часа", formato: "moneda" },
    { clave: "zaGod", etiqueta: "МЗП за 12 месяцев", formato: "moneda" },
  ],
});
