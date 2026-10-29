import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "kg.otpusknye",
  mercado: "kg",
  concepto: "vacaciones",
  slug: "otpusknye",
  estado: "publicado",
  requiere: { "kg.otpusk-dney": "numero", "kg.dney-v-mesyatse": "numero" },
  campos: [
    { id: "zarabotok", tipo: "moneda", etiqueta: "Начисленная зарплата за последние 3 календарных месяца", min: 0, porDefecto: 150000 },
    { id: "dney", tipo: "entero", etiqueta: "Календарных дней отпуска", min: 1, max: 120, porDefecto: 28 },
  ],
  calcular(e, v, { redondear }) {
    if (e.zarabotok <= 0) throw new ErrorEntrada("Введите зарплату за 3 месяца больше нуля.", "zarabotok");
    if (e.dney <= 0) throw new ErrorEntrada("Укажите хотя бы один день отпуска.", "dney");
    const sredniy = redondear(e.zarabotok / 3 / v["kg.dney-v-mesyatse"]);
    return {
      otpusknye: redondear(sredniy * e.dney),
      sredniy,
      dney: e.dney,
      polozheno: v["kg.otpusk-dney"],
      observaciones: ["С отпускных удерживаются страховые взносы и подоходный налог так же, как с зарплаты. Калькулятор показывает сумму до удержаний."],
    };
  },
  resultado: [
    { clave: "otpusknye", etiqueta: "Отпускные (до удержаний)", formato: "moneda", destacada: true },
    { clave: "sredniy", etiqueta: "Средний дневной заработок", formato: "moneda" },
    { clave: "dney", etiqueta: "Оплачиваемых календарных дней", formato: "dias" },
    { clave: "polozheno", etiqueta: "Основной ежегодный отпуск по закону", formato: "dias" },
  ],
});
