import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "py.irp",
  h1: "Calculadora de IRP",
  title: "IRP en Paraguay: calculá tu impuesto a la renta personal",
  description: "Calculá el IRP por servicios personales con la escala de la DNIT. Se paga si tus ingresos del año pasan {{py.irp-monto-no-alcanzado}}.",
  intro: [
    "El IRP es el impuesto a la renta personal. Lo pagan quienes trabajan en relación de dependencia o por su cuenta si sus ingresos del año pasan {{py.irp-monto-no-alcanzado}}.",
    "Poné lo que ganaste en el año y tus gastos deducibles. Te mostramos el impuesto y cuánto representa de tus ingresos.",
  ],
  comoSeCalcula: [
    "Si tus ingresos brutos del año no pasan {{py.irp-monto-no-alcanzado}}, no pagás IRP.",
    "Si los pasan, a los ingresos les restás los gastos deducibles. Lo que queda es la renta neta.",
    "La renta neta paga por tramos: 8 % hasta Gs. 50.000.000, 9 % entre Gs. 50.000.000 y Gs. 150.000.000, y 10 % sobre lo que pasa de Gs. 150.000.000.",
    "Cada tramo paga solo su porción. Así, subir de tramo no encarece todo lo anterior.",
  ],
  ejemplo: [
    "Con ingresos de Gs. 120.000.000 y gastos deducibles de Gs. 40.000.000, tu renta neta es Gs. 80.000.000. Pagás 8 % de los primeros 50 millones (Gs. 4.000.000) y 9 % de los otros 30 (Gs. 2.700.000). Total: Gs. 6.700.000.",
  ],
  faq: [
    {
      pregunta: "¿A partir de cuánto se paga IRP?",
      respuesta: "Cuando tus ingresos brutos por servicios personales del año pasan {{py.irp-monto-no-alcanzado}}. Ese es el monto no alcanzado.",
    },
    {
      pregunta: "¿Qué gastos puedo deducir?",
      respuesta: "Gastos tuyos y de tu familia a cargo hechos en el país: alimentación, ropa, alquiler y mantenimiento de la vivienda, muebles, salud y educación, entre otros. Tienen que estar respaldados con comprobantes.",
    },
    {
      pregunta: "¿Cuándo se paga el IRP?",
      respuesta: "Una vez al año. La declaración jurada vence en marzo del año siguiente, según la terminación de tu RUC.",
    },
    {
      pregunta: "¿Si no llego al monto tengo que declarar?",
      respuesta: "Si ya estás inscripto en el IRP, sí: presentás la declaración aunque no pagues impuesto.",
    },
  ],
  glosario: [
    { termino: "IRP", definicion: "Impuesto a la Renta Personal. Lo crea la Ley 6380/2019 y lo administra la DNIT." },
    { termino: "Renta neta", definicion: "Ingresos brutos menos gastos deducibles." },
    { termino: "Monto no alcanzado", definicion: "El tope de ingresos debajo del cual no se paga IRP." },
  ],
});
