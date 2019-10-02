export default [
  {
    name: 'backlog',
    order: 1,
    cards: [
      {
        id: 1,
        order: 1,
        labels: [
          { type: 'blocked', color: 'blue' },
          { type: 'backend', color: 'red' },
          { type: 'frontend', color: 'green' }
        ],
        members: [
          {
            id: 1,
            name: 'guilherme lico',
            username: 'guibarsevitis',
            photo: 'https://picsum.photos/30'
          },
          {
            id: 2,
            name: 'gisildus oliveiras',
            username: 'gigi',
            photo: 'https://picsum.photos/30'
          }
        ],
        title: 'tituluzin boladaum pesadaum que não é um QA',
        description: 'task 11',
        comments: [
          { user: 1, date: '29/01/1989', comment: 'coe' },
          { user: 1, date: '29/01/1989', comment: 'coe' },
          { user: 2, date: '29/01/1989', comment: 'coe' }
        ],
        attachments: [
          { img: '', date: '29/01/1989' },
          { img: '', date: '29/01/1989' }
        ]
      },
      {
        id: 2,
        order: 2,
        labels: [],
        members: [],
        title: 'tituluzin 12',
        description: 'task 12',
        comments: [ { user: 1, date: '', comment: 'coe' } ],
        attachments: []
      },
      {
        id: 3,
        order: 3,
        labels: [],
        members: [],
        title: 'tituluzin 13',
        description: 'task 13',
        comments: [ { user: 1, date: '', comment: 'coe' } ],
        attachments: []
      },
      {
        id: 4,
        order: 4,
        labels: [],
        members: [],
        title: 'tituluzin 14',
        description: 'task 14',
        comments: [ { user: 1, date: '', comment: 'coe' } ],
        attachments: []
      },
      {
        id: 5,
        order: 5,
        labels: [],
        members: [],
        title: 'tituluzin 15',
        description: 'task 15',
        comments: [ { user: 1, date: '', comment: 'coe' } ],
        attachments: []
      },
      {
        id: 6,
        order: 6,
        labels: [],
        members: [],
        title: 'tituluzin 16',
        description: 'task 16',
        comments: [ { user: 1, date: '', comment: 'coe' } ],
        attachments: []
      }
    ]
  },

  {
    name: 'todo',
    order: 2,
    cards: []
  },

  {
    name: 'doing',
    order: 3,
    cards: [
      {
        id: 7,
        order: 1,
        labels: [],
        members: [],
        title: 'tituluzin 31',
        description: 'task 31',
        comments: [ { user: 1, date: '', comment: 'coe' } ],
        attachments: []
      },
      {
        id: 8,
        order: 2,
        labels: [],
        members: [],
        title: 'tituluzin 32',
        description: 'task 32',
        comments: [ { user: 1, date: '', comment: 'coe' } ],
        attachments: []
      },
      {
        id: 9,
        order: 3,
        labels: [],
        members: [],
        title: 'tituluzin 33',
        description: 'task 33',
        comments: [ { user: 1, date: '', comment: 'coe' } ],
        attachments: []
      }
    ]
  },

  {
    name: 'done',
    order: 4,
    cards: [
      {
        id: 10,
        order: 1,
        labels: [],
        members: [],
        title: 'tituluzin 41',
        description: 'task 41',
        comments: [ { user: 1, date: '', comment: 'coe' } ],
        attachments: []
      },
      {
        id: 11,
        order: 2,
        labels: [],
        members: [],
        title: 'tituluzin 42',
        description: 'task 42',
        comments: [ { user: 1, date: '', comment: 'coe' } ],
        attachments: []
      },
      {
        id: 12,
        order: 3,
        labels: [],
        members: [],
        title: 'tituluzin 43',
        description: 'task 43',
        comments: [ { user: 1, date: '', comment: 'coe' } ],
        attachments: []
      }
    ]
  }
]
