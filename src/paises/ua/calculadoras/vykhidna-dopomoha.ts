import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { podatkyIzSumy } from "../lib/serednia";

export default definirCalculadora({
  id: "ua.vykhidna-dopomoha",
  mercado: "ua",
  concepto: "indemnizacion-despido",
  slug: "vykhidna-dopomoha",
  estado: "publicado",
  requiere: {
    "ua.vykhidna-dopomoha": "mapa",
    "ua.vykhidna-viiskova": "numero",
    "ua.minimalna-zarplata": "numero",
    "ua.pdfo": "numero",
    "ua.viiskovyi-zbir": "numero",
  },
  campos: [
    {
      id: "pidstava",
      tipo: "opcion",
      etiqueta: "Підстава звільнення",
      opciones: [
        { valor: "zahalna", etiqueta: "Скорочення, ліквідація, невідповідність посаді, відмова від переведення" },
        { valor: "viiskova", etiqueta: "Призов або вступ на військову службу" },
        { valor: "porushennia", etiqueta: "Порушення роботодавцем законодавства про працю або мобінг" },
        { valor: "posadovi", etiqueta: "Припинення повноважень посадових осіб" },
      ],
      porDefecto: "zahalna",
    },
    { id: "serednii", tipo: "moneda", etiqueta: "Середній місячний заробіток", min: 0, porDefecto: 25000, visibleSi: { pidstava: ["zahalna", "porushennia", "posadovi"] }, ayuda: "Його рахує бухгалтерія за Порядком № 100. Для оцінки можна взяти звичайну місячну зарплату." },
  ],
  calcular(e, v, { redondear }) {
    let suma: number;
    let misiatsiv: number | null = null;
    if (e.pidstava === "viiskova") {
      suma = redondear(v["ua.minimalna-zarplata"] * v["ua.vykhidna-viiskova"]);
    } else {
      if (!e.serednii || e.serednii <= 0) throw new ErrorEntrada("Введіть середній місячний заробіток, більший за нуль.", "serednii");
      misiatsiv = enMapa(v["ua.vykhidna-dopomoha"], e.pidstava);
      suma = redondear(e.serednii * misiatsiv);
    }
    const p = podatkyIzSumy(suma, v["ua.pdfo"], v["ua.viiskovyi-zbir"], redondear);
    const observaciones: string[] = [];
    if (e.pidstava !== "viiskova") observaciones.push("Закон встановлює мінімум. Колективний або трудовий договір може передбачати більшу суму.");
    return { suma, misiatsiv, pdfo: p.pdfo, vz: p.vz, naRuky: p.naRuky, observaciones };
  },
  resultado: [
    { clave: "suma", etiqueta: "Вихідна допомога (не менше)", formato: "moneda", destacada: true },
    { clave: "misiatsiv", etiqueta: "Середніх місячних заробітків", formato: "numero", decimales: 0 },
    { clave: "pdfo", etiqueta: "ПДФО", formato: "moneda" },
    { clave: "vz", etiqueta: "Військовий збір", formato: "moneda" },
    { clave: "naRuky", etiqueta: "На руки", formato: "moneda" },
  ],
});
