import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ee.uletunnitoo",
  h1: "Ületunnitöö tasu kalkulaator",
  title: "Ületunnitöö tasu {{anio}}: kordajad, öötöö ja riigipüha",
  description: "Arvuta ületunnitöö tasu: {{ee.uletunni-kordaja}}-kordne palk rahas, öötöö {{ee.ootoo-kordaja}}-kordne ja riigipühal {{ee.riigipuha-kordaja}}-kordne. Näed kogu lisatasu.",
  intro: [
    "Ületunnitöö hüvitamisel rahas maksab tööandja {{ee.uletunni-kordaja}}-kordset töötasu (töölepingu seadus, § 44). Kui kokkulepet raha kohta ei ole, hüvitatakse ületunnid vaba ajaga samas ulatuses.",
    "Öötöö eest ajavahemikul 22.00 kuni 6.00 on tasu {{ee.ootoo-kordaja}}-kordne ja riigipühal tehtud töö eest {{ee.riigipuha-kordaja}}-kordne (§ 45). Kalkulaator liidab need kokku ja näitab, kui palju kuupalk suureneb.",
  ],
  comoSeCalcula: [
    "Tunnitasu on brutopalk jagatud kuu kokkulepitud töötundidega.",
    "Ületundide tasu on tunnitasu korda ületunnid korda {{ee.uletunni-kordaja}}.",
    "Öötöö lisa arvutame osana, mis kordajast üle ühe jääb, sest tavaline tunnitasu on juba kuupalgas. Sama loogika on riigipüha lisaga.",
    "Lisatasust peetakse kinni samad maksud nagu palgast.",
  ],
  ejemplo: [
    "Palk 2000 eurot, 168 töötundi kuus: tunnitasu on 11,90 eurot. Kümne ületunni eest tuleb 178,57 eurot.",
    "Kui kuus on lisaks 8 tundi ööajal ja 8 tundi riigipühal, lisandub 23,81 ja 95,24 eurot. Kokku on lisatasu 297,62 eurot ja kuu palk 2297,62 eurot bruto.",
  ],
  faq: [
    {
      pregunta: "Kas tööandja võib ületunde nõuda?",
      respuesta: "Tavaliselt ainult kokkuleppel. Ettenägematute asjaolude tõttu, eelkõige kahju ärahoidmiseks, võib seda hea usu põhimõttel nõuda, kuid mitte alaealiselt, rasedalt ega emapuhkuse õigusega töötajalt (§ 44).",
    },
    {
      pregunta: "Kas ületunde võib hüvitada vaba ajaga?",
      respuesta: "Jah. See on seaduse järgi vaikimisi lahendus: vaba aeg samas ulatuses. Rahaline hüvitis tuleb eraldi kokku leppida ja siis on see {{ee.uletunni-kordaja}}-kordne.",
    },
    {
      pregunta: "Kui palju tohib töötada?",
      respuesta: "Tööaeg ei tohi ületada keskmiselt 48 tundi seitsmepäevase ajavahemiku kohta kuni neljakuulise arvestusperioodi jooksul, kui seadus ei näe ette teisiti (§ 46).",
    },
  ],
  glosario: [
    { termino: "Ületunnitöö", definicion: "Töö üle kokkulepitud tööaja." },
    { termino: "Ööaeg", definicion: "Kell 22.00 kuni 6.00." },
    { termino: "Summeeritud tööaeg", definicion: "Tööaja arvestus arvestusperioodi kaupa." },
  ],
});
