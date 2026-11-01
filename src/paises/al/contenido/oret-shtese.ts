import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "al.oret-shtese",
  h1: "Orët shtesë {{anio}}",
  title: "Orët shtesë {{anio}}: sa paguhen sipas Kodit të Punës",
  description: "Llogaritni pagesën e orëve shtesë në ditë pune, në pushim javor ose festë. Vendosni pagën dhe orët.",
  intro: ["Orët shtesë paguhen më shumë se orët normale, sipas Kodit të Punës. Vendosni pagën dhe numrin e orëve."],
  comoSeCalcula: ["Paga për një orë del nga paga mujore e ndarë me orët normale të muajit, dhe i shtohet shtesa."],
  ejemplo: ["Me pagë 87 000 lekë, ora është 500 lekë para shtesës."],
  faq: [],
  glosario: [{ termino: "Orë shtesë", definicion: "Çdo orë mbi kohëzgjatjen normale të punës." }],
});
