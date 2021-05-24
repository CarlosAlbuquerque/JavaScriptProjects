const { v4: uuidv4 } = require('uuid');
const Job = require('../model/Job');
const Profile = require('../model/Profile')
const JobUtils = require('../utils/JobUtils')

module.exports = {
    create(req, res){
        return res.render("job")
    },

    async save(req, res) { 
        // req.body = {name: 'Carlos Henrique Albuquerque', 'daily-hours': '12', 'total-hours': '41'}
        await Job.create({
            id: uuidv4(),
            name: req.body.name,
            "daily-hours": req.body["daily-hours"],
            "total-hours": req.body["total-hours"],
            created_at: Date.now() // atribuindo a data de hoje
        })
        
        return res.redirect('/')
    },

    async show(req, res){
        const jobs = await Job.get()
        const profile = await Profile.get()
        const jobId = req.params.id

        // para cada um dos itens do data ele vai rodar uma function 
        // que vai buscar o mesmo id da URL e retornar na const job
        const job = jobs.find(job => job.id == jobId)


        if (!job) {
            return res.send('Job not found!')
        }

        job.budget = JobUtils.calculeteBudget(job, profile["value-hour"])

        return res.render("job-edit", { job })
    },

    async update(req, res){
        const jobId = req.params.id

        const updatedJob = {
            name: req.body.name,
            "total-hours": req.body["total-hours"],
            "daily-hours": req.body["daily-hours"],
        }

        await Job.update(updatedJob, jobId)

        res.redirect(`/job/${jobId}`)
    },

    async delete(req, res){
        const jobId = req.params.id
 
        await Job.delete(jobId)

        return res.redirect('/')
    }
}