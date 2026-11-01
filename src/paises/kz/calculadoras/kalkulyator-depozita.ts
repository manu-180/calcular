import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "kz.kalkulyator-depozita",
  mercado: "kz",
  concepto: "plazo-fijo",
  slug: "kalkulyator-depozita",
  estado: "publicado",
  requiere: { "kz.kdif-limity": "mapa" },
  campos: [
    { id: "summa", tipo: "moneda", etiqueta: "Сумма вклада", min: 0, porDefecto: 1000000 },
    { id: "stavka", tipo: "porcentaje", etiqueta: "Ставка вознаграждения в год", min: 0, max: 100, porDefecto: 14 },
    { id: "srok", tipo: "entero", etiqueta: "Срок, месяцев", min: 1, max: 120, porDefecto: 12 },
    { id: "kapitalizatsiya", tipo: "si-no", etiqueta: "Ежемесячная капитализация процентов", porDefecto: true },
    {
      id: "vid",
      tipo: "opcion",
      etiqueta: "Вид депозита",
      opciones: [
        { valor: "sberegatelnyy", etiqueta: "Сберегательный в тенге" },
        { valor: "nesberegatelnyy", etiqueta: "Срочный или до востребования в тенге" },
        { valor: "valyuta", etiqueta: "В иностранной валюте" },
      ],
      porDefecto: "sberegatelnyy",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.summa <= 0) throw new ErrorEntrada("Введите сумму вклада больше нуля.", "summa");
    const r = e.stavka / 100 / 12;
    const itogo = e.kapitalizatsiya ? e.summa * (1 + r) ** e.srok : e.summa * (1 + r * e.srok);
    const limit = Math.min(enMapa(v["kz.kdif-limity"], e.vid), enMapa(v["kz.kdif-limity"], "sovokupno"));
    const garantiya = Math.min(itogo, limit);
    const observaciones: string[] = [];
    if (itogo > limit) observaciones.push("Часть вклада больше гарантированной суммы. Чтобы вся сумма была под гарантией, ее можно разделить между разными банками.");
    return {
      itogo: redondear(itogo),
      dokhod: redondear(itogo - e.summa),
      garantiya: redondear(garantiya),
      negarantirovano: redondear(Math.max(0, itogo - limit)),
      limit,
      observaciones,
    };
  },
  resultado: [
    { clave: "itogo", etiqueta: "Сумма в конце срока", formato: "moneda", destacada: true },
    { clave: "dokhod", etiqueta: "Доход по вкладу", formato: "moneda" },
    { clave: "garantiya", etiqueta: "Под гарантией КФГД", formato: "moneda" },
    { clave: "negarantirovano", etiqueta: "Не покрыто гарантией", formato: "moneda", ocultarSiCero: true },
    { clave: "limit", etiqueta: "Предел гарантии для этого вида", formato: "moneda" },
  ],
});
