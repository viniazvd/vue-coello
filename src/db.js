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
        title: 'tituluzin',
        description: 'task 11'
      },
      {
        id: 2,
        order: 2,
        labels: [],
        members: [],
        title: 'tituluzin',
        description: 'task 12'
      },
      {
        id: 3,
        order: 3,
        labels: [],
        members: [],
        title: 'tituluzin',
        description: 'task 13'
      },
      {
        id: 4,
        order: 4,
        labels: [],
        members: [],
        title: 'tituluzin',
        description: 'task 14'
      },
      {
        id: 5,
        order: 5,
        labels: [],
        members: [],
        title: 'tituluzin',
        description: 'task 15'
      },
      {
        id: 6,
        order: 6,
        labels: [],
        members: [],
        title: 'tituluzin',
        description: 'task 16'
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
        title: 'tituluzin',
        description: 'task 31'
      },
      {
        id: 8,
        order: 2,
        labels: [],
        members: [],
        title: 'tituluzin',
        description: 'task 32'
      },
      {
        id: 9,
        order: 3,
        labels: [],
        members: [],
        title: 'tituluzin',
        description: 'task 33'
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
        title: 'tituluzin',
        description: 'task 41'
      },
      {
        id: 11,
        order: 2,
        labels: [],
        members: [],
        title: 'tituluzin',
        description: 'task 42'
      },
      {
        id: 12,
        order: 3,
        labels: [],
        members: [],
        title: 'tituluzin',
        description: 'task 43'
      }
    ]
  }
]
