/* globals test, expect */
const { makeTreeFromUrlArray } = require('./makeTreeFromUrlArray.js')

test('Works as expected', () => {
  const input = [
    '/hello',
    '/user/wowzers',
    '/user/coolio',
    '/november/26/1986'
  ]

  const output = makeTreeFromUrlArray(input)

  const expected = {
    id: '/',
    path: '/',
    depth: 0,
    hasChildren: true,
    children: [
      {
        id: '/hello',
        path: '/hello',
        depth: 1,
        hasChildren: false,
        children: []
      },
      {
        id: '/user',
        path: '/user',
        depth: 1,
        hasChildren: true,
        children: [
          {
            id: '/user/wowzers',
            path: '/user/wowzers',
            depth: 2,
            hasChildren: false,
            children: []
          },
          {
            id: '/user/coolio',
            path: '/user/coolio',
            depth: 2,
            hasChildren: false,
            children: []
          }
        ]
      },
      {
        id: '/november',
        path: '/november',
        depth: 1,
        hasChildren: true,
        children: [
          {
            id: '/november/26',
            path: '/november/26',
            depth: 2,
            hasChildren: true,
            children: [
              {
                id: '/november/26/1986',
                path: '/november/26/1986',
                depth: 3,
                hasChildren: false,
                children: []
              }
            ]
          }
        ]
      }
    ]
  }

  expect(output).toMatchObject(expected)
})
