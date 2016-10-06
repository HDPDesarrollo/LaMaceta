var ContactUs = function () {

    return {
        //main function to initiate the module
        init: function () {
			var map;
			$(document).ready(function(){
			  map = new GMaps({
				div: '#map',
	            lat: -34.760497,
				lng: -58.398348,
			  });
			   var marker = map.addMarker({
		            lat: -34.760497,
					lng: -58.398348,
		            title: 'La Maceta',
		            infoWindow: {
		                content: "<b>La Maceta.</b> Carlos Pellegrini 44, Lomas de Zamora, Buenos Aires"
		            }
		        });

			   marker.infoWindow.open(map, marker);
			});
        }
    };

}();