import type { ProductoSlug } from "@/lib/mp";

// Después de comprar, un solo producto complementario en vez del catálogo entero: la persona está
// en su momento de más confianza y trece opciones sin orden no ayudan a elegir ninguna. Record
// completo a propósito: un producto nuevo no compila hasta que alguien decide cuál le sigue.

export type Complemento = { para: ProductoSlug; titulo: string; texto: string };

const VACACIONES: Complemento = {
  para: "planilla-vacaciones",
  titulo: "¿También organizás las vacaciones?",
  texto:
    "La planilla de vacaciones calcula los días según la antigüedad, hasta cuándo avisar y cuánto pagar al empezar. Y te arma la nota para firmar.",
};

const IPC_MONTO: Complemento = {
  para: "informe-inflacion",
  titulo: "¿Tenés que actualizar otro monto?",
  texto:
    "El informe de actualización por IPC calcula cuánto vale hoy una suma de otra fecha, con el dato oficial del INDEC y sus fuentes.",
};

export const COMPLEMENTO: Record<ProductoSlug, Complemento> = {
  "planilla-comercio": VACACIONES,
  "planilla-uocra": VACACIONES,
  "planilla-camioneros": VACACIONES,
  "planilla-casas-particulares": { ...VACACIONES, titulo: "¿También le organizás las vacaciones?" },
  "planilla-mi-sueldo": {
    para: "informe-ganancias",
    titulo: "¿Te retienen Ganancias?",
    texto: "El informe te dice cuánto vas a pagar en el año y qué podés hacer para pagar menos.",
  },
  "planilla-alquileres": {
    para: "informe-inflacion",
    titulo: "¿Te discuten un aumento?",
    texto:
      "El informe de actualización por IPC respalda el número con el dato oficial del INDEC entre las dos fechas que elijas, listo para mostrar.",
  },
  "planilla-plazo-fijo": IPC_MONTO,
  "informe-credito-laboral": IPC_MONTO,
  "informe-cuota-alimentaria": {
    para: "informe-inflacion",
    titulo: "¿La cuota quedó atrasada?",
    texto: "El informe de actualización por IPC calcula cuánto vale hoy un monto fijado en otra fecha, con el dato oficial del INDEC.",
  },
  "planilla-monotributo": {
    para: "informe-inflacion",
    titulo: "¿Tenés que actualizar tus precios?",
    texto:
      "El informe de actualización por IPC te dice cuánto subir un honorario o un presupuesto para no perder contra la inflación, con el dato oficial del INDEC.",
  },
  "informe-indemnizacion": {
    para: "informe-credito-laboral",
    titulo: "¿Vas a reclamar?",
    texto: "El informe de crédito laboral actualiza la liquidación rubro por rubro y con fuentes, para llevarle al abogado.",
  },
  "planilla-vacaciones": {
    para: "planilla-comercio",
    titulo: "¿Liquidás sueldos de comercio?",
    texto: "La planilla de Comercio trae la escala de FAECYS cargada: elegís la categoría y te da el bruto, los aportes y el neto de cada mes.",
  },
  "informe-ganancias": {
    para: "planilla-mi-sueldo",
    titulo: "¿Querés controlar cada recibo?",
    texto: "La planilla Mi Sueldo te marca si los descuentos están bien y cuánto le comió la inflación a tu sueldo.",
  },
  "informe-inflacion": {
    para: "planilla-mi-sueldo",
    titulo: "¿Vas a pedir un aumento?",
    texto: "La planilla Mi Sueldo sigue tu sueldo mes a mes contra el IPC y te arma una hoja para pedir aumento.",
  },
};
