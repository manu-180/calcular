import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "al.tatimi-per-profesionistet",
  h1: "Tatimi për profesionistët e lirë {{anio}}",
  title: "Tatimi për profesionistët {{anio}}: 0%, {{al.tatim-biznes[0].tasa}} ose {{al.tatim-biznes[1].tasa}}",
  description: "Avokat, kontabilist, inxhinier ose i vetëpunësuar? Norma është 0% deri në {{al.kufi-zero}} të ardhura. Llogaritni tatimin, kontributet dhe mbajtjen në burim.",
  intro: [
    "Një profesionist i vetëpunësuar me të ardhura bruto deri në {{al.kufi-zero}} në vit ka normë 0% deri më 31 dhjetor 2029. Gjykata Kushtetuese, me vendimin nr. 52/2024, rrëzoi trajtimin e veçantë të shërbimeve profesionale që kishte sjellë ligji nr. 29/2023.",
    "Mbi kufirin, fitimi paguan {{al.tatim-biznes[0].tasa}} dhe {{al.tatim-biznes[1].tasa}}. Kontributet paguhen në çdo rast.",
  ],
  comoSeCalcula: [
    "Shpenzimet: me qarkullim deri në {{al.kufi-regjim}} mund të zgjidhni {{al.regjim-vecante[vetepunesuar]}} të supozuara, ose fatura. Mbi këtë shifër duhen fatura.",
    "Tatimi: 0% deri në {{al.kufi-zero}} të ardhura. Mbi të, nga fitimi hiqet zbritja e nenit 22 dhe zbatohet shkalla {{al.tatim-biznes[0].tasa}} deri në {{al.tatim-biznes[0].hasta}}, pastaj {{al.tatim-biznes[1].tasa}}.",
    "Mbajtja në burim: nëse paguheni me honorar nga një tatimpagues, ai mban {{al.tatim-investim}} sipas neneve 58 dhe 59, kundrejt detyrimit përfundimtar.",
    "Kontributet minimale: {{al.kontribute-vetepunesuar[shoqerore]}} e pagës minimale dhe {{al.kontribute-vetepunesuar[shendetesore]}} e dyfishit të saj.",
  ],
  ejemplo: [
    "Një kontabiliste fiton 3 milionë lekë në vit dhe nuk mban fatura. Shpenzimet e supozuara janë 900 000 lekë, fitimi 2 100 000 lekë dhe tatimi 0. Pas kontributeve prej 178 800 lekësh i mbeten 1 921 200 lekë. Nëse paguhet me honorar, klienti mban 450 000 lekë.",
  ],
  faq: [
    {
      pregunta: "A jam i vetëpunësuar apo i punësuar?",
      respuesta: "Ligji nr. 81/2025 shtoi në nenin 12 një deklaratë të statusit të vetëpunësuarit, për të dalluar veprimtarinë e pavarur nga një marrëdhënie punësimi. Nëse rezulton punësim, të ardhurat tatohen si pagë.",
    },
    {
      pregunta: "Kur mbahet tatimi {{al.tatim-investim}} në burim?",
      respuesta: "Neni 58 përfshin honoraret dhe disa pagesa të tjera. Neni 59 vendos normën {{al.tatim-investim}}. Tatimi i mbajtur llogaritet kundrejt detyrimit përfundimtar, pra nuk është domosdoshmërisht kosto shtesë.",
    },
    {
      pregunta: "Sa janë shpenzimet e supozuara për të vetëpunësuarit?",
      respuesta: "{{al.regjim-vecante[vetepunesuar]}} e të ardhurave, sipas nenit 14. Me këtë metodë nuk lejohet zbritje tjetër përveç kompensimit personal të nenit 22.",
    },
  ],
  glosario: [
    { termino: "I vetëpunësuar", definicion: "Person fizik që punon për vete, pa marrëdhënie punësimi." },
    { termino: "Mbajtje në burim", definicion: "Tatimi që e heq ai që paguan, para se t'jua japë shumën." },
  ],
});
