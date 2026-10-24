import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { podatkyZProdazhu } from "../lib/mayno";

export default definirCalculadora({
  id: "ua.podatok-z-prodazhu-avto",
  mercado: "ua",
  concepto: "propio",
  slug: "podatok-z-prodazhu-avto",
  estado: "publicado",
  requiere: {
    "ua.pdfo-prodazh-maina": "mapa",
    "ua.viiskovyi-zbir": "numero",
  },
  campos: [
    {
      id: "yakyi",
      tipo: "opcion",
      etiqueta: "Який це продаж за рік",
      opciones: [
        { valor: "pershyi", etiqueta: "Перший продаж легкового авто, мотоцикла чи мопеда за рік" },
        { valor: "druhyi", etiqueta: "Другий продаж за рік" },
        { valor: "tretii", etiqueta: "Третій і наступні" },
      ],
      porDefecto: "pershyi",
    },
    { id: "rezydent", tipo: "si-no", etiqueta: "Продавець резидент України", porDefecto: true },
    { id: "suma", tipo: "moneda", etiqueta: "Ціна авто за договором", min: 0, porDefecto: 400000 },
  ],
  calcular(e, v, { redondear }) {
    if (e.suma <= 0) throw new ErrorEntrada("Введіть ціну, більшу за нуль.", "suma");
    const st = v["ua.pdfo-prodazh-maina"];
    let stavka: number;
    if (e.yakyi === "pershyi") stavka = 0;
    else if (!e.rezydent || e.yakyi === "tretii") stavka = enMapa(st, "zahalna");
    else stavka = enMapa(st, "pilhova");
    const r = podatkyZProdazhu(e.suma, stavka, v["ua.viiskovyi-zbir"], redondear);
    const observaciones: string[] = [];
    if (stavka === 0) observaciones.push("Перший за рік продаж легкового автомобіля, мотоцикла чи мопеда не оподатковується.");
    return { razom: r.razom, pdfo: r.pdfo, vz: r.vz, stavka, zalyshyt: r.zalyshyt, observaciones };
  },
  resultado: [
    { clave: "razom", etiqueta: "Податки з продажу", formato: "moneda", destacada: true },
    { clave: "pdfo", etiqueta: "ПДФО", formato: "moneda" },
    { clave: "vz", etiqueta: "Військовий збір", formato: "moneda" },
    { clave: "stavka", etiqueta: "Ставка ПДФО", formato: "porcentaje", decimales: 0 },
    { clave: "zalyshyt", etiqueta: "Залишиться після податків", formato: "moneda" },
  ],
});
