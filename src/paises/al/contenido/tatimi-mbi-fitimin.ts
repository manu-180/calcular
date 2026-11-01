import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "al.tatimi-mbi-fitimin",
  h1: "Tatimi mbi fitimin {{anio}}",
  title: "Tatimi mbi fitimin {{anio}}: {{al.tatim-korporate}} ose 0%",
  description: "Tatimi mbi fitimin e shoqërive është {{al.tatim-korporate}}, dhe 0% me të ardhura bruto deri në {{al.kufi-zero}}. Vendosni të ardhurat dhe fitimin për ta llogaritur.",
  intro: [
    "Norma e tatimit mbi të ardhurat e korporatave është {{al.tatim-korporate}}, sipas nenit 41 të ligjit nr. 29/2023. Shoqëritë me të ardhura bruto deri në {{al.kufi-zero}} në vit kanë normë 0% deri më 31 dhjetor 2029, sipas dispozitës kalimtare të nenit 69.",
    "Kalkulatori shikon të ardhurat bruto për të zgjedhur normën dhe e zbaton atë mbi fitimin e tatueshëm.",
  ],
  comoSeCalcula: [
    "Nëse të ardhurat bruto vjetore janë deri në {{al.kufi-zero}}, norma është 0%.",
    "Përndryshe, tatimi është {{al.tatim-korporate}} e fitimit të tatueshëm.",
    "Fitimi i tatueshëm është e ardhura minus shpenzimet e zbritshme, sipas nenit 43. Mos e përzieni me fitimin kontabël: disa shpenzime të nenit 50 nuk zbriten.",
  ],
  ejemplo: [
    "Një shoqëri ka 20 milionë lekë të ardhura bruto dhe 5 milionë lekë fitim të tatueshëm. Tatimi është 750 000 lekë dhe fitimi pas tatimit 4 250 000 lekë. Po të kishte 14 milionë lekë të ardhura, norma do të ishte 0%.",
  ],
  faq: [
    {
      pregunta: "Kush përfiton nga norma 0%?",
      respuesta: "Neni 69 përmend individët tregtarë, të vetëpunësuarit dhe entitetet me të ardhura bruto deri në 14 milionë lekë në vit. Lehtësia vlen deri më 31 dhjetor 2029.",
    },
    {
      pregunta: "Sa është tatimi mbi dividendin pas fitimit?",
      respuesta: "Dividendi i shpërndarë tatohet veç, me {{al.tatim-korporate}} për fitimin dhe 8% për dividendin, sipas neneve 41 dhe 59.",
    },
    {
      pregunta: "Si mbartet një humbje?",
      respuesta: "Sipas nenit 54, humbja e një viti kompensohet me fitimet e pesë viteve të ardhshme, duke filluar nga humbja më e vjetër.",
    },
  ],
  glosario: [
    { termino: "Fitimi i tatueshëm", definicion: "Të ardhurat minus shpenzimet që ligji lejon të zbriten." },
    { termino: "Entitet", definicion: "Shoqëria ose organizata që i nënshtrohet tatimit mbi të ardhurat e korporatave." },
  ],
});
