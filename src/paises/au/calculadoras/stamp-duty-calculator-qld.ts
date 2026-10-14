import { aplicarEscala, definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

// QRO cobra "por cada $100 o fracción": el excedente sobre el límite del tramo se redondea hacia
// arriba a la centena antes de aplicar la tasa.
function dutyQld(escala: readonly FilaEscala[], valor: number): number {
  let fila = escala[0];
  for (const f of escala) if (valor > f.desde) fila = f;
  const exceso = Math.ceil(Math.max(0, valor - fila.desde) / 100) * 100;
  return (fila.cuotaFija ?? 0) + (exceso * fila.tasa) / 100;
}

export default definirCalculadora({
  id: "au.stamp-duty-calculator-qld",
  mercado: "au",
  concepto: "propio",
  slug: "stamp-duty-calculator-qld",
  estado: "publicado",
  requiere: {
    "au.qld-transfer-duty": "escala",
    "au.qld-home-duty": "escala",
    "au.qld-fhb-concesion": "escala",
  },
  campos: [
    { id: "valor", tipo: "moneda", etiqueta: "Purchase price or value of the property", min: 0, porDefecto: 700000 },
    { id: "vivienda", tipo: "si-no", etiqueta: "You will live in it as your home", porDefecto: true },
    { id: "primeraVivienda", tipo: "si-no", etiqueta: "It is your first home", porDefecto: false },
    { id: "nueva", tipo: "si-no", etiqueta: "It is a new home or vacant land to build on", porDefecto: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.valor <= 0) throw new ErrorEntrada("Enter the value of the property.", "valor");
    const general = redondear(dutyQld(v["au.qld-transfer-duty"], entrada.valor));
    const observaciones: string[] = [];
    let duty = general;
    let regla = "Transfer duty rates";
    if (entrada.vivienda) {
      const hogar = dutyQld(v["au.qld-home-duty"], entrada.valor);
      duty = redondear(hogar);
      regla = "Home concession rates";
      if (entrada.primeraVivienda && entrada.nueva) {
        duty = 0;
        regla = "First home (new home or vacant land) concession";
        observaciones.push("For contracts from 1 May 2025, first home buyers get a full concession on a new home or vacant land, with no price cap. Land not used for the residence is still charged.");
      } else if (entrada.primeraVivienda) {
        duty = redondear(Math.max(0, hogar - aplicarEscala(v["au.qld-fhb-concesion"], entrada.valor)));
        regla = "First home concession";
      }
    } else if (entrada.primeraVivienda || entrada.nueva) {
      observaciones.push("Home concessions need you to live in the property as your home.");
    }
    return { duty, general, ahorro: redondear(general - duty), regla, observaciones };
  },
  resultado: [
    { clave: "duty", etiqueta: "Transfer duty (stamp duty)", formato: "moneda", destacada: true },
    { clave: "regla", etiqueta: "Rates used", formato: "texto" },
    { clave: "general", etiqueta: "Duty at the general rates", formato: "moneda" },
    { clave: "ahorro", etiqueta: "Saving from concessions", formato: "moneda", ocultarSiCero: true },
  ],
});
