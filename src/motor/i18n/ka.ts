import { GRAMATICA } from "./gramatica";
import type { Diccionario } from "./resolver";
import type { TextosSitio } from "./tipos";

const g = GRAMATICA.ka;
const MUNDO = "საერთაშორისო ვერსია";

// Georgiano: un solo registro, el de rs.ge, TBC y Bank of Georgia: «თქვენ» con imperativo cortés
// («შეიყვანეთ», «აირჩიეთ», «გამოთვალეთ»), nunca la segunda del singular. Los botones van como
// sustantivo verbal («გამოთვლა», «კოპირება») o en imperativo cortés breve. La herramienta es
// «კალკულატორი». Sin mayúsculas (el mkhedruli no las tiene), comillas „ “ y sin plural detrás de un
// número («5 კალკულატორი»). El país lleva sufijo con GRAMATICA.ka: los sufijos nunca se pegan a una
// cifra ni a un marcador (ADR 0002, D26).
const base: TextosSitio = {
  marca: { nombre: "CalcularYa", lema: "კალკულატორები ოფიციალური მონაცემებით" },
  saltar: "შინაარსზე გადასვლა",
  header: {
    inicio: "მთავარი",
    elegirPais: "აირჩიეთ ქვეყანა",
    paisActual: (pais) => `ქვეყანა: ${pais}`,
    cerrar: "დახურვა",
    todos: "ყველა ქვეყანა",
    latinoamerica: MUNDO,
  },
  footer: {
    paises: "ქვეყნები",
    sitio: "CalcularYa",
    fuentes: "ოფიციალური წყაროები",
    novedades: "სიახლეები",
    privacidad: "კონფიდენციალურობა",
    terminos: "გამოყენების პირობები",
    contacto: "კონტაქტი",
    sobre: "ჩვენ შესახებ",
    argentina: "არგენტინაში ხართ? თქვენი კალკულატორები calcular.ar-ზეა",
    descargo: "შედეგები საორიენტაციოა. მნიშვნელოვანი გადაწყვეტილების მიღებამდე გადაამოწმეთ ისინი შესაბამის უწყებასთან ან სპეციალისტთან.",
    derechos: (anio) => `© ${anio} CalcularYa`,
  },
  sello: {
    titulo: "მოქმედი ოფიციალური მონაცემები",
    verificado: (organismos, fecha) => `მონაცემები შემოწმებულია წყაროებში: ${organismos}. განახლდა: ${fecha}.`,
    serie: (nombre, organismo, fecha) => `${nombre}: ავტომატურად ახლდება (წყარო: ${organismo}). ბოლო მნიშვნელობა: ${fecha}.`,
    verTodas: "ყველა წყაროს ნახვა",
  },
  calculadora: {
    comoSeCalcula: "როგორ ითვლება",
    ejemplo: "მაგალითი",
    faq: "ხშირად დასმული კითხვები",
    glosario: "ტერმინები",
    relacionadas: "სხვა კალკულატორები",
    otrosPaises: "იგივე გამოთვლა სხვა ქვეყნებში",
  },
  global: {
    eyebrow: "ოფიციალური მონაცემები თითოეული ქვეყნისთვის",
    titulo: "კალკულატორები სამუშაოსთვის, ფინანსებისთვის და ყოველდღიური საქმეებისთვის, თქვენი ქვეყნის მონაცემებით",
    bajada:
      "ხელფასი, სესხები, გადასახადები, თარიღები და სხვა. როცა შედეგი რომელიმე წესზეა დამოკიდებული, რიცხვი ოფიციალური წყაროდან მოდის, თარიღითა და ბმულით, რათა თავად შეძლოთ შემოწმება.",
    elegir: "აირჩიეთ თქვენი ქვეყანა",
    calculadoras: (n) => `${n} კალკულატორი`,
    vacio: "ახალ ქვეყნებს ვამატებთ. გთხოვთ, მალე შემოგვიაროთ.",
    promesaTitulo: "როგორ ვმუშაობთ",
    promesas: [
      { titulo: "ოფიციალური რიცხვები წყაროებით", texto: "ყოველი მნიშვნელობისთვის ვუთითებთ უწყებას, რომელიც მას აქვეყნებს, ბმულს და შემოწმების თარიღს." },
      { titulo: "ყოველთვის განახლებული", texto: "როცა მნიშვნელობა იცვლება, კალკულატორიც იცვლება. ყოველი ცვლილება სიახლეებში იწერება." },
      { titulo: "უფასოდ და რეგისტრაციის გარეშე", texto: "გამოთვლა თქვენს ბრაუზერში სრულდება. პირად მონაცემებს არ გთხოვთ." },
    ],
  },
  pais: {
    eyebrow: "მოქმედი ოფიციალური მონაცემები",
    titulo: (pais) => `კალკულატორები ${g.para(pais)}`,
    bajada: (pais) => `${g.en(pais)} მოქმედი მნიშვნელობებით, თითოეულის წყაროთი და შემოწმების თარიღით.`,
    novedades: "ბოლო სიახლეები",
    verNovedades: "ყველა სიახლის ნახვა",
    sinCalculadoras: "ამ ქვეყნისთვის კალკულატორები ჯერ არ გვაქვს.",
    descripcion: (pais) => `ხელფასის, გადასახადების, სესხებისა და ხარჯების კალკულატორები ${g.para(pais)}, ოფიციალური მონაცემებით.`,
    irASeccion: "განყოფილებაზე გადასვლა",
  },
  fuentes: {
    titulo: (pais) => `წყაროები და მონაცემები ${g.para(pais)}`,
    bajada: "ყოველი მნიშვნელობა, რომელსაც კალკულატორები იყენებს, მოქმედების პერიოდითა და ოფიციალური წყაროს ბმულით.",
    vigente: "მოქმედი მნიშვნელობა",
    desde: "დასაწყისი",
    hasta: "დასასრული",
    fuente: "წყარო",
    verificado: "შემოწმდა",
    region: "რეგიონი",
    series: "ავტომატურად განახლებადი მნიშვნელობები",
    ultimoDato: "ბოლო მნიშვნელობა",
    proximo: (valor, fecha) => `უკვე გამოქვეყნდა ახალი მნიშვნელობა: ${valor}. მოქმედების დასაწყისი: ${fecha}.`,
    sinVerificar: "დღევანდელი დღისთვის შემოწმებული მნიშვნელობა არ არის",
    tramos: (n) => `ცხრილი: ${n} საფეხური`,
    description: (pais) => `ოფიციალური მონაცემები ${g.para(pais)}: მოქმედი მნიშვნელობა, თარიღი და წყარო.`,
  },
  novedades: {
    titulo: (pais) => `სიახლეები ${g.para(pais)}`,
    bajada: "ცვლილებები წესებში, რომლებსაც კალკულატორები იყენებს, ძალაში შესვლის თარიღით.",
    vigenteDesde: (fecha) => `ძალაშია თარიღიდან: ${fecha}`,
    vacio: "ამ ქვეყნისთვის სიახლეები ჯერ არ არის.",
    description: (pais) => `ცვლილებები ხელფასსა და სხვა წესებში ${g.en(pais)}, თარიღითა და ოფიციალური წყაროთი.`,
  },
  avisoPais: {
    texto: (pais) => `როგორც ჩანს, ${g.en(pais)} იმყოფებით.`,
    ir: (pais) => `კალკულატორების ნახვა ${g.para(pais)}`,
    cerrar: "შეტყობინების დახურვა",
  },
  noEncontrada: {
    titulo: "ეს გვერდი ვერ მოიძებნა",
    texto: "შესაძლოა, მისამართი არასწორია ან გვერდი აღარ არსებობს.",
    volver: "მთავარ გვერდზე დაბრუნება",
    paises: "ან აირჩიეთ ქვეყანა",
  },
  categorias: {
    sueldo: "ხელფასი და ანაზღაურება",
    fin: "შრომითი ხელშეკრულების დასრულება",
    impuestos: "შენატანები და გადასახადები",
    dinero: "ფული და ინდექსები",
    finanzas: "სესხები, დანაზოგი და ინვესტიციები",
    negocio: "ბიზნესი და ფრილანსი",
    calculos: "სწრაფი გამოთვლები",
    fechas: "თარიღები და ასაკი",
    salud: "ჯანმრთელობა და ფიზიკური ფორმა",
    hogar: "სახლი, ავტომობილი და რემონტი",
    familia: "ოჯახი და საოჯახო ხარჯები",
    otras: "სხვა კალკულატორები",
  },
  migas: { inicio: "მთავარი", etiqueta: "თქვენ აქ ხართ" },
  seo: {
    tituloGlobal: "CalcularYa: უფასო ოფიციალური კალკულატორები",
    descripcionGlobal: "უფასო კალკულატორები ხელფასის, სესხებისა და გადასახადებისთვის ყველა ქვეყანაში, ოფიციალური მონაცემებითა და წყაროთი.",
    tituloPais: (pais, anio) => [`ხელფასისა და გადასახადების გამოთვლა ${g.en(pais)} (${anio})`, `კალკულატორები ${g.para(pais)} (${anio})`, `კალკულატორები ${g.para(pais)}`],
    tituloFuentes: (pais) => [`მოქმედი ოფიციალური მონაცემები ${g.para(pais)}: წყაროები და თარიღები`, `წყაროები და მონაცემები ${g.para(pais)}`],
    tituloNovedades: (pais, anio) => [`ცვლილებები ხელფასებსა და გადასახადებში ${g.en(pais)} (${anio})`, `სიახლეები ${g.para(pais)} (${anio})`, `სიახლეები ${g.para(pais)}`],
  },
  og: {
    datosOficiales: "ოფიციალური მონაცემები წყაროებით",
    actualizado: (fecha) => `განახლდა: ${fecha}`,
    gratis: "უფასოდ და რეგისტრაციის გარეშე",
    paises: (n) => `${n} ქვეყანა`,
  },
  shell: {
    irAlInicio: "მთავარ გვერდზე",
    menu: { trabajo: "ხელფასი და სამუშაო", impuestos: "გადასახადები", dinero: "ფული და ინდექსები", vida: "ყოველდღიური", novedades: "სიახლეები", planillas: "Excel-ის ცხრილები" },
    encabezado: {
      principal: "მთავარი მენიუ",
      buscar: "ძიება",
      buscarCalculadora: "მოძებნეთ კალკულატორი",
      abrirMenu: "მენიუს გახსნა",
      cerrarMenu: "მენიუს დახურვა",
      menu: "მენიუ",
      todas: "ყველა კალკულატორი",
      pieCajon: "მონაცემები ოფიციალური წყაროებიდან · შექმნილია არგენტინაში",
    },
    buscador: {
      dialogo: "ძიება CalcularYa-ზე",
      pregunta: "რისი გამოთვლა გსურთ?",
      recientes: "განაგრძეთ იქიდან, სადაც შეჩერდით",
      masUsado: "ყველაზე პოპულარული",
      sinResultados: "„{q}“: ვერაფერი მოიძებნა",
      sugerencia: "სცადეთ სხვა სიტყვა, მაგალითად „ხელფასი“, „სესხი“ ან „გადასახადი“.",
      verTodas: "ყველა კალკულატორის ნახვა",
      borrar: "ძიების გასუფთავება",
      cerrar: "დახურვა",
      cerrarBuscador: "ძიების დახურვა",
      moverte: "გადასაადგილებლად",
      abrir: "გასახსნელად",
      desdeCualquier: "ნებისმიერი გვერდიდან",
      resultados: "შედეგები",
      resultado: "შედეგი",
      resultadosPlural: "შედეგი",
    },
    paises: { titulo: "ქვეყნები", cambiar: "ქვეყნის შეცვლა" },
    pie: {
      bajada: (lugar) =>
        `გასაგები კალკულატორები ${lugar === MUNDO ? "თითოეული ქვეყნისთვის" : g.para(lugar)}. ყოველი რიცხვი იმ ოფიციალური დოკუმენტიდან მოდის, რომელიც მას ადგენს, შემოწმების თარიღით.`,
      todas: "ყველა კალკულატორი",
      cuenta: "თქვენი ანგარიში",
      cuentaNota: "სავალდებულო არ არის. გამოგადგებათ გამოთვლების შესანახად, რათა ყოველთვის ხელთ გქონდეთ.",
      hecho: "შექმნილია არგენტინაში",
      escrito: "დაწერა და შეამოწმა:",
    },
  },
};

export const ka: Diccionario<TextosSitio> = { base };
