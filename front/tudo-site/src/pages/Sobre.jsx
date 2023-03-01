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


            <h4>𝓠𝓾𝓮𝓻 𝓪𝓹𝓻𝓸𝓿𝓮𝓲𝓽𝓪𝓻 𝓭𝓮𝓼𝓬𝓸𝓷𝓽𝓸𝓼 𝓮𝓶 𝓹𝓻𝓸𝓭𝓾𝓽𝓸𝓼 𝓭𝓮 𝓶𝓸𝓭𝓪 𝓯𝓮𝓶𝓲𝓷𝓲𝓷𝓪? 𝓘𝓼𝓼𝓸 𝓮́ 𝓹𝓸𝓼𝓼𝓲́𝓿𝓮𝓵 𝓬𝓸𝓶 𝓸 𝓪𝓹𝓵𝓲𝓬𝓪𝓽𝓲𝓿𝓸 𝓭𝓪 𝓵𝓸𝓳𝓪 𝓜𝓸𝓭𝓪 𝓮 𝓜𝓪𝓰𝓲𝓪. 𝓓𝓲𝓼𝓹𝓸𝓷𝓲́𝓿𝓮𝓵 𝓹𝓪𝓻𝓪 𝓐𝓷𝓭𝓻𝓸𝓲𝓭, 𝓲𝓟𝓱𝓸𝓷𝓮 (𝓲𝓞𝓢) 𝓮 𝓬𝓸𝓶𝓸 𝓹𝓵𝓾𝓰𝓲𝓷 𝓭𝓸 𝓒𝓱𝓻𝓸𝓶𝓮, 𝓸 𝓹𝓻𝓸𝓰𝓻𝓪𝓶𝓪 𝓰𝓻𝓪𝓽𝓾𝓲𝓽𝓸 𝓽𝓻𝓪𝔃 𝓸𝓯𝓮𝓻𝓽𝓪𝓼 𝓹𝓪𝓻𝓪 𝓲𝓽𝓮𝓷𝓼 𝓭𝓮 𝓶𝓪𝓻𝓬𝓪𝓼 𝓯𝓪𝓶𝓸𝓼𝓪𝓼.
𝓟𝓪𝓻𝓪 𝓮𝓷𝓽𝓻𝓪𝓻 𝓮𝓶 𝓬𝓸𝓷𝓽𝓪𝓽𝓸 𝓬𝓸𝓶 𝓷𝓸𝓼𝓼𝓪 𝓵𝓸𝓳𝓪 𝓾𝓼𝓮 𝓼𝓮𝓾 𝓮-𝓶𝓪𝓲𝓵, 𝓸 𝓾𝓼𝓾𝓪́𝓻𝓲𝓸 𝓹𝓸𝓭𝓮 𝓪𝓹𝓻𝓸𝓿𝓮𝓲𝓽𝓪𝓻 𝓪𝓼 𝓹𝓻𝓸𝓶𝓸𝓬̧𝓸̃𝓮𝓼 𝓮 𝓬𝓸𝓶𝓹𝓻𝓪𝓻 𝓬𝓸𝓶 𝓸 𝓬𝓪𝓻𝓽𝓪̃𝓸 𝓭𝓮 𝓬𝓻𝓮́𝓭𝓲𝓽𝓸, 𝓭𝓮́𝓫𝓲𝓭𝓸 𝓮 𝓹𝓲𝔁. 𝓔́ 𝓹𝓸𝓼𝓼𝓲́𝓿𝓮𝓵 𝓮𝓼𝓬𝓸𝓵𝓱𝓮𝓻 𝓶𝓸𝓭𝓮𝓵𝓸𝓼 𝓭𝓮 𝓻𝓸𝓾𝓹𝓪𝓼 𝓺𝓾𝓮 𝓮𝓼𝓽𝓪̃𝓸 𝓷𝓪 𝓶𝓸𝓭𝓪 𝓹𝓸𝓻 𝓾𝓶 𝓹𝓻𝓮𝓬̧𝓸 𝓶𝓪𝓲𝓼 𝓫𝓪𝓲𝔁𝓸 𝓮 𝓬𝓸𝓶 𝓶𝓾𝓲𝓽𝓸 𝓶𝓪𝓲𝓼 𝓺𝓾𝓪𝓵𝓲𝓭𝓪𝓭𝓮.
𝓥𝓮𝓶 𝓯𝓪𝔃𝓮𝓻 𝓹𝓪𝓻𝓽𝓮 𝓭𝓸 𝓷𝓸𝓼𝓼𝓸 𝓶𝓾𝓷𝓭𝓸!!! ♥</h4>
            <p>{sobre.text} </p>
            <Depoimentos />
        </Container>
    );
}

export default Sobre