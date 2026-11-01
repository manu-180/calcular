import { definirCalculadora } from "@/motor/calculo";
import { npdPerMenesi } from "../lib/atlyginimas";

// Borrador: los datos que pide no se pudieron leer en la fuente primaria (scripts/paises/lt/INFORME.md).
export default definirCalculadora({
  id: "lt.npd-skaiciuokle",
  mercado: "lt",
  concepto: "propio",
  slug: "npd-skaiciuokle",
  estado: "borrador",
  requiere: {
    "lt.mma": "numero",
    "lt.vdu": "numero",
    "lt.npd-didziausias": "numero",
    "lt.npd-koeficientas": "numero",
    "lt.gpm-tarifai": "mapa",
    "lt.gpm-ribos-vdu": "mapa",
    "lt.vsd-darbuotojo": "numero",
    "lt.psd-darbuotojo": "numero",
    "lt.pensiju-kaupimas": "numero",
    "lt.vsd-lubos-vdu": "numero",
  },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Mėnesio atlyginimas ant popieriaus", min: 0, porDefecto: 2000 },
  ],
  calcular(e, v, { redondear }) {
    const p = {
      mma: v["lt.mma"],
      vdu: v["lt.vdu"],
      npdDidziausias: v["lt.npd-didziausias"],
      npdKoeficientas: v["lt.npd-koeficientas"],
      gpmTarifai: v["lt.gpm-tarifai"],
      gpmRibosVdu: v["lt.gpm-ribos-vdu"],
      vsd: v["lt.vsd-darbuotojo"],
      psd: v["lt.psd-darbuotojo"],
      kaupimas: v["lt.pensiju-kaupimas"],
      lubosVdu: v["lt.vsd-lubos-vdu"],
    };
    return { npd: redondear(npdPerMenesi(p, e.bruto)), didziausias: p.npdDidziausias };
  },
  resultado: [
    { clave: "npd", etiqueta: "Jūsų NPD per mėnesį", formato: "moneda", destacada: true },
    { clave: "didziausias", etiqueta: "Didžiausias NPD", formato: "moneda" },
  ],
});
