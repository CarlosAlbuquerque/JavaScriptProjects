const Profile = require('../model/Profile')


// module.exports faz com que tudo que tem nele seja exportado
module.exports = {
    index(req, res){
        const profile = Profile.get()
        console.log(profile)
        return res.render("profile", { profile : Profile.get() })
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
        const valueHour = data["monthly-budget"] / monthlyTotalHours

        Profile.update({ 
            ...Profile.get(),
            ...req.body,
            "value-hour": valueHour
        })

        // console.log(Profile.get())
        return res.redirect('/profile')
    }
}