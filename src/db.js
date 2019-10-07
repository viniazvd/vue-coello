export default [
  {
    name: 'backlog',
    order: 1,
    cards: [
      {
        id: 1,
        order: 1,
        tags: [
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
        activitys: [
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
        tags: [],
        members: [],
        title: 'tituluzin 12',
        description: 'task 12',
        activitys: [ { user: 1, date: '', comment: 'coe' } ],
        attachments: []
      },
      {
        id: 3,
        order: 3,
        tags: [],
        members: [],
        title: 'tituluzin 13',
        description: 'task 13',
        activitys: [ { user: 1, date: '', comment: 'coe' } ],
        attachments: []
      },
      {
        id: 4,
        order: 4,
        tags: [],
        members: [],
        title: 'tituluzin 14',
        description: 'task 14',
        activitys: [ { user: 1, date: '', comment: 'coe' } ],
        attachments: []
      },
      {
        id: 5,
        order: 5,
        tags: [],
        members: [],
        title: 'tituluzin 15',
        description: 'task 15',
        activitys: [ { user: 1, date: '', comment: 'coe' } ],
        attachments: []
      },
      {
        id: 6,
        order: 6,
        tags: [],
        members: [],
        title: 'tituluzin 16',
        description: 'task 16',
        activitys: [ { user: 1, date: '', comment: 'coe' } ],
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
        tags: [],
        members: [],
        title: 'tituluzin 31',
        description: 'task 31',
        activitys: [ { user: 1, date: '', comment: 'coe' } ],
        attachments: []
      },
      {
        id: 8,
        order: 2,
        tags: [],
        members: [],
        title: 'tituluzin 32',
        description: 'task 32',
        activitys: [ { user: 1, date: '', comment: 'coe' } ],
        attachments: []
      },
      {
        id: 9,
        order: 3,
        tags: [],
        members: [],
        title: 'tituluzin 33',
        description: 'task 33',
        activitys: [ { user: 1, date: '', comment: 'coe' } ],
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
        tags: [],
        members: [],
        title: 'tituluzin 41',
        description: 'task 41',
        activitys: [ { user: 1, date: '', comment: 'coe' } ],
        attachments: []
      },
      {
        id: 11,
        order: 2,
        tags: [],
        members: [],
        title: 'tituluzin 42',
        description: 'task 42',
        activitys: [ { user: 1, date: '', comment: 'coe' } ],
        attachments: []
      },
      {
        id: 12,
        order: 3,
        tags: [],
        members: [],
        title: 'tituluzin 43',
        description: 'task 43',
        activitys: [ { user: 1, date: '', comment: 'coe' } ],
        attachments: []
      }
    ]
  }
]
