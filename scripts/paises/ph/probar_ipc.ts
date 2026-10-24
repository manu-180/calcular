import { crearHttpReal, httpParaDetector, type LlamadaHttp } from "../../datos-paises/lib/http";
import { detectores } from "../../../src/paises/ph/fuentes";

async function main(): Promise<void> {
  const detector = detectores.find((d) => d.id === "ph.psa-cpi");
  if (!detector) throw new Error("falta el detector ph.psa-cpi");
  const registro: LlamadaHttp[] = [];
  const puntos = await detector.traer(httpParaDetector(crearHttpReal(120_000), detector, registro));
  console.log(registro.map((r) => `${r.ok ? "ok" : "error"} ${r.ms} ms ${r.error ?? ""}`).join("\n"));
  if (!puntos || !("length" in puntos)) return console.log("null");
  const lista = puntos as readonly { fecha: string; valor: number }[];
  console.log(lista.length, JSON.stringify(lista.slice(0, 2)), JSON.stringify(lista.slice(-3)));
}

void main();
