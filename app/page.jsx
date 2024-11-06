'use client';
import Sidebar from "@/components/Sidebar";
import SidebarModal from "@/components/SidebarModal";
import Principal from "@/app/princial/page";
import React, { useState, useEffect, useContext } from "react";
import useGeolocation from "./customshooks/useGeolocation";
import useData from "./customshooks/useData";
import { UseProvider, GradosContext  } from "@/app/contexts/UseProvider";

let medirgrados='C'
const key = 'b7d615d9db4094bda48584cbc6a0c4cc';

export default function Home() {
  const [open, setOpen] = useState(false);
  const { getGeo, geolocation: geo } = useGeolocation();
  const [lat, setLat] = useState(geo.lat);
  const [lon, setLon] = useState(geo.lon);

  const [gradost, setGradost] = useContext(GradosContext);

  /*alert(gradost)*/

  useEffect(() => {
    if (geo.lat && geo.lon) {
      setLat(geo.lat);
      setLon(geo.lon);
    }
  }, [geo]);


  function handleTemperatura(grados) {
    console.log(`Cambio de temperatura a: ${grados}`);
    medirgrados=grados
    /*alert(medirgrados)*/
  }

  let metric=''
  if (medirgrados!==""){
    if (medirgrados==='C')
      {metric="metric"}
    else
      {metric="imperial"}
  }

  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=${metric}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=${metric}`;

  const { data: currentData } = useData(currentWeatherUrl);
  const { data: forecastData } = useData(forecastUrl);

  const dailyForecast = forecastData?.list
    ?.filter((_, index) => index % 8 === 0)
    .map((day) => ({
      date: new Date(day.dt * 1000).toLocaleDateString(),
      temperature: day.main.temp,
      weather: day.weather[0],
    }));

  function toggleModal() {
    setOpen(!open);
  }

  function fetchWeatherByCoords(latitude, longitude) {
    setLat(latitude);
    setLon(longitude);
  }

  return (
    <UseProvider>
      <div className="bg-[#100e1c] w-screen h-screen md:flex md:flex-row overflow-auto">
        <Sidebar
          openModal={toggleModal}
          data={currentData}
          getGeo={() => {
            getGeo();
          }}
          fetchWeatherByCoords={fetchWeatherByCoords}
        />
        <SidebarModal
          open={open}
          closeModal={toggleModal}
          updateCoordinates={fetchWeatherByCoords} 
        />
        <Principal
          data={currentData}
          forecast={dailyForecast}
          onTemperatura={handleTemperatura}
        />
      </div>
    </UseProvider>
  );
}


/* key: b7d615d9db4094bda48584cbc6a0c4cc*/

/* key: a004fc8687d08af8dff9f66b21206210*/