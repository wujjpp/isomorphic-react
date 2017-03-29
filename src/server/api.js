/**
 * Created by Wu Jian Ping on 2017/2/8.
 */

import {
  Router
} from 'express'

import readme from '../../README.md'

const router = Router()

router.get('/loadReadme', (req, res) => {
  res.json({
    __html: readme
  })
})

//
// router.get('/loadTodoList', (req, res) => {
//   res.json([{
//       id: 1,
//       name: 'TODO1',
//       complete: false
//     },
//     {
//       id: 2,
//       name: 'TODO2',
//       complete: false
//     },
//     {
//       id: 3,
//       name: 'TODO3',
//       complete: false
//     }
//   ])
// })
//
// router.get('/loadUser', (req, res) => {
//   res.json({
//     name: '张三'
//   })
// })

module.exports = router
