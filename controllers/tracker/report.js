const MatomoTracker = require("matomo-tracker");

exports.report = async (req, res) => {

  var matomo = new MatomoTracker(3, 'http://localhost/matomo/matomo.php', false);

  matomo.on("error", function (err) {
    console.log("error tracking request: ", err);
  });

  const result = matomo.track({
    url: 'http://localhost',
    action_name: 'TEST12',
    period: 'month',
    format: 'json',
    token_auth: '0c1b32c447fc6e6f2bb45a770f740fb2',
    module: 'CustomReports',
    method: 'CustomReports.addCustomReport',
    name: 'test',
    reportType: 'table',
    metricIds: 'Visits',
  });

  console.log("result: ", result);

//   res.status(200).send({ message: "success" });
};