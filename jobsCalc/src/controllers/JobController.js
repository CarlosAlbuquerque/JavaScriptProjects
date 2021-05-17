const { v4: uuidv4 } = require('uuid');
const Job = require('../model/Job');
const Profile = require('../model/Profile')
const JobUtils = require('../utils/JobUtils')

module.exports = {
    index(req, res){

    const jobs = Job.get();
    const profile = Profile.get();

        const uptatedJobs = jobs.map((job) => {
        // ajustes no job
        const remaining = JobUtils.remainingDays(job)
        const status = remaining <= 0 ? 'done' : 'progress'
    
        return {
            ...job,
            remaining,
            status,
            budget : JobUtils.calculeteBudget(job, profile["value-hour"])
        }
        })


        return res.render("index", { jobs: uptatedJobs}) 
    },

    create(req, res){
        return res.render("job")
    },

    save(req, res) {
        const jobs = Job.get()
        // req.body = {name: 'Carlos Henrique Albuquerque', 'daily-hours': '12', 'total-hours': '41'}
        jobs.push({
            id: uuidv4(),
            name: req.body.name,
            "daily-hours": req.body["daily-hours"],
            "total-hours": req.body["total-hours"],
            created_at: Date.now() // atribuindo a data de hoje
        })
    
        return res.redirect('/')
    },

    show(req, res){
        const jobs = Job.get()
        const profile = Profile.get()
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

    update(req, res){
        const jobs = Job.get()
        const jobId = req.params.id

        const job = jobs.find(job => job.id == jobId)

        if(!job){
            return res.render('Job not found!')
        }

        const updatedJob = {
            ...job,
            name: req.body.name,
            "total-hours": req.body["total-hours"],
            "daily-hours": req.body["daily-hours"],
        }

        const newJobs = jobs.map(job =>{
            if (job.id == jobId) {
                job = updatedJob
            }
            return job
        })

        Job.update(newJobs)

        res.redirect(`/job/${jobId}`)
    },

    delete(req, res){
        const jobId = req.params.id
 
        Job.delete(jobId)

        return res.redirect('/')
    }
}