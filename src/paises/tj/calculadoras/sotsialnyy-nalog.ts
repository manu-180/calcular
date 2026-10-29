import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

// Черновик: ставки найдены только во вторичных источниках (см. datos.json).
export default definirCalculadora({
  id: "tj.sotsialnyy-nalog",
  mercado: "tj",
  concepto: "aportes-seguridad-social",
  slug: "sotsialnyy-nalog",
  estado: "borrador",
  requiere: {
    "tj.sn-rabotodatel": "mapa",
    "tj.sn-rabotnik": "mapa",
  },
  campos: [
    { id: "fond", tipo: "moneda", etiqueta: "Начисленная зарплата за месяц", min: 0, porDefecto: 5000 },
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
    if (e.fond <= 0) throw new ErrorEntrada("Введите зарплату больше нуля.", "fond");
    const rabotodatel = redondear(porcentaje(e.fond, enMapa(v["tj.sn-rabotodatel"], e.rabotodatel)));
    const rabotnik = redondear(porcentaje(e.fond, enMapa(v["tj.sn-rabotnik"], e.rabotodatel)));
    return { rabotodatel, rabotnik, vsego: redondear(rabotodatel + rabotnik) };
  },
  resultado: [
    { clave: "rabotodatel", etiqueta: "Платит работодатель", formato: "moneda", destacada: true },
    { clave: "rabotnik", etiqueta: "Удерживается с работника", formato: "moneda" },
    { clave: "vsego", etiqueta: "Всего в месяц", formato: "moneda" },
  ],
});
