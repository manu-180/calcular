import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "is.tekjuskattur",
  h1: "Tekjuskattur {{anio}}: reiknaðu skattinn á ári",
  title: "Tekjuskattur {{anio}}: skattþrep og skattur á ári",
  description: "Reiknaðu skatt ársins með þrepum frá {{is.skattthrep-ars[0].tasa}} og {{is.personuafslattur-ars}} í persónuafslátt.",
  intro: [
    "Á ársgrundvelli er {{is.skattthrep-ars[0].tasa}} greitt af fyrstu {{is.skattthrep-ars[0].hasta}} og {{is.personuafslattur-ars}} dregst frá í persónuafslátt. Efsta þrepið, {{is.skattthrep-ars[2].tasa}}, tekur við ofan við {{is.skattthrep-ars[1].hasta}}.",
    "Hlutföllin eru staðgreiðsluhlutföll, það er tekjuskattur og meðalútsvar saman. Ársmörkin koma úr orðsendingu Skattsins og gilda frá {{is.skattthrep-ars#desde}}.",
  ],
  comoSeCalcula: [
    "Lífeyrisiðgjald, {{is.lifeyrir-launamadur}}, dregst frá tekjum ef þú merkir við það.",
    "Stofninn er settur í þrepin þrjú og skatturinn lagður saman.",
    "Persónuafsláttur ársins dregst frá. Útsvar miðað við meðaltal, {{is.utsvar-stadgreidsla}}, er sýnt sérstaklega.",
    "Endanleg álagning getur vikið frá þessu: útsvar þíns sveitarfélags, fjármagnstekjur og frádráttur breyta niðurstöðunni.",
  ],
  ejemplo: [
    "Tekjur 7.200.000 kr. með 4% iðgjaldi gefa stofn upp á 6.912.000 kr. Skattur af fyrstu 5.977.470 kr. er 1.882.305 kr. og af afganginum 355.028 kr. Eftir 869.898 kr. í persónuafslátt standa 1.367.435 kr. á ári, um 19% af tekjunum.",
  ],
  faq: [
    { pregunta: "Hvernig eru börn skattlögð?", respuesta: "Börn sem ná ekki 16 ára aldri á árinu greiða 6% skatt án persónuafsláttar af tekjum umfram 300.000 kr., samkvæmt Skattinum. Reiknivélin miðar við fullorðna." },
    { pregunta: "Hvar liggja mörk skattþrepanna á ári?", respuesta: "Við {{is.skattthrep-ars[0].hasta}} og {{is.skattthrep-ars[1].hasta}}. Skatturinn reiknar vikumörk út frá þessum ársmörkum í orðsendingu sinni." },
    { pregunta: "Hvað er útsvarið?", respuesta: "Í staðgreiðslu er notað meðalútsvar allra sveitarfélaga, {{is.utsvar-stadgreidsla}}. Þetta er fyrirframgreiðsla, svo að fjárhæðin getur breyst við álagningu." },
    { pregunta: "Eru fjármagnstekjur með?", respuesta: "Nei. Af þeim er greiddur sérstakur fjármagnstekjuskattur: notaðu reiknivélina fyrir hann." },
  ],
  glosario: [
    { termino: "Skattstofn", definicion: "Tekjur eftir frádrátt iðgjalds í lífeyrissjóð." },
    { termino: "Álagning", definicion: "Endanlegt uppgjör skatta eftir skattframtal." },
  ],
});
