import { ActiveAlert } from "../data/activeAlerts";
import { MobileWeatherPayload } from "../hooks/useMobileWeather";

export function deriveMobileWeatherAlerts(payload: MobileWeatherPayload): ActiveAlert[] {
  const alerts: ActiveAlert[] = [];

  if (payload.weatherCode >= 95) {
    alerts.push({
      id: "weather-thunderstorm",
      title: "Thunderstorm Alert",
      message: "Current weather indicates thunderstorm risk in your monitored area.",
      type: "danger",
    });
  }

  if (payload.hourlyPrecipPeak >= 70 || payload.precipitation >= 6) {
    alerts.push({
      id: "weather-rain-danger",
      title: "Heavy Rainfall Expected",
      message: `Rain risk is elevated (peak chance ${Math.round(payload.hourlyPrecipPeak)}%).`,
      type: "danger",
    });
  } else if (payload.hourlyPrecipPeak >= 45 || payload.precipitation >= 2) {
    alerts.push({
      id: "weather-rain-warning",
      title: "Rainfall Advisory",
      message: `Moderate rainfall conditions detected (peak chance ${Math.round(payload.hourlyPrecipPeak)}%).`,
      type: "warning",
    });
  }

  if (payload.windSpeed >= 45) {
    alerts.push({
      id: "weather-wind-danger",
      title: "Strong Wind Alert",
      message: `Wind speed is high at ${Math.round(payload.windSpeed)} km/h.`,
      type: "danger",
    });
  } else if (payload.windSpeed >= 30) {
    alerts.push({
      id: "weather-wind-warning",
      title: "Wind Advisory",
      message: `Wind speed is elevated at ${Math.round(payload.windSpeed)} km/h.`,
      type: "warning",
    });
  }

  return alerts;
}

export function getMobileWeatherLabel(code: number): string {
  if (code === 0) return "Clear";
  if (code >= 1 && code <= 3) return "Cloudy";
  if (code === 45 || code === 48) return "Fog";
  if (code >= 51 && code <= 57) return "Drizzle";
  if (code >= 61 && code <= 67) return "Rain";
  if (code >= 71 && code <= 77) return "Snow";
  if (code >= 80 && code <= 82) return "Showers";
  if (code >= 95) return "Thunderstorm";
  return "Variable";
}

