import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

// Налоговый кодекс: ч. 1 ст. 183, ст. 191 (вычет и база), ч. 2 ст. 332. Показатель: ст. 24 закона о бюджете.
export default definirCalculadora({
  id: "tj.podokhodnyy-nalog",
  mercado: "tj",
  concepto: "impuesto-renta",
  slug: "podokhodnyy-nalog",
  estado: "publicado",
  requiere: {
    "tj.podokhodnyy-stavka": "numero",
    "tj.podokhodnyy-drugie": "mapa",
    "tj.lichnyy-vychet": "mapa",
    "tj.pokazatel": "numero",
    "tj.sn-rabotnik": "mapa",
  },
  campos: [
    { id: "dokhod", tipo: "moneda", etiqueta: "Доход по основному месту работы за месяц", min: 0, porDefecto: 5000 },
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
    if (e.dokhod <= 0) throw new ErrorEntrada("Введите доход больше нуля.", "dokhod");
    const vznos = redondear(porcentaje(e.dokhod, enMapa(v["tj.sn-rabotnik"], e.rabotodatel)));
    const vychet = Math.min(redondear(e.dokhod - vznos), enMapa(v["tj.lichnyy-vychet"], e.vychetTip) * v["tj.pokazatel"]);
    const baza = redondear(e.dokhod - vznos - vychet);
    const nalog = redondear(porcentaje(baza, v["tj.podokhodnyy-stavka"]));
    return { vychet, vznos, baza, nalog, stavka: v["tj.podokhodnyy-stavka"], nalogZaGod: redondear(nalog * 12) };
  },
  resultado: [
    { clave: "nalog", etiqueta: "Подоходный налог за месяц", formato: "moneda", destacada: true },
    { clave: "baza", etiqueta: "Облагаемый доход", formato: "moneda" },
    { clave: "vznos", etiqueta: "Социальный налог работника", formato: "moneda" },
    { clave: "vychet", etiqueta: "Личный вычет", formato: "moneda", ocultarSiCero: true },
    { clave: "stavka", etiqueta: "Ставка", formato: "porcentaje" },
    { clave: "nalogZaGod", etiqueta: "Налог за год при таком доходе", formato: "moneda" },
  ],
});
