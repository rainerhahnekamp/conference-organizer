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

export interface TalkData {
  talks: Talk[];
  meta: {
    lastUpdated: Date;
    lastEditor: string;
    lastRefreshed: Date;
  };
}

export interface TalkState extends TalkData {
  isPolling: boolean;
}

export const initialValue: TalkState = {
  isPolling: false,
  talks: [],
  meta: {
    lastUpdated: new Date(),
    lastEditor: '',
    lastRefreshed: new Date(),
  },
};
