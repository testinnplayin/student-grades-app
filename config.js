exports.DATABASE_URL = process.env.DATABASE_URL || global.DATABASE_URL || 'mongodb://testplayer:pU74nEskA1@ds149258.mlab.com:49258/student-grades-app';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/test-student-grades-app';
exports.PORT = process.env.PORT || 8080;