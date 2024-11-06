import React, { createContext, useState } from 'react';

export const CityContext = createContext('');
export const GradosContext = createContext('');

export const UseProvider = ({ children }) => {
  const [citys, setCity] = useState('');
  const [gradost, setgradosT] = useState('C');


  return (
      <CityContext.Provider value={[citys, setCity]}>
      <GradosContext.Provider value={[gradost, setgradosT]}>
        {children}
      </GradosContext.Provider>
      </CityContext.Provider>
  );
};

