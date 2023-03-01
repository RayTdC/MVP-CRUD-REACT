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
            <h1>Sobre Nosso Aplicativo</h1>


            <h4>Quer aproveitar descontos em produtos de moda feminina? Isso é possível com o aplicativo da loja Moda e Magia. Disponível para Android, iPhone (iOS) e como plugin do Chrome, o programa gratuito traz ofertas para itens de marcas famosas.
Para entrar em contato com nossa loja use seu e-mail, o usuário pode aproveitar as promoções e comprar com o cartão de crédito, débido e pix. É possível escolher modelos de roupas que estão na moda por um preço mais baixo e com muito mais qualidade.
Vem fazer parte do nosso mundo!!! ♥</h4>
            <p>{sobre.text} </p>
            <Depoimentos />
        </Container>
    );
}

export default Sobre