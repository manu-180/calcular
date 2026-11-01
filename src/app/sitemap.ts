import type { MetadataRoute } from 'next'
import { MESES_COMERCIO } from '@/data/convenios/comercio'
import { MESES_UOCRA } from '@/data/convenios/uocra'
import { MESES_CAMIONEROS } from '@/data/convenios/camioneros'
import { MESES_CUOTA, slugDeMes } from '@/lib/canasta-meses'
import { esPeriodoIndexable } from '@/lib/archivo-mensual'
import { MESES_CANASTA, slugDeMesCanasta } from '@/lib/canasta-basica-meses'
import { aniosDisponibles, ULTIMO_PERIODO } from '@/lib/inflacion'
import { hoyAR } from '@/lib/hoy'
import { paisesConSueldos } from '@/lib/sueldos/lectura'
import { ultimoCambio } from '@/lib/novedades'
import { alternosSitemapAR } from '@/lib/hreflang-ar'
import { SITIO } from '@/lib/seo'
import { RUTA_MUNDO_AR } from '@/motor/mundo/rutas'
import { hreflangMundo } from '@/motor/mundo/ui/seo'
import { RUTA_SUELDOS_AR } from '@/motor/sueldos/rutas'
import { hreflangVaAlSitemap } from '@/motor/seo'
import { hreflangARActivo, intlActivo, modoPublicacion } from '@/motor/sitio'
import { registro } from '@/paises'

const BASE = SITIO

// «Sueldos reales» entra cuando la foto diaria publica una ocupación de Argentina: se rearma cada hora
// para enterarse sin deploy (la lectura está cacheada y tiene tope de espera).
export const revalidate = 3600

