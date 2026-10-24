import type { DiccionarioLegal } from "./tipos";

// Escrito casi todo sin conjugar en segunda persona, así el mismo texto sirve para tú, vos y usted;
// lo poco que cambia va en los parches.
export const es: DiccionarioLegal = ({ actualizado, mail }) => ({
  base: {
    sobre: {
      title: "Quiénes somos | CalcularYa",
      description: "CalcularYa hace calculadoras del trabajo, el dinero y el día a día para cada país, con los datos tomados de la fuente oficial.",
      h1: "Quiénes somos",
      bajada: "Calculadoras para cada país, con el dato oficial de cada uno.",
      bloques: [
        {
          parrafos: [
            "CalcularYa es un sitio de calculadoras para cuentas de todos los días: sueldo, préstamos, impuestos, fechas y muchas más.",
            "Lo hace Manuel Navarro, que también hace calcular.ar, el sitio de calculadoras de Argentina.",
          ],
        },
        {
          titulo: "Cómo trabajamos",
          parrafos: [
            "Cuando una cuenta depende de una norma (un salario mínimo, un porcentaje de aporte, un tope), leemos el valor en la fuente oficial del país: el boletín oficial, el ministerio, el banco central o el ente que cobra los impuestos.",
            "Guardamos el enlace y la fecha en que lo revisamos, y los mostramos junto a cada calculadora.",
            "Si un valor no se pudo confirmar en la fuente oficial, la calculadora que lo usa no se publica.",
            "Cuando una norma cambia, la calculadora cambia con ella y el cambio queda en las novedades de cada país.",
          ],
        },
        { titulo: "Gratis", parrafos: ["Las calculadoras son gratis y no piden registro."] },
      ],
    },
    contacto: {
      title: "Contacto | CalcularYa",
      description: "Escríbenos si un dato está desactualizado, si una cuenta no da lo esperado o si quieres sumar una calculadora o un país.",
      h1: "Contacto",
      bajada: `Nuestro correo es ${mail}.`,
      bloques: [
        {
          parrafos: [
            "Nos sirve saber si un dato está desactualizado, si una cuenta no da lo que esperabas o si falta una calculadora o un país.",
            "Si es sobre un dato, incluye el país y la página donde lo viste.",
            "Respondemos en persona. Puede llevarnos unos días.",
          ],
        },
      ],
    },
    privacidad: {
      title: "Privacidad | CalcularYa",
      description: "Qué datos usa CalcularYa: lo que se escribe en una calculadora se procesa en el navegador y no lo guardamos.",
      h1: "Privacidad",
      bajada: `Última actualización: ${actualizado}.`,
      bloques: [
        {
          titulo: "Lo que se escribe en una calculadora",
          parrafos: ["La cuenta se hace en el navegador. Lo que se escribe no se envía a ningún servidor y no lo guardamos."],
        },
        {
          titulo: "El país de la visita",
          parrafos: [
            "Para sugerir las calculadoras del país correcto, consultamos desde qué país llega la visita. Lo deduce nuestro proveedor de hosting a partir de la dirección IP.",
            "No guardamos la IP. La respuesta queda en el navegador mientras dura la visita.",
          ],
        },
        {
          titulo: "Lo que guarda el navegador",
          parrafos: [
            "En el almacenamiento de sesión del navegador, que se borra al cerrar la pestaña, recordamos el país de la visita, si se cerró el aviso que lo sugiere y, si se llegó por un enlace compartido, el código de ese enlace.",
            "En el almacenamiento local, que queda hasta que se borra desde el navegador, guardamos el país que se eligió a mano, un número al azar para contar visitas y la versión que se muestra de una prueba de diseño, para que el sitio se vea igual en cada visita. Nada de eso dice quién es la persona.",
            "No usamos cookies de publicidad ni de seguimiento.",
          ],
        },
        {
          titulo: "Hosting",
          parrafos: ["El sitio está alojado en Vercel. Como todo servidor, registra datos técnicos de cada visita (la dirección IP y el navegador) para que el sitio funcione y sea seguro."],
        },
        {
          titulo: "Cómo contamos las visitas",
          parrafos: [
            "Medimos el uso del sitio con una herramienta propia: qué páginas se abren y cuánto se usan, desde qué sitio se llegó, el tipo de dispositivo y el país. El número al azar que guarda el navegador sirve para distinguir una visita nueva de una que vuelve. No guardamos la IP ni lo que se escribe en una calculadora.",
            "Los enlaces que se comparten desde el sitio llevan un código al azar, distinto en cada compartido, para contar cuántas visitas trae cada uno. Ese código no identifica a nadie.",
            "Los montos que se escriben en una calculadora nunca salen del navegador dentro de un enlace.",
          ],
        },
        {
          titulo: "Cambios y consultas",
          parrafos: [
            "Si algo de esto cambia (por ejemplo, si sumamos publicidad), lo vamos a contar en esta página antes de que empiece a regir.",
            `Para cualquier pregunta sobre datos personales, nuestro correo es ${mail}.`,
          ],
        },
        {
          titulo: "Los sueldos que se aportan",
          parrafos: [
            "En «Sueldos reales» se puede sumar un sueldo de forma anónima y opcional, solo con un consentimiento explícito. Se guarda el país, la ocupación (de una lista cerrada), el rango de años de experiencia, el sueldo bruto por mes redondeado a dos cifras y el mes. No se guarda la IP, el navegador, una cuenta ni la fecha exacta.",
            "Solo publicamos la mediana y el rango de grupos de 10 personas o más. Nunca se muestra un sueldo individual.",
            "Para no cargar dos veces el mismo país en el mismo mes, el navegador recuerda en su almacenamiento local el país y el mes del aporte, nunca el monto.",
            "Como el aporte no queda ligado a nadie, no hay forma de encontrarlo después para borrarlo.",
          ],
        },
      ],
    },
    terminos: {
      title: "Términos de uso | CalcularYa",
      description: "Las calculadoras de CalcularYa dan una estimación con los datos oficiales vigentes. Sirven para orientarse y no reemplazan un asesoramiento.",
      h1: "Términos de uso",
      bajada: `Última actualización: ${actualizado}.`,
      bloques: [
        {
          titulo: "Para qué sirven las calculadoras",
          parrafos: [
            "Los resultados son una estimación hecha con los datos oficiales vigentes. Sirven para orientarse.",
            "No reemplazan el cálculo de un empleador, un contador o un abogado, ni lo que diga el organismo oficial.",
          ],
        },
        {
          titulo: "De dónde salen los datos",
          parrafos: [
            "Cada calculadora muestra la fuente oficial de sus valores y la fecha en que los revisamos.",
            "Hacemos lo posible para que estén al día, pero una norma puede cambiar antes de que la sumemos.",
          ],
        },
        {
          titulo: "Uso del sitio",
          parrafos: ["El sitio es gratis. Se puede usar y compartir sus enlaces. No está permitido copiar el contenido de forma masiva ni hacerse pasar por CalcularYa."],
        },
        {
          titulo: "Responsabilidad",
          parrafos: ["No respondemos por decisiones tomadas solo a partir de un resultado del sitio. Antes de firmar, pagar o reclamar algo, conviene confirmar la cuenta con quien corresponda."],
        },
        { titulo: "Contacto", parrafos: [`Nuestro correo es ${mail}.`] },
      ],
    },
  },
  vos: {
    contacto: {
      description: "Escribinos si un dato está desactualizado, si una cuenta no da lo esperado o si querés sumar una calculadora o un país.",
      bloques: [
        {
          parrafos: [
            "Nos sirve saber si un dato está desactualizado, si una cuenta no te da lo que esperabas o si falta una calculadora o un país.",
            "Si es sobre un dato, incluí el país y la página donde lo viste.",
            "Respondemos en persona. Puede llevarnos unos días.",
          ],
        },
      ],
    },
  },
  usted: {
    contacto: {
      description: "Escríbanos si un dato está desactualizado, si una cuenta no da lo esperado o si quiere sumar una calculadora o un país.",
      bloques: [
        {
          parrafos: [
            "Nos sirve saber si un dato está desactualizado, si una cuenta no le da lo que esperaba o si falta una calculadora o un país.",
            "Si es sobre un dato, incluya el país y la página donde lo vio.",
            "Respondemos en persona. Puede llevarnos unos días.",
          ],
        },
      ],
    },
  },
});
