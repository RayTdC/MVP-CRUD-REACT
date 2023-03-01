import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Depoimentos() {
    return (
        <>
        <h2 className='mt-3'>Depoimentos</h2>
        <Row className='mt-3'>
            <Col sm="12" md="2" className='text-center'>
                <img src="https://via.placeholder.com/100/ffd000" alt="Foto do depoimento" className='rounded' />
            </Col>
            <Col sm="12" md="10">
                <strong>Depoimento 1</strong>
                <p>
                    "Super indico a loja. Além do atendimento maravilhoso as roupas são de excelente qualidade,trabalham só com os melhores tecidos.As roupas não desbotam,não dão bolinhas,não encolhem... simplesmente maravilhosas.O atendimento é nota 1000.Qualquer dúvida na hora da compra eles auxiliam e o envio tb é super rápido, chegando sempre antes do prazo. Sou fã da Moda e Magia ♥"
                </p>
            </Col>
        </Row>
        <Row className='mt-3'>
            <Col sm="12" md="2" className='text-center'>
                <img src="https://via.placeholder.com/100/ffd000" alt="Foto do depoimento 2" className='rounded' />
            </Col>
            <Col sm="12" md="10">
                <strong>Depoimento 2</strong>
                <p>
                "Perfeito. Desde o início, excelente atendimento, recebi muito rápido, muito cuidado e delicadeza com a embalagem, produto lindo e de boa qualidade. Indico e irei virar cliente. Parabéns!."
                </p>
            </Col>
        </Row>        
        <Row className='mt-3'>
            <Col sm="12" md="2" className='text-center'>
                <img src="https://via.placeholder.com/100/ffd000" alt="Foto do depoimento 2" className='rounded' />
            </Col>
            <Col sm="12" md="10">
                <strong>Depoimento 3</strong>
                <p>
                "Só admiração por essa loja, fui a loja física e fui muito bem atendida, time nota 1000. Parabéns meninas, o atendimento faz toda a diferença em uma empresa, voltarei mais vezes."
                </p>
            </Col>
        </Row>        
        </>
    )
}

export default Depoimentos