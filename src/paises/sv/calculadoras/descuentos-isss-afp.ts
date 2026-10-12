import { definirCalculadora, porcentaje } from "@/motor/calculo";
import { dinero } from "../lib/texto";

export default definirCalculadora({
  id: "sv.descuentos-isss-afp",
  mercado: "sv",
  concepto: "aportes-seguridad-social",
  slug: "descuentos-isss-afp",
  estado: "publicado",
  requiere: {
    "sv.afp-trabajador": "numero",
    "sv.afp-patrono": "numero",
    "sv.isss-trabajador": "numero",
    "sv.isss-patrono": "numero",
    "sv.isss-salario-maximo": "numero",
  },
  campos: [
    {
      id: "salario",
      tipo: "moneda",
      etiqueta: "Salario mensual",
      ayuda: "Su salario del mes, con horas extra y comisiones. Sin aguinaldo ni bonos ocasionales.",
      min: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const baseIsss = Math.min(entrada.salario, valores["sv.isss-salario-maximo"]);
    const afpTrabajador = redondear(porcentaje(entrada.salario, valores["sv.afp-trabajador"]));
    const isssTrabajador = redondear(porcentaje(baseIsss, valores["sv.isss-trabajador"]));
    const afpPatrono = redondear(porcentaje(entrada.salario, valores["sv.afp-patrono"]));
    const isssPatrono = redondear(porcentaje(baseIsss, valores["sv.isss-patrono"]));
    const observaciones: string[] = [];
    if (entrada.salario > valores["sv.isss-salario-maximo"]) {
      observaciones.push(`El ISSS se cotiza sobre ${dinero(valores["sv.isss-salario-maximo"])} como máximo. La AFP no tiene techo.`);
    }
    return {
      afpTrabajador,
      isssTrabajador,
      totalTrabajador: redondear(afpTrabajador + isssTrabajador),
      afpPatrono,
      isssPatrono,
      totalPatrono: redondear(afpPatrono + isssPatrono),
      observaciones,
    };
  },
  resultado: [
    { clave: "afpTrabajador", etiqueta: "AFP que le descuentan", formato: "moneda" },
    { clave: "isssTrabajador", etiqueta: "ISSS que le descuentan", formato: "moneda" },
    { clave: "totalTrabajador", etiqueta: "Total descontado de su salario", formato: "moneda", destacada: true },
    { clave: "afpPatrono", etiqueta: "AFP que paga su patrono", formato: "moneda" },
    { clave: "isssPatrono", etiqueta: "ISSS que paga su patrono", formato: "moneda" },
    { clave: "totalPatrono", etiqueta: "Total que aporta su patrono", formato: "moneda" },
  ],
});
