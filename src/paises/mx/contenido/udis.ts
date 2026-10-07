import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mx.udis",
  h1: "Valor de la UDI hoy: convierte UDIS a pesos",
  title: "UDIS hoy: valor y conversión a pesos",
  description:
    "Consulta el valor de la UDI de hoy, publicado por el Banco de México en el DOF, y convierte UDIS a pesos o pesos a UDIS. Se actualiza todos los días.",
  intro: [
    "La UDI (Unidad de Inversión) es una unidad que sube con la inflación. Se usa en créditos hipotecarios, seguros e inversiones.",
    "El Banco de México publica su valor de cada día en el Diario Oficial de la Federación.",
  ],
  comoSeCalcula: [
    "De UDIS a pesos: multiplica las UDIS por el valor del día.",
    "De pesos a UDIS: divide los pesos entre el valor del día.",
  ],
  faq: [
    {
      pregunta: "¿Por qué sube la UDI todos los días?",
      respuesta: "Porque sigue la inflación. Su valor se ajusta poco a poco con el Índice Nacional de Precios al Consumidor.",
    },
    {
      pregunta: "¿UDI es lo mismo que UMA?",
      respuesta: "No. La UMA sirve para multas y límites de ley y cambia una vez al año. La UDI cambia cada día y se usa en créditos e inversiones.",
    },
    {
      pregunta: "¿Mi crédito en UDIS sube aunque pague?",
      respuesta: "El saldo en UDIS baja con cada pago, pero en pesos puede subir si la inflación es más alta que lo que amortizas.",
    },
  ],
  glosario: [
    { termino: "UDI", definicion: "Unidad de Inversión, publicada por el Banco de México." },
    { termino: "Inflación", definicion: "Aumento general de los precios. En México la mide el INEGI." },
  ],
});
