import { formatearMonto, formatearNumero, montoEjemplo, segunTrato, type ContenidoUniversal } from "../../tipos";

export const contenidoEs: ContenidoUniversal = (ctx) => {
  const t = (tu: string, usted: string, vos: string) => segunTrato(ctx.trato, { tu, usted, vos });
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 1.2);
  const litros = (600 * 8) / 100;
  return {
    h1: "Calculadora de costo de combustible",
    title: `Costo de combustible de un viaje en ${ctx.nombrePais}`,
    description: t(
      "Calcula cuánto gastas en nafta, gasolina o diésel en un viaje según la distancia, el consumo del auto y el precio, y cuánto pone cada uno.",
      "Calcule cuánto gasta en nafta, gasolina o diésel en un viaje según la distancia, el consumo del auto y el precio, y cuánto pone cada uno.",
      "Calculá cuánto gastás en nafta, gasolina o diésel en un viaje según la distancia, el consumo del auto y el precio, y cuánto pone cada uno.",
    ),
    intro: [
      t(
        "Escribe la distancia, el consumo de tu vehículo y el precio del litro. Ves cuántos litros necesitas y cuánto cuesta el viaje.",
        "Escriba la distancia, el consumo de su vehículo y el precio del litro. Verá cuántos litros necesita y cuánto cuesta el viaje.",
        "Escribí la distancia, el consumo de tu vehículo y el precio del litro. Ves cuántos litros necesitás y cuánto cuesta el viaje.",
      ),
      "El consumo se puede cargar en litros cada 100 km o en kilómetros por litro, como lo diga el manual.",
    ],
    comoSeCalcula: [
      "Con litros cada 100 km: litros = distancia × consumo ÷ 100.",
      "Con kilómetros por litro: litros = distancia ÷ consumo.",
      "Costo = litros × precio por litro. Ida y vuelta duplica la distancia.",
    ],
    ejemplo: [
      `Un viaje de 300 km ida y vuelta con un auto que gasta 8 litros cada 100 km usa ${formatearNumero(ctx, litros)} litros.`,
      `Con el litro a ${m(precio)}, son ${m(litros * precio)}. Entre 2 personas, ${m((litros * precio) / 2)} cada una.`,
    ],
    faq: [
      {
        pregunta: "¿Cómo paso de kilómetros por litro a litros cada 100 km?",
        respuesta: `Se divide 100 por los kilómetros por litro. Un auto que hace 12 km por litro gasta ${formatearNumero(ctx, 100 / 12, 1)} litros cada 100 km.`,
      },
      {
        pregunta: "¿Cuánto consume un auto en promedio?",
        respuesta: "Un auto chico o mediano suele gastar entre 5 y 9 litros cada 100 km en ruta. En ciudad, con frenadas y arranques, gasta más.",
      },
      {
        pregunta: "¿El cálculo incluye peajes?",
        respuesta: "No. Solo calcula el combustible. Los peajes y el estacionamiento hay que sumarlos aparte.",
      },
    ],
    glosario: [
      { termino: "Consumo", definicion: "Cuánto combustible usa un vehículo para recorrer una distancia." },
      { termino: "L/100 km", definicion: "Litros que se gastan para recorrer 100 kilómetros. Cuanto más bajo, mejor." },
    ],
  };
};
