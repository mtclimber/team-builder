const $ = require('jquery');

let stations = null;
class Team {
  static getTeams(cb) {
    $.get(`/api/teams`)
    .done((response) => {
      cb(response);
    })
    .fail((response) => {
      cb(response);
    });
  };
};

module.exports = Team;
