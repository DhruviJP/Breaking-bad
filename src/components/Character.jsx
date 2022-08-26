import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import Spinner from "./Spinner";

const Character = () => {
  const { characterID } = useParams();
  const [character, setCharacter] = useState([]);
  const [users, setUsers] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const perPage = 4;
  const [next, setNext] = useState(perPage);
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = () => {
    setNext(next + perPage);
  };

  useEffect(() => {
    const fetchCharacter = async () => {
      setIsLoading(true);
      const getResult = await axios.get(
        `https://www.breakingbadapi.com/api/characters/${characterID}`
      );
      setCharacter(getResult.data);
      setIsLoading(false)
    };
    fetchCharacter();
  }, [])

  useEffect(() => {
    const fetUsers = async () => {
      setIsLoading(true);
      const getResult = await axios.get(
        `https://jsonplaceholder.typicode.com/users/`
      );
      setUsers(getResult.data);
      setIsLoading(false)
    };
    fetUsers();
  }, [])

  useEffect(() => {
    const fetchEpisodes = () => {
      setIsLoading(true);
      fetch(`https://www.breakingbadapi.com/api/episodes`)
        .then((response) => response.json())
        .then((response) => {
          setEpisodes(response)
          setIsLoading(false)
        });
    };
    fetchEpisodes()
  }, []);
  const navigate = useNavigate();


  return (
    <>
      <div className="character_main mt-5 mb-5">
        <div className="container px-4">
          <div className="row character_wrapper align-center">
            {character.map((character, index) => {
              return (
                <>
                  <div
                    key={index}
                    className="character_details col-lg-7 col-md-7 col-sm-12 col-xs-12"
                  >
                    <h2 className="mb-3 heading">Name: {character.name}</h2>
                    <h3 className="mb-1">Nickname : {character.nickname}</h3>
                    <span className="my-0 d-block">
                      Birth : {character.birthday}
                    </span>
                    <span className="my-0 d-block">
                      Status : {character.status}
                    </span>
                    <span className="my-0">
                      List of occupations : {character.occupation}
                    </span>
                    <div>
                      <button className="mt-3 btn btn-success btn-lg" onClick={() => navigate(-1)}>
                        Back
                      </button>

                    </div>
                  </div>
                  <div className="character_img col-lg-5 col-md-5 col-sm-12 col-xs-12">
                    <img
                      className="d-block"
                      src={character.img}
                      alt="character img"
                    />
                  </div>
                </>
              );
            })}


          </div>
        </div>
      </div>
      <div className="container">
        <div className="episode_card_main">
          <div className="row">
            {episodes.slice(0, next).map((episode) => {
              return episode.characters.map((c) => {
                return character.map((charc) => {
                  return charc.name === c ? (
                    <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 mt-3">
                      <Card key={episode}>
                        <Card.Body>
                          <Card.Title>{episode.title}</Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">
                            Air Date :{episode.air_date}
                          </Card.Subtitle>
                        </Card.Body>
                      </Card>
                    </div>
                  ) : null;
                });
              });
            })}
          </div>
        </div>
        {next < episodes.length && (
          <div className="text-center mb-3">
            <Button
              className="mt-3 btn btn-success btn-lg"
              onClick={handleClick}
            >
              Load more
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default Character;
