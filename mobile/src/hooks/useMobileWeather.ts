import { useCallback, useEffect, useState } from "react";

export type MobileWeatherPayload = {
  temperature: number;
  humidity: number;
  precipitation: number;
  windSpeed: number;
  weatherCode: number;
  hourlyPrecipPeak: number;
};

const FALLBACK = { latitude: 8.4822, longitude: 124.6472, name: "Kauswagan, Cagayan de Oro City" };

async function fetchMobileWeather(latitude: number, longitude: number): Promise<MobileWeatherPayload> {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
    "&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,weather_code" +
    "&hourly=precipitation_probability&timezone=auto&forecast_days=1";

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Weather service unavailable");
  }

  const json = await response.json();
  const hourlyPrecip = Array.isArray(json?.hourly?.precipitation_probability)
    ? json.hourly.precipitation_probability.map((v: unknown) => Number(v ?? 0))
    : [];

  return {
    temperature: Number(json?.current?.temperature_2m ?? 0),
    humidity: Number(json?.current?.relative_humidity_2m ?? 0),
    precipitation: Number(json?.current?.precipitation ?? 0),
    windSpeed: Number(json?.current?.wind_speed_10m ?? 0),
    weatherCode: Number(json?.current?.weather_code ?? 0),
    hourlyPrecipPeak: Math.max(...hourlyPrecip, 0),
  };
}

export function useMobileWeather() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [error, setError] = useState("");
  const [locationName] = useState(FALLBACK.name);
  const [payload, setPayload] = useState<MobileWeatherPayload | null>(null);

  const loadWeather = useCallback(async () => {
    setStatus("loading");
    setError("");
    try {
      const weather = await fetchMobileWeather(FALLBACK.latitude, FALLBACK.longitude);
      setPayload(weather);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Failed to fetch weather");
    }
  }, []);

  useEffect(() => {
    loadWeather();
  }, [loadWeather]);

  return { status, error, payload, locationName, loadWeather };
}

