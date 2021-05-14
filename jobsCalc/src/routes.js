const { v4: uuidv4 } = require('uuid');
const express = require("express")
const routes = express.Router()

const views = __dirname + "/views/"


const Profile = {
    data: {
        name: "Carlos",
        avatar: "https://github.com/CarlosAlbuquerque.png",
        "monthly-budget": 4000.00,
        "hours-per-day": 6,
        "days-per-week": 5,
        "vacation-per-year": 4,
        "value-hour": 75
    },

    controllers:{
        index(req, res){
            return res.render(views + "profile", { profile : Profile.data })
        },

        update(req, res){
            // pegar o req.body para pegar os dados
            const data = req.body

            // definir quantas semanas tem um ano 
            const weekPerYear = 52

            // remover as semanas de ferias do ano, para pegar quantas semana tem em 1 mes
            const weekPerMonth = (weekPerYear - data['vacation-per-year'] ) / 12

            // total de horas por semana estou trabalhando
            const weekTotalHours = data['hours-per-day'] * data['days-per-week']

            // total de horas trabalhadas no mes
            const monthlyTotalHours = weekPerMonth * weekTotalHours

            // qual será o valor da minha hora?
            data["value-hour"] = data["monthly-budget"] / monthlyTotalHours

            Profile.data = data 

            // console.log(Profile.data)
            return res.redirect('/profile')
        }
    }

}

const Job = {
    data: [],

    controllers: {
        index(req, res){
            const uptatedJobs = Job.data.map((job) => {
            // ajustes no job
            const remaining = Job.services.remainingDays(job)
            const status = remaining <= 0 ? 'done' : 'progress'
        
            return {
                ...job,
                remaining,
                status,
                budget : Job.services.calculeteBudget(job, Profile.data["value-hour"])
            }
            })


            return res.render(views + "index", { jobs: uptatedJobs}) 
        },

        create(req, res){
            return res.render(views + "job")
        },

        save(req, res) {
            // req.body = {name: 'Carlos Henrique Albuquerque', 'daily-hours': '12', 'total-hours': '41'}
            Job.data.push({
                id: uuidv4(),
                name: req.body.name,
                "daily-hours": req.body["daily-hours"],
                "total-hours": req.body["total-hours"],
                created_at: Date.now() // atribuindo a data de hoje
            })
        
            return res.redirect('/')
        },

        show(req, res){
            
            const jobId = req.params.id

            // para cada um dos itens do data ele vai rodar uma function 
            // que vai buscar o mesmo id da URL e retornar na const job
            const job = Job.data.find(job => job.id == jobId)


            if (!job) {
                return res.send('Job not found!')
            }

            job.budget = Job.services.calculeteBudget(job, Profile.data["value-hour"])

            return res.render(views + "job-edit", { job })
        },

        update(req, res){
            const jobId = req.params.id

            const job = Job.data.find(job => job.id == jobId)

            if(!job){
                return res.render('Job not found!')
            }

            const updatedJob = {
                ...job,
                name: req.body.name,
                "total-hours": req.body["total-hours"],
                "daily-hours": req.body["daily-hours"],
            }

            Job.data = Job.data.map(job =>{

                if (job.id == jobId) {
                    job = updatedJob
                }

                return job
            })

            res.redirect(`/job/${jobId}`)
        },

        delete(req, res){
            const jobId = req.params.id

            // filter quando é true manter, quando é false expulsa(tirar, filtar)
            // vai retornar um novo array sem o false
            Job.data = Job.data.filter(job => job.id !== jobId)

            return res.redirect('/')
        }
    },

    services: {
        remainingDays(job){
            // calculo de tempo restante
            const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()
        
            // criação do created Date 
            const createdDate = new Date(job.created_at)
            // criação do dia de vencimento 
            const dueDay = createdDate.getDate() + Number(remainingDays)
            // criação da data do futuro em milisegundos
            const dueDateInMs = createdDate.setDate(dueDay)
        
            // calculo de prazo de entrega
            const timeDiffInMs = dueDateInMs - Date.now()
        
            //transformar milisegundos em diaas
            const dayInMs = 1000 * 60 * 60 * 24
            const dayDiff = Math.floor(timeDiffInMs/dayInMs)
        
            // restam x dias
            return dayDiff
        },
        calculeteBudget: (job, valueHour) => valueHour * job["total-hours"]
    }
}

// ROUTES

// route index
routes.get('/', Job.controllers.index)

// route Job Create/Save
routes.get('/job', Job.controllers.create)
routes.post('/job', Job.controllers.save)

// route Job Edit/Delete
routes.get('/job/:id', Job.controllers.show)
routes.post('/job/:id', Job.controllers.update)
routes.post('/job/delete/:id', Job.controllers.delete)

// route profile
routes.get('/profile', Profile.controllers.index)
routes.post('/profile', Profile.controllers.update)



module.exports = routes;