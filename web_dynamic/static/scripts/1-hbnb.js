$(function() {
    inputsAmenities = $('.amenities input');
    $(inputsAmenities).change( function(){
	checkAmenities();
    })
});

function checkAmenities () {
    amenitiesName = [];
    amenitiesId = [];
    $(".amenities input:checked").each(function (){
	amenitiesName.push($(this).attr("data-name"));
	amenitiesId.push($(this).attr("data-id"));
    });
    if (amenitiesName.length === 0) {
	$('.amenities h4').html('&nbsp;')
    } else {
	$('.amenities h4').text(amenitiesName.join(", "))
    }


}
