import { GRAMATICA } from "./gramatica";
import { pluralSl } from "./plural";
import type { Diccionario } from "./resolver";
import type { TextosSitio } from "./tipos";

const g = GRAMATICA.sl;
const MUNDO = "Mednarodna različica";

// Esloveno: un solo registro para la web, el de los bancos y los servicios digitales del país (FURS y
// eDavki, NLB, SKB). Vikanje con «vi», en minúscula, e imperativo de segunda del plural en la prosa
// («vnesite», «izberite», «vaša plača»); los botones van en la forma corta de las interfaces eslovenas
// («Izračunaj», «Prikaži vse»). Los mercados van con trato "usted" y el diccionario se escribe en base
// (ADR 0002, D32). El país se declina con GRAMATICA.sl («v Sloveniji», «za Slovenijo», «na Hrvaškem») y los
// números con pluralSl (one/two/few/other). Intl da la fecha en nominativo («15. oktober»), así que las
// frases que la reciben tras «od» o «do» pasan por fechaGenSl, y el resto la lleva tras dos puntos.
const base: TextosSitio = {
  marca: { nombre: "CalcularYa", lema: "Kalkulatorji z uradnimi podatki" },
  saltar: "Preskoči na vsebino",
  header: {
    inicio: "Začetna stran",
    elegirPais: "Izberite državo",
    paisActual: (pais) => `Država: ${pais}`,
    cerrar: "Zapri",
    todos: "Vse države",
    latinoamerica: MUNDO,
  },
  footer: {
    paises: "Države",
    sitio: "CalcularYa",
    fuentes: "Uradni viri",
    novedades: "Novosti",
    privacidad: "Varstvo osebnih podatkov",
    terminos: "Pogoji uporabe",
    contacto: "Kontakt",
    sobre: "O nas",
    argentina: "Ste v Argentini? Vaši kalkulatorji so na calcular.ar",
    descargo: "Rezultati so informativni. Pred pomembno odločitvijo jih preverite pri pristojnem organu ali strokovnjaku.",
    derechos: (anio) => `© ${anio} CalcularYa`,
  },
  sello: {
    titulo: "Ažurni uradni podatki",
    verificado: (organismos, fecha) => `Podatki, preverjeni pri virih: ${organismos}. Posodobljeno: ${fecha}.`,
    serie: (nombre, organismo, fecha) => `${nombre} se samodejno posodablja po podatkih, ki jih objavlja: ${organismo}. Zadnja vrednost: ${fecha}.`,
    verTodas: "Prikaži vse vire",
  },
  calculadora: {
    comoSeCalcula: "Kako se izračuna",
    ejemplo: "Primer",
    faq: "Pogosta vprašanja",
    glosario: "Slovarček",
    relacionadas: "Drugi kalkulatorji",
    otrosPaises: "Isti izračun v drugih državah",
  },
  global: {
    eyebrow: "Uradni podatki za vsako državo",
    titulo: "Kalkulatorji za delo, denar in vsakdanje življenje s podatki vaše države",
    bajada: "Plača, krediti, davki, datumi in še veliko več. Kadar je rezultat odvisen od predpisa, številka prihaja iz uradnega vira, z datumom in povezavo, da jo lahko preverite.",
    elegir: "Izberite svojo državo",
    calculadoras: (n) => pluralSl(n, "kalkulator", "kalkulatorja", "kalkulatorji", "kalkulatorjev"),
    vacio: "Dodajamo nove države. Kmalu se oglasite znova.",
    promesaTitulo: "Kako delamo",
    promesas: [
      { titulo: "Uradne številke z virom", texto: "Pri vsaki vrednosti navedemo organ, ki jo objavlja, povezavo in datum, ko smo jo preverili." },
      { titulo: "Vedno ažurno", texto: "Ko se vrednost spremeni, se spremeni tudi kalkulator. Vsako spremembo zabeležimo med novostmi." },
      { titulo: "Brezplačno in brez registracije", texto: "Izračun poteka v vašem brskalniku. Ne zahtevamo nobenih osebnih podatkov." },
    ],
  },
  pais: {
    eyebrow: "Ažurni uradni podatki",
    titulo: (pais) => `Kalkulatorji ${g.para(pais)}`,
    bajada: (pais) => `Z vrednostmi, ki veljajo ${g.en(pais)}, z virom vsake od njih in datumom, ko smo jih preverili.`,
    novedades: "Zadnje novosti",
    verNovedades: "Prikaži vse novosti",
    sinCalculadoras: "Za to državo še nimamo kalkulatorjev.",
    descripcion: (pais) => `Kalkulatorji plače, davkov, kreditov, varčevanja, zdravja, datumov in gospodinjstva ${g.para(pais)}, z veljavno uradno vrednostjo in njenim virom.`,
    irASeccion: "Pojdi na razdelek",
  },
  fuentes: {
    titulo: (pais) => `Viri in podatki ${g.para(pais)}`,
    bajada: "Vsaka vrednost, ki jo uporabljajo kalkulatorji, z obdobjem veljavnosti in povezavo na uradni vir.",
    vigente: "Veljavna vrednost",
    desde: "Od",
    hasta: "Do",
    fuente: "Vir",
    verificado: "Preverjeno",
    region: "Regija",
    series: "Vrednosti, ki se posodabljajo samodejno",
    ultimoDato: "Zadnja vrednost",
    proximo: (valor, fecha) => `Objavljena je že vrednost, ki bo začela veljati (datum: ${fecha}): ${valor}.`,
    sinVerificar: "Za danes nimamo preverjene vrednosti",
    tramos: (n) => `Tabela: ${pluralSl(n, "razred", "razreda", "razredi", "razredov")}`,
    description: (pais) => `Uradni podatki ${g.para(pais)}, ki jih uporabljajo kalkulatorji: veljavna vrednost, datum začetka veljavnosti, vir in datum preverjanja.`,
  },
  novedades: {
    titulo: (pais) => `Novosti ${g.para(pais)}`,
    bajada: "Spremembe predpisov, ki jih uporabljajo kalkulatorji, z datumom začetka veljavnosti.",
    vigenteDesde: (fecha) => `Začetek veljavnosti: ${fecha}`,
    vacio: "Za to državo še ni novosti.",
    description: (pais) => `Spremembe minimalne plače, prispevkov in drugih pravil ${g.en(pais)}, z datumom začetka veljavnosti in uradnim virom.`,
  },
  avisoPais: {
    texto: (pais) => `Videti je, da ste ${g.en(pais)}.`,
    ir: (pais) => `Prikaži kalkulatorje ${g.para(pais)}`,
    cerrar: "Zapri obvestilo",
  },
  noEncontrada: {
    titulo: "Te strani nismo našli",
    texto: "Morda je v naslovu napaka ali pa stran ne obstaja več.",
    volver: "Nazaj na začetno stran",
    paises: "Ali izberite državo",
  },
  categorias: {
    sueldo: "Plače in delo",
    fin: "Prenehanje delovnega razmerja",
    impuestos: "Davki in prispevki",
    dinero: "Denar in indeksi",
    finanzas: "Krediti, varčevanje in naložbe",
    negocio: "Podjetniki in podjetja",
    calculos: "Hitri izračuni",
    fechas: "Datumi in starost",
    salud: "Zdravje in telesna pripravljenost",
    hogar: "Dom, avtomobil in prenova",
    familia: "Družina in gospodinjstvo",
    otras: "Drugi kalkulatorji",
  },
  migas: { inicio: "Začetna stran", etiqueta: "Nahajate se tukaj" },
  seo: {
    tituloGlobal: "CalcularYa: brezplačni kalkulatorji z uradnimi podatki",
    descripcionGlobal: "Brezplačni kalkulatorji za plačo, kredite, davke in druge izračune v vsaki državi, z veljavno uradno vrednostjo in njenim virom.",
    tituloPais: (pais, anio) => [
      `Kalkulatorji plače in davkov ${g.para(pais)} ${anio}`,
      `Kalkulatorji ${g.para(pais)} ${anio}`,
      `Kalkulatorji ${g.para(pais)}`,
    ],
    tituloFuentes: (pais) => [`Veljavni uradni podatki ${g.para(pais)}: viri in datumi`, `Viri in podatki ${g.para(pais)}`],
    tituloNovedades: (pais, anio) => [
      `Spremembe plač in davkov ${g.en(pais)} ${anio}`,
      `Novosti ${g.para(pais)} ${anio}`,
      `Novosti ${g.para(pais)}`,
    ],
  },
  og: {
    datosOficiales: "Uradni podatki z viri",
    actualizado: (fecha) => `Posodobljeno: ${fecha}`,
    gratis: "Brezplačno in brez registracije",
    paises: (n) => pluralSl(n, "država", "državi", "države", "držav"),
  },
  shell: {
    irAlInicio: "na začetno stran",
    menu: { trabajo: "Plače in delo", impuestos: "Davki", dinero: "Denar in indeksi", vida: "Vsakdanji kalkulatorji", novedades: "Novosti", planillas: "Excelove predloge" },
    encabezado: {
      principal: "Glavni meni",
      buscar: "Iskanje",
      buscarCalculadora: "Poiščite kalkulator",
      abrirMenu: "Odpri meni",
      cerrarMenu: "Zapri meni",
      menu: "Meni",
      todas: "Vsi kalkulatorji",
      pieCajon: "Podatki iz uradnih virov · Izdelano v Argentini",
    },
    buscador: {
      dialogo: "Iskanje na CalcularYa",
      pregunta: "Kaj želite izračunati?",
      recientes: "Nadaljujte, kjer ste končali",
      masUsado: "Najpogosteje uporabljeni",
      sinResultados: "Za „{q}“ nismo našli ničesar",
      sugerencia: "Poskusite z drugo besedo, na primer „plača“, „kredit“ ali „davek“.",
      verTodas: "Prikaži vse kalkulatorje",
      borrar: "Izbriši iskanje",
      cerrar: "Zapri",
      cerrarBuscador: "Zapri iskanje",
      moverte: "za premikanje",
      abrir: "za odpiranje",
      desdeCualquier: "s katere koli strani",
      resultados: "Rezultati",
      resultado: "rezultat",
      resultadosDos: "rezultata",
      resultadosPocos: "rezultati",
      resultadosPlural: "rezultatov",
    },
    paises: { titulo: "Države", cambiar: "Zamenjava države" },
    pie: {
      bajada: (lugar) =>
        `Jasni kalkulatorji ${lugar === MUNDO ? "za vsako državo" : g.para(lugar)}. Vsaka številka prihaja iz uradnega dokumenta, ki jo določa, in ima datum, ko smo jo preverili.`,
      todas: "Vsi kalkulatorji",
      cuenta: "Vaš račun",
      cuentaNota: "Ni obvezen. Omogoča shranjevanje izračunov, da jih imate pri roki.",
      hecho: "Izdelano v Argentini",
      escrito: "Napisali in preverili",
    },
  },
};

export const sl: Diccionario<TextosSitio> = { base };
