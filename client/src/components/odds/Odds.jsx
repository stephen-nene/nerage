import React, { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { handleGetBetika } from "../../fetch";

// Use `animated` for animated components
const animatedComponents = makeAnimated();

const options = [
  {
    value: "unibet",
    label: "Unibet",
    url: "https://www.unibet.co.uk/betting/sports",
  },
  { value: "10bet", label: "10Bet", url: "https://www.10bet.co.uk/sports/" },
  { value: "skybet", label: "Sky Bet", url: "https://www.skybet.com/" },
  {
    value: "marathonbet",
    label: "Marathonbet",
    url: "https://www.marathonbet.com/en/",
  },
  {
    value: "hollywoodbets",
    label: "Hollywoodbets",
    url: "https://www.hollywoodbets.net/",
  },
  {
    value: "sportpesa",
    label: "SportPesa",
    url: "https://www.ke.sportpesa.com/",
  },
  { value: "betway", label: "Betway", url: "https://www.betway.co.ke/" },
  { value: "22bet", label: "22Bet", url: "https://www.22bet.co.ke/" },
  { value: "betika", label: "Betika", url: "https://www.betika.com/en-ke/" },
  { value: "melbet", label: "Melbet", url: "https://melbet.co.ke/" },
  { value: "bet365", label: "Bet365", url: "https://www.bet365.com/" },
  { value: "1xbet", label: "1XBet", url: "https://1xbet.co.ke/" },
  {
    value: "betfair",
    label: "Betfair",
    url: "https://www.betfair.com/sport/inplay",
  },
];

export default function Odds({darkMode}) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [odds, setOdds] = useState("");

  const handleChange = (selected) => {
    setSelectedOption(selected);
    if (selected) {
      console.log(selected.url);
    }
  };

  if (!odds){
    console.log(odds)
  }

  return (
    <>
      <div className="text-center flex flex-col justify-center mt-5">
        <h1 className="text-2xl font-bold">Odds</h1>
        <p className="text-xl">!!!!! For educational purposes only !!!!!!</p>
        <p className="text-xl">Select a betting site to view odds:</p>
        <div className="w-64 mt-4 mx-auto">
          <Select
            className=" bg-gray-500 text-black"
            options={options}
            isSearchable={true}
            isClearable={false}
            value={selectedOption}
            placeholder="select a site"
            onChange={handleChange}
            components={animatedComponents}
          />
        </div>
        <div className="btn">
          <button onClick={() => handleGetBetika(setOdds)}>Get</button>
        </div>

        <div className="mt-4">
        {odds &&
          odds.map((item, index) => (
            <div
              key={index}
              className={`flex justify-between items-center p-3 border ${darkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}`}
            >
              <div>
                <p>{item.teams.home}</p>
                <p>{item.teams.away}</p>
              </div>
              <div className="flex items-center">
                <p className="mr-2">Home: {item[1]}</p>
                <p className="mr-2">Away: {item[2]}</p>
                <p>X: {item.x}</p>
              </div>
            </div>
          ))}
      </div>

        <div className="mt-6">
        {odds && odds.map((odd, index) => (
          <div key={index} className="bg-gray-200 p-4 my-2 rounded-md">
            <h2 className="text-xl font-semibold">{odd.teams.home} vs {odd.teams.away}</h2>
            <p>Home: {odd[1]}</p>
            <p>Away: {odd[2]}</p>
            <p>Draw: {odd.x}</p>
          </div>
        ))}
      </div>

      </div>
    </>
  );
}
