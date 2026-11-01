import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hu.kata-kalkulator",
  h1: "KATA kalkulátor",
  title: "KATA kalkulátor: tételes adó és különadó egy évre",
  description:
    "A KATA havonta {{hu.kata-teteles-ado}}. Az éves keret felett ({{hu.kata-keretosszeg}}) {{hu.kata-kulonado}} különadó jár. Számold ki, mennyit fizetsz egy évre.",
  intro: [
    "A kisadózó vállalkozások tételes adója (KATA) havi fix összeg: {{hu.kata-teteles-ado}}. Kiváltja a vállalkozás utáni SZJA-t, járulékot és szochót.",
    "A KATA-t csak főfoglalkozású egyéni vállalkozó választhatja. Ha kifizetőtől, például egy cégtől kap bevételt, megszűnik a kisadózói jogállása.",
  ],
  comoSeCalcula: [
    "Tételes adó = havi {{hu.kata-teteles-ado}} × a kisadózó hónapok száma. Minden megkezdett hónapért a teljes összeg jár.",
    "A keretösszeg évi {{hu.kata-keretosszeg}}. Ha nem egész évben vagy kisadózó, a keret a hónapok számával arányosan kisebb.",
    "Különadó = a keret feletti bevétel × {{hu.kata-kulonado}}.",
  ],
  ejemplo: [
    "Évi 20 000 000 Ft bevétel mellett a tételes adó 600 000 Ft. A keret feletti 2 000 000 Ft után 800 000 Ft különadó jár, így összesen 1 400 000 Ft-ot fizetsz.",
  ],
  faq: [
    {
      pregunta: "Mennyi a KATA havonta?",
      respuesta: "A tételes adó havonta {{hu.kata-teteles-ado}}, a kisadózás minden megkezdett hónapjára.",
    },
    {
      pregunta: "Mi történik, ha átlépem a bevételi határt?",
      respuesta: "A keretösszeg feletti bevétel után {{hu.kata-kulonado}} különadót kell fizetni. A különadót a következő év február huszonötödikéig kell bevallani és megfizetni.",
    },
    {
      pregunta: "Kell KATA-t fizetni táppénz vagy CSED alatt?",
      respuesta: "Arra a teljes hónapra nem, amelyet végig táppénz, csecsemőgondozási díj vagy hasonló ellátás fed le, ha közben nem végzel vállalkozói tevékenységet.",
    },
  ],
  glosario: [
    { termino: "Kisadózó", definicion: "Az az egyéni vállalkozó, aki a KATA-t választotta." },
    { termino: "Keretösszeg", definicion: "Az éves bevétel, ameddig nem kell különadót fizetni." },
  ],
});
