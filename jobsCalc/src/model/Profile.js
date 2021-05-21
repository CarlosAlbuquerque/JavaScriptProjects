
let data = {
  name: "Carlos",
  avatar: "https://github.com/CarlosAlbuquerque.png",
  "monthly-budget": 4000.0,
  "hours-per-day": 6,
  "days-per-week": 5,
  "vacation-per-year": 4,
  "value-hour": 75,
};

module.exports = {
    get(){
        return data;
    },
    update(newData){
      data = newData;
    }
}