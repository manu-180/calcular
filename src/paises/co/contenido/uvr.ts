import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "co.uvr",
  h1: "Valor de la UVR hoy y conversor a pesos",
  title: "UVR hoy: {{co.uvr}}. Valor diario y conversor a pesos",
  description:
    "La UVR vale hoy {{co.uvr}}, según el Banco de la República. Convierte UVR a pesos y pesos a UVR para saber cuánto debes de tu crédito de vivienda.",
  intro: [
    "La UVR vale hoy {{co.uvr}}. Es la Unidad de Valor Real: una unidad que sube cada día con la inflación y que publica el Banco de la República.",
    "Se usa sobre todo en créditos de vivienda: la deuda se pacta en UVR y su valor en pesos cambia cada día.",
  ],
  comoSeCalcula: [
    "UVR a pesos: cantidad de UVR por el valor de la UVR del día.",
    "Pesos a UVR: pesos divididos por el valor de la UVR del día.",
    "El Banco de la República publica la UVR por adelantado, así que ya se conocen los valores de los próximos días.",
  ],
  ejemplo: ["Si tu crédito es de 100.000 UVR, multiplica por el valor de hoy ({{co.uvr}}) para saber cuánto debes en pesos."],
  faq: [
    {
      pregunta: "¿Cuánto vale la UVR hoy?",
      respuesta: "{{co.uvr}}, según el valor diario del Banco de la República.",
    },
    {
      pregunta: "¿Por qué sube la UVR?",
      respuesta: "Porque se ajusta con la inflación (IPC) que mide el DANE. Si la inflación sube, la UVR sube más rápido.",
    },
    {
      pregunta: "¿De dónde sale el valor?",
      respuesta: "Del Banco de la República, que la calcula y publica cada día. Se actualiza sola aquí.",
    },
    {
      pregunta: "¿Me conviene un crédito en UVR o en pesos?",
      respuesta: "Depende de la inflación. En UVR la deuda en pesos sube con la inflación. Pide a tu banco cuánto pagarías en total con cada opción y compáralas.",
    },
  ],
  glosario: [
    { termino: "UVR", definicion: "Unidad de Valor Real: una unidad de cuenta que se ajusta con la inflación." },
    { termino: "IPC", definicion: "Índice de Precios al Consumidor, la medida de la inflación que publica el DANE." },
  ],
});
