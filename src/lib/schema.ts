// Builders de JSON-LD reutilizables para la capa GEO (citabilidad por motores de IA
// y buscadores). Article = páginas informativas/guía. Dataset = páginas que publican
// datos estructurados verificados (escalas de convenio, serie de IPC, categorías de
// monotributo). NO usamos FAQPage para rich results (Google los discontinuó en 2026):
// el bloque de FAQ que ya existe en las páginas se mantiene solo como señal semántica.

const SITIO = "https://calcular.ar";

// Editor/publisher único del sitio. Las páginas lo referencian por @id para no
// duplicar la entidad en cada @graph.
export const ORGANIZACION = {
  "@type": "Organization",
  "@id": `${SITIO}/#org`,
  name: "CalculAR",
  url: SITIO,
  description:
    "Calculadoras laborales, fiscales y financieras de Argentina, con datos oficiales verificados y la fecha de verificación a la vista.",
  founder: { "@id": `${SITIO}/#autor` },
};

// Persona real detrás del sitio. Existe por E-E-A-T: en temas de plata (YMYL) un sitio que no
// dice quién responde por los números vale menos, y "un equipo chico" no es nadie. El @id se
// referencia desde cada Article para no duplicar la entidad.
export const AUTOR = {
  "@type": "Person",
  "@id": `${SITIO}/#autor`,
  name: "Manuel Navarro",
  url: `${SITIO}/sobre`,
  email: "manunv97@gmail.com",
  nationality: "AR",
  description:
    "Desarrollador argentino. Construye las calculadoras de CalculAR y verifica cada dato contra el documento oficial del que sale.",
};

/** Schema Article para páginas informativas/guía. `url` y `modificado` son obligatorios. */
export function articleSchema(opts: {
  titulo: string;
  descripcion: string;
  url: string; // relativa, p.ej. "/aguinaldo"
  modificado: string; // ISO "2026-06-13"
  publicado?: string;
}) {
  return {
    "@type": "Article",
    headline: opts.titulo,
    description: opts.descripcion,
    inLanguage: "es-AR",
    mainEntityOfPage: `${SITIO}${opts.url}`,
    datePublished: opts.publicado ?? opts.modificado,
    dateModified: opts.modificado,
    author: { "@id": `${SITIO}/#autor` },
    publisher: { "@id": `${SITIO}/#org` },
  };
}

/** Schema Dataset para páginas que publican datos verificados (escalas, series, tablas). */
export function datasetSchema(opts: {
  nombre: string;
  descripcion: string;
  url: string; // relativa
  modificado: string; // ISO
  fuenteNombre?: string;
  fuenteUrl?: string;
}) {
  return {
    "@type": "Dataset",
    name: opts.nombre,
    description: opts.descripcion,
    inLanguage: "es-AR",
    url: `${SITIO}${opts.url}`,
    dateModified: opts.modificado,
    isAccessibleForFree: true,
    creator: { "@id": `${SITIO}/#org` },
    ...(opts.fuenteUrl
      ? { isBasedOn: opts.fuenteUrl, citation: opts.fuenteNombre }
      : {}),
  };
}
