import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "kg.dekretnye",
  mercado: "kg",
  concepto: "propio",
  slug: "dekretnye",
  estado: "publicado",
  requiere: {
    "kg.rp": "numero",
    "kg.bolnichnye-dney-rabotodatel": "numero",
    "kg.dekretnye-rp": "numero",
    "kg.dekret-dni": "mapa",
  },
  campos: [
    { id: "zarabotok", tipo: "moneda", etiqueta: "Начисленная зарплата за 3 месяца до отпуска по беременности и родам", min: 0, porDefecto: 150000 },
    { id: "rabDney3", tipo: "entero", etiqueta: "Рабочих дней в этих 3 месяцах", min: 1, max: 80, porDefecto: 63 },
    { id: "rody", tipo: "opcion-dato", dato: "kg.dekret-dni", etiqueta: "Роды", porDefecto: "obychnye" },
  ],
  calcular(e, v, { redondear }) {
    if (e.zarabotok <= 0) throw new ErrorEntrada("Введите зарплату за 3 месяца больше нуля.", "zarabotok");
    const sredniy = redondear(e.zarabotok / e.rabDney3);
    const dney = v["kg.bolnichnye-dney-rabotodatel"];
    return {
      otRabotodatelya: redondear(sredniy * dney),
      ezhemesyachno: redondear(v["kg.dekretnye-rp"] * v["kg.rp"]),
      sredniy,
      otpusk: enMapa(v["kg.dekret-dni"], e.rody),
      observaciones: [
        "Пособие с 11-го рабочего дня выплачивается из республиканского бюджета из расчета в месяц. Калькулятор показывает месячную сумму, а не итог за весь отпуск.",
        "В высокогорных и отдаленных труднодоступных зонах отпуск длиннее, а пособие считается с районным коэффициентом.",
      ],
    };
  },
  resultado: [
    { clave: "otRabotodatelya", etiqueta: "За первые 10 рабочих дней (платит работодатель)", formato: "moneda", destacada: true },
    { clave: "ezhemesyachno", etiqueta: "С 11-го рабочего дня, в месяц (из бюджета)", formato: "moneda" },
    { clave: "sredniy", etiqueta: "Средний дневной заработок", formato: "moneda" },
    { clave: "otpusk", etiqueta: "Отпуск по беременности и родам", formato: "dias" },
  ],
});
