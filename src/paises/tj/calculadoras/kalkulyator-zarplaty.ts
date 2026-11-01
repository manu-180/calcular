import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

// Налоговый кодекс: ч. 1 ст. 183 (ставка), ст. 191 (вычет в показателях, ч. 6: социальный налог работника
// вычитается из базы), ч. 2 ст. 332 (взнос работника). Показатель: ст. 24 закона о бюджете.
export default definirCalculadora({
  id: "tj.kalkulyator-zarplaty",
  mercado: "tj",
  concepto: "sueldo-neto",
  slug: "kalkulyator-zarplaty",
  estado: "publicado",
  requiere: {
    "tj.podokhodnyy-stavka": "numero",
    "tj.lichnyy-vychet": "mapa",
    "tj.pokazatel": "numero",
    "tj.sn-rabotnik": "mapa",
  },
  campos: [
    { id: "oklad", tipo: "moneda", etiqueta: "Начисленная зарплата в месяц (до удержаний)", min: 0, porDefecto: 5000 },
    {
      id: "rabotodatel",
      tipo: "opcion",
      etiqueta: "Где вы работаете",
      opciones: [
        { valor: "prochie", etiqueta: "Обычная организация" },
        { valor: "gosudarstvennye", etiqueta: "Бюджетное учреждение" },
      ],
      porDefecto: "prochie",
    },
    { id: "vychetTip", tipo: "opcion-dato", etiqueta: "Личный вычет", dato: "tj.lichnyy-vychet" },
  ],
  calcular(e, v, { redondear }) {
    if (e.oklad <= 0) throw new ErrorEntrada("Введите зарплату больше нуля.", "oklad");
    const vznos = redondear(porcentaje(e.oklad, enMapa(v["tj.sn-rabotnik"], e.rabotodatel)));
    const vychet = Math.min(redondear(e.oklad - vznos), enMapa(v["tj.lichnyy-vychet"], e.vychetTip) * v["tj.pokazatel"]);
    const baza = redondear(e.oklad - vznos - vychet);
    const nalog = redondear(porcentaje(baza, v["tj.podokhodnyy-stavka"]));
    const netto = redondear(e.oklad - vznos - nalog);
    return {
      netto,
      vznos,
      vychet,
      baza,
      nalog,
      nettoZaGod: redondear(netto * 12),
      observaciones: ["Расчет для основного места работы и полного месяца. Вычет не применяется, если человек был наемным работником меньше 16 календарных дней за месяц."],
    };
  },
  resultado: [
    { clave: "netto", etiqueta: "На руки в месяц", formato: "moneda", destacada: true },
    { clave: "vznos", etiqueta: "Социальный налог работника", formato: "moneda" },
    { clave: "vychet", etiqueta: "Личный вычет", formato: "moneda", ocultarSiCero: true },
    { clave: "baza", etiqueta: "Облагаемый доход", formato: "moneda" },
    { clave: "nalog", etiqueta: "Подоходный налог", formato: "moneda" },
    { clave: "nettoZaGod", etiqueta: "На руки за год", formato: "moneda" },
  ],
  mundo: { bruto: "oklad", periodoBruto: "mes", neto: "netto", periodoNeto: "mes", entrada: { rabotodatel: "prochie", vychetTip: "obychnyy" } },
});
