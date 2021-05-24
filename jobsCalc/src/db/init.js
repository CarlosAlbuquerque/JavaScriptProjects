const Database = require('./config');

const initDb = {
  async init() {

    const db = await Database()

    await db.exec(
      `CREATE TABLE profile(
       id CHAR(36) PRIMARY KEY,
       name TEXT, 
       avatar TEXT, 
       monthly_budget INT, 
       hours_per_day INT, 
       days_per_week INT, 
       vacation_per_year INT, 
       value_hour INT
    )`
    );

    await db.exec(
      `CREATE TABLE jobs(
        id CHAR(36) PRIMARY KEY,
        name TEXT, 
        daily_hours INT, 
        total_hours INT,
        created_at DATETIME
    )`
    );

    await db.run(
      `INSERT INTO profile(
        id ,
        name ,
        avatar ,
        monthly_budget ,
        hours_per_day ,
        days_per_week ,
        vacation_per_year,
        value_hour
    ) VALUES(
        "77381f90-7244-4284-861b-e22b8f3eb7d2",
        "Carlos Albuquerque",
        "https://github.com/CarlosAlbuquerque.png",
        4000,
        5,
        7,
        4,
        70
    )`
    );

    await db.run(
      `INSERT INTO jobs(
            id,
            name, 
            daily_hours, 
            total_hours,
            created_at 
        ) VALUES (
            "9dd85193-b4c7-42b1-a10b-a1a49388a01a",
            "Pizzaria Guloso",
            5,
            20,
            1621604705073
        )`
    );

    await db.close();
  }
};

initDb.init();
