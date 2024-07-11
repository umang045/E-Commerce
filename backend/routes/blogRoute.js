const express = require('express')
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware')
const { createblog, deleteblog, updateblog, getablog, getAllblog, likeblog, dislikeblog } = require('../controller/blogCntrl')
const router = express.Router()

router.post('/',authMiddleware,isAdmin,createblog)
router.delete('/:id',authMiddleware,isAdmin,deleteblog)
router.put('/:id',authMiddleware,isAdmin,updateblog)
router.get('/:id',getablog)
router.get('/',getAllblog)
// router.get('/',authMiddleware,isAdmin,getAllblog)
router.put('/likes',authMiddleware,likeblog)
router.put('/dislikes',authMiddleware,dislikeblog)

module.exports = router