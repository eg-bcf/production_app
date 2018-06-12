var knex = require("../knex.js");

function Results() {
  return knex('schedules');
}

function addSchedule(schedule, location) {
  return Results()
          .insert({
            'schedule': schedule,
            'location': location
          })
}

function getSchedule(schedule) {
  return Results()
          .where({
            'location': schedule
          })
          .max('schedule_id')
            .then( res => {
              return (Results()
                      .where({
                        'schedule_id': res[0]['max(`schedule_id`)']
                      }))
            })

}

module.exports = {
  addSchedule,
  getSchedule
}
