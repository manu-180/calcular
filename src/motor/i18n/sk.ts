import { GRAMATICA } from "./gramatica";
import { pluralSk } from "./plural";
import type { Diccionario } from "./resolver";
import type { TextosSitio } from "./tipos";

const g = GRAMATICA.sk;
const MUNDO = "Medzinárodná verzia";

// Eslovaco (ADR 0002, D25): un solo registro para la web, el de los bancos y los servicios digitales
// del país (Finančná správa, Tatra banka). Vykanie con vy en minúscula y el imperativo cortés de
// segunda del plural, nunca tykanie. Los botones van en infinitivo o en imperativo cortés breve, como
// en esos sitios. Los mercados van con trato "usted" y el diccionario se escribe en base. El nombre
// del país se declina con GRAMATICA.sk y los números con pluralSk (one/few/other).
const base: TextosSitio = {
  marca: { nombre: "CalcularYa", lema: "Kalkulačky s oficiálnymi údajmi" },
  saltar: "Prejsť na obsah",
  header: {
    inicio: "Úvod",
    elegirPais: "Vyberte krajinu",
    paisActual: (pais) => `Krajina: ${pais}`,
    cerrar: "Zavrieť",
    todos: "Všetky krajiny",
    latinoamerica: MUNDO,
  },
  footer: {
    paises: "Krajiny",
    sitio: "CalcularYa",
    fuentes: "Oficiálne zdroje",
    novedades: "Novinky",
    privacidad: "Ochrana osobných údajov",
    terminos: "Podmienky používania",
    contacto: "Kontakt",
    sobre: "O nás",
    argentina: "Ste v Argentíne? Vaše kalkulačky nájdete na calcular.ar",
    descargo: "Výsledky sú orientačné. Pred dôležitým rozhodnutím si ich overte na príslušnom úrade alebo u odborníka.",
    derechos: (anio) => `© ${anio} CalcularYa`,
  },
  sello: {
    titulo: "Aktuálne oficiálne údaje",
    verificado: (organismos, fecha) => `Údaje overené v zdrojoch: ${organismos}. Aktualizované ${fecha}.`,
    serie: (nombre, organismo, fecha) => `${nombre} sa aktualizuje automaticky podľa údajov: ${organismo}. Posledná hodnota: ${fecha}.`,
    verTodas: "Zobraziť všetky zdroje",
  },
  calculadora: {
    comoSeCalcula: "Ako sa to počíta",
    ejemplo: "Príklad",
    faq: "Časté otázky",
    glosario: "Pojmy",
    relacionadas: "Ďalšie kalkulačky",
    otrosPaises: "Rovnaký výpočet v iných krajinách",
  },
  global: {
    eyebrow: "Oficiálne údaje pre každú krajinu",
    titulo: "Kalkulačky pre prácu, peniaze a každodenný život s údajmi vašej krajiny",
    bajada: "Mzda, úvery, dane, dátumy a ďalšie. Keď výsledok závisí od predpisu, číslo pochádza z oficiálneho zdroja, s dátumom a odkazom, aby ste si ho mohli overiť.",
    elegir: "Vyberte svoju krajinu",
    calculadoras: (n) => pluralSk(n, "kalkulačka", "kalkulačky", "kalkulačiek"),
    vacio: "Pridávame ďalšie krajiny. Pozrite sa sem o chvíľu.",
    promesaTitulo: "Ako pracujeme",
    promesas: [
      { titulo: "Oficiálne čísla so zdrojom", texto: "Pri každej hodnote uvádzame úrad, ktorý ju zverejňuje, odkaz a dátum, kedy sme ju overili." },
      { titulo: "Vždy aktuálne", texto: "Keď sa hodnota zmení, zmení sa s ňou aj kalkulačka. Každú zmenu zapisujeme do noviniek." },
      { titulo: "Zadarmo a bez registrácie", texto: "Výpočet prebieha vo vašom prehliadači. Nežiadame od vás žiadne osobné údaje." },
    ],
  },
  pais: {
    eyebrow: "Aktuálne oficiálne údaje",
    titulo: (pais) => `Kalkulačky ${g.para(pais)}`,
    bajada: (pais) => `S hodnotami, ktoré platia ${g.en(pais)}, so zdrojom každej z nich a s dátumom, kedy sme ich overili.`,
    novedades: "Posledné novinky",
    verNovedades: "Zobraziť všetky novinky",
    sinCalculadoras: "Pre túto krajinu zatiaľ kalkulačky nemáme.",
    descripcion: (pais) => `Kalkulačky mzdy, daní, úverov, sporenia, zdravia, dátumov a domácnosti ${g.para(pais)}, s platnou oficiálnou hodnotou a jej zdrojom.`,
    irASeccion: "Prejsť na sekciu",
  },
  fuentes: {
    titulo: (pais) => `Zdroje a údaje ${g.para(pais)}`,
    bajada: "Každá hodnota, ktorú kalkulačky používajú, s obdobím platnosti a odkazom na oficiálny zdroj.",
    vigente: "Platná hodnota",
    desde: "Od",
    hasta: "Do",
    fuente: "Zdroj",
    verificado: "Overené",
    region: "Kraj",
    series: "Hodnoty, ktoré sa aktualizujú automaticky",
    ultimoDato: "Posledná hodnota",
    proximo: (valor, fecha) => `Už je zverejnená hodnota platná od ${fecha}: ${valor}.`,
    sinVerificar: "K dnešnému dňu nemáme overenú hodnotu",
    tramos: (n) => `Tabuľka: ${pluralSk(n, "pásmo", "pásma", "pásiem")}`,
    description: (pais) => `Oficiálne údaje ${g.para(pais)}, ktoré kalkulačky používajú: platná hodnota, dátum účinnosti, zdroj a dátum overenia.`,
  },
  novedades: {
    titulo: (pais) => `Novinky ${g.para(pais)}`,
    bajada: "Zmeny predpisov, ktoré kalkulačky používajú, s dátumom účinnosti.",
    vigenteDesde: (fecha) => `Platí od ${fecha}`,
    vacio: "Pre túto krajinu zatiaľ nemáme žiadne novinky.",
    description: (pais) => `Zmeny minimálnej mzdy, odvodov a ďalších pravidiel ${g.en(pais)}, s dátumom účinnosti a oficiálnym zdrojom.`,
  },
  avisoPais: {
    texto: (pais) => `Zdá sa, že ste ${g.en(pais)}.`,
    ir: (pais) => `Zobraziť kalkulačky ${g.para(pais)}`,
    cerrar: "Zavrieť upozornenie",
  },
  noEncontrada: {
    titulo: "Túto stránku sme nenašli",
    texto: "Možno je v adrese chyba alebo stránka už neexistuje.",
    volver: "Späť na úvod",
    paises: "Alebo vyberte krajinu",
  },
  categorias: {
    sueldo: "Mzda a odmeny",
    fin: "Koniec pracovného pomeru",
    impuestos: "Odvody a dane",
    dinero: "Peniaze a indexy",
    finanzas: "Úvery, sporenie a investície",
    negocio: "Podnikanie a SZČO",
    calculos: "Rýchle výpočty",
    fechas: "Dátumy a vek",
    salud: "Zdravie a kondícia",
    hogar: "Domácnosť, auto a rekonštrukcia",
    familia: "Rodina a domácnosť",
    otras: "Ďalšie kalkulačky",
  },
  migas: { inicio: "Úvod", etiqueta: "Ste tu" },
  seo: {
    tituloGlobal: "CalcularYa: kalkulačky zadarmo s oficiálnymi údajmi",
    descripcionGlobal: "Kalkulačky zadarmo pre mzdu, úvery, dane a ďalšie výpočty v každej krajine, s platnou oficiálnou hodnotou a jej zdrojom.",
    tituloPais: (pais, anio) => [
      `Kalkulačky mzdy a daní ${g.para(pais)} ${anio}`,
      `Kalkulačky ${g.para(pais)} ${anio}`,
      `Kalkulačky ${g.para(pais)}`,
    ],
    tituloFuentes: (pais) => [`Platné oficiálne údaje ${g.para(pais)}: zdroje a dátumy`, `Zdroje a údaje ${g.para(pais)}`],
    tituloNovedades: (pais, anio) => [
      `Zmeny miezd a daní ${g.en(pais)} ${anio}`,
      `Novinky ${g.para(pais)} ${anio}`,
      `Novinky ${g.para(pais)}`,
    ],
  },
  og: {
    datosOficiales: "Oficiálne údaje so zdrojmi",
    actualizado: (fecha) => `Aktualizované ${fecha}`,
    gratis: "Zadarmo a bez registrácie",
    paises: (n) => pluralSk(n, "krajina", "krajiny", "krajín"),
  },
  shell: {
    irAlInicio: "na úvod",
    menu: { trabajo: "Mzda a práca", impuestos: "Dane", dinero: "Peniaze a indexy", vida: "Každodenný život", novedades: "Novinky", planillas: "Tabuľky Excel" },
    encabezado: {
      principal: "Hlavná ponuka",
      buscar: "Hľadať",
      buscarCalculadora: "Nájdite kalkulačku",
      abrirMenu: "Otvoriť ponuku",
      cerrarMenu: "Zavrieť ponuku",
      menu: "Ponuka",
      todas: "Všetky kalkulačky",
      pieCajon: "Údaje z oficiálnych zdrojov · Vyrobené v Argentíne",
    },
    buscador: {
      dialogo: "Hľadanie na CalcularYa",
      pregunta: "Čo chcete vypočítať?",
      recientes: "Pokračujte tam, kde ste skončili",
      masUsado: "Najpoužívanejšie",
      sinResultados: "Pre „{q}“ sme nič nenašli",
      sugerencia: "Skúste iné slovo, napríklad „mzda“, „úver“ alebo „daň“.",
      verTodas: "Zobraziť všetky kalkulačky",
      borrar: "Vymazať hľadanie",
      cerrar: "Zavrieť",
      cerrarBuscador: "Zavrieť hľadanie",
      moverte: "na pohyb",
      abrir: "na otvorenie",
      desdeCualquier: "z ktorejkoľvek stránky",
      resultados: "Výsledky",
      resultado: "výsledok",
      resultadosPlural: "výsledkov",
      resultadosPocos: "výsledky",
    },
    paises: { titulo: "Krajiny", cambiar: "Zmeniť krajinu" },
    pie: {
      bajada: (lugar) =>
        `Zrozumiteľné kalkulačky ${lugar === MUNDO ? "pre každú krajinu" : g.para(lugar)}. Každé číslo pochádza z oficiálneho dokumentu, ktorý ho stanovuje, a má dátum, kedy sme ho overili.`,
      todas: "Všetky kalkulačky",
      cuenta: "Váš účet",
      cuentaNota: "Nie je povinný. Slúži na ukladanie výpočtov, aby ste ich mali poruke.",
      hecho: "Vyrobené v Argentíne",
      escrito: "Napísali a overili",
    },
  },
};

export const sk: Diccionario<TextosSitio> = { base };
