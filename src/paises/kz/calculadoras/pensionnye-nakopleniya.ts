import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "kz.pensionnye-nakopleniya",
  mercado: "kz",
  concepto: "jubilacion",
  slug: "pensionnye-nakopleniya",
  estado: "publicado",
  requiere: {
    "kz.mzp": "numero",
    "kz.opv": "numero",
    "kz.opv-maks-mzp": "numero",
    "kz.opvr": "numero",
    "kz.opvr-predely": "mapa",
  },
  campos: [
    { id: "oklad", tipo: "moneda", etiqueta: "Начисленная зарплата в месяц", min: 0, porDefecto: 500000 },
    { id: "nakopleno", tipo: "moneda", etiqueta: "Уже накоплено в ЕНПФ", min: 0, porDefecto: 0 },
    { id: "let", tipo: "entero", etiqueta: "Сколько лет еще работать", min: 1, max: 50, porDefecto: 20 },
    { id: "dokhodnost", tipo: "porcentaje", etiqueta: "Ожидаемая доходность в год", min: -20, max: 50, porDefecto: 10, ayuda: "Доходность пенсионных активов в прошлом не гарантирует ее в будущем." },
    { id: "opvr", tipo: "si-no", etiqueta: "Вы родились в 1975 году или позже (за вас платятся ОПВР)", porDefecto: true },
  ],
  calcular(e, v, { redondear }) {
    if (e.oklad < 0) throw new ErrorEntrada("Зарплата не может быть отрицательной.", "oklad");
    const mzp = v["kz.mzp"];
    const opv = (Math.min(e.oklad, v["kz.opv-maks-mzp"] * mzp) * v["kz.opv"]) / 100;
    const bazaOpvr = Math.min(Math.max(e.oklad, enMapa(v["kz.opvr-predely"], "min") * mzp), enMapa(v["kz.opvr-predely"], "maks") * mzp);
    const opvr = e.opvr && e.oklad > 0 ? (bazaOpvr * v["kz.opvr"]) / 100 : 0;
    const r = e.dokhodnost / 100 / 12;
    let balans = e.nakopleno;
    for (let m = 0; m < e.let * 12; m++) balans = balans * (1 + r) + opv + opvr;
    const svoi = opv * e.let * 12;
    const rabotodatel = opvr * e.let * 12;
    return {
      itogo: redondear(balans),
      vznosyOpv: redondear(svoi),
      vznosyOpvr: redondear(rabotodatel),
      dokhod: redondear(balans - e.nakopleno - svoi - rabotodatel),
      vMesyats: redondear(opv + opvr),
      observaciones: ["Ставка ОПВР взята на текущий год. По Социальному кодексу она будет расти в 2027 и 2028 годах, поэтому реальные накопления будут немного больше."],
    };
  },
  resultado: [
    { clave: "itogo", etiqueta: "Пенсионные накопления к концу срока", formato: "moneda", destacada: true },
    { clave: "vMesyats", etiqueta: "Взносы в месяц (ОПВ и ОПВР)", formato: "moneda" },
    { clave: "vznosyOpv", etiqueta: "Ваши ОПВ за весь срок", formato: "moneda" },
    { clave: "vznosyOpvr", etiqueta: "ОПВР работодателя за весь срок", formato: "moneda", ocultarSiCero: true },
    { clave: "dokhod", etiqueta: "Инвестиционный доход", formato: "moneda" },
  ],
});
