import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bj.taxe-vehicules-a-moteur",
  h1: "Taxe sur les véhicules à moteur (TVM) {{anio}} au Bénin",
  title: "Taxe sur les véhicules à moteur {{anio}} : tarifs au Bénin",
  description:
    "Trouvez la taxe annuelle de votre véhicule au Bénin selon la puissance, les places ou la charge : de {{bj.tvm-prive[jusqu-7]}} à {{bj.tvm-prive[plus-15]}} pour un véhicule privé.",
  intro: [
    "Tout véhicule à moteur d'au moins trois roues immatriculé au Bénin paie une taxe annuelle, qu'il transporte des personnes ou des marchandises. Le montant dépend de la puissance, du nombre de places ou de la charge utile.",
    "Choisissez le type de véhicule et ses caractéristiques. Le tarif de l'article 168 s'affiche, multiplié par le nombre de véhicules.",
  ],
  comoSeCalcula: [
    "Un véhicule privé paie de {{bj.tvm-prive[jusqu-7]}} (7 CV ou moins) à {{bj.tvm-prive[plus-15]}} (plus de 15 CV) selon sa puissance fiscale (article 168, paragraphe 1).",
    "Les véhicules de transport public de personnes paient de {{bj.tvm-public-personnes[0-9]}} à {{bj.tvm-public-personnes[plus-20]}} selon le nombre de places, et ceux de marchandises de {{bj.tvm-public-marchandises[jusqu-2-5]}} à {{bj.tvm-public-marchandises[plus-10]}} selon la charge (paragraphe 2). Un véhicule à trois roues paie {{bj.tvm-trois-roues}}.",
    "Les véhicules de transport privé de personnes possédés par des sociétés ou entreprises paient {{bj.tvm-societes[jusqu-7]}} jusqu'à 7 CV et {{bj.tvm-societes[plus-7]}} au-delà (paragraphe 4).",
    "La taxe est due pour l'année entière à raison des véhicules possédés au 1er janvier, et payée au plus tard le 30 avril sur présentation de la carte grise (article 169).",
  ],
  ejemplo: [
    "Une berline de 9 CV appartenant à un particulier paie 30 000 F par an. Une société qui possède deux voitures de plus de 7 CV paie 2 × 200 000 F, soit 400 000 F. Un camion de transport public de 8 tonnes paie 86 800 F.",
  ],
  faq: [
    {
      pregunta: "Quand payer la taxe sur les véhicules à moteur ?",
      respuesta: "L'article 169 du Code général des impôts fixe l'échéance au 30 avril de chaque année, sur présentation de la carte grise.",
    },
    {
      pregunta: "Un véhicule acheté en cours d'année est-il taxé à l'année entière ?",
      respuesta: "Non. Pour une première mise en circulation dans l'année, la taxe est calculée au prorata, tout trimestre entamé étant dû (article 169). Ce calculateur donne le tarif annuel.",
    },
    {
      pregunta: "Qui est exempté ?",
      respuesta: "L'article 167 exempte notamment les véhicules immatriculés au nom du corps diplomatique et consulaire, des organisations du système des Nations unies et des organismes inter-États.",
    },
  ],
  glosario: [
    { termino: "Puissance fiscale", definicion: "La puissance en chevaux (CV) inscrite sur la carte grise." },
    { termino: "Charge utile", definicion: "Le poids de marchandises que le véhicule peut transporter, inscrit sur la carte grise." },
    { termino: "Carte grise", definicion: "Le document d'immatriculation du véhicule." },
  ],
});
