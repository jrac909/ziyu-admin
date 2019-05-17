function MyDate(olddate){
	var datearr = olddate.split("T");
	var ymd = datearr[0];
	var time = datearr[1].split(".").get(0);

	return ymd+"  "+time;
}