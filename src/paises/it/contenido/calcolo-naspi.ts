import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "it.naspi",
  h1: "Calcolo NASpI",
  title: "Calcolo NASpI {{anio}}: importo e durata della disoccupazione",
  description:
    "Calcola l'importo e la durata della NASpI {{anio}} dalla retribuzione degli ultimi quattro anni. Importo massimo {{it.naspi-importi[massimo]}} al mese.",
  intro: [
    "La NASpI è l'indennità di disoccupazione dell'INPS per chi perde il lavoro dipendente senza averlo scelto, per esempio per un licenziamento o la fine di un contratto a termine.",
    "Con questo calcolo stimi quanto ricevi al mese, per quanto tempo e da quando l'importo comincia a scendere.",
  ],
  comoSeCalcula: [
    "Si divide la retribuzione imponibile degli ultimi quattro anni per le settimane di contributi e si moltiplica per {{it.naspi-regole[settimane-mese]}}: è la retribuzione media mensile.",
    "Fino a {{it.naspi-importi[retribuzione-riferimento]}} la NASpI vale il {{it.naspi-regole[quota]}} per cento della retribuzione media. Sulla parte che supera quella soglia si aggiunge il {{it.naspi-regole[quota-eccedenza]}} per cento.",
    "L'importo non può superare {{it.naspi-importi[massimo]}} al mese.",
    "La NASpI dura la metà delle settimane di contributi degli ultimi quattro anni, quindi al massimo due anni.",
    "Dal {{it.naspi-regole[mese-riduzione]}}° mese l'importo scende del {{it.naspi-regole[riduzione-mensile]}} per cento ogni mese, dall'{{it.naspi-regole[mese-riduzione-over55]}}° se hai almeno 55 anni.",
  ],
  ejemplo: [
    "Con 96.000 euro di retribuzione in quattro anni pieni la media mensile è 1.998,46 euro. La NASpI parte da 1.227,98 euro lordi al mese e dura 104 settimane, circa due anni.",
  ],
  faq: [
    {
      pregunta: "Quanto prendo di NASpI?",
      respuesta: "Circa tre quarti della tua retribuzione media mensile, un po' meno se guadagnavi più di {{it.naspi-importi[retribuzione-riferimento]}}, e mai più di {{it.naspi-importi[massimo]}} al mese.",
    },
    {
      pregunta: "Per quanto tempo spetta la NASpI?",
      respuesta: "Per metà delle settimane lavorate con contributi negli ultimi quattro anni. Le settimane che hanno già dato diritto a un'altra disoccupazione non contano.",
    },
    {
      pregunta: "Spetta la NASpI se mi dimetto?",
      respuesta: "Di solito no. Spetta però se ti dimetti per giusta causa, per esempio quando lo stipendio non viene pagato, e in alcuni casi di risoluzione consensuale.",
    },
    {
      pregunta: "La NASpI è tassata?",
      respuesta: "Sì. Paga l'IRPEF come uno stipendio: l'importo calcolato qui è lordo.",
    },
  ],
  glosario: [
    { termino: "NASpI", definicion: "Nuova assicurazione sociale per l'impiego: l'indennità mensile di disoccupazione dell'INPS." },
    { termino: "Retribuzione di riferimento", definicion: "La soglia oltre la quale la NASpI cresce più lentamente, aggiornata ogni anno." },
  ],
});
