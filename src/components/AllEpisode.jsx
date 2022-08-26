import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import Episode from "./Episode";

const AllEpisode = () => {
    const perPage = 10;
    const [currentPage, setCurrentPage] = useState(0);
    const offset = currentPage * perPage
    const [Items, setItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const getResult = await axios.get(
                `https://www.breakingbadapi.com/api/episodes/`
            );
            console.log(getResult.data);
            setItems(getResult.data);
        };
        fetchData();
    }, []);


    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="seasons_main_wrapper mt-5">
                        <div className="episode_card_main">
                            <div className="row">
                                <h1 className='text-center my-3 text-white'>All Episodes  : </h1>
                                {Items.slice(offset, offset + perPage).map((item, index) =>
                                    item.series === "Breaking Bad" ? (
                                        <Episode
                                            key={index}
                                            episode_id={item.episode_id}
                                            episode={item.episode}
                                            title={item.title}
                                            air_date={item.air_date}
                                            season={item.season}
                                        />
                                    ) : null
                                )}

                            </div>
                            <div className='text-center'>
                                <button className='mt-5 mx-1 mb-5 btn btn-success btn-lg'
                                    onClick={() =>
                                        setCurrentPage((prevState) => Math.max(prevState - 1, 0))
                                    }>Prev Page
                                </button>
                                <button className='mt-5 mx-1 mb-5 btn btn-success btn-lg'
                                    onClick={() => setCurrentPage((prevState) => prevState + 1)}>Next Page
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AllEpisode