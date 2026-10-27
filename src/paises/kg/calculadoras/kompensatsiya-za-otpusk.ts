import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "kg.kompensatsiya-za-otpusk",
  mercado: "kg",
  concepto: "propio",
  slug: "kompensatsiya-za-otpusk",
  estado: "publicado",
  requiere: { "kg.otpusk-dney": "numero", "kg.dney-v-mesyatse": "numero" },
  campos: [
    { id: "zarabotok", tipo: "moneda", etiqueta: "Начисленная зарплата за последние 3 календарных месяца", min: 0, porDefecto: 150000 },
    {
      id: "mesyatsev",
      tipo: "entero",
      etiqueta: "Полных месяцев в текущем рабочем году",
      min: 0,
      max: 12,
      porDefecto: 7,
      ayuda: "Остаток от 13 рабочих дней округляется до полного месяца, меньше 13 не учитывается.",
    },
    { id: "ispolzovano", tipo: "entero", etiqueta: "Дней отпуска уже использовано в этом рабочем году", min: 0, max: 120, porDefecto: 0 },
    { id: "dneyOtpuska", tipo: "entero", etiqueta: "Ежегодный отпуск по договору, календарных дней", min: 1, max: 120, porDefecto: 28 },
  ],
  calcular(e, v, { redondear }) {
    if (e.zarabotok <= 0) throw new ErrorEntrada("Введите зарплату за 3 месяца больше нуля.", "zarabotok");
    if (e.dneyOtpuska < v["kg.otpusk-dney"]) throw new ErrorEntrada(`Ежегодный отпуск не может быть меньше ${v["kg.otpusk-dney"]} календарных дней.`, "dneyOtpuska");
    // Трудовой кодекс, статья 79: доли дня от 0,5 округляются до целого дня, меньше 0,5 отбрасываются.
    const zarabotano = Math.floor((e.dneyOtpuska * e.mesyatsev) / 12 + 0.5 + 1e-9);
    const neispolzovano = Math.max(0, zarabotano - e.ispolzovano);
    const sredniy = redondear(e.zarabotok / 3 / v["kg.dney-v-mesyatse"]);
    const observaciones: string[] = [];
    if (e.ispolzovano > zarabotano) {
      observaciones.push(`Вы использовали на ${e.ispolzovano - zarabotano} дн. больше, чем заработали. При увольнении по собственному желанию работодатель может удержать оплату этих дней, при сокращении и ликвидации не удерживает.`);
    }
    return { kompensatsiya: redondear(sredniy * neispolzovano), neispolzovano, zarabotano, sredniy, observaciones };
  },
  resultado: [
    { clave: "kompensatsiya", etiqueta: "Компенсация за неиспользованный отпуск", formato: "moneda", destacada: true },
    { clave: "neispolzovano", etiqueta: "Неиспользованных дней", formato: "dias" },
    { clave: "zarabotano", etiqueta: "Дней отпуска заработано в этом рабочем году", formato: "dias" },
    { clave: "sredniy", etiqueta: "Средний дневной заработок", formato: "moneda" },
  ],
});
