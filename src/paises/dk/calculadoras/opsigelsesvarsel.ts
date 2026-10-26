import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { heleAar, heleMaaneder, plusMaaneder, sidsteDagEfter } from "../lib/datoer";

export default definirCalculadora({
  id: "dk.opsigelsesvarsel",
  mercado: "dk",
  concepto: "preaviso",
  slug: "opsigelsesvarsel",
  estado: "publicado",
  requiere: { "dk.opsigelsesvarsel": "mapa" },
  campos: [
    {
      id: "hvem",
      tipo: "opcion",
      etiqueta: "Hvem siger op?",
      opciones: [
        { valor: "arbejdsgiver", etiqueta: "Arbejdsgiveren siger mig op" },
        { valor: "funktionaer", etiqueta: "Jeg siger selv op" },
      ],
      porDefecto: "arbejdsgiver",
    },
    { id: "ansat", tipo: "fecha", etiqueta: "Ansat fra", min: "1950-01-01", porDefecto: "2022-01-01" },
    { id: "opsagt", tipo: "fecha", etiqueta: "Dato for opsigelsen", min: "1950-01-01", porDefecto: "hoy" },
  ],
  calcular(e, v) {
    if (e.opsagt < e.ansat) throw new ErrorEntrada("Opsigelsen kan ikke ligge før ansættelsen.", "opsagt");
    const varsel = v["dk.opsigelsesvarsel"];
    const fratraeden = (n: number) => sidsteDagEfter(e.opsagt, n);
    let maaneder: number;
    if (e.hvem === "funktionaer") {
      maaneder = enMapa(varsel, "funktionaer");
    } else if (fratraeden(enMapa(varsel, "foerste-6-maaneder")) < plusMaaneder(e.ansat, 6)) {
      maaneder = enMapa(varsel, "foerste-6-maaneder");
    } else {
      // Varslet stiger med 1 måned for hvert tredje ansættelsesår, regnet til fratrædelsesdagen.
      const hoejst = enMapa(varsel, "hoejst");
      maaneder = enMapa(varsel, "efter-6-maaneder");
      while (maaneder < hoejst) {
        const kraevet = Math.min(hoejst, enMapa(varsel, "efter-6-maaneder") + enMapa(varsel, "tillaeg-hvert-3-aar") * Math.floor(heleAar(e.ansat, fratraeden(maaneder)) / 3));
        if (kraevet <= maaneder) break;
        maaneder++;
      }
    }
    const slut = fratraeden(maaneder);
    const anc = heleMaaneder(e.ansat, slut);
    return {
      maaneder,
      fratraeden: slut,
      anciennitet: `${Math.floor(anc / 12)} år og ${anc % 12} ${anc % 12 === 1 ? "måned" : "måneder"}`,
      observaciones: [
        "Varslet løber fra udgangen af den måned, hvor du får opsigelsen, og du fratræder ved en måneds udgang.",
        "Reglerne gælder funktionærer. Din overenskomst eller kontrakt kan give et længere varsel.",
      ],
    };
  },
  resultado: [
    { clave: "maaneder", etiqueta: "Opsigelsesvarsel", formato: "meses", destacada: true },
    { clave: "fratraeden", etiqueta: "Sidste dag i ansættelsen", formato: "fecha" },
    { clave: "anciennitet", etiqueta: "Anciennitet ved fratræden", formato: "texto" },
  ],
});
