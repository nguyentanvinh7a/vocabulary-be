const AWS = require('aws-sdk');

// Configure AWS SDK
AWS.config.update({
  region: 'ap-southeast-1',
  accessKeyId: 'AKIAQKAIOBBL7ANE67GM',
  secretAccessKey: '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'
});

module.exports = AWS;
