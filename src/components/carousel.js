import React from "react";
import CarouselComp from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import TopAlbums from "./topAlbums";
import Letterboxd from "./letterboxd";

const Carousel = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1
    },
  };

  return (
    <div style={{width: "600px"}}>
    <CarouselComp
      swipeable={false}
      draggable={false}
      showDots={false}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={3000}
      keyBoardControl={true}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      deviceType={"mobile"}
    >
      <div><TopAlbums/></div>
      <div><Letterboxd/></div>
    </CarouselComp>
    </div>
  );
};

export default Carousel;
