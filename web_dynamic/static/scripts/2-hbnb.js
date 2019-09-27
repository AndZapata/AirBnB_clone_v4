$(function () {
    const $ = window.$;
    const inputsAmenities = $('.amenities input');
    $(inputsAmenities).change(function () {
	checkAmenities();
    });
    $.get('http://localhost:5001/api/v1/status/', function (data) {
      $('#api_status').toggleClass('available', data.status === 'OK');
    });
});

function checkAmenities () {
    const amenitiesName = [];
    const amenitiesId = [];
    $('.amenities input:checked').each(function () {
	amenitiesName.push($(this).attr('data-name'));
	amenitiesId.push($(this).attr('data-id'));
    });
    if (amenitiesName.length === 0) {
	$('.amenities h4').html('&nbsp;');
    } else {
	$('.amenities h4').text(amenitiesName.join(', '));
    }
}
