it('works', () => {})

it('loads todo', () => {
  cy.visit('http://todomvc.com/examples/react/')
})

it('loads items from local storage', () => {
  const todos = [{
    title: 'test'
  }, {
    title: 'test 2'
  }]
  cy.visit('http://todomvc.com/examples/react/', {
    onBeforeLoad: function(win) {
      win.localStorage.setItem('react-todos', JSON.stringify(todos))
    }
  })

  cy.get('.todo-list li')
    .should('have.length', 2)
})

it('enters todos', () => {
  cy.visit('http://todomvc.com/examples/react/')
  cy.focused()
    .type('do something{enter}')
  cy.get('input.new-todo')
    .type('do something else{enter}')
  cy.get('.todo-list li')
    .should('have.length', 2)
  cy.get('.todo-list li').first().contains('do something')
  cy.get('.todo-list li').eq(1).find('label').contains('do something else')
})

describe.only('tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('has input focused', () => {
    cy.focused()
      .should('have.class', 'new-todo')
  })
})
