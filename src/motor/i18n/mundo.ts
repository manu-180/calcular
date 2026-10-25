import { pluralAr } from "./arabe";
import { GRAMATICA } from "./gramatica";
import { pluralPl } from "./plural";
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
      bajada: "Con el mismo poder de compra, esto te quedaría en mano en cada país. Cada fila sale de la calculadora oficial de ese país.",
      lista: "Países ordenados por lo que te queda en mano",
      buscar: "Buscar un país",
      filtrar: "Filtrar por región",
      todas: "Todos",
      regiones: { americas: "América", europa: "Europa", asia: "Asia y Oceanía", africa: "África y Medio Oriente" },
      tuPais: "Tu país",
      mejor: "Donde más rinde",
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
      mejor: (pais, pct) => `Con mi sueldo, ${gEs.en(pais)} me quedaría ${pct} más en mano`,
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
      mejorPais: "Donde más rinde",
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
      bajada: "Con el mismo poder de compra, esto le quedaría en mano en cada país. Cada fila sale de la calculadora oficial de ese país.",
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
      bajada: "With the same buying power, this is what you'd take home in each country. Every row comes from that country's official calculator.",
      lista: "Countries ranked by take-home pay",
      buscar: "Search a country",
      filtrar: "Filter by region",
      todas: "All",
      regiones: { americas: "Americas", europa: "Europe", asia: "Asia and Oceania", africa: "Africa and Middle East" },
      tuPais: "Your country",
      mejor: "Goes furthest",
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
      mejor: (pais, pct) => `On my salary, I'd take home ${pct} more ${gEn.en(pais)}`,
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
      mejorPais: "Goes furthest in",
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
      bajada: "Com o mesmo poder de compra, isto sobraria líquido em cada país. Cada linha sai da calculadora oficial daquele país.",
      lista: "Países ordenados pelo salário líquido",
      buscar: "Buscar um país",
      filtrar: "Filtrar por região",
      todas: "Todos os países",
      regiones: { americas: "Américas", europa: "Europa", asia: "Ásia e Oceania", africa: "África e Oriente Médio" },
      tuPais: "Seu país",
      mejor: "Onde mais rende",
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
      mejor: (pais, pct) => `Com meu salário, ${gPt.en(pais)} sobrariam ${pct} a mais líquido`,
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
      mejorPais: "Onde mais rende",
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
        bajada: "Com o mesmo poder de compra, isto ficar-lhe-ia líquido em cada país. Cada linha vem da calculadora oficial desse país.",
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
        mejor: (pais, pct) => `Com o meu salário, ${gPt.en(pais)} ficavam-me ${pct} a mais líquidos`,
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
    bajada: "À pouvoir d'achat égal, voici ce qu'il te resterait net dans chaque pays. Chaque ligne vient du calculateur officiel de ce pays.",
    lista: "Pays classés selon le salaire net",
    buscar: "Chercher un pays",
    filtrar: "Filtrer par région",
    todas: "Tous les pays",
    regiones: { americas: "Amériques", europa: "Europe", asia: "Asie et Océanie", africa: "Afrique et Moyen-Orient" },
    tuPais: "Ton pays",
    mejor: "Là où il rapporte le plus",
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
    mejor: (pais, pct) => `Avec mon salaire, ${gFr.en(pais)} il me resterait ${pct} de plus`,
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
    mejorPais: "Rapporte le plus",
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
      bajada: "À pouvoir d'achat égal, voici ce qu'il vous resterait net dans chaque pays. Chaque ligne vient du calculateur officiel de ce pays.",
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
      bajada: "Bei gleicher Kaufkraft bliebe dir in jedem Land so viel netto. Jede Zeile stammt aus dem offiziellen Rechner des Landes.",
      lista: "Länder nach Nettogehalt sortiert",
      buscar: "Land suchen",
      filtrar: "Nach Region filtern",
      todas: "Alle",
      regiones: { americas: "Amerika", europa: "Europa", asia: "Asien und Ozeanien", africa: "Afrika und Nahost" },
      tuPais: "Dein Land",
      mejor: "Bringt am meisten",
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
      mejor: (pais, pct) => `Mit meinem Gehalt bliebe mir ${gDe.en(pais)} ${pct} mehr netto`,
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
      mejorPais: "Bringt am meisten in",
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
      bajada: "Bei gleicher Kaufkraft bliebe Ihnen in jedem Land so viel netto. Jede Zeile stammt aus dem offiziellen Rechner des Landes.",
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
      bajada: "A parità di potere d'acquisto, ecco quanto ti resterebbe netto in ogni paese. Ogni riga viene dal calcolatore ufficiale di quel paese.",
      lista: "Paesi in ordine di stipendio netto",
      buscar: "Cerca un paese",
      filtrar: "Filtra per area",
      todas: "Tutti",
      regiones: { americas: "Americhe", europa: "Europa", asia: "Asia e Oceania", africa: "Africa e Medio Oriente" },
      tuPais: "Il tuo paese",
      mejor: "Dove rende di più",
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
      mejor: (pais, pct) => `Con il mio stipendio, ${gIt.en(pais)} mi resterebbe il ${pct} in più`,
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
      mejorPais: "Rende di più in",
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
      bajada: "A parità di potere d'acquisto, ecco quanto Le resterebbe netto in ogni paese. Ogni riga viene dal calcolatore ufficiale di quel paese.",
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
      bajada: "Met dezelfde koopkracht hou je dit netto over in elk land. Elke rij komt uit de officiële rekenhulp van dat land.",
      lista: "Landen gesorteerd op nettosalaris",
      buscar: "Zoek een land",
      filtrar: "Filter op regio",
      todas: "Alle landen",
      regiones: { americas: "Amerika", europa: "Europa", asia: "Azië en Oceanië", africa: "Afrika en Midden-Oosten" },
      tuPais: "Jouw land",
      mejor: "Levert het meest op",
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
      mejor: (pais, pct) => `Met mijn salaris hield ik ${gNl.en(pais)} ${pct} meer netto over`,
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
      mejorPais: "Levert het meest op in",
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
      bajada: "Met dezelfde koopkracht houdt u dit netto over in elk land. Elke rij komt uit de officiële rekenhulp van dat land.",
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
      bajada: "購買力をそろえると、各国での手取りはこうなります。どの行もその国の公式計算ツールの結果です。",
      lista: "手取りの多い順に並べた国",
      buscar: "国を検索",
      filtrar: "地域で絞り込む",
      todas: "すべて",
      regiones: { americas: "南北アメリカ", europa: "ヨーロッパ", asia: "アジア・オセアニア", africa: "アフリカ・中東" },
      tuPais: "ご自身の国",
      mejor: "手取りが最も多い国",
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
      mejor: (pais, pct) => `同じ給与なら、${gJa.en(pais)}手取りが${pct}増えます`,
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
      mejorPais: "手取りが最も多い国",
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
      bajada: "구매력을 맞추면 나라마다 실수령액이 이렇게 달라요. 모든 행은 그 나라의 공식 계산기에서 나왔어요.",
      lista: "실수령액 순으로 정렬한 나라",
      buscar: "나라 검색",
      filtrar: "지역으로 거르기",
      todas: "전체",
      regiones: { americas: "아메리카", europa: "유럽", asia: "아시아·오세아니아", africa: "아프리카·중동" },
      tuPais: "내 나라",
      mejor: "실수령액 1위",
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
      mejor: (pais, pct) => `같은 급여면 ${gKo.en(pais)} 실수령액이 ${pct} 더 많아요`,
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
      mejorPais: "실수령액 1위 나라",
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
    bajada: "在購買力相同的情況下，這是您在各國的實領金額。每一列都來自該國的官方計算工具。",
    lista: "依實領金額排序的國家",
    buscar: "搜尋國家",
    filtrar: "依地區篩選",
    todas: "全部",
    regiones: { americas: "美洲", europa: "歐洲", asia: "亞洲與大洋洲", africa: "非洲與中東" },
    tuPais: "您的國家",
    mejor: "實領最多",
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
    mejor: (pais, pct) => `同樣的薪資，${gZh.en(pais)}能多領 ${pct}`,
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
    mejorPais: "實領最多的國家",
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
    bajada: "在购买力相同的情况下，这是您在各国的到手金额。每一行都来自该国的官方计算工具。",
    lista: "按到手金额排序的国家",
    buscar: "搜索国家",
    filtrar: "按地区筛选",
    todas: "全部",
    regiones: { americas: "美洲", europa: "欧洲", asia: "亚洲和大洋洲", africa: "非洲和中东" },
    tuPais: "您的国家",
    mejor: "到手最多",
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
    mejor: (pais, pct) => `同样的工资，${gZh.en(pais)}能多到手 ${pct}`,
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
    mejorPais: "到手最多的国家",
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
      bajada: "Przy tej samej sile nabywczej tyle zostaje ci netto w każdym kraju. Każdy wiersz pochodzi z kalkulatora pensji netto danego kraju, liczonego na oficjalnych danych.",
      lista: "Kraje według pensji netto",
      buscar: "Szukaj kraju",
      filtrar: "Filtruj według regionu",
      todas: "Wszystkie kraje",
      regiones: { americas: "Ameryka", europa: "Europa", asia: "Azja i Oceania", africa: "Afryka i Bliski Wschód" },
      tuPais: "Twój kraj",
      mejor: "Najwięcej zostaje",
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
      mejor: (pais, pct) => `Z moją pensją ${gPl.en(pais)} zostałoby mi o ${pct} więcej netto`,
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
      mejorPais: "Najwięcej zostaje w kraju",
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
      bajada: "Med samma köpkraft får du kvar så här mycket netto i varje land. Varje rad kommer från landets nettolönekalkylator, med officiella uppgifter.",
      lista: "Länder sorterade efter nettolön",
      buscar: "Sök land",
      filtrar: "Filtrera efter region",
      todas: "Alla länder",
      regiones: { americas: "Amerika", europa: "Europa", asia: "Asien och Oceanien", africa: "Afrika och Mellanöstern" },
      tuPais: "Ditt land",
      mejor: "Ger mest kvar",
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
      mejor: (pais, pct) => `Med min lön skulle jag få ${pct} mer kvar netto ${gSv.en(pais)}`,
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
      mejorPais: "Ger mest kvar i",
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
      bajada: "Med samme købekraft har du så meget tilbage netto i hvert land. Hver række kommer fra landets nettolønsberegner med officielle tal.",
      lista: "Lande sorteret efter nettoløn",
      buscar: "Søg efter land",
      filtrar: "Filtrér efter region",
      todas: "Alle lande",
      regiones: { americas: "Amerika", europa: "Europa", asia: "Asien og Oceanien", africa: "Afrika og Mellemøsten" },
      tuPais: "Dit land",
      mejor: "Giver mest tilbage",
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
      mejor: (pais, pct) => `Med min løn ville jeg have ${pct} mere tilbage netto ${gDa.en(pais)}`,
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
      mejorPais: "Giver mest tilbage i",
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
      bajada: "Med samme kjøpekraft sitter du igjen med dette netto i hvert land. Hver rad kommer fra den offisielle kalkulatoren i landet.",
      lista: "Land sortert etter nettolønn",
      buscar: "Søk etter land",
      filtrar: "Filtrer etter region",
      todas: "Alle land",
      regiones: { americas: "Amerika", europa: "Europa", asia: "Asia og Oseania", africa: "Afrika og Midtøsten" },
      tuPais: "Ditt land",
      mejor: "Gir mest",
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
      mejor: (pais, pct) => `Med lønnen min ville jeg sittet igjen med ${pct} mer netto ${gNb.en(pais)}`,
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
      mejorPais: "Gir mest i",
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
      bajada: "Samalla ostovoimalla tämän verran jää käteen kussakin maassa. Jokainen rivi tulee maan virallisesta laskurista.",
      lista: "Maat nettopalkan mukaan järjestettynä",
      buscar: "Hae maata",
      filtrar: "Rajaa alueen mukaan",
      todas: "Kaikki maat",
      regiones: { americas: "Amerikka", europa: "Eurooppa", asia: "Aasia ja Oseania", africa: "Afrikka ja Lähi-itä" },
      tuPais: "Oma maasi",
      mejor: "Eniten käteen",
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
      mejor: (pais, pct) => `Palkallani jäisi ${gFi.en(pais)} ${pct} enemmän käteen`,
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
      mejorPais: "Eniten käteen jäävä maa",
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
      bajada: "بالقدرة الشرائية نفسها، هذا ما يبقى لك في كل دولة. كل سطر مأخوذ من الحاسبة الرسمية لتلك الدولة.",
      lista: "الدول مرتبة حسب صافي الراتب",
      buscar: "ابحث عن دولة",
      filtrar: "التصفية حسب المنطقة",
      todas: "الكل",
      regiones: { americas: "الأمريكتان", europa: "أوروبا", asia: "آسيا وأوقيانوسيا", africa: "أفريقيا والشرق الأوسط" },
      tuPais: "دولتك",
      mejor: "الأعلى صافيًا",
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
      mejor: (pais, pct) => `براتبي نفسه، يبقى لي ${pct} أكثر ${gAr.en(pais)}`,
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
      mejorPais: "الأعلى صافيًا في",
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
      bajada: "Dengan daya beli yang sama, inilah gaji bersih Anda di tiap negara. Setiap baris berasal dari kalkulator resmi negara tersebut.",
      lista: "Negara diurutkan menurut gaji bersih",
      buscar: "Cari negara",
      filtrar: "Saring menurut wilayah",
      todas: "Semua",
      regiones: { americas: "Amerika", europa: "Eropa", asia: "Asia dan Oseania", africa: "Afrika dan Timur Tengah" },
      tuPais: "Negara Anda",
      mejor: "Paling menguntungkan",
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
      mejor: (pais, pct) => `Dengan gaji saya, ${gId.en(pais)} saya bisa membawa pulang ${pct} lebih banyak`,
      mejorPropio: (pais) => `Dengan gaji saya, tidak ada negara yang lebih menguntungkan daripada ${gId.nombre(pais)}`,
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
      mejorPais: "Paling menguntungkan di",
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

export const DICCIONARIOS_MUNDO: Diccionarios<TextosMundo> = { es, pt, en, fr, de, it, nl, ja, ko, zh, pl, sv, da, nb, fi, ar, id: idn };

export function textosMundo(idioma: Idioma, trato: Trato, locale?: string): TextosMundo {
  return resolver(DICCIONARIOS_MUNDO, idioma, trato, locale);
}
