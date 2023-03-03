import Carousel from 'react-bootstrap/Carousel'

function Banners() {
    return (
        <Carousel variant="dark" className='conteudo-margin'>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://user-images.githubusercontent.com/112560788/222493303-80f638ac-d8fd-4170-960e-62648cca9e09.png"
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
                        src="https://user-images.githubusercontent.com/112560788/222491841-f34a12f7-4326-4e24-8270-dd030dca80ba.png"
                        alt="Outro slide incrível"
                    />
                    <Carousel.Caption>
                        <h5></h5>
                        <p></p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://user-images.githubusercontent.com/112560788/222493663-6ce7cf3c-751f-4147-b622-225e85d847a9.png"
                        alt="Último slide"
                    />
                    <Carousel.Caption>
                        <h5></h5>
                        <br></br>
                        <p>
                           
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            
            
    )
}

export default Banners

