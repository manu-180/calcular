import { definirCalculadora } from "@/motor/calculo";

// El sueldo mensual paga treinta días (Código del Trabajo, art. 53) de la jornada diaria (art. 47).
const DIAS_DEL_MES = 30;

export default definirCalculadora({
  id: "ec.sueldo-por-hora",
  mercado: "ec",
  concepto: "propio",
  slug: "sueldo-por-hora",
  estado: "publicado",
  requiere: {
    "ec.sbu": "numero",
    "ec.jornada-diaria": "numero",
    "ec.jornada-semanal": "numero",
  },
  campos: [{ id: "sueldo", tipo: "moneda", etiqueta: "Sueldo mensual", min: 0 }],
  calcular(entrada, valores, { redondear }) {
    const dia = entrada.sueldo / DIAS_DEL_MES;
    const hora = dia / valores["ec.jornada-diaria"];
    const observaciones: string[] = [];
    if (entrada.sueldo > 0 && entrada.sueldo < valores["ec.sbu"]) observaciones.push("Con jornada completa, tu sueldo no puede ser menor al salario básico.");
    return {
      dia: redondear(dia),
      hora: redondear(hora),
      semana: redondear(hora * valores["ec.jornada-semanal"]),
      horaBasico: redondear(valores["ec.sbu"] / DIAS_DEL_MES / valores["ec.jornada-diaria"]),
      observaciones,
    };
  },
  resultado: [
    { clave: "hora", etiqueta: "Valor de tu hora", formato: "moneda", destacada: true },
    { clave: "dia", etiqueta: "Valor de tu día", formato: "moneda" },
    { clave: "semana", etiqueta: "Valor de una semana de trabajo", formato: "moneda" },
    { clave: "horaBasico", etiqueta: "Hora con el salario básico", formato: "moneda" },
  ],
});
