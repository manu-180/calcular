import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lt.npd-skaiciuokle",
  h1: "NPD {{anio}}: neapmokestinamo pajamų dydžio skaičiuoklė",
  title: "NPD {{anio}}: neapmokestinamo pajamų dydžio skaičiuoklė",
  description: "Įveskite atlyginimą ant popieriaus ir apskaičiuokite savo NPD. Skaičiuoklė taiko formulę pagal MMA ir atlyginimo dydį.",
  intro: [
    "Skaičiuoklė parodo jūsų neapmokestinamą pajamų dydį (NPD) pagal mėnesio atlyginimą.",
  ],
  comoSeCalcula: [
    "Iki MMA taikomas didžiausias NPD.",
    "Didesniam atlyginimui NPD mažėja pagal formulę, kol pasiekia nulį.",
  ],
  faq: [],
  glosario: [],
});
