'use client'
import React, { useState , useContext} from 'react';
import { GradosContext} from "@/app/contexts/UseProvider";
import Image from 'next/image';

export default function Principal({ data, forecast, onTemperatura }) {
  const [unidadTemp, setUnidadTemp] = useState('C');

  const [gradost,setGradost] = useContext(GradosContext)

  function handleTemp(grados) {
    setUnidadTemp(grados);
    setGradost(grados);
    onTemperatura(grados); 
  }
  console.log(data)
  let titDegree=''

  if (data)
  { const  degrees = parseInt(data?.wind?.deg)
    /*alert(degrees)*/
    switch(true)
    {
      case(degrees===0):
        titDegree='N'
        break;
      case(degrees>0 && degrees<90):
        titDegree='NE'
        break;
      case(degrees>90 && degrees<180):
        titDegree='SE'
        break;
      case(degrees===180):
        titDegree='S'
        break;
      case(degrees>180 && degrees<270):
        titDegree='SO'
        break;
      case(degrees>=270):
        titDegree='NO'
        break;
    }
  }

  return (
    <div className="sm:absolute md:relative w-screen h-full bg-[#100e1c]">
      <div className="h-[85%] md:h-[32%] bg-[#100e1c] mt-7 w-full flex flex-col justify-center items-center md:overflow-hidden">
        <div className="w-full mt-4 md:w-[95%] h-full flex flex-col justify-center items-center">
          <div className="w-[70%] h-[7%] mr-20 md:mr-0 md:ml-20 gap-2 mt-5 flex justify-end mb-5 ">
            <button
              className={`bg-[#9799a1] cursor-pointer h-11 w-[11%] md:h-10 md:w-[7%] rounded-full text-xl font-bold ${unidadTemp === 'C' ? 'bg-[#cbd3d6]' : ''}`}
              onClick={() => handleTemp('C')}
            >
              °C
            </button>
            <button
              className={`bg-[#5e6172] cursor-pointer text-white text-xl h-11 w-[11%] md:h-10 md:w-[7%] rounded-full ${unidadTemp === 'F' ? 'bg-[#cbd3d6]' : ''}`}
              onClick={() => handleTemp('F')}
            >
              °F
            </button>
          </div>
          <div className="w-[80%] bg-[#100e1c] h-full md:ml-0 md:h-full grid grid-cols-2 mr-20 md:mr-0 md:grid-cols-5 mt-0 md:mt-5 text-white">
            {Array.isArray(forecast) && forecast.length > 0 ? (
              forecast.map((day, index) => (
                <div key={index} className="bg-[#1e203a] ml-20 md:ml-10 mb-3 h-[150px] w-[120px] md:w-[80%] md:h-[180px] flex flex-col justify-center items-center">
                  <label className="mb-5">{day.date}</label>
                  <Image src={`/images/weather/${day.weather?.icon}.png`} width={1200} height={500}className="w-16 h-12 mb-2 mt-2" alt="" />
                  <label className="mt-2">
                    {unidadTemp === 'C'
                      ? `${day.temperature}°C`
                      : `${((day.temperature * 9) / 5 + 32).toFixed(1)}°F`} 
                  </label>
                </div>
              ))
            ) : (
              <div className="text-white">No hay datos de pronóstico disponibles.</div>
            )}
          </div>
        </div>
      </div>
      <div className='md:mt-20 mt-10 mb-4 md:mb-0'>
        <label className="text-white text-2xl ml-20 md:ml-[138px]">Today's Highlights</label>
      </div>
      <div className="bg-[#100e1c] md:w-[88%] grid grid-cols-1 md:grid-cols-2 gap-3 md:ml-14 w-full h-full md:h-[50%] text-white overflow-auto md:overflow-hidden">
        <div className="bg-[#1e203a] h-[150px] ml-20 w-[62%] md:w-[80%] md:h-[85%] md:mt-5 mr-5 md:mr-0 flex justify-center">
          <div className="mt-2 flex flex-col w-full justify-center h-full">
            <div className="mt-3 flex flex-col w-full h-[20%] justify-center items-center">
              <label>Wind Status</label>
            </div>
            <div className='flex flex-col h-[50%] w-full justify-center items-center ml-0 mb-5'>
              <label className='font-bold text-6xl mt-5'>{data?.wind?.speed ? data.wind.speed.toFixed(2) : 'N/A'}
                <span className='text-4xl font-normal'> {gradost==="C" && data?.visibility ? ' ms': ' mph'}</span></label>
            </div>

            <div className="w-full h-[30%] flex flex-row justify-center items-center ">
                <button className='bg-slate-500 w-8 h-8 rounded-full flex items-center justify-center'>
                  < Image src={`/images/navigation.svg`} width={1200} height={500} className={`w-7 h-5 `} style={{ transform:`rotate(${data?.wind?.deg}deg)` }}  alt="" /></button> 
                  <span>&nbsp;&nbsp;{titDegree }</span>
            </div>
              
              <div className='mb-5'></div>

          </div>
        </div>
        <div className="bg-[#1e203a] h-[150px] ml-20 w-[62%] md:w-[80%] md:h-[85%] md:ml-5 md:mt-5 mr-5 flex justify-center">
          <div className="mt-2 flex flex-col w-full justify-center h-full">
            <div className="mt-3 flex flex-col w-full h-[20%] justify-center items-center">
              <label>Humidity</label>
            </div>
            <div className='flex flex-col h-[80%] w-full justify-center items-center ml-0 mb-5'>
              <div className='flex flex-col h-[80%] w-full justify-center items-center ml-0 mb-3'>
                <label className='font-bold text-6xl'>{data?.main?.humidity || 'N/A'}<span className='text-4xl font-normal'> %</span></label>
              </div>
              <div className="w-[80%] h-3 flex flex-row">
                <label className='h-full w-[50%] text-xs'>0</label>
                <label className='h-full w-[40%] text-xs'>50</label>
                <label className='h-full w-[5%] text-xs'>100</label>
              </div>
              <div className='w-[80%] bg-white rounded-md'>
                <div className="bg-yellow-400 w-[80%] h-3 rounded-md" style={{ width: `${data?.main?.humidity || 0}%` }}>
                  
                </div>
              </div>
              <div className='mb-5'></div>
            </div>
          </div>
        </div>
        <div className="bg-[#1e203a] h-[150px] ml-20 w-[62%] md:w-[80%] md:h-[85%] mr-5 md:mr-0 flex justify-center ">
          <div className="mt-2 flex flex-col w-full justify-center h-full">
            <div className="mt-3 flex flex-col w-full h-[20%] justify-center items-center">
              <label>Visibility</label>
            </div>
            <div className='flex flex-col h-[80%] w-full justify-center items-center ml-0 mb-5'>
              
              <label className='font-bold text-6xl'>
              {gradost==="C" && data?.visibility ? 
                (data?.visibility / 1000).toFixed(2) :(data?.visibility / 1609).toFixed(2)}
                <span className='text-4xl font-normal'> 
                {gradost==="C" && data?.visibility ? ' Km': ' miles'}
                  </span></label>
            </div>
          </div>
        </div>
        <div className="bg-[#1e203a] h-[150px] ml-20 w-[62%] md:w-[80%] md:h-[85%] md:ml-5 mr-5 mb-5 flex justify-center">
          <div className="mt-2 flex flex-col w-full justify-center h-full">
            <div className="mt-3 flex flex-col w-full h-[20%] justify-center items-center">
              <label>Air Pressure</label>
            </div>
            <div className='flex flex-col h-[80%] w-full justify-center items-center ml-0 mb-5'>
              <label className='font-bold text-6xl'>{data?.main?.pressure || 'N/A'}<span className='text-4xl font-normal'> mb</span></label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
