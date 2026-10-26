import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

const NAZVY = {
  zarplata: "зарплата або винагорода за договором",
  orenda: "оренда майна",
  dyvRezydent: "дивіденди від української компанії, платника податку на прибуток",
  dyvInshi: "дивіденди від нерезидента, ІСІ або неплатника податку на прибуток",
  pasyvni: "проценти, роялті, інвестиційний прибуток",
  vyhrash: "виграш або приз",
  inozemni: "іноземний дохід",
} as const;

export default definirCalculadora({
  id: "ua.kalkuliator-pdfo",
  mercado: "ua",
  concepto: "impuesto-renta",
  slug: "kalkuliator-pdfo",
  estado: "publicado",
  requiere: {
    "ua.pdfo": "numero",
    "ua.viiskovyi-zbir": "numero",
    "ua.dyvidendy": "mapa",
  },
  campos: [
    {
      id: "vyd",
      tipo: "opcion",
      etiqueta: "Вид доходу",
      opciones: [
        { valor: "zarplata", etiqueta: "Зарплата або договір ЦПХ" },
        { valor: "orenda", etiqueta: "Оренда квартири чи іншого майна" },
        { valor: "dyvRezydent", etiqueta: "Дивіденди від української компанії" },
        { valor: "dyvInshi", etiqueta: "Дивіденди від нерезидента або ІСІ" },
        { valor: "pasyvni", etiqueta: "Проценти, роялті, інвестиційний прибуток" },
        { valor: "vyhrash", etiqueta: "Виграш або приз" },
        { valor: "inozemni", etiqueta: "Іноземний дохід" },
      ],
      porDefecto: "orenda",
    },
    { id: "suma", tipo: "moneda", etiqueta: "Сума доходу", min: 0, porDefecto: 15000 },
  ],
  calcular(e, v, { redondear }) {
    if (e.suma <= 0) throw new ErrorEntrada("Введіть суму доходу, більшу за нуль.", "suma");
    const stavka =
      e.vyd === "dyvRezydent" ? enMapa(v["ua.dyvidendy"], "rezydent") : e.vyd === "dyvInshi" ? enMapa(v["ua.dyvidendy"], "inshi") : v["ua.pdfo"];
    const pdfo = redondear(porcentaje(e.suma, stavka));
    const vz = redondear(porcentaje(e.suma, v["ua.viiskovyi-zbir"]));
    const observaciones: string[] = [];
    if (e.vyd === "orenda") observaciones.push("Якщо дохід платить не податковий агент (наприклад, орендар фізична особа), ви подаєте декларацію про майновий стан і доходи і сплачуєте податки самі. Якщо платить податковий агент, податки утримує він.");
    if (e.vyd === "inozemni") observaciones.push("Іноземні доходи потрібно відобразити в декларації про майновий стан і доходи.");
    return {
      chystyi: redondear(e.suma - pdfo - vz),
      pdfo,
      vz,
      razom: redondear(pdfo + vz),
      stavka,
      vyd: NAZVY[e.vyd],
      observaciones,
    };
  },
  resultado: [
    { clave: "chystyi", etiqueta: "Залишиться після податків", formato: "moneda", destacada: true },
    { clave: "pdfo", etiqueta: "ПДФО", formato: "moneda" },
    { clave: "vz", etiqueta: "Військовий збір", formato: "moneda" },
    { clave: "razom", etiqueta: "Усього податків", formato: "moneda" },
    { clave: "stavka", etiqueta: "Ставка ПДФО", formato: "porcentaje", decimales: 0 },
    { clave: "vyd", etiqueta: "Вид доходу", formato: "texto" },
  ],
});
