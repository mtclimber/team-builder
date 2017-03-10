const $ = require('jquery');

let stations = null;
class Member {
  static createMember(name, username, teamName, leadingTeamName, cb) {
    $.post(`/api/auth/register`, {
      name: name,
      username: username,
      teamName: teamName,
      leadingTeamName: leadingTeamName
    })
    .done((response) => {
      cb(response);
    })
    .fail((response) => {
      cb(response);
    });
  };

  static getTeams(cb) {
    $.get(`/api/teams`)
    .done((response) => {
      cb(response);
    })
    .fail((response) => {
      cb(response);
    });
  };

  static login(username, password, cb) {
    $.post('/api/auth/login', {
      username: username,
      password: password
    })
    .done((response) => {
      cb({err: false, response: response});
    })
    .fail((response) => {
      cb({err: true});
    });
  }
};

module.exports = Member;
