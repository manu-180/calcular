import { cifrasBn } from "../bengali";
import { GRAMATICA } from "../gramatica";
import type { Diccionario } from "../resolver";
import type { TextosInicio } from "./tipos";

const g = GRAMATICA.bn;
const c = cifrasBn;

// Bengalí con «আপনি» y las formas corteses, el registro de los servicios digitales de Bangladés
// (ADR 0002, D14). Las cifras que llegan como número pasan por cifrasBn.
const base: TextosInicio = {
  arranque: {
    estasEn: (pais) => `আপনি এখন ${g.en(pais)}`,
    resumen: (calculadoras) => `${c(calculadoras)}, প্রযোজ্য সরকারি মানসহ।`,
    ultimoDato: "সর্বশেষ যোগ করা তথ্য",
    ir: (pais) => `${g.nombre(pais)} খুলুন`,
    otro: "অন্য দেশ বেছে নিন",
    argentina: "আপনার ক্যালকুলেটরগুলো আছে calcular.ar সাইটে, আর্জেন্টিনার সরকারি তথ্যসহ।",
    argentinaIr: "calcular.ar খুলুন",
    neutroTitulo: (paises) => `${c(paises)}টি দেশ, প্রতিটির নিজস্ব আইন আর মুদ্রা`,
    neutroTexto: "আমরা প্রতিদিন সরকারি সূত্রগুলো দেখে নিই।",
    neutroIr: "দেশগুলো দেখুন",
  },
  selector: {
    buscar: "দেশ খুঁজুন",
    sinResultados: (q) => `“${q}” নামে কোনো দেশ পাওয়া যায়নি`,
    ubicacion: "বর্তমান অবস্থান",
    mismaCalculadora: "একই ক্যালকুলেটর",
    paises: "দেশসমূহ",
  },
  aviso: { mismaCalculadora: (pais) => `${g.de(pais)} তথ্য দিয়ে হিসাব করুন` },
  vivo: {
    titulo: "সরকারি তথ্য, নিজে থেকেই হালনাগাদ",
    vigilado: "একটি স্বয়ংক্রিয় প্রক্রিয়া প্রতিদিন সরকারি সূত্রগুলো দেখে। নিয়মের পরিবর্তন আমরা যাচাই করার পরই কার্যকর হয়।",
    sinVigilar: "প্রতিটি মানের একটি সরকারি সূত্র আছে, সঙ্গে আমরা কবে যাচাই করেছি সেই তারিখ।",
    verificado: "নিয়মের সর্বশেষ যাচাই",
    automatico: "সর্বশেষ স্বয়ংক্রিয় তথ্য",
    fuentes: "সরকারি সূত্র",
    nFuentes: (n) => `${c(n)}টি সরকারি নথি`,
    verFuentes: "সূত্রগুলো দেখুন",
    verNovedades: "হালনাগাদ দেখুন",
    hoy: "আজ",
    ayer: "গতকাল",
    elDia: (fecha) => c(fecha),
    actualizadoSerie: (serie, cuando) => `${serie}, ${c(cuando)}`,
  },
  sello: {
    verificado: (fecha) => `${c(fecha)} তারিখে সরকারি সূত্রের সঙ্গে তথ্য মিলিয়ে দেখা হয়েছে।`,
    serie: (serie, cuando, organismo) => `${serie}: হালনাগাদ ${c(cuando)}, সর্বশেষ তথ্যের সূত্র ${organismo}।`,
    diario: "আমরা প্রতিদিন নিজে থেকেই সরকারি সূত্রগুলো দেখে নিই।",
    actualizado: "হালনাগাদ",
  },
  novedades: {
    pildora: "হালনাগাদ",
    titulo: (pais) => `${g.para(pais)} সরকারি তথ্যের পরিবর্তন`,
    acento: "যেদিন বদলায় সেদিনই",
    bajada: "ক্যালকুলেটরে যোগ হওয়া প্রতিটি নতুন সংখ্যা এখানে লেখা থাকে: কী বদলেছে, কবে থেকে কার্যকর আর কোথা থেকে এসেছে।",
    ultimoCambio: "সর্বশেষ পরিবর্তন",
    revision: "সূত্র যাচাই",
    diaria: "প্রতিদিন",
    porNorma: "নতুন নিয়ম এলেই",
    siguiendo: "যেসব সূত্র আমরা দেখি",
    masOrganismos: (n) => `আরও ${c(n)}টি`,
    proximos: "ঘোষিত, শিগগির কার্যকর",
    proximosTexto: "যে সরকারি মানগুলো যোগ করা হয়েছে এবং সামনের কয়েক দিনের মধ্যে কার্যকর হবে।",
    registro: "পরিবর্তনের খাতা",
    rss: "RSS দিয়ে অনুসরণ করুন",
    vacio: "এই দেশের জন্য এখনো কোনো পরিবর্তন লেখা হয়নি।",
    etiqueta: { editorial: "নিয়ম", dato: "নতুন সংখ্যা", proximo: "শিগগির", serie: "স্বয়ংক্রিয়", revision: "যাচাই" },
    rige: (fecha) => `${c(fecha)} থেকে কার্যকর`,
    rigeDesdeHasta: (desde, hasta) => `${c(desde)} থেকে ${c(hasta)} পর্যন্ত কার্যকর`,
    antes: (valor, fecha) => `আগে ছিল: ${c(valor)} (${c(fecha)})`,
    revisados: (n) => `আমরা ${c(n)}টি সংখ্যা সরকারি সূত্রের সঙ্গে মিলিয়ে দেখেছি`,
    revisadosTexto: (organismos) => `প্রযোজ্য মানগুলো নিশ্চিত করা হয়েছে এই সূত্রগুলো থেকে: ${organismos}।`,
    verDatos: (n) => (Number(n) === 1 ? "সংখ্যাটি দেখুন" : `${c(n)}টি সংখ্যা দেখুন`),
    calculadoras: "যেসব ক্যালকুলেটরে লাগে",
    rango: (min, max, zonas) => `অঞ্চলভেদে ${c(min)} থেকে ${c(max)} (${c(zonas)}টি অঞ্চল)`,
    tabla: (filas) => `${c(filas)} ধাপের সারণি`,
    valores: (n) => `${c(n)}টি মান`,
    pasosTitulo: "তথ্য যেভাবে হালনাগাদ থাকে",
    pasos: [
      { titulo: "প্রতিষ্ঠান প্রকাশ করে", texto: "বিধিমালা, সূচক বা বিনিময় হার প্রকাশিত হয় সরকারি সূত্রে।" },
      { titulo: "ব্যবহারের আগে যাচাই", texto: "সূচক ও বিনিময় হার নিজে থেকে আসে, মানের সীমা যাচাই করে। নিয়ম যোগ করা হয় সরকারি নথি হাতে নিয়ে।" },
      { titulo: "ক্যালকুলেটর বদলে যায়", texto: "ক্যালকুলেটর নতুন সংখ্যায় চলে যায়, আর পরিবর্তনটি সূত্রসহ এখানে লেখা থাকে।" },
    ],
    feedTitulo: (pais) => `CalcularYa-তে ${g.de(pais)} হালনাগাদ`,
    feedSubtitulo: (pais) => `${g.para(pais)} ক্যালকুলেটরে ব্যবহৃত সরকারি তথ্যের পরিবর্তন, কার্যকর তারিখ ও সূত্রসহ।`,
  },
};

export const bn: Diccionario<TextosInicio> = { base };
