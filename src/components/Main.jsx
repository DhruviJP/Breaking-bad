import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "react-bootstrap";
import Episode from "./Episode";
import Spinner from "./Spinner";

const Main = () => {
  const [Items, setItems] = useState([]);
  const [searchApiData, setSearchApiData] = useState([])
  const [filterVal, setFilterVal] = useState("")
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    const fetchData = () => {
      setIsLoading(true);
      fetch('https://www.breakingbadapi.com/api/episodes')
        .then(response => response.json())
        .then(json => {
          setItems(json)
          setSearchApiData(json)
          setIsLoading(false)
        })
    }
    fetchData();
  }, [])
  const HandleFilter = (e) => {
    if (e.target.value == "") {
      setItems(searchApiData)
    } else {
      const filterResult = searchApiData.filter(
        item => {
          return (
            item.title
              .toLowerCase()
              .includes(e.target.value.toLowerCase()) ||
            item.air_date
              .toLowerCase()
              .includes(e.target.value.toLowerCase()) ||
            item.series
              .toLowerCase()
              .includes(e.target.value.toLowerCase())
            // item.characters
            //   .toLowerCase()
            //   .includes(e.target.value.toLowerCase())
          );
        })
      setItems(filterResult)
      console.log(filterResult)
    }
    setFilterVal(e.target.value)
  }


  return (
    <>
      {isLoading ? <Spinner /> :
        <>
          <input
            type="text"
            placeholder='Search...'
            className='search form-control mx-auto my-4'
            autoFocus
            style={{ width: "50%", height: "44px" }}
            onInput={(e) => HandleFilter(e)}
          />
          <div className="container">
            <div className="row">
              <div className="seasons_main_wrapper mt-5">
                <Tabs
                  defaultActiveKey="home"
                  id="uncontrolled-tab-example"
                  className="mb-3"
                >

                  <Tab eventKey="home" title="Season 1" className="text-white">
                    <div className="episode_card_main">
                      <div className="row">
                        {isLoading ? <Spinner /> :
                          <>
                            {Items.map((item, index) =>
                              item.series === "Breaking Bad" && item.season == 1 ? (
                                <Episode
                                  key={index}
                                  episode_id={item.episode_id}
                                  episode={item.episode}
                                  title={item.title}
                                  air_date={item.air_date}
                                  season={item.season}
                                />
                              ) : null
                            )
                            }
                          </>
                        }
                      </div>
                    </div>
                  </Tab>

                  <Tab eventKey="Season_2" title="Season 2">
                    <div className="episode_card_main">
                      <div className="row">
                        {Items.map((item, index) =>
                          item.series === "Breaking Bad" && item.season == 2 ? (
                            <Episode
                              key={index}
                              episode={item.episode}
                              episode_id={item.episode_id}
                              title={item.title}
                              air_date={item.air_date}
                              season={item.season}
                            />
                          ) : null
                        )}
                      </div>
                    </div>
                  </Tab>
                  <Tab eventKey="Season_3" title="Season 3">
                    <div className="episode_card_main">
                      <div className="row">
                        {Items.map((item, index) =>
                          item.series === "Breaking Bad" && item.season == 3 ? (
                            <Episode
                              key={index}
                              episode_id={item.episode_id}
                              title={item.title}
                              air_date={item.air_date}
                              season={item.season}
                              episode={item.episode}
                            />
                          ) : null
                        )}
                      </div>
                    </div>
                  </Tab>
                  <Tab eventKey="Season_4" title="Season 4">
                    <div className="episode_card_main">
                      <div className="row">
                        {Items.map((item, index) =>
                          item.series === "Breaking Bad" && item.season == 4 ? (
                            <Episode
                              key={index}
                              episode_id={item.episode_id}
                              title={item.title}
                              air_date={item.air_date}
                              season={item.season}
                              episode={item.episode}
                            />
                          ) : null
                        )}
                      </div>
                    </div>
                  </Tab>
                  <Tab eventKey="Season_5" title="Season 5">
                    <div className="episode_card_main">
                      <div className="row">
                        {Items.map((item, index) =>
                          item.series === "Breaking Bad" && item.season == 5 ? (
                            <Episode
                              key={index}
                              episode_id={item.episode_id}
                              title={item.title}
                              air_date={item.air_date}
                              season={item.season}
                              episode={item.episode}
                            />
                          ) : null
                        )}
                      </div>
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </>
      }
    </>
  );
};

export default Main;
