const MatomoTracker = require("matomo-tracker");

exports.saveLongData = async (req, res) => {

  var matomo = new MatomoTracker(3, 'http://localhost/matomo/matomo.php', false);

  matomo.on("error", function (err) {
    console.log("error tracking request: ", err);
  });

  const result = matomo.track({
    url: 'http://localhost',
    action_name: 'TEST12',
    e_c: 'Ecommerce',
    e_a: 'add',
    e_n: 'Mô tả này là một ví dụ về một mô tả dài hơn 255 ký tự. Trong ví dụ này, chúng ta có thể thấy rằng chúng ta có thể gửi một mô tả dài hơn cho sự kiện hoặc mục tiêu trong Matomo mà không gặp phải giới hạn về độ dài. Điều này cho phép chúng ta lưu trữ nhiều thông tin chi tiết hơn về sự kiện hoặc mục tiêu và sử dụng chúng trong phân tích và báo cáo.',
    e_v: 1,
  });

  console.log("result: ", result);

//   res.status(200).send({ message: "success" });
};