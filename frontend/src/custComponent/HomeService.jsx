import React from 'react'
import Container from "../Components/Container";
import services from "../utils/Data";

const HomeService = () => {
  return (
    <Container class1="home-wrapper-2 py-4">
    <div className="row">
      <div className="col-12">
        <div className="service d-flex align-items-center justify-content-between ">
          {services?.map((i, j) => {
            return (
              // eslint-disable-next-line react/jsx-key
              <div className="d-flex align-items-center gap-10" key={j}>
                <img src={i.image} alt="service"></img>
                <div>
                  <h6>{i.title}</h6>
                  <p className="mb-0">{i.tagline}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </Container>
  )
}

export default HomeService