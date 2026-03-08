import { useCallback, useEffect, useMemo, useState } from "react";
import { Platform } from "react-native";

const FALLBACK_COORDS = {
  latitude: 8.4822,
  longitude: 124.6472,
  name: "Kauswagan, Cagayan de Oro City",
};

async function fetchLocationName(latitude, longitude) {
  try {
    const reverseUrl =
      `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${latitude}&longitude=${longitude}` +
      "&count=1&language=en&format=json";
    const reverseResponse = await fetch(reverseUrl);
    if (!reverseResponse.ok) {
      return null;
    }
    const reverseJson = await reverseResponse.json();
    const first = Array.isArray(reverseJson.results) ? reverseJson.results[0] : null;
    if (!first) {
      return null;
    }
    const city = String(first.name ?? "").trim();
    const admin = String(first.admin1 ?? "").trim();
    if (city && admin) {
      return `${city}, ${admin}`;
    }
    return city || null;
  } catch {
    return null;
  }
}

async function fetchWeather(latitude, longitude) {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
    "&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,weather_code" +
    "&hourly=temperature_2m,precipitation_probability,wind_speed_10m,weather_code" +
    "&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=7";

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Weather service unavailable");
  }

  const json = await response.json();
  if (!json.current || !json.hourly || !json.daily) {
    throw new Error("Incomplete weather data");
  }

  const currentTime = String(json.current.time);
  const hourlyTimes = json.hourly.time ?? [];
  const startIndex = Math.max(hourlyTimes.findIndex((entry) => entry >= currentTime), 0);
  const endIndex = Math.min(startIndex + 12, hourlyTimes.length);

  const hourly = [];
  for (let i = startIndex; i < endIndex; i += 1) {
    hourly.push({
      time: hourlyTimes[i],
      temperature: Number(json.hourly.temperature_2m?.[i] ?? 0),
      precipitation: Number(json.hourly.precipitation_probability?.[i] ?? 0),
      wind: Number(json.hourly.wind_speed_10m?.[i] ?? 0),
    });
  }

  const daily = [];
  const dailyTimes = json.daily.time ?? [];
  for (let i = 0; i < Math.min(7, dailyTimes.length); i += 1) {
    daily.push({
      date: dailyTimes[i],
      weatherCode: Number(json.daily.weather_code?.[i] ?? 0),
      max: Number(json.daily.temperature_2m_max?.[i] ?? 0),
      min: Number(json.daily.temperature_2m_min?.[i] ?? 0),
    });
  }

  return {
    current: {
      temperature: Number(json.current.temperature_2m ?? 0),
      humidity: Number(json.current.relative_humidity_2m ?? 0),
      precipitation: Number(json.current.precipitation ?? 0),
      windSpeed: Number(json.current.wind_speed_10m ?? 0),
      weatherCode: Number(json.current.weather_code ?? 0),
      observedAt: currentTime,
    },
    hourly,
    daily,
  };
}

export function useWeather() {
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [locationName, setLocationName] = useState(FALLBACK_COORDS.name);
  const [payload, setPayload] = useState(null);

  const loadByCoords = useCallback(async (latitude, longitude, fallbackLabel) => {
    setStatus("loading");
    setErrorMessage("");
    try {
      const [weather, place] = await Promise.all([
        fetchWeather(latitude, longitude),
        fetchLocationName(latitude, longitude),
      ]);
      setPayload(weather);
      setLocationName(place || fallbackLabel || `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`);
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Failed to fetch weather");
    }
  }, []);

  const loadWeather = useCallback(async () => {
    if (Platform.OS === "web" && typeof navigator !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          await loadByCoords(position.coords.latitude, position.coords.longitude, "Current Location");
        },
        async () => {
          await loadByCoords(FALLBACK_COORDS.latitude, FALLBACK_COORDS.longitude, FALLBACK_COORDS.name);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 120000 },
      );
      return;
    }

    await loadByCoords(FALLBACK_COORDS.latitude, FALLBACK_COORDS.longitude, FALLBACK_COORDS.name);
  }, [loadByCoords]);

  const usePreciseLocation = useCallback(async () => {
    if (Platform.OS === "web" && typeof navigator !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          await loadByCoords(position.coords.latitude, position.coords.longitude, "Current Location");
        },
        async () => {
          setErrorMessage("Precise location denied. Keeping current weather data.");
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
      );
      return;
    }

    setErrorMessage("Precise location is not available in this mobile build.");
  }, [loadByCoords]);

  useEffect(() => {
    loadWeather();
  }, [loadWeather]);

  const result = useMemo(
    () => ({
      status,
      errorMessage,
      locationName,
      payload,
      loadWeather,
      usePreciseLocation,
    }),
    [errorMessage, loadWeather, locationName, payload, status, usePreciseLocation],
  );

  return result;
}
