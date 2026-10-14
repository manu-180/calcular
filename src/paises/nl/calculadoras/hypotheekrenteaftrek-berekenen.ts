import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { berekenBox1, eigenwoningforfait, REQ_BOX1, tariefsaanpassing } from "../lib/belasting";

export default definirCalculadora({
  id: "nl.hypotheekrenteaftrek-berekenen",
  mercado: "nl",
  concepto: "propio",
  slug: "hypotheekrenteaftrek-berekenen",
  estado: "publicado",
  requiere: {
    ...REQ_BOX1,
    "nl.eigenwoningforfait": "escala",
    "nl.hillen": "numero",
    "nl.aftrek-maximumtarief": "numero",
  },
  campos: [
    { id: "rente", tipo: "moneda", etiqueta: "Betaalde hypotheekrente per jaar", min: 0, porDefecto: 9000 },
    { id: "woz", tipo: "moneda", etiqueta: "WOZ-waarde van je woning", min: 0, porDefecto: 400000 },
    { id: "inkomen", tipo: "moneda", etiqueta: "Je bruto jaarinkomen uit werk (inclusief vakantiegeld)", min: 0, porDefecto: 60000 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.inkomen <= 0) throw new ErrorEntrada("Vul je bruto jaarinkomen in.", "inkomen");
    const forfait = eigenwoningforfait(entrada.woz, v["nl.eigenwoningforfait"]);
    const saldo = forfait - entrada.rente;
    const hillen = saldo > 0 ? porcentaje(saldo, v["nl.hillen"]) : 0;
    const eigenWoning = saldo - hillen;
    const aftrek = Math.max(0, -eigenWoning);
    const aanpassing = tariefsaanpassing(entrada.inkomen, aftrek, v["nl.box1-schijven"], v["nl.aftrek-maximumtarief"]);
    const zonder = berekenBox1(v, { inkomen: entrada.inkomen, arbeidsinkomen: entrada.inkomen });
    const met = berekenBox1(v, { inkomen: Math.max(0, entrada.inkomen + eigenWoning), arbeidsinkomen: entrada.inkomen, aftrekVoorBeperking: aanpassing });
    const voordeel = zonder.teBetalen - met.teBetalen;
    const nettoRente = entrada.rente - voordeel;
    const observaciones: string[] = [];
    if (saldo > 0) observaciones.push("Je eigenwoningforfait is hoger dan je rente. Over het verschil krijg je de aftrek wegens geen of geringe eigenwoningschuld, zodat je maar over een klein deel belasting betaalt.");
    if (aanpassing > 0) observaciones.push("Een deel van je aftrek valt in de hoogste schijf. Daarover krijg je maar het maximale aftrektarief terug.");
    return {
      voordeel: redondear(voordeel),
      perMaand: redondear(voordeel / 12),
      forfait: redondear(forfait),
      aftrek: redondear(aftrek),
      hillen: redondear(hillen),
      tariefsaanpassing: redondear(aanpassing),
      nettoRente: redondear(nettoRente),
      nettoPerMaand: redondear(nettoRente / 12),
      observaciones,
    };
  },
  resultado: [
    { clave: "voordeel", etiqueta: "Belastingvoordeel per jaar", formato: "moneda", destacada: true },
    { clave: "perMaand", etiqueta: "Belastingvoordeel per maand", formato: "moneda" },
    { clave: "forfait", etiqueta: "Eigenwoningforfait", formato: "moneda" },
    { clave: "aftrek", etiqueta: "Aftrekbaar saldo eigen woning", formato: "moneda" },
    { clave: "hillen", etiqueta: "Aftrek wegens geen of geringe eigenwoningschuld", formato: "moneda", ocultarSiCero: true },
    { clave: "tariefsaanpassing", etiqueta: "Tariefsaanpassing", formato: "moneda", ocultarSiCero: true },
    { clave: "nettoRente", etiqueta: "Netto rentelasten per jaar", formato: "moneda" },
    { clave: "nettoPerMaand", etiqueta: "Netto rentelasten per maand", formato: "moneda" },
  ],
});
