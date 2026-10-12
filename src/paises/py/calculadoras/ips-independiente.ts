import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "py.ips-independiente",
  mercado: "py",
  concepto: "propio",
  slug: "ips-independiente",
  estado: "publicado",
  requiere: {
    "py.ips-independiente": "numero",
    "py.salario-minimo": "numero",
  },
  campos: [
    {
      id: "base",
      tipo: "moneda",
      etiqueta: "Ingreso mensual que querés declarar",
      ayuda: "Opcional. Si lo dejás vacío, usamos el salario mínimo, que es la base más baja.",
      min: 0,
      requerido: false,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const minimo = valores["py.salario-minimo"];
    // Ley 4933, art. 3: la base no puede ser menor a un salario mínimo.
    const base = Math.max(entrada.base ?? minimo, minimo);
    const aporte = redondear(porcentaje(base, valores["py.ips-independiente"]));
    const observaciones = ["Este seguro cubre solo jubilación y pensiones. No incluye la atención médica del IPS."];
    if (entrada.base !== null && entrada.base < minimo) observaciones.push("La base no puede ser menor al salario mínimo, así que calculamos con ese monto.");
    observaciones.push("La jubilación ordinaria se cobra a los 60 años con 25 de aportes, y se calcula con el promedio de las bases de los últimos 120 meses.");
    return {
      base,
      aporte,
      anual: aporte * 12,
      observaciones,
    };
  },
  resultado: [
    { clave: "base", etiqueta: "Base de aporte", formato: "moneda" },
    { clave: "aporte", etiqueta: "Aporte mensual al IPS", formato: "moneda", destacada: true },
    { clave: "anual", etiqueta: "Aporte en el año", formato: "moneda" },
  ],
});
