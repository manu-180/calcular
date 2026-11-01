import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sk.celkova-cena-prace",
  h1: "Celková cena práce {{anio}}",
  title: "Celková cena práce {{anio}}: náklady zamestnávateľa",
  description: "Vypočítajte náklady zamestnávateľa na mzdu: sociálne poistenie, zdravotné {{sk.zdravotne-odvody[zamestnavatel]}} a strop {{sk.max-vymeriavaci-zaklad}}.",
  intro: [
    "Zamestnávateľ platí okrem hrubej mzdy zdravotné poistenie {{sk.zdravotne-odvody[zamestnavatel]}} a sociálne poistenie spolu 25,2 %. Pri mzde 1 800 eur stojí jedno pracovné miesto 2 451,60 eura mesačne.",
    "Kalkulačka rozdelí náklady na fondy a ukáže aj ročnú sumu. Nepočíta so stravným, sociálnym fondom ani s benefitmi, tie závisia od konkrétnej firmy.",
  ],
  comoSeCalcula: [
    "Nemocenské {{sk.odvody-zamestnavatel[nemocenske]}}, starobné {{sk.odvody-zamestnavatel[starobne]}}, invalidné {{sk.odvody-zamestnavatel[invalidne]}}, v nezamestnanosti {{sk.odvody-zamestnavatel[nezamestnanost]}}, garančné {{sk.odvody-zamestnavatel[garancne]}} a rezervný fond {{sk.odvody-zamestnavatel[rezervny]}} sa platia najviac zo základu {{sk.max-vymeriavaci-zaklad}}.",
    "Úrazové poistenie {{sk.odvody-zamestnavatel[urazove]}} sa platí z celej mzdy bez stropu.",
    "Zdravotné poistenie {{sk.zdravotne-odvody[zamestnavatel]}} sa počíta z celej mzdy.",
    "Každý fond sa zaokrúhľuje na cent nadol a súčet sa pripočíta k hrubej mzde.",
  ],
  ejemplo: [
    "Pri mzde 1 800 eur odvedie zamestnávateľ 453,60 eura na sociálne a 198 eur na zdravotné poistenie. Cena práce je 2 451,60 eura mesačne a 29 419,20 eura ročne.",
  ],
  faq: [
    { pregunta: "Koľko stojí zamestnávateľa minimálna mzda?", respuesta: "Pri sume {{sk.minimalna-mzda}} je to 1 246,22 eura mesačne. Sadzby sú v tabuľkách Sociálnej poisťovne a v § 38ezk zákona o zdravotnom poistení." },
    { pregunta: "Má odvod zamestnávateľa strop?", respuesta: "Sociálne poistenie okrem úrazového áno, {{sk.max-vymeriavaci-zaklad}} mesačne. Zdravotné poistenie a úrazové poistenie strop nemajú." },
    { pregunta: "Prečo tabuľka uvádza v nezamestnanosti 1 % alebo 0,5 %?", respuesta: "Časť poistného v nezamestnanosti môže ísť na financovanie podpory v čase skrátenej práce. Spolu je to stále {{sk.odvody-zamestnavatel[nezamestnanost]}}." },
  ],
  glosario: [
    { termino: "Vymeriavací základ", definicion: "Suma, z ktorej sa počítajú odvody." },
    { termino: "Rezervný fond solidarity", definicion: "Fond Sociálnej poisťovne na vyplácanie dávok, keď iným fondom chýbajú peniaze." },
  ],
});
