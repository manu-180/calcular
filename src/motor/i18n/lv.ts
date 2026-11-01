import { GRAMATICA } from "./gramatica";
import { pluralLv } from "./plural";
import type { Diccionario } from "./resolver";
import type { TextosSitio } from "./tipos";

const g = GRAMATICA.lv;
const MUNDO = "Starptautiskā versija";

// Letón: un solo registro para la web, el de los servicios del país (VID EDS, latvija.gov.lv): «jūs»
// en minúscula y el imperativo de segunda del plural («ievadiet», «izvēlieties», «jūsu alga»), nunca
// «tu». Los botones cortos van en infinitivo («Aprēķināt»). Los mercados van con trato "usted" y el
// diccionario se escribe en base (ADR 0002, D35). El país se declina con GRAMATICA.lv (sin preposición
// en el locativo) y los números con pluralLv (one/zero/other). Las fechas de Intl llegan en nominativo
// («2026. gada 1. novembris»), así que siempre van tras dos puntos.
const base: TextosSitio = {
  marca: { nombre: "CalcularYa", lema: "Kalkulatori ar oficiāliem datiem" },
  saltar: "Pāriet uz saturu",
  header: {
    inicio: "Sākums",
    elegirPais: "Izvēlieties valsti",
    paisActual: (pais) => `Valsts: ${pais}`,
    cerrar: "Aizvērt",
    todos: "Visas valstis",
    latinoamerica: MUNDO,
  },
  footer: {
    paises: "Valstis",
    sitio: "CalcularYa",
    fuentes: "Oficiālie avoti",
    novedades: "Jaunumi",
    privacidad: "Privātums",
    terminos: "Lietošanas noteikumi",
    contacto: "Kontakti",
    sobre: "Par mums",
    argentina: "Esat Argentīnā? Jūsu kalkulatori ir calcular.ar",
    descargo: "Rezultāti ir orientējoši. Pirms svarīga lēmuma pārbaudiet tos atbildīgajā iestādē vai pie speciālista.",
    derechos: (anio) => `© ${anio} CalcularYa`,
  },
  sello: {
    titulo: "Jaunākie oficiālie dati",
    verificado: (organismos, fecha) => `Dati pārbaudīti avotos: ${organismos}. Atjaunināts: ${fecha}.`,
    serie: (nombre, organismo, fecha) => `${nombre}: tiek atjaunināts automātiski, avots: ${organismo}. Pēdējā vērtība: ${fecha}.`,
    verTodas: "Rādīt visus avotus",
  },
  calculadora: {
    comoSeCalcula: "Kā tiek aprēķināts",
    ejemplo: "Piemērs",
    faq: "Biežāk uzdotie jautājumi",
    glosario: "Jēdzieni",
    relacionadas: "Citi kalkulatori",
    otrosPaises: "Tas pats aprēķins citās valstīs",
  },
  global: {
    eyebrow: "Katras valsts oficiālie dati",
    titulo: "Kalkulatori darbam, naudai un ikdienai ar jūsu valsts datiem",
    bajada: "Alga, kredīti, nodokļi, datumi un citi aprēķini. Ja rezultāts ir atkarīgs no normatīvā akta, skaitlis ņemts no oficiāla avota, ar datumu un saiti, lai to varētu pārbaudīt.",
    elegir: "Izvēlieties savu valsti",
    calculadoras: (n) => pluralLv(n, "kalkulators", "kalkulatori", "kalkulatoru"),
    vacio: "Drīzumā pievienosim vairāk valstu. Apmeklējiet mūs vēlāk.",
    promesaTitulo: "Kā mēs strādājam",
    promesas: [
      { titulo: "Oficiāli skaitļi ar avotu", texto: "Pie katras vērtības norādām iestādi, kas to publicē, saiti un pārbaudes datumu." },
      { titulo: "Vienmēr aktuāli", texto: "Kad vērtība mainās, mainās arī kalkulators. Katru izmaiņu ierakstām jaunumos." },
      { titulo: "Bez maksas un bez reģistrācijas", texto: "Aprēķins notiek jūsu pārlūkprogrammā. Personas datus neprasām." },
    ],
  },
  pais: {
    eyebrow: "Jaunākie oficiālie dati",
    titulo: (pais) => `Kalkulatori: ${pais}`,
    bajada: (pais) => `Ar vērtībām, kas ir spēkā ${g.en(pais)}, katrai norādot avotu un pārbaudes datumu.`,
    novedades: "Pēdējie jaunumi",
    verNovedades: "Rādīt visus jaunumus",
    sinCalculadoras: "Šai valstij kalkulatoru pagaidām nav.",
    descripcion: (pais) => `Algas, nodokļu, kredītu, uzkrājumu, veselības, datumu un mājsaimniecības kalkulatori ${g.en(pais)}, ar spēkā esošo oficiālo vērtību un tās avotu.`,
    irASeccion: "Pāriet uz sadaļu",
  },
  fuentes: {
    titulo: (pais) => `Avoti un dati: ${pais}`,
    bajada: "Katra kalkulatoros izmantotā vērtība ar spēkā esamības periodu un saiti uz oficiālo avotu.",
    vigente: "Spēkā esošā vērtība",
    desde: "No",
    hasta: "Līdz",
    fuente: "Avots",
    verificado: "Pārbaudīts",
    region: "Reģions",
    series: "Automātiski atjauninātās vērtības",
    ultimoDato: "Pēdējā vērtība",
    proximo: (valor, fecha) => `Jau publicēta vērtība: ${valor}. Spēkā no: ${fecha}.`,
    sinVerificar: "Šodienai pārbaudītas vērtības nav",
    tramos: (n) => `Tabula: ${pluralLv(n, "intervāls", "intervāli", "intervālu")}`,
    description: (pais) => `${g.de(pais)} oficiālie dati, ko izmanto kalkulatori: spēkā esošā vērtība, spēkā stāšanās datums, avots un pārbaudes datums.`,
  },
  novedades: {
    titulo: (pais) => `Jaunumi: ${pais}`,
    bajada: "Izmaiņas kalkulatoros izmantotajos normatīvajos aktos, ar spēkā stāšanās datumu.",
    vigenteDesde: (fecha) => `Spēkā no: ${fecha}`,
    vacio: "Šai valstij jaunumu pagaidām nav.",
    description: (pais) => `Minimālās algas, iemaksu un citu noteikumu izmaiņas ${g.en(pais)}, ar spēkā stāšanās datumu un oficiālo avotu.`,
  },
  avisoPais: {
    texto: (pais) => `Šķiet, ka atrodaties ${g.en(pais)}.`,
    ir: (pais) => `Rādīt kalkulatorus: ${pais}`,
    cerrar: "Aizvērt paziņojumu",
  },
  noEncontrada: {
    titulo: "Šo lapu neatradām",
    texto: "Iespējams, adresē ir kļūda vai lapas vairs nav.",
    volver: "Atgriezties sākumā",
    paises: "Vai izvēlieties valsti",
  },
  categorias: {
    sueldo: "Alga un izmaksas",
    fin: "Darba attiecību izbeigšana",
    impuestos: "Iemaksas un nodokļi",
    dinero: "Nauda un indeksi",
    finanzas: "Kredīti, uzkrājumi un ieguldījumi",
    negocio: "Uzņēmējdarbība un pašnodarbinātība",
    calculos: "Ātrie aprēķini",
    fechas: "Datumi un vecums",
    salud: "Veselība un sports",
    hogar: "Mājoklis, auto un remonts",
    familia: "Ģimene un mājsaimniecība",
    otras: "Citi kalkulatori",
  },
  migas: { inicio: "Sākums", etiqueta: "Jūs atrodaties šeit" },
  seo: {
    tituloGlobal: "CalcularYa: bezmaksas kalkulatori ar oficiāliem datiem",
    descripcionGlobal: "Bezmaksas algas, kredītu, nodokļu un citu aprēķinu kalkulatori katrai valstij, ar spēkā esošo oficiālo vērtību un tās avotu.",
    tituloPais: (pais, anio) => [
      `Algas un nodokļu kalkulatori ${g.en(pais)} ${anio}`,
      `Kalkulatori ${g.en(pais)} ${anio}`,
      `Kalkulatori ${g.en(pais)}`,
    ],
    tituloFuentes: (pais) => [`${g.de(pais)} spēkā esošie oficiālie dati: avoti un datumi`, `${g.de(pais)} avoti un dati`],
    tituloNovedades: (pais, anio) => [
      `Algu un nodokļu izmaiņas ${g.en(pais)} ${anio}`,
      `Jaunumi ${g.en(pais)} ${anio}`,
      `Jaunumi ${g.en(pais)}`,
    ],
  },
  og: {
    datosOficiales: "Oficiāli dati ar avotiem",
    actualizado: (fecha) => `Atjaunināts: ${fecha}`,
    gratis: "Bez maksas un bez reģistrācijas",
    paises: (n) => pluralLv(n, "valsts", "valstis", "valstu"),
  },
  shell: {
    irAlInicio: "uz sākumu",
    menu: { trabajo: "Alga un darbs", impuestos: "Nodokļi", dinero: "Nauda un indeksi", vida: "Ikdiena", novedades: "Jaunumi", planillas: "Excel tabulas" },
    encabezado: {
      principal: "Galvenā izvēlne",
      buscar: "Meklēt",
      buscarCalculadora: "Atrodiet kalkulatoru",
      abrirMenu: "Atvērt izvēlni",
      cerrarMenu: "Aizvērt izvēlni",
      menu: "Izvēlne",
      todas: "Visi kalkulatori",
      pieCajon: "Dati no oficiāliem avotiem · Veidots Argentīnā",
    },
    buscador: {
      dialogo: "Meklēšana CalcularYa vietnē",
      pregunta: "Ko vēlaties aprēķināt?",
      recientes: "Turpiniet tur, kur beidzāt",
      masUsado: "Visbiežāk izmantotie",
      sinResultados: "Pēc vaicājuma „{q}“ nekas nav atrasts",
      sugerencia: "Pamēģiniet citu vārdu, piemēram, „alga“, „kredīts“ vai „nodoklis“.",
      verTodas: "Rādīt visus kalkulatorus",
      borrar: "Notīrīt meklēšanu",
      cerrar: "Aizvērt",
      cerrarBuscador: "Aizvērt meklēšanu",
      moverte: "pārvietoties",
      abrir: "atvērt",
      desdeCualquier: "no jebkuras lapas",
      resultados: "Rezultāti",
      resultado: "rezultāts",
      resultadosPlural: "rezultāti",
      resultadosPocos: "rezultāti",
    },
    paises: { titulo: "Valstis", cambiar: "Mainīt valsti" },
    pie: {
      bajada: (lugar) =>
        `Saprotami kalkulatori ${lugar === MUNDO ? "katrai valstij" : g.para(lugar)}. Katrs skaitlis ņemts no oficiālā dokumenta, kas to nosaka, un tam ir pārbaudes datums.`,
      todas: "Visi kalkulatori",
      cuenta: "Jūsu konts",
      cuentaNota: "Nav obligāts. Noder, lai saglabātu aprēķinus un tie vienmēr būtu pa rokai.",
      hecho: "Veidots Argentīnā",
      escrito: "Sagatavoja un pārbaudīja",
    },
  },
};

export const lv: Diccionario<TextosSitio> = { base };
