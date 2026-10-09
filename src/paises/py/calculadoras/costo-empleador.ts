import { definirCalculadora, porcentaje } from "@/motor/calculo";

const MESES = 12;

export default definirCalculadora({
  id: "py.costo-empleador",
  mercado: "py",
  concepto: "costo-empleador",
  slug: "costo-empleador",
  estado: "publicado",
  requiere: {
    "py.salario-minimo": "numero",
    "py.ips-empleador": "numero",
    "py.ips-trabajador": "numero",
    "py.bonificacion-familiar": "numero",
    "py.bonificacion-familiar-tope": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", min: 0 },
    {
      id: "hijos",
      tipo: "entero",
      etiqueta: "Hijos del trabajador con bonificación familiar",
      ayuda: "Solo si su salario no pasa el tope de la bonificación y ya los declaró. Si no, dejá 0.",
      min: 0,
      max: 20,
      porDefecto: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const minimo = valores["py.salario-minimo"];
    const base = Math.max(entrada.salario, minimo);
    const ips = redondear(porcentaje(base, valores["py.ips-empleador"]));
    const tope = redondear(porcentaje(minimo, valores["py.bonificacion-familiar-tope"]));
    const bonificacion = entrada.salario <= tope ? redondear(porcentaje(minimo, valores["py.bonificacion-familiar"]) * entrada.hijos) : 0;
    const aguinaldo = redondear(entrada.salario / MESES);
    const mensual = redondear(entrada.salario + ips + bonificacion + aguinaldo);
    const observaciones: string[] = [];
    if (entrada.salario < minimo) observaciones.push("El salario está debajo del mínimo. Si es jornada completa, el IPS cobra el aporte sobre el salario mínimo.");
    if (entrada.hijos > 0 && bonificacion === 0) observaciones.push("El salario pasa el tope, así que no corresponde la bonificación familiar.");
    return {
      salario: entrada.salario,
      ips,
      bonificacion,
      aguinaldo,
      mensual,
      anual: redondear(mensual * MESES),
      observaciones,
    };
  },
  resultado: [
    { clave: "salario", etiqueta: "Salario", formato: "moneda" },
    { clave: "ips", etiqueta: "Aporte patronal al IPS", formato: "moneda" },
    { clave: "bonificacion", etiqueta: "Bonificación familiar", formato: "moneda", ocultarSiCero: true },
    { clave: "aguinaldo", etiqueta: "Aguinaldo (parte de un mes)", formato: "moneda" },
    { clave: "mensual", etiqueta: "Costo mensual del trabajador", formato: "moneda", destacada: true },
    { clave: "anual", etiqueta: "Costo en el año", formato: "moneda" },
  ],
});
