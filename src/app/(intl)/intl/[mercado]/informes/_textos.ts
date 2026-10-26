import type { ClaveFamilia } from "@/lib/pagos/ofertas-intl";
import { diccionarioVenta, textosFamilia, textosVenta } from "@/lib/pagos/textos";
import type { Idioma, Trato } from "@/motor/tipos";
import type { TextosInforme } from "./[informe]/ver/_informe-vivo";

export function textosInforme(idioma: Idioma, trato: Trato, clave: ClaveFamilia, locale?: string): TextosInforme {
  const i = textosVenta(idioma, trato, locale).informe;
  const f = textosFamilia(clave, idioma, trato, locale);
  const { si, no } = diccionarioVenta(idioma, locale).general;
  return {
    tusDatos: i.tusDatos,
    resultado: i.resultado,
    corregir: i.corregir,
    actualizar: i.actualizar,
    imprimir: i.imprimir,
    imprimirAyuda: i.imprimirAyuda,
    sinResultado: i.sinResultado,
    si,
    no,
    escenarios: f.escenarios ?? null,
    nota: f.nota
      ? {
          ...f.nota,
          lugar: i.lugar,
          destinatario: i.destinatario,
          firma: i.firma,
          nombre: i.nombre,
          documento: i.documento,
          etiquetaEnMinuscula: i.etiquetaEnMinuscula,
          anchoCompleto: i.anchoCompleto ?? false,
          puntoFinal: i.puntoFinal ?? ".",
        }
      : null,
  };
}

export function textosVer(idioma: Idioma, trato: Trato, locale?: string) {
  const i = textosVenta(idioma, trato, locale).informe;
  return {
    comoSeCalcula: i.comoSeCalcula,
    fuentes: i.fuentes,
    verificado: i.verificado,
    emitido: i.emitido,
    valores: i.valores,
    numero: i.numero,
    elegir: i.elegir,
    legal: i.legal,
    legalSinFuentes: i.legalSinFuentes,
    errorTitulo: i.errorTitulo,
    error: i.error,
    verificar: i.verificar,
    cupo: i.cupo,
  };
}
