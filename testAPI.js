require('dotenv').config();
const axios = require('axios');

// IIFE (Instantly Invoked Function Expression)
(async () => {
  const result = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=36.7336303,-4.3873531&days=7&aqi=no&alerts=no`);
  console.log(result);
  const daily = result.data.forecast.forecastday.map((day) => ({
    date: day.date,
    temperature_minimum: day.day.maxtemp_c,
    temperature_maximum: day.day.mintemp_c,
    precipitation: day.day.totalprecip_mm,
  }));
  console.log(daily);
})();
