const express = require('express')
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware')
const { createBlogCat, updateBlogCat, deleteBlogCat, getaBlogCat, getAllBlogCat } = require('../controller/blogCatCntrl')
const router =  express.Router()

router.get('/',getAllBlogCat)
router.post('/',authMiddleware,isAdmin,createBlogCat)
router.put('/:id',authMiddleware,isAdmin,updateBlogCat)
router.delete('/:id',authMiddleware,isAdmin,deleteBlogCat)
router.get('/:id',authMiddleware,isAdmin,getaBlogCat)

module.exports = router