$(document).ready(function() {
	// table initial

	$("#error").hide();
	$(".xBtn").on('click', function(){
		var currentRow=$(this).closest("tr");
		var col1 = currentRow.find("td:eq(1)").html();
		alert(col1);
	});

	// $(".xBtn").on('click',function(){
	// 	 var currentRow=$(this).closest("tr");
	// 	 var col1=currentRow.find("td:eq(0)").html();
	// 	 var col2=currentRow.find("td:eq(1)").html();
	// 	 var col3=currentRow.find("td:eq(2)").html();
	// 	 // var data=col1+"\n"+col2+"\n"+col3;
	// 	 alert(col1);
	// });

    var query = firebase.database().ref("units");
    query.once("value")
        .then(function(snapshot) {
            snapshot.forEach(function(snap) {
                var material = snap.child("material").val();
                var quantity = snap.child("quantity").val();
                var price = snap.child("price").val();
                $("#table_body").append("<tr><td class='mdl-data-table__cell--non-numeric'>" + material + "</td><td>" + quantity + "</td><td>" + price + "</td><td><i class='xBtn material-icons'>highlight_off</i></td></tr>");
            });

        });


     // div Add clicked
    $("#Add").click(function() {
        // number of units
        
        if ($("#material").val() !="" && Number.isInteger(parseFloat($("#quantity").val())) && Number.isInteger(parseFloat($("#price").val())))
        {
        	generate();
        	$("#quantity").val("");
        	$("#price").val("");
        	$("#material").val("");
        	$("#error").hide();
        }
        else {
        	$("#error").show();
        }
    });







   	function generate(){

        var num = 1;
        var ref = firebase.database().ref("units");
        ref.once("value")
            .then(function(snapshot) {
                num = snapshot.numChildren() + 1; //
                var material = $("#material").val();
                var quantity = $("#quantity").val();
                var price = $("#price").val();
                //input data
                firebase.database().ref('units/' + num).set({
                    material: material,
                    quantity: quantity,
                    price: price
                });
            });

        // add table
        $("#table_body").append("<tr><td class='mdl-data-table__cell--non-numeric'>" + $("#material").val() + "</td><td>" + $("#quantity").val() + "</td><td>" + $("#price").val() + "</td><td><i class='xBtn material-icons'>highlight_off</i></td></tr>");
   	}

});