// Sin changeFrequency ni priority: Google y Bing los ignoran. Lo único que usan es lastmod, y solo
// mientras sea creíble, así que cada fecha es la del último cambio real de la página: la misma que
// la página declara como dateModified en su JSON-LD (check_seo.ts falla si el sitemap queda atrás
// de una fecha literal de la página). Las páginas sin fecha propia toman la del último cambio en git.
const PAGINAS: readonly (readonly [string, string])[] = [
  [`${BASE}/aguinaldo`, '2026-06-13'],
  [`${BASE}/aguinaldo/neto`, '2026-06-19'],
  [`${BASE}/aguinaldo/fechas`, '2026-06-19'],
  [`${BASE}/indemnizacion`, '2026-09-21'],
  [`${BASE}/sueldo-neto`, '2026-06-13'],
  [`${BASE}/sueldo-neto/comercio`, '2026-06-15'],
  [`${BASE}/convenios/comercio/por-horas`, '2026-10-16'],
  [`${BASE}/sueldo-neto/camioneros`, '2026-09-28'],
  [`${BASE}/sueldo-neto/construccion`, '2026-09-28'],
  [`${BASE}${RUTA_MUNDO_AR}`, '2026-10-25'],
  [`${BASE}/cuantas-horas-de-trabajo`, '2026-10-25'],
  [`${BASE}/ganancias`, '2026-06-15'],
  [`${BASE}/monotributo`, '2026-06-13'],
  [`${BASE}/monotributo/categorias`, '2026-06-18'],
  [`${BASE}/monotributo/recategorizacion`, '2026-08-05'],
  [`${BASE}/obra-social-monotributo`, '2026-09-06'],
  [`${BASE}/indemnizacion-art`, '2026-09-06'],
  [`${BASE}/empleador-sin-art`, '2026-09-08'],
  [`${BASE}/rechazo-art`, '2026-09-09'],
  [`${BASE}/pluriempleo-art`, '2026-09-09'],
  [`${BASE}/aportes-jubilatorios-obligatorios`, '2026-09-08'],
  [`${BASE}/derechohabientes-art`, '2026-09-08'],
  [`${BASE}/comision-medica`, '2026-09-07'],
  [`${BASE}/art-empleada-domestica`, '2026-09-07'],
  [`${BASE}/inflacion`, '2026-06-15'],
  [`${BASE}/inflacion/alquiler`, '2026-10-06'],
  [`${BASE}/planillas/uocra`, '2026-09-04'],
  [`${BASE}/planillas/casas-particulares`, '2026-09-27'],
  [`${BASE}/planillas/monotributo`, '2026-09-27'],
  [`${BASE}/planillas/alquileres`, '2026-10-06'],
  [`${BASE}/planillas/camioneros`, '2026-10-06'],
  [`${BASE}/planillas/mi-sueldo`, '2026-10-06'],
  [`${BASE}/planillas/plazo-fijo`, '2026-10-06'],
  [`${BASE}/planillas/vacaciones`, '2026-10-06'],
  [`${BASE}/informes/cuota-alimentaria`, '2026-10-06'],
  [`${BASE}/informes/indemnizacion`, '2026-10-06'],
  [`${BASE}/informes/ganancias`, '2026-10-06'],
  [`${BASE}/informes/inflacion`, '2026-10-06'],
  [`${BASE}/informes/credito-laboral`, '2026-10-06'],
  [`${BASE}/plazo-fijo`, '2026-06-15'],
  [`${BASE}/vacaciones`, '2026-06-13'],
  [`${BASE}/cuota-alimentaria`, '2026-10-06'],
  [`${BASE}/canasta-basica`, '2026-09-28'],
  [`${BASE}/jubilacion`, '2026-09-28'],
  [`${BASE}/asignaciones-familiares`, '2026-10-01'],
  [`${BASE}/desempleo`, '2026-10-01'],
  [`${BASE}/pension-no-contributiva`, '2026-10-01'],
  [`${BASE}/puam`, '2026-10-01'],
  [`${BASE}/edad-avanzada`, '2026-10-01'],
  [`${BASE}/actualizacion-creditos-laborales`, '2026-08-15'],
  [`${BASE}/indemnizacion-por-fallecimiento`, '2026-08-16'],
  [`${BASE}/propinas`, '2026-08-15'],
  [`${BASE}/certificado-de-trabajo`, '2026-08-17'],
  [`${BASE}/tiempo-parcial`, '2026-08-18'],
  [`${BASE}/reingreso`, '2026-08-18'],
  [`${BASE}/horas-extras`, '2026-08-20'],
  [`${BASE}/periodo-de-prueba`, '2026-08-19'],
  [`${BASE}/descuentos-del-sueldo`, '2026-08-20'],
  [`${BASE}/despido-empleada-domestica`, '2026-08-20'],
  [`${BASE}/repartidores-de-apps`, '2026-08-21'],
  [`${BASE}/rifl`, '2026-08-21'],
  [`${BASE}/despido-de-delegado-gremial`, '2026-08-22'],
  [`${BASE}/practicas-desleales-sindicales`, '2026-08-22'],
  [`${BASE}/indemnizacion-por-clientela`, '2026-08-23'],
  [`${BASE}/indemnizacion-periodista`, '2026-08-23'],
  [`${BASE}/renuncia`, '2026-08-24'],
  [`${BASE}/reserva-del-empleo`, '2026-08-25'],
  [`${BASE}/libro-de-sueldos`, '2026-08-25'],
  [`${BASE}/despido-plazo-fijo`, '2026-08-26'],
  [`${BASE}/ius-variandi`, '2026-08-26'],
  [`${BASE}/transferencia-del-establecimiento`, '2026-08-26'],
  [`${BASE}/conservacion-de-recibos`, '2026-08-26'],
  [`${BASE}/despido-trabajador-rural`, '2026-08-27'],
  [`${BASE}/fondo-de-asistencia-laboral`, '2026-08-27'],
  [`${BASE}/rimi-inversiones`, '2026-08-27'],
  [`${BASE}/servicios-esenciales-huelga`, '2026-08-28'],
  [`${BASE}/negociacion-de-buena-fe`, '2026-08-28'],
  [`${BASE}/caducidad-de-instancia-laboral`, '2026-08-28'],
  [`${BASE}/impuestos-internos`, '2026-08-30'],
  [`${BASE}/venta-de-inmuebles`, '2026-08-30'],
  [`${BASE}/honorarios-periciales`, '2026-08-31'],
  [`${BASE}/convenio-vencido`, '2026-08-31'],
  [`${BASE}/actualizacion-de-quebrantos`, '2026-09-01'],
  [`${BASE}/salario-minimo`, '2026-09-02'],
  [`${BASE}/82-por-ciento-movil`, '2026-09-03'],
  [`${BASE}/dia-del-empleado-de-comercio`, '2026-09-20'],
  [`${BASE}/descuento-pami`, '2026-09-14'],
  [`${BASE}/pension-veteranos-malvinas`, '2026-09-03'],
  [`${BASE}/contratar-persona-con-discapacidad`, '2026-09-04'],
  [`${BASE}/prescripcion-deuda-arca`, '2026-09-04'],
  [`${BASE}/multas-arca`, '2026-09-15'],
  [`${BASE}/derivar-aportes-a-prepaga`, '2026-09-05'],
  [`${BASE}/hasta-cuando-tengo-obra-social`, '2026-09-05'],
  [`${BASE}/temeridad-y-malicia`, '2026-08-24'],
  [`${BASE}/trabajo-de-mujeres`, '2026-08-24'],
  [`${BASE}/licencias-especiales`, '2026-08-12'],
  [`${BASE}/licencia-por-maternidad`, '2026-08-09'],
  [`${BASE}/licencia-por-enfermedad`, '2026-08-10'],
  [`${BASE}/empleada-domestica`, '2026-09-28'],
  [`${BASE}/aportes-empleada-domestica`, '2026-09-05'],
  [`${BASE}/deduccion-empleada-domestica`, '2026-08-13'],
  [`${BASE}/ganancias-autonomos`, '2026-09-22'],
  [`${BASE}/ganancias-jubilados`, '2026-09-22'],
  [`${BASE}/deducciones-generales-ganancias`, '2026-09-16'],
  [`${BASE}/ganancias-sociedades`, '2026-09-17'],
  [`${BASE}/deduccion-alquiler`, '2026-08-14'],
  [`${BASE}/convenios/comercio`, '2026-07-30'],
  [`${BASE}/convenios/uocra`, '2026-09-28'],
  [`${BASE}/convenios/camioneros`, '2026-06-13'],
  [`${BASE}/sobre`, '2026-09-30'],
]

