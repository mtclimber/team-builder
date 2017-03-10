module.exports = {
    port: process.env.PORT || 5000,
    database: process.env.MONGODB_URI || 'mongodb://localhost/team-builder'
};