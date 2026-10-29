import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

const NAZVANIYA = {
  usd: "доллар США (USD)",
  eur: "евро (EUR)",
  rub: "российский рубль (RUB)",
  kzt: "казахстанский тенге (KZT)",
  cny: "китайский юань (CNY)",
} as const;

export default definirCalculadora({
  id: "kg.kurs-valyut",
  mercado: "kg",
  concepto: "tipo-de-cambio",
  slug: "kurs-valyut",
  estado: "publicado",
  requiere: {
    "kg.usd": "serie",
    "kg.eur": "serie",
    "kg.rub": "serie",
    "kg.kzt": "serie",
    "kg.cny": "serie",
  },
  campos: [
    {
      id: "valyuta",
      tipo: "opcion",
      etiqueta: "Валюта",
      opciones: [
        { valor: "usd", etiqueta: "Доллар США (USD)" },
        { valor: "eur", etiqueta: "Евро (EUR)" },
        { valor: "rub", etiqueta: "Российский рубль (RUB)" },
        { valor: "kzt", etiqueta: "Казахстанский тенге (KZT)" },
        { valor: "cny", etiqueta: "Китайский юань (CNY)" },
      ],
      porDefecto: "usd",
    },
    {
      id: "napravlenie",
      tipo: "opcion",
      etiqueta: "Перевести",
      opciones: [
        { valor: "v-somy", etiqueta: "Из валюты в сомы" },
        { valor: "iz-somov", etiqueta: "Из сомов в валюту" },
      ],
      porDefecto: "v-somy",
    },
    { id: "summa", tipo: "numero", etiqueta: "Сумма", min: 0, porDefecto: 100 },
  ],
  calcular(e, v, { redondear }) {
    if (e.summa <= 0) throw new ErrorEntrada("Введите сумму больше нуля.", "summa");
    const { valor, fecha } = v[`kg.${e.valyuta}`];
    const vSomy = e.napravlenie === "v-somy";
    return {
      rezultat: redondear(vSomy ? e.summa * valor : e.summa / valor),
      valyutaRezultata: vSomy ? "сом (KGS)" : NAZVANIYA[e.valyuta],
      kurs: valor,
      obratnyy: 1 / valor,
      fecha,
      observaciones: ["Это официальный курс Национального банка. Банки и обменные бюро покупают и продают валюту по своим курсам."],
    };
  },
  resultado: [
    { clave: "rezultat", etiqueta: "Результат", formato: "numero", decimales: 2, destacada: true },
    { clave: "valyutaRezultata", etiqueta: "Валюта результата", formato: "texto" },
    { clave: "kurs", etiqueta: "Официальный курс (сомов за 1 единицу)", formato: "numero", decimales: 4 },
    { clave: "obratnyy", etiqueta: "Сколько валюты за 1 сом", formato: "numero", decimales: 6 },
    { clave: "fecha", etiqueta: "Курс действует с", formato: "fecha" },
  ],
});
