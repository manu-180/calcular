import { GRAMATICA } from "../gramatica";
import type { Diccionario } from "../resolver";
import type { TextosInicio } from "./tipos";

const g = GRAMATICA.ka;

// Georgiano: «თქვენ» con formas corteses; el país con GRAMATICA.ka y los números en singular detrás de
// la cifra («5 ქვეყანა»). Las fechas y las cifras van tras dos puntos, nunca con un sufijo pegado.
const base: TextosInicio = {
  arranque: {
    estasEn: (pais) => `ქვეყანა: ${g.nombre(pais)}`,
    resumen: (calculadoras) => `${calculadoras}, მოქმედი ოფიციალური მნიშვნელობებით.`,
    ultimoDato: "ბოლოს ჩატვირთული მონაცემი",
    ir: (pais) => `კალკულატორები ${g.para(pais)}`,
    otro: "სხვა ქვეყნის არჩევა",
    argentina: "თქვენი კალკულატორები calcular.ar-ზეა, არგენტინის ოფიციალური მონაცემებით.",
    argentinaIr: "calcular.ar-ზე გადასვლა",
    neutroTitulo: (paises) => `${paises} ქვეყანა, თითოეული საკუთარი კანონებითა და ვალუტით`,
    neutroTexto: "ოფიციალურ წყაროებს ყოველდღე ვამოწმებთ.",
    neutroIr: "ქვეყნების ნახვა",
  },
  selector: {
    buscar: "მოძებნეთ ქვეყანა",
    sinResultados: (q) => `ქვეყანა ვერ მოიძებნა. საძიებო სიტყვა: „${q}“`,
    ubicacion: "თქვენი ამჟამინდელი მდებარეობა",
    mismaCalculadora: "იგივე კალკულატორი",
    paises: "ქვეყნები",
  },
  aviso: { mismaCalculadora: (pais) => `გამოთვლა ${g.de(pais)} მონაცემებით` },
  vivo: {
    titulo: "ოფიციალური მონაცემები, რომლებიც თავად ახლდება",
    vigilado: "ავტომატური პროცესი ყოველდღე ამოწმებს ოფიციალურ წყაროებს. წესების ცვლილებები ჩვენი შემოწმების შემდეგ ჩნდება.",
    sinVigilar: "ყოველ მნიშვნელობას აქვს ოფიციალური წყარო და შემოწმების თარიღი.",
    verificado: "წესების ბოლო შემოწმება",
    automatico: "ბოლო ავტომატური მონაცემი",
    fuentes: "ოფიციალური წყაროები",
    nFuentes: (n) => `${n} ოფიციალური დოკუმენტი`,
    verFuentes: "წყაროების ნახვა",
    verNovedades: "სიახლეების ნახვა",
    hoy: "დღეს",
    ayer: "გუშინ",
    elDia: (fecha) => `${fecha}`,
    actualizadoSerie: (serie, cuando) => `${serie}, განახლდა: ${cuando}`,
  },
  sello: {
    verificado: (fecha) => `მონაცემები შედარებულია ოფიციალურ წყაროსთან. თარიღი: ${fecha}.`,
    serie: (serie, cuando, organismo) => `${serie}. განახლდა: ${cuando}. ბოლო მნიშვნელობის გამომქვეყნებელი: ${organismo}.`,
    diario: "ოფიციალურ წყაროებს ყოველდღე ავტომატურად ვამოწმებთ.",
    actualizado: "განახლდა",
  },
  novedades: {
    pildora: "სიახლეები",
    titulo: (pais) => `რა შეიცვალა ${g.de(pais)} ოფიციალურ მონაცემებში`,
    acento: "ცვლილების დღესვე",
    bajada: "აქ ვიწერთ ყოველ ახალ მნიშვნელობას, რომელიც კალკულატორებში ხვდება: რა შეიცვალა, როდიდან მოქმედებს და საიდან მოდის.",
    ultimoCambio: "ბოლო ცვლილება",
    revision: "წყაროების შემოწმება",
    diaria: "ყოველდღე",
    porNorma: "ყოველი ახალი წესის გამოცემისას",
    siguiendo: "წყაროები, რომლებსაც თვალს ვადევნებთ",
    masOrganismos: (n) => `და კიდევ ${n}`,
    proximos: "გამოქვეყნებულია, მალე შევა ძალაში",
    proximosTexto: "ოფიციალური მნიშვნელობები, რომლებიც უკვე ჩავტვირთეთ და უახლოეს დღეებში შევა ძალაში.",
    registro: "ცვლილებების ჟურნალი",
    rss: "RSS-ით გამოწერა",
    vacio: "ამ ქვეყნისთვის ცვლილებები ჯერ არ დაგვიფიქსირებია.",
    etiqueta: { editorial: "წესი", dato: "ახალი მნიშვნელობა", proximo: "მალე", serie: "ავტომატური", revision: "შემოწმება" },
    rige: (fecha) => `ძალაშია თარიღიდან: ${fecha}`,
    rigeDesdeHasta: (desde, hasta) => `მოქმედების დასაწყისი: ${desde}, დასასრული: ${hasta}`,
    antes: (valor, fecha) => `ადრე: ${valor} (${fecha})`,
    revisados: (n) => `ოფიციალურ წყაროსთან შედარებული მნიშვნელობები: ${n}`,
    revisadosTexto: (organismos) => `მოქმედი მნიშვნელობები დაადასტურეს წყაროებმა: ${organismos}.`,
    verDatos: (n) => (Number(n) === 1 ? "მნიშვნელობის ნახვა" : `მნიშვნელობების ნახვა (${n})`),
    calculadoras: "იყენებს",
    rango: (min, max, zonas) => `მინიმუმი: ${min}, მაქსიმუმი: ${max}, რეგიონების მიხედვით (სულ ${zonas} რეგიონი)`,
    tabla: (filas) => `ცხრილი: ${filas} საფეხური`,
    valores: (n) => `${n} მნიშვნელობა`,
    pasosTitulo: "ასე რჩება მონაცემები განახლებული",
    pasos: [
      { titulo: "უწყება აქვეყნებს", texto: "ოფიციალურ წყაროში ჩნდება ახალი წესი, ინდექსი ან გაცვლითი კურსი." },
      { titulo: "შემოწმება გამოყენებამდე", texto: "ინდექსები და გაცვლითი კურსები ავტომატურად მოდის და მათ ზღვრებს ვამოწმებთ. წესებს ხელით ვიტანთ, ოფიციალურ დოკუმენტზე დაყრდნობით." },
      { titulo: "კალკულატორები ახლდება", texto: "კალკულატორები ახალ მნიშვნელობაზე გადადის, ცვლილება კი წყაროსთან ერთად აქაც ჩნდება." },
    ],
    feedTitulo: (pais) => `${g.de(pais)} სიახლეები CalcularYa-ზე`,
    feedSubtitulo: (pais) => `ოფიციალური მონაცემების ცვლილებები, რომლებსაც კალკულატორები იყენებს ${g.para(pais)}, ძალაში შესვლის თარიღებითა და წყაროებით.`,
  },
};

export const ka: Diccionario<TextosInicio> = { base };
