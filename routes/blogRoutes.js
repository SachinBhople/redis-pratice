const { getAllBlogs, addBlog, updateBlog, deleteBlog } = require("../controller/blogController")

const router = require("express").Router()

router
    .get("/", getAllBlogs)
    .post("/create-blog", addBlog)
    .put("/update-blog/:blogId", updateBlog)
    .delete("/delete-blog/:blogId", deleteBlog)

module.exports = router