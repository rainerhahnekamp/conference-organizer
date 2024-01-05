export interface Talk {
  id: number;
  title: string;
  abstract: string;
  schedule: {
    day: Date;
    startHour: number;
    startMinute: number;
    durationInMinutes: number;
  };
  speakers: string[];
  room: string;
}
