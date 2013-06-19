
$(function() {

	var invalidElements = ['LABEL', 'SELECT', 'OPTION', 'TEXTAREA', 'FORM', 'A', 'LEGEND', 'BUTTON'];


	$('#btnSubmit').on("click", function(){

		$('#outputBar').show();
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

			$(this).addClass('hv-highlighter hv-inactive '+elementType);		
			$(this).contents().filter(function(){ return this.nodeType == 3; }).remove();

			if(elementType){
				elementHeader +="<span class='hv-label element-type' title="+elementType+">"+elementType+"</span>";
			}


			if(id){
				$(this).attr('id', id);
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
						if(id){
							return $("<div id="+id+" data-elementtype='"+elementType+"' class='hv-highlighter hv-inactive "+value+" "+currentClass+ "' />").append($(this).contents());
						}else{
							return $("<div data-elementtype='"+elementType+"' class='hv-highlighter hv-inactive "+value+" "+currentClass+ "' />").append($(this).contents());
						}
					});
				}
			});

			if(elementType=="BR"){
				$(this).remove();
			}

			if(elementType=="IMG"){
				currentElement.replaceWith(function(){
					if(id){
						return $("<div id="+id+" data-elementtype='IMG' class='hv-highlighter image "+currentClass+"'>Image</div>").append($(this).contents());
					}else{
						return $("<div data-elementtype='IMG' class='hv-highlighter image "+currentClass+"'>Image</div>").append($(this).contents());
					}
				});
			}

			if(elementType=="INPUT"){
				var inputType = currentElement.attr("type");
				currentElement.replaceWith(function(){
					if(id){
						return $("<div id="+id+" data-elementtype='INPUT' class='hv-highlighter INPUT "+inputType +" "+ currentClass +"'>Input Type - "+inputType+"</div>").append($(this).contents());
					}else{
						return $("<div data-elementtype='INPUT' class='hv-highlighter INPUT "+inputType +" "+ currentClass +"'>Input Type - "+inputType+"</div>").append($(this).contents());
					}
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
		$(".hv-highlighter").removeClass('hv-highlighted');

		var elementSelector = $('#elementHighlight').val();

		var inputString = elementSelector,
			newString = elementSelector;

			var invalidEntries = inputString.match(/\blabel\b|\ba\b|\blegend\b|\bbutton\b|\bimg\b|\bselect\b|\boption\b|\btextarea\b|\bform\b|\binput\b/gm);
			
			if (invalidEntries) {
				var len = invalidEntries.length;
				for(i=0;i<len;i++){
				  var old = invalidEntries[i];
				  var newVal = "div[data-elementtype="+old.toUpperCase()+"]";
				  var exp = "\b"+old+"\b";
				  var newExp = RegExp("\\b(" + old + ")", "gi");
				  newString = newString.replace(newExp,newVal);  
				}
			}
			console.log(newString);
		
		
		
		$(newString).addClass("hv-highlighted");
	});


	$('#btnNew').on("click", function(){

		$('#outputBar').hide();
		$('#output').hide();
		
		$('#inputArea').show();
	});

});