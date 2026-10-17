import { segunTrato, type TextosUi } from "../../tipos";
import type { UiRitmo } from "../definicion";

export const textosEs: TextosUi<UiRitmo> = {
  slug: "ritmo-de-carrera",
  ui: (trato) => ({
    calcular: segunTrato(trato, { tu: "¿Qué quieres calcular?", usted: "¿Qué quiere calcular?", vos: "¿Qué querés calcular?" }),
    calcRitmo: "El ritmo (con distancia y tiempo)",
    calcTiempo: "El tiempo (con distancia y ritmo)",
    calcDistancia: "La distancia (con tiempo y ritmo)",
    distancia: "Distancia",
    distanciaAyuda: segunTrato(trato, {
      tu: "Elige una carrera o «Otra» para escribir la distancia.",
      usted: "Elija una carrera o «Otra» para escribir la distancia.",
      vos: "Elegí una carrera o «Otra» para escribir la distancia.",
    }),
    otra: "Otra distancia",
    cincoK: "5K",
    diezK: "10K",
    media: "Media maratón",
    maraton: "Maratón",
    distanciaOtra: (u) => `Otra distancia (${u})`,
    horas: "Tiempo: horas",
    minutos: "Tiempo: minutos",
    segundos: "Tiempo: segundos",
    ritmoMin: (u) => `Ritmo: minutos por ${u}`,
    ritmoSeg: "Ritmo: segundos",
    ritmo: (u) => `Ritmo (min/${u})`,
    tiempo: "Tiempo total",
    distanciaRes: (u) => `Distancia (${u})`,
    velocidad: (u) => `Velocidad media (${u})`,
    errorDistancia: segunTrato(trato, {
      tu: "Escribe una distancia mayor que 0.",
      usted: "Escriba una distancia mayor que 0.",
      vos: "Escribí una distancia mayor que 0.",
    }),
    errorTiempo: segunTrato(trato, {
      tu: "Escribe el tiempo: horas, minutos o segundos.",
      usted: "Escriba el tiempo: horas, minutos o segundos.",
      vos: "Escribí el tiempo: horas, minutos o segundos.",
    }),
    errorRitmo: segunTrato(trato, {
      tu: "Escribe el ritmo: minutos y segundos por unidad de distancia.",
      usted: "Escriba el ritmo: minutos y segundos por unidad de distancia.",
      vos: "Escribí el ritmo: minutos y segundos por unidad de distancia.",
    }),
  }),
};
