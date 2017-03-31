/**
 * Created by Wu Jian Ping on 2017/2/8.
 */

import { Router } from 'express'

//just for demo
import readme from '../../README.md'

const router = Router()

router.get('/loadReadme', (req, res) => {
  res.json({
    __html: readme
  })
})

module.exports = router
