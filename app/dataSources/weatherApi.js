const { RESTDataSource } = require('@apollo/datasource-rest');

class WeatherAPI extends RESTDataSource {
  baseURL = 'https://api.weatherapi.com/v1/';

  async findWeatherByGeopos(geoPoint) {
    const url = 'forecast.json';
    const params = {
      key: process.env.WEATHER_API_KEY,
      q: `${geoPoint.x},${geoPoint.y}`,
      days: 7,
      aqi: 'no',
      alerts: 'no',
    };
    const data = await this.get(url, { params });
    const daily = data.forecast.forecastday.map((day) => ({
      date: day.date,
      temperature_minimum: day.day.maxtemp_c,
      temperature_maximum: day.day.mintemp_c,
      precipitation: day.day.totalprecip_mm,
    }));
    return daily;
  }
}

module.exports = WeatherAPI;
