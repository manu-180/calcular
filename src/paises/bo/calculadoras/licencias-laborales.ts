import { definirCalculadora, enMapa } from "@/motor/calculo";
import { DIAS_DEL_MES } from "../lib/laboral";

const REQUISITOS: Readonly<Record<string, string>> = {
  matrimonio: "Presente al empleador el certificado de inscripción y la fecha que le da el Oficial de Registro Civil.",
  luto: "Presente el certificado de defunción dentro de los 5 días del fallecimiento.",
  paternidad: "Corre desde el día del nacimiento. Presente el certificado que acredite el parto.",
  cumpleanios: "Rige si su jornada es de 8 horas. Presente su cédula de identidad.",
  papanicolaou: "Un día hábil por año, para trabajadoras mayores de 18 años. Presente la constancia del examen.",
  prostata: "Un día hábil por año, para trabajadores mayores de 40 años. Presente la constancia del examen.",
  colon: "Un día hábil por año, para mayores de 40 años. Presente la constancia del examen.",
};

export default definirCalculadora({
  id: "bo.licencias-laborales",
  mercado: "bo",
  concepto: "propio",
  slug: "licencias-laborales",
  estado: "publicado",
  requiere: {
    "bo.licencias-dias": "mapa",
  },
  campos: [
    { id: "licencia", tipo: "opcion-dato", etiqueta: "Qué licencia necesita", dato: "bo.licencias-dias", porDefecto: "matrimonio" },
    { id: "sueldo", tipo: "moneda", etiqueta: "Sueldo mensual (opcional)", ayuda: "Para mostrarle cuánto vale el tiempo que le pagan.", min: 0, requerido: false },
  ],
  calcular(entrada, valores, { redondear }) {
    const dias = enMapa(valores["bo.licencias-dias"], entrada.licencia);
    const observaciones = ["Se paga el 100 % de su salario y no se descuenta de sus vacaciones."];
    const requisito = REQUISITOS[entrada.licencia];
    if (requisito) observaciones.push(requisito);
    return {
      dias,
      valor: entrada.sueldo === null ? null : redondear((entrada.sueldo / DIAS_DEL_MES) * dias),
      observaciones,
    };
  },
  resultado: [
    { clave: "dias", etiqueta: "Días de licencia con goce de haber", formato: "dias", decimales: 1, destacada: true },
    { clave: "valor", etiqueta: "Lo que le pagan por esos días", formato: "moneda" },
  ],
});
