import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { CHAMPS_FAMILLE, REQ_SALAIRE, salaire } from "../lib/irpp";

export default definirCalculadora({
  id: "tn.calcul-salaire-brut",
  mercado: "tn",
  concepto: "propio",
  slug: "calcul-salaire-brut",
  estado: "publicado",
  requiere: REQ_SALAIRE,
  campos: [
    { id: "net", tipo: "moneda", etiqueta: "Salaire net mensuel souhaité", min: 0, porDefecto: 1500 },
    ...CHAMPS_FAMILLE,
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.net <= 0) throw new ErrorEntrada("Indiquez un salaire net supérieur à zéro.", "net");
    const netDe = (brut: number) => {
      const s = salaire(brut, entrada, v, redondear);
      return brut - s.cnssMensuel - s.irppMensuel - s.cssMensuel;
    };
    // Le net croît avec le brut : une recherche par dichotomie retrouve le brut au millime.
    let bas = entrada.net;
    let haut = entrada.net * 2 + 1000;
    for (let i = 0; i < 200 && haut - bas > 0.0005; i++) {
      const milieu = (bas + haut) / 2;
      if (netDe(milieu) < entrada.net) bas = milieu;
      else haut = milieu;
    }
    const brut = redondear(haut);
    const s = salaire(brut, entrada, v, redondear);
    return {
      brut,
      cnss: s.cnssMensuel,
      irpp: s.irppMensuel,
      css: s.cssMensuel,
      net: redondear(brut - s.cnssMensuel - s.irppMensuel - s.cssMensuel),
      brutAnnuel: s.brutAnnuel,
      observaciones: [
        "Calcul inverse du salaire net, sur une base annuelle divisée par 12, pour un salarié du secteur non agricole. Le net obtenu peut différer de quelques millimes à cause des arrondis.",
      ],
    };
  },
  resultado: [
    { clave: "brut", etiqueta: "Salaire brut mensuel nécessaire", formato: "moneda", destacada: true },
    { clave: "cnss", etiqueta: "Cotisation CNSS", formato: "moneda" },
    { clave: "irpp", etiqueta: "Impôt sur le revenu (IRPP)", formato: "moneda" },
    { clave: "css", etiqueta: "Contribution sociale de solidarité", formato: "moneda" },
    { clave: "net", etiqueta: "Salaire net obtenu", formato: "moneda" },
    { clave: "brutAnnuel", etiqueta: "Salaire brut annuel", formato: "moneda" },
  ],
});
