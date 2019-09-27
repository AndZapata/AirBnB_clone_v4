$(function () {
  $.get('http://localhost:5001/api/v1/status/', function (data) {
    $('#api_status').toggleClass('available', data.status === 'OK');
  });
});
