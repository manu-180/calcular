import type { Mercado } from "@/motor/tipos";
import { segun } from "@/lib/pagos/email-intl";
import type { ProductoIntl } from "@/lib/pagos/catalogo-intl";

export function precioIntl(p: ProductoIntl, locale: string): string {
  return new Intl.NumberFormat(locale, { style: "currency", currency: p.moneda, currencyDisplay: "code", minimumFractionDigits: p.precioCentavos % 100 ? 2 : 0 }).format(
    p.precioCentavos / 100,
  );
}

export function textosPlanillas(m: Mercado) {
  const t = m.trato;
  return {
    migaPlanillas: "Planillas",
    catalogoTitulo: `Planillas de Excel para ${m.nombre}`,
    catalogoBajada: segun(t, {
      tu: "Planillas listas para usar, con los datos oficiales del país. Pagas una vez y las actualizaciones vienen incluidas.",
      usted: "Planillas listas para usar, con los datos oficiales del país. Paga una vez y las actualizaciones vienen incluidas.",
      vos: "Planillas listas para usar, con los datos oficiales del país. Pagás una vez y las actualizaciones vienen incluidas.",
    }),
    catalogoVacio: segun(t, {
      tu: `Pronto vas a encontrar aquí planillas para ${m.nombre}. Mientras tanto, las calculadoras son gratis.`,
      usted: `Pronto va a encontrar aquí planillas para ${m.nombre}. Mientras tanto, las calculadoras son gratis.`,
      vos: `Pronto vas a encontrar acá planillas para ${m.nombre}. Mientras tanto, las calculadoras son gratis.`,
    }),
    verCalculadoras: "Ver las calculadoras",
    comprar: (precio: string) => `Comprar por ${precio}`,
    pronto: "Pronto a la venta",
    incluye: "Qué incluye",
    incluyeLista: (p: ProductoIntl) => [
      "El archivo .xlsx, que abre en Excel y en Google Sheets.",
      `Las actualizaciones: ${p.disparadorActualizacion.charAt(0).toLowerCase()}${p.disparadorActualizacion.slice(1)}, la actualizamos y el mismo enlace descarga la versión nueva.`,
      segun(t, { tu: "Si no te sirve, te devolvemos el dinero dentro de los 7 días.", usted: "Si no le sirve, le devolvemos el dinero dentro de los 7 días.", vos: "Si no te sirve, te devolvemos el dinero dentro de los 7 días." }),
    ],
    pagoUnico: segun(t, { tu: "Pago único con PayPal. Puedes pagar con tu cuenta o con tarjeta.", usted: "Pago único con PayPal. Puede pagar con su cuenta o con tarjeta.", vos: "Pago único con PayPal. Podés pagar con tu cuenta o con tarjeta." }),
    comprarTitulo: (p: ProductoIntl) => `Comprar la ${p.tituloCorto}`,
    comprarBajada: segun(t, {
      tu: "Te mandamos la planilla a este correo apenas se confirma el pago.",
      usted: "Le mandamos la planilla a este correo apenas se confirma el pago.",
      vos: "Te mandamos la planilla a este correo apenas se confirma el pago.",
    }),
    etiquetaEmail: segun(t, { tu: "Tu correo", usted: "Su correo", vos: "Tu correo" }),
    seguirPago: "Seguir al pago",
    privacidad: segun(t, { tu: "Usamos el correo sólo para mandarte la planilla y sus actualizaciones.", usted: "Usamos el correo sólo para mandarle la planilla y sus actualizaciones.", vos: "Usamos el correo sólo para mandarte la planilla y sus actualizaciones." }),
    errores: {
      email: segun(t, { tu: "Revisa el correo: parece que falta algo.", usted: "Revise el correo: parece que falta algo.", vos: "Revisá el correo: parece que falta algo." }),
      error: segun(t, {
        tu: "No pudimos iniciar el pago. No se te cobró nada. Prueba de nuevo en unos minutos.",
        usted: "No pudimos iniciar el pago. No se le cobró nada. Pruebe de nuevo en unos minutos.",
        vos: "No pudimos iniciar el pago. No se te cobró nada. Probá de nuevo en unos minutos.",
      }),
      cancelado: segun(t, { tu: "Cancelaste el pago. No se te cobró nada.", usted: "Canceló el pago. No se le cobró nada.", vos: "Cancelaste el pago. No se te cobró nada." }),
      fallido: segun(t, {
        tu: "PayPal no aprobó el pago. Puedes probar con otra tarjeta.",
        usted: "PayPal no aprobó el pago. Puede probar con otra tarjeta.",
        vos: "PayPal no aprobó el pago. Podés probar con otra tarjeta.",
      }),
      pronto: "Esta planilla todavía no está a la venta.",
    },
    graciasTitulo: segun(t, { tu: "Gracias por tu compra", usted: "Gracias por su compra", vos: "Gracias por tu compra" }),
    graciasListo: (p: ProductoIntl) =>
      segun(t, {
        tu: `Tu pago está confirmado. Ya puedes descargar la ${p.tituloCorto}. También te la mandamos por correo, con un enlace que no vence.`,
        usted: `Su pago está confirmado. Ya puede descargar la ${p.tituloCorto}. También se la mandamos por correo, con un enlace que no vence.`,
        vos: `Tu pago está confirmado. Ya podés descargar la ${p.tituloCorto}. También te la mandamos por correo, con un enlace que no vence.`,
      }),
    graciasPendiente: segun(t, {
      tu: "Estamos esperando la confirmación de PayPal. Cuando llegue, te mandamos la planilla por correo.",
      usted: "Estamos esperando la confirmación de PayPal. Cuando llegue, le mandamos la planilla por correo.",
      vos: "Estamos esperando la confirmación de PayPal. Cuando llegue, te mandamos la planilla por correo.",
    }),
    descargar: "Descargar la planilla (.xlsx)",
  };
}
