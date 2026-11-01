import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoLt: ContenidoUniversal = (ctx) => {
  const a = montoEjemplo(ctx, 90);
  const b = montoEjemplo(ctx, 30);
  const cuota = (a + b) / 3;
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Sąskaitos dalijimo skaičiuoklė",
    title: tituloQueEntre(`Sąskaitos dalijimas: bendrų išlaidų skaičiuoklė (${ctx.nombrePais})`, "Sąskaitos dalijimas: bendrų išlaidų skaičiuoklė", "Sąskaitos dalijimas"),
    description: "Padalykite bendras išlaidas tarp ne daugiau kaip aštuonių žmonių: kiekvieno dalis ir kas kam kiek perveda, su kuo mažiau mokėjimų.",
    intro: [
      "Tai praverčia kelionei, vakarienei, šventei ar bendrai nuomai, kai kiekvienas sumokėjo skirtingą sumą.",
      "Įveskite, kiek kas sumokėjo. Pamatysite kiekvieno dalį ir mokėjimus, po kurių neliks skolų.",
    ],
    comoSeCalcula: [
      "Dalis = bendros išlaidos ÷ asmenų skaičius.",
      "Kas sumokėjo mažiau nei savo dalį, turi primokėti skirtumą. Kas sumokėjo daugiau, skirtumą atgauna.",
      "Mokėjimai eina nuo didžiausios skolos prie didžiausios permokos, todėl nė vieno mokėjimo nėra per daug.",
    ],
    ejemplo: [
      `Rūta sumokėjo ${m(a)}, Tomas ${m(b)}, o Ieva nieko. Iš viso ${m(a + b)}, todėl kiekvieno dalis yra ${m(cuota)}.`,
      `Ieva perveda Rūtai ${m(cuota)}, o Tomas perveda Rūtai ${m(cuota - b)}.`,
    ],
    faq: [
      {
        pregunta: "Kaip padalyti sąskaitą, kai kiekvienas sumokėjo skirtingą sumą?",
        respuesta: "Sudėkite visas sumas, padalykite iš asmenų skaičiaus ir palyginkite su tuo, ką kiekvienas sumokėjo. Skirtumas parodo, kas kiek turi primokėti arba atgauti.",
      },
      {
        pregunta: "O jei kas nors nieko nesumokėjo?",
        respuesta: "Įveskite šiam asmeniui 0, kad jis taip pat dalyvautų išlaidose. Jei laukas paliktas tuščias, šis asmuo neskaičiuojamas.",
      },
      {
        pregunta: "Kodėl mokėjimų mažiau nei žmonių?",
        respuesta: "Skolos sujungiamos: didžiausią skolą turintis asmuo moka tam, kuris daugiausia permokėjo, ir taip toliau. Mokėjimų niekada nereikia daugiau, nei yra asmenų minus vienas.",
      },
    ],
    glosario: [
      { termino: "Dalis", definicion: "Kiek kiekvienas turi sumokėti iš bendrų išlaidų." },
      { termino: "Balansas", definicion: "Skirtumas tarp to, ką asmuo sumokėjo, ir jam tenkančios dalies." },
    ],
  };
};
