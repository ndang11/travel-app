const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

if (!API_KEY) {
  console.warn("OpenWeather API key is missing. Set VITE_OPENWEATHER_API_KEY in .env file");
}

export async function getWeatherByCity(city) {
  if (!city) throw new Error("City name is required");
  
  if (!API_KEY) {
    throw new Error("OpenWeather API key is missing");
  }

  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("getWeatherByCity error:", error);
    throw error;
  }
}

export async function getWeatherByCoords(lat, lon) {
  if (lat === undefined || lon === undefined) {
    throw new Error("Latitude and longitude are required");
  }
  
  if (!API_KEY) {
    throw new Error("OpenWeather API key is missing");
  }

  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("getWeatherByCoords error:", error);
    throw error;
  }
}

export async function getForecast(lat, lon) {
  if (lat === undefined || lon === undefined) {
    throw new Error("Latitude and longitude are required");
  }
  
  if (!API_KEY) {
    throw new Error("OpenWeather API key is missing");
  }

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    if (!res.ok) throw new Error(`Forecast fetch failed: ${res.status} ${res.statusText}`);
    
    const data = await res.json();
    
    const dailyMap = {};
    data.list.forEach(item => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!dailyMap[date]) {
        dailyMap[date] = {
          dt: item.dt,
          temp: item.main.temp,
          temp_min: item.main.temp_min,
          temp_max: item.main.temp_max,
          humidity: item.main.humidity,
          wind_speed: item.wind.speed,
          weather: [item.weather[0]],
          sunrise: data.city?.sunrise || item.dt,
          sunset: data.city?.sunset || item.dt
        };
      } else {
        dailyMap[date].temp_min = Math.min(dailyMap[date].temp_min, item.main.temp_min);
        dailyMap[date].temp_max = Math.max(dailyMap[date].temp_max, item.main.temp_max);
      }
    });

    const daily = Object.values(dailyMap).slice(0, 7).map(day => ({
      dt: day.dt,
      temp: { day: day.temp, min: day.temp_min, max: day.temp_max },
      humidity: day.humidity,
      wind_speed: day.wind_speed,
      weather: day.weather,
      sunrise: day.sunrise,
      sunset: day.sunset
    }));

    return { daily };
  } catch (error) {
    console.error("getForecast error:", error);
    throw error;
  }
}