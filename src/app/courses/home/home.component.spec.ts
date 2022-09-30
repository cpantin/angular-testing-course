import {ComponentFixture, fakeAsync, flush, flushMicrotasks, TestBed, waitForAsync} from '@angular/core/testing';
import {CoursesModule} from '../courses.module';
import {DebugElement} from '@angular/core';

import {HomeComponent} from './home.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {CoursesService} from '../services/courses.service';
import {HttpClient} from '@angular/common/http';
import {COURSES} from '../../../../server/db-data';
import {setupCourses} from '../common/setup-test-data';
import {By} from '@angular/platform-browser';
import {of} from 'rxjs';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {click} from '../common/test-utils';



//Container Component
describe('HomeComponent', () => {

  let fixture: ComponentFixture<HomeComponent>;
  let coursesService:any
  let component:HomeComponent;
  let debugElement: DebugElement;
  const beginnerCourses = setupCourses().filter(course => course.category === 'BEGINNER');
  const advancedCourses = setupCourses().filter(course => course.category === 'ADVANCED')

  beforeEach(waitForAsync(() => {
    const coursesServiceSpy = jasmine.createSpyObj('CoursesService',["findAllCourses"]);

    TestBed.configureTestingModule({
      //The course module is chosen because it contains all the modules and declerations our component needs
      imports:[
        CoursesModule,
        //Stops animations from happening but allows component to work
        NoopAnimationsModule
      ],
      providers:[
        {provide: CoursesService, useValue:coursesServiceSpy}
      ]
    }).compileComponents().then(()=>{

      fixture = TestBed.createComponent(HomeComponent)
      component = fixture.componentInstance
      debugElement = fixture.debugElement
      coursesService = TestBed.inject(CoursesService)

    });

  }));

  it("should create the component", () => {

    expect(component).toBeTruthy();

  });


  it("should display only beginner courses", () => {

    coursesService.findAllCourses.and.returnValue(of(beginnerCourses));
    fixture.detectChanges()

    const tabs = debugElement.queryAll(By.css(".mat-tab-label"));
    expect(tabs.length).toBe(1, "unexpected number of tabs found")

  });


  it("should display only advanced courses", () => {

    coursesService.findAllCourses.and.returnValue(of(advancedCourses));
    fixture.detectChanges()

    const tabs = debugElement.queryAll(By.css(".mat-tab-label"));
    expect(tabs.length).toBe(1, "unexpected number of tabs found")

  });


  it("should display both tabs", () => {

    coursesService.findAllCourses.and.returnValue(of(setupCourses()));
    fixture.detectChanges()

    const tabs = debugElement.queryAll(By.css(".mat-tab-label"));
    expect(tabs.length).toBe(2, "Expected to find two tabs")

  });

  // Simulate user interaction w/ DOM
  //Is supposed to fail in section 3
  it("should display advanced courses when tab clicked", () => {

    coursesService.findAllCourses.and.returnValue(of(setupCourses()));
    fixture.detectChanges()
    
    const tabs = debugElement.queryAll(By.css(".mat-tab-label"));

    //Click using debug element
    //debugElement.nativeElement.click();

    //Click using function
    click(tabs[1])


    const cardTitles = debugElement.queryAll(By.css('.mat-card-title'));

    expect(cardTitles.length).toBeGreaterThanOrEqual(0,"Could not find card titles");

    expect(cardTitles[0].nativeElement.textContent).toContain("Angular Security Course");

  });

});


