import { DebugElement } from "@angular/core";
import { async, ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { setupCourses } from "../common/setup-test-data";
import { CoursesModule } from "../courses.module";
import { CoursesCardListComponent } from "./courses-card-list.component";

//Presentational Component: A component that simply displays data
describe('CousesCardListComponent', () => {

    let component: CoursesCardListComponent
    let fixture:ComponentFixture<CoursesCardListComponent>
    let debugElement:DebugElement

    beforeEach( waitForAsync(()=>{
        TestBed.configureTestingModule({
            //Typically only need to decleare declerations for a presentational component
            imports:[
                CoursesModule
            ]
        }).compileComponents().then(()=>{
            fixture = TestBed.createComponent(CoursesCardListComponent);

            component = fixture.componentInstance;

            debugElement = fixture.debugElement;
        });
    }));

    it("should create the component", () =>{
        //Check id component loads
        expect(component).toBeTruthy();


    });

    it("should display the course list", () =>{
        //Pass Data to the component
        component.courses = setupCourses();
        fixture.detectChanges()

        const cards = debugElement.queryAll(By.css(".course-card"))

        expect(cards).toBeTruthy("Could not find cards")
        
        expect(cards.length).toBe(12,"Unexpexted number of courses")

    });

    it("should display the first course", () =>{

        component.courses = setupCourses();
        fixture.detectChanges()

        const course = component.courses[0]

        const card = debugElement.query(By.css(".course-card:first-child"));
        const title = card.query(By.css("mat-card-title"));
        const image = card.query(By.css("img"));

        expect(card).toBeTruthy("Could not find course card");
        expect(title.nativeElement.textContent).toBe(course.titles.description)
        expect(image.nativeElement.src).toBe(course.iconUrl);

    });
});