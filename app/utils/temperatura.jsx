function centigrados(kelvin, opcion) {
    if (kelvin && opcion!=="") {
        if (opcion==="1")
            {const celsius = kelvin - 273.15;
              return { celsius: celsius.toFixed(2) };
            }
          else
            {const fahrenheit = (kelvin - 273.15) * 1.8 + 32;
              return { fahrenheit: fahrenheit.toFixed(2) }; 
            }

      
    }
    return { celsius: '', fahrenheit: '' };
  }
