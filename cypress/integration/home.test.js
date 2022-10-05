describe('Home Page',()=>{

    it('should display a list of courses', ()=>{
        cy.fixture('courses.json').as("coursesJSON");
        //mock returned data
        cy.server()
        cy.route('/api/courses', "@coursesJSON").as("courses")
        
        cy.visit('localhost:4401');
        cy.contains("All Courses");

        cy.wait('@courses');
        cy.get("mat-card").should("have.length", 9)
    });
})