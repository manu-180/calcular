import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "is.brutto-ur-neti",
  h1: "Brúttó úr neti {{anio}}: hvað þurfa launin að vera?",
  title: "Brúttó úr neti {{anio}}: heildarlaun út frá útborgun",
  description: "Veldu útborgun og sjáðu heildarlaunin sem þarf, með staðgreiðslu frá {{is.skattthrep-man[0].tasa}} og persónuafslætti upp á {{is.personuafslattur-man}}.",
  intro: [
    "Launin þurfa að vera talsvert hærri en útborgunin: {{is.lifeyrir-launamadur}} fer í lífeyrissjóð og staðgreiðslan er frá {{is.skattthrep-man[0].tasa}} upp í {{is.skattthrep-man[2].tasa}}, að frádregnum {{is.personuafslattur-man}} í persónuafslátt. Sláðu inn upphæðina sem þú vilt fá á reikninginn.",
    "Reiknivélin nýtist í launaviðtali, við mat á nýju starfi og þegar launagreiðandi vill vita hvað tiltekin útborgun kostar. Tölurnar gilda frá {{is.skattthrep-man#desde}}.",
  ],
  comoSeCalcula: [
    "Reiknivélin leitar að lægstu heildarlaunum sem gefa að minnsta kosti þá útborgun sem þú baðst um.",
    "Hver tilraun fer sömu leið og launaseðill: iðgjald og séreign dragast frá, skattur reiknast í þrepum og persónuafsláttur lækkar hann.",
    "Af því að þrepin hækka þarf hver viðbótarkróna í útborgun meira af heildarlaunum eftir því sem launin hækka.",
  ],
  ejemplo: [
    "Viltu fá 462.047 kr. útborgaðar? Þá þarftu um 600.000 kr. í heildarlaun: 24.000 kr. fara í iðgjald og 113.953 kr. í staðgreiðslu. Þetta er sama dæmi og Skatturinn notar í orðsendingu sinni til launagreiðenda.",
  ],
  faq: [
    { pregunta: "Af hverju getur niðurstaðan skeikað um krónu?", respuesta: "Hvert skattþrep er námundað að heilli krónu. Því geta tvær launatölur hlið við hlið gefið sömu útborgun, og reiknivélin velur þá lægri." },
    { pregunta: "Hvað gerir séreignarsparnaður við útkomuna?", respuesta: "Séreign lækkar skattstofninn um allt að {{is.sereign-hamark}} af launum, en hún kemur ekki út á reikninginn. Heildarlaunin sem þarf hækka því þegar þú bætir henni við." },
    { pregunta: "Er félagsgjald innifalið?", respuesta: "Nei. Hlutfallið fer eftir stéttarfélagi. Bættu því við útborgunina sem þú vilt fá ef þú vilt taka það með." },
  ],
  glosario: [
    { termino: "Heildarlaun", definicion: "Laun fyrir frádrátt iðgjalds og skatta, líka kölluð brúttólaun." },
    { termino: "Útborguð laun", definicion: "Það sem kemur inn á reikninginn eftir allan frádrátt, líka kallað nettólaun." },
  ],
});
