import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { aDia, laborablesEntre, OPCIONES_FIN_DE_SEMANA } from "../lib/fechas";

const MAX_DIAS = 36600;

export default definirCalculadora({
  id: "bd.working-days-calculator",
  mercado: "bd",
  concepto: "dias-entre-fechas",
  slug: "working-days-calculator",
  estado: "publicado",
  requiere: {},
  campos: [
    { id: "desde", tipo: "fecha", etiqueta: "শুরুর তারিখ", porDefecto: "hoy" },
    { id: "hasta", tipo: "fecha", etiqueta: "শেষের তারিখ", porDefecto: "2026-12-31" },
    { id: "incluir", tipo: "si-no", etiqueta: "শেষের দিনটিও গুনবেন", porDefecto: true },
    { id: "finde", tipo: "opcion", etiqueta: "সাপ্তাহিক ছুটি", opciones: OPCIONES_FIN_DE_SEMANA, porDefecto: "fri" },
    { id: "feriados", tipo: "entero", etiqueta: "এর মধ্যে কর্মদিবসে পড়া সরকারি ছুটি", ayuda: "ঐচ্ছিক। ঈদ, পূজা বা জাতীয় দিবসের ছুটি যেগুলো সাপ্তাহিক ছুটির দিনে পড়েনি।", min: 0, max: 400, requerido: false },
  ],
  calcular(entrada) {
    let a = aDia(entrada.desde);
    let b = aDia(entrada.hasta);
    const observaciones: string[] = [];
    if (a > b) {
      [a, b] = [b, a];
      observaciones.push("শেষের তারিখ শুরুর আগে ছিল, তাই তারিখ দুটি অদলবদল করে হিসাব করা হয়েছে।");
    }
    const fin = b + (entrada.incluir ? 1 : 0);
    const dias = fin - a;
    if (dias > MAX_DIAS) throw new ErrorEntrada("একশো বছরের বেশি সময়ের হিসাব করা যায় না।", "hasta");
    const laborables = laborablesEntre(a, fin, entrada.finde);
    const feriados = entrada.feriados ?? 0;
    if (feriados > laborables) throw new ErrorEntrada("সরকারি ছুটির সংখ্যা কর্মদিবসের চেয়ে বেশি হতে পারে না।", "feriados");
    return {
      habiles: laborables - feriados,
      dias,
      descanso: dias - laborables,
      feriados,
      observaciones,
    };
  },
  resultado: [
    { clave: "habiles", etiqueta: "কর্মদিবস", formato: "dias", destacada: true },
    { clave: "dias", etiqueta: "মোট দিন", formato: "dias" },
    { clave: "descanso", etiqueta: "সাপ্তাহিক ছুটির দিন", formato: "dias" },
    { clave: "feriados", etiqueta: "বাদ দেওয়া সরকারি ছুটি", formato: "dias", ocultarSiCero: true },
  ],
});
