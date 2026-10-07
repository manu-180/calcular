import type { PaginaGlobal } from "../paginas";
import { ldMigas, rutaIntl, urlIntl } from "../seo";
import type { ContextoSitio } from "./contexto";
import { JsonLd, Migas } from "./Sitio";

export const MAIL_CONTACTO = "manunv97@gmail.com";
const ACTUALIZADO = "7 de octubre de 2026";

interface Bloque {
  titulo?: string;
  parrafos: readonly string[];
}

interface PaginaLegal {
  title: string;
  description: string;
  h1: string;
  bajada: string;
  bloques: readonly Bloque[];
}

// Textos propios de CalcularYa, en tú neutro. El mail es el mismo canal que calcular.ar/contacto.
export const PAGINAS_LEGALES: Record<PaginaGlobal, PaginaLegal> = {
  sobre: {
    title: "Quiénes somos | CalcularYa",
    description: "CalcularYa hace calculadoras del trabajo y el dinero para Latinoamérica, con cada dato tomado de la fuente oficial de cada país.",
    h1: "Quiénes somos",
    bajada: "Calculadoras del trabajo y el dinero para Latinoamérica, con el dato oficial de cada país.",
    bloques: [
      {
        parrafos: [
          "CalcularYa es un sitio de calculadoras para cuentas que cambian de un país a otro: aguinaldo, liquidación, sueldo neto y otras.",
          "Lo hace Manuel Navarro, que también hace calcular.ar, el sitio de calculadoras de Argentina.",
        ],
      },
      {
        titulo: "Cómo trabajamos",
        parrafos: [
          "Cada valor (un salario mínimo, un porcentaje de aporte, un tope) lo leemos en la fuente oficial del país: el diario oficial, el ministerio de trabajo, el banco central o el ente que cobra los impuestos.",
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
    description: "Escríbenos si un dato está desactualizado, si una cuenta no te da lo que esperabas o si quieres sumar una calculadora o un país.",
    h1: "Contacto",
    bajada: `Escríbenos a ${MAIL_CONTACTO}.`,
    bloques: [
      {
        parrafos: [
          "Nos sirve que nos cuentes si un dato está desactualizado, si una cuenta no te da lo que esperabas o si quieres que sumemos una calculadora o un país.",
          "Si es sobre un dato, incluye el país y la página donde lo viste.",
          "Respondemos en persona. Puede llevarnos unos días.",
        ],
      },
    ],
  },
  privacidad: {
    title: "Privacidad | CalcularYa",
    description: "Qué datos usa CalcularYa: lo que escribes en una calculadora se procesa en tu navegador y no lo guardamos.",
    h1: "Privacidad",
    bajada: `Última actualización: ${ACTUALIZADO}.`,
    bloques: [
      {
        titulo: "Lo que escribes en una calculadora",
        parrafos: ["La cuenta se hace en tu navegador. Lo que escribes no se envía a ningún servidor y no lo guardamos."],
      },
      {
        titulo: "Tu país",
        parrafos: [
          "Para sugerirte las calculadoras de tu país, consultamos desde qué país te conectas. Lo deduce nuestro proveedor de hosting a partir de tu dirección IP.",
          "No guardamos ni la IP ni el país. La respuesta queda en tu navegador mientras dura la visita.",
        ],
      },
      {
        titulo: "Lo que guarda tu navegador",
        parrafos: [
          "Usamos el almacenamiento de sesión del navegador para recordar tu país y si cerraste el aviso que lo sugiere. Se borra al cerrar la pestaña.",
          "No usamos cookies de publicidad ni de seguimiento.",
        ],
      },
      {
        titulo: "Hosting",
        parrafos: ["El sitio está alojado en Vercel. Como todo servidor, registra datos técnicos de cada visita (la dirección IP y el navegador) para que el sitio funcione y sea seguro."],
      },
      {
        titulo: "Cambios y consultas",
        parrafos: [
          "Si algo de esto cambia (por ejemplo, si sumamos publicidad), lo vamos a contar en esta página antes de que empiece a regir.",
          `Para cualquier pregunta sobre tus datos, escríbenos a ${MAIL_CONTACTO}.`,
        ],
      },
    ],
  },
  terminos: {
    title: "Términos de uso | CalcularYa",
    description: "Las calculadoras de CalcularYa dan una estimación con los datos oficiales vigentes. Sirven para orientarte y no reemplazan un asesoramiento.",
    h1: "Términos de uso",
    bajada: `Última actualización: ${ACTUALIZADO}.`,
    bloques: [
      {
        titulo: "Para qué sirven las calculadoras",
        parrafos: [
          "Los resultados son una estimación hecha con los datos oficiales vigentes. Sirven para orientarte.",
          "No reemplazan el cálculo de tu empleador, de un contador o de un abogado, ni lo que diga el organismo oficial.",
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
        parrafos: ["El sitio es gratis. Puedes usarlo y compartir sus enlaces. No está permitido copiar el contenido de forma masiva ni hacerse pasar por CalcularYa."],
      },
      {
        titulo: "Responsabilidad",
        parrafos: ["No respondemos por decisiones tomadas solo a partir de un resultado del sitio. Si vas a firmar, pagar o reclamar algo, confirma la cuenta con quien corresponda."],
      },
      { titulo: "Contacto", parrafos: [`Escríbenos a ${MAIL_CONTACTO}.`] },
    ],
  },
};

function conMail(texto: string) {
  const i = texto.indexOf(MAIL_CONTACTO);
  if (i < 0) return texto;
  return (
    <>
      {texto.slice(0, i)}
      <a href={`mailto:${MAIL_CONTACTO}`}>{MAIL_CONTACTO}</a>
      {texto.slice(i + MAIL_CONTACTO.length)}
    </>
  );
}

export function PaginaLegalVista({ ctx, slug }: { ctx: ContextoSitio; slug: PaginaGlobal }) {
  const p = PAGINAS_LEGALES[slug];
  return (
    <div className="cy-pagina cy-legal">
      <JsonLd
        datos={ldMigas([
          { nombre: ctx.textos.migas.inicio, url: urlIntl("global") },
          { nombre: p.h1, url: urlIntl("global", slug) },
        ])}
      />
      <Migas etiqueta={ctx.textos.migas.etiqueta} items={[{ nombre: ctx.textos.migas.inicio, href: rutaIntl("global") }, { nombre: p.h1 }]} />
      <header className="cy-heroe cy-heroe-chico">
        <h1 className="cy-titular">{p.h1}</h1>
        <p className="cy-bajada">{conMail(p.bajada)}</p>
      </header>
      <div className="cy-texto">
        {p.bloques.map((b, i) => (
          <section key={b.titulo ?? i}>
            {b.titulo ? <h2>{b.titulo}</h2> : null}
            {b.parrafos.map((t) => (
              <p key={t}>{conMail(t)}</p>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
