const Profile = require('../model/Profile');
const Job = require('../model/Job');
const JobUtils = require('../utils/JobUtils')

module.exports = {
  async index(req, res) {
    const jobs = await Job.get();
    const profile = await Profile.get();

    let statusCount = {
      progress: 0,
      done: 0,
      total: jobs.length,
    }

    // total de horas por dia de cada Job em progress
    let jobsTotalHours = 0

    const uptatedJobs = jobs.map((job) => {
      // ajustes no job
      const remaining = JobUtils.remainingDays(job);
      const status = remaining <= 0 ? "done" : "progress";

      // status = done então vai add um projeto no statusCount.done
      //Somando a quantidade de status
      statusCount[status] += 1 

      // total de horas por dia de cada Job em progress
      jobsTotalHours = status === "progress" ? jobsTotalHours + Number(job["daily-hours"]) : jobsTotalHours

      return {
        ...job,
        remaining,
        status,
        budget: JobUtils.calculeteBudget(job, profile["value-hour"]),
      };
    });

    // qtd de horas que quero trabalhar (profile)
    // MENOS
    // a qtd de horas/diaa de cada job em progress    
    const freeHours = profile["hours-per-day"] - jobsTotalHours;


    return res.render("index", { jobs: uptatedJobs, profile: profile , statusCount: statusCount, freeHours: freeHours });
  },
}; 
