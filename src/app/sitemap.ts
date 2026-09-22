import type { MetadataRoute } from 'next'
import { MESES_COMERCIO } from '@/data/convenios/comercio'
import { MESES_UOCRA } from '@/data/convenios/uocra'
import { MESES_CAMIONEROS } from '@/data/convenios/camioneros'
import { MESES_CUOTA, slugDeMes } from '@/lib/canasta-meses'
import { esPeriodoIndexable } from '@/lib/archivo-mensual'
import { MESES_CANASTA, slugDeMesCanasta } from '@/lib/canasta-basica-meses'

const BASE = 'https://calcular.ar'

const ANIOS_INFLACION = ['2020', '2021', '2022', '2023', '2024', '2025', '2026']

const BLOG_POSTS = [
  'estatutos-laborales-derogados-2027',
  'tope-de-ingresos-asignaciones-familiares',
  'cuanto-cuesta-criar-un-hijo-argentina',
  'aumento-comercio-agosto-2026',
  'cuanto-se-cobra-de-vacaciones-plus-vacacional-2026',
  'como-se-calcula-la-indemnizacion-por-despido-2026',
  'aguinaldo-monotributista',
  'aguinaldo-proporcional-como-se-calcula',
  'que-incluye-la-cuota-del-monotributo',
  'que-pasa-si-me-paso-del-limite-de-facturacion-del-monotributo',
  'como-calcular-aguinaldo-empleado-de-comercio',
  'nuevo-recibo-de-sueldo-2026',
  'modelo-recibo-de-sueldo-empleado-de-comercio',
  'como-liquidar-sueldo-empleado-de-comercio',
  'aguinaldo-paga-ganancias',
  'que-hacer-con-el-aguinaldo-2026',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,                                   lastModified: new Date('2026-06-01'), changeFrequency: 'weekly',  priority: 1    },
    { url: `${BASE}/aguinaldo`,                    lastModified: new Date('2026-06-01'), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/aguinaldo/neto`,               lastModified: new Date('2026-06-01'), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/aguinaldo/fechas`,             lastModified: new Date('2026-06-01'), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/indemnizacion`,                lastModified: new Date('2026-01-01'), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/sueldo-neto`,                  lastModified: new Date('2026-06-13'), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/sueldo-neto/comercio`,         lastModified: new Date('2026-06-15'), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/sueldo-neto/camioneros`,       lastModified: new Date('2026-06-16'), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/sueldo-neto/construccion`,      lastModified: new Date('2026-06-16'), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/ganancias`,                    lastModified: new Date('2026-06-15'), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/monotributo`,                  lastModified: new Date('2026-01-01'), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/monotributo/categorias`,       lastModified: new Date('2026-01-01'), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/monotributo/recategorizacion`, lastModified: new Date('2026-01-01'), changeFrequency: 'monthly', priority: 0.8  },
    { url: `${BASE}/obra-social-monotributo`,      lastModified: new Date('2026-09-06'), changeFrequency: 'monthly', priority: 0.95 },
    { url: `${BASE}/indemnizacion-art`,            lastModified: new Date('2026-09-06'), changeFrequency: 'monthly', priority: 0.95 },
    { url: `${BASE}/empleador-sin-art`,               lastModified: new Date('2026-09-08'), changeFrequency: 'monthly', priority: 0.95 },
    { url: `${BASE}/rechazo-art`,                  lastModified: new Date('2026-09-09'), changeFrequency: 'monthly', priority: 0.95 },
    { url: `${BASE}/pluriempleo-art`,              lastModified: new Date('2026-09-09'), changeFrequency: 'monthly', priority: 0.95 },
    { url: `${BASE}/aportes-jubilatorios-obligatorios`, lastModified: new Date('2026-09-08'), changeFrequency: 'monthly', priority: 0.95 },
    { url: `${BASE}/derechohabientes-art`,        lastModified: new Date('2026-09-08'), changeFrequency: 'monthly', priority: 0.95 },
    { url: `${BASE}/comision-medica`,              lastModified: new Date('2026-09-07'), changeFrequency: 'monthly', priority: 0.95 },
    { url: `${BASE}/art-empleada-domestica`,       lastModified: new Date('2026-09-07'), changeFrequency: 'monthly', priority: 0.95 },
    { url: `${BASE}/inflacion`,                    lastModified: new Date('2026-06-01'), changeFrequency: 'weekly',  priority: 0.9  },
    { url: `${BASE}/inflacion/alquiler`,           lastModified: new Date('2026-06-01'), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/planillas`,                    lastModified: new Date('2026-09-04'), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/planillas/uocra`,              lastModified: new Date('2026-09-04'), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/plazo-fijo`,                   lastModified: new Date('2026-06-01'), changeFrequency: 'weekly',  priority: 0.8  },
    { url: `${BASE}/vacaciones`,                   lastModified: new Date('2026-01-01'), changeFrequency: 'monthly', priority: 0.8  },
    { url: `${BASE}/cuota-alimentaria`,            lastModified: new Date('2026-07-30'), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/canasta-basica`,               lastModified: new Date('2026-08-01'), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/jubilacion`,                   lastModified: new Date('2026-08-03'), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/asignaciones-familiares`,      lastModified: new Date('2026-08-04'), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/desempleo`,                    lastModified: new Date('2026-08-08'), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/pension-no-contributiva`,      lastModified: new Date('2026-08-12'), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/puam`,                         lastModified: new Date('2026-08-15'), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/edad-avanzada`,                lastModified: new Date('2026-08-15'), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/actualizacion-creditos-laborales`, lastModified: new Date('2026-08-15'), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/indemnizacion-por-fallecimiento`, lastModified: new Date('2026-08-16'), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/propinas`,                     lastModified: new Date('2026-08-15'), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/certificado-de-trabajo`,       lastModified: new Date('2026-08-17'), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/tiempo-parcial`,               lastModified: new Date('2026-08-18'), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/reingreso`,                    lastModified: new Date('2026-08-18'), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/horas-extras`,                 lastModified: new Date('2026-08-19'), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/periodo-de-prueba`,            lastModified: new Date('2026-08-19'), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/descuentos-del-sueldo`,        lastModified: new Date('2026-08-20'), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/despido-empleada-domestica`,   lastModified: new Date('2026-08-20'), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/repartidores-de-apps`,         lastModified: new Date('2026-08-21'), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/rifl`,                         lastModified: new Date('2026-08-21'), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/despido-de-delegado-gremial`,  lastModified: new Date('2026-08-22'), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/practicas-desleales-sindicales`, lastModified: new Date('2026-08-22'), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/indemnizacion-por-clientela`,  lastModified: new Date('2026-08-23'), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/indemnizacion-periodista`,    lastModified: new Date('2026-08-23'), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/renuncia`,                     lastModified: new Date('2026-08-24'), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/reserva-del-empleo`,           lastModified: new Date('2026-08-25'), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/libro-de-sueldos`,              lastModified: new Date('2026-08-25'), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/despido-plazo-fijo`,           lastModified: new Date('2026-08-26'), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/ius-variandi`,                 lastModified: new Date('2026-08-26'), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/transferencia-del-establecimiento`, lastModified: new Date('2026-08-26'), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/conservacion-de-recibos`,      lastModified: new Date('2026-08-26'), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/despido-trabajador-rural`,     lastModified: new Date('2026-08-27'), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/fondo-de-asistencia-laboral`,   lastModified: new Date('2026-08-27'), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/rimi-inversiones`,             lastModified: new Date('2026-08-27'), changeFrequency: 'monthly', priority: 0.8  },
    { url: `${BASE}/servicios-esenciales-huelga`,   lastModified: new Date('2026-08-28'), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/negociacion-de-buena-fe`,      lastModified: new Date('2026-08-28'), changeFrequency: 'monthly', priority: 0.8  },
    { url: `${BASE}/caducidad-de-instancia-laboral`, lastModified: new Date('2026-08-28'), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/impuestos-internos`,          lastModified: new Date('2026-08-30'), changeFrequency: 'monthly', priority: 0.8  },
    { url: `${BASE}/venta-de-inmuebles`,          lastModified: new Date('2026-08-30'), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/honorarios-periciales`,       lastModified: new Date('2026-08-31'), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/convenio-vencido`,            lastModified: new Date('2026-08-31'), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/actualizacion-de-quebrantos`, lastModified: new Date('2026-09-01'), changeFrequency: 'monthly', priority: 0.8  },
    { url: `${BASE}/salario-minimo`,            lastModified: new Date('2026-09-02'), changeFrequency: 'monthly', priority: 1.0  },
    { url: `${BASE}/82-por-ciento-movil`,       lastModified: new Date('2026-09-03'), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/dia-del-empleado-de-comercio`, lastModified: new Date('2026-09-20'), changeFrequency: 'yearly',  priority: 0.8  },
    { url: `${BASE}/descuento-pami`,            lastModified: new Date('2026-09-14'), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/pension-veteranos-malvinas`,   lastModified: new Date('2026-09-03'), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/contratar-persona-con-discapacidad`, lastModified: new Date('2026-09-04'), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/prescripcion-deuda-arca`,     lastModified: new Date('2026-09-04'), changeFrequency: 'monthly', priority: 0.95 },
    { url: `${BASE}/multas-arca`,                 lastModified: new Date('2026-09-15'), changeFrequency: 'monthly', priority: 0.95 },
    { url: `${BASE}/derivar-aportes-a-prepaga`,   lastModified: new Date('2026-09-05'), changeFrequency: 'monthly', priority: 0.95 },
    { url: `${BASE}/hasta-cuando-tengo-obra-social`, lastModified: new Date('2026-09-05'), changeFrequency: 'monthly', priority: 0.95 },
    { url: `${BASE}/temeridad-y-malicia`,        lastModified: new Date('2026-08-24'), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/trabajo-de-mujeres`,          lastModified: new Date('2026-08-24'), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/licencias-especiales`,         lastModified: new Date('2026-08-12'), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/licencia-por-maternidad`,      lastModified: new Date('2026-08-09'), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/licencia-por-enfermedad`,      lastModified: new Date('2026-08-10'), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/empleada-domestica`,           lastModified: new Date('2026-08-10'), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/aportes-empleada-domestica`,   lastModified: new Date('2026-08-11'), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/deduccion-empleada-domestica`, lastModified: new Date('2026-08-13'), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/ganancias-jubilados`,          lastModified: new Date('2026-09-22'), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/deducciones-generales-ganancias`, lastModified: new Date('2026-09-16'), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/ganancias-sociedades`,          lastModified: new Date('2026-09-17'), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/deduccion-alquiler`,          lastModified: new Date('2026-08-14'), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/blog`,                         lastModified: new Date('2026-06-15'), changeFrequency: 'weekly',  priority: 0.7  },
    { url: `${BASE}/convenios`,                    lastModified: new Date('2026-06-13'), changeFrequency: 'monthly', priority: 0.8  },
    { url: `${BASE}/convenios/comercio`,           lastModified: new Date('2026-01-01'), changeFrequency: 'monthly', priority: 0.8  },
    { url: `${BASE}/convenios/uocra`,              lastModified: new Date('2026-01-01'), changeFrequency: 'monthly', priority: 0.8  },
    { url: `${BASE}/convenios/camioneros`,         lastModified: new Date('2026-06-13'), changeFrequency: 'monthly', priority: 0.8  },
    { url: `${BASE}/sobre`,                        lastModified: new Date('2026-01-01'), changeFrequency: 'yearly',  priority: 0.4  },
  ]

  // Los ids salen de los DATOS, no de una lista a mano: es la única forma de que el sitemap y
  // `generateStaticParams` no se separen. (Hasta el 30/7/2026 esto declaraba `/convenios/uocra/enero`
  // y las otras 23 variantes sin año — 24 URLs que respondían 404 y se comían crawl budget.)
  const conveniosMeses: MetadataRoute.Sitemap = [
    ...MESES_COMERCIO.map((m) => ({
      url: `${BASE}/convenios/comercio/${m.id}`,
      lastModified: new Date('2026-06-01'),
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    })),
    ...MESES_UOCRA.map((m) => ({
      url: `${BASE}/convenios/uocra/${m.id}`,
      lastModified: new Date('2026-07-30'),
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    })),
    ...MESES_CAMIONEROS.map((m) => ({
      url: `${BASE}/convenios/camioneros/${m.id}`,
      lastModified: new Date('2026-06-13'),
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    })),
  ]

  // Mismo criterio que convenios: los ids salen de los DATOS (`MESES_CUOTA`), asÃ­ el sitemap y
  // `generateStaticParams` no pueden separarse. El set sÃ³lo crece: el corte es un perÃ­odo fijo,
  // nunca una ventana mÃ³vil (una ventana harÃ­a 404 a URLs ya indexadas).
  // Fuera de la ventana indexable la página sigue viva y enlazada desde el hub, pero no va al
  // sitemap: el `noindex` de la página y este filtro salen del MISMO criterio (`archivo-mensual`)
  // para que no puedan contradecirse.
  const cuotaMeses: MetadataRoute.Sitemap = MESES_CUOTA.filter((m) =>
    esPeriodoIndexable(m.periodo, MESES_CUOTA.map((x) => x.periodo)),
  ).map((m) => ({
    url: `${BASE}/cuota-alimentaria/${slugDeMes(m)}`,
    lastModified: new Date(`${m.periodo}-01`),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Mismo criterio que cuotaMeses: los meses salen de los DATOS, el corte es un período fijo.
  const canastaMeses: MetadataRoute.Sitemap = MESES_CANASTA.filter((m) =>
    esPeriodoIndexable(m.periodo, MESES_CANASTA.map((x) => x.periodo)),
  ).map((m) => ({
    url: `${BASE}/canasta-basica/${slugDeMesCanasta(m)}`,
    lastModified: new Date(`${m.periodo}-01`),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const inflacionAnios: MetadataRoute.Sitemap = ANIOS_INFLACION.map((anio) => ({
    url: `${BASE}/inflacion/${anio}`,
    lastModified: anio === '2026' ? new Date('2026-06-01') : new Date(`${anio}-12-31`),
    changeFrequency: anio === '2026' ? 'monthly' as const : 'yearly' as const,
    priority: 0.7,
  }))

  const blogPosts: MetadataRoute.Sitemap = BLOG_POSTS.map((slug) => ({
    url: `${BASE}/blog/${slug}`,
    lastModified: new Date('2026-06-01'),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  return [...staticRoutes, ...conveniosMeses, ...cuotaMeses, ...canastaMeses, ...inflacionAnios, ...blogPosts]
}
