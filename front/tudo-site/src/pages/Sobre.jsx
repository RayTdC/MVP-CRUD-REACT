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
            <h1 className='sobre-titulo' >ππ€ππ§π π£π€π¨π¨π€ πΌπ₯π‘ππππ©ππ«π€</h1>
 
            <p>{sobre.text} </p>
            <Depoimentos />
        </Container>
    );
}

export default Sobre