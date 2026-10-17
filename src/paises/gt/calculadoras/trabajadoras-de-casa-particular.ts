import { definirCalculadora, enMapa, ErrorEntrada, porcentaje, porRegion } from "@/motor/calculo";

export default definirCalculadora({
  id: "gt.trabajadoras-de-casa-particular",
  mercado: "gt",
  concepto: "trabajo-domestico",
  slug: "trabajadoras-de-casa-particular",
  estado: "publicado",
  requiere: {
    "gt.precapi-empleador": "numero",
    "gt.precapi-trabajadora": "numero",
    "gt.salario-minimo-mensual": "mapa-por-region",
    "gt.aguinaldo": "numero",
    "gt.bono-14": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual en dinero", min: 0 },
    { id: "region", tipo: "region", etiqueta: "Dónde está la casa", porDefecto: "ce1" },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada({ codigo: "requerido" }, "salario");
    const base = enMapa(porRegion(valores["gt.salario-minimo-mensual"], entrada.region), "no-agricola");
    const cuotaEmpleador = redondear(porcentaje(base, valores["gt.precapi-empleador"]));
    const cuotaTrabajadora = redondear(porcentaje(base, valores["gt.precapi-trabajadora"]));
    return {
      base,
      cuotaEmpleador,
      cuotaTrabajadora,
      trimestre: redondear((cuotaEmpleador + cuotaTrabajadora) * 3),
      aguinaldo: redondear(porcentaje(entrada.salario, valores["gt.aguinaldo"])),
      bono14: redondear(porcentaje(entrada.salario, valores["gt.bono-14"])),
      observaciones: [
        "El programa del IGSS para trabajadoras de casa particular (PRECAPI) cobra sobre el salario mínimo no agrícola, no sobre el salario real.",
        "Las cuotas se pagan cada tres meses y por adelantado.",
        "El aguinaldo y el Bono 14 se calculan con el salario en dinero de un año completo.",
      ],
    };
  },
  resultado: [
    { clave: "base", etiqueta: "Base de las cuotas", formato: "moneda" },
    { clave: "cuotaEmpleador", etiqueta: "Cuota mensual del empleador", formato: "moneda", destacada: true },
    { clave: "cuotaTrabajadora", etiqueta: "Cuota mensual de la trabajadora", formato: "moneda" },
    { clave: "trimestre", etiqueta: "Pago al IGSS por trimestre", formato: "moneda" },
    { clave: "aguinaldo", etiqueta: "Aguinaldo por año completo", formato: "moneda" },
    { clave: "bono14", etiqueta: "Bono 14 por año completo", formato: "moneda" },
  ],
});
