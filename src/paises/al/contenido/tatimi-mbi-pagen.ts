import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "al.tatimi-mbi-pagen",
  h1: "Tatimi mbi pagën {{anio}}",
  title: "Tatimi mbi pagën {{anio}}: {{al.tatim-punesim[0].tasa}} dhe {{al.tatim-punesim[1].tasa}}",
  description: "Llogaritni tatimin mbi pagën me zbritjen e nenit 22, kompensimin {{al.kompensim-femije}} për fëmijë dhe zbritjen për arsimin. Shihni edhe sa mund të kërkoni mbrapsht.",
  intro: [
    "Tatimi mbi të ardhurat nga punësimi është {{al.tatim-punesim[0].tasa}} deri në {{al.tatim-punesim[0].hasta}} bazë tatimore në vit dhe {{al.tatim-punesim[1].tasa}} mbi të, sipas nenit 24 të ligjit nr. 29/2023. Paga deri në {{al.zbritje-personale[kufi-1]}} në muaj nuk paguan tatim.",
    "Punëdhënësi e mban tatimin çdo muaj. Kompensimi për fëmijët dhe zbritja për arsimin kërkohen vetëm në deklaratën vjetore: kalkulatori tregon edhe këtë diferencë.",
  ],
  comoSeCalcula: [
    "Zbritja mujore: {{al.zbritje-personale[zbritje-1]}} deri në {{al.zbritje-personale[kufi-1]}}, {{al.zbritje-personale[zbritje-2]}} deri në {{al.zbritje-personale[kufi-2]}}, {{al.zbritje-personale[zbritje-3]}} mbi këtë pagë.",
    "Tatimi mujor: {{al.tatim-punesim[0].tasa}} mbi pagën pas zbritjes. Pjesa e bazës mbi 170 000 lekë në muaj (një e dymbëdhjeta e kufirit vjetor) paguan {{al.tatim-punesim[1].tasa}}.",
    "Deklarata vjetore: nga baza hiqen {{al.kompensim-femije}} për çdo fëmijë nën 18 vjeç dhe shpenzimet për arsim, deri në {{al.zbritje-arsim}}, kur të ardhurat vjetore janë nën {{al.kufi-arsim}}.",
  ],
  ejemplo: [
    "Me pagë 90 000 lekë, baza është 60 000 lekë dhe tatimi 7 800 lekë në muaj, pra 93 600 lekë në vit. Me një fëmijë dhe 150 000 lekë shpenzime arsimi, baza vjetore bie në 572 000 lekë (zbritja e arsimit ndalet te 100 000 lekë). Tatimi vjetor del 74 360 lekë, kështu që mund të kërkoni mbrapsht 19 240 lekë.",
  ],
  faq: [
    {
      pregunta: "Kush nuk paguan tatim mbi pagën?",
      respuesta: "Kush ka pagë mujore deri në {{al.zbritje-personale[kufi-1]}}, nëse ka nënshkruar deklaratën e statusit personal. Zbritja e nenit 22 e barazon të gjithë pagën.",
    },
    {
      pregunta: "Nga sa lekë fillon tatimi {{al.tatim-punesim[1].tasa}}?",
      respuesta: "Nga baza tatimore mbi {{al.tatim-punesim[0].hasta}} në vit. Me zbritjen {{al.zbritje-personale[zbritje-3]}} në muaj, kjo i përgjigjet një page bruto prej 200 000 lekësh në muaj.",
    },
    {
      pregunta: "Kush e kërkon kompensimin për fëmijët?",
      respuesta: "Sipas nenit 23, anëtari i familjes me të ardhurat më të larta vjetore të tatueshme. Kërkohet në deklaratën vjetore, jo në listëpagesë.",
    },
    {
      pregunta: "A zbriten kontributet nga baza e tatimit?",
      respuesta: "Jo. Nenet 21 dhe 22 nuk i përmendin. Hiqet vetëm kontributi në një fond pensioni privat, sipas nenit 20, deri te paga minimale.",
    },
  ],
  glosario: [
    { termino: "Baza tatimore", definicion: "Të ardhurat pasi janë hequr zbritjet dhe kompensimet." },
    { termino: "Agjenti tatimor i listëpagesës", definicion: "Punëdhënësi që mban tatimin dhe e derdh brenda datës 20 të muajit pasardhës." },
  ],
});
