import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

// Черновик: ставки социального налога и подоходного налога найдены только во вторичных источниках,
// размер личного вычета не найден (сайты ncz.tj и andoz.tj не открылись). См. datos.json.
export default definirCalculadora({
  id: "tj.kalkulyator-zarplaty",
  mercado: "tj",
  concepto: "sueldo-neto",
  slug: "kalkulyator-zarplaty",
  estado: "borrador",
  requiere: {
    "tj.podokhodnyy-stavka": "numero",
    "tj.lichnyy-vychet": "numero",
    "tj.sn-rabotnik": "mapa",
  },
  campos: [
    { id: "oklad", tipo: "moneda", etiqueta: "Начисленная зарплата в месяц (до удержаний)", min: 0, porDefecto: 5000 },
    {
      id: "rabotodatel",
      tipo: "opcion",
      etiqueta: "Где вы работаете",
      opciones: [
        { valor: "prochie", etiqueta: "Негосударственная организация" },
        { valor: "gosudarstvennye", etiqueta: "Государственное учреждение" },
      ],
      porDefecto: "prochie",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.oklad <= 0) throw new ErrorEntrada("Введите зарплату больше нуля.", "oklad");
    const vznos = redondear(porcentaje(e.oklad, enMapa(v["tj.sn-rabotnik"], e.rabotodatel)));
    const vychet = Math.min(e.oklad, v["tj.lichnyy-vychet"]);
    const baza = redondear(e.oklad - vychet);
    const nalog = redondear(porcentaje(baza, v["tj.podokhodnyy-stavka"]));
    const netto = redondear(e.oklad - vznos - nalog);
    return {
      netto,
      vznos,
      vychet,
      baza,
      nalog,
      nettoZaGod: redondear(netto * 12),
      observaciones: ["Расчет приблизительный: он не учитывает льготы и особые случаи. Точную сумму назовет бухгалтерия работодателя."],
    };
  },
  resultado: [
    { clave: "netto", etiqueta: "На руки в месяц", formato: "moneda", destacada: true },
    { clave: "vznos", etiqueta: "Взнос работника", formato: "moneda" },
    { clave: "vychet", etiqueta: "Личный вычет", formato: "moneda", ocultarSiCero: true },
    { clave: "baza", etiqueta: "Облагаемый доход", formato: "moneda" },
    { clave: "nalog", etiqueta: "Подоходный налог", formato: "moneda" },
    { clave: "nettoZaGod", etiqueta: "На руки за год", formato: "moneda" },
  ],
  mundo: { bruto: "oklad", periodoBruto: "mes", neto: "netto", periodoNeto: "mes", entrada: { rabotodatel: "prochie" } },
});
