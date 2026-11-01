import { definirCalculadora, enMapa } from "@/motor/calculo";
import { brutoIzNeta, REQUIERE_PLATA } from "../lib/plata";

export default definirCalculadora({
  id: "ba.minimalna-plata",
  mercado: "ba",
  concepto: "salario-minimo",
  slug: "minimalna-plata",
  estado: "publicado",
  requiere: { ...REQUIERE_PLATA, "ba.minimalna-fbih": "numero", "ba.minimalna-rs-neto": "mapa", "ba.minimalna-rs-bruto": "mapa" },
  campos: [
    { id: "region", tipo: "region", etiqueta: "Entitet u kojem radite", regiones: ["fbih", "rs"], porDefecto: "fbih" },
    { id: "sprema", tipo: "opcion-dato", etiqueta: "Obrazovanje koje posao traži", dato: "ba.minimalna-rs-neto", porDefecto: "osnovna", visibleSi: { region: ["rs"] } },
  ],
  calcular(e, v, { redondear }) {
    if (e.region === "rs") {
      const k = e.sprema ?? "osnovna";
      const bruto = enMapa(v["ba.minimalna-rs-bruto"], k);
      return { neto: enMapa(v["ba.minimalna-rs-neto"], k), bruto, trosak: bruto };
    }
    const o = brutoIzNeta(v["ba.minimalna-fbih"], { region: "fbih", faktor: 1, izdrzavani: null, sprema: null }, v, redondear);
    return {
      neto: v["ba.minimalna-fbih"],
      bruto: o.bruto,
      trosak: o.trosak,
      observaciones: ["Odluka propisuje samo neto iznos. Bruto smo izračunali uz faktor ličnog odbitka 1."],
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "Najniža neto plata", formato: "moneda", destacada: true },
    { clave: "bruto", etiqueta: "Bruto iznos", formato: "moneda" },
    { clave: "trosak", etiqueta: "Mjesečni trošak poslodavca", formato: "moneda" },
  ],
});
