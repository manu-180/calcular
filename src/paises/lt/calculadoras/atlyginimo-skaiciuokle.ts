import { definirCalculadora } from "@/motor/calculo";
import { isBruto } from "../lib/atlyginimas";

// Borrador: los datos que pide no se pudieron leer en la fuente primaria (scripts/paises/lt/INFORME.md).
export default definirCalculadora({
  id: "lt.atlyginimo-skaiciuokle",
  mercado: "lt",
  concepto: "sueldo-neto",
  slug: "atlyginimo-skaiciuokle",
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
    { id: "suKaupimu", tipo: "si-no", etiqueta: "Dalyvaujate papildomame pensijų kaupime", porDefecto: false },
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
    const r = isBruto(p, e.bruto, e.suKaupimu);
    return { neto: redondear(r.neto), npd: redondear(r.npd), gpm: redondear(r.gpm), vsd: redondear(r.vsd), psd: redondear(r.psd), kaupimas: redondear(r.kaupimas) };
  },
  resultado: [
    { clave: "neto", etiqueta: "Į rankas per mėnesį", formato: "moneda", destacada: true },
    { clave: "npd", etiqueta: "Neapmokestinamas pajamų dydis (NPD)", formato: "moneda" },
    { clave: "gpm", etiqueta: "Gyventojų pajamų mokestis (GPM)", formato: "moneda" },
    { clave: "vsd", etiqueta: "VSD įmoka", formato: "moneda" },
    { clave: "psd", etiqueta: "PSD įmoka", formato: "moneda" },
    { clave: "kaupimas", etiqueta: "Papildomas pensijų kaupimas", formato: "moneda" },
  ],
});
