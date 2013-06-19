
$(function() {

	var invalidElements = ['LABEL', 'SELECT', 'OPTION', 'TEXTAREA', 'FORM', 'A'];


	$('#btnSubmit').on("click", function(){

		$('#btnNew').show();
		$('#elementHighlight').show();
		$('#output').show();
		
		$('#inputArea').hide();



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
				elementHeader = '<div class="hv-elementHeader-wrapper">';
				elementType = '';

				currentClass = $(this).attr('class');
				id = $(this).attr('id');
				elementType = $(this).prop('tagName');

			

			//$(this).removeClass(currentClass);
			$(this).addClass('hv-highlighter hv-inactive '+elementType);			
			$(this).contents().filter(function(){ return this.nodeType == 3; }).remove();

			if(elementType){
				elementHeader +="<span class='hv-label element-type' title="+elementType+">"+elementType+"</span>";
			}


			if(id){
				elementHeader +="<span class='hv-label id' title="+id+">#"+id+"</span>";
			}
			
			if(currentClass){
				data = [];
				data = currentClass.split(' ');
				
				$.each(data, function(index, value){
					if(value){
						elementHeader += "<span class='hv-label' title="+value+">."+value+"</span>";
					}
				});
			}else{
				elementHeader +="<span class='hv-label'>- No Class -</span>";
			}

			elementHeader += "</div>";

			$(this).prepend(elementHeader);


			$.each(invalidElements, function(index, value){
				if(elementType==value){
					currentElement.replaceWith(function(){
						return $("<div data-elementtype='"+elementType+"' class='hv-highlighter hv-inactive "+value+"' />").append($(this).contents());
					});
				}
			});

			if(elementType=="BR"){
				$(this).remove();
			}

			if(elementType=="IMG"){
				currentElement.replaceWith(function(){
						return $("<div class='hv-highlighter image'>Image</div>").append($(this).contents());
					});
			}

			if(elementType=="INPUT"){
				var inputType = currentElement.attr("type");
				currentElement.replaceWith(function(){
						return $("<div class='hv-highlighter INPUT "+inputType +" "+ currentClass +"'>Input Type - "+inputType+"</div>").append($(this).contents());
					});
			}
		});
	});

	$("#output").on("mouseenter", ".hv-highlighter", function(){
			$(".hv-highlighter").removeClass('hv-active');
			$(this).addClass('hv-active');

		}
		
	);

	$("#output").on("mouseleave", ".hv-highlighter", function(){
			$(".hv-highlighter").removeClass('hv-active');
			$(this).parent(".hv-highlighter").addClass('hv-active');

		}
		
	);

	$('#elementHighlight').on("keyup", function(){

		var elementSelector = $('#elementHighlight').val();
		//var output = elementSelector.match(/label|span|a|select|option|textarea|form|input/gm);
		
		console.log(elementSelector);
		
		$(".hv-highlighter").removeClass('hv-highlighted');
		$(elementSelector).addClass("hv-highlighted");
	});


	$('#btnNew').on("click", function(){

		$('#btnNew').hide();
		$('#elementHighlight').hide();
		$('#output').hide();
		
		$('#inputArea').show();
	});

});