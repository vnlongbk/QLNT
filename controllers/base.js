class BaseController {
    constructor(Model) {
        this.Model = Model

        this.getAll = this.getAll.bind(this)
        this.getOne = this.getOne.bind(this)
        this.add = this.add.bind(this)
        this.edit = this.edit.bind(this)
        this.delete = this.delete.bind(this)
        this.countAll = this.countAll.bind(this)
        this.fields = []
        this.requiredFields = []
        this.relationFields = []
        this.models = {}
    }

    async getObject(data, isAdd = true) {
        return this.fields.reduce(async (obj, field) => {
            obj = await obj
            if (data[field]) {
                obj[field] = data[field];
            } else if (isAdd && this.requiredFields.indexOf(field) > -1) {
                throw new Error(`Missing field ${field}`)
            }
            if (data[field] && this.relationFields.indexOf(field) > -1) {
                const ob = await this.models[field].findById(data[field])
                if (!ob) {
                    throw new Error(`${field} does not exists`)
                }
            }
            return obj;
        }, Promise.resolve({}))
    }

    async getAll(offset = 0) {
        let job = this.Model.find().limit(10).skip(offset)
        this.relationFields.forEach(field => {
            job = job.populate(field)
        })
        const items = await job
        return items
    }

    async countAll(params = {}) {
        const count = await this.Model.count(params)
        return count
    }

    async getOne(params) {
        const item = await this.Model.findOne(params)
        return item
    }

    async add(data) {
        data = await this.getObject(data);
        const item = new this.Model(data)
        await item.save()
        return item
    }

    async edit(data) {
        data = Object.assign(data,
            await this.getObject(data, false)  
        );
        let item = await this.Model.findOne({ _id: data._id })
        if (!item) {
            throw new Error('Not found')
        }
        item = Object.assign(item, data)
        return item.save()
    }

    async delete(id) {
        const item = await this.Model.findOne({ _id: id })
        if (item) {
            await item.remove()
        } else {
            throw new Error('Not found')
        }
        return item
    }
    
}

module.exports = BaseController