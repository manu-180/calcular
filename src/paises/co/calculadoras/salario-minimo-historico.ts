import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import datos from "../datos.json";

interface Tramo {
  estado: string;
  desde: string;
  valor?: unknown;
}

// El motor entrega solo el valor vigente; la historia se lee de los tramos verificados del mismo
// datos.json, así un año sin decreto verificado nunca se muestra.
function valorDelAnio(id: string, anio: number): number | null {
  const tramos = (datos.datos.find((d) => d.id === id)?.tramos ?? []) as readonly Tramo[];
  const t = tramos.find((x) => x.estado === "verificado" && x.desde === `${anio}-01-01`);
  return t && typeof t.valor === "number" ? t.valor : null;
}

export default definirCalculadora({
  id: "co.salario-minimo-historico",
  mercado: "co",
  concepto: "propio",
  slug: "salario-minimo-historico",
  estado: "publicado",
  requiere: {
    "co.smmlv": "numero",
  },
  campos: [{ id: "anio", tipo: "entero", etiqueta: "Año", min: 2020, max: 2030, porDefecto: 2026 }],
  calcular(entrada, _valores, { redondear }) {
    const smmlv = valorDelAnio("co.smmlv", entrada.anio);
    if (smmlv === null) throw new ErrorEntrada(`No tenemos el salario mínimo de ${entrada.anio} verificado en su decreto.`, "anio");
    const auxilio = valorDelAnio("co.auxilio-transporte", entrada.anio);
    const anterior = valorDelAnio("co.smmlv", entrada.anio - 1);
    return {
      smmlv,
      auxilio,
      total: auxilio === null ? null : smmlv + auxilio,
      diario: redondear(smmlv / 30),
      aumento: anterior === null ? null : (smmlv / anterior - 1) * 100,
    };
  },
  resultado: [
    { clave: "smmlv", etiqueta: "Salario mínimo mensual", formato: "moneda", decimales: 0, destacada: true },
    { clave: "auxilio", etiqueta: "Auxilio de transporte", formato: "moneda", decimales: 0 },
    { clave: "total", etiqueta: "Salario mínimo con auxilio", formato: "moneda", decimales: 0 },
    { clave: "diario", etiqueta: "Salario mínimo diario", formato: "moneda", decimales: 0 },
    { clave: "aumento", etiqueta: "Aumento frente al año anterior", formato: "porcentaje", decimales: 2 },
  ],
});
