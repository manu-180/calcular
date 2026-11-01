import { GRAMATICA } from "../gramatica";
import { pluralLv } from "../plural";
import type { Diccionario } from "../resolver";
import type { TextosInicio } from "./tipos";

const g = GRAMATICA.lv;

// Letón (ADR 0002, D35): «jūs» en minúscula; el país se declina con GRAMATICA.lv y los números con
// pluralLv. Un número con su sustantivo va solo en nominativo: si la frase pide otro caso, va tras dos
// puntos. Las fechas también, porque Intl las da en nominativo.
const base: TextosInicio = {
  arranque: {
    estasEn: (pais) => `Atrodaties ${g.en(pais)}`,
    resumen: (calculadoras) => `${calculadoras} ar spēkā esošām oficiālām vērtībām.`,
    ultimoDato: "Pēdējā pievienotā vērtība",
    ir: (pais) => `Pāriet uz kalkulatoriem: ${pais}`,
    otro: "Izvēlēties citu valsti",
    argentina: "Jūsu kalkulatori ir calcular.ar, ar Argentīnas oficiālajiem datiem.",
    argentinaIr: "Pāriet uz calcular.ar",
    neutroTitulo: (paises) => `${pluralLv(paises, "valsts", "valstis", "valstu")}, katrai savi likumi un sava valūta`,
    neutroTexto: "Oficiālos avotus pārbaudām katru dienu.",
    neutroIr: "Rādīt valstis",
  },
  selector: {
    buscar: "Atrodiet valsti",
    sinResultados: (q) => `Pēc vaicājuma „${q}“ valsts nav atrasta`,
    ubicacion: "Jūsu pašreizējā atrašanās vieta",
    mismaCalculadora: "Tas pats kalkulators",
    paises: "Valstis",
  },
  aviso: { mismaCalculadora: (pais) => `Aprēķiniet ar ${g.de(pais)} datiem` },
  vivo: {
    titulo: "Oficiālie dati, kas tiek atjaunināti automātiski",
    vigilado: "Automātisks process katru dienu pārbauda oficiālos avotus. Normatīvo aktu izmaiņas parādās pēc tam, kad tās esam pārbaudījuši.",
    sinVigilar: "Katrai vērtībai ir oficiāls avots un pārbaudes datums.",
    verificado: "Pēdējā normatīvo aktu pārbaude",
    automatico: "Pēdējā automātiskā vērtība",
    fuentes: "Oficiālie avoti",
    nFuentes: (n) => pluralLv(n, "oficiāls dokuments", "oficiāli dokumenti", "oficiālu dokumentu"),
    verFuentes: "Rādīt avotus",
    verNovedades: "Rādīt jaunumus",
    hoy: "šodien",
    ayer: "vakar",
    elDia: (fecha) => `${fecha}`,
    actualizadoSerie: (serie, cuando) => `${serie}, ${cuando}`,
  },
  sello: {
    verificado: (fecha) => `Dati salīdzināti ar oficiālo avotu: ${fecha}.`,
    serie: (serie, cuando, organismo) => `${serie}: atjaunināts ${cuando}, pēdējo vērtību publicēja ${organismo}.`,
    diario: "Oficiālos avotus automātiski pārbaudām katru dienu.",
    actualizado: "Atjaunināts",
  },
  novedades: {
    pildora: "Jaunumi",
    titulo: (pais) => `Kas mainījies ${g.de(pais)} oficiālajos datos`,
    acento: "izmaiņu dienā",
    bajada: "Šeit ierakstām katru jauno vērtību, kas nonāk kalkulatoros: kas mainījies, no kura datuma ir spēkā un no kurienes ņemts.",
    ultimoCambio: "Pēdējās izmaiņas",
    revision: "Avotu pārbaude",
    diaria: "Katru dienu",
    porNorma: "Ar katru jaunu normatīvo aktu",
    siguiendo: "Avoti, kuriem sekojam",
    masOrganismos: (n) => `un vēl: ${n}`,
    proximos: "Publicēts, drīz stāsies spēkā",
    proximosTexto: "Jau pievienotās oficiālās vērtības, kas stāsies spēkā tuvākajās dienās.",
    registro: "Izmaiņu žurnāls",
    rss: "Sekot ar RSS",
    vacio: "Šai valstij izmaiņas vēl nav reģistrētas.",
    etiqueta: { editorial: "Normatīvais akts", dato: "Jauna vērtība", proximo: "Drīzumā", serie: "Automātiski", revision: "Pārbaude" },
    rige: (fecha) => `Spēkā no: ${fecha}`,
    rigeDesdeHasta: (desde, hasta) => `Spēkā no: ${desde}. Līdz: ${hasta}`,
    antes: (valor, fecha) => `Iepriekš: ${valor} (${fecha})`,
    revisados: (n) => `Salīdzināts ar oficiālo avotu: ${pluralLv(n, "vērtība", "vērtības", "vērtību")}`,
    revisadosTexto: (organismos) => `Spēkā esošās vērtības, kas apstiprinātas avotos: ${organismos}.`,
    verDatos: (n) => (Number(n) === 1 ? "Rādīt vērtību" : `Rādīt (${pluralLv(n, "vērtība", "vērtības", "vērtību")})`),
    calculadoras: "Izmanto",
    rango: (min, max, zonas) => `no ${min} līdz ${max} atkarībā no reģiona (${pluralLv(zonas, "reģions", "reģioni", "reģionu")})`,
    tabla: (filas) => `tabula: ${pluralLv(filas, "intervāls", "intervāli", "intervālu")}`,
    valores: (n) => pluralLv(n, "vērtība", "vērtības", "vērtību"),
    pasosTitulo: "Kā dati paliek aktuāli",
    pasos: [
      { titulo: "Iestāde publicē", texto: "Oficiālajā avotā parādās normatīvais akts, indekss vai valūtas kurss." },
      { titulo: "Pārbaude pirms izmantošanas", texto: "Indeksi un kursi pienāk automātiski, un mēs pārbaudām to robežas. Normatīvos aktus ievadām manuāli, skatoties oficiālajā dokumentā." },
      { titulo: "Kalkulatori tiek atjaunināti", texto: "Kalkulatori pāriet uz jauno vērtību, un izmaiņa šeit tiek ierakstīta kopā ar avotu." },
    ],
    feedTitulo: (pais) => `Jaunumi: ${pais}, CalcularYa vietne`,
    feedSubtitulo: (pais) => `Izmaiņas oficiālajos datos, ko izmanto kalkulatori ${g.en(pais)}, ar spēkā stāšanās datumiem un avotiem.`,
  },
};

export const lv: Diccionario<TextosInicio> = { base };
