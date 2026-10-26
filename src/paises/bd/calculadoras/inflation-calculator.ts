import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { cifrasBn } from "@/motor/i18n/bengali";

const MESES = ["জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"];

export default definirCalculadora({
  id: "bd.inflation-calculator",
  mercado: "bd",
  concepto: "propio",
  slug: "inflation-calculator",
  estado: "publicado",
  requiere: {
    "bd.inflation": "serie",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "আজকের দাম বা টাকার পরিমাণ", min: 0, porDefecto: 10000 },
    { id: "anios", tipo: "entero", etiqueta: "কত বছর পরের হিসাব", min: 1, max: 50, porDefecto: 5 },
    { id: "tasaPropia", tipo: "porcentaje", etiqueta: "ভিন্ন মূল্যস্ফীতির হার (বছরে)", ayuda: "ঐচ্ছিক। খালি রাখলে বিবিএসের সর্বশেষ হার ধরা হবে।", min: 0, max: 100, requerido: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.monto <= 0) throw new ErrorEntrada("টাকার পরিমাণ লিখুন।", "monto");
    const serie = v["bd.inflation"];
    const tasa = entrada.tasaPropia ?? serie.valor;
    const factor = (1 + tasa / 100) ** entrada.anios;
    const [anio, mes] = serie.fecha.split("-").map(Number);
    return {
      futuro: redondear(entrada.monto * factor),
      poder: redondear(entrada.monto / factor),
      aumento: (factor - 1) * 100,
      tasa,
      mesDato: `${MESES[mes - 1]} ${cifrasBn(anio)}`,
    };
  },
  resultado: [
    { clave: "futuro", etiqueta: "একই জিনিস কিনতে তখন লাগবে", formato: "moneda", destacada: true },
    { clave: "poder", etiqueta: "আজকের টাকার তখনকার ক্রয়ক্ষমতা", formato: "moneda" },
    { clave: "aumento", etiqueta: "মোট দাম বৃদ্ধি", formato: "porcentaje", decimales: 2 },
    { clave: "tasa", etiqueta: "ধরা মূল্যস্ফীতির হার (বছরে)", formato: "porcentaje", decimales: 2 },
    { clave: "mesDato", etiqueta: "বিবিএসের সর্বশেষ হারের মাস", formato: "texto" },
  ],
});
