import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "./Spinner";

const EpisodeDetails = () => {
  const { episodeID } = useParams();

  const [episodes, setEpisodes] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchImg = async () => {
    setIsLoading(true);
    const res = await axios.get(
      `https://www.breakingbadapi.com/api/characters`
    );
    setCharacters(res.data);
    console.log(res.data);
    setIsLoading(false)
  };
  const fetchData = async () => {
    setIsLoading(true);
    const res = await axios.get(
      `https://www.breakingbadapi.com/api/episodes/${episodeID}`
    );
    setEpisodes(res.data);
    setIsLoading(false)
    // console.log(res.data);
  };
  useEffect(() => {
    fetchData();
    fetchImg();
  }, [episodeID]);
  return (
    <>
      {isLoading ? <Spinner /> :
        <>
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 episode_card mt-5">
                <Card>
                  {episodes.map((episode, index) => {
                    return (
                      <>
                        <Card.Body key={index}>
                          <Card.Title>
                            <h2 className="heading"> {episode.episode_id}. {episode.title}</h2>
                          </Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">
                            Air Date : {episode.air_date}
                          </Card.Subtitle>
                          <Card.Subtitle className="mb-2 text-muted">
                            Season: {episode.season}
                            <br />
                            Series : {episode.series}
                            <br />
                          </Card.Subtitle>
                        </Card.Body>
                        <div className="character_main mt-5">
                          <h2 className="text-center heading">Characters</h2>
                          <div className="">
                            <div className="row">
                              {episode.characters.map((character) => {
                                return characters.map((char, index) =>
                                  (char.name === character ||
                                    char.nickname === character.substring(0, 4)) &&
                                    episodeID ? (
                                    <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 mt-4">
                                      <Card key={index}>
                                        <Card.Body>
                                          <Link to={`/character/${char.char_id}`}>
                                            <img
                                              src={char.img}
                                              alt="character img"
                                            />
                                          </Link>
                                          <Card.Title className="text-center mt-3">
                                            {char.name}
                                          </Card.Title>
                                        </Card.Body>
                                      </Card>
                                    </div>
                                  ) : null
                                );
                              })}
                              <Link to="/allepisode" className="text-center"><Button variant="success" size="lg" className="mt-5 mb-5">All Episode</Button></Link>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </Card>
              </div>
            </div>
          </div>
        </>
      }
    </>
  );
};

export default EpisodeDetails;
