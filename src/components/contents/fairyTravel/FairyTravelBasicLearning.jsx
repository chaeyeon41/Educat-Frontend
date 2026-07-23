import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@material-ui/core";
import "./FairyTravelBasicLearning.css";
import CheckBtn from "../../checkBtn/CheckBtn";

const FairyTravelBasicLearning = ({ contents }) => {
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
            {contents.basic.travelSlides.map((item, index) => (
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

export default FairyTravelBasicLearning;
