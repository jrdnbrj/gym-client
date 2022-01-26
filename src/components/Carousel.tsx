import { Carousel } from "react-bootstrap";
import Image from "next/image";

import carousel1 from "../assets/images/carousel1.jpg";
import carousel3 from "../assets/images/carousel3.jpg";
import carousel4 from "../assets/images/carousel4.jpg";
import carousel5 from "../assets/images/carousel5.jpg";
import carousel6 from "../assets/images/carousel6.jpg";


const CarouselHome = () => {
    return (
        <Carousel>
            <Carousel.Item>
                <Image className="d-block" src={carousel1} />
            </Carousel.Item>
            <Carousel.Item>
                <Image className="d-block" src={carousel3} />
            </Carousel.Item>
            <Carousel.Item>
                <Image className="d-block" src={carousel4} />
            </Carousel.Item>
            <Carousel.Item>
                <Image className="d-block" src={carousel5} />
            </Carousel.Item>
            <Carousel.Item>
                <Image className="d-block" src={carousel6} />
            </Carousel.Item>
        </Carousel>
    );
};


export default CarouselHome;
