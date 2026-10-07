import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "py.salario-neto",
  mercado: "py",
  concepto: "sueldo-neto",
  slug: "salario-neto",
  estado: "publicado",
  requiere: {
    "py.ips-trabajador": "numero",
    "py.ips-empleador": "numero",
    "py.salario-minimo": "numero",
  },
  campos: [
    {
      id: "bruto",
      tipo: "moneda",
      etiqueta: "Salario bruto del mes",
      ayuda: "Sumá el salario y lo que cobraste de horas extra o comisiones en el mes. El aguinaldo no va.",
      min: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const ips = redondear(porcentaje(entrada.bruto, valores["py.ips-trabajador"]));
    const aporteEmpleador = redondear(porcentaje(entrada.bruto, valores["py.ips-empleador"]));
    const observaciones: string[] = [];
    if (entrada.bruto > 0 && entrada.bruto < valores["py.salario-minimo"]) {
      observaciones.push("Tu salario está debajo del mínimo legal. Si trabajás jornada completa, el IPS toma como base mínima el salario mínimo.");
    }
    observaciones.push("No incluimos el IRP. Ese impuesto se liquida una vez al año, en la declaración de marzo, y solo si tus ingresos del año pasan el monto no alcanzado.");
    return {
      bruto: entrada.bruto,
      ips,
      neto: redondear(entrada.bruto - ips),
      aporteEmpleador,
      costoEmpleador: redondear(entrada.bruto + aporteEmpleador),
      observaciones,
    };
  },
  resultado: [
    { clave: "bruto", etiqueta: "Salario bruto", formato: "moneda" },
    { clave: "ips", etiqueta: "Aporte al IPS", formato: "moneda" },
    { clave: "neto", etiqueta: "Salario neto (lo que cobrás)", formato: "moneda", destacada: true },
    { clave: "aporteEmpleador", etiqueta: "Aporte del empleador al IPS", formato: "moneda", ayuda: "Lo paga la empresa aparte. No se descuenta de tu salario." },
    { clave: "costoEmpleador", etiqueta: "Costo total para el empleador", formato: "moneda" },
  ],
});
