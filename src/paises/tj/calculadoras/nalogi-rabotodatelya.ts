import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

// Черновик: ставка социального налога работодателя найдена только во вторичных источниках.
export default definirCalculadora({
  id: "tj.nalogi-rabotodatelya",
  mercado: "tj",
  concepto: "costo-empleador",
  slug: "nalogi-rabotodatelya",
  estado: "borrador",
  requiere: { "tj.sn-rabotodatel": "mapa" },
  campos: [
    { id: "oklad", tipo: "moneda", etiqueta: "Зарплата сотрудника в месяц", min: 0, porDefecto: 5000 },
    { id: "sotrudniki", tipo: "entero", etiqueta: "Сколько сотрудников", min: 1, max: 10000, porDefecto: 1 },
    {
      id: "rabotodatel",
      tipo: "opcion",
      etiqueta: "Тип организации",
      opciones: [
        { valor: "prochie", etiqueta: "Негосударственная организация" },
        { valor: "gosudarstvennye", etiqueta: "Государственное учреждение" },
      ],
      porDefecto: "prochie",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.oklad <= 0) throw new ErrorEntrada("Введите зарплату больше нуля.", "oklad");
    const nalogNaOdnogo = redondear(porcentaje(e.oklad, enMapa(v["tj.sn-rabotodatel"], e.rabotodatel)));
    const rashodNaOdnogo = redondear(e.oklad + nalogNaOdnogo);
    return {
      rashodNaOdnogo,
      nalogNaOdnogo,
      rashodVsego: redondear(rashodNaOdnogo * e.sotrudniki),
      rashodZaGod: redondear(rashodNaOdnogo * e.sotrudniki * 12),
    };
  },
  resultado: [
    { clave: "rashodNaOdnogo", etiqueta: "Расходы на одного сотрудника в месяц", formato: "moneda", destacada: true },
    { clave: "nalogNaOdnogo", etiqueta: "Социальный налог работодателя", formato: "moneda" },
    { clave: "rashodVsego", etiqueta: "Расходы на всех в месяц", formato: "moneda" },
    { clave: "rashodZaGod", etiqueta: "Расходы на всех за год", formato: "moneda" },
  ],
});
