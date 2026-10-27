import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { OBS_ASSIETTE, paie, REQ_PAIE } from "../lib/irg";

export default definirCalculadora({
  id: "dz.calcul-salaire-brut",
  mercado: "dz",
  concepto: "propio",
  slug: "calcul-salaire-brut",
  estado: "publicado",
  requiere: REQ_PAIE,
  campos: [
    { id: "net", tipo: "moneda", etiqueta: "Salaire net mensuel souhaité", min: 0, porDefecto: 50000 },
    { id: "special", tipo: "si-no", etiqueta: "Travailleur handicapé", porDefecto: false, ayuda: "Handicap moteur ou mental, non-voyant ou sourd-muet." },
  ],
  calcular(e, v, { redondear }) {
    if (e.net <= 0) throw new ErrorEntrada("Indiquez un salaire net supérieur à zéro.", "net");
    // Le net croît avec le brut (les retenues prennent moins de la moitié de chaque dinar
    // supplémentaire) : une recherche par dichotomie retrouve le brut.
    const netDe = (b: number) => paie(b, e.special, v, (x) => x).net;
    let bas = e.net;
    let haut = e.net * 3;
    for (let i = 0; i < 80; i++) {
      const milieu = (bas + haut) / 2;
      if (netDe(milieu) < e.net) bas = milieu;
      else haut = milieu;
    }
    const brut = redondear(haut);
    const p = paie(brut, e.special, v, redondear);
    return {
      brut,
      cnas: p.cnas,
      irg: p.irg,
      net: p.net,
      observaciones: [OBS_ASSIETTE],
    };
  },
  resultado: [
    { clave: "brut", etiqueta: "Salaire brut mensuel nécessaire", formato: "moneda", destacada: true },
    { clave: "cnas", etiqueta: "Cotisation de sécurité sociale", formato: "moneda" },
    { clave: "irg", etiqueta: "IRG retenu à la source", formato: "moneda" },
    { clave: "net", etiqueta: "Salaire net obtenu", formato: "moneda" },
  ],
});
