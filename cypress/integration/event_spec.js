describe('event', () => {
    it('user can create event', () => {
        // login
        cy.visit('http://localhost:3000');
        cy.findByRole('textbox', {name: /user name/i}).type('user')
        cy.findByLabelText(/password/i).type('123')
        cy.findByRole('button', {name: /log in/i}).click()
    })

    // check events
    let oldEvents;
    cy.get('[data-test=sidenav-user-events]').then($events => oldEvents = $events.text());

    // click on new button
    cy.findByRole('button', { name: /add event/i }).click();

    // add event
    cy.findByRole('textbox').type('user');
    cy.findByPlaceholderText(/date/i).type('15-01-2022');
    cy.findByPlaceholderText(/event description/i).type('new event');
    cy.findByText(/add event/i).click();

    // close create dialog
    cy.findByRole('button', { name: /close/i }).click();

    // verify if event added
    cy.get('[data-test=sidenav-user-events]').then($events => {
        const event = {
            name: "new event",
            date: "15-01-2022",
            users: ["user"]
        }

        const addedEvent = $events.find(e => e === event);
        expect(addedEvent).to.equal(event);
    });
})