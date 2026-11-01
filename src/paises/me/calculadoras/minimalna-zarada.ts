import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { brutoIzNeta, CAMPO_PRIREZ, parametri, REQUIERE_ZARADA } from "../lib/zarada";

export default definirCalculadora({
  id: "me.minimalna-zarada",
  mercado: "me",
  concepto: "salario-minimo",
  slug: "minimalna-zarada",
  estado: "publicado",
  requiere: { ...REQUIERE_ZARADA, "me.minimalna-do-v": "numero", "me.minimalna-vi": "numero" },
  campos: [
    {
      id: "nivo",
      tipo: "opcion",
      etiqueta: "Nivo kvalifikacije radnog mjesta",
      opciones: [
        { valor: "do-v", etiqueta: "Do V nivoa" },
        { valor: "vi", etiqueta: "VI i viši nivo" },
      ],
      porDefecto: "do-v",
    },
    { id: "procenat", tipo: "numero", etiqueta: "Radno vrijeme u procentima punog", ayuda: "Puno radno vrijeme je 100. Kod nepunog minimalna zarada se isplaćuje srazmjerno.", min: 1, max: 100, porDefecto: 100 },
    CAMPO_PRIREZ,
    { id: "plata", tipo: "moneda", etiqueta: "Vaša neto zarada, za poređenje", min: 0, requerido: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.procenat <= 0) throw new ErrorEntrada("Unesite radno vrijeme veće od nule.", "procenat");
    const puna = e.nivo === "vi" ? v["me.minimalna-vi"] : v["me.minimalna-do-v"];
    const neto = redondear((puna * e.procenat) / 100);
    const o = brutoIzNeta(neto, parametri(v), e.prirez, redondear);
    const observaciones: string[] = [];
    if (e.plata != null && e.plata < neto) observaciones.push("Unijeta zarada je niža od propisane minimalne za ovo radno mjesto.");
    return { neto, bruto: o.bruto, trosak: o.trosakPoslodavca, godisnje: redondear(neto * 12), razlika: e.plata == null ? 0 : redondear(e.plata - neto), observaciones };
  },
  resultado: [
    { clave: "neto", etiqueta: "Minimalna neto zarada", formato: "moneda", destacada: true },
    { clave: "bruto", etiqueta: "Odgovarajući bruto", formato: "moneda" },
    { clave: "trosak", etiqueta: "Trošak poslodavca", formato: "moneda" },
    { clave: "godisnje", etiqueta: "Neto za dvanaest mjeseci", formato: "moneda" },
    { clave: "razlika", etiqueta: "Vaša zarada u odnosu na minimalnu", formato: "moneda" },
  ],
});
