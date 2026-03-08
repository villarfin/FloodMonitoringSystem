import { useCallback, useEffect, useState } from "react";

export type MobileWeatherPayload = {
  temperature: number;
  humidity: number;
  precipitation: number;
  windSpeed: number;
  weatherCode: number;
  hourlyPrecipPeak: number;
  observedAt: string;
  hourly: Array<{
    time: string;
    temperature: number;
    precipitation: number;
    wind: number;
  }>;
  daily: Array<{
    date: string;
    weatherCode: number;
    max: number;
    min: number;
  }>;
};

const FALLBACK = { latitude: 8.4822, longitude: 124.6472, name: "Kauswagan, Cagayan de Oro City" };

async function fetchMobileWeather(latitude: number, longitude: number): Promise<MobileWeatherPayload> {
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
  const hourlyPrecip = Array.isArray(json?.hourly?.precipitation_probability) ? json.hourly.precipitation_probability : [];
  const hourlyTimes: string[] = json?.hourly?.time ?? [];
  const currentTime = String(json?.current?.time ?? hourlyTimes[0] ?? "");
  const startIndex = Math.max(hourlyTimes.findIndex((entry) => entry >= currentTime), 0);
  const endIndex = Math.min(startIndex + 12, hourlyTimes.length);
  const hourly = [];
  for (let i = startIndex; i < endIndex; i += 1) {
    hourly.push({
      time: hourlyTimes[i],
      temperature: Number(json?.hourly?.temperature_2m?.[i] ?? 0),
      precipitation: Number(json?.hourly?.precipitation_probability?.[i] ?? 0),
      wind: Number(json?.hourly?.wind_speed_10m?.[i] ?? 0),
    });
  }

  const dailyTimes: string[] = json?.daily?.time ?? [];
  const daily = [];
  for (let i = 0; i < Math.min(7, dailyTimes.length); i += 1) {
    daily.push({
      date: dailyTimes[i],
      weatherCode: Number(json?.daily?.weather_code?.[i] ?? 0),
      max: Number(json?.daily?.temperature_2m_max?.[i] ?? 0),
      min: Number(json?.daily?.temperature_2m_min?.[i] ?? 0),
    });
  }

  return {
    temperature: Number(json?.current?.temperature_2m ?? 0),
    humidity: Number(json?.current?.relative_humidity_2m ?? 0),
    precipitation: Number(json?.current?.precipitation ?? 0),
    windSpeed: Number(json?.current?.wind_speed_10m ?? 0),
    weatherCode: Number(json?.current?.weather_code ?? 0),
    hourlyPrecipPeak: Math.max(...hourlyPrecip.map((v: unknown) => Number(v ?? 0)), 0),
    observedAt: currentTime,
    hourly,
    daily,
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
