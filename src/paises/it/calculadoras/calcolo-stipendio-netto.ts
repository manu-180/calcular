import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { detrazioneCuneo, detrazioneLavoro, irpefLorda, sommaCuneo, trattamentoIntegrativo } from "../lib/irpef";

export default definirCalculadora({
  id: "it.stipendio-netto",
  mercado: "it",
  concepto: "sueldo-neto",
  slug: "calcolo-stipendio-netto",
  estado: "publicado",
  requiere: {
    "it.irpef-scaglioni": "escala",
    "it.detrazione-lavoro": "mapa",
    "it.cuneo-fiscale": "mapa",
    "it.trattamento-integrativo": "mapa",
    "it.contributi-dipendente": "numero",
    "it.aliquota-aggiuntiva": "numero",
    "it.fascia-pensionabile": "numero",
    "it.massimale-contributivo": "numero",
  },
  campos: [
    { id: "ral", tipo: "moneda", etiqueta: "RAL (retribuzione annua lorda)", min: 0, porDefecto: 30000 },
    {
      id: "mensilita",
      tipo: "opcion",
      etiqueta: "Mensilità",
      ayuda: "Quante buste paga ricevi in un anno: 13 con la tredicesima, 14 se il tuo contratto prevede anche la quattordicesima.",
      opciones: [
        { valor: "13", etiqueta: "13 mensilità" },
        { valor: "14", etiqueta: "14 mensilità" },
        { valor: "12", etiqueta: "12 mensilità" },
      ],
      porDefecto: "13",
    },
    {
      id: "contratto",
      tipo: "opcion",
      etiqueta: "Contratto",
      opciones: [
        { valor: "indeterminato", etiqueta: "Tempo indeterminato" },
        { valor: "determinato", etiqueta: "Tempo determinato" },
      ],
      porDefecto: "indeterminato",
    },
    { id: "addizionaleRegionale", tipo: "porcentaje", etiqueta: "Addizionale regionale (%)", ayuda: "Facoltativo. La trovi sul sito della tua regione.", min: 0, max: 5, requerido: false },
    { id: "addizionaleComunale", tipo: "porcentaje", etiqueta: "Addizionale comunale (%)", ayuda: "Facoltativo. La trovi sul sito del tuo comune.", min: 0, max: 2, requerido: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.ral <= 0) throw new ErrorEntrada("Inserisci una RAL maggiore di zero.", "ral");
    const mensilita = Number(e.mensilita);
    const eccedenza = Math.max(0, e.ral - v["it.fascia-pensionabile"]);
    const contributi = redondear(porcentaje(e.ral, v["it.contributi-dipendente"]) + porcentaje(eccedenza, v["it.aliquota-aggiuntiva"]));
    const imponibile = redondear(e.ral - contributi);
    const lorda = redondear(irpefLorda(v["it.irpef-scaglioni"], imponibile));
    const detLavoro = redondear(detrazioneLavoro(v["it.detrazione-lavoro"], imponibile, e.contratto === "determinato"));
    const detCuneo = redondear(detrazioneCuneo(v["it.cuneo-fiscale"], imponibile));
    const irpefNetta = redondear(Math.max(0, lorda - detLavoro - detCuneo));
    const somma = redondear(sommaCuneo(v["it.cuneo-fiscale"], imponibile, imponibile));
    const integrativo = redondear(trattamentoIntegrativo(v["it.trattamento-integrativo"], imponibile, lorda, detLavoro));
    const addizionali = redondear(porcentaje(imponibile, (e.addizionaleRegionale ?? 0) + (e.addizionaleComunale ?? 0)));
    const nettoAnnuo = redondear(e.ral - contributi - irpefNetta - addizionali + somma + integrativo);
    const observaciones: string[] = [];
    if (e.addizionaleRegionale === null || e.addizionaleComunale === null)
      observaciones.push("Senza le addizionali regionale e comunale il netto risulta un po' più alto di quello che vedrai in busta paga.");
    if (e.ral > v["it.massimale-contributivo"]) observaciones.push("Oltre il massimale contributivo chi è iscritto all'INPS dal 1996 smette di versare contributi: il tuo netto reale può essere un po' più alto.");
    observaciones.push("Il calcolo considera un anno intero di lavoro e nessuna detrazione per familiari a carico o per spese.");
    return {
      contributi,
      imponibile,
      lorda,
      detLavoro,
      detCuneo,
      irpefNetta,
      somma,
      integrativo,
      addizionali,
      nettoAnnuo,
      nettoMensile: redondear(nettoAnnuo / mensilita),
      observaciones,
    };
  },
  resultado: [
    { clave: "nettoMensile", etiqueta: "Stipendio netto mensile", formato: "moneda", destacada: true },
    { clave: "nettoAnnuo", etiqueta: "Netto annuo", formato: "moneda" },
    { clave: "contributi", etiqueta: "Contributi INPS a tuo carico", formato: "moneda" },
    { clave: "imponibile", etiqueta: "Reddito imponibile IRPEF", formato: "moneda" },
    { clave: "lorda", etiqueta: "IRPEF lorda", formato: "moneda" },
    { clave: "detLavoro", etiqueta: "Detrazione per lavoro dipendente", formato: "moneda" },
    { clave: "detCuneo", etiqueta: "Ulteriore detrazione (taglio del cuneo)", formato: "moneda", ocultarSiCero: true },
    { clave: "irpefNetta", etiqueta: "IRPEF netta", formato: "moneda" },
    { clave: "somma", etiqueta: "Somma esente del taglio del cuneo", formato: "moneda", ocultarSiCero: true },
    { clave: "integrativo", etiqueta: "Trattamento integrativo", formato: "moneda", ocultarSiCero: true },
    { clave: "addizionali", etiqueta: "Addizionali regionale e comunale", formato: "moneda", ocultarSiCero: true },
  ],
});
