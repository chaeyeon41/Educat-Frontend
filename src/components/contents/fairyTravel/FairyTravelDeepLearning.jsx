import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@material-ui/core";
import "./FairyTravelBasicLearning.css";

const FairyTravelDeepLearning = ({ contents }) => {
  return (
    <>
      {contents && (
        <div className="carouselContainer">
          <Carousel
            timeout={0}
            autoPlay={false}
            navButtonsAlwaysVisible={true}
            animation="fade"
          >
            {contents.deep.travelSlides.map((item, index) => (
              <Paper className="carouselItem" key={index}>
                <img
                  className="carouselImage"
                  src={item.image}
                  alt={item.title}
                />
              </Paper>
            ))}
          </Carousel>
        </div>
      )}
    </>
  );
};

export default FairyTravelDeepLearning;
