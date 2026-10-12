import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "uy.irpf-alquileres",
  h1: "Calculadora de IRPF por alquileres",
  title: "IRPF por alquileres 2026: cuánto pagás",
  description:
    "Calculá el IRPF de un alquiler: {{uy.irpf-arrendamientos}} sobre lo cobrado menos gastos, y si quedás exonerado por cobrar hasta {{uy.irpf-arrendamientos-exento}} en el año.",
  intro: [
    "Si alquilás una casa o un apartamento, lo que cobrás paga IRPF de rentas de capital. La tasa es {{uy.irpf-arrendamientos}} sobre el alquiler menos algunos gastos.",
    "Si lo que cobrás en el año es poco, podés quedar exonerado. Poné el alquiler y tus gastos y te decimos cuánto pagás.",
  ],
  comoSeCalcula: [
    "Se suman los alquileres del año y se restan los gastos que permite la ley: comisión de la inmobiliaria con IVA, honorarios del contrato, Contribución Inmobiliaria e Impuesto de Primaria.",
    "A esa renta se le aplica el {{uy.irpf-arrendamientos}}.",
    "Si todos tus alquileres del año no pasan {{uy.irpf-arrendamientos-exento}} (con la BPC de {{uy.bpc}}) y no tenés otras rentas de capital de más de 3 BPC, podés quedar exonerado.",
  ],
  ejemplo: ["Si cobrás $ 25.000 por mes todo el año y tenés $ 20.000 de gastos, la renta es $ 280.000 y el IRPF, $ 33.600 (unos $ 2.800 por mes)."],
  faq: [
    {
      pregunta: "¿Cuánto IRPF se paga por un alquiler?",
      respuesta: "{{uy.irpf-arrendamientos}} sobre lo que cobrás menos los gastos deducibles. Se liquida por año.",
    },
    {
      pregunta: "¿Cuándo no pago IRPF por alquileres?",
      respuesta: "Cuando todo lo que cobrás de alquileres en el año no pasa {{uy.irpf-arrendamientos-exento}}, no tenés otras rentas de capital de más de 3 BPC y autorizás el levantamiento del secreto bancario.",
    },
    {
      pregunta: "¿Qué gastos puedo restar?",
      respuesta: "La comisión de la inmobiliaria con su IVA, los honorarios por hacer o renovar el contrato, la Contribución Inmobiliaria y el Impuesto de Primaria. Las reparaciones no se restan.",
    },
    {
      pregunta: "¿Y si soy el inquilino?",
      respuesta: "Si alquilás tu vivienda y pagás IRPF por tu sueldo, podés descontar del impuesto hasta el 8 % de lo que pagás de alquiler, identificando al dueño.",
    },
  ],
  glosario: [
    { termino: "Arrendamiento", definicion: "El nombre legal del alquiler." },
    { termino: "Rentas de capital", definicion: "Ingresos por bienes que tenés, como alquileres o intereses (categoría I del IRPF)." },
  ],
});
