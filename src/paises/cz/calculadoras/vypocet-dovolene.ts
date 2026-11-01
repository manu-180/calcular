import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { nahoru } from "../lib/mzda";

export default definirCalculadora({
  id: "cz.vypocet-dovolene",
  mercado: "cz",
  concepto: "vacaciones",
  slug: "vypocet-dovolene",
  estado: "publicado",
  requiere: { "cz.vymera-dovolene": "mapa" },
  campos: [
    { id: "vymera", tipo: "opcion-dato", dato: "cz.vymera-dovolene", etiqueta: "Výměra dovolené", porDefecto: "zakladni" },
    {
      id: "tydnu",
      tipo: "numero",
      etiqueta: "Výměra dovolené podle smlouvy v týdnech",
      ayuda: "Nechte 0, pokud máte jen zákonnou výměru. Pokud vám zaměstnavatel dává 5 týdnů, zadejte 5.",
      min: 0,
      max: 12,
      porDefecto: 0,
    },
    { id: "tydenni", tipo: "numero", etiqueta: "Týdenní pracovní doba v hodinách", min: 1, max: 60, porDefecto: 40 },
    { id: "odpracovano", tipo: "numero", etiqueta: "Odpracované týdny v kalendářním roce", min: 0, max: 53, porDefecto: 52 },
  ],
  calcular(e, v) {
    const zakonna = enMapa(v["cz.vymera-dovolene"], e.vymera);
    const vymera = Math.max(zakonna, e.tydnu);
    if (e.odpracovano < 4) {
      throw new ErrorEntrada("Na dovolenou vzniká nárok až po odpracování aspoň 4 týdnů v kalendářním roce.", "odpracovano");
    }
    const celyRok = e.tydenni * vymera;
    const tydnyKNaroku = Math.floor(e.odpracovano + 1e-9);
    const hodiny = tydnyKNaroku >= 52 ? nahoru(celyRok + (celyRok / 52) * (tydnyKNaroku - 52)) : nahoru((celyRok / 52) * tydnyKNaroku);
    const hodinDenne = e.tydenni / 5;
    const observaciones: string[] = [];
    if (tydnyKNaroku < 52) observaciones.push("Za každý odpracovaný týden vám náleží jedna dvaapadesátina roční dovolené.");
    if (tydnyKNaroku > 52) observaciones.push("Kdo odpracuje více než 52 týdnů podle rozvrhu směn, dostane za každý další týden dvaapadesátinu navíc.");
    return {
      hodiny,
      dny: hodiny / hodinDenne,
      vymera,
      celyRok,
      observaciones,
    };
  },
  resultado: [
    { clave: "hodiny", etiqueta: "Nárok na dovolenou", formato: "horas", decimales: 0, destacada: true },
    { clave: "dny", etiqueta: "Nárok v pracovních dnech", formato: "dias", decimales: 1 },
    { clave: "vymera", etiqueta: "Výměra dovolené", formato: "semanas", decimales: 0 },
    { clave: "celyRok", etiqueta: "Dovolená za celý rok", formato: "horas", decimales: 0 },
  ],
});
