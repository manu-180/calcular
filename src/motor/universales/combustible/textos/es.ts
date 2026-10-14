import { segunTrato, type TextosUi } from "../../tipos";
import type { UiCombustible } from "../definicion";

export const textosEs: TextosUi<UiCombustible> = {
  slug: "costo-de-combustible",
  ui: (trato) => ({
    distancia: (u) => `Distancia del viaje (${u})`,
    idaYVuelta: "Ida y vuelta",
    tipoConsumo: "Cómo se mide el consumo",
    l100: "Litros cada 100 km",
    kml: "Kilómetros por litro",
    consumo: "Consumo del vehículo",
    consumoMpg: "Consumo (millas por galón)",
    consumoAyuda: segunTrato(trato, {
      tu: "Lo encuentras en el manual o en la computadora de a bordo. En ruta suele ser más bajo que en ciudad.",
      usted: "Lo encuentra en el manual o en la computadora de a bordo. En ruta suele ser más bajo que en ciudad.",
      vos: "Lo encontrás en el manual o en la computadora de a bordo. En ruta suele ser más bajo que en ciudad.",
    }),
    precio: (u) => (u === "L" ? "Precio por litro" : "Precio por galón"),
    personas: "Personas que comparten el gasto",
    costo: "Costo del combustible",
    porPersona: "Por persona",
    combustible: (u) => (u === "L" ? "Combustible necesario (litros)" : "Combustible necesario (galones)"),
    distanciaTotal: (u) => `Distancia total (${u})`,
    costoPorDistancia: (u) => `Costo por ${u}`,
    errorConsumo: "El consumo tiene que ser mayor que 0.",
    errorPersonas: "Tiene que haber al menos una persona.",
  }),
};
