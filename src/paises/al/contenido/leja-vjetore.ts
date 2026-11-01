import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "al.leja-vjetore",
  h1: "Leja vjetore {{anio}}",
  title: "Leja vjetore {{anio}}: sa ditë ju takojnë",
  description: "Llogaritni ditët e lejes vjetore dhe pagesën e tyre sipas Kodit të Punës. Vendosni muajt e punës dhe pagën.",
  intro: ["Leja vjetore me pagesë e ka bazën te Kodi i Punës. Vendosni muajt e punës gjatë vitit dhe pagën tuaj."],
  comoSeCalcula: ["Ditët e lejes ndahen në përpjesëtim me muajt e punës. Paga e lejes është ajo që do të merrnit sikur të punonit."],
  ejemplo: ["Pas 6 muajsh punë ju takon gjysma e lejes vjetore."],
  faq: [],
  glosario: [{ termino: "Leja vjetore", definicion: "Pushimi me pagesë që i takon çdo punëmarrësi." }],
});
