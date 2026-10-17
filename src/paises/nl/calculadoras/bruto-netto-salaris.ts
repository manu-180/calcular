import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { berekenBox1, marginaalTarief, REQ_BOX1 } from "../lib/belasting";

export default definirCalculadora({
  id: "nl.bruto-netto-salaris",
  mercado: "nl",
  concepto: "sueldo-neto",
  slug: "bruto-netto-salaris",
  estado: "publicado",
  requiere: {
    ...REQ_BOX1,
    "nl.vakantiebijslag": "numero",
  },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Brutosalaris", min: 0, porDefecto: 3500 },
    {
      id: "periode",
      tipo: "opcion",
      etiqueta: "Dit bedrag is",
      opciones: [
        { valor: "maand", etiqueta: "Per maand" },
        { valor: "jaar", etiqueta: "Per jaar (zonder vakantiegeld)" },
      ],
      porDefecto: "maand",
    },
    { id: "vakantiegeld", tipo: "si-no", etiqueta: "Je krijgt daarbovenop vakantiegeld", porDefecto: true },
    { id: "dertiendeMaand", tipo: "si-no", etiqueta: "Je krijgt een dertiende maand", porDefecto: false },
    { id: "pensioen", tipo: "porcentaje", etiqueta: "Jouw pensioenpremie (% van je brutosalaris)", min: 0, max: 30, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.bruto <= 0) throw new ErrorEntrada("Vul een brutosalaris boven nul in.", "bruto");
    const jaarsalaris = entrada.periode === "maand" ? entrada.bruto * 12 : entrada.bruto;
    const vakantiegeld = entrada.vakantiegeld ? porcentaje(jaarsalaris, v["nl.vakantiebijslag"]) : 0;
    const dertiende = entrada.dertiendeMaand ? jaarsalaris / 12 : 0;
    const brutoJaar = jaarsalaris + vakantiegeld + dertiende;
    const pensioen = porcentaje(jaarsalaris, entrada.pensioen);
    const belastbaar = brutoJaar - pensioen;
    const box1 = berekenBox1(v, { inkomen: belastbaar, arbeidsinkomen: belastbaar });
    const nettoJaar = brutoJaar - pensioen - box1.teBetalen;
    const observaciones = [
      "Dit is een berekening op jaarbasis. Je werkgever houdt elke maand loonheffing in met de tabellen van de Belastingdienst, dus je netto per maand kan iets afwijken. Over het jaar komt het ongeveer op dit bedrag uit.",
      "De bijdrage voor de Zorgverzekeringswet betaalt je werkgever. Je zorgpremie voor je eigen zorgverzekering betaal je zelf, die zit hier niet in.",
    ];
    return {
      nettoMaand: redondear(nettoJaar / 12),
      nettoJaar: redondear(nettoJaar),
      brutoJaar: redondear(brutoJaar),
      vakantiegeld: redondear(vakantiegeld),
      dertiende: redondear(dertiende),
      pensioen: redondear(pensioen),
      belasting: redondear(box1.belasting),
      ahk: redondear(box1.ahk),
      arbeidskorting: redondear(box1.arbeidskorting),
      loonheffing: redondear(box1.teBetalen),
      gemiddeld: redondear((box1.teBetalen / brutoJaar) * 100),
      marginaal: marginaalTarief(belastbaar, v["nl.box1-schijven"]),
      observaciones,
    };
  },
  resultado: [
    { clave: "nettoMaand", etiqueta: "Netto per maand (gemiddeld, inclusief vakantiegeld)", formato: "moneda", destacada: true },
    { clave: "nettoJaar", etiqueta: "Netto per jaar", formato: "moneda" },
    { clave: "brutoJaar", etiqueta: "Bruto per jaar", formato: "moneda" },
    { clave: "vakantiegeld", etiqueta: "Waarvan vakantiegeld", formato: "moneda", ocultarSiCero: true },
    { clave: "dertiende", etiqueta: "Waarvan dertiende maand", formato: "moneda", ocultarSiCero: true },
    { clave: "pensioen", etiqueta: "Pensioenpremie", formato: "moneda", ocultarSiCero: true },
    { clave: "belasting", etiqueta: "Belasting en premies volksverzekeringen", formato: "moneda" },
    { clave: "ahk", etiqueta: "Min: algemene heffingskorting", formato: "moneda" },
    { clave: "arbeidskorting", etiqueta: "Min: arbeidskorting", formato: "moneda" },
    { clave: "loonheffing", etiqueta: "Loonheffing per jaar", formato: "moneda" },
    { clave: "gemiddeld", etiqueta: "Gemiddeld belastingtarief", formato: "porcentaje", decimales: 1 },
    { clave: "marginaal", etiqueta: "Tarief over je laatst verdiende euro (zonder kortingen)", formato: "porcentaje" },
  ],
});
