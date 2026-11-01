import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "is.vsk-reiknivel",
  h1: "VSK reiknivél {{anio}}: {{is.vsk[almennt]}} og {{is.vsk[laegra]}}",
  title: "VSK reiknivél {{anio}}: bæta við eða draga frá VSK",
  description: "Bættu VSK ofan á verð eða dragðu hann úr: almennt þrep {{is.vsk[almennt]}} og neðra þrep {{is.vsk[laegra]}}. Niðurstaðan sýnir upphæð með og án VSK.",
  intro: [
    "Virðisaukaskattur er {{is.vsk[almennt]}} í almennu þrepi og {{is.vsk[laegra]}} í neðra þrepi samkvæmt helstu tölum Skattsins. Sláðu inn upphæð, veldu þrep og hvort þú vilt bæta skattinum við eða draga hann úr.",
    "Afreikniprósentan segir hve stór hluti verðs með VSK er skatturinn: {{is.vsk-afreikni[almennt]}} í almennu þrepi og {{is.vsk-afreikni[laegra]}} í neðra þrepi.",
  ],
  comoSeCalcula: [
    "Ofan á verð: upphæðin er margfölduð með hlutfallinu og skatturinn lagður við.",
    "Úr verði með VSK: upphæðinni er deilt með 1,24 eða 1,11. Mismunurinn er skatturinn.",
    "Afreikniprósenta er námunduð og getur því skeikað um krónur frá nákvæmri deilingu.",
  ],
  ejemplo: [
    "Vara á 10.000 kr. án VSK kostar 12.400 kr. með {{is.vsk[almennt]}} og skatturinn er 2.400 kr. Reikningur upp á 11.100 kr. í neðra þrepi skiptist í 10.000 kr. og 1.100 kr. í VSK.",
  ],
  faq: [
    { pregunta: "Hvað er afreikniprósenta?", respuesta: "Hlutfall skattsins af verði með VSK: {{is.vsk-afreikni[almennt]}} í {{is.vsk[almennt]}} þrepi og {{is.vsk-afreikni[laegra]}} í {{is.vsk[laegra]}} þrepi." },
    { pregunta: "Af hverju er ekki hægt að draga 24% af verði með VSK?", respuesta: "Af því að skatturinn er reiknaður af verði án VSK. Af 12.400 kr. eru 24% 2.976 kr., en skatturinn er 2.400 kr." },
    { pregunta: "Hvað með endurgreiðslu á VSK við húsbyggingar?", respuesta: "Skatturinn birtir 35% endurgreiðslu vegna nýbygginga, viðhalds og endurbóta á íbúðarhúsnæði. Hún er ekki reiknuð hér." },
  ],
  glosario: [
    { termino: "VSK", definicion: "Virðisaukaskattur, neysluskattur sem leggst á verð vöru og þjónustu." },
    { termino: "Afreikniprósenta", definicion: "Hlutfall sem finnur skattinn beint úr verði með VSK." },
  ],
});
