import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "al.pagesa-e-semundjes",
  h1: "Pagesa e sëmundjes {{anio}}",
  title: "Pagesa e sëmundjes {{anio}}: {{al.semundje[deri-10]}} ose {{al.semundje[mbi-10]}}",
  description: "E ardhura për sëmundje është {{al.semundje[deri-10]}} ose {{al.semundje[mbi-10]}} e pagës neto mesatare. Llogaritni sa paguan punëdhënësi dhe sa ISSH me raport mjekësor.",
  intro: [
    "Me raport mjekësor merrni {{al.semundje[deri-10]}} të mesatares ditore neto të gjashtë muajve të fundit, ose {{al.semundje[mbi-10]}} nëse keni mbi 10 vjet sigurim, sipas nenit 22 të ligjit nr. 7703/1993.",
    "Ditët e para i paguan punëdhënësi dhe pjesën tjetër ISSH. Kalkulatori i ndan të dyja, për të kuptuar kë duhet të pyesni.",
  ],
  comoSeCalcula: [
    "Mesatarja ditore: paga neto mesatare e gjashtë muajve të fundit, e ndarë me 30 ditë.",
    "Norma: {{al.semundje[deri-10]}} deri në 10 vjet sigurim, {{al.semundje[mbi-10]}} mbi 10 vjet. Në spital, kur nuk keni njeri në ngarkim, {{al.semundje[spital]}}.",
    "Deri në {{al.semundje-dite-punedhenes}} e para paguan punëdhënësi (neni 25). Nga dita e 15-të paguan sigurimi (neni 23).",
    "Periudha zgjat deri në 6 muaj nga fillimi i pagesës, me mundësi për 3 muaj të tjerë me vendim të komisionit mjekësor.",
  ],
  ejemplo: [
    "Me pagë neto 44 400 lekë dhe mbi 10 vjet sigurim, pagesa është 1 184 lekë në ditë. Për 20 ditë raport merrni 23 680 lekë: 16 576 lekë nga punëdhënësi për 14 ditët e para dhe 7 104 lekë nga ISSH.",
  ],
  faq: [
    {
      pregunta: "Kush e paguan raportin mjekësor?",
      respuesta: "Për {{al.semundje-dite-punedhenes}} e para punëdhënësi, sipas nenit 25, jo më pak se pagesat e ligjit. Nga dita e 15-të paguan ISSH, sipas nenit 23.",
    },
    {
      pregunta: "Sa zgjat e ardhura për sëmundje?",
      respuesta: "Jo më shumë se 6 muaj nga dita e fillimit të pagesës. Komisioni i mjekëve ekspertë (KMCAP) mund ta zgjasë deri në 3 muaj të tjerë, nëse provon se personi do të shërohet.",
    },
    {
      pregunta: "Si llogariten ditët për punonjësit sezonalë?",
      respuesta: "Për punonjësit sezonalë dhe të përkohshëm me të paktën 3 muaj punë në 12 muajt e fundit, periudha është deri në 75 ditë, sipas pikës 4 të nenit 23.",
    },
  ],
  glosario: [
    { termino: "Paaftësi e përkohshme", definicion: "Periudha kur nuk mund të punoni për shkak sëmundjeje, me raport mjekësor." },
    { termino: "KMCAP", definicion: "Komisioni Mjekësor i Caktimit të Aftësisë për Punë." },
  ],
});
