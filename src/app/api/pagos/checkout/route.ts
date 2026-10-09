import { NextResponse, type NextRequest } from "next/server";
import { after } from "next/server";
import { usuarioActual } from "@/lib/auth/sesion";
import { CUENTAS_ACTIVAS } from "@/lib/funciones";
import { permitido } from "@/lib/limite";
import { emailValido } from "@/lib/mp";
import { servicio } from "@/lib/supabase/servicio";
import { ipDelPedido } from "@/lib/acceso-entrega";
import { proveedorIntl, ventaIntlActiva } from "@/lib/pagos";
import { productoIntl, referenciaIntl } from "@/lib/pagos/catalogo-intl";
import { origenDelPedido, origenesPermitidos, rutaPlanillasIntl } from "@/lib/pagos/flujo-intl";
import { filaCheckoutIntl, registrarCheckoutIntl } from "@/lib/pagos/ventas-intl";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function usuarioSinDemora() {
  const espera = new Promise<null>((r) => setTimeout(() => r(null), 1500));
  return Promise.race([usuarioActual().catch(() => null), espera]);
}

// Cada pedido crea una orden real en el proveedor: sin cupo, un script llena la cuenta de órdenes.
// Sin IP no hay forma de contar el cupo, y en Vercel siempre llega: un pedido sin ella no es normal.
async function dentroDelCupo(req: NextRequest): Promise<boolean> {
  const ip = ipDelPedido(req.headers);
  if (!ip) return false;
  return permitido(`checkout-intl:${ip}`, 10, 600);
}

const ir = (url: string) => NextResponse.redirect(url, 303);

// POST /api/pagos/checkout (form de la página comprar de calcularya): crea la orden server-side
// con el precio del catálogo y manda a la persona a aprobarla en el proveedor.
export async function POST(req: NextRequest) {
  const base = origenDelPedido(req.nextUrl.origin);
  let datos: FormData;
  try {
    datos = await req.formData();
  } catch {
    return new NextResponse("Pedido inválido", { status: 400 });
  }
  const producto = productoIntl(String(datos.get("p") ?? ""));
  if (!producto) return new NextResponse("Producto desconocido", { status: 404 });
  const volver = (estado: string) => `${base}${rutaPlanillasIntl(producto.mercado, "comprar")}?p=${producto.slug}&pago=${estado}`;

  if (!ventaIntlActiva()) return ir(volver("pronto"));

  const email = emailValido(String(datos.get("email") ?? ""));
  if (!email) return ir(`${base}${rutaPlanillasIntl(producto.mercado, "comprar")}?p=${producto.slug}&error=email`);

  const origen = req.headers.get("origin");
  const ajeno = origen !== null && !origenesPermitidos(req.nextUrl.origin).has(origen);
  // Campo trampa: un humano no lo ve. Desde otro sitio o con la trampa llena se cobra igual, pero
  // sin guardar ni prellenar el mail.
  const sospechoso = ajeno || String(datos.get("sitio") ?? "") !== "";
  if (sospechoso) console.warn("[pagos/checkout] pedido sospechoso, se sigue sin el mail", producto.id, origen);

  if (!(await dentroDelCupo(req))) {
    console.warn("[pagos/checkout] fuera de cupo", producto.id);
    return ir(volver("error"));
  }

  const proveedor = proveedorIntl();
  const checkoutId = crypto.randomUUID();
  const referencia = referenciaIntl(producto, checkoutId);
  const usuario = CUENTAS_ACTIVAS ? usuarioSinDemora() : null;
  const vuelta = new URL(`${base}/api/pagos/${proveedor.nombre}/vuelta`);
  vuelta.searchParams.set("m", producto.mercado);
  vuelta.searchParams.set("p", producto.slug);

  try {
    const orden = await proveedor.crearCheckout({
      producto,
      referencia,
      urlVuelta: vuelta.toString(),
      urlCancelar: volver("cancelado"),
      email: sospechoso ? null : email,
      idempotencia: checkoutId,
    });
    if (usuario) {
      const tarea = async () => {
        const u = await usuario;
        await registrarCheckoutIntl(
          servicio(),
          filaCheckoutIntl({
            checkoutId,
            producto,
            proveedor: proveedor.nombre,
            email: sospechoso ? null : email,
            vid: String(datos.get("vid") ?? ""),
            userId: u?.id,
            ruta: String(datos.get("ruta") ?? ""),
          }),
        );
      };
      try {
        after(tarea);
      } catch {
        void tarea().catch(() => {});
      }
    }
    return ir(orden.urlPago);
  } catch (e) {
    console.error("[pagos/checkout]", proveedor.nombre, producto.id, e);
    return ir(volver("error"));
  }
}
