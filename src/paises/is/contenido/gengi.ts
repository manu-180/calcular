import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "is.gengi",
  h1: "Gengi krónunnar {{anio}}: gengisreiknivél",
  title: "Gengisreiknivél: opinbert miðgengi Seðlabanka Íslands",
  description: "Umreiknaðu evrur, dali, pund, norskar og sænskar krónur og franka í íslenskar krónur með miðgengi Seðlabankans. Evran er {{is.eur}}.",
  intro: [
    "Evran var skráð á {{is.eur}} og Bandaríkjadalur á {{is.usd}} þann {{is.eur#desde}}, samkvæmt opinberu viðmiðunargengi Seðlabankans. Veldu gjaldmiðil og upphæð.",
    "Seðlabankinn birtir skráð miðgengi. Bankar og gjaldeyrisskrifstofur reikna sitt eigið kaup- og sölugengi með álagi.",
  ],
  comoSeCalcula: [
    "Úr erlendri mynt í krónur: upphæðin er margfölduð með miðgengi.",
    "Úr krónum í erlenda mynt: upphæðinni er deilt með miðgengi.",
    "Reiknivélin notar síðasta skráða gengi fyrir viðkomandi mynt.",
  ],
  ejemplo: [
    "Með miðgengi 136,000 frá 30. október 2026 kosta 100 evrur 13.600 kr. Með gengi Bandaríkjadals, 121,730, verða 12.173 kr. að 100 dölum.",
  ],
  faq: [
    { pregunta: "Hvaða dagsetning er notuð?", respuesta: "Niðurstaðan sýnir dagsetningu gengisins. Röð Seðlabankans er birt virka daga, svo að um helgar er notað síðasta skráða gildi." },
    { pregunta: "Hvað er miðgengi?", respuesta: "Miðja á milli kaup- og sölugengis. Seðlabankinn birtir það sem opinbert viðmiðunargengi, sérstaka röð fyrir hverja mynt." },
    { pregunta: "Af hverju er gengi bankans annað?", respuesta: "Bankarnir reikna eigin kaup- og sölugengi. Hér sérðu viðmiðunargengið, ekki verðið sem þú færð við kaup eða sölu." },
    { pregunta: "Hvaða myntir eru hér?", respuesta: "Evra, Bandaríkjadalur, sterlingspund, norsk króna, sænsk króna og svissneskur franki. Fleiri myntir eru skráðar hjá Seðlabankanum." },
  ],
  glosario: [
    { termino: "Viðmiðunargengi", definicion: "Opinbert gengi sem Seðlabankinn birtir." },
    { termino: "Álag", definicion: "Mismunur á viðmiðunargengi og gengi banka." },
  ],
});
