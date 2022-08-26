import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
const Episode = ({ episode_id, title, air_date, episode }) => {
  return (
    <>
      <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 mt-3">
        <Card key={episode_id}>
          <Card.Body>
            <Link to={`/episode/${episode_id}`}>
              <Card.Title>{episode_id}. {title}</Card.Title>
            </Link>
            <Card.Subtitle className="mb-2 text-muted">
              Air Date :{air_date}
            </Card.Subtitle>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default Episode;
