import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "al.tatimi-shitja-e-prones",
  h1: "Tatimi nga shitja e pronës {{anio}}",
  title: "Tatimi nga shitja e pronës {{anio}}: {{al.tatim-investim}} mbi fitimin",
  description: "Shitja e një apartamenti tatohet me {{al.tatim-investim}} mbi diferencën e çmimeve, me çmimin referues kur është më i lartë. Llogaritni tatimin para se të shisni.",
  intro: [
    "Kur një individ shet një pasuri të paluajtshme, paguan {{al.tatim-investim}} mbi diferencën midis çmimit të shitjes dhe çmimit të blerjes, sipas nenit 17 të ligjit nr. 29/2023. Tatimi paguhet para regjistrimit të kalimit të pronësisë.",
    "Nëse çmimi referues është më i lartë se ai i kontratës, ligji merr çmimin referues. Kjo e bën tatimin më të lartë edhe kur shitja bëhet më lirë.",
  ],
  comoSeCalcula: [
    "Çmimi i shitjes për tatim: më i larti midis çmimit të kontratës dhe çmimit referues.",
    "Fitimi: ky çmim minus çmimin e blerjes. Nëse del humbje, fitimi konsiderohet zero.",
    "Tatimi: fitimi shumëzohet me {{al.tatim-investim}}.",
    "Për pasurinë e fituar me trashëgimi ose dhurim, çmimi i blerjes është vlera e tatueshme në momentin e marrjes.",
  ],
  ejemplo: [
    "Një apartament u ble për 15 milionë lekë dhe shitet për 20 milionë lekë. Çmimi referues është 22 milionë lekë, pra fitimi llogaritet 7 milionë lekë. Tatimi është 1 050 000 lekë dhe nga shitja mbeten 18 950 000 lekë. Pa çmim referues më të lartë, tatimi do të ishte 750 000 lekë.",
  ],
  faq: [
    {
      pregunta: "Kur paguhet tatimi?",
      respuesta: "Para regjistrimit në regjistrin e pasurive të paluajtshme. Pika 7 e nenit 17 thotë se institucioni nuk e regjistron pasurinë derisa pagesa të konfirmohet.",
    },
    {
      pregunta: "Çfarë ndodh nëse shes me humbje?",
      respuesta: "Pika 4 e nenit 17 i konsideron të ardhurat zero, pra nuk paguhet tatim. Humbja nuk ulet nga të ardhura të tjera.",
    },
    {
      pregunta: "Si tatohet pasuria e trashëguar kur shitet?",
      respuesta: "Pika 3 merr si çmim blerjeje vlerën e tatueshme të pasurisë në momentin që u mor me trashëgimi, dhurim ose heqje dorë nga pronësia.",
    },
  ],
  glosario: [
    { termino: "Çmimi referues", definicion: "Çmimi që përcaktojnë aktet në fuqi për një zonë, si kufi i poshtëm për tatimin." },
    { termino: "Tjetërsim", definicion: "Kalimi i pronësisë te një person tjetër, për shembull me shitje." },
  ],
});
