import React from 'react'
import { Card, Avatar, Col, Typography, Row } from 'antd';
import { IMAGE_BASE_URL } from '../Config';

function GridCards(props) {

    let { actor, key, image, movieId, movieName, characterName, overview, rating, actorName } = props
    const POSTER_SIZE = "w154";

    if (actor) {
        return (
            <Col key={key} lg={6} md={8} xs={24}>
                <div style={{ position: 'relative' }}>
                    <img className="movie-hover" style={{ width: '100%', height: '320px' }} alt={characterName} src={`${IMAGE_BASE_URL}${POSTER_SIZE}${image}`} title={overview} />
                    
                    
                    
                    <div className="rating-div" style={{ position: "relative" }}>
                  <div
                    className="movie-overview"
                    style={{
                      position: "absolute",
                      maxWidth: "500px",
                      bottom: "1rem",
                      marginLeft: "2rem",
                    }}
                  >
                    <p
                      style={{ color: "white", fontSize: "1rem", fontWeight:"bold", margin: "0" }}
                    >
                      Rating {rating}{" "}
                    </p>
                  </div>
                </div>

<div>
  </div>
                <div > <b> Character: {characterName} </b></div>
                <div > <b> Actor: {actorName} </b></div>

                </div>
            </Col>
        )
    } else {
        return (
          <Col key={key} lg={6} md={8} xs={24}>
            <div style={{ position: "relative" }}>
              <a href={`/movie/${movieId}`}>
                <img
                  className="movie-hover"
                  style={{ width: "100%", height: "320px" }}
                  alt={movieName}
                  src={image}
                  title={overview}
                />
                <div className="rating-div" style={{ position: "relative" }}>
                  <div
                    className="movie-overview"
                    style={{
                      position: "absolute",
                      maxWidth: "500px",
                      bottom: "1rem",
                      marginLeft: "2rem",
                    }}
                  >
                    <p
                      style={{ color: "white", fontSize: "1rem", fontWeight:"bold", margin: "0" }}
                    >
                      Rating {rating}{" "}
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </Col>
        );
    }

}

export default GridCards
