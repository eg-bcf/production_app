var knex = require("../knex.js");

function Results() {
  return knex('schedules');
}

function addSchedule(schedule) {
  return Results()
          .insert({
            'schedule': schedule
          })
}

function getSchedule(schedule) {
  return Results()
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
