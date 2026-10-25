import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

const nedTillTusental = (x: number) => Math.floor(x / 1000 + 1e-9) * 1000;

export default definirCalculadora({
  id: "se.lagfart",
  mercado: "se",
  concepto: "propio",
  slug: "lagfart",
  estado: "publicado",
  requiere: {
    "se.stampelskatt": "mapa",
    "se.lantmateriet-avgift": "mapa",
  },
  campos: [
    { id: "kopeskilling", tipo: "moneda", etiqueta: "Köpeskilling", min: 0, porDefecto: 4000000 },
    { id: "taxeringsvarde", tipo: "moneda", etiqueta: "Taxeringsvärde året före lagfarten", min: 0, porDefecto: 2800000 },
    {
      id: "kopare",
      tipo: "opcion",
      etiqueta: "Köpare",
      opciones: [
        { valor: "privat", etiqueta: "Privatperson" },
        { valor: "juridisk", etiqueta: "Företag eller annan juridisk person" },
      ],
      porDefecto: "privat",
    },
    { id: "pantbrev", tipo: "moneda", etiqueta: "Nya pantbrev du behöver ta ut", min: 0, porDefecto: 0, ayuda: "Skriv 0 om pantbreven som redan finns i fastigheten räcker för ditt lån." },
    { id: "antalPantbrev", tipo: "entero", etiqueta: "Antal nya pantbrev", min: 0, max: 10, porDefecto: 1 },
  ],
  calcular(e, v) {
    if (e.kopeskilling <= 0 && e.taxeringsvarde <= 0) throw new ErrorEntrada("Skriv köpeskillingen.", "kopeskilling");
    const s = v["se.stampelskatt"];
    const a = v["se.lantmateriet-avgift"];
    const underlag = nedTillTusental(Math.max(e.kopeskilling, e.taxeringsvarde));
    const stampelskatt = Math.floor((underlag * enMapa(s, e.kopare)) / 100);
    const lagfart = stampelskatt + enMapa(a, "lagfart");
    const pantUnderlag = nedTillTusental(e.pantbrev);
    const pantbrevsskatt = Math.floor((pantUnderlag * enMapa(s, "pantbrev")) / 100);
    const pantbrev = pantUnderlag > 0 ? pantbrevsskatt + Math.max(1, e.antalPantbrev) * enMapa(a, "pantbrev") : 0;
    return {
      totalt: lagfart + pantbrev,
      lagfart,
      stampelskatt,
      underlag,
      pantbrev,
      observaciones: ["Lantmäteriet jämför köpeskillingen med taxeringsvärdet från året före och tar ut stämpelskatt på det högsta beloppet, avrundat nedåt till hela tusental."],
    };
  },
  resultado: [
    { clave: "totalt", etiqueta: "Att betala till Lantmäteriet", formato: "moneda", decimales: 0, destacada: true },
    { clave: "lagfart", etiqueta: "Lagfart (stämpelskatt och expeditionsavgift)", formato: "moneda", decimales: 0 },
    { clave: "stampelskatt", etiqueta: "Stämpelskatt för lagfarten", formato: "moneda", decimales: 0 },
    { clave: "underlag", etiqueta: "Underlag för stämpelskatten", formato: "moneda", decimales: 0 },
    { clave: "pantbrev", etiqueta: "Nya pantbrev (stämpelskatt och avgift)", formato: "moneda", decimales: 0, ocultarSiCero: true },
  ],
});
