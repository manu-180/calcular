import https from "node:https";
import { leerTipoCambioBcn } from "../../../src/paises/ni/fuentes";
import type { PuntoSerie } from "../../../src/motor/tipos";

export const SOAP_BCN = "https://servicios.bcn.gob.ni/Tc_Servicio/ServicioTC.asmx";

// servicios.bcn.gob.ni solo negocia TLS 1.0 y 1.1: OpenSSL 3 lo rechaza con el nivel de seguridad por
// defecto ("unsupported protocol"). El dato es público y solo se lee.
function postSoap(accion: string, cuerpo: string): Promise<string> {
  const sobre = `<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body>${cuerpo}</soap:Body></soap:Envelope>`;
  return new Promise((resolve, reject) => {
    const req = https.request(
      SOAP_BCN,
      {
        method: "POST",
        minVersion: "TLSv1",
        ciphers: "DEFAULT@SECLEVEL=0",
        timeout: 60_000,
        headers: { "Content-Type": "text/xml; charset=utf-8", SOAPAction: `"http://servicios.bcn.gob.ni/${accion}"` },
      },
      (res) => {
        let s = "";
        res.setEncoding("utf8");
        res.on("data", (c: string) => (s += c));
        res.on("end", () => (res.statusCode === 200 ? resolve(s) : reject(new Error(`HTTP ${res.statusCode}`))));
      },
    );
    req.on("timeout", () => req.destroy(new Error("timeout")));
    req.on("error", reject);
    req.end(sobre);
  });
}

export async function mesBcn(anio: number, mes: number): Promise<PuntoSerie[] | null> {
  const xml = await postSoap("RecuperaTC_Mes", `<RecuperaTC_Mes xmlns="http://servicios.bcn.gob.ni/"><Ano>${anio}</Ano><Mes>${mes}</Mes></RecuperaTC_Mes>`);
  return leerTipoCambioBcn(xml);
}

export async function diaBcn(anio: number, mes: number, dia: number): Promise<number | null> {
  const xml = await postSoap("RecuperaTC_Dia", `<RecuperaTC_Dia xmlns="http://servicios.bcn.gob.ni/"><Ano>${anio}</Ano><Mes>${mes}</Mes><Dia>${dia}</Dia></RecuperaTC_Dia>`);
  const m = /<RecuperaTC_DiaResult>([\d.]+)<\/RecuperaTC_DiaResult>/.exec(xml);
  return m ? Number(m[1]) : null;
}
