const MatomoTracker = require("matomo-tracker");

exports.tracker = (req, res) => {

  // Initialize with your site ID and Matomo URL
  var matomo = new MatomoTracker(2, 'http://localhost/matomo/matomo.php', false);

  matomo.on("error", function (err) {
    console.log("error tracking request: ", err);
  });

  // get value of dimension6 from BE or matomo

  matomo.track({
    url: 'http://localhost',
    e_c: 'Org Status Change',
    e_a: 'Active 2',
    // e_n: '2023-09-21',
    e_v: -2,
    // dimension6: 'Active',
  });

  matomo.track({
    url: 'http://localhost',
    e_c: 'Org Status Change',
    e_a: 'Inactive 2',
    // e_n: '2023-09-21',
    // date: '2023-09-21',
    e_v: 2,
    // dimension7: 'Inactive',
  });

  // matomo.track({
  //   url: 'http://localhost',
  //   e_c: 'Org Status Change',
  //   e_a: 'In Registration 2',
  //   // e_n: '2023-09-21',
  //   date: '2021-09-21',
  //   e_v: 5,
  // });

  // res.status(200).send({ message: "success" });
};