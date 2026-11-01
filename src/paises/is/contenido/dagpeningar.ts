import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "is.dagpeningar",
  h1: "Dagpeningar innanlands {{anio}}: reiknaðu fjárhæðina",
  title: "Dagpeningar innanlands {{anio}}: gisting og fæði",
  description: "Dagpeningar innanlands fyrir gistingu og fæði eru {{is.dagpeningar[gisting-faedi]}} á sólarhring. Veldu tegund og fjölda daga og sjáðu samtals.",
  intro: [
    "Núgildandi dagpeningar innanlands eru {{is.dagpeningar[gisting-faedi]}} fyrir gistingu og fæði í einn sólarhring, {{is.dagpeningar[gisting]}} fyrir gistingu eina nótt og {{is.dagpeningar[heill]}} fyrir fæði heilan dag. Þeir gilda frá {{is.dagpeningar#desde}}.",
    "Fjárhæðirnar breytast yfir árið. Skatturinn birtir sérstakar tölur fyrir janúar til maí, júní til september og frá október, og reiknivélin notar þá sem gildir í dag.",
  ],
  comoSeCalcula: [
    "Veldu tegund: gisting og fæði, gisting eingöngu, fæði heilan dag eða fæði hálfan dag.",
    "Fjárhæðin er margfölduð með fjölda daga eða nátta.",
    "Heill dagur krefst ferðar sem er að minnsta kosti 10 klukkustundir og hálfur dagur að minnsta kosti 6 klukkustundir.",
  ],
  ejemplo: [
    "Tveir sólarhringar með gistingu og fæði í nóvember kosta 84.200 kr. (42.100 kr. á sólarhring). Þrír heilir dagar af fæði í júlí voru 54.300 kr. (18.100 kr. á dag).",
  ],
  faq: [
    { pregunta: "Hvað eru dagpeningar fyrir hálfan dag?", respuesta: "{{is.dagpeningar[halfur]}} eins og er, fyrir ferð sem er að minnsta kosti 6 klukkustundir." },
    { pregunta: "Af hverju eru dagpeningar hærri á sumrin?", respuesta: "Skatturinn birtir hærri gistifjárhæð fyrir júní til september. Tölurnar endurspeglast í töflu hans fyrir árið." },
    { pregunta: "Hvað með ferðir til útlanda?", respuesta: "Dagpeningar erlendis eru birtir í SDR í sömu töflu Skattsins og eru ekki reiknaðir hér." },
  ],
  glosario: [
    { termino: "Dagpeningar", definicion: "Greiðslur fyrir kostnað á ferðum á vegum vinnu." },
    { termino: "SDR", definicion: "Reiknieining Alþjóðagjaldeyrissjóðsins, notuð fyrir dagpeninga erlendis." },
  ],
});
