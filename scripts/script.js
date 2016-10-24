//empty object to store API data

var knitApp = {};

//This is to get pattern information 
knitApp.getPatterns = function(object){
	// console.log(object);
	$.ajax({
		url: 'proxy.php',
		method: 'GET',
		dataType: 'json',
		data: {
			url: 'https://api.ravelry.com/patterns/search.json',
			queryData: {
				craft: 'knitting',
				weight: object.weight,
				yardage: object.yardage,
				pattern: object.pattern,
				fibertype: object.fibertype,
				fit: object.fit,
				availability: 'online+ravelry'

			}
		}
	}) 	.then(function(patternData){
		knitApp.displayPatterns(patternData.patterns);
	});
}; //this is the end of the getPatterns function (with ajax)

knitApp.displayPatterns = function(patterns){
	$('.outputItems').empty();
	console.log('inside displayPatterns: ', patterns);
	knitApp.patterns = patterns;
	
	//looping through patterns to display 3 random patterns
	for(var i = 0; i < 3; i++){

		var randomItem = randomPattern(patterns);

		//using jQuery, create a div to act as a container for each pattern
		var $patternContainer = $('<div>').addClass('item');

		var $title = $('<h2>').text(randomItem.name);
		
		var $designer = $('<p>').text(`by ${randomItem.designer.name}`);
		
		var $divimage = $('<div>').addClass('divImage');
		
		var $image = $('<img>').attr({
			src: randomItem.first_photo.medium_url,
			alt: randomItem.name
		});

		var $view = $('<p>').html(`<a href="http://www.ravelry.com/patterns/library/${randomItem.permalink}" target="_blank"> View Pattern on Ravelry </a>`);

		$divimage.append($image);

		$patternContainer.append($divimage, $title, $designer, $view);
		$('.outputItems').append($patternContainer);
		
	}; //end for loop

//if statements for selected form userIndicated section
	if(knitApp.selectedForm === 'yarnHome'){
		if(knitApp.yarnHomeObj.weight === ''){
			 knitApp.yarnHomeObj.weight = 'any';
		}
		console.log(knitApp.yarnHomeObj);
		$('.userIndicated').append(`<li><span style='color:#91C7B1; text-transform: uppercase'> Pattern Type:</span> ${knitApp.yarnHomeObj.pattern} </li>
			<li><span style='color:#91C7B1; text-transform: uppercase'>Yarn Weight:</span> ${knitApp.yarnHomeObj.weight} </li>
			<li><span style='color:#91C7B1; text-transform: uppercase'>Fiber Type:</span> ${knitApp.yarnHomeObj.fibertype} </li>
			<li><span style='color:#91C7B1; text-transform: uppercase'>Yardage:</span> ${knitApp.yarnHomeObj.yardage} yards </li>`)


		
	} if(knitApp.selectedForm === 'yarnClothing'){
		if(knitApp.yarnClothingObj.weight === ''){
			knitApp.yarnClothingObj.weight = 'any';
		}
		$('.userIndicated').append(`<li><span style='color:#91C7B1; text-transform: uppercase'> Pattern Type:</span> ${knitApp.yarnClothingObj.pattern} </li>
			<li><span style='color:#91C7B1; text-transform: uppercase'>Age & Gender:</span> ${knitApp.yarnClothingObj.fit} </li>
			<li><span style='color:#91C7B1; text-transform: uppercase'>Yarn Weight:</span> ${knitApp.yarnClothingObj.weight} </li>
			<li><span style='color:#91C7B1; text-transform: uppercase'>Fiber Type:</span> ${knitApp.yarnClothingObj.fibertype} </li>
			<li><span style='color:#91C7B1; text-transform: uppercase'>Yardage:</span> ${knitApp.yarnClothingObj.yardage} yards </li>`)

	} if(knitApp.selectedForm === 'patternHome'){
		if(knitApp.patternHomeObj.weight === ''){
			knitApp.patternHomeObj.weight = 'any';
		}
		$('.userIndicated').append(`<li><span style='color:#91C7B1; text-transform: uppercase'> Pattern Type:</span> ${knitApp.patternHomeObj.pattern} 
			<li><span style='color:#91C7B1; text-transform: uppercase'>Yarn Weight:</span> ${knitApp.patternHomeObj.weight} 
			<li><span style='color:#91C7B1; text-transform: uppercase'>Fiber Type:</span> ${knitApp.patternHomeObj.fibertype}`)

	} if(knitApp.selectedForm === 'patternClothing'){
		if(knitApp.patternClothingObj.weight === ''){
			knitApp.patternClothingObj.weight = 'any';
		}
		$('.userIndicated').append(`<li><span style='color:#91C7B1; text-transform: uppercase'> Pattern Type:</span> ${knitApp.patternClothingObj.pattern} 
			<li><span style='color:#91C7B1; text-transform: uppercase'>Age & Gender:</span> ${knitApp.patternClothingObj.fit}
			<li><span style='color:#91C7B1; text-transform: uppercase'>Yarn Weight:</span> ${knitApp.patternClothingObj.weight} 
			<li><span style='color:#91C7B1; text-transform: uppercase'>Fiber Type:</span> ${knitApp.patternClothingObj.fibertype}`)
	}

}; // this is the end of the display patterns function


