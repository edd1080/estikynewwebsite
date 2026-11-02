import WrapCar from '../components/WrapCar'
import { Button, Container } from '../components/ui'
import { useSeo } from '../lib/seo'

export default function NotFound() {
  useSeo('Página no encontrada', 'La página que buscas no existe.', '/404', true)
  return (
    <section className="nf">
      <Container>
        <div className="nf__inner">
          <WrapCar coverage="full" color="#5B3DF5" accent="#C8F31D" text="404" />
          <h1 className="h1 h1--page">Este auto se salió de la ruta.</h1>
          <p className="lead lead--xl">No encontramos la página que buscas. Vuelve al inicio o elige tu camino.</p>
          <div className="btn-row">
            <Button to="/" icon="arrow">Soy anunciante</Button>
            <Button to="/conductores" variant="ink" icon="arrow">Soy conductor</Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
