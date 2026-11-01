import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "kg.raschet-pri-uvolnenii",
  mercado: "kg",
  concepto: "liquidacion-final",
  slug: "raschet-pri-uvolnenii",
  estado: "publicado",
  requiere: { "kg.dney-v-mesyatse": "numero", "kg.vykhodnoe-posobie": "mapa", "kg.zaderzhka-zarplaty": "numero" },
  campos: [
    {
      id: "osnovanie",
      tipo: "opcion",
      etiqueta: "Основание увольнения",
      opciones: [
        { valor: "sobstvennoe", etiqueta: "По собственному желанию или по соглашению сторон" },
        { valor: "likvidatsiya", etiqueta: "Ликвидация организации" },
        { valor: "sokrashchenie", etiqueta: "Сокращение численности или штата" },
        { valor: "zdorovye", etiqueta: "Несоответствие должности по состоянию здоровья" },
        { valor: "pereezd", etiqueta: "Отказ от перевода в другую местность вместе с работодателем" },
        { valor: "prizyv", etiqueta: "Призыв на военную службу или перевод супруга в другую местность" },
        { valor: "vosstanovlenie", etiqueta: "Восстановление на этой работе прежнего работника" },
      ],
      porDefecto: "sokrashchenie",
    },
    { id: "oklad", tipo: "moneda", etiqueta: "Оклад за месяц", min: 0, porDefecto: 50000 },
    { id: "norma", tipo: "entero", etiqueta: "Рабочих дней в месяце увольнения по графику", min: 1, max: 31, porDefecto: 22 },
    { id: "otrabotano", tipo: "entero", etiqueta: "Отработано дней в месяце увольнения", min: 0, max: 31, porDefecto: 10 },
    { id: "zarabotok3", tipo: "moneda", etiqueta: "Начислено за последние 3 календарных месяца", min: 0, porDefecto: 150000 },
    {
      id: "otpusk",
      tipo: "entero",
      etiqueta: "Неиспользованных дней отпуска",
      min: 0,
      max: 365,
      porDefecto: 14,
      ayuda: "Календарные дни. Их можно посчитать в калькуляторе компенсации за отпуск.",
    },
    { id: "zarabotok12", tipo: "moneda", etiqueta: "Начислено за последние 12 месяцев", min: 0, porDefecto: 600000 },
  ],
  calcular(e, v, { redondear }) {
    if (e.otrabotano > e.norma) throw new ErrorEntrada("Отработанных дней не может быть больше, чем рабочих дней по графику.", "otrabotano");
    if (e.otpusk > 0 && e.zarabotok3 <= 0) throw new ErrorEntrada("Для компенсации за отпуск введите зарплату за 3 месяца.", "zarabotok3");
    const mapa = v["kg.vykhodnoe-posobie"];
    const mesyatsev = mapa[e.osnovanie] ?? 0;
    if (mesyatsev > 0 && e.zarabotok12 <= 0) throw new ErrorEntrada("Для выходного пособия введите зарплату за 12 месяцев.", "zarabotok12");
    const zarplata = redondear((e.oklad / e.norma) * e.otrabotano);
    const sredniyDen = redondear(e.zarabotok3 / 3 / v["kg.dney-v-mesyatse"]);
    const kompensatsiya = redondear(sredniyDen * e.otpusk);
    const posobie = redondear((e.zarabotok12 / 12) * mesyatsev);
    const itogo = zarplata + kompensatsiya + posobie;
    const observaciones = [
      "Все суммы выплачиваются не позднее последнего дня работы. Суммы показаны до удержания подоходного налога и взносов.",
    ];
    if (mesyatsev === 0) observaciones.push("При этом основании выходное пособие по закону не положено, но трудовой или коллективный договор может его предусмотреть.");
    return { itogo, zarplata, kompensatsiya, posobie, sredniyDen, observaciones };
  },
  resultado: [
    { clave: "itogo", etiqueta: "Итого при увольнении", formato: "moneda", destacada: true },
    { clave: "zarplata", etiqueta: "Зарплата за отработанные дни", formato: "moneda" },
    { clave: "kompensatsiya", etiqueta: "Компенсация за неиспользованный отпуск", formato: "moneda" },
    { clave: "posobie", etiqueta: "Выходное пособие (не меньше)", formato: "moneda", ocultarSiCero: true },
    { clave: "sredniyDen", etiqueta: "Средний дневной заработок для отпуска", formato: "moneda" },
  ],
});
