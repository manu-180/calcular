import { definirCalculadora, ErrorEntrada, enMapa } from "@/motor/calculo";
import { cistaMzda } from "../lib/mzda";
import { parametreMzdy, REQUIERE_MZDY } from "../lib/parametre";

export default definirCalculadora({
  id: "sk.minimalna-mzda",
  mercado: "sk",
  concepto: "salario-minimo",
  slug: "minimalna-mzda",
  estado: "publicado",
  requiere: {
    ...REQUIERE_MZDY,
    "sk.minimalna-mzda": "numero",
    "sk.minimalna-mzda-hodinova": "numero",
    "sk.minimalna-mzda-2020": "numero",
    "sk.koeficienty-stupnov": "mapa",
  },
  campos: [
    { id: "stupen", tipo: "opcion-dato", dato: "sk.koeficienty-stupnov", etiqueta: "Stupeň náročnosti práce", porDefecto: "s1" },
    { id: "hodiny", tipo: "numero", etiqueta: "Týždenný pracovný čas v hodinách", min: 1, max: 40, porDefecto: 40 },
  ],
  calcular(e, v, { redondear }) {
    if (e.hodiny <= 0 || e.hodiny > 40) throw new ErrorEntrada("Zadajte týždenný pracovný čas od 1 do 40 hodín.", "hodiny");
    const mm = v["sk.minimalna-mzda"];
    const mm20 = v["sk.minimalna-mzda-2020"];
    const narok40 = mm - mm20 + mm20 * enMapa(v["sk.koeficienty-stupnov"], e.stupen);
    const mesacne = redondear((narok40 * e.hodiny) / 40);
    const zaHodinu = Math.round((narok40 / 174) * 1000) / 1000;
    const cista = cistaMzda(mesacne, 0, 0, true, parametreMzdy(v)).cista;
    return { mesacne, zaHodinu, cista };
  },
  resultado: [
    { clave: "mesacne", etiqueta: "Minimálny mzdový nárok za mesiac", formato: "moneda", destacada: true },
    { clave: "zaHodinu", etiqueta: "Za hodinu pri 40 hodinách týždenne", formato: "moneda", decimales: 3 },
    { clave: "cista", etiqueta: "Čistá mzda bez detí", formato: "moneda" },
  ],
});
