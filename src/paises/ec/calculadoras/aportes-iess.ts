import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ec.aportes-iess",
  mercado: "ec",
  concepto: "aportes-seguridad-social",
  slug: "aportes-iess",
  estado: "publicado",
  requiere: {
    "ec.sbu": "numero",
    "ec.aporte-personal-iess": "numero",
    "ec.aporte-patronal-iess": "numero",
    "ec.cesantia-personal": "numero",
    "ec.cesantia-patronal": "numero",
  },
  campos: [
    {
      id: "sueldo",
      tipo: "moneda",
      etiqueta: "Remuneración mensual",
      ayuda: "Sueldo más horas extra, comisiones y recargos. Sin décimos, utilidades ni fondo de reserva.",
      min: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const sbu = valores["ec.sbu"];
    const base = Math.max(entrada.sueldo, sbu);
    const personal = redondear(porcentaje(base, valores["ec.aporte-personal-iess"]));
    const patronal = redondear(porcentaje(base, valores["ec.aporte-patronal-iess"]));
    const cesantia = redondear(porcentaje(base, valores["ec.cesantia-personal"] + valores["ec.cesantia-patronal"]));
    const observaciones: string[] = [];
    if (entrada.sueldo < sbu) observaciones.push("Con jornada completa, el aporte se calcula como mínimo sobre el salario básico.");
    return {
      base,
      personal,
      patronal,
      total: redondear(personal + patronal),
      cesantia,
      observaciones,
    };
  },
  resultado: [
    { clave: "base", etiqueta: "Base de aportación", formato: "moneda" },
    { clave: "personal", etiqueta: "Aporte personal (se descuenta de tu sueldo)", formato: "moneda", destacada: true },
    { clave: "patronal", etiqueta: "Aporte patronal (lo paga tu empleador)", formato: "moneda" },
    { clave: "total", etiqueta: "Total que recibe el IESS cada mes", formato: "moneda" },
    { clave: "cesantia", etiqueta: "De eso, va a tu fondo de cesantía", formato: "moneda" },
  ],
});
