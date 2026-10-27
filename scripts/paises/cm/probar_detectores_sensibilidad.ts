// Prueba de sensibilidad: con la edición 2025 como última conocida, el detector de la DGI tiene que
// encontrar el CGI 2026; la página de búsqueda del SPM tiene que listar los tres decretos del SMIG.
import { crearHttpReal } from "../../datos-paises/lib/http";

async function main() {
  const http = crearHttpReal();
  const dgi = await http.texto("https://www.impots.cm/fr/documents/39", { userAgentNavegador: true });
  const codes = [...dgi.matchAll(/href="(\/sites\/default\/files\/documents\/CODE(?:%20| )GENERAL(?:%20| )DES(?:%20| )IMPOTS(?:%20| )(\d{4})[^"]*\.pdf)"/gi)].map((m) => m[2]);
  console.log("DGI, éditions trouvées :", codes, "plus récentes que 2025 :", codes.filter((a) => Number(a) > 2025));
  const spm = await http.texto("https://www.spm.gov.cm/site/?q=fr/search/node/SMIG", { userAgentNavegador: true });
  const decrets = [...spm.matchAll(/n%C2%B0-?(\d{4})(\d{3,5})pm[^"]*salaire-minim/gi)].map((m) => `${m[1]}/${m[2]}`);
  console.log("SPM, décrets SMIG trouvés :", [...new Set(decrets)]);
}

void main();
