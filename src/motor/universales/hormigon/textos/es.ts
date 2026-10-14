import { conVariantes } from "../../comun/locales";
import { segunTrato, type TextosUi } from "../../tipos";
import type { UiHormigon } from "../definicion";

const base: TextosUi<UiHormigon> = {
  slug: "hormigon",
  ui: (trato) => ({
    largo: (u) => `Largo (${u})`,
    ancho: (u) => `Ancho (${u})`,
    espesor: (u) => `Espesor (${u})`,
    espesorAyuda: "Un contrapiso suele tener entre 8 y 10 cm. Una losa, entre 10 y 15 cm.",
    margen: "Margen extra (%)",
    margenAyuda: "Para desniveles del terreno y lo que se pierde al colar. Lo habitual es entre 5 % y 10 %.",
    bolsa: (u) => `Peso de la bolsa de cemento (${u})`,
    volumen: (u) => `Volumen justo (${u})`,
    volumenTotal: (u) => `Hormigón necesario (${u})`,
    volumenPies: "Hormigón necesario (ft³)",
    cemento: (u) => `Cemento (${u})`,
    bolsas: "Bolsas de cemento",
    arena: (u) => `Arena (${u})`,
    piedra: (u) => `Piedra o grava (${u})`,
    agua: (u) => (u === "L" ? "Agua (litros)" : "Agua (galones)"),
    errorMedida: "Esta medida tiene que ser mayor que 0.",
    aviso: segunTrato(trato, {
      tu: "Los materiales son una referencia para una mezcla 1:2:3 de uso general (unos 350 kg de cemento por m³). Cambian según la dosificación, el tipo de obra y los materiales de la zona: confírmalos con quien dirige la obra.",
      usted: "Los materiales son una referencia para una mezcla 1:2:3 de uso general (unos 350 kg de cemento por m³). Cambian según la dosificación, el tipo de obra y los materiales de la zona: confírmelos con quien dirige la obra.",
      vos: "Los materiales son una referencia para una mezcla 1:2:3 de uso general (unos 350 kg de cemento por m³). Cambian según la dosificación, el tipo de obra y los materiales de la zona: confirmalos con quien dirige la obra.",
    }),
  }),
};

const espana = (): Partial<UiHormigon> => ({
});

export const textosEs = conVariantes(base, { "es-ES": espana });
