const queries = require("../queries/manufacturing");

var secret = 'cschmidtbcf';

module.exports = app => {

  app.post('/manufacturing/:location', function(req, res, next) {
    if (req.body.secret === secret) {
      queries.addSchedule(JSON.stringify(req.body.schedule), req.params.location)
        .then(function(result) {
          res.json(result);
        })
    }
    else {
      res.json({ message: 'The secret provided was incorrect' });
    }

  });
  app.get('/manufacturing/:location', function(req, res, next) {
    if (req.headers.authorization === secret) {
      queries.getSchedule(req.params.location).then(result => {
        res.json(JSON.parse(result[0]['schedule']))
      });
    }
    else {
      res.json({ message: 'The secret provided was incorrect' });
    }
  });
};
