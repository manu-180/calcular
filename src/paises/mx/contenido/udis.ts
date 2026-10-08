import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mx.udis",
  h1: "Valor de la UDI hoy: convierte UDIS a pesos",
  title: "Valor de la UDI hoy: {{mx.udis}}. Convierte UDIS a pesos",
  description:
    "La UDI vale hoy {{mx.udis}}, según el Banco de México en el DOF. Convierte UDIS a pesos o pesos a UDIS para tu crédito, seguro o inversión.",
  intro: [
    "El valor de la UDI es de {{mx.udis}} al {{mx.udis#desde}}. Lo publica el Banco de México en el Diario Oficial de la Federación y cambia todos los días.",
    "La UDI (Unidad de Inversión) sube con la inflación. Se usa en créditos hipotecarios, seguros e inversiones.",
  ],
  comoSeCalcula: [
    "De UDIS a pesos: multiplica las UDIS por el valor del día.",
    "De pesos a UDIS: divide los pesos entre el valor del día.",
  ],
  ejemplo: [
    "Un saldo de 10,000 UDIS equivale a 10,000 × {{mx.udis}} con el valor de hoy.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto vale la UDI hoy?",
      respuesta: "{{mx.udis}}, según el valor del {{mx.udis#desde}} publicado por el Banco de México.",
    },
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
