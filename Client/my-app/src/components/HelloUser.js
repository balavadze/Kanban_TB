// import { useState, useEffect } from "react";

// const HelloUser = () => {
//   const [weather, setWeather] = useState({});

//   const fetchWeather = async () => {
//     try {
//       let path = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Berlin?unitGroup=metric&key=$WNM5HYZHBADWL6W3H4QUXL8YS&contentType=json`;
//       let response = await fetch(path, { mode: "cors" });
//       let data = await response.json();
//       let city = data.address;
//       let temperature = data.currentConditions.temp;
//       let conditions = data.currentConditions.conditions;
//       conditions = conditions
//         .split(" ")
//         .map((word) => word.toLowerCase())
//         .join(" ");
//       setWeather({ city, conditions, temperature });
//     } catch (error) {
//       console.log("There was an error when fetching data", error);
//     }
//   };

//   useEffect(() => {
//     fetchWeather();
//   }, []);

//   return (
//     <div>
//       <p>Hello {weatherData.conditions}</p>
//       {/* <p>HelloUser {weatherData.conditions}</p> */}
//     </div>
//   );
// };

// export default HelloUser;
