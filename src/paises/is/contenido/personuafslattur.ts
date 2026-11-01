import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "is.personuafslattur",
  h1: "Persónuafsláttur {{anio}} og skattleysismörk",
  title: "Persónuafsláttur {{anio}}: fjárhæð og skattleysismörk",
  description: "Persónuafsláttur er {{is.personuafslattur-man}} á mánuði og {{is.personuafslattur-ars}} á ári. Reiknaðu hann fyrir launatímabil og sjáðu skattleysismörkin.",
  intro: [
    "Persónuafslátturinn er {{is.personuafslattur-man}} á mánuði og {{is.personuafslattur-ars}} á ári frá {{is.personuafslattur-ars#desde}}. Hann dregst frá reiknuðum skatti og lækkar staðgreiðsluna um þessa fjárhæð.",
    "Veldu launatímabil og nýtingu. Skatturinn gefur fastar fjárhæðir fyrir mánuð, hálfan mánuð, fjórtán daga og viku, en önnur tímabil eru reiknuð eftir dagafjölda.",
  ],
  comoSeCalcula: [
    "Fyrir mánuð er fjárhæðin {{is.personuafslattur-timabil[man]}}, hálfan mánuð {{is.personuafslattur-timabil[halfur]}}, fjórtán daga {{is.personuafslattur-timabil[fjortan]}} og viku {{is.personuafslattur-timabil[vika]}}.",
    "Fyrir önnur tímabil: {{is.personuafslattur-ars}} margfaldað með dagafjölda og deilt með 365.",
    "Skattleysismörkin eru launin þar sem reiknaður skattur í fyrsta þrepi, {{is.skattthrep-man[0].tasa}}, jafnast á við afsláttinn, að teknu tilliti til {{is.lifeyrir-launamadur}} iðgjalds.",
  ],
  ejemplo: [
    "Með fullri nýtingu á mánuði eru skattleysismörkin 72.492 / 31,49% / 0,96, eða um 239.798 kr. Laun undir þeirri fjárhæð bera enga staðgreiðslu. Launatímabil upp á 10 daga gefur 869.898 x 10 / 365, eða 23.833 kr.",
  ],
  faq: [
    { pregunta: "Get ég nýtt persónuafslátt maka?", respuesta: "Já. Ónýttan afslátt maka má nýta að fullu, 100%, á árinu samkvæmt Skattinum. Skrifaðu 200 í nýtingu ef þú nýtir allan afslátt maka ofan á þinn eigin." },
    { pregunta: "Hvað ef ég er með fleiri en eitt starf?", respuesta: "Skiptu nýtingunni á milli launagreiðenda. Samanlagt notar þú ekki meira en þinn afslátt nema afsláttur maka bætist við." },
    { pregunta: "Fá börn persónuafslátt?", respuesta: "Börn sem ná ekki 16 ára aldri á árinu greiða 6% skatt án persónuafsláttar af tekjum umfram 300.000 kr., samkvæmt orðsendingu Skattsins." },
  ],
  glosario: [
    { termino: "Nýting", definicion: "Hve stór hluti afsláttarins er notaður hjá þessum launagreiðanda." },
    { termino: "Skattleysismörk", definicion: "Laun sem bera enga staðgreiðslu eftir persónuafslátt." },
  ],
});
