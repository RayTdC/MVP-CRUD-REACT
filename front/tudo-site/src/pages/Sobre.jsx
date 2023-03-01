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
            <h1 className='sobre-titulo'>𝙎𝙤𝙗𝙧𝙚 𝙣𝙤𝙨𝙨𝙤 𝘼𝙥𝙡𝙞𝙘𝙖𝙩𝙞𝙫𝙤</h1>


            <h4 className='texto-sobre'>𝙌𝙪𝙚𝙧 𝙖𝙥𝙧𝙤𝙫𝙚𝙞𝙩𝙖𝙧 𝙙𝙚𝙨𝙘𝙤𝙣𝙩𝙤𝙨 𝙚𝙢 𝙥𝙧𝙤𝙙𝙪𝙩𝙤𝙨 𝙙𝙚 𝙢𝙤𝙙𝙖 𝙛𝙚𝙢𝙞𝙣𝙞𝙣𝙖? 𝙞𝙨𝙨𝙤 𝙚́ 𝙥𝙤𝙨𝙨𝙞́𝙫𝙚𝙡 𝙘𝙤𝙢 𝙤 𝙣𝙤𝙨𝙨𝙤 𝙖𝙥𝙡𝙞𝙘𝙖𝙩𝙞𝙫𝙤 𝙙𝙖 𝙡𝙤𝙟𝙖 𝙈𝙤𝙙𝙖 & 𝙈𝙖𝙜𝙞𝙖. 𝘿𝙞𝙨𝙥𝙤𝙣𝙞́𝙫𝙚𝙡 𝙥𝙖𝙧𝙖 𝘼𝙣𝙙𝙧𝙤𝙞𝙙, 𝙄𝙥𝙝𝙤𝙣𝙚 (𝙄𝙊𝙎) 𝙚 𝙘𝙤𝙢𝙤 𝙥𝙡𝙪𝙜𝙞𝙣 𝙙𝙤 𝘾𝙝𝙧𝙤𝙢𝙚, 𝙤 𝙥𝙧𝙤𝙜𝙧𝙖𝙢𝙖 𝙜𝙧𝙖𝙩𝙪𝙞𝙩𝙤 𝙩𝙧𝙖𝙯 𝙤𝙛𝙚𝙧𝙩𝙖𝙨 𝙥𝙖𝙧𝙖 𝙞𝙩𝙚𝙣𝙨 𝙙𝙚 𝙢𝙖𝙧𝙘𝙖𝙨 𝙛𝙖𝙢𝙤𝙨𝙖𝙨.
𝙋𝙖𝙧𝙖 𝙚𝙣𝙩𝙧𝙖𝙧 𝙚𝙢 𝙘𝙤𝙣𝙩𝙖𝙩𝙤 𝙘𝙤𝙢 𝙣𝙤𝙨𝙨𝙖 𝙡𝙤𝙟𝙖 𝙪𝙨𝙚 𝙨𝙚𝙪 𝙚-𝙢𝙖𝙞𝙡, 𝙤 𝙪𝙨𝙪𝙖́𝙧𝙞𝙤 𝙥𝙤𝙙𝙚 𝙖𝙥𝙧𝙤𝙫𝙚𝙞𝙩𝙖𝙧 𝙖𝙨 𝙥𝙧𝙤𝙢𝙤𝙘̧𝙤̃𝙚𝙨 𝙚 𝙘𝙤𝙢𝙥𝙧𝙖𝙧 𝙘𝙤𝙢 𝙤 𝙘𝙖𝙧𝙩𝙖̃𝙤 𝙙𝙚 𝙘𝙧𝙚́𝙙𝙞𝙩𝙤, 𝙙𝙚́𝙗𝙞𝙩𝙤 𝙚 𝙥𝙞𝙭. 𝙀́ 𝙥𝙤𝙨𝙨𝙞́𝙫𝙚𝙡 𝙚𝙨𝙘𝙤𝙡𝙝𝙚𝙧 𝙢𝙤𝙙𝙚𝙡𝙤𝙨 𝙙𝙚 𝙧𝙤𝙪𝙥𝙖𝙨 𝙦𝙪𝙚 𝙚𝙨𝙩𝙖̃𝙤 𝙣𝙖 𝙢𝙤𝙙𝙖 𝙥𝙤𝙧 𝙪𝙢 𝙥𝙧𝙚𝙘̧𝙤 𝙢𝙖𝙞𝙨 𝙗𝙖𝙞𝙭𝙤 𝙚 𝙘𝙤𝙢 𝙢𝙪𝙞𝙩𝙤 𝙢𝙖𝙞𝙨 𝙦𝙪𝙖𝙡𝙞𝙙𝙖𝙙𝙚. 
𝙑𝙚𝙢 𝙛𝙖𝙯𝙚𝙧 𝙥𝙖𝙧𝙩𝙚 𝙙𝙤 𝙣𝙤𝙨𝙨𝙤 𝙢𝙪𝙣𝙙𝙤!!!♥</h4>
            <p>{sobre.text} </p>
            <Depoimentos />
        </Container>
    );
}

export default Sobre