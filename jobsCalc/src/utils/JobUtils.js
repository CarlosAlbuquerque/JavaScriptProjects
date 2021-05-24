module.exports = {
    remainingDays(job){
        // calculo de tempo restante
        const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()
    
        // criação do created Date 
        const createdDate = new Date(job.created_at)
        // criação dxo dia de vencimento 
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