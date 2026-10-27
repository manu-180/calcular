import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "kg.vykhodnoe-posobie",
  mercado: "kg",
  concepto: "indemnizacion-despido",
  slug: "vykhodnoe-posobie",
  estado: "publicado",
  requiere: { "kg.vykhodnoe-posobie": "mapa" },
  campos: [
    { id: "zarabotok", tipo: "moneda", etiqueta: "Начисленная зарплата за последние 12 месяцев", min: 0, porDefecto: 600000 },
    { id: "osnovanie", tipo: "opcion-dato", dato: "kg.vykhodnoe-posobie", etiqueta: "Основание увольнения", porDefecto: "sokrashchenie" },
  ],
  calcular(e, v, { redondear }) {
    if (e.zarabotok <= 0) throw new ErrorEntrada("Введите зарплату за 12 месяцев больше нуля.", "zarabotok");
    const sredniy = redondear(e.zarabotok / 12);
    const mesyatsev = enMapa(v["kg.vykhodnoe-posobie"], e.osnovanie);
    const observaciones: string[] = [];
    if (e.osnovanie === "likvidatsiya" || e.osnovanie === "sokrashchenie") {
      observaciones.push("Если в течение 10 рабочих дней после увольнения встать на учет в службе занятости, средняя зарплата сохраняется на время поиска работы до 3 месяцев с учетом выходного пособия.");
    }
    return { posobie: redondear(sredniy * mesyatsev), sredniy, mesyatsev, observaciones };
  },
  resultado: [
    { clave: "posobie", etiqueta: "Выходное пособие (не меньше)", formato: "moneda", destacada: true },
    { clave: "sredniy", etiqueta: "Среднемесячный заработок", formato: "moneda" },
    { clave: "mesyatsev", etiqueta: "Среднемесячных заработков", formato: "numero" },
  ],
});
