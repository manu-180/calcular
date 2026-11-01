import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "al.kalkulator-page",
  h1: "Kalkulator page neto {{anio}}",
  title: "Kalkulator page {{anio}}: nga paga bruto te paga neto",
  description: "Llogaritni pagën neto me tatimin mbi pagën dhe kontributet, nga paga minimale {{al.paga-minimale}}. Vendosni pagën bruto dhe shihni çfarë ju mbetet.",
  intro: [
    "Paga neto është ajo që merrni në llogari, pasi punëdhënësi mban sigurimet shoqërore, sigurimet shëndetësore dhe tatimin mbi pagën. Nga {{al.paga-minimale#desde}} paga minimale është {{al.paga-minimale}} në muaj. Për paga të larta, kontributi shoqëror ndalet te paga maksimale: shkruajeni në fushën e saj, sepse pa të kalkulatori llogarit mbi të gjithë pagën.",
    "Vendosni pagën bruto mujore dhe kalkulatori ndan çdo mbajtje veç e veç, për një punonjës me kohë të plotë që ka nënshkruar deklaratën e statusit personal te punëdhënësi kryesor.",
  ],
  comoSeCalcula: [
    "Sigurimet shoqërore: {{al.kontribute[shoqerore-punonjes]}} e pagës bruto, jo më pak se paga minimale dhe jo më shumë se paga maksimale, kur e vendosni.",
    "Sigurimet shëndetësore: {{al.kontribute[shendetesore-punonjes]}} e pagës bruto, pa kufi të sipërm.",
    "Baza tatimore: paga bruto minus zbritjen e nenit 22. Zbritja është {{al.zbritje-personale[zbritje-1]}} për paga deri në {{al.zbritje-personale[kufi-1]}}, {{al.zbritje-personale[zbritje-2]}} për paga deri në {{al.zbritje-personale[kufi-2]}} dhe {{al.zbritje-personale[zbritje-3]}} mbi këtë shifër.",
    "Tatimi: {{al.tatim-punesim[0].tasa}} deri në {{al.tatim-punesim[0].hasta}} bazë në vit dhe {{al.tatim-punesim[1].tasa}} mbi të. Në muaj kufiri bie te paga 200 000 lekë.",
    "Kontributet nuk zbriten nga baza e tatimit: ligji i përmend vetëm zbritjet e nenit 22.",
  ],
  ejemplo: [
    "Me pagë bruto 100 000 lekë: sigurimet shoqërore janë 9 500 lekë dhe ato shëndetësore 1 700 lekë. Baza tatimore është 70 000 lekë, pra tatimi del 9 100 lekë. Paga neto është 79 700 lekë. Punëdhënësi paguan edhe 16 700 lekë të tjera, kështu që kostoja e tij arrin në 116 700 lekë.",
  ],
  faq: [
    {
      pregunta: "Sa është paga neto me pagën minimale?",
      respuesta: "Me {{al.paga-minimale}} bruto tatimi është zero, sepse zbritja e mbulon të gjithë pagën. Mbahen vetëm kontributet: 4 750 lekë shoqërore dhe 850 lekë shëndetësore. Mbeten 44 400 lekë neto.",
    },
    {
      pregunta: "Pse një pagë pak më e lartë mund të japë më pak neto?",
      respuesta: "Zbritja e nenit 22 ulet menjëherë kur paga kalon kufirin dhe vlen për të gjithë pagën. Me 60 000 lekë bruto merrni 50 030 lekë neto, ndërsa me 60 001 lekë merrni 49 381 lekë. E njëjta gjë ndodh te kufiri {{al.zbritje-personale[kufi-1]}}.",
    },
    {
      pregunta: "Çfarë ndodh nëse punoj për dy punëdhënës?",
      respuesta: "Sipas nenit 65 të ligjit nr. 29/2023, zbritjen mujore e zbaton vetëm punëdhënësi ku keni nënshkruar deklaratën e statusit personal. Punëdhënësit e tjerë zbatojnë shkallën progresive pa zbritje, prandaj ky kalkulator vlen për pagën kryesore.",
    },
    {
      pregunta: "A ka kufi kontributi shëndetësor?",
      respuesta: "Jo. Paga maksimale vlen vetëm për kontributin shoqëror. Kontributi shëndetësor llogaritet mbi të gjithë pagën bruto, sipas Udhëzimit nr. 23/2014.",
    },
    {
      pregunta: "Sa është paga mesatare në Shqipëri?",
      respuesta: "Sipas INSTAT, paga mesatare mujore bruto në tremujorin e parë 2026 ishte {{al.paga-mesatare}}. Mund ta vendosni në kalkulator për të parë pagën neto përkatëse.",
    },
  ],
  glosario: [
    { termino: "Paga bruto", definicion: "Paga para kontributeve dhe tatimit, ajo që shkruhet në kontratë." },
    { termino: "Listëpagesa", definicion: "Deklarata mujore ku punëdhënësi raporton pagat, kontributet dhe tatimin." },
    { termino: "Deklarata e statusit personal", definicion: "Dokumenti që i lejon punëdhënësit të zbatojë zbritjen mujore." },
  ],
});
