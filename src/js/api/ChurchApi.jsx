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

  static createPartner(name, commFreq, city, state, other, pc_name, pc_phone, pc_email) {
    $.post(`/api/partners`, {
      name: name,
      commFreq: commFreq,
      city: city,
      state: state,
      other: other,
      pc_name: pc_name,
      pc_phone: pc_phone,
      pc_email: pc_email
    })
    .done((response) => {
      cb(response);
    })
    .fail((response) => {
      cb(response);
    });
  }

  static addChurchContact(audienceType, interactionType, notes, cb) {
    $.put(`/api/church/contact`, {
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