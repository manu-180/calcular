import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

const MESES = 12;

export default definirCalculadora({
  id: "pa.seguro-social-independientes",
  mercado: "pa",
  concepto: "propio",
  slug: "seguro-social-independientes",
  estado: "publicado",
  requiere: {
    "pa.css-independiente": "mapa",
  },
  campos: [
    {
      id: "ingreso",
      tipo: "moneda",
      etiqueta: "Ingreso mensual que declaras a la Caja",
      ayuda: "Tu ingreso cotizable: lo que declaras como trabajador independiente.",
      min: 0,
    },
    {
      id: "salud",
      tipo: "si-no",
      etiqueta: "Quieres cotizar también para enfermedad y maternidad",
      porDefecto: false,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const tasas = valores["pa.css-independiente"];
    const ivm = redondear(porcentaje(entrada.ingreso, enMapa(tasas, "ivm")));
    const salud = entrada.salud ? redondear(porcentaje(entrada.ingreso, enMapa(tasas, "enfermedad-maternidad"))) : 0;
    const mensual = redondear(ivm + salud);
    return {
      ivm,
      salud,
      mensual,
      anual: redondear(mensual * MESES),
      observaciones: [
        "La cuota de invalidez, vejez y muerte es obligatoria. La de enfermedad y maternidad es voluntaria y te da atención de salud en la Caja.",
      ],
    };
  },
  resultado: [
    { clave: "ivm", etiqueta: "Invalidez, vejez y muerte", formato: "moneda" },
    { clave: "salud", etiqueta: "Enfermedad y maternidad", formato: "moneda", ocultarSiCero: true },
    { clave: "mensual", etiqueta: "Cuota mensual a la Caja de Seguro Social", formato: "moneda", destacada: true },
    { clave: "anual", etiqueta: "Cuota en un año", formato: "moneda" },
  ],
});
