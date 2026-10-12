import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";
import { sumarDias } from "@/motor/vigencia";
import { sumarMeses } from "../reglas";

export default definirCalculadora({
  id: "cr.maternidad",
  mercado: "cr",
  concepto: "propio",
  slug: "maternidad",
  estado: "publicado",
  requiere: {
    "cr.maternidad-meses": "mapa",
    "cr.maternidad-parte-ccss": "numero",
  },
  campos: [
    {
      id: "salario",
      tipo: "moneda",
      etiqueta: "Salario promedio mensual",
      ayuda: "El promedio de los últimos 180 días antes de la licencia, bruto.",
      min: 0,
    },
    { id: "fechaParto", tipo: "fecha", etiqueta: "Fecha probable de parto" },
  ],
  calcular(entrada, valores, { redondear }) {
    const meses = valores["cr.maternidad-meses"];
    const antes = enMapa(meses, "antes");
    const despues = enMapa(meses, "despues");
    const total = redondear(entrada.salario * (antes + despues));
    const ccss = redondear(porcentaje(total, valores["cr.maternidad-parte-ccss"]));
    return {
      inicio: sumarMeses(entrada.fechaParto, -antes),
      fin: sumarDias(sumarMeses(entrada.fechaParto, despues), -1),
      meses: antes + despues,
      total,
      ccss,
      patrono: redondear(total - ccss),
      observaciones: [
        "Durante la licencia se siguen pagando las cuotas de la Caja sobre todo el salario, como si trabajara.",
        "Las fechas exactas salen del certificado médico. Si el parto se adelanta o se atrasa, la licencia se ajusta.",
      ],
    };
  },
  resultado: [
    { clave: "inicio", etiqueta: "Inicio de la licencia", formato: "fecha" },
    { clave: "fin", etiqueta: "Fin de la licencia", formato: "fecha" },
    { clave: "meses", etiqueta: "Duración", formato: "meses" },
    { clave: "ccss", etiqueta: "Lo que paga la CCSS", formato: "moneda" },
    { clave: "patrono", etiqueta: "Lo que paga el patrono", formato: "moneda" },
    { clave: "total", etiqueta: "Total de la licencia", formato: "moneda", destacada: true },
  ],
});
