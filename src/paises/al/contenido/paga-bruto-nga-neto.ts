import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "al.paga-bruto-nga-neto",
  h1: "Kalkulator neto në bruto {{anio}}",
  title: "Nga paga neto te paga bruto {{anio}}: sa duhet në kontratë",
  description: "Dini sa doni të merrni në dorë? Llogaritni pagën bruto me kontributet {{al.kontribute[shoqerore-punonjes]}} shoqërore, tatimin dhe zbritjen e nenit 22.",
  intro: [
    "Kur negocioni një punë ose hartoni një kontratë, shpesh dihet paga neto dhe mungon bruto. Ky kalkulator kthen llogaritjen: vendosni pagën neto që dëshironi dhe merrni pagën bruto që duhet shkruar në kontratë.",
    "Përdoren të njëjtat rregulla si te paga e zakonshme: paga minimale {{al.paga-minimale}}, kontributet mbi pagën bruto dhe tatimi {{al.tatim-punesim[0].tasa}} ose {{al.tatim-punesim[1].tasa}} mbi bazën pas zbritjes.",
  ],
  comoSeCalcula: [
    "Për çdo pagë bruto llogariten sigurimet shoqërore {{al.kontribute[shoqerore-punonjes]}}, sigurimet shëndetësore {{al.kontribute[shendetesore-punonjes]}} dhe tatimi mbi bazën pas zbritjes.",
    "Kalkulatori kërkon pagën bruto më të ulët që arrin pagën neto të kërkuar, në lekë të plota.",
    "Paga bruto nuk zbret dot nën pagën minimale {{al.paga-minimale}}, për punë me kohë të plotë.",
  ],
  ejemplo: [
    "Doni 79 700 lekë neto në muaj. Kalkulatori jep 100 000 lekë bruto: 9 500 lekë shkojnë te sigurimet shoqërore, 1 700 lekë te ato shëndetësore dhe 9 100 lekë te tatimi. Për punëdhënësin kostoja është 116 700 lekë.",
  ],
  faq: [
    {
      pregunta: "Pse dy paga bruto të ndryshme mund të japin të njëjtën neto?",
      respuesta: "Zbritja e nenit 22 bie me shkallë te kufijtë {{al.zbritje-personale[kufi-1]}} dhe {{al.zbritje-personale[kufi-2]}}. Për shembull, 59 142 dhe 60 001 lekë bruto japin të dyja 49 381 lekë neto. Kalkulatori tregon më të ulëtën, sepse punëdhënësit i kushton më pak.",
    },
    {
      pregunta: "A mund të jetë bruto më e ulët se paga minimale?",
      respuesta: "Për punë me kohë të plotë jo: VKM nr. 776/2025 e bën të detyrueshme pagën minimale {{al.paga-minimale}} për çdo punëdhënës. Nëse kërkoni një neto më të ulët, rezultati mbetet te paga minimale.",
    },
    {
      pregunta: "A përfshihet kostoja e punëdhënësit?",
      respuesta: "Tregohet në një rresht më vete. Punëdhënësi paguan mbi bruto {{al.kontribute[shoqerore-punedhenes]}} sigurime shoqërore dhe {{al.kontribute[shendetesore-punedhenes]}} sigurime shëndetësore.",
    },
  ],
  glosario: [
    { termino: "Paga neto", definicion: "Shuma që merrni në llogari pas kontributeve dhe tatimit." },
    { termino: "Zbritja personale", definicion: "Shuma e nenit 22 që hiqet nga paga para se të llogaritet tatimi." },
  ],
});
