import { GRAMATICA, mayusculaHu } from "./gramatica";
import type { Diccionario } from "./resolver";
import type { TextosSitio } from "./tipos";

const g = GRAMATICA.hu;
const MUNDO = "Nemzetközi változat";

// Húngaro: un solo registro para la web, la tegezés de OTP, K&H, Revolut y los portales de
// calculadoras húngaros («számold ki», «válaszd ki», «a fizetésed»), nunca magázás ni «Ön». Los
// mercados van con trato "tu" y el diccionario se escribe en base (ADR 0002, D21). El país va con
// GRAMATICA.hu: `en` es el lugar con sufijo («Magyarországon»), `de` el poseedor sin sufijo (el
// poseído lleva el posesivo: «Magyarország kalkulátorai») y `para` la posposición «számára». Detrás
// de un número no hay plural («5 kalkulátor») y ningún sufijo se pega a una cifra.
const base: TextosSitio = {
  marca: { nombre: "CalcularYa", lema: "Kalkulátorok hivatalos adatokkal" },
  saltar: "Ugrás a tartalomra",
  header: {
    inicio: "Főoldal",
    elegirPais: "Válassz országot",
    paisActual: (pais) => `Ország: ${pais}`,
    cerrar: "Bezárás",
    todos: "Minden ország",
    latinoamerica: MUNDO,
  },
  footer: {
    paises: "Országok",
    sitio: "CalcularYa",
    fuentes: "Hivatalos források",
    novedades: "Újdonságok",
    privacidad: "Adatvédelem",
    terminos: "Felhasználási feltételek",
    contacto: "Kapcsolat",
    sobre: "Rólunk",
    argentina: "Argentínában vagy? A kalkulátoraidat a calcular.ar oldalon találod",
    descargo: "Az eredmények tájékoztató jellegűek. Fontos döntés előtt ellenőrizd őket az illetékes hivatalnál vagy egy szakembernél.",
    derechos: (anio) => `© ${anio} CalcularYa`,
  },
  sello: {
    titulo: "Naprakész hivatalos adatok",
    verificado: (organismos, fecha) => `Az adatokat ezekből a forrásokból ellenőriztük: ${organismos}. Frissítve: ${fecha}`,
    serie: (nombre, organismo, fecha) => `${nombre}: automatikusan frissül, forrás: ${organismo}. Utolsó adat: ${fecha}`,
    verTodas: "Összes forrás",
  },
  calculadora: {
    comoSeCalcula: "Hogyan számolunk",
    ejemplo: "Példa",
    faq: "Gyakori kérdések",
    glosario: "Fogalmak",
    relacionadas: "További kalkulátorok",
    otrosPaises: "Ugyanez a számítás más országokban",
  },
  global: {
    eyebrow: "Hivatalos adatok minden országhoz",
    titulo: "Kalkulátorok munkához, pénzhez és a mindennapokhoz, a saját országod adataival",
    bajada: "Fizetés, hitel, adók, dátumok és még sok más. Ha az eredmény jogszabálytól függ, a szám hivatalos forrásból származik, dátummal és hivatkozással, hogy ellenőrizni tudd.",
    elegir: "Válaszd ki az országodat",
    calculadoras: (n) => `${n} kalkulátor`,
    vacio: "Folyamatosan bővítjük az országok listáját. Nézz vissza hamarosan.",
    promesaTitulo: "Hogyan dolgozunk",
    promesas: [
      { titulo: "Hivatalos számok forrással", texto: "Minden értéknél megadjuk a közzétevő hivatalt, a hivatkozást és az ellenőrzés dátumát." },
      { titulo: "Mindig naprakész", texto: "Ha egy érték változik, a kalkulátor is vele változik. Minden módosítást felírunk az újdonságok közé." },
      { titulo: "Ingyenes, regisztráció nélkül", texto: "A számítás a böngésződben fut. Semmilyen személyes adatot nem kérünk tőled." },
    ],
  },
  pais: {
    eyebrow: "Naprakész hivatalos adatok",
    titulo: (pais) => `Kalkulátorok: ${g.nombre(pais)}`,
    bajada: (pais) => `${mayusculaHu(g.en(pais))} érvényes értékekkel, mindegyik forrásával és az ellenőrzés dátumával.`,
    novedades: "Legfrissebb újdonságok",
    verNovedades: "Összes újdonság",
    sinCalculadoras: "Ehhez az országhoz még nincs kalkulátorunk.",
    descripcion: (pais) => `Bér-, adó-, hitel-, megtakarítási, egészségügyi, dátum- és háztartási kalkulátorok ${g.para(pais)}, az érvényes hivatalos értékkel és a forrásával.`,
    irASeccion: "Ugrás a részhez",
  },
  fuentes: {
    titulo: (pais) => `Források és adatok: ${g.nombre(pais)}`,
    bajada: "Minden érték, amelyet a kalkulátorok használnak, az érvényességi időszakkal és a hivatalos forrás hivatkozásával.",
    vigente: "Érvényes érték",
    desde: "Kezdete",
    hasta: "Vége",
    fuente: "Forrás",
    verificado: "Ellenőrizve",
    region: "Megye",
    series: "Automatikusan frissülő értékek",
    ultimoDato: "Utolsó adat",
    proximo: (valor, fecha) => `Már közzétették az új értéket (hatályos: ${fecha}): ${valor}.`,
    sinVerificar: "A mai napra nincs ellenőrzött értékünk",
    tramos: (n) => `Táblázat: ${n} sáv`,
    description: (pais) => `A kalkulátorok által használt hivatalos adatok ${g.para(pais)}: érvényes érték, hatálybalépés, forrás és az ellenőrzés dátuma.`,
  },
  novedades: {
    titulo: (pais) => `Újdonságok: ${g.nombre(pais)}`,
    bajada: "A kalkulátorok által használt szabályok változásai, a hatálybalépés dátumával.",
    vigenteDesde: (fecha) => `Hatályos: ${fecha}`,
    vacio: "Ehhez az országhoz még nincs újdonság.",
    description: (pais) => `A minimálbér, a járulékok és más szabályok változásai ${g.en(pais)}, a hatálybalépés dátumával és a hivatalos forrással.`,
  },
  avisoPais: {
    texto: (pais) => `Úgy tűnik, most itt vagy: ${g.nombre(pais)}.`,
    ir: (pais) => `Kalkulátorok ${g.para(pais)}`,
    cerrar: "Értesítés bezárása",
  },
  noEncontrada: {
    titulo: "Ezt az oldalt nem találjuk",
    texto: "Lehet, hogy elírás van a címben, vagy az oldal már nem létezik.",
    volver: "Vissza a főoldalra",
    paises: "Vagy válassz országot",
  },
  categorias: {
    sueldo: "Bér és juttatások",
    fin: "A munkaviszony vége",
    impuestos: "Járulékok és adók",
    dinero: "Pénz és mutatók",
    finanzas: "Hitel, megtakarítás és befektetés",
    negocio: "Vállalkozás és egyéni vállalkozók",
    calculos: "Gyors számítások",
    fechas: "Dátumok és életkor",
    salud: "Egészség és fitnesz",
    hogar: "Otthon, autó és felújítás",
    familia: "Család és háztartás",
    otras: "További kalkulátorok",
  },
  migas: { inicio: "Főoldal", etiqueta: "Itt vagy" },
  seo: {
    tituloGlobal: "CalcularYa: ingyenes kalkulátorok hivatalos adatokkal",
    descripcionGlobal: "Ingyenes kalkulátorok fizetéshez, hitelhez, adókhoz és más számításokhoz minden országban, az érvényes hivatalos értékkel és a forrásával.",
    tituloPais: (pais, anio) => [
      `Bér- és adókalkulátorok ${anio}: ${g.nombre(pais)}`,
      `Kalkulátorok ${anio}: ${g.nombre(pais)}`,
      `Kalkulátorok: ${g.nombre(pais)}`,
    ],
    tituloFuentes: (pais) => [`Érvényes hivatalos adatok: ${g.nombre(pais)}, források és dátumok`, `Források és adatok: ${g.nombre(pais)}`],
    tituloNovedades: (pais, anio) => [
      `Bér- és adóváltozások ${anio}: ${g.nombre(pais)}`,
      `Újdonságok ${anio}: ${g.nombre(pais)}`,
      `Újdonságok: ${g.nombre(pais)}`,
    ],
  },
  og: {
    datosOficiales: "Hivatalos adatok forrással",
    actualizado: (fecha) => `Frissítve: ${fecha}`,
    gratis: "Ingyenes, regisztráció nélkül",
    paises: (n) => `${n} ország`,
  },
  shell: {
    irAlInicio: "a főoldalra",
    menu: { trabajo: "Bér és munka", impuestos: "Adók", dinero: "Pénz és mutatók", vida: "Mindennapok", novedades: "Újdonságok", planillas: "Excel-táblázatok" },
    encabezado: {
      principal: "Főmenü",
      buscar: "Keresés",
      buscarCalculadora: "Keress kalkulátort",
      abrirMenu: "Menü megnyitása",
      cerrarMenu: "Menü bezárása",
      menu: "Menü",
      todas: "Összes kalkulátor",
      pieCajon: "Adatok hivatalos forrásokból · Argentínában készült",
    },
    buscador: {
      dialogo: "Keresés a CalcularYa oldalon",
      pregunta: "Mit szeretnél kiszámolni?",
      recientes: "Folytasd, ahol abbahagytad",
      masUsado: "A legnépszerűbbek",
      sinResultados: "Erre nincs találat: „{q}”",
      sugerencia: "Próbálj egy másik szót, például „fizetés”, „hitel” vagy „adó”.",
      verTodas: "Összes kalkulátor",
      borrar: "Keresés törlése",
      cerrar: "Bezárás",
      cerrarBuscador: "Keresés bezárása",
      moverte: "lépkedés",
      abrir: "megnyitás",
      desdeCualquier: "bármelyik oldalról",
      resultados: "Találatok",
      resultado: "találat",
      resultadosPlural: "találat",
    },
    paises: { titulo: "Országok", cambiar: "Ország váltása" },
    pie: {
      bajada: (lugar) =>
        `Érthető kalkulátorok ${lugar === MUNDO ? "minden országhoz" : g.para(lugar)}. Minden szám abból a hivatalos dokumentumból származik, amely előírja, és mellette van az ellenőrzés dátuma.`,
      todas: "Összes kalkulátor",
      cuenta: "Fiókod",
      cuentaNota: "Nem kötelező. Arra jó, hogy elmentsd a számításaidat, és kéznél legyenek.",
      hecho: "Argentínában készült",
      escrito: "Írták és ellenőrizték",
    },
  },
};

export const hu: Diccionario<TextosSitio> = { base };
