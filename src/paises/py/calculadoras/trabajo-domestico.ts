import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "py.trabajo-domestico",
  mercado: "py",
  concepto: "trabajo-domestico",
  slug: "trabajo-domestico",
  estado: "publicado",
  requiere: {
    "py.salario-minimo": "numero",
    "py.ips-trabajador": "numero",
    "py.ips-empleador": "numero",
  },
  campos: [
    {
      id: "salario",
      tipo: "moneda",
      etiqueta: "Salario mensual",
      ayuda: "Lo que le pagás por mes, jornada completa. Si lo dejás vacío, calculamos con el salario mínimo.",
      min: 0,
      requerido: false,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const minimo = valores["py.salario-minimo"];
    const salario = entrada.salario ?? minimo;
    const base = Math.max(salario, minimo);
    const ipsTrabajador = redondear(porcentaje(base, valores["py.ips-trabajador"]));
    const ipsEmpleador = redondear(porcentaje(base, valores["py.ips-empleador"]));
    const aguinaldoMensual = redondear(salario / 12);
    const observaciones: string[] = [];
    if (salario < minimo) observaciones.push("El salario que pusiste está debajo del mínimo. Para el seguro doméstico, el IPS toma el salario mínimo como base mínima y cobra los aportes sobre ese monto.");
    observaciones.push("El aguinaldo se paga hasta el 31 de diciembre. Acá lo mostramos repartido por mes para que lo vayas apartando.");
    return {
      minimo,
      salario,
      ipsTrabajador,
      neto: redondear(salario - ipsTrabajador),
      ipsEmpleador,
      ipsTotal: redondear(ipsTrabajador + ipsEmpleador),
      aguinaldoMensual,
      costoMensual: redondear(salario + ipsEmpleador + aguinaldoMensual),
      observaciones,
    };
  },
  resultado: [
    { clave: "minimo", etiqueta: "Salario mínimo vigente", formato: "moneda" },
    { clave: "salario", etiqueta: "Salario", formato: "moneda" },
    { clave: "ipsTrabajador", etiqueta: "Aporte de la trabajadora al IPS (se descuenta)", formato: "moneda" },
    { clave: "neto", etiqueta: "Lo que cobra en mano", formato: "moneda", destacada: true },
    { clave: "ipsEmpleador", etiqueta: "Aporte del empleador al IPS", formato: "moneda" },
    { clave: "ipsTotal", etiqueta: "Total a pagar al IPS", formato: "moneda" },
    { clave: "aguinaldoMensual", etiqueta: "Aguinaldo (parte de un mes)", formato: "moneda" },
    { clave: "costoMensual", etiqueta: "Costo mensual para el empleador", formato: "moneda", destacada: true },
  ],
});
