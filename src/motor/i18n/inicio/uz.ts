import { GRAMATICA } from "../gramatica";
import type { Diccionario } from "../resolver";
import type { TextosInicio } from "./tipos";

const g = GRAMATICA.uz;

// Uzbeko latino con «Siz», el registro de soliq.uz, my.gov.uz y los bancos (ADR 0002, D16). Los
// conteos van con el contador «ta» suelto («12 ta mamlakat») y ningún sufijo se pega a una cifra.
const base: TextosInicio = {
  arranque: {
    estasEn: (pais) => `Siz hozir ${g.en(pais)} boʻlsangiz kerak`,
    resumen: (calculadoras) => `Dolzarb rasmiy qiymatlar bilan ${calculadoras}.`,
    ultimoDato: "Yuklangan oxirgi maʼlumot",
    ir: (pais) => `${g.para(pais)} sahifaga oʻting`,
    otro: "Boshqa mamlakatni tanlang",
    argentina: "Kalkulyatorlaringiz calcular.ar saytida, Argentinaning rasmiy maʼlumotlari bilan.",
    argentinaIr: "calcular.ar saytiga oʻting",
    neutroTitulo: (paises) => `${paises} ta mamlakat, har biri oʻz qonunchiligi va valyutasi bilan`,
    neutroTexto: "Rasmiy manbalarni har kuni tekshiramiz.",
    neutroIr: "Mamlakatlarni koʻring",
  },
  selector: {
    buscar: "Mamlakatni qidiring",
    sinResultados: (q) => `«${q}» boʻyicha mamlakat topilmadi`,
    ubicacion: "Siz turgan joy",
    mismaCalculadora: "Shu kalkulyator",
    paises: "Mamlakatlar",
  },
  aviso: { mismaCalculadora: (pais) => `${g.de(pais)} maʼlumotlari bilan hisoblang` },
  vivo: {
    titulo: "Avtomatik yangilanadigan rasmiy maʼlumotlar",
    vigilado: "Avtomatik jarayon rasmiy manbalarni har kuni tekshiradi. Qoidalardagi oʻzgarishlar biz tasdiqlaganimizdan keyin kuchga kiradi.",
    sinVigilar: "Har bir qiymatning rasmiy manbasi va biz tekshirgan sanasi bor.",
    verificado: "Qoidalar oxirgi marta tekshirilgan sana",
    automatico: "Oxirgi avtomatik maʼlumot",
    fuentes: "Rasmiy manbalar",
    nFuentes: (n) => `${n} ta rasmiy hujjat`,
    verFuentes: "Manbalarni koʻring",
    verNovedades: "Yangilanishlarni koʻring",
    hoy: "bugun",
    ayer: "kecha",
    elDia: (fecha) => fecha,
    actualizadoSerie: (serie, cuando) => `${serie}, ${cuando}`,
  },
  sello: {
    verificado: (fecha) => `Maʼlumotlar rasmiy manbalar bilan solishtirildi. Tekshirilgan sana: ${fecha}.`,
    serie: (serie, cuando, organismo) => `${serie}: yangilangan vaqt ${cuando}, oxirgi maʼlumot manbasi: ${organismo}.`,
    diario: "Rasmiy manbalarni har kuni avtomatik tekshiramiz.",
    actualizado: "Yangilandi",
  },
  novedades: {
    pildora: "Yangilanishlar",
    titulo: (pais) => `${g.de(pais)} rasmiy maʼlumotlaridagi oʻzgarishlar`,
    acento: "oʻzgargan kuni",
    bajada: "Kalkulyatorlarga kiradigan har bir yangi raqam shu yerda qayd etiladi: nima oʻzgardi, qachon kuchga kirdi va qayerdan olindi.",
    ultimoCambio: "Oxirgi oʻzgarish",
    revision: "Manbalarni tekshirish",
    diaria: "Har kuni",
    porNorma: "Har bir yangi meʼyoriy hujjatda",
    siguiendo: "Biz kuzatadigan manbalar",
    masOrganismos: (n) => `va yana ${n} ta idora`,
    proximos: "Eʼlon qilingan, tez orada kuchga kiradi",
    proximosTexto: "Yuklangan va yaqin kunlarda kuchga kiradigan rasmiy qiymatlar.",
    registro: "Oʻzgarishlar jurnali",
    rss: "RSS orqali kuzatib boring",
    vacio: "Bu mamlakat uchun hali qayd etilgan oʻzgarish yoʻq.",
    etiqueta: { editorial: "Tahririyat", dato: "Yangi raqam", proximo: "Tez orada", serie: "Avtomatik", revision: "Tekshiruv" },
    rige: (fecha) => `Kuchga kirish sanasi: ${fecha}`,
    rigeDesdeHasta: (desde, hasta) => `Amal qilish muddati: boshlanishi ${desde}, tugashi ${hasta}`,
    antes: (valor, fecha) => `Avvalgi qiymat: ${valor} (${fecha})`,
    revisados: (n) => `${n} ta raqamni rasmiy manbalar bilan solishtirdik`,
    revisadosTexto: (organismos) => `Amaldagi qiymatlar quyidagi manbalar bilan tasdiqlandi: ${organismos}.`,
    verDatos: (n) => (n === 1 ? "Raqamni koʻring" : `${n} ta raqamni koʻring`),
    calculadoras: "Ishlatadigan kalkulyatorlar",
    rango: (min, max, zonas) => `hududga qarab eng kami ${min}, eng koʻpi ${max} (${zonas} ta hudud)`,
    tabla: (filas) => `${filas} pogʻonali jadval`,
    valores: (n) => `${n} ta qiymat`,
    pasosTitulo: "Maʼlumotlar qanday dolzarb qoladi",
    pasos: [
      { titulo: "Idora eʼlon qiladi", texto: "Meʼyoriy hujjat, indeks yoki kurs rasmiy manbada eʼlon qilinadi." },
      { titulo: "Ishlatishdan oldin tekshiriladi", texto: "Indekslar va kurslar qiymat oraligʻini tekshirish bilan avtomatik keladi. Qoidalar rasmiy hujjati qoʻlimizda boʻlganda yuklanadi." },
      { titulo: "Kalkulyator yangilanadi", texto: "Kalkulyator yangi raqamga oʻtadi va oʻzgarish manbasi bilan birga shu yerda qayd etiladi." },
    ],
    feedTitulo: (pais) => `CalcularYa: ${g.para(pais)} yangilanishlar`,
    feedSubtitulo: (pais) => `${g.para(pais)} kalkulyatorlar ishlatadigan rasmiy maʼlumotlardagi oʻzgarishlar; kuchga kirish sanalari va manbalari bilan.`,
  },
};

export const uz: Diccionario<TextosInicio> = { base };
