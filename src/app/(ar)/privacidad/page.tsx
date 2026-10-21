import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description:
    "Qué datos guarda CalculAR, para qué los usa y cómo pedir que los borremos. Medición propia sin cookies, cuentas opcionales y pagos por MercadoPago.",
  alternates: { canonical: "/privacidad" },
  robots: { index: false },
};

const CONTACTO = "soporte@calcular.ar";

function Seccion({ id, titulo, children }: { id: string; titulo: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-t`} className="space-y-3">
      <h2 id={`${id}-t`} className="text-lg font-semibold text-zinc-900">
        {titulo}
      </h2>
      <div className="space-y-3 text-[15px] leading-relaxed text-pretty text-zinc-600">{children}</div>
    </section>
  );
}

const enlace = "font-medium text-emerald-700 underline decoration-emerald-300 underline-offset-2 hover:decoration-emerald-500";

export default function PrivacidadPage() {
  return (
    <article className="mx-auto max-w-2xl space-y-10">
      <header className="space-y-3">
        <h1 className="text-titular font-bold text-zinc-900">Política de privacidad</h1>
        <p className="text-xs text-zinc-500">Última actualización: 6 de octubre de 2026</p>
        <p className="text-[15px] leading-relaxed text-pretty text-zinc-600">
          Podés usar todas las calculadoras sin registrarte y sin darnos ningún dato. Acá está qué se
          guarda cuando usás el sitio, para qué, y cómo pedir que lo borremos.
        </p>
      </header>

      <nav aria-label="En esta página" className="rounded-2xl border border-zinc-900/[0.06] bg-white/70 p-5">
        <p className="text-xs font-semibold text-zinc-900">En resumen</p>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-zinc-600">
          <li>
            Lo que escribís en una calculadora se queda en tu navegador. Sólo si comprás una planilla o un
            informe, los valores de esa calculadora viajan con el pago para armártelo.
          </li>
          <li>Medimos el uso del sitio con una herramienta propia que no usa cookies ni guarda tu IP.</li>
          <li>La cuenta es opcional. Si la creás, guardamos tu mail y lo que elijas guardar.</li>
          <li>Los pagos los procesa MercadoPago: nunca vemos los datos de tu tarjeta.</li>
          <li>
            Para ver o borrar tus datos, escribinos a{" "}
            <a href={`mailto:${CONTACTO}`} className={enlace}>
              {CONTACTO}
            </a>
            .
          </li>
        </ul>
      </nav>

      <Seccion id="calculadoras" titulo="Lo que escribís en las calculadoras">
        <p>
          Los valores que cargás (tu sueldo, tu facturación, una fecha) se procesan en tu navegador. Mientras
          usás el sitio no se mandan a nuestros servidores.
        </p>
        <p>
          En las calculadoras que tienen una planilla o un informe para comprar, tu navegador recuerda
          durante 7 días los últimos valores que cargaste, para que lo que compres salga con tus números.
          Queda sólo en tu dispositivo: si cambiás los datos, se reemplazan, y si los dejás incompletos, se
          borran.
        </p>
        <p>Hay dos casos en que los valores sí salen de tu navegador, y los dos los decidís vos:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            si tenés cuenta y tocás «Guardar», guardamos ese cálculo (la página, los valores que cargaste y
            un resumen del resultado) para que lo encuentres después. Podés borrarlo cuando quieras desde
            tu cuenta;
          </li>
          <li>
            si comprás, en la sección de compras está qué viaja con el pago. Lo podés evitar
            destildando «Usar los datos que cargué en la calculadora» antes de pagar.
          </li>
        </ul>
      </Seccion>

      <Seccion id="medicion" titulo="Cómo medimos el uso del sitio">
        <p>
          Para saber qué calculadoras sirven y cuáles hay que mejorar usamos una medición propia, sin
          cookies. Tu navegador guarda dos identificadores al azar: uno que se queda en el dispositivo y
          otro que dura lo que dura la visita. No están atados a tu nombre, a tu mail ni a nada que te
          identifique.
        </p>
        <p>
          Con eso registramos qué páginas se ven, cuánto tiempo, hasta dónde se leen, si se usó la
          calculadora, desde qué sitio o campaña llegaste, el país (sale de la red) y si entraste desde
          un celular, una tablet o una computadora. <strong className="font-semibold text-zinc-800">No
          guardamos tu dirección IP ni los datos de tu navegador</strong>, ni los valores que escribís.
        </p>
        <p>
          Si usás el buscador, guardamos lo que buscaste para mejorar los resultados. Si la búsqueda
          parece un dato personal (un número largo como un DNI o un CUIT, o un mail), no se guarda.
        </p>
        <p>
          Las visitas no se asocian a tu cuenta. Algunas acciones sí quedan registradas con ella cuando
          las hacés con la sesión iniciada, como registrarte, ingresar o comprar.
        </p>
      </Seccion>

      <Seccion id="cuenta" titulo="Si creás una cuenta">
        <p>La cuenta es opcional: no hace falta para usar el sitio ni para comprar. Si la creás, guardamos:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>tu mail, y la fecha en que confirmaste que es tuyo;</li>
          <li>tu contraseña, que se guarda cifrada y nadie puede leer;</li>
          <li>tu nombre y a qué te dedicás, si los completás (son opcionales);</li>
          <li>si querés recibir novedades por mail;</li>
          <li>las planillas que compraste con ese mail;</li>
          <li>los cálculos que elijas guardar.</li>
        </ul>
        <p>
          Para mantenerte con la sesión iniciada usamos cookies necesarias: una de sesión, protegida para
          que ningún otro código de la página la pueda leer, y una marca sin datos que sólo le avisa a la
          página si mostrar «Ingresar» o «Mi cuenta». Se borran al cerrar la sesión y, si no, duran hasta
          13 meses.
        </p>
        <p>
          Los mails de la cuenta (confirmación, enlace para ingresar, cambio de contraseña) sólo se
          mandan cuando los pedís.
        </p>
      </Seccion>

      <Seccion id="compras" titulo="Si comprás una planilla o un informe">
        <p>
          El pago lo procesa MercadoPago: nosotros nunca vemos ni guardamos los datos de tu tarjeta ni de
          tu cuenta de MercadoPago. Para mandarte lo que compraste guardamos el mail que nos diste, el
          producto, el monto, el número de operación y si el pago se aprobó.
        </p>
        <p>
          Si al comprar dejás tildado «Usar los datos que cargué en la calculadora», los valores de esa
          calculadora viajan con el pago a MercadoPago y vuelven cuando abrís tu enlace, para armarte el
          archivo o el informe con tus números. Son sólo estos, según lo que compres:
        </p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>planilla de Comercio: mes, categoría, años de antigüedad, jornada y si cobra presentismo;</li>
          <li>planilla UOCRA: mes, categoría, zona, horas del mes, asistencia y aporte solidario;</li>
          <li>
            planilla de Casas Particulares: mes, categoría, con o sin retiro, horas por semana, zona
            desfavorable y horas extras;
          </li>
          <li>planilla de alquileres: el alquiler inicial, el mes en que empezó el contrato y cada cuánto se ajusta;</li>
          <li>planilla de Camioneros: mes, categoría y años de antigüedad;</li>
          <li>
            planilla de plazos fijos: el capital, la TNA, los días, las renovaciones, la inflación mensual y la tasa
            adicional del UVA que cargaste, y la fecha del día en que hiciste la cuenta;
          </li>
          <li>
            planilla Mi Sueldo: el sueldo bruto, el porcentaje de cuota sindical, el mes de la cuenta, el mes de tu
            último aumento y, si pediste estimar Ganancias, cónyuge e hijos a cargo y otras deducciones;
          </li>
          <li>
            planilla de vacaciones: la fecha de ingreso, el sueldo bruto, los días del tramo y la fecha de inicio de las
            vacaciones (el nombre de la persona no viaja: se escribe en el archivo);
          </li>
          <li>
            informe de liquidación por despido: el sueldo bruto, las fechas de ingreso y de despido, si hubo preaviso y el
            tope del convenio si lo informaste (tu nombre, la empresa y los montos que te ofrecen se escriben en la página
            y no salen de tu navegador);
          </li>
          <li>
            informe de Ganancias: el sueldo bruto mensual, si tenés cónyuge a cargo, cuántos hijos a cargo, el porcentaje
            de cuota sindical y el monto mensual de otras deducciones que ya declarás (lo que cargues después en el
            informe, como alquiler, prepaga o colegio, queda sólo en tu navegador);
          </li>
          <li>
            informe de actualización por inflación: el monto, el mes de origen, el mes de llegada (o «último dato»), el
            sueldo actual si lo cargaste y para qué es la carta (tu nombre, el del destinatario, la ciudad y el concepto
            no salen de tu navegador);
          </li>
          <li>
            informe de crédito laboral: el tipo de cada rubro (de una lista fija), su monto, el mes en que se hizo
            exigible, el mes de pago y el porcentaje de cuota litis (la carátula, las partes, el expediente y los nombres
            de los rubros no se envían);
          </li>
          <li>
            informe de cuota alimentaria: la edad de cada hijo (por tramo), el ingreso de quien paga, el del
            otro progenitor si lo cargaste y si el cuidado es compartido.
          </li>
        </ul>
        <p>
          Nunca viajan nombres, direcciones ni documentos: los nombres que escribas en el informe quedan en
          tu navegador. Esos valores quedan asociados al pago en MercadoPago mientras exista la operación.
          Si querés que los borremos, escribinos a{" "}
          <a href={`mailto:${CONTACTO}`} className={enlace}>
            {CONTACTO}
          </a>{" "}
          con el número de operación y nos ocupamos.
        </p>
        <p>
          Si tenés una cuenta con ese mismo mail confirmado, la compra aparece también ahí. Y si empezaste
          una compra y no la terminaste, puede llegarte un único mail para retomarla.
        </p>
      </Seccion>

      <Seccion id="novedades" titulo="Si te suscribís a las novedades">
        <p>
          Guardamos tu mail para mandarte las novedades que pediste. Cada mail trae un enlace para darte de
          baja con un clic.
        </p>
      </Seccion>

      <Seccion id="publicidad" titulo="Publicidad y cookies de terceros">
        <p>
          Algunas páginas muestran anuncios de Google AdSense. Es lo que nos permite mantener todas las
          calculadoras gratis. En las páginas donde vendemos una planilla evitamos los anuncios.
        </p>
        <p>
          Google y sus proveedores usan cookies para elegir qué anuncios mostrarte, a veces teniendo en
          cuenta páginas que visitaste antes en este o en otros sitios. Vos decidís cuánto de eso pasa:
          podés desactivar la publicidad personalizada de Google en{" "}
          <a href="https://myadcenter.google.com/" rel="nofollow noopener" target="_blank" className={enlace}>
            Mi centro de anuncios
          </a>{" "}
          y la del resto de los proveedores en{" "}
          <a href="https://www.aboutads.info/choices/" rel="nofollow noopener" target="_blank" className={enlace}>
            aboutads.info
          </a>
          . Si desactivás la personalización vas a seguir viendo anuncios, pero menos relacionados con vos.
        </p>
      </Seccion>

      <Seccion id="proveedores" titulo="Con quién trabajamos">
        <p>Para que el sitio funcione usamos estos servicios, que procesan datos en nuestro nombre:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Vercel, que aloja el sitio y procesa datos técnicos de cada visita (como la IP) para servirlo y protegerlo;</li>
          <li>Supabase, donde viven la base de datos y las cuentas;</li>
          <li>Resend, que envía los mails;</li>
          <li>MercadoPago, que cobra las compras;</li>
          <li>Google, que muestra los anuncios.</li>
        </ul>
        <p>No vendemos ni alquilamos tus datos a nadie.</p>
      </Seccion>

      <Seccion id="derechos" titulo="Tus derechos y cómo borrar tu cuenta">
        <p>
          Por la Ley 25.326 de Protección de Datos Personales podés pedirnos una copia de tus datos,
          corregirlos, actualizarlos o que los borremos. Para borrar tu cuenta con todo lo que tiene
          (perfil, cálculos guardados y el vínculo con tus compras), escribinos a{" "}
          <a href={`mailto:${CONTACTO}`} className={enlace}>
            {CONTACTO}
          </a>{" "}
          desde el mail de la cuenta. Respondemos dentro de los plazos de la ley: 10 días corridos para
          darte acceso a tus datos y 5 días hábiles para corregirlos o borrarlos.
        </p>
        <p>
          Guardamos el registro de las compras aunque borres la cuenta, porque lo necesitamos para cumplir
          con nuestras obligaciones y para poder atender un reclamo sobre ese pago.
        </p>
        <p className="rounded-xl bg-zinc-900/[0.03] p-4 text-sm">
          El titular de los datos personales tiene la facultad de ejercer el derecho de acceso a los
          mismos en forma gratuita a intervalos no inferiores a seis meses, salvo que se acredite un
          interés legítimo al efecto conforme lo establecido en el artículo 14, inciso 3 de la Ley N°
          25.326. La Agencia de Acceso a la Información Pública, en su carácter de Órgano de Control de la
          Ley N° 25.326, tiene la atribución de atender las denuncias y reclamos que interpongan quienes
          resulten afectados en sus derechos por incumplimiento de las normas vigentes en materia de
          protección de datos personales.
        </p>
      </Seccion>

      <Seccion id="externos" titulo="Enlaces a otros sitios">
        <p>
          Enlazamos a fuentes oficiales (como ARCA, el BCRA o el Boletín Oficial) y a otros sitios. Sus
          prácticas de privacidad son las de cada uno.
        </p>
      </Seccion>

      <Seccion id="cambios" titulo="Cambios y contacto">
        <p>
          Si cambiamos algo importante de esta política, lo vas a ver acá con la fecha nueva arriba. Por
          cualquier duda, escribinos desde la{" "}
          <Link href="/contacto" className={enlace}>
            página de contacto
          </Link>
          .
        </p>
      </Seccion>
    </article>
  );
}
