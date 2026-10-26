import { GRAMATICA } from "./gramatica";
import { pluralCs } from "./plural";
import type { Diccionario } from "./resolver";
import type { TextosSitio } from "./tipos";

const g = GRAMATICA.cs;
const MUNDO = "Mezinárodní verze";

// Checo: un solo registro para la web, el de los bancos y los servicios digitales del país
// (Finanční správa, ČSOB, Česká spořitelna). Vykání con «vy» en minúscula y el imperativo cortés de
// segunda del plural («zadejte», «vyberte», «vaše mzda»), nunca tykání. Los botones van en
// infinitivo («Spočítat») o en imperativo cortés breve («Vyberte zemi»), como en esos sitios. Los
// mercados van con trato "usted" y el diccionario se escribe en base (ADR 0002, D19). El nombre del
// país se declina con GRAMATICA.cs y los números con pluralCs (one/few/other).
const base: TextosSitio = {
  marca: { nombre: "CalcularYa", lema: "Kalkulačky s oficiálními údaji" },
  saltar: "Přejít na obsah",
  header: {
    inicio: "Úvod",
    elegirPais: "Vyberte zemi",
    paisActual: (pais) => `Země: ${pais}`,
    cerrar: "Zavřít",
    todos: "Všechny země",
    latinoamerica: MUNDO,
  },
  footer: {
    paises: "Země",
    sitio: "CalcularYa",
    fuentes: "Oficiální zdroje",
    novedades: "Novinky",
    privacidad: "Ochrana osobních údajů",
    terminos: "Podmínky použití",
    contacto: "Kontakt",
    sobre: "O nás",
    argentina: "Jste v Argentině? Vaše kalkulačky najdete na calcular.ar",
    descargo: "Výsledky jsou orientační. Před důležitým rozhodnutím si je ověřte u příslušného úřadu nebo u odborníka.",
    derechos: (anio) => `© ${anio} CalcularYa`,
  },
  sello: {
    titulo: "Aktuální oficiální údaje",
    verificado: (organismos, fecha) => `Údaje ověřené ve zdrojích: ${organismos}. Aktualizováno ${fecha}.`,
    serie: (nombre, organismo, fecha) => `${nombre} se aktualizuje automaticky podle údajů: ${organismo}. Poslední hodnota: ${fecha}.`,
    verTodas: "Zobrazit všechny zdroje",
  },
  calculadora: {
    comoSeCalcula: "Jak se to počítá",
    ejemplo: "Příklad",
    faq: "Časté dotazy",
    glosario: "Pojmy",
    relacionadas: "Další kalkulačky",
    otrosPaises: "Stejný výpočet v jiných zemích",
  },
  global: {
    eyebrow: "Oficiální údaje pro každou zemi",
    titulo: "Kalkulačky pro práci, peníze a každodenní život s údaji vaší země",
    bajada: "Mzda, úvěry, daně, data a další. Když výsledek závisí na předpisu, číslo pochází z oficiálního zdroje, s datem a odkazem, abyste si ho mohli ověřit.",
    elegir: "Vyberte svou zemi",
    calculadoras: (n) => pluralCs(n, "kalkulačka", "kalkulačky", "kalkulaček"),
    vacio: "Přidáváme další země. Podívejte se sem za chvíli.",
    promesaTitulo: "Jak pracujeme",
    promesas: [
      { titulo: "Oficiální čísla se zdrojem", texto: "U každé hodnoty uvádíme úřad, který ji zveřejňuje, odkaz a datum, kdy jsme ji ověřili." },
      { titulo: "Vždy aktuální", texto: "Když se hodnota změní, změní se s ní i kalkulačka. Každou změnu zapisujeme do novinek." },
      { titulo: "Zdarma a bez registrace", texto: "Výpočet probíhá ve vašem prohlížeči. Nežádáme od vás žádné osobní údaje." },
    ],
  },
  pais: {
    eyebrow: "Aktuální oficiální údaje",
    titulo: (pais) => `Kalkulačky ${g.para(pais)}`,
    bajada: (pais) => `S hodnotami, které platí ${g.en(pais)}, se zdrojem každé z nich a s datem, kdy jsme je ověřili.`,
    novedades: "Poslední novinky",
    verNovedades: "Zobrazit všechny novinky",
    sinCalculadoras: "Pro tuto zemi zatím kalkulačky nemáme.",
    descripcion: (pais) => `Kalkulačky mzdy, daní, úvěrů, spoření, zdraví, dat a domácnosti ${g.para(pais)}, s platnou oficiální hodnotou a jejím zdrojem.`,
    irASeccion: "Přejít na sekci",
  },
  fuentes: {
    titulo: (pais) => `Zdroje a údaje ${g.para(pais)}`,
    bajada: "Každá hodnota, kterou kalkulačky používají, s obdobím platnosti a odkazem na oficiální zdroj.",
    vigente: "Platná hodnota",
    desde: "Od",
    hasta: "Do",
    fuente: "Zdroj",
    verificado: "Ověřeno",
    region: "Kraj",
    series: "Hodnoty, které se aktualizují automaticky",
    ultimoDato: "Poslední hodnota",
    proximo: (valor, fecha) => `Už je zveřejněna hodnota platná od ${fecha}: ${valor}.`,
    sinVerificar: "K dnešku nemáme ověřenou hodnotu",
    tramos: (n) => `Tabulka: ${pluralCs(n, "pásmo", "pásma", "pásem")}`,
    description: (pais) => `Oficiální údaje ${g.para(pais)}, které kalkulačky používají: platná hodnota, datum účinnosti, zdroj a datum ověření.`,
  },
  novedades: {
    titulo: (pais) => `Novinky ${g.para(pais)}`,
    bajada: "Změny předpisů, které kalkulačky používají, s datem účinnosti.",
    vigenteDesde: (fecha) => `Platí od ${fecha}`,
    vacio: "Pro tuto zemi zatím žádné novinky nemáme.",
    description: (pais) => `Změny minimální mzdy, pojistného a dalších pravidel ${g.en(pais)}, s datem účinnosti a oficiálním zdrojem.`,
  },
  avisoPais: {
    texto: (pais) => `Zdá se, že jste ${g.en(pais)}.`,
    ir: (pais) => `Zobrazit kalkulačky ${g.para(pais)}`,
    cerrar: "Zavřít upozornění",
  },
  noEncontrada: {
    titulo: "Tuto stránku jsme nenašli",
    texto: "Možná je v adrese chyba, nebo stránka už neexistuje.",
    volver: "Zpět na úvod",
    paises: "Nebo vyberte zemi",
  },
  categorias: {
    sueldo: "Mzda a odměny",
    fin: "Konec pracovního poměru",
    impuestos: "Pojistné a daně",
    dinero: "Peníze a indexy",
    finanzas: "Úvěry, spoření a investice",
    negocio: "Podnikání a OSVČ",
    calculos: "Rychlé výpočty",
    fechas: "Data a věk",
    salud: "Zdraví a kondice",
    hogar: "Domácnost, auto a rekonstrukce",
    familia: "Rodina a domácnost",
    otras: "Další kalkulačky",
  },
  migas: { inicio: "Úvod", etiqueta: "Jste tady" },
  seo: {
    tituloGlobal: "CalcularYa: kalkulačky zdarma s oficiálními údaji",
    descripcionGlobal: "Kalkulačky zdarma pro mzdu, úvěry, daně a další výpočty v každé zemi, s platnou oficiální hodnotou a jejím zdrojem.",
    tituloPais: (pais, anio) => [
      `Kalkulačky mzdy a daní ${g.para(pais)} ${anio}`,
      `Kalkulačky ${g.para(pais)} ${anio}`,
      `Kalkulačky ${g.para(pais)}`,
    ],
    tituloFuentes: (pais) => [`Platné oficiální údaje ${g.para(pais)}: zdroje a data`, `Zdroje a údaje ${g.para(pais)}`],
    tituloNovedades: (pais, anio) => [
      `Změny mezd a daní ${g.en(pais)} ${anio}`,
      `Novinky ${g.para(pais)} ${anio}`,
      `Novinky ${g.para(pais)}`,
    ],
  },
  og: {
    datosOficiales: "Oficiální údaje se zdroji",
    actualizado: (fecha) => `Aktualizováno ${fecha}`,
    gratis: "Zdarma a bez registrace",
    paises: (n) => pluralCs(n, "země", "země", "zemí"),
  },
  shell: {
    irAlInicio: "na úvod",
    menu: { trabajo: "Mzda a práce", impuestos: "Daně", dinero: "Peníze a indexy", vida: "Každodenní život", novedades: "Novinky", planillas: "Tabulky Excel" },
    encabezado: {
      principal: "Hlavní nabídka",
      buscar: "Hledat",
      buscarCalculadora: "Najděte kalkulačku",
      abrirMenu: "Otevřít nabídku",
      cerrarMenu: "Zavřít nabídku",
      menu: "Nabídka",
      todas: "Všechny kalkulačky",
      pieCajon: "Údaje z oficiálních zdrojů · Vyrobeno v Argentině",
    },
    buscador: {
      dialogo: "Hledání na CalcularYa",
      pregunta: "Co chcete spočítat?",
      recientes: "Pokračujte tam, kde jste skončili",
      masUsado: "Nejpoužívanější",
      sinResultados: "Pro „{q}“ jsme nic nenašli",
      sugerencia: "Zkuste jiné slovo, například „mzda“, „úvěr“ nebo „daň“.",
      verTodas: "Zobrazit všechny kalkulačky",
      borrar: "Vymazat hledání",
      cerrar: "Zavřít",
      cerrarBuscador: "Zavřít hledání",
      moverte: "pro pohyb",
      abrir: "pro otevření",
      desdeCualquier: "z kterékoli stránky",
      resultados: "Výsledky",
      resultado: "výsledek",
      resultadosPlural: "výsledků",
      resultadosPocos: "výsledky",
    },
    paises: { titulo: "Země", cambiar: "Změnit zemi" },
    pie: {
      bajada: (lugar) =>
        `Srozumitelné kalkulačky ${lugar === MUNDO ? "pro každou zemi" : g.para(lugar)}. Každé číslo pochází z oficiálního dokumentu, který ho stanoví, a má datum, kdy jsme ho ověřili.`,
      todas: "Všechny kalkulačky",
      cuenta: "Váš účet",
      cuentaNota: "Není povinný. Slouží k ukládání výpočtů, abyste je měli po ruce.",
      hecho: "Vyrobeno v Argentině",
      escrito: "Napsali a ověřili",
    },
  },
};

export const cs: Diccionario<TextosSitio> = { base };
