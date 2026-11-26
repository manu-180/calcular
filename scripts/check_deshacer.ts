// Quitar una fila y deshacerlo (src/lib/deshacer): la fila vuelve en su posición con sus datos, y si se
// quitaron varias seguidas cada «Deshacer» devuelve la última que se quitó hasta dejar la lista como estaba.
// Uso: npx tsx scripts/check_deshacer.ts
import { apilar, desapilar, insertarEn, quitarEn, type Quitada } from "../src/lib/deshacer";

const fallas: string[] = [];
const igual = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);
const esperar = (nombre: string, real: unknown, esperado: unknown) => {
  if (!igual(real, esperado)) fallas.push(`${nombre}: dio ${JSON.stringify(real)}, se esperaba ${JSON.stringify(esperado)}`);
};

type Fila = { id: string; monto: number };
const original: Fila[] = [
  { id: "a", monto: 1 },
  { id: "b", monto: 2 },
  { id: "c", monto: 3 },
  { id: "d", monto: 4 },
];

const uno = quitarEn(original, 1);
esperar("quitarEn saca la fila pedida", uno.lista.map((f) => f.id), ["a", "c", "d"]);
esperar("quitarEn devuelve la fila con sus datos y su posición", uno.quitada, { item: { id: "b", monto: 2 }, indice: 1 });
esperar("quitarEn no muta la lista original", original.length, 4);
esperar("restaurar una sola fila la devuelve a su lugar", insertarEn(uno.lista, uno.quitada!.indice, uno.quitada!.item), original);

esperar("quitarEn fuera de rango no toca nada", quitarEn(original, 9), { lista: original, quitada: null });
esperar("insertarEn con índice mayor al largo agrega al final", insertarEn([{ id: "a", monto: 1 }], 5, { id: "z", monto: 0 }).map((f) => f.id), ["a", "z"]);

let lista = original;
let pila: Quitada<Fila>[] = [];
for (const i of [3, 0, 1]) {
  const r = quitarEn(lista, i);
  lista = r.lista;
  pila = apilar(pila, r.quitada!);
}
esperar("tres quitadas seguidas", lista.map((f) => f.id), ["b"]);

function restaurarUltima(l: Fila[], p: Quitada<Fila>[]) {
  const { pila: resto, ultima } = desapilar(p);
  return { lista: ultima ? insertarEn(l, ultima.indice, ultima.item) : l, pila: resto, restaurada: ultima };
}

const r1 = restaurarUltima(lista, pila);
esperar("el primer Deshacer devuelve la última quitada (c)", r1.lista.map((f) => f.id), ["b", "c"]);
esperar("y la saca de la pila", r1.pila.length, 2);
const r2 = restaurarUltima(r1.lista, r1.pila);
esperar("el segundo devuelve la anterior (a) en su lugar", r2.lista.map((f) => f.id), ["a", "b", "c"]);
const r3 = restaurarUltima(r2.lista, r2.pila);
esperar("el tercero deja la lista como estaba, con sus datos", r3.lista, original);
esperar("con la pila vacía Deshacer no hace nada", restaurarUltima(r3.lista, r3.pila), { lista: original, pila: [], restaurada: null });

const editada = r1.lista.map((f) => (f.id === "b" ? { ...f, monto: 99 } : f));
const r2b = restaurarUltima(editada, r1.pila);
esperar("deshacer no pisa lo que se editó en las otras filas", r2b.lista, [
  { id: "a", monto: 1 },
  { id: "b", monto: 99 },
  { id: "c", monto: 3 },
]);

if (fallas.length) {
  console.error(`❌ deshacer: ${fallas.length} falla(s)`);
  for (const f of fallas) console.error(`  - ${f}`);
  process.exit(1);
}
console.log("✅ deshacer: quitar y restaurar dejan cada fila en su lugar");
