$(function() {
  console.log("hello world");

  // test get
  // $.ajax({
  //   url: "https://r6am5z4kml.execute-api.us-east-1.amazonaws.com/prod/customers/",
  //   method: "GET"
  // }).done(function(data) {
  //   if (console && console.log) {
  //     console.log(data);
  //   }
  // });

  $.ajax({
    url: "https://r6am5z4kml.execute-api.us-east-1.amazonaws.com/prod/customers",
    method: "POST",
    contentType: 'application/json',
    data: JSON.stringify({
      "lastname": "applg",
      "firstname": "apple",
      "email": "coladau@123.com",
      "address_ref": "1",
      "phone_number": "1112223333"

    })
  }).done(function(data) {
    if (console && console.log) {
      console.log(data);
    }
  });



});