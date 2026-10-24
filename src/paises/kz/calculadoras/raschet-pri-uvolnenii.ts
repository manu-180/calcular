import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "kz.raschet-pri-uvolnenii",
  mercado: "kz",
  concepto: "liquidacion-final",
  slug: "raschet-pri-uvolnenii",
  estado: "publicado",
  requiere: { "kz.kompensatsiya-poterya-raboty": "mapa" },
  campos: [
    { id: "zarabotok", tipo: "moneda", etiqueta: "Начисленная зарплата за 12 месяцев до увольнения", min: 0, porDefecto: 6000000 },
    { id: "dneyRaboty", tipo: "entero", etiqueta: "Рабочих дней за эти 12 месяцев (по балансу рабочего времени)", min: 1, max: 366, porDefecto: 247 },
    { id: "dneyOtpuska", tipo: "entero", etiqueta: "Рабочих дней, на которые приходятся неиспользованные дни отпуска", min: 0, max: 400, porDefecto: 10, ayuda: "Считаются со следующего рабочего дня после даты увольнения." },
    { id: "zarplata", tipo: "moneda", etiqueta: "Зарплата за отработанные дни последнего месяца", min: 0, porDefecto: 0 },
    { id: "kompensatsiya", tipo: "si-no", etiqueta: "Положена компенсация в связи с потерей работы", porDefecto: false },
    { id: "prichina", tipo: "opcion-dato", dato: "kz.kompensatsiya-poterya-raboty", etiqueta: "Основание увольнения", porDefecto: "sokrashchenie", visibleSi: { kompensatsiya: [true] } },
    { id: "dneyMesyatsa", tipo: "entero", etiqueta: "Рабочих дней в месяце для расчета средней месячной зарплаты", min: 1, max: 31, porDefecto: 21, visibleSi: { kompensatsiya: [true] } },
  ],
  calcular(e, v, { redondear }) {
    if (e.zarabotok <= 0) throw new ErrorEntrada("Введите зарплату за 12 месяцев больше нуля.", "zarabotok");
    const sredniy = redondear(e.zarabotok / e.dneyRaboty);
    const zaOtpusk = redondear(sredniy * e.dneyOtpuska);
    let poteryaRaboty = 0;
    if (e.kompensatsiya && e.prichina !== null && e.dneyMesyatsa !== null) {
      poteryaRaboty = redondear(sredniy * e.dneyMesyatsa * enMapa(v["kz.kompensatsiya-poterya-raboty"], e.prichina));
    }
    return {
      itogo: redondear(zaOtpusk + poteryaRaboty + e.zarplata),
      sredniy,
      zaOtpusk,
      poteryaRaboty,
      zarplata: e.zarplata,
      observaciones: ["С компенсации за отпуск и зарплаты удерживаются ОПВ, ВОСМС и ИПН. Калькулятор показывает суммы до удержаний."],
    };
  },
  resultado: [
    { clave: "itogo", etiqueta: "Всего к начислению при увольнении", formato: "moneda", destacada: true },
    { clave: "zaOtpusk", etiqueta: "Компенсация за неиспользованный отпуск", formato: "moneda" },
    { clave: "poteryaRaboty", etiqueta: "Компенсация в связи с потерей работы", formato: "moneda", ocultarSiCero: true },
    { clave: "zarplata", etiqueta: "Зарплата за последний месяц", formato: "moneda", ocultarSiCero: true },
    { clave: "sredniy", etiqueta: "Средний дневной заработок", formato: "moneda" },
  ],
});
