import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "al.pagesa-e-barnise",
  h1: "Pagesa e barnisë dhe lindjes {{anio}}",
  title: "Pagesa e barnisë {{anio}}: {{al.barni[e-larte]}} dhe {{al.barni[e-ulet]}} e pagës",
  description: "Leja e lindjes zgjat {{al.barni-dite[gjithsej]}}, me {{al.barni[e-larte]}} dhe {{al.barni[e-ulet]}} të pagës neto mesatare. Llogaritni shumën dhe shpërblimin për lindje.",
  intro: [
    "Gruaja e siguruar me të paktën 12 muaj sigurim ka të drejtë për {{al.barni-dite[gjithsej]}} të ardhura për barrëlindje, sipas nenit 27 të ligjit nr. 7703/1993. Me më shumë se një fëmijë, periudha është {{al.barni-dite[gjithsej-shume]}}.",
    "Mbi këtë shtohet shpërblimi për lindje, {{al.shperblim-lindje}} e pagës minimale për çdo fëmijë. Kalkulatori i mbledh të gjitha.",
  ],
  comoSeCalcula: [
    "Baza: mesatarja ditore neto e 12 muajve të fundit, e ndarë këtu me 30 ditë.",
    "{{al.barni[e-larte]}} për periudhën para lindjes (të paktën {{al.barni-dite[para]}}, ose {{al.barni-dite[para-shume]}} me më shumë se një fëmijë) dhe për {{al.barni-dite[pas-e-larte]}} pas lindjes.",
    "{{al.barni[e-ulet]}} për periudhën në vazhdim, deri në mbarimin e ditëve të përfitimit.",
    "Shpërblimi për lindje: {{al.shperblim-lindje}} e pagës minimale {{al.paga-minimale}}, për çdo fëmijë të lindur, me kusht që njëri prind të ketë kontribuar një vit para lindjes.",
  ],
  ejemplo: [
    "Me pagë neto 44 400 lekë, baza ditore është 1 480 lekë. Për 185 ditë me {{al.barni[e-larte]}} merrni 219 040 lekë dhe për 180 ditë me {{al.barni[e-ulet]}} merrni 133 200 lekë. Me shpërblimin prej 25 000 lekësh, gjithsej janë 377 240 lekë.",
  ],
  faq: [
    {
      pregunta: "Sa zgjat leja e lindjes?",
      respuesta: "{{al.barni-dite[gjithsej]}} kalendarike, me minimum {{al.barni-dite[para]}} para dhe 63 ditë pas lindjes. Me më shumë se një fëmijë, {{al.barni-dite[gjithsej-shume]}}, me minimum {{al.barni-dite[para-shume]}} para lindjes.",
    },
    {
      pregunta: "A mund ta marrë lejen babai?",
      respuesta: "Pas 63 ditëve të para, të drejtën për kujdes ndaj fëmijës e ka edhe babai ose birësuesi i siguruar, nëse nëna nuk e ushtron ose nuk i plotëson kushtet, sipas pikës 7 të nenit 27.",
    },
    {
      pregunta: "Kush e merr shpërblimin për lindje?",
      respuesta: "Nëna ose babai i siguruar, me përparësi për nënën, sipas nenit 29. Paguhet vetëm një herë për çdo fëmijë dhe kërkon që njëri prej tyre të ketë kontribuar një vit para lindjes.",
    },
  ],
  glosario: [
    { termino: "Barrëlindje", definicion: "Termi i ligjit për barrën dhe lindjen e fëmijës." },
    { termino: "Shpërblim për lindje", definicion: "Pagesë e njëhershme nga sigurimet shoqërore për çdo fëmijë të lindur." },
  ],
});
