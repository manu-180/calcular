import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "is.faedingarorlof",
  h1: "Fæðingarorlof {{anio}}: hvað færð þú greitt?",
  title: "Fæðingarorlof {{anio}}: greiðsla á mánuði og hámark",
  description: "Greiðslan er {{is.faedingarorlof-hlutfall}} af meðallaunum, að hámarki {{is.faedingarorlof-hamark}} á mánuði. Reiknaðu greiðslu og útborgun eftir skatt.",
  intro: [
    "Í fæðingarorlofi færð þú {{is.faedingarorlof-hlutfall}} af meðaltali heildarlauna, en aldrei meira en {{is.faedingarorlof-hamark}} á mánuði, frá {{is.faedingarorlof-hamark#desde}}. Lágmarkið er {{is.faedingarorlof-lagmark[fullt]}} í 50 til 100% starfi og {{is.faedingarorlof-lagmark[hluta]}} í 25 til 49% starfi.",
    "Reiknivélin sýnir líka hvað kemur út eftir {{is.lifeyrir-launamadur}} í lífeyrissjóð og staðgreiðslu með fullum persónuafslætti. Þú ákveður hvort þú nýtir afsláttinn á þessu tímabili.",
  ],
  comoSeCalcula: [
    "Launþegar: meðaltal heildarlauna á tólf mánaða tímabili sem lýkur sex mánuðum fyrir fæðingarmánuð. Fyrir sjálfstætt starfandi er miðað við almanaksárið á undan fæðingarári.",
    "Hlutfallið er {{is.faedingarorlof-hlutfall}} af meðaltalinu, að hámarki og lágmarki sem Vinnumálastofnun birtir.",
    "Af greiðslunni fer staðgreiðsla og skylduiðgjald í lífeyrissjóð. Séreign og félagsgjald eru valkvæð.",
  ],
  ejemplo: [
    "Meðallaun upp á 1.000.000 kr. gefa 800.000 kr. á mánuði. Eftir 32.000 kr. í iðgjald og 186.894 kr. í staðgreiðslu koma 581.106 kr. út. Meðallaun upp á 1.500.000 kr. gefa hámarkið, 900.000 kr.",
  ],
  faq: [
    { pregunta: "Hvað er hámarksgreiðslan?", respuesta: "{{is.faedingarorlof-hamark}} á mánuði fyrir orlof sem nýtt er frá {{is.faedingarorlof-hamark#desde}}, samkvæmt upplýsingum Vinnumálastofnunar á Ísland.is." },
    { pregunta: "Hvað teljast tekjur?", respuesta: "Laun, þóknanir og reiknað endurgjald af íslenskum vinnumarkaði, ef greitt var af þeim tryggingagjald." },
    { pregunta: "Hvað ef ég er í minna en 25% starfi?", respuesta: "Þá getur þú sótt um fæðingarstyrk í staðinn. Fjárhæð hans er ekki hluti af þessari reiknivél." },
    { pregunta: "Hvenær þarf að taka orlofið?", respuesta: "Á fyrstu 24 mánuðum í lífi barnsins. Hvert orlofstímabil er að minnsta kosti 2 vikur, og foreldri sem ber barn tekur orlof fyrstu tvær vikurnar eftir fæðingu." },
  ],
  glosario: [
    { termino: "Viðmiðunartímabil", definicion: "Mánuðirnir sem meðaltal launa er reiknað af." },
    { termino: "Reiknað endurgjald", definicion: "Laun sem sjálfstætt starfandi reiknar sér til skatts." },
  ],
});
