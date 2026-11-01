import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sk.priplatky-za-pracu",
  h1: "Príplatky za prácu {{anio}}",
  title: "Príplatky za sobotu, nedeľu a noc {{anio}}: výpočet",
  description: "Vypočítajte príplatky: sobota {{sk.priplatky[sobota]}}, nedeľa {{sk.priplatky[nedela]}} a noc {{sk.priplatky[noc]}} z hodinovej minimálnej mzdy {{sk.minimalna-mzda-hodinova}}.",
  intro: [
    "Príplatky za víkend a noc sa počítajú z hodinovej minimálnej mzdy {{sk.minimalna-mzda-hodinova}}. Za sobotu je to najmenej {{sk.priplatky[sobota]}}, za nedeľu {{sk.priplatky[nedela]}} a za noc {{sk.priplatky[noc]}}.",
    "Za sviatok patrí zvýhodnenie {{sk.priplatky[sviatok]}} vlastného priemerného zárobku. Keď stúpne minimálna mzda, rastú aj tieto príplatky.",
  ],
  comoSeCalcula: [
    "Sobota: {{sk.priplatky[sobota]}} hodinovej minimálnej mzdy za hodinu (§ 122a Zákonníka práce).",
    "Nedeľa: {{sk.priplatky[nedela]}} hodinovej minimálnej mzdy za hodinu (§ 122b).",
    "Noc: {{sk.priplatky[noc]}}, pri rizikovej práci {{sk.priplatky[noc-riziko]}} (§ 123).",
    "Sviatok: {{sk.priplatky[sviatok]}} priemerného hodinového zárobku (§ 122).",
    "Príplatky sa vyplácajú popri bežnej mzde.",
  ],
  ejemplo: ["Za osem hodín v sobotu dostanete navyše 21,04 eura. Za osem hodín v nedeľu 42,07 eura."],
  faq: [
    { pregunta: "Môže byť príplatok nižší?", respuesta: "Áno. Tam, kde sa práca pravidelne vykonáva v sobotu alebo v nedeľu, možno v kolektívnej zmluve alebo v menšej firme bez odborov v pracovnej zmluve dohodnúť 45 % za sobotu a 90 % za nedeľu. Za noc najmenej 35 %." },
    { pregunta: "Patrí príplatok vedúcim zamestnancom?", respuesta: "Nemusí. S vedúcim zamestnancom možno dohodnúť mzdu, ktorá už prihliada na takúto prácu (§ 122a ods. 4 a § 122b ods. 4)." },
    { pregunta: "Môžem si za sviatok vziať voľno?", respuesta: "Áno, ak sa dohodnete na náhradnom voľne. Hodina práce sa nahradí hodinou voľna a zvýhodnenie vtedy nepatrí (§ 122 ods. 2)." },
  ],
  glosario: [
    { termino: "Mzdové zvýhodnenie", definicion: "Príplatok k dosiahnutej mzde." },
    { termino: "Nočná práca", definicion: "Práca v noci podľa Zákonníka práce." },
  ],
});