const BLOG_POSTS: readonly (readonly [string, string])[] = [
  ['estatutos-laborales-derogados-2027', '2026-08-23'],
  ['tope-de-ingresos-asignaciones-familiares', '2026-09-28'],
  ['cuanto-cuesta-criar-un-hijo-argentina', '2026-09-28'],
  ['aumento-comercio-agosto-2026', '2026-07-30'],
  ['cuanto-se-cobra-de-vacaciones-plus-vacacional-2026', '2026-06-25'],
  ['como-se-calcula-la-indemnizacion-por-despido-2026', '2026-06-25'],
  ['aguinaldo-monotributista', '2026-06-24'],
  ['aguinaldo-proporcional-como-se-calcula', '2026-06-23'],
  ['que-incluye-la-cuota-del-monotributo', '2026-06-22'],
  ['que-pasa-si-me-paso-del-limite-de-facturacion-del-monotributo', '2026-06-22'],
  ['como-calcular-aguinaldo-empleado-de-comercio', '2026-06-15'],
  ['nuevo-recibo-de-sueldo-2026', '2026-06-15'],
  ['modelo-recibo-de-sueldo-empleado-de-comercio', '2026-06-15'],
  ['como-liquidar-sueldo-empleado-de-comercio', '2026-06-15'],
  ['aguinaldo-paga-ganancias', '2026-06-20'],
  ['que-hacer-con-el-aguinaldo-2026', '2026-06-20'],
]

type Entrada = { ruta: string; fecha?: string }

const mayor = (fechas: (string | undefined)[]) =>
  fechas.filter((f): f is string => Boolean(f)).sort().pop()

// Un mes de escala que todavía no empezó ya tiene página (la paritaria se firma antes), pero su
// "1° del mes" está en el futuro: un lastmod futuro es inválido, así que va sin fecha hasta que llegue.
function delMes(ruta: string, anio: number, mes: number, hoy: string): Entrada {
  const fecha = `${anio}-${String(mes).padStart(2, '0')}-01`
  return fecha <= hoy ? { ruta, fecha } : { ruta }
}

// El clúster de «Tu sueldo en el mundo» pasa de MAX_HREFLANG_HEAD: con el flag de hreflang AR prendido va
// acá (xhtml:link), igual que en el sitemap de cada mercado de calcularya. Apagado, el sitemap no cambia.
function alternosMundo(): Record<string, string> | undefined {
  if (!hreflangARActivo() || !intlActivo()) return undefined
  const idiomas = hreflangMundo(registro, modoPublicacion())
  return idiomas && hreflangVaAlSitemap(idiomas) ? idiomas : undefined
}

// Sin base o con error el conjunto viene vacío: la página queda afuera y el sitemap sale igual.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return armarSitemap((await paisesConSueldos()).has('ar'))
}

// Sincrónica y aparte para los checks (check_seo, check_archivo_mensual), que no esperan a la base.
export function armarSitemap(conSueldos = false): MetadataRoute.Sitemap {
  const hoy = hoyAR()
  const sueldos: Entrada[] = conSueldos ? [{ ruta: RUTA_SUELDOS_AR }] : []

  const fijas: Entrada[] = PAGINAS.map(([url, fecha]) => ({ ruta: url.slice(BASE.length), fecha }))
  const blog: Entrada[] = BLOG_POSTS.map(([slug, fecha]) => ({ ruta: `/blog/${slug}`, fecha }))

  // Los ids salen de los DATOS, no de una lista a mano: es la única forma de que el sitemap y
  // `generateStaticParams` no se separen (hasta el 30/7/2026 se declararon 24 URLs que daban 404).
  const convenios: Entrada[] = [
    ...MESES_COMERCIO.map((m) => delMes(`/convenios/comercio/${m.id}`, m.anio, m.mes, hoy)),
    ...MESES_UOCRA.map((m) => delMes(`/convenios/uocra/${m.id}`, m.anio, m.mes, hoy)),
    ...MESES_CAMIONEROS.map((m) => delMes(`/convenios/camioneros/${m.id}`, m.anio, m.mes, hoy)),
  ]

  // Fuera de la ventana indexable la página sigue viva y enlazada desde el hub, pero no va al
  // sitemap: el `noindex` de la página y este filtro salen del MISMO criterio (`archivo-mensual`).
  const cuota: Entrada[] = MESES_CUOTA.filter((m) =>
    esPeriodoIndexable(m.periodo, MESES_CUOTA.map((x) => x.periodo)),
  ).map((m) => ({ ruta: `/cuota-alimentaria/${slugDeMes(m)}`, fecha: `${m.periodo}-01` }))

  const canasta: Entrada[] = MESES_CANASTA.filter((m) =>
    esPeriodoIndexable(m.periodo, MESES_CANASTA.map((x) => x.periodo)),
  ).map((m) => ({ ruta: `/canasta-basica/${slugDeMesCanasta(m)}`, fecha: `${m.periodo}-01` }))

  // Cada año (cerrado o no) recalcula "cuánto es hoy" con el último IPC: la página declara esa
  // misma fecha. Los años salen de la serie, igual que su generateStaticParams.
  const inflacion: Entrada[] = aniosDisponibles().map((anio) => ({
    ruta: `/inflacion/${anio}`,
    fecha: `${ULTIMO_PERIODO}-15`,
  }))

  const hijos = (prefijo: string, lista: Entrada[]) =>
    mayor(lista.filter((e) => e.ruta.startsWith(prefijo)).map((e) => e.fecha))

  const hubs: Entrada[] = (
    [
      [`${BASE}/blog`, mayor(blog.map((e) => e.fecha))],
      [`${BASE}/convenios`, mayor([hijos('/convenios/', fijas), ...convenios.map((e) => e.fecha)])],
      [`${BASE}/planillas`, hijos('/planillas/', fijas)],
      [`${BASE}/novedades`, ultimoCambio() ?? undefined],
    ] as const
  ).map(([url, fecha]) => ({ ruta: url.slice(BASE.length), fecha }))

  const resto = [...fijas, ...sueldos, ...hubs, ...convenios, ...cuota, ...canasta, ...inflacion, ...blog]
  const inicio: Entrada = { ruta: '/', fecha: mayor(resto.map((e) => e.fecha)) }

  // Clústeres grandes de las calculadoras con concepto (src/lib/hreflang-ar.ts): con el flag apagado el
  // mapa viene vacío y el sitemap no cambia.
  const mundo = alternosMundo()
  const clusteres = alternosSitemapAR()
  return [inicio, ...resto].map((e) => {
    const idiomas = e.ruta === RUTA_MUNDO_AR ? mundo : clusteres.get(e.ruta)
    return {
      url: e.ruta === '/' ? BASE : `${BASE}${e.ruta}`,
      ...(e.fecha ? { lastModified: e.fecha } : {}),
      ...(idiomas ? { alternates: { languages: idiomas } } : {}),
    }
  })
}
