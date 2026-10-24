import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { kopeyki, nalogPoShkale, shkalaVTenge } from "../lib/zarplata";

export default definirCalculadora({
  id: "kz.kalkulyator-ipn",
  mercado: "kz",
  concepto: "impuesto-renta",
  slug: "kalkulyator-ipn",
  estado: "publicado",
  requiere: {
    "kz.mrp": "numero",
    "kz.ipn-shkala": "escala",
    "kz.ipn-shkala-ip": "escala",
    "kz.ipn-shkala-dividendy": "escala",
    "kz.ipn-chastnaya-praktika": "numero",
  },
  campos: [
    {
      id: "vid",
      tipo: "opcion",
      etiqueta: "Вид дохода",
      opciones: [
        { valor: "zarplata", etiqueta: "Зарплата и другие доходы физического лица" },
        { valor: "ip", etiqueta: "Доход ИП на общеустановленном порядке" },
        { valor: "dividendy", etiqueta: "Дивиденды" },
        { valor: "praktika", etiqueta: "Частная практика (нотариусы, адвокаты, медиаторы)" },
      ],
      porDefecto: "zarplata",
    },
    { id: "dokhod", tipo: "moneda", etiqueta: "Облагаемый доход за год (после вычетов)", min: 0, porDefecto: 6000000 },
  ],
  calcular(e, v, { redondear }) {
    if (e.dokhod <= 0) throw new ErrorEntrada("Введите доход больше нуля.", "dokhod");
    const mrp = v["kz.mrp"];
    if (e.vid === "praktika") {
      const ipn = redondear((e.dokhod * v["kz.ipn-chastnaya-praktika"]) / 100);
      return { ipn, porog: null, sverkhPoroga: null, posleNaloga: kopeyki(e.dokhod - ipn), effektivnaya: (ipn / e.dokhod) * 100 };
    }
    const shkala = shkalaVTenge(e.vid === "ip" ? v["kz.ipn-shkala-ip"] : e.vid === "dividendy" ? v["kz.ipn-shkala-dividendy"] : v["kz.ipn-shkala"], mrp);
    const ipn = redondear(nalogPoShkale(shkala, e.dokhod));
    const porog = shkala[0].hasta ?? 0;
    return {
      ipn,
      porog,
      sverkhPoroga: Math.max(0, kopeyki(e.dokhod - porog)),
      posleNaloga: kopeyki(e.dokhod - ipn),
      effektivnaya: (ipn / e.dokhod) * 100,
    };
  },
  resultado: [
    { clave: "ipn", etiqueta: "ИПН за год", formato: "moneda", destacada: true },
    { clave: "effektivnaya", etiqueta: "Средняя ставка", formato: "porcentaje", decimales: 2 },
    { clave: "porog", etiqueta: "Порог повышенной ставки в тенге", formato: "moneda" },
    { clave: "sverkhPoroga", etiqueta: "Доход сверх порога", formato: "moneda" },
    { clave: "posleNaloga", etiqueta: "Остается после ИПН", formato: "moneda" },
  ],
});
