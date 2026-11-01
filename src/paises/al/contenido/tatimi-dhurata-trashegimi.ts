import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "al.tatimi-dhurata-trashegimi",
  h1: "Tatimi mbi dhuratat dhe trashëgiminë {{anio}}",
  title: "Tatimi mbi dhuratat dhe trashëgiminë {{anio}}: {{al.tatim-dhurate}}",
  description: "Dhuratat dhe trashëgimia tatohen me {{al.tatim-dhurate}}, me përjashtime për familjen dhe deri në {{al.perjashtim-dhurate[paluajtshme]}}. Llogaritni sa duhet të paguani.",
  intro: [
    "Dhuratat dhe trashëgimia tatohen me {{al.tatim-dhurate}}, sipas nenit 60 të ligjit nr. 29/2023, pa zbritur asnjë kosto. Por shumica e rasteve në familje janë të përjashtuara.",
    "Marrësit e tjerë kanë një pjesë të përjashtuar: {{al.perjashtim-dhurate[paluajtshme]}} për pasuri të paluajtshme dhe {{al.perjashtim-dhurate[luajtshme]}} për pasuri të luajtshme.",
  ],
  comoSeCalcula: [
    "Përjashtohen plotësisht dhuratat dhe trashëgimia nga ose ndërmjet trashëgimtarëve ligjorë të radhës së parë dhe të dytë, si dhe brenda lidhjes motër dhe vëlla.",
    "Për të tjerët, kalkulatori heq shumën e përjashtuar sipas llojit të pasurisë dhe zbaton {{al.tatim-dhurate}} mbi pjesën që mbetet.",
    "Pasuria vlerësohet me vlerën nominale ose të tregut, cilado që është më e madhe, sipas pikës 6.",
  ],
  ejemplo: [
    "Një person merr dhuratë nga një mik një apartament me vlerë 8 milionë lekë. Pjesa e përjashtuar është 5 milionë lekë, kështu që 3 milionë lekë janë të tatueshme dhe tatimi është 450 000 lekë. Po të ishte dhuratë nga prindërit, tatimi do të ishte zero.",
  ],
  faq: [
    {
      pregunta: "A paguaj tatim për një dhuratë nga prindërit?",
      respuesta: "Jo. Pika 7, shkronja a, e nenit 60 përjashton trashëgimtarët ligjorë të radhës së parë dhe të dytë sipas neneve 361 deri 363 të Kodit Civil.",
    },
    {
      pregunta: "A mbulohen edhe paratë nga ky tatim?",
      respuesta: "Po. Pika 3 i quan dhurata pasurinë e luajtshme ose të paluajtshme dhe paratë e fituara pa kompensim në këmbim.",
    },
    {
      pregunta: "Si llogaritet trashëgimia me borxhe?",
      respuesta: "Sipas pikës 4, trashëgimia llogaritet pasi janë zbritur detyrimet e trashëgueshme. Vendosni në kalkulator vlerën pas këtyre detyrimeve.",
    },
  ],
  glosario: [
    { termino: "Radha e parë dhe e dytë", definicion: "Trashëgimtarët ligjorë më të afërt, sipas Kodit Civil." },
    { termino: "Pasuri e paluajtshme", definicion: "Toka, trualli dhe ndërtesat." },
  ],
});
