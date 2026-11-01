import type { Trato } from "@/motor/tipos";
import type { ClaveFamilia } from "../ofertas-intl";

// Un texto que no le habla a nadie en particular es un string. Uno que sí, trae una variante por
// registro: "tu" informal, "usted" formal y "vos" voseo (solo español; si falta, vale la de "tu").
export type Variante = string | { readonly tu: string; readonly usted: string; readonly vos?: string };

export const T = (tu: string, usted: string, vos: string): Variante => ({ tu, usted, vos });
export const F = (tu: string, usted: string): Variante => ({ tu, usted });

export function segunTrato(v: Variante, trato: Trato): string {
  if (typeof v === "string") return v;
  return trato === "vos" ? (v.vos ?? v.tu) : v[trato];
}

export function rellenar(plantilla: string, valores: Readonly<Record<string, string>>): string {
  return plantilla.replace(/\{(\w+)\}/g, (m, k: string) => (Object.prototype.hasOwnProperty.call(valores, k) ? valores[k] : m));
}

export interface PuntoTexto {
  titulo: Variante;
  texto: Variante;
}

export interface TextosFamilia {
  nombre: string;
  tituloCorto: string;
  paraQuien: Variante;
  descripcion: readonly Variante[];
  gancho: Variante;
  incluye: readonly PuntoTexto[];
  pasos?: { titulo: Variante; items: readonly Variante[] };
  // La nota es una carta en primera persona: pedido + <cifra> (etiqueta). + cierre.
  nota?: { titulo: Variante; uso: Variante; pedido: string; cierre: string };
  escenarios?: { titulo: Variante; explica: Variante };
  // Aclaración que va siempre a la vista (salud, embarazo): información general, no consejo.
  aviso?: string;
}

export interface DiccionarioVenta {
  familias: Readonly<Record<ClaveFamilia, TextosFamilia>>;
  general: { si: string; no: string };
  tarjeta: {
    cejaInforme: string;
    cejaPlanilla: string;
    pagoUnico: string;
    comprarInforme: Variante;
    comprarPlanilla: Variante;
    confianza: Variante;
    verDetalle: Variante;
    tambien: Variante;
    tablasOficiales: string;
    bajadaInforme: Variante;
    bajadaPlanilla: Variante;
    // {hoja}: nombre de la hoja de la planilla.
    bajadaPlanillaHoja: Variante;
    // {monto}: el precio en la moneda local, aproximado.
    equivale: string;
    cobroDolares: string;
  };
  aviso: { pronto: string; titulo: Variante; ayuda: Variante; boton: string; listo: Variante; error: Variante; correo: Variante };
  planilla: { gancho: Variante; incluye: readonly PuntoTexto[] };
  informe: {
    tusDatos: Variante;
    resultado: string;
    corregir: string;
    actualizar: string;
    imprimir: string;
    imprimirAyuda: Variante;
    sinResultado: Variante;
    lugar: string;
    destinatario: string;
    firma: string;
    nombre: string;
    documento: string;
    // En alemán los sustantivos van con mayúscula: la etiqueta entre paréntesis no se pasa a minúscula.
    etiquetaEnMinuscula: boolean;
    // ja y zh: la carta va con puntuación de ancho completo (：、（）、。) en vez de la latina.
    anchoCompleto?: boolean;
    // bn: la oración de la carta cierra con el dari «।» en vez del punto (ADR 0002, D14).
    puntoFinal?: string;
    // hy: lo que presenta un dato en la carta va con «՝» en vez de los dos puntos (ADR 0002, D30).
    dosPuntos?: string;
    comoSeCalcula: string;
    fuentes: string;
    verificado: string;
    emitido: string;
    valores: string;
    numero: string;
    elegir: Variante;
    legal: Variante;
    legalSinFuentes: Variante;
    errorTitulo: string;
    error: Variante;
    verificar: Variante;
    cupo: Variante;
  };
  catalogo: {
    // {nombre} de la familia y {pais}.
    tituloProducto: string;
    disparadorInforme: string;
    // {normas}
    planillaDescripcion: Variante;
    // {incluye}
    planillaIncluye: string;
  };
  planillas: {
    migaPlanillas: string;
    catalogoTitulo: string;
    catalogoBajada: Variante;
    seccionPlanillas: string;
    seccionInformes: string;
    catalogoVacio: Variante;
    verCalculadoras: string;
    comprar: string;
    pronto: string;
    incluye: string;
    incluyeInforme: readonly Variante[];
    incluyePlanilla: readonly Variante[];
    pagoUnico: Variante;
    comprarPlanilla: string;
    comprarBajadaInforme: Variante;
    comprarBajadaPlanilla: Variante;
    etiquetaEmail: Variante;
    seguirPago: string;
    privacidad: Variante;
    datosTitulo: Variante;
    datosUsar: Variante;
    errores: { email: Variante; error: Variante; cancelado: Variante; fallido: Variante; pronto: string };
    graciasTitulo: Variante;
    graciasListoInforme: Variante;
    graciasListoPlanilla: Variante;
    graciasPendiente: Variante;
    muestraIntro: Variante;
    muestraLeyenda: readonly [Variante, Variante];
    comprobar: Variante;
    comprobarEnlace: string;
    faqTitulo: string;
    faq: {
      sheets: { pregunta: string; respuesta: Variante };
      recibo: { pregunta: string; respuesta: Variante };
      dolares: { pregunta: string; respuesta: Variante; conReferencia: Variante; sinReferencia: Variante };
      devolucion: { pregunta: string; respuesta: Variante };
      actualiza: { pregunta: string; respuesta: string };
    };
    descargar: string;
    abrirInforme: string;
    fuentes: string;
    calculadoras: string;
    muestra: string;
  };
  correo: {
    asuntoInforme: Variante;
    asuntoPlanilla: string;
    mismosNumeros: string;
    enlaceCalculadora: string;
    comprobante: Variante;
    informe: { encabezado: Variante; intro: Variante; boton: string; abre: Variante; guarda: Variante; vence: Variante; devolucion: Variante; ayuda: Variante };
    planilla: {
      encabezado: Variante;
      intro: Variante;
      boton: string;
      abre: string;
      guarda: Variante;
      vence: Variante;
      devolucion: Variante;
      ayuda: Variante;
    };
  };
}
