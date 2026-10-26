import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { podatkyIzSumy, serednodenna } from "../lib/serednia";

export default definirCalculadora({
  id: "ua.rozrakhunok-vidpusknykh",
  mercado: "ua",
  concepto: "vacaciones",
  slug: "rozrakhunok-vidpusknykh",
  estado: "publicado",
  requiere: {
    "ua.vidpustka": "numero",
    "ua.pdfo": "numero",
    "ua.viiskovyi-zbir": "numero",
  },
  campos: [
    { id: "zarobitok", tipo: "moneda", etiqueta: "Заробіток за 12 місяців перед відпусткою", min: 0, porDefecto: 300000, ayuda: "Зарплата, премії та доплати за останні 12 повних календарних місяців. Без лікарняних і разових виплат." },
    { id: "dni", tipo: "entero", etiqueta: "Календарних днів у цих 12 місяцях", min: 1, max: 366, porDefecto: 365, ayuda: "Відніміть дні, коли ви не працювали і заробіток не зберігався: лікарняний, відпустка без збереження зарплати." },
    { id: "dniVidpustky", tipo: "entero", etiqueta: "Днів відпустки", min: 1, max: 366, porDefecto: 24 },
  ],
  calcular(e, v, { redondear }) {
    if (e.dniVidpustky <= 0) throw new ErrorEntrada("Введіть кількість днів відпустки.", "dniVidpustky");
    const sd = serednodenna(e.zarobitok, e.dni, redondear, { zarobitok: "zarobitok", dni: "dni" });
    const vidpuskni = redondear(sd * e.dniVidpustky);
    const p = podatkyIzSumy(vidpuskni, v["ua.pdfo"], v["ua.viiskovyi-zbir"], redondear);
    const observaciones: string[] = [];
    if (e.dniVidpustky > v["ua.vidpustka"]) observaciones.push(`Під час воєнного стану щорічну основну відпустку надають тривалістю ${v["ua.vidpustka"]} календарні дні. Перевірте, чи ваші дні належать до інших видів відпустки.`);
    return { vidpuskni, serednodenna: sd, pdfo: p.pdfo, vz: p.vz, naRuky: p.naRuky, observaciones };
  },
  resultado: [
    { clave: "vidpuskni", etiqueta: "Відпускні (нараховано)", formato: "moneda", destacada: true },
    { clave: "serednodenna", etiqueta: "Середньоденна зарплата", formato: "moneda" },
    { clave: "pdfo", etiqueta: "ПДФО", formato: "moneda" },
    { clave: "vz", etiqueta: "Військовий збір", formato: "moneda" },
    { clave: "naRuky", etiqueta: "Відпускні на руки", formato: "moneda" },
  ],
});
