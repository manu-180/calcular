import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "al.biznesi-i-vogel",
  h1: "Tatimi për biznesin e vogël {{anio}}",
  title: "Biznesi i vogël {{anio}}: 0% deri në {{al.kufi-zero}}",
  description: "Individët tregtarë kanë normë 0% deri në {{al.kufi-zero}} të ardhura. Llogaritni tatimin, shpenzimet e supozuara dhe kontributet minimale të biznesit tuaj.",
  intro: [
    "Një individ tregtar me të ardhura bruto deri në {{al.kufi-zero}} në vit ka normë tatimi 0% deri më 31 dhjetor 2029. Mbi këtë kufi, fitimi tatohet me {{al.tatim-biznes[0].tasa}} deri në {{al.tatim-biznes[0].hasta}} dhe me {{al.tatim-biznes[1].tasa}} mbi të.",
    "Tatimi zero nuk i heq kontributet: i vetëpunësuari i paguan edhe me 0% tatim. Kalkulatori i tregon bashkë.",
  ],
  comoSeCalcula: [
    "Zgjidhni si i njihni shpenzimet. Me qarkullim deri në {{al.kufi-regjim}}, neni 14 lejon një regjim të veçantë me shpenzime të supozuara: {{al.regjim-vecante[prodhim]}} për prodhim, {{al.regjim-vecante[shumice]}} për shumicë, {{al.regjim-vecante[pakice]}} për pakicë, {{al.regjim-vecante[bar]}} për bare dhe {{al.regjim-vecante[sherbime]}} për shërbime.",
    "Fitimi është qarkullimi minus shpenzimet.",
    "Mbi {{al.kufi-zero}}, nga fitimi hiqet zbritja personale e nenit 22 dhe zbatohet shkalla progresive e nenit 24.",
    "Kontributet minimale: {{al.kontribute-vetepunesuar[shoqerore]}} e pagës minimale dhe {{al.kontribute-vetepunesuar[shendetesore]}} e dyfishit të saj, për 12 muaj.",
  ],
  ejemplo: [
    "Një dyqan me pakicë ka 8 milionë lekë qarkullim. Me regjimin e veçantë, shpenzimet e supozuara janë 70%, pra fitimi 2 400 000 lekë. Tatimi është 0. Kontributet janë 14 900 lekë në muaj, 178 800 lekë në vit, dhe i mbeten 2 221 200 lekë.",
  ],
  faq: [
    {
      pregunta: "Sa zgjat norma 0%?",
      respuesta: "Neni 69, pika 1, shkronja dh, e zbaton deri më 31 dhjetor 2029 për të ardhura bruto deri në 14 milionë lekë në vit.",
    },
    {
      pregunta: "Sa shpesh mund ta ndryshoj metodën e shpenzimeve?",
      respuesta: "Neni 14 lejon kalimin nga një metodë në tjetrën jo më shpesh se një herë në tre vjet. Metoda deklarohet pranë administratës tatimore.",
    },
    {
      pregunta: "A kam të drejtë për zbritje të tjera me regjimin e veçantë?",
      respuesta: "Jo. Pika 4 e nenit 14 lejon vetëm kompensimin personal të nenit 22. Fëmijët dhe arsimi nuk zbriten në këtë regjim.",
    },
  ],
  glosario: [
    { termino: "Individ tregtar", definicion: "Person fizik i regjistruar që kryen veprimtari tregtare." },
    { termino: "Regjim i veçantë", definicion: "Metoda ku shpenzimet zbriten me një përqindje fikse, pa kontroll të faturave." },
  ],
});
