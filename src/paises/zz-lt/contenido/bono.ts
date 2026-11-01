import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "zz-lt.bono",
  h1: "Pusmečio premijos skaičiuoklė Zetalandijoje",
  title: "Pusmečio premija Zetalandijoje: kiek gausite",
  description: "Apskaičiuokite pusmečio premiją pagal savo regiono minimalų atlyginimą ir priedą {{zz.bonificacion}}, su oficialiomis reikšmėmis, data ir šaltiniu.",
  intro: [
    "Pusmečio premija yra papildomas atlyginimas, kurį darbdavys moka du kartus per metus.",
    "Jei dirbote visą pusmetį, gausite vieną mėnesinį atlyginimą ir priedą {{zz.bonificacion}}.",
  ],
  comoSeCalcula: [
    "Skaičiavimo pagrindas yra mėnesinis atlyginimas „ant popieriaus“. Jei jis mažesnis už minimalų jūsų regione, imamas minimalus atlyginimas.",
    "Šis atlyginimas padauginamas iš dirbtų mėnesių skaičiaus ir padalijamas iš šešių.",
    "Mažose įmonėse premija yra perpus mažesnė.",
    "Prie premijos pridedamas priedas {{zz.bonificacion}}.",
  ],
  faq: [
    { pregunta: "Koks minimalus atlyginimas Šiaurės regione?", respuesta: "{{zz.minimo@norte}}, galioja nuo {{zz.minimo@norte#desde}}." },
    { pregunta: "Kas, jei nedirbau viso pusmečio?", respuesta: "Gausite proporcingą dalį pagal dirbtus mėnesius." },
    { pregunta: "Ar priedas mokamas visada?", respuesta: "Taip. Tai {{zz.bonificacion}} premijos, o įmonė jį moka kartu su premija." },
  ],
  glosario: [
    { termino: "Pusmečio premija", definicion: "Papildomas atlyginimas, kurį įstatymas įpareigoja išmokėti liepą ir gruodį." },
    { termino: "Minimalus atlyginimas", definicion: "Mažiausias atlygis už visą darbo dieną kiekviename regione." },
  ],
});
