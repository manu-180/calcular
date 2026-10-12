import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { dentroDelCupoEntrega, ipDelPedido } from "@/lib/acceso-entrega";
import { proveedor } from "@/lib/pagos";
import { leerReferenciaIntl } from "@/lib/pagos/catalogo-intl";
import { rutaDescargaIntl, rutaVerInformeIntl } from "@/lib/pagos/flujo-intl";
import { ID_PAYPAL } from "@/lib/pagos/paypal";
import { pagoCubre, type PagoVerificado } from "@/lib/pagos/tipos";
import { rutaIntl } from "@/motor/seo";
import type { CodigoMercado } from "@/motor/tipos";
import { contextoSitio } from "@/motor/ui/contexto";
import { IconoFlecha } from "@/motor/ui/Iconos";
import { registro } from "@/paises";
import { BotonDescarga } from "../_descarga";
import { textosPlanillas } from "../_textos";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { robots: { index: false, follow: false }, referrer: "no-referrer" };

type Props = { params: Promise<{ mercado: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> };

const uno = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

export default async function GraciasPlanillaIntl({ params, searchParams }: Props) {
  const { mercado } = await params;
  const sp = await searchParams;
  const ctx = contextoSitio(registro, mercado as CodigoMercado);
  if (!ctx || ctx.mercado.codigo === "global") notFound();
  const t = textosPlanillas(ctx.mercado);

  const prov = proveedor(uno(sp.proveedor));
  const id = uno(sp.pago);
  let pago: PagoVerificado | null = null;
  if (prov && prov.nombre !== "mercadopago" && ID_PAYPAL.test(id) && (await dentroDelCupoEntrega(ipDelPedido(await headers())))) {
    try {
      pago = await prov.consultarPago(id);
    } catch (e) {
      console.error("[planillas/gracias intl] no pude consultar el pago", prov.nombre, id, e);
    }
  }
  const ref = leerReferenciaIntl(pago?.referencia);
  const listo = !!pago && !!ref && pagoCubre(pago, ref.producto);

  return (
    <div className="cy-pagina">
      <header className="cy-heroe cy-heroe-chico">
        <h1 className="cy-titular">{t.graciasTitulo}</h1>
        <p className="cy-bajada">{listo && ref ? t.graciasListo(ref.producto) : t.graciasPendiente}</p>
      </header>
      {listo && pago && ref ? (
        ref.producto.tipo === "informe" ? (
          <p>
            <a className="cy-boton cy-boton-principal" href={rutaVerInformeIntl(ref.producto, pago.proveedor, pago.id)} rel="nofollow">
              <span>{t.abrirInforme}</span>
              <span className="cy-boton-icono">
                <IconoFlecha />
              </span>
            </a>
          </p>
        ) : (
          <BotonDescarga accion={rutaDescargaIntl(pago.proveedor, pago.id)} producto={ref.producto.id} texto={t.descargar} />
        )
      ) : null}
      <p>
        <a href={rutaIntl(ctx.mercado.codigo)}>{t.verCalculadoras}</a>
      </p>
    </div>
  );
}
