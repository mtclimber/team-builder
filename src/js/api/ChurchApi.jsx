const $ = require('jquery');

let stations = null;
class Church {
  static getPartners(cb) {
    $.get(`/api/partners`)
    .done((response) => {
      cb(response);
    })
    .fail((response) => {
      cb(response);
    });
  };
  
  static addChurchContact(audienceType, interactionType, notes, cb) {
    $.post(`/api/church/contact`, {
      audienceType: audienceType,
      interactionType: interactionType,
      notes: notes
    })
    .done((response) => {
      cb(response);
    })
    .fail((response) => {
      cb(response);
    });
  };
};

module.exports = Church;