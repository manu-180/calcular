import type { Mercado } from "@/motor/tipos";
import type { ProductoIntl } from "@/lib/pagos/catalogo-intl";
import { precioUSD } from "@/lib/pagos/ofertas-intl";
import { rellenar, textosVenta } from "@/lib/pagos/textos";

export function precioIntl(p: ProductoIntl, locale: string): string {
  return precioUSD(p.precioCentavos, locale);
}

const minuscula = (s: string) => `${s.charAt(0).toLowerCase()}${s.slice(1)}`;
const mayuscula = (s: string) => `${s.charAt(0).toUpperCase()}${s.slice(1)}`;

// Los textos de las páginas de catálogo, landing, compra y gracias, en el idioma y el trato del país.
export function textosPlanillas(m: Mercado) {
  const x = textosVenta(m.idioma, m.trato).planillas;
  const conPais = (s: string) => rellenar(s, { pais: m.nombre });
  return {
    migaPlanillas: x.migaPlanillas,
    catalogoTitulo: conPais(x.catalogoTitulo),
    catalogoBajada: x.catalogoBajada,
    seccionPlanillas: x.seccionPlanillas,
    seccionInformes: x.seccionInformes,
    catalogoVacio: conPais(x.catalogoVacio),
    verCalculadoras: x.verCalculadoras,
    comprar: (precio: string) => rellenar(x.comprar, { precio }),
    pronto: x.pronto,
    incluye: x.incluye,
    incluyeLista: (p: ProductoIntl) =>
      p.tipo === "informe" ? [...x.incluyeInforme] : x.incluyePlanilla.map((s) => rellenar(s, { disparador: minuscula(p.disparadorActualizacion) })),
    pagoUnico: x.pagoUnico,
    comprarTitulo: (p: ProductoIntl) => (p.tipo === "informe" ? mayuscula(p.tituloCorto) : rellenar(x.comprarPlanilla, { titulo: p.tituloCorto })),
    comprarBajada: (p: ProductoIntl) => (p.tipo === "informe" ? x.comprarBajadaInforme : x.comprarBajadaPlanilla),
    etiquetaEmail: x.etiquetaEmail,
    seguirPago: x.seguirPago,
    privacidad: x.privacidad,
    datosTitulo: x.datosTitulo,
    datosUsar: x.datosUsar,
    errores: { ...x.errores },
    graciasTitulo: x.graciasTitulo,
    graciasListo: (p: ProductoIntl) => rellenar(p.tipo === "informe" ? x.graciasListoInforme : x.graciasListoPlanilla, { titulo: p.tituloCorto }),
    graciasPendiente: x.graciasPendiente,
    muestraIntro: (hoja: string) => rellenar(x.muestraIntro, { hoja }),
    muestraLeyenda: x.muestraLeyenda,
    comprobar: x.comprobar,
    comprobarEnlace: x.comprobarEnlace,
    faqTitulo: x.faqTitulo,
    faq: (p: ProductoIntl, conReferencia: boolean) => {
      const f = x.faq;
      return [
        f.sheets,
        f.recibo,
        { pregunta: f.dolares.pregunta, respuesta: `${f.dolares.respuesta} ${conReferencia ? f.dolares.conReferencia : f.dolares.sinReferencia}` },
        f.devolucion,
        { pregunta: f.actualiza.pregunta, respuesta: rellenar(f.actualiza.respuesta, { disparador: p.disparadorActualizacion }) },
      ];
    },
    descargar: x.descargar,
    abrirInforme: x.abrirInforme,
    fuentes: x.fuentes,
    calculadoras: x.calculadoras,
    muestra: x.muestra,
  };
}
