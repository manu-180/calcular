import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "al.kosto-e-punedhenesit",
  h1: "Kostoja e punëdhënësit {{anio}}",
  title: "Kostoja e punëdhënësit {{anio}}: paga plus kontributet",
  description: "Sa kushton një punonjës në Shqipëri? Paga bruto plus {{al.kontribute[shoqerore-punedhenes]}} sigurime shoqërore dhe {{al.kontribute[shendetesore-punedhenes]}} shëndetësore. Llogaritni koston në muaj dhe në vit.",
  intro: [
    "Për çdo punonjës me kohë të plotë, punëdhënësi paguan mbi pagën bruto edhe {{al.kontribute[shoqerore-punedhenes]}} sigurime shoqërore dhe {{al.kontribute[shendetesore-punedhenes]}} sigurime shëndetësore. Me pagën minimale {{al.paga-minimale}}, kostoja arrin në 58 350 lekë në muaj.",
    "Kalkulatori jep koston për një ose disa punonjës, në muaj dhe në vit, sipas VKM nr. 77/2015.",
  ],
  comoSeCalcula: [
    "Sigurimet shoqërore: {{al.kontribute[shoqerore-punedhenes]}} e pagës bruto, brenda pagës minimale dhe pagës maksimale {{al.paga-maksimale-kontribute}}.",
    "Sigurimet shëndetësore: {{al.kontribute[shendetesore-punedhenes]}} e pagës bruto, pa kufi të sipërm.",
    "Kostoja është paga bruto plus këto dy kontribute. Pjesa e punonjësit mbahet nga paga bruto dhe nuk e rrit koston.",
  ],
  ejemplo: [
    "Për tre punonjës me 100 000 lekë bruto secili: kontributet e punëdhënësit janë 16 700 lekë për person, pra 116 700 lekë kosto për secilin. Bashkë dalin 350 100 lekë në muaj dhe 4 201 200 lekë në vit.",
  ],
  faq: [
    {
      pregunta: "Sa është kontributi i punëdhënësit në total?",
      respuesta: "Bashkë janë 16,7% e pagës bruto: {{al.kontribute[shoqerore-punedhenes]}} shoqërore dhe {{al.kontribute[shendetesore-punedhenes]}} shëndetësore. Me punonjësin, kontributi total arrin në 27,9%, siç e tregon edhe ISSH.",
    },
    {
      pregunta: "A ka tavan kostoja për paga të larta?",
      respuesta: "Pjesa shoqërore po: ndalet te paga maksimale {{al.paga-maksimale-kontribute}}. Pjesa shëndetësore vazhdon mbi të gjithë pagën.",
    },
    {
      pregunta: "Kur paguhen kontributet?",
      respuesta: "Personat juridikë i derdhin brenda datës 20 të muajit pasardhës, sipas ISSH-së. Në të njëjtin afat dorëzohet edhe listëpagesa.",
    },
    {
      pregunta: "Si llogariten kontributet për punë nën 87 orë në muaj?",
      respuesta: "VKM nr. 77/2015 ka një ndarje tjetër për këto kontrata: punëdhënësi 13,9% dhe punonjësi 9,4% për sigurimet shoqërore. Ky kalkulator llogarit kontratat mbi 87 orë.",
    },
  ],
  glosario: [
    { termino: "Paga maksimale", definicion: "Shuma mbi të cilën nuk llogariten më kontributet shoqërore." },
    { termino: "Kosto totale", definicion: "Paga bruto plus kontributet që paguan punëdhënësi." },
  ],
});
