import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

const NAZVY = { usd: "долар США (USD)", eur: "євро (EUR)", pln: "польський злотий (PLN)", gbp: "фунт стерлінгів (GBP)" } as const;

export default definirCalculadora({
  id: "ua.kurs-valiut-nbu",
  mercado: "ua",
  concepto: "tipo-de-cambio",
  slug: "kurs-valiut-nbu",
  estado: "publicado",
  requiere: {
    "ua.usd": "serie",
    "ua.eur": "serie",
    "ua.pln": "serie",
    "ua.gbp": "serie",
  },
  campos: [
    {
      id: "valiuta",
      tipo: "opcion",
      etiqueta: "Валюта",
      opciones: [
        { valor: "usd", etiqueta: "Долар США (USD)" },
        { valor: "eur", etiqueta: "Євро (EUR)" },
        { valor: "pln", etiqueta: "Польський злотий (PLN)" },
        { valor: "gbp", etiqueta: "Фунт стерлінгів (GBP)" },
      ],
      porDefecto: "usd",
    },
    {
      id: "napriamok",
      tipo: "opcion",
      etiqueta: "Перерахувати",
      opciones: [
        { valor: "v-hryvni", etiqueta: "З валюти в гривні" },
        { valor: "z-hryven", etiqueta: "З гривень у валюту" },
      ],
      porDefecto: "v-hryvni",
    },
    { id: "suma", tipo: "numero", etiqueta: "Сума", min: 0, porDefecto: 100 },
  ],
  calcular(e, v, { redondear }) {
    if (e.suma <= 0) throw new ErrorEntrada("Введіть суму, більшу за нуль.", "suma");
    const { valor, fecha } = v[`ua.${e.valiuta}`];
    const vHryvni = e.napriamok === "v-hryvni";
    return {
      rezultat: redondear(vHryvni ? e.suma * valor : e.suma / valor),
      valiutaRezultatu: vHryvni ? "гривня (UAH)" : NAZVY[e.valiuta],
      kurs: valor,
      obernenyi: 1 / valor,
      fecha,
      observaciones: ["Це офіційний курс НБУ. Банки та обмінники купують і продають валюту за власними курсами."],
    };
  },
  resultado: [
    { clave: "rezultat", etiqueta: "Після перерахунку", formato: "numero", decimales: 2, destacada: true },
    { clave: "valiutaRezultatu", etiqueta: "Валюта результату", formato: "texto" },
    { clave: "kurs", etiqueta: "Офіційний курс НБУ (грн за 1 одиницю)", formato: "numero", decimales: 4 },
    { clave: "obernenyi", etiqueta: "Скільки валюти за 1 грн", formato: "numero", decimales: 4 },
    { clave: "fecha", etiqueta: "Дата курсу", formato: "fecha" },
  ],
});
