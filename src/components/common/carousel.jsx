import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import '../dashboard.css';  

class ImageCarousel extends Component {
    state = {  }
    render() { 
        const{image1, image2, image3}=this.props;
        return ( 
            <React.Fragment>
                <div className="carousel">
               <Carousel>
                <Carousel.Item>
                    <img
                    className="image1 d-block "
                    src={image1}
                    alt="First slide"
                    />
                    
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="image2 d-block "
                    src={image2}
                    alt="Second slide"
                    />

                    
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="image3 d-block "
                    src={image3}
                    alt="Third slide"
                    />

                
                </Carousel.Item>
                </Carousel>
                </div>
            </React.Fragment>
         );
    }
}
 
export default ImageCarousel;