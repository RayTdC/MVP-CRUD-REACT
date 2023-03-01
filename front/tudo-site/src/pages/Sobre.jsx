import Container from 'react-bootstrap/Container'
import Depoimentos from '../components/Depoimentos'
import { useEffect, useState } from 'react'
import CmsApi from '../api/CmsApi'

function Sobre() {
    const [sobre, setSobre] = useState([])

    useEffect (() => {
        async function getSobre() {
            const response = await CmsApi().getSobre()
            const sobre = await response.json()
            setSobre(sobre.data)
        }

        getSobre()
    }, [])

    return (
        <Container className='conteudo-margin'>
            <h1>Sobre Nossa Loja</h1>


            <h4>Nascemos em um pequeno cantinho, no interior de uma galeria, com 15 metros quadrados, em agosto de 2011. De lá pra cá, muuuita coisa mudou. Para melhor, é claro. Com o passar dos anos, fomos nos adaptando e aprendendo muito com cada uma das pessoas que por aqui passou. Passamos a compreender que a moda vai muito além de seguir tendências. Entendemos que se vestir é uma forma de comunicação, tem a ver com estilo individual de vida e precisa nos fazer sentir bem.
Nossa meta é construir e manter, uma relação de confiança e amizade com você, através do nosso atendimento e acolhimento. Acreditamos que a Moda pode (e deve) ser Consciente, Descomplicada e Versátil.

Para te apresentar a nossa proposta, realizamos uma curadoria minuciosa, com peças selecionadas a dedo e que sempre conversam entre si. Te demonstramos o quanto é possível consumir com consciência, ser descomplicada e abusar da versatilidade. Ahh, não podíamos esquecer de te contar o nosso toque final: aqui, em cade detalhe, você vai encontrar muuuuuito amor!

Vem fazer parte do nosso mundo!!! ♥</h4>
            <p>{sobre.text} </p>
            <Depoimentos />
        </Container>
    );
}

export default Sobre