import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "zz-sq.bono",
  h1: "Kalkulator i bonusit gjashtëmujor në Zetalandë",
  title: "Bonusi gjashtëmujor në Zetalandë: sa merrni",
  description: "Llogaritni bonusin gjashtëmujor me pagën minimale të rajonit tuaj dhe shtesën prej {{zz.bonificacion}}, me vlerat zyrtare, datën dhe burimin.",
  intro: [
    "Bonusi gjashtëmujor është një pagë shtesë që punëdhënësi e paguan dy herë në vit.",
    "Nëse keni punuar gjithë gjashtëmujorin, merrni një pagë mujore dhe një shtesë prej {{zz.bonificacion}}.",
  ],
  comoSeCalcula: [
    "Llogaritja nis nga paga bruto mujore. Nëse është më e ulët se paga minimale e rajonit tuaj, merret paga minimale.",
    "Kjo pagë shumëzohet me numrin e muajve që keni punuar dhe pjesëtohet me gjashtë.",
    "Në shoqëritë e vogla bonusi është sa gjysma.",
    "Mbi bonusin shtohet shtesa prej {{zz.bonificacion}}.",
  ],
  faq: [
    { pregunta: "Sa është paga minimale në Rajonin e Veriut?", respuesta: "{{zz.minimo@norte}}, në fuqi nga {{zz.minimo@norte#desde}}." },
    { pregunta: "Çfarë ndodh nëse në gjashtëmujor nuk keni punuar gjashtë muaj të plotë?", respuesta: "Merrni një pjesë proporcionale, sipas numrit të muajve që keni punuar." },
    { pregunta: "A paguhet gjithmonë shtesa?", respuesta: "Po. Është {{zz.bonificacion}} e bonusit dhe shoqëria e paguan bashkë me bonusin." },
  ],
  glosario: [
    { termino: "Bonusi gjashtëmujor", definicion: "Pagë shtesë që ligji e kërkon të paguhet në korrik dhe në dhjetor." },
    { termino: "Paga minimale", definicion: "Shpërblimi më i ulët për punë me kohë të plotë në çdo rajon." },
  ],
});
