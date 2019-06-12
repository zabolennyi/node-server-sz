const initialTodos = [
    {
        "success": "true",
        "message": "todos retrieved successfully",
        "todos": [
            {
                "id": 1,
                "title": "coffee",
                "description": "Go for coffee at 11am"
            }
        ]
    }
  ]

  it('returns JSON', () => {
    cy.request('api/todos')
      .its('headers')
      .its('content-type')
      .should('include', 'application/json')
  })

  it('Validate the status', () => {
     cy.request('api/todos')
    .its('status')
          .should('equal',200);
  })