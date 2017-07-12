$(document).ready(function() {
	// options = {
	// delimiter: config.delimiter,
	// separator: config.separator,
	// onPreParse: options.onPreParse,
	// onParseEntry: options.onParseEntry,
	// onParseValue: options.onParseValue,
	// onPostParse: options.onPostParse,
	// start: options.start,
	// end: options.end,
	// state: {
	  // rowNum: 1,
	  // colNum: 1
		// }
	// };
	
	$.ajax({
	type: "GET",
	url: "nia_structures_famille_utf8.csv",
	dataType: "text",
		success: function(input) {
		var options = {
			start: 2 //ne prend pas en compte les entetes
		};
		var data = $.csv.toArrays(input, options);
		generateFamilles(data);
		}
	});
	
	$.ajax({
	type: "GET",
	url: "nia_structures_structure_utf8.csv",
	dataType: "text",
	success: function(input) {
		var options = {
			separator:';',
			start: 2 //ne prend pas en compte les entetes
		};
		var data = $.csv.toArrays(input, options);
		generateStructures(data);
	}
	});
	
	$.ajax({
	type: "GET",
	url: "chant1_media_utf8.prn",
	dataType: "text",
	success: function(input) {
		var options = {
			separator:' ',
			start: 2 //ne prend pas en compte les entetes
		};
		var data = $.csv.toArrays(input, options);
		generateMedias(data);
	}
	});
});

function generateFamilles(data) {
	$(document.body).empty();
	var html = '<ul>';
	for(var row in data) {
		html += '<li>' + data[row][1] + '</li>\r\n<ul id="famille' + data[row][0] + '"></ul>';
	}
	html += '</ul>';
	$(document.body).html(html);
}

function generateStructures(data) {
	for(var row in data) {
		$('#famille' + data[row][1]).append( '<li><input type="checkbox">' + data[row][2] + '</li>\r\n');
		// //si el id_parent está vacío, se agrega a su familia. 
		// if(data[row][3] =='') {
			// $('#famille' + data[row][1]).append( '<li>' + data[row][2] + '</li>\r\n<ul id="structure' + data[row][0] + '"></ul>');
		// }
		// else //sino se agrega al id_parent
		// {
			// $('#structure' + data[row][3]).append( '<li>' + data[row][2] + '</li>\r\n<ul id="structure' + data[row][0] + '"></ul>');
		// }
	}
}

function generateMedias(data) {
	var html = '<p> ';
	var ligne = 0;
	for(var row in data) {
		if(data[row][4] < 1000) {
			if(data[row][3] == ligne) {
				html += data[row][1] + ' ';
			}
			else
			{
				html += '<br/>' + data[row][1] + ' ';
				ligne = data[row][3];
			}
		}	
		else
		{//traitement des images
		}
	}
	$(document.body).append(html + '</p>');
}

