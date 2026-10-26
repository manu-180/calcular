import { definirCalculadora, enMapa } from "@/motor/calculo";

export default definirCalculadora({
  id: "gr.eisfores-eleftheron-epangelmation",
  mercado: "gr",
  concepto: "propio",
  slug: "eisfores-eleftheron-epangelmation",
  estado: "publicado",
  requiere: {
    "gr.eisfores-eleftheron": "mapa",
    "gr.eisfores-eleftheron-syntaxi": "mapa",
    "gr.eisfora-anergias-eleftheron": "numero",
    "gr.eisfores-epikourikis-eleftheron": "mapa",
    "gr.eisfores-efapax-eleftheron": "mapa",
  },
  campos: [
    { id: "kategoria", tipo: "opcion-dato", dato: "gr.eisfores-eleftheron", etiqueta: "Ασφαλιστική κατηγορία κύριας σύνταξης και υγείας", porDefecto: "1" },
    { id: "anergia", tipo: "si-no", etiqueta: "Εισφορά υπέρ του κλάδου ανεργίας", porDefecto: true },
    { id: "epikouriki", tipo: "opcion-dato", dato: "gr.eisfores-epikourikis-eleftheron", etiqueta: "Επικουρική ασφάλιση", porDefecto: "0" },
    { id: "efapax", tipo: "opcion-dato", dato: "gr.eisfores-efapax-eleftheron", etiqueta: "Εφάπαξ παροχές", porDefecto: "0" },
  ],
  calcular(e, v, { redondear }) {
    const kyria = enMapa(v["gr.eisfores-eleftheron"], e.kategoria);
    const syntaxi = enMapa(v["gr.eisfores-eleftheron-syntaxi"], e.kategoria);
    const anergia = e.anergia ? v["gr.eisfora-anergias-eleftheron"] : 0;
    const epikouriki = enMapa(v["gr.eisfores-epikourikis-eleftheron"], e.epikouriki);
    const efapax = enMapa(v["gr.eisfores-efapax-eleftheron"], e.efapax);
    const mina = redondear(kyria + anergia + epikouriki + efapax);
    return {
      mina,
      syntaxi,
      ygeia: redondear(kyria - syntaxi),
      anergia,
      epikouriki,
      efapax,
      etos: redondear(mina * 12),
    };
  },
  resultado: [
    { clave: "mina", etiqueta: "Εισφορές τον μήνα", formato: "moneda", destacada: true },
    { clave: "syntaxi", etiqueta: "Κύρια σύνταξη", formato: "moneda" },
    { clave: "ygeia", etiqueta: "Υγειονομική περίθαλψη (σε χρήμα και σε είδος)", formato: "moneda" },
    { clave: "anergia", etiqueta: "Κλάδος ανεργίας", formato: "moneda", ocultarSiCero: true },
    { clave: "epikouriki", etiqueta: "Επικουρική ασφάλιση", formato: "moneda", ocultarSiCero: true },
    { clave: "efapax", etiqueta: "Εφάπαξ παροχές", formato: "moneda", ocultarSiCero: true },
    { clave: "etos", etiqueta: "Εισφορές του έτους", formato: "moneda" },
  ],
});
