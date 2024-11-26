const Blog = require("../modal/Blog")
const { redis } = require("../utils/redis")

exports.getAllBlogs = async (req, res) => {

    try {
        console.log("ddd");
        const exists = await redis.exists("newblogs")
        let value
        if (exists) {
            value = await redis.get("newblogs")
            await redis.expire("newblogs", 10)
            console.log("redist");

        } else {
            console.log("datebase");
            const result = await Blog.find()
            await redis.set("newblogs", JSON.stringify(result))
            await redis.expire("newblogs", 10)
            value = await redis.get("newblogs")
        }
        const parsedata = JSON.parse(value)
        res.status(200).json({ message: "blog Fetch success", result: parsedata })
    } catch (error) {
        res.status(500).json({ message: error.message || "something went wrong" })

    }
}
exports.addBlog = async (req, res) => {

    try {
        const { desc, title } = req.body
        await Blog.create({ desc, title })
        res.status(201).json({ message: "blog Create success" })
    } catch (error) {
        res.status(500).json({ message: error.message || "something went wrong" })

    }
}
exports.updateBlog = async (req, res) => {

    try {
        const { blogId } = req.params
        console.log(req.body);
        await Blog.findByIdAndUpdate(blogId, req.body)
        res.status(201).json({ message: "blog update success" })
    } catch (error) {
        res.status(500).json({ message: error.message || "something went wrong" })

    }
}
exports.deleteBlog = async (req, res) => {

    try {
        const { blogId } = req.params
        await Blog.findByIdAndDelete(blogId)
        res.status(201).json({ message: "blog delete success" })
    } catch (error) {
        res.status(500).json({ message: error.message || "something went wrong" })

    }
}