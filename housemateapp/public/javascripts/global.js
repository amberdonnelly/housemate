//Userlist data array for filling in info box
//in a real app should define single master global and populate with properties + methods
var userListData = [];

//DOM Ready =============================
//Add User button click
$('#btnAddUser').on('click', addUser);

/*note: when working with jQuery on method we need to ref a static element on the page first, so we pick tbody*/

//Functions================================
// Add User
function addUser(event) {
  event.preventDefault();
  // Super basic validation - increase errorCount variable if any fields are blank
  var errorCount = 0;
  $('#addUser input').each(function(index, val) {
    if($(this).val() === '') { errorCount++; }
  });

  // Check and make sure errorCount's still at zero
  if(errorCount === 0) {

    // If it is, compile all user info into one object
    var newUser = {
      'name': $('#addUser fieldset input#usr').val(),
      'password': $('#addUser fieldset input#pwd').val(),
      'house': $('#addUser fieldset input#house').val()
    }

    // Use AJAX to post the object to our adduser service
    $.ajax({
      type: 'POST',
      data: newUser,
      url: '/users/adduser', //probably wrong but idk what its supposed to be 
      dataType: 'JSON'
    }).done(function( response ) {
      // Check for successful (blank) response
      if (response.msg === '') {

        // Clear the form inputs
        $('#addUser fieldset input').val('');

      }
      else {

      // If something goes wrong, alert the error message that our service returned
      alert('Error: ' + response.msg);
      }
    });
  }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};
