import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

const ANUN = { usd: "ԱՄՆ դոլար (USD)", eur: "Եվրո (EUR)", rub: "Ռուսական ռուբլի (RUB)", gbp: "Բրիտանական ֆունտ (GBP)", gel: "Վրացական լարի (GEL)" } as const;

export default definirCalculadora({
  id: "am.pokharzheki-hashvich",
  mercado: "am",
  concepto: "tipo-de-cambio",
  slug: "pokharzheki-hashvich",
  estado: "publicado",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  requiere: { "am.usd": "serie", "am.eur": "serie", "am.rub": "serie", "am.gbp": "serie", "am.gel": "serie" },
  campos: [
    {
      id: "arzhuyt",
      tipo: "opcion",
      etiqueta: "Արժույթ",
      opciones: [
        { valor: "usd", etiqueta: "ԱՄՆ դոլար (USD)" },
        { valor: "eur", etiqueta: "Եվրո (EUR)" },
        { valor: "rub", etiqueta: "Ռուսական ռուբլի (RUB)" },
        { valor: "gbp", etiqueta: "Բրիտանական ֆունտ (GBP)" },
        { valor: "gel", etiqueta: "Վրացական լարի (GEL)" },
      ],
      porDefecto: "usd",
    },
    {
      id: "ughghutyun",
      tipo: "opcion",
      etiqueta: "Փոխարկում",
      opciones: [
        { valor: "dram", etiqueta: "Արժույթից դրամ" },
        { valor: "arzhuyt", etiqueta: "Դրամից արժույթ" },
      ],
      porDefecto: "dram",
    },
    { id: "gumar", tipo: "numero", etiqueta: "Գումար", min: 0, porDefecto: 100 },
  ],
  calcular(e, v, { redondear }) {
    if (e.gumar <= 0) throw new ErrorEntrada("Մուտքագրեք զրոյից մեծ գումար։", "gumar");
    const { valor, fecha } = v[`am.${e.arzhuyt}`];
    const dram = e.ughghutyun === "dram";
    return {
      ardyunq: redondear(dram ? e.gumar * valor : e.gumar / valor),
      arzhuyt: dram ? "Հայկական դրամ (AMD)" : ANUN[e.arzhuyt],
      kurs: valor,
      fecha,
      observaciones: ["Սա Կենտրոնական բանկի սահմանած փոխարժեքն է։ Բանկերն ու փոխանակման կետերը կիրառում են իրենց առք ու վաճառքի փոխարժեքները։"],
    };
  },
  resultado: [
    { clave: "ardyunq", etiqueta: "Արդյունք", formato: "numero", decimales: 2, destacada: true },
    { clave: "arzhuyt", etiqueta: "Արդյունքի արժույթը", formato: "texto" },
    { clave: "kurs", etiqueta: "ԿԲ փոխարժեք (դրամ մեկ միավորի համար)", formato: "numero", decimales: 4 },
    { clave: "fecha", etiqueta: "Փոխարժեքի ամսաթիվը", formato: "fecha" },
  ],
});
