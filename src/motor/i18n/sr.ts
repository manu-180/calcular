import { GRAMATICA } from "./gramatica";
import { pluralSr } from "./plural";
import type { Diccionario } from "./resolver";
import type { TextosSitio } from "./tipos";

const g = GRAMATICA.sr;
const MUNDO = "Međunarodna verzija";

// Serbio en latinica y ekavski: un solo registro para la web, el de los bancos y los servicios
// digitales del país (eUprava, ePorezi, bancos). Obraćanje na «vi», en minúscula, con imperativo de
// segunda del plural en la prosa («unesite», «izaberite», «vaša plata»); los botones van en la forma
// corta de las interfaces serbias («Izračunaj», «Prikaži sve»). Los mercados van con trato "usted" y
// el diccionario se escribe en base (ADR 0002, D23). El nombre del país se declina con GRAMATICA.sr
// («u Srbiji», «za Srbiju») y los números con pluralSr (one/few/other).
const base: TextosSitio = {
  marca: { nombre: "CalcularYa", lema: "Kalkulatori sa zvaničnim podacima" },
  saltar: "Pređi na sadržaj",
  header: {
    inicio: "Početna",
    elegirPais: "Izaberite zemlju",
    paisActual: (pais) => `Zemlja: ${pais}`,
    cerrar: "Zatvori",
    todos: "Sve zemlje",
    latinoamerica: MUNDO,
  },
  footer: {
    paises: "Zemlje",
    sitio: "CalcularYa",
    fuentes: "Zvanični izvori",
    novedades: "Novosti",
    privacidad: "Zaštita podataka o ličnosti",
    terminos: "Uslovi korišćenja",
    contacto: "Kontakt",
    sobre: "O nama",
    argentina: "Da li ste u Argentini? Vaši kalkulatori su na calcular.ar",
    descargo: "Rezultati su informativni. Pre važne odluke proverite ih kod nadležnog organa ili stručnjaka.",
    derechos: (anio) => `© ${anio} CalcularYa`,
  },
  sello: {
    titulo: "Ažurni zvanični podaci",
    verificado: (organismos, fecha) => `Podaci provereni u izvorima: ${organismos}. Ažurirano ${fecha}.`,
    serie: (nombre, organismo, fecha) => `${nombre} se ažurira automatski prema podacima: ${organismo}. Poslednja vrednost: ${fecha}.`,
    verTodas: "Prikaži sve izvore",
  },
  calculadora: {
    comoSeCalcula: "Kako se računa",
    ejemplo: "Primer",
    faq: "Česta pitanja",
    glosario: "Pojmovi",
    relacionadas: "Drugi kalkulatori",
    otrosPaises: "Isti obračun u drugim zemljama",
  },
  global: {
    eyebrow: "Zvanični podaci za svaku zemlju",
    titulo: "Kalkulatori za posao, novac i svakodnevni život sa podacima vaše zemlje",
    bajada: "Plata, krediti, porezi, datumi i još mnogo toga. Kada rezultat zavisi od propisa, broj dolazi iz zvaničnog izvora, sa datumom i linkom, da biste mogli da ga proverite.",
    elegir: "Izaberite svoju zemlju",
    calculadoras: (n) => pluralSr(n, "kalkulator", "kalkulatora", "kalkulatora"),
    vacio: "Dodajemo nove zemlje. Svratite ponovo uskoro.",
    promesaTitulo: "Kako radimo",
    promesas: [
      { titulo: "Zvanični brojevi sa izvorom", texto: "Za svaku vrednost navodimo organ koji je objavljuje, link i datum kada smo je proverili." },
      { titulo: "Uvek ažurno", texto: "Kada se vrednost promeni, menja se i kalkulator. Svaku promenu beležimo u novostima." },
      { titulo: "Besplatno i bez registracije", texto: "Obračun se radi u vašem pregledaču. Ne tražimo nikakve lične podatke." },
    ],
  },
  pais: {
    eyebrow: "Ažurni zvanični podaci",
    titulo: (pais) => `Kalkulatori ${g.para(pais)}`,
    bajada: (pais) => `Sa vrednostima koje važe ${g.en(pais)}, uz izvor svake od njih i datum kada smo ih proverili.`,
    novedades: "Poslednje novosti",
    verNovedades: "Prikaži sve novosti",
    sinCalculadoras: "Za ovu zemlju još nemamo kalkulatore.",
    descripcion: (pais) => `Kalkulatori plate, poreza, kredita, štednje, zdravlja, datuma i domaćinstva ${g.para(pais)}, sa važećom zvaničnom vrednošću i njenim izvorom.`,
    irASeccion: "Idi na odeljak",
  },
  fuentes: {
    titulo: (pais) => `Izvori i podaci ${g.para(pais)}`,
    bajada: "Svaka vrednost koju kalkulatori koriste, sa periodom važenja i linkom ka zvaničnom izvoru.",
    vigente: "Važeća vrednost",
    desde: "Od",
    hasta: "Do",
    fuente: "Izvor",
    verificado: "Provereno",
    region: "Region",
    series: "Vrednosti koje se ažuriraju automatski",
    ultimoDato: "Poslednja vrednost",
    proximo: (valor, fecha) => `Već je objavljena vrednost koja važi od ${fecha}: ${valor}.`,
    sinVerificar: "Za danas nemamo proverenu vrednost",
    tramos: (n) => `Tabela: ${pluralSr(n, "razred", "razreda", "razreda")}`,
    description: (pais) => `Zvanični podaci ${g.para(pais)} koje kalkulatori koriste: važeća vrednost, datum primene, izvor i datum provere.`,
  },
  novedades: {
    titulo: (pais) => `Novosti ${g.para(pais)}`,
    bajada: "Promene propisa koje kalkulatori koriste, sa datumom primene.",
    vigenteDesde: (fecha) => `Važi od ${fecha}`,
    vacio: "Za ovu zemlju još nema novosti.",
    description: (pais) => `Promene minimalne zarade, doprinosa i drugih pravila ${g.en(pais)}, sa datumom primene i zvaničnim izvorom.`,
  },
  avisoPais: {
    texto: (pais) => `Izgleda da ste ${g.en(pais)}.`,
    ir: (pais) => `Prikaži kalkulatore ${g.para(pais)}`,
    cerrar: "Zatvori obaveštenje",
  },
  noEncontrada: {
    titulo: "Ovu stranicu nismo pronašli",
    texto: "Možda u adresi postoji greška ili stranica više ne postoji.",
    volver: "Nazad na početnu",
    paises: "Ili izaberite zemlju",
  },
  categorias: {
    sueldo: "Plate i rad",
    fin: "Prestanak radnog odnosa",
    impuestos: "Porezi i doprinosi",
    dinero: "Novac i indeksi",
    finanzas: "Krediti, štednja i ulaganja",
    negocio: "Preduzetnici i firme",
    calculos: "Brzi obračuni",
    fechas: "Datumi i godine",
    salud: "Zdravlje i kondicija",
    hogar: "Kuća, automobil i renoviranje",
    familia: "Porodica i domaćinstvo",
    otras: "Ostali kalkulatori",
  },
  migas: { inicio: "Početna", etiqueta: "Nalazite se ovde" },
  seo: {
    tituloGlobal: "CalcularYa: besplatni kalkulatori sa zvaničnim podacima",
    descripcionGlobal: "Besplatni kalkulatori za platu, kredite, poreze i druge obračune u svakoj zemlji, sa važećom zvaničnom vrednošću i njenim izvorom.",
    tituloPais: (pais, anio) => [
      `Kalkulatori plate i poreza ${g.para(pais)} ${anio}`,
      `Kalkulatori ${g.para(pais)} ${anio}`,
      `Kalkulatori ${g.para(pais)}`,
    ],
    tituloFuentes: (pais) => [`Važeći zvanični podaci ${g.para(pais)}: izvori i datumi`, `Izvori i podaci ${g.para(pais)}`],
    tituloNovedades: (pais, anio) => [
      `Promene plata i poreza ${g.en(pais)} ${anio}`,
      `Novosti ${g.para(pais)} ${anio}`,
      `Novosti ${g.para(pais)}`,
    ],
  },
  og: {
    datosOficiales: "Zvanični podaci sa izvorima",
    actualizado: (fecha) => `Ažurirano ${fecha}`,
    gratis: "Besplatno i bez registracije",
    paises: (n) => pluralSr(n, "zemlja", "zemlje", "zemalja"),
  },
  shell: {
    irAlInicio: "na početnu",
    menu: { trabajo: "Plate i rad", impuestos: "Porezi", dinero: "Novac i indeksi", vida: "Svakodnevni kalkulatori", novedades: "Novosti", planillas: "Excel tabele" },
    encabezado: {
      principal: "Glavni meni",
      buscar: "Pretraga",
      buscarCalculadora: "Pronađite kalkulator",
      abrirMenu: "Otvori meni",
      cerrarMenu: "Zatvori meni",
      menu: "Meni",
      todas: "Svi kalkulatori",
      pieCajon: "Podaci iz zvaničnih izvora · Napravljeno u Argentini",
    },
    buscador: {
      dialogo: "Pretraga na CalcularYa",
      pregunta: "Šta želite da izračunate?",
      recientes: "Nastavite gde ste stali",
      masUsado: "Najkorišćeniji",
      sinResultados: "Za „{q}“ nismo ništa pronašli",
      sugerencia: "Probajte drugu reč, na primer „plata“, „kredit“ ili „porez“.",
      verTodas: "Prikaži sve kalkulatore",
      borrar: "Obriši pretragu",
      cerrar: "Zatvori",
      cerrarBuscador: "Zatvori pretragu",
      moverte: "za kretanje",
      abrir: "za otvaranje",
      desdeCualquier: "sa bilo koje stranice",
      resultados: "Rezultati",
      resultado: "rezultat",
      resultadosPlural: "rezultata",
      resultadosPocos: "rezultata",
    },
    paises: { titulo: "Zemlje", cambiar: "Promena zemlje" },
    pie: {
      bajada: (lugar) =>
        `Jasni kalkulatori ${lugar === MUNDO ? "za svaku zemlju" : g.para(lugar)}. Svaki broj dolazi iz zvaničnog dokumenta koji ga propisuje i ima datum kada smo ga proverili.`,
      todas: "Svi kalkulatori",
      cuenta: "Vaš nalog",
      cuentaNota: "Nije obavezan. Služi da sačuvate obračune i imate ih pri ruci.",
      hecho: "Napravljeno u Argentini",
      escrito: "Napisali i proverili",
    },
  },
};

export const sr: Diccionario<TextosSitio> = { base };
