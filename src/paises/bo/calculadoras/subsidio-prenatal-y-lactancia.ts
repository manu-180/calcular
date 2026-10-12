import { definirCalculadora, enMapa } from "@/motor/calculo";

const MESES_LACTANCIA = 12;

export default definirCalculadora({
  id: "bo.subsidio-prenatal-y-lactancia",
  mercado: "bo",
  concepto: "propio",
  slug: "subsidio-prenatal-y-lactancia",
  estado: "publicado",
  requiere: {
    "bo.asignaciones-familiares": "mapa",
  },
  campos: [
    {
      id: "mesesPrenatal",
      tipo: "entero",
      etiqueta: "Meses de embarazo desde el quinto mes hasta el parto",
      ayuda: "El subsidio prenatal empieza el primer día del quinto mes. Un embarazo completo suma 5 meses.",
      min: 0,
      max: 5,
      porDefecto: 5,
    },
    { id: "hijos", tipo: "entero", etiqueta: "Hijas o hijos que nacen", min: 1, max: 4, porDefecto: 1 },
  ],
  calcular(entrada, valores, { redondear }) {
    const montos = valores["bo.asignaciones-familiares"];
    const prenatal = redondear(entrada.mesesPrenatal * enMapa(montos, "prenatal"));
    const natalidad = redondear(entrada.hijos * enMapa(montos, "natalidad"));
    const lactancia = redondear(entrada.hijos * MESES_LACTANCIA * enMapa(montos, "lactancia"));
    return {
      prenatal,
      natalidad,
      lactancia,
      total: redondear(prenatal + natalidad + lactancia),
      observaciones: [
        "Los paga su empleador, no la caja. El prenatal y el de lactancia se entregan en productos alimenticios; el de natalidad, en dinero.",
        "Para el de natalidad hay que presentar el certificado de nacimiento ante la caja de salud.",
      ],
    };
  },
  resultado: [
    { clave: "prenatal", etiqueta: "Subsidio prenatal (en productos)", formato: "moneda" },
    { clave: "natalidad", etiqueta: "Subsidio de natalidad (en dinero)", formato: "moneda" },
    { clave: "lactancia", etiqueta: "Subsidio de lactancia, 12 meses (en productos)", formato: "moneda" },
    { clave: "total", etiqueta: "Total de los subsidios", formato: "moneda", destacada: true },
  ],
});
