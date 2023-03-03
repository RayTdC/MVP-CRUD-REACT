import Carousel from 'react-bootstrap/Carousel'

function Banners() {
    return (
        <Carousel variant="dark" className='conteudo-margin'>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://user-images.githubusercontent.com/101163328/222626691-07a4fc29-2263-42ec-a5d0-fe31c7574f52.png"
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
                        src="https://user-images.githubusercontent.com/101163328/222622731-e78e6b2f-e6c5-435a-9a8b-54ea7576a1a9.png"
                        alt="Outro slide incrível"
                    />
                    <Carousel.Caption>
                        <h5 className="legenda">ROUPAS DE FRIO</h5>
                        <p className="legenda">COM 50% DE DESCONTO</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://user-images.githubusercontent.com/101163328/222626525-fe514881-4ebb-475c-a1d2-03021db847b3.png"
                        alt="Último slide"
                    />
                    <Carousel.Caption>
                        <h5 className="legenda">ROUPAS DE QUALIDADE</h5>
                        <br></br>
                        <p className="legenda">
                           A PREÇO DE FÁBRICA
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>


            
            
    )
}

export default Banners
