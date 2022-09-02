import React from 'react';
import {Carousel} from "react-bootstrap";
import SliderCss from '../css/components/Slider.module.css'

const Slider = () => {
    return (
        <div className={SliderCss.div_block}>
            <Carousel >
                <Carousel.Item className={SliderCss.slider_item}>
                    <img
                        className={SliderCss.slider_item + ' d-block w-100'}
                        src={require('../img/img1.jpg')}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>Helicopters</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className={SliderCss.slider_item}>
                    <img
                        className={SliderCss.slider_item + ' d-block w-100'}
                        src={require('../img/img2.jpg')}
                        alt="Second slide"
                    />

                    <Carousel.Caption>
                        <h3>Cars & Trucks</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className={SliderCss.slider_item}>
                    <img
                        className={SliderCss.slider_item + ' d-block w-100'}
                        src={require('../img/img3.jpg')}
                        alt="Second slide"
                    />

                    <Carousel.Caption>
                        <h3>FPV</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className={SliderCss.slider_item}>
                    <img
                        className={SliderCss.slider_item + ' d-block w-100'}
                        src={require('../img/img4.jpg')}
                        alt="Second slide"
                    />

                    <Carousel.Caption>
                        <h3>BOATS</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
};

export default Slider;