import { conVariantes } from "../../comun/locales";
import { segunTrato, type TextosUi } from "../../tipos";
import type { UiRendimientoInversion } from "../definicion";

const base: TextosUi<UiRendimientoInversion> = {
  slug: "rendimiento-de-inversion",
  ui: (trato) => ({
    inicial: "Inversión inicial",
    final: "Valor final",
    finalAyuda: segunTrato(trato, {
      tu: "Lo que vale hoy la inversión o lo que recibiste al venderla.",
      usted: "Lo que vale hoy la inversión o lo que recibió al venderla.",
      vos: "Lo que vale hoy la inversión o lo que recibiste al venderla.",
    }),
    cobrado: "Ganancias cobradas en el camino (opcional)",
    cobradoAyuda: "Dividendos, intereses o alquileres que se cobraron y no se reinvirtieron.",
    anios: "Años que duró la inversión",
    aniosAyuda: "Acepta decimales para años incompletos, como un año y medio.",
    ganancia: "Ganancia",
    roi: "Rendimiento total (ROI)",
    cagr: "Rendimiento anual (CAGR)",
    cagrAyuda: "El rendimiento por año que da el mismo resultado si se compone año tras año.",
    errorInicial: segunTrato(trato, {
      tu: "Escribe cuánto invertiste al principio.",
      usted: "Escriba cuánto invirtió al principio.",
      vos: "Escribí cuánto invertiste al principio.",
    }),
    observacionCorto: segunTrato(trato, {
      tu: "Con menos de un año, el rendimiento anual estira un resultado corto como si se repitiera todo el año. Tómalo con cuidado.",
      usted: "Con menos de un año, el rendimiento anual estira un resultado corto como si se repitiera todo el año. Tómelo con cuidado.",
      vos: "Con menos de un año, el rendimiento anual estira un resultado corto como si se repitiera todo el año. Tomalo con cuidado.",
    }),
    observacionInflacion: segunTrato(trato, {
      tu: "Para saber si ganaste poder de compra, compara el rendimiento anual con la inflación del mismo período.",
      usted: "Para saber si ganó poder de compra, compare el rendimiento anual con la inflación del mismo período.",
      vos: "Para saber si ganaste poder de compra, compará el rendimiento anual con la inflación del mismo período.",
    }),
  }),
};

const espana = (): Partial<UiRendimientoInversion> => ({
  cobrado: "Rendimientos cobrados por el camino (opcional)",
  ganancia: "Beneficio",
  roi: "Rentabilidad total (ROI)",
  cagr: "Rentabilidad anual (CAGR)",
  cagrAyuda: "La rentabilidad por año que da el mismo resultado si se compone año tras año.",
  observacionCorto:
    "Con menos de un año, la rentabilidad anual estira un resultado corto como si se repitiera todo el año. Tómala con cuidado.",
  observacionInflacion: "Para saber si has ganado poder adquisitivo, compara la rentabilidad anual con la inflación del mismo periodo.",
});

export const textosEs = conVariantes(base, { "es-ES": espana });
