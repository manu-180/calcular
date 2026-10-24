import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "kz.transportnyy-nalog",
  mercado: "kz",
  concepto: "propio",
  slug: "transportnyy-nalog",
  estado: "publicado",
  requiere: {
    "kz.mrp": "numero",
    "kz.transportnyy-nalog-legkovye": "escala",
    "kz.transportnyy-nalog-nadbavka": "numero",
    "kz.transportnyy-nalog-vozrast": "mapa",
  },
  campos: [
    { id: "obyem", tipo: "entero", etiqueta: "Объем двигателя, куб. см", min: 1, max: 20000, porDefecto: 2000 },
    {
      id: "vozrast",
      tipo: "opcion",
      etiqueta: "Срок эксплуатации (по году выпуска)",
      opciones: [
        { valor: "do-10", etiqueta: "До 10 лет включительно" },
        { valor: "10-20", etiqueta: "Больше 10 и до 20 лет" },
        { valor: "svyshe-20", etiqueta: "Больше 20 лет" },
      ],
      porDefecto: "do-10",
    },
    { id: "mesyatsy", tipo: "entero", etiqueta: "Сколько месяцев в году автомобиль был вашим", min: 1, max: 12, porDefecto: 12 },
  ],
  calcular(e, v, { redondear }) {
    if (e.obyem <= 0) throw new ErrorEntrada("Введите объем двигателя.", "obyem");
    const shkala = v["kz.transportnyy-nalog-legkovye"];
    // Границы «до N включительно»: строка выбирается по первому превышению нижней границы.
    let stroka = shkala[0];
    for (const f of shkala) if (e.obyem > f.desde) stroka = f;
    const mrp = v["kz.mrp"];
    const poStavke = stroka.tasa * mrp;
    const nadbavka = stroka.desde >= 1500 ? (e.obyem - stroka.desde) * v["kz.transportnyy-nalog-nadbavka"] : 0;
    const koeffitsient = e.vozrast === "do-10" ? 1 : enMapa(v["kz.transportnyy-nalog-vozrast"], e.vozrast);
    const zaGod = redondear((poStavke + nadbavka) * koeffitsient);
    return {
      nalog: redondear((zaGod * e.mesyatsy) / 12),
      zaGod,
      stavkaMrp: stroka.tasa,
      poStavke: redondear(poStavke),
      nadbavka: redondear(nadbavka),
      koeffitsient,
    };
  },
  resultado: [
    { clave: "nalog", etiqueta: "Налог на транспорт", formato: "moneda", destacada: true },
    { clave: "zaGod", etiqueta: "Налог за полный год", formato: "moneda" },
    { clave: "stavkaMrp", etiqueta: "Ставка, МРП", formato: "numero" },
    { clave: "poStavke", etiqueta: "Сумма по ставке", formato: "moneda" },
    { clave: "nadbavka", etiqueta: "Надбавка за объем сверх нижней границы", formato: "moneda", ocultarSiCero: true },
    { clave: "koeffitsient", etiqueta: "Поправочный коэффициент по возрасту", formato: "numero", decimales: 1 },
  ],
});
