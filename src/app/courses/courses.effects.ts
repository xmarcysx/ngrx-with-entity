import {Injectable} from '@angular/core';
import {act, Actions, createEffect, ofType} from '@ngrx/effects';
import {allCoursesLoaded, courseUpdated, loadAllCourses} from './course.actions';
import {concatMap, map} from 'rxjs/operators';
import {CoursesHttpService} from './services/courses-http.service';

@Injectable()
export class CoursesEffects {

  loadCourses$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(loadAllCourses),
        concatMap(action => this.coursesHttpService.findAllCourses()),
        map(courses => allCoursesLoaded({courses}))
      ),
  );

  saveCourse$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(courseUpdated),
        concatMap(action =>
          this.coursesHttpService.saveCourse(action.update.id, action.update.changes))
      ),
    {dispatch: false}
  );

  constructor(private actions$: Actions,
              private coursesHttpService: CoursesHttpService, ) {}
}
