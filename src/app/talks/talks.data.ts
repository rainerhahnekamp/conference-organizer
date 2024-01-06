import { Talk } from '@app/talks/talk';

export const talks: Talk[] = [
  {
    id: 1,
    title: 'Go Reactive with Angular Signals',
    speakers: 'Deborah Kurata',
    abstract: `An exciting new feature has come to Angular: signals! Starting in Angular v16, Angular developers can leverage the power of signals to create highly reactive applications.

Signals provide a new way for our code to inform our templates (and other code) that our data has changed, offering more granular control over how and when updates are propagated, improving change detection.

 So, what are signals? Why would you want to use a signal? How do you create, read and change a signal? And how do signals fit in with RxJS Observables. This session answers these questions and more.`,
    room: 'Grand Ballroom',
    schedule: {
      date: new Date(2023, 5, 14),
      startHour: 10,
      startMinute: 15,
      durationInMinutes: 20,
    },
  },
  {
    id: 2,
    title: 'Angular Keynote',
    speakers: 'Minko Gechev, Jeremy Elbourn',
    abstract: '',
    room: 'Grand Ballroom',
    schedule: {
      date: new Date(2023, 5, 14),
      startHour: 9,
      startMinute: 10,
      durationInMinutes: 45,
    },
  },
  {
    id: 3,
    title: 'Setting up Enterprise Frontend for Success',
    speakers: 'Alex Okrushko',
    abstract: `For software engineering teams to be successful there are three things that we need to get right: people, tools and process.

In this talk I’ll cover the steps that are needed to get to that state, including team communication, monorepos, feature flagging, trunk-based development, better PRs, automatic help, testing, feature planning and frequent releases.`,
    room: 'Grand Ballroom',
    schedule: {
      date: new Date(2023, 5, 14),
      startHour: 10,
      startMinute: 40,
      durationInMinutes: 20,
    },
  },
  {
    id: 4,
    title: "Lightweight Architectures with Angular's Latest Innovations",
    speakers: 'Manfred Steyer',
    abstract: `In the last months, Angular got tons of new features that allow using the framework in a fresh and lightweight way.

Standalone Components, updated APIs for the router and HttpClient (Standalone APIs), functional interceptors, guards, and resolvers, and the extended inject function are just a few examples.

In this session, we investigate, how these innovations help to improve our architecture. For this, we not only look into the new features but also combine them with typical patterns for structuring frontend applications. This leads to a more lightweight and modern architecture that is both, easier to implement and easier to maintain.`,
    room: 'Grand Ballroom',
    schedule: {
      date: new Date(2023, 5, 14),
      startHour: 15,
      startMinute: 35,
      durationInMinutes: 20,
    },
  },
  {
    id: 5,
    title: 'Angular Across the Stack with Analog',
    speakers: 'Brandon Roberts',
    abstract: `Analog, a fullstack meta-framework for Angular to take advantage of it’s ecosystem to build Angular applications and websites faster. It also extends Angular to new ecosystems and tooling.

This talk is about how it started, and going across the web stack with Analog and Angular.`,
    room: 'Grand Ballroom',
    schedule: {
      date: new Date(2023, 5, 15),
      startHour: 11,
      startMinute: 50,
      durationInMinutes: 20,
    },
  },
];
