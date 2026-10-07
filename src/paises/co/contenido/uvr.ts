import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "co.uvr",
  h1: "Valor de la UVR hoy y conversor",
  title: "UVR hoy: valor diario y conversor a pesos",
  description:
    "Consulta el valor de la UVR de hoy según el Banco de la República y convierte UVR a pesos. Sirve para créditos de vivienda en UVR.",
  intro: [
    "La Unidad de Valor Real (UVR) es una unidad que sube cada día con la inflación. Hoy vale {{co.uvr}}.",
    "Se usa sobre todo en créditos de vivienda: la deuda se pacta en UVR y su valor en pesos cambia cada día.",
  ],
  comoSeCalcula: [
    "UVR a pesos: cantidad de UVR por el valor de la UVR del día.",
    "Pesos a UVR: pesos divididos por el valor de la UVR del día.",
    "El Banco de la República publica la UVR por adelantado, así que ya se conocen los valores de los próximos días.",
  ],
  ejemplo: ["Si tu crédito es de 100.000 UVR, multiplica por el valor de hoy para saber cuánto debes en pesos."],
  faq: [
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
