import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "al.tatimi-mbi-qirane",
  h1: "Tatimi mbi qiranë {{anio}}",
  title: "Tatimi mbi qiranë {{anio}}: {{al.tatim-investim}} pa zbritje kostosh",
  description: "Të ardhurat nga qiraja e një pasurie tatohen me {{al.tatim-investim}}. Vendosni qiranë mujore dhe shihni tatimin dhe sa ju mbetet në muaj dhe në vit.",
  intro: [
    "Të ardhurat e një individi nga qiraja e pasurive të paluajtshme janë të ardhura nga investimi dhe tatohen me {{al.tatim-investim}}, sipas nenit 24 të ligjit nr. 29/2023. Asnjë kosto nuk zbritet: as mirëmbajtja, as taksa e ndërtesës.",
    "Vendosni qiranë dhe muajt me qira. Kalkulatori jep tatimin dhe qiranë neto.",
  ],
  comoSeCalcula: [
    "Tatimi mujor: qiraja shumëzohet me {{al.tatim-investim}}.",
    "Tatimi vjetor: qiraja shumëzohet me muajt me qira dhe me {{al.tatim-investim}}.",
    "Kur qiramarrësi është biznes, ai e mban tatimin në burim dhe e derdh vetë, sipas nenit 58. Për pjesën tjetër, të ardhurat deklarohen në deklaratën vjetore.",
  ],
  ejemplo: [
    "Një apartament jepet me qira për 60 000 lekë në muaj për gjithë vitin. Tatimi është 9 000 lekë në muaj, 108 000 lekë në vit. Pronarit i mbeten 51 000 lekë në muaj, 612 000 lekë në vit.",
  ],
  faq: [
    {
      pregunta: "A zbriten shpenzimet e apartamentit nga qiraja?",
      respuesta: "Jo. Pika 4 e nenit 24 thotë se asnjë kosto nuk zbritet kundrejt të ardhurave nga investimi, përveçse kur ligji parashikon ndryshe.",
    },
    {
      pregunta: "Kush e mban tatimin kur qiramarrësi është një firmë?",
      respuesta: "Firma, si agjent i mbajtjes në burim. Neni 58 i përfshin të ardhurat nga qiradhënia kur i paguhen një individi, dhe neni 59 vendos normën {{al.tatim-investim}}.",
    },
    {
      pregunta: "A ndryshon rregulli për një biznes që jep me qira?",
      respuesta: "Po. Qiradhënia e një biznesi hyn te të ardhurat nga biznesi sipas nenit 13, jo te të ardhurat nga investimi, dhe aty zbatohen rregulla të tjera.",
    },
  ],
  glosario: [
    { termino: "Qiradhënës", definicion: "Pronari që e jep pasurinë me qira." },
    { termino: "E ardhur nga investimi", definicion: "Kategoria e ligjit që përfshin qiranë, interesin dhe dividendin e një individi." },
  ],
});
