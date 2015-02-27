	
			
			
			$(function(){
							
				$("#widget").append('<div id ="toolbar"><button id ="hide"> Show/Hide </button>	<button id ="refresh"> Refresh </button></div><div id="content"><div id = "wid_head"></div><div id = "wid_cond"></div><div id = "wid_temp"></div></div>');
				
		
				$("#widget").offset({top:0, left:0});
				
				// JQuery-UI function to set the div as draggable
				$( "#widget" ).draggable({ opacity: 0.70 });

				//  jQuery ajax function to retrieve json data
				$.ajax({
					dataType: "json",
					url: "http://api.openweathermap.org/data/2.5/weather?q=Vancouver",
					success: function(result) {
					handleSuccess(result);
					}
				});


				//  called when ajax completed successully
				function handleSuccess(result){
					console.log(result);


					$("#wid_head").append(result.name +"<img src=\"http://openweathermap.org/img/w/"+result.weather[0].icon+ ".png\" alt=icon/>");
					//weather is in an array, and description is the first data (0)
					$("#wid_cond").append("Conditions:"+"<br/>" + (result.weather[0].description) + "<br />");
					$("#wid_temp").append("Current: " + parseInt(result.main.temp - 273.15) + "&#176;C" + "<br />");
					$("#wid_temp").append("Low:" + parseInt(result.main.temp_min - 273.15) + "&#176;C"+"<br />");
					$("#wid_temp").append("High: " + parseInt(result.main.temp_max - 273.15) + "&#176;C");
					$("#wid_cond").append("Humidity: " + result.main.humidity + "%");
				}


				$("#hide").click(function(){
    			$("#content").toggle();	
     			});
  
  
				$("#refresh").click(function(){
					$("#wid_head").empty();
					$("#wid_cond").empty();
					$("#wid_temp").empty();
				
					$.ajax({
					dataType: "json",
					url: "http://api.openweathermap.org/data/2.5/weather?q=Vancouver",
					
				
					success: function(result) {				
					
					handleSuccess(result);

					$('#loading').fadeOut(3000, function() {$(this).remove()});
					
					}					

					});
					$('#content').prepend ('<img id="loading" src="images/loader_small.gif" />');
				
				});
				
			

				//setTimeout('', 5000);
			});



