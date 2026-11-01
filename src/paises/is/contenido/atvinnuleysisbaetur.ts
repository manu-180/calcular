import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "is.atvinnuleysisbaetur",
  h1: "Atvinnuleysisbætur {{anio}}: reiknaðu greiðsluna",
  title: "Atvinnuleysisbætur {{anio}}: grunnbætur og tekjutengdar",
  description: "Grunnbætur eru {{is.atvinnuleysi-grunn[r100]}} á mánuði og tekjutengdar bætur að hámarki {{is.atvinnuleysi-hamark}}. Sláðu inn launin og sjáðu hvað þú færð.",
  intro: [
    "Grunnbætur eru {{is.atvinnuleysi-grunn[r100]}} á mánuði miðað við 100% bótarétt, og tekjutengdar bætur eru {{is.atvinnuleysi-tekjutenging}} af meðallaunum, að hámarki {{is.atvinnuleysi-hamark}}. Upphæðirnar gilda frá {{is.atvinnuleysi-hamark#desde}} og eru fyrir skatt.",
    "Með hverju barni undir 18 ára á framfæri bætast {{is.atvinnuleysi-barn}} við á mánuði.",
  ],
  comoSeCalcula: [
    "Fyrstu tvær vikurnar greiðast grunnbætur. Síðan taka við tekjutengdar bætur í þrjá mánuði, einu sinni á hverju bótatímabili.",
    "Tekjutengdar bætur miða við meðaltal heildarlauna á átta mánaða tímabili fyrir umsókn, án síðustu tveggja mánaða.",
    "Grunnbætur fylgja bótarétti: {{is.atvinnuleysi-grunn[r75]}} við 75%, {{is.atvinnuleysi-grunn[r50]}} við 50% og {{is.atvinnuleysi-grunn[r25]}} við 25%.",
    "Tekjur umfram {{is.atvinnuleysi-fritekjumark}} á mánuði skerða bæturnar. Skerðingin er ekki reiknuð hér.",
  ],
  ejemplo: [
    "Meðallaun upp á 800.000 kr. gefa 560.000 kr. í tekjutengdar bætur á mánuði. Laun upp á 1.500.000 kr. ná hámarkinu, 605.159 kr. Með einu barni bætast 15.355 kr. við.",
  ],
  faq: [
    { pregunta: "Hvenær byrja tekjutengdar bætur?", respuesta: "Eftir tvær vikur á grunnbótum, og þær standa í þrjá mánuði, einu sinni á hverju bótatímabili. Þeir sem eru á biðtíma í upphafi tímabils fá þær ekki." },
    { pregunta: "Hvað breyttist 1. júlí?", respuesta: "Vinnumálastofnun segir að frá 1. júlí 2026 styttist hámarkslengd bótatímabils úr 30 mánuðum í 24 mánuði." },
    { pregunta: "Eru bæturnar skattskyldar?", respuesta: "Allar upphæðir Vinnumálastofnunar eru fyrir skatt. Persónuafslátturinn, {{is.personuafslattur-man}}, nýtist á móti ef þú velur það." },
    { pregunta: "Hvað gerist ef tekjurnar eru hærri en frítekjumarkið?", respuesta: "Tekjur umfram {{is.atvinnuleysi-fritekjumark}} á mánuði lækka bæturnar samkvæmt Vinnumálastofnun." },
  ],
  glosario: [
    { termino: "Bótaréttur", definicion: "Hlutfall sem ákvarðar fjárhæð grunnbóta." },
    { termino: "Tekjutengdar bætur", definicion: "Hærri bætur fyrstu mánuðina, miðaðar við fyrri laun." },
  ],
});
