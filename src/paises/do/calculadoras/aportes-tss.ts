import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "do.aportes-tss",
  mercado: "do",
  concepto: "aportes-seguridad-social",
  slug: "aportes-tss",
  estado: "publicado",
  requiere: {
    "do.sfs-trabajador": "numero",
    "do.afp-trabajador": "numero",
    "do.sfs-empleador": "numero",
    "do.afp-empleador": "numero",
    "do.srl-fijo": "numero",
    "do.tope-sfs": "numero",
    "do.tope-afp": "numero",
    "do.tope-srl": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual cotizable", min: 0 },
    {
      id: "riesgo",
      tipo: "porcentaje",
      etiqueta: "Porcentaje variable de riesgos laborales",
      ayuda: "Lo asigna el IDOPPRIL según el riesgo de la empresa, entre 0.10 % y 0.30 %. Si no lo sabes, deja 0.10.",
      min: 0.1,
      max: 0.3,
      porDefecto: 0.1,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.riesgo < 0.1 || entrada.riesgo > 0.3) throw new ErrorEntrada("El porcentaje variable va de 0.10 % a 0.30 %.", "riesgo");
    const baseSfs = Math.min(entrada.salario, valores["do.tope-sfs"]);
    const baseAfp = Math.min(entrada.salario, valores["do.tope-afp"]);
    const baseSrl = Math.min(entrada.salario, valores["do.tope-srl"]);
    const sfs = redondear(porcentaje(baseSfs, valores["do.sfs-trabajador"]));
    const afp = redondear(porcentaje(baseAfp, valores["do.afp-trabajador"]));
    const sfsEmpleador = redondear(porcentaje(baseSfs, valores["do.sfs-empleador"]));
    const afpEmpleador = redondear(porcentaje(baseAfp, valores["do.afp-empleador"]));
    const srl = redondear(porcentaje(baseSrl, valores["do.srl-fijo"] + entrada.riesgo));
    const trabajador = redondear(sfs + afp);
    const empleador = redondear(sfsEmpleador + afpEmpleador + srl);
    const observaciones: string[] = [];
    if (entrada.salario > valores["do.tope-srl"]) observaciones.push("Cada seguro tiene su tope. Por encima de cada tope ya no se cotiza a ese seguro.");
    observaciones.push("No incluye el aporte al INFOTEP ni otros pagos fuera de la TSS.");
    return {
      sfs,
      afp,
      trabajador,
      sfsEmpleador,
      afpEmpleador,
      srl,
      empleador,
      total: redondear(trabajador + empleador),
      costo: redondear(entrada.salario + empleador),
      observaciones,
    };
  },
  resultado: [
    { clave: "sfs", etiqueta: "SFS del trabajador", formato: "moneda" },
    { clave: "afp", etiqueta: "AFP del trabajador", formato: "moneda" },
    { clave: "trabajador", etiqueta: "Descuento al trabajador", formato: "moneda" },
    { clave: "sfsEmpleador", etiqueta: "SFS del empleador", formato: "moneda" },
    { clave: "afpEmpleador", etiqueta: "AFP del empleador", formato: "moneda" },
    { clave: "srl", etiqueta: "Riesgos laborales (empleador)", formato: "moneda" },
    { clave: "empleador", etiqueta: "Aporte del empleador", formato: "moneda" },
    { clave: "total", etiqueta: "Total a pagar a la TSS", formato: "moneda", destacada: true },
    { clave: "costo", etiqueta: "Costo mensual para el empleador", formato: "moneda" },
  ],
});
