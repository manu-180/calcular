import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "zz-et.bono",
  h1: "Zetamaa poolaasta preemia kalkulaator",
  title: "Poolaasta preemia Zetamaal: arvuta, kui palju saad",
  description: "Arvuta oma poolaasta preemia sinu piirkonna kehtiva miinimumpalga ja lisatasuga (lisatasu: {{zz.bonificacion}}). Ametlikud andmed koos kuupäeva ja allikaga.",
  intro: [
    "Poolaasta preemia on lisapalk, mida makstakse kaks korda aastas.",
    "Kui töötasid terve poolaasta, saad täie kuupalga ja lisatasu (lisatasu: {{zz.bonificacion}}).",
  ],
  comoSeCalcula: [
    "Aluseks on sinu brutokuupalk. Kui see on väiksem kui sinu piirkonna miinimumpalk, kasutatakse miinimumpalka.",
    "Palk korrutatakse töötatud kuude arvuga ja jagatakse kuuega.",
    "Väikeses ettevõttes on preemia poole väiksem.",
    "Preemiale lisandub lisatasu (lisatasu: {{zz.bonificacion}}).",
  ],
  faq: [
    { pregunta: "Kui suur on miinimumpalk Põhjapiirkonnas?", respuesta: "Miinimumpalk: {{zz.minimo@norte}}. Kehtib alates: {{zz.minimo@norte#desde}}." },
    { pregunta: "Mis saab siis, kui ma ei töötanud tervet poolaastat?", respuesta: "Saad osa, mis vastab sinu töötatud kuude arvule." },
    { pregunta: "Kas lisatasu makstakse alati?", respuesta: "Jah. Lisatasu on {{zz.bonificacion}} preemiast ja ettevõte maksab selle koos preemiaga." },
  ],
  glosario: [
    { termino: "Poolaasta preemia", definicion: "Lisapalk, mida seaduse järgi makstakse juulis ja detsembris." },
    { termino: "Miinimumpalk", definicion: "Väikseim palk, mida tohib igas piirkonnas täistööaja eest maksta." },
  ],
});
