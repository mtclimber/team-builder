const $ = require('jquery');

let stations = null;
class Church {

  static addChurchContact(audienceType, interactionType, notes, cb) {
    console.log(`${audienceType} ${interactionType} ${notes}`);
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