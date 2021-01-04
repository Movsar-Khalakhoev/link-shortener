const Link = require('../models/Link')
const {Router} = require('express')
const router = Router()

router.get('/:code', async (req, res) => {
  try {
    const link = await Link.findOne({code: req.params.code})

    if (link) {
      link.clicks++
      link.save()
      res.redirect(link.from)
    }

    res.status(404).json({message: 'Ссылка не найдена'})
  } catch (e) {
    console.log(e)
    res.status(500).json({message: 'Server Error'})
  }
})

module.exports = router
