$('#addEntryForm').submit(function(e) {
	e.preventDefault();

	var name = document.forms['addEntryForm'].elements['name'].value;
	var phone_number = document.forms['addEntryForm'].elements['phone_number'].value;
	var num_swipes = document.forms['addEntryForm'].elements['num_swipes'].value;
	var location = document.forms['addEntryForm'].elements['location'].value;
	var start_date = document.forms['addEntryForm'].elements['start_date'].value;
	var start_time = document.forms['addEntryForm'].elements['start_time'].value;
	var end_date = document.forms['addEntryForm'].elements['end_date'].value;
	var end_time = document.forms['addEntryForm'].elements['end_time'].value;

	//check if phone number is valid
	if(!(/^\d+$/.test(phone_number)) || phone_number.length != 10){
		var errspace = document.getElementById("errorMessage");
		errspace.innerHTML = "Please enter a valid 10-digit phone number.";
		$('#errorModal').modal('show');
		return;
	}

	//check that start time is after current time
	offset = -4.0
    local_time = new Date();
    utc = local_time.getTime() + (local_time.getTimezoneOffset() * 60000);
    curr_time = new Date(utc + (3600000*offset));

	if(Date.parse(start_date + " " + start_time) < curr_time){
		var errspace = document.getElementById("errorMessage"); 
		errspace.innerHTML = "Please make sure that the start date/time is after the current date/time.";
		$('#errorModal').modal('show');
		return;
	}

	//check if start and end datetimes are not conflicting
	if(Date.parse(start_date + " " + start_time) >= Date.parse(end_date + " " + end_time)){
		var errspace = document.getElementById("errorMessage"); 
		errspace.innerHTML = "Please make sure that the start date/time is before the end date/time.";
		$('#errorModal').modal('show');
		return;
	}

    $.ajax({
        type: "POST",
        url: "/add_entry",
        async: false,
        data: { name: name, phone_number:phone_number, num_swipes:num_swipes, location:location, start_date:start_date, start_time:start_time, end_date:end_date, end_time:end_time}
	});

    $('#addEntryModal').modal('hide');

    document.location.reload(true);
	});