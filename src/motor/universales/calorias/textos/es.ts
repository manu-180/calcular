import { segunTrato, type TextosUi } from "../../tipos";
import type { UiCalorias } from "../definicion";

export const textosEs: TextosUi<UiCalorias> = {
  slug: "calorias-diarias",
  ui: (trato) => ({
    sexo: "Sexo",
    mujer: "Mujer",
    hombre: "Hombre",
    edad: "Edad (años)",
    peso: (u) => `Peso (${u})`,
    altura: (u) => `Altura (${u})`,
    pies: "Altura: pies (ft)",
    pulgadas: "Altura: pulgadas (in)",
    actividad: "Actividad física",
    sedentaria: "Poca o ninguna",
    ligera: "Ligera (1 a 3 días por semana)",
    moderada: "Moderada (3 a 5 días por semana)",
    alta: "Alta (6 o 7 días por semana)",
    muyAlta: "Muy alta (entrenamiento intenso o trabajo físico)",
    objetivo: "Objetivo",
    mantener: "Mantener el peso",
    bajar: "Bajar de peso poco a poco",
    subir: "Subir de peso poco a poco",
    basal: "Metabolismo basal (kcal por día)",
    basalAyuda: "Lo que gasta el cuerpo en reposo total.",
    mantenimiento: "Calorías para mantener el peso (kcal por día)",
    calObjetivo: "Calorías para el objetivo (kcal por día)",
    calObjetivoAyuda: "Un ajuste moderado: 500 kcal menos por día para bajar, 300 más para subir.",
    errorEdad: "La fórmula está pensada para personas de 15 a 100 años.",
    errorPeso: "El peso tiene que ser mayor que 0.",
    errorAltura: "La altura tiene que ser mayor que 0.",
    notaMinimo: (kcal) =>
      segunTrato(trato, {
        tu: `Para bajar de peso, la cuenta no baja de ${kcal} kcal por día. Si quieres comer menos que eso, hazlo con seguimiento profesional.`,
        usted: `Para bajar de peso, la cuenta no baja de ${kcal} kcal por día. Si quiere comer menos que eso, hágalo con seguimiento profesional.`,
        vos: `Para bajar de peso, la cuenta no baja de ${kcal} kcal por día. Si querés comer menos que eso, hacelo con seguimiento profesional.`,
      }),
    aviso: "Es una estimación con la fórmula de Mifflin-St Jeor. Cada cuerpo es distinto: no reemplaza la consulta con un profesional de la salud o de la nutrición.",
  }),
};
