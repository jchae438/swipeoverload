$('#addEntryForm').submit(function(e) {
	e.preventDefault();

	var name = document.forms['addEntryForm'].elements['name'].value;
	var phone_number = document.forms['addEntryForm'].elements['phone_number'].value;
	var num_swipes = document.forms['addEntryForm'].elements['num_swipes'].value;
	var location = document.forms['addEntryForm'].elements['location'].value;
	var start_time = document.forms['addEntryForm'].elements['start_time'].value;
	var end_time = document.forms['addEntryForm'].elements['end_time'].value;

	//check if phone number is valid
	if(!(/^\d+$/.test(phone_number)) || phone_number.length != 10){
		var errspace = document.getElementById("errorMessage");
		errspace.innerHTML = "Please enter a valid 10-digit phone number.";
		$('#errorModal').modal('show');
		return;
	}

	//check if dates are valid
	if(Date.parse('01/01/2000 ' + start_time) >= Date.parse('01/01/2000 '+ end_time)){
		var errspace = document.getElementById("errorMessage"); 
		errspace.innerHTML = "Please make sure that the start time is before the end time.";
		$('#errorModal').modal('show');
		return;
	}

	//add entry into the database and call add_entry in app.py
    $.ajax({
        type: "POST",
        url: "/add_entry",
        async: false,
        data: { name: name, phone_number:phone_number, num_swipes:num_swipes, location:location, start_time:start_time, end_time:end_time}
	});

    $('#addEntryModal').modal('hide');

    document.location.reload(true);
});