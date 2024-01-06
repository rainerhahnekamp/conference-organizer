export interface Talk {
  id: number;
  title: string;
  abstract: string;
  speakers: string;
  room: string;
  schedule: {
    date: Date;
    startHour: number;
    startMinute: number;
    durationInMinutes: number;
  };
}
