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

  static getPartner(id, cb) {
    $.get(`/api/partners/` + id)
    .done((response) => {
      cb(response);
    })
    .fail((response) => {
      cb(response);
    });
  };

  static createPartner(name, commFreq, partnerRating, city, state, pc_name, pc_phone, pc_email, cb) {
    $.post(`/api/partners`, {
      name: name,
      commfreq: commFreq,
      partner_rating: partnerRating,
      city: city,
      state: state,
      primary_name: pc_name,
      primary_phone: pc_phone,
      primary_email: pc_email,
      teammember: ''
    })
    .done((response) => {
      cb(response);
    })
    .fail((response) => {
      cb(response);
    });
  }

  static addChurchContact(partnerId, audienceType, interactionType, notes, cb) {
    $.post(`/api/history/${partnerId}`, {
      audience_type: audienceType,
      interaction_type: interactionType,
      note: notes
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
