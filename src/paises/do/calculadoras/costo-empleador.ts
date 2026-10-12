import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "do.costo-empleador",
  mercado: "do",
  concepto: "costo-empleador",
  slug: "costo-empleador",
  estado: "publicado",
  requiere: {
    "do.sfs-empleador": "numero",
    "do.afp-empleador": "numero",
    "do.srl-fijo": "numero",
    "do.tope-sfs": "numero",
    "do.tope-afp": "numero",
    "do.tope-srl": "numero",
    "do.salario-minimo": "mapa",
    "do.tope-regalia": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual del empleado", min: 0 },
    {
      id: "riesgo",
      tipo: "porcentaje",
      etiqueta: "Porcentaje variable de riesgos laborales",
      ayuda: "Lo asigna el IDOPPRIL según el riesgo de la empresa, entre 0.10 % y 0.30 %. Si no lo sabes, deja 0.10.",
      min: 0.1,
      max: 0.3,
      porDefecto: 0.1,
    },
    { id: "tamano", tipo: "opcion-dato", etiqueta: "Tamaño de la empresa", dato: "do.salario-minimo", porDefecto: "grande" },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.riesgo < 0.1 || entrada.riesgo > 0.3) throw new ErrorEntrada("El porcentaje variable va de 0.10 % a 0.30 %.", "riesgo");
    const sfs = redondear(porcentaje(Math.min(entrada.salario, valores["do.tope-sfs"]), valores["do.sfs-empleador"]));
    const afp = redondear(porcentaje(Math.min(entrada.salario, valores["do.tope-afp"]), valores["do.afp-empleador"]));
    const srl = redondear(porcentaje(Math.min(entrada.salario, valores["do.tope-srl"]), valores["do.srl-fijo"] + entrada.riesgo));
    const tss = redondear(sfs + afp + srl);
    const topeRegalia = redondear(enMapa(valores["do.salario-minimo"], entrada.tamano) * valores["do.tope-regalia"]);
    const regalia = Math.min(entrada.salario, topeRegalia);
    const anual = redondear((entrada.salario + tss) * 12 + regalia);
    return {
      sfs,
      afp,
      srl,
      tss,
      regaliaMensual: redondear(regalia / 12),
      mensual: redondear(anual / 12),
      anual,
      observaciones: [
        "No incluye el aporte al INFOTEP, las vacaciones ni la bonificación por utilidades.",
        "La regalía se reparte entre los 12 meses para que veas cuánto apartar cada mes.",
      ],
    };
  },
  resultado: [
    { clave: "sfs", etiqueta: "Seguro Familiar de Salud (empleador)", formato: "moneda" },
    { clave: "afp", etiqueta: "Pensión AFP (empleador)", formato: "moneda" },
    { clave: "srl", etiqueta: "Riesgos laborales", formato: "moneda" },
    { clave: "tss", etiqueta: "Total de aportes a la TSS", formato: "moneda" },
    { clave: "regaliaMensual", etiqueta: "Regalía pascual, parte de cada mes", formato: "moneda" },
    { clave: "mensual", etiqueta: "Costo mensual del empleado", formato: "moneda", destacada: true },
    { clave: "anual", etiqueta: "Costo anual", formato: "moneda" },
  ],
});
