
$(function() {

	var invalidElements = ['LABEL', 'SELECT', 'OPTION', 'TEXTAREA', 'FORM'];


	$('#btnSubmit').on("click", function(){

		var htmlInput = $('#htmlText').val();
		$('#output').html(htmlInput);

			var currentClass = '',
				elementHeader = '',
				id='',
				elementType = '',
				data = [];

		$('#output *' ).each(function() {

				var currentElement = $(this);

				currentClass = '';
				id = '';
				elementHeader = '<div class="elementHeader-wrapper">';
				elementType = '';

				currentClass = $(this).attr('class');
				id = $(this).attr('id');
				elementType = $(this).prop('tagName');

			

			//$(this).removeClass(currentClass);
			$(this).addClass('highlighter inactive '+elementType);			
			$(this).contents().filter(function(){ return this.nodeType == 3; }).remove();

			if(elementType){
				elementHeader +="<span class='label element-type' title="+elementType+">"+elementType+"</span>";
			}


			if(id){
				elementHeader +="<span class='label id' title="+id+">#"+id+"</span>";
			}
			
			if(currentClass){
				data = [];
				data = currentClass.split(' ');
				
				$.each(data, function(index, value){
					if(value){
						elementHeader += "<span class='label' title="+value+">."+value+"</span>";
					}
				});
			}else{
				elementHeader +="<span class='label'>- No Class -</span>";
			}

			elementHeader += "</div>";

			$(this).prepend(elementHeader);


			$.each(invalidElements, function(index, value){
				if(elementType==value){
					currentElement.replaceWith(function(){
						return $("<div class='highlighter "+value+"' />").append($(this).contents());
					});

				}
			});

			if(elementType=="BR"){
				$(this).remove();
			}

			if(elementType=="IMG"){
				currentElement.replaceWith(function(){
						return $("<div class='highlighter image'>Image</div>").append($(this).contents());
					});
			}

			if(elementType=="INPUT"){
				var inputType = currentElement.attr("type");
				currentElement.replaceWith(function(){
						return $("<div class='highlighter INPUT "+inputType+"'>Input Type - "+inputType+"</div>").append($(this).contents());
					});
			}
		});
	});

	$("#output").on("mouseenter", ".highlighter", function(){
			$(".highlighter").removeClass('active');
			$(this).addClass('active');

		}
		
	);

	$("#output").on("mouseleave", ".highlighter", function(){
			$(".highlighter").removeClass('active');
			$(this).parent(".highlighter").addClass('active');

		}
		
	);
});