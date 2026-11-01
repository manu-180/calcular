import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "is.vaxtabaetur",
  h1: "Vaxtabætur {{anio}}: reiknaðu bæturnar",
  title: "Vaxtabætur {{anio}}: útreikningur eftir vöxtum og tekjum",
  description: "Reiknaðu vaxtabætur: vaxtagjöld, {{is.vaxtabaetur-tekjur}} frádráttur af tekjum og hámark {{is.vaxtabaetur-hamark[einhleypur]}} hjá einhleypingi.",
  intro: [
    "Hámark vaxtabóta er {{is.vaxtabaetur-hamark[einhleypur]}} hjá einhleypingi, {{is.vaxtabaetur-hamark[einstaett]}} hjá einstæðu foreldri og {{is.vaxtabaetur-hamark[hjon]}} hjá hjónum. Tölurnar koma úr forsendum álagningar Skattsins og miða við vaxtagjöld og tekjur ársins á undan.",
    "Rétt á vaxtabótum eiga þeir sem greiða vexti af lánum sem tekin voru til kaupa eða byggingar á íbúðarhúsnæði til eigin nota.",
  ],
  comoSeCalcula: [
    "Vaxtagjöldin eru lægsta talan af þremur: greiddir vextir, {{is.vaxtabaetur-skuldir}} af eftirstöðvum skulda og hámark vaxtagjalda ({{is.vaxtabaetur-vaxtathak[einhleypur]}} hjá einhleypingi).",
    "Frá þessu dragast {{is.vaxtabaetur-tekjur}} af tekjum. Hjá hjónum er miðað við samanlagðar tekjur beggja.",
    "Mismunurinn skerðist hlutfallslega ef eignir að frádregnum skuldum fara yfir {{is.vaxtabaetur-eign-nedri[einhleypur]}} hjá einhleypingi, og bætur falla niður við {{is.vaxtabaetur-eign-efri[einhleypur]}}.",
    "Bætur undir {{is.vaxtabaetur-lagmark}} á mann falla niður.",
  ],
  ejemplo: [
    "Einhleypur greiðir 900.000 kr. í vexti af 20.000.000 kr. láni og hefur 6.000.000 kr. í tekjur. Hámarkið 840.000 kr. er lægst. Eftir 510.000 kr. frádrátt vegna tekna standa 330.000 kr. Með 9.750.000 kr. í hreina eign, mitt á skerðingarbilinu, verða bæturnar 165.000 kr.",
  ],
  faq: [
    { pregunta: "Hver eru eignamörk hjóna?", respuesta: "Skerðing hefst við {{is.vaxtabaetur-eign-nedri[hjon]}} og bætur falla niður við {{is.vaxtabaetur-eign-efri[hjon]}}." },
    { pregunta: "Hvað er endanleg fjárhæð?", respuesta: "Hún er ákvörðuð við álagningu út frá framtali. Fyrirfram ákvarðaðar vaxtabætur dragast frá endanlegri fjárhæð á innheimtuseðli." },
    { pregunta: "Hvaða lán gilda?", respuesta: "Þau sem koma fram í kafla 5.1 eða 5.2 á framtali, það er lán vegna kaupa eða byggingar á íbúðarhúsnæði til eigin nota." },
  ],
  glosario: [
    { termino: "Vaxtagjöld", definicion: "Greiddir vextir af íbúðarlánum á árinu." },
    { termino: "Hrein eign", definicion: "Eignir að frádregnum skuldum." },
  ],
});
