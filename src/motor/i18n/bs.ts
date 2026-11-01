import { GRAMATICA } from "./gramatica";
import { pluralBs } from "./plural";
import type { Diccionario } from "./resolver";
import type { TextosSitio } from "./tipos";

const g = GRAMATICA.bs;
const MUNDO = "Međunarodna verzija";

// Bosnio: un solo registro para la web, el de los bancos y los servicios digitales del país (Porezna uprava
// FBiH, Poreska uprava RS, bancos con presencia en las dos entidades). Obraćanje na «vi», en minúscula, con
// imperativo de segunda del plural en la prosa («unesite», «izaberite», «vaša plata»); los botones van en la
// forma corta («Izračunaj», «Prikaži sve»). Los mercados van con trato "usted" y el diccionario se escribe en
// base (ADR 0002, D39). El nombre del país se declina con GRAMATICA.bs («u Bosni i Hercegovini», «za Bosnu i
// Hercegovinu») y los números con pluralBs (one/few/other).
const base: TextosSitio = {
  marca: { nombre: "CalcularYa", lema: "Kalkulatori sa službenim podacima" },
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
    fuentes: "Službeni izvori",
    novedades: "Novosti",
    privacidad: "Zaštita ličnih podataka",
    terminos: "Uslovi korištenja",
    contacto: "Kontakt",
    sobre: "O nama",
    argentina: "Da li ste u Argentini? Vaši su kalkulatori na calcular.ar",
    descargo: "Rezultati su informativni. Prije važne odluke provjerite ih kod nadležnog tijela ili stručnjaka.",
    derechos: (anio) => `© ${anio} CalcularYa`,
  },
  sello: {
    titulo: "Ažurni službeni podaci",
    verificado: (organismos, fecha) => `Podaci provjereni u izvorima: ${organismos}. Ažurirano ${fecha}.`,
    serie: (nombre, organismo, fecha) => `${nombre} se ažurira automatski prema podacima: ${organismo}. Posljednja vrijednost: ${fecha}.`,
    verTodas: "Prikaži sve izvore",
  },
  calculadora: {
    comoSeCalcula: "Kako se računa",
    ejemplo: "Primjer",
    faq: "Česta pitanja",
    glosario: "Pojmovnik",
    relacionadas: "Drugi kalkulatori",
    otrosPaises: "Isti izračun u drugim zemljama",
  },
  global: {
    eyebrow: "Službeni podaci za svaku zemlju",
    titulo: "Kalkulatori za posao, novac i svakodnevni život s podacima vaše zemlje",
    bajada: "Plata, krediti, porezi, datumi i još mnogo toga. Kada rezultat ovisi o propisu, broj dolazi iz službenog izvora, s datumom i linkom, kako biste ga mogli provjeriti.",
    elegir: "Izaberite svoju zemlju",
    calculadoras: (n) => pluralBs(n, "kalkulator", "kalkulatora", "kalkulatora"),
    vacio: "Dodajemo nove zemlje. Svratite ponovno uskoro.",
    promesaTitulo: "Kako radimo",
    promesas: [
      { titulo: "Službeni brojevi s izvorom", texto: "Za svaku vrijednost navodimo tijelo koje je objavljuje, link i datum kada smo je provjerili." },
      { titulo: "Uvijek ažurno", texto: "Kada se vrijednost promijeni, mijenja se i kalkulator. Svaku promjenu bilježimo u novostima." },
      { titulo: "Besplatno i bez registracije", texto: "Izračun se radi u vašem pretraživaču. Ne tražimo nikakve lične podatke." },
    ],
  },
  pais: {
    eyebrow: "Ažurni službeni podaci",
    titulo: (pais) => `Kalkulatori ${g.para(pais)}`,
    bajada: (pais) => `S vrijednostima koje vrijede ${g.en(pais)}, uz izvor svake od njih i datum kada smo ih provjerili.`,
    novedades: "Posljednje novosti",
    verNovedades: "Prikaži sve novosti",
    sinCalculadoras: "Za ovu zemlju još nemamo kalkulatore.",
    descripcion: (pais) => `Kalkulatori plate, poreza, kredita, štednje, zdravlja, datuma i domaćinstva ${g.para(pais)}, s važećom službenom vrijednošću i njenim izvorom.`,
    irASeccion: "Idi na odjeljak",
  },
  fuentes: {
    titulo: (pais) => `Izvori i podaci ${g.para(pais)}`,
    bajada: "Svaka vrijednost koju kalkulatori koriste, s periodom važenja i linkom na službeni izvor.",
    vigente: "Važeća vrijednost",
    desde: "Od",
    hasta: "Do",
    fuente: "Izvor",
    verificado: "Provjereno",
    region: "Regija",
    series: "Vrijednosti koje se ažuriraju automatski",
    ultimoDato: "Posljednja vrijednost",
    proximo: (valor, fecha) => `Već je objavljena vrijednost koja vrijedi od ${fecha}: ${valor}.`,
    sinVerificar: "Za danas nemamo provjerenu vrijednost",
    tramos: (n) => `Tabela: ${pluralBs(n, "razred", "razreda", "razreda")}`,
    description: (pais) => `Službeni podaci ${g.para(pais)} koje kalkulatori koriste: važeća vrijednost, datum primjene, izvor i datum provjere.`,
  },
  novedades: {
    titulo: (pais) => `Novosti ${g.para(pais)}`,
    bajada: "Promjene propisa koje kalkulatori koriste, s datumom primjene.",
    vigenteDesde: (fecha) => `Vrijedi od ${fecha}`,
    vacio: "Za ovu zemlju još nema novosti.",
    description: (pais) => `Promjene minimalne plate, doprinosa i drugih pravila ${g.en(pais)}, s datumom primjene i službenim izvorom.`,
  },
  avisoPais: {
    texto: (pais) => `Čini se da ste ${g.en(pais)}.`,
    ir: (pais) => `Prikaži kalkulatore ${g.para(pais)}`,
    cerrar: "Zatvori obavijest",
  },
  noEncontrada: {
    titulo: "Ovu stranicu nismo pronašli",
    texto: "Možda je u adresi greška ili stranica više ne postoji.",
    volver: "Natrag na početnu",
    paises: "Ili izaberite zemlju",
  },
  categorias: {
    sueldo: "Plate i rad",
    fin: "Prestanak radnog odnosa",
    impuestos: "Porezi i doprinosi",
    dinero: "Novac i indeksi",
    finanzas: "Krediti, štednja i ulaganja",
    negocio: "Preduzetnici i firme",
    calculos: "Brzi izračuni",
    fechas: "Datumi i godine",
    salud: "Zdravlje i kondicija",
    hogar: "Kuća, automobil i obnova",
    familia: "Porodica i domaćinstvo",
    otras: "Ostali kalkulatori",
  },
  migas: { inicio: "Početna", etiqueta: "Nalazite se ovdje" },
  seo: {
    tituloGlobal: "CalcularYa: besplatni kalkulatori sa službenim podacima",
    descripcionGlobal: "Besplatni kalkulatori za platu, kredite, poreze i druge izračune u svakoj zemlji, s važećom službenom vrijednošću i njenim izvorom.",
    tituloPais: (pais, anio) => [
      `Kalkulatori plate i poreza ${g.para(pais)} ${anio}`,
      `Kalkulatori ${g.para(pais)} ${anio}`,
      `Kalkulatori ${g.para(pais)}`,
    ],
    tituloFuentes: (pais) => [`Važeći službeni podaci ${g.para(pais)}: izvori i datumi`, `Izvori i podaci ${g.para(pais)}`],
    tituloNovedades: (pais, anio) => [
      `Promjene plata i poreza ${g.en(pais)} ${anio}`,
      `Novosti ${g.para(pais)} ${anio}`,
      `Novosti ${g.para(pais)}`,
    ],
  },
  og: {
    datosOficiales: "Službeni podaci s izvorima",
    actualizado: (fecha) => `Ažurirano ${fecha}`,
    gratis: "Besplatno i bez registracije",
    paises: (n) => pluralBs(n, "zemlja", "zemlje", "zemalja"),
  },
  shell: {
    irAlInicio: "na početnu",
    menu: { trabajo: "Plate i rad", impuestos: "Porezi", dinero: "Novac i indeksi", vida: "Svakodnevni kalkulatori", novedades: "Novosti", planillas: "Excel tabele" },
    encabezado: {
      principal: "Glavni meni",
      buscar: "Pretraživanje",
      buscarCalculadora: "Pronađite kalkulator",
      abrirMenu: "Otvori meni",
      cerrarMenu: "Zatvori meni",
      menu: "Meni",
      todas: "Svi kalkulatori",
      pieCajon: "Podaci iz službenih izvora · Izrađeno u Argentini",
    },
    buscador: {
      dialogo: "Pretraživanje na CalcularYa",
      pregunta: "Šta želite izračunati?",
      recientes: "Nastavite gdje ste stali",
      masUsado: "Najkorišteniji",
      sinResultados: "Za „{q}” nismo ništa pronašli",
      sugerencia: "Probajte drugu riječ, na primjer „plata”, „kredit” ili „porez”.",
      verTodas: "Prikaži sve kalkulatore",
      borrar: "Obriši pretragu",
      cerrar: "Zatvori",
      cerrarBuscador: "Zatvori pretraživanje",
      moverte: "za kretanje",
      abrir: "za otvaranje",
      desdeCualquier: "s bilo koje stranice",
      resultados: "Rezultati",
      resultado: "rezultat",
      resultadosPlural: "rezultata",
      resultadosPocos: "rezultata",
    },
    paises: { titulo: "Zemlje", cambiar: "Promjena zemlje" },
    pie: {
      bajada: (lugar) =>
        `Jasni kalkulatori ${lugar === MUNDO ? "za svaku zemlju" : g.para(lugar)}. Svaki broj dolazi iz službenog dokumenta koji ga propisuje i ima datum kada smo ga provjerili.`,
      todas: "Svi kalkulatori",
      cuenta: "Vaš račun",
      cuentaNota: "Nije obavezan. Služi za čuvanje izračuna kako biste ih imali pri ruci.",
      hecho: "Izrađeno u Argentini",
      escrito: "Napisali i provjerili",
    },
  },
};

export const bs: Diccionario<TextosSitio> = { base };
