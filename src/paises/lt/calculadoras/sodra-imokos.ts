import { definirCalculadora, porcentaje, enMapa } from "@/motor/calculo";
import { isBruto } from "../lib/atlyginimas";

// Borrador: los datos que pide no se pudieron leer en la fuente primaria (scripts/paises/lt/INFORME.md).
export default definirCalculadora({
  id: "lt.sodra-imokos",
  mercado: "lt",
  concepto: "aportes-seguridad-social",
  slug: "sodra-imokos",
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
    "lt.vsd-darbdavio": "mapa",
  },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Mėnesio atlyginimas ant popieriaus", min: 0, porDefecto: 2000 },
    { id: "suKaupimu", tipo: "si-no", etiqueta: "Dalyvaujate papildomame pensijų kaupime", porDefecto: false },
    { id: "sutartis", tipo: "opcion-dato", etiqueta: "Darbo sutartis", dato: "lt.vsd-darbdavio" },
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
    const darbdavio = redondear(porcentaje(e.bruto, enMapa(v["lt.vsd-darbdavio"], e.sutartis)));
    const darbuotojo = redondear(r.vsd + r.psd + r.kaupimas);
    return { viso: redondear(darbuotojo + darbdavio), darbuotojo, darbdavio, vsd: redondear(r.vsd), psd: redondear(r.psd), kaupimas: redondear(r.kaupimas) };
  },
  resultado: [
    { clave: "viso", etiqueta: "Visos įmokos per mėnesį", formato: "moneda", destacada: true },
    { clave: "darbuotojo", etiqueta: "Darbuotojo įmokos", formato: "moneda" },
    { clave: "darbdavio", etiqueta: "Darbdavio įmokos", formato: "moneda" },
    { clave: "vsd", etiqueta: "VSD įmoka", formato: "moneda" },
    { clave: "psd", etiqueta: "PSD įmoka", formato: "moneda" },
    { clave: "kaupimas", etiqueta: "Papildomas pensijų kaupimas", formato: "moneda" },
  ],
});
