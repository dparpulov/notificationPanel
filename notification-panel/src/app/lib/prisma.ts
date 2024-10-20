import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  const globalWithPrisma = global as typeof globalThis & {
    prisma: PrismaClient;
  };
  if (!globalWithPrisma.prisma) {
    globalWithPrisma.prisma = new PrismaClient();
  }
  prisma = globalWithPrisma.prisma;
}

export default prisma;


/*
 * Complete the class 'EventEmitter' below.
 *
 * The class EventEmitter should have following methods:
 *  1. on(eventName, callback)
 *  2. emit(eventName, data)
 *  3. off(eventName, callback)
 *  4. once(eventName, callback)
 */


// Create a class EventEmitter with the following methods:
// on(eventName, callback): Adds a listener to the event.
// emit(eventName, data): Emits an event with the given data.
// off(eventName, callback): Removes a listener from the event.
// once(eventName, callback): Adds a listener that will be called only once.
// class EventEmitter {
//   // Enter your code here
//   constructor() {
//       this.events = {};
//   }
  
//   on (eventName, callback) {
//       if (!this.events[eventName]) {
//           this.events[eventName] = [];
//       }
      
//       this.events[eventName].push(callback);
//   }
  
//   emit(eventName, data) {
//       if (this.events[eventName]) {
//           if (data) {
//               this.events[eventName].forEach(callback => callback(data));
//               return;
//           }
//           this.events[eventName].forEach(callback => callback());
//       }
//   }
  
//   off (eventName, callback) {
//       if(this.events[eventName]) {
//           this.events[eventName] = this.events[eventName].filter(callbackFunction => callbackFunction !== callback)
//       }
//   }
  
//   once (eventName, callback) {
//       const onWrapper = (data) => {
//           callback(data);
//           this.off(eventName, onWrapper);
//       }
      
//       this.on(eventName, onWrapper);
//   }
// }