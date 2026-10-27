import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "kg.minimalnaya-zarplata",
  mercado: "kg",
  concepto: "salario-minimo",
  slug: "minimalnaya-zarplata",
  estado: "publicado",
  requiere: { "kg.mzp": "numero" },
  campos: [
    { id: "dolya", tipo: "porcentaje", etiqueta: "Какую часть нормы рабочего времени вы отработали", min: 0, max: 100, porDefecto: 100 },
    { id: "zarplata", tipo: "moneda", etiqueta: "Ваша зарплата за месяц (необязательно)", min: 0, requerido: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.dolya <= 0) throw new ErrorEntrada("Укажите долю больше нуля.", "dolya");
    const minimum = redondear((v["kg.mzp"] * e.dolya) / 100);
    const raznitsa = e.zarplata === null ? null : redondear(e.zarplata - minimum);
    const observaciones: string[] = [];
    if (raznitsa !== null && raznitsa < 0) observaciones.push("Зарплата ниже минимальной для отработанного времени. Работодатель обязан доплатить разницу.");
    return { minimum, mzp: v["kg.mzp"], raznitsa, observaciones };
  },
  resultado: [
    { clave: "minimum", etiqueta: "Минимальная зарплата за отработанное время", formato: "moneda", destacada: true },
    { clave: "mzp", etiqueta: "Минимальная заработная плата за полный месяц", formato: "moneda" },
    { clave: "raznitsa", etiqueta: "Ваша зарплата выше минимума на", formato: "moneda" },
  ],
});
