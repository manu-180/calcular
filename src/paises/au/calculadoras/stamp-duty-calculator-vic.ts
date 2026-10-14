import { aplicarEscala, definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { dolares } from "../lib/impuestos";

export default definirCalculadora({
  id: "au.stamp-duty-calculator-vic",
  mercado: "au",
  concepto: "propio",
  slug: "stamp-duty-calculator-vic",
  estado: "publicado",
  requiere: {
    "au.vic-transfer-duty": "escala",
    "au.vic-ppr-duty": "escala",
    "au.vic-umbrales": "mapa",
  },
  campos: [
    { id: "valor", tipo: "moneda", etiqueta: "Dutiable value of the property", min: 0, porDefecto: 800000 },
    { id: "vivienda", tipo: "si-no", etiqueta: "You will live in it as your home (principal place of residence)", porDefecto: true },
    { id: "primeraVivienda", tipo: "si-no", etiqueta: "You are a first home buyer", porDefecto: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.valor <= 0) throw new ErrorEntrada("Enter the value of the property.", "valor");
    const u = v["au.vic-umbrales"];
    const general = redondear(aplicarEscala(v["au.vic-transfer-duty"], entrada.valor));
    const observaciones: string[] = [];
    let duty = general;
    let regla = "General rates";
    if (entrada.primeraVivienda && entrada.vivienda && entrada.valor <= u["fhb-exencion"]) {
      duty = 0;
      regla = "First home buyer exemption";
    } else if (entrada.vivienda && entrada.valor <= u["ppr-tope"]) {
      duty = redondear(aplicarEscala(v["au.vic-ppr-duty"], entrada.valor));
      regla = "Principal place of residence concession";
    }
    if (entrada.primeraVivienda && !entrada.vivienda) observaciones.push("First home buyer savings need you to live in the property as your home.");
    if (entrada.primeraVivienda && entrada.vivienda && entrada.valor > u["fhb-exencion"]) {
      observaciones.push(`The first home buyer exemption covers homes up to ${dolares(u["fhb-exencion"])}. Above it, check the SRO first home buyer concession, which this calculator does not include.`);
    }
    return { duty, general, ahorro: redondear(general - duty), regla, observaciones };
  },
  resultado: [
    { clave: "duty", etiqueta: "Land transfer duty (stamp duty)", formato: "moneda", destacada: true },
    { clave: "regla", etiqueta: "Rates used", formato: "texto" },
    { clave: "general", etiqueta: "Duty at the general rates", formato: "moneda" },
    { clave: "ahorro", etiqueta: "Saving", formato: "moneda", ocultarSiCero: true },
  ],
});
