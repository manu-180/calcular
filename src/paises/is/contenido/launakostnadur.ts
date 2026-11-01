import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "is.launakostnadur",
  h1: "Launakostnaður launagreiðanda {{anio}}",
  title: "Launakostnaður {{anio}}: mótframlag og tryggingagjald",
  description: "Reiknaðu heildarkostnað launagreiðanda: {{is.lifeyrir-motframlag}} mótframlag í lífeyrissjóð og {{is.tryggingagjald}} tryggingagjald ofan á launin.",
  intro: [
    "Launagreiðandi greiðir {{is.lifeyrir-motframlag}} mótframlag í lífeyrissjóð og {{is.tryggingagjald}} tryggingagjald ofan á heildarlaun. Launakostnaðurinn er því alltaf hærri en talan á ráðningarsamningnum.",
    "Tryggingagjaldið er {{is.tryggingagjald-sjomenn}} af launum sjómanna á fiskiskipum. Hlutföllin koma úr orðsendingu Skattsins til launagreiðenda og gilda frá {{is.tryggingagjald#desde}}.",
  ],
  comoSeCalcula: [
    "Mótframlag í lífeyrissjóð er {{is.lifeyrir-motframlag}} af heildarlaunum.",
    "Ef launagreiðandi greiðir líka í séreign leggst það ofan á. Hlutfallið kemur úr kjarasamningi eða ráðningarsamningi, og þú slærð það inn.",
    "Tryggingagjald reiknast af launum og mótframlagi saman, eins og í dæmi Skattsins.",
    "Launakostnaður er summan af öllu þessu. Orlofslaun og aðrar greiðslur samkvæmt kjarasamningum eru ekki taldar með.",
  ],
  ejemplo: [
    "Með 600.000 kr. í laun er mótframlagið 69.000 kr. Tryggingagjald af 669.000 kr. er 42.482 kr. Launakostnaðurinn er því 711.482 kr. á mánuði, sem eru um 18,6% ofan á launin. Þetta eru sömu tölur og í dæmi Skattsins.",
  ],
  faq: [
    { pregunta: "Hvað er tryggingagjaldið hátt?", respuesta: "Til staðgreiðslu er það {{is.tryggingagjald}} samkvæmt Skattinum. Inni í því er almennt gjald, atvinnutryggingagjald, gjald í Ábyrgðasjóð launa og markaðsgjald." },
    { pregunta: "Hvað er mótframlagið?", respuesta: "Orðsending Skattsins miðar við {{is.lifeyrir-motframlag}} á móti {{is.lifeyrir-launamadur}} iðgjaldi launamanns. Hægt er að breyta því í skilagrein ef greiðslur eru aðrar." },
    { pregunta: "Eru þetta öll launatengd gjöld?", respuesta: "Nei. Hér eru mótframlag og tryggingagjald. Kjarasamningar geta bætt við gjöldum í sjóði stéttarfélaga, og þau eru ekki reiknuð hér." },
  ],
  glosario: [
    { termino: "Mótframlag", definicion: "Hlutur launagreiðanda í iðgjaldi til lífeyrissjóðs." },
    { termino: "Tryggingagjald", definicion: "Launaskattur sem launagreiðandi greiðir til ríkisins." },
    { termino: "Launatengd gjöld", definicion: "Gjöld sem launagreiðandi greiðir ofan á laun." },
  ],
});
