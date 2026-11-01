import { aplicarEscala, definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { olajsavaOtroci } from "../lib/placa";

export default definirCalculadora({
  id: "si.kalkulator-dohodnine",
  mercado: "si",
  concepto: "impuesto-renta",
  slug: "kalkulator-dohodnine",
  estado: "publicado",
  requiere: {
    "si.dohodnina": "escala",
    "si.splosna-olajsava": "numero",
    "si.dodatna-olajsava-prag": "numero",
    "si.dodatna-olajsava-znesek": "numero",
    "si.dodatna-olajsava-faktor": "numero",
    "si.olajsava-do-29": "numero",
    "si.olajsava-otroci": "mapa",
    "si.prispevki-delavec": "mapa",
    "si.ozp": "numero",
  },
  campos: [
    { id: "dohodek", tipo: "moneda", etiqueta: "Letni bruto dohodek iz zaposlitve", min: 0, porDefecto: 30000 },
    { id: "prispevki", tipo: "moneda", etiqueta: "Plačani prispevki v letu", min: 0, requerido: false, ayuda: "Znesek je na informativnem izračunu. Če polje pustite prazno, ga ocenimo iz stopenj in OZP." },
    { id: "otroci", tipo: "entero", etiqueta: "Število vzdrževanih otrok", min: 0, max: 15, porDefecto: 0 },
    { id: "do29", tipo: "si-no", etiqueta: "V tem letu dopolnite največ 29 let", porDefecto: false },
    { id: "akontacija", tipo: "moneda", etiqueta: "Med letom plačana akontacija", min: 0, requerido: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.dohodek <= 0) throw new ErrorEntrada("Vnesite letni dohodek, večji od nič.", "dohodek");
    const m = v["si.prispevki-delavec"];
    const stopnja = Object.values(m).reduce((a, b) => a + b, 0);
    const prispevki = e.prispevki ?? redondear(porcentaje(e.dohodek, stopnja) + v["si.ozp"] * 12);
    const dodatna = e.dohodek < v["si.dodatna-olajsava-prag"] ? Math.max(0, v["si.dodatna-olajsava-znesek"] - v["si.dodatna-olajsava-faktor"] * e.dohodek) : 0;
    const olajsave = redondear(v["si.splosna-olajsava"] + dodatna + olajsavaOtroci(e.otroci, v["si.olajsava-otroci"]) + (e.do29 ? v["si.olajsava-do-29"] : 0));
    const osnova = redondear(Math.max(0, e.dohodek - prispevki - olajsave));
    const dohodnina = redondear(aplicarEscala(v["si.dohodnina"], osnova));
    const placano = e.akontacija;
    return {
      dohodnina,
      prispevki,
      olajsave,
      osnova,
      povprecna: redondear((dohodnina / e.dohodek) * 100),
      razlika: placano === null ? null : redondear(dohodnina - placano),
    };
  },
  resultado: [
    { clave: "dohodnina", etiqueta: "Letna dohodnina", formato: "moneda", destacada: true },
    { clave: "osnova", etiqueta: "Neto letna davčna osnova", formato: "moneda" },
    { clave: "prispevki", etiqueta: "Upoštevani prispevki", formato: "moneda" },
    { clave: "olajsave", etiqueta: "Upoštevane olajšave", formato: "moneda" },
    { clave: "povprecna", etiqueta: "Delež dohodnine v bruto dohodku", formato: "porcentaje", decimales: 1 },
    { clave: "razlika", etiqueta: "Doplačilo (znesek z minusom pomeni vračilo)", formato: "moneda" },
  ],
});
