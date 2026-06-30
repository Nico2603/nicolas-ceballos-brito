import SeoHelmet from '../components/SeoHelmet'
import Footer from '../components/Footer'
import { CONTACT_EMAIL } from '../constants/social'

const pageTitle = 'Política de privacidad | Nicolás Ceballos Brito'
const pageDescription =
  'Política de privacidad y tratamiento de datos personales del portafolio profesional de Nicolás Ceballos Brito.'

const sections = [
  {
    title: '1. Responsable del tratamiento',
    content:
      'Nicolás Ceballos Brito es responsable del tratamiento de los datos que compartes a través del formulario de contacto, correo electrónico, WhatsApp y otros canales oficiales de este sitio.',
  },
  {
    title: '2. Datos que recolectamos',
    content:
      'Podemos recibir nombre, correo electrónico, mensaje de contacto y datos técnicos básicos de navegación (páginas visitadas, dispositivo, país aproximado) mediante Vercel Analytics y Speed Insights. No solicitamos datos sensibles.',
  },
  {
    title: '3. Finalidad',
    content:
      'La información se utiliza para responder solicitudes de contacto, evaluar oportunidades de colaboración y mejorar el rendimiento del sitio. No se comercializa ni se comparte con terceros sin fundamento legal.',
  },
  {
    title: '4. Derechos del titular',
    content:
      'Puedes solicitar actualización, corrección o eliminación de tus datos, así como limitar su uso, escribiendo al correo de contacto oficial.',
  },
  {
    title: '5. Conservación y seguridad',
    content:
      'Se aplican medidas razonables para proteger la información. Los datos se conservan solo durante el tiempo necesario para cumplir la finalidad de contacto y obligaciones legales aplicables en Colombia.',
  },
]

export default function PoliticaPrivacidad() {
  return (
    <>
      <SeoHelmet
        title={pageTitle}
        description={pageDescription}
        canonicalPath="/politica-privacidad"
      />

      <main className="bg-[var(--color-bg-primary)] pb-20 pt-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-label)]">
            Privacidad y datos personales
          </p>
          <h1 className="font-display text-4xl font-semibold tracking-tight md:text-5xl text-[var(--color-text-primary)]">
            Política de privacidad
          </h1>
          <p className="mt-4 leading-relaxed text-[var(--color-text-secondary)]">
            Esta política explica cómo se tratan los datos personales compartidos en esta web.
            Para ejercer tus derechos puedes escribir a <strong>{CONTACT_EMAIL}</strong>.
          </p>

          <div className="mt-8 space-y-5">
            {sections.map((section) => (
              <article
                key={section.title}
                className="rounded-xl border p-5 bg-[var(--color-bg-card)] border-[var(--color-border-light)]"
              >
                <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
                  {section.title}
                </h2>
                <p className="mt-2 leading-relaxed text-[var(--color-text-secondary)]">
                  {section.content}
                </p>
              </article>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
