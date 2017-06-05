function year(){
	var year=2017;
	var currYear=new Date().getFullYear();
	
	if(year==currYear)
		return year;
	else if(year < currYear)
		return year+'-'+currYear;
	else
		return currYear+'-'+year;
}

$(document).ready(function(){	
	$('#cr-year').text(year());
});