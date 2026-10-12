import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gt.permisos-con-goce-de-salario",
  h1: "Calculadora de permisos con goce de salario",
  title: "Permisos con goce de salario en Guatemala: días y pago",
  description:
    "Vea cuántos días de permiso pagado le corresponden por matrimonio, nacimiento de un hijo o fallecimiento de un familiar, y cuánto valen.",
  intro: [
    "El Código de Trabajo le da días de permiso con goce de salario en momentos importantes: {{gt.permisos-dias[matrimonio]}} por matrimonio, {{gt.permisos-dias[nacimiento]}} por el nacimiento de un hijo y {{gt.permisos-dias[fallecimiento]}} por el fallecimiento de un familiar cercano.",
    "Son días pagados: no se los pueden descontar del salario ni de las vacaciones.",
  ],
  comoSeCalcula: ["Días de permiso: los que fija la ley para el motivo.", "Valor del permiso = salario mensual / 30 × días de permiso."],
  ejemplo: ["Con un salario de Q6,000, los {{gt.permisos-dias[matrimonio]}} de permiso por matrimonio valen Q1,000."],
  faq: [
    {
      pregunta: "¿Cuántos días me dan por el fallecimiento de un familiar?",
      respuesta: "{{gt.permisos-dias[fallecimiento]}} por el fallecimiento del cónyuge o conviviente, del padre, la madre o un hijo.",
    },
    {
      pregunta: "¿Cuántos días de permiso tiene el papá cuando nace su hijo?",
      respuesta: "{{gt.permisos-dias[nacimiento]}} con goce de salario.",
    },
    {
      pregunta: "¿Hay otros permisos pagados?",
      respuesta: "Sí. También tiene permiso pagado para atender una citación judicial y, si es miembro del comité ejecutivo de un sindicato, para sus funciones sindicales. Su patrono o su pacto colectivo pueden darle más permisos pagados.",
    },
  ],
  glosario: [{ termino: "Con goce de salario", definicion: "Que se paga como si hubiera trabajado." }],
});
