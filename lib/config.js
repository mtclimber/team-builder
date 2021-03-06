module.exports = {
    port: process.env.PORT || 5000,
    database: 'mongodb://heroku_5cp9ht4f:u0gnp63s63fn71csn48t104mts@ds123400.mlab.com:23400/heroku_5cp9ht4f' || process.env.MONGODB_URI || 'mongodb://localhost/team-builder',
    loggedInId: '58c2c6f054072335e00c5977',
    damagePerDay: {
        //high    
        0: 1,
        //medium
        1: .5,
        //low
        2: .3
    },
    contactValue: {
        //Church
        0: {
            //Text
            0: 1,
            //Live Chat
            1: 50,
            //Recorded Message
            2: 30,
            //Face to Face
            3: 75
        },
        //Group
        1: {
            //Text
            0: 10,
            //Live Chat
            1: 30,
            //Recorded Message
            2: 5,
            //Face to Face
            3: 50
        },
        //Individual
        2: {
            //Text
            0: 10,
            //Live Chat
            1: 10,
            //Recorded Message
            2: 10,
            //Face to Face
            3: 40
        }
    }
};