import Carousel from 'react-bootstrap/Carousel'

function Banners() {
    return (
        <Carousel variant="dark" className='conteudo-margin'>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://horacampinas.com.br/wp-content/uploads/2022/03/abre-horizontal.jpg"
                        alt="Slide incrível"
                    />
                    <Carousel.Caption>
                        <h5>CONFIRA NOSSOS PRODUTOS</h5>
                        <p>Calça Jeans Flare Feminina R$ 69,00</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://cdn.progresso.com.br/img/pc/780/530/dn_arquivo/2022/08/anyconvcom-design-sem-nome-4_2.jpg"
                        alt="Outro slide incrível"
                    />
                    <Carousel.Caption>
                        <h5>ROUPAS DE FRIO</h5>
                        <p>COM 50% DE DESCONTO</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://checkregistros.com.br/wp-content/uploads/2021/08/burgess-milner-OYYE4g-I5ZQ-unsplash-scaled.jpg"
                        alt="Último slide"
                    />
                    <Carousel.Caption>
                        <h5>ROUPAS DE QUALIDADE</h5>
                        <br></br>
                        <p>
                           A PREÇO DE FÁBRICA
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            
            
    )
}

export default Banners
