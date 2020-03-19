/**
 * Enumerators are exported here
 * These are used in different parts of the code to ensure less error prone
 * And same strings being used everywhere
 */

export const ActivityTypes = Object.freeze({
  WALKING: "walking",
  CYCLING: "cycling",
  RUNNING: "running"
});

export const ConnectionStatus = Object.freeze({
  CONNECTED: "connected",
  PAIRED: "paired",
  NOT_PAIRED: "not_paired",
  DISCONNECTED: "disconnected",
  FAILED: "failed",
  CONNECTING: "connecting",
  PAIRING: "pairing"
});

export const SensorTypes = Object.freeze({
  FITBIT: "fitbit",
  FITBIT_HR: "fitbit_hr",
  GARMIN: "garmin",
  SAMSUNG: "samsung",
  APPLE: "apple"
});
