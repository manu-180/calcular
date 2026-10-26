import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { podatkyZProdazhu } from "../lib/mayno";

export default definirCalculadora({
  id: "ua.podatok-z-prodazhu-neruhomosti",
  mercado: "ua",
  concepto: "propio",
  slug: "podatok-z-prodazhu-neruhomosti",
  estado: "publicado",
  requiere: {
    "ua.pdfo-prodazh-maina": "mapa",
    "ua.viiskovyi-zbir": "numero",
  },
  campos: [
    {
      id: "vypadok",
      tipo: "opcion",
      etiqueta: "Ваш випадок",
      opciones: [
        { valor: "pilha", etiqueta: "Перший продаж за рік житла або ділянки в межах норми, у власності понад 3 роки, або спадщина (до двох обʼєктів)" },
        { valor: "druhyi", etiqueta: "Другий продаж за рік, у власності менше 3 років або третя і наступна спадщина" },
        { valor: "tretii", etiqueta: "Третій і наступні продажі за рік" },
        { valor: "nerezydent", etiqueta: "Продавець нерезидент (крім пільгового продажу)" },
      ],
      porDefecto: "druhyi",
    },
    { id: "suma", tipo: "moneda", etiqueta: "Вартість обʼєкта за договором", min: 0, porDefecto: 2000000 },
  ],
  calcular(e, v, { redondear }) {
    if (e.suma <= 0) throw new ErrorEntrada("Введіть вартість, більшу за нуль.", "suma");
    const st = v["ua.pdfo-prodazh-maina"];
    const stavka = e.vypadok === "pilha" ? 0 : e.vypadok === "druhyi" ? enMapa(st, "pilhova") : enMapa(st, "zahalna");
    const r = podatkyZProdazhu(e.suma, stavka, v["ua.viiskovyi-zbir"], redondear);
    const observaciones: string[] = [];
    if (stavka === 0) observaciones.push("Такий продаж не оподатковується ПДФО, тому військовий збір теж не сплачують.");
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
