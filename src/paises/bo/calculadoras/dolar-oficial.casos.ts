import { definirCasos } from "@/motor/calculo";
import dolarOficial from "./dolar-oficial";

const BCB_7_10 = "https://www.bcb.gob.bo/librerias/indicadores/otras/otras_imprimir.php?qdd=07&qmm=10&qaa=2026" as const;

export default definirCasos(dolarOficial, [
  {
    nombre: "Cien dólares el 7/10/2026",
    origen: { tipo: "oficial", url: BCB_7_10, detalle: "Tabla N° 187-26 del BCB, 7 de octubre de 2026: TCO 11,97 Bs por dólar. 100 × 11,97 = 1.197." },
    fecha: "2026-10-07",
    entrada: { sentido: "a-bolivianos", monto: 100 },
    esperado: { bolivianos: 1197, dolares: null, cotizacion: 11.97, fecha: "2026-10-07" },
  },
  {
    nombre: "Mil bolivianos a dólares",
    origen: { tipo: "recalculado", detalle: "1.000 / 11,97 = 83,542..., redondeado 83,54." },
    fecha: "2026-10-07",
    entrada: { sentido: "a-dolares", monto: 1000 },
    esperado: { dolares: 83.54, bolivianos: null },
  },
  {
    nombre: "Domingo: rige el publicado el viernes",
    origen: {
      tipo: "oficial",
      url: "https://www.bcb.gob.bo/librerias/indicadores/otras/otras_imprimir.php?qdd=04&qmm=10&qaa=2026",
      detalle: "Pedida para el domingo 4/10/2026, la tabla del BCB muestra la del lunes 5/10 (TCO 12,00), publicada el viernes y vigente sábado, domingo y lunes (R.D. 142/2026).",
    },
    fecha: "2026-10-04",
    entrada: { sentido: "a-bolivianos", monto: 100 },
    esperado: { cotizacion: 12, fecha: "2026-10-04", bolivianos: 1200 },
  },
  {
    nombre: "El día del TCO más bajo de septiembre",
    origen: { tipo: "oficial", url: "https://www.bcb.gob.bo/librerias/indicadores/otras/otras_imprimir.php?qdd=17&qmm=09&qaa=2026", detalle: "Tabla del BCB del 17/9/2026: TCO 9,83. 500 × 9,83 = 4.915." },
    fecha: "2026-09-17",
    entrada: { sentido: "a-bolivianos", monto: 500 },
    esperado: { bolivianos: 4915, cotizacion: 9.83 },
  },
]);
