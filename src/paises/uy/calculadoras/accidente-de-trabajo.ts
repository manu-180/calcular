import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "uy.accidente-de-trabajo",
  mercado: "uy",
  concepto: "propio",
  slug: "accidente-de-trabajo",
  estado: "publicado",
  requiere: {
    "uy.accidente-fraccion": "mapa",
    "uy.accidente-dia-desde": "numero",
    "uy.enfermedad-porcentaje": "numero",
  },
  campos: [
    {
      id: "modalidad",
      tipo: "opcion",
      etiqueta: "Cómo cobrás",
      opciones: [
        { valor: "mensual", etiqueta: "Sueldo mensual" },
        { valor: "jornal", etiqueta: "Por día (jornal)" },
      ],
      porDefecto: "mensual",
    },
    { id: "monto", tipo: "moneda", etiqueta: "Sueldo mensual o jornal al momento del accidente", min: 0 },
    { id: "dias", tipo: "entero", etiqueta: "Días de ausencia por el accidente", min: 1, max: 730, porDefecto: 15 },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.monto <= 0) throw new ErrorEntrada("Escribí tu sueldo o tu jornal.", "monto");
    const jornal = entrada.modalidad === "mensual" ? entrada.monto / 30 : entrada.monto;
    const f = valores["uy.accidente-fraccion"];
    const fraccion = enMapa(f, "numerador") / enMapa(f, "denominador");
    const diasPagos = Math.max(0, entrada.dias - (valores["uy.accidente-dia-desde"] - 1));
    const diarioBse = redondear(jornal * fraccion);
    const bse = redondear(jornal * fraccion * diasPagos);
    // El BPS completa la diferencia entre los dos tercios del BSE y el 70 % del subsidio por enfermedad.
    const complementoBps = redondear(Math.max(0, porcentaje(jornal, valores["uy.enfermedad-porcentaje"]) - jornal * fraccion) * diasPagos);
    return {
      diasPagos,
      diarioBse,
      bse,
      complementoBps,
      total: redondear(bse + complementoBps),
      observaciones: [
        "Los tres primeros días de ausencia no se cobran. El BSE paga todos los días desde el cuarto, también los feriados.",
        "Si el accidente deja una incapacidad permanente, el BSE paga además una renta aparte.",
      ],
    };
  },
  resultado: [
    { clave: "diasPagos", etiqueta: "Días que se pagan", formato: "dias" },
    { clave: "diarioBse", etiqueta: "Lo que paga el BSE por día", formato: "moneda" },
    { clave: "bse", etiqueta: "Total que paga el BSE", formato: "moneda" },
    { clave: "complementoBps", etiqueta: "Complemento del BPS", formato: "moneda" },
    { clave: "total", etiqueta: "Total por la ausencia", formato: "moneda", destacada: true },
  ],
});
