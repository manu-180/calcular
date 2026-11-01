import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

// Указ Президента от 14.01.2026 № 1132 (официальный комментарий на president.tj). Пропорция за неполный месяц: приближение.
export default definirCalculadora({
  id: "tj.minimalnaya-zarplata",
  mercado: "tj",
  concepto: "salario-minimo",
  slug: "minimalnaya-zarplata",
  estado: "publicado",
  requiere: { "tj.mzp": "numero" },
  campos: [
    { id: "dolya", tipo: "porcentaje", etiqueta: "Какую часть месячной нормы вы отработали", min: 0, max: 100, porDefecto: 100 },
    { id: "zarplata", tipo: "moneda", etiqueta: "Ваша зарплата за месяц (по желанию)", min: 0, requerido: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.dolya <= 0) throw new ErrorEntrada("Укажите долю больше нуля.", "dolya");
    const minimum = redondear((v["tj.mzp"] * e.dolya) / 100);
    const raznitsa = e.zarplata === null ? null : redondear(e.zarplata - minimum);
    const observaciones: string[] = [];
    if (raznitsa !== null && raznitsa < 0) observaciones.push("Ваша зарплата ниже минимальной за отработанное время.");
    return { minimum, mzp: v["tj.mzp"], raznitsa, observaciones };
  },
  resultado: [
    { clave: "minimum", etiqueta: "Минимум за отработанное время", formato: "moneda", destacada: true },
    { clave: "mzp", etiqueta: "Минимальная зарплата за полный месяц", formato: "moneda" },
    { clave: "raznitsa", etiqueta: "Разница с минимумом", formato: "moneda" },
  ],
});
