export type Alarm = {
  id: number,
  elapsedSeconds: number,
  alarmed: boolean,
  enabled: boolean,
}

export type AppState = {
  startTime: number,
  alarms: Alarm[],
}
