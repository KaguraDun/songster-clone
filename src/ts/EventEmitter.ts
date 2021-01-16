// Event emitter pattern: https://medium.com/@an_parubets/pattern-event-emitter-js-9378aa082e86

export default class EventEmitter {
  events: Map<string, Function[]>;

  constructor() {
    this.events = new Map();
  }

  addEvent(eventName: string, callback: Function) {
    const events = this.events.get(eventName);

    if (!events) {
      this.events.set(eventName, [callback]);
      return;
    }

    events.push(callback);
  }

  removeEvent(eventName: string, callback: Function) {
    const events = this.events.get(eventName);

    if (events) {
      const eventIndex = events.findIndex((func) => func === callback);

      events.splice(eventIndex, 1);
    }
  }

  emit(eventName: string) {
    const events = this.events.get(eventName);

    if (events) {
      events.forEach((listener) => listener(eventName));
    }
  }
}
