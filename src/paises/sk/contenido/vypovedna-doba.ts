import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sk.vypovedna-doba",
  h1: "Výpovedná doba {{anio}}",
  title: "Výpovedná doba (lehota) {{anio}}: kedy sa končí práca",
  description: "Vypočítajte výpovednú dobu: {{sk.vypovedna-doba[zaklad]}} až {{sk.vypovedna-doba[od5]}} podľa § 62 Zákonníka práce, a presný deň skončenia pracovného pomeru.",
  intro: [
    "Výpovedná doba, ľudovo výpovedná lehota, je najmenej {{sk.vypovedna-doba[zaklad]}}. Po roku práce sa spravidla predlžuje na {{sk.vypovedna-doba[od1]}} a pri organizačných alebo zdravotných dôvodoch po piatich rokoch na {{sk.vypovedna-doba[od5]}}.",
    "Začína plynúť prvým dňom mesiaca po doručení výpovede a končí posledným dňom príslušného mesiaca. Kalkulačka preto okrem dĺžky ukáže aj konkrétny dátum.",
  ],
  comoSeCalcula: [
    "Určí sa dĺžka podľa toho, kto a z akého dôvodu dáva výpoveď a ako dlho pracovný pomer trval ku dňu doručenia.",
    "Doba plynie od prvého dňa mesiaca nasledujúceho po doručení (§ 62 ods. 7).",
    "Koniec je posledný deň posledného mesiaca výpovednej doby.",
  ],
  ejemplo: ["Ak vám zamestnávateľ doručí výpoveď z organizačných dôvodov 15. marca a pracujete tam šesť rokov, doba trvá tri mesiace od 1. apríla a pomer sa skončí 30. júna."],
  faq: [
    { pregunta: "Aká je výpovedná doba, ak dávam výpoveď ja?", respuesta: "Najmenej jeden mesiac a po roku práce najmenej {{sk.vypovedna-doba[od1]}} (§ 62 ods. 2 a 6)." },
    { pregunta: "Môžem odísť skôr?", respuesta: "Dohodou so zamestnávateľom áno. Ak len odídete a v pracovnej zmluve je písomná dohoda, zamestnávateľ môže žiadať peňažnú náhradu (§ 62 ods. 8)." },
    { pregunta: "Započítavajú sa opakované zmluvy na určitú dobu?", respuesta: "Áno, ak na seba bezprostredne nadväzujú u toho istého zamestnávateľa (§ 62 ods. 5)." },
  ],
  glosario: [
    { termino: "Výpovedná doba", definicion: "Čas medzi doručením výpovede a skončením pracovného pomeru." },
    { termino: "Organizačné dôvody", definicion: "Dôvody podľa § 63 ods. 1 písm. a) a b) Zákonníka práce." },
  ],
});
