'use client'
import { CityContext } from "@/app/contexts/UseProvider";
import citiesData from "@/app/cities.json";
import React, { useContext, useState, useEffect } from "react";

export default function SidebarModal({ open, closeModal, updateCoordinates }) {
  const [citys, setCity] = useContext(CityContext);
  const [searchResults, setSearchResults] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    handleSearch();
  }, [inputValue]);

  function handleInputChange(e) {
    setInputValue(e.target.value);
  }

  function handleSearch() {
    if (inputValue.trim() === "") {
      setSearchResults([]);
      return;
    }

    const filteredCities = citiesData
      .filter((city) =>
        city.name.toLowerCase().startsWith(inputValue.toLowerCase())
      )
      .slice(0, 3);

    setSearchResults(filteredCities);
  }

  function selectCity(selectedCity) {
    setCity({
      name: selectedCity.name,
      lat: selectedCity.lat,
      lon: selectedCity.lon,
    });
    updateCoordinates(selectedCity.lat, selectedCity.lon); 
    closeModal();
  }

  if (!open) return null;

  return (
    <nav className="h-screen w-full md:w-[30%] bg-[#1e203a] absolute left-0 top-0 items-center justify-center md:justify-end md:px-8 text-white">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="flex mt-5 flex-row justify-end items-center">
          <span
            className="text-4xl font-normal cursor-pointer mr-5"
            onClick={closeModal}
          >
            &times;
          </span>
        </div>
        <div className="flex flex-row justify-center items-center w-screen md:w-full">
          <input
            type="text"
            placeholder="Search location"
            id="ciudad"
            value={inputValue}
            onChange={handleInputChange}
            className="bg-[#1e203a] border-2 border-slate-300 w-56 md:w-40 h-9"
          />
          <button
            type="button"
            onClick={handleSearch}
            className="bg-blue-600 h-9 w-20 ml-5"
          >
            Search
          </button>
        </div>
        <ul className="mt-3">
          {searchResults.map(({ id, name, country, lat, lon }) => (
            <li
              key={id}
              onClick={() => selectCity({ name, lat, lon })}
              className="cursor-pointer hover:bg-gray-700 p-2"
            >
              {name}, {country}
            </li>
          ))}
        </ul>
      </form>
    </nav>
  );
}
