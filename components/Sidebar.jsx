'use client';
import React, { useContext } from 'react';
import Image from 'next/image';
import { GradosContext } from "@/app/contexts/UseProvider";

export default function Sidebar({ openModal, data, getGeo, fetchWeatherByCoords }) {
  const [gradost, setGradost] = useContext(GradosContext);

  /*alert(gradost)*/

  console.log(data)
  let temperature=''
if (gradost==='C')
    { temperature =data?.main?.temp + " °C" 

    } 
  else
   { temperature= ((data?.main?.temp * 9) / 5 + 32).toFixed(1) + ' °F'}
  

  const handleGeoLocation = () => {
    getGeo();
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByCoords(latitude, longitude); 
      },
      (error) => {
        console.error("Error obteniendo la geolocalización:", error);
      }
    );
  };

  return (
    <aside className="w-screen h-screen md:w-[40%] bg-[#1e213b] flex flex-col text-white relative">
      <div className="w-full h-full absolute overflow-hidden">
        <div className="flex flex-row">
          <button className="bg-slate-400 ml-11 md:ml-5 mt-7 h-9 w-[65%] md:w-[70%]" onClick={openModal}>
            Search for places
          </button>
          <button
            className="bg-[#5e6172] mt-6 h-11 w-[9%] md:h-10 md:w-[12%] rounded-full ml-12 mr-7 md:mr-3 md:ml-16"
            onClick={handleGeoLocation} 
          >
            <Image src="/images/location.svg" className="h-9 md:h-7 md:w-12" width={1200} height={450} alt="Location" />
          </button>
        </div>
        <div className="flex justify-center items-center">
          <img src="/images/Fondo.png" alt="" className="w-[90%] md:w-[98%] h-[80%] pb-10 object-cover overflow-hidden" />
          {data && data.weather && data.weather[0] ? (
            <img 
              src={`/images/weather/${data.weather[0].icon}.png`}  
              alt="" 
              className="absolute w-[32%] md:w-[40%] h-[28%] mt-20 md:mt-5 object-contain" 
            />
          ) : null}
        </div>
        <div className="w-full flex flex-col h-[50%] items-center">
          <h1 className='text-4xl mt-5 mb-5'>
            
          {data && data?.main?.temp ? (
              temperature
          ) : null}
            
            </h1>
          <h2 className='text-3xl mt-5 mb-5'>
            {data && data.weather && data.weather[0] ? (
              data.weather[0].description
            ) : "Cargando..."}
          </h2>
          <h3>Today: {new Date().toLocaleDateString('en-us', { weekday: "long", day: "numeric", month: "short" })}</h3>
          <h3>{data ? data.name : "Cargando..."}</h3> 
        </div>
      </div>
    </aside>
  );
}
