import { Talk } from '@app/talks/models';

export function toPrettySchedule({ schedule }: Talk) {
  const start = schedule.date;
  start.setHours(schedule.startHour);
  start.setMinutes(schedule.startMinute);

  const end = new Date(start.getTime() + schedule.durationInMinutes * 3600);

  return `${start.toLocaleDateString()}: ${start.toLocaleTimeString()} - ${end.toLocaleTimeString()}`;
}
