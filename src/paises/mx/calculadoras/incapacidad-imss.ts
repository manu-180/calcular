import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "mx.incapacidad-imss",
  mercado: "mx",
  concepto: "propio",
  slug: "incapacidad-imss",
  estado: "publicado",
  requiere: {
    "mx.subsidio-incapacidad": "mapa",
    "mx.dias-espera-enfermedad": "numero",
    "mx.dias-maternidad": "numero",
    "mx.uma-diaria": "numero",
    "mx.tope-sbc-imss": "numero",
  },
  campos: [
    { id: "tipo", tipo: "opcion-dato", etiqueta: "Tipo de incapacidad", dato: "mx.subsidio-incapacidad", porDefecto: "enfermedad-general" },
    { id: "sbc", tipo: "moneda", etiqueta: "Salario base de cotización diario", min: 0, ayuda: "Viene en tu recibo de nómina como SBC o SDI." },
    { id: "dias", tipo: "entero", etiqueta: "Días de incapacidad", min: 1, max: 546, porDefecto: 7, ayuda: "En maternidad se pagan siempre los días que fija la ley." },
  ],
  calcular(entrada, valores, { redondear }) {
    const tope = redondear(valores["mx.tope-sbc-imss"] * valores["mx.uma-diaria"]);
    const sbc = Math.min(entrada.sbc, tope);
    const espera = valores["mx.dias-espera-enfermedad"];
    let pagados = entrada.dias;
    const observaciones: string[] = [];
    if (entrada.tipo === "enfermedad-general") {
      pagados = Math.max(0, entrada.dias - espera);
      observaciones.push(`El IMSS no paga los primeros ${espera} días de una incapacidad por enfermedad general.`);
    } else if (entrada.tipo === "maternidad") {
      pagados = valores["mx.dias-maternidad"];
      observaciones.push("La incapacidad por maternidad se paga completa, antes y después del parto.");
    }
    if (entrada.sbc > tope) observaciones.push("Tu salario pasa el tope del IMSS, así que se usa el tope.");
    const diario = redondear(porcentaje(sbc, enMapa(valores["mx.subsidio-incapacidad"], entrada.tipo)));
    return { pagados, diario, total: redondear(diario * pagados), observaciones };
  },
  resultado: [
    { clave: "pagados", etiqueta: "Días que paga el IMSS", formato: "dias" },
    { clave: "diario", etiqueta: "Subsidio por día", formato: "moneda" },
    { clave: "total", etiqueta: "Total que te paga el IMSS", formato: "moneda", destacada: true },
  ],
});
