export interface NavDropdownItem {
  label: string
  href: string
  external?: boolean
}

export interface NavLink {
  label: string
  href: string
  dropdown?: NavDropdownItem[]
}

export const navLinks: NavLink[] = [
  { label: 'Inicio', href: '#inicio' },
  {
    label: 'Portafolio',
    href: '#portafolio',
    dropdown: [
      { label: 'ChatBot-MentalHealth', href: '#portafolio-chatbot' },
      { label: 'PdM-Manager', href: '#portafolio-pdm' },
      { label: 'FastQA-HomePage', href: '#portafolio-fastqa' },
      { label: 'magiacafetera-ui', href: '#portafolio-magia' },
    ],
  },
  {
    label: 'Labores',
    href: '#labores',
    dropdown: [
      { label: 'Maratón Nacional', href: '#proyecto1' },
      { label: 'Representante UCP', href: '#proyecto2' },
      { label: 'ACIS/REDIS 2023', href: '#proyecto3' },
      { label: 'Apoyo Comunitario', href: '#proyecto4' },
      { label: 'Visita Obispo', href: '#proyecto5' },
    ],
  },
  {
    label: 'Contacto',
    href: '#contacto',
    dropdown: [
      { label: 'Email', href: 'mailto:nicolasceballosbrito@gmail.com' },
      { label: 'LinkedIn', href: 'https://linkedin.com/in/nicolas-ceballos-brito', external: true },
      { label: 'GitHub', href: 'https://github.com/Nico2603', external: true },
      { label: 'Twitter', href: 'https://twitter.com/NicolasCBrito', external: true },
      { label: 'Facebook', href: 'https://www.facebook.com/NicolasCeballosBrito', external: true },
      { label: 'Instagram', href: 'https://www.instagram.com/nico_ceballos26/', external: true },
    ],
  },
  { label: 'Sobre mí', href: '/about' },
  { label: 'Repositorios', href: '/repositories' },
]
