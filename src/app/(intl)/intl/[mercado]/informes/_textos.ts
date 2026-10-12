import { segun } from "@/lib/pagos/email-intl";
import type { FamiliaInforme } from "@/lib/pagos/ofertas-intl";
import type { Trato } from "@/motor/tipos";
import type { TextosInforme } from "./[informe]/ver/_informe-vivo";

export function textosInforme(t: Trato, f: FamiliaInforme): TextosInforme {
  return {
    tusDatos: segun(t, { tu: "Tus datos", usted: "Sus datos", vos: "Tus datos" }),
    resultado: "Resultado",
    corregir: segun(t, { tu: "Corregir mis datos", usted: "Corregir mis datos", vos: "Corregir mis datos" }),
    actualizar: "Actualizar el informe",
    imprimir: "Imprimir o guardar en PDF",
    imprimirAyuda: segun(t, {
      tu: "En la ventana de impresión elige «Guardar como PDF» para tener el archivo.",
      usted: "En la ventana de impresión elija «Guardar como PDF» para tener el archivo.",
      vos: "En la ventana de impresión elegí «Guardar como PDF» para tener el archivo.",
    }),
    sinResultado: segun(t, {
      tu: "Completa tus datos en «Corregir mis datos» para armar el informe.",
      usted: "Complete sus datos en «Corregir mis datos» para armar el informe.",
      vos: "Completá tus datos en «Corregir mis datos» para armar el informe.",
    }),
    escenarios: f.escenarios ? { titulo: f.escenarios.titulo[t], explica: f.escenarios.explica[t] } : null,
    nota: f.nota
      ? {
          titulo: f.nota.titulo[t],
          uso: f.nota.uso[t],
          pedido: f.nota.pedido,
          cierre: f.nota.cierre,
          lugar: "Lugar y fecha",
          destinatario: "Para",
          firma: "Firma",
          nombre: "Nombre",
          documento: "Documento de identidad",
        }
      : null,
  };
}

export function textosVer(t: Trato) {
  return {
    comoSeCalcula: "Cómo se calcula",
    fuentes: "Fuentes oficiales",
    verificado: "verificado el",
    emitido: "Emitido el",
    valores: "Valores oficiales vigentes al",
    numero: "Informe",
    elegir: segun(t, { tu: "Elige el cálculo del informe:", usted: "Elija el cálculo del informe:", vos: "Elegí el cálculo del informe:" }),
    legal: segun(t, {
      tu: "Este informe es una estimación hecha con las normas y los valores oficiales indicados, a la fecha indicada. No reemplaza el asesoramiento de un profesional ni lo que resuelva la autoridad competente. Si un dato tuyo es distinto, el resultado cambia: corrígelo y vuelve a imprimir.",
      usted: "Este informe es una estimación hecha con las normas y los valores oficiales indicados, a la fecha indicada. No reemplaza el asesoramiento de un profesional ni lo que resuelva la autoridad competente. Si un dato suyo es distinto, el resultado cambia: corríjalo y vuelva a imprimir.",
      vos: "Este informe es una estimación hecha con las normas y los valores oficiales indicados, a la fecha indicada. No reemplaza el asesoramiento de un profesional ni lo que resuelva la autoridad competente. Si un dato tuyo es distinto, el resultado cambia: corregilo y volvé a imprimir.",
    }),
    errorTitulo: "No pudimos abrir este informe",
    error: segun(t, {
      tu: "No logramos confirmar el pago de este enlace. Si el dinero salió de tu cuenta, escríbenos y lo resolvemos. Si la compra no llegó a completarse, puedes hacerla de nuevo.",
      usted: "No logramos confirmar el pago de este enlace. Si el dinero salió de su cuenta, escríbanos y lo resolvemos. Si la compra no llegó a completarse, puede hacerla de nuevo.",
      vos: "No logramos confirmar el pago de este enlace. Si el dinero salió de tu cuenta, escribinos y lo resolvemos. Si la compra no llegó a completarse, podés hacerla de nuevo.",
    }),
    verificar: segun(t, {
      tu: "No pudimos verificar el pago ahora. Prueba en unos minutos: no hace falta pagar de nuevo.",
      usted: "No pudimos verificar el pago ahora. Pruebe en unos minutos: no hace falta pagar de nuevo.",
      vos: "No pudimos verificar el pago ahora. Probá en unos minutos: no hace falta pagar de nuevo.",
    }),
    cupo: segun(t, {
      tu: "Demasiados intentos seguidos. Espera unos minutos y vuelve a abrir el enlace.",
      usted: "Demasiados intentos seguidos. Espere unos minutos y vuelva a abrir el enlace.",
      vos: "Demasiados intentos seguidos. Esperá unos minutos y volvé a abrir el enlace.",
    }),
  };
}
