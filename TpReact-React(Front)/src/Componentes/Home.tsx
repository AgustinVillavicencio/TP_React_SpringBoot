import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import NavBar from './NavBar';
import '../index.css';

const Home = () => {
  const [index, setIndex] = useState<number>(0);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      <NavBar />
      <Container className="mt-1">
        <Carousel data-bs-theme="light" activeIndex={index} onSelect={handleSelect} className="">
          <Carousel.Item>
            <img
              className="d-block w-100 carousel-image"
              src="https://i.pinimg.com/originals/f6/ba/7c/f6ba7c17006942eefa9abe023b4137d0.jpg"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 carousel-image"
              src="https://cbtelevision.com.mx/wp-content/uploads/2021/12/19.jpg"
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 carousel-image"
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjbzu0KLSDj1YzOaG6ljr3XIkQskUnw26HXGkaTqDnGzBooNmFXdV0P0jvFZYtiWkzJXoLZWbsRQmgJpxPfpDwZNKGzIvfXaKm_z2bTYuXbdlaWgPNLNjw0WZiD2hXxddEB67Byb9-o8UQ/s1600/29388312_2348032021889293_6494583792566603878_n.jpg"
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
        <div className="infoGeneral">
          <h1>Musical Hendrix</h1>
          <h2>Quiénes somos</h2>
          <p>
            Bienvenidos a nuestra tienda de instrumentos musicales. Nos dedicamos a ofrecer la mejor variedad de instrumentos para músicos de todos los niveles. Nuestra misión es proporcionar productos de alta calidad a precios competitivos, junto con un excelente servicio al cliente.
          </p>
        </div>
        <div className="infoGeneral">
          <h2>Contacto</h2>
          <ul>
            <li><a href="villavicencio.agustin.17@gmail.com<">Correo: villavicencio.agustin.17@gmail.com</a></li>
            <li><a href="tel:+123456789">Teléfono: +5492615350637</a></li>
            <li><a href="https://github.com/AgustinVillavicencio" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            <li><a href="https://www.linkedin.com/in/agustin-villavicencio-998199276/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          </ul>
        </div>
      </Container>
    </>
  );
};

export default Home;
