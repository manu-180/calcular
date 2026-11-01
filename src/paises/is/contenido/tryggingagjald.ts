import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "is.tryggingagjald",
  h1: "Tryggingagjald {{anio}}: reiknaðu gjaldið af launum",
  title: "Tryggingagjald {{anio}}: {{is.tryggingagjald}} af launum",
  description: "Tryggingagjald er {{is.tryggingagjald}} og {{is.tryggingagjald-sjomenn}} af launum sjómanna á fiskiskipum. Sláðu inn launin og sjáðu fjárhæðina.",
  intro: [
    "Tryggingagjald til staðgreiðslu er {{is.tryggingagjald}} af launagreiðslum og {{is.tryggingagjald-sjomenn}} af launum sjómanna á fiskiskipum. Launagreiðandi greiðir það ofan á launin, og það sést ekki á launaseðlinum sem frádráttur.",
    "Hlutfallið gildir frá {{is.tryggingagjald#desde}} samkvæmt orðsendingu Skattsins. Þar reiknast gjaldið af launum og mótframlagi í lífeyrissjóð saman.",
  ],
  comoSeCalcula: [
    "Gjaldstofninn er launin, að viðbættu {{is.lifeyrir-motframlag}} mótframlagi ef þú lætur það fylgja.",
    "Stofninn er margfaldaður með hlutfallinu og námundaður að heilli krónu.",
    "Sjómenn á fiskiskipum: hlutfallið hækkar vegna iðgjalds til slysatryggingar.",
  ],
  ejemplo: [
    "Laun 600.000 kr. með 69.000 kr. mótframlagi gefa stofn upp á 669.000 kr. Gjaldið er 6,35% af því, eða 42.482 kr. Sjómaður á fiskiskipi: 7% gefa 46.830 kr.",
  ],
  faq: [
    { pregunta: "Hvernig skiptist gjaldið?", respuesta: "Orðsending Skattsins sundurliðar það svona: almennt tryggingagjald 4,90%, atvinnutryggingagjald 1,35%, gjald í Ábyrgðasjóð launa 0,05% og markaðsgjald 0,05%." },
    { pregunta: "Úr hverju er tryggingagjaldið sett saman?", respuesta: "Almennt tryggingagjald, atvinnutryggingagjald, gjald í Ábyrgðasjóð launa og markaðsgjald, samtals {{is.tryggingagjald}} til staðgreiðslu." },
    { pregunta: "Hefur hlutfallið breyst?", respuesta: "Skatturinn birtir sömu tölu, {{is.tryggingagjald}}, fyrir árin 2022 til 2026 í helstu tölum sínum." },
    { pregunta: "Hverjir eru með aðrar reglur?", respuesta: "Um laun starfsmanna með vottorð A1 gilda sérstakar reglur, samkvæmt orðsendingu Skattsins. Þau eru ekki reiknuð hér." },
  ],
  glosario: [
    { termino: "Gjaldstofn", definicion: "Fjárhæðin sem hlutfallið reiknast af." },
    { termino: "Ábyrgðasjóður launa", definicion: "Sjóður sem tryggir launakröfur við gjaldþrot." },
  ],
});
