import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

const NAZVANIYA = { usd: "доллар США (USD)", eur: "евро (EUR)", rub: "российский рубль (RUB)", cny: "китайский юань (CNY)" } as const;

export default definirCalculadora({
  id: "kz.kurs-valyut",
  mercado: "kz",
  concepto: "tipo-de-cambio",
  slug: "kurs-valyut",
  estado: "publicado",
  requiere: {
    "kz.usd": "serie",
    "kz.eur": "serie",
    "kz.rub": "serie",
    "kz.cny": "serie",
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
      ],
      porDefecto: "usd",
    },
    {
      id: "napravlenie",
      tipo: "opcion",
      etiqueta: "Перевести",
      opciones: [
        { valor: "v-tenge", etiqueta: "Из валюты в тенге" },
        { valor: "iz-tenge", etiqueta: "Из тенге в валюту" },
      ],
      porDefecto: "v-tenge",
    },
    { id: "summa", tipo: "numero", etiqueta: "Сумма", min: 0, porDefecto: 100 },
  ],
  calcular(e, v, { redondear }) {
    if (e.summa <= 0) throw new ErrorEntrada("Введите сумму больше нуля.", "summa");
    const { valor, fecha } = v[`kz.${e.valyuta}`];
    const vTenge = e.napravlenie === "v-tenge";
    return {
      rezultat: redondear(vTenge ? e.summa * valor : e.summa / valor),
      valyutaRezultata: vTenge ? "тенге (KZT)" : NAZVANIYA[e.valyuta],
      kurs: valor,
      obratnyy: 1 / valor,
      fecha,
      observaciones: ["Это официальный курс Национального Банка. Банки и обменные пункты покупают и продают валюту по своим курсам."],
    };
  },
  resultado: [
    { clave: "rezultat", etiqueta: "Результат", formato: "numero", decimales: 2, destacada: true },
    { clave: "valyutaRezultata", etiqueta: "Валюта результата", formato: "texto" },
    { clave: "kurs", etiqueta: "Официальный курс (тенге за 1 единицу)", formato: "numero", decimales: 2 },
    { clave: "obratnyy", etiqueta: "Сколько валюты за 1 тенге", formato: "numero", decimales: 6 },
    { clave: "fecha", etiqueta: "Курс установлен на дату", formato: "fecha" },
  ],
});
