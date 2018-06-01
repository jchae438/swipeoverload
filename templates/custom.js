$('#addEntryForm').submit(function(e) {
	e.preventDefault();
	alert("I am an alert box!");
	/*
    var form = new FormData(document.getElementById('#addEntryForm'));
	
	var phone_number = form.get("phone_number");
	var start_time = form.get("start_time");
	var end_time = form.get("end_time");
	var errorMessage;

	if(phone_number.match(/^[0-9]+$/) != null || phone_number.length != 10){
		document.getElementById("errorMessage").innerHTML = "Please enter a valid 10-digit phone number.";
		$('#errorModal').modal('show');
	}

	if(Date.parse('01/01/2000 ' + end_time) > Date.parse('01/01/2000 '+ start_time)){
		document.getElementById("errorMessage").innerHTML = "Please make sure that the start time is before the end time.";
		$('#errorModal').modal('show');
	}    
	*/
});
