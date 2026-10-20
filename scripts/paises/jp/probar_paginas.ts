import { registro } from "../../../src/paises";

const hoy = "2026-10-18";
for (const slug of ["take-home-pay", "minimum-wage", "mortgage", "consumption-tax", "vat"]) {
  const p = registro.pagina("jp", slug, hoy, "interno");
  console.log(slug, p ? `ok (${p.calculadora.id})` : "null");
}
