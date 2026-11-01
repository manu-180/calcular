import { GRAMATICA } from "../gramatica";
import type { Diccionario } from "../resolver";
import type { TextosInicio } from "./tipos";

const g = GRAMATICA.hy;

// Armenio (ADR 0002, D24): «Դուք» y «Ձեր» en mayúscula; el país va con GRAMATICA.hy y detrás de un
// número no hay plural («3 փաստաթուղթ»).
const base: TextosInicio = {
  arranque: {
    estasEn: (pais) => `Դուք ${g.en(pais)} եք`,
    resumen: (calculadoras) => `${calculadoras}, գործող պաշտոնական արժեքներով։`,
    ultimoDato: "Վերջին բեռնված արժեքը",
    ir: (pais) => `Անցնել հաշվիչներին ${g.para(pais)}`,
    otro: "Ընտրել այլ երկիր",
    argentina: "Ձեր հաշվիչները calcular.ar կայքում են՝ Արգենտինայի պաշտոնական տվյալներով։",
    argentinaIr: "Անցնել calcular.ar",
    neutroTitulo: (paises) => `${paises} երկիր, յուրաքանչյուրն իր օրենքներով և իր արժույթով`,
    neutroTexto: "Ամեն օր ստուգում ենք պաշտոնական աղբյուրները։",
    neutroIr: "Տեսնել երկրները",
  },
  selector: {
    buscar: "Գտնել երկիր",
    sinResultados: (q) => `«${q}» հարցմանը համապատասխանող երկիր չկա`,
    ubicacion: "Ընթացիկ գտնվելու վայրը",
    mismaCalculadora: "Նույն հաշվիչը",
    paises: "Երկրներ",
  },
  aviso: { mismaCalculadora: (pais) => `Հաշվարկել տվյալներով ${g.para(pais)}` },
  vivo: {
    titulo: "Ավտոմատ թարմացվող պաշտոնական տվյալներ",
    vigilado: "Ավտոմատ գործընթացն ամեն օր ստուգում է պաշտոնական աղբյուրները։ Կանոնների փոփոխությունները հայտնվում են մեր ստուգումից հետո։",
    sinVigilar: "Յուրաքանչյուր արժեք ունի պաշտոնական աղբյուր և մեր ստուգման ամսաթիվը։",
    verificado: "Կանոնների վերջին ստուգումը",
    automatico: "Վերջին ավտոմատ արժեքը",
    fuentes: "Պաշտոնական աղբյուրներ",
    nFuentes: (n) => `${n} պաշտոնական փաստաթուղթ`,
    verFuentes: "Տեսնել աղբյուրները",
    verNovedades: "Տեսնել թարմացումները",
    hoy: "այսօր",
    ayer: "երեկ",
    elDia: (fecha) => `${fecha}`,
    actualizadoSerie: (serie, cuando) => `${serie}, ${cuando}`,
  },
  sello: {
    verificado: (fecha) => `Տվյալները համեմատվել են պաշտոնական աղբյուրի հետ, ամսաթիվը՝ ${fecha}`,
    serie: (serie, cuando, organismo) => `${serie}, թարմացում՝ ${cuando}, վերջին արժեքի աղբյուրը՝ ${organismo}։`,
    diario: "Ամեն օր ավտոմատ ստուգում ենք պաշտոնական աղբյուրները։",
    actualizado: "Թարմացվել է",
  },
  novedades: {
    pildora: "Թարմացումներ",
    titulo: (pais) => `Ինչ է փոխվել պաշտոնական տվյալներում ${g.para(pais)}`,
    acento: "փոփոխության օրը",
    bajada: "Այստեղ գրանցվում է հաշվիչներ մտնող յուրաքանչյուր նոր արժեք՝ ինչ է փոխվել, երբվանից է գործում և որտեղից է վերցված։",
    ultimoCambio: "Վերջին փոփոխությունը",
    revision: "Աղբյուրների ստուգում",
    diaria: "Ամեն օր",
    porNorma: "Յուրաքանչյուր նոր կանոնի դեպքում",
    siguiendo: "Աղբյուրներ, որոնց հետևում ենք",
    masOrganismos: (n) => `և ևս ${n}`,
    proximos: "Հրապարակված է, շուտով ուժի մեջ կմտնի",
    proximosTexto: "Պաշտոնական արժեքներ, որոնք արդեն բեռնված են և կսկսեն գործել առաջիկա օրերին։",
    registro: "Փոփոխությունների մատյան",
    rss: "Հետևել RSS հոսքով",
    vacio: "Այս երկրի համար դեռ գրանցված փոփոխություններ չկան։",
    etiqueta: { editorial: "Կանոն", dato: "Նոր արժեք", proximo: "Շուտով", serie: "Ավտոմատ", revision: "Ստուգում" },
    rige: (fecha) => `Գործում է սկսած՝ ${fecha}`,
    rigeDesdeHasta: (desde, hasta) => `Գործում է սկսած՝ ${desde}, մինչև՝ ${hasta}`,
    antes: (valor, fecha) => `Նախկինում՝ ${valor} (${fecha})`,
    revisados: (n) => `Համեմատեցինք պաշտոնական աղբյուրի հետ՝ ${n} արժեք`,
    revisadosTexto: (organismos) => `Գործող արժեքները հաստատված են հետևյալ աղբյուրներով՝ ${organismos}։`,
    verDatos: (n) => (Number(n) === 1 ? "Տեսնել արժեքը" : `Տեսնել ${n} արժեքը`),
    calculadoras: "Օգտագործվում է՝",
    rango: (min, max, zonas) => `նվազագույնը՝ ${min}, առավելագույնը՝ ${max}, ըստ տարածաշրջանի (${zonas} տարածաշրջան)`,
    tabla: (filas) => `աղյուսակ՝ ${filas} միջակայք`,
    valores: (n) => `${n} արժեք`,
    pasosTitulo: "Ինչպե՞ս են տվյալները մնում թարմ",
    pasos: [
      { titulo: "Մարմինը հրապարակում է", texto: "Պաշտոնական աղբյուրում հայտնվում է նորմատիվ ակտ, ցուցանիշ կամ փոխարժեք։" },
      { titulo: "Ստուգում՝ նախքան օգտագործելը", texto: "Ցուցանիշներն ու փոխարժեքները ստացվում են ավտոմատ՝ սահմանների ստուգմամբ։ Կանոնները մուտքագրում ենք՝ պաշտոնական փաստաթուղթը մեր առջև ունենալով։" },
      { titulo: "Հաշվիչները թարմացվում են", texto: "Հաշվիչներն անցնում են նոր արժեքին, իսկ փոփոխությունը գրանցվում է այստեղ՝ աղբյուրի հետ միասին։" },
    ],
    feedTitulo: (pais) => `Թարմացումներ ${g.para(pais)}, CalcularYa`,
    feedSubtitulo: (pais) => `Հաշվիչների օգտագործած պաշտոնական տվյալների փոփոխությունները ${g.para(pais)}, ուժի մեջ մտնելու ամսաթվերով և աղբյուրներով։`,
  },
};

export const hy: Diccionario<TextosInicio> = { base };
