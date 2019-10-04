$(function () {
  const $ = window.$;
  const inputsAmenities = $('.amenities input');
  $(inputsAmenities).change(function () {
    checkAmenities();
  });
  $.get('http://localhost:5001/api/v1/status/', function (data) {
    $('#api_status').toggleClass('available', data.status === 'OK');
  });
  $.post({
    url: 'http://localhost:5001/api/v1/places_search',
    data: JSON.stringify(
      {
        states: [],
        cities: [],
        amenities: []
      }
    ),
    contentType: 'application/json',
    dataType: 'json',
    success: function (objects) {
      const order = [];
      for (const place of objects) {
        order.push(place.name.toLowerCase());
      }
      order.sort();
      const data = objects.sort((a, b) => order.indexOf(a.name.toLowerCase()) - order.indexOf(b.name.toLowerCase()));
      for (const place of data) {
        $('section.places').append(
      `
      <article>
      <div class="title">
      <h2>${place.name}</h2>
      <div class="price_by_night">${place.price_by_night}</div>
      </div>
      <div class="information">
      <div class="max_guest">
      <i class="fa fa-users fa-3x" aria-hidden="true"></i>
      <br />
      ${place.max_guest} Guests
      </div>
      <div class="number_rooms">
      <i class="fa fa-bed fa-3x" aria-hidden="true"></i>
      <br />
      ${place.number_rooms} Bedrooms
      </div>
      <div class="number_bathrooms">
      <i class="fa fa-bath fa-3x" aria-hidden="true"></i>
      <br />
      ${place.number_bathrooms} Bathroom
      </div>
      </div>
      <!-- **********************
      USER
      **********************  -->
      <div class="description">
      <p>${place.description}</p>
      </div>
      </article> <!-- End 1 PLACE Article -->
      `
        );
      }
    }
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