//function to grab random patterns
var randomPattern = function(arr) {
	var rando = Math.floor(Math.random() * arr.length);
	return arr[rando]
}; //end random function

//User selects from one of two search types (searchType function)
$('input[name=searchType]').on('click', function(){

	knitApp.searchType = $('input[name=searchType]:checked').val();

//Based on option user selects
		$('#yarnInputHome').hide();
		$('#yarnInputClothing').hide();
		$('#patternInputHome').hide();
		$('#patternInputClothing').hide();
		$('.submit').hide();

		$('.patternTypeFilter').fadeIn();
		setTimeout(function(){
			window.location.href='#patternTypeFilter';
		}, 
				50);

		displayUserInput();

}); //searchType function ends 

//start of .wrapper on click function (user picks one of two pattern types)
$('.wrapper').on('click', 'input[name=patternType]', function(){

	knitApp.patternType = $('input[name=patternType]:checked').val();

	$('.inputSection').show();
	
	setTimeout(function(){
		window.location.href='#inputSection';
	}, 
			30);
	
	$('#yarnInputHome').hide();
	$('#yarnInputClothing').hide();
	$('#patternInputHome').hide();
	$('#patternInputClothing').hide();
	$('.submit').hide();

	displayUserInput();

}); //end of .wrapper on click function

//function that stores if statements for making user input sections appear
function displayUserInput(){
	//User input section appears on page - yarn & home
	if(knitApp.searchType === 'yarn' && knitApp.patternType === 'home') {
		$('#yarnInputHome').fadeIn();
		$('.submit').fadeIn();

//User input section appears on page - yarn & clothing
	} if(knitApp.searchType === 'yarn' && knitApp.patternType === 'clothing'){
		$('#yarnInputClothing').fadeIn();
		$('.submit').fadeIn();

//User input section appears on page - pattern & home
	} if(knitApp.searchType === 'pattern' && knitApp.patternType === 'home'){
		$('#patternInputHome').fadeIn();
		$('.submit').fadeIn();

//User input section appears on page - pattern & clothing 
	} if(knitApp.searchType === 'pattern' && knitApp.patternType === 'clothing'){
		$('#patternInputClothing').fadeIn();
		$('.submit').fadeIn();
	}
}; //end of displayUserInput function




//User starts typing answer & drop down auto-complete options appear

	//page clear


//After user finishes inputting in all inputs
//User clicks "What Should I knit?" button 

knitApp.mrsubmit = function() {

//yarnInputHome submit function starts
$('#yarnInputHome').on('submit', function(e){
	e.preventDefault();
	$('.outputSection').show();

	//storing the variables from the yarn input home section
		var yardageHome = $('#yardageHome').val();
		var yarnWeightHome = $('#yarnWeightHome').val();
		var yarnFiberHome = $('#yarnFiberHome').val();
		var yarnPatternCategoryHome = $('#yarnPatternCategoryHome').val();

		if(yarnWeightHome === 'any'){
			var yarnWeightHome = '';
		}

		knitApp.yarnHomeObj = {
			pattern: yarnPatternCategoryHome,
			weight: yarnWeightHome,
			fibertype: yarnFiberHome,
			fit: '',
			yardage: yardageHome
		}
		knitApp.selectedForm = 'yarnHome';
		knitApp.getPatterns(knitApp.yarnHomeObj);

			// REMOVE FIELDSET AND FADE IN OUTPUT. (removing fieldset is to prevent users from clicking multiple submits)
			$('fieldset').fadeOut();
			$('.searchTypeFilter').fadeOut();
			$('.patternTypeFilter').fadeOut();
			$('.inputSection').fadeOut();
			$('header').fadeOut();
			$('.outputSection').show();
					setTimeout(function(){
			window.scrollTo(0, 0);
		},
			30);

}); //yarnInputHome submit function ends


//yarnInputClothing submit function starts
$('#yarnInputClothing').on('submit', function(e){
	e.preventDefault();
	$('.outputSection').show();

	//storing the variables from the yarn input clothing section
		var yardageClothing = $('#yardageClothing').val();
		var yarnWeightClothing = $('#yarnWeightClothing').val();
		var yarnFiberClothing = $('#yarnFiberClothing').val();
		var yarnPatternCategoryClothing = $('#yarnPatternCategoryClothing').val();
		var yarnGender = $('#yarnGender').val();
		var yarnSelectAge = $('#yarnSelectAge').val();

		if(yarnWeightClothing === 'any'){
			var yarnWeightClothing = '';
		}

		knitApp.yarnClothingObj = {
			pattern: yarnPatternCategoryClothing,
			weight: yarnWeightClothing,
			fibertype: yarnFiberClothing,
			fit: yarnSelectAge + '+' + yarnGender,
			yardage: yardageClothing
		}

		knitApp.selectedForm = 'yarnClothing';
		knitApp.getPatterns(knitApp.yarnClothingObj);

			// REMOVE FIELDSET AND FADE IN OUTPUT. (removing fieldset is to prevent users from clicking multiple submits)
			$('fieldset').fadeOut();
			$('.searchTypeFilter').fadeOut();
			$('.patternTypeFilter').fadeOut();
			$('.inputSection').fadeOut();
			$('header').fadeOut();
			$('.outputSection').show();
					setTimeout(function(){
			window.scrollTo(0, 0);
		},
			30);

}); //yarnInputClothing submit function ends


//patternInputHome submit function starts
$('#patternInputHome').on('submit', function(e){
	e.preventDefault();
	$('.outputSection').show();

//storing the variables from the pattern input home section
	var patternCategoryHome = $('#patternCategoryHome').val();
	var patternYarnWeightHome = $('#patternYarnWeightHome').val();
	var patternFiberHome = $('#fiberHome').val();

	if(patternYarnWeightHome === 'any'){
			var patternYarnWeightHome = '';
		}

	knitApp.patternHomeObj = {
		pattern: patternCategoryHome,
		weight: patternYarnWeightHome,
		fibertype: patternFiberHome,
		fit: '',
		yardage: ''
	}
	knitApp.selectedForm = 'patternHome';
	knitApp.getPatterns(knitApp.patternHomeObj);

		// REMOVE FIELDSET AND FADE IN OUTPUT. (removing fieldset is to prevent users from clicking multiple submits)
		$('fieldset').fadeOut();
		$('.searchTypeFilter').fadeOut();
		$('.patternTypeFilter').fadeOut();
		$('.inputSection').fadeOut();
		$('header').fadeOut();
		$('.outputSection').show();
				setTimeout(function(){
		window.scrollTo(0, 0);
	},
		30);
}); //patternInputHome submit function ends


//patternInputClothing submit function starts
$('#patternInputClothing').on('submit', function(e){
	e.preventDefault();
	$('.outputSection').show();

//storing the variables from the pattern input clothing section
	var patternCategoryClothing = $('#patternCategoryClothing').val();
	var selectGenderClothing = $('#selectGenderClothing').val();
	var selectAgeClothing = $('#selectAgeClothing').val();
	var patternYarnWeightClothing = $('#patternYarnWeightClothing').val();
	var fiberClothing = $('#fiberClothing').val();

	if(patternYarnWeightClothing === 'any'){
			var patternYarnWeightClothing = '';
		}

	knitApp.patternClothingObj = {
		pattern: patternCategoryClothing,
		weight: patternYarnWeightClothing,
		fibertype: fiberClothing,
		fit: selectAgeClothing + '+' + selectGenderClothing,
		yardage: ''
	}
	knitApp.selectedForm = 'patternClothing';
	knitApp.getPatterns(knitApp.patternClothingObj);

		// REMOVE FIELDSET AND FADE IN OUTPUT. (removing fieldset is to prevent users from clicking multiple submits)
		$('fieldset').fadeOut();
		$('.searchTypeFilter').fadeOut();
		$('.patternTypeFilter').fadeOut();
		$('.inputSection').fadeOut();
		$('header').fadeOut();
		$('.outputSection').show();
				setTimeout(function(){
		window.scrollTo(0, 0);
	},
		30);

}); //patternInputClothing submit function ends

}; //mrsubmit function ends

// Page displays list of user input conditions - "you indicated you wanted a pattern that meets the following criteria:" with [go back and change criteria] button

//start "give me 3 new patterns function" (randomly generated)
knitApp.outputButtons = function(){
	$('.threeNew').on('click', function(e){
		e.preventDefault();
		$('.outputItems').empty();
		$('.userIndicated').empty();
		knitApp.displayPatterns(knitApp.patterns)
			setTimeout(function(){
		window.location.href='#outputItems';
	}, 
			30);
	});
};

		//append <li>'s to ul .userIndicated to list out what user indicated
	// 3 randomly generated (based on input answers) patterns appear 
	//underneath 3 pattern section, three button options:
	

knitApp.init = function(){ //init function, stores getPatterns function
	knitApp.mrsubmit();
	knitApp.outputButtons();

}; //init function ends

//this is the doc ready, calls the init function
$(function(){
	knitApp.init();
});

// //selectize Function
// $('#yarnWeightClothing').selectize({
// 	create: true,
// 	sortField: 'text'
// });

//smooth scroll
$('a').smoothScroll({
		offset: 0,
		speed: 250
});
