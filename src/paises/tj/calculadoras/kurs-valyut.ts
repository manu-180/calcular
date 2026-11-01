import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

const NAZVANIYA = {
  usd: "доллар США (USD)",
  eur: "евро (EUR)",
  rub: "российский рубль (RUB)",
  cny: "китайский юань (CNY)",
  kzt: "казахстанский тенге (KZT)",
} as const;

export default definirCalculadora({
  id: "tj.kurs-valyut",
  mercado: "tj",
  concepto: "tipo-de-cambio",
  slug: "kurs-valyut",
  estado: "publicado",
  requiere: {
    "tj.usd": "serie",
    "tj.eur": "serie",
    "tj.rub": "serie",
    "tj.cny": "serie",
    "tj.kzt": "serie",
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
        { valor: "cny", etiqueta: "Китайский юань (CNY)" },
        { valor: "kzt", etiqueta: "Казахстанский тенге (KZT)" },
      ],
      porDefecto: "usd",
    },
    {
      id: "napravlenie",
      tipo: "opcion",
      etiqueta: "Направление",
      opciones: [
        { valor: "v-somoni", etiqueta: "Из валюты в сомони" },
        { valor: "iz-somoni", etiqueta: "Из сомони в валюту" },
      ],
      porDefecto: "v-somoni",
    },
    { id: "summa", tipo: "numero", etiqueta: "Сумма", min: 0, porDefecto: 100 },
  ],
  calcular(e, v, { redondear }) {
    if (e.summa <= 0) throw new ErrorEntrada("Введите сумму больше нуля.", "summa");
    const { valor, fecha } = v[`tj.${e.valyuta}`];
    const vSomoni = e.napravlenie === "v-somoni";
    return {
      rezultat: redondear(vSomoni ? e.summa * valor : e.summa / valor),
      valyutaRezultata: vSomoni ? "сомони (TJS)" : NAZVANIYA[e.valyuta],
      kurs: valor,
      obratnyy: 1 / valor,
      fecha,
      observaciones: ["Это официальный курс Национального банка Таджикистана. Банки и обменные пункты покупают и продают валюту по своим курсам."],
    };
  },
  resultado: [
    { clave: "rezultat", etiqueta: "Результат", formato: "numero", decimales: 2, destacada: true },
    { clave: "valyutaRezultata", etiqueta: "Валюта результата", formato: "texto" },
    { clave: "kurs", etiqueta: "Официальный курс (сомони за 1 единицу)", formato: "numero", decimales: 4 },
    { clave: "obratnyy", etiqueta: "Сколько валюты за 1 сомони", formato: "numero", decimales: 6 },
    { clave: "fecha", etiqueta: "Курс установлен на дату", formato: "fecha" },
  ],
});
