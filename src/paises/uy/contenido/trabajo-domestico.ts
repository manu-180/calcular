import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "uy.trabajo-domestico",
  h1: "Calculadora de trabajo doméstico: sueldo, aportes y costo",
  title: "Trabajo doméstico en Uruguay: sueldo mínimo y aportes BPS",
  description:
    "Mínimo de {{uy.domestico-minimo-mensual[general]}} por 44 horas en la categoría general. Calculá el líquido, los aportes al BPS y el costo total para el hogar.",
  intro: [
    "Si tenés una trabajadora doméstica (o sos una), acá ves el mínimo de su categoría, lo que cobra en mano y lo que paga el hogar en aportes al BPS.",
    "Desde julio de 2026 el Consejo de Salarios separa tres categorías: general, cocina y cuidados. Cada una tiene su mínimo mensual por 44 horas semanales y su mínimo por hora para jornaleras.",
  ],
  comoSeCalcula: [
    "El mínimo mensual es por 44 horas por semana. Si trabaja menos horas, se calcula en proporción: horas por semana × mínimo ÷ 44.",
    "Para jornaleras, el mínimo es el valor hora de la categoría por las horas trabajadas en el mes.",
    "A la trabajadora se le descuenta el aporte jubilatorio (15 %), el Fonasa (entre 3 % y 8 % según su familia y su sueldo) y el FRL (0,1 %).",
    "El hogar paga encima del sueldo: jubilatorio {{uy.aportes-patronales[jubilatorio]}}, Fonasa {{uy.aportes-patronales[fonasa]}}, FRL {{uy.aportes-patronales[frl]}}, fondo de garantía {{uy.aportes-patronales[fgcl]}} y seguro de accidentes del BSE {{uy.domestico-bse}}.",
    "El BPS junta los aportes de los dos en una sola factura mensual que paga el empleador.",
  ],
  ejemplo: [
    "Categoría general, 44 horas, con el mínimo de $ 32.051: la trabajadora cobra $ 25.769 líquidos y al hogar le cuesta $ 36.696,79 por mes, sin contar aguinaldo ni licencia.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto es el sueldo mínimo de una trabajadora doméstica?",
      respuesta:
        "Desde el {{uy.domestico-minimo-mensual#desde}}, por 44 horas semanales: {{uy.domestico-minimo-mensual[general]}} en la categoría general, {{uy.domestico-minimo-mensual[cocina]}} en cocina y {{uy.domestico-minimo-mensual[cuidados]}} en cuidados.",
    },
    {
      pregunta: "¿Y si cobra por hora?",
      respuesta:
        "El mínimo por hora es {{uy.domestico-minimo-hora[general]}} en la categoría general, {{uy.domestico-minimo-hora[cocina]}} en cocina y {{uy.domestico-minimo-hora[cuidados]}} en cuidados.",
    },
    {
      pregunta: "¿Qué categoría le corresponde?",
      respuesta:
        "Cocina, si su tarea principal es cocinar. Cuidados, si cuida a niños, personas mayores o con discapacidad. General, para el resto de las tareas de la casa. Si hace varias, lo define el acta del Consejo de Salarios del grupo 21.",
    },
    {
      pregunta: "¿Qué es el complemento de cuota mutual?",
      respuesta:
        "Si lo que se aporta al Fonasa no alcanza para pagar la cuota de su mutualista, el empleador paga la diferencia. Pasa con sueldos bajos o pocas horas. El BPS lo agrega a la factura; la calculadora no lo incluye.",
    },
    {
      pregunta: "¿Cuándo cambian los mínimos?",
      respuesta: "Dos veces por año, en enero y en julio, por acuerdo del Consejo de Salarios. El BPS lo informa en un comunicado.",
    },
  ],
  glosario: [
    { termino: "Jornalera", definicion: "Trabajadora que cobra por hora o por día trabajado, en lugar de un sueldo fijo por mes." },
    { termino: "Montepío", definicion: "Aporte jubilatorio personal al BPS." },
    { termino: "BSE", definicion: "Banco de Seguros del Estado. Cubre los accidentes de trabajo; en el trabajo doméstico se paga junto con los aportes del BPS." },
    { termino: "Grupo 21", definicion: "Grupo del Consejo de Salarios que fija los mínimos del trabajo doméstico." },
  ],
});
