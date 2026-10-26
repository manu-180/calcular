import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "kz.otpusknye",
  mercado: "kz",
  concepto: "vacaciones",
  slug: "otpusknye",
  estado: "publicado",
  requiere: { "kz.otpusk-dney": "numero" },
  campos: [
    { id: "zarabotok", tipo: "moneda", etiqueta: "Начисленная зарплата за 12 месяцев до отпуска", min: 0, porDefecto: 6000000, ayuda: "С премиями и надбавками постоянного характера, без отпускных, больничных и материальной помощи." },
    { id: "dneyRaboty", tipo: "entero", etiqueta: "Рабочих дней за эти 12 месяцев (по балансу рабочего времени)", min: 1, max: 366, porDefecto: 247 },
    { id: "dneyOtpuska", tipo: "entero", etiqueta: "Рабочих дней, на которые приходится отпуск", min: 1, max: 200, porDefecto: 20 },
  ],
  calcular(e, v, { redondear }) {
    if (e.zarabotok <= 0) throw new ErrorEntrada("Введите зарплату за 12 месяцев больше нуля.", "zarabotok");
    if (e.dneyRaboty <= 0) throw new ErrorEntrada("Укажите количество рабочих дней больше нуля.", "dneyRaboty");
    const sredniy = redondear(e.zarabotok / e.dneyRaboty);
    return {
      otpusknye: redondear(sredniy * e.dneyOtpuska),
      sredniy,
      dneyOtpuska: e.dneyOtpuska,
      polozheno: v["kz.otpusk-dney"],
      observaciones: ["С отпускных удерживаются ОПВ, ВОСМС и ИПН так же, как с зарплаты. Калькулятор показывает сумму до удержаний."],
    };
  },
  resultado: [
    { clave: "otpusknye", etiqueta: "Отпускные (до удержаний)", formato: "moneda", destacada: true },
    { clave: "sredniy", etiqueta: "Средний дневной заработок", formato: "moneda" },
    { clave: "dneyOtpuska", etiqueta: "Оплачиваемых рабочих дней", formato: "dias" },
    { clave: "polozheno", etiqueta: "Основной ежегодный отпуск по закону (календарных дней)", formato: "dias" },
  ],
});
