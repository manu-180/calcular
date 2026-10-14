import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "it.naspi",
  mercado: "it",
  concepto: "propio",
  slug: "calcolo-naspi",
  estado: "publicado",
  requiere: {
    "it.naspi-importi": "mapa",
    "it.naspi-regole": "mapa",
    "it.naspi-durata": "numero",
  },
  campos: [
    {
      id: "retribuzione",
      tipo: "moneda",
      etiqueta: "Retribuzione imponibile degli ultimi 4 anni",
      ayuda: "La somma degli stipendi lordi su cui hai versato contributi negli ultimi quattro anni.",
      min: 0,
      porDefecto: 96000,
    },
    { id: "settimane", tipo: "entero", etiqueta: "Settimane di contributi negli ultimi 4 anni", min: 1, max: 208, porDefecto: 208 },
    { id: "over55", tipo: "si-no", etiqueta: "Hai almeno 55 anni quando fai domanda?", porDefecto: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.settimane < 1 || e.settimane > 208) throw new ErrorEntrada("In quattro anni ci sono al massimo 208 settimane.", "settimane");
    const importi = v["it.naspi-importi"];
    const regole = v["it.naspi-regole"];
    const riferimento = importi["retribuzione-riferimento"];
    const mensile = redondear((e.retribuzione / e.settimane) * regole["settimane-mese"]);
    const base = porcentaje(Math.min(mensile, riferimento), regole.quota) + porcentaje(Math.max(0, mensile - riferimento), regole["quota-eccedenza"]);
    const iniziale = redondear(Math.min(base, importi.massimo));
    const settimaneDurata = redondear(porcentaje(e.settimane, v["it.naspi-durata"]));
    const meseRiduzione = e.over55 ? regole["mese-riduzione-over55"] : regole["mese-riduzione"];
    return {
      mensile,
      iniziale,
      settimaneDurata,
      mesiDurata: redondear(settimaneDurata / regole["settimane-mese"]),
      meseRiduzione,
      dopoRiduzione: redondear(porcentaje(iniziale, 100 - regole["riduzione-mensile"])),
      observaciones: [
        `Dal ${meseRiduzione}° mese di NASpI l'importo scende del ${regole["riduzione-mensile"]}% ogni mese.`,
        "L'importo è lordo: sulla NASpI si paga l'IRPEF, con le detrazioni per lavoro dipendente.",
      ],
    };
  },
  resultado: [
    { clave: "iniziale", etiqueta: "NASpI mensile iniziale (lorda)", formato: "moneda", destacada: true },
    { clave: "mensile", etiqueta: "Retribuzione media mensile", formato: "moneda" },
    { clave: "settimaneDurata", etiqueta: "Durata in settimane", formato: "numero", decimales: 1 },
    { clave: "mesiDurata", etiqueta: "Durata in mesi (circa)", formato: "meses", decimales: 1 },
    { clave: "meseRiduzione", etiqueta: "Mese da cui inizia la riduzione", formato: "numero", decimales: 0 },
    { clave: "dopoRiduzione", etiqueta: "Importo dopo la prima riduzione", formato: "moneda" },
  ],
});
