import { pluralSl } from "./plural";
import { pluralIs } from "./plural";
import { pluralAr } from "./arabe";
import { cifrasBn } from "./bengali";
import { casosEl, GRAMATICA, mayusculaHu } from "./gramatica";
import { DIAS_HE, pluralHe, prefijoHe, type FormasHe } from "./hebreo";
import { conteoMn, formaRu, pluralBg, pluralCs, pluralEl, pluralLv, pluralPl, pluralRo, pluralRu, pluralSk, pluralUk } from "./plural";
import { pluralSr } from "./plural";
import { pluralHr } from "./plural";
import { rasatSq } from "./gramatica";
import { pluralSq } from "./plural";
import { pluralMk } from "./plural";
import { resolver, type Diccionario, type Diccionarios } from "./resolver";
import { PT_LUSOFONIA } from "./variantes";
import type { Idioma, Trato } from "../tipos";

// «Tu sueldo en el mundo». El servidor resuelve el diccionario y le pasa al navegador solo cadenas
// (src/motor/mundo/ui/textos-cliente.ts): las funciones no cruzan a un Client Component y así el JS de
// la página no carga los diez idiomas.

export type RegionMundo = "americas" | "europa" | "asia" | "africa";

export interface PreguntaMundo {
  pregunta: string;
  respuesta: string;
}

export interface TextosMundo {
  nombre: string;
  seo: {
    // Candidatos de mayor a menor; elegirTitulo toma el primero que entra en 60 de ancho.
    titulo: (pais: string) => readonly string[];
    tituloGlobal: readonly string[];
    descripcion: (pais: string, paises: number) => string;
    descripcionGlobal: (paises: number) => string;
  };
  ceja: string;
  h1: string;
  bajada: (paises: number) => string;
  form: {
    titulo: string;
    sueldo: string;
    mes: string;
    anio: string;
    periodo: string;
    pais: string;
    ejemplo: string;
    ejemploAyuda: string;
    propio: string;
    invalido: string;
    // Ayuda del modo «por mes» en un país con más de 12 pagas de ley.
    pagas: string;
  };
  heroe: {
    // La página parte la frase en la fecha para dibujarla grande: en japonés, coreano y chino el
    // verbo va después de la fecha.
    hasta: (fecha: string) => string;
    tasa: (pct: string) => string;
    dias: (n: number, total: number) => string;
    enMano: string;
    porMes: string;
    anio: (anio: number, n: number, total: number) => string;
    resto: string;
  };
  ranking: {
    titulo: string;
    bajada: string;
    lista: string;
    buscar: string;
    filtrar: string;
    todas: string;
    regiones: Record<RegionMundo, string>;
    tuPais: string;
    mejor: string;
    enMano: string;
    enTuMoneda: string;
    vsTuPais: string;
    verTodos: (n: number) => string;
    verMenos: string;
    sinResultados: (q: string) => string;
    abrir: (pais: string) => string;
    mas: (pct: string) => string;
    menos: (pct: string) => string;
    igual: string;
    puesto: (posicion: number, total: number) => string;
  };
  tarjeta: {
    titulo: string;
    bajada: string;
    hasta: (fecha: string) => string;
    tasa: (pct: string) => string;
    mejor: (pais: string, pct: string) => string;
    mejorPropio: (pais: string) => string;
    yVos: string;
    cta: string;
    generica: string;
    genericaBajada: (paises: number) => string;
    compartir: string;
    compartirDuelo: string;
    descargar: string;
    copiado: string;
    compartido: string;
    error: string;
    texto: (fecha: string) => string;
    alt: string;
  };
  duelo: {
    amigo: (fecha: string) => string;
    yVos: string;
    invitacion: string;
    vos: string;
    elAmigo: string;
    dia: string;
    tasa: string;
    mejorPais: string;
    antes: (dias: number) => string;
    despues: (dias: number) => string;
    empate: string;
    desde: (pais: string) => string;
  };
  // Carga cero: la calculadora no descuenta nada. En vez de «hasta el 1 de enero», la página dice
  // `heroeAntes` + `dia` (grande) + `motivo`; la tarjeta, `tarjetaAntes` + `dia` + `motivo`.
  cero: {
    dia: string;
    heroeAntes: string;
    tarjetaAntes: string;
    motivo: string;
    texto: string;
    amigo: string;
  };
  metodo: {
    titulo: string;
    estimacion: string;
    supuestos: readonly string[];
    ppaTitulo: string;
    // Nombre del organismo de la PPA en el idioma de la página (la grilla lo trae en español).
    bancoMundial: string;
    ppa: (organismo: string, indicador: string, anio: string) => string;
    consultado: (fecha: string) => string;
    verFuente: string;
    fuentesTitulo: string;
    fuentesBajada: string;
    verificado: (fecha: string) => string;
    sello: (fecha: string) => string;
  };
  faqTitulo: string;
  faq: (paises: number) => readonly PreguntaMundo[];
  destacado: { ceja: string; titulo: string; texto: string; ir: string };
}

// ───────────────────────────── es ─────────────────────────────

const gEs = GRAMATICA.es;
const SEO_ES = "Día de libertad tributaria y sueldo neto en el mundo";

const es: Diccionario<TextosMundo> = {
  base: {
    nombre: "Tu sueldo en el mundo",
    seo: {
      titulo: (pais) => [`${SEO_ES} | ${pais}`, SEO_ES, "Tu sueldo en el mundo"],
      tituloGlobal: [SEO_ES, "Tu sueldo en el mundo"],
      descripcion: (pais, n) => `Mira hasta qué día trabajas para el Estado con tu sueldo ${gEs.de(pais)} y cuánto te quedaría en mano en ${n} países. Gratis y sin registro.`,
      descripcionGlobal: (n) => `Mira hasta qué día trabajas para el Estado y cuánto te quedaría en mano con tu sueldo en ${n} países. Gratis y sin registro.`,
    },
    ceja: "Día de libertad tributaria",
    h1: "¿Hasta qué día del año trabajas para el Estado?",
    bajada: (n) => `Escribe tu sueldo bruto y mira tu fecha. Después compáralo en ${n} países, con el mismo poder de compra y la ley de cada uno.`,
    form: {
      titulo: "Tu sueldo",
      sueldo: "Sueldo bruto",
      mes: "Por mes",
      anio: "Por año",
      periodo: "Período del sueldo",
      pais: "País donde trabajas",
      ejemplo: "Ejemplo",
      ejemploAyuda: "Es un sueldo de ejemplo. Escribe el tuyo y todo se recalcula al instante.",
      propio: "Lo trajimos de tu cálculo.",
      invalido: "Escribe un monto mayor que cero.",
      pagas: "Tu sueldo mensual de recibo: sumamos el aguinaldo y los sueldos extra de ley. Lo que te queda en mano es el promedio de los 12 meses.",
    },
    heroe: {
      hasta: (fecha) => `Trabajas para el Estado hasta el ${fecha}`,
      tasa: (pct) => `Se va el ${pct} de tu sueldo en impuesto a la renta y aportes.`,
      dias: (n, total) => `${n} de ${total} días`,
      enMano: "Te queda en mano",
      porMes: "por mes",
      anio: (anio, n, total) => `Año ${anio}: ${n} de ${total} días para el Estado.`,
      resto: "Desde el día siguiente, lo que ganas es tuyo.",
    },
    ranking: {
      titulo: "Tu mismo sueldo, país por país",
      bajada: "Con el mismo poder de compra, esto te quedaría en mano en cada país. Cada fila sale de la calculadora oficial de ese país. Es el mismo sueldo en todos lados: solo cambian los impuestos y aportes, no lo que se gana en cada país.",
      lista: "Países ordenados por lo que te queda en mano",
      buscar: "Buscar un país",
      filtrar: "Filtrar por región",
      todas: "Todos",
      regiones: { americas: "América", europa: "Europa", asia: "Asia y Oceanía", africa: "África y Medio Oriente" },
      tuPais: "Tu país",
      mejor: "Menos impuestos",
      enMano: "En mano por mes",
      enTuMoneda: "En tu moneda",
      vsTuPais: "Contra tu país",
      verTodos: (n) => `Ver los ${n} países`,
      verMenos: "Ver menos",
      sinResultados: (q) => `Ningún país coincide con «${q}».`,
      abrir: (pais) => `Abrir la calculadora ${gEs.de(pais)}`,
      mas: (pct) => `${pct} más`,
      menos: (pct) => `${pct} menos`,
      igual: "Igual",
      puesto: (p, total) => `Tu país queda en el puesto ${p} de ${total}.`,
    },
    tarjeta: {
      titulo: "Tu tarjeta para compartir",
      bajada: "Muestra tu fecha y porcentajes. Nunca cuánto ganas.",
      hasta: (fecha) => `Trabajo para el Estado hasta el ${fecha}`,
      tasa: (pct) => `Se va el ${pct} de mi sueldo`,
      mejor: (pais, pct) => `Con el mismo sueldo, ${gEs.en(pais)} pagaría menos impuestos: me quedaría ${pct} más en mano`,
      mejorPropio: (pais) => `Con mi sueldo, ningún país me deja más en mano que ${gEs.nombre(pais)}`,
      yVos: "¿Y tú?",
      cta: "Calcula el tuyo en",
      generica: "¿Hasta qué día trabajas para el Estado?",
      genericaBajada: (n) => `Tu sueldo en ${n} países, con la calculadora oficial de cada uno`,
      compartir: "Compartir mi tarjeta",
      compartirDuelo: "Devolver el desafío",
      descargar: "Descargar imagen",
      copiado: "Link copiado. Pégalo donde quieras.",
      compartido: "Listo, ya la compartiste.",
      error: "No pudimos compartirla. Prueba de nuevo.",
      texto: (fecha) => `Trabajo para el Estado hasta el ${fecha}. ¿Y tú?`,
      alt: "Vista previa de tu tarjeta",
    },
    duelo: {
      amigo: (fecha) => `Tu amigo trabaja para el Estado hasta el ${fecha}.`,
      yVos: "¿Y tú?",
      invitacion: "Escribe tu sueldo y compáralo.",
      vos: "Tú",
      elAmigo: "Tu amigo",
      dia: "Para el Estado hasta el",
      tasa: "Impuestos y aportes",
      mejorPais: "Menos impuestos en",
      antes: (d) => (d === 1 ? "Te liberas 1 día antes que tu amigo." : `Te liberas ${d} días antes que tu amigo.`),
      despues: (d) => (d === 1 ? "Tu amigo se libera 1 día antes que tú." : `Tu amigo se libera ${d} días antes que tú.`),
      empate: "Se liberan el mismo día.",
      desde: (pais) => `Trabaja ${gEs.en(pais)}`,
    },
    cero: { dia: "cero días", heroeAntes: "Para el Estado trabajas", tarjetaAntes: "Para el Estado trabajo", motivo: "Con este sueldo no se descuenta impuesto a la renta ni aportes.", texto: "Este año no trabajo ni un día para el Estado. ¿Y tú?", amigo: "Tu amigo no trabaja ni un día para el Estado." },
    metodo: {
      titulo: "Cómo lo calculamos",
      estimacion: "Es una estimación para comparar países, no un recibo de sueldo. Deducciones, hijos o bonos pueden mover tu número.",
      supuestos: [
        "Una persona soltera, sin hijos, con los valores por defecto de la calculadora de cada país.",
        "El neto es lo que queda después del impuesto a la renta y de los aportes que paga la persona. No incluye IVA ni lo que paga el empleador.",
        "El aguinaldo y los sueldos extra se reparten en el año como manda la ley de cada país.",
        "En Estados Unidos no se suma impuesto estatal ni local: solo el federal y los aportes.",
        "Para llevar tu sueldo a otro país usamos la paridad de poder adquisitivo (PPA): el mismo nivel de vida, no el tipo de cambio del día.",
        "La PPA de Argentina se lleva al año actual con el IPC del INDEC, porque el Banco Mundial la publica hasta 2021.",
        "El día de libertad reparte tu carga desde el 1 de enero. Si se va el 30 % de tu sueldo, trabajas para el Estado el 30 % del año.",
      ],
      ppaTitulo: "Paridad de poder adquisitivo", bancoMundial: "Banco Mundial",
      ppa: (organismo, indicador, anio) => `${organismo}, indicador ${indicador}, último año disponible ${anio}.`,
      consultado: (fecha) => `Consultado el ${fecha}.`,
      verFuente: "Ver la fuente",
      fuentesTitulo: "La fuente de cada país",
      fuentesBajada: "Cada fila usa la calculadora de sueldo neto de ese país, con sus datos oficiales.",
      verificado: (fecha) => `Datos verificados el ${fecha}`,
      sello: (fecha) => `Datos oficiales revisados en la fuente de cada país. La revisión más antigua es del ${fecha}.`,
    },
    faqTitulo: "Preguntas frecuentes",
    faq: (n) => [
      {
        pregunta: "¿Qué es el día de libertad tributaria?",
        respuesta:
          "Es el día del año en que terminas de pagar tus impuestos y aportes, si todo lo que ganas desde el 1 de enero fuera primero al Estado. Acá lo calculamos con tu sueldo, no con el promedio del país.",
      },
      {
        pregunta: "¿Por qué se compara en poder de compra?",
        respuesta: "Con el tipo de cambio, un sueldo parece enorme o mínimo según el día. La PPA compara lo que se puede comprar con ese dinero en cada país.",
      },
      {
        pregunta: "¿Se guarda mi sueldo?",
        respuesta: "No. La cuenta corre en tu navegador. Lo que compartes solo lleva fechas, porcentajes y países.",
      },
      {
        pregunta: "¿Por qué mi sueldo neto real es distinto?",
        respuesta:
          "Usamos una persona soltera, sin hijos y con los valores por defecto. Deducciones, bonos o regímenes especiales cambian el número. Para tu caso exacto, abre la calculadora de tu país.",
      },
      {
        pregunta: "¿Qué países están incluidos?",
        respuesta: `Hoy son ${n} países, cada uno con su calculadora de sueldo neto y sus datos oficiales. Sumamos más a medida que verificamos sus leyes.`,
      },
    ],
    destacado: {
      ceja: "Comparador mundial",
      titulo: "¿Hasta qué día trabajas para el Estado?",
      texto: "Escribe tu sueldo y mira cuánto te quedaría en mano en otros países.",
      ir: "Calcular mi fecha",
    },
  },
  vos: {
    cero: { heroeAntes: "Para el Estado trabajás", texto: "Este año no trabajo ni un día para el Estado. ¿Y vos?" },
    seo: {
      descripcion: (pais, n) => `Mirá hasta qué día trabajás para el Estado con tu sueldo ${gEs.de(pais)} y cuánto te quedaría en mano en ${n} países. Gratis y sin registro.`,
      descripcionGlobal: (n) => `Mirá hasta qué día trabajás para el Estado y cuánto te quedaría en mano con tu sueldo en ${n} países. Gratis y sin registro.`,
    },
    h1: "¿Hasta qué día del año trabajás para el Estado?",
    bajada: (n) => `Escribí tu sueldo bruto y mirá tu fecha. Después comparalo en ${n} países, con el mismo poder de compra y la ley de cada uno.`,
    form: {
      pais: "País donde trabajás",
      ejemploAyuda: "Es un sueldo de ejemplo. Escribí el tuyo y todo se recalcula al instante.",
      invalido: "Escribí un monto mayor que cero.",
    },
    heroe: { hasta: (fecha) => `Trabajás para el Estado hasta el ${fecha}`, resto: "Desde el día siguiente, lo que ganás es tuyo." },
    tarjeta: {
      bajada: "Muestra tu fecha y porcentajes. Nunca cuánto ganás.",
      yVos: "¿Y vos?",
      cta: "Calculá el tuyo en",
      generica: "¿Hasta qué día trabajás para el Estado?",
      copiado: "Link copiado. Pegalo donde quieras.",
      compartido: "Listo, ya la compartiste.",
      error: "No pudimos compartirla. Probá de nuevo.",
      texto: (fecha) => `Trabajo para el Estado hasta el ${fecha}. ¿Y vos?`,
    },
    duelo: {
      yVos: "¿Y vos?",
      invitacion: "Escribí tu sueldo y comparalo.",
      vos: "Vos",
      antes: (d) => (d === 1 ? "Te liberás 1 día antes que tu amigo." : `Te liberás ${d} días antes que tu amigo.`),
      despues: (d) => (d === 1 ? "Tu amigo se libera 1 día antes que vos." : `Tu amigo se libera ${d} días antes que vos.`),
    },
    metodo: {
      supuestos: [
        "Una persona soltera, sin hijos, con los valores por defecto de la calculadora de cada país.",
        "El neto es lo que queda después del impuesto a la renta y de los aportes que paga la persona. No incluye IVA ni lo que paga el empleador.",
        "El aguinaldo y los sueldos extra se reparten en el año como manda la ley de cada país.",
        "En Estados Unidos no se suma impuesto estatal ni local: solo el federal y los aportes.",
        "Para llevar tu sueldo a otro país usamos la paridad de poder adquisitivo (PPA): el mismo nivel de vida, no el tipo de cambio del día.",
        "La PPA de Argentina se lleva al año actual con el IPC del INDEC, porque el Banco Mundial la publica hasta 2021.",
        "El día de libertad reparte tu carga desde el 1 de enero. Si se va el 30 % de tu sueldo, trabajás para el Estado el 30 % del año.",
      ],
    },
    faq: (n) => [
      {
        pregunta: "¿Qué es el día de libertad tributaria?",
        respuesta:
          "Es el día del año en que terminás de pagar tus impuestos y aportes, si todo lo que ganás desde el 1 de enero fuera primero al Estado. Acá lo calculamos con tu sueldo, no con el promedio del país.",
      },
      {
        pregunta: "¿Por qué se compara en poder de compra?",
        respuesta: "Con el tipo de cambio, un sueldo parece enorme o mínimo según el día. La PPA compara lo que se puede comprar con ese dinero en cada país.",
      },
      {
        pregunta: "¿Se guarda mi sueldo?",
        respuesta: "No. La cuenta corre en tu navegador. Lo que compartís solo lleva fechas, porcentajes y países.",
      },
      {
        pregunta: "¿Por qué mi sueldo neto real es distinto?",
        respuesta:
          "Usamos una persona soltera, sin hijos y con los valores por defecto. Deducciones, bonos o regímenes especiales cambian el número. Para tu caso exacto, abrí la calculadora de tu país.",
      },
      {
        pregunta: "¿Qué países están incluidos?",
        respuesta: `Hoy son ${n} países, cada uno con su calculadora de sueldo neto y sus datos oficiales. Sumamos más a medida que verificamos sus leyes.`,
      },
    ],
    destacado: {
      titulo: "¿Hasta qué día trabajás para el Estado?",
      texto: "Escribí tu sueldo y mirá cuánto te quedaría en mano en otros países.",
    },
  },
  usted: {
    cero: { heroeAntes: "Para el Estado trabaja", texto: "Este año no trabajo ni un día para el Estado. ¿Y usted?", amigo: "Quien le mandó esto no trabaja ni un día para el Estado." },
    nombre: "Su sueldo en el mundo",
    seo: {
      titulo: (pais) => [`${SEO_ES} | ${pais}`, SEO_ES, "Su sueldo en el mundo"],
      tituloGlobal: [SEO_ES, "Su sueldo en el mundo"],
      descripcion: (pais, n) => `Vea hasta qué día trabaja para el Estado con su sueldo ${gEs.de(pais)} y cuánto le quedaría en mano en ${n} países. Gratis y sin registro.`,
      descripcionGlobal: (n) => `Vea hasta qué día trabaja para el Estado y cuánto le quedaría en mano con su sueldo en ${n} países. Gratis y sin registro.`,
    },
    h1: "¿Hasta qué día del año trabaja para el Estado?",
    bajada: (n) => `Escriba su sueldo bruto y vea su fecha. Después compárelo en ${n} países, con el mismo poder de compra y la ley de cada uno.`,
    form: {
      pagas: "Su sueldo mensual de recibo: sumamos el aguinaldo y los sueldos extra de ley. Lo que le queda en mano es el promedio de los 12 meses.",
      titulo: "Su sueldo",
      pais: "País donde trabaja",
      ejemploAyuda: "Es un sueldo de ejemplo. Escriba el suyo y todo se recalcula al instante.",
      propio: "Lo trajimos de su cálculo.",
      invalido: "Escriba un monto mayor que cero.",
    },
    heroe: {
      hasta: (fecha) => `Trabaja para el Estado hasta el ${fecha}`,
      tasa: (pct) => `Se va el ${pct} de su sueldo en impuesto a la renta y aportes.`,
      enMano: "Le queda en mano",
      resto: "Desde el día siguiente, lo que gana es suyo.",
    },
    ranking: {
      titulo: "Su mismo sueldo, país por país",
      bajada: "Con el mismo poder de compra, esto le quedaría en mano en cada país. Cada fila sale de la calculadora oficial de ese país. Es el mismo sueldo en todos lados: solo cambian los impuestos y aportes, no lo que se gana en cada país.",
      lista: "Países ordenados por lo que le queda en mano",
      tuPais: "Su país",
      enTuMoneda: "En su moneda",
      vsTuPais: "Contra su país",
      puesto: (p, total) => `Su país queda en el puesto ${p} de ${total}.`,
    },
    tarjeta: {
      titulo: "Su tarjeta para compartir",
      bajada: "Muestra su fecha y porcentajes. Nunca cuánto gana.",
      yVos: "¿Y usted?",
      cta: "Calcule el suyo en",
      generica: "¿Hasta qué día trabaja para el Estado?",
      genericaBajada: (n) => `Su sueldo en ${n} países, con la calculadora oficial de cada uno`,
      copiado: "Link copiado. Péguelo donde quiera.",
      compartido: "Listo, ya la compartió.",
      error: "No pudimos compartirla. Pruebe de nuevo.",
      texto: (fecha) => `Trabajo para el Estado hasta el ${fecha}. ¿Y usted?`,
      alt: "Vista previa de su tarjeta",
    },
    duelo: {
      amigo: (fecha) => `Quien le mandó esto trabaja para el Estado hasta el ${fecha}.`,
      yVos: "¿Y usted?",
      invitacion: "Escriba su sueldo y compárelo.",
      vos: "Usted",
      elAmigo: "Quien lo envió",
      antes: (d) => (d === 1 ? "Usted se libera 1 día antes." : `Usted se libera ${d} días antes.`),
      despues: (d) => (d === 1 ? "Quien lo envió se libera 1 día antes." : `Quien lo envió se libera ${d} días antes.`),
    },
    metodo: {
      estimacion: "Es una estimación para comparar países, no un recibo de sueldo. Deducciones, hijos o bonos pueden mover su número.",
      supuestos: [
        "Una persona soltera, sin hijos, con los valores por defecto de la calculadora de cada país.",
        "El neto es lo que queda después del impuesto a la renta y de los aportes que paga la persona. No incluye IVA ni lo que paga el empleador.",
        "El aguinaldo y los sueldos extra se reparten en el año como manda la ley de cada país.",
        "En Estados Unidos no se suma impuesto estatal ni local: solo el federal y los aportes.",
        "Para llevar su sueldo a otro país usamos la paridad de poder adquisitivo (PPA): el mismo nivel de vida, no el tipo de cambio del día.",
        "La PPA de Argentina se lleva al año actual con el IPC del INDEC, porque el Banco Mundial la publica hasta 2021.",
        "El día de libertad reparte su carga desde el 1 de enero. Si se va el 30 % de su sueldo, trabaja para el Estado el 30 % del año.",
      ],
    },
    faq: (n) => [
      {
        pregunta: "¿Qué es el día de libertad tributaria?",
        respuesta:
          "Es el día del año en que termina de pagar sus impuestos y aportes, si todo lo que gana desde el 1 de enero fuera primero al Estado. Acá lo calculamos con su sueldo, no con el promedio del país.",
      },
      {
        pregunta: "¿Por qué se compara en poder de compra?",
        respuesta: "Con el tipo de cambio, un sueldo parece enorme o mínimo según el día. La PPA compara lo que se puede comprar con ese dinero en cada país.",
      },
      {
        pregunta: "¿Se guarda mi sueldo?",
        respuesta: "No. La cuenta corre en su navegador. Lo que comparte solo lleva fechas, porcentajes y países.",
      },
      {
        pregunta: "¿Por qué mi sueldo neto real es distinto?",
        respuesta:
          "Usamos una persona soltera, sin hijos y con los valores por defecto. Deducciones, bonos o regímenes especiales cambian el número. Para su caso exacto, abra la calculadora de su país.",
      },
      {
        pregunta: "¿Qué países están incluidos?",
        respuesta: `Hoy son ${n} países, cada uno con su calculadora de sueldo neto y sus datos oficiales. Sumamos más a medida que verificamos sus leyes.`,
      },
    ],
    destacado: {
      titulo: "¿Hasta qué día trabaja para el Estado?",
      texto: "Escriba su sueldo y vea cuánto le quedaría en mano en otros países.",
      ir: "Calcular su fecha",
    },
  },
};

// ───────────────────────────── en ─────────────────────────────

const gEn = GRAMATICA.en;
const SEO_EN = "Your Tax Freedom Day and take-home pay worldwide";

const en: Diccionario<TextosMundo> = {
  base: {
    nombre: "Your salary around the world",
    seo: {
      titulo: (pais) => [`${SEO_EN} | ${pais}`, SEO_EN, "Your salary around the world"],
      tituloGlobal: [SEO_EN, "Your salary around the world"],
      descripcion: (pais, n) => `See the day you stop working for the government on a salary ${gEn.en(pais)}, and what you'd take home in ${n} countries. Free, no sign-up.`,
      descripcionGlobal: (n) => `See the day you stop working for the government, and what your salary would take home in ${n} countries. Free, no sign-up.`,
    },
    ceja: "Your Tax Freedom Day",
    h1: "Until what day of the year do you work for the government?",
    bajada: (n) => `Enter your gross salary to see your date. Then compare it across ${n} countries, with the same buying power and each country's tax rules.`,
    form: {
      titulo: "Your salary",
      sueldo: "Gross salary",
      mes: "Monthly",
      anio: "Yearly",
      periodo: "Pay period",
      pais: "Country you work in",
      ejemplo: "Example",
      ejemploAyuda: "This is a sample salary. Type yours and everything updates instantly.",
      propio: "Brought over from your calculation.",
      invalido: "Enter an amount above zero.",
      pagas: "Your monthly payslip salary: we add the extra payments required by law (13th or 14th salary). Take-home pay is the average over 12 months.",
    },
    heroe: {
      hasta: (fecha) => `You work for the government until ${fecha}`,
      tasa: (pct) => `${pct} of your pay goes to income tax and payroll contributions.`,
      dias: (n, total) => `${n} of ${total} days`,
      enMano: "You take home",
      porMes: "a month",
      anio: (anio, n, total) => `${anio}: ${n} of ${total} days for the government.`,
      resto: "From the next day on, what you earn is yours.",
    },
    ranking: {
      titulo: "The same salary, country by country",
      bajada: "With the same buying power, this is what you'd take home in each country. Every row comes from that country's official calculator. It's the same salary everywhere: only taxes and contributions change, not what people earn in each country.",
      lista: "Countries ranked by take-home pay",
      buscar: "Search a country",
      filtrar: "Filter by region",
      todas: "All",
      regiones: { americas: "Americas", europa: "Europe", asia: "Asia and Oceania", africa: "Africa and Middle East" },
      tuPais: "Your country",
      mejor: "Lowest tax",
      enMano: "Take-home a month",
      enTuMoneda: "In your currency",
      vsTuPais: "Versus your country",
      verTodos: (n) => `See all ${n} countries`,
      verMenos: "See fewer",
      sinResultados: (q) => `No country matches “${q}”.`,
      abrir: (pais) => `Open the calculator for ${gEn.nombre(pais)}`,
      mas: (pct) => `${pct} more`,
      menos: (pct) => `${pct} less`,
      igual: "Same",
      puesto: (p, total) => `Your country ranks ${p} of ${total}.`,
    },
    tarjeta: {
      titulo: "Your card to share",
      bajada: "It shows your date and percentages. Never what you earn.",
      hasta: (fecha) => `I work for the government until ${fecha}`,
      tasa: (pct) => `${pct} of my pay goes in taxes`,
      mejor: (pais, pct) => `On the same salary, I'd pay less tax ${gEn.en(pais)}: ${pct} more take-home pay`,
      mejorPropio: (pais) => `On my salary, no country leaves me more than ${gEn.nombre(pais)}`,
      yVos: "What about you?",
      cta: "Find yours at",
      generica: "Until what day do you work for the government?",
      genericaBajada: (n) => `Your salary in ${n} countries, run through each one's official calculator`,
      compartir: "Share my card",
      compartirDuelo: "Send the challenge back",
      descargar: "Download image",
      copiado: "Link copied. Paste it anywhere.",
      compartido: "Done, it's shared.",
      error: "Couldn't share it. Try again.",
      texto: (fecha) => `I work for the government until ${fecha}. What about you?`,
      alt: "Preview of your card",
    },
    duelo: {
      amigo: (fecha) => `Your friend works for the government until ${fecha}.`,
      yVos: "What about you?",
      invitacion: "Enter your salary to compare.",
      vos: "You",
      elAmigo: "Your friend",
      dia: "Works for the government until",
      tasa: "Tax and contributions",
      mejorPais: "Lowest tax in",
      antes: (d) => (d === 1 ? "You're free 1 day before your friend." : `You're free ${d} days before your friend.`),
      despues: (d) => (d === 1 ? "Your friend is free 1 day before you." : `Your friend is free ${d} days before you.`),
      empate: "You're both free on the same day.",
      desde: (pais) => `Works ${gEn.en(pais)}`,
    },
    cero: { dia: "zero days", heroeAntes: "You work for the government", tarjetaAntes: "I work for the government", motivo: "On this salary, no income tax or payroll contributions are deducted.", texto: "I don't work a single day for the government this year. What about you?", amigo: "Your friend doesn't work a single day for the government." },
    metodo: {
      titulo: "How we calculate it",
      estimacion: "This is an estimate to compare countries, not a payslip. Deductions, children or bonuses can move your number.",
      supuestos: [
        "A single person with no children, using the default values of each country's calculator.",
        "Take-home pay is what's left after income tax and the employee's own contributions. It leaves out sales tax and what the employer pays.",
        "A 13th-month salary or other mandatory extra pay is spread over the year as each country's law says.",
        "In the United States no state or local income tax is added: only federal tax and payroll contributions.",
        "To carry your salary to another country we use purchasing power parity (PPP): the same standard of living, not today's exchange rate.",
        "Argentina's PPP is brought forward with INDEC's consumer price index, because the World Bank only publishes it up to 2021.",
        "Your freedom day spreads your tax over the year from 1 January. If 30% of your pay goes in tax, you work for the government 30% of the year.",
      ],
      ppaTitulo: "Purchasing power parity", bancoMundial: "World Bank",
      ppa: (organismo, indicador, anio) => `${organismo}, indicator ${indicador}, latest year available ${anio}.`,
      consultado: (fecha) => `Checked on ${fecha}.`,
      verFuente: "See the source",
      fuentesTitulo: "Each country's source",
      fuentesBajada: "Every row uses that country's take-home pay calculator and its official data.",
      verificado: (fecha) => `Data verified on ${fecha}`,
      sello: (fecha) => `Official data checked at each country's source. The oldest check is from ${fecha}.`,
    },
    faqTitulo: "Frequently asked questions",
    faq: (n) => [
      {
        pregunta: "What is Tax Freedom Day?",
        respuesta:
          "It's the day of the year when you finish paying your taxes, if everything you earned from 1 January went to the government first. Here it's worked out from your salary, not the national average.",
      },
      {
        pregunta: "Why compare by buying power?",
        respuesta: "Exchange rates make a salary look huge or tiny depending on the day. PPP compares what that money can actually buy in each country.",
      },
      {
        pregunta: "Is my salary stored?",
        respuesta: "No. The math runs in your browser. What you share only carries dates, percentages and countries.",
      },
      {
        pregunta: "Why is my real take-home pay different?",
        respuesta:
          "We assume a single person with no children and default values. Deductions, bonuses or special schemes change the number. For your exact case, open your country's calculator.",
      },
      {
        pregunta: "Which countries are included?",
        respuesta: `${n} countries today, each with its own take-home pay calculator and official data. We add more as we verify their tax rules.`,
      },
    ],
    destacado: {
      ceja: "World comparison",
      titulo: "Until what day do you work for the government?",
      texto: "Enter your salary and see what you'd take home in other countries.",
      ir: "Find my date",
    },
  },
  regional: {
    "en-GB": {
      tarjeta: { compartido: "Done, it's been shared." },
    },
  },
};

// ───────────────────────────── pt ─────────────────────────────

const gPt = GRAMATICA.pt;
const SEO_PT = "Dia da liberdade de impostos e salário líquido no mundo";

const pt: Diccionario<TextosMundo> = {
  base: {
    nombre: "Seu salário pelo mundo",
    seo: {
      titulo: (pais) => [`${SEO_PT} | ${pais}`, SEO_PT, "Seu salário pelo mundo"],
      tituloGlobal: [SEO_PT, "Seu salário pelo mundo"],
      descripcion: (pais, n) => `Veja até que dia você trabalha para o governo com seu salário ${gPt.en(pais)} e quanto sobraria líquido em ${n} países. Grátis e sem cadastro.`,
      descripcionGlobal: (n) => `Veja até que dia você trabalha para o governo e quanto sobraria líquido com seu salário em ${n} países. Grátis e sem cadastro.`,
    },
    ceja: "Dia da liberdade de impostos",
    h1: "Até que dia do ano você trabalha para o governo?",
    bajada: (n) => `Digite seu salário bruto e veja a sua data. Depois compare em ${n} países, com o mesmo poder de compra e as regras de cada um.`,
    form: {
      titulo: "Seu salário",
      sueldo: "Salário bruto",
      mes: "Por mês",
      anio: "Por ano",
      periodo: "Período do salário",
      pais: "País onde você trabalha",
      ejemplo: "Exemplo",
      ejemploAyuda: "É um salário de exemplo. Digite o seu e tudo se recalcula na hora.",
      propio: "Trouxemos do seu cálculo.",
      invalido: "Digite um valor maior que zero.",
      pagas: "Seu salário mensal do holerite: somamos o 13º e os pagamentos extras previstos em lei. O líquido é a média dos 12 meses.",
    },
    heroe: {
      hasta: (fecha) => `Você trabalha para o governo até ${fecha}`,
      tasa: (pct) => `Vão ${pct} do seu salário em imposto de renda e contribuições.`,
      dias: (n, total) => `${n} de ${total} dias`,
      enMano: "Sobra líquido",
      porMes: "por mês",
      anio: (anio, n, total) => `Ano ${anio}: ${n} de ${total} dias para o governo.`,
      resto: "A partir do dia seguinte, o que você ganha é seu.",
    },
    ranking: {
      titulo: "O mesmo salário, país por país",
      bajada: "Com o mesmo poder de compra, isto sobraria líquido em cada país. Cada linha sai da calculadora oficial daquele país. É o mesmo salário em todos os países: só mudam os impostos e as contribuições, não o que se ganha em cada país.",
      lista: "Países ordenados pelo salário líquido",
      buscar: "Buscar um país",
      filtrar: "Filtrar por região",
      todas: "Todos os países",
      regiones: { americas: "Américas", europa: "Europa", asia: "Ásia e Oceania", africa: "África e Oriente Médio" },
      tuPais: "Seu país",
      mejor: "Menos impostos",
      enMano: "Líquido por mês",
      enTuMoneda: "Na sua moeda",
      vsTuPais: "Contra seu país",
      verTodos: (n) => `Ver os ${n} países`,
      verMenos: "Mostrar menos",
      sinResultados: (q) => `Nenhum país corresponde a “${q}”.`,
      abrir: (pais) => `Abrir a calculadora ${gPt.de(pais)}`,
      mas: (pct) => `${pct} a mais`,
      menos: (pct) => `${pct} a menos`,
      igual: "Igual ao seu",
      puesto: (p, total) => `Seu país fica em ${p}º de ${total}.`,
    },
    tarjeta: {
      titulo: "Seu cartão para compartilhar",
      bajada: "Mostra a sua data e porcentagens. Nunca quanto você ganha.",
      hasta: (fecha) => `Trabalho para o governo até ${fecha}`,
      tasa: (pct) => `Vão ${pct} do meu salário`,
      mejor: (pais, pct) => `Com o mesmo salário, ${gPt.en(pais)} eu pagaria menos impostos: ${pct} a mais líquido`,
      mejorPropio: (pais) => `Com meu salário, nenhum país me deixa mais líquido que ${gPt.nombre(pais)}`,
      yVos: "E você?",
      cta: "Calcule o seu em",
      generica: "Até que dia você trabalha para o governo?",
      genericaBajada: (n) => `Seu salário em ${n} países, com a calculadora oficial de cada um`,
      compartir: "Compartilhar meu cartão",
      compartirDuelo: "Devolver o desafio",
      descargar: "Baixar imagem",
      copiado: "Link copiado. Cole onde quiser.",
      compartido: "Pronto, compartilhado.",
      error: "Não deu para compartilhar. Tente de novo.",
      texto: (fecha) => `Trabalho para o governo até ${fecha}. E você?`,
      alt: "Prévia do seu cartão",
    },
    duelo: {
      amigo: (fecha) => `Seu amigo trabalha para o governo até ${fecha}.`,
      yVos: "E você?",
      invitacion: "Digite seu salário e compare.",
      vos: "Você",
      elAmigo: "Seu amigo",
      dia: "Para o governo até",
      tasa: "Impostos e contribuições",
      mejorPais: "Menos impostos em",
      antes: (d) => (d === 1 ? "Você se liberta 1 dia antes do seu amigo." : `Você se liberta ${d} dias antes do seu amigo.`),
      despues: (d) => (d === 1 ? "Seu amigo se liberta 1 dia antes de você." : `Seu amigo se liberta ${d} dias antes de você.`),
      empate: "Vocês se libertam no mesmo dia.",
      desde: (pais) => `Trabalha ${gPt.en(pais)}`,
    },
    cero: { dia: "zero dias", heroeAntes: "Você trabalha para o governo", tarjetaAntes: "Trabalho para o governo", motivo: "Com este salário não há desconto de imposto de renda nem de contribuições.", texto: "Este ano não trabalho nenhum dia para o governo. E você?", amigo: "Seu amigo não trabalha nenhum dia para o governo." },
    metodo: {
      titulo: "Como calculamos",
      estimacion: "É uma estimativa para comparar países, não um holerite. Deduções, filhos ou bônus podem mudar o seu número.",
      supuestos: [
        "Uma pessoa solteira, sem filhos, com os valores padrão da calculadora de cada país.",
        "O líquido é o que sobra depois do imposto de renda e das contribuições pagas pela pessoa. Não inclui impostos sobre consumo nem o que o empregador paga.",
        "O 13º salário ou outros pagamentos extras são distribuídos no ano conforme a lei de cada país.",
        "Nos Estados Unidos não somamos imposto estadual nem local: só o federal e as contribuições.",
        "Para levar seu salário a outro país usamos a paridade do poder de compra (PPC): o mesmo padrão de vida, não o câmbio do dia.",
        "A PPC da Argentina é atualizada com o índice de preços do INDEC, porque o Banco Mundial só a publica até 2021.",
        "O dia da liberdade distribui sua carga a partir de 1º de janeiro. Se vão 30% do salário, você trabalha para o governo 30% do ano.",
      ],
      ppaTitulo: "Paridade do poder de compra", bancoMundial: "Banco Mundial",
      ppa: (organismo, indicador, anio) => `${organismo}, indicador ${indicador}, último ano disponível ${anio}.`,
      consultado: (fecha) => `Consultado em ${fecha}.`,
      verFuente: "Ver a fonte",
      fuentesTitulo: "A fonte de cada país",
      fuentesBajada: "Cada linha usa a calculadora de salário líquido daquele país, com seus dados oficiais.",
      verificado: (fecha) => `Dados verificados em ${fecha}`,
      sello: (fecha) => `Dados oficiais conferidos na fonte de cada país. A conferência mais antiga é de ${fecha}.`,
    },
    faqTitulo: "Perguntas frequentes",
    faq: (n) => [
      {
        pregunta: "O que é o dia da liberdade de impostos?",
        respuesta:
          "É o dia do ano em que você termina de pagar seus impostos e contribuições, se tudo o que ganha desde 1º de janeiro fosse primeiro para o governo. Aqui calculamos com o seu salário, não com a média do país.",
      },
      {
        pregunta: "Por que comparar pelo poder de compra?",
        respuesta: "Pelo câmbio, um salário parece enorme ou mínimo conforme o dia. A PPC compara o que esse dinheiro compra de verdade em cada país.",
      },
      {
        pregunta: "Meu salário fica guardado?",
        respuesta: "Não. A conta roda no seu navegador. O que você compartilha leva apenas datas, porcentagens e países.",
      },
      {
        pregunta: "Por que meu líquido real é diferente?",
        respuesta:
          "Usamos uma pessoa solteira, sem filhos e com os valores padrão. Deduções, bônus ou regimes especiais mudam o número. Para o seu caso exato, abra a calculadora do seu país.",
      },
      {
        pregunta: "Quais países estão incluídos?",
        respuesta: `Hoje são ${n} países, cada um com sua calculadora de salário líquido e seus dados oficiais. Somamos mais conforme verificamos as regras de cada um.`,
      },
    ],
    destacado: {
      ceja: "Comparação mundial",
      titulo: "Até que dia você trabalha para o governo?",
      texto: "Digite seu salário e veja quanto sobraria líquido em outros países.",
      ir: "Calcular minha data",
    },
  },
  // Portugal: «Estado», «partilhar», «recibo de vencimento» e o tratamento sem «você».
  regional: {
    "pt-PT": {
      cero: { heroeAntes: "Trabalha para o Estado", tarjetaAntes: "Trabalho para o Estado", motivo: "Com este salário não há desconto de IRS nem de contribuições.", texto: "Este ano não trabalho nenhum dia para o Estado. E o seu dia?", amigo: "Quem lhe enviou isto não trabalha nenhum dia para o Estado." },
      nombre: "O seu salário pelo mundo",
      seo: {
        titulo: (pais) => [`Dia da libertação fiscal e salário líquido no mundo | ${pais}`, "Dia da libertação fiscal e salário líquido no mundo", "O seu salário pelo mundo"],
        tituloGlobal: ["Dia da libertação fiscal e salário líquido no mundo", "O seu salário pelo mundo"],
        descripcion: (pais, n) => `Veja até que dia trabalha para o Estado com o seu salário ${gPt.en(pais)} e quanto lhe ficaria líquido em ${n} países. Grátis e sem registo.`,
        descripcionGlobal: (n) => `Veja até que dia trabalha para o Estado e quanto lhe ficaria líquido com o seu salário em ${n} países. Grátis e sem registo.`,
      },
      ceja: "Dia da libertação fiscal",
      h1: "Até que dia do ano trabalha para o Estado?",
      bajada: (n) => `Introduza o seu salário bruto e veja a sua data. Depois compare em ${n} países, com o mesmo poder de compra e as regras de cada um.`,
      form: {
        pagas: "O seu salário mensal do recibo: somamos os subsídios de férias e de Natal. O líquido é a média dos 12 meses.",
        titulo: "O seu salário",
        pais: "País onde trabalha",
        ejemploAyuda: "É um salário de exemplo. Introduza o seu e tudo se recalcula de imediato.",
        propio: "Trouxemos do seu cálculo.",
        invalido: "Introduza um valor superior a zero.",
      },
      heroe: {
        hasta: (fecha) => `Trabalha para o Estado até ${fecha}`,
        tasa: (pct) => `Vão ${pct} do seu salário em IRS e contribuições.`,
        enMano: "Fica-lhe líquido",
        anio: (anio, n, total) => `Ano ${anio}: ${n} de ${total} dias para o Estado.`,
        resto: "A partir do dia seguinte, o que ganha é seu.",
      },
      ranking: {
        bajada: "Com o mesmo poder de compra, isto ficar-lhe-ia líquido em cada país. Cada linha vem da calculadora oficial desse país. É o mesmo salário em todos os países: só mudam os impostos e as contribuições, não o que se ganha em cada país.",
        buscar: "Procurar um país",
        regiones: { americas: "Américas", europa: "Europa", asia: "Ásia e Oceânia", africa: "África e Médio Oriente" },
        tuPais: "O seu país",
        enTuMoneda: "Na sua moeda",
        vsTuPais: "Face ao seu país",
        puesto: (p, total) => `O seu país fica em ${p}.º de ${total}.`,
      },
      tarjeta: {
        titulo: "O seu cartão para partilhar",
        bajada: "Mostra a sua data e percentagens. Nunca quanto ganha.",
        hasta: (fecha) => `Trabalho para o Estado até ${fecha}`,
        mejor: (pais, pct) => `Com o mesmo salário, ${gPt.en(pais)} eu pagaria menos impostos: ${pct} a mais líquido`,
        mejorPropio: (pais) => `Com o meu salário, nenhum país me deixa mais líquido do que ${gPt.nombre(pais)}`,
        yVos: "E o seu?",
        generica: "Até que dia trabalha para o Estado?",
        genericaBajada: (n) => `O seu salário em ${n} países, com a calculadora oficial de cada um`,
        compartir: "Partilhar o meu cartão",
        descargar: "Descarregar imagem",
        compartido: "Pronto, partilhado.",
        error: "Não foi possível partilhar. Tente novamente.",
        texto: (fecha) => `Trabalho para o Estado até ${fecha}. E o seu dia?`,
        alt: "Pré-visualização do seu cartão",
      },
      duelo: {
        amigo: (fecha) => `Quem lhe enviou isto trabalha para o Estado até ${fecha}.`,
        yVos: "E o seu dia?",
        invitacion: "Introduza o seu salário e compare.",
        vos: "O seu",
        elAmigo: "Quem enviou",
        dia: "Para o Estado até",
        antes: (d) => (d === 1 ? "Liberta-se 1 dia antes." : `Liberta-se ${d} dias antes.`),
        despues: (d) => (d === 1 ? "Quem enviou liberta-se 1 dia antes." : `Quem enviou liberta-se ${d} dias antes.`),
        empate: "Libertam-se no mesmo dia.",
      },
      metodo: {
        estimacion: "É uma estimativa para comparar países, não um recibo de vencimento. Deduções, filhos ou prémios podem mudar o seu número.",
        supuestos: [
          "Uma pessoa solteira, sem filhos, com os valores predefinidos da calculadora de cada país.",
          "O líquido é o que fica depois do imposto sobre o rendimento e das contribuições pagas pela pessoa. Não inclui IVA nem o que paga a entidade patronal.",
          "Os subsídios de férias e de Natal ou outros pagamentos extra são repartidos no ano conforme a lei de cada país.",
          "Nos Estados Unidos não se soma imposto estadual nem local: só o federal e as contribuições.",
          "Para levar o seu salário a outro país usamos a paridade do poder de compra (PPC): o mesmo nível de vida, não o câmbio do dia.",
          "A PPC da Argentina é atualizada com o índice de preços do INDEC, porque o Banco Mundial só a publica até 2021.",
          "O dia da libertação reparte a sua carga a partir de 1 de janeiro. Se vão 30% do salário, trabalha para o Estado 30% do ano.",
        ],
        fuentesBajada: "Cada linha usa a calculadora de salário líquido desse país, com os seus dados oficiais.",
      },
      faq: (n) => [
        {
          pregunta: "O que é o dia da libertação fiscal?",
          respuesta:
            "É o dia do ano em que acaba de pagar os seus impostos e contribuições, se tudo o que ganha desde 1 de janeiro fosse primeiro para o Estado. Aqui calculamos com o seu salário, não com a média do país.",
        },
        {
          pregunta: "Porquê comparar pelo poder de compra?",
          respuesta: "Pelo câmbio, um salário parece enorme ou mínimo consoante o dia. A PPC compara o que esse dinheiro compra de facto em cada país.",
        },
        {
          pregunta: "O meu salário fica guardado?",
          respuesta: "Não. A conta corre no seu navegador. O que partilha leva apenas datas, percentagens e países.",
        },
        {
          pregunta: "Porque é que o meu líquido real é diferente?",
          respuesta:
            "Usamos uma pessoa solteira, sem filhos e com os valores predefinidos. Deduções, prémios ou regimes especiais mudam o número. Para o seu caso exato, abra a calculadora do seu país.",
        },
        {
          pregunta: "Que países estão incluídos?",
          respuesta: `Hoje são ${n} países, cada um com a sua calculadora de salário líquido e os seus dados oficiais. Juntamos mais à medida que verificamos as regras de cada um.`,
        },
      ],
      destacado: {
        titulo: "Até que dia trabalha para o Estado?",
        texto: "Introduza o seu salário e veja quanto lhe ficaria líquido noutros países.",
        ir: "Calcular a minha data",
      },
    },
    // Angola, Mozambique, Cabo Verde y el resto de la lusofonía toman el parche de Portugal
    // (variantesDeLocale); acá se pisa lo que nombra impuestos de Portugal.
    [PT_LUSOFONIA]: {
      cero: { motivo: "Com este salário não há desconto de imposto sobre o rendimento nem de contribuições." },
      heroe: { tasa: (pct) => `Vão ${pct} do seu salário em impostos e contribuições.` },
    },
  },
};

// ───────────────────────────── fr ─────────────────────────────

const gFr = GRAMATICA.fr;
const SEO_FR = "Jour de libération fiscale et salaire net dans le monde";

const frBase: TextosMundo = {
  nombre: "Ton salaire dans le monde",
  seo: {
    titulo: (pais) => [`${SEO_FR} | ${pais}`, SEO_FR, "Ton salaire dans le monde"],
    tituloGlobal: [SEO_FR, "Ton salaire dans le monde"],
    descripcion: (pais, n) => `Découvre jusqu'à quel jour tu travailles pour l'État avec ton salaire ${gFr.en(pais)} et ce qu'il te resterait net dans ${n} pays. Gratuit.`,
    descripcionGlobal: (n) => `Découvre jusqu'à quel jour tu travailles pour l'État et ce que ton salaire te laisserait net dans ${n} pays. Gratuit, sans inscription.`,
  },
  ceja: "Jour de libération fiscale",
  h1: "Jusqu'à quel jour de l'année travailles-tu pour l'État ?",
  bajada: (n) => `Saisis ton salaire brut pour voir ta date. Puis compare-le dans ${n} pays, à pouvoir d'achat égal et avec les règles de chacun.`,
  form: {
    titulo: "Ton salaire",
    sueldo: "Salaire brut",
    mes: "Par mois",
    anio: "Par an",
    periodo: "Période du salaire",
    pais: "Pays où tu travailles",
    ejemplo: "Exemple",
    ejemploAyuda: "C'est un salaire d'exemple. Saisis le tien et tout se recalcule aussitôt.",
    propio: "Repris de ton calcul.",
    invalido: "Saisis un montant supérieur à zéro.",
    pagas: "Ton salaire mensuel de la fiche de paie : on ajoute le 13e mois et les primes prévues par la loi. Le net est la moyenne sur 12 mois.",
  },
  heroe: {
    hasta: (fecha) => `Tu travailles pour l'État jusqu'au ${fecha}`,
    tasa: (pct) => `${pct} de ton salaire part en impôt sur le revenu et cotisations.`,
    dias: (n, total) => `${n} jours sur ${total}`,
    enMano: "Il te reste net",
    porMes: "par mois",
    anio: (anio, n, total) => `Année ${anio} : ${n} jours sur ${total} pour l'État.`,
    resto: "Dès le lendemain, ce que tu gagnes est à toi.",
  },
  ranking: {
    titulo: "Le même salaire, pays par pays",
    bajada: "À pouvoir d'achat égal, voici ce qu'il te resterait net dans chaque pays. Chaque ligne vient du calculateur officiel de ce pays. C'est le même salaire partout : seuls les impôts et les cotisations changent, pas ce qu'on gagne dans chaque pays.",
    lista: "Pays classés selon le salaire net",
    buscar: "Chercher un pays",
    filtrar: "Filtrer par région",
    todas: "Tous les pays",
    regiones: { americas: "Amériques", europa: "Europe", asia: "Asie et Océanie", africa: "Afrique et Moyen-Orient" },
    tuPais: "Ton pays",
    mejor: "Le moins d'impôts",
    enMano: "Net par mois",
    enTuMoneda: "Dans ta monnaie",
    vsTuPais: "Par rapport à ton pays",
    verTodos: (n) => `Voir les ${n} pays`,
    verMenos: "Voir moins",
    sinResultados: (q) => `Aucun pays ne correspond à « ${q} ».`,
    abrir: (pais) => `Ouvrir le calculateur ${gFr.de(pais)}`,
    mas: (pct) => `${pct} de plus`,
    menos: (pct) => `${pct} de moins`,
    igual: "Identique",
    puesto: (p, total) => `Ton pays se classe ${p}e sur ${total}.`,
  },
  tarjeta: {
    titulo: "Ta carte à partager",
    bajada: "Elle montre ta date et des pourcentages. Jamais ce que tu gagnes.",
    hasta: (fecha) => `Je travaille pour l'État jusqu'au ${fecha}`,
    tasa: (pct) => `${pct} de mon salaire part en impôts`,
    mejor: (pais, pct) => `Avec le même salaire, je paierais moins d'impôts ${gFr.en(pais)} : ${pct} de plus en net`,
    mejorPropio: (pais) => `Avec mon salaire, aucun pays ne me laisse plus que ${gFr.nombre(pais)}`,
    yVos: "Et toi ?",
    cta: "Calcule le tien sur",
    generica: "Jusqu'à quel jour travailles-tu pour l'État ?",
    genericaBajada: (n) => `Ton salaire dans ${n} pays, passé par le calculateur officiel de chacun`,
    compartir: "Partager ma carte",
    compartirDuelo: "Relever le défi",
    descargar: "Télécharger l'image",
    copiado: "Lien copié. Colle-le où tu veux.",
    compartido: "C'est partagé.",
    error: "Le partage n'a pas marché. Réessaie.",
    texto: (fecha) => `Je travaille pour l'État jusqu'au ${fecha}. Et toi ?`,
    alt: "Aperçu de ta carte",
  },
  duelo: {
    amigo: (fecha) => `Ton ami travaille pour l'État jusqu'au ${fecha}.`,
    yVos: "Et toi ?",
    invitacion: "Saisis ton salaire pour comparer.",
    vos: "Toi",
    elAmigo: "Ton ami",
    dia: "Pour l'État jusqu'au",
    tasa: "Impôts et cotisations",
    mejorPais: "Le moins d'impôts",
    antes: (d) => (d === 1 ? "Tu es libéré 1 jour avant ton ami." : `Tu es libéré ${d} jours avant ton ami.`),
    despues: (d) => (d === 1 ? "Ton ami est libéré 1 jour avant toi." : `Ton ami est libéré ${d} jours avant toi.`),
    empate: "Libérés le même jour.",
    desde: (pais) => `Travaille ${gFr.en(pais)}`,
  },
  cero: { dia: "zéro jour", heroeAntes: "Tu travailles pour l'État", tarjetaAntes: "Je travaille pour l'État", motivo: "Avec ce salaire, ni impôt sur le revenu ni cotisations ne sont prélevés.", texto: "Cette année, je ne travaille pas un seul jour pour l'État. Et toi ?", amigo: "Ton ami ne travaille pas un seul jour pour l'État." },
  metodo: {
    titulo: "Comment nous le calculons",
    estimacion: "C'est une estimation pour comparer des pays, pas une fiche de paie. Déductions, enfants ou primes peuvent changer ton chiffre.",
    supuestos: [
      "Une personne célibataire, sans enfant, avec les valeurs par défaut du calculateur de chaque pays.",
      "Le net est ce qui reste après l'impôt sur le revenu et les cotisations payées par la personne. Ni la TVA ni la part de l'employeur ne sont comptées.",
      "Le treizième mois ou les primes obligatoires sont répartis sur l'année selon la loi de chaque pays.",
      "Aux États-Unis, aucun impôt d'État ni local n'est ajouté : seulement l'impôt fédéral et les cotisations.",
      "Pour transposer ton salaire dans un autre pays, nous utilisons la parité de pouvoir d'achat (PPA) : le même niveau de vie, pas le taux de change du jour.",
      "La PPA de l'Argentine est actualisée avec l'indice des prix de l'INDEC, car la Banque mondiale ne la publie que jusqu'en 2021.",
      "Le jour de libération répartit ta charge à partir du 1er janvier. Si 30 % de ton salaire part en impôts, tu travailles pour l'État 30 % de l'année.",
    ],
    ppaTitulo: "Parité de pouvoir d'achat", bancoMundial: "Banque mondiale",
    ppa: (organismo, indicador, anio) => `${organismo}, indicateur ${indicador}, dernière année disponible ${anio}.`,
    consultado: (fecha) => `Consulté le ${fecha}.`,
    verFuente: "Voir la source",
    fuentesTitulo: "La source de chaque pays",
    fuentesBajada: "Chaque ligne utilise le calculateur de salaire net de ce pays, avec ses données officielles.",
    verificado: (fecha) => `Données vérifiées le ${fecha}`,
    sello: (fecha) => `Données officielles vérifiées à la source de chaque pays. La vérification la plus ancienne date du ${fecha}.`,
  },
  faqTitulo: "Questions fréquentes",
  faq: (n) => [
    {
      pregunta: "Qu'est-ce que le jour de libération fiscale ?",
      respuesta:
        "C'est le jour de l'année où tu as fini de payer tes impôts et cotisations, si tout ce que tu gagnes depuis le 1er janvier allait d'abord à l'État. Ici, il est calculé avec ton salaire, pas avec la moyenne du pays.",
    },
    {
      pregunta: "Pourquoi comparer en pouvoir d'achat ?",
      respuesta: "Au taux de change, un salaire paraît énorme ou minuscule selon le jour. La PPA compare ce que cet argent permet vraiment d'acheter dans chaque pays.",
    },
    {
      pregunta: "Mon salaire est-il enregistré ?",
      respuesta: "Non. Le calcul se fait dans ton navigateur. Ce que tu partages ne contient que des dates, des pourcentages et des pays.",
    },
    {
      pregunta: "Pourquoi mon net réel est-il différent ?",
      respuesta:
        "Nous prenons une personne célibataire, sans enfant et avec les valeurs par défaut. Déductions, primes ou régimes particuliers changent le chiffre. Pour ton cas précis, ouvre le calculateur de ton pays.",
    },
    {
      pregunta: "Quels pays sont inclus ?",
      respuesta: `${n} pays aujourd'hui, chacun avec son calculateur de salaire net et ses données officielles. Nous en ajoutons à mesure que nous vérifions leurs règles.`,
    },
  ],
  destacado: {
    ceja: "Comparateur mondial",
    titulo: "Jusqu'à quel jour travailles-tu pour l'État ?",
    texto: "Saisis ton salaire et vois ce qu'il te resterait net dans d'autres pays.",
    ir: "Calculer ma date",
  },
};

const fr: Diccionario<TextosMundo> = {
  base: frBase,
  usted: {
    cero: { heroeAntes: "Vous travaillez pour l'État", texto: "Cette année, je ne travaille pas un seul jour pour l'État. Et vous ?", amigo: "La personne qui vous l'a envoyé ne travaille pas un seul jour pour l'État." },
    nombre: "Votre salaire dans le monde",
    seo: {
      titulo: (pais) => [`${SEO_FR} | ${pais}`, SEO_FR, "Votre salaire dans le monde"],
      tituloGlobal: [SEO_FR, "Votre salaire dans le monde"],
      descripcion: (pais, n) => `Découvrez jusqu'à quel jour vous travaillez pour l'État avec votre salaire ${gFr.en(pais)} et ce qu'il resterait net dans ${n} pays. Gratuit.`,
      descripcionGlobal: (n) => `Découvrez jusqu'à quel jour vous travaillez pour l'État et ce que votre salaire laisserait net dans ${n} pays. Gratuit, sans inscription.`,
    },
    h1: "Jusqu'à quel jour de l'année travaillez-vous pour l'État ?",
    bajada: (n) => `Saisissez votre salaire brut pour voir votre date. Puis comparez-le dans ${n} pays, à pouvoir d'achat égal et avec les règles de chacun.`,
    form: {
      pagas: "Votre salaire mensuel de la fiche de paie : on ajoute le 13e mois et les primes prévues par la loi. Le net est la moyenne sur 12 mois.",
      titulo: "Votre salaire",
      pais: "Pays où vous travaillez",
      ejemploAyuda: "C'est un salaire d'exemple. Saisissez le vôtre et tout se recalcule aussitôt.",
      propio: "Repris de votre calcul.",
      invalido: "Saisissez un montant supérieur à zéro.",
    },
    heroe: {
      hasta: (fecha) => `Vous travaillez pour l'État jusqu'au ${fecha}`,
      tasa: (pct) => `${pct} de votre salaire part en impôt sur le revenu et cotisations.`,
      enMano: "Il vous reste net",
      resto: "Dès le lendemain, ce que vous gagnez est à vous.",
    },
    ranking: {
      bajada: "À pouvoir d'achat égal, voici ce qu'il vous resterait net dans chaque pays. Chaque ligne vient du calculateur officiel de ce pays. C'est le même salaire partout : seuls les impôts et les cotisations changent, pas ce qu'on gagne dans chaque pays.",
      tuPais: "Votre pays",
      enTuMoneda: "Dans votre monnaie",
      vsTuPais: "Par rapport à votre pays",
      puesto: (p, total) => `Votre pays se classe ${p}e sur ${total}.`,
    },
    tarjeta: {
      titulo: "Votre carte à partager",
      bajada: "Elle montre votre date et des pourcentages. Jamais ce que vous gagnez.",
      yVos: "Et vous ?",
      cta: "Calculez le vôtre sur",
      generica: "Jusqu'à quel jour travaillez-vous pour l'État ?",
      genericaBajada: (n) => `Votre salaire dans ${n} pays, passé par le calculateur officiel de chacun`,
      copiado: "Lien copié. Collez-le où vous voulez.",
      error: "Le partage n'a pas marché. Réessayez.",
      texto: (fecha) => `Je travaille pour l'État jusqu'au ${fecha}. Et vous ?`,
      alt: "Aperçu de votre carte",
    },
    duelo: {
      amigo: (fecha) => `La personne qui vous l'a envoyé travaille pour l'État jusqu'au ${fecha}.`,
      yVos: "Et vous ?",
      invitacion: "Saisissez votre salaire pour comparer.",
      vos: "Vous",
      elAmigo: "L'expéditeur",
      antes: (d) => (d === 1 ? "Vous êtes libéré 1 jour plus tôt." : `Vous êtes libéré ${d} jours plus tôt.`),
      despues: (d) => (d === 1 ? "L'expéditeur est libéré 1 jour plus tôt." : `L'expéditeur est libéré ${d} jours plus tôt.`),
    },
    metodo: {
      estimacion: "C'est une estimation pour comparer des pays, pas une fiche de paie. Déductions, enfants ou primes peuvent changer votre chiffre.",
      supuestos: [
        "Une personne célibataire, sans enfant, avec les valeurs par défaut du calculateur de chaque pays.",
        "Le net est ce qui reste après l'impôt sur le revenu et les cotisations payées par la personne. Ni la TVA ni la part de l'employeur ne sont comptées.",
        "Le treizième mois ou les primes obligatoires sont répartis sur l'année selon la loi de chaque pays.",
        "Aux États-Unis, aucun impôt d'État ni local n'est ajouté : seulement l'impôt fédéral et les cotisations.",
        "Pour transposer votre salaire dans un autre pays, nous utilisons la parité de pouvoir d'achat (PPA) : le même niveau de vie, pas le taux de change du jour.",
        "La PPA de l'Argentine est actualisée avec l'indice des prix de l'INDEC, car la Banque mondiale ne la publie que jusqu'en 2021.",
        "Le jour de libération répartit votre charge à partir du 1er janvier. Si 30 % de votre salaire part en impôts, vous travaillez pour l'État 30 % de l'année.",
      ],
    },
    faq: (n) => [
      {
        pregunta: "Qu'est-ce que le jour de libération fiscale ?",
        respuesta:
          "C'est le jour de l'année où vous avez fini de payer vos impôts et cotisations, si tout ce que vous gagnez depuis le 1er janvier allait d'abord à l'État. Ici, il est calculé avec votre salaire, pas avec la moyenne du pays.",
      },
      {
        pregunta: "Pourquoi comparer en pouvoir d'achat ?",
        respuesta: "Au taux de change, un salaire paraît énorme ou minuscule selon le jour. La PPA compare ce que cet argent permet vraiment d'acheter dans chaque pays.",
      },
      {
        pregunta: "Mon salaire est-il enregistré ?",
        respuesta: "Non. Le calcul se fait dans votre navigateur. Ce que vous partagez ne contient que des dates, des pourcentages et des pays.",
      },
      {
        pregunta: "Pourquoi mon net réel est-il différent ?",
        respuesta:
          "Nous prenons une personne célibataire, sans enfant et avec les valeurs par défaut. Déductions, primes ou régimes particuliers changent le chiffre. Pour votre cas précis, ouvrez le calculateur de votre pays.",
      },
      {
        pregunta: "Quels pays sont inclus ?",
        respuesta: `${n} pays aujourd'hui, chacun avec son calculateur de salaire net et ses données officielles. Nous en ajoutons à mesure que nous vérifions leurs règles.`,
      },
    ],
    destacado: {
      titulo: "Jusqu'à quel jour travaillez-vous pour l'État ?",
      texto: "Saisissez votre salaire et voyez ce qu'il vous resterait net dans d'autres pays.",
      ir: "Calculer votre date",
    },
  },
};

// ───────────────────────────── de ─────────────────────────────

const gDe = GRAMATICA.de;
const SEO_DE = "Steuerzahlergedenktag und Nettogehalt weltweit";

const de: Diccionario<TextosMundo> = {
  base: {
    nombre: "Dein Gehalt weltweit",
    seo: {
      titulo: (pais) => [`${SEO_DE} | ${pais}`, SEO_DE, "Dein Gehalt weltweit"],
      tituloGlobal: [SEO_DE, "Dein Gehalt weltweit"],
      descripcion: (pais, n) => `Bis zu welchem Tag arbeitest du mit deinem Gehalt ${gDe.en(pais)} für den Staat, und was bliebe dir netto in ${n} Ländern? Kostenlos.`,
      descripcionGlobal: (n) => `Bis zu welchem Tag arbeitest du für den Staat, und was bliebe dir von deinem Gehalt netto in ${n} Ländern? Kostenlos, ohne Anmeldung.`,
    },
    ceja: "Dein Steuerzahlergedenktag",
    h1: "Bis zu welchem Tag im Jahr arbeitest du für den Staat?",
    bajada: (n) => `Gib dein Bruttogehalt ein und sieh dein Datum. Dann vergleiche es in ${n} Ländern, bei gleicher Kaufkraft und mit den Regeln jedes Landes.`,
    form: {
      titulo: "Dein Gehalt",
      sueldo: "Bruttogehalt",
      mes: "Pro Monat",
      anio: "Pro Jahr",
      periodo: "Zeitraum des Gehalts",
      pais: "Land, in dem du arbeitest",
      ejemplo: "Beispiel",
      ejemploAyuda: "Das ist ein Beispielgehalt. Gib deins ein, und alles rechnet sich sofort neu.",
      propio: "Aus deiner Berechnung übernommen.",
      invalido: "Gib einen Betrag über null ein.",
      pagas: "Dein Monatsgehalt laut Abrechnung: Wir rechnen die gesetzlichen Sonderzahlungen (13. oder 14. Gehalt) dazu. Netto ist der Durchschnitt über 12 Monate.",
    },
    heroe: {
      hasta: (fecha) => `Du arbeitest für den Staat bis zum ${fecha}`,
      tasa: (pct) => `${pct} deines Gehalts gehen an Einkommensteuer und Sozialabgaben.`,
      dias: (n, total) => `${n} von ${total} Tagen`,
      enMano: "Netto bleiben dir",
      porMes: "im Monat",
      anio: (anio, n, total) => `Jahr ${anio}: ${n} von ${total} Tagen für den Staat.`,
      resto: "Ab dem nächsten Tag gehört dir, was du verdienst.",
    },
    ranking: {
      titulo: "Dasselbe Gehalt, Land für Land",
      bajada: "Bei gleicher Kaufkraft bliebe dir in jedem Land so viel netto. Jede Zeile stammt aus dem offiziellen Rechner des Landes. Überall dasselbe Gehalt: Nur Steuern und Abgaben ändern sich, nicht das, was man im jeweiligen Land verdient.",
      lista: "Länder nach Nettogehalt sortiert",
      buscar: "Land suchen",
      filtrar: "Nach Region filtern",
      todas: "Alle",
      regiones: { americas: "Amerika", europa: "Europa", asia: "Asien und Ozeanien", africa: "Afrika und Nahost" },
      tuPais: "Dein Land",
      mejor: "Geringste Abgaben",
      enMano: "Netto im Monat",
      enTuMoneda: "In deiner Währung",
      vsTuPais: "Im Vergleich zu deinem Land",
      verTodos: (n) => `Alle ${n} Länder ansehen`,
      verMenos: "Weniger anzeigen",
      sinResultados: (q) => `Kein Land passt zu „${q}“.`,
      abrir: (pais) => `Rechner für ${gDe.nombre(pais)} öffnen`,
      mas: (pct) => `${pct} mehr`,
      menos: (pct) => `${pct} weniger`,
      igual: "Gleich",
      puesto: (p, total) => `Dein Land liegt auf Platz ${p} von ${total}.`,
    },
    tarjeta: {
      titulo: "Deine Karte zum Teilen",
      bajada: "Sie zeigt dein Datum und Prozente. Nie, was du verdienst.",
      hasta: (fecha) => `Ich arbeite für den Staat bis zum ${fecha}`,
      tasa: (pct) => `${pct} meines Gehalts gehen an den Staat`,
      mejor: (pais, pct) => `Bei gleichem Gehalt zahlte ich ${gDe.en(pais)} weniger Abgaben: ${pct} mehr netto`,
      mejorPropio: (pais) => `Mit meinem Gehalt bleibt mir nirgends mehr als ${gDe.en(pais)}`,
      yVos: "Und du?",
      cta: "Berechne deins auf",
      generica: "Bis zu welchem Tag arbeitest du für den Staat?",
      genericaBajada: (n) => `Dein Gehalt in ${n} Ländern, mit dem offiziellen Rechner jedes Landes`,
      compartir: "Meine Karte teilen",
      compartirDuelo: "Den Spieß umdrehen",
      descargar: "Bild herunterladen",
      copiado: "Link kopiert. Füg ihn ein, wo du willst.",
      compartido: "Fertig, geteilt.",
      error: "Teilen hat nicht geklappt. Versuch es noch einmal.",
      texto: (fecha) => `Ich arbeite für den Staat bis zum ${fecha}. Und du?`,
      alt: "Vorschau deiner Karte",
    },
    duelo: {
      amigo: (fecha) => `Dein Freund arbeitet für den Staat bis zum ${fecha}.`,
      yVos: "Und du?",
      invitacion: "Gib dein Gehalt ein und vergleiche.",
      vos: "Du",
      elAmigo: "Dein Freund",
      dia: "Für den Staat bis zum",
      tasa: "Steuern und Abgaben",
      mejorPais: "Geringste Abgaben in",
      antes: (d) => (d === 1 ? "Du bist 1 Tag früher frei als dein Freund." : `Du bist ${d} Tage früher frei als dein Freund.`),
      despues: (d) => (d === 1 ? "Dein Freund ist 1 Tag früher frei als du." : `Dein Freund ist ${d} Tage früher frei als du.`),
      empate: "Ihr seid am selben Tag frei.",
      desde: (pais) => `Arbeitet ${gDe.en(pais)}`,
    },
    cero: { dia: "null Tage", heroeAntes: "Du arbeitest für den Staat", tarjetaAntes: "Ich arbeite für den Staat", motivo: "Bei diesem Gehalt werden weder Einkommensteuer noch Sozialabgaben abgezogen.", texto: "Dieses Jahr arbeite ich keinen einzigen Tag für den Staat. Und du?", amigo: "Dein Freund arbeitet keinen einzigen Tag für den Staat." },
    metodo: {
      titulo: "So rechnen wir",
      estimacion: "Das ist eine Schätzung, um Länder zu vergleichen, keine Gehaltsabrechnung. Freibeträge, Kinder oder Boni können deine Zahl verändern.",
      supuestos: [
        "Eine ledige Person ohne Kinder, mit den Standardwerten des Rechners jedes Landes.",
        "Netto ist, was nach Einkommensteuer und den Abgaben der Person bleibt. Mehrwertsteuer und der Anteil des Arbeitgebers zählen nicht.",
        "Ein 13. Monatsgehalt oder andere Pflicht-Sonderzahlungen werden so aufs Jahr verteilt, wie es das Gesetz des Landes vorsieht.",
        "In den USA kommt keine Steuer der Bundesstaaten oder Gemeinden dazu: nur die Bundessteuer und die Abgaben.",
        "Um dein Gehalt in ein anderes Land zu übertragen, nutzen wir Kaufkraftparitäten (KKP): derselbe Lebensstandard, nicht der Wechselkurs des Tages.",
        "Die KKP für Argentinien wird mit dem Verbraucherpreisindex des INDEC fortgeschrieben, weil die Weltbank sie nur bis 2021 veröffentlicht.",
        "Der Gedenktag verteilt deine Last ab dem 1. Januar. Gehen 30 % deines Gehalts an den Staat, arbeitest du 30 % des Jahres für ihn.",
      ],
      ppaTitulo: "Kaufkraftparität", bancoMundial: "Weltbank",
      ppa: (organismo, indicador, anio) => `${organismo}, Indikator ${indicador}, letztes verfügbares Jahr ${anio}.`,
      consultado: (fecha) => `Abgerufen am ${fecha}.`,
      verFuente: "Quelle ansehen",
      fuentesTitulo: "Die Quelle jedes Landes",
      fuentesBajada: "Jede Zeile nutzt den Nettogehaltsrechner des Landes mit seinen amtlichen Daten.",
      verificado: (fecha) => `Daten geprüft am ${fecha}`,
      sello: (fecha) => `Amtliche Daten, an der Quelle jedes Landes geprüft. Die älteste Prüfung ist vom ${fecha}.`,
    },
    faqTitulo: "Häufige Fragen",
    faq: (n) => [
      {
        pregunta: "Was ist der Steuerzahlergedenktag?",
        respuesta:
          "Der Tag im Jahr, an dem du deine Steuern und Abgaben abbezahlt hättest, wenn alles, was du ab dem 1. Januar verdienst, zuerst an den Staat ginge. Hier rechnen wir mit deinem Gehalt, nicht mit dem Landesdurchschnitt.",
      },
      {
        pregunta: "Warum der Vergleich nach Kaufkraft?",
        respuesta: "Nach Wechselkurs wirkt ein Gehalt je nach Tag riesig oder winzig. Die KKP vergleicht, was man mit dem Geld in jedem Land wirklich kaufen kann.",
      },
      {
        pregunta: "Wird mein Gehalt gespeichert?",
        respuesta: "Nein. Die Rechnung läuft in deinem Browser. Was du teilst, enthält nur Daten, Prozente und Länder.",
      },
      {
        pregunta: "Warum weicht mein echtes Netto ab?",
        respuesta:
          "Wir rechnen mit einer ledigen Person ohne Kinder und Standardwerten. Freibeträge, Boni oder Sonderregeln ändern die Zahl. Für deinen genauen Fall öffne den Rechner deines Landes.",
      },
      {
        pregunta: "Welche Länder sind dabei?",
        respuesta: `Heute ${n} Länder, jedes mit eigenem Nettogehaltsrechner und amtlichen Daten. Weitere kommen dazu, sobald wir ihre Regeln geprüft haben.`,
      },
    ],
    destacado: {
      ceja: "Weltweiter Vergleich",
      titulo: "Bis zu welchem Tag arbeitest du für den Staat?",
      texto: "Gib dein Gehalt ein und sieh, was dir in anderen Ländern netto bliebe.",
      ir: "Mein Datum berechnen",
    },
  },
  usted: {
    cero: { heroeAntes: "Sie arbeiten für den Staat", texto: "Dieses Jahr arbeite ich keinen einzigen Tag für den Staat. Und bei Ihnen?", amigo: "Die Person, die Ihnen das geschickt hat, arbeitet keinen einzigen Tag für den Staat." },
    nombre: "Ihr Gehalt weltweit",
    seo: {
      titulo: (pais) => [`${SEO_DE} | ${pais}`, SEO_DE, "Ihr Gehalt weltweit"],
      tituloGlobal: [SEO_DE, "Ihr Gehalt weltweit"],
      descripcion: (pais, n) => `Bis zu welchem Tag arbeiten Sie mit Ihrem Gehalt ${gDe.en(pais)} für den Staat, und was bliebe netto in ${n} Ländern? Kostenlos.`,
      descripcionGlobal: (n) => `Bis zu welchem Tag arbeiten Sie für den Staat, und was bliebe von Ihrem Gehalt netto in ${n} Ländern? Kostenlos, ohne Anmeldung.`,
    },
    ceja: "Ihr Steuerzahlergedenktag",
    h1: "Bis zu welchem Tag im Jahr arbeiten Sie für den Staat?",
    bajada: (n) => `Geben Sie Ihr Bruttogehalt ein und sehen Sie Ihr Datum. Dann vergleichen Sie es in ${n} Ländern, bei gleicher Kaufkraft und mit den Regeln jedes Landes.`,
    form: {
      pagas: "Ihr Monatsgehalt laut Abrechnung: Wir rechnen die gesetzlichen Sonderzahlungen (13. oder 14. Gehalt) dazu. Netto ist der Durchschnitt über 12 Monate.",
      titulo: "Ihr Gehalt",
      pais: "Land, in dem Sie arbeiten",
      ejemploAyuda: "Das ist ein Beispielgehalt. Geben Sie Ihres ein, und alles rechnet sich sofort neu.",
      propio: "Aus Ihrer Berechnung übernommen.",
      invalido: "Geben Sie einen Betrag über null ein.",
    },
    heroe: {
      hasta: (fecha) => `Sie arbeiten für den Staat bis zum ${fecha}`,
      tasa: (pct) => `${pct} Ihres Gehalts gehen an Einkommensteuer und Sozialabgaben.`,
      enMano: "Netto bleiben Ihnen",
      resto: "Ab dem nächsten Tag gehört Ihnen, was Sie verdienen.",
    },
    ranking: {
      bajada: "Bei gleicher Kaufkraft bliebe Ihnen in jedem Land so viel netto. Jede Zeile stammt aus dem offiziellen Rechner des Landes. Überall dasselbe Gehalt: Nur Steuern und Abgaben ändern sich, nicht das, was man im jeweiligen Land verdient.",
      tuPais: "Ihr Land",
      enTuMoneda: "In Ihrer Währung",
      vsTuPais: "Im Vergleich zu Ihrem Land",
      puesto: (p, total) => `Ihr Land liegt auf Platz ${p} von ${total}.`,
    },
    tarjeta: {
      titulo: "Ihre Karte zum Teilen",
      bajada: "Sie zeigt Ihr Datum und Prozente. Nie, was Sie verdienen.",
      yVos: "Und bei Ihnen?",
      cta: "Berechnen Sie Ihres auf",
      generica: "Bis zu welchem Tag arbeiten Sie für den Staat?",
      genericaBajada: (n) => `Ihr Gehalt in ${n} Ländern, mit dem offiziellen Rechner jedes Landes`,
      copiado: "Link kopiert. Fügen Sie ihn ein, wo Sie möchten.",
      error: "Teilen hat nicht geklappt. Versuchen Sie es noch einmal.",
      texto: (fecha) => `Ich arbeite für den Staat bis zum ${fecha}. Und bei Ihnen?`,
      alt: "Vorschau Ihrer Karte",
    },
    duelo: {
      amigo: (fecha) => `Die Person, die Ihnen das geschickt hat, arbeitet für den Staat bis zum ${fecha}.`,
      yVos: "Und bei Ihnen?",
      invitacion: "Geben Sie Ihr Gehalt ein und vergleichen Sie.",
      vos: "Sie",
      elAmigo: "Absender",
      antes: (d) => (d === 1 ? "Sie sind 1 Tag früher frei." : `Sie sind ${d} Tage früher frei.`),
      despues: (d) => (d === 1 ? "Der Absender ist 1 Tag früher frei." : `Der Absender ist ${d} Tage früher frei.`),
      empate: "Beide sind am selben Tag frei.",
    },
    metodo: {
      estimacion: "Das ist eine Schätzung, um Länder zu vergleichen, keine Gehaltsabrechnung. Freibeträge, Kinder oder Boni können Ihre Zahl verändern.",
      supuestos: [
        "Eine ledige Person ohne Kinder, mit den Standardwerten des Rechners jedes Landes.",
        "Netto ist, was nach Einkommensteuer und den Abgaben der Person bleibt. Mehrwertsteuer und der Anteil des Arbeitgebers zählen nicht.",
        "Ein 13. Monatsgehalt oder andere Pflicht-Sonderzahlungen werden so aufs Jahr verteilt, wie es das Gesetz des Landes vorsieht.",
        "In den USA kommt keine Steuer der Bundesstaaten oder Gemeinden dazu: nur die Bundessteuer und die Abgaben.",
        "Um Ihr Gehalt in ein anderes Land zu übertragen, nutzen wir Kaufkraftparitäten (KKP): derselbe Lebensstandard, nicht der Wechselkurs des Tages.",
        "Die KKP für Argentinien wird mit dem Verbraucherpreisindex des INDEC fortgeschrieben, weil die Weltbank sie nur bis 2021 veröffentlicht.",
        "Der Gedenktag verteilt Ihre Last ab dem 1. Januar. Gehen 30 % Ihres Gehalts an den Staat, arbeiten Sie 30 % des Jahres für ihn.",
      ],
    },
    faq: (n) => [
      {
        pregunta: "Was ist der Steuerzahlergedenktag?",
        respuesta:
          "Der Tag im Jahr, an dem Sie Ihre Steuern und Abgaben abbezahlt hätten, wenn alles, was Sie ab dem 1. Januar verdienen, zuerst an den Staat ginge. Hier rechnen wir mit Ihrem Gehalt, nicht mit dem Landesdurchschnitt.",
      },
      {
        pregunta: "Warum der Vergleich nach Kaufkraft?",
        respuesta: "Nach Wechselkurs wirkt ein Gehalt je nach Tag riesig oder winzig. Die KKP vergleicht, was man mit dem Geld in jedem Land wirklich kaufen kann.",
      },
      {
        pregunta: "Wird mein Gehalt gespeichert?",
        respuesta: "Nein. Die Rechnung läuft in Ihrem Browser. Was Sie teilen, enthält nur Daten, Prozente und Länder.",
      },
      {
        pregunta: "Warum weicht mein echtes Netto ab?",
        respuesta:
          "Wir rechnen mit einer ledigen Person ohne Kinder und Standardwerten. Freibeträge, Boni oder Sonderregeln ändern die Zahl. Für Ihren genauen Fall öffnen Sie den Rechner Ihres Landes.",
      },
      {
        pregunta: "Welche Länder sind dabei?",
        respuesta: `Heute ${n} Länder, jedes mit eigenem Nettogehaltsrechner und amtlichen Daten. Weitere kommen dazu, sobald wir ihre Regeln geprüft haben.`,
      },
    ],
    destacado: {
      titulo: "Bis zu welchem Tag arbeiten Sie für den Staat?",
      texto: "Geben Sie Ihr Gehalt ein und sehen Sie, was Ihnen in anderen Ländern netto bliebe.",
      ir: "Datum berechnen",
    },
  },
};

// ───────────────────────────── it ─────────────────────────────

const gIt = GRAMATICA.it;
const SEO_IT = "Giorno di liberazione fiscale e stipendio netto nel mondo";

const it: Diccionario<TextosMundo> = {
  base: {
    nombre: "Il tuo stipendio nel mondo",
    seo: {
      titulo: (pais) => [`${SEO_IT} | ${pais}`, SEO_IT, "Il tuo stipendio nel mondo"],
      tituloGlobal: [SEO_IT, "Il tuo stipendio nel mondo"],
      descripcion: (pais, n) => `Scopri fino a che giorno lavori per lo Stato con il tuo stipendio ${gIt.en(pais)} e quanto ti resterebbe netto in ${n} paesi. Gratis.`,
      descripcionGlobal: (n) => `Scopri fino a che giorno lavori per lo Stato e quanto ti resterebbe netto del tuo stipendio in ${n} paesi. Gratis, senza registrazione.`,
    },
    ceja: "Giorno di liberazione fiscale",
    h1: "Fino a che giorno dell'anno lavori per lo Stato?",
    bajada: (n) => `Inserisci lo stipendio lordo e guarda la tua data. Poi confrontalo in ${n} paesi, a parità di potere d'acquisto e con le regole di ciascuno.`,
    form: {
      titulo: "Il tuo stipendio",
      sueldo: "Stipendio lordo",
      mes: "Al mese",
      anio: "All'anno",
      periodo: "Periodo dello stipendio",
      pais: "Paese in cui lavori",
      ejemplo: "Esempio",
      ejemploAyuda: "È uno stipendio di esempio. Scrivi il tuo e tutto si ricalcola subito.",
      propio: "Preso dal tuo calcolo.",
      invalido: "Inserisci un importo maggiore di zero.",
      pagas: "Il tuo stipendio mensile in busta paga: aggiungiamo le mensilità extra previste per legge. Il netto è la media su 12 mesi.",
    },
    heroe: {
      hasta: (fecha) => `Lavori per lo Stato fino al ${fecha}`,
      tasa: (pct) => `Il ${pct} del tuo stipendio va in imposta sul reddito e contributi.`,
      dias: (n, total) => `${n} giorni su ${total}`,
      enMano: "Ti resta netto",
      porMes: "al mese",
      anio: (anio, n, total) => `Anno ${anio}: ${n} giorni su ${total} per lo Stato.`,
      resto: "Dal giorno dopo, quello che guadagni è tuo.",
    },
    ranking: {
      titulo: "Lo stesso stipendio, paese per paese",
      bajada: "A parità di potere d'acquisto, ecco quanto ti resterebbe netto in ogni paese. Ogni riga viene dal calcolatore ufficiale di quel paese. È lo stesso stipendio ovunque: cambiano solo tasse e contributi, non quanto si guadagna in ciascun paese.",
      lista: "Paesi in ordine di stipendio netto",
      buscar: "Cerca un paese",
      filtrar: "Filtra per area",
      todas: "Tutti",
      regiones: { americas: "Americhe", europa: "Europa", asia: "Asia e Oceania", africa: "Africa e Medio Oriente" },
      tuPais: "Il tuo paese",
      mejor: "Meno tasse",
      enMano: "Netto al mese",
      enTuMoneda: "Nella tua valuta",
      vsTuPais: "Rispetto al tuo paese",
      verTodos: (n) => `Vedi tutti i ${n} paesi`,
      verMenos: "Vedi meno",
      sinResultados: (q) => `Nessun paese corrisponde a «${q}».`,
      abrir: (pais) => `Apri il calcolatore ${gIt.de(pais)}`,
      mas: (pct) => `${pct} in più`,
      menos: (pct) => `${pct} in meno`,
      igual: "Uguale",
      puesto: (p, total) => `Il tuo paese è al ${p}º posto su ${total}.`,
    },
    tarjeta: {
      titulo: "La tua scheda da condividere",
      bajada: "Mostra la tua data e delle percentuali. Mai quanto guadagni.",
      hasta: (fecha) => `Lavoro per lo Stato fino al ${fecha}`,
      tasa: (pct) => `Il ${pct} del mio stipendio va allo Stato`,
      mejor: (pais, pct) => `Con lo stesso stipendio, ${gIt.en(pais)} pagherei meno tasse: il ${pct} in più netto`,
      mejorPropio: (pais) => `Con il mio stipendio, nessun paese mi lascia più ${gIt.de(pais)}`,
      yVos: "E tu?",
      cta: "Calcola il tuo su",
      generica: "Fino a che giorno lavori per lo Stato?",
      genericaBajada: (n) => `Il tuo stipendio in ${n} paesi, con il calcolatore ufficiale di ciascuno`,
      compartir: "Condividi la mia scheda",
      compartirDuelo: "Rilancia la sfida",
      descargar: "Scarica l'immagine",
      copiado: "Link copiato. Incollalo dove vuoi.",
      compartido: "Fatto, condivisa.",
      error: "Condivisione non riuscita. Riprova.",
      texto: (fecha) => `Lavoro per lo Stato fino al ${fecha}. E tu?`,
      alt: "Anteprima della tua scheda",
    },
    duelo: {
      amigo: (fecha) => `Il tuo amico lavora per lo Stato fino al ${fecha}.`,
      yVos: "E tu?",
      invitacion: "Inserisci il tuo stipendio e confronta.",
      vos: "Tu",
      elAmigo: "Il tuo amico",
      dia: "Per lo Stato fino al",
      tasa: "Imposte e contributi",
      mejorPais: "Meno tasse in",
      antes: (d) => (d === 1 ? "Ti liberi 1 giorno prima del tuo amico." : `Ti liberi ${d} giorni prima del tuo amico.`),
      despues: (d) => (d === 1 ? "Il tuo amico si libera 1 giorno prima di te." : `Il tuo amico si libera ${d} giorni prima di te.`),
      empate: "Vi liberate lo stesso giorno.",
      desde: (pais) => `Lavora ${gIt.en(pais)}`,
    },
    cero: { dia: "zero giorni", heroeAntes: "Per lo Stato lavori", tarjetaAntes: "Per lo Stato lavoro", motivo: "Con questo stipendio non vengono trattenute né imposta sul reddito né contributi.", texto: "Quest'anno non lavoro neanche un giorno per lo Stato. E tu?", amigo: "Il tuo amico non lavora neanche un giorno per lo Stato." },
    metodo: {
      titulo: "Come lo calcoliamo",
      estimacion: "È una stima per confrontare paesi, non una busta paga. Detrazioni, figli o bonus possono cambiare il tuo numero.",
      supuestos: [
        "Una persona single, senza figli, con i valori predefiniti del calcolatore di ogni paese.",
        "Il netto è quello che resta dopo l'imposta sul reddito e i contributi a carico della persona. Non include l'IVA né la parte del datore di lavoro.",
        "La tredicesima o le altre mensilità obbligatorie sono distribuite sull'anno come prevede la legge di ogni paese.",
        "Negli Stati Uniti non si aggiungono imposte statali né locali: solo quella federale e i contributi.",
        "Per portare il tuo stipendio in un altro paese usiamo la parità di potere d'acquisto (PPA): lo stesso tenore di vita, non il cambio del giorno.",
        "La PPA dell'Argentina è aggiornata con l'indice dei prezzi dell'INDEC, perché la Banca Mondiale la pubblica solo fino al 2021.",
        "Il giorno di liberazione distribuisce il tuo carico dal 1º gennaio. Se va allo Stato il 30 % dello stipendio, lavori per lo Stato il 30 % dell'anno.",
      ],
      ppaTitulo: "Parità di potere d'acquisto", bancoMundial: "Banca Mondiale",
      ppa: (organismo, indicador, anio) => `${organismo}, indicatore ${indicador}, ultimo anno disponibile ${anio}.`,
      consultado: (fecha) => `Consultato il ${fecha}.`,
      verFuente: "Vedi la fonte",
      fuentesTitulo: "La fonte di ogni paese",
      fuentesBajada: "Ogni riga usa il calcolatore dello stipendio netto di quel paese, con i suoi dati ufficiali.",
      verificado: (fecha) => `Dati verificati il ${fecha}`,
      sello: (fecha) => `Dati ufficiali verificati alla fonte di ogni paese. La verifica più vecchia è del ${fecha}.`,
    },
    faqTitulo: "Domande frequenti",
    faq: (n) => [
      {
        pregunta: "Che cos'è il giorno di liberazione fiscale?",
        respuesta:
          "È il giorno dell'anno in cui finisci di pagare imposte e contributi, se tutto quello che guadagni dal 1º gennaio andasse prima allo Stato. Qui lo calcoliamo con il tuo stipendio, non con la media del paese.",
      },
      {
        pregunta: "Perché confrontare in potere d'acquisto?",
        respuesta: "Con il cambio, uno stipendio sembra enorme o minimo a seconda del giorno. La PPA confronta quello che quei soldi comprano davvero in ogni paese.",
      },
      {
        pregunta: "Il mio stipendio viene salvato?",
        respuesta: "No. Il calcolo avviene nel tuo browser. Quello che condividi contiene solo date, percentuali e paesi.",
      },
      {
        pregunta: "Perché il mio netto reale è diverso?",
        respuesta:
          "Usiamo una persona single, senza figli e con i valori predefiniti. Detrazioni, bonus o regimi speciali cambiano il numero. Per il tuo caso preciso, apri il calcolatore del tuo paese.",
      },
      {
        pregunta: "Quali paesi sono inclusi?",
        respuesta: `Oggi ${n} paesi, ognuno con il suo calcolatore dello stipendio netto e i suoi dati ufficiali. Ne aggiungiamo altri man mano che verifichiamo le loro regole.`,
      },
    ],
    destacado: {
      ceja: "Confronto mondiale",
      titulo: "Fino a che giorno lavori per lo Stato?",
      texto: "Inserisci lo stipendio e guarda quanto ti resterebbe netto in altri paesi.",
      ir: "Calcola la mia data",
    },
  },
  usted: {
    cero: { heroeAntes: "Per lo Stato lavora", texto: "Quest'anno non lavoro neanche un giorno per lo Stato. E Lei?", amigo: "Chi Le ha mandato questo non lavora neanche un giorno per lo Stato." },
    nombre: "Lo stipendio nel mondo",
    seo: {
      titulo: (pais) => [`${SEO_IT} | ${pais}`, SEO_IT, "Lo stipendio nel mondo"],
      tituloGlobal: [SEO_IT, "Lo stipendio nel mondo"],
      descripcion: (pais, n) => `Scopra fino a che giorno lavora per lo Stato con il Suo stipendio ${gIt.en(pais)} e quanto Le resterebbe netto in ${n} paesi. Gratis.`,
      descripcionGlobal: (n) => `Scopra fino a che giorno lavora per lo Stato e quanto Le resterebbe netto dello stipendio in ${n} paesi. Gratis, senza registrazione.`,
    },
    h1: "Fino a che giorno dell'anno lavora per lo Stato?",
    bajada: (n) => `Inserisca lo stipendio lordo e guardi la Sua data. Poi lo confronti in ${n} paesi, a parità di potere d'acquisto e con le regole di ciascuno.`,
    form: {
      pagas: "Il Suo stipendio mensile in busta paga: aggiungiamo le mensilità extra previste per legge. Il netto è la media su 12 mesi.",
      titulo: "Lo stipendio",
      pais: "Paese in cui lavora",
      ejemploAyuda: "È uno stipendio di esempio. Scriva il Suo e tutto si ricalcola subito.",
      propio: "Preso dal Suo calcolo.",
      invalido: "Inserisca un importo maggiore di zero.",
    },
    heroe: {
      hasta: (fecha) => `Lavora per lo Stato fino al ${fecha}`,
      tasa: (pct) => `Il ${pct} dello stipendio va in imposta sul reddito e contributi.`,
      enMano: "Netto Le resta",
      resto: "Dal giorno dopo, quello che guadagna è Suo.",
    },
    ranking: {
      bajada: "A parità di potere d'acquisto, ecco quanto Le resterebbe netto in ogni paese. Ogni riga viene dal calcolatore ufficiale di quel paese. È lo stesso stipendio ovunque: cambiano solo tasse e contributi, non quanto si guadagna in ciascun paese.",
      tuPais: "Il Suo paese",
      enTuMoneda: "Nella Sua valuta",
      vsTuPais: "Rispetto al Suo paese",
      puesto: (p, total) => `Il Suo paese è al ${p}º posto su ${total}.`,
    },
    tarjeta: {
      titulo: "La scheda da condividere",
      bajada: "Mostra la data e delle percentuali. Mai quanto guadagna.",
      yVos: "E Lei?",
      cta: "Calcoli il Suo su",
      generica: "Fino a che giorno lavora per lo Stato?",
      genericaBajada: (n) => `Lo stipendio in ${n} paesi, con il calcolatore ufficiale di ciascuno`,
      copiado: "Link copiato. Lo incolli dove vuole.",
      error: "Condivisione non riuscita. Riprovi.",
      texto: (fecha) => `Lavoro per lo Stato fino al ${fecha}. E Lei?`,
      alt: "Anteprima della scheda",
    },
    duelo: {
      amigo: (fecha) => `Chi Le ha mandato questo lavora per lo Stato fino al ${fecha}.`,
      yVos: "E Lei?",
      invitacion: "Inserisca lo stipendio e confronti.",
      vos: "Lei",
      elAmigo: "Chi l'ha inviato",
      antes: (d) => (d === 1 ? "Si libera 1 giorno prima." : `Si libera ${d} giorni prima.`),
      despues: (d) => (d === 1 ? "Chi l'ha inviato si libera 1 giorno prima." : `Chi l'ha inviato si libera ${d} giorni prima.`),
      empate: "Vi liberate lo stesso giorno.",
    },
    metodo: {
      estimacion: "È una stima per confrontare paesi, non una busta paga. Detrazioni, figli o bonus possono cambiare il numero.",
      supuestos: [
        "Una persona single, senza figli, con i valori predefiniti del calcolatore di ogni paese.",
        "Il netto è quello che resta dopo l'imposta sul reddito e i contributi a carico della persona. Non include l'IVA né la parte del datore di lavoro.",
        "La tredicesima o le altre mensilità obbligatorie sono distribuite sull'anno come prevede la legge di ogni paese.",
        "Negli Stati Uniti non si aggiungono imposte statali né locali: solo quella federale e i contributi.",
        "Per portare lo stipendio in un altro paese usiamo la parità di potere d'acquisto (PPA): lo stesso tenore di vita, non il cambio del giorno.",
        "La PPA dell'Argentina è aggiornata con l'indice dei prezzi dell'INDEC, perché la Banca Mondiale la pubblica solo fino al 2021.",
        "Il giorno di liberazione distribuisce il carico dal 1º gennaio. Se va allo Stato il 30 % dello stipendio, si lavora per lo Stato il 30 % dell'anno.",
      ],
    },
    faq: (n) => [
      {
        pregunta: "Che cos'è il giorno di liberazione fiscale?",
        respuesta:
          "È il giorno dell'anno in cui finisce di pagare imposte e contributi, se tutto quello che guadagna dal 1º gennaio andasse prima allo Stato. Qui lo calcoliamo con il Suo stipendio, non con la media del paese.",
      },
      {
        pregunta: "Perché confrontare in potere d'acquisto?",
        respuesta: "Con il cambio, uno stipendio sembra enorme o minimo a seconda del giorno. La PPA confronta quello che quei soldi comprano davvero in ogni paese.",
      },
      {
        pregunta: "Lo stipendio viene salvato?",
        respuesta: "No. Il calcolo avviene nel browser. Quello che condivide contiene solo date, percentuali e paesi.",
      },
      {
        pregunta: "Perché il netto reale è diverso?",
        respuesta:
          "Usiamo una persona single, senza figli e con i valori predefiniti. Detrazioni, bonus o regimi speciali cambiano il numero. Per il Suo caso preciso, apra il calcolatore del Suo paese.",
      },
      {
        pregunta: "Quali paesi sono inclusi?",
        respuesta: `Oggi ${n} paesi, ognuno con il suo calcolatore dello stipendio netto e i suoi dati ufficiali. Ne aggiungiamo altri man mano che verifichiamo le loro regole.`,
      },
    ],
    destacado: {
      titulo: "Fino a che giorno lavora per lo Stato?",
      texto: "Inserisca lo stipendio e guardi quanto Le resterebbe netto in altri paesi.",
      ir: "Calcoli la data",
    },
  },
};

// ───────────────────────────── nl ─────────────────────────────

const gNl = GRAMATICA.nl;
const SEO_NL = "Belastingvrijheidsdag en nettosalaris wereldwijd";

const nl: Diccionario<TextosMundo> = {
  base: {
    nombre: "Je salaris wereldwijd",
    seo: {
      titulo: (pais) => [`${SEO_NL} | ${pais}`, SEO_NL, "Je salaris wereldwijd"],
      tituloGlobal: [SEO_NL, "Je salaris wereldwijd"],
      descripcion: (pais, n) => `Zie tot welke dag je met je salaris ${gNl.en(pais)} voor de staat werkt, en wat je netto overhoudt in ${n} landen. Gratis, zonder account.`,
      descripcionGlobal: (n) => `Zie tot welke dag je voor de staat werkt, en wat je van je salaris netto overhoudt in ${n} landen. Gratis, zonder account.`,
    },
    ceja: "Je belastingvrijheidsdag",
    h1: "Tot welke dag van het jaar werk je voor de staat?",
    bajada: (n) => `Vul je brutosalaris in en zie je datum. Vergelijk het daarna in ${n} landen, met dezelfde koopkracht en de regels van elk land.`,
    form: {
      titulo: "Je salaris",
      sueldo: "Brutosalaris",
      mes: "Per maand",
      anio: "Per jaar",
      periodo: "Periode van het salaris",
      pais: "Land waar je werkt",
      ejemplo: "Voorbeeld",
      ejemploAyuda: "Dit is een voorbeeldsalaris. Vul het jouwe in en alles rekent meteen opnieuw.",
      propio: "Overgenomen uit je berekening.",
      invalido: "Vul een bedrag boven nul in.",
      pagas: "Je maandsalaris volgens je loonstrook: we tellen de wettelijke extra uitbetalingen erbij op. Netto is het gemiddelde over 12 maanden.",
    },
    heroe: {
      hasta: (fecha) => `Je werkt voor de staat tot ${fecha}`,
      tasa: (pct) => `${pct} van je salaris gaat naar inkomstenbelasting en premies.`,
      dias: (n, total) => `${n} van ${total} dagen`,
      enMano: "Netto hou je over",
      porMes: "per maand",
      anio: (anio, n, total) => `Jaar ${anio}: ${n} van ${total} dagen voor de staat.`,
      resto: "Vanaf de dag erna is wat je verdient van jou.",
    },
    ranking: {
      titulo: "Hetzelfde salaris, land per land",
      bajada: "Met dezelfde koopkracht hou je dit netto over in elk land. Elke rij komt uit de officiële rekenhulp van dat land. Overal hetzelfde salaris: alleen belasting en premies verschillen, niet wat men in elk land verdient.",
      lista: "Landen gesorteerd op nettosalaris",
      buscar: "Zoek een land",
      filtrar: "Filter op regio",
      todas: "Alle landen",
      regiones: { americas: "Amerika", europa: "Europa", asia: "Azië en Oceanië", africa: "Afrika en Midden-Oosten" },
      tuPais: "Jouw land",
      mejor: "Minste belasting",
      enMano: "Netto per maand",
      enTuMoneda: "In jouw munt",
      vsTuPais: "Ten opzichte van jouw land",
      verTodos: (n) => `Alle ${n} landen bekijken`,
      verMenos: "Minder tonen",
      sinResultados: (q) => `Geen land past bij ‘${q}’.`,
      abrir: (pais) => `Rekenhulp ${gNl.de(pais)} openen`,
      mas: (pct) => `${pct} meer`,
      menos: (pct) => `${pct} minder`,
      igual: "Gelijk",
      puesto: (p, total) => `Jouw land staat op plaats ${p} van ${total}.`,
    },
    tarjeta: {
      titulo: "Je kaart om te delen",
      bajada: "Hij toont je datum en percentages. Nooit wat je verdient.",
      hasta: (fecha) => `Ik werk voor de staat tot ${fecha}`,
      tasa: (pct) => `${pct} van mijn salaris gaat naar de staat`,
      mejor: (pais, pct) => `Met hetzelfde salaris betaalde ik ${gNl.en(pais)} minder belasting: ${pct} meer netto`,
      mejorPropio: (pais) => `Met mijn salaris hou ik nergens meer over dan ${gNl.en(pais)}`,
      yVos: "En jij?",
      cta: "Bereken de jouwe op",
      generica: "Tot welke dag werk je voor de staat?",
      genericaBajada: (n) => `Je salaris in ${n} landen, met de officiële rekenhulp van elk land`,
      compartir: "Mijn kaart delen",
      compartirDuelo: "Daag terug uit",
      descargar: "Afbeelding downloaden",
      copiado: "Link gekopieerd. Plak hem waar je wilt.",
      compartido: "Klaar, gedeeld.",
      error: "Delen lukte niet. Probeer het opnieuw.",
      texto: (fecha) => `Ik werk voor de staat tot ${fecha}. En jij?`,
      alt: "Voorbeeld van je kaart",
    },
    duelo: {
      amigo: (fecha) => `Je vriend werkt voor de staat tot ${fecha}.`,
      yVos: "En jij?",
      invitacion: "Vul je salaris in en vergelijk.",
      vos: "Jij",
      elAmigo: "Je vriend",
      dia: "Voor de staat tot",
      tasa: "Belasting en premies",
      mejorPais: "Minste belasting in",
      antes: (d) => (d === 1 ? "Jij bent 1 dag eerder vrij dan je vriend." : `Jij bent ${d} dagen eerder vrij dan je vriend.`),
      despues: (d) => (d === 1 ? "Je vriend is 1 dag eerder vrij dan jij." : `Je vriend is ${d} dagen eerder vrij dan jij.`),
      empate: "Jullie zijn op dezelfde dag vrij.",
      desde: (pais) => `Werkt ${gNl.en(pais)}`,
    },
    cero: { dia: "nul dagen", heroeAntes: "Voor de staat werk je", tarjetaAntes: "Voor de staat werk ik", motivo: "Bij dit salaris wordt geen inkomstenbelasting of premie ingehouden.", texto: "Dit jaar werk ik geen enkele dag voor de staat. En jij?", amigo: "Je vriend werkt geen enkele dag voor de staat." },
    metodo: {
      titulo: "Zo rekenen we",
      estimacion: "Dit is een schatting om landen te vergelijken, geen loonstrook. Aftrekposten, kinderen of bonussen kunnen je getal veranderen.",
      supuestos: [
        "Een alleenstaande zonder kinderen, met de standaardwaarden van de rekenhulp van elk land.",
        "Netto is wat overblijft na inkomstenbelasting en de premies die de persoon zelf betaalt. Btw en het deel van de werkgever tellen niet mee.",
        "Een dertiende maand of verplicht vakantiegeld wordt over het jaar verdeeld zoals de wet van elk land voorschrijft.",
        "In de Verenigde Staten tellen we geen staats- of lokale belasting mee: alleen de federale belasting en de premies.",
        "Om je salaris naar een ander land te brengen gebruiken we koopkrachtpariteit (KKP): dezelfde levensstandaard, niet de wisselkoers van vandaag.",
        "De KKP van Argentinië wordt bijgewerkt met de prijsindex van het INDEC, omdat de Wereldbank hem maar tot 2021 publiceert.",
        "De vrijheidsdag verdeelt je last vanaf 1 januari. Gaat 30 % van je salaris naar de staat, dan werk je 30 % van het jaar voor de staat.",
      ],
      ppaTitulo: "Koopkrachtpariteit", bancoMundial: "Wereldbank",
      ppa: (organismo, indicador, anio) => `${organismo}, indicator ${indicador}, laatst beschikbare jaar ${anio}.`,
      consultado: (fecha) => `Geraadpleegd op ${fecha}.`,
      verFuente: "Bron bekijken",
      fuentesTitulo: "De bron van elk land",
      fuentesBajada: "Elke rij gebruikt de nettosalaris-rekenhulp van dat land, met zijn officiële gegevens.",
      verificado: (fecha) => `Gegevens gecontroleerd op ${fecha}`,
      sello: (fecha) => `Officiële gegevens, gecontroleerd bij de bron van elk land. De oudste controle is van ${fecha}.`,
    },
    faqTitulo: "Veelgestelde vragen",
    faq: (n) => [
      {
        pregunta: "Wat is belastingvrijheidsdag?",
        respuesta:
          "De dag van het jaar waarop je je belasting en premies hebt afbetaald, als alles wat je vanaf 1 januari verdient eerst naar de staat ging. Hier rekenen we met jouw salaris, niet met het landelijke gemiddelde.",
      },
      {
        pregunta: "Waarom vergelijken op koopkracht?",
        respuesta: "Met de wisselkoers lijkt een salaris, afhankelijk van de dag, enorm of piepklein. KKP vergelijkt wat je met dat geld in elk land echt kunt kopen.",
      },
      {
        pregunta: "Wordt mijn salaris opgeslagen?",
        respuesta: "Nee. De berekening draait in je browser. Wat je deelt bevat alleen datums, percentages en landen.",
      },
      {
        pregunta: "Waarom wijkt mijn echte netto af?",
        respuesta:
          "We rekenen met een alleenstaande zonder kinderen en standaardwaarden. Aftrekposten, bonussen of bijzondere regelingen veranderen het getal. Open voor jouw precieze geval de rekenhulp van je land.",
      },
      {
        pregunta: "Welke landen doen mee?",
        respuesta: `Vandaag ${n} landen, elk met een eigen nettosalaris-rekenhulp en officiële gegevens. We voegen er meer toe zodra we hun regels hebben gecontroleerd.`,
      },
    ],
    destacado: {
      ceja: "Wereldwijde vergelijking",
      titulo: "Tot welke dag werk je voor de staat?",
      texto: "Vul je salaris in en zie wat je netto overhoudt in andere landen.",
      ir: "Mijn datum berekenen",
    },
  },
  usted: {
    cero: { heroeAntes: "Voor de staat werkt u", texto: "Dit jaar werk ik geen enkele dag voor de staat. En u?", amigo: "Wie u dit stuurde, werkt geen enkele dag voor de staat." },
    nombre: "Uw salaris wereldwijd",
    seo: {
      titulo: (pais) => [`${SEO_NL} | ${pais}`, SEO_NL, "Uw salaris wereldwijd"],
      tituloGlobal: [SEO_NL, "Uw salaris wereldwijd"],
      descripcion: (pais, n) => `Zie tot welke dag u met uw salaris ${gNl.en(pais)} voor de staat werkt, en wat u netto overhoudt in ${n} landen. Gratis, zonder account.`,
      descripcionGlobal: (n) => `Zie tot welke dag u voor de staat werkt, en wat u van uw salaris netto overhoudt in ${n} landen. Gratis, zonder account.`,
    },
    ceja: "Uw belastingvrijheidsdag",
    h1: "Tot welke dag van het jaar werkt u voor de staat?",
    bajada: (n) => `Vul uw brutosalaris in en zie uw datum. Vergelijk het daarna in ${n} landen, met dezelfde koopkracht en de regels van elk land.`,
    form: {
      pagas: "Uw maandsalaris volgens uw loonstrook: we tellen de wettelijke extra uitbetalingen erbij op. Netto is het gemiddelde over 12 maanden.",
      titulo: "Uw salaris",
      pais: "Land waar u werkt",
      ejemploAyuda: "Dit is een voorbeeldsalaris. Vul het uwe in en alles rekent meteen opnieuw.",
      propio: "Overgenomen uit uw berekening.",
      invalido: "Vul een bedrag boven nul in.",
    },
    heroe: {
      hasta: (fecha) => `U werkt voor de staat tot ${fecha}`,
      tasa: (pct) => `${pct} van uw salaris gaat naar inkomstenbelasting en premies.`,
      enMano: "Netto houdt u over",
      resto: "Vanaf de dag erna is wat u verdient van u.",
    },
    ranking: {
      bajada: "Met dezelfde koopkracht houdt u dit netto over in elk land. Elke rij komt uit de officiële rekenhulp van dat land. Overal hetzelfde salaris: alleen belasting en premies verschillen, niet wat men in elk land verdient.",
      tuPais: "Uw land",
      enTuMoneda: "In uw munt",
      vsTuPais: "Ten opzichte van uw land",
      puesto: (p, total) => `Uw land staat op plaats ${p} van ${total}.`,
    },
    tarjeta: {
      titulo: "Uw kaart om te delen",
      bajada: "Hij toont uw datum en percentages. Nooit wat u verdient.",
      yVos: "En u?",
      cta: "Bereken de uwe op",
      generica: "Tot welke dag werkt u voor de staat?",
      genericaBajada: (n) => `Uw salaris in ${n} landen, met de officiële rekenhulp van elk land`,
      copiado: "Link gekopieerd. Plak hem waar u wilt.",
      error: "Delen lukte niet. Probeer het opnieuw.",
      texto: (fecha) => `Ik werk voor de staat tot ${fecha}. En u?`,
      alt: "Voorbeeld van uw kaart",
    },
    duelo: {
      amigo: (fecha) => `Wie u dit stuurde, werkt voor de staat tot ${fecha}.`,
      yVos: "En u?",
      invitacion: "Vul uw salaris in en vergelijk.",
      vos: "U",
      elAmigo: "Afzender",
      antes: (d) => (d === 1 ? "U bent 1 dag eerder vrij." : `U bent ${d} dagen eerder vrij.`),
      despues: (d) => (d === 1 ? "De afzender is 1 dag eerder vrij." : `De afzender is ${d} dagen eerder vrij.`),
      empate: "Allebei op dezelfde dag vrij.",
    },
    metodo: {
      estimacion: "Dit is een schatting om landen te vergelijken, geen loonstrook. Aftrekposten, kinderen of bonussen kunnen uw getal veranderen.",
      supuestos: [
        "Een alleenstaande zonder kinderen, met de standaardwaarden van de rekenhulp van elk land.",
        "Netto is wat overblijft na inkomstenbelasting en de premies die de persoon zelf betaalt. Btw en het deel van de werkgever tellen niet mee.",
        "Een dertiende maand of verplicht vakantiegeld wordt over het jaar verdeeld zoals de wet van elk land voorschrijft.",
        "In de Verenigde Staten tellen we geen staats- of lokale belasting mee: alleen de federale belasting en de premies.",
        "Om uw salaris naar een ander land te brengen gebruiken we koopkrachtpariteit (KKP): dezelfde levensstandaard, niet de wisselkoers van vandaag.",
        "De KKP van Argentinië wordt bijgewerkt met de prijsindex van het INDEC, omdat de Wereldbank hem maar tot 2021 publiceert.",
        "De vrijheidsdag verdeelt uw last vanaf 1 januari. Gaat 30 % van uw salaris naar de staat, dan werkt u 30 % van het jaar voor de staat.",
      ],
    },
    faq: (n) => [
      {
        pregunta: "Wat is belastingvrijheidsdag?",
        respuesta:
          "De dag van het jaar waarop u uw belasting en premies hebt afbetaald, als alles wat u vanaf 1 januari verdient eerst naar de staat ging. Hier rekenen we met uw salaris, niet met het landelijke gemiddelde.",
      },
      {
        pregunta: "Waarom vergelijken op koopkracht?",
        respuesta: "Met de wisselkoers lijkt een salaris, afhankelijk van de dag, enorm of piepklein. KKP vergelijkt wat dat geld in elk land echt kan kopen.",
      },
      {
        pregunta: "Wordt mijn salaris opgeslagen?",
        respuesta: "Nee. De berekening draait in uw browser. Wat u deelt bevat alleen datums, percentages en landen.",
      },
      {
        pregunta: "Waarom wijkt mijn echte netto af?",
        respuesta:
          "We rekenen met een alleenstaande zonder kinderen en standaardwaarden. Aftrekposten, bonussen of bijzondere regelingen veranderen het getal. Open voor uw precieze geval de rekenhulp van uw land.",
      },
      {
        pregunta: "Welke landen doen mee?",
        respuesta: `Vandaag ${n} landen, elk met een eigen nettosalaris-rekenhulp en officiële gegevens. We voegen er meer toe zodra we hun regels hebben gecontroleerd.`,
      },
    ],
    destacado: {
      titulo: "Tot welke dag werkt u voor de staat?",
      texto: "Vul uw salaris in en zie wat u netto overhoudt in andere landen.",
      ir: "Datum berekenen",
    },
  },
};

// ───────────────────────────── ja ─────────────────────────────

const gJa = GRAMATICA.ja;

const ja: Diccionario<TextosMundo> = {
  base: {
    nombre: "世界で見る給与",
    seo: {
      titulo: (pais) => [`税金からの解放日と世界の手取り｜${pais}`, "税金からの解放日と世界の手取り比較", "世界で見る給与"],
      tituloGlobal: ["税金からの解放日と世界の手取り比較", "世界で見る給与"],
      descripcion: (pais, n) => `${gJa.de(pais)}給与で、何月何日まで税金のために働くのかを計算します。同じ給与なら${n}か国で手取りがいくらになるかも比較できます。無料です。`,
      descripcionGlobal: (n) => `何月何日まで税金のために働くのかを計算し、同じ給与なら${n}か国で手取りがいくらになるかを比較します。無料で登録も不要です。`,
    },
    ceja: "税金からの解放日",
    h1: "1年のうち何日まで税金のために働いていますか",
    bajada: (n) => `額面の給与を入力すると日付が出ます。続けて${n}か国で比べられます。購買力をそろえ、各国のルールで計算します。`,
    form: {
      titulo: "給与",
      sueldo: "額面給与",
      mes: "月額",
      anio: "年額",
      periodo: "給与の期間",
      pais: "働いている国",
      ejemplo: "例",
      ejemploAyuda: "これは例の金額です。ご自身の給与を入力すると、すぐに計算し直します。",
      propio: "計算結果から引き継ぎました。",
      invalido: "0より大きい金額を入力してください。",
      pagas: "給与明細の月給です。法律で定められた追加の支給分を加えて計算します。手取りは12か月の平均です。",
    },
    heroe: {
      hasta: (fecha) => `税金のために働くのは${fecha}までです`,
      tasa: (pct) => `給与の${pct}が所得税と社会保険料になります。`,
      dias: (n, total) => `${total}日のうち${n}日`,
      enMano: "手取り",
      porMes: "月額",
      anio: (anio, n, total) => `${anio}年：${total}日のうち${n}日が税金のための労働です。`,
      resto: "その翌日から、稼いだ分はご自身のものです。",
    },
    ranking: {
      titulo: "同じ給与を国ごとに比較",
      bajada: "購買力をそろえると、各国での手取りはこうなります。どの行もその国の公式計算ツールの結果です。どの国も同じ給与で計算しています。変わるのは税金と社会保険料だけで、その国で実際にもらえる給与ではありません。",
      lista: "手取りの多い順に並べた国",
      buscar: "国を検索",
      filtrar: "地域で絞り込む",
      todas: "すべて",
      regiones: { americas: "南北アメリカ", europa: "ヨーロッパ", asia: "アジア・オセアニア", africa: "アフリカ・中東" },
      tuPais: "ご自身の国",
      mejor: "税負担が最も軽い国",
      enMano: "月の手取り",
      enTuMoneda: "自国通貨で",
      vsTuPais: "自国との差",
      verTodos: (n) => `${n}か国すべてを見る`,
      verMenos: "表示を減らす",
      sinResultados: (q) => `「${q}」に一致する国はありません。`,
      abrir: (pais) => `${gJa.de(pais)}計算ツールを開く`,
      mas: (pct) => `${pct}多い`,
      menos: (pct) => `${pct}少ない`,
      igual: "同じ",
      puesto: (p, total) => `ご自身の国は${total}か国中${p}位です。`,
    },
    tarjeta: {
      titulo: "シェア用カード",
      bajada: "表示するのは日付と割合だけです。給与額は出ません。",
      hasta: (fecha) => `税金のために働くのは${fecha}まで`,
      tasa: (pct) => `給与の${pct}が税金と社会保険料`,
      mejor: (pais, pct) => `同じ給与なら、${gJa.en(pais)}税負担が軽く、手取りが${pct}増えます`,
      mejorPropio: (pais) => `同じ給与で、${pais}より手取りが多い国はありません`,
      yVos: "ご自身は何日まで？",
      cta: "計算はこちら",
      generica: "何日まで税金のために働いていますか",
      genericaBajada: (n) => `${n}か国の公式計算ツールで、同じ給与を比較`,
      compartir: "カードをシェア",
      compartirDuelo: "こちらも送り返す",
      descargar: "画像を保存",
      copiado: "リンクをコピーしました。好きな場所に貼り付けてください。",
      compartido: "シェアしました。",
      error: "シェアできませんでした。もう一度お試しください。",
      texto: (fecha) => `税金のために働くのは${fecha}までです。何日まで働いているか計算してみませんか`,
      alt: "カードのプレビュー",
    },
    duelo: {
      amigo: (fecha) => `送り主は${fecha}まで税金のために働いています。`,
      yVos: "ご自身はいつまででしょうか",
      invitacion: "給与を入力して比べてみましょう。",
      vos: "ご自身",
      elAmigo: "送り主",
      dia: "税金のために働く期間",
      tasa: "税金と社会保険料",
      mejorPais: "税負担が最も軽い国",
      antes: (d) => `送り主より${d}日早く解放されます。`,
      despues: (d) => `送り主のほうが${d}日早く解放されます。`,
      empate: "解放される日は同じです。",
      desde: (pais) => `${gJa.en(pais)}勤務`,
    },
    cero: { dia: "0日", heroeAntes: "税金のために働く日数は", tarjetaAntes: "税金のために働く日数は", motivo: "この給与では所得税も社会保険料も差し引かれません。", texto: "今年、税金のために働く日は0日です。何日まで働いているか計算してみませんか", amigo: "送り主が税金のために働く日は0日です。" },
    metodo: {
      titulo: "計算方法",
      estimacion: "国どうしを比べるための目安で、給与明細ではありません。控除、扶養家族、賞与などで数字は変わります。",
      supuestos: [
        "独身で子どもなし、各国の計算ツールの初期値を使います。",
        "手取りは、所得税と本人負担の社会保険料を引いた残りです。消費税や会社負担分は含みません。",
        "賞与や13か月目の給与は、各国の法律どおりに1年に割り振ります。",
        "アメリカは州税と地方税を加えず、連邦税と社会保険料だけで計算します。",
        "給与を他国に置き換えるときは購買力平価を使います。その日の為替レートではなく、同じ生活水準で比べます。",
        "アルゼンチンの購買力平価は、世界銀行の公表が2021年までのため、INDECの消費者物価指数で延長しています。",
        "解放日は、負担を1月1日から順に割り当てて求めます。給与の30%が税金なら、1年の30%を税金のために働く計算です。",
      ],
      ppaTitulo: "購買力平価", bancoMundial: "世界銀行",
      ppa: (organismo, indicador, anio) => `${organismo}、指標 ${indicador}、最新年 ${anio}年。`,
      consultado: (fecha) => `${fecha}に確認しました。`,
      verFuente: "出典を見る",
      fuentesTitulo: "各国の出典",
      fuentesBajada: "どの行も、その国の手取り計算ツールと公式データを使っています。",
      verificado: (fecha) => `${fecha}にデータを確認`,
      sello: (fecha) => `各国の公式データを出典で確認しています。最も古い確認日は${fecha}です。`,
    },
    faqTitulo: "よくある質問",
    faq: (n) => [
      {
        pregunta: "税金からの解放日とは何ですか",
        respuesta: "1月1日から稼いだ分をすべて先に税金に回したとして、税金と社会保険料を払い終える日です。ここでは国の平均ではなく、入力した給与で計算します。",
      },
      {
        pregunta: "なぜ購買力で比べるのですか",
        respuesta: "為替レートで換算すると、日によって給与が大きくも小さくも見えます。購買力平価なら、そのお金で各国で実際に何が買えるかを比べられます。",
      },
      {
        pregunta: "給与は保存されますか",
        respuesta: "いいえ。計算はブラウザの中で行います。シェアする内容は日付、割合、国だけです。",
      },
      {
        pregunta: "実際の手取りと違うのはなぜですか",
        respuesta: "独身で子どもなし、初期値で計算しているためです。控除、賞与、特別な制度で数字は変わります。正確に知りたい場合は、ご自身の国の計算ツールを開いてください。",
      },
      {
        pregunta: "どの国が対象ですか",
        respuesta: `現在は${n}か国で、どの国にも手取り計算ツールと公式データがあります。ルールを確認できた国から順に追加しています。`,
      },
    ],
    destacado: {
      ceja: "世界比較",
      titulo: "何日まで税金のために働いていますか",
      texto: "給与を入力すると、他の国での手取りもわかります。",
      ir: "日付を計算する",
    },
  },
};

// ───────────────────────────── ko ─────────────────────────────

const gKo = GRAMATICA.ko;

const ko: Diccionario<TextosMundo> = {
  base: {
    nombre: "세계 속 내 연봉",
    seo: {
      titulo: (pais) => [`세금 해방의 날과 세계 실수령액 비교 | ${pais}`, "세금 해방의 날과 세계 실수령액 비교", "세계 속 내 연봉"],
      tituloGlobal: ["세금 해방의 날과 세계 실수령액 비교", "세계 속 내 연봉"],
      descripcion: (pais, n) => `${gKo.de(pais)} 급여로 며칠까지 세금을 위해 일하는지 계산해요. 같은 급여의 실수령액도 ${n}개국에서 비교할 수 있어요. 무료예요.`,
      descripcionGlobal: (n) => `며칠까지 세금을 위해 일하는지 계산하고, 같은 급여의 실수령액을 ${n}개국에서 비교해요. 무료이고 가입도 필요 없어요.`,
    },
    ceja: "세금 해방의 날",
    h1: "1년 중 며칠까지 세금을 위해 일할까요?",
    bajada: (n) => `세전 급여를 입력하면 날짜가 나와요. 이어서 ${n}개국과 비교해 보세요. 구매력을 맞추고 각 나라의 규칙으로 계산해요.`,
    form: {
      titulo: "급여",
      sueldo: "세전 급여",
      mes: "월급",
      anio: "연봉",
      periodo: "급여 기준",
      pais: "일하는 나라",
      ejemplo: "예시",
      ejemploAyuda: "예시 금액이에요. 실제 급여를 입력하면 바로 다시 계산해요.",
      propio: "앞선 계산에서 가져왔어요.",
      invalido: "0보다 큰 금액을 입력해 주세요.",
      pagas: "급여명세서의 월급이에요. 법으로 정한 추가 급여를 더해 계산해요. 실수령액은 12개월 평균이에요.",
    },
    heroe: {
      hasta: (fecha) => `세금을 위해 일하는 날: ${fecha}까지`,
      tasa: (pct) => `급여의 ${pct}가 소득세와 사회보험료로 나가요.`,
      dias: (n, total) => `${total}일 중 ${n}일`,
      enMano: "실수령액",
      porMes: "월 기준",
      anio: (anio, n, total) => `${anio}년: ${total}일 중 ${n}일은 세금을 위한 날이에요.`,
      resto: "그다음 날부터 버는 돈은 온전히 내 몫이에요.",
    },
    ranking: {
      titulo: "같은 급여, 나라별 비교",
      bajada: "구매력을 맞추면 나라마다 실수령액이 이렇게 달라요. 모든 행은 그 나라의 공식 계산기에서 나왔어요. 모든 나라에 같은 급여를 넣어 계산했어요. 바뀌는 건 세금과 사회보험료뿐이고, 그 나라에서 실제로 받는 급여는 아니에요.",
      lista: "실수령액 순으로 정렬한 나라",
      buscar: "나라 검색",
      filtrar: "지역으로 거르기",
      todas: "전체",
      regiones: { americas: "아메리카", europa: "유럽", asia: "아시아·오세아니아", africa: "아프리카·중동" },
      tuPais: "내 나라",
      mejor: "세금이 가장 적은 나라",
      enMano: "월 실수령액",
      enTuMoneda: "내 통화로",
      vsTuPais: "내 나라 대비",
      verTodos: (n) => `${n}개국 모두 보기`,
      verMenos: "접기",
      sinResultados: (q) => `‘${q}’에 맞는 나라가 없어요.`,
      abrir: (pais) => `${gKo.de(pais)} 계산기 열기`,
      mas: (pct) => `${pct} 많음`,
      menos: (pct) => `${pct} 적음`,
      igual: "같음",
      puesto: (p, total) => `내 나라 순위: ${total}개국 중 ${p}위예요.`,
    },
    tarjeta: {
      titulo: "공유용 카드",
      bajada: "날짜와 비율만 보여요. 급여 금액은 나오지 않아요.",
      hasta: (fecha) => `세금을 위해 일하는 날: ${fecha}까지`,
      tasa: (pct) => `급여의 ${pct}가 세금과 보험료`,
      mejor: (pais, pct) => `같은 급여면 ${gKo.en(pais)} 세금이 적어 실수령액이 ${pct} 더 많아요`,
      mejorPropio: (pais) => `같은 급여로는 ${pais}보다 실수령액이 많은 나라가 없어요`,
      yVos: "내 날짜도 확인해 보세요",
      cta: "계산하기:",
      generica: "며칠까지 세금을 위해 일할까요?",
      genericaBajada: (n) => `${n}개국 공식 계산기로 같은 급여를 비교해요`,
      compartir: "카드 공유하기",
      compartirDuelo: "나도 보내기",
      descargar: "이미지 저장",
      copiado: "링크를 복사했어요. 원하는 곳에 붙여 넣으세요.",
      compartido: "공유했어요.",
      error: "공유하지 못했어요. 다시 시도해 주세요.",
      texto: (fecha) => `세금을 위해 일하는 날: ${fecha}까지. 내 날짜도 확인해 보세요`,
      alt: "카드 미리 보기",
    },
    duelo: {
      amigo: (fecha) => `보낸 사람의 세금 해방일: ${fecha}`,
      yVos: "내 날짜는 언제일까요?",
      invitacion: "급여를 입력하고 비교해 보세요.",
      vos: "나",
      elAmigo: "보낸 사람",
      dia: "세금을 위해 일하는 날",
      tasa: "세금과 보험료",
      mejorPais: "세금이 가장 적은 나라",
      antes: (d) => `보낸 사람보다 ${d}일 먼저 해방돼요.`,
      despues: (d) => `보낸 사람이 ${d}일 먼저 해방돼요.`,
      empate: "해방되는 날이 같아요.",
      desde: (pais) => `근무지: ${pais}`,
    },
    cero: { dia: "0일", heroeAntes: "세금을 위해 일하는 날", tarjetaAntes: "세금을 위해 일하는 날", motivo: "이 급여에서는 소득세와 사회보험료가 공제되지 않아요.", texto: "올해 세금을 위해 일하는 날: 0일. 내 날짜도 확인해 보세요", amigo: "보낸 사람이 세금을 위해 일하는 날: 0일" },
    metodo: {
      titulo: "계산 방법",
      estimacion: "나라를 비교하기 위한 추정치이고 급여명세서가 아니에요. 공제, 부양가족, 상여금에 따라 숫자가 달라져요.",
      supuestos: [
        "미혼에 자녀가 없고, 각 나라 계산기의 기본값을 써요.",
        "실수령액은 소득세와 본인이 내는 사회보험료를 뺀 금액이에요. 부가가치세와 회사 부담분은 넣지 않아요.",
        "상여금이나 13월급은 각 나라의 법에 따라 1년에 나눠 반영해요.",
        "미국은 주세와 지방세를 넣지 않고 연방세와 사회보험료만 계산해요.",
        "급여를 다른 나라로 옮길 때는 구매력평가를 써요. 그날의 환율이 아니라 같은 생활 수준으로 비교해요.",
        "아르헨티나의 구매력평가는 세계은행 자료가 2021년까지라서 INDEC 소비자물가지수로 연장해요.",
        "해방일은 부담을 1월 1일부터 차례로 채워서 구해요. 급여의 30%가 세금이면 1년의 30%를 세금을 위해 일하는 셈이에요.",
      ],
      ppaTitulo: "구매력평가", bancoMundial: "세계은행",
      ppa: (organismo, indicador, anio) => `${organismo}, 지표 ${indicador}, 최신 연도 ${anio}년.`,
      consultado: (fecha) => `확인일: ${fecha}`,
      verFuente: "출처 보기",
      fuentesTitulo: "나라별 출처",
      fuentesBajada: "모든 행은 그 나라의 실수령액 계산기와 공식 데이터를 써요.",
      verificado: (fecha) => `데이터 확인일: ${fecha}`,
      sello: (fecha) => `각 나라의 공식 데이터를 출처에서 확인해요. 가장 오래된 확인일은 ${fecha}예요.`,
    },
    faqTitulo: "자주 묻는 질문",
    faq: (n) => [
      {
        pregunta: "세금 해방의 날이 뭔가요?",
        respuesta: "1월 1일부터 번 돈을 모두 먼저 세금에 낸다고 할 때, 세금과 사회보험료를 다 내는 날이에요. 여기서는 나라 평균이 아니라 입력한 급여로 계산해요.",
      },
      {
        pregunta: "왜 구매력으로 비교하나요?",
        respuesta: "환율로 바꾸면 날에 따라 급여가 크게도 작게도 보여요. 구매력평가는 그 돈으로 각 나라에서 실제로 살 수 있는 것을 비교해요.",
      },
      {
        pregunta: "내 급여가 저장되나요?",
        respuesta: "아니요. 계산은 브라우저 안에서만 해요. 공유하는 내용에는 날짜, 비율, 나라만 들어가요.",
      },
      {
        pregunta: "실제 실수령액과 왜 다른가요?",
        respuesta: "미혼, 무자녀, 기본값으로 계산하기 때문이에요. 공제, 상여금, 특별 제도에 따라 숫자가 바뀌어요. 정확한 금액은 내 나라 계산기에서 확인해 보세요.",
      },
      {
        pregunta: "어떤 나라가 들어 있나요?",
        respuesta: `지금은 ${n}개국이고, 나라마다 실수령액 계산기와 공식 데이터가 있어요. 규칙을 확인한 나라부터 계속 추가해요.`,
      },
    ],
    destacado: {
      ceja: "세계 비교",
      titulo: "며칠까지 세금을 위해 일할까요?",
      texto: "급여를 입력하면 다른 나라의 실수령액도 볼 수 있어요.",
      ir: "내 날짜 계산하기",
    },
  },
};

// ───────────────────────────── zh ─────────────────────────────

const gZh = GRAMATICA.zh;

const zhHant: TextosMundo = {
  nombre: "您的薪資在世界各地",
  seo: {
    titulo: (pais) => [`稅務自由日與全球實領薪資比較｜${pais}`, "稅務自由日與全球實領薪資比較", "您的薪資在世界各地"],
    tituloGlobal: ["稅務自由日與全球實領薪資比較", "您的薪資在世界各地"],
    descripcion: (pais, n) => `用您在${pais}的薪資，算出一年要為稅工作到哪一天，並比較同樣的薪資在 ${n} 個國家實領多少。免費使用。`,
    descripcionGlobal: (n) => `算出一年要為稅工作到哪一天，並比較同樣的薪資在 ${n} 個國家實領多少。免費使用，不必註冊。`,
  },
  ceja: "稅務自由日",
  h1: "您一年要為稅工作到哪一天？",
  bajada: (n) => `輸入稅前薪資，就能看到您的日期。接著在 ${n} 個國家比較：購買力相同，並依各國規則計算。`,
  form: {
    titulo: "您的薪資",
    sueldo: "稅前薪資",
    mes: "月薪",
    anio: "年薪",
    periodo: "薪資期間",
    pais: "您工作的國家",
    ejemplo: "範例",
    ejemploAyuda: "這是範例金額。輸入您的薪資，結果會立刻重新計算。",
    propio: "已帶入您先前的計算。",
    invalido: "請輸入大於零的金額。",
    pagas: "薪資單上的月薪。我們會加上法定的額外月薪。實領為 12 個月的平均。",
  },
  heroe: {
    hasta: (fecha) => `您為稅工作到${fecha}`,
    tasa: (pct) => `薪資的 ${pct} 用於所得稅和社會保險費。`,
    dias: (n, total) => `${total} 天中的 ${n} 天`,
    enMano: "實領",
    porMes: "每月",
    anio: (anio, n, total) => `${anio}年：${total} 天中有 ${n} 天是為稅工作。`,
    resto: "從隔天起，您賺的錢都屬於您。",
  },
  ranking: {
    titulo: "同樣的薪資，逐國比較",
    bajada: "在購買力相同的情況下，這是您在各國的實領金額。每一列都來自該國的官方計算工具。各國都用同樣的薪資計算，只有稅和社會保險費不同，不代表當地實際的薪資水準。",
    lista: "依實領金額排序的國家",
    buscar: "搜尋國家",
    filtrar: "依地區篩選",
    todas: "全部",
    regiones: { americas: "美洲", europa: "歐洲", asia: "亞洲與大洋洲", africa: "非洲與中東" },
    tuPais: "您的國家",
    mejor: "稅負最低",
    enMano: "每月實領",
    enTuMoneda: "換成您的貨幣",
    vsTuPais: "與您的國家相比",
    verTodos: (n) => `查看全部 ${n} 個國家`,
    verMenos: "收合",
    sinResultados: (q) => `找不到符合「${q}」的國家。`,
    abrir: (pais) => `開啟${pais}的計算工具`,
    mas: (pct) => `多 ${pct}`,
    menos: (pct) => `少 ${pct}`,
    igual: "相同",
    puesto: (p, total) => `您的國家在 ${total} 國中排第 ${p} 名。`,
  },
  tarjeta: {
    titulo: "分享用卡片",
    bajada: "只顯示日期和比例，絕不顯示您賺多少。",
    hasta: (fecha) => `我為稅工作到${fecha}`,
    tasa: (pct) => `我的薪資有 ${pct} 繳稅`,
    mejor: (pais, pct) => `同樣的薪資，${gZh.en(pais)}稅負較低，能多領 ${pct}`,
    mejorPropio: (pais) => `同樣的薪資，沒有國家比${pais}實領更多`,
    yVos: "您呢？",
    cta: "計算您的日期：",
    generica: "您要為稅工作到哪一天？",
    genericaBajada: (n) => `用 ${n} 個國家的官方計算工具比較同樣的薪資`,
    compartir: "分享我的卡片",
    compartirDuelo: "回敬挑戰",
    descargar: "下載圖片",
    copiado: "連結已複製，貼到任何地方都可以。",
    compartido: "已分享。",
    error: "無法分享，請再試一次。",
    texto: (fecha) => `我為稅工作到${fecha}。您呢？`,
    alt: "卡片預覽",
  },
  duelo: {
    amigo: (fecha) => `傳給您的人為稅工作到${fecha}。`,
    yVos: "您呢？",
    invitacion: "輸入薪資來比較。",
    vos: "您",
    elAmigo: "傳送者",
    dia: "為稅工作到",
    tasa: "稅與社會保險費",
    mejorPais: "稅負最低的國家",
    antes: (d) => `您比對方早 ${d} 天解放。`,
    despues: (d) => `對方比您早 ${d} 天解放。`,
    empate: "兩位在同一天解放。",
    desde: (pais) => `${gZh.en(pais)}工作`,
  },
  cero: { dia: "0 天", heroeAntes: "您為稅工作", tarjetaAntes: "我為稅工作", motivo: "以這份薪資，不扣所得稅也不扣社會保險費。", texto: "今年我為稅工作 0 天。您呢？", amigo: "傳給您的人今年為稅工作 0 天。" },
  metodo: {
    titulo: "計算方式",
    estimacion: "這是用來比較國家的估算，不是薪資單。扣除額、子女或獎金都可能改變您的數字。",
    supuestos: [
      "單身、沒有子女，採用各國計算工具的預設值。",
      "實領是扣掉所得稅和個人負擔的社會保險費後剩下的金額，不含營業稅，也不含雇主負擔的部分。",
      "年終獎金或第十三個月薪資，依各國法律分攤到全年。",
      "美國不計州稅和地方稅，只計聯邦稅和社會保險費。",
      "把薪資換到別的國家時，我們使用購買力平價：比較相同的生活水準，而不是當天的匯率。",
      "世界銀行只公布到 2021 年的阿根廷購買力平價，因此我們用 INDEC 的消費者物價指數推估到今年。",
      "自由日是把負擔從 1 月 1 日起依序分配。若薪資的 30% 用於繳稅，就等於一年有 30% 的時間為稅工作。",
    ],
    ppaTitulo: "購買力平價", bancoMundial: "世界銀行",
    ppa: (organismo, indicador, anio) => `${organismo}，指標 ${indicador}，最新年度 ${anio} 年。`,
    consultado: (fecha) => `查詢日期：${fecha}`,
    verFuente: "查看來源",
    fuentesTitulo: "各國來源",
    fuentesBajada: "每一列都使用該國的實領薪資計算工具和官方數據。",
    verificado: (fecha) => `數據查證日期：${fecha}`,
    sello: (fecha) => `各國官方數據都在來源處查證。最早的一次查證是 ${fecha}。`,
  },
  faqTitulo: "常見問題",
  faq: (n) => [
    {
      pregunta: "什麼是稅務自由日？",
      respuesta: "假設從 1 月 1 日起賺的錢都先拿去繳稅，繳完稅和社會保險費的那一天就是稅務自由日。這裡用您輸入的薪資計算，不是用全國平均。",
    },
    {
      pregunta: "為什麼用購買力比較？",
      respuesta: "用匯率換算，同一份薪資會因日子不同而顯得很多或很少。購買力平價比較的是這筆錢在各國實際能買到什麼。",
    },
    {
      pregunta: "我的薪資會被儲存嗎？",
      respuesta: "不會。計算只在您的瀏覽器中進行。分享的內容只有日期、比例和國家。",
    },
    {
      pregunta: "為什麼和我實際的實領不同？",
      respuesta: "我們以單身、沒有子女、預設值計算。扣除額、獎金或特別制度都會改變數字。想知道確切金額，請開啟您所在國家的計算工具。",
    },
    {
      pregunta: "包含哪些國家？",
      respuesta: `目前有 ${n} 個國家，每個國家都有實領薪資計算工具和官方數據。我們查證完規則後會陸續增加。`,
    },
  ],
  destacado: {
    ceja: "全球比較",
    titulo: "您要為稅工作到哪一天？",
    texto: "輸入薪資，就能看到在其他國家的實領金額。",
    ir: "計算我的日期",
  },
};

// 简体中文：逐句手写，用大陆的说法（工资、税后到手、数据）。
const zhHans: TextosMundo = {
  nombre: "您的工资在世界各地",
  seo: {
    titulo: (pais) => [`税务自由日与全球税后工资对比｜${pais}`, "税务自由日与全球税后工资对比", "您的工资在世界各地"],
    tituloGlobal: ["税务自由日与全球税后工资对比", "您的工资在世界各地"],
    descripcion: (pais, n) => `用您在${pais}的工资，算出一年要为税工作到哪一天，并对比同样的工资在 ${n} 个国家到手多少。免费使用。`,
    descripcionGlobal: (n) => `算出一年要为税工作到哪一天，并对比同样的工资在 ${n} 个国家到手多少。免费使用，无需注册。`,
  },
  ceja: "税务自由日",
  h1: "您一年要为税工作到哪一天？",
  bajada: (n) => `输入税前工资，就能看到您的日期。接着在 ${n} 个国家对比：购买力相同，并按各国规则计算。`,
  form: {
    titulo: "您的工资",
    sueldo: "税前工资",
    mes: "月薪",
    anio: "年薪",
    periodo: "工资周期",
    pais: "您工作的国家",
    ejemplo: "示例",
    ejemploAyuda: "这是示例金额。输入您的工资，结果会立即重新计算。",
    propio: "已带入您之前的计算。",
    invalido: "请输入大于零的金额。",
    pagas: "工资单上的月薪。我们会加上法定的额外月薪。到手为 12 个月的平均。",
  },
  heroe: {
    hasta: (fecha) => `您为税工作到${fecha}`,
    tasa: (pct) => `工资的 ${pct} 用于个人所得税和社保。`,
    dias: (n, total) => `${total} 天中的 ${n} 天`,
    enMano: "到手",
    porMes: "每月",
    anio: (anio, n, total) => `${anio}年：${total} 天中有 ${n} 天是为税工作。`,
    resto: "从第二天起，您挣的钱都归您。",
  },
  ranking: {
    titulo: "同样的工资，逐国对比",
    bajada: "在购买力相同的情况下，这是您在各国的到手金额。每一行都来自该国的官方计算工具。各国都用同样的工资计算，只有税和社保不同，不代表当地实际的工资水平。",
    lista: "按到手金额排序的国家",
    buscar: "搜索国家",
    filtrar: "按地区筛选",
    todas: "全部",
    regiones: { americas: "美洲", europa: "欧洲", asia: "亚洲和大洋洲", africa: "非洲和中东" },
    tuPais: "您的国家",
    mejor: "税负最低",
    enMano: "每月到手",
    enTuMoneda: "换成您的货币",
    vsTuPais: "与您的国家相比",
    verTodos: (n) => `查看全部 ${n} 个国家`,
    verMenos: "收起",
    sinResultados: (q) => `没有符合“${q}”的国家。`,
    abrir: (pais) => `打开${pais}的计算工具`,
    mas: (pct) => `多 ${pct}`,
    menos: (pct) => `少 ${pct}`,
    igual: "相同",
    puesto: (p, total) => `您的国家在 ${total} 国中排第 ${p} 名。`,
  },
  tarjeta: {
    titulo: "分享卡片",
    bajada: "只显示日期和比例，绝不显示您挣多少。",
    hasta: (fecha) => `我为税工作到${fecha}`,
    tasa: (pct) => `我的工资有 ${pct} 用来缴税`,
    mejor: (pais, pct) => `同样的工资，${gZh.en(pais)}税负较低，能多到手 ${pct}`,
    mejorPropio: (pais) => `同样的工资，没有国家比${pais}到手更多`,
    yVos: "您呢？",
    cta: "计算您的日期：",
    generica: "您要为税工作到哪一天？",
    genericaBajada: (n) => `用 ${n} 个国家的官方计算工具对比同样的工资`,
    compartir: "分享我的卡片",
    compartirDuelo: "回敬挑战",
    descargar: "下载图片",
    copiado: "链接已复制，可以粘贴到任何地方。",
    compartido: "已分享。",
    error: "分享失败，请再试一次。",
    texto: (fecha) => `我为税工作到${fecha}。您呢？`,
    alt: "卡片预览",
  },
  duelo: {
    amigo: (fecha) => `发给您的人为税工作到${fecha}。`,
    yVos: "您呢？",
    invitacion: "输入工资来对比。",
    vos: "您",
    elAmigo: "发送者",
    dia: "为税工作到",
    tasa: "税和社保",
    mejorPais: "税负最低的国家",
    antes: (d) => `您比对方早 ${d} 天解放。`,
    despues: (d) => `对方比您早 ${d} 天解放。`,
    empate: "两位在同一天解放。",
    desde: (pais) => `${gZh.en(pais)}工作`,
  },
  cero: { dia: "0 天", heroeAntes: "您为税工作", tarjetaAntes: "我为税工作", motivo: "按这份工资，不扣个人所得税也不扣社保。", texto: "今年我为税工作 0 天。您呢？", amigo: "发给您的人今年为税工作 0 天。" },
  metodo: {
    titulo: "计算方法",
    estimacion: "这是用来对比国家的估算，不是工资条。扣除项、子女或奖金都可能改变您的数字。",
    supuestos: [
      "单身、没有子女，采用各国计算工具的默认值。",
      "到手是扣除个人所得税和个人缴纳的社保后剩下的金额，不含增值税，也不含单位缴纳的部分。",
      "年终奖或第十三个月工资，按各国法律分摊到全年。",
      "美国不计州税和地方税，只计联邦税和社保。",
      "把工资换到别的国家时，我们使用购买力平价：对比相同的生活水平，而不是当天的汇率。",
      "世界银行只公布到 2021 年的阿根廷购买力平价，因此我们用 INDEC 的居民消费价格指数推算到今年。",
      "自由日是把负担从 1 月 1 日起依次分配。如果工资的 30% 用来缴税，就相当于一年有 30% 的时间为税工作。",
    ],
    ppaTitulo: "购买力平价", bancoMundial: "世界银行",
    ppa: (organismo, indicador, anio) => `${organismo}，指标 ${indicador}，最新年度 ${anio} 年。`,
    consultado: (fecha) => `查询日期：${fecha}`,
    verFuente: "查看来源",
    fuentesTitulo: "各国来源",
    fuentesBajada: "每一行都使用该国的税后工资计算工具和官方数据。",
    verificado: (fecha) => `数据核实日期：${fecha}`,
    sello: (fecha) => `各国官方数据都在来源处核实。最早的一次核实是 ${fecha}。`,
  },
  faqTitulo: "常见问题",
  faq: (n) => [
    {
      pregunta: "什么是税务自由日？",
      respuesta: "假设从 1 月 1 日起挣的钱都先拿去缴税，缴完税和社保的那一天就是税务自由日。这里用您输入的工资计算，不是用全国平均。",
    },
    {
      pregunta: "为什么用购买力对比？",
      respuesta: "用汇率换算，同一份工资会因日子不同而显得很多或很少。购买力平价对比的是这笔钱在各国实际能买到什么。",
    },
    {
      pregunta: "我的工资会被保存吗？",
      respuesta: "不会。计算只在您的浏览器中进行。分享的内容只有日期、比例和国家。",
    },
    {
      pregunta: "为什么和我实际到手不同？",
      respuesta: "我们按单身、没有子女、默认值计算。扣除项、奖金或特殊政策都会改变数字。想知道确切金额，请打开您所在国家的计算工具。",
    },
    {
      pregunta: "包含哪些国家？",
      respuesta: `目前有 ${n} 个国家，每个国家都有税后工资计算工具和官方数据。我们核实完规则后会陆续增加。`,
    },
  ],
  destacado: {
    ceja: "全球对比",
    titulo: "您要为税工作到哪一天？",
    texto: "输入工资，就能看到在其他国家的到手金额。",
    ir: "计算我的日期",
  },
};

const zh: Diccionario<TextosMundo> = { base: zhHant, regional: { "zh-CN": zhHans, "zh-SG": zhHans } };

// ───────────────────────────── pl ─────────────────────────────

const gPl = GRAMATICA.pl;
const SEO_PL = "Dzień wolności podatkowej i pensja netto na świecie";
const dniPl = (d: number) => pluralPl(d, "dzień", "dni", "dni");

const pl: Diccionario<TextosMundo> = {
  base: {
    nombre: "Twoja pensja na świecie",
    seo: {
      titulo: (pais) => [`${SEO_PL} | ${pais}`, SEO_PL, "Twoja pensja na świecie"],
      tituloGlobal: [SEO_PL, "Twoja pensja na świecie"],
      descripcion: (pais, n) => `Sprawdź, do którego dnia pracujesz na państwo z pensją ${gPl.en(pais)} i ile zostaje ci netto w ${n} krajach. Za darmo, bez konta.`,
      descripcionGlobal: (n) => `Sprawdź, do którego dnia roku pracujesz na państwo i ile z pensji zostaje ci netto w ${n} krajach. Za darmo, bez konta.`,
    },
    ceja: "Twój dzień wolności podatkowej",
    h1: "Do którego dnia w roku pracujesz na państwo?",
    bajada: (n) => `Wpisz pensję brutto i zobacz swoją datę. Potem porównaj ją w ${n} krajach, przy tej samej sile nabywczej i z zasadami każdego kraju.`,
    form: {
      titulo: "Twoja pensja",
      sueldo: "Pensja brutto",
      mes: "Miesięcznie",
      anio: "Rocznie",
      periodo: "Okres pensji",
      pais: "Kraj, w którym pracujesz",
      ejemplo: "Przykład",
      ejemploAyuda: "To przykładowa pensja. Wpisz swoją, a wszystko od razu się przeliczy.",
      propio: "Przeniesione z twojego obliczenia.",
      invalido: "Wpisz kwotę większą od zera.",
      pagas: "Pensja miesięczna jak na pasku wypłaty: doliczamy dodatkowe wypłaty wymagane przez prawo. Netto to średnia z 12 miesięcy.",
    },
    heroe: {
      hasta: (fecha) => `Pracujesz na państwo do ${fecha}`,
      tasa: (pct) => `${pct} twojej pensji idzie na podatek dochodowy i składki.`,
      dias: (n, total) => `${n} z ${total} dni`,
      enMano: "Na rękę zostaje ci",
      porMes: "miesięcznie",
      anio: (anio, n, total) => `Rok ${anio}: ${n} z ${total} dni na państwo.`,
      resto: "Od następnego dnia to, co zarabiasz, jest twoje.",
    },
    ranking: {
      titulo: "Ta sama pensja, kraj po kraju",
      bajada: "Przy tej samej sile nabywczej tyle zostaje ci netto w każdym kraju. Każdy wiersz pochodzi z kalkulatora pensji netto danego kraju, liczonego na oficjalnych danych. Wszędzie ta sama pensja: zmieniają się tylko podatki i składki, a nie to, ile się zarabia w danym kraju.",
      lista: "Kraje według pensji netto",
      buscar: "Szukaj kraju",
      filtrar: "Filtruj według regionu",
      todas: "Wszystkie kraje",
      regiones: { americas: "Ameryka", europa: "Europa", asia: "Azja i Oceania", africa: "Afryka i Bliski Wschód" },
      tuPais: "Twój kraj",
      mejor: "Najniższe podatki",
      enMano: "Netto miesięcznie",
      enTuMoneda: "W twojej walucie",
      vsTuPais: "W porównaniu z twoim krajem",
      verTodos: (n) => `Pokaż wszystkie kraje (${n})`,
      verMenos: "Pokaż mniej",
      sinResultados: (q) => `Żaden kraj nie pasuje do „${q}”.`,
      abrir: (pais) => `Otwórz kalkulator ${gPl.para(pais)}`,
      mas: (pct) => `${pct} więcej`,
      menos: (pct) => `${pct} mniej`,
      igual: "Bez różnicy",
      puesto: (p, total) => `Twój kraj jest na ${p}. miejscu z ${total}.`,
    },
    tarjeta: {
      titulo: "Twoja karta do udostępnienia",
      bajada: "Pokazuje twoją datę i procenty. Nigdy to, ile zarabiasz.",
      hasta: (fecha) => `Pracuję na państwo do ${fecha}`,
      tasa: (pct) => `${pct} mojej pensji idzie do państwa`,
      mejor: (pais, pct) => `Przy tej samej pensji ${gPl.en(pais)} podatki byłyby niższe: o ${pct} więcej netto`,
      mejorPropio: (pais) => `Z moją pensją nigdzie nie zostaje mi więcej niż ${gPl.en(pais)}`,
      yVos: "A ty?",
      cta: "Policz swoją na",
      generica: "Do którego dnia pracujesz na państwo?",
      genericaBajada: (n) => `Twoja pensja w ${n} krajach, z kalkulatorem każdego kraju`,
      compartir: "Udostępnij moją kartę",
      compartirDuelo: "Odpowiedz wyzwaniem",
      descargar: "Pobierz obraz",
      copiado: "Link skopiowany. Wklej go, gdzie chcesz.",
      compartido: "Gotowe, udostępnione.",
      error: "Nie udało się udostępnić. Spróbuj jeszcze raz.",
      texto: (fecha) => `Pracuję na państwo do ${fecha}. A ty?`,
      alt: "Podgląd twojej karty",
    },
    duelo: {
      amigo: (fecha) => `Twój znajomy pracuje na państwo do ${fecha}.`,
      yVos: "A ty?",
      invitacion: "Wpisz swoją pensję i porównaj.",
      vos: "Ty",
      elAmigo: "Znajomy",
      dia: "Na państwo do",
      tasa: "Podatek i składki",
      mejorPais: "Najniższe podatki w kraju",
      antes: (d) => `Twój dzień wolności wypada ${dniPl(d)} wcześniej niż u znajomego.`,
      despues: (d) => `Dzień wolności znajomego wypada ${dniPl(d)} wcześniej niż twój.`,
      empate: "Macie dzień wolności tego samego dnia.",
      desde: (pais) => `Pracuje ${gPl.en(pais)}`,
    },
    cero: {
      dia: "zero dni",
      heroeAntes: "Na państwo pracujesz",
      tarjetaAntes: "Na państwo pracuję",
      motivo: "Od tej pensji nie pobiera się podatku dochodowego ani składek.",
      texto: "W tym roku nie pracuję na państwo ani jednego dnia. A ty?",
      amigo: "Twój znajomy nie pracuje na państwo ani jednego dnia.",
    },
    metodo: {
      titulo: "Jak liczymy",
      estimacion: "To szacunek do porównania krajów, a nie pasek wypłaty. Ulgi, dzieci czy premie mogą zmienić twój wynik.",
      supuestos: [
        "Osoba samotna bez dzieci, z domyślnymi ustawieniami kalkulatora każdego kraju.",
        "Netto to to, co zostaje po podatku dochodowym i składkach płaconych przez pracownika. VAT i część płacona przez pracodawcę się nie liczą.",
        "Trzynastka czy obowiązkowy dodatek urlopowy rozkładają się na cały rok tak, jak przewiduje prawo każdego kraju.",
        "W Stanach Zjednoczonych nie liczymy podatków stanowych ani lokalnych: tylko podatek federalny i składki.",
        "Żeby przenieść twoją pensję do innego kraju, używamy parytetu siły nabywczej (PSN): ten sam poziom życia, a nie dzisiejszy kurs walut.",
        "PSN Argentyny aktualizujemy wskaźnikiem cen INDEC, bo Bank Światowy publikuje go tylko do 2021 roku.",
        "Dzień wolności rozkłada twoje obciążenie od 1 stycznia. Jeśli 30% pensji idzie do państwa, pracujesz na nie przez 30% roku.",
      ],
      ppaTitulo: "Parytet siły nabywczej",
      bancoMundial: "Bank Światowy",
      ppa: (organismo, indicador, anio) => `${organismo}, wskaźnik ${indicador}, ostatni dostępny rok ${anio}.`,
      consultado: (fecha) => `Sprawdzono ${fecha}.`,
      verFuente: "Zobacz źródło",
      fuentesTitulo: "Źródło każdego kraju",
      fuentesBajada: "Każdy wiersz korzysta z kalkulatora pensji netto danego kraju i jego oficjalnych danych.",
      verificado: (fecha) => `Dane sprawdzone ${fecha}`,
      sello: (fecha) => `Oficjalne dane, sprawdzone u źródła w każdym kraju. Najstarsze sprawdzenie pochodzi z ${fecha}.`,
    },
    faqTitulo: "Najczęstsze pytania",
    faq: (n) => [
      {
        pregunta: "Czym jest dzień wolności podatkowej?",
        respuesta:
          "To dzień roku, w którym spłacasz swoje podatki i składki, gdyby wszystko, co zarabiasz od 1 stycznia, szło najpierw do państwa. Tutaj liczymy go z twoją pensją, a nie ze średnią krajową.",
      },
      {
        pregunta: "Dlaczego porównujemy siłę nabywczą?",
        respuesta: "Po kursie walut ta sama pensja wygląda, zależnie od dnia, na ogromną albo malutką. PSN porównuje, co naprawdę można za te pieniądze kupić w każdym kraju.",
      },
      {
        pregunta: "Czy zapisujecie moją pensję?",
        respuesta: "Nie. Obliczenie odbywa się w twojej przeglądarce. To, co udostępniasz, zawiera tylko daty, procenty i kraje.",
      },
      {
        pregunta: "Dlaczego moje prawdziwe netto jest inne?",
        respuesta:
          "Liczymy dla osoby samotnej bez dzieci, z ustawieniami domyślnymi. Ulgi, premie czy szczególne zasady zmieniają wynik. Dla swojego dokładnego przypadku otwórz kalkulator swojego kraju.",
      },
      {
        pregunta: "Które kraje są uwzględnione?",
        respuesta: `Dziś ${pluralPl(n, "kraj", "kraje", "krajów")}, każdy z własnym kalkulatorem pensji netto i oficjalnymi danymi. Dodajemy kolejne, gdy tylko sprawdzimy ich zasady.`,
      },
    ],
    destacado: {
      ceja: "Porównanie na świecie",
      titulo: "Do którego dnia pracujesz na państwo?",
      texto: "Wpisz pensję i zobacz, ile zostaje ci netto w innych krajach.",
      ir: "Policz moją datę",
    },
  },
};

// ───────────────────────────── sv ─────────────────────────────

const gSv = GRAMATICA.sv;
const SEO_SV = "Skattefrihetsdag och nettolön i världen";

const sv: Diccionario<TextosMundo> = {
  base: {
    nombre: "Din lön i världen",
    seo: {
      titulo: (pais) => [`${SEO_SV} | ${pais}`, SEO_SV, "Din lön i världen"],
      tituloGlobal: [SEO_SV, "Din lön i världen"],
      descripcion: (pais, n) => `Se till vilken dag du jobbar för staten med din lön ${gSv.en(pais)}, och vad du får kvar netto i ${n} länder. Gratis, utan konto.`,
      descripcionGlobal: (n) => `Se till vilken dag du jobbar för staten och vad du får kvar av lönen netto i ${n} länder. Gratis, utan konto.`,
    },
    ceja: "Din skattefrihetsdag",
    h1: "Till vilken dag på året jobbar du för staten?",
    bajada: (n) => `Skriv din bruttolön och se ditt datum. Jämför sedan i ${n} länder, med samma köpkraft och varje lands regler.`,
    form: {
      titulo: "Din lön",
      sueldo: "Bruttolön",
      mes: "Per månad",
      anio: "Per år",
      periodo: "Löneperiod",
      pais: "Land där du jobbar",
      ejemplo: "Exempel",
      ejemploAyuda: "Det här är en exempellön. Skriv din egen så räknas allt om direkt.",
      propio: "Hämtat från din beräkning.",
      invalido: "Skriv ett belopp över noll.",
      pagas: "Din månadslön enligt lönebeskedet: vi lägger till de extra utbetalningar som lagen kräver. Nettot är snittet över 12 månader.",
    },
    heroe: {
      hasta: (fecha) => `Du jobbar för staten till ${fecha}`,
      tasa: (pct) => `${pct} av din lön går till inkomstskatt och avgifter.`,
      dias: (n, total) => `${n} av ${total} dagar`,
      enMano: "Kvar netto",
      porMes: "per månad",
      anio: (anio, n, total) => `År ${anio}: ${n} av ${total} dagar för staten.`,
      resto: "Från dagen efter är det du tjänar ditt.",
    },
    ranking: {
      titulo: "Samma lön, land för land",
      bajada: "Med samma köpkraft får du kvar så här mycket netto i varje land. Varje rad kommer från landets nettolönekalkylator, med officiella uppgifter. Samma lön överallt: bara skatter och avgifter skiljer sig, inte vad man tjänar i varje land.",
      lista: "Länder sorterade efter nettolön",
      buscar: "Sök land",
      filtrar: "Filtrera efter region",
      todas: "Alla länder",
      regiones: { americas: "Amerika", europa: "Europa", asia: "Asien och Oceanien", africa: "Afrika och Mellanöstern" },
      tuPais: "Ditt land",
      mejor: "Lägst skatt",
      enMano: "Netto per månad",
      enTuMoneda: "I din valuta",
      vsTuPais: "Jämfört med ditt land",
      verTodos: (n) => `Visa alla ${n} länder`,
      verMenos: "Visa färre",
      sinResultados: (q) => `Inget land matchar ”${q}”.`,
      abrir: (pais) => `Öppna kalkylatorn ${gSv.para(pais)}`,
      mas: (pct) => `${pct} mer`,
      menos: (pct) => `${pct} mindre`,
      igual: "Lika",
      puesto: (p, total) => `Ditt land ligger på plats ${p} av ${total}.`,
    },
    tarjeta: {
      titulo: "Ditt kort att dela",
      bajada: "Det visar ditt datum och dina procent. Aldrig vad du tjänar.",
      hasta: (fecha) => `Jag jobbar för staten till ${fecha}`,
      tasa: (pct) => `${pct} av min lön går till staten`,
      mejor: (pais, pct) => `Med samma lön skulle jag betala mindre skatt ${gSv.en(pais)}: ${pct} mer netto`,
      mejorPropio: (pais) => `Med min lön får jag inte mer kvar någonstans än ${gSv.en(pais)}`,
      yVos: "Och du?",
      cta: "Räkna ut ditt på",
      generica: "Till vilken dag jobbar du för staten?",
      genericaBajada: (n) => `Din lön i ${n} länder, med varje lands kalkylator`,
      compartir: "Dela mitt kort",
      compartirDuelo: "Utmana tillbaka",
      descargar: "Ladda ner bilden",
      copiado: "Länken är kopierad. Klistra in den där du vill.",
      compartido: "Klart, delat.",
      error: "Det gick inte att dela. Försök igen.",
      texto: (fecha) => `Jag jobbar för staten till ${fecha}. Och du?`,
      alt: "Förhandsvisning av ditt kort",
    },
    duelo: {
      amigo: (fecha) => `Din vän jobbar för staten till ${fecha}.`,
      yVos: "Och du?",
      invitacion: "Skriv din lön och jämför.",
      vos: "Du",
      elAmigo: "Din vän",
      dia: "För staten till",
      tasa: "Skatt och avgifter",
      mejorPais: "Lägst skatt i",
      antes: (d) => (d === 1 ? "Du blir fri 1 dag före din vän." : `Du blir fri ${d} dagar före din vän.`),
      despues: (d) => (d === 1 ? "Din vän blir fri 1 dag före dig." : `Din vän blir fri ${d} dagar före dig.`),
      empate: "Ni blir fria samma dag.",
      desde: (pais) => `Jobbar ${gSv.en(pais)}`,
    },
    cero: {
      dia: "noll dagar",
      heroeAntes: "För staten jobbar du",
      tarjetaAntes: "För staten jobbar jag",
      motivo: "På den här lönen dras varken inkomstskatt eller avgifter.",
      texto: "I år jobbar jag inte en enda dag för staten. Och du?",
      amigo: "Din vän jobbar inte en enda dag för staten.",
    },
    metodo: {
      titulo: "Så räknar vi",
      estimacion: "Det här är en uppskattning för att jämföra länder, inte ett lönebesked. Avdrag, barn eller bonusar kan ändra din siffra.",
      supuestos: [
        "En ensamstående utan barn, med standardvärdena i varje lands kalkylator.",
        "Netto är det som blir kvar efter inkomstskatt och de avgifter som den anställda själv betalar. Moms och arbetsgivarens del räknas inte.",
        "En trettonde månadslön eller lagstadgad semesterersättning fördelas över året så som varje lands lag säger.",
        "I USA räknar vi inte med delstatlig eller lokal skatt: bara den federala skatten och avgifterna.",
        "För att flytta din lön till ett annat land använder vi köpkraftsparitet (PPP): samma levnadsstandard, inte dagens växelkurs.",
        "Argentinas PPP uppdateras med prisindexet från INDEC, eftersom Världsbanken bara publicerar den till 2021.",
        "Frihetsdagen fördelar din börda från den 1 januari. Går 30 % av lönen till staten jobbar du 30 % av året för staten.",
      ],
      ppaTitulo: "Köpkraftsparitet",
      bancoMundial: "Världsbanken",
      ppa: (organismo, indicador, anio) => `${organismo}, indikator ${indicador}, senast tillgängliga år ${anio}.`,
      consultado: (fecha) => `Hämtat ${fecha}.`,
      verFuente: "Se källan",
      fuentesTitulo: "Källan för varje land",
      fuentesBajada: "Varje rad använder landets nettolönekalkylator med dess officiella uppgifter.",
      verificado: (fecha) => `Uppgifterna kontrollerade ${fecha}`,
      sello: (fecha) => `Officiella uppgifter, kontrollerade i varje lands källa. Den äldsta kontrollen är från ${fecha}.`,
    },
    faqTitulo: "Vanliga frågor",
    faq: (n) => [
      {
        pregunta: "Vad är skattefrihetsdagen?",
        respuesta:
          "Dagen på året då du har betalat av din skatt och dina avgifter, om allt du tjänar från den 1 januari först gick till staten. Här räknar vi med din lön, inte med landets genomsnitt.",
      },
      {
        pregunta: "Varför jämföra med köpkraft?",
        respuesta: "Med växelkursen ser en lön, beroende på dagen, enorm eller pytteliten ut. PPP jämför vad pengarna faktiskt räcker till i varje land.",
      },
      {
        pregunta: "Sparas min lön?",
        respuesta: "Nej. Beräkningen körs i din webbläsare. Det du delar innehåller bara datum, procent och länder.",
      },
      {
        pregunta: "Varför skiljer sig mitt riktiga netto?",
        respuesta:
          "Vi räknar med en ensamstående utan barn och standardvärden. Avdrag, bonusar eller särskilda regler ändrar siffran. Öppna kalkylatorn för ditt land för att se just ditt fall.",
      },
      {
        pregunta: "Vilka länder är med?",
        respuesta: `I dag ${n} länder, vart och ett med egen nettolönekalkylator och officiella uppgifter. Vi lägger till fler när vi har kontrollerat deras regler.`,
      },
    ],
    destacado: {
      ceja: "Jämförelse i världen",
      titulo: "Till vilken dag jobbar du för staten?",
      texto: "Skriv din lön och se vad du får kvar netto i andra länder.",
      ir: "Räkna ut mitt datum",
    },
  },
};

// ───────────────────────────── da ─────────────────────────────

const gDa = GRAMATICA.da;
const SEO_DA = "Skattefridag og nettoløn i verden";

const da: Diccionario<TextosMundo> = {
  base: {
    nombre: "Din løn i verden",
    seo: {
      titulo: (pais) => [`${SEO_DA} | ${pais}`, SEO_DA, "Din løn i verden"],
      tituloGlobal: [SEO_DA, "Din løn i verden"],
      descripcion: (pais, n) => `Se, til hvilken dag du arbejder for staten med din løn ${gDa.en(pais)}, og hvad du har tilbage netto i ${n} lande. Gratis, uden konto.`,
      descripcionGlobal: (n) => `Se, til hvilken dag du arbejder for staten, og hvad du har tilbage af lønnen netto i ${n} lande. Gratis, uden konto.`,
    },
    ceja: "Din skattefridag",
    h1: "Til hvilken dag i året arbejder du for staten?",
    bajada: (n) => `Skriv din bruttoløn, og se din dato. Sammenlign den derefter i ${n} lande med samme købekraft og hvert lands regler.`,
    form: {
      titulo: "Din løn",
      sueldo: "Bruttoløn",
      mes: "Om måneden",
      anio: "Om året",
      periodo: "Lønperiode",
      pais: "Land, hvor du arbejder",
      ejemplo: "Eksempel",
      ejemploAyuda: "Det her er en eksempelløn. Skriv din egen, så regnes alt om med det samme.",
      propio: "Hentet fra din beregning.",
      invalido: "Skriv et beløb over nul.",
      pagas: "Din månedsløn ifølge lønsedlen: vi lægger de ekstra udbetalinger, loven kræver, oveni. Netto er gennemsnittet over 12 måneder.",
    },
    heroe: {
      hasta: (fecha) => `Du arbejder for staten til ${fecha}`,
      tasa: (pct) => `${pct} af din løn går til indkomstskat og bidrag.`,
      dias: (n, total) => `${n} af ${total} dage`,
      enMano: "Tilbage netto",
      porMes: "om måneden",
      anio: (anio, n, total) => `${anio}: ${n} af ${total} dage for staten.`,
      resto: "Fra dagen efter er det, du tjener, dit eget.",
    },
    ranking: {
      titulo: "Samme løn, land for land",
      bajada: "Med samme købekraft har du så meget tilbage netto i hvert land. Hver række kommer fra landets nettolønsberegner med officielle tal. Samme løn overalt: kun skat og bidrag ændrer sig, ikke hvad man tjener i hvert land.",
      lista: "Lande sorteret efter nettoløn",
      buscar: "Søg efter land",
      filtrar: "Filtrér efter region",
      todas: "Alle lande",
      regiones: { americas: "Amerika", europa: "Europa", asia: "Asien og Oceanien", africa: "Afrika og Mellemøsten" },
      tuPais: "Dit land",
      mejor: "Lavest skat",
      enMano: "Netto om måneden",
      enTuMoneda: "I din valuta",
      vsTuPais: "I forhold til dit land",
      verTodos: (n) => `Se alle ${n} lande`,
      verMenos: "Vis færre",
      sinResultados: (q) => `Intet land passer til “${q}”.`,
      abrir: (pais) => `Åbn beregneren ${gDa.para(pais)}`,
      mas: (pct) => `${pct} mere`,
      menos: (pct) => `${pct} mindre`,
      igual: "Det samme",
      puesto: (p, total) => `Dit land ligger på plads ${p} af ${total}.`,
    },
    tarjeta: {
      titulo: "Dit kort til deling",
      bajada: "Det viser din dato og dine procenter. Aldrig hvad du tjener.",
      hasta: (fecha) => `Jeg arbejder for staten til ${fecha}`,
      tasa: (pct) => `${pct} af min løn går til staten`,
      mejor: (pais, pct) => `Med samme løn ville jeg betale mindre i skat ${gDa.en(pais)}: ${pct} mere netto`,
      mejorPropio: (pais) => `Med min løn har jeg ikke mere tilbage noget sted end ${gDa.en(pais)}`,
      yVos: "Og du?",
      cta: "Regn din egen ud på",
      generica: "Til hvilken dag arbejder du for staten?",
      genericaBajada: (n) => `Din løn i ${n} lande med hvert lands beregner`,
      compartir: "Del mit kort",
      compartirDuelo: "Udfordr tilbage",
      descargar: "Hent billedet",
      copiado: "Linket er kopieret. Indsæt det, hvor du vil.",
      compartido: "Færdig, delt.",
      error: "Det lykkedes ikke at dele. Prøv igen.",
      texto: (fecha) => `Jeg arbejder for staten til ${fecha}. Og du?`,
      alt: "Eksempel på dit kort",
    },
    duelo: {
      amigo: (fecha) => `Din ven arbejder for staten til ${fecha}.`,
      yVos: "Og du?",
      invitacion: "Skriv din løn, og sammenlign.",
      vos: "Dig",
      elAmigo: "Din ven",
      dia: "For staten til",
      tasa: "Skat og bidrag",
      mejorPais: "Lavest skat i",
      antes: (d) => (d === 1 ? "Du bliver fri 1 dag før din ven." : `Du bliver fri ${d} dage før din ven.`),
      despues: (d) => (d === 1 ? "Din ven bliver fri 1 dag før dig." : `Din ven bliver fri ${d} dage før dig.`),
      empate: "I bliver fri samme dag.",
      desde: (pais) => `Arbejder ${gDa.en(pais)}`,
    },
    cero: {
      dia: "nul dage",
      heroeAntes: "For staten arbejder du",
      tarjetaAntes: "For staten arbejder jeg",
      motivo: "Af den her løn trækkes hverken indkomstskat eller bidrag.",
      texto: "I år arbejder jeg ikke en eneste dag for staten. Og du?",
      amigo: "Din ven arbejder ikke en eneste dag for staten.",
    },
    metodo: {
      titulo: "Sådan regner vi",
      estimacion: "Det her er et skøn til at sammenligne lande, ikke en lønseddel. Fradrag, børn eller bonusser kan ændre dit tal.",
      supuestos: [
        "En enlig uden børn med standardværdierne i hvert lands beregner.",
        "Netto er det, der er tilbage efter indkomstskat og de bidrag, personen selv betaler. Moms og arbejdsgiverens andel tæller ikke med.",
        "En 13. månedsløn eller lovpligtige feriepenge fordeles over året, som loven i hvert land siger.",
        "I USA regner vi ikke med delstats- eller lokalskat: kun den føderale skat og bidragene.",
        "For at flytte din løn til et andet land bruger vi købekraftsparitet (PPP): samme levestandard, ikke dagens valutakurs.",
        "Argentinas PPP opdateres med prisindekset fra INDEC, fordi Verdensbanken kun offentliggør den til 2021.",
        "Frihedsdagen fordeler din byrde fra 1. januar. Går 30 % af lønnen til staten, arbejder du 30 % af året for staten.",
      ],
      ppaTitulo: "Købekraftsparitet",
      bancoMundial: "Verdensbanken",
      ppa: (organismo, indicador, anio) => `${organismo}, indikator ${indicador}, seneste tilgængelige år ${anio}.`,
      consultado: (fecha) => `Hentet ${fecha}.`,
      verFuente: "Se kilden",
      fuentesTitulo: "Kilden for hvert land",
      fuentesBajada: "Hver række bruger landets nettolønsberegner med dets officielle tal.",
      verificado: (fecha) => `Tal tjekket ${fecha}`,
      sello: (fecha) => `Officielle tal, tjekket hos hvert lands kilde. Det ældste tjek er fra ${fecha}.`,
    },
    faqTitulo: "Ofte stillede spørgsmål",
    faq: (n) => [
      {
        pregunta: "Hvad er skattefridagen?",
        respuesta:
          "Den dag i året, hvor du har betalt din skat og dine bidrag af, hvis alt, hvad du tjener fra 1. januar, først gik til staten. Her regner vi med din løn, ikke med landets gennemsnit.",
      },
      {
        pregunta: "Hvorfor sammenligne med købekraft?",
        respuesta: "Med valutakursen ser en løn, alt efter dagen, kæmpestor eller bitte lille ud. PPP sammenligner, hvad pengene reelt rækker til i hvert land.",
      },
      {
        pregunta: "Bliver min løn gemt?",
        respuesta: "Nej. Beregningen sker i din browser. Det, du deler, indeholder kun datoer, procenter og lande.",
      },
      {
        pregunta: "Hvorfor er mit rigtige netto anderledes?",
        respuesta:
          "Vi regner med en enlig uden børn og standardværdier. Fradrag, bonusser eller særlige ordninger ændrer tallet. Åbn beregneren for dit land for at se din præcise situation.",
      },
      {
        pregunta: "Hvilke lande er med?",
        respuesta: `I dag ${n} lande, hvert med sin egen nettolønsberegner og officielle tal. Vi tilføjer flere, når vi har tjekket deres regler.`,
      },
    ],
    destacado: {
      ceja: "Sammenligning i verden",
      titulo: "Til hvilken dag arbejder du for staten?",
      texto: "Skriv din løn, og se, hvad du har tilbage netto i andre lande.",
      ir: "Beregn min dato",
    },
  },
};

// ───────────────────────────── nb ─────────────────────────────

// Registro «du», como DNB y Sbanken: solo base.
const gNb = GRAMATICA.nb;
const SEO_NB = "Skattefridagen og nettolønnen din i hele verden";

const nb: Diccionario<TextosMundo> = {
  base: {
    nombre: "Lønnen din i verden",
    seo: {
      titulo: (pais) => [`${SEO_NB} | ${pais}`, SEO_NB, "Lønnen din i verden"],
      tituloGlobal: [SEO_NB, "Lønnen din i verden"],
      descripcion: (pais, n) => `Se hvor langt ut i året du jobber for staten med lønnen din ${gNb.en(pais)}, og hva du sitter igjen med netto i ${n} land. Gratis og uten konto.`,
      descripcionGlobal: (n) => `Se hvor langt ut i året du jobber for staten, og hva du sitter igjen med netto av lønnen din i ${n} land. Gratis og uten konto.`,
    },
    ceja: "Din skattefridag",
    h1: "Til hvilken dag i året jobber du for staten?",
    bajada: (n) => `Skriv inn bruttolønnen din og se datoen din. Sammenlign den så i ${n} land, med samme kjøpekraft og reglene i hvert land.`,
    form: {
      titulo: "Lønnen din",
      sueldo: "Bruttolønn",
      mes: "Per måned",
      anio: "Per år",
      periodo: "Lønnsperiode",
      pais: "Landet du jobber i",
      ejemplo: "Eksempel",
      ejemploAyuda: "Dette er en eksempellønn. Skriv inn din egen, så regnes alt ut på nytt med en gang.",
      propio: "Hentet fra beregningen din.",
      invalido: "Skriv inn et beløp over null.",
      pagas: "Månedslønnen din slik den står på lønnsslippen: vi legger til de lovpålagte ekstrautbetalingene. Netto er snittet over 12 måneder.",
    },
    heroe: {
      hasta: (fecha) => `Du jobber for staten til ${fecha}`,
      tasa: (pct) => `${pct} av lønnen din går til inntektsskatt og trygdeavgift.`,
      dias: (n, total) => `${n} av ${total} dager`,
      enMano: "Netto sitter du igjen med",
      porMes: "per måned",
      anio: (anio, n, total) => `År ${anio}: ${n} av ${total} dager for staten.`,
      resto: "Fra dagen etter er det du tjener, ditt eget.",
    },
    ranking: {
      titulo: "Samme lønn, land for land",
      bajada: "Med samme kjøpekraft sitter du igjen med dette netto i hvert land. Hver rad kommer fra den offisielle kalkulatoren i landet. Samme lønn overalt: bare skatt og avgifter endrer seg, ikke hva man tjener i hvert land.",
      lista: "Land sortert etter nettolønn",
      buscar: "Søk etter land",
      filtrar: "Filtrer etter region",
      todas: "Alle land",
      regiones: { americas: "Amerika", europa: "Europa", asia: "Asia og Oseania", africa: "Afrika og Midtøsten" },
      tuPais: "Ditt land",
      mejor: "Lavest skatt",
      enMano: "Netto per måned",
      enTuMoneda: "I din valuta",
      vsTuPais: "Sammenlignet med ditt land",
      verTodos: (n) => `Se alle de ${n} landene`,
      verMenos: "Vis færre",
      sinResultados: (q) => `Ingen land passer til «${q}».`,
      abrir: (pais) => `Åpne kalkulatoren ${gNb.de(pais)}`,
      mas: (pct) => `${pct} mer`,
      menos: (pct) => `${pct} mindre`,
      igual: "Likt",
      puesto: (p, total) => `Landet ditt er på plass ${p} av ${total}.`,
    },
    tarjeta: {
      titulo: "Kortet ditt til deling",
      bajada: "Det viser datoen og prosentene dine. Aldri hva du tjener.",
      hasta: (fecha) => `Jeg jobber for staten til ${fecha}`,
      tasa: (pct) => `${pct} av lønnen min går til staten`,
      mejor: (pais, pct) => `Med samme lønn ville jeg betalt mindre skatt ${gNb.en(pais)}: ${pct} mer netto`,
      mejorPropio: (pais) => `Med lønnen min sitter jeg ikke igjen med mer noe sted enn ${gNb.en(pais)}`,
      yVos: "Og du?",
      cta: "Regn ut din på",
      generica: "Til hvilken dag jobber du for staten?",
      genericaBajada: (n) => `Lønnen din i ${n} land, med den offisielle kalkulatoren i hvert land`,
      compartir: "Del kortet mitt",
      compartirDuelo: "Utfordre tilbake",
      descargar: "Last ned bildet",
      copiado: "Lenken er kopiert. Lim den inn der du vil.",
      compartido: "Ferdig, delt.",
      error: "Delingen mislyktes. Prøv igjen.",
      texto: (fecha) => `Jeg jobber for staten til ${fecha}. Og du?`,
      alt: "Forhåndsvisning av kortet ditt",
    },
    duelo: {
      amigo: (fecha) => `Vennen din jobber for staten til ${fecha}.`,
      yVos: "Og du?",
      invitacion: "Skriv inn lønnen din og sammenlign.",
      vos: "Du",
      elAmigo: "Vennen din",
      dia: "For staten til",
      tasa: "Skatt og avgifter",
      mejorPais: "Lavest skatt i",
      antes: (d) => (d === 1 ? "Du blir fri 1 dag før vennen din." : `Du blir fri ${d} dager før vennen din.`),
      despues: (d) => (d === 1 ? "Vennen din blir fri 1 dag før deg." : `Vennen din blir fri ${d} dager før deg.`),
      empate: "Dere blir fri samme dag.",
      desde: (pais) => `Jobber ${gNb.en(pais)}`,
    },
    cero: { dia: "null dager", heroeAntes: "For staten jobber du", tarjetaAntes: "For staten jobber jeg", motivo: "Med denne lønnen trekkes det verken inntektsskatt eller trygdeavgift.", texto: "I år jobber jeg ikke en eneste dag for staten. Og du?", amigo: "Vennen din jobber ikke en eneste dag for staten." },
    metodo: {
      titulo: "Slik regner vi",
      estimacion: "Dette er et anslag for å sammenligne land, ikke en lønnsslipp. Fradrag, barn eller bonuser kan endre tallet ditt.",
      supuestos: [
        "En enslig person uten barn, med standardverdiene i kalkulatoren i hvert land.",
        "Netto er det som blir igjen etter inntektsskatt og avgiftene personen betaler selv. Merverdiavgift og arbeidsgiverens andel er ikke med.",
        "En trettende månedslønn eller lovpålagte ekstrautbetalinger fordeles over året slik loven i hvert land sier.",
        "I USA regner vi ikke med delstatsskatt eller lokal skatt: bare den føderale skatten og avgiftene.",
        "For å flytte lønnen din til et annet land bruker vi kjøpekraftsparitet (PPP): samme levestandard, ikke dagens valutakurs.",
        "Kjøpekraftspariteten for Argentina oppdateres med prisindeksen til INDEC, fordi Verdensbanken bare publiserer den fram til 2021.",
        "Skattefridagen fordeler belastningen din fra 1. januar. Går 30 % av lønnen din til staten, jobber du 30 % av året for staten.",
      ],
      ppaTitulo: "Kjøpekraftsparitet", bancoMundial: "Verdensbanken",
      ppa: (organismo, indicador, anio) => `${organismo}, indikator ${indicador}, siste tilgjengelige år ${anio}.`,
      consultado: (fecha) => `Hentet ${fecha}.`,
      verFuente: "Se kilden",
      fuentesTitulo: "Kilden for hvert land",
      fuentesBajada: "Hver rad bruker nettolønnskalkulatoren for landet, med offisielle tall.",
      verificado: (fecha) => `Tallene er sjekket ${fecha}`,
      sello: (fecha) => `Offisielle tall, sjekket hos kilden i hvert land. Den eldste kontrollen er fra ${fecha}.`,
    },
    faqTitulo: "Vanlige spørsmål",
    faq: (n) => [
      {
        pregunta: "Hva er skattefridagen?",
        respuesta:
          "Dagen i året da skatten og avgiftene dine er betalt, hvis alt du tjener fra 1. januar, gikk til staten først. Her regner vi med lønnen din, ikke med landsgjennomsnittet.",
      },
      {
        pregunta: "Hvorfor sammenligne med kjøpekraft?",
        respuesta: "Med valutakursen virker en lønn enorm eller bitteliten, avhengig av dagen. Kjøpekraftsparitet sammenligner hva du faktisk får kjøpt for pengene i hvert land.",
      },
      {
        pregunta: "Blir lønnen min lagret?",
        respuesta: "Nei. Beregningen skjer i nettleseren din. Det du deler, inneholder bare datoer, prosenter og land.",
      },
      {
        pregunta: "Hvorfor er den faktiske nettolønnen min annerledes?",
        respuesta:
          "Vi regner med en enslig person uten barn og standardverdier. Fradrag, bonuser eller særordninger endrer tallet. Åpne kalkulatoren for landet ditt for å se akkurat ditt tilfelle.",
      },
      {
        pregunta: "Hvilke land er med?",
        respuesta: `I dag ${n} land, hvert med sin egen nettolønnskalkulator og offisielle tall. Vi legger til flere etter hvert som vi har sjekket reglene deres.`,
      },
    ],
    destacado: {
      ceja: "Global sammenligning",
      titulo: "Til hvilken dag jobber du for staten?",
      texto: "Skriv inn lønnen din og se hva du sitter igjen med netto i andre land.",
      ir: "Regn ut datoen min",
    },
  },
};

// ───────────────────────────── fi ─────────────────────────────

// Sinä implícito, como OP y Nordea: imperativo de 2.ª persona, sufijos posesivos y pasivas. Solo base.
// GRAMATICA.fi: `de` es el genitivo que va delante del sustantivo, `en` el caso de lugar completo.
const gFi = GRAMATICA.fi;
const SEO_FI = "Verovapauden päivä ja nettopalkka maailmalla";
const paivaa = (n: number) => (n === 1 ? "1 päivä" : `${n} päivää`);

const fi: Diccionario<TextosMundo> = {
  base: {
    nombre: "Palkkasi maailmalla",
    seo: {
      titulo: (pais) => [`${SEO_FI} | ${pais}`, SEO_FI, "Palkkasi maailmalla"],
      tituloGlobal: [SEO_FI, "Palkkasi maailmalla"],
      descripcion: (pais, n) => `Katso, mihin päivään asti teet palkallasi töitä valtiolle ${gFi.en(pais)}, ja paljonko käteen jää ${n} maassa. Ilmainen, eikä tiliä tarvita.`,
      descripcionGlobal: (n) => `Katso, mihin päivään asti teet töitä valtiolle ja paljonko palkastasi jää käteen ${n} maassa. Ilmainen, eikä tiliä tarvita.`,
    },
    ceja: "Verovapauden päiväsi",
    h1: "Mihin vuoden päivään asti teet töitä valtiolle?",
    bajada: (n) => `Kirjoita bruttopalkkasi ja näe päivämääräsi. Vertaa sitä sitten ${n} maahan samalla ostovoimalla ja kunkin maan säännöillä.`,
    form: {
      titulo: "Palkkasi",
      sueldo: "Bruttopalkka",
      mes: "Kuukaudessa",
      anio: "Vuodessa",
      periodo: "Palkan jakso",
      pais: "Maa, jossa teet töitä",
      ejemplo: "Esimerkki",
      ejemploAyuda: "Tämä on esimerkkipalkka. Kirjoita oma palkkasi, niin kaikki lasketaan heti uudelleen.",
      propio: "Haettu laskelmastasi.",
      invalido: "Kirjoita nollaa suurempi summa.",
      pagas: "Kuukausipalkkasi palkkalaskelman mukaan: lisäämme siihen lakisääteiset lisäpalkat. Nettopalkka on 12 kuukauden keskiarvo.",
    },
    heroe: {
      hasta: (fecha) => `Teet töitä valtiolle ${fecha} asti`,
      tasa: (pct) => `Palkastasi ${pct} menee tuloveroon ja maksuihin.`,
      dias: (n, total) => `${paivaa(n)} ${total} päivästä`,
      enMano: "Käteen jää",
      porMes: "kuukaudessa",
      anio: (anio, n, total) => `Vuonna ${anio}: valtiolle ${paivaa(n)} ${total} päivästä.`,
      resto: "Seuraavasta päivästä alkaen kaikki ansaitsemasi on omaasi.",
    },
    ranking: {
      titulo: "Sama palkka, maa kerrallaan",
      bajada: "Samalla ostovoimalla tämän verran jää käteen kussakin maassa. Jokainen rivi tulee maan virallisesta laskurista. Sama palkka joka maassa: vain verot ja maksut muuttuvat, eivät maan todelliset palkat.",
      lista: "Maat nettopalkan mukaan järjestettynä",
      buscar: "Hae maata",
      filtrar: "Rajaa alueen mukaan",
      todas: "Kaikki maat",
      regiones: { americas: "Amerikka", europa: "Eurooppa", asia: "Aasia ja Oseania", africa: "Afrikka ja Lähi-itä" },
      tuPais: "Oma maasi",
      mejor: "Kevein verotus",
      enMano: "Netto kuukaudessa",
      enTuMoneda: "Omassa valuutassasi",
      vsTuPais: "Verrattuna omaan maahasi",
      verTodos: (n) => `Näytä kaikki ${n} maata`,
      verMenos: "Näytä vähemmän",
      sinResultados: (q) => `Haulla ”${q}” ei löytynyt maata.`,
      abrir: (pais) => `Avaa ${gFi.de(pais)} laskuri`,
      mas: (pct) => `${pct} enemmän`,
      menos: (pct) => `${pct} vähemmän`,
      igual: "Sama",
      puesto: (p, total) => `Maasi on ${total} maan joukossa sijalla ${p}.`,
    },
    tarjeta: {
      titulo: "Jaettava korttisi",
      bajada: "Siinä näkyvät päivämääräsi ja prosenttisi. Ei koskaan sitä, paljonko ansaitset.",
      hasta: (fecha) => `Teen töitä valtiolle ${fecha} asti`,
      tasa: (pct) => `Palkastani ${pct} menee valtiolle`,
      mejor: (pais, pct) => `Samalla palkalla maksaisin ${gFi.en(pais)} vähemmän veroja: ${pct} enemmän käteen`,
      mejorPropio: (pais) => `Palkallani ei jää missään enempää käteen kuin ${gFi.en(pais)}`,
      yVos: "Entä sinä?",
      cta: "Laske omasi osoitteessa",
      generica: "Mihin päivään asti teet töitä valtiolle?",
      genericaBajada: (n) => `Palkkasi ${n} maassa, kunkin maan virallisella laskurilla`,
      compartir: "Jaa korttini",
      compartirDuelo: "Haasta takaisin",
      descargar: "Lataa kuva",
      copiado: "Linkki kopioitu. Liitä se minne haluat.",
      compartido: "Valmista, jaettu.",
      error: "Jakaminen ei onnistunut. Yritä uudelleen.",
      texto: (fecha) => `Teen töitä valtiolle ${fecha} asti. Entä sinä?`,
      alt: "Korttisi esikatselu",
    },
    duelo: {
      amigo: (fecha) => `Ystäväsi tekee töitä valtiolle ${fecha} asti.`,
      yVos: "Entä sinä?",
      invitacion: "Kirjoita palkkasi ja vertaa.",
      vos: "Sinä",
      elAmigo: "Ystäväsi",
      dia: "Verovapauden päivä",
      tasa: "Verot ja maksut",
      mejorPais: "Kevein verotus",
      antes: (d) => (d === 1 ? "Pääset vapaaksi päivän ystävääsi aiemmin." : `Pääset vapaaksi ${d} päivää ystävääsi aiemmin.`),
      despues: (d) => (d === 1 ? "Ystäväsi pääsee vapaaksi päivän sinua aiemmin." : `Ystäväsi pääsee vapaaksi ${d} päivää sinua aiemmin.`),
      empate: "Pääsette vapaaksi samana päivänä.",
      desde: (pais) => `Tekee töitä ${gFi.en(pais)}`,
    },
    cero: { dia: "nolla päivää", heroeAntes: "Valtiolle teet töitä", tarjetaAntes: "Valtiolle teen töitä", motivo: "Tällä palkalla ei pidätetä tuloveroa eikä maksuja.", texto: "Tänä vuonna en tee päivääkään töitä valtiolle. Entä sinä?", amigo: "Ystäväsi ei tee päivääkään töitä valtiolle." },
    metodo: {
      titulo: "Näin laskemme",
      estimacion: "Tämä on arvio maiden vertailuun, ei palkkalaskelma. Vähennykset, lapset tai bonukset voivat muuttaa lukuasi.",
      supuestos: [
        "Laskelma tehdään yksin asuvalle ilman lapsia, kunkin maan laskurin oletusarvoilla.",
        "Nettopalkka on se, mitä jää jäljelle tuloveron ja henkilön itse maksamien maksujen jälkeen. Arvonlisäveroa ja työnantajan osuutta ei lasketa mukaan.",
        "Kolmastoista kuukausipalkka tai pakollinen lomaraha jaetaan koko vuodelle kunkin maan lain mukaan.",
        "Yhdysvalloissa ei lasketa osavaltion eikä paikallisia veroja: vain liittovaltion vero ja maksut.",
        "Palkkasi siirretään toiseen maahan ostovoimapariteetilla (PPP): sama elintaso, ei päivän valuuttakurssi.",
        "Argentiinan ostovoimapariteetti päivitetään INDECin hintaindeksillä, koska Maailmanpankki julkaisee sen vain vuoteen 2021 asti.",
        "Verovapauden päivä jakaa verotaakkasi 1. tammikuuta alkaen. Jos palkastasi menee 30 % valtiolle, teet 30 % vuodesta töitä valtiolle.",
      ],
      ppaTitulo: "Ostovoimapariteetti", bancoMundial: "Maailmanpankki",
      ppa: (organismo, indicador, anio) => `${organismo}, indikaattori ${indicador}, viimeisin saatavilla oleva vuosi ${anio}.`,
      consultado: (fecha) => `Haettu ${fecha}.`,
      verFuente: "Katso lähde",
      fuentesTitulo: "Kunkin maan lähde",
      fuentesBajada: "Jokainen rivi käyttää maan omaa nettopalkkalaskuria ja sen virallisia tietoja.",
      verificado: (fecha) => `Tiedot tarkistettu ${fecha}`,
      sello: (fecha) => `Viralliset tiedot, tarkistettu kunkin maan lähteestä. Vanhin tarkistus on tehty ${fecha}.`,
    },
    faqTitulo: "Usein kysyttyä",
    faq: (n) => [
      {
        pregunta: "Mikä on verovapauden päivä?",
        respuesta:
          "Se vuoden päivä, jona verosi ja maksusi olisi maksettu, jos kaikki 1. tammikuuta alkaen ansaitsemasi menisi ensin valtiolle. Tässä lasketaan sinun palkallasi, ei maan keskiarvolla.",
      },
      {
        pregunta: "Miksi vertailu tehdään ostovoimalla?",
        respuesta: "Valuuttakurssilla sama palkka näyttää päivästä riippuen valtavalta tai pieneltä. Ostovoimapariteetti vertaa sitä, mitä rahalla oikeasti saa kussakin maassa.",
      },
      {
        pregunta: "Tallennetaanko palkkani?",
        respuesta: "Ei. Laskenta tehdään selaimessasi. Jakamassasi kortissa on vain päivämääriä, prosentteja ja maita.",
      },
      {
        pregunta: "Miksi oikea nettopalkkani on eri?",
        respuesta:
          "Laskemme yksin asuvalle ilman lapsia ja oletusarvoilla. Vähennykset, bonukset tai erityiset järjestelyt muuttavat lukua. Tarkkaa tilannettasi varten avaa oman maasi laskuri.",
      },
      {
        pregunta: "Mitkä maat ovat mukana?",
        respuesta: `Tällä hetkellä ${n} maata, joilla jokaisella on oma nettopalkkalaskuri ja viralliset tiedot. Lisäämme maita sitä mukaa kuin tarkistamme niiden säännöt.`,
      },
    ],
    destacado: {
      ceja: "Maailmanlaajuinen vertailu",
      titulo: "Mihin päivään asti teet töitä valtiolle?",
      texto: "Kirjoita palkkasi ja katso, paljonko käteen jää muissa maissa.",
      ir: "Laske päiväni",
    },
  },
};

// ───────────────────────────── ar ─────────────────────────────

// Árabe estándar moderno, segunda persona del masculino genérico como en el resto del sitio. Los días
// van con pluralAr (يوم واحد، يومان، 3 أيام، 11 يومًا، 100 يوم); detrás de «بـ» el dual va en genitivo.
const gAr = GRAMATICA.ar;
const SEO_AR = "يوم التحرر الضريبي وصافي الراتب حول العالم";
const DIAS_AR = { uno: "يوم واحد", dos: "يومان", pocos: "{n} أيام", muchos: "{n} يومًا", otros: "{n} يوم" };
const POR_DIAS_AR = { uno: "بيوم واحد", dos: "بيومين", pocos: "بـ{n} أيام", muchos: "بـ{n} يومًا", otros: "بـ{n} يوم" };
const PAISES_AR = { uno: "دولة واحدة", dos: "دولتين", pocos: "{n} دول", muchos: "{n} دولة", otros: "{n} دولة" };

const ar: Diccionario<TextosMundo> = {
  base: {
    nombre: "راتبك حول العالم",
    seo: {
      titulo: (pais) => [`${SEO_AR} | ${pais}`, SEO_AR, "راتبك حول العالم"],
      tituloGlobal: [SEO_AR, "راتبك حول العالم"],
      descripcion: (pais, n) => `اعرف حتى أي يوم تعمل لصالح الدولة براتبك ${gAr.en(pais)}، وكم يبقى لك منه في ${pluralAr(n, PAISES_AR)}. مجانًا وبلا تسجيل.`,
      descripcionGlobal: (n) => `اعرف حتى أي يوم تعمل لصالح الدولة، وكم يبقى لك من راتبك في ${pluralAr(n, PAISES_AR)}. مجانًا وبلا تسجيل.`,
    },
    ceja: "يوم تحررك الضريبي",
    h1: "حتى أي يوم من السنة تعمل لصالح الدولة؟",
    bajada: (n) => `أدخل راتبك الإجمالي لتعرف تاريخك. ثم قارنه في ${pluralAr(n, PAISES_AR)}، بالقدرة الشرائية نفسها وبقواعد الضرائب في كل دولة.`,
    form: {
      titulo: "راتبك",
      sueldo: "الراتب الإجمالي",
      mes: "شهري",
      anio: "سنوي",
      periodo: "فترة الراتب",
      pais: "الدولة التي تعمل فيها",
      ejemplo: "مثال",
      ejemploAyuda: "هذا راتب للتجربة. اكتب راتبك وستتحدّث النتائج فورًا.",
      propio: "منقول من حسابك السابق.",
      invalido: "أدخل مبلغًا أكبر من صفر.",
      pagas: "هو الراتب الشهري في قسيمة الراتب، ونضيف إليه الدفعات الإضافية التي يفرضها القانون. صافي الراتب هو المتوسط على 12 شهرًا.",
    },
    heroe: {
      hasta: (fecha) => `تعمل لصالح الدولة حتى ${fecha}`,
      tasa: (pct) => `يذهب ${pct} من راتبك إلى ضريبة الدخل واشتراكات التأمينات.`,
      dias: (n, total) => `${n} من أصل ${pluralAr(total, DIAS_AR)}`,
      enMano: "يبقى لك",
      porMes: "شهريًا",
      anio: (anio, n, total) => `${anio}: ${n} من أصل ${pluralAr(total, DIAS_AR)} لصالح الدولة.`,
      resto: "ومن اليوم التالي، ما تكسبه لك.",
    },
    ranking: {
      titulo: "الراتب نفسه، دولة بدولة",
      bajada: "بالقدرة الشرائية نفسها، هذا ما يبقى لك في كل دولة. كل سطر مأخوذ من الحاسبة الرسمية لتلك الدولة. الراتب نفسه في كل مكان: تتغير الضرائب والاشتراكات فقط، لا ما يكسبه الناس في كل دولة.",
      lista: "الدول مرتبة حسب صافي الراتب",
      buscar: "ابحث عن دولة",
      filtrar: "التصفية حسب المنطقة",
      todas: "الكل",
      regiones: { americas: "الأمريكتان", europa: "أوروبا", asia: "آسيا وأوقيانوسيا", africa: "أفريقيا والشرق الأوسط" },
      tuPais: "دولتك",
      mejor: "أقل ضرائب",
      enMano: "الصافي شهريًا",
      enTuMoneda: "بعملتك",
      vsTuPais: "مقارنة بدولتك",
      verTodos: (n) => `عرض الدول كلها (${n})`,
      verMenos: "عرض أقل",
      sinResultados: (q) => `لا توجد دولة تطابق «${q}».`,
      abrir: (pais) => `فتح حاسبة ${gAr.de(pais)}`,
      mas: (pct) => `أكثر بنسبة ${pct}`,
      menos: (pct) => `أقل بنسبة ${pct}`,
      igual: "متساوٍ",
      puesto: (p, total) => `ترتيب دولتك ${p} من أصل ${total}.`,
    },
    tarjeta: {
      titulo: "بطاقتك للمشاركة",
      bajada: "تعرض تاريخك والنسب فقط، ولا تعرض راتبك أبدًا.",
      hasta: (fecha) => `أعمل لصالح الدولة حتى ${fecha}`,
      tasa: (pct) => `يذهب ${pct} من راتبي إلى الضرائب`,
      mejor: (pais, pct) => `بالراتب نفسه، كنت سأدفع ضرائب أقل ${gAr.en(pais)}: ${pct} أكثر صافيًا`,
      mejorPropio: (pais) => `براتبي نفسه، لا توجد دولة تُبقي لي أكثر من ${gAr.nombre(pais)}`,
      yVos: "وأنت؟",
      cta: "اعرف تاريخك على",
      generica: "حتى أي يوم تعمل لصالح الدولة؟",
      genericaBajada: (n) => `راتبك في ${pluralAr(n, PAISES_AR)}، محسوبًا بالحاسبة الرسمية لكل دولة`,
      compartir: "مشاركة بطاقتي",
      compartirDuelo: "رُدّ التحدي",
      descargar: "تنزيل الصورة",
      copiado: "تم نسخ الرابط. الصقه حيث تشاء.",
      compartido: "تمت المشاركة.",
      error: "تعذّرت المشاركة. حاول مرة أخرى.",
      texto: (fecha) => `أعمل لصالح الدولة حتى ${fecha}. وأنت؟`,
      alt: "معاينة بطاقتك",
    },
    duelo: {
      amigo: (fecha) => `صديقك يعمل لصالح الدولة حتى ${fecha}.`,
      yVos: "وأنت؟",
      invitacion: "أدخل راتبك للمقارنة.",
      vos: "أنت",
      elAmigo: "صديقك",
      dia: "يعمل لصالح الدولة حتى",
      tasa: "الضرائب والاشتراكات",
      mejorPais: "أقل ضرائب في",
      antes: (d) => `تتحرر قبل صديقك ${pluralAr(d, POR_DIAS_AR)}.`,
      despues: (d) => `يتحرر صديقك قبلك ${pluralAr(d, POR_DIAS_AR)}.`,
      empate: "تتحرران في اليوم نفسه.",
      desde: (pais) => `يعمل ${gAr.en(pais)}`,
    },
    cero: {
      dia: "صفر أيام",
      heroeAntes: "تعمل لصالح الدولة",
      tarjetaAntes: "أعمل لصالح الدولة",
      motivo: "بهذا الراتب لا تُخصم ضريبة دخل ولا اشتراكات تأمينات.",
      texto: "لا أعمل يومًا واحدًا لصالح الدولة هذه السنة. وأنت؟",
      amigo: "صديقك لا يعمل يومًا واحدًا لصالح الدولة.",
    },
    metodo: {
      titulo: "طريقة الحساب",
      estimacion: "هذا تقدير للمقارنة بين الدول، وليس قسيمة راتب. الخصومات أو الأبناء أو المكافآت قد تغيّر رقمك.",
      supuestos: [
        "شخص أعزب بلا أبناء، بالقيم الافتراضية لحاسبة كل دولة.",
        "صافي الراتب هو ما يبقى بعد ضريبة الدخل واشتراكات الموظف. ولا يشمل ضريبة المبيعات ولا ما يدفعه صاحب العمل.",
        "الراتب الثالث عشر وغيره من الدفعات الإلزامية يوزَّع على السنة كما ينص قانون كل دولة.",
        "في الولايات المتحدة لا تُضاف ضريبة دخل الولاية أو المدينة: الضريبة الاتحادية والاشتراكات فقط.",
        "لنقل راتبك إلى دولة أخرى نستخدم تعادل القوة الشرائية، أي مستوى المعيشة نفسه، لا سعر الصرف اليوم.",
        "تعادل القوة الشرائية للأرجنتين يُحدَّث بمؤشر أسعار المستهلك الصادر عن INDEC، لأن البنك الدولي لا ينشره إلا حتى 2021.",
        "يوم تحررك يوزّع ضريبتك على السنة بدءًا من 1 يناير. إذا ذهب 30% من راتبك إلى الضرائب، فأنت تعمل لصالح الدولة 30% من السنة.",
      ],
      ppaTitulo: "تعادل القوة الشرائية",
      bancoMundial: "البنك الدولي",
      ppa: (organismo, indicador, anio) => `${organismo}، المؤشر ${indicador}، آخر سنة متاحة ${anio}.`,
      consultado: (fecha) => `اطّلعنا عليه في ${fecha}.`,
      verFuente: "عرض المصدر",
      fuentesTitulo: "مصدر كل دولة",
      fuentesBajada: "كل سطر يستخدم حاسبة صافي الراتب لتلك الدولة وبياناتها الرسمية.",
      verificado: (fecha) => `تمت مراجعة البيانات في ${fecha}`,
      sello: (fecha) => `بيانات رسمية راجعناها لدى مصدر كل دولة. أقدم مراجعة بتاريخ ${fecha}.`,
    },
    faqTitulo: "أسئلة شائعة",
    faq: (n) => [
      {
        pregunta: "ما يوم التحرر الضريبي؟",
        respuesta: "هو اليوم من السنة الذي تنتهي فيه من دفع ضرائبك، لو ذهب كل ما كسبته منذ 1 يناير إلى الدولة أولًا. وهنا يُحسب من راتبك أنت، لا من المتوسط الوطني.",
      },
      {
        pregunta: "لماذا نقارن بالقدرة الشرائية؟",
        respuesta: "سعر الصرف يجعل الراتب يبدو ضخمًا أو ضئيلًا حسب اليوم. أما تعادل القوة الشرائية فيقارن ما يمكن شراؤه فعلًا بهذا المال في كل دولة.",
      },
      {
        pregunta: "هل يُحفظ راتبي؟",
        respuesta: "لا. الحساب يجري في متصفحك، وما تشاركه لا يحمل إلا تواريخ ونسبًا وأسماء دول.",
      },
      {
        pregunta: "لماذا يختلف صافي راتبي الحقيقي؟",
        respuesta: "نفترض شخصًا أعزب بلا أبناء وبالقيم الافتراضية. الخصومات أو المكافآت أو الأنظمة الخاصة تغيّر الرقم. لحالتك بالتحديد، افتح حاسبة دولتك.",
      },
      {
        pregunta: "ما الدول المشمولة؟",
        respuesta: `${pluralAr(n, PAISES_AR)} اليوم، لكل منها حاسبة صافي الراتب الخاصة بها وبياناتها الرسمية. ونضيف المزيد كلما راجعنا قواعدها الضريبية.`,
      },
    ],
    destacado: {
      ceja: "مقارنة عالمية",
      titulo: "حتى أي يوم تعمل لصالح الدولة؟",
      texto: "أدخل راتبك واعرف كم يبقى لك في دول أخرى.",
      ir: "اعرف تاريخي",
    },
  },
};

// ───────────────────────────── id ─────────────────────────────

// Indonesio (ADR 0002, D11): «Anda» con mayúscula, frases cortas, sin plural después de un número.
const gId = GRAMATICA.id;
const SEO_ID = "Hari Bebas Pajak dan gaji bersih di seluruh dunia";

const idn: Diccionario<TextosMundo> = {
  base: {
    nombre: "Gaji Anda di seluruh dunia",
    seo: {
      titulo: (pais) => [`${SEO_ID} | ${pais}`, SEO_ID, "Gaji Anda di seluruh dunia"],
      tituloGlobal: [SEO_ID, "Gaji Anda di seluruh dunia"],
      descripcion: (pais, n) => `Lihat sampai tanggal berapa Anda bekerja untuk pajak dengan gaji ${gId.en(pais)}, dan berapa gaji bersih Anda di ${n} negara. Gratis, tanpa daftar.`,
      descripcionGlobal: (n) => `Lihat sampai tanggal berapa Anda bekerja untuk pajak, dan berapa gaji bersih Anda di ${n} negara. Gratis, tanpa daftar.`,
    },
    ceja: "Hari Bebas Pajak Anda",
    h1: "Sampai tanggal berapa Anda bekerja untuk negara?",
    bajada: (n) => `Masukkan gaji kotor Anda untuk melihat tanggalnya. Lalu bandingkan di ${n} negara, dengan daya beli yang sama dan aturan pajak tiap negara.`,
    form: {
      titulo: "Gaji Anda",
      sueldo: "Gaji kotor",
      mes: "Per bulan",
      anio: "Per tahun",
      periodo: "Periode gaji",
      pais: "Negara tempat Anda bekerja",
      ejemplo: "Contoh",
      ejemploAyuda: "Ini gaji contoh. Ketik gaji Anda dan semua angka langsung diperbarui.",
      propio: "Diambil dari perhitungan Anda sebelumnya.",
      invalido: "Masukkan jumlah di atas nol.",
      pagas: "Gaji bulanan sesuai slip gaji Anda: kami menambahkan gaji tambahan yang diwajibkan undang-undang (gaji ke-13 atau ke-14). Gaji bersih adalah rata-rata 12 bulan.",
    },
    heroe: {
      hasta: (fecha) => `Anda bekerja untuk negara sampai ${fecha}`,
      tasa: (pct) => `${pct} dari gaji Anda dipakai untuk pajak penghasilan dan iuran wajib.`,
      dias: (n, total) => `${n} dari ${total} hari`,
      enMano: "Gaji bersih Anda",
      porMes: "per bulan",
      anio: (anio, n, total) => `${anio}: ${n} dari ${total} hari untuk negara.`,
      resto: "Mulai hari berikutnya, penghasilan Anda sepenuhnya milik Anda.",
    },
    ranking: {
      titulo: "Gaji yang sama, negara demi negara",
      bajada: "Dengan daya beli yang sama, inilah gaji bersih Anda di tiap negara. Setiap baris berasal dari kalkulator resmi negara tersebut. Gajinya sama di semua negara: yang berubah hanya pajak dan iuran, bukan berapa yang didapat orang di tiap negara.",
      lista: "Negara diurutkan menurut gaji bersih",
      buscar: "Cari negara",
      filtrar: "Saring menurut wilayah",
      todas: "Semua",
      regiones: { americas: "Amerika", europa: "Eropa", asia: "Asia dan Oseania", africa: "Afrika dan Timur Tengah" },
      tuPais: "Negara Anda",
      mejor: "Pajak terendah",
      enMano: "Gaji bersih per bulan",
      enTuMoneda: "Dalam mata uang Anda",
      vsTuPais: "Dibanding negara Anda",
      verTodos: (n) => `Lihat semua ${n} negara`,
      verMenos: "Tampilkan lebih sedikit",
      sinResultados: (q) => `Tidak ada negara yang cocok dengan “${q}”.`,
      abrir: (pais) => `Buka kalkulator untuk ${gId.nombre(pais)}`,
      mas: (pct) => `${pct} lebih banyak`,
      menos: (pct) => `${pct} lebih sedikit`,
      igual: "Sama",
      puesto: (p, total) => `Negara Anda di peringkat ${p} dari ${total}.`,
    },
    tarjeta: {
      titulo: "Kartu Anda untuk dibagikan",
      bajada: "Kartu ini menampilkan tanggal dan persentase Anda. Besar gaji Anda tidak pernah ditampilkan.",
      hasta: (fecha) => `Saya bekerja untuk negara sampai ${fecha}`,
      tasa: (pct) => `${pct} dari gaji saya untuk pajak`,
      mejor: (pais, pct) => `Dengan gaji yang sama, ${gId.en(pais)} pajak saya lebih rendah: ${pct} lebih banyak dibawa pulang`,
      mejorPropio: (pais) => `Dengan gaji yang sama, tidak ada negara yang pajaknya lebih rendah daripada ${gId.nombre(pais)}`,
      yVos: "Bagaimana dengan Anda?",
      cta: "Cek tanggal Anda di",
      generica: "Sampai tanggal berapa Anda bekerja untuk negara?",
      genericaBajada: (n) => `Gaji Anda di ${n} negara, dihitung dengan kalkulator resmi tiap negara`,
      compartir: "Bagikan kartu saya",
      compartirDuelo: "Balas tantangannya",
      descargar: "Unduh gambar",
      copiado: "Tautan disalin. Tempel di mana saja.",
      compartido: "Selesai, sudah dibagikan.",
      error: "Gagal membagikan. Coba lagi.",
      texto: (fecha) => `Saya bekerja untuk negara sampai ${fecha}. Bagaimana dengan Anda?`,
      alt: "Pratinjau kartu Anda",
    },
    duelo: {
      amigo: (fecha) => `Teman Anda bekerja untuk negara sampai ${fecha}.`,
      yVos: "Bagaimana dengan Anda?",
      invitacion: "Masukkan gaji Anda untuk membandingkan.",
      vos: "Anda",
      elAmigo: "Teman Anda",
      dia: "Bekerja untuk negara sampai",
      tasa: "Pajak dan iuran",
      mejorPais: "Pajak terendah di",
      antes: (d) => `Anda bebas ${d} hari lebih awal daripada teman Anda.`,
      despues: (d) => `Teman Anda bebas ${d} hari lebih awal daripada Anda.`,
      empate: "Anda dan teman Anda bebas pada hari yang sama.",
      desde: (pais) => `Bekerja ${gId.en(pais)}`,
    },
    cero: {
      dia: "nol hari",
      heroeAntes: "Anda bekerja untuk negara",
      tarjetaAntes: "Saya bekerja untuk negara",
      motivo: "Dengan gaji ini, tidak ada potongan pajak penghasilan maupun iuran wajib.",
      texto: "Tahun ini saya tidak bekerja sehari pun untuk negara. Bagaimana dengan Anda?",
      amigo: "Teman Anda tidak bekerja sehari pun untuk negara.",
    },
    metodo: {
      titulo: "Cara kami menghitungnya",
      estimacion: "Ini perkiraan untuk membandingkan negara, bukan slip gaji. Pengurang pajak, tanggungan anak, atau bonus bisa mengubah angka Anda.",
      supuestos: [
        "Satu orang lajang tanpa anak, dengan nilai bawaan kalkulator tiap negara.",
        "Gaji bersih adalah sisa gaji setelah pajak penghasilan dan iuran yang ditanggung pekerja. Pajak konsumsi dan iuran yang dibayar pemberi kerja tidak dihitung.",
        "Gaji ke-13 atau tambahan wajib lainnya dibagi rata sepanjang tahun sesuai undang-undang tiap negara.",
        "Di Amerika Serikat tidak ditambahkan pajak penghasilan negara bagian atau lokal: hanya pajak federal dan iuran gaji.",
        "Untuk membawa gaji Anda ke negara lain, kami memakai paritas daya beli (PPP): standar hidup yang sama, bukan kurs hari ini.",
        "PPP Argentina diperbarui dengan indeks harga konsumen dari INDEC, karena Bank Dunia hanya menerbitkannya sampai 2021.",
        "Hari bebas Anda membagi pajak Anda sepanjang tahun mulai 1 Januari. Jika 30% gaji Anda untuk pajak, Anda bekerja untuk negara selama 30% dari tahun itu.",
      ],
      ppaTitulo: "Paritas daya beli",
      bancoMundial: "Bank Dunia",
      ppa: (organismo, indicador, anio) => `${organismo}, indikator ${indicador}, tahun terakhir yang tersedia ${anio}.`,
      consultado: (fecha) => `Dicek pada ${fecha}.`,
      verFuente: "Lihat sumbernya",
      fuentesTitulo: "Sumber tiap negara",
      fuentesBajada: "Setiap baris memakai kalkulator gaji bersih negara tersebut dan data resminya.",
      verificado: (fecha) => `Data diverifikasi pada ${fecha}`,
      sello: (fecha) => `Data resmi dicek di sumber tiap negara. Pengecekan paling lama dilakukan pada ${fecha}.`,
    },
    faqTitulo: "Pertanyaan yang sering diajukan",
    faq: (n) => [
      {
        pregunta: "Apa itu Hari Bebas Pajak?",
        respuesta:
          "Hari Bebas Pajak adalah hari ketika Anda selesai membayar pajak dalam setahun, seandainya semua penghasilan sejak 1 Januari lebih dulu disetor ke negara. Di sini hari itu dihitung dari gaji Anda, bukan dari rata-rata nasional.",
      },
      {
        pregunta: "Mengapa dibandingkan dengan daya beli?",
        respuesta: "Kurs bisa membuat gaji tampak besar atau kecil tergantung harinya. PPP membandingkan apa yang benar-benar bisa dibeli dengan uang itu di tiap negara.",
      },
      {
        pregunta: "Apakah gaji saya disimpan?",
        respuesta: "Tidak. Perhitungannya berjalan di browser Anda. Yang Anda bagikan hanya berisi tanggal, persentase, dan negara.",
      },
      {
        pregunta: "Mengapa gaji bersih saya yang sebenarnya berbeda?",
        respuesta:
          "Kami menganggap Anda lajang tanpa anak dengan nilai bawaan. Pengurang pajak, bonus, atau skema khusus bisa mengubah angkanya. Untuk kasus Anda yang pasti, buka kalkulator negara Anda.",
      },
      {
        pregunta: "Negara mana saja yang tersedia?",
        respuesta: `Saat ini ada ${n} negara, masing-masing dengan kalkulator gaji bersih dan data resminya sendiri. Kami menambah negara baru setelah aturan pajaknya kami verifikasi.`,
      },
    ],
    destacado: {
      ceja: "Perbandingan dunia",
      titulo: "Sampai tanggal berapa Anda bekerja untuk negara?",
      texto: "Masukkan gaji Anda dan lihat berapa yang Anda bawa pulang di negara lain.",
      ir: "Cek tanggal saya",
    },
  },
};

// ───────────────────────────── tr ─────────────────────────────

// Turco (ADR 0002, D12): «siz» con las formas corteses; la tarjeta y el texto para compartir, en
// primera persona. La fecha va en el medio de la oración y el sufijo nunca se pega a una cifra
// («24 Ekim 2026 tarihine kadar»), así la armonía vocálica no depende del número.
const gTr = GRAMATICA.tr;
const SEO_TR = "Vergi Özgürlük Günü ve ülkelere göre net maaş";

const tr: Diccionario<TextosMundo> = {
  base: {
    nombre: "Maaşınız dünyada ne eder",
    seo: {
      titulo: (pais) => [`${SEO_TR} | ${pais}`, SEO_TR, "Ülkelere göre net maaş"],
      tituloGlobal: [SEO_TR, "Ülkelere göre net maaş"],
      descripcion: (pais, n) => `${gTr.en(pais)} bir maaşla yılın hangi gününe kadar devlet için çalıştığınızı ve ${n} ülkede elinize ne geçeceğini görün. Ücretsiz, üyelik gerekmez.`,
      descripcionGlobal: (n) => `Yılın hangi gününe kadar devlet için çalıştığınızı ve ${n} ülkede elinize ne geçeceğini görün. Ücretsiz, üyelik gerekmez.`,
    },
    ceja: "Vergi Özgürlük Gününüz",
    h1: "Yılın hangi gününe kadar devlet için çalışıyorsunuz?",
    bajada: (n) => `Tarihinizi görmek için brüt maaşınızı girin. Sonra aynı alım gücüyle ve her ülkenin vergi kurallarıyla ${n} ülkede karşılaştırın.`,
    form: {
      titulo: "Maaşınız",
      sueldo: "Brüt maaş",
      mes: "Aylık",
      anio: "Yıllık",
      periodo: "Maaş dönemi",
      pais: "Çalıştığınız ülke",
      ejemplo: "Örnek",
      ejemploAyuda: "Bu bir örnek maaş. Kendi maaşınızı yazın, tüm rakamlar hemen güncellenir.",
      propio: "Önceki hesaplamanızdan alındı.",
      invalido: "Sıfırdan büyük bir tutar girin.",
      pagas: "Bordronuzdaki aylık maaş: yasanın zorunlu kıldığı ek ödemeleri (13. ya da 14. maaş) biz ekleriz. Net maaş, 12 ayın ortalamasıdır.",
    },
    heroe: {
      hasta: (fecha) => `Devlet için ${fecha} tarihine kadar çalışıyorsunuz`,
      tasa: (pct) => `Maaşınızın ${pct} kadarı gelir vergisine ve zorunlu primlere gidiyor.`,
      dias: (n, total) => `${total} günün ${n} günü`,
      enMano: "Elinize geçen",
      porMes: "aylık",
      anio: (anio, n, total) => `${anio}: ${total} günün ${n} günü devlet için.`,
      resto: "Ertesi günden itibaren kazandığınız her şey sizin.",
    },
    ranking: {
      titulo: "Aynı maaş, ülke ülke",
      bajada: "Aynı alım gücüyle her ülkede elinize geçecek net maaş bu. Her satır, o ülkenin resmî hesaplama aracından gelir. Her ülkede aynı maaş kullanılır: yalnızca vergi ve kesintiler değişir, o ülkede kazanılan maaş değil.",
      lista: "Net maaşa göre sıralanan ülkeler",
      buscar: "Ülke arayın",
      filtrar: "Bölgeye göre süzün",
      todas: "Tümü",
      regiones: { americas: "Amerika", europa: "Avrupa", asia: "Asya ve Okyanusya", africa: "Afrika ve Orta Doğu" },
      tuPais: "Ülkeniz",
      mejor: "En düşük vergi",
      enMano: "Aylık net maaş",
      enTuMoneda: "Kendi para biriminizle",
      vsTuPais: "Ülkenize göre",
      verTodos: (n) => `${n} ülkenin tümünü görün`,
      verMenos: "Daha az göster",
      sinResultados: (q) => `“${q}” ile eşleşen ülke yok.`,
      abrir: (pais) => `${gTr.para(pais)} hesaplama aracını açın`,
      mas: (pct) => `${pct} daha fazla`,
      menos: (pct) => `${pct} daha az`,
      igual: "Aynı",
      puesto: (p, total) => `Ülkeniz ${total} ülke arasında ${p}. sırada.`,
    },
    tarjeta: {
      titulo: "Paylaşmak için kartınız",
      bajada: "Kartta tarihiniz ve yüzdeleriniz görünür. Ne kazandığınız hiçbir zaman görünmez.",
      hasta: (fecha) => `Devlet için ${fecha} tarihine kadar çalışıyorum`,
      tasa: (pct) => `Maaşımın ${pct} kadarı vergiye gidiyor`,
      mejor: (pais, pct) => `Aynı maaşla ${gTr.en(pais)} daha az vergi öderdim: elime ${pct} daha fazla geçerdi`,
      mejorPropio: (pais) => `Aynı maaşla en az vergiyi ödediğim ülke: ${gTr.nombre(pais)}`,
      yVos: "Peki ya siz?",
      cta: "Kendi tarihinizi öğrenin:",
      generica: "Yılın hangi gününe kadar devlet için çalışıyorsunuz?",
      genericaBajada: (n) => `Maaşınız ${n} ülkede, her ülkenin resmî hesaplama aracıyla`,
      compartir: "Kartımı paylaş",
      compartirDuelo: "Meydan okumaya karşılık ver",
      descargar: "Görseli indir",
      copiado: "Bağlantı kopyalandı. İstediğiniz yere yapıştırın.",
      compartido: "Tamam, paylaşıldı.",
      error: "Paylaşılamadı. Tekrar deneyin.",
      texto: (fecha) => `Devlet için ${fecha} tarihine kadar çalışıyorum. Peki ya siz?`,
      alt: "Kartınızın önizlemesi",
    },
    duelo: {
      amigo: (fecha) => `Arkadaşınız devlet için ${fecha} tarihine kadar çalışıyor.`,
      yVos: "Peki ya siz?",
      invitacion: "Karşılaştırmak için maaşınızı girin.",
      vos: "Siz",
      elAmigo: "Arkadaşınız",
      dia: "Devlet için çalıştığı son gün",
      tasa: "Vergi ve primler",
      mejorPais: "En düşük vergi",
      antes: (d) => `Arkadaşınızdan ${d} gün önce özgürsünüz.`,
      despues: (d) => `Arkadaşınız sizden ${d} gün önce özgür.`,
      empate: "İkiniz de aynı gün özgürsünüz.",
      desde: (pais) => `${gTr.en(pais)} çalışıyor`,
    },
    cero: {
      dia: "sıfır gün",
      heroeAntes: "Devlet için çalıştığınız süre",
      tarjetaAntes: "Devlet için çalıştığım süre",
      motivo: "Bu maaşta gelir vergisi ya da zorunlu prim kesintisi yok.",
      texto: "Bu yıl devlet için tek bir gün bile çalışmıyorum. Peki ya siz?",
      amigo: "Arkadaşınız devlet için tek bir gün bile çalışmıyor.",
    },
    metodo: {
      titulo: "Nasıl hesaplıyoruz",
      estimacion: "Bu, ülkeleri karşılaştırmak için bir tahmindir, bordro değildir. İndirimler, çocuklar ya da ikramiyeler rakamınızı değiştirebilir.",
      supuestos: [
        "Çocuksuz, bekâr bir kişi; her ülkenin hesaplama aracındaki varsayılan değerlerle.",
        "Net maaş, gelir vergisi ve çalışanın kendi ödediği primler düştükten sonra kalan tutardır. Tüketim vergileri ve işverenin ödediği primler hesaba katılmaz.",
        "13. maaş ya da zorunlu diğer ek ödemeler, her ülkenin yasasına göre yıla yayılır.",
        "Amerika Birleşik Devletleri'nde eyalet ya da yerel gelir vergisi eklenmez: yalnızca federal vergi ve bordro primleri.",
        "Maaşınızı başka bir ülkeye taşımak için satın alma gücü paritesini (SGP) kullanırız: bugünkü kur değil, aynı yaşam standardı.",
        "Arjantin'in SGP değeri, Dünya Bankası yalnızca 2021'e kadar yayımladığı için INDEC'in tüketici fiyat endeksiyle güncellenir.",
        "Özgürlük gününüz, vergilerinizi 1 Ocak'tan başlayarak yıla dağıtır. Maaşınızın %30'u vergiye gidiyorsa yılın %30'u boyunca devlet için çalışırsınız.",
      ],
      ppaTitulo: "Satın alma gücü paritesi",
      bancoMundial: "Dünya Bankası",
      ppa: (organismo, indicador, anio) => `${organismo}, ${indicador} göstergesi, mevcut son yıl: ${anio}.`,
      consultado: (fecha) => `Kontrol tarihi: ${fecha}.`,
      verFuente: "Kaynağı görün",
      fuentesTitulo: "Her ülkenin kaynağı",
      fuentesBajada: "Her satır, o ülkenin net maaş hesaplama aracını ve resmî verilerini kullanır.",
      verificado: (fecha) => `Verilerin doğrulandığı tarih: ${fecha}`,
      sello: (fecha) => `Resmî veriler her ülkenin kaynağında kontrol edildi. En eski kontrol tarihi: ${fecha}.`,
    },
    faqTitulo: "Sık sorulan sorular",
    faq: (n) => [
      {
        pregunta: "Vergi Özgürlük Günü nedir?",
        respuesta:
          "1 Ocak'tan itibaren kazandığınız her şey önce devlete gitseydi, yılın vergilerinizi ödemeyi bitirdiğiniz günüdür. Burada bu gün ülke ortalamasından değil, sizin maaşınızdan hesaplanır.",
      },
      {
        pregunta: "Neden alım gücüyle karşılaştırılıyor?",
        respuesta: "Döviz kuru, güne göre bir maaşı çok büyük ya da çok küçük gösterebilir. SGP, o paranın her ülkede gerçekten neler satın alabildiğini karşılaştırır.",
      },
      {
        pregunta: "Maaşım kaydediliyor mu?",
        respuesta: "Hayır. Hesaplama tarayıcınızda yapılır. Paylaştığınız şey yalnızca tarihleri, yüzdeleri ve ülkeleri içerir.",
      },
      {
        pregunta: "Gerçek net maaşım neden farklı?",
        respuesta:
          "Çocuksuz, bekâr bir kişiyi ve varsayılan değerleri esas alıyoruz. İndirimler, ikramiyeler ya da özel rejimler rakamı değiştirir. Kendi durumunuzun kesin hesabı için ülkenizin hesaplama aracını açın.",
      },
      {
        pregunta: "Hangi ülkeler var?",
        respuesta: `Bugün ${n} ülke var; her birinin kendi net maaş hesaplama aracı ve resmî verileri bulunuyor. Vergi kurallarını doğruladıkça yeni ülkeler ekliyoruz.`,
      },
    ],
    destacado: {
      ceja: "Dünya karşılaştırması",
      titulo: "Yılın hangi gününe kadar devlet için çalışıyorsunuz?",
      texto: "Maaşınızı girin, başka ülkelerde elinize ne geçeceğini görün.",
      ir: "Tarihimi öğren",
    },
  },
};

// ───────────────────────────── bn ─────────────────────────────

// Bengalí (ADR 0002, D14): «আপনি» con las formas corteses, dari «।» y dígitos bengalíes (cifrasBn para
// lo que llega como número). El bengalí no flexiona detrás de un número.
const gBn = GRAMATICA.bn;
const cBn = cifrasBn;
const SEO_BN = "কর মুক্তি দিবস ও বিশ্বজুড়ে হাতে পাওয়া বেতন";

const bn: Diccionario<TextosMundo> = {
  base: {
    nombre: "বিশ্বজুড়ে আপনার বেতন",
    seo: {
      titulo: (pais) => [`${SEO_BN} | ${pais}`, SEO_BN, "বিশ্বজুড়ে আপনার বেতন"],
      tituloGlobal: [SEO_BN, "বিশ্বজুড়ে আপনার বেতন"],
      descripcion: (pais, n) => `${gBn.en(pais)} আপনার বেতনে কোন তারিখ পর্যন্ত কর দিতে কাজ করেন, আর ${cBn(n)}টি দেশে হাতে কত থাকে দেখুন। বিনা মূল্যে, নিবন্ধন ছাড়া।`,
      descripcionGlobal: (n) => `কোন তারিখ পর্যন্ত কর দিতে কাজ করেন, আর ${cBn(n)}টি দেশে আপনার হাতে কত বেতন থাকে দেখুন। বিনা মূল্যে, নিবন্ধন ছাড়া।`,
    },
    ceja: "আপনার কর মুক্তি দিবস",
    h1: "বছরের কোন তারিখ পর্যন্ত আপনি রাষ্ট্রের জন্য কাজ করেন?",
    bajada: (n) => `মোট বেতন লিখুন, তারিখটি দেখতে পাবেন। তারপর ${cBn(n)}টি দেশের সঙ্গে মিলিয়ে দেখুন, একই ক্রয়ক্ষমতায় আর প্রতিটি দেশের নিজস্ব করের নিয়মে।`,
    form: {
      titulo: "আপনার বেতন",
      sueldo: "মোট বেতন",
      mes: "মাসিক",
      anio: "বার্ষিক",
      periodo: "বেতনের সময়কাল",
      pais: "যে দেশে কাজ করেন",
      ejemplo: "উদাহরণ",
      ejemploAyuda: "এটি একটি উদাহরণের বেতন। আপনার বেতন লিখলেই সব সংখ্যা সঙ্গে সঙ্গে বদলে যাবে।",
      propio: "আপনার আগের হিসাব থেকে নেওয়া হয়েছে।",
      invalido: "শূন্যের বেশি একটি অঙ্ক লিখুন।",
      pagas: "বেতন স্লিপের মাসিক বেতন লিখুন: আইনে বাধ্যতামূলক বাড়তি বেতন (১৩তম বা ১৪তম মাসের বেতন) আমরা যোগ করে নিই। হাতে পাওয়া বেতন ১২ মাসের গড়।",
    },
    heroe: {
      hasta: (fecha) => `${cBn(fecha)} পর্যন্ত আপনি রাষ্ট্রের জন্য কাজ করেন`,
      tasa: (pct) => `আপনার বেতনের ${cBn(pct)} যায় আয়কর আর বাধ্যতামূলক চাঁদায়।`,
      dias: (n, total) => `${cBn(total)} দিনের মধ্যে ${cBn(n)} দিন`,
      enMano: "আপনার হাতে পাওয়া বেতন",
      porMes: "প্রতি মাসে",
      anio: (anio, n, total) => `${cBn(anio)}: ${cBn(total)} দিনের মধ্যে ${cBn(n)} দিন রাষ্ট্রের জন্য।`,
      resto: "পরের দিন থেকে যা আয় করেন, পুরোটাই আপনার।",
    },
    ranking: {
      titulo: "একই বেতন, দেশে দেশে",
      bajada: "একই ক্রয়ক্ষমতায় প্রতিটি দেশে আপনার হাতে কত বেতন থাকে। প্রতিটি সারি সেই দেশের সরকারি তথ্যের ক্যালকুলেটর থেকে নেওয়া। সব দেশে একই বেতন ধরা হয়েছে: শুধু কর আর চাঁদা বদলায়, সেই দেশে মানুষ কত আয় করে তা নয়।",
      lista: "হাতে পাওয়া বেতন অনুযায়ী সাজানো দেশ",
      buscar: "দেশ খুঁজুন",
      filtrar: "অঞ্চল অনুযায়ী বাছাই",
      todas: "সব",
      regiones: { americas: "আমেরিকা", europa: "ইউরোপ", asia: "এশিয়া ও ওশেনিয়া", africa: "আফ্রিকা ও মধ্যপ্রাচ্য" },
      tuPais: "আপনার দেশ",
      mejor: "সবচেয়ে কম কর",
      enMano: "মাসে হাতে পাওয়া বেতন",
      enTuMoneda: "আপনার মুদ্রায়",
      vsTuPais: "আপনার দেশের তুলনায়",
      verTodos: (n) => `${cBn(n)}টি দেশের সবগুলো দেখুন`,
      verMenos: "কম দেখান",
      sinResultados: (q) => `“${q}” নামে কোনো দেশ পাওয়া যায়নি।`,
      abrir: (pais) => `${gBn.de(pais)} ক্যালকুলেটর খুলুন`,
      mas: (pct) => `${cBn(pct)} বেশি`,
      menos: (pct) => `${cBn(pct)} কম`,
      igual: "সমান",
      puesto: (p, total) => `${cBn(total)}টি দেশের মধ্যে আপনার দেশ ${cBn(p)} নম্বরে।`,
    },
    tarjeta: {
      titulo: "শেয়ার করার কার্ড",
      bajada: "কার্ডে শুধু আপনার তারিখ আর শতাংশ দেখা যায়। বেতনের অঙ্ক কখনো দেখানো হয় না।",
      hasta: (fecha) => `আমি ${cBn(fecha)} পর্যন্ত রাষ্ট্রের জন্য কাজ করি`,
      tasa: (pct) => `আমার বেতনের ${cBn(pct)} যায় করে`,
      mejor: (pais, pct) => `একই বেতনে ${gBn.en(pais)} কর কম দিতে হতো: হাতে ${cBn(pct)} বেশি থাকত`,
      mejorPropio: (pais) => `একই বেতনে ${gBn.de(pais)} চেয়ে কম কর কোনো দেশে নেই`,
      yVos: "আপনার তারিখ কোনটি?",
      cta: "নিজের তারিখ দেখুন এখানে",
      generica: "বছরের কোন তারিখ পর্যন্ত আপনি রাষ্ট্রের জন্য কাজ করেন?",
      genericaBajada: (n) => `${cBn(n)}টি দেশে আপনার বেতন, প্রতিটি দেশের সরকারি তথ্যের ক্যালকুলেটরে হিসাব করা`,
      compartir: "আমার কার্ড শেয়ার করুন",
      compartirDuelo: "পাল্টা পাঠান",
      descargar: "ছবি ডাউনলোড করুন",
      copiado: "লিংক কপি হয়েছে। যেখানে চান পেস্ট করুন।",
      compartido: "শেয়ার হয়েছে।",
      error: "শেয়ার করা যায়নি। আবার চেষ্টা করুন।",
      texto: (fecha) => `আমি ${cBn(fecha)} পর্যন্ত রাষ্ট্রের জন্য কাজ করি। আপনি কত তারিখ পর্যন্ত?`,
      alt: "আপনার কার্ডের প্রিভিউ",
    },
    duelo: {
      amigo: (fecha) => `আপনার বন্ধু ${cBn(fecha)} পর্যন্ত রাষ্ট্রের জন্য কাজ করেন।`,
      yVos: "আর আপনি?",
      invitacion: "তুলনা করতে আপনার বেতন লিখুন।",
      vos: "আপনি",
      elAmigo: "আপনার বন্ধু",
      dia: "রাষ্ট্রের জন্য কাজ যে তারিখ পর্যন্ত",
      tasa: "কর ও চাঁদা",
      mejorPais: "সবচেয়ে কম করের দেশ",
      antes: (d) => `আপনি বন্ধুর চেয়ে ${cBn(d)} দিন আগে মুক্ত হন।`,
      despues: (d) => `আপনার বন্ধু আপনার চেয়ে ${cBn(d)} দিন আগে মুক্ত হন।`,
      empate: "আপনি আর আপনার বন্ধু একই দিনে মুক্ত হন।",
      desde: (pais) => `${gBn.en(pais)} কাজ করেন`,
    },
    cero: {
      dia: "শূন্য দিন",
      heroeAntes: "রাষ্ট্রের জন্য আপনার কাজের দিন",
      tarjetaAntes: "রাষ্ট্রের জন্য আমার কাজের দিন",
      motivo: "এই বেতনে আয়কর বা বাধ্যতামূলক চাঁদা কোনোটিই কাটা হয় না।",
      texto: "এ বছর আমি রাষ্ট্রের জন্য এক দিনও কাজ করি না। আপনি কত তারিখ পর্যন্ত?",
      amigo: "আপনার বন্ধু রাষ্ট্রের জন্য এক দিনও কাজ করেন না।",
    },
    metodo: {
      titulo: "আমরা যেভাবে হিসাব করি",
      estimacion: "এটি দেশে দেশে তুলনার জন্য একটি আনুমানিক হিসাব, বেতন স্লিপ নয়। করছাড়, সন্তান বা বোনাস আপনার সংখ্যা বদলে দিতে পারে।",
      supuestos: [
        "একজন অবিবাহিত মানুষ, সন্তান নেই, প্রতিটি দেশের ক্যালকুলেটরের প্রাথমিক মান ধরে।",
        "হাতে পাওয়া বেতন মানে আয়কর আর কর্মীর নিজের চাঁদা কাটার পর যা থাকে। ভোগ্যপণ্যের কর আর নিয়োগকর্তার দেওয়া চাঁদা ধরা হয় না।",
        "১৩তম মাসের বেতন বা অন্য বাধ্যতামূলক বাড়তি বেতন প্রতিটি দেশের আইন অনুযায়ী সারা বছরে ভাগ করে ধরা হয়।",
        "যুক্তরাষ্ট্রে অঙ্গরাজ্য বা স্থানীয় আয়কর যোগ করা হয় না: শুধু ফেডারেল কর আর বেতনের চাঁদা।",
        "আপনার বেতন অন্য দেশে নিতে আমরা ক্রয়ক্ষমতা সমতা (PPP) ব্যবহার করি: একই জীবনযাত্রার মান, আজকের বিনিময় হার নয়।",
        "আর্জেন্টিনার PPP হালনাগাদ করা হয় INDEC-এর ভোক্তা মূল্যসূচক দিয়ে, কারণ বিশ্বব্যাংক তা প্রকাশ করেছে ২০২১ সাল পর্যন্ত।",
        "আপনার মুক্তি দিবস বের করা হয় ১ জানুয়ারি থেকে করের ভার সারা বছরে ভাগ করে। বেতনের ৩০% কর হলে বছরের ৩০% সময় আপনি রাষ্ট্রের জন্য কাজ করেন।",
      ],
      ppaTitulo: "ক্রয়ক্ষমতা সমতা",
      bancoMundial: "বিশ্বব্যাংক",
      ppa: (organismo, indicador, anio) => `${organismo}, সূচক ${indicador}, সর্বশেষ প্রাপ্ত বছর ${cBn(anio)}।`,
      consultado: (fecha) => `দেখা হয়েছে ${cBn(fecha)} তারিখে।`,
      verFuente: "সূত্র দেখুন",
      fuentesTitulo: "প্রতিটি দেশের সূত্র",
      fuentesBajada: "প্রতিটি সারি সেই দেশের হাতে পাওয়া বেতনের ক্যালকুলেটর আর তার সরকারি তথ্য ব্যবহার করে।",
      verificado: (fecha) => `তথ্য যাচাই ${cBn(fecha)} তারিখে`,
      sello: (fecha) => `প্রতিটি দেশের সরকারি তথ্য তার সূত্রে মিলিয়ে দেখা। সবচেয়ে পুরোনো যাচাই ${cBn(fecha)} তারিখের।`,
    },
    faqTitulo: "সাধারণ প্রশ্ন",
    faq: (n) => [
      {
        pregunta: "কর মুক্তি দিবস কী?",
        respuesta:
          "১ জানুয়ারি থেকে আয় করা সব টাকা যদি আগে রাষ্ট্রকে দিতে হতো, তাহলে যেদিন আপনার বছরের কর দেওয়া শেষ হতো, সেটিই কর মুক্তি দিবস। এখানে দিনটি হিসাব করা হয় আপনার বেতন থেকে, দেশের গড় থেকে নয়।",
      },
      {
        pregunta: "ক্রয়ক্ষমতা দিয়ে তুলনা কেন?",
        respuesta: "বিনিময় হারে দিনভেদে বেতন বড় বা ছোট দেখায়। PPP দেখায় সেই টাকায় প্রতিটি দেশে আসলে কী কেনা যায়।",
      },
      {
        pregunta: "আমার বেতন কি কোথাও সংরক্ষণ হয়?",
        respuesta: "না। হিসাব হয় আপনার ব্রাউজারে। আপনি যা শেয়ার করেন তাতে থাকে শুধু তারিখ, শতাংশ আর দেশ।",
      },
      {
        pregunta: "আমার আসল হাতে পাওয়া বেতন আলাদা কেন?",
        respuesta: "আমরা ধরে নিই আপনি অবিবাহিত, সন্তান নেই, আর সব প্রাথমিক মান। করছাড়, বোনাস বা বিশেষ ব্যবস্থায় সংখ্যা বদলায়। আপনার নিজের সঠিক হিসাবের জন্য আপনার দেশের ক্যালকুলেটর খুলুন।",
      },
      {
        pregunta: "কোন কোন দেশ আছে?",
        respuesta: `এখন আছে ${cBn(n)}টি দেশ, প্রতিটির নিজস্ব হাতে পাওয়া বেতনের ক্যালকুলেটর আর সরকারি তথ্যসহ। কোনো দেশের করের নিয়ম যাচাই করার পরই আমরা সেটি যোগ করি।`,
      },
    ],
    destacado: {
      ceja: "বিশ্বজুড়ে তুলনা",
      titulo: "বছরের কোন তারিখ পর্যন্ত আপনি রাষ্ট্রের জন্য কাজ করেন?",
      texto: "আপনার বেতন লিখুন আর দেখুন অন্য দেশে হাতে কত থাকে।",
      ir: "আমার তারিখ দেখুন",
    },
  },
};

// ───────────────────────────── th ─────────────────────────────

// Tailandés (ADR 0002, D13): sin pronombre, sin ครับ/ค่ะ, sin punto final y años en พ.ศ.
const gTh = GRAMATICA.th;
const SEO_TH = "วันอิสรภาพทางภาษีและเงินเดือนสุทธิทั่วโลก";
const beTh = (anio: number | string) => (Number.isFinite(Number(anio)) ? String(Number(anio) + 543) : String(anio));

const th: Diccionario<TextosMundo> = {
  base: {
    nombre: "เงินเดือนทั่วโลก",
    seo: {
      titulo: (pais) => [`${SEO_TH} | ${pais}`, SEO_TH, "เงินเดือนทั่วโลก"],
      tituloGlobal: [SEO_TH, "เงินเดือนทั่วโลก"],
      descripcion: (pais, n) => `ดูว่าเงินเดือน${gTh.en(pais)}ต้องทำงานให้รัฐถึงวันที่เท่าไร และเงินเดือนเท่ากันจะเหลือรับจริงเท่าไรใน ${n} ประเทศ ใช้ฟรี ไม่ต้องสมัคร`,
      descripcionGlobal: (n) => `ดูว่าต้องทำงานให้รัฐถึงวันที่เท่าไร และเงินเดือนเท่ากันจะเหลือรับจริงเท่าไรใน ${n} ประเทศ ใช้ฟรี ไม่ต้องสมัคร`,
    },
    ceja: "วันอิสรภาพทางภาษี",
    h1: "ในหนึ่งปี ต้องทำงานให้รัฐถึงวันไหน",
    bajada: (n) => `กรอกเงินเดือนก่อนหักเพื่อดูวันที่ จากนั้นเปรียบเทียบได้ใน ${n} ประเทศ ด้วยกำลังซื้อเท่ากันและกฎภาษีของแต่ละประเทศ`,
    form: {
      titulo: "เงินเดือน",
      sueldo: "เงินเดือนก่อนหัก",
      mes: "รายเดือน",
      anio: "รายปี",
      periodo: "รอบการจ่าย",
      pais: "ประเทศที่ทำงาน",
      ejemplo: "ตัวอย่าง",
      ejemploAyuda: "นี่คือเงินเดือนตัวอย่าง พิมพ์เงินเดือนจริงแล้วทุกอย่างจะคำนวณใหม่ทันที",
      propio: "นำมาจากการคำนวณก่อนหน้า",
      invalido: "กรุณากรอกจำนวนเงินที่มากกว่าศูนย์",
      pagas: "ใช้เงินเดือนตามสลิปรายเดือน ระบบจะเพิ่มเงินที่กฎหมายกำหนดให้จ่ายเพิ่ม (เช่น เงินเดือนเดือนที่ 13 หรือ 14) เงินที่รับจริงเป็นค่าเฉลี่ยของ 12 เดือน",
    },
    heroe: {
      hasta: (fecha) => `ทำงานให้รัฐถึงวันที่ ${fecha}`,
      tasa: (pct) => `${pct} ของเงินเดือนเป็นภาษีเงินได้และเงินสมทบ`,
      dias: (n, total) => `${n} จาก ${total} วัน`,
      enMano: "รับจริง",
      porMes: "ต่อเดือน",
      anio: (anio, n, total) => `ปี พ.ศ. ${beTh(anio)}: ${n} จาก ${total} วันเป็นการทำงานให้รัฐ`,
      resto: "ตั้งแต่วันถัดไป รายได้ทั้งหมดเป็นของตัวเอง",
    },
    ranking: {
      titulo: "เงินเดือนเท่ากัน เทียบทีละประเทศ",
      bajada: "เมื่อกำลังซื้อเท่ากัน นี่คือเงินที่รับจริงในแต่ละประเทศ ทุกแถวมาจากเครื่องคำนวณทางการของประเทศนั้น ทุกประเทศใช้เงินเดือนเท่ากัน ต่างกันแค่ภาษีและเงินสมทบ ไม่ใช่รายได้จริงในประเทศนั้น",
      lista: "ประเทศเรียงตามเงินที่รับจริง",
      buscar: "ค้นหาประเทศ",
      filtrar: "กรองตามภูมิภาค",
      todas: "ทั้งหมด",
      regiones: { americas: "อเมริกา", europa: "ยุโรป", asia: "เอเชียและโอเชียเนีย", africa: "แอฟริกาและตะวันออกกลาง" },
      tuPais: "ประเทศที่ทำงาน",
      mejor: "ภาษีต่ำที่สุด",
      enMano: "รับจริงต่อเดือน",
      enTuMoneda: "ในสกุลเงินของตัวเอง",
      vsTuPais: "เทียบกับประเทศที่ทำงาน",
      verTodos: (n) => `ดูทั้ง ${n} ประเทศ`,
      verMenos: "แสดงน้อยลง",
      sinResultados: (q) => `ไม่พบประเทศที่ตรงกับ “${q}”`,
      abrir: (pais) => `เปิดเครื่องคำนวณ${gTh.para(pais)}`,
      mas: (pct) => `มากกว่า ${pct}`,
      menos: (pct) => `น้อยกว่า ${pct}`,
      igual: "เท่ากัน",
      puesto: (p, total) => `ประเทศที่ทำงานอยู่อันดับ ${p} จาก ${total}`,
    },
    tarjeta: {
      titulo: "การ์ดสำหรับแชร์",
      bajada: "การ์ดแสดงเฉพาะวันที่และเปอร์เซ็นต์ ไม่แสดงจำนวนเงินเดือน",
      hasta: (fecha) => `ทำงานให้รัฐถึงวันที่ ${fecha}`,
      tasa: (pct) => `${pct} ของเงินเดือนเป็นภาษี`,
      mejor: (pais, pct) => `เงินเดือนเท่ากันจะเสียภาษีน้อยกว่า${gTh.en(pais)} รับจริงมากขึ้น ${pct}`,
      mejorPropio: (pais) => `ด้วยเงินเดือนนี้ ไม่มีประเทศไหนเหลือให้มากกว่า${gTh.nombre(pais)}`,
      yVos: "แล้วถึงวันไหนกันบ้าง",
      cta: "ลองคำนวณได้ที่",
      generica: "ต้องทำงานให้รัฐถึงวันไหน",
      genericaBajada: (n) => `เงินเดือนเดียวกันใน ${n} ประเทศ คำนวณด้วยเครื่องคำนวณทางการของแต่ละประเทศ`,
      compartir: "แชร์การ์ด",
      compartirDuelo: "ส่งคำท้ากลับ",
      descargar: "ดาวน์โหลดรูปภาพ",
      copiado: "คัดลอกลิงก์แล้ว วางได้ทุกที่",
      compartido: "แชร์เรียบร้อยแล้ว",
      error: "แชร์ไม่สำเร็จ กรุณาลองอีกครั้ง",
      texto: (fecha) => `ทำงานให้รัฐถึงวันที่ ${fecha} แล้วถึงวันไหนกันบ้าง`,
      alt: "ตัวอย่างการ์ด",
    },
    duelo: {
      amigo: (fecha) => `เพื่อนทำงานให้รัฐถึงวันที่ ${fecha}`,
      yVos: "แล้วถึงวันไหนกันบ้าง",
      invitacion: "กรอกเงินเดือนเพื่อเปรียบเทียบ",
      vos: "ตัวเอง",
      elAmigo: "เพื่อน",
      dia: "ทำงานให้รัฐถึง",
      tasa: "ภาษีและเงินสมทบ",
      mejorPais: "ภาษีต่ำที่สุดใน",
      antes: (d) => `อิสระก่อนเพื่อน ${d} วัน`,
      despues: (d) => `เพื่อนอิสระก่อน ${d} วัน`,
      empate: "อิสระในวันเดียวกัน",
      desde: (pais) => `ทำงาน${gTh.en(pais)}`,
    },
    cero: { dia: "0 วัน", heroeAntes: "ทำงานให้รัฐ", tarjetaAntes: "ทำงานให้รัฐ", motivo: "เงินเดือนระดับนี้ไม่มีการหักภาษีเงินได้หรือเงินสมทบ", texto: "ปีนี้ไม่ต้องทำงานให้รัฐเลยสักวัน แล้วถึงวันไหนกันบ้าง", amigo: "เพื่อนไม่ต้องทำงานให้รัฐเลยสักวัน" },
    metodo: {
      titulo: "วิธีคำนวณ",
      estimacion: "นี่คือค่าประมาณสำหรับเปรียบเทียบระหว่างประเทศ ไม่ใช่สลิปเงินเดือน ค่าลดหย่อน บุตร หรือโบนัสอาจทำให้ตัวเลขเปลี่ยน",
      supuestos: [
        "คนโสดไม่มีบุตร ใช้ค่าเริ่มต้นของเครื่องคำนวณแต่ละประเทศ",
        "เงินที่รับจริงคือส่วนที่เหลือหลังหักภาษีเงินได้และเงินสมทบส่วนของลูกจ้าง ไม่รวมภาษีมูลค่าเพิ่มและส่วนที่นายจ้างจ่าย",
        "เงินเดือนเดือนที่ 13 หรือเงินที่กฎหมายกำหนดให้จ่ายเพิ่ม เฉลี่ยตลอดปีตามกฎหมายของแต่ละประเทศ",
        "สหรัฐอเมริกาไม่รวมภาษีระดับรัฐและท้องถิ่น ใช้เฉพาะภาษีของรัฐบาลกลางและเงินสมทบ",
        "การเทียบเงินเดือนกับประเทศอื่นใช้ความเสมอภาคของอำนาจซื้อ (PPP) คือมาตรฐานการครองชีพเดียวกัน ไม่ใช่อัตราแลกเปลี่ยนของวันนี้",
        `PPP ของอาร์เจนตินาปรับต่อด้วยดัชนีราคาผู้บริโภคของ INDEC เพราะธนาคารโลกเผยแพร่ถึงปี พ.ศ. ${beTh(2021)} เท่านั้น`,
        "วันอิสรภาพทางภาษีกระจายภาษีตลอดปีโดยเริ่มจากวันที่ 1 มกราคม หากภาษีเท่ากับ 30% ของเงินเดือน ก็เท่ากับทำงานให้รัฐ 30% ของปี",
      ],
      ppaTitulo: "ความเสมอภาคของอำนาจซื้อ", bancoMundial: "ธนาคารโลก",
      ppa: (organismo, indicador, anio) => `${organismo} ตัวชี้วัด ${indicador} ปีล่าสุดที่มีข้อมูล พ.ศ. ${beTh(anio)}`,
      consultado: (fecha) => `ตรวจสอบเมื่อ ${fecha}`,
      verFuente: "ดูแหล่งที่มา",
      fuentesTitulo: "แหล่งที่มาของแต่ละประเทศ",
      fuentesBajada: "ทุกแถวใช้เครื่องคำนวณเงินเดือนสุทธิและข้อมูลทางการของประเทศนั้น",
      verificado: (fecha) => `ตรวจสอบข้อมูลเมื่อ ${fecha}`,
      sello: (fecha) => `ข้อมูลทางการตรวจสอบกับแหล่งที่มาของแต่ละประเทศ การตรวจสอบที่เก่าที่สุดคือวันที่ ${fecha}`,
    },
    faqTitulo: "คำถามที่พบบ่อย",
    faq: (n) => [
      {
        pregunta: "วันอิสรภาพทางภาษีคืออะไร",
        respuesta: "คือวันในปีที่จ่ายภาษีครบ หากรายได้ทั้งหมดตั้งแต่วันที่ 1 มกราคมถูกนำไปจ่ายให้รัฐก่อน ที่นี่คำนวณจากเงินเดือนที่กรอก ไม่ใช่ค่าเฉลี่ยของประเทศ",
      },
      {
        pregunta: "ทำไมต้องเทียบด้วยกำลังซื้อ",
        respuesta: "อัตราแลกเปลี่ยนทำให้เงินเดือนดูมากหรือน้อยเกินจริงตามแต่ละวัน PPP เทียบว่าเงินจำนวนนั้นซื้ออะไรได้จริงในแต่ละประเทศ",
      },
      {
        pregunta: "มีการบันทึกเงินเดือนไว้หรือไม่",
        respuesta: "ไม่มี การคำนวณทำงานในเบราว์เซอร์ สิ่งที่แชร์มีเพียงวันที่ เปอร์เซ็นต์ และประเทศ",
      },
      {
        pregunta: "ทำไมเงินที่รับจริงจึงต่างจากตัวเลขนี้",
        respuesta: "การคำนวณสมมติเป็นคนโสดไม่มีบุตรและใช้ค่าเริ่มต้น ค่าลดหย่อน โบนัส หรือสิทธิพิเศษจะทำให้ตัวเลขเปลี่ยน หากต้องการตัวเลขที่ตรงกับกรณีจริง กรุณาเปิดเครื่องคำนวณของประเทศที่ทำงาน",
      },
      {
        pregunta: "มีประเทศใดบ้าง",
        respuesta: `ขณะนี้มี ${n} ประเทศ แต่ละประเทศมีเครื่องคำนวณเงินเดือนสุทธิและข้อมูลทางการของตัวเอง เราเพิ่มประเทศใหม่เมื่อตรวจสอบกฎภาษีเสร็จแล้ว`,
      },
    ],
    destacado: {
      ceja: "เปรียบเทียบทั่วโลก",
      titulo: "ต้องทำงานให้รัฐถึงวันไหน",
      texto: "กรอกเงินเดือนแล้วดูว่าจะรับจริงเท่าไรในประเทศอื่น",
      ir: "คำนวณวันของตัวเอง",
    },
  },
};

// ───────────────────────────── uk ─────────────────────────────

// Ucraniano (ADR 0002, D15): «ви» con minúscula y las formas corteses; la tarjeta y el texto para
// compartir, en primera persona. El país se declina con GRAMATICA.uk y los días con pluralUk.
const gUk = GRAMATICA.uk;
const SEO_UK = "День податкової свободи і зарплата на руки за країнами";
const diasUk = (d: number) => pluralUk(d, "день", "дні", "днів");

const uk: Diccionario<TextosMundo> = {
  base: {
    nombre: "Ваша зарплата у світі",
    seo: {
      titulo: (pais) => [`${SEO_UK} | ${pais}`, SEO_UK, "Ваша зарплата у світі"],
      tituloGlobal: [SEO_UK, "Ваша зарплата у світі"],
      descripcion: (pais, n) => `Дізнайтеся, до якого дня року ви працюєте на державу із зарплатою ${gUk.en(pais)} і скільки отримували б на руки в ${n} країнах. Безкоштовно, без реєстрації.`,
      descripcionGlobal: (n) => `Дізнайтеся, до якого дня року ви працюєте на державу і скільки ваша зарплата давала б на руки в ${n} країнах. Безкоштовно, без реєстрації.`,
    },
    ceja: "Ваш День податкової свободи",
    h1: "До якого дня року ви працюєте на державу?",
    bajada: (n) => `Введіть зарплату брутто, щоб побачити свою дату. Потім порівняйте її в ${n} країнах з тією самою купівельною спроможністю і податковими правилами кожної країни.`,
    form: {
      titulo: "Ваша зарплата",
      sueldo: "Зарплата брутто",
      mes: "На місяць",
      anio: "На рік",
      periodo: "Період зарплати",
      pais: "Країна, де ви працюєте",
      ejemplo: "Приклад",
      ejemploAyuda: "Це приклад зарплати. Введіть свою, і всі числа одразу оновляться.",
      propio: "Перенесено з вашого розрахунку.",
      invalido: "Введіть суму, більшу за нуль.",
      pagas: "Місячна зарплата з вашого розрахункового листка: обовʼязкові за законом додаткові виплати (13-ту чи 14-ту зарплату) ми додаємо самі. Зарплата на руки є середньою за 12 місяців.",
    },
    heroe: {
      hasta: (fecha) => `Ви працюєте на державу до ${fecha}`,
      tasa: (pct) => `${pct} вашої зарплати йде на податок на доходи і обовʼязкові внески.`,
      dias: (n, total) => `${n} з ${total} днів`,
      enMano: "На руки",
      porMes: "на місяць",
      anio: (anio, n, total) => `${anio}: ${n} з ${total} днів на державу.`,
      resto: "З наступного дня все, що ви заробляєте, належить вам.",
    },
    ranking: {
      titulo: "Та сама зарплата в різних країнах",
      bajada: "Стільки ви отримували б на руки в кожній країні з тією самою купівельною спроможністю. Кожен рядок взято з офіційного калькулятора цієї країни. Скрізь та сама зарплата: змінюються лише податки й внески, а не те, скільки заробляють у кожній країні.",
      lista: "Країни за зарплатою на руки",
      buscar: "Знайдіть країну",
      filtrar: "Фільтр за регіоном",
      todas: "Усі",
      regiones: { americas: "Америка", europa: "Європа", asia: "Азія та Океанія", africa: "Африка і Близький Схід" },
      tuPais: "Ваша країна",
      mejor: "Найменші податки",
      enMano: "На руки за місяць",
      enTuMoneda: "У вашій валюті",
      vsTuPais: "Порівняно з вашою країною",
      verTodos: (n) => `Показати всі країни (${n})`,
      verMenos: "Показати менше",
      sinResultados: (q) => `Немає країни, що відповідає запиту «${q}».`,
      abrir: (pais) => `Відкрити калькулятор ${gUk.para(pais)}`,
      mas: (pct) => `на ${pct} більше`,
      menos: (pct) => `на ${pct} менше`,
      igual: "Так само",
      puesto: (p, total) => `Ваша країна на ${p} місці з ${total}.`,
    },
    tarjeta: {
      titulo: "Ваша картка, щоб поділитися",
      bajada: "На ній видно вашу дату і відсотки. Скільки ви заробляєте, не видно ніколи.",
      hasta: (fecha) => `Я працюю на державу до ${fecha}`,
      tasa: (pct) => `${pct} моєї зарплати йде на податки`,
      mejor: (pais, pct) => `З тією самою зарплатою ${gUk.en(pais)} я платив би менше податків: на ${pct} більше на руки`,
      mejorPropio: (pais) => `Країна, де з моєю зарплатою найменші податки: ${gUk.nombre(pais)}`,
      yVos: "А ви?",
      cta: "Дізнайтеся свою дату:",
      generica: "До якого дня року ви працюєте на державу?",
      genericaBajada: (n) => `Ваша зарплата в ${n} країнах, за офіційним калькулятором кожної`,
      compartir: "Поділитися карткою",
      compartirDuelo: "Відповісти на виклик",
      descargar: "Завантажити зображення",
      copiado: "Посилання скопійовано. Вставте його куди завгодно.",
      compartido: "Готово, надіслано.",
      error: "Не вдалося поділитися. Спробуйте ще раз.",
      texto: (fecha) => `Я працюю на державу до ${fecha}. А ви?`,
      alt: "Попередній перегляд вашої картки",
    },
    duelo: {
      amigo: (fecha) => `Ваш друг працює на державу до ${fecha}.`,
      yVos: "А ви?",
      invitacion: "Введіть свою зарплату, щоб порівняти.",
      vos: "Ви",
      elAmigo: "Ваш друг",
      dia: "Працює на державу до",
      tasa: "Податки і внески",
      mejorPais: "Найменші податки",
      antes: (d) => `Ви вільні на ${diasUk(d)} раніше за друга.`,
      despues: (d) => `Ваш друг вільний на ${diasUk(d)} раніше за вас.`,
      empate: "Ви обоє вільні в той самий день.",
      desde: (pais) => `Працює ${gUk.en(pais)}`,
    },
    cero: {
      dia: "нуль днів",
      heroeAntes: "Ви працюєте на державу",
      tarjetaAntes: "Я працюю на державу",
      motivo: "З цієї зарплати не утримують ні податку на доходи, ні обовʼязкових внесків.",
      texto: "Цього року я не працюю на державу жодного дня. А ви?",
      amigo: "Ваш друг не працює на державу жодного дня.",
    },
    metodo: {
      titulo: "Як ми рахуємо",
      estimacion: "Це оцінка для порівняння країн, а не розрахунковий листок. Пільги, діти чи премії можуть змінити ваше число.",
      supuestos: [
        "Неодружена людина без дітей, зі значеннями за замовчуванням у калькуляторі кожної країни.",
        "Зарплата на руки є тим, що лишається після податку на доходи і внесків, які сплачує сам працівник. Податки на споживання і внески роботодавця не враховуються.",
        "13-та зарплата чи інші обовʼязкові додаткові виплати розподіляються на рік так, як передбачає закон кожної країни.",
        "У Сполучених Штатах податок на доходи штату чи місцевий податок не додається: лише федеральний податок і внески із зарплати.",
        "Щоб перенести вашу зарплату в іншу країну, ми використовуємо паритет купівельної спроможності (ПКС): той самий рівень життя, а не сьогоднішній курс валют.",
        "ПКС Аргентини оновлюється за індексом споживчих цін INDEC, бо Світовий банк публікує його лише до 2021 року.",
        "Ваш день свободи розподіляє податки на рік, починаючи з 1 січня. Якщо 30% зарплати йде на податки, ви працюєте на державу 30% року.",
      ],
      ppaTitulo: "Паритет купівельної спроможності",
      bancoMundial: "Світовий банк",
      ppa: (organismo, indicador, anio) => `${organismo}, показник ${indicador}, останній доступний рік: ${anio}.`,
      consultado: (fecha) => `Перевірено ${fecha}.`,
      verFuente: "Переглянути джерело",
      fuentesTitulo: "Джерело кожної країни",
      fuentesBajada: "Кожен рядок використовує калькулятор зарплати на руки цієї країни та її офіційні дані.",
      verificado: (fecha) => `Дані перевірено ${fecha}`,
      sello: (fecha) => `Офіційні дані перевірено в джерелі кожної країни. Найдавніша перевірка: ${fecha}.`,
    },
    faqTitulo: "Поширені запитання",
    faq: (n) => [
      {
        pregunta: "Що таке День податкової свободи?",
        respuesta:
          "Це день року, коли ви закінчуєте сплачувати податки, якби все зароблене з 1 січня спершу йшло державі. Тут його розраховано з вашої зарплати, а не із середньої по країні.",
      },
      {
        pregunta: "Чому порівнюємо за купівельною спроможністю?",
        respuesta: "Через курс валют зарплата може здаватися величезною або мізерною залежно від дня. ПКС порівнює, що насправді можна купити за ці гроші в кожній країні.",
      },
      {
        pregunta: "Чи зберігається моя зарплата?",
        respuesta: "Ні. Розрахунок виконується у вашому браузері. Те, чим ви ділитеся, містить лише дати, відсотки й країни.",
      },
      {
        pregunta: "Чому моя справжня зарплата на руки інша?",
        respuesta:
          "Ми беремо неодружену людину без дітей і значення за замовчуванням. Пільги, премії чи особливі режими змінюють число. Щоб отримати точний розрахунок для вашої ситуації, відкрийте калькулятор своєї країни.",
      },
      {
        pregunta: "Які країни є?",
        respuesta: `Сьогодні ${pluralUk(n, "країна", "країни", "країн")}, у кожної свій калькулятор зарплати на руки та офіційні дані. Ми додаємо нові, щойно перевіримо їхні податкові правила.`,
      },
    ],
    destacado: {
      ceja: "Світове порівняння",
      titulo: "До якого дня року ви працюєте на державу?",
      texto: "Введіть зарплату і подивіться, скільки отримували б на руки в інших країнах.",
      ir: "Дізнатися свою дату",
    },
  },
};

// ───────────────────────────── uz ─────────────────────────────

// Uzbeko latino (ADR 0002, D16): «Siz» con las formas corteses; la tarjeta y el texto para compartir,
// en primera persona. La fecha va en el medio de la oración y el sufijo cae en la palabra que la
// sigue («24-oktabr, 2026 sanasigacha»), nunca pegado a una cifra; los conteos van con «ta» suelto.
const gUz = GRAMATICA.uz;
const SEO_UZ = "Soliqdan ozodlik kuni va mamlakatlar boʻyicha maosh";

const uz: Diccionario<TextosMundo> = {
  base: {
    nombre: "Maoshingiz dunyoda qancha turadi",
    seo: {
      titulo: (pais) => [`${SEO_UZ} | ${pais}`, SEO_UZ, "Mamlakatlar boʻyicha maosh"],
      tituloGlobal: [SEO_UZ, "Mamlakatlar boʻyicha maosh"],
      descripcion: (pais, n) => `${gUz.en(pais)} maosh bilan yilning qaysi kunigacha davlat uchun ishlashingizni va ${n} ta mamlakatda qoʻlingizga qancha tegishini koʻring. Bepul, roʻyxatdan oʻtmasdan.`,
      descripcionGlobal: (n) => `Yilning qaysi kunigacha davlat uchun ishlashingizni va ${n} ta mamlakatda qoʻlingizga qancha tegishini koʻring. Bepul, roʻyxatdan oʻtmasdan.`,
    },
    ceja: "Soliqdan ozodlik kuningiz",
    h1: "Yilning qaysi kunigacha davlat uchun ishlaysiz?",
    bajada: (n) => `Sanangizni koʻrish uchun yalpi maoshingizni kiriting. Keyin uni xuddi shu xarid qobiliyati va har bir mamlakatning soliq qoidalari bilan ${n} ta mamlakatda solishtiring.`,
    form: {
      titulo: "Maoshingiz",
      sueldo: "Yalpi maosh",
      mes: "Oylik",
      anio: "Yillik",
      periodo: "Maosh davri",
      pais: "Ishlaydigan mamlakatingiz",
      ejemplo: "Misol",
      ejemploAyuda: "Bu misol uchun olingan maosh. Oʻz maoshingizni yozing, barcha raqamlar darhol yangilanadi.",
      propio: "Oldingi hisobingizdan olindi.",
      invalido: "Noldan katta summa kiriting.",
      pagas: "Hisob varaqangizdagi oylik maosh: qonun majburiy qilgan qoʻshimcha toʻlovlarni (oʻn uchinchi yoki oʻn toʻrtinchi maosh) biz qoʻshamiz. Qoʻlga tegadigan maosh 12 oyning oʻrtachasi.",
    },
    heroe: {
      hasta: (fecha) => `Davlat uchun ${fecha} sanasigacha ishlaysiz`,
      tasa: (pct) => `Maoshingizning ${pct} qismi daromad soligʻi va majburiy badallarga ketadi.`,
      dias: (n, total) => `${total} kun ichida ${n} kun`,
      enMano: "Qoʻlingizga tegadi",
      porMes: "oyiga",
      anio: (anio, n, total) => `${anio} yil: ${total} kun ichida ${n} kun davlat uchun.`,
      resto: "Ertasi kundan boshlab ishlab topganingizning hammasi sizniki.",
    },
    ranking: {
      titulo: "Bir xil maosh, mamlakatma-mamlakat",
      bajada: "Xuddi shu xarid qobiliyati bilan har bir mamlakatda qoʻlingizga tegadigan maosh. Har bir qator oʻsha mamlakatning rasmiy kalkulyatoridan olinadi. Hamma joyda bir xil maosh: faqat soliq va badallar oʻzgaradi, oʻsha mamlakatdagi haqiqiy maosh emas.",
      lista: "Qoʻlga tegadigan maosh boʻyicha tartiblangan mamlakatlar",
      buscar: "Mamlakatni qidiring",
      filtrar: "Mintaqa boʻyicha saralang",
      todas: "Hammasi",
      regiones: { americas: "Amerika", europa: "Yevropa", asia: "Osiyo va Okeaniya", africa: "Afrika va Yaqin Sharq" },
      tuPais: "Mamlakatingiz",
      mejor: "Eng kam soliq",
      enMano: "Oylik qoʻlga tegadigan maosh",
      enTuMoneda: "Oʻz valyutangizda",
      vsTuPais: "Mamlakatingizga nisbatan",
      verTodos: (n) => `Barcha ${n} ta mamlakatni koʻring`,
      verMenos: "Kamroq koʻrsatish",
      sinResultados: (q) => `«${q}» boʻyicha mamlakat topilmadi.`,
      abrir: (pais) => `${gUz.para(pais)} kalkulyatorni oching`,
      mas: (pct) => `${pct} koʻproq`,
      menos: (pct) => `${pct} kamroq`,
      igual: "Bir xil",
      puesto: (p, total) => `Mamlakatingiz oʻrni: ${p} (jami ${total} ta mamlakat).`,
    },
    tarjeta: {
      titulo: "Ulashish uchun kartangiz",
      bajada: "Kartada sanangiz va foizlaringiz koʻrinadi. Qancha ishlab topishingiz hech qachon koʻrinmaydi.",
      hasta: (fecha) => `Davlat uchun ${fecha} sanasigacha ishlayman`,
      tasa: (pct) => `Maoshimning ${pct} qismi soliqqa ketadi`,
      mejor: (pais, pct) => `Shu maosh bilan ${gUz.en(pais)} kamroq soliq toʻlardim: qoʻlimga ${pct} koʻproq tegardi`,
      mejorPropio: (pais) => `Shu maosh bilan eng kam soliq toʻlanadigan mamlakat: ${gUz.nombre(pais)}`,
      yVos: "Sizchi?",
      cta: "Oʻz sanangizni bilib oling:",
      generica: "Yilning qaysi kunigacha davlat uchun ishlaysiz?",
      genericaBajada: (n) => `Maoshingiz ${n} ta mamlakatda, har birining rasmiy kalkulyatori bilan`,
      compartir: "Kartamni ulashish",
      compartirDuelo: "Bellashuvga javob berish",
      descargar: "Rasmni yuklab olish",
      copiado: "Havola nusxalandi. Uni istalgan joyga qoʻying.",
      compartido: "Tayyor, ulashildi.",
      error: "Ulashib boʻlmadi. Qaytadan urinib koʻring.",
      texto: (fecha) => `Davlat uchun ${fecha} sanasigacha ishlayman. Sizchi?`,
      alt: "Kartangizni oldindan koʻrish",
    },
    duelo: {
      amigo: (fecha) => `Doʻstingiz davlat uchun ${fecha} sanasigacha ishlaydi.`,
      yVos: "Sizchi?",
      invitacion: "Solishtirish uchun maoshingizni kiriting.",
      vos: "Siz",
      elAmigo: "Doʻstingiz",
      dia: "Davlat uchun ishlagan oxirgi kun",
      tasa: "Soliqlar va badallar",
      mejorPais: "Eng kam soliq",
      antes: (d) => `Siz doʻstingizdan ${d} kun oldin ozod boʻlasiz.`,
      despues: (d) => `Doʻstingiz sizdan ${d} kun oldin ozod boʻladi.`,
      empate: "Ikkalangiz bir kunda ozod boʻlasiz.",
      desde: (pais) => `${gUz.en(pais)} ishlaydi`,
    },
    cero: {
      dia: "nol kun",
      heroeAntes: "Davlat uchun ishlaydigan vaqtingiz",
      tarjetaAntes: "Davlat uchun ishlaydigan vaqtim",
      motivo: "Bu maoshdan daromad soligʻi ham, majburiy badallar ham ushlanmaydi.",
      texto: "Bu yil davlat uchun bir kun ham ishlamayman. Sizchi?",
      amigo: "Doʻstingiz davlat uchun bir kun ham ishlamaydi.",
    },
    metodo: {
      titulo: "Qanday hisoblaymiz",
      estimacion: "Bu mamlakatlarni solishtirish uchun taxmin, hisob varaqasi emas. Imtiyozlar, farzandlar yoki mukofotlar raqamingizni oʻzgartirishi mumkin.",
      supuestos: [
        "Farzandsiz, yolgʻiz yashaydigan shaxs; har bir mamlakat kalkulyatorining standart qiymatlari bilan.",
        "Qoʻlga tegadigan maosh: daromad soligʻi va xodimning oʻzi toʻlaydigan badallar ayirilgandan keyin qolgan summa. Isteʼmol soliqlari va ish beruvchi toʻlaydigan badallar hisobga olinmaydi.",
        "Oʻn uchinchi maosh yoki boshqa majburiy qoʻshimcha toʻlovlar har bir mamlakat qonuniga koʻra yilga taqsimlanadi.",
        "Amerika Qoʻshma Shtatlarida shtat yoki mahalliy daromad soligʻi qoʻshilmaydi: faqat federal soliq va ish haqi badallari.",
        "Maoshingizni boshqa mamlakatga koʻchirish uchun xarid qobiliyati paritetidan (XQP) foydalanamiz: bugungi kurs emas, bir xil turmush darajasi.",
        "Argentinaning XQP qiymati INDEC isteʼmol narxlari indeksi bilan yangilanadi, chunki Jahon banki bu koʻrsatkichni 2021 yildan keyin eʼlon qilmagan.",
        "Ozodlik kuningiz soliqlaringizni 1-yanvardan boshlab yilga taqsimlaydi. Maoshingizning 30% qismi soliqqa ketsa, yilning 30% qismi davomida davlat uchun ishlaysiz.",
      ],
      ppaTitulo: "Xarid qobiliyati pariteti",
      bancoMundial: "Jahon banki",
      ppa: (organismo, indicador, anio) => `${organismo}, koʻrsatkich: ${indicador}, mavjud oxirgi yil: ${anio}.`,
      consultado: (fecha) => `Tekshirilgan sana: ${fecha}.`,
      verFuente: "Manbani koʻring",
      fuentesTitulo: "Har bir mamlakatning manbasi",
      fuentesBajada: "Har bir qator oʻsha mamlakatning qoʻlga tegadigan maosh kalkulyatori va rasmiy maʼlumotlaridan foydalanadi.",
      verificado: (fecha) => `Maʼlumotlar tekshirilgan sana: ${fecha}`,
      sello: (fecha) => `Rasmiy maʼlumotlar har bir mamlakat manbasida tekshirildi. Eng eski tekshiruv sanasi: ${fecha}.`,
    },
    faqTitulo: "Koʻp beriladigan savollar",
    faq: (n) => [
      {
        pregunta: "Soliqdan ozodlik kuni nima?",
        respuesta:
          "1-yanvardan boshlab ishlab topganingizning hammasi avval davlatga ketganda, soliqlaringizni toʻlab boʻladigan kuningiz. Bu yerda u mamlakat oʻrtachasidan emas, sizning maoshingizdan hisoblanadi.",
      },
      {
        pregunta: "Nega xarid qobiliyati bilan solishtiriladi?",
        respuesta: "Valyuta kursi kunga qarab maoshni juda katta yoki juda kichik qilib koʻrsatishi mumkin. XQP bu pulga har bir mamlakatda haqiqatan nima sotib olish mumkinligini solishtiradi.",
      },
      {
        pregunta: "Maoshim saqlanadimi?",
        respuesta: "Yoʻq. Hisob brauzeringizda bajariladi. Siz ulashadigan narsada faqat sanalar, foizlar va mamlakatlar boʻladi.",
      },
      {
        pregunta: "Nega haqiqiy qoʻlga tegadigan maoshim boshqacha?",
        respuesta:
          "Farzandsiz, yolgʻiz shaxs va standart qiymatlarni asos qilib olamiz. Imtiyozlar, mukofotlar yoki maxsus rejimlar raqamni oʻzgartiradi. Oʻz holatingizning aniq hisobi uchun mamlakatingiz kalkulyatorini oching.",
      },
      {
        pregunta: "Qaysi mamlakatlar bor?",
        respuesta: `Hozir ${n} ta mamlakat bor, har birining oʻz qoʻlga tegadigan maosh kalkulyatori va rasmiy maʼlumotlari bilan. Soliq qoidalarini tasdiqlaganimiz sari yangi mamlakatlar qoʻshamiz.`,
      },
    ],
    destacado: {
      ceja: "Dunyo boʻyicha solishtirish",
      titulo: "Yilning qaysi kunigacha davlat uchun ishlaysiz?",
      texto: "Maoshingizni kiriting va boshqa mamlakatlarda qoʻlingizga qancha tegishini koʻring.",
      ir: "Sanamni bilish",
    },
  },
};

// ───────────────────────────── ru ─────────────────────────────

// Ruso (ADR 0002, D17): «вы» con minúscula y el imperativo cortés; la tarjeta y el texto para
// compartir, en primera persona y sin concordar con el género («на руки оставалось бы»). El país se
// declina con GRAMATICA.ru, los días con pluralRu y «в N странах» con formaRu («в 41 стране»).
const gRu = GRAMATICA.ru;
const SEO_RU = "День налоговой свободы и зарплата на руки по странам";
const diasRu = (d: number) => pluralRu(d, "день", "дня", "дней");
const enPaisesRu = (n: number) => `в ${n} ${formaRu(n, "стране", "странах", "странах")}`;

const ru: Diccionario<TextosMundo> = {
  base: {
    nombre: "Ваша зарплата в мире",
    seo: {
      titulo: (pais) => [`${SEO_RU} | ${pais}`, SEO_RU, "Ваша зарплата в мире"],
      tituloGlobal: [SEO_RU, "Ваша зарплата в мире"],
      descripcion: (pais, n) => `Узнайте, до какого дня года вы работаете на государство с зарплатой ${gRu.en(pais)} и сколько получали бы на руки ${enPaisesRu(n)}. Бесплатно, без регистрации.`,
      descripcionGlobal: (n) => `Узнайте, до какого дня года вы работаете на государство и сколько ваша зарплата давала бы на руки ${enPaisesRu(n)}. Бесплатно, без регистрации.`,
    },
    ceja: "Ваш День налоговой свободы",
    h1: "До какого дня года вы работаете на государство?",
    bajada: (n) => `Введите зарплату до вычета налогов, чтобы увидеть свою дату. Затем сравните ее ${enPaisesRu(n)} с той же покупательной способностью и налоговыми правилами каждой страны.`,
    form: {
      titulo: "Ваша зарплата",
      sueldo: "Зарплата до вычета налогов",
      mes: "В месяц",
      anio: "В год",
      periodo: "Период зарплаты",
      pais: "Страна, где вы работаете",
      ejemplo: "Пример",
      ejemploAyuda: "Это пример зарплаты. Введите свою, и все цифры сразу обновятся.",
      propio: "Перенесено из вашего расчета.",
      invalido: "Введите сумму больше нуля.",
      pagas: "Месячная зарплата из вашего расчетного листа: обязательные по закону дополнительные выплаты (13-ю или 14-ю зарплату) мы добавляем сами. Зарплата на руки считается как среднее за 12 месяцев.",
    },
    heroe: {
      hasta: (fecha) => `Вы работаете на государство до ${fecha}`,
      tasa: (pct) => `${pct} вашей зарплаты уходит на подоходный налог и обязательные взносы.`,
      dias: (n, total) => `${n} из ${total} дней`,
      enMano: "На руки",
      porMes: "в месяц",
      anio: (anio, n, total) => `${anio}: ${n} из ${total} дней на государство.`,
      resto: "Со следующего дня все, что вы зарабатываете, остается вам.",
    },
    ranking: {
      titulo: "Одна и та же зарплата в разных странах",
      bajada: "Столько вы получали бы на руки в каждой стране при той же покупательной способности. Каждая строка взята из официального калькулятора этой страны. Везде одна и та же зарплата: меняются только налоги и взносы, а не то, сколько зарабатывают в каждой стране.",
      lista: "Страны по зарплате на руки",
      buscar: "Найдите страну",
      filtrar: "Фильтр по региону",
      todas: "Все",
      regiones: { americas: "Америка", europa: "Европа", asia: "Азия и Океания", africa: "Африка и Ближний Восток" },
      tuPais: "Ваша страна",
      mejor: "Меньше всего налогов",
      enMano: "На руки в месяц",
      enTuMoneda: "В вашей валюте",
      vsTuPais: "По сравнению с вашей страной",
      verTodos: (n) => `Показать все страны (${n})`,
      verMenos: "Показать меньше",
      sinResultados: (q) => `Нет страны, которая подходит под запрос «${q}».`,
      abrir: (pais) => `Открыть калькулятор ${gRu.para(pais)}`,
      mas: (pct) => `на ${pct} больше`,
      menos: (pct) => `на ${pct} меньше`,
      igual: "Столько же",
      puesto: (p, total) => `Ваша страна занимает ${p} место из ${total}.`,
    },
    tarjeta: {
      titulo: "Ваша карточка, чтобы поделиться",
      bajada: "На ней видны ваша дата и проценты. Сколько вы зарабатываете, не видно никогда.",
      hasta: (fecha) => `Я работаю на государство до ${fecha}`,
      tasa: (pct) => `${pct} моей зарплаты уходит на налоги`,
      mejor: (pais, pct) => `С той же зарплатой ${gRu.en(pais)} я платил бы меньше налогов: на руки на ${pct} больше`,
      mejorPropio: (pais) => `Страна, где с моей зарплатой меньше всего налогов: ${gRu.nombre(pais)}`,
      yVos: "А вы?",
      cta: "Узнайте свою дату:",
      generica: "До какого дня года вы работаете на государство?",
      genericaBajada: (n) => `Ваша зарплата ${enPaisesRu(n)}, по официальному калькулятору каждой`,
      compartir: "Поделиться карточкой",
      compartirDuelo: "Ответить на вызов",
      descargar: "Скачать изображение",
      copiado: "Ссылка скопирована. Вставьте ее куда угодно.",
      compartido: "Готово, отправлено.",
      error: "Не удалось поделиться. Попробуйте еще раз.",
      texto: (fecha) => `Я работаю на государство до ${fecha}. А вы?`,
      alt: "Предпросмотр вашей карточки",
    },
    duelo: {
      amigo: (fecha) => `Ваш друг работает на государство до ${fecha}.`,
      yVos: "А вы?",
      invitacion: "Введите свою зарплату, чтобы сравнить.",
      vos: "Вы",
      elAmigo: "Ваш друг",
      dia: "Работает на государство до",
      tasa: "Налоги и взносы",
      mejorPais: "Меньше всего налогов",
      antes: (d) => `Вы свободны на ${diasRu(d)} раньше друга.`,
      despues: (d) => `Ваш друг свободен на ${diasRu(d)} раньше вас.`,
      empate: "Вы оба свободны в один и тот же день.",
      desde: (pais) => `Работает ${gRu.en(pais)}`,
    },
    cero: {
      dia: "ноль дней",
      heroeAntes: "Вы работаете на государство",
      tarjetaAntes: "Я работаю на государство",
      motivo: "С этой зарплаты не удерживают ни подоходный налог, ни обязательные взносы.",
      texto: "В этом году я не работаю на государство ни одного дня. А вы?",
      amigo: "Ваш друг не работает на государство ни одного дня.",
    },
    metodo: {
      titulo: "Как мы считаем",
      estimacion: "Это оценка для сравнения стран, а не расчетный лист. Льготы, дети или премии могут изменить вашу цифру.",
      supuestos: [
        "Человек не в браке и без детей, со значениями по умолчанию в калькуляторе каждой страны.",
        "Зарплата на руки означает то, что остается после подоходного налога и взносов, которые платит сам работник. Налоги на потребление и взносы работодателя не учитываются.",
        "13-я зарплата и другие обязательные дополнительные выплаты распределяются на год так, как предусматривает закон каждой страны.",
        "В Соединенных Штатах подоходный налог штата и местный налог не добавляются: только федеральный налог и взносы с зарплаты.",
        "Чтобы перенести вашу зарплату в другую страну, мы используем паритет покупательной способности (ППС): тот же уровень жизни, а не сегодняшний курс валют.",
        "ППС Аргентины обновляется по индексу потребительских цен INDEC, потому что Всемирный банк публикует его только до 2021 года.",
        "Ваш день свободы распределяет налоги на год, начиная с 1 января. Если 30% зарплаты уходит на налоги, вы работаете на государство 30% года.",
      ],
      ppaTitulo: "Паритет покупательной способности",
      bancoMundial: "Всемирный банк",
      ppa: (organismo, indicador, anio) => `${organismo}, показатель ${indicador}, последний доступный год: ${anio}.`,
      consultado: (fecha) => `Проверено ${fecha}.`,
      verFuente: "Посмотреть источник",
      fuentesTitulo: "Источник каждой страны",
      fuentesBajada: "Каждая строка использует калькулятор зарплаты на руки этой страны и ее официальные данные.",
      verificado: (fecha) => `Данные проверены ${fecha}`,
      sello: (fecha) => `Официальные данные проверены в источнике каждой страны. Самая давняя проверка: ${fecha}.`,
    },
    faqTitulo: "Частые вопросы",
    faq: (n) => [
      {
        pregunta: "Что такое День налоговой свободы?",
        respuesta:
          "Так называют день года, когда вы заканчиваете платить налоги, если бы все заработанное с 1 января сначала уходило государству. Здесь он рассчитан по вашей зарплате, а не по средней по стране.",
      },
      {
        pregunta: "Почему сравнение идет по покупательной способности?",
        respuesta: "Из-за курса валют зарплата может казаться огромной или мизерной в зависимости от дня. ППС сравнивает, что на самом деле можно купить на эти деньги в каждой стране.",
      },
      {
        pregunta: "Сохраняется ли моя зарплата?",
        respuesta: "Нет. Расчет выполняется в вашем браузере. То, чем вы делитесь, содержит только даты, проценты и страны.",
      },
      {
        pregunta: "Почему моя настоящая зарплата на руки другая?",
        respuesta:
          "Мы берем человека не в браке и без детей и значения по умолчанию. Льготы, премии или особые режимы меняют цифру. Чтобы получить точный расчет для вашей ситуации, откройте калькулятор своей страны.",
      },
      {
        pregunta: "Какие страны есть?",
        respuesta: `Сегодня ${pluralRu(n, "страна", "страны", "стран")}, у каждой свой калькулятор зарплаты на руки и официальные данные. Мы добавляем новые, как только проверим их налоговые правила.`,
      },
    ],
    destacado: {
      ceja: "Мировое сравнение",
      titulo: "До какого дня года вы работаете на государство?",
      texto: "Введите зарплату и посмотрите, сколько получали бы на руки в других странах.",
      ir: "Узнать свою дату",
    },
  },
};

// ───────────────────────────── ro ─────────────────────────────

// Rumano (ADR 0002, D18): «dumneavoastră» implícito y 2.ª del plural, como en ANAF SPV, BCR e ING
// Home'Bank. La tarjeta y el texto para compartir van en 1.ª persona y sin concordar con el género
// («aș primi net cu 12% mai mult»); el desafío nombra a «persoana care v-a trimis provocarea» para no
// suponer el género del amigo. El país va con GRAMATICA.ro («în România», «calculatorul României» o
// «calculatorul din Chile») y los números con pluralRo («în 41 de țări», «în 3 țări»).
const gRo = GRAMATICA.ro;
const SEO_RO = "Ziua libertății fiscale și salariul net în fiecare țară";
const zileRo = (d: number) => pluralRo(d, "zi", "zile");
const enTariRo = (n: number) => `în ${pluralRo(n, "țară", "țări")}`;

const ro: Diccionario<TextosMundo> = {
  base: {
    nombre: "Salariul dumneavoastră în lume",
    seo: {
      titulo: (pais) => [`${SEO_RO} | ${pais}`, SEO_RO, "Salariul dumneavoastră în lume"],
      tituloGlobal: [SEO_RO, "Salariul dumneavoastră în lume"],
      descripcion: (pais, n) => `Aflați până în ce zi a anului lucrați pentru stat cu un salariu ${gRo.en(pais)} și cât ați primi net ${enTariRo(n)}. Gratuit, fără cont.`,
      descripcionGlobal: (n) => `Aflați până în ce zi a anului lucrați pentru stat și cât ar însemna salariul dumneavoastră net ${enTariRo(n)}. Gratuit, fără cont.`,
    },
    ceja: "Ziua dumneavoastră a libertății fiscale",
    h1: "Până în ce zi a anului lucrați pentru stat?",
    bajada: (n) => `Introduceți salariul brut ca să vedeți data. Apoi comparați-o ${enTariRo(n)}, cu aceeași putere de cumpărare și regulile fiscale ale fiecărei țări.`,
    form: {
      titulo: "Salariul dumneavoastră",
      sueldo: "Salariul brut",
      mes: "Pe lună",
      anio: "Pe an",
      periodo: "Perioada salariului",
      pais: "Țara în care lucrați",
      ejemplo: "Exemplu",
      ejemploAyuda: "Este un salariu de exemplu. Introduceți-l pe al dumneavoastră și toate cifrele se actualizează imediat.",
      propio: "Preluat din calculul dumneavoastră.",
      invalido: "Introduceți o sumă mai mare decât zero.",
      pagas: "Salariul lunar din fluturașul de salariu: plățile suplimentare obligatorii prin lege (al 13-lea sau al 14-lea salariu) le adăugăm noi. Salariul net este media pe 12 luni.",
    },
    heroe: {
      hasta: (fecha) => `Lucrați pentru stat până la ${fecha}`,
      tasa: (pct) => `${pct} din salariul dumneavoastră merge la impozitul pe venit și la contribuțiile obligatorii.`,
      dias: (n, total) => `${n} din ${zileRo(total)}`,
      enMano: "Net",
      porMes: "pe lună",
      anio: (anio, n, total) => `${anio}: ${n} din ${zileRo(total)} pentru stat.`,
      resto: "Din ziua următoare, tot ce câștigați rămâne la dumneavoastră.",
    },
    ranking: {
      titulo: "Același salariu în fiecare țară",
      bajada: "Atât ați primi net în fiecare țară, cu aceeași putere de cumpărare. Fiecare rând vine din calculatorul oficial al țării respective. Peste tot e același salariu: se schimbă doar impozitele și contribuțiile, nu cât se câștigă în fiecare țară.",
      lista: "Țări după salariul net",
      buscar: "Căutați o țară",
      filtrar: "Filtrați după regiune",
      todas: "Toate",
      regiones: { americas: "America", europa: "Europa", asia: "Asia și Oceania", africa: "Africa și Orientul Mijlociu" },
      tuPais: "Țara dumneavoastră",
      mejor: "Cele mai mici taxe",
      enMano: "Net pe lună",
      enTuMoneda: "În moneda dumneavoastră",
      vsTuPais: "Față de țara dumneavoastră",
      verTodos: (n) => `Vedeți toate țările (${n})`,
      verMenos: "Vedeți mai puține",
      sinResultados: (q) => `Nicio țară nu corespunde căutării „${q}”.`,
      abrir: (pais) => `Deschideți calculatorul ${gRo.de(pais)}`,
      mas: (pct) => `cu ${pct} mai mult`,
      menos: (pct) => `cu ${pct} mai puțin`,
      igual: "La fel",
      puesto: (p, total) => `Țara dumneavoastră este pe locul ${p} din ${total}.`,
    },
    tarjeta: {
      titulo: "Imaginea dumneavoastră de distribuit",
      bajada: "Arată data și procentele dumneavoastră. Cât câștigați nu apare niciodată.",
      hasta: (fecha) => `Lucrez pentru stat până la ${fecha}`,
      tasa: (pct) => `${pct} din salariul meu merge la impozite`,
      mejor: (pais, pct) => `Cu același salariu, ${gRo.en(pais)} aș plăti taxe mai mici: cu ${pct} mai mult net`,
      mejorPropio: (pais) => `Cu același salariu, cele mai mici taxe le plătesc în ${gRo.nombre(pais)}`,
      yVos: "Dar dumneavoastră?",
      cta: "Aflați-vă data:",
      generica: "Până în ce zi a anului lucrați pentru stat?",
      genericaBajada: (n) => `Salariul dumneavoastră ${enTariRo(n)}, cu calculatorul oficial al fiecăreia`,
      compartir: "Distribuiți imaginea",
      compartirDuelo: "Acceptați provocarea",
      descargar: "Descărcați imaginea",
      copiado: "Linkul a fost copiat. Lipiți-l unde doriți.",
      compartido: "Gata, a fost trimisă.",
      error: "Nu s-a putut distribui. Încercați din nou.",
      texto: (fecha) => `Lucrez pentru stat până la ${fecha}. Dar dumneavoastră?`,
      alt: "Previzualizarea imaginii dumneavoastră",
    },
    duelo: {
      amigo: (fecha) => `Persoana care v-a trimis provocarea lucrează pentru stat până la ${fecha}.`,
      yVos: "Dar dumneavoastră?",
      invitacion: "Introduceți salariul ca să comparați.",
      vos: "Dumneavoastră",
      elAmigo: "Cealaltă persoană",
      dia: "Lucrează pentru stat până la",
      tasa: "Impozite și contribuții",
      mejorPais: "Cele mai mici taxe",
      antes: (d) => `Vă eliberați cu ${zileRo(d)} mai devreme decât cealaltă persoană.`,
      despues: (d) => `Cealaltă persoană se eliberează cu ${zileRo(d)} mai devreme decât dumneavoastră.`,
      empate: "Aveți aceeași zi a libertății fiscale.",
      desde: (pais) => `Lucrează ${gRo.en(pais)}`,
    },
    cero: {
      dia: "nicio zi",
      heroeAntes: "Lucrați pentru stat",
      tarjetaAntes: "Lucrez pentru stat",
      motivo: "Din acest salariu nu se rețin nici impozit pe venit, nici contribuții obligatorii.",
      texto: "Anul acesta nu lucrez nicio zi pentru stat. Dar dumneavoastră?",
      amigo: "Persoana care v-a trimis provocarea nu lucrează nicio zi pentru stat.",
    },
    metodo: {
      titulo: "Cum calculăm",
      estimacion: "Este o estimare pentru a compara țări, nu un fluturaș de salariu. Deducerile, copiii sau primele pot schimba cifra dumneavoastră.",
      supuestos: [
        "O persoană necăsătorită și fără copii, cu valorile implicite din calculatorul fiecărei țări.",
        "Salariul net este ce rămâne după impozitul pe venit și contribuțiile plătite de angajat. Taxele pe consum și contribuțiile angajatorului nu intră în calcul.",
        "Al 13-lea salariu și celelalte plăți suplimentare obligatorii se împart pe an așa cum prevede legea fiecărei țări.",
        "În Statele Unite nu se adaugă impozitul statal și cel local: doar impozitul federal și contribuțiile pe salariu.",
        "Ca să mutăm salariul dumneavoastră în altă țară folosim paritatea puterii de cumpărare (PPC): același nivel de trai, nu cursul de schimb de astăzi.",
        "PPC-ul Argentinei se actualizează cu indicele prețurilor de consum al INDEC, pentru că Banca Mondială îl publică doar până în 2021.",
        "Ziua libertății împarte impozitele pe tot anul, începând cu 1 ianuarie. Dacă 30% din salariu merge la impozite, lucrați pentru stat 30% din an.",
      ],
      ppaTitulo: "Paritatea puterii de cumpărare",
      bancoMundial: "Banca Mondială",
      ppa: (organismo, indicador, anio) => `${organismo}, indicatorul ${indicador}, ultimul an disponibil: ${anio}.`,
      consultado: (fecha) => `Consultat la ${fecha}.`,
      verFuente: "Vedeți sursa",
      fuentesTitulo: "Sursa fiecărei țări",
      fuentesBajada: "Fiecare rând folosește calculatorul de salariu net al țării respective și datele ei oficiale.",
      verificado: (fecha) => `Date verificate la ${fecha}`,
      sello: (fecha) => `Date oficiale verificate la sursa fiecărei țări. Cea mai veche verificare: ${fecha}.`,
    },
    faqTitulo: "Întrebări frecvente",
    faq: (n) => [
      {
        pregunta: "Ce este ziua libertății fiscale?",
        respuesta:
          "Este ziua din an în care terminați de plătit impozitele, dacă tot ce câștigați de la 1 ianuarie ar merge mai întâi la stat. Aici se calculează cu salariul dumneavoastră, nu cu media țării.",
      },
      {
        pregunta: "De ce comparația se face după puterea de cumpărare?",
        respuesta: "Din cauza cursului de schimb, un salariu poate părea uriaș sau foarte mic în funcție de zi. PPC-ul compară ce se poate cumpăra cu adevărat cu acești bani în fiecare țară.",
      },
      {
        pregunta: "Se salvează salariul meu?",
        respuesta: "Nu. Calculul se face în browserul dumneavoastră. Ce distribuiți conține doar date, procente și țări.",
      },
      {
        pregunta: "De ce salariul meu net real este altul?",
        respuesta:
          "Pornim de la o persoană necăsătorită, fără copii și cu valorile implicite. Deducerile, primele sau regimurile speciale schimbă cifra. Pentru un calcul exact pentru situația dumneavoastră, deschideți calculatorul țării în care lucrați.",
      },
      {
        pregunta: "Ce țări sunt incluse?",
        respuesta: `Astăzi lista are ${pluralRo(n, "țară", "țări")}, fiecare cu calculatorul ei de salariu net și cu date oficiale. Adăugăm altele imediat ce le verificăm regulile fiscale.`,
      },
    ],
    destacado: {
      ceja: "Comparație mondială",
      titulo: "Până în ce zi a anului lucrați pentru stat?",
      texto: "Introduceți salariul și vedeți cât ați primi net în alte țări.",
      ir: "Aflați-vă data",
    },
  },
};

// ───────────────────────────── cs ─────────────────────────────

// Checo (ADR 0002, D19): vykání con «vy» en minúscula, como Finanční správa y los bancos; la
// tarjeta y el texto para compartir, en primera persona. Nada de participios ni adjetivos sobre la
// persona (llevan género: «byl jste», «volná»): las frases van en presente o impersonales. El país
// se declina con GRAMATICA.cs y los días con pluralCs.
const gCs = GRAMATICA.cs;
const SEO_CS = "Den daňové svobody a čistá mzda ve světě";
const diasCs = (d: number) => pluralCs(d, "den", "dny", "dní");

const cs: Diccionario<TextosMundo> = {
  base: {
    nombre: "Vaše mzda ve světě",
    seo: {
      titulo: (pais) => [`${SEO_CS} | ${pais}`, SEO_CS, "Vaše mzda ve světě"],
      tituloGlobal: [SEO_CS, "Vaše mzda ve světě"],
      descripcion: (pais, n) => `Zjistěte, do kterého dne v roce pracujete se svou mzdou ${gCs.en(pais)} pro stát a kolik by vám zůstalo čistého v ${n} zemích. Zdarma, bez registrace.`,
      descripcionGlobal: (n) => `Zjistěte, do kterého dne v roce pracujete pro stát a kolik by vám z vaší mzdy zůstalo čistého v ${n} zemích. Zdarma, bez registrace.`,
    },
    ceja: "Váš Den daňové svobody",
    h1: "Do kterého dne v roce pracujete pro stát?",
    bajada: (n) => `Zadejte hrubou mzdu a uvidíte své datum. Pak ho porovnejte v ${n} zemích, se stejnou kupní silou a s daňovými pravidly každé země.`,
    form: {
      titulo: "Vaše mzda",
      sueldo: "Hrubá mzda",
      mes: "Měsíčně",
      anio: "Ročně",
      periodo: "Období mzdy",
      pais: "Země, kde pracujete",
      ejemplo: "Příklad",
      ejemploAyuda: "Toto je ukázková mzda. Zadejte svou a všechna čísla se hned přepočítají.",
      propio: "Převzato z vašeho výpočtu.",
      invalido: "Zadejte částku větší než nula.",
      pagas: "Měsíční mzda podle výplatní pásky: zákonné mzdy navíc (13. nebo 14. plat) připočítáme sami. Čistá mzda je průměr za 12 měsíců.",
    },
    heroe: {
      hasta: (fecha) => `Pro stát pracujete do ${fecha}`,
      tasa: (pct) => `${pct} vaší mzdy jde na daň z příjmů a povinné pojistné.`,
      dias: (n, total) => `${n} z ${total} dní`,
      enMano: "Čistého vám zůstane",
      porMes: "měsíčně",
      anio: (anio, n, total) => `Rok ${anio}: ${n} z ${total} dní pro stát.`,
      resto: "Ode dne, který následuje, patří všechno, co vyděláte, vám.",
    },
    ranking: {
      titulo: "Stejná mzda, země po zemi",
      bajada: "Tolik by vám čistého zůstalo v každé zemi při stejné kupní síle. Každý řádek pochází z oficiální kalkulačky dané země. Všude stejná mzda: mění se jen daně a odvody, ne to, kolik se v dané zemi vydělává.",
      lista: "Země seřazené podle čisté mzdy",
      buscar: "Hledat zemi",
      filtrar: "Filtrovat podle regionu",
      todas: "Vše",
      regiones: { americas: "Amerika", europa: "Evropa", asia: "Asie a Oceánie", africa: "Afrika a Blízký východ" },
      tuPais: "Vaše země",
      mejor: "Nejnižší daně",
      enMano: "Čistého měsíčně",
      enTuMoneda: "Ve vaší měně",
      vsTuPais: "Ve srovnání s vaší zemí",
      verTodos: (n) => `Zobrazit všechny země (${n})`,
      verMenos: "Zobrazit méně",
      sinResultados: (q) => `Hledání „${q}“ neodpovídá žádná země.`,
      abrir: (pais) => `Otevřít kalkulačku ${gCs.para(pais)}`,
      mas: (pct) => `o ${pct} víc`,
      menos: (pct) => `o ${pct} méně`,
      igual: "Stejně",
      puesto: (p, total) => `Vaše země je na ${p}. místě z ${total}.`,
    },
    tarjeta: {
      titulo: "Vaše karta ke sdílení",
      bajada: "Ukazuje vaše datum a procenta. Kolik vyděláváte, na ní nikdy není.",
      hasta: (fecha) => `Pro stát pracuji do ${fecha}`,
      tasa: (pct) => `${pct} mé mzdy jde na daně`,
      mejor: (pais, pct) => `Se stejnou mzdou bych ${gCs.en(pais)} platil méně na daních: o ${pct} víc čistého`,
      mejorPropio: (pais) => `S mou mzdou mi nikde nezůstane víc než ${gCs.en(pais)}`,
      yVos: "A vy?",
      cta: "Zjistěte své datum:",
      generica: "Do kterého dne v roce pracujete pro stát?",
      genericaBajada: (n) => `Vaše mzda v ${n} zemích, podle oficiální kalkulačky každé z nich`,
      compartir: "Sdílet kartu",
      compartirDuelo: "Odpovědět na výzvu",
      descargar: "Stáhnout obrázek",
      copiado: "Odkaz je zkopírovaný. Vložte ho, kam potřebujete.",
      compartido: "Hotovo, odesláno.",
      error: "Sdílení se nepovedlo. Zkuste to znovu.",
      texto: (fecha) => `Pro stát pracuji do ${fecha}. A vy?`,
      alt: "Náhled vaší karty",
    },
    duelo: {
      amigo: (fecha) => `Ten, kdo vám odkaz poslal, pracuje pro stát do ${fecha}.`,
      yVos: "A vy?",
      invitacion: "Zadejte svou mzdu a porovnejte se.",
      vos: "Vy",
      elAmigo: "Odesílatel",
      dia: "Pro stát pracuje do",
      tasa: "Daně a pojistné",
      mejorPais: "Nejnižší daně",
      antes: (d) => `Vaše svoboda začíná o ${diasCs(d)} dřív než u odesílatele.`,
      despues: (d) => `Odesílatel má svobodu o ${diasCs(d)} dřív než vy.`,
      empate: "Svoboda vám oběma začíná ve stejný den.",
      desde: (pais) => `Pracuje ${gCs.en(pais)}`,
    },
    cero: {
      dia: "nula dní",
      heroeAntes: "Pro stát pracujete",
      tarjetaAntes: "Pro stát pracuji",
      motivo: "Z této mzdy se nestrhává daň z příjmů ani povinné pojistné.",
      texto: "Letos nepracuji pro stát ani jeden den. A vy?",
      amigo: "Ten, kdo vám odkaz poslal, nepracuje pro stát ani jeden den.",
    },
    metodo: {
      titulo: "Jak počítáme",
      estimacion: "Jde o odhad pro srovnání zemí, ne o výplatní pásku. Slevy na dani, děti nebo prémie mohou vaše číslo změnit.",
      supuestos: [
        "Svobodná osoba bez dětí, s výchozími hodnotami kalkulačky každé země.",
        "Čistá mzda je to, co zbude po dani z příjmů a pojistném, které platí sám zaměstnanec. Daně ze spotřeby a odvody zaměstnavatele se nepočítají.",
        "Třináctý plat nebo jiné povinné mzdy navíc se rozpočítají do roku tak, jak to stanoví zákon každé země.",
        "Ve Spojených státech se nepřipočítává daň jednotlivých států ani místní daň: jen federální daň a odvody ze mzdy.",
        "Pro převod vaší mzdy do jiné země používáme paritu kupní síly (PPP): stejná životní úroveň, ne dnešní směnný kurz.",
        "PPP Argentiny se aktualizuje indexem spotřebitelských cen INDEC, protože Světová banka ji zveřejňuje jen do roku 2021.",
        "Den svobody rozkládá daně do roku od 1. ledna. Když na daně jde 30 % mzdy, pracujete pro stát 30 % roku.",
      ],
      ppaTitulo: "Parita kupní síly",
      bancoMundial: "Světová banka",
      ppa: (organismo, indicador, anio) => `${organismo}, ukazatel ${indicador}, poslední dostupný rok: ${anio}.`,
      consultado: (fecha) => `Ověřeno ${fecha}.`,
      verFuente: "Zobrazit zdroj",
      fuentesTitulo: "Zdroj každé země",
      fuentesBajada: "Každý řádek používá kalkulačku čisté mzdy dané země a její oficiální údaje.",
      verificado: (fecha) => `Údaje ověřeny ${fecha}`,
      sello: (fecha) => `Oficiální údaje ověřené u zdroje každé země. Nejstarší ověření: ${fecha}.`,
    },
    faqTitulo: "Časté otázky",
    faq: (n) => [
      {
        pregunta: "Co je Den daňové svobody?",
        respuesta:
          "Je to den v roce, kdy byste měli zaplacené daně a pojistné, kdyby všechno, co vyděláte od 1. ledna, šlo nejdřív státu. Tady ho počítáme z vaší mzdy, ne z průměru země.",
      },
      {
        pregunta: "Proč srovnáváme podle kupní síly?",
        respuesta: "Podle směnného kurzu může mzda působit obrovsky nebo nepatrně, podle toho, jaký je den. Parita kupní síly porovnává, co si za ty peníze v každé zemi opravdu koupíte.",
      },
      {
        pregunta: "Ukládá se moje mzda?",
        respuesta: "Ne. Výpočet probíhá ve vašem prohlížeči. To, co sdílíte, obsahuje jen data, procenta a země.",
      },
      {
        pregunta: "Proč se moje skutečná čistá mzda liší?",
        respuesta:
          "Počítáme se svobodnou osobou bez dětí a s výchozími hodnotami. Slevy na dani, prémie nebo zvláštní režimy číslo mění. Pro přesný výpočet vaší situace otevřete kalkulačku své země.",
      },
      {
        pregunta: "Které země tu jsou?",
        respuesta: `Dnes ${pluralCs(n, "země", "země", "zemí")}, každá s vlastní kalkulačkou čisté mzdy a oficiálními údaji. Další přidáváme, jakmile ověříme jejich daňová pravidla.`,
      },
    ],
    destacado: {
      ceja: "Světové srovnání",
      titulo: "Do kterého dne v roce pracujete pro stát?",
      texto: "Zadejte mzdu a podívejte se, kolik by vám čistého zůstalo v jiných zemích.",
      ir: "Zjistit své datum",
    },
  },
};

// ───────────────────────────── el ─────────────────────────────

// Griego (ADR 0002, D20): πληθυντικός ευγενείας, como gov.gr, myAADE y los bancos; la tarjeta y el
// texto para compartir, en primera persona. Nada de participios ni adjetivos con género sobre quien
// lee o sobre quien mandó el enlace («το άτομο που σας έστειλε τον σύνδεσμο», «Αποστολέας» como
// rótulo). El país va con GRAMATICA.el y las cantidades con pluralEl. Intl da las fechas como «24
// Οκτωβρίου» (mes en genitivo): delante va «μέχρι τις», y «μέχρι την» para el día 1.
const gEl = GRAMATICA.el;
const SEO_EL = "Ημέρα Φορολογικής Ελευθερίας και καθαρός μισθός στον κόσμο";
const diasEl = (d: number) => pluralEl(d, "ημέρα", "ημέρες");
const paisesEl = (n: number) => pluralEl(n, "χώρα", "χώρες");
const hastaEl = (fecha: string) => (/^1\s/.test(fecha) ? `μέχρι την ${fecha}` : `μέχρι τις ${fecha}`);

const el: Diccionario<TextosMundo> = {
  base: {
    nombre: "Ο μισθός σας στον κόσμο",
    seo: {
      titulo: (pais) => [`${SEO_EL} | ${pais}`, SEO_EL, "Ο μισθός σας στον κόσμο"],
      tituloGlobal: [SEO_EL, "Ο μισθός σας στον κόσμο"],
      descripcion: (pais, n) =>
        `Δείτε μέχρι ποια ημέρα του έτους εργάζεστε για το κράτος με τον μισθό σας ${gEl.en(pais)} και πόσα θα σας έμεναν καθαρά σε ${paisesEl(n)}. Δωρεάν, χωρίς εγγραφή.`,
      descripcionGlobal: (n) => `Δείτε μέχρι ποια ημέρα του έτους εργάζεστε για το κράτος και πόσα θα σας έμεναν καθαρά από τον μισθό σας σε ${paisesEl(n)}. Δωρεάν, χωρίς εγγραφή.`,
    },
    ceja: "Η δική σας Ημέρα Φορολογικής Ελευθερίας",
    h1: "Μέχρι ποια ημέρα του έτους εργάζεστε για το κράτος;",
    bajada: (n) => `Εισάγετε τον μικτό μισθό σας και δείτε την ημερομηνία σας. Έπειτα συγκρίνετέ την σε ${paisesEl(n)}, με την ίδια αγοραστική δύναμη και τους φορολογικούς κανόνες κάθε χώρας.`,
    form: {
      titulo: "Ο μισθός σας",
      sueldo: "Μικτός μισθός",
      mes: "Μηνιαίως",
      anio: "Ετησίως",
      periodo: "Περίοδος μισθού",
      pais: "Χώρα όπου εργάζεστε",
      ejemplo: "Παράδειγμα",
      ejemploAyuda: "Αυτός είναι ένας μισθός για παράδειγμα. Εισάγετε τον δικό σας και όλοι οι αριθμοί υπολογίζονται αμέσως ξανά.",
      propio: "Από τον δικό σας υπολογισμό.",
      invalido: "Εισάγετε ποσό μεγαλύτερο από το μηδέν.",
      pagas: "Μηνιαίος μισθός όπως στη μισθοδοσία: τους επιπλέον μισθούς που ορίζει ο νόμος (δώρα, επίδομα αδείας, 13ος ή 14ος μισθός) τους προσθέτουμε εμείς. Ο καθαρός μισθός είναι ο μέσος όρος των 12 μηνών.",
    },
    heroe: {
      hasta: (fecha) => `Εργάζεστε για το κράτος ${hastaEl(fecha)}`,
      tasa: (pct) => `Το ${pct} του μισθού σας πηγαίνει σε φόρο εισοδήματος και υποχρεωτικές εισφορές.`,
      dias: (n, total) => `${n} από ${total} ημέρες`,
      enMano: "Σας μένουν καθαρά",
      porMes: "τον μήνα",
      anio: (anio, n, total) => `Έτος ${anio}: ${n} από ${total} ημέρες για το κράτος.`,
      resto: "Από την επόμενη ημέρα, ό,τι κερδίζετε είναι δικό σας.",
    },
    ranking: {
      titulo: "Ο ίδιος μισθός, χώρα προς χώρα",
      bajada: "Τόσα θα σας έμεναν καθαρά σε κάθε χώρα με την ίδια αγοραστική δύναμη. Κάθε γραμμή προέρχεται από τον επίσημο υπολογισμό της χώρας. Παντού ο ίδιος μισθός: αλλάζουν μόνο οι φόροι και οι εισφορές, όχι το πόσα κερδίζει κανείς σε κάθε χώρα.",
      lista: "Χώρες ταξινομημένες κατά καθαρό μισθό",
      buscar: "Αναζήτηση χώρας",
      filtrar: "Φιλτράρισμα ανά περιοχή",
      todas: "Όλες",
      regiones: { americas: "Αμερική", europa: "Ευρώπη", asia: "Ασία και Ωκεανία", africa: "Αφρική και Μέση Ανατολή" },
      tuPais: "Η χώρα σας",
      mejor: "Λιγότεροι φόροι",
      enMano: "Καθαρά τον μήνα",
      enTuMoneda: "Στο νόμισμά σας",
      vsTuPais: "Σε σχέση με τη χώρα σας",
      verTodos: (n) => `Όλες οι χώρες (${n})`,
      verMenos: "Λιγότερες",
      sinResultados: (q) => `Καμία χώρα δεν ταιριάζει με την αναζήτηση «${q}».`,
      abrir: (pais) => `Ανοίξτε τον υπολογισμό ${gEl.para(pais)}`,
      mas: (pct) => `${pct} περισσότερα`,
      menos: (pct) => `${pct} λιγότερα`,
      igual: "Το ίδιο",
      puesto: (p, total) => `Η χώρα σας είναι στη θέση ${p} από ${total}.`,
    },
    tarjeta: {
      titulo: "Η κάρτα σας για κοινοποίηση",
      bajada: "Δείχνει την ημερομηνία σας και τα ποσοστά. Το πόσο κερδίζετε δεν εμφανίζεται ποτέ.",
      hasta: (fecha) => `Εργάζομαι για το κράτος ${hastaEl(fecha)}`,
      tasa: (pct) => `Το ${pct} του μισθού μου πηγαίνει σε φόρους`,
      mejor: (pais, pct) => `Με τον ίδιο μισθό, ${gEl.en(pais)} θα πλήρωνα λιγότερους φόρους: ${pct} περισσότερα καθαρά`,
      mejorPropio: (pais) => `Με τον μισθό μου, καμία χώρα δεν μου αφήνει περισσότερα καθαρά από ${casosEl(pais).acusativo}`,
      yVos: "Κι εσείς;",
      cta: "Βρείτε τη δική σας ημερομηνία:",
      generica: "Μέχρι ποια ημέρα του έτους εργάζεστε για το κράτος;",
      genericaBajada: (n) => `Ο μισθός σας σε ${paisesEl(n)}, με τον επίσημο υπολογισμό της καθεμίας`,
      compartir: "Κοινοποίηση κάρτας",
      compartirDuelo: "Απάντηση στην πρόκληση",
      descargar: "Λήψη εικόνας",
      copiado: "Ο σύνδεσμος αντιγράφηκε. Επικολλήστε τον όπου θέλετε.",
      compartido: "Έτοιμο, στάλθηκε.",
      error: "Η κοινοποίηση δεν ολοκληρώθηκε. Δοκιμάστε ξανά.",
      texto: (fecha) => `Εργάζομαι για το κράτος ${hastaEl(fecha)}. Εσείς;`,
      alt: "Προεπισκόπηση της κάρτας σας",
    },
    duelo: {
      amigo: (fecha) => `Το άτομο που σας έστειλε τον σύνδεσμο εργάζεται για το κράτος ${hastaEl(fecha)}.`,
      yVos: "Κι εσείς;",
      invitacion: "Εισάγετε τον μισθό σας και συγκρίνετε.",
      vos: "Εσείς",
      elAmigo: "Αποστολέας",
      dia: "Εργασία για το κράτος έως",
      tasa: "Φόροι και εισφορές",
      mejorPais: "Λιγότεροι φόροι",
      antes: (d) => `Η ελευθερία σας ξεκινά ${diasEl(d)} νωρίτερα από ό,τι για το άτομο που σας έστειλε τον σύνδεσμο.`,
      despues: (d) => `Για το άτομο που σας έστειλε τον σύνδεσμο, η ελευθερία ξεκινά ${diasEl(d)} νωρίτερα από ό,τι για εσάς.`,
      empate: "Η ελευθερία ξεκινά την ίδια ημέρα και στις δύο περιπτώσεις.",
      desde: (pais) => `Εργάζεται ${gEl.en(pais)}`,
    },
    cero: {
      dia: "ούτε μία ημέρα",
      heroeAntes: "Για το κράτος δεν εργάζεστε",
      tarjetaAntes: "Για το κράτος δεν εργάζομαι",
      motivo: "Από αυτόν τον μισθό δεν παρακρατείται φόρος εισοδήματος ούτε υποχρεωτικές εισφορές.",
      texto: "Φέτος δεν εργάζομαι ούτε μία ημέρα για το κράτος. Εσείς;",
      amigo: "Το άτομο που σας έστειλε τον σύνδεσμο δεν εργάζεται ούτε μία ημέρα για το κράτος.",
    },
    metodo: {
      titulo: "Πώς υπολογίζουμε",
      estimacion: "Πρόκειται για εκτίμηση για τη σύγκριση χωρών, όχι για εκκαθαριστικό μισθοδοσίας. Εκπτώσεις φόρου, παιδιά ή επιδόματα μπορούν να αλλάξουν τον αριθμό σας.",
      supuestos: [
        "Ένα άγαμο άτομο χωρίς παιδιά, με τις προεπιλεγμένες τιμές του υπολογισμού κάθε χώρας.",
        "Ο καθαρός μισθός είναι ό,τι μένει μετά τον φόρο εισοδήματος και τις εισφορές που βαρύνουν τον εργαζόμενο. Οι φόροι κατανάλωσης και οι εισφορές του εργοδότη δεν υπολογίζονται.",
        "Ο 13ος μισθός ή άλλοι υποχρεωτικοί επιπλέον μισθοί κατανέμονται στο έτος όπως ορίζει ο νόμος κάθε χώρας.",
        "Στις Ηνωμένες Πολιτείες δεν προστίθενται οι φόροι των πολιτειών ούτε οι τοπικοί: μόνο ο ομοσπονδιακός φόρος και οι εισφορές επί του μισθού.",
        "Για να μεταφέρουμε τον μισθό σας σε άλλη χώρα χρησιμοποιούμε την ισοτιμία αγοραστικής δύναμης (ΙΑΔ): το ίδιο βιοτικό επίπεδο, όχι τη σημερινή συναλλαγματική ισοτιμία.",
        "Η ΙΑΔ της Αργεντινής ενημερώνεται με τον δείκτη τιμών καταναλωτή του INDEC, επειδή η Παγκόσμια Τράπεζα τη δημοσιεύει μόνο έως το 2021.",
        "Η Ημέρα Φορολογικής Ελευθερίας κατανέμει τους φόρους στο έτος από την 1η Ιανουαρίου. Αν το 30% του μισθού πηγαίνει σε φόρους, εργάζεστε για το κράτος το 30% του έτους.",
      ],
      ppaTitulo: "Ισοτιμία αγοραστικής δύναμης",
      bancoMundial: "Παγκόσμια Τράπεζα",
      ppa: (organismo, indicador, anio) => `${organismo}, δείκτης ${indicador}, τελευταίο διαθέσιμο έτος: ${anio}.`,
      consultado: (fecha) => `Έλεγχος: ${fecha}.`,
      verFuente: "Προβολή πηγής",
      fuentesTitulo: "Η πηγή κάθε χώρας",
      fuentesBajada: "Κάθε γραμμή χρησιμοποιεί τον υπολογισμό καθαρού μισθού της χώρας και τα επίσημα στοιχεία της.",
      verificado: (fecha) => `Έλεγχος στοιχείων: ${fecha}`,
      sello: (fecha) => `Επίσημα στοιχεία, ελεγμένα στην πηγή κάθε χώρας. Παλαιότερος έλεγχος: ${fecha}.`,
    },
    faqTitulo: "Συχνές ερωτήσεις",
    faq: (n) => [
      {
        pregunta: "Τι είναι η Ημέρα Φορολογικής Ελευθερίας;",
        respuesta:
          "Είναι η ημέρα του έτους κατά την οποία θα είχατε πληρώσει φόρους και εισφορές, αν ό,τι κερδίζετε από την 1η Ιανουαρίου πήγαινε πρώτα στο κράτος. Εδώ την υπολογίζουμε με τον δικό σας μισθό, όχι με τον μέσο όρο της χώρας.",
      },
      {
        pregunta: "Γιατί η σύγκριση γίνεται με την αγοραστική δύναμη;",
        respuesta:
          "Με τη συναλλαγματική ισοτιμία ένας μισθός μπορεί να φαίνεται τεράστιος ή ελάχιστος, ανάλογα με την ημέρα. Η ισοτιμία αγοραστικής δύναμης συγκρίνει τι αγοράζουν πραγματικά αυτά τα χρήματα σε κάθε χώρα.",
      },
      {
        pregunta: "Αποθηκεύεται ο μισθός μου;",
        respuesta: "Όχι. Ο υπολογισμός γίνεται στο πρόγραμμα περιήγησής σας. Ό,τι κοινοποιείτε περιέχει μόνο ημερομηνίες, ποσοστά και χώρες.",
      },
      {
        pregunta: "Γιατί ο πραγματικός καθαρός μισθός μου είναι διαφορετικός;",
        respuesta:
          "Υπολογίζουμε ένα άγαμο άτομο χωρίς παιδιά με τις προεπιλεγμένες τιμές. Εκπτώσεις φόρου, επιδόματα ή ειδικά καθεστώτα αλλάζουν τον αριθμό. Για ακριβή υπολογισμό της δικής σας περίπτωσης, ανοίξτε τον υπολογισμό της χώρας σας.",
      },
      {
        pregunta: "Ποιες χώρες περιλαμβάνονται;",
        respuesta: `Σήμερα ${paisesEl(n)}, η καθεμία με τον δικό της υπολογισμό καθαρού μισθού και επίσημα στοιχεία. Προσθέτουμε κι άλλες μόλις ελέγξουμε τους φορολογικούς τους κανόνες.`,
      },
    ],
    destacado: {
      ceja: "Παγκόσμια σύγκριση",
      titulo: "Μέχρι ποια ημέρα του έτους εργάζεστε για το κράτος;",
      texto: "Εισάγετε τον μισθό σας και δείτε πόσα θα σας έμεναν καθαρά σε άλλες χώρες.",
      ir: "Βρείτε την ημερομηνία σας",
    },
  },
};

// ───────────────────────────── hu ─────────────────────────────

// Húngaro (ADR 0002, D21): tegezés, como OTP y las calculadoras de los portales húngaros; la tarjeta
// y el texto para compartir, en primera persona. El país va con GRAMATICA.hu («Magyarországon», «az
// Egyesült Államokban»). Ningún sufijo se pega a una cifra ni a una fecha: la fecha va con «napjáig»
// («2026. október 24. napjáig») y las cifras tras dos puntos o delante de un sustantivo («3 nap»).
// Las funciones de números se llaman con centinelas (textos-cliente.ts), así que nunca se elige el
// artículo según la cifra: las frases están armadas para no necesitarlo.
const gHu = GRAMATICA.hu;
const SEO_HU = "Adószabadság napja és nettó fizetés a világban";

const hu: Diccionario<TextosMundo> = {
  base: {
    nombre: "A fizetésed a világban",
    seo: {
      titulo: (pais) => [`${SEO_HU} | ${pais}`, SEO_HU, "A fizetésed a világban"],
      tituloGlobal: [SEO_HU, "A fizetésed a világban"],
      descripcion: (pais, n) =>
        `Nézd meg, az év hányadik napjáig dolgozol az államnak a fizetésedből ${gHu.en(pais)}, és mennyi maradna nettóban ${n} országban. Ingyenes, regisztráció nélkül.`,
      descripcionGlobal: (n) => `Nézd meg, az év hányadik napjáig dolgozol az államnak, és mennyi maradna a fizetésedből nettóban ${n} országban. Ingyenes, regisztráció nélkül.`,
    },
    ceja: "A te adószabadság-napod",
    h1: "Az év hányadik napjáig dolgozol az államnak?",
    bajada: (n) => `Add meg a bruttó fizetésedet, és megkapod a dátumodat. Utána összevetheted ${n} országgal, azonos vásárlóerőn és minden ország saját adószabályaival.`,
    form: {
      titulo: "A fizetésed",
      sueldo: "Bruttó fizetés",
      mes: "Havi",
      anio: "Éves",
      periodo: "Fizetési időszak",
      pais: "Az ország, ahol dolgozol",
      ejemplo: "Példa",
      ejemploAyuda: "Ez egy mintafizetés. Írd be a sajátodat, és minden szám azonnal újraszámolódik.",
      propio: "A saját számításodból vettük át.",
      invalido: "Nullánál nagyobb összeget adj meg.",
      pagas: "Havi bruttó bér a bérpapír szerint: a törvényben előírt pluszfizetéseket (13. vagy 14. havi bér) mi számoljuk hozzá. A nettó a 12 hónap átlaga.",
    },
    heroe: {
      hasta: (fecha) => `Az államnak dolgozol ${fecha} napjáig`,
      tasa: (pct) => `A fizetésedből ennyi megy el SZJA-ra és kötelező járulékokra: ${pct}.`,
      dias: (n, total) => `${n} nap az év ${total} napjából`,
      enMano: "Nettóban marad",
      porMes: "havonta",
      anio: (anio, n, total) => `${anio}: ${n} nap az államnak, az év ${total} napjából.`,
      resto: "Másnaptól minden, amit megkeresel, a tiéd.",
    },
    ranking: {
      titulo: "Ugyanaz a fizetés, országról országra",
      bajada: "Ennyi maradna nettóban minden országban, azonos vásárlóerőn. Minden sor az adott ország hivatalos kalkulátorából jön. Mindenhol ugyanaz a fizetés: csak az adók és járulékok változnak, nem az, hogy mennyit keresnek az adott országban.",
      lista: "Az országok a nettó fizetés szerint rendezve",
      buscar: "Ország keresése",
      filtrar: "Szűrés régió szerint",
      todas: "Mind",
      regiones: { americas: "Amerika", europa: "Európa", asia: "Ázsia és Óceánia", africa: "Afrika és a Közel-Kelet" },
      tuPais: "A te országod",
      mejor: "Itt a legkisebb az adó",
      enMano: "Nettó havonta",
      enTuMoneda: "A te pénznemedben",
      vsTuPais: "A te országodhoz képest",
      verTodos: (n) => `Az összes ország (${n})`,
      verMenos: "Kevesebb",
      sinResultados: (q) => `Nincs ilyen ország: „${q}”.`,
      abrir: (pais) => `Kalkulátor megnyitása: ${gHu.nombre(pais)}`,
      mas: (pct) => `több: ${pct}`,
      menos: (pct) => `kevesebb: ${pct}`,
      igual: "Ugyanannyi",
      puesto: (p, total) => `Az országod helyezése: ${p}. hely, összesen ${total} ország közül.`,
    },
    tarjeta: {
      titulo: "A megosztható kártyád",
      bajada: "A dátumodat és a százalékot mutatja. Azt, hogy mennyit keresel, soha.",
      hasta: (fecha) => `Az államnak dolgozom ${fecha} napjáig`,
      tasa: (pct) => `A fizetésemből ennyi megy el adóra: ${pct}`,
      mejor: (pais, pct) => `Ugyanebből a fizetésből ${gHu.en(pais)} kevesebb adót fizetnék: +${pct} nettó`,
      mejorPropio: (pais) => `Ebből a fizetésből sehol sem maradna több, mint ${gHu.en(pais)}`,
      yVos: "És te?",
      cta: "Nézd meg a saját dátumodat:",
      generica: "Az év hányadik napjáig dolgozol az államnak?",
      genericaBajada: (n) => `A fizetésed ${n} országban, mindegyik ország hivatalos kalkulátorával`,
      compartir: "Kártya megosztása",
      compartirDuelo: "Elfogadom a kihívást",
      descargar: "Kép letöltése",
      copiado: "A linket kimásoltuk. Illeszd be, ahová szeretnéd.",
      compartido: "Kész, elküldve.",
      error: "Nem sikerült megosztani. Próbáld újra.",
      texto: (fecha) => `Idén ${fecha} napjáig dolgozom az államnak. És te?`,
      alt: "A kártyád előnézete",
    },
    duelo: {
      amigo: (fecha) => `Aki ezt küldte neked, ${fecha} napjáig dolgozik az államnak.`,
      yVos: "És te?",
      invitacion: "Írd be a fizetésedet, és mérd össze magad vele.",
      vos: "Te",
      elAmigo: "A küldő",
      dia: "Az államnak dolgozik eddig",
      tasa: "Adók és járulékok",
      mejorPais: "Itt a legkisebb az adó",
      antes: (d) => `A te szabadságod ${d} nappal korábban kezdődik, mint a küldőé.`,
      despues: (d) => `A küldő szabadsága ${d} nappal korábban kezdődik, mint a tiéd.`,
      empate: "Mindkettőtök szabadsága ugyanazon a napon kezdődik.",
      desde: (pais) => `${mayusculaHu(gHu.en(pais))} dolgozik`,
    },
    cero: {
      dia: "nulla nap",
      heroeAntes: "Ennyit dolgozol az államnak:",
      tarjetaAntes: "Ennyit dolgozom az államnak:",
      motivo: "Ebből a fizetésből nem vonnak le sem SZJA-t, sem kötelező járulékot.",
      texto: "Idén egyetlen napot sem dolgozom az államnak. És te?",
      amigo: "Aki ezt küldte neked, egyetlen napot sem dolgozik az államnak.",
    },
    metodo: {
      titulo: "Hogyan számolunk",
      estimacion: "Ez becslés az országok összevetéséhez, nem bérjegyzék. Adókedvezmények, gyerekek vagy prémiumok módosíthatják a te számodat.",
      supuestos: [
        "Egyedülálló, gyermektelen személy, minden ország kalkulátorának alapértékeivel.",
        "A nettó fizetés az, ami a jövedelemadó és a munkavállaló által fizetett járulékok után marad. A fogyasztási adókat és a munkáltatói járulékokat nem számoljuk.",
        "A 13. havi bért és a többi kötelező pluszfizetést úgy osztjuk el az évre, ahogy az adott ország törvénye előírja.",
        "Az Egyesült Államokban nem számoljuk az egyes államok és a helyi önkormányzatok adóját: csak a szövetségi adót és a bérhez kötött járulékokat.",
        "A fizetésed más országba való átszámításához vásárlóerő-paritást (PPP) használunk: azonos életszínvonalat, nem a mai árfolyamot.",
        "Argentína vásárlóerő-paritását az INDEC fogyasztói árindexével frissítjük, mert a Világbank csak a 2021. évig közli.",
        "Az adószabadság napja január elsejétől osztja el az adókat az évre. Ha az adók a fizetés 30 százalékát viszik el, az év 30 százalékában az államnak dolgozol.",
      ],
      ppaTitulo: "Vásárlóerő-paritás",
      bancoMundial: "Világbank",
      ppa: (organismo, indicador, anio) => `${organismo}, mutató: ${indicador}, legutóbbi elérhető év: ${anio}.`,
      consultado: (fecha) => `Ellenőrizve: ${fecha}.`,
      verFuente: "Forrás megnyitása",
      fuentesTitulo: "Az egyes országok forrásai",
      fuentesBajada: "Minden sor az adott ország nettóbér-kalkulátorát és hivatalos adatait használja.",
      verificado: (fecha) => `Adatok ellenőrizve: ${fecha}`,
      sello: (fecha) => `Hivatalos adatok, minden ország forrásánál ellenőrizve. A legrégebbi ellenőrzés: ${fecha}.`,
    },
    faqTitulo: "Gyakori kérdések",
    faq: (n) => [
      {
        pregunta: "Mi az adószabadság napja?",
        respuesta:
          "Az a nap az évben, amikorra kifizetnéd az adókat és a járulékokat, ha mindaz, amit január elsejétől megkeresel, először az államhoz kerülne. Itt a saját fizetésedből számoljuk, nem az országos átlagból.",
      },
      {
        pregunta: "Miért vásárlóerő szerint hasonlítunk össze?",
        respuesta: "Árfolyamon számolva egy fizetés a naptól függően óriásinak vagy aprónak tűnhet. A vásárlóerő-paritás azt veti össze, mit veszel meg valójában abból a pénzből az egyes országokban.",
      },
      {
        pregunta: "Elmentitek a fizetésemet?",
        respuesta: "Nem. A számítás a böngésződben fut. Amit megosztasz, abban csak dátumok, százalékok és országok vannak.",
      },
      {
        pregunta: "Miért más a valódi nettó fizetésem?",
        respuesta:
          "Egyedülálló, gyermektelen személlyel és alapértékekkel számolunk. Adókedvezmények, prémiumok vagy különleges szabályok módosítják az eredményt. A saját helyzeted pontos kiszámításához nyisd meg a te országod kalkulátorát.",
      },
      {
        pregunta: "Mely országok szerepelnek?",
        respuesta: `Jelenleg ${n} ország, mindegyik saját nettóbér-kalkulátorral és hivatalos adatokkal. Újabbakat is felveszünk, amint ellenőriztük az adószabályaikat.`,
      },
    ],
    destacado: {
      ceja: "Nemzetközi összevetés",
      titulo: "Az év hányadik napjáig dolgozol az államnak?",
      texto: "Add meg a fizetésedet, és nézd meg, mennyi maradna nettóban más országokban.",
      ir: "Megnézem a dátumomat",
    },
  },
};

// ───────────────────────────── he ─────────────────────────────

// Hebreo con el plural inclusivo del resto del sitio (ADR 0002, D22): «הזינו», «אתם עובדים». La
// tarjeta habla en primera persona. Los días y los países van con pluralHe (dual: «יומיים»).
const gHe = GRAMATICA.he;
const SEO_HE = "יום החופש ממס ושכר נטו בעולם";
const PAISES_HE: FormasHe = { uno: "מדינה אחת", dos: "שתי מדינות", otros: "{n} מדינות" };

const he: Diccionario<TextosMundo> = {
  base: {
    nombre: "השכר שלכם בעולם",
    seo: {
      titulo: (pais) => [`${SEO_HE} | ${pais}`, SEO_HE, "השכר שלכם בעולם"],
      tituloGlobal: [SEO_HE, "השכר שלכם בעולם"],
      descripcion: (pais, n) => `עד איזה יום בשנה אתם עובדים בשביל המדינה עם השכר שלכם ${gHe.en(pais)}, וכמה נשאר לכם ממנו ב-${pluralHe(n, PAISES_HE)}. בחינם ובלי הרשמה.`,
      descripcionGlobal: (n) => `עד איזה יום בשנה אתם עובדים בשביל המדינה, וכמה נשאר לכם מהשכר ב-${pluralHe(n, PAISES_HE)}. בחינם ובלי הרשמה.`,
    },
    ceja: "יום החופש ממס שלכם",
    h1: "עד איזה יום בשנה אתם עובדים בשביל המדינה?",
    bajada: (n) => `הזינו את השכר ברוטו כדי לראות את התאריך שלכם. אחר כך השוו אותו ב-${pluralHe(n, PAISES_HE)}, באותו כוח קנייה ולפי כללי המס של כל מדינה.`,
    form: {
      titulo: "השכר שלכם",
      sueldo: "שכר ברוטו",
      mes: "חודשי",
      anio: "שנתי",
      periodo: "תקופת השכר",
      pais: "המדינה שבה אתם עובדים",
      ejemplo: "דוגמה",
      ejemploAyuda: "זה שכר לדוגמה. הזינו את השכר שלכם והתוצאות יתעדכנו מיד.",
      propio: "הועבר מהחישוב הקודם שלכם.",
      invalido: "הזינו סכום גדול מאפס.",
      pagas: "זה השכר החודשי שבתלוש, ואנחנו מוסיפים לו את התשלומים הנוספים שהחוק מחייב. השכר נטו הוא הממוצע על פני 12 חודשים.",
    },
    heroe: {
      hasta: (fecha) => `אתם עובדים בשביל המדינה עד ${fecha}`,
      tasa: (pct) => `${pct} מהשכר שלכם הולכים למס הכנסה ולביטוח הסוציאלי.`,
      dias: (n, total) => `${n} מתוך ${pluralHe(total, DIAS_HE)}`,
      enMano: "נשאר לכם",
      porMes: "לחודש",
      anio: (anio, n, total) => `${anio}: ${n} מתוך ${pluralHe(total, DIAS_HE)} בשביל המדינה.`,
      resto: "מהיום שאחרי, מה שאתם מרוויחים נשאר לכם.",
    },
    ranking: {
      titulo: "אותו שכר, מדינה אחרי מדינה",
      bajada: "באותו כוח קנייה, זה מה שנשאר לכם בכל מדינה. כל שורה מגיעה מהמחשבון הרשמי של אותה מדינה. השכר זהה בכל מקום: משתנים רק המסים וההפרשות, לא כמה מרוויחים בכל מדינה.",
      lista: "המדינות לפי שכר נטו",
      buscar: "חיפוש מדינה",
      filtrar: "סינון לפי אזור",
      todas: "הכול",
      regiones: { americas: "אמריקה", europa: "אירופה", asia: "אסיה ואוקיאניה", africa: "אפריקה והמזרח התיכון" },
      tuPais: "המדינה שלכם",
      mejor: "המס הנמוך ביותר",
      enMano: "נטו לחודש",
      enTuMoneda: "במטבע שלכם",
      vsTuPais: "לעומת המדינה שלכם",
      verTodos: (n) => `לכל ${n} המדינות`,
      verMenos: "להציג פחות",
      sinResultados: (q) => `אין מדינה שמתאימה ל-"${q}".`,
      abrir: (pais) => `לפתיחת המחשבון ${gHe.de(pais)}`,
      mas: (pct) => `${pct} יותר`,
      menos: (pct) => `${pct} פחות`,
      igual: "אותו דבר",
      puesto: (p, total) => `המדינה שלכם במקום ${p} מתוך ${total}.`,
    },
    tarjeta: {
      titulo: "הכרטיס שלכם לשיתוף",
      bajada: "מוצגים בו רק התאריך והאחוזים, אף פעם לא השכר.",
      hasta: (fecha) => `השכר שלי הולך למדינה עד ${fecha}`,
      tasa: (pct) => `${pct} מהשכר שלי הולכים למסים`,
      mejor: (pais, pct) => `עם אותו שכר, ${gHe.en(pais)} הייתי משלם פחות מס: ${pct} יותר נטו`,
      mejorPropio: (pais) => `עם אותו שכר, אין מדינה שמשאירה לי יותר ${prefijoHe("מ", gHe.nombre(pais))}`,
      yVos: "ואתם?",
      cta: "גלו את התאריך שלכם באתר",
      generica: "עד איזה יום בשנה אתם עובדים בשביל המדינה?",
      genericaBajada: (n) => `השכר שלכם ב-${pluralHe(n, PAISES_HE)}, לפי המחשבון הרשמי של כל מדינה`,
      compartir: "לשיתוף הכרטיס שלי",
      compartirDuelo: "להשיב לאתגר",
      descargar: "להורדת התמונה",
      copiado: "הקישור הועתק. אפשר להדביק אותו איפה שרוצים.",
      compartido: "שותף.",
      error: "השיתוף נכשל. נסו שוב.",
      texto: (fecha) => `השכר שלי הולך למדינה עד ${fecha}. ואתם?`,
      alt: "תצוגה מקדימה של הכרטיס שלכם",
    },
    duelo: {
      amigo: (fecha) => `החבר שלכם עובד בשביל המדינה עד ${fecha}.`,
      yVos: "ואתם?",
      invitacion: "הזינו את השכר שלכם כדי להשוות.",
      vos: "אתם",
      elAmigo: "החבר שלכם",
      dia: "עובד בשביל המדינה עד",
      tasa: "מסים וביטוח סוציאלי",
      mejorPais: "המס הנמוך ביותר",
      antes: (d) => `אתם משתחררים ${pluralHe(d, DIAS_HE)} לפני החבר שלכם.`,
      despues: (d) => `החבר שלכם משתחרר ${pluralHe(d, DIAS_HE)} לפניכם.`,
      empate: "שניכם משתחררים באותו יום.",
      desde: (pais) => `עובד ${gHe.en(pais)}`,
    },
    cero: {
      dia: "אפס ימים",
      heroeAntes: "אתם עובדים בשביל המדינה",
      tarjetaAntes: "ימי העבודה שלי בשביל המדינה:",
      motivo: "עם השכר הזה לא מנוכים מס הכנסה ולא ביטוח סוציאלי.",
      texto: "השנה אין לי אף יום עבודה בשביל המדינה. ואתם?",
      amigo: "החבר שלכם לא עובד אף יום בשביל המדינה.",
    },
    metodo: {
      titulo: "איך חישבנו",
      estimacion: "זו הערכה להשוואה בין מדינות, לא תלוש שכר. ניכויים, ילדים או בונוסים יכולים לשנות את המספר שלכם.",
      supuestos: [
        "אדם רווק בלי ילדים, עם ערכי ברירת המחדל של המחשבון של כל מדינה.",
        "שכר נטו הוא מה שנשאר אחרי מס הכנסה והתשלומים של העובד לביטוח הסוציאלי. הוא לא כולל מס על קניות ולא את מה שהמעסיק משלם.",
        "משכורת שלוש עשרה ותשלומים חובה אחרים מחולקים על פני השנה, כמו שקובע החוק בכל מדינה.",
        "בארצות הברית לא נוסף מס הכנסה של המדינה או של העיר: רק המס הפדרלי והביטוח הסוציאלי.",
        "כדי להעביר את השכר שלכם למדינה אחרת אנחנו משתמשים בשווי כוח קנייה (PPP), כלומר באותה רמת חיים, ולא בשער החליפין של היום.",
        "שווי כוח הקנייה של ארגנטינה מעודכן לפי מדד המחירים לצרכן של INDEC, כי הבנק העולמי מפרסם אותו רק עד 2021.",
        "יום החופש ממס מחלק את המס שלכם על פני השנה החל מ-1 בינואר. אם 30% מהשכר הולכים למסים, אתם עובדים בשביל המדינה 30% מהשנה.",
      ],
      ppaTitulo: "שווי כוח קנייה",
      bancoMundial: "הבנק העולמי",
      ppa: (organismo, indicador, anio) => `${organismo}, מדד ${indicador}, השנה האחרונה שזמינה: ${anio}.`,
      consultado: (fecha) => `נבדק ב-${fecha}.`,
      verFuente: "למקור",
      fuentesTitulo: "המקור של כל מדינה",
      fuentesBajada: "כל שורה משתמשת במחשבון השכר נטו של אותה מדינה ובנתונים הרשמיים שלה.",
      verificado: (fecha) => `הנתונים אומתו ב-${fecha}`,
      sello: (fecha) => `נתונים רשמיים שבדקנו במקור של כל מדינה. הבדיקה הוותיקה ביותר: ${fecha}.`,
    },
    faqTitulo: "שאלות נפוצות",
    faq: (n) => [
      {
        pregunta: "מה זה יום החופש ממס?",
        respuesta: "זה היום בשנה שבו מסיימים לשלם את המסים, אם כל מה שהרווחתם מ-1 בינואר היה הולך קודם למדינה. כאן הוא מחושב לפי השכר שלכם, לא לפי הממוצע הארצי.",
      },
      {
        pregunta: "למה משווים לפי כוח קנייה?",
        respuesta: "שער החליפין גורם לשכר להיראות ענק או זעיר, תלוי ביום. שווי כוח קנייה משווה את מה שבאמת אפשר לקנות בכסף הזה בכל מדינה.",
      },
      {
        pregunta: "האם השכר שלי נשמר?",
        respuesta: "לא. החישוב נעשה בדפדפן שלכם, ומה שמשתפים כולל רק תאריכים, אחוזים ושמות של מדינות.",
      },
      {
        pregunta: "למה השכר נטו האמיתי שלי שונה?",
        respuesta: "אנחנו מניחים אדם רווק בלי ילדים ועם ערכי ברירת המחדל. ניכויים, בונוסים או הסדרים מיוחדים משנים את המספר. למקרה שלכם, פתחו את המחשבון של המדינה שלכם.",
      },
      {
        pregunta: "אילו מדינות כלולות?",
        respuesta: `היום ${pluralHe(n, PAISES_HE)}, לכל אחת מחשבון שכר נטו משלה ונתונים רשמיים. אנחנו מוסיפים עוד ככל שאנחנו בודקים את כללי המס שלהן.`,
      },
    ],
    destacado: {
      ceja: "השוואה עולמית",
      titulo: "עד איזה יום בשנה אתם עובדים בשביל המדינה?",
      texto: "הזינו את השכר שלכם וגלו כמה נשאר לכם במדינות אחרות.",
      ir: "לגלות את התאריך שלי",
    },
  },
};

// ───────────────────────────── sr ─────────────────────────────

// Serbio en latinica y ekavski (ADR 0002, D23): «vi» en minúscula, como los bancos y eUprava; la
// tarjeta y el texto para compartir, en primera persona. Nada de participios ni adjetivos con género
// sobre la persona («bio sam», «sama»): las frases van en presente o impersonales. El país se declina
// con GRAMATICA.sr y los días y las zemlje con pluralSr. La fecha llega como la da Intl en sr-Latn
// («15. oktobar») y se dibuja aparte, así que la frase termina en «do».
const gSr = GRAMATICA.sr;
const SEO_SR = "Dan poreske slobode i neto plata u svetu";
const danaSr = (d: number) => pluralSr(d, "dan", "dana", "dana");
// Tras «u»: «u 21 zemlji», «u 22 zemlje», «u 25 zemalja».
const zemljamaUSr = (n: number) => pluralSr(n, "zemlji", "zemlje", "zemalja");

const sr: Diccionario<TextosMundo> = {
  base: {
    nombre: "Vaša plata u svetu",
    seo: {
      titulo: (pais) => [`${SEO_SR} | ${pais}`, SEO_SR, "Vaša plata u svetu"],
      tituloGlobal: [SEO_SR, "Vaša plata u svetu"],
      descripcion: (pais, n) => `Saznajte do kog dana u godini sa svojom platom ${gSr.en(pais)} radite za državu i koliko bi vam neto ostalo u ${zemljamaUSr(n)}. Besplatno, bez registracije.`,
      descripcionGlobal: (n) => `Saznajte do kog dana u godini radite za državu i koliko bi vam od plate neto ostalo u ${zemljamaUSr(n)}. Besplatno, bez registracije.`,
    },
    ceja: "Vaš Dan poreske slobode",
    h1: "Do kog dana u godini radite za državu?",
    bajada: (n) => `Unesite bruto platu i videćete svoj datum. Zatim ga uporedite u ${zemljamaUSr(n)}, uz istu kupovnu moć i poreska pravila svake zemlje.`,
    form: {
      titulo: "Vaša plata",
      sueldo: "Bruto plata",
      mes: "Mesečno",
      anio: "Godišnje",
      periodo: "Period plate",
      pais: "Zemlja u kojoj radite",
      ejemplo: "Primer",
      ejemploAyuda: "Ovo je primer plate. Unesite svoju i svi brojevi će se odmah preračunati.",
      propio: "Preuzeto iz vašeg obračuna.",
      invalido: "Unesite iznos veći od nule.",
      pagas: "Mesečna plata sa platnog listića: zakonske dodatne isplate (13. ili 14. plata) dodajemo mi. Neto plata je prosek za 12 meseci.",
    },
    heroe: {
      hasta: (fecha) => `Za državu radite do ${fecha}`,
      tasa: (pct) => `${pct} vaše plate odlazi na porez na dohodak i obavezne doprinose.`,
      dias: (n, total) => `${n} od ${total} dana`,
      enMano: "Neto vam ostaje",
      porMes: "mesečno",
      anio: (anio, n, total) => `Godina ${anio}: ${n} od ${total} dana za državu.`,
      resto: "Od sledećeg dana sve što zaradite pripada vama.",
    },
    ranking: {
      titulo: "Ista plata, zemlja po zemlja",
      bajada: "Toliko bi vam neto ostalo u svakoj zemlji uz istu kupovnu moć. Svaki red dolazi iz zvaničnog kalkulatora te zemlje.",
      lista: "Zemlje poređane po neto plati",
      buscar: "Pretraži zemlju",
      filtrar: "Filtriraj po regionu",
      todas: "Sve",
      regiones: { americas: "Amerika", europa: "Evropa", asia: "Azija i Okeanija", africa: "Afrika i Bliski istok" },
      tuPais: "Vaša zemlja",
      mejor: "Najbolje prolazi",
      enMano: "Neto mesečno",
      enTuMoneda: "U vašoj valuti",
      vsTuPais: "U poređenju sa vašom zemljom",
      verTodos: (n) => `Prikaži sve zemlje (${n})`,
      verMenos: "Prikaži manje",
      sinResultados: (q) => `Nijedna zemlja ne odgovara pretrazi „${q}“.`,
      abrir: (pais) => `Otvori kalkulator ${gSr.para(pais)}`,
      mas: (pct) => `${pct} više`,
      menos: (pct) => `${pct} manje`,
      igual: "Isto",
      puesto: (p, total) => `Vaša zemlja je na ${p}. mestu od ${total}.`,
    },
    tarjeta: {
      titulo: "Vaša kartica za deljenje",
      bajada: "Prikazuje vaš datum i procente. Koliko zarađujete, na njoj nikada ne piše.",
      hasta: (fecha) => `Za državu radim do ${fecha}`,
      tasa: (pct) => `${pct} moje plate odlazi na poreze`,
      mejor: (pais, pct) => `Sa mojom platom bi mi ${gSr.en(pais)} ostalo ${pct} više neto`,
      mejorPropio: (pais) => `Sa mojom platom mi nigde ne ostaje više nego ${gSr.en(pais)}`,
      yVos: "A vi?",
      cta: "Saznajte svoj datum:",
      generica: "Do kog dana u godini radite za državu?",
      genericaBajada: (n) => `Vaša plata u ${zemljamaUSr(n)}, prema zvaničnom kalkulatoru svake od njih`,
      compartir: "Podeli karticu",
      compartirDuelo: "Odgovori na izazov",
      descargar: "Preuzmi sliku",
      copiado: "Link je kopiran. Nalepite ga gde vam treba.",
      compartido: "Gotovo, poslato.",
      error: "Deljenje nije uspelo. Pokušajte ponovo.",
      texto: (fecha) => `Za državu radim do ${fecha}. A vi?`,
      alt: "Pregled vaše kartice",
    },
    duelo: {
      amigo: (fecha) => `Osoba koja vam je poslala link radi za državu do ${fecha}`,
      yVos: "A vi?",
      invitacion: "Unesite svoju platu i uporedite se.",
      vos: "Vi",
      elAmigo: "Pošiljalac",
      dia: "Za državu radi do",
      tasa: "Porezi i doprinosi",
      mejorPais: "Najbolje prolazi",
      antes: (d) => `Vaša sloboda počinje ${danaSr(d)} ranije nego kod pošiljaoca.`,
      despues: (d) => `Pošiljalac ima slobodu ${danaSr(d)} ranije od vas.`,
      empate: "Sloboda vam oboma počinje istog dana.",
      desde: (pais) => `Radi ${gSr.en(pais)}`,
    },
    cero: {
      dia: "nula dana",
      heroeAntes: "Za državu radite",
      tarjetaAntes: "Za državu radim",
      motivo: "Od ove plate se ne plaćaju ni porez na dohodak ni obavezni doprinosi.",
      texto: "Ove godine ne radim za državu nijedan dan. A vi?",
      amigo: "Osoba koja vam je poslala link ne radi za državu nijedan dan.",
    },
    metodo: {
      titulo: "Kako računamo",
      estimacion: "Ovo je procena za poređenje zemalja, a ne platni listić. Poreske olakšice, deca ili bonusi mogu da promene vaš broj.",
      supuestos: [
        "Osoba bez partnera i dece, sa podrazumevanim vrednostima kalkulatora svake zemlje.",
        "Neto plata je ono što ostane posle poreza na dohodak i doprinosa koje plaća sam zaposleni. Porezi na potrošnju i doprinosi poslodavca se ne računaju.",
        "Trinaesta plata ili druge obavezne dodatne isplate raspoređuju se na godinu onako kako propisuje zakon svake zemlje.",
        "U Sjedinjenim Državama ne dodaju se porezi pojedinih država ni lokalni porezi: samo savezni porez i doprinosi iz plate.",
        "Za preračun vaše plate u drugu zemlju koristimo paritet kupovne moći (PPP): isti životni standard, a ne današnji devizni kurs.",
        "PPP Argentine ažurira se indeksom potrošačkih cena INDEC-a, jer ga Svetska banka objavljuje samo do 2021.",
        "Dan slobode raspoređuje poreze na godinu od 1. januara. Kada na poreze ode 30 % plate, za državu radite 30 % godine.",
      ],
      ppaTitulo: "Paritet kupovne moći",
      bancoMundial: "Svetska banka",
      ppa: (organismo, indicador, anio) => `${organismo}, pokazatelj ${indicador}, poslednja dostupna godina: ${anio}.`,
      consultado: (fecha) => `Provereno ${fecha}`,
      verFuente: "Prikaži izvor",
      fuentesTitulo: "Izvor za svaku zemlju",
      fuentesBajada: "Svaki red koristi kalkulator neto plate te zemlje i njene zvanične podatke.",
      verificado: (fecha) => `Podaci provereni ${fecha}`,
      sello: (fecha) => `Zvanični podaci provereni u izvoru svake zemlje. Najstarija provera: ${fecha}`,
    },
    faqTitulo: "Česta pitanja",
    faq: (n) => [
      {
        pregunta: "Šta je Dan poreske slobode?",
        respuesta:
          "To je dan u godini kada biste imali plaćene poreze i doprinose kada bi sve što zaradite od 1. januara prvo išlo državi. Ovde ga računamo iz vaše plate, a ne iz proseka zemlje.",
      },
      {
        pregunta: "Zašto poredimo po kupovnoj moći?",
        respuesta: "Po deviznom kursu plata može da izgleda ogromno ili sitno, zavisno od dana. Paritet kupovne moći poredi šta za taj novac zaista možete da kupite u svakoj zemlji.",
      },
      {
        pregunta: "Da li se moja plata čuva?",
        respuesta: "Ne. Obračun se radi u vašem pregledaču. Ono što delite sadrži samo datume, procente i zemlje.",
      },
      {
        pregunta: "Zašto se moja stvarna neto plata razlikuje?",
        respuesta:
          "Računamo sa osobom bez partnera i dece i sa podrazumevanim vrednostima. Poreske olakšice, bonusi ili posebni režimi menjaju broj. Za tačan obračun vaše situacije otvorite kalkulator svoje zemlje.",
      },
      {
        pregunta: "Koje su zemlje ovde?",
        respuesta: `Danas ${pluralSr(n, "zemlja", "zemlje", "zemalja")}, svaka sa svojim kalkulatorom neto plate i zvaničnim podacima. Dodajemo nove čim proverimo njihova poreska pravila.`,
      },
    ],
    destacado: {
      ceja: "Svetsko poređenje",
      titulo: "Do kog dana u godini radite za državu?",
      texto: "Unesite platu i pogledajte koliko bi vam neto ostalo u drugim zemljama.",
      ir: "Izračunaj svoj datum",
    },
  },
};

// ───────────────────────────── bg ─────────────────────────────

// Búlgaro (ADR 0002, D24): «Вие» de cortesía con mayúscula y 2.ª persona del plural; la tarjeta y el
// texto para compartir van en primera persona. El país va con GRAMATICA.bg («в България», «във
// Франция») y los días y países con pluralBg («1 ден», «3 дни», «в 40 държави»).
const gBg = GRAMATICA.bg;
const SEO_BG = "Ден на данъчната свобода и нетна заплата по държави";
const diasBg = (d: number) => pluralBg(d, "ден", "дни");
const enPaisesBg = (n: number) => `в ${pluralBg(n, "държава", "държави")}`;

const bg: Diccionario<TextosMundo> = {
  base: {
    nombre: "Заплатата Ви по света",
    seo: {
      titulo: (pais) => [`${SEO_BG} | ${pais}`, SEO_BG, "Заплатата Ви по света"],
      tituloGlobal: [SEO_BG, "Заплатата Ви по света"],
      descripcion: (pais, n) => `Вижте до кой ден от годината работите за държавата със заплата ${gBg.en(pais)} и колко нетно бихте получавали ${enPaisesBg(n)}. Безплатно и без регистрация.`,
      descripcionGlobal: (n) => `Вижте до кой ден от годината работите за държавата и колко нетно би Ви оставало от заплатата ${enPaisesBg(n)}. Безплатно и без регистрация.`,
    },
    ceja: "Вашият Ден на данъчната свобода",
    h1: "До кой ден от годината работите за държавата?",
    bajada: (n) => `Въведете брутната си заплата, за да видите своята дата. След това я сравнете ${enPaisesBg(n)} при същата покупателна способност и с данъчните правила на всяка държава.`,
    form: {
      titulo: "Вашата заплата",
      sueldo: "Брутна заплата",
      mes: "На месец",
      anio: "На година",
      periodo: "Период на заплатата",
      pais: "Държавата, в която работите",
      ejemplo: "Пример",
      ejemploAyuda: "Това е примерна заплата. Въведете своята и всички числа се обновяват веднага.",
      propio: "Прехвърлено от Вашето изчисление.",
      invalido: "Въведете сума, по-голяма от нула.",
      pagas: "Месечната заплата от фиша Ви: задължителните по закон допълнителни заплати (13-та или 14-та) добавяме ние. Нетната заплата е средната стойност за 12 месеца.",
    },
    heroe: {
      hasta: (fecha) => `Работите за държавата до ${fecha}`,
      tasa: (pct) => `${pct} от заплатата Ви отиват за данък върху доходите и задължителни осигуровки.`,
      dias: (n, total) => `${n} от ${total} дни`,
      enMano: "Нетно",
      porMes: "на месец",
      anio: (anio, n, total) => `${anio}: ${n} от ${total} дни за държавата.`,
      resto: "От следващия ден всичко, което изкарвате, остава за Вас.",
    },
    ranking: {
      titulo: "Една и съща заплата в различни държави",
      bajada: "Толкова нетно бихте получавали във всяка държава при същата покупателна способност. Всеки ред идва от официалния калкулатор на съответната държава.",
      lista: "Държави по нетна заплата",
      buscar: "Потърсете държава",
      filtrar: "Филтър по регион",
      todas: "Всички",
      regiones: { americas: "Америка", europa: "Европа", asia: "Азия и Океания", africa: "Африка и Близкият изток" },
      tuPais: "Вашата държава",
      mejor: "Най-изгодна",
      enMano: "Нетно на месец",
      enTuMoneda: "Във Вашата валута",
      vsTuPais: "Спрямо Вашата държава",
      verTodos: (n) => `Покажете всички държави (${n})`,
      verMenos: "Покажете по-малко",
      sinResultados: (q) => `Няма държава, която да отговаря на „${q}“.`,
      abrir: (pais) => `Отворете калкулатора ${gBg.para(pais)}`,
      mas: (pct) => `с ${pct} повече`,
      menos: (pct) => `с ${pct} по-малко`,
      igual: "Толкова, колкото и сега",
      puesto: (p, total) => `Вашата държава заема място ${p} от ${total}.`,
    },
    tarjeta: {
      titulo: "Вашата карта за споделяне",
      bajada: "На нея се виждат датата и процентите. Колко изкарвате, не се вижда никога.",
      hasta: (fecha) => `Работя за държавата до ${fecha}`,
      tasa: (pct) => `${pct} от заплатата ми отиват за данъци`,
      mejor: (pais, pct) => `Със заплатата ми ${gBg.en(pais)} нетно щеше да ми остава с ${pct} повече`,
      mejorPropio: (pais) => `Със заплатата ми най-изгодната държава за мен е ${gBg.nombre(pais)}`,
      yVos: "А Вие?",
      cta: "Вижте своята дата:",
      generica: "До кой ден от годината работите за държавата?",
      genericaBajada: (n) => `Заплатата Ви ${enPaisesBg(n)}, по официалния калкулатор на всяка от тях`,
      compartir: "Споделете картата",
      compartirDuelo: "Приеми предизвикателството",
      descargar: "Изтеглете изображението",
      copiado: "Линкът е копиран. Поставете го където пожелаете.",
      compartido: "Готово, изпратено.",
      error: "Споделянето не успя. Опитайте отново.",
      texto: (fecha) => `Работя за държавата до ${fecha}. А Вие?`,
      alt: "Преглед на Вашата карта",
    },
    duelo: {
      amigo: (fecha) => `Вашият приятел работи за държавата до ${fecha}.`,
      yVos: "А Вие?",
      invitacion: "Въведете своята заплата, за да сравните.",
      vos: "Вие",
      elAmigo: "Вашият приятел",
      dia: "Работи за държавата до",
      tasa: "Данъци и осигуровки",
      mejorPais: "Най-изгодната държава",
      antes: (d) => `Вие се освобождавате ${diasBg(d)} преди приятеля си.`,
      despues: (d) => `Приятелят Ви се освобождава ${diasBg(d)} преди Вас.`,
      empate: "И двамата се освобождавате в един и същи ден.",
      desde: (pais) => `Работи ${gBg.en(pais)}`,
    },
    cero: {
      dia: "нито един ден",
      heroeAntes: "Работите за държавата",
      tarjetaAntes: "Работя за държавата",
      motivo: "От тази заплата не се удържат нито данък върху доходите, нито задължителни осигуровки.",
      texto: "Тази година не работя за държавата нито един ден. А Вие?",
      amigo: "Вашият приятел не работи за държавата нито един ден.",
    },
    metodo: {
      titulo: "Как изчисляваме",
      estimacion: "Това е оценка за сравнение между държави, а не фиш за заплата. Облекчения, деца или бонуси могат да променят Вашето число.",
      supuestos: [
        "Несемеен човек без деца, със стойностите по подразбиране в калкулатора на всяка държава.",
        "Нетната заплата е това, което остава след данъка върху доходите и осигуровките, които плаща самият служител. Данъците върху потреблението и осигуровките за сметка на работодателя не се включват.",
        "13-тата заплата и другите задължителни допълнителни плащания се разпределят в годината така, както предвижда законът на всяка държава.",
        "За Съединените щати не се добавят щатският и местният данък върху доходите: само федералният данък и удръжките от заплатата.",
        "За да пренесем заплатата Ви в друга държава, използваме паритета на покупателната способност (ППС): същото жизнено равнище, а не днешния валутен курс.",
        "ППС на Аржентина се обновява с индекса на потребителските цени на INDEC, защото Световната банка го публикува само до 2021 г.",
        "Денят на свободата разпределя данъците в годината, като започва от 1 януари. Ако 30% от заплатата отиват за данъци, работите за държавата 30% от годината.",
      ],
      ppaTitulo: "Паритет на покупателната способност",
      bancoMundial: "Световната банка",
      ppa: (organismo, indicador, anio) => `${organismo}, показател ${indicador}, последна налична година: ${anio}.`,
      consultado: (fecha) => `Проверено на ${fecha}`,
      verFuente: "Вижте източника",
      fuentesTitulo: "Източникът за всяка държава",
      fuentesBajada: "Всеки ред използва калкулатора за нетна заплата на съответната държава и нейните официални данни.",
      verificado: (fecha) => `Данните са проверени на ${fecha}`,
      sello: (fecha) => `Официалните данни са проверени в източника на всяка държава. Най-старата проверка е от ${fecha}`,
    },
    faqTitulo: "Често задавани въпроси",
    faq: (n) => [
      {
        pregunta: "Какво е Денят на данъчната свобода?",
        respuesta:
          "Това е денят от годината, в който приключвате с плащането на данъците, ако всичко изкарано от 1 януари първо отиваше за държавата. Тук той е изчислен с Вашата заплата, а не със средната за страната.",
      },
      {
        pregunta: "Защо сравнението е по покупателна способност?",
        respuesta: "Заради валутния курс една заплата може да изглежда огромна или нищожна според деня. ППС сравнява какво наистина може да се купи с тези пари във всяка държава.",
      },
      {
        pregunta: "Записва ли се заплатата ми?",
        respuesta: "Не. Изчислението се прави във Вашия браузър. Това, което споделяте, съдържа само дати, проценти и държави.",
      },
      {
        pregunta: "Защо реалната ми нетна заплата е различна?",
        respuesta:
          "Приемаме несемеен човек без деца и стойностите по подразбиране. Облекчения, бонуси или специални режими променят числото. За точно изчисление за Вашия случай отворете калкулатора на своята държава.",
      },
      {
        pregunta: "Кои държави са включени?",
        respuesta: `Днес ${pluralBg(n, "държава", "държави")}, всяка със свой калкулатор за нетна заплата и официални данни. Добавяме нови, щом проверим данъчните им правила.`,
      },
    ],
    destacado: {
      ceja: "Сравнение по света",
      titulo: "До кой ден от годината работите за държавата?",
      texto: "Въведете заплатата си и вижте колко нетно бихте получавали в други държави.",
      ir: "Вижте своята дата",
    },
  },
};

// ───────────────────────────── sk ─────────────────────────────

// Eslovaco (ADR 0002, D25): vykanie con vy en minúscula, como Finančná správa y los bancos; la tarjeta
// y el texto para compartir, en primera persona. Nada de participios ni adjetivos con género sobre la
// persona: las frases van en presente o impersonales. El país se declina con GRAMATICA.sk y los días
// con pluralSk.
const gSk = GRAMATICA.sk;
const SEO_SK = "Deň daňovej slobody a čistá mzda vo svete";
const diasSk = (d: number) => pluralSk(d, "deň", "dni", "dní");

const sk: Diccionario<TextosMundo> = {
  base: {
    nombre: "Vaša mzda vo svete",
    seo: {
      titulo: (pais) => [`${SEO_SK} | ${pais}`, SEO_SK, "Vaša mzda vo svete"],
      tituloGlobal: [SEO_SK, "Vaša mzda vo svete"],
      descripcion: (pais, n) => `Zistite, do ktorého dňa v roku pracujete so svojou mzdou ${gSk.en(pais)} pre štát a koľko by vám zostalo v čistom v ${n} krajinách. Zadarmo, bez registrácie.`,
      descripcionGlobal: (n) => `Zistite, do ktorého dňa v roku pracujete pre štát a koľko by vám z vašej mzdy zostalo v čistom v ${n} krajinách. Zadarmo, bez registrácie.`,
    },
    ceja: "Váš Deň daňovej slobody",
    h1: "Do ktorého dňa v roku pracujete pre štát?",
    bajada: (n) => `Zadajte hrubú mzdu a uvidíte svoj dátum. Potom ho porovnajte v ${n} krajinách, pri rovnakej kúpnej sile a s daňovými pravidlami každej krajiny.`,
    form: {
      titulo: "Vaša mzda",
      sueldo: "Hrubá mzda",
      mes: "Mesačne",
      anio: "Ročne",
      periodo: "Obdobie mzdy",
      pais: "Krajina, kde pracujete",
      ejemplo: "Príklad",
      ejemploAyuda: "Toto je ukážková mzda. Zadajte svoju a všetky čísla sa hneď prepočítajú.",
      propio: "Prevzaté z vášho výpočtu.",
      invalido: "Zadajte sumu väčšiu ako nula.",
      pagas: "Mesačná mzda podľa výplatnej pásky: zákonné mzdy navyše (13. alebo 14. plat) pripočítame sami. Čistá mzda je priemer za 12 mesiacov.",
    },
    heroe: {
      hasta: (fecha) => `Pre štát pracujete do ${fecha}`,
      tasa: (pct) => `${pct} vašej mzdy ide na daň z príjmov a povinné odvody.`,
      dias: (n, total) => `${n} z ${total} dní`,
      enMano: "V čistom vám zostane",
      porMes: "mesačne",
      anio: (anio, n, total) => `Rok ${anio}: ${n} z ${total} dní pre štát.`,
      resto: "Odo dňa, ktorý nasleduje, patrí všetko, čo zarobíte, vám.",
    },
    ranking: {
      titulo: "Rovnaká mzda, krajina po krajine",
      bajada: "Toľko by vám v čistom zostalo v každej krajine pri rovnakej kúpnej sile. Každý riadok pochádza z oficiálnej kalkulačky danej krajiny. Všade rovnaká mzda: menia sa len dane a odvody, nie to, koľko sa v danej krajine zarába.",
      lista: "Krajiny zoradené podľa čistej mzdy",
      buscar: "Hľadať krajinu",
      filtrar: "Filtrovať podľa regiónu",
      todas: "Všetky",
      regiones: { americas: "Amerika", europa: "Európa", asia: "Ázia a Oceánia", africa: "Afrika a Blízky východ" },
      tuPais: "Vaša krajina",
      mejor: "Najnižšie dane",
      enMano: "V čistom mesačne",
      enTuMoneda: "Vo vašej mene",
      vsTuPais: "V porovnaní s vašou krajinou",
      verTodos: (n) => `Zobraziť všetky krajiny (${n})`,
      verMenos: "Zobraziť menej",
      sinResultados: (q) => `Hľadaniu „${q}“ nezodpovedá žiadna krajina.`,
      abrir: (pais) => `Otvoriť kalkulačku ${gSk.para(pais)}`,
      mas: (pct) => `o ${pct} viac`,
      menos: (pct) => `o ${pct} menej`,
      igual: "Rovnako",
      puesto: (p, total) => `Vaša krajina je na ${p}. mieste z ${total}.`,
    },
    tarjeta: {
      titulo: "Vaša karta na zdieľanie",
      bajada: "Ukazuje váš dátum a percentá. Koľko zarábate, na nej nikdy nie je.",
      hasta: (fecha) => `Pre štát pracujem do ${fecha}`,
      tasa: (pct) => `${pct} mojej mzdy ide na dane`,
      mejor: (pais, pct) => `S rovnakou mzdou by mi ${gSk.en(pais)} po nižších daniach zostalo o ${pct} viac v čistom`,
      mejorPropio: (pais) => `S mojou mzdou mi nikde nezostane viac ako ${gSk.en(pais)}`,
      yVos: "A vy?",
      cta: "Zistite svoj dátum:",
      generica: "Do ktorého dňa v roku pracujete pre štát?",
      genericaBajada: (n) => `Vaša mzda v ${n} krajinách, podľa oficiálnej kalkulačky každej z nich`,
      compartir: "Zdieľať kartu",
      compartirDuelo: "Odpovedať na výzvu",
      descargar: "Stiahnuť obrázok",
      copiado: "Odkaz je skopírovaný. Vložte ho, kam potrebujete.",
      compartido: "Hotovo, odoslané.",
      error: "Zdieľanie sa nepodarilo. Skúste to znova.",
      texto: (fecha) => `Pre štát pracujem do ${fecha}. A vy?`,
      alt: "Náhľad vašej karty",
    },
    duelo: {
      amigo: (fecha) => `Ten, kto vám odkaz poslal, pracuje pre štát do ${fecha}.`,
      yVos: "A vy?",
      invitacion: "Zadajte svoju mzdu a porovnajte sa.",
      vos: "Vy",
      elAmigo: "Odosielateľ",
      dia: "Pre štát pracuje do",
      tasa: "Dane a odvody",
      mejorPais: "Najnižšie dane",
      antes: (d) => `Vaša sloboda začína o ${diasSk(d)} skôr ako u odosielateľa.`,
      despues: (d) => `Odosielateľ má slobodu o ${diasSk(d)} skôr ako vy.`,
      empate: "Sloboda vám obom začína v rovnaký deň.",
      desde: (pais) => `Pracuje ${gSk.en(pais)}`,
    },
    cero: {
      dia: "nula dní",
      heroeAntes: "Pre štát pracujete",
      tarjetaAntes: "Pre štát pracujem",
      motivo: "Z tejto mzdy sa nezráža daň z príjmov ani povinné odvody.",
      texto: "Tento rok nepracujem pre štát ani jeden deň. A vy?",
      amigo: "Ten, kto vám odkaz poslal, nepracuje pre štát ani jeden deň.",
    },
    metodo: {
      titulo: "Ako počítame",
      estimacion: "Ide o odhad na porovnanie krajín, nie o výplatnú pásku. Daňové úľavy, deti alebo prémie môžu vaše číslo zmeniť.",
      supuestos: [
        "Slobodná osoba bez detí, s predvolenými hodnotami kalkulačky každej krajiny.",
        "Čistá mzda je to, čo zostane po dani z príjmov a odvodoch, ktoré platí sám zamestnanec. Dane zo spotreby a odvody zamestnávateľa sa nezapočítavajú.",
        "Trinásty plat alebo iné povinné mzdy navyše sa rozpočítajú do roka tak, ako to stanovuje zákon každej krajiny.",
        "V Spojených štátoch sa nepripočítava daň jednotlivých štátov ani miestna daň: len federálna daň a odvody zo mzdy.",
        "Na prevod vašej mzdy do inej krajiny používame paritu kúpnej sily (PPP): rovnaká životná úroveň, nie dnešný výmenný kurz.",
        "PPP Argentíny sa aktualizuje indexom spotrebiteľských cien INDEC, pretože Svetová banka ju zverejňuje len do roku 2021.",
        "Deň slobody rozkladá dane do roka od 1. januára. Keď na dane ide 30 % mzdy, pracujete pre štát 30 % roka.",
      ],
      ppaTitulo: "Parita kúpnej sily",
      bancoMundial: "Svetová banka",
      ppa: (organismo, indicador, anio) => `${organismo}, ukazovateľ ${indicador}, posledný dostupný rok: ${anio}.`,
      consultado: (fecha) => `Overené ${fecha}.`,
      verFuente: "Zobraziť zdroj",
      fuentesTitulo: "Zdroj každej krajiny",
      fuentesBajada: "Každý riadok používa kalkulačku čistej mzdy danej krajiny a jej oficiálne údaje.",
      verificado: (fecha) => `Údaje overené ${fecha}`,
      sello: (fecha) => `Oficiálne údaje overené v zdroji každej krajiny. Najstaršie overenie: ${fecha}.`,
    },
    faqTitulo: "Časté otázky",
    faq: (n) => [
      {
        pregunta: "Čo je Deň daňovej slobody?",
        respuesta:
          "Je to deň v roku, keď by ste mali zaplatené dane a odvody, keby všetko, čo zarobíte od 1. januára, išlo najprv štátu. Tu ho počítame z vašej mzdy, nie z priemeru krajiny.",
      },
      {
        pregunta: "Prečo porovnávame podľa kúpnej sily?",
        respuesta: "Podľa výmenného kurzu môže mzda pôsobiť obrovsky alebo nepatrne, podľa toho, aký je deň. Parita kúpnej sily porovnáva, čo si za tie peniaze v každej krajine naozaj kúpite.",
      },
      {
        pregunta: "Ukladá sa moja mzda?",
        respuesta: "Nie. Výpočet prebieha vo vašom prehliadači. To, čo zdieľate, obsahuje len dátumy, percentá a krajiny.",
      },
      {
        pregunta: "Prečo sa moja skutočná čistá mzda líši?",
        respuesta:
          "Počítame so slobodnou osobou bez detí a s predvolenými hodnotami. Daňové úľavy, prémie alebo osobitné režimy číslo menia. Na presný výpočet vašej situácie otvorte kalkulačku svojej krajiny.",
      },
      {
        pregunta: "Ktoré krajiny tu sú?",
        respuesta: `Dnes ${pluralSk(n, "krajina", "krajiny", "krajín")}, každá s vlastnou kalkulačkou čistej mzdy a oficiálnymi údajmi. Ďalšie pridávame, hneď ako overíme ich daňové pravidlá.`,
      },
    ],
    destacado: {
      ceja: "Svetové porovnanie",
      titulo: "Do ktorého dňa v roku pracujete pre štát?",
      texto: "Zadajte mzdu a pozrite sa, koľko by vám v čistom zostalo v iných krajinách.",
      ir: "Zistiť svoj dátum",
    },
  },
};

// ───────────────────────────── ka ─────────────────────────────

// Georgiano (ADR 0002, D26): «თქვენ» con formas corteses; la tarjeta y el texto para compartir, en
// primera persona. El país va con GRAMATICA.ka («საქართველოში»). Ningún sufijo se pega a una cifra ni
// a una fecha: la fecha va tras dos puntos, en nominativo («ამ თარიღამდე: 24 ოქტომბერი, 2026»), y las
// cifras, delante de un sustantivo sin plural («3 დღე»).
const gKa = GRAMATICA.ka;
const SEO_KA = "საგადასახადო თავისუფლების დღე მსოფლიოში";
const SEO_KA_CORTO = "საგადასახადო თავისუფლების დღე";

const ka: Diccionario<TextosMundo> = {
  base: {
    nombre: "თქვენი ხელფასი მსოფლიოში",
    seo: {
      titulo: (pais) => [`${SEO_KA_CORTO} | ${pais}`, SEO_KA, "თქვენი ხელფასი მსოფლიოში"],
      tituloGlobal: [SEO_KA, "თქვენი ხელფასი მსოფლიოში"],
      descripcion: (pais, n) =>
        `წლის რომელ დღემდე მუშაობთ სახელმწიფოსთვის ${gKa.en(pais)}? შეადარეთ ხელზე ასაღები ხელფასი ${n} ქვეყანაში.`,
      descripcionGlobal: (n) => `გაიგეთ, წლის რომელ დღემდე მუშაობთ სახელმწიფოსთვის და რამდენი დაგრჩებათ ხელფასიდან ${n} ქვეყანაში. უფასოდ.`,
    },
    ceja: "თქვენი საგადასახადო თავისუფლების დღე",
    h1: "წლის რომელ დღემდე მუშაობთ სახელმწიფოსთვის?",
    bajada: (n) => `შეიყვანეთ ხელფასი დაბეგვრამდე და მიიღეთ თქვენი თარიღი. შემდეგ შეადარეთ ${n} ქვეყანას, თანაბარი მსყიდველობითი უნარით და თითოეული ქვეყნის საგადასახადო წესებით.`,
    form: {
      titulo: "თქვენი ხელფასი",
      sueldo: "ხელფასი დაბეგვრამდე",
      mes: "თვეში",
      anio: "წელიწადში",
      periodo: "ხელფასის პერიოდი",
      pais: "ქვეყანა, სადაც მუშაობთ",
      ejemplo: "მაგალითი",
      ejemploAyuda: "ეს სანიმუშო ხელფასია. შეიყვანეთ თქვენი და ყველა რიცხვი მაშინვე გადაითვლება.",
      propio: "აღებულია თქვენი გამოთვლიდან.",
      invalido: "შეიყვანეთ ნულზე მეტი თანხა.",
      pagas: "თვიური ხელფასი დაბეგვრამდე, როგორც სახელფასო უწყისშია: კანონით გათვალისწინებულ დამატებით ანაზღაურებას (მე-13 ან მე-14 ხელფასი) ჩვენ ვამატებთ. ხელზე ასაღები თანხა 12 თვის საშუალოა.",
    },
    heroe: {
      hasta: (fecha) => `სახელმწიფოსთვის მუშაობთ ამ თარიღამდე: ${fecha}`,
      tasa: (pct) => `თქვენი ხელფასიდან საშემოსავლო გადასახადსა და სავალდებულო შენატანებს მიაქვს: ${pct}.`,
      dias: (n, total) => `${n} დღე წლის ${total} დღიდან`,
      enMano: "ხელზე გრჩებათ",
      porMes: "თვეში",
      anio: (anio, n, total) => `წელი ${anio}: ${n} დღე სახელმწიფოსთვის, წლის ${total} დღიდან.`,
      resto: "მომდევნო დღიდან ყველაფერი, რასაც გამოიმუშავებთ, თქვენია.",
    },
    ranking: {
      titulo: "ერთი ხელფასი სხვადასხვა ქვეყანაში",
      bajada: "ამდენი დაგრჩებათ ხელზე თითოეულ ქვეყანაში, თანაბარი მსყიდველობითი უნარით. ყოველი სტრიქონი იმ ქვეყნის ოფიციალური კალკულატორიდან მოდის. ხელფასი ყველგან ერთია: იცვლება მხოლოდ გადასახადები და შენატანები და არა ის, რამდენს გამოიმუშავებენ ამ ქვეყანაში.",
      lista: "ქვეყნები ხელზე ასაღები ხელფასის მიხედვით",
      buscar: "ქვეყნის ძებნა",
      filtrar: "გაფილტვრა რეგიონის მიხედვით",
      todas: "ყველა",
      regiones: { americas: "ამერიკა", europa: "ევროპა", asia: "აზია და ოკეანეთი", africa: "აფრიკა და ახლო აღმოსავლეთი" },
      tuPais: "თქვენი ქვეყანა",
      mejor: "აქ გადასახადი ყველაზე დაბალია",
      enMano: "ხელზე, თვეში",
      enTuMoneda: "თქვენს ვალუტაში",
      vsTuPais: "თქვენს ქვეყანასთან შედარებით",
      verTodos: (n) => `ყველა ქვეყანა (${n})`,
      verMenos: "ნაკლების ჩვენება",
      sinResultados: (q) => `ასეთი ქვეყანა ვერ მოიძებნა: „${q}“.`,
      abrir: (pais) => `კალკულატორის გახსნა: ${gKa.nombre(pais)}`,
      mas: (pct) => `მეტი: ${pct}`,
      menos: (pct) => `ნაკლები: ${pct}`,
      igual: "იგივე",
      puesto: (p, total) => `თქვენი ქვეყნის ადგილი: ${p} (სულ ${total} ქვეყანა).`,
    },
    tarjeta: {
      titulo: "თქვენი გასაზიარებელი ბარათი",
      bajada: "აჩვენებს თქვენს თარიღსა და პროცენტს. იმას, რამდენს გამოიმუშავებთ, არასდროს.",
      hasta: (fecha) => `სახელმწიფოსთვის ვმუშაობ ამ თარიღამდე: ${fecha}`,
      tasa: (pct) => `ჩემი ხელფასიდან გადასახადებს მიაქვს: ${pct}`,
      mejor: (pais, pct) => `იმავე ხელფასით ${gKa.en(pais)} ნაკლებ გადასახადს გადავიხდიდი: +${pct} ხელზე`,
      mejorPropio: (pais) => `ამ ხელფასიდან ვერსად დამრჩებოდა იმაზე მეტი, ვიდრე ${gKa.en(pais)}`,
      yVos: "და თქვენ?",
      cta: "გაიგეთ თქვენი თარიღი:",
      generica: "წლის რომელ დღემდე მუშაობთ სახელმწიფოსთვის?",
      genericaBajada: (n) => `თქვენი ხელფასი ${n} ქვეყანაში, თითოეული ქვეყნის ოფიციალური კალკულატორით`,
      compartir: "ბარათის გაზიარება",
      compartirDuelo: "გამოწვევის მიღება",
      descargar: "სურათის ჩამოტვირთვა",
      copiado: "ბმული დაკოპირდა. ჩასვით, სადაც გსურთ.",
      compartido: "მზადაა, გაგზავნილია.",
      error: "გაზიარება ვერ მოხერხდა. სცადეთ თავიდან.",
      texto: (fecha) => `წელს სახელმწიფოსთვის ვმუშაობ ამ თარიღამდე: ${fecha}. თქვენ?`,
      alt: "თქვენი ბარათის წინასწარი ხედი",
    },
    duelo: {
      amigo: (fecha) => `ვინც ეს გამოგიგზავნათ, სახელმწიფოსთვის მუშაობს ამ თარიღამდე: ${fecha}.`,
      yVos: "და თქვენ?",
      invitacion: "შეიყვანეთ თქვენი ხელფასი და შეეჯიბრეთ.",
      vos: "თქვენ",
      elAmigo: "გამომგზავნი",
      dia: "სახელმწიფოსთვის მუშაობა ამ თარიღამდე",
      tasa: "გადასახადები და შენატანები",
      mejorPais: "აქ გადასახადი ყველაზე დაბალია",
      antes: (d) => `თქვენი თავისუფლება ${d} დღით ადრე იწყება, ვიდრე გამომგზავნის.`,
      despues: (d) => `გამომგზავნის თავისუფლება ${d} დღით ადრე იწყება, ვიდრე თქვენი.`,
      empate: "ორივეს თავისუფლება ერთსა და იმავე დღეს იწყება.",
      desde: (pais) => `მუშაობს ქვეყანაში: ${gKa.nombre(pais)}`,
    },
    cero: {
      dia: "ნული დღე",
      heroeAntes: "სახელმწიფოსთვის მუშაობთ:",
      tarjetaAntes: "სახელმწიფოსთვის ვმუშაობ:",
      motivo: "ამ ხელფასიდან არც საშემოსავლო გადასახადი იკავება და არც სავალდებულო შენატანები.",
      texto: "წელს სახელმწიფოსთვის არც ერთ დღეს არ ვმუშაობ. თქვენ?",
      amigo: "ვინც ეს გამოგიგზავნათ, სახელმწიფოსთვის არც ერთ დღეს არ მუშაობს.",
    },
    metodo: {
      titulo: "როგორ ვითვლით",
      estimacion: "ეს ქვეყნების შესადარებელი შეფასებაა და არა სახელფასო უწყისი. საგადასახადო შეღავათებმა, შვილებმა ან პრემიებმა შეიძლება თქვენი რიცხვი შეცვალოს.",
      supuestos: [
        "მარტოხელა ადამიანი შვილების გარეშე, თითოეული ქვეყნის კალკულატორის საბაზო მნიშვნელობებით.",
        "ხელზე ასაღები ხელფასი ის თანხაა, რომელიც საშემოსავლო გადასახადისა და დასაქმებულის შენატანების შემდეგ რჩება. მოხმარების გადასახადებსა და დამსაქმებლის შენატანებს არ ვითვლით.",
        "მე-13 ხელფასს და სხვა სავალდებულო დამატებით ანაზღაურებას წელიწადზე ისე ვანაწილებთ, როგორც ამას თითოეული ქვეყნის კანონი ითვალისწინებს.",
        "ამერიკის შეერთებულ შტატებში არ ვითვლით ცალკეული შტატებისა და ადგილობრივი ხელისუფლების გადასახადებს: მხოლოდ ფედერალურ გადასახადს და ხელფასთან დაკავშირებულ შენატანებს.",
        "თქვენი ხელფასის სხვა ქვეყანაში გადასაყვანად ვიყენებთ მსყიდველობითი უნარის პარიტეტს (PPP): ერთნაირ ცხოვრების დონეს და არა დღევანდელ გაცვლით კურსს.",
        "არგენტინის მსყიდველობითი უნარის პარიტეტს ვაახლებთ INDEC-ის სამომხმარებლო ფასების ინდექსით, რადგან მსოფლიო ბანკი მას მხოლოდ 2021 წლამდე აქვეყნებს.",
        "საგადასახადო თავისუფლების დღე გადასახადებს წელიწადზე 1 იანვრიდან ანაწილებს. თუ გადასახადებს ხელფასის 30 პროცენტი მიაქვს, წლის 30 პროცენტის განმავლობაში სახელმწიფოსთვის მუშაობთ.",
      ],
      ppaTitulo: "მსყიდველობითი უნარის პარიტეტი",
      bancoMundial: "მსოფლიო ბანკი",
      ppa: (organismo, indicador, anio) => `${organismo}, მაჩვენებელი: ${indicador}, ბოლო ხელმისაწვდომი წელი: ${anio}.`,
      consultado: (fecha) => `შემოწმდა: ${fecha}.`,
      verFuente: "წყაროს გახსნა",
      fuentesTitulo: "თითოეული ქვეყნის წყაროები",
      fuentesBajada: "ყოველი სტრიქონი იყენებს იმ ქვეყნის ხელფასის კალკულატორს და ოფიციალურ მონაცემებს.",
      verificado: (fecha) => `მონაცემები შემოწმდა: ${fecha}`,
      sello: (fecha) => `ოფიციალური მონაცემები, შემოწმებული თითოეული ქვეყნის წყაროში. ყველაზე ძველი შემოწმება: ${fecha}.`,
    },
    faqTitulo: "ხშირად დასმული კითხვები",
    faq: (n) => [
      {
        pregunta: "რა არის საგადასახადო თავისუფლების დღე?",
        respuesta:
          "წლის ის დღე, როდესაც გადასახადებსა და შენატანებს დაფარავდით, თუ 1 იანვრიდან გამომუშავებული ყველაფერი ჯერ სახელმწიფოს მიუვიდოდა. აქ მას თქვენი ხელფასით ვითვლით და არა ქვეყნის საშუალო მაჩვენებლით.",
      },
      {
        pregunta: "რატომ ვადარებთ მსყიდველობითი უნარით?",
        respuesta: "გაცვლითი კურსით ერთი და იგივე ხელფასი დღის მიხედვით შეიძლება უზარმაზარი ან პატარა ჩანდეს. მსყიდველობითი უნარის პარიტეტი ადარებს, რისი ყიდვა შეგიძლიათ რეალურად ამ ფულით თითოეულ ქვეყანაში.",
      },
      {
        pregunta: "ინახავთ ჩემს ხელფასს?",
        respuesta: "არა. გამოთვლა თქვენს ბრაუზერში სრულდება. ის, რასაც აზიარებთ, მხოლოდ თარიღებს, პროცენტებსა და ქვეყნებს შეიცავს.",
      },
      {
        pregunta: "რატომ განსხვავდება ჩემი რეალური ხელზე ასაღები ხელფასი?",
        respuesta:
          "ვითვლით მარტოხელა ადამიანისთვის, შვილების გარეშე და საბაზო მნიშვნელობებით. საგადასახადო შეღავათები, პრემიები ან განსაკუთრებული წესები შედეგს ცვლის. თქვენი სიტუაციის ზუსტად გამოსათვლელად გახსენით თქვენი ქვეყნის კალკულატორი.",
      },
      {
        pregunta: "რომელი ქვეყნებია ჩართული?",
        respuesta: `ამჟამად ${n} ქვეყანა, თითოეული საკუთარი ხელფასის კალკულატორითა და ოფიციალური მონაცემებით. ახალ ქვეყნებს ვამატებთ, როგორც კი მათ საგადასახადო წესებს შევამოწმებთ.`,
      },
    ],
    destacado: {
      ceja: "საერთაშორისო შედარება",
      titulo: "წლის რომელ დღემდე მუშაობთ სახელმწიფოსთვის?",
      texto: "შეიყვანეთ თქვენი ხელფასი და ნახეთ, რამდენი დაგრჩებათ ხელზე სხვა ქვეყნებში.",
      ir: "თარიღის გაგება",
    },
  },
};

// ───────────────────────────── hr ─────────────────────────────

// Croata (ADR 0002, D27): «vi» en minúscula, como los bancos y ePorezna; la tarjeta y el texto para
// compartir, en primera persona. Nada de participios ni adjetivos con género sobre la persona («bio sam»,
// «sama»): las frases van en presente o impersonales. El país se declina con GRAMATICA.hr y los días y las
// zemlje con pluralHr. La fecha llega como la da Intl en hr («15. listopada», en genitivo) y se dibuja
// aparte, así que la frase termina en «do».
const gHr = GRAMATICA.hr;
const SEO_HR = "Dan porezne slobode i neto plaća u svijetu";
const danaHr = (d: number) => pluralHr(d, "dan", "dana", "dana");
// Tras «u»: «u 21 zemlji», «u 22 zemlje», «u 25 zemalja».
const zemljamaUHr = (n: number) => pluralHr(n, "zemlji", "zemlje", "zemalja");

const hr: Diccionario<TextosMundo> = {
  base: {
    nombre: "Vaša plaća u svijetu",
    seo: {
      titulo: (pais) => [`${SEO_HR} | ${pais}`, SEO_HR, "Vaša plaća u svijetu"],
      tituloGlobal: [SEO_HR, "Vaša plaća u svijetu"],
      descripcion: (pais, n) => `Saznajte do kojeg dana u godini sa svojom plaćom ${gHr.en(pais)} radite za državu i koliko bi vam neto ostalo u ${zemljamaUHr(n)}. Besplatno, bez registracije.`,
      descripcionGlobal: (n) => `Saznajte do kojeg dana u godini radite za državu i koliko bi vam od plaće neto ostalo u ${zemljamaUHr(n)}. Besplatno, bez registracije.`,
    },
    ceja: "Vaš Dan porezne slobode",
    h1: "Do kojeg dana u godini radite za državu?",
    bajada: (n) => `Unesite bruto plaću i vidjet ćete svoj datum. Zatim ga usporedite u ${zemljamaUHr(n)}, uz istu kupovnu moć i porezna pravila svake zemlje.`,
    form: {
      titulo: "Vaša plaća",
      sueldo: "Bruto plaća",
      mes: "Mjesečno",
      anio: "Godišnje",
      periodo: "Razdoblje plaće",
      pais: "Zemlja u kojoj radite",
      ejemplo: "Primjer",
      ejemploAyuda: "Ovo je primjer plaće. Unesite svoju i svi će se brojevi odmah preračunati.",
      propio: "Preuzeto iz vašeg izračuna.",
      invalido: "Unesite iznos veći od nule.",
      pagas: "Mjesečna plaća s platne liste: zakonske dodatne isplate (13. ili 14. plaća) dodajemo mi. Neto plaća je prosjek za 12 mjeseci.",
    },
    heroe: {
      hasta: (fecha) => `Za državu radite do ${fecha}`,
      tasa: (pct) => `${pct} vaše plaće odlazi na porez na dohodak i obvezne doprinose.`,
      dias: (n, total) => `${n} od ${total} dana`,
      enMano: "Neto vam ostaje",
      porMes: "mjesečno",
      anio: (anio, n, total) => `Godina ${anio}: ${n} od ${total} dana za državu.`,
      resto: "Od sljedećeg dana sve što zaradite pripada vama.",
    },
    ranking: {
      titulo: "Ista plaća, zemlja po zemlja",
      bajada: "Toliko bi vam neto ostalo u svakoj zemlji uz istu kupovnu moć. Svaki redak dolazi iz službenog kalkulatora te zemlje.",
      lista: "Zemlje poredane po neto plaći",
      buscar: "Pretraži zemlju",
      filtrar: "Filtriraj po regiji",
      todas: "Sve",
      regiones: { americas: "Amerika", europa: "Europa", asia: "Azija i Oceanija", africa: "Afrika i Bliski istok" },
      tuPais: "Vaša zemlja",
      mejor: "Najbolje prolazi",
      enMano: "Neto mjesečno",
      enTuMoneda: "U vašoj valuti",
      vsTuPais: "U usporedbi s vašom zemljom",
      verTodos: (n) => `Prikaži sve zemlje (${n})`,
      verMenos: "Prikaži manje",
      sinResultados: (q) => `Nijedna zemlja ne odgovara pretrazi „${q}”.`,
      abrir: (pais) => `Otvori kalkulator ${gHr.para(pais)}`,
      mas: (pct) => `${pct} više`,
      menos: (pct) => `${pct} manje`,
      igual: "Isto",
      puesto: (p, total) => `Vaša zemlja je na ${p}. mjestu od ${total}.`,
    },
    tarjeta: {
      titulo: "Vaša kartica za dijeljenje",
      bajada: "Prikazuje vaš datum i postotke. Koliko zarađujete, na njoj nikada ne piše.",
      hasta: (fecha) => `Za državu radim do ${fecha}`,
      tasa: (pct) => `${pct} moje plaće odlazi na poreze`,
      mejor: (pais, pct) => `S mojom plaćom ${gHr.en(pais)} bi mi ostalo ${pct} više neto`,
      mejorPropio: (pais) => `S mojom plaćom nigdje mi ne ostaje više nego ${gHr.en(pais)}`,
      yVos: "A vi?",
      cta: "Saznajte svoj datum:",
      generica: "Do kojeg dana u godini radite za državu?",
      genericaBajada: (n) => `Vaša plaća u ${zemljamaUHr(n)}, prema službenom kalkulatoru svake od njih`,
      compartir: "Podijeli karticu",
      compartirDuelo: "Odgovori na izazov",
      descargar: "Preuzmi sliku",
      copiado: "Poveznica je kopirana. Zalijepite je gdje vam treba.",
      compartido: "Gotovo, poslano.",
      error: "Dijeljenje nije uspjelo. Pokušajte ponovno.",
      texto: (fecha) => `Za državu radim do ${fecha}. A vi?`,
      alt: "Pregled vaše kartice",
    },
    duelo: {
      amigo: (fecha) => `Osoba koja vam je poslala poveznicu radi za državu do ${fecha}`,
      yVos: "A vi?",
      invitacion: "Unesite svoju plaću i usporedite se.",
      vos: "Vi",
      elAmigo: "Pošiljatelj",
      dia: "Za državu radi do",
      tasa: "Porezi i doprinosi",
      mejorPais: "Najbolje prolazi",
      antes: (d) => `Vaša sloboda počinje ${danaHr(d)} ranije nego kod pošiljatelja.`,
      despues: (d) => `Pošiljatelj ima slobodu ${danaHr(d)} ranije od vas.`,
      empate: "Objema stranama sloboda počinje istog dana.",
      desde: (pais) => `Radi ${gHr.en(pais)}`,
    },
    cero: {
      dia: "nula dana",
      heroeAntes: "Za državu radite",
      tarjetaAntes: "Za državu radim",
      motivo: "Od ove se plaće ne plaćaju ni porez na dohodak ni obvezni doprinosi.",
      texto: "Ove godine ne radim za državu nijedan dan. A vi?",
      amigo: "Osoba koja vam je poslala poveznicu ne radi za državu nijedan dan.",
    },
    metodo: {
      titulo: "Kako računamo",
      estimacion: "Ovo je procjena za usporedbu zemalja, a ne platna lista. Porezne olakšice, djeca ili bonusi mogu promijeniti vaš broj.",
      supuestos: [
        "Osoba bez partnera i djece, sa zadanim vrijednostima kalkulatora svake zemlje.",
        "Neto plaća je ono što ostane nakon poreza na dohodak i doprinosa koje plaća sam zaposlenik. Porezi na potrošnju i doprinosi poslodavca ne računaju se.",
        "Trinaesta plaća ili druge obvezne dodatne isplate raspoređuju se na godinu onako kako propisuje zakon svake zemlje.",
        "U Sjedinjenim Državama ne dodaju se porezi pojedinih saveznih država ni lokalni porezi: samo savezni porez i doprinosi iz plaće.",
        "Za preračun vaše plaće u drugu zemlju koristimo paritet kupovne moći (PPP): isti životni standard, a ne današnji devizni tečaj.",
        "PPP Argentine ažurira se indeksom potrošačkih cijena INDEC-a jer ga Svjetska banka objavljuje samo do 2021.",
        "Dan slobode raspoređuje poreze na godinu od 1. siječnja. Kada na poreze ode 30 % plaće, za državu radite 30 % godine.",
      ],
      ppaTitulo: "Paritet kupovne moći",
      bancoMundial: "Svjetska banka",
      ppa: (organismo, indicador, anio) => `${organismo}, pokazatelj ${indicador}, posljednja dostupna godina: ${anio}.`,
      consultado: (fecha) => `Provjereno ${fecha}`,
      verFuente: "Prikaži izvor",
      fuentesTitulo: "Izvor za svaku zemlju",
      fuentesBajada: "Svaki redak koristi kalkulator neto plaće te zemlje i njezine službene podatke.",
      verificado: (fecha) => `Podaci provjereni ${fecha}`,
      sello: (fecha) => `Službeni podaci provjereni u izvoru svake zemlje. Najstarija provjera: ${fecha}`,
    },
    faqTitulo: "Česta pitanja",
    faq: (n) => [
      {
        pregunta: "Što je Dan porezne slobode?",
        respuesta:
          "To je dan u godini kada biste imali plaćene poreze i doprinose kada bi sve što zaradite od 1. siječnja najprije išlo državi. Ovdje ga računamo iz vaše plaće, a ne iz prosjeka zemlje.",
      },
      {
        pregunta: "Zašto uspoređujemo po kupovnoj moći?",
        respuesta: "Po deviznom tečaju plaća može izgledati ogromno ili sitno, ovisno o danu. Paritet kupovne moći uspoređuje što za taj novac zaista možete kupiti u svakoj zemlji.",
      },
      {
        pregunta: "Čuva li se moja plaća?",
        respuesta: "Ne. Izračun se radi u vašem pregledniku. Ono što dijelite sadrži samo datume, postotke i zemlje.",
      },
      {
        pregunta: "Zašto se moja stvarna neto plaća razlikuje?",
        respuesta:
          "Računamo s osobom bez partnera i djece te sa zadanim vrijednostima. Porezne olakšice, bonusi ili posebni režimi mijenjaju broj. Za točan izračun svoje situacije otvorite kalkulator svoje zemlje.",
      },
      {
        pregunta: "Koje su zemlje ovdje?",
        respuesta: `Danas ${pluralHr(n, "zemlja", "zemlje", "zemalja")}, svaka sa svojim kalkulatorom neto plaće i službenim podacima. Dodajemo nove čim provjerimo njihova porezna pravila.`,
      },
    ],
    destacado: {
      ceja: "Svjetska usporedba",
      titulo: "Do kojeg dana u godini radite za državu?",
      texto: "Unesite plaću i pogledajte koliko bi vam neto ostalo u drugim zemljama.",
      ir: "Izračunaj svoj datum",
    },
  },
};

// ───────────────────────────── mn ─────────────────────────────

// Mongol (ADR 0002, D28): «та» de cortesía; la tarjeta y el texto para compartir van en primera
// persona. El país va con GRAMATICA.mn («Монгол Улсад», «Герман улсад») y tras un número no hay plural
// («3 өдрийн», «40 улсад»); ningún sufijo va pegado a una cifra o a una interpolación. El verbo va al
// final: la fecha queda en medio de la frase y el caso cero se presenta como rótulo más «0 өдөр».
const gMn = GRAMATICA.mn;
const SEO_MN = "Татварын эрх чөлөөний өдөр ба гарт авах цалин, улс орноор";
const diasMn = (d: number) => conteoMn(d, "өдрийн");
const enPaisesMn = (n: number) => conteoMn(n, "улсад");

const mn: Diccionario<TextosMundo> = {
  base: {
    nombre: "Дэлхий дахинд таны цалин",
    seo: {
      titulo: (pais) => [`${SEO_MN} | ${pais}`, SEO_MN, "Дэлхий дахинд таны цалин"],
      tituloGlobal: [SEO_MN, "Дэлхий дахинд таны цалин"],
      descripcion: (pais, n) => `${gMn.en(pais)} авах цалингаараа жилийн аль өдөр хүртэл төрийн төлөө ажилладгаа, ${enPaisesMn(n)} гарт хэдий хэмжээний мөнгө авахаа үзнэ үү. Үнэгүй, бүртгэлгүй.`,
      descripcionGlobal: (n) => `Жилийн аль өдөр хүртэл төрийн төлөө ажилладгаа, ${enPaisesMn(n)} цалингаас тань гарт хэдий хэмжээний мөнгө үлдэхийг үзнэ үү. Үнэгүй, бүртгэлгүй.`,
    },
    ceja: "Таны татварын эрх чөлөөний өдөр",
    h1: "Та жилийн аль өдөр хүртэл төрийн төлөө ажилладаг вэ?",
    bajada: (n) => `Огноогоо харахын тулд нийт цалингаа оруулна уу. Дараа нь ижил худалдан авах чадвараар, улс бүрийн татварын дүрмийн дагуу ${enPaisesMn(n)} харьцуулна уу.`,
    form: {
      titulo: "Таны цалин",
      sueldo: "Нийт цалин",
      mes: "Сард",
      anio: "Жилд",
      periodo: "Цалингийн хугацаа",
      pais: "Таны ажилладаг улс",
      ejemplo: "Жишээ",
      ejemploAyuda: "Энэ бол жишээ цалин. Өөрийн цалингаа оруулбал бүх тоо тэр дор шинэчлэгдэнэ.",
      propio: "Таны тооцооллоос шилжүүлсэн.",
      invalido: "Тэгээс их дүн оруулна уу.",
      pagas: "Цалингийн хуудсан дээрх сарын цалин: хуулиар заавал олгох нэмэлт цалинг (13 эсвэл 14 дэх сарын) бид өөрсдөө нэмнэ. Гарт авах цалин нь 12 сарын дундаж юм.",
    },
    heroe: {
      hasta: (fecha) => `Та ${fecha} хүртэл төрийн төлөө ажилладаг`,
      tasa: (pct) => `Таны цалингийн ${pct} нь орлогын албан татвар болон заавал төлөх шимтгэлд зарцуулагддаг.`,
      dias: (n, total) => `${total} өдрөөс ${n} өдөр`,
      enMano: "Гарт авах",
      porMes: "сард",
      anio: (anio, n, total) => `${anio} онд: ${total} өдрөөс ${n} өдөр нь төрийн төлөө.`,
      resto: "Дараагийн өдрөөс эхлэн таны олсон бүх мөнгө өөрт тань үлдэнэ.",
    },
    ranking: {
      titulo: "Нэг цалин өөр өөр улсад",
      bajada: "Ижил худалдан авах чадвартай бол улс бүрт гарт ийм хэмжээний мөнгө авах байсан. Мөр бүр тухайн улсын албан ёсны тооцоолуураас гардаг.",
      lista: "Улсууд, гарт авах цалингаар",
      buscar: "Улс хайх",
      filtrar: "Бүс нутгаар шүүх",
      todas: "Бүгд",
      regiones: { americas: "Америк", europa: "Европ", asia: "Ази ба Номхон далай", africa: "Африк ба Ойрхи Дорнод" },
      tuPais: "Таны улс",
      mejor: "Хамгийн ашигтай",
      enMano: "Сард гарт авах",
      enTuMoneda: "Таны валютаар",
      vsTuPais: "Таны улстай харьцуулахад",
      verTodos: (n) => `Бүх улсыг харуулах (${n})`,
      verMenos: "Цөөнийг харуулах",
      sinResultados: (q) => `«${q}» гэсэн хайлтад тохирох улс олдсонгүй.`,
      abrir: (pais) => `${gMn.para(pais)} тооцоолуурыг нээх`,
      mas: (pct) => `${pct} илүү`,
      menos: (pct) => `${pct} бага`,
      igual: "Одоогийнхтой ижил",
      puesto: (p, total) => `Таны улс ${total} улсын дотроос ${p} дугаар байранд орж байна.`,
    },
    tarjeta: {
      titulo: "Хуваалцах карт",
      bajada: "Дээр нь огноо, хувь л харагдана. Хэдий хэмжээний цалин авдаг нь хэзээ ч харагдахгүй.",
      hasta: (fecha) => `Би ${fecha} хүртэл төрийн төлөө ажилладаг`,
      tasa: (pct) => `Миний цалингийн ${pct} нь татварт явдаг`,
      mejor: (pais, pct) => `Миний цалингаар ${gMn.en(pais)} гарт авах мөнгө ${pct} илүү байх байсан`,
      mejorPropio: (pais) => `Миний цалингаар надад хамгийн ашигтай улс бол ${gMn.nombre(pais)}`,
      yVos: "Харин та?",
      cta: "Өөрийн огноогоо үзнэ үү:",
      generica: "Та жилийн аль өдөр хүртэл төрийн төлөө ажилладаг вэ?",
      genericaBajada: (n) => `${enPaisesMn(n)} таны цалин, улс бүрийн албан ёсны тооцоолуураар`,
      compartir: "Картыг хуваалцах",
      compartirDuelo: "Сорилтыг хүлээн авах",
      descargar: "Зургийг татаж авах",
      copiado: "Холбоосыг хууллаа. Хүссэн газартаа буулгана уу.",
      compartido: "Амжилттай илгээлээ.",
      error: "Хуваалцаж чадсангүй. Дахин оролдоно уу.",
      texto: (fecha) => `Би ${fecha} хүртэл төрийн төлөө ажилладаг. Харин та?`,
      alt: "Таны картын урьдчилсан харагдац",
    },
    duelo: {
      amigo: (fecha) => `Таны найз ${fecha} хүртэл төрийн төлөө ажилладаг.`,
      yVos: "Харин та?",
      invitacion: "Харьцуулахын тулд цалингаа оруулна уу.",
      vos: "Та",
      elAmigo: "Таны найз",
      dia: "Төрийн төлөө ажиллах хугацаа",
      tasa: "Татвар ба шимтгэл",
      mejorPais: "Хамгийн ашигтай улс",
      antes: (d) => `Та найзаасаа ${diasMn(d)} өмнө чөлөөлөгдөнө.`,
      despues: (d) => `Таны найз танаас ${diasMn(d)} өмнө чөлөөлөгдөнө.`,
      empate: "Та хоёр нэг өдөр чөлөөлөгдөнө.",
      desde: (pais) => `${gMn.en(pais)} ажилладаг`,
    },
    cero: {
      dia: "0 өдөр",
      heroeAntes: "Таны төрийн төлөө ажиллах хугацаа",
      tarjetaAntes: "Миний төрийн төлөө ажиллах хугацаа",
      motivo: "Энэ цалингаас орлогын албан татвар ч, заавал төлөх шимтгэл ч суутгагдахгүй.",
      texto: "Би энэ жил төрийн төлөө нэг ч өдөр ажиллахгүй. Харин та?",
      amigo: "Таны найз төрийн төлөө нэг ч өдөр ажилладаггүй.",
    },
    metodo: {
      titulo: "Бид хэрхэн тооцоолдог вэ",
      estimacion: "Энэ бол улс орнуудыг харьцуулах тооцоолол болохоос цалингийн хуудас биш. Хөнгөлөлт, хүүхэд, урамшуулал таны тоог өөрчилж болно.",
      supuestos: [
        "Ганц бие, хүүхэдгүй хүн гэж үзэж, улс бүрийн тооцоолуурын анхны утгуудыг ашигладаг.",
        "Гарт авах цалин гэдэг нь орлогын албан татвар болон ажилтны өөрөө төлдөг шимтгэлийн дараа үлдэх дүн юм. Хэрэглээний татвар болон ажил олгогчийн төлдөг шимтгэлийг оруулдаггүй.",
        "13 дахь сарын цалин болон бусад заавал олгох нэмэлт төлбөрийг улс бүрийн хуульд заасны дагуу жилд хуваарилдаг.",
        "Америкийн Нэгдсэн Улсын хувьд муж болон орон нутгийн орлогын албан татварыг нэмдэггүй: зөвхөн холбооны татвар болон цалингаас суутгах шимтгэлийг тооцдог.",
        "Таны цалинг өөр улсад шилжүүлэхдээ худалдан авах чадварын паритетыг (ХАЧП) ашигладаг: өнөөдрийн валютын ханшийг бус, ижил амьжиргааны түвшинг харгалздаг.",
        "Аргентин улсын ХАЧП үзүүлэлтийг INDEC байгууллагын хэрэглээний үнийн индексээр шинэчилдэг, учир нь Дэлхийн банк үүнийг зөвхөн 2021 он хүртэл нийтэлсэн.",
        "Эрх чөлөөний өдөр нь татварыг 1-р сарын 1 өдрөөс эхлэн жилд хуваарилдаг. Цалингийн 30 хувь нь татварт явдаг бол та жилийн 30 хувийг төрийн төлөө ажилладаг.",
      ],
      ppaTitulo: "Худалдан авах чадварын паритет",
      bancoMundial: "Дэлхийн банк",
      ppa: (organismo, indicador, anio) => `${organismo}, ${indicador} үзүүлэлт, хамгийн сүүлийн боломжит он: ${anio}.`,
      consultado: (fecha) => `Шалгасан огноо: ${fecha}`,
      verFuente: "Эх сурвалжийг үзэх",
      fuentesTitulo: "Улс бүрийн эх сурвалж",
      fuentesBajada: "Мөр бүр тухайн улсын гарт авах цалингийн тооцоолуур болон албан ёсны мэдээллийг ашигладаг.",
      verificado: (fecha) => `Мэдээллийг шалгасан огноо: ${fecha}`,
      sello: (fecha) => `Албан ёсны мэдээллийг улс бүрийн эх сурвалжаас шалгасан. Хамгийн эртний шалгалтын огноо: ${fecha}`,
    },
    faqTitulo: "Түгээмэл асуултууд",
    faq: (n) => [
      {
        pregunta: "Татварын эрх чөлөөний өдөр гэж юу вэ?",
        respuesta:
          "Хэрэв 1-р сарын 1 өдрөөс хойш олсон бүх мөнгө тань эхлээд төрд очдог бол татвараа төлж дуусах өдөр юм. Энд үүнийг улсын дундаж цалингаар бус, таны цалингаар тооцоолсон.",
      },
      {
        pregunta: "Яагаад худалдан авах чадвараар харьцуулдаг вэ?",
        respuesta: "Валютын ханшаас болж нэг цалин тухайн өдрөөс хамааран асар их эсвэл өчүүхэн мэт харагдаж болно. ХАЧП нь тэр мөнгөөр улс бүрт үнэхээр юу худалдаж авч болохыг харьцуулдаг.",
      },
      {
        pregunta: "Миний цалинг хадгалдаг уу?",
        respuesta: "Үгүй. Тооцоолол таны хөтөч дотор хийгддэг. Таны хуваалцах зүйлд зөвхөн огноо, хувь, улсын нэр багтана.",
      },
      {
        pregunta: "Миний бодит гарт авах цалин яагаад өөр байна вэ?",
        respuesta:
          "Бид ганц бие, хүүхэдгүй хүн болон анхны утгуудыг авч үздэг. Хөнгөлөлт, урамшуулал, тусгай дэглэм тоог өөрчилдөг. Өөрийн тохиолдлын яг тооцооллыг авахын тулд өөрийн улсын тооцоолуурыг нээнэ үү.",
      },
      {
        pregunta: "Ямар улсууд багтсан бэ?",
        respuesta: `Өнөөдөр ${conteoMn(n, "улс")} багтсан бөгөөд улс бүр гарт авах цалингийн өөрийн тооцоолуур, албан ёсны мэдээлэлтэй. Татварын дүрмийг нь шалгасны дараа шинэ улсуудыг нэмдэг.`,
      },
    ],
    destacado: {
      ceja: "Дэлхийн харьцуулалт",
      titulo: "Та жилийн аль өдөр хүртэл төрийн төлөө ажилладаг вэ?",
      texto: "Цалингаа оруулаад бусад улсад гарт хэдий хэмжээний мөнгө авахаа үзнэ үү.",
      ir: "Өөрийн огноогоо үзэх",
    },
  },
};

// ───────────────────────────── hy ─────────────────────────────

// Armenio (ADR 0002, D30): «Դուք» de cortesía con mayúscula; la tarjeta y el texto para compartir van
// en primera persona. El país va con GRAMATICA.hy y los días y países en singular detrás del número
// («3 օր», «41 երկրում»). Las fechas de Intl se presentan con «՝», sin sufijos pegados.
const gHy = GRAMATICA.hy;
const SEO_HY = "Հարկային ազատության օր և զուտ աշխատավարձ ըստ երկրի";
const NOMBRE_HY = "Ձեր աշխատավարձն աշխարհում";
const diasHy = (d: number) => `${d} օր`;
const enPaisesHy = (n: number) => `${n} երկրում`;

const hy: Diccionario<TextosMundo> = {
  base: {
    nombre: NOMBRE_HY,
    seo: {
      titulo: (pais) => [`${SEO_HY} | ${pais}`, SEO_HY, NOMBRE_HY],
      tituloGlobal: [SEO_HY, NOMBRE_HY],
      descripcion: (pais, n) => `Տեսեք՝ մինչև որ օրն եք աշխատում պետության համար ${gHy.en(pais)} և որքան զուտ կստանայիք ${enPaisesHy(n)}։ Անվճար, առանց գրանցման։`,
      descripcionGlobal: (n) => `Տեսեք՝ մինչև որ օրն եք աշխատում պետության համար և որքան զուտ կստանայիք ${enPaisesHy(n)}։ Անվճար, առանց գրանցման։`,
    },
    ceja: "Ձեր Հարկային ազատության օրը",
    h1: "Մինչև տարվա ո՞ր օրն եք աշխատում պետության համար",
    bajada: (n) => `Մուտքագրեք Ձեր համախառն աշխատավարձը, որպեսզի տեսնեք Ձեր ամսաթիվը։ Հետո համեմատեք այն ${enPaisesHy(n)}, նույն գնողունակությամբ և յուրաքանչյուր երկրի հարկային կանոններով։`,
    form: {
      titulo: "Ձեր աշխատավարձը",
      sueldo: "Համախառն աշխատավարձ",
      mes: "Ամսական",
      anio: "Տարեկան",
      periodo: "Աշխատավարձի ժամանակահատված",
      pais: "Երկիրը, որտեղ աշխատում եք",
      ejemplo: "Օրինակ",
      ejemploAyuda: "Սա օրինակելի աշխատավարձ է։ Մուտքագրեք Ձերը, և բոլոր թվերը անմիջապես կթարմացվեն։",
      propio: "Փոխանցված է Ձեր հաշվարկից։",
      invalido: "Մուտքագրեք զրոյից մեծ գումար։",
      pagas: "Նշեք Ձեր աշխատավարձի թերթիկի ամսական գումարը՝ օրենքով պարտադիր լրացուցիչ վճարները (տասներեքերորդ կամ տասնչորսերորդ աշխատավարձ) մենք ենք ավելացնում։ Զուտ աշխատավարձը 12 ամսվա միջինն է։",
    },
    heroe: {
      hasta: (fecha) => `Պետության համար աշխատում եք մինչև՝ ${fecha}`,
      tasa: (pct) => `Ձեր աշխատավարձից ${pct} գնում է եկամտային հարկին և պարտադիր վճարներին։`,
      dias: (n, total) => `${n} օր՝ ${total} օրից`,
      enMano: "Զուտ",
      porMes: "ամսական",
      anio: (anio, n, total) => `${anio} թվական՝ ${n} օր ${total} օրից պետության համար։`,
      resto: "Հաջորդ օրվանից Ձեր վաստակածն ամբողջությամբ մնում է Ձեզ։",
    },
    ranking: {
      titulo: "Նույն աշխատավարձը տարբեր երկրներում",
      bajada: "Այսքան զուտ կստանայիք յուրաքանչյուր երկրում՝ նույն գնողունակությամբ։ Յուրաքանչյուր տող գալիս է տվյալ երկրի պաշտոնական հաշվիչից։",
      lista: "Երկրներ՝ ըստ զուտ աշխատավարձի",
      buscar: "Որոնեք երկիրը",
      filtrar: "Զտել ըստ տարածաշրջանի",
      todas: "Բոլորը",
      regiones: { americas: "Ամերիկա", europa: "Եվրոպա", asia: "Ասիա և Օվկիանիա", africa: "Աֆրիկա և Մերձավոր Արևելք" },
      tuPais: "Ձեր երկիրը",
      mejor: "Ամենաշահավետը",
      enMano: "Զուտ՝ ամսական",
      enTuMoneda: "Ձեր արժույթով",
      vsTuPais: "Ձեր երկրի համեմատ",
      verTodos: (n) => `Ցույց տալ բոլոր երկրները (${n})`,
      verMenos: "Ցույց տալ ավելի քիչ",
      sinResultados: (q) => `«${q}» հարցմանը համապատասխանող երկիր չկա։`,
      abrir: (pais) => `Բացել հաշվիչը ${gHy.para(pais)}`,
      mas: (pct) => `${pct} ավելի շատ`,
      menos: (pct) => `${pct} ավելի քիչ`,
      igual: "Նույնքան, որքան հիմա",
      puesto: (p, total) => `Ձեր երկրի դիրքը՝ ${p}, ընդհանուր՝ ${total}։`,
    },
    tarjeta: {
      titulo: "Ձեր քարտը՝ կիսվելու համար",
      bajada: "Քարտին երևում են ամսաթիվը և տոկոսները։ Որքան եք վաստակում, երբեք չի երևում։",
      hasta: (fecha) => `Պետության համար աշխատում եմ մինչև՝ ${fecha}`,
      tasa: (pct) => `Իմ աշխատավարձից ${pct} գնում է հարկերին`,
      mejor: (pais, pct) => `Իմ աշխատավարձով ${gHy.en(pais)} ինձ զուտ ${pct} ավելի շատ կմնար`,
      mejorPropio: (pais) => `${gHy.nombre(pais)} լավագույն երկիրն է ինձ համար՝ իմ աշխատավարձով`,
      yVos: "Իսկ Դո՞ւք",
      cta: "Տեսեք Ձեր ամսաթիվը՝",
      generica: "Մինչև տարվա ո՞ր օրն եք աշխատում պետության համար",
      genericaBajada: (n) => `Ձեր աշխատավարձը ${enPaisesHy(n)}, ըստ յուրաքանչյուրի պաշտոնական հաշվիչի`,
      compartir: "Կիսվել քարտով",
      compartirDuelo: "Ընդունել մարտահրավերը",
      descargar: "Ներբեռնել պատկերը",
      copiado: "Հղումը պատճենվեց։ Տեղադրեք այն, որտեղ ուզում եք։",
      compartido: "Պատրաստ է, ուղարկված է։",
      error: "Չհաջողվեց կիսվել։ Փորձեք կրկին։",
      texto: (fecha) => `Պետության համար աշխատում եմ մինչև՝ ${fecha}, իսկ Դո՞ւք`,
      alt: "Ձեր քարտի նախադիտում",
    },
    duelo: {
      amigo: (fecha) => `Ձեր ընկերը պետության համար աշխատում է մինչև՝ ${fecha}`,
      yVos: "Իսկ Դո՞ւք",
      invitacion: "Մուտքագրեք Ձեր աշխատավարձը՝ համեմատելու համար։",
      vos: "Դուք",
      elAmigo: "Ձեր ընկերը",
      dia: "Պետության համար աշխատում է մինչև՝",
      tasa: "Հարկեր և պարտադիր վճարներ",
      mejorPais: "Ամենաշահավետ երկիրը",
      antes: (d) => `Դուք ազատվում եք Ձեր ընկերոջից ${diasHy(d)} շուտ։`,
      despues: (d) => `Ձեր ընկերն ազատվում է Ձեզնից ${diasHy(d)} շուտ։`,
      empate: "Երկուսդ էլ ազատվում եք նույն օրը։",
      desde: (pais) => `Աշխատում է ${gHy.en(pais)}`,
    },
    cero: {
      dia: "ոչ մի օր",
      heroeAntes: "Պետության համար չեք աշխատում",
      tarjetaAntes: "Պետության համար չեմ աշխատում",
      motivo: "Այս աշխատավարձից չեն պահվում ո՛չ եկամտային հարկ, ո՛չ պարտադիր վճարներ։",
      texto: "Այս տարի պետության համար չեմ աշխատում ոչ մի օր, իսկ Դո՞ւք",
      amigo: "Ձեր ընկերը պետության համար չի աշխատում ոչ մի օր։",
    },
    metodo: {
      titulo: "Ինչպես ենք հաշվարկում",
      estimacion: "Սա գնահատական է երկրների համեմատության համար, ոչ թե աշխատավարձի թերթիկ։ Արտոնությունները, երեխաները կամ պարգևավճարները կարող են փոխել Ձեր թիվը։",
      supuestos: [
        "Միայնակ անձ՝ առանց երեխաների, յուրաքանչյուր երկրի հաշվիչի լռելյայն արժեքներով։",
        "Զուտ աշխատավարձը այն է, ինչ մնում է եկամտային հարկից և աշխատողի վճարած պարտադիր վճարներից հետո։ Սպառման հարկերը և գործատուի վճարները չեն ներառվում։",
        "Տասներեքերորդ աշխատավարձը և մյուս պարտադիր լրացուցիչ վճարները բաշխվում են տարվա ընթացքում այնպես, ինչպես նախատեսում է յուրաքանչյուր երկրի օրենքը։",
        "Միացյալ Նահանգների համար չեն ավելացվում նահանգային և տեղական եկամտային հարկերը՝ միայն դաշնային հարկը և աշխատավարձից պահումները։",
        "Ձեր աշխատավարձը մեկ այլ երկիր փոխադրելու համար օգտագործում ենք գնողունակության պարիտետը (ԳՊ)՝ կենսամակարդակի նույն աստիճանը, ոչ թե այսօրվա փոխարժեքը։",
        "Արգենտինայի ԳՊ ցուցանիշը թարմացվում է INDEC սպառողական գների ինդեքսով, քանի որ Համաշխարհային բանկը այն հրապարակում է միայն մինչև 2021 թվականը։",
        "Ազատության օրը հարկերը բաշխում է տարվա վրա՝ սկսած հունվարի սկզբից։ Եթե Ձեր աշխատավարձից 30% գնում է հարկերին, պետության համար աշխատում եք տարվա 30% մասում։",
      ],
      ppaTitulo: "Գնողունակության պարիտետ",
      bancoMundial: "Համաշխարհային բանկ",
      ppa: (organismo, indicador, anio) => `${organismo}, ցուցանիշ՝ ${indicador}, վերջին հասանելի տարին՝ ${anio}։`,
      consultado: (fecha) => `Ստուգված է՝ ${fecha}`,
      verFuente: "Տեսնել աղբյուրը",
      fuentesTitulo: "Աղբյուրը՝ ըստ երկրի",
      fuentesBajada: "Յուրաքանչյուր տող օգտագործում է տվյալ երկրի զուտ աշխատավարձի հաշվիչը և նրա պաշտոնական տվյալները։",
      verificado: (fecha) => `Տվյալները ստուգված են՝ ${fecha}`,
      sello: (fecha) => `Պաշտոնական տվյալները ստուգված են յուրաքանչյուր երկրի աղբյուրում։ Ամենահին ստուգումը՝ ${fecha}`,
    },
    faqTitulo: "Հաճախ տրվող հարցեր",
    faq: (n) => [
      {
        pregunta: "Ի՞նչ է Հարկային ազատության օրը",
        respuesta:
          "Դա տարվա այն օրն է, երբ ավարտում եք հարկերի վճարումը, եթե հունվարի սկզբից ամբողջ վաստակածը նախ գնար պետությանը։ Այստեղ այն հաշվարկված է Ձեր աշխատավարձով, ոչ թե երկրի միջինով։",
      },
      {
        pregunta: "Ինչո՞ւ է համեմատությունը ըստ գնողունակության",
        respuesta: "Փոխարժեքի պատճառով նույն աշխատավարձը կարող է թվալ հսկայական կամ չնչին՝ կախված օրից։ ԳՊ ցուցանիշը համեմատում է, թե իրականում ինչ կարելի է գնել այդ գումարով յուրաքանչյուր երկրում։",
      },
      {
        pregunta: "Իմ աշխատավարձը պահպանվո՞ւմ է",
        respuesta: "Ոչ։ Հաշվարկը կատարվում է Ձեր դիտարկիչում։ Այն, ինչով կիսվում եք, պարունակում է միայն ամսաթվեր, տոկոսներ և երկրներ։",
      },
      {
        pregunta: "Ինչո՞ւ է իմ իրական զուտ աշխատավարձը տարբեր",
        respuesta:
          "Ենթադրում ենք միայնակ անձ՝ առանց երեխաների, և լռելյայն արժեքներ։ Արտոնությունները, պարգևավճարները կամ հատուկ ռեժիմները փոխում են թիվը։ Ձեր դեպքի ճշգրիտ հաշվարկի համար բացեք Ձեր երկրի հաշվիչը։",
      },
      {
        pregunta: "Ո՞ր երկրներն են ներառված",
        respuesta: `Այսօր՝ ${n} երկիր, յուրաքանչյուրը՝ զուտ աշխատավարձի իր հաշվիչով և պաշտոնական տվյալներով։ Նորերն ավելացնում ենք, երբ ստուգում ենք դրանց հարկային կանոնները։`,
      },
    ],
    destacado: {
      ceja: "Համեմատություն աշխարհում",
      titulo: "Մինչև տարվա ո՞ր օրն եք աշխատում պետության համար",
      texto: "Մուտքագրեք Ձեր աշխատավարձը և տեսեք, թե որքան զուտ կստանայիք այլ երկրներում։",
      ir: "Տեսնել Ձեր ամսաթիվը",
    },
  },
};

// ───────────────────────────── sq ─────────────────────────────

// Albanés (ADR 0002, D31).
const gSq = GRAMATICA.sq;
const SEO_SQ = "Dita e lirisë fiskale dhe paga neto në çdo vend";
const ditetSq = (d: number) => pluralSq(d, "ditë", "ditë");
const enVendeSq = (n: number) => `në ${pluralSq(n, "vend", "vende")}`;

const sq: Diccionario<TextosMundo> = {
  base: {
    nombre: "Paga juaj në botë",
    seo: {
      titulo: (pais) => [`${SEO_SQ} | ${pais}`, SEO_SQ, "Paga juaj në botë"],
      tituloGlobal: [SEO_SQ, "Paga juaj në botë"],
      descripcion: (pais, n) => `Zbuloni deri në cilën ditë të vitit punoni për shtetin me një pagë ${gSq.en(pais)} dhe sa do të merrnit neto ${enVendeSq(n)}. Falas, pa llogari.`,
      descripcionGlobal: (n) => `Zbuloni deri në cilën ditë të vitit punoni për shtetin dhe sa do të ishte paga juaj neto ${enVendeSq(n)}. Falas, pa llogari.`,
    },
    ceja: "Dita juaj e lirisë fiskale",
    h1: "Deri në cilën ditë të vitit punoni për shtetin?",
    bajada: (n) => `Vendosni pagën bruto për të parë datën. Pastaj krahasojeni ${enVendeSq(n)}, me të njëjtën fuqi blerëse dhe me rregullat tatimore të secilit vend.`,
    form: {
      titulo: "Paga juaj",
      sueldo: "Paga bruto",
      mes: "Në muaj",
      anio: "Në vit",
      periodo: "Periudha e pagës",
      pais: "Vendi ku punoni",
      ejemplo: "Shembull",
      ejemploAyuda: "Kjo është një pagë shembull. Vendosni tuajën dhe të gjitha shifrat përditësohen menjëherë.",
      propio: "Marrë nga llogaritja juaj.",
      invalido: "Vendosni një shumë më të madhe se zero.",
      pagas: "Paga mujore nga fletëpagesa juaj: pagesat shtesë të detyrueshme me ligj (paga e 13-të ose e 14-të) i shtojmë ne. Paga neto është mesatarja për 12 muaj.",
    },
    heroe: {
      hasta: (fecha) => `Punoni për shtetin deri më ${fecha}`,
      tasa: (pct) => `Nga paga juaj, ${pct} shkon për tatimin mbi të ardhurat dhe për kontributet e detyrueshme.`,
      dias: (n, total) => `${n} nga ${ditetSq(total)}`,
      enMano: "Neto",
      porMes: "në muaj",
      anio: (anio, n, total) => `${anio}: ${n} nga ${ditetSq(total)} për shtetin.`,
      resto: "Nga dita tjetër, gjithçka që fitoni mbetet për ju.",
    },
    ranking: {
      titulo: "E njëjta pagë në çdo vend",
      bajada: "Kaq do të merrnit neto në çdo vend, me të njëjtën fuqi blerëse. Çdo rresht vjen nga kalkulatori zyrtar i atij vendi. Kudo është e njëjta pagë: ndryshojnë vetëm tatimet dhe kontributet, jo sa fitohet në secilin vend.",
      lista: "Vendet sipas pagës neto",
      buscar: "Kërkoni një vend",
      filtrar: "Filtroni sipas rajonit",
      todas: "Të gjitha",
      regiones: { americas: "Amerikat", europa: "Evropa", asia: "Azia dhe Oqeania", africa: "Afrika dhe Lindja e Mesme" },
      tuPais: "Vendi juaj",
      mejor: "Taksat më të ulëta",
      enMano: "Neto në muaj",
      enTuMoneda: "Në monedhën tuaj",
      vsTuPais: "Krahasuar me vendin tuaj",
      verTodos: (n) => `Shikoni të gjitha vendet (${n})`,
      verMenos: "Shikoni më pak",
      sinResultados: (q) => `Asnjë vend nuk përputhet me kërkimin “${q}”.`,
      abrir: (pais) => `Hapni kalkulatorin e ${rasatSq(pais).gjinore}`,
      mas: (pct) => `${pct} më shumë`,
      menos: (pct) => `${pct} më pak`,
      igual: "Njësoj",
      puesto: (p, total) => `Vendi juaj është në pozicionin ${p} nga ${total}.`,
    },
    tarjeta: {
      titulo: "Imazhi juaj për t'u shpërndarë",
      bajada: "Tregon datën dhe përqindjet tuaja. Sa fitoni nuk shfaqet kurrë.",
      hasta: (fecha) => `Punoj për shtetin deri më ${fecha}`,
      tasa: (pct) => `${pct} e pagës sime shkon për tatime`,
      mejor: (pais, pct) => `Me të njëjtën pagë, ${gSq.en(pais)} do të paguaja më pak taksa: ${pct} më shumë neto`,
      mejorPropio: (pais) => `Me të njëjtën pagë, taksat më të ulëta i paguaj ${gSq.en(pais)}`,
      yVos: "Po ju?",
      cta: "Zbuloni datën tuaj:",
      generica: "Deri në cilën ditë të vitit punoni për shtetin?",
      genericaBajada: (n) => `Paga juaj ${enVendeSq(n)}, me kalkulatorin zyrtar të secilit`,
      compartir: "Shpërndani imazhin",
      compartirDuelo: "Pranoni sfidën",
      descargar: "Shkarkoni imazhin",
      copiado: "Lidhja u kopjua. Ngjiteni ku të dëshironi.",
      compartido: "Gati, u dërgua.",
      error: "Nuk u shpërnda dot. Provoni përsëri.",
      texto: (fecha) => `Punoj për shtetin deri më ${fecha}. Po ju?`,
      alt: "Pamje paraprake e imazhit tuaj",
    },
    duelo: {
      amigo: (fecha) => `Personi që ju dërgoi sfidën punon për shtetin deri më ${fecha}.`,
      yVos: "Po ju?",
      invitacion: "Vendosni pagën për të krahasuar.",
      vos: "Ju",
      elAmigo: "Personi tjetër",
      dia: "Punon për shtetin deri më",
      tasa: "Tatime dhe kontribute",
      mejorPais: "Taksat më të ulëta",
      antes: (d) => `Çliroheni ${ditetSq(d)} më herët se personi tjetër.`,
      despues: (d) => `Personi tjetër çlirohet ${ditetSq(d)} më herët se ju.`,
      empate: "Keni të njëjtën ditë të lirisë fiskale.",
      desde: (pais) => `Punon ${gSq.en(pais)}`,
    },
    cero: {
      dia: "asnjë ditë",
      heroeAntes: "Nuk punoni për shtetin",
      tarjetaAntes: "Nuk punoj për shtetin",
      motivo: "Nga kjo pagë nuk mbahet as tatim mbi të ardhurat, as kontribute të detyrueshme.",
      texto: "Këtë vit nuk punoj asnjë ditë për shtetin. Po ju?",
      amigo: "Personi që ju dërgoi sfidën nuk punon asnjë ditë për shtetin.",
    },
    metodo: {
      titulo: "Si e llogaritim",
      estimacion: "Kjo është një përllogaritje për të krahasuar vende, jo një fletëpagesë. Zbritjet, fëmijët ose bonuset mund ta ndryshojnë shifrën tuaj.",
      supuestos: [
        "Një person i pamartuar dhe pa fëmijë, me vlerat e paracaktuara të kalkulatorit të secilit vend.",
        "Paga neto është ajo që mbetet pas tatimit mbi të ardhurat dhe kontributeve që paguan punëmarrësi. Taksat mbi konsumin dhe kontributet e punëdhënësit nuk përfshihen në llogaritje.",
        "Paga e 13-të dhe pagesat e tjera shtesë të detyrueshme ndahen gjatë vitit siç e parashikon ligji i secilit vend.",
        "Në Shtetet e Bashkuara nuk shtohen tatimi shtetëror dhe ai vendor: vetëm tatimi federal dhe kontributet mbi pagën.",
        "Për ta çuar pagën tuaj në një vend tjetër përdorim paritetin e fuqisë blerëse (PFB): i njëjti nivel jetese, jo kursi i sotëm i këmbimit.",
        "PFB-ja e Argjentinës përditësohet me indeksin e çmimeve të konsumit të INDEC, sepse Banka Botërore e publikon vetëm deri në vitin 2021.",
        "Dita e lirisë i ndan tatimet gjatë gjithë vitit, duke filluar nga 1 janari. Nëse 30% e pagës shkon për tatime, punoni për shtetin 30% të vitit.",
      ],
      ppaTitulo: "Pariteti i fuqisë blerëse",
      bancoMundial: "Banka Botërore",
      ppa: (organismo, indicador, anio) => `${organismo}, treguesi ${indicador}, viti i fundit i disponueshëm: ${anio}.`,
      consultado: (fecha) => `Konsultuar më ${fecha}.`,
      verFuente: "Shikoni burimin",
      fuentesTitulo: "Burimi i secilit vend",
      fuentesBajada: "Çdo rresht përdor kalkulatorin e pagës neto të atij vendi dhe të dhënat e tij zyrtare.",
      verificado: (fecha) => `Të dhëna të verifikuara më ${fecha}`,
      sello: (fecha) => `Të dhëna zyrtare të verifikuara në burimin e secilit vend. Verifikimi më i vjetër: ${fecha}.`,
    },
    faqTitulo: "Pyetje të shpeshta",
    faq: (n) => [
      {
        pregunta: "Çfarë është dita e lirisë fiskale?",
        respuesta:
          "Është dita e vitit kur mbaroni së paguari tatimet, sikur gjithçka që fitoni nga 1 janari të shkonte fillimisht te shteti. Këtu llogaritet me pagën tuaj, jo me mesataren e vendit.",
      },
      {
        pregunta: "Pse krahasimi bëhet sipas fuqisë blerëse?",
        respuesta: "Për shkak të kursit të këmbimit, një pagë mund të duket shumë e madhe ose shumë e vogël në varësi të ditës. PFB-ja krahason atë që mund të blihet vërtet me këto para në çdo vend.",
      },
      {
        pregunta: "A ruhet paga ime?",
        respuesta: "Jo. Llogaritja bëhet në shfletuesin tuaj. Ajo që shpërndani përmban vetëm data, përqindje dhe vende.",
      },
      {
        pregunta: "Pse paga ime neto reale është ndryshe?",
        respuesta:
          "Nisemi nga një person i pamartuar, pa fëmijë dhe me vlerat e paracaktuara. Zbritjet, bonuset ose regjimet e veçanta e ndryshojnë shifrën. Për një llogaritje të saktë për rastin tuaj, hapni kalkulatorin e vendit ku punoni.",
      },
      {
        pregunta: "Cilat vende përfshihen?",
        respuesta: `Sot lista ka ${pluralSq(n, "vend", "vende")}, secili me kalkulatorin e vet të pagës neto dhe me të dhëna zyrtare. Shtojmë të tjera sapo t'ua verifikojmë rregullat tatimore.`,
      },
    ],
    destacado: {
      ceja: "Krahasim botëror",
      titulo: "Deri në cilën ditë të vitit punoni për shtetin?",
      texto: "Vendosni pagën dhe shikoni sa do të merrnit neto në vende të tjera.",
      ir: "Zbuloni datën tuaj",
    },
  },
};

// ───────────────────────────── sl ─────────────────────────────

// Esloveno (ADR 0002, D32): «vi» en minúscula, como los bancos y eDavki; la tarjeta y el texto para
// compartir, en primera persona. Nada de participios con género sobre la persona: presente o impersonal. El
// país se declina con GRAMATICA.sl y los números con pluralSl. La fecha llega de Intl en nominativo
// («15. oktober») y se dibuja aparte, así que la frase termina en dos puntos: «do» pediría genitivo.
const gSl = GRAMATICA.sl;
const SEO_SL = "Dan davčne svobode in neto plača po svetu";
const dniSl = (d: number) => pluralSl(d, "dan", "dneva", "dni", "dni");
// Tras «v»: «v 1 državi», «v 2 državah», «v 25 državah».
const drzavahSl = (n: number) => pluralSl(n, "državi", "državah", "državah", "državah");

const sl: Diccionario<TextosMundo> = {
  base: {
    nombre: "Vaša plača po svetu",
    seo: {
      titulo: (pais) => [`${SEO_SL} | ${pais}`, SEO_SL, "Vaša plača po svetu"],
      tituloGlobal: [SEO_SL, "Vaša plača po svetu"],
      descripcion: (pais, n) => `Ugotovite, do katerega dne v letu s svojo plačo ${gSl.en(pais)} delate za državo in koliko neto bi vam ostalo v ${drzavahSl(n)}. Brezplačno, brez registracije.`,
      descripcionGlobal: (n) => `Ugotovite, do katerega dne v letu delate za državo in koliko neto plače bi vam ostalo v ${drzavahSl(n)}. Brezplačno, brez registracije.`,
    },
    ceja: "Vaš dan davčne svobode",
    h1: "Do katerega dne v letu delate za državo?",
    bajada: (n) => `Vnesite bruto plačo in videli boste svoj datum. Nato ga primerjajte v ${drzavahSl(n)}, z enako kupno močjo in davčnimi pravili vsake države.`,
    form: {
      titulo: "Vaša plača",
      sueldo: "Bruto plača",
      mes: "Na mesec",
      anio: "Na leto",
      periodo: "Obdobje plače",
      pais: "Država, v kateri delate",
      ejemplo: "Primer",
      ejemploAyuda: "To je primer plače. Vnesite svojo in vse številke se bodo takoj preračunale.",
      propio: "Prevzeto iz vašega izračuna.",
      invalido: "Vnesite znesek, večji od nič.",
      pagas: "Mesečna plača s plačilne liste: zakonska dodatna izplačila (13. ali 14. plača) dodamo mi. Neto plača je povprečje za 12 mesecev.",
    },
    heroe: {
      hasta: (fecha) => `Za državo delate do tega dne: ${fecha}`,
      tasa: (pct) => `${pct} vaše plače gre za dohodnino in obvezne prispevke.`,
      dias: (n, total) => `Dnevi za državo: ${n} od ${total}`,
      enMano: "Neto vam ostane",
      porMes: "na mesec",
      anio: (anio, n, total) => `Leto ${anio}: dnevi za državo: ${n} od ${total}.`,
      resto: "Od naslednjega dne je vse, kar zaslužite, vaše.",
    },
    ranking: {
      titulo: "Ista plača, država za državo",
      bajada: "Toliko neto bi vam ostalo v vsaki državi pri enaki kupni moči. Vsaka vrstica prihaja iz uradnega kalkulatorja te države.",
      lista: "Države, razvrščene po neto plači",
      buscar: "Poiščite državo",
      filtrar: "Filtriraj po regiji",
      todas: "Vse",
      regiones: { americas: "Amerika", europa: "Evropa", asia: "Azija in Oceanija", africa: "Afrika in Bližnji vzhod" },
      tuPais: "Vaša država",
      mejor: "Najboljši rezultat",
      enMano: "Neto na mesec",
      enTuMoneda: "V vaši valuti",
      vsTuPais: "V primerjavi z vašo državo",
      verTodos: (n) => `Prikaži vse države (${n})`,
      verMenos: "Prikaži manj",
      sinResultados: (q) => `Nobena država ne ustreza iskanju „${q}“.`,
      abrir: (pais) => `Odpri kalkulator ${gSl.para(pais)}`,
      mas: (pct) => `${pct} več`,
      menos: (pct) => `${pct} manj`,
      igual: "Enako",
      puesto: (p, total) => `Vaša država je na ${p}. mestu od ${total}.`,
    },
    tarjeta: {
      titulo: "Vaša kartica za deljenje",
      bajada: "Prikazuje vaš datum in odstotke. Koliko zaslužite, na njej nikoli ne piše.",
      hasta: (fecha) => `Za državo delam do tega dne: ${fecha}`,
      tasa: (pct) => `${pct} moje plače gre za davke`,
      mejor: (pais, pct) => `Z mojo plačo bi mi ${gSl.en(pais)} ostalo ${pct} več neto`,
      mejorPropio: (pais) => `Z mojo plačo mi nikjer ne ostane več kot ${gSl.en(pais)}`,
      yVos: "Kaj pa vi?",
      cta: "Ugotovite svoj datum:",
      generica: "Do katerega dne v letu delate za državo?",
      genericaBajada: (n) => `Vaša plača v ${drzavahSl(n)}, po uradnem kalkulatorju vsake od njih`,
      compartir: "Deli kartico",
      compartirDuelo: "Odgovori na izziv",
      descargar: "Prenesi sliko",
      copiado: "Povezava je kopirana. Prilepite jo, kamor želite.",
      compartido: "Končano, poslano.",
      error: "Deljenje ni uspelo. Poskusite znova.",
      texto: (fecha) => `Za državo delam do tega dne: ${fecha}. Kaj pa vi?`,
      alt: "Predogled vaše kartice",
    },
    duelo: {
      amigo: (fecha) => `Oseba, ki vam je poslala povezavo, dela za državo do tega dne: ${fecha}`,
      yVos: "Kaj pa vi?",
      invitacion: "Vnesite svojo plačo in se primerjajte.",
      vos: "Vi",
      elAmigo: "Pošiljatelj",
      dia: "Za državo dela do tega dne",
      tasa: "Davki in prispevki",
      mejorPais: "Najboljši rezultat",
      antes: (d) => `Razlika v vašo korist: ${dniSl(d)}. Vaša svoboda se začne prej kot pri pošiljatelju.`,
      despues: (d) => `Razlika v korist pošiljatelja: ${dniSl(d)}. Njegova svoboda se začne prej kot vaša.`,
      empate: "Obema se svoboda začne isti dan.",
      desde: (pais) => `Delo ${gSl.en(pais)}`,
    },
    cero: {
      dia: "nič dni",
      heroeAntes: "Za državo delate",
      tarjetaAntes: "Za državo delam",
      motivo: "Od te plače se ne plačujeta niti dohodnina niti obvezni prispevki.",
      texto: "Letos ne delam za državo niti en dan. Kaj pa vi?",
      amigo: "Oseba, ki vam je poslala povezavo, ne dela za državo niti en dan.",
    },
    metodo: {
      titulo: "Kako računamo",
      estimacion: "To je ocena za primerjavo držav, ne plačilna lista. Davčne olajšave, otroci ali bonusi lahko spremenijo vašo številko.",
      supuestos: [
        "Oseba brez partnerja in otrok, s privzetimi vrednostmi kalkulatorja vsake države.",
        "Neto plača je to, kar ostane po dohodnini in prispevkih, ki jih plača sam zaposleni. Davki na potrošnjo in prispevki delodajalca se ne upoštevajo.",
        "Trinajsta plača ali druga obvezna dodatna izplačila se razporedijo na leto tako, kot določa zakon vsake države.",
        "V Združenih državah se ne dodajo davki posameznih zveznih držav ali lokalni davki: samo zvezni davek in prispevki iz plače.",
        "Za preračun vaše plače v drugo državo uporabljamo pariteto kupne moči (PKM): enak življenjski standard, ne današnjega menjalnega tečaja.",
        "PKM Argentine se posodablja z indeksom cen življenjskih potrebščin INDEC, ker ga Svetovna banka objavlja samo do leta 2021.",
        "Dan svobode razporedi davke na leto od 1. januarja. Če gre za davke 30 % plače, delate za državo 30 % leta.",
      ],
      ppaTitulo: "Pariteta kupne moči",
      bancoMundial: "Svetovna banka",
      ppa: (organismo, indicador, anio) => `${organismo}, kazalnik ${indicador}, zadnje razpoložljivo leto: ${anio}.`,
      consultado: (fecha) => `Preverjeno: ${fecha}`,
      verFuente: "Prikaži vir",
      fuentesTitulo: "Vir za vsako državo",
      fuentesBajada: "Vsaka vrstica uporablja kalkulator neto plače te države in njene uradne podatke.",
      verificado: (fecha) => `Podatki preverjeni: ${fecha}`,
      sello: (fecha) => `Uradni podatki, preverjeni pri viru vsake države. Najstarejše preverjanje: ${fecha}`,
    },
    faqTitulo: "Pogosta vprašanja",
    faq: (n) => [
      {
        pregunta: "Kaj je dan davčne svobode?",
        respuesta:
          "To je dan v letu, ko bi imeli plačane davke in prispevke, če bi vse, kar zaslužite od 1. januarja, najprej šlo državi. Tukaj ga računamo iz vaše plače, ne iz povprečja države.",
      },
      {
        pregunta: "Zakaj primerjamo po kupni moči?",
        respuesta: "Po menjalnem tečaju je plača lahko videti ogromna ali drobna, odvisno od dneva. Pariteta kupne moči primerja, kaj lahko za ta denar res kupite v vsaki državi.",
      },
      {
        pregunta: "Ali se moja plača shranjuje?",
        respuesta: "Ne. Izračun poteka v vašem brskalniku. Kar delite, vsebuje samo datume, odstotke in države.",
      },
      {
        pregunta: "Zakaj se moja dejanska neto plača razlikuje?",
        respuesta:
          "Računamo z osebo brez partnerja in otrok ter s privzetimi vrednostmi. Davčne olajšave, bonusi ali posebne ureditve spremenijo številko. Za natančen izračun svojega položaja odprite kalkulator svoje države.",
      },
      {
        pregunta: "Katere države so tukaj?",
        respuesta: `Danes ${pluralSl(n, "država", "državi", "države", "držav")}, vsaka s svojim kalkulatorjem neto plače in uradnimi podatki. Nove dodajamo, takoj ko preverimo njihova davčna pravila.`,
      },
    ],
    destacado: {
      ceja: "Svetovna primerjava",
      titulo: "Do katerega dne v letu delate za državo?",
      texto: "Vnesite plačo in si oglejte, koliko neto bi vam ostalo v drugih državah.",
      ir: "Izračunaj svoj datum",
    },
  },
};

// ───────────────────────────── et ─────────────────────────────

// «Sina», como LHV y Swedbank: imperativo de 2.ª singular. Solo base.
// GRAMATICA.et: `de` es el genitivo que va delante del sustantivo, `en` el caso de lugar completo.
// Las fechas van tras dos puntos porque Intl las da en nominativo y «kuni» pediría otro caso.
const gEt = GRAMATICA.et;
const SEO_ET = "Maksuvabaduse päev ja netopalk maailmas";
const paevadEt = (n: number) => (n === 1 ? "1 päev" : `${n} päeva`);

const et: Diccionario<TextosMundo> = {
  base: {
    nombre: "Sinu palk maailmas",
    seo: {
      titulo: (pais) => [`${SEO_ET} | ${pais}`, SEO_ET, "Sinu palk maailmas"],
      tituloGlobal: [SEO_ET, "Sinu palk maailmas"],
      descripcion: (pais, n) => `Vaata, millise kuupäevani töötad oma palgaga ${gEt.en(pais)} riigi heaks ja kui palju jääb kätte ${n} riigis. Tasuta ja ilma kontota.`,
      descripcionGlobal: (n) => `Vaata, millise kuupäevani töötad riigi heaks ja kui palju jääb palgast kätte ${n} riigis. Tasuta ja ilma kontota.`,
    },
    ceja: "Sinu maksuvabaduse päev",
    h1: "Millise kuupäevani töötad igal aastal riigi heaks?",
    bajada: (n) => `Sisesta oma brutopalk ja vaata oma kuupäeva. Seejärel võrdle seda ${n} riigiga sama ostujõu ja iga riigi reeglite järgi.`,
    form: {
      titulo: "Sinu palk",
      sueldo: "Brutopalk",
      mes: "Kuus",
      anio: "Aastas",
      periodo: "Palgaperiood",
      pais: "Riik, kus töötad",
      ejemplo: "Näide",
      ejemploAyuda: "See on näidispalk. Sisesta oma palk ja kõik arvutatakse kohe ümber.",
      propio: "Võetud sinu arvutusest.",
      invalido: "Sisesta nullist suurem summa.",
      pagas: "Sinu kuupalk palgateatise järgi: lisame sellele seadusega ette nähtud lisapalgad. Netopalk on 12 kuu keskmine.",
    },
    heroe: {
      hasta: (fecha) => `Töötad riigi heaks selle kuupäevani: ${fecha}`,
      tasa: (pct) => `Sinu palgast läheb ${pct} tulumaksuks ja maksedeks.`,
      dias: (n, total) => `${paevadEt(n)} ${total} päevast`,
      enMano: "Kätte jääb",
      porMes: "kuus",
      anio: (anio, n, total) => `${anio}. aastal riigile ${paevadEt(n)} ${total} päevast.`,
      resto: "Järgmisest päevast alates on kõik, mida teenid, sinu oma.",
    },
    ranking: {
      titulo: "Sama palk eri riikides",
      bajada: "Sama ostujõu juures jääb igas riigis kätte nii palju. Iga rida tuleb selle riigi ametlikust kalkulaatorist. Palk on igal pool sama: muutuvad ainult maksud ja maksed, mitte riigi tegelikud palgad.",
      lista: "Riigid netopalga järgi",
      buscar: "Otsi riiki",
      filtrar: "Filtreeri piirkonna järgi",
      todas: "Kõik riigid",
      regiones: { americas: "Ameerika", europa: "Euroopa", asia: "Aasia ja Okeaania", africa: "Aafrika ja Lähis-Ida" },
      tuPais: "Sinu riik",
      mejor: "Madalaim maksukoormus",
      enMano: "Neto kuus",
      enTuMoneda: "Sinu valuutas",
      vsTuPais: "Võrreldes sinu riigiga",
      verTodos: (n) => `Näita kõiki ${n} riiki`,
      verMenos: "Näita vähem",
      sinResultados: (q) => `Otsingule „${q}“ ei leitud ühtegi riiki.`,
      abrir: (pais) => `Ava ${gEt.de(pais)} kalkulaator`,
      mas: (pct) => `${pct} rohkem`,
      menos: (pct) => `${pct} vähem`,
      igual: "Sama",
      puesto: (p, total) => `Sinu riik on ${total} riigi seas ${p}. kohal.`,
    },
    tarjeta: {
      titulo: "Sinu jagatav kaart",
      bajada: "Sellel on sinu kuupäev ja protsent. Mitte kunagi see, kui palju teenid.",
      hasta: (fecha) => `Töötan riigi heaks selle kuupäevani: ${fecha}`,
      tasa: (pct) => `Minu palgast läheb ${pct} riigile`,
      mejor: (pais, pct) => `Sama palgaga maksaksin ${gEt.en(pais)} vähem makse: ${pct} rohkem kätte`,
      mejorPropio: (pais) => `Minu palgaga ei jää kusagil rohkem kätte kui ${gEt.en(pais)}`,
      yVos: "Aga sina?",
      cta: "Arvuta oma kuupäev:",
      generica: "Millise kuupäevani töötad riigi heaks?",
      genericaBajada: (n) => `Sinu palk ${n} riigis, iga riigi ametliku kalkulaatoriga`,
      compartir: "Jaga minu kaarti",
      compartirDuelo: "Esita vastuväljakutse",
      descargar: "Laadi pilt alla",
      copiado: "Link on kopeeritud. Kleebi see, kuhu soovid.",
      compartido: "Valmis, jagatud.",
      error: "Jagamine ei õnnestunud. Proovi uuesti.",
      texto: (fecha) => `Töötan riigi heaks selle kuupäevani: ${fecha}. Aga sina?`,
      alt: "Sinu kaardi eelvaade",
    },
    duelo: {
      amigo: (fecha) => `Sinu sõber töötab riigi heaks selle kuupäevani: ${fecha}.`,
      yVos: "Aga sina?",
      invitacion: "Sisesta oma palk ja võrdle.",
      vos: "Sina",
      elAmigo: "Sinu sõber",
      dia: "Maksuvabaduse päev",
      tasa: "Maksud ja maksed",
      mejorPais: "Madalaim maksukoormus",
      antes: (d) => (d === 1 ? "Saad vabaks ühe päeva varem kui su sõber." : `Saad vabaks ${d} päeva varem kui su sõber.`),
      despues: (d) => (d === 1 ? "Su sõber saab vabaks ühe päeva varem kui sina." : `Su sõber saab vabaks ${d} päeva varem kui sina.`),
      empate: "Mõlemad saavad vabaks samal päeval.",
      desde: (pais) => `Töötab ${gEt.en(pais)}`,
    },
    cero: { dia: "null päeva", heroeAntes: "Riigi heaks töötad", tarjetaAntes: "Riigi heaks töötan", motivo: "Selle palga pealt ei peeta kinni tulumaksu ega makseid.", texto: "Sel aastal ei tööta ma ühtegi päeva riigi heaks. Aga sina?", amigo: "Sinu sõber ei tööta ühtegi päeva riigi heaks." },
    metodo: {
      titulo: "Kuidas me arvutame",
      estimacion: "See on hinnang riikide võrdlemiseks, mitte palgateatis. Mahaarvamised, lapsed või preemiad võivad sinu numbrit muuta.",
      supuestos: [
        "Arvutus tehakse üksi elavale lasteta inimesele, iga riigi kalkulaatori vaikeväärtustega.",
        "Netopalk on see, mis jääb järele pärast tulumaksu ja inimese enda tasutavaid makseid. Käibemaksu ja tööandja osa arvesse ei võeta.",
        "Kolmeteistkümnes palk või kohustuslik puhkuseraha jaotatakse kogu aastale iga riigi seaduse järgi.",
        "Ameerika Ühendriikides ei arvestata osariigi ega kohalikke makse: ainult föderaalmaksu ja makseid.",
        "Sinu palk viiakse teise riiki ostujõu pariteedi (PPP) järgi: sama elatustase, mitte päevane valuutakurss.",
        "Argentina ostujõu pariteeti uuendatakse INDECi hinnaindeksiga, sest Maailmapank avaldab seda ainult 2021. aastani.",
        "Maksuvabaduse päev jaotab sinu maksukoormuse alates 1. jaanuarist. Kui 30% palgast läheb riigile, töötad 30% aastast riigi heaks.",
      ],
      ppaTitulo: "Ostujõu pariteet", bancoMundial: "Maailmapank",
      ppa: (organismo, indicador, anio) => `${organismo}, näitaja ${indicador}, viimane saadaolev aasta: ${anio}.`,
      consultado: (fecha) => `Vaadatud: ${fecha}.`,
      verFuente: "Vaata allikat",
      fuentesTitulo: "Iga riigi allikas",
      fuentesBajada: "Iga rida kasutab selle riigi enda netopalga kalkulaatorit ja ametlikke andmeid.",
      verificado: (fecha) => `Andmed kontrollitud: ${fecha}`,
      sello: (fecha) => `Ametlikud andmed, kontrollitud iga riigi allikast. Vanim kontroll: ${fecha}.`,
    },
    faqTitulo: "Korduma kippuvad küsimused",
    faq: (n) => [
      {
        pregunta: "Mis on maksuvabaduse päev?",
        respuesta:
          "See on aasta päev, mil sinu maksud ja maksed oleksid tasutud, kui kõik 1. jaanuarist alates teenitu läheks kõigepealt riigile. Siin arvutame selle sinu palga, mitte riigi keskmise põhjal.",
      },
      {
        pregunta: "Miks võrreldakse ostujõu järgi?",
        respuesta: "Valuutakursi järgi näib sama palk olenevalt päevast tohutu või tilluke. Ostujõu pariteet võrdleb seda, mida raha eest igas riigis tegelikult saab.",
      },
      {
        pregunta: "Kas minu palk salvestatakse?",
        respuesta: "Ei. Arvutus tehakse sinu brauseris. Jagatud kaardil on ainult kuupäevad, protsendid ja riigid.",
      },
      {
        pregunta: "Miks on minu tegelik netopalk teistsugune?",
        respuesta:
          "Arvutame üksi elavale lasteta inimesele ja vaikeväärtustega. Mahaarvamised, preemiad või erikorrad muudavad numbrit. Täpse olukorra jaoks ava oma riigi kalkulaator.",
      },
      {
        pregunta: "Millised riigid on kaasatud?",
        respuesta: `Praegu ${n} riiki, igaühel oma netopalga kalkulaator ja ametlikud andmed. Lisame riike siis, kui oleme nende reeglid üle kontrollinud.`,
      },
    ],
    destacado: {
      ceja: "Ülemaailmne võrdlus",
      titulo: "Millise kuupäevani töötad riigi heaks?",
      texto: "Sisesta oma palk ja vaata, kui palju jääb kätte teistes riikides.",
      ir: "Arvuta minu kuupäev",
    },
  },
};

// ───────────────────────────── is ─────────────────────────────

// Islandés (ADR 0002, D34): «þú» e imperativo de singular; la tarjeta y el texto para compartir, en primera
// persona. El país se declina con GRAMATICA.is y los números con pluralIs. Intl da la fecha como «15. október»,
// que tras «til» no cambia en el uso islandés de fechas.
const gIs = GRAMATICA.is;
const SEO_IS = "Skattfrelsisdagurinn og útborguð laun um allan heim";
const dagarIs = (d: number) => pluralIs(d, "dagur", "dagar");
// Tras «í»: «í 1 landi», «í 21 landi», «í 2 löndum».
const londumIs = (n: number) => pluralIs(n, "landi", "löndum");

const is: Diccionario<TextosMundo> = {
  base: {
    nombre: "Launin þín um allan heim",
    seo: {
      titulo: (pais) => [`${SEO_IS} | ${pais}`, SEO_IS, "Launin þín um allan heim"],
      tituloGlobal: [SEO_IS, "Launin þín um allan heim"],
      descripcion: (pais, n) => `Sjáðu til hvaða dags ársins þú vinnur fyrir ríkið með launum þínum ${gIs.en(pais)} og hvað þú fengir útborgað í ${londumIs(n)}. Ókeypis og án skráningar.`,
      descripcionGlobal: (n) => `Sjáðu til hvaða dags ársins þú vinnur fyrir ríkið og hvað þú fengir útborgað í ${londumIs(n)}. Ókeypis og án skráningar.`,
    },
    ceja: "Skattfrelsisdagurinn þinn",
    h1: "Til hvaða dags ársins vinnur þú fyrir ríkið?",
    bajada: (n) => `Sláðu inn heildarlaunin og þú sérð dagsetninguna þína. Berðu hana svo saman í ${londumIs(n)}, með sama kaupmætti og skattareglum hvers lands.`,
    form: {
      titulo: "Launin þín",
      sueldo: "Heildarlaun",
      mes: "Á mánuði",
      anio: "Á ári",
      periodo: "Launatímabil",
      pais: "Landið þar sem þú vinnur",
      ejemplo: "Dæmi",
      ejemploAyuda: "Þetta eru laun til dæmis. Sláðu inn þín eigin og allar tölur reiknast strax upp á nýtt.",
      propio: "Sótt úr útreikningnum þínum.",
      invalido: "Sláðu inn upphæð sem er hærri en núll.",
      pagas: "Mánaðarlaun samkvæmt launaseðli: lögbundnum aukagreiðslum (13. eða 14. mánuði) bætum við sjálf við. Útborguð laun eru meðaltal 12 mánaða.",
    },
    heroe: {
      hasta: (fecha) => `Þú vinnur fyrir ríkið til ${fecha}`,
      tasa: (pct) => `${pct} af laununum þínum fara í tekjuskatt og lögbundin iðgjöld.`,
      dias: (n, total) => `Dagar fyrir ríkið: ${n} af ${total}`,
      enMano: "Þú færð útborgað",
      porMes: "á mánuði",
      anio: (anio, n, total) => `Árið ${anio}: dagar fyrir ríkið: ${n} af ${total}.`,
      resto: "Frá næsta degi er allt sem þú þénar þitt.",
    },
    ranking: {
      titulo: "Sömu laun, land fyrir land",
      bajada: "Þetta fengir þú útborgað í hverju landi við sama kaupmátt. Hver lína kemur úr opinberri launareiknivél viðkomandi lands.",
      lista: "Lönd raðað eftir útborguðum launum",
      buscar: "Leita að landi",
      filtrar: "Sía eftir svæði",
      todas: "Öll",
      regiones: { americas: "Ameríka", europa: "Evrópa", asia: "Asía og Eyjaálfa", africa: "Afríka og Miðausturlönd" },
      tuPais: "Landið þitt",
      mejor: "Besta niðurstaðan",
      enMano: "Útborgað á mánuði",
      enTuMoneda: "Í þínum gjaldmiðli",
      vsTuPais: "Miðað við landið þitt",
      verTodos: (n) => `Sýna öll löndin (${n})`,
      verMenos: "Sýna færri",
      sinResultados: (q) => `Ekkert land passar við „${q}“.`,
      abrir: (pais) => `Opna reiknivél ${gIs.para(pais)}`,
      mas: (pct) => `${pct} meira`,
      menos: (pct) => `${pct} minna`,
      igual: "Jafnt",
      puesto: (p, total) => `Landið þitt er í ${p}. sæti af ${total}.`,
    },
    tarjeta: {
      titulo: "Spjaldið þitt til að deila",
      bajada: "Það sýnir dagsetninguna þína og prósentur. Hvað þú þénar kemur aldrei fram á því.",
      hasta: (fecha) => `Ég vinn fyrir ríkið til ${fecha}`,
      tasa: (pct) => `${pct} af laununum mínum fara í skatta`,
      mejor: (pais, pct) => `Með laununum mínum fengi ég ${pct} meira útborgað ${gIs.en(pais)}`,
      mejorPropio: (pais) => `Með laununum mínum fæ ég hvergi meira útborgað en ${gIs.en(pais)}`,
      yVos: "En þú?",
      cta: "Finndu þína dagsetningu:",
      generica: "Til hvaða dags ársins vinnur þú fyrir ríkið?",
      genericaBajada: (n) => `Launin þín í ${londumIs(n)}, samkvæmt opinberri reiknivél hvers þeirra`,
      compartir: "Deila spjaldi",
      compartirDuelo: "Svara áskoruninni",
      descargar: "Sækja mynd",
      copiado: "Hlekkurinn var afritaður. Límdu hann þar sem þú vilt.",
      compartido: "Búið, sent.",
      error: "Ekki tókst að deila. Reyndu aftur.",
      texto: (fecha) => `Ég vinn fyrir ríkið til ${fecha}. En þú?`,
      alt: "Forskoðun á spjaldinu þínu",
    },
    duelo: {
      amigo: (fecha) => `Sá sem sendi þér hlekkinn vinnur fyrir ríkið til ${fecha}`,
      yVos: "En þú?",
      invitacion: "Sláðu inn launin þín og berðu þig saman.",
      vos: "Þú",
      elAmigo: "Sendandi",
      dia: "Vinnur fyrir ríkið til",
      tasa: "Skattar og iðgjöld",
      mejorPais: "Besta niðurstaðan",
      antes: (d) => `Munur þér í hag: ${dagarIs(d)}. Frelsið þitt byrjar á undan frelsi sendandans.`,
      despues: (d) => `Munur sendandanum í hag: ${dagarIs(d)}. Frelsi hans byrjar á undan þínu.`,
      empate: "Frelsið byrjar sama dag hjá ykkur báðum.",
      desde: (pais) => `Vinna ${gIs.en(pais)}`,
    },
    cero: {
      dia: "enga daga",
      heroeAntes: "Þú vinnur fyrir ríkið",
      tarjetaAntes: "Ég vinn fyrir ríkið",
      motivo: "Af þessum launum greiðist hvorki tekjuskattur né lögbundin iðgjöld.",
      texto: "Í ár vinn ég ekki einn einasta dag fyrir ríkið. En þú?",
      amigo: "Sá sem sendi þér hlekkinn vinnur ekki einn einasta dag fyrir ríkið.",
    },
    metodo: {
      titulo: "Svona reiknum við",
      estimacion: "Þetta er mat til að bera saman lönd, ekki launaseðill. Skattaafslættir, börn eða kaupaukar geta breytt tölunni þinni.",
      supuestos: [
        "Einstaklingur án maka og barna, með sjálfgefin gildi reiknivélar hvers lands.",
        "Útborguð laun eru það sem eftir stendur þegar launþeginn hefur greitt tekjuskatt og iðgjöld. Neysluskattar og launatengd gjöld vinnuveitanda eru ekki tekin með.",
        "Þrettándi mánuður og aðrar lögbundnar aukagreiðslur dreifast yfir árið eins og lög hvers lands kveða á um.",
        "Í Bandaríkjunum bætast hvorki við skattar einstakra ríkja né staðbundnir skattar: aðeins alríkisskattur og launatengd iðgjöld.",
        "Til að yfirfæra launin þín á annað land notum við kaupmáttarjafnvægi (PPP): sömu lífskjör, ekki gengi dagsins.",
        "PPP Argentínu er uppfært með neysluverðsvísitölu INDEC, því Alþjóðabankinn birtir það aðeins til ársins 2021.",
        "Skattfrelsisdagurinn dreifir sköttunum yfir árið frá 1. janúar. Ef 30% launanna fara í skatta vinnur þú fyrir ríkið 30% ársins.",
      ],
      ppaTitulo: "Kaupmáttarjafnvægi",
      bancoMundial: "Alþjóðabankinn",
      ppa: (organismo, indicador, anio) => `${organismo}, vísir ${indicador}, síðasta tiltæka ár: ${anio}.`,
      consultado: (fecha) => `Skoðað: ${fecha}`,
      verFuente: "Sýna heimild",
      fuentesTitulo: "Heimild fyrir hvert land",
      fuentesBajada: "Hver lína notar launareiknivél viðkomandi lands og opinber gögn þess.",
      verificado: (fecha) => `Gögn staðfest: ${fecha}`,
      sello: (fecha) => `Opinber gögn, staðfest í heimild hvers lands. Elsta staðfesting: ${fecha}`,
    },
    faqTitulo: "Algengar spurningar",
    faq: (n) => [
      {
        pregunta: "Hvað er skattfrelsisdagurinn?",
        respuesta:
          "Það er dagur ársins þegar skattar og iðgjöld væru greidd, ef allt sem þú þénar frá 1. janúar rynni fyrst til ríkisins. Hér reiknum við hann út frá þínum launum, ekki meðaltali landsins.",
      },
      {
        pregunta: "Af hverju berum við saman eftir kaupmætti?",
        respuesta: "Miðað við gengi geta laun virst risastór eða örsmá, eftir því hvaða dagur er. Kaupmáttarjafnvægi ber saman hvað þú getur raunverulega keypt fyrir peningana í hverju landi.",
      },
      {
        pregunta: "Eru launin mín vistuð?",
        respuesta: "Nei. Útreikningurinn fer fram í vafranum þínum. Það sem þú deilir inniheldur aðeins dagsetningar, prósentur og lönd.",
      },
      {
        pregunta: "Af hverju eru raunveruleg útborguð laun mín önnur?",
        respuesta:
          "Við reiknum með einstaklingi án maka og barna og með sjálfgefnum gildum. Skattaafslættir, kaupaukar eða sérreglur breyta tölunni. Til að reikna þína stöðu nákvæmlega skaltu opna reiknivél landsins þíns.",
      },
      {
        pregunta: "Hvaða lönd eru hér?",
        respuesta: `Í dag ${pluralIs(n, "land", "lönd")}, hvert með sína launareiknivél og opinber gögn. Við bætum nýjum við um leið og við höfum staðfest skattareglur þeirra.`,
      },
    ],
    destacado: {
      ceja: "Samanburður um allan heim",
      titulo: "Til hvaða dags ársins vinnur þú fyrir ríkið?",
      texto: "Sláðu inn launin og sjáðu hvað þú fengir útborgað í öðrum löndum.",
      ir: "Reikna dagsetninguna þína",
    },
  },
};

// Letón (ADR 0002, D35): «jūs» en minúscula, como VID y los bancos; la tarjeta y el texto para compartir,
// en primera persona. Sin participios sobre quien lee. El país va con GRAMATICA.lv y las cantidades con
// pluralLv. Intl da la fecha en nominativo («12. maijs»), así que «līdz» no va pegado a ella: la frase
// termina en «līdz dienai:» o similar. «Bruto alga» y «neto alga (uz rokas)» son las palabras del país.
const gLv = GRAMATICA.lv;
const SEO_LV = "Nodokļu brīvības diena un neto alga pasaulē";
const diasLv = (d: number) => pluralLv(d, "diena", "dienas", "dienu");

const lv: Diccionario<TextosMundo> = {
  base: {
    nombre: "Jūsu alga pasaulē",
    seo: {
      titulo: (pais) => [`${SEO_LV} | ${pais}`, SEO_LV, "Jūsu alga pasaulē"],
      tituloGlobal: [SEO_LV, "Jūsu alga pasaulē"],
      descripcion: (pais, n) => `Uzziniet, līdz kurai gada dienai ar savu algu ${gLv.en(pais)} strādājat valsts labā un cik saņemtu uz rokas citās valstīs (kopā: ${n}). Bez maksas, bez reģistrācijas.`,
      descripcionGlobal: (n) => `Uzziniet, līdz kurai gada dienai strādājat valsts labā un cik no jūsu algas paliktu uz rokas citās valstīs (kopā: ${n}). Bez maksas, bez reģistrācijas.`,
    },
    ceja: "Jūsu nodokļu brīvības diena",
    h1: "Līdz kurai gada dienai strādājat valsts labā?",
    bajada: (n) => `Ievadiet bruto algu un redzēsiet savu datumu. Pēc tam salīdziniet to ar citām valstīm (kopā: ${n}): pirktspēja ir tā pati, nodokļu noteikumi katrai valstij savi.`,
    form: {
      titulo: "Jūsu alga",
      sueldo: "Bruto alga",
      mes: "Mēnesī",
      anio: "Gadā",
      periodo: "Algas periods",
      pais: "Valsts, kurā strādājat",
      ejemplo: "Piemērs",
      ejemploAyuda: "Šī ir parauga alga. Ievadiet savu, un visi skaitļi uzreiz tiks pārrēķināti.",
      propio: "Ņemts no jūsu aprēķina.",
      invalido: "Ievadiet summu, kas lielāka par nulli.",
      pagas: "Mēneša alga pēc algas lapiņas: likumā paredzētās papildu izmaksas (13. vai 14. algu) pieskaitām paši. Neto alga ir 12 mēnešu vidējais.",
    },
    heroe: {
      hasta: (fecha) => `Valsts labā strādājat līdz dienai: ${fecha}`,
      tasa: (pct) => `${pct} no jūsu algas aiziet ienākuma nodoklim un obligātajām iemaksām.`,
      dias: (n, total) => `${n} no ${total} dienām`,
      enMano: "Jums paliek uz rokas",
      porMes: "mēnesī",
      anio: (anio, n, total) => `${anio}. gadā: valsts labā ${n} no ${total} dienām.`,
      resto: "No nākamās dienas viss, ko nopelnāt, pieder jums.",
    },
    ranking: {
      titulo: "Tā pati alga, valsts pēc valsts",
      bajada: "Tik jūs saņemtu uz rokas katrā valstī, ja pirktspēja ir tā pati. Katra rinda aprēķināta ar attiecīgās valsts oficiālo kalkulatoru. Alga visur ir vienāda: mainās tikai nodokļi un iemaksas, nevis tas, cik attiecīgajā valstī pelna.",
      lista: "Valstis pēc neto algas",
      buscar: "Meklēt valsti",
      filtrar: "Filtrēt pēc reģiona",
      todas: "Visas",
      regiones: { americas: "Amerika", europa: "Eiropa", asia: "Āzija un Okeānija", africa: "Āfrika un Tuvie Austrumi" },
      tuPais: "Jūsu valsts",
      mejor: "Vismazākie nodokļi",
      enMano: "Uz rokas mēnesī",
      enTuMoneda: "Jūsu valūta",
      vsTuPais: "Salīdzinot ar jūsu valsti",
      verTodos: (n) => `Rādīt visas valstis (${n})`,
      verMenos: "Rādīt mazāk",
      sinResultados: (q) => `Pēc vaicājuma „${q}“ valsts nav atrasta.`,
      abrir: (pais) => `Atvērt kalkulatoru: ${pais}`,
      mas: (pct) => `par ${pct} vairāk`,
      menos: (pct) => `par ${pct} mazāk`,
      igual: "Tikpat",
      puesto: (p, total) => `Jūsu valsts vieta: ${p} no ${total}.`,
    },
    tarjeta: {
      titulo: "Kartīte, ar kuru varat dalīties",
      bajada: "Tajā redzams jūsu datums un procenti. Cik pelnāt, tajā nekad netiek rādīts.",
      hasta: (fecha) => `Valsts labā strādāju līdz dienai: ${fecha}`,
      tasa: (pct) => `${pct} no manas algas aiziet nodokļiem`,
      mejor: (pais, pct) => `Ar tādu pašu algu ${gLv.en(pais)} nodokļos maksātu mazāk: uz rokas saņemtu par ${pct} vairāk`,
      mejorPropio: (pais) => `Ar manu algu nekur nepaliktu vairāk nekā ${gLv.en(pais)}`,
      yVos: "Un jūs?",
      cta: "Uzziniet savu datumu:",
      generica: "Līdz kurai gada dienai strādājat valsts labā?",
      genericaBajada: (n) => `Jūsu alga pasaulē. Valstu kopā: ${n}, katrai savs oficiālais kalkulators`,
      compartir: "Kopīgot kartīti",
      compartirDuelo: "Atbildēt uz izaicinājumu",
      descargar: "Lejupielādēt attēlu",
      copiado: "Saite nokopēta. Ielīmējiet to, kur vajadzīgs.",
      compartido: "Nosūtīts.",
      error: "Kopīgot neizdevās. Mēģiniet vēlreiz.",
      texto: (fecha) => `Valsts labā strādāju līdz dienai: ${fecha}. Un jūs?`,
      alt: "Jūsu kartītes priekšskatījums",
    },
    duelo: {
      amigo: (fecha) => `Persona, kas jums atsūtīja šo saiti, valsts labā strādā līdz dienai: ${fecha}.`,
      yVos: "Un jūs?",
      invitacion: "Ievadiet savu algu un salīdziniet.",
      vos: "Jūs",
      elAmigo: "Otra persona",
      dia: "Valsts labā strādā līdz",
      tasa: "Nodokļi un iemaksas",
      mejorPais: "Vismazākie nodokļi",
      antes: (d) => `Jūsu brīvības diena pienāk agrāk nekā personai, kas atsūtīja saiti. Starpība: ${diasLv(d)}.`,
      despues: (d) => `Personas, kas atsūtīja saiti, brīvības diena pienāk agrāk nekā jums. Starpība: ${diasLv(d)}.`,
      empate: "Jūsu brīvības dienas sakrīt.",
      desde: (pais) => `Strādā ${gLv.en(pais)}`,
    },
    cero: {
      dia: "0 dienu",
      heroeAntes: "Valsts labā strādājat",
      tarjetaAntes: "Valsts labā strādāju",
      motivo: "No šīs algas neietur ne ienākuma nodokli, ne obligātās iemaksas.",
      texto: "Šogad valsts labā nestrādāju nevienu dienu. Un jūs?",
      amigo: "Persona, kas jums atsūtīja šo saiti, valsts labā nestrādā nevienu dienu.",
    },
    metodo: {
      titulo: "Kā mēs rēķinām",
      estimacion: "Tas ir novērtējums valstu salīdzināšanai, nevis algas lapiņa. Nodokļu atvieglojumi, bērni vai prēmijas var mainīt jūsu skaitli.",
      supuestos: [
        "Persona bez laulātā un bērniem, katras valsts kalkulatora noklusējuma vērtības.",
        "Neto alga ir tas, kas paliek pēc ienākuma nodokļa un paša darbinieka iemaksām. Patēriņa nodokļi un darba devēja iemaksas netiek skaitītas.",
        "Trīspadsmitā alga vai citas obligātas papildu izmaksas tiek sadalītas pa gadu tā, kā nosaka katras valsts likumi.",
        "Amerikas Savienotajās Valstīs netiek pieskaitīti štatu un vietējie nodokļi: tikai federālais nodoklis un iemaksas no darba samaksas.",
        "Lai pārrēķinātu jūsu algu citai valstij, izmantojam pirktspējas paritāti (PPP): tas pats dzīves līmenis, nevis šodienas valūtas kurss.",
        "Argentīnas PPP tiek atjaunināta pēc INDEC patēriņa cenu indeksa, jo Pasaules Banka to publicē tikai līdz 2021. gadam.",
        "Brīvības diena sadala nodokļus pa gadu no 1. janvāra. Ja nodokļiem aiziet 30% algas, valsts labā strādājat 30% gada.",
      ],
      ppaTitulo: "Pirktspējas paritāte",
      bancoMundial: "Pasaules Banka",
      ppa: (organismo, indicador, anio) => `${organismo}, rādītājs ${indicador}, jaunākais pieejamais gads: ${anio}.`,
      consultado: (fecha) => `Pārbaudīts: ${fecha}.`,
      verFuente: "Skatīt avotu",
      fuentesTitulo: "Katras valsts avots",
      fuentesBajada: "Katrā rindā izmantots attiecīgās valsts neto algas kalkulators un tā oficiālie dati.",
      verificado: (fecha) => `Dati pārbaudīti: ${fecha}`,
      sello: (fecha) => `Oficiālie dati, pārbaudīti katras valsts avotā. Vecākā pārbaude: ${fecha}.`,
    },
    faqTitulo: "Biežāk uzdotie jautājumi",
    faq: (n) => [
      {
        pregunta: "Kas ir nodokļu brīvības diena?",
        respuesta:
          "Tā ir gada diena, kurā būtu samaksāti nodokļi un iemaksas, ja viss, ko nopelnāt no 1. janvāra, vispirms nonāktu pie valsts. Šeit to rēķinām pēc jūsu algas, nevis pēc valsts vidējā.",
      },
      {
        pregunta: "Kāpēc salīdzinām pēc pirktspējas?",
        respuesta: "Pēc valūtas kursa alga var izskatīties milzīga vai niecīga atkarībā no dienas. Pirktspējas paritāte parāda, ko par šo naudu katrā valstī patiešām var nopirkt.",
      },
      {
        pregunta: "Vai mana alga tiek saglabāta?",
        respuesta: "Nē. Aprēķins notiek jūsu pārlūkprogrammā. Tas, ar ko dalāties, ietver tikai datumus, procentus un valstis.",
      },
      {
        pregunta: "Kāpēc mana īstā neto alga atšķiras?",
        respuesta:
          "Rēķinām personai bez laulātā un bērniem, ar noklusējuma vērtībām. Nodokļu atvieglojumi, prēmijas vai īpaši režīmi skaitli maina. Precīzam aprēķinam savai situācijai atveriet savas valsts kalkulatoru.",
      },
      {
        pregunta: "Kuras valstis šeit ir?",
        respuesta: `Šodien kopā: ${pluralLv(n, "valsts", "valstis", "valstu")}, katrai savs neto algas kalkulators un oficiālie dati. Jaunas pievienojam, kad esam pārbaudījuši to nodokļu noteikumus.`,
      },
    ],
    destacado: {
      ceja: "Pasaules salīdzinājums",
      titulo: "Līdz kurai gada dienai strādājat valsts labā?",
      texto: "Ievadiet algu un paskatieties, cik saņemtu uz rokas citās valstīs.",
      ir: "Uzzināt savu datumu",
    },
  },
};

// ───────────────────────────── mk ─────────────────────────────

// Macedonio (ADR 0002, D36): «вие» de cortesía en minúscula y 2.ª persona del plural; la tarjeta y el
// texto para compartir van en primera persona. El país va con GRAMATICA.mk («во Северна Македонија») y
// los días y países con pluralMk («1 ден», «3 дена», «во 40 држави»).
const gMk = GRAMATICA.mk;
const SEO_MK = "Ден на даночна слобода и нето плата по држави";
const diasMk = (d: number) => pluralMk(d, "ден", "дена");
const enPaisesMk = (n: number) => `во ${pluralMk(n, "држава", "држави")}`;

const mk: Diccionario<TextosMundo> = {
  base: {
    nombre: "Вашата плата низ светот",
    seo: {
      titulo: (pais) => [`${SEO_MK} | ${pais}`, SEO_MK, "Вашата плата низ светот"],
      tituloGlobal: [SEO_MK, "Вашата плата низ светот"],
      descripcion: (pais, n) => `Видете до кој ден од годината работите за државата со плата ${gMk.en(pais)} и колку нето би добивале ${enPaisesMk(n)}. Бесплатно и без регистрација.`,
      descripcionGlobal: (n) => `Видете до кој ден од годината работите за државата и колку нето би ви останувало од платата ${enPaisesMk(n)}. Бесплатно и без регистрација.`,
    },
    ceja: "Вашиот Ден на даночна слобода",
    h1: "До кој ден од годината работите за државата?",
    bajada: (n) => `Внесете ја вашата бруто плата за да го видите вашиот датум. Потоа споредете ја ${enPaisesMk(n)} со иста куповна моќ и со даночните правила на секоја држава.`,
    form: {
      titulo: "Вашата плата",
      sueldo: "Бруто плата",
      mes: "Месечно",
      anio: "Годишно",
      periodo: "Период на платата",
      pais: "Државата каде што работите",
      ejemplo: "Пример",
      ejemploAyuda: "Ова е примерна плата. Внесете ја вашата и сите бројки веднаш се ажурираат.",
      propio: "Префрлено од вашата пресметка.",
      invalido: "Внесете износ поголем од нула.",
      pagas: "Месечната плата од вашиот платен лист: задолжителните дополнителни плати според законот (13-та или 14-та) ги додаваме ние. Нето платата е просекот за 12 месеци.",
    },
    heroe: {
      hasta: (fecha) => `Работите за државата до ${fecha}`,
      tasa: (pct) => `${pct} од вашата плата оди на персонален данок и задолжителни придонеси.`,
      dias: (n, total) => `${n} од ${total} дена`,
      enMano: "Нето",
      porMes: "месечно",
      anio: (anio, n, total) => `${anio}: ${n} од ${total} дена за државата.`,
      resto: "Од следниот ден, сè што заработувате останува за вас.",
    },
    ranking: {
      titulo: "Иста плата во различни држави",
      bajada: "Толку нето би добивале во секоја држава со иста куповна моќ. Секој ред доаѓа од официјалниот калкулатор на таа држава.",
      lista: "Држави по нето плата",
      buscar: "Пребарајте држава",
      filtrar: "Филтер по регион",
      todas: "Сите",
      regiones: { americas: "Америка", europa: "Европа", asia: "Азија и Океанија", africa: "Африка и Блискиот Исток" },
      tuPais: "Вашата држава",
      mejor: "Најисплатлива",
      enMano: "Нето месечно",
      enTuMoneda: "Во вашата валута",
      vsTuPais: "Во однос на вашата држава",
      verTodos: (n) => `Прикажете ги сите држави (${n})`,
      verMenos: "Прикажете помалку",
      sinResultados: (q) => `Нема држава што одговара на „${q}“.`,
      abrir: (pais) => `Отворете го калкулаторот ${gMk.para(pais)}`,
      mas: (pct) => `${pct} повеќе`,
      menos: (pct) => `${pct} помалку`,
      igual: "Исто како сега",
      puesto: (p, total) => `Вашата држава е на место ${p} од ${total}.`,
    },
    tarjeta: {
      titulo: "Вашата картичка за споделување",
      bajada: "На неа се гледаат датумот и процентите. Колку заработувате никогаш не се гледа.",
      hasta: (fecha) => `Работам за државата до ${fecha}`,
      tasa: (pct) => `${pct} од мојата плата оди на даноци`,
      mejor: (pais, pct) => `Со мојата плата, ${gMk.en(pais)} нето би ми останувало ${pct} повеќе`,
      mejorPropio: (pais) => `Со мојата плата, најисплатлива држава за мене е ${gMk.nombre(pais)}`,
      yVos: "А вие?",
      cta: "Видете го вашиот датум:",
      generica: "До кој ден од годината работите за државата?",
      genericaBajada: (n) => `Вашата плата ${enPaisesMk(n)}, според официјалниот калкулатор на секоја од нив`,
      compartir: "Споделување на картичката",
      compartirDuelo: "Прифатете го предизвикот",
      descargar: "Преземање на сликата",
      copiado: "Врската е копирана. Залепете ја каде што сакате.",
      compartido: "Готово, испратено.",
      error: "Споделувањето не успеа. Обидете се повторно.",
      texto: (fecha) => `Работам за државата до ${fecha}. А вие?`,
      alt: "Преглед на вашата картичка",
    },
    duelo: {
      amigo: (fecha) => `Вашиот пријател работи за државата до ${fecha}.`,
      yVos: "А вие?",
      invitacion: "Внесете ја вашата плата за да споредите.",
      vos: "Вие",
      elAmigo: "Вашиот пријател",
      dia: "Работи за државата до",
      tasa: "Даноци и придонеси",
      mejorPais: "Најисплатливата држава",
      antes: (d) => `Вие се ослободувате ${diasMk(d)} пред вашиот пријател.`,
      despues: (d) => `Вашиот пријател се ослободува ${diasMk(d)} пред вас.`,
      empate: "И двајцата се ослободувате истиот ден.",
      desde: (pais) => `Работи ${gMk.en(pais)}`,
    },
    cero: {
      dia: "ниту еден ден",
      heroeAntes: "Работите за државата",
      tarjetaAntes: "Работам за државата",
      motivo: "Од оваа плата не се одбиваат ниту персонален данок ниту задолжителни придонеси.",
      texto: "Оваа година не работам за државата ниту еден ден. А вие?",
      amigo: "Вашиот пријател не работи за државата ниту еден ден.",
    },
    metodo: {
      titulo: "Како пресметуваме",
      estimacion: "Ова е проценка за споредба меѓу држави, а не платен лист. Олеснувања, деца или бонуси можат да ја променат вашата бројка.",
      supuestos: [
        "Лице без брачен партнер и без деца, со стандардните вредности во калкулаторот на секоја држава.",
        "Нето платата е она што останува по персоналниот данок и придонесите што ги плаќа самиот вработен. Даноците на потрошувачка и придонесите на товар на работодавачот не се вклучени.",
        "13-тата плата и другите задолжителни дополнителни исплати се распределуваат во текот на годината како што предвидува законот на секоја држава.",
        "За Соединетите Американски Држави не се додаваат државниот и локалниот данок на доход: само федералниот данок и одбивањата од платата.",
        "За да ја пренесеме вашата плата во друга држава, користиме паритет на куповната моќ (ПКМ): ист животен стандард, а не денешниот девизен курс.",
        "ПКМ на Аргентина се ажурира со индексот на потрошувачки цени на INDEC, бидејќи Светската банка го објавува само до 2021 година.",
        "Денот на слободата ги распределува даноците во годината почнувајќи од 1 јануари. Ако 30 % од платата оди на даноци, работите за државата 30 % од годината.",
      ],
      ppaTitulo: "Паритет на куповната моќ",
      bancoMundial: "Светската банка",
      ppa: (organismo, indicador, anio) => `${organismo}, показател ${indicador}, последна достапна година: ${anio}.`,
      consultado: (fecha) => `Проверено на ${fecha}`,
      verFuente: "Видете го изворот",
      fuentesTitulo: "Изворот за секоја држава",
      fuentesBajada: "Секој ред го користи калкулаторот за нето плата на таа држава и нејзините официјални податоци.",
      verificado: (fecha) => `Податоците се проверени на ${fecha}`,
      sello: (fecha) => `Официјалните податоци се проверени во изворот на секоја држава. Најстарата проверка е од ${fecha}`,
    },
    faqTitulo: "Често поставувани прашања",
    faq: (n) => [
      {
        pregunta: "Што е Денот на даночна слобода?",
        respuesta:
          "Тоа е денот од годината кога ќе завршите со плаќањето на даноците, ако сè што сте заработиле од 1 јануари прво одело кај државата. Овде е пресметан со вашата плата, а не со просечната за земјата.",
      },
      {
        pregunta: "Зошто споредбата е според куповната моќ?",
        respuesta: "Поради девизниот курс, една плата може да изгледа огромна или ништожна зависно од денот. ПКМ споредува што навистина може да се купи со тие пари во секоја држава.",
      },
      {
        pregunta: "Дали мојата плата се зачувува?",
        respuesta: "Не. Пресметката се прави во вашиот прелистувач. Она што го споделувате содржи само датуми, проценти и држави.",
      },
      {
        pregunta: "Зошто мојата реална нето плата е различна?",
        respuesta:
          "Претпоставуваме лице без брачен партнер и без деца, со стандардните вредности. Олеснувања, бонуси или посебни режими ја менуваат бројката. За точна пресметка за вашиот случај, отворете го калкулаторот на вашата држава.",
      },
      {
        pregunta: "Кои држави се вклучени?",
        respuesta: `Денес ${pluralMk(n, "држава", "држави")}, секоја со свој калкулатор за нето плата и официјални податоци. Додаваме нови штом ќе ги провериме нивните даночни правила.`,
      },
    ],
    destacado: {
      ceja: "Споредба низ светот",
      titulo: "До кој ден од годината работите за државата?",
      texto: "Внесете ја вашата плата и видете колку нето би добивале во други држави.",
      ir: "Видете го вашиот датум",
    },
  },
};

export const DICCIONARIOS_MUNDO: Diccionarios<TextosMundo> = { es, pt, en, fr, de, it, nl, ja, ko, zh, pl, sv, da, nb, fi, ar, id: idn, tr, bn, th, uk, uz, ru, ro, cs, el, hu, he, sr, bg, sk, ka, hr, mn, hy, sq, sl, et, is, lv, mk };

export function textosMundo(idioma: Idioma, trato: Trato, locale?: string): TextosMundo {
  return resolver(DICCIONARIOS_MUNDO, idioma, trato, locale);
}
