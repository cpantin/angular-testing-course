import { TestBed } from "@angular/core/testing";
import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";


describe('CalculatorService', () =>{
    let calculator:CalculatorService
    let loggerSpy: any;

    //Setup the tests
    beforeEach(()=>{
            //Jasmine spies allow us to intecept a call/mock a function 
            loggerSpy = jasmine.createSpyObj('LoggersService', ["log"]);

            //Mock all dependencies
            TestBed.configureTestingModule({
                providers:[
                    CalculatorService,
                    {provide: LoggerService, useValue:loggerSpy}
                ]
            });

            calculator = TestBed.inject(CalculatorService)
    });

    it('should add two numbers',() =>{

        //Preform the tests
        const result = calculator.add(2,2);

        //Run a series of assertions that either fail or pass the test
        expect(result).toBe(4);

        expect(loggerSpy.log).toHaveBeenCalledTimes(1);
    });

    it('should subtract two numbers',() =>{
       

        const result = calculator.subtract(2,2);

        expect(result).toBe(0, "Unexpected subtraction result");

        expect(loggerSpy.log).toHaveBeenCalledTimes(1);
    });
});