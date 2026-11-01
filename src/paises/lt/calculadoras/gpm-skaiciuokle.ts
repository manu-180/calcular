import { definirCalculadora } from "@/motor/calculo";
import { gpmPerMetus } from "../lib/atlyginimas";

// Borrador: los datos que pide no se pudieron leer en la fuente primaria (scripts/paises/lt/INFORME.md).
export default definirCalculadora({
  id: "lt.gpm-skaiciuokle",
  mercado: "lt",
  concepto: "impuesto-renta",
  slug: "gpm-skaiciuokle",
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
    { id: "pajamos", tipo: "moneda", etiqueta: "Metinės darbo pajamos", min: 0, porDefecto: 30000 },
    { id: "npdMetinis", tipo: "moneda", etiqueta: "NPD per metus", min: 0, porDefecto: 0 },
    { id: "sumoketa", tipo: "moneda", etiqueta: "Jau sumokėtas GPM", min: 0, requerido: false },
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
    const gpm = redondear(gpmPerMetus(p, Math.max(0, e.pajamos - e.npdMetinis)));
    return { gpm, dalis: e.pajamos > 0 ? (gpm / e.pajamos) * 100 : 0, skirtumas: e.sumoketa === null ? null : redondear(gpm - e.sumoketa) };
  },
  resultado: [
    { clave: "gpm", etiqueta: "GPM per metus", formato: "moneda", destacada: true },
    { clave: "dalis", etiqueta: "GPM dalis nuo pajamų", formato: "porcentaje" },
    { clave: "skirtumas", etiqueta: "Dar reikia sumokėti (minusas reiškia permoką)", formato: "moneda" },
  ],
});
