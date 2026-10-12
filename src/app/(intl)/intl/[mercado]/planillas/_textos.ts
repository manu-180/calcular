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
    migaPlanillas: "Planillas e informes",
    catalogoTitulo: `Planillas e informes para ${m.nombre}`,
    catalogoBajada: segun(t, {
      tu: "Planillas de Excel e informes en PDF con tus números y los datos oficiales del país. Pagas una vez, sin suscripción.",
      usted: "Planillas de Excel e informes en PDF con sus números y los datos oficiales del país. Paga una vez, sin suscripción.",
      vos: "Planillas de Excel e informes en PDF con tus números y los datos oficiales del país. Pagás una vez, sin suscripción.",
    }),
    seccionPlanillas: "Planillas de Excel",
    seccionInformes: "Informes en PDF",
    catalogoVacio: segun(t, {
      tu: `Pronto vas a encontrar aquí planillas para ${m.nombre}. Mientras tanto, las calculadoras son gratis.`,
      usted: `Pronto va a encontrar aquí planillas para ${m.nombre}. Mientras tanto, las calculadoras son gratis.`,
      vos: `Pronto vas a encontrar acá planillas para ${m.nombre}. Mientras tanto, las calculadoras son gratis.`,
    }),
    verCalculadoras: "Ver las calculadoras",
    comprar: (precio: string) => `Comprar por ${precio}`,
    pronto: "Pronto a la venta",
    incluye: "Qué incluye",
    incluyeLista: (p: ProductoIntl) =>
      p.tipo === "informe"
        ? [
            segun(t, {
              tu: "El informe con tus números, en una página que imprimes o guardas en PDF.",
              usted: "El informe con sus números, en una página que imprime o guarda en PDF.",
              vos: "El informe con tus números, en una página que imprimís o guardás en PDF.",
            }),
            segun(t, {
              tu: "Un enlace que no vence: puedes corregir tus datos y volver a imprimirlo cuando quieras.",
              usted: "Un enlace que no vence: puede corregir sus datos y volver a imprimirlo cuando quiera.",
              vos: "Un enlace que no vence: podés corregir tus datos y volver a imprimirlo cuando quieras.",
            }),
            segun(t, { tu: "Si no te sirve, te devolvemos el dinero dentro de los 7 días.", usted: "Si no le sirve, le devolvemos el dinero dentro de los 7 días.", vos: "Si no te sirve, te devolvemos el dinero dentro de los 7 días." }),
          ]
        : [
      "El archivo .xlsx, que abre en Excel y en Google Sheets.",
      `Las actualizaciones: ${p.disparadorActualizacion.charAt(0).toLowerCase()}${p.disparadorActualizacion.slice(1)}, la actualizamos y el mismo enlace descarga la versión nueva.`,
      segun(t, { tu: "Si no te sirve, te devolvemos el dinero dentro de los 7 días.", usted: "Si no le sirve, le devolvemos el dinero dentro de los 7 días.", vos: "Si no te sirve, te devolvemos el dinero dentro de los 7 días." }),
          ],
    pagoUnico: segun(t, { tu: "Pago único con PayPal. Puedes pagar con tu cuenta o con tarjeta.", usted: "Pago único con PayPal. Puede pagar con su cuenta o con tarjeta.", vos: "Pago único con PayPal. Podés pagar con tu cuenta o con tarjeta." }),
    comprarTitulo: (p: ProductoIntl) => (p.tipo === "informe" ? `${p.tituloCorto.charAt(0).toUpperCase()}${p.tituloCorto.slice(1)}` : `Comprar la ${p.tituloCorto}`),
    comprarBajada: (p: ProductoIntl) =>
      p.tipo === "informe"
        ? segun(t, {
            tu: "Te mandamos el enlace del informe a este correo apenas se confirma el pago.",
            usted: "Le mandamos el enlace del informe a este correo apenas se confirma el pago.",
            vos: "Te mandamos el enlace del informe a este correo apenas se confirma el pago.",
          })
        : segun(t, {
            tu: "Te mandamos la planilla a este correo apenas se confirma el pago.",
            usted: "Le mandamos la planilla a este correo apenas se confirma el pago.",
            vos: "Te mandamos la planilla a este correo apenas se confirma el pago.",
          }),
    etiquetaEmail: segun(t, { tu: "Tu correo", usted: "Su correo", vos: "Tu correo" }),
    seguirPago: "Seguir al pago",
    privacidad: segun(t, { tu: "Usamos el correo sólo para mandarte tu compra y sus actualizaciones.", usted: "Usamos el correo sólo para mandarle su compra y sus actualizaciones.", vos: "Usamos el correo sólo para mandarte tu compra y sus actualizaciones." }),
    datosTitulo: segun(t, { tu: "Con los números de tu cálculo", usted: "Con los números de su cálculo", vos: "Con los números de tu cálculo" }),
    datosUsar: segun(t, {
      tu: "Usar estos números en lo que compro. Se guardan sólo para armar tu compra.",
      usted: "Usar estos números en lo que compro. Se guardan sólo para armar su compra.",
      vos: "Usar estos números en lo que compro. Se guardan sólo para armar tu compra.",
    }),
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
      pronto: "Todavía no está a la venta.",
    },
    graciasTitulo: segun(t, { tu: "Gracias por tu compra", usted: "Gracias por su compra", vos: "Gracias por tu compra" }),
    graciasListo: (p: ProductoIntl) =>
      p.tipo === "informe"
        ? segun(t, {
            tu: `Tu pago está confirmado. Ya puedes abrir tu ${p.tituloCorto}. También te mandamos el enlace por correo, y no vence.`,
            usted: `Su pago está confirmado. Ya puede abrir su ${p.tituloCorto}. También le mandamos el enlace por correo, y no vence.`,
            vos: `Tu pago está confirmado. Ya podés abrir tu ${p.tituloCorto}. También te mandamos el enlace por correo, y no vence.`,
          })
        : segun(t, {
        tu: `Tu pago está confirmado. Ya puedes descargar la ${p.tituloCorto}. También te la mandamos por correo, con un enlace que no vence.`,
        usted: `Su pago está confirmado. Ya puede descargar la ${p.tituloCorto}. También se la mandamos por correo, con un enlace que no vence.`,
        vos: `Tu pago está confirmado. Ya podés descargar la ${p.tituloCorto}. También te la mandamos por correo, con un enlace que no vence.`,
      }),
    graciasPendiente: segun(t, {
      tu: "Estamos esperando la confirmación de PayPal. Cuando llegue, te mandamos tu compra por correo.",
      usted: "Estamos esperando la confirmación de PayPal. Cuando llegue, le mandamos su compra por correo.",
      vos: "Estamos esperando la confirmación de PayPal. Cuando llegue, te mandamos tu compra por correo.",
    }),
    descargar: "Descargar la planilla (.xlsx)",
    abrirInforme: "Abrir mi informe",
    fuentes: "Fuentes oficiales que usa",
    calculadoras: "Sirve para estas calculadoras",
    muestra: "Así se ve",
  };
}
