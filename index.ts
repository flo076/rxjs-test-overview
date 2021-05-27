import { Observable, Subject, from } from 'rxjs';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

const foo = new Observable(subscriber => {
  subscriber.next(10);
  subscriber.next(28);
}).pipe(map(x => x + Math.random()));

const subject = new ReplaySubject<number>(200);

subject.subscribe({
  next: v => console.log(`observer C from subject: ${v}`)
});
subject.subscribe({
  next: v => console.log(`observer D from subject : ${v}`)
});

const subjectBis = new Subject<number>();

subjectBis.subscribe({
  next: v => console.log(`observer E from subjectBis: ${v}`)
});
subjectBis.subscribe({
  next: v => console.log(`observer F from subjectBis : ${v}`)
});

foo.subscribe(subject); // You can subscribe providing a Subject
subject.subscribe(subjectBis);

foo.subscribe(y => {
  console.log('observer A from observable ' + y);
});

foo.subscribe(y => {
  console.log('observer B from observable ' + y);
});
