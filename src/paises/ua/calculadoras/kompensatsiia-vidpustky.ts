import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { podatkyIzSumy, serednodenna } from "../lib/serednia";

export default definirCalculadora({
  id: "ua.kompensatsiia-vidpustky",
  mercado: "ua",
  concepto: "propio",
  slug: "kompensatsiia-vidpustky",
  estado: "publicado",
  requiere: {
    "ua.pdfo": "numero",
    "ua.viiskovyi-zbir": "numero",
  },
  campos: [
    { id: "zarobitok", tipo: "moneda", etiqueta: "Заробіток за 12 місяців перед звільненням", min: 0, porDefecto: 204000, ayuda: "За останні 12 календарних місяців роботи, що передують місяцю виплати." },
    { id: "dni", tipo: "entero", etiqueta: "Календарних днів у цих 12 місяцях", min: 1, max: 366, porDefecto: 365 },
    { id: "dniKompensatsii", tipo: "entero", etiqueta: "Невикористаних днів відпустки", min: 1, max: 1000, porDefecto: 15 },
  ],
  calcular(e, v, { redondear }) {
    if (e.dniKompensatsii <= 0) throw new ErrorEntrada("Введіть кількість невикористаних днів.", "dniKompensatsii");
    const sd = serednodenna(e.zarobitok, e.dni, redondear, { zarobitok: "zarobitok", dni: "dni" });
    const kompensatsiia = redondear(sd * e.dniKompensatsii);
    const p = podatkyIzSumy(kompensatsiia, v["ua.pdfo"], v["ua.viiskovyi-zbir"], redondear);
    return { kompensatsiia, serednodenna: sd, pdfo: p.pdfo, vz: p.vz, naRuky: p.naRuky };
  },
  resultado: [
    { clave: "kompensatsiia", etiqueta: "Компенсація (нараховано)", formato: "moneda", destacada: true },
    { clave: "serednodenna", etiqueta: "Середньоденна зарплата", formato: "moneda" },
    { clave: "pdfo", etiqueta: "ПДФО", formato: "moneda" },
    { clave: "vz", etiqueta: "Військовий збір", formato: "moneda" },
    { clave: "naRuky", etiqueta: "Компенсація на руки", formato: "moneda" },
  ],
});
