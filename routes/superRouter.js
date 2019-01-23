class SuperRouter {
    constructor(Controller) {
        this.Controller = Controller

        this.getAll = this.getAll.bind(this)
        this.getOne = this.getOne.bind(this)
        this.edit = this.edit.bind(this)
        this.add = this.add.bind(this)
        this.delete = this.delete.bind(this)
    }

    async getAll(req, res) {
        try {
            const data = await this.Controller.getAll()
            res.json({
                data,
                success: true
            })
        } catch (e) {
            console.log(e)
            res.status(500).send({
                message: 'Lỗi server vui lòng thử lại'
            })
        }
    }

    async getOne(req, res) {
        try {
            const id = req.params.id
            const data = await this.Controller.getOne({ _id: id})
            if (data) {
                res.json({
                    data,
                    success: true
                })
            } else {
                throw error
            }
        } catch (error) {
            console.log(error)
            res.status(500).send({
                message: 'Lỗi server vui lòng thử lại'
            })
        }
    }

    async add(req, res) {
        try {
            const data = req.body
            const item = await this.Controller.add(data);
            res.json({
                item,
                success: true
            })
        } catch (error) {
            console.log(error)
            res.status(500).send({
                message: 'Lỗi server vui lòng thử lại'
            })
        }
    }

    async edit(req, res) {
        try {
            const data = req.body
            const item = await this.Controller.edit(data);
            res.json({
                item,
                success: true
            })
        } catch (error) {
            console.log(error)
            res.status(500).send({
                message: 'Lỗi server vui lòng thử lại'
            })
        }
    }

    async delete(req, res) {
        try {
            await this.Controller.delete(req.params.id)
            res.json({
                success: true
            })
        } catch (e) {
            console.log(e)
            res.status(500).send({
                message: 'Lỗi server vui lòng thử lại'
            })
        }
    }
}

module.exports = SuperRouter