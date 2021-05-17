const { v4: uuidv4 } = require('uuid');

let data = [
  {
    id: uuidv4(),
    name: "Pizzaria",
    "daily-hours": 2,
    "total-hours": 1,
    created_at: Date.now(),
  },
];

module.exports = {
  get() {
    return data;
  },
  update(newJob) {
    data = newJob;
  },
  delete(id) {
    // filter quando é true mantem o dado, quando é false expulsa(tira, filtra)
    // vai retornar um novo array sem o false
    data = data.filter(job => job.id !== id)
    return data;
  }
};
