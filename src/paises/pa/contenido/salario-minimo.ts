import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pa.salario-minimo",
  h1: "Salario mínimo {{anio}} en Panamá por región y actividad",
  title: "Salario mínimo en Panamá {{anio}} por región y actividad",
  description:
    "Salario mínimo en Panamá {{anio}} por hora, según región, actividad y tamaño de empresa (Decreto Ejecutivo 13 de 2025). Con su valor semanal, quincenal y mensual.",
  intro: [
    "En Panamá el salario mínimo se fija por hora y cambia según la región, la actividad de la empresa y su tamaño. Las tasas de 2026 rigen desde el {{pa.salario-minimo-hora-region-1#desde}}.",
    "Elige tu región y la actividad de tu empresa. Te mostramos el mínimo por hora y cuánto da por semana, quincena y mes.",
  ],
  comoSeCalcula: [
    "El mínimo por hora sale del artículo 2 del Decreto Ejecutivo 13 de 31 de diciembre de 2025.",
    "Por semana: la hora por {{pa.jornada-semanal[diurna]}} de jornada diurna. Por mes: la semana por 52 y dividida entre 12. La quincena es la mitad del mes.",
    "El trabajo doméstico tiene un mínimo mensual: {{pa.salario-minimo-domestico@region-1}} en la Región 1 y {{pa.salario-minimo-domestico@region-2}} en la Región 2.",
  ],
  ejemplo: [
    "En comercio al por menor con 11 empleados o más, en la Región 1, el mínimo es {{pa.salario-minimo-hora-region-1[comercio-menor-gran]}} la hora. En la Región 2, {{pa.salario-minimo-hora-region-2[comercio-menor-gran]}}.",
  ],
  faq: [
    {
      pregunta: "¿Cuál es el salario mínimo en Panamá en 2026?",
      respuesta: "Depende de tu región, tu actividad y el tamaño de la empresa. Por ejemplo, en comercio al por menor con 11 empleados o más es {{pa.salario-minimo-hora-region-1[comercio-menor-gran]}} la hora en la Región 1 y {{pa.salario-minimo-hora-region-2[comercio-menor-gran]}} en la Región 2.",
    },
    {
      pregunta: "¿Cómo paso el salario mínimo por hora a mensual?",
      respuesta: "Multiplica la hora por las {{pa.jornada-semanal[diurna]}} de la semana diurna. Ese monto semanal, por 52 y dividido entre 12, es el mensual.",
    },
    {
      pregunta: "¿Cuál es el salario mínimo de una trabajadora doméstica?",
      respuesta: "{{pa.salario-minimo-domestico@region-1}} al mes en la Región 1 y {{pa.salario-minimo-domestico@region-2}} en la Región 2.",
    },
    {
      pregunta: "¿Qué distritos son Región 1?",
      respuesta: "Panamá, Colón, San Miguelito, David, Santiago, Chitré, Aguadulce, Penonomé, Bocas del Toro, La Chorrera, Arraiján, Capira, Chame, Antón, Natá, Las Tablas, Bugaba, Boquete, Taboga, San Carlos, Chepo, Guararé, Los Santos, Pedasí, Dolega, San Félix, Barú, Boquerón, Portobelo, Donoso, Santa Isabel, Santa María, Parita, Pesé, Atalaya, Changuinola, Chiriquí Grande, Almirante, Tierras Altas y Omar Torrijos Herrera. El resto es Región 2.",
    },
    {
      pregunta: "¿Qué es una pequeña empresa para el salario mínimo?",
      respuesta: "Depende de la actividad. En comercio, hoteles y restaurantes, gran empresa es la que tiene 11 empleados o más. En la industria manufacturera, 16 o más.",
    },
    {
      pregunta: "¿Cada cuánto cambia el salario mínimo?",
      respuesta: "El Código de Trabajo manda revisarlo por lo menos cada dos años. Las tasas de este decreto son para 2026 y 2027.",
    },
  ],
  glosario: [
    { termino: "Región 1 y Región 2", definicion: "Las dos zonas del país con tasas distintas. La Región 1 reúne los distritos más urbanos." },
    { termino: "Nacional", definicion: "Actividades con la misma tasa en las dos regiones." },
  ],
});
