import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { cistaMzda, nahoruNaDesetihalere } from "../lib/mzda";
import { parametryMzdy, REQUIERE_MZDA } from "../lib/parametry";

export default definirCalculadora({
  id: "cz.minimalni-mzda",
  mercado: "cz",
  concepto: "salario-minimo",
  slug: "minimalni-mzda",
  estado: "publicado",
  requiere: { ...REQUIERE_MZDA, "cz.minimalni-mzda-hodinova": "numero" },
  campos: [
    {
      id: "stanovena",
      tipo: "opcion",
      etiqueta: "Stanovená týdenní pracovní doba",
      opciones: [
        { valor: "40", etiqueta: "40 hodin (běžná)" },
        { valor: "38.75", etiqueta: "38,75 hodiny (dvousměnný provoz)" },
        { valor: "37.5", etiqueta: "37,5 hodiny (třísměnný a nepřetržitý provoz, pod zemí)" },
      ],
      porDefecto: "40",
    },
    {
      id: "uvazek",
      tipo: "numero",
      etiqueta: "Vaše týdenní pracovní doba v hodinách",
      ayuda: "Při plném úvazku stejná jako stanovená doba. Při zkráceném úvazku sjednaný počet hodin.",
      min: 0,
      max: 40,
      porDefecto: 40,
    },
  ],
  calcular(e, v, { redondear }) {
    const stanovena = Number(e.stanovena);
    if (e.uvazek <= 0) throw new ErrorEntrada("Zadejte týdenní pracovní dobu vyšší než nula.", "uvazek");
    if (e.uvazek > stanovena) throw new ErrorEntrada("Týdenní pracovní doba nemůže být delší než stanovená.", "uvazek");
    const mesicni = redondear((v["cz.minimalni-mzda"] * e.uvazek) / stanovena);
    const hodinova = nahoruNaDesetihalere((v["cz.minimalni-mzda-hodinova"] * 40) / stanovena);
    const m = cistaMzda(mesicni, true, 0, parametryMzdy(v));
    const observaciones: string[] = [];
    const zkraceny = e.uvazek < stanovena;
    if (zkraceny) {
      observaciones.push("Při zkráceném úvazku se měsíční minimální mzda snižuje úměrně odpracované době. Hodinová minimální mzda zůstává stejná.");
      observaciones.push("Zdravotní pojištění se i při zkráceném úvazku obvykle platí aspoň z celé minimální mzdy, proto čistou mzdu neuvádíme.");
    }
    return {
      mesicni,
      hodinova,
      cista: zkraceny ? null : redondear(m.cista),
      rocne: redondear(mesicni * 12),
      observaciones,
    };
  },
  resultado: [
    { clave: "mesicni", etiqueta: "Minimální mzda za měsíc", formato: "moneda", destacada: true },
    { clave: "hodinova", etiqueta: "Minimální mzda za hodinu", formato: "moneda" },
    { clave: "cista", etiqueta: "Čistá minimální mzda (s prohlášením, bez dětí)", formato: "moneda" },
    { clave: "rocne", etiqueta: "Minimální mzda za rok", formato: "moneda" },
  ],
});
