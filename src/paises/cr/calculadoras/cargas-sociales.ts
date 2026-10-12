import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "cr.cargas-sociales",
  mercado: "cr",
  concepto: "aportes-seguridad-social",
  slug: "cargas-sociales",
  estado: "publicado",
  requiere: {
    "cr.ccss-sem-trabajador": "numero",
    "cr.ccss-ivm-trabajador": "numero",
    "cr.banco-popular-trabajador": "numero",
    "cr.ccss-sem-patrono": "numero",
    "cr.ccss-ivm-patrono": "numero",
    "cr.banco-popular-patrono": "numero",
    "cr.asignaciones-familiares": "numero",
    "cr.imas": "numero",
    "cr.ina": "numero",
    "cr.fcl": "numero",
    "cr.rop-patrono": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario bruto mensual", ayuda: "Lo que se reporta en planilla, con horas extra y comisiones.", min: 0 },
    {
      id: "ina",
      tipo: "si-no",
      etiqueta: "La empresa tiene cinco o más trabajadores permanentes",
      ayuda: "Con menos de cinco no se paga el aporte al INA.",
      porDefecto: true,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const { salario } = entrada;
    const p = (id: keyof typeof valores) => redondear(porcentaje(salario, valores[id]));
    const semTrabajador = p("cr.ccss-sem-trabajador");
    const ivmTrabajador = p("cr.ccss-ivm-trabajador");
    const bpTrabajador = p("cr.banco-popular-trabajador");
    const totalTrabajador = redondear(semTrabajador + ivmTrabajador + bpTrabajador);
    const semPatrono = p("cr.ccss-sem-patrono");
    const ivmPatrono = p("cr.ccss-ivm-patrono");
    const bpPatrono = p("cr.banco-popular-patrono");
    const asignaciones = p("cr.asignaciones-familiares");
    const imas = p("cr.imas");
    const ina = entrada.ina ? p("cr.ina") : 0;
    const fcl = p("cr.fcl");
    const rop = p("cr.rop-patrono");
    const totalPatrono = redondear(semPatrono + ivmPatrono + bpPatrono + asignaciones + imas + ina + fcl + rop);
    const tasaPatrono =
      valores["cr.ccss-sem-patrono"] +
      valores["cr.ccss-ivm-patrono"] +
      valores["cr.banco-popular-patrono"] +
      valores["cr.asignaciones-familiares"] +
      valores["cr.imas"] +
      (entrada.ina ? valores["cr.ina"] : 0) +
      valores["cr.fcl"] +
      valores["cr.rop-patrono"];
    return {
      semTrabajador,
      ivmTrabajador,
      bpTrabajador,
      totalTrabajador,
      semPatrono,
      ivmPatrono,
      bpPatrono,
      asignaciones,
      imas,
      ina,
      fcl,
      rop,
      totalPatrono,
      tasaPatrono: redondear(tasaPatrono),
      total: redondear(totalTrabajador + totalPatrono),
      observaciones: ["No incluye la póliza de riesgos del trabajo del INS: su tarifa depende de la actividad de la empresa."],
    };
  },
  resultado: [
    { clave: "semTrabajador", etiqueta: "Seguro de Salud (trabajador)", formato: "moneda" },
    { clave: "ivmTrabajador", etiqueta: "Pensión IVM (trabajador)", formato: "moneda" },
    { clave: "bpTrabajador", etiqueta: "Banco Popular (trabajador)", formato: "moneda" },
    { clave: "totalTrabajador", etiqueta: "Total que se rebaja al trabajador", formato: "moneda" },
    { clave: "semPatrono", etiqueta: "Seguro de Salud (patrono)", formato: "moneda" },
    { clave: "ivmPatrono", etiqueta: "Pensión IVM (patrono)", formato: "moneda" },
    { clave: "bpPatrono", etiqueta: "Banco Popular (patrono)", formato: "moneda" },
    { clave: "asignaciones", etiqueta: "Asignaciones Familiares (Fodesaf)", formato: "moneda" },
    { clave: "imas", etiqueta: "IMAS", formato: "moneda" },
    { clave: "ina", etiqueta: "INA", formato: "moneda", ocultarSiCero: true },
    { clave: "fcl", etiqueta: "Fondo de Capitalización Laboral", formato: "moneda" },
    { clave: "rop", etiqueta: "Pensión complementaria (ROP)", formato: "moneda" },
    { clave: "totalPatrono", etiqueta: "Total de cargas del patrono", formato: "moneda" },
    { clave: "tasaPatrono", etiqueta: "Porcentaje que paga el patrono", formato: "porcentaje" },
    { clave: "total", etiqueta: "Total de cargas sociales", formato: "moneda", destacada: true },
  ],
});
