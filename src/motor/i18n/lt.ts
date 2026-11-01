import { GRAMATICA } from "./gramatica";
import { pluralLt } from "./plural";
import type { Diccionario } from "./resolver";
import type { TextosSitio } from "./tipos";

const g = GRAMATICA.lt;
const MUNDO = "Tarptautinė versija";

// Lituano: un solo registro para la web, el de los bancos y los servicios digitales del país (VMI y
// Mano VMI, Swedbank, SEB, Sodra). «Jūs» en minúscula y el imperativo de segunda del plural
// («įveskite», «pasirinkite», «jūsų atlyginimas»), nunca «tu». Los botones cortos van en infinitivo
// («Skaičiuoti»). Los mercados van con trato "usted" y el diccionario se escribe en base (ADR 0002,
// D29). El nombre del país se declina con GRAMATICA.lt (sin preposición en el locativo) y los números
// con pluralLt (one/few/many/other).
const base: TextosSitio = {
  marca: { nombre: "CalcularYa", lema: "Skaičiuoklės su oficialiais duomenimis" },
  saltar: "Pereiti prie turinio",
  header: {
    inicio: "Pradžia",
    elegirPais: "Pasirinkite šalį",
    paisActual: (pais) => `Šalis: ${pais}`,
    cerrar: "Uždaryti",
    todos: "Visos šalys",
    latinoamerica: MUNDO,
  },
  footer: {
    paises: "Šalys",
    sitio: "CalcularYa",
    fuentes: "Oficialūs šaltiniai",
    novedades: "Naujienos",
    privacidad: "Privatumas",
    terminos: "Naudojimo sąlygos",
    contacto: "Kontaktai",
    sobre: "Apie mus",
    argentina: "Esate Argentinoje? Jūsų skaičiuoklės yra calcular.ar",
    descargo: "Rezultatai yra orientaciniai. Prieš priimdami svarbų sprendimą, pasitikrinkite juos atsakingoje institucijoje arba pas specialistą.",
    derechos: (anio) => `© ${anio} CalcularYa`,
  },
  sello: {
    titulo: "Naujausi oficialūs duomenys",
    verificado: (organismos, fecha) => `Duomenys patikrinti šaltiniuose: ${organismos}. Atnaujinta ${fecha}.`,
    serie: (nombre, organismo, fecha) => `${nombre}: atnaujinama automatiškai pagal šaltinį ${organismo}. Paskutinė reikšmė: ${fecha}.`,
    verTodas: "Rodyti visus šaltinius",
  },
  calculadora: {
    comoSeCalcula: "Kaip apskaičiuojama",
    ejemplo: "Pavyzdys",
    faq: "Dažni klausimai",
    glosario: "Sąvokos",
    relacionadas: "Kitos skaičiuoklės",
    otrosPaises: "Tas pats skaičiavimas kitose šalyse",
  },
  global: {
    eyebrow: "Oficialūs kiekvienos šalies duomenys",
    titulo: "Darbo, pinigų ir kasdienių reikalų skaičiuoklės su jūsų šalies duomenimis",
    bajada: "Atlyginimas, paskolos, mokesčiai, datos ir kiti skaičiavimai. Kai rezultatas priklauso nuo teisės akto, skaičius paimtas iš oficialaus šaltinio, su data ir nuoroda, kad galėtumėte jį patikrinti.",
    elegir: "Pasirinkite savo šalį",
    calculadoras: (n) => pluralLt(n, "skaičiuoklė", "skaičiuoklės", "skaičiuoklių"),
    vacio: "Netrukus pridėsime daugiau šalių. Apsilankykite vėliau.",
    promesaTitulo: "Kaip dirbame",
    promesas: [
      { titulo: "Oficialūs skaičiai su šaltiniu", texto: "Prie kiekvienos reikšmės nurodome ją skelbiančią instituciją, nuorodą ir patikrinimo datą." },
      { titulo: "Visada naujausi", texto: "Kai reikšmė pasikeičia, pasikeičia ir skaičiuoklė. Kiekvieną pakeitimą įrašome į naujienas." },
      { titulo: "Nemokamai ir be registracijos", texto: "Skaičiuojama jūsų naršyklėje. Asmens duomenų neprašome." },
    ],
  },
  pais: {
    eyebrow: "Naujausi oficialūs duomenys",
    titulo: (pais) => `Skaičiuoklės: ${pais}`,
    bajada: (pais) => `Su reikšmėmis, kurios galioja: ${g.en(pais)}, su kiekvienos šaltiniu ir patikrinimo data.`,
    novedades: "Paskutinės naujienos",
    verNovedades: "Rodyti visas naujienas",
    sinCalculadoras: "Šiai šaliai skaičiuoklių kol kas neturime.",
    descripcion: (pais) => `Atlyginimo, mokesčių, paskolų, taupymo, sveikatos, datų ir namų ūkio skaičiuoklės ${g.para(pais)}, su galiojančia oficialia reikšme ir jos šaltiniu.`,
    irASeccion: "Pereiti į skyrių",
  },
  fuentes: {
    titulo: (pais) => `Šaltiniai ir duomenys: ${pais}`,
    bajada: "Kiekviena skaičiuoklėse naudojama reikšmė, su galiojimo laikotarpiu ir nuoroda į oficialų šaltinį.",
    vigente: "Galiojanti reikšmė",
    desde: "Nuo",
    hasta: "Iki",
    fuente: "Šaltinis",
    verificado: "Patikrinta",
    region: "Regionas",
    series: "Automatiškai atnaujinamos reikšmės",
    ultimoDato: "Paskutinė reikšmė",
    proximo: (valor, fecha) => `Jau paskelbta reikšmė, galiosianti nuo ${fecha}: ${valor}.`,
    sinVerificar: "Šiandienai patikrintos reikšmės neturime",
    tramos: (n) => `Lentelė: ${pluralLt(n, "intervalas", "intervalai", "intervalų")}`,
    description: (pais) => `Oficialūs ${g.de(pais)} duomenys, kuriuos naudoja skaičiuoklės: galiojanti reikšmė, įsigaliojimo data, šaltinis ir patikrinimo data.`,
  },
  novedades: {
    titulo: (pais) => `Naujienos: ${pais}`,
    bajada: "Skaičiuoklėse naudojamų teisės aktų pakeitimai, su įsigaliojimo data.",
    vigenteDesde: (fecha) => `Galioja nuo ${fecha}`,
    vacio: "Šiai šaliai naujienų kol kas neturime.",
    description: (pais) => `Minimalaus atlyginimo, įmokų ir kitų taisyklių pakeitimai ${g.en(pais)}, su įsigaliojimo data ir oficialiu šaltiniu.`,
  },
  avisoPais: {
    texto: (pais) => `Atrodo, kad esate ${g.en(pais)}.`,
    ir: (pais) => `Rodyti skaičiuokles ${g.para(pais)}`,
    cerrar: "Uždaryti pranešimą",
  },
  noEncontrada: {
    titulo: "Šio puslapio neradome",
    texto: "Galbūt adrese yra klaida arba puslapio nebėra.",
    volver: "Grįžti į pradžią",
    paises: "Arba pasirinkite šalį",
  },
  categorias: {
    sueldo: "Atlyginimas ir išmokos",
    fin: "Darbo santykių pabaiga",
    impuestos: "Įmokos ir mokesčiai",
    dinero: "Pinigai ir indeksai",
    finanzas: "Paskolos, taupymas ir investicijos",
    negocio: "Verslas ir savarankiška veikla",
    calculos: "Greiti skaičiavimai",
    fechas: "Datos ir amžius",
    salud: "Sveikata ir sportas",
    hogar: "Namai, automobilis ir remontas",
    familia: "Šeima ir namų ūkis",
    otras: "Kitos skaičiuoklės",
  },
  migas: { inicio: "Pradžia", etiqueta: "Jūs esate čia" },
  seo: {
    tituloGlobal: "CalcularYa: nemokamos skaičiuoklės su oficialiais duomenimis",
    descripcionGlobal: "Nemokamos atlyginimo, paskolų, mokesčių ir kitų skaičiavimų skaičiuoklės kiekvienai šaliai, su galiojančia oficialia reikšme ir jos šaltiniu.",
    tituloPais: (pais, anio) => [
      `Atlyginimo ir mokesčių skaičiuoklės ${g.para(pais)} ${anio}`,
      `Skaičiuoklės ${g.para(pais)} ${anio}`,
      `Skaičiuoklės ${g.para(pais)}`,
    ],
    tituloFuentes: (pais) => [`Galiojantys oficialūs ${g.de(pais)} duomenys: šaltiniai ir datos`, `Šaltiniai ir duomenys ${g.para(pais)}`],
    tituloNovedades: (pais, anio) => [
      `Atlyginimų ir mokesčių pakeitimai ${g.en(pais)} ${anio}`,
      `Naujienos ${g.para(pais)} ${anio}`,
      `Naujienos ${g.para(pais)}`,
    ],
  },
  og: {
    datosOficiales: "Oficialūs duomenys su šaltiniais",
    actualizado: (fecha) => `Atnaujinta ${fecha}`,
    gratis: "Nemokamai ir be registracijos",
    paises: (n) => pluralLt(n, "šalis", "šalys", "šalių"),
  },
  shell: {
    irAlInicio: "į pradžią",
    menu: { trabajo: "Atlyginimas ir darbas", impuestos: "Mokesčiai", dinero: "Pinigai ir indeksai", vida: "Kasdieniai reikalai", novedades: "Naujienos", planillas: "Excel lentelės" },
    encabezado: {
      principal: "Pagrindinis meniu",
      buscar: "Ieškoti",
      buscarCalculadora: "Raskite skaičiuoklę",
      abrirMenu: "Atidaryti meniu",
      cerrarMenu: "Uždaryti meniu",
      menu: "Meniu",
      todas: "Visos skaičiuoklės",
      pieCajon: "Duomenys iš oficialių šaltinių · Sukurta Argentinoje",
    },
    buscador: {
      dialogo: "Paieška CalcularYa svetainėje",
      pregunta: "Ką norite apskaičiuoti?",
      recientes: "Tęskite ten, kur baigėte",
      masUsado: "Dažniausiai naudojamos",
      sinResultados: "Pagal „{q}“ nieko neradome",
      sugerencia: "Pabandykite kitą žodį, pavyzdžiui, „atlyginimas“, „paskola“ arba „mokestis“.",
      verTodas: "Rodyti visas skaičiuokles",
      borrar: "Išvalyti paiešką",
      cerrar: "Uždaryti",
      cerrarBuscador: "Uždaryti paiešką",
      moverte: "judėti",
      abrir: "atidaryti",
      desdeCualquier: "iš bet kurio puslapio",
      resultados: "Rezultatai",
      resultado: "rezultatas",
      resultadosPlural: "rezultatų",
      resultadosPocos: "rezultatai",
    },
    paises: { titulo: "Šalys", cambiar: "Keisti šalį" },
    pie: {
      bajada: (lugar) =>
        `Aiškios skaičiuoklės ${lugar === MUNDO ? "kiekvienai šaliai" : g.para(lugar)}. Kiekvienas skaičius paimtas iš jį nustatančio oficialaus dokumento ir turi patikrinimo datą.`,
      todas: "Visos skaičiuoklės",
      cuenta: "Jūsų paskyra",
      cuentaNota: "Neprivaloma. Reikalinga skaičiavimams išsaugoti, kad jie būtų po ranka.",
      hecho: "Sukurta Argentinoje",
      escrito: "Parašė ir patikrino",
    },
  },
};

export const lt: Diccionario<TextosSitio> = { base };
