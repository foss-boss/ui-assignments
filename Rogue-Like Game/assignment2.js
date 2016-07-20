// Constants
var FPS = 30;
var BUTTON_WIDTH = 300;
var BUTTON_HEIGHT = 50;
var BUTTON_OFFSET = 15;
var BUTTON_TEXT_X_OFFSET = BUTTON_WIDTH/2;
var BUTTON_TEXT_Y_OFFSET = 35;
var BUTTON_SELECTION_INDICATOR_OFFSET = 30;

// Canvas setup
var _canvas = document.getElementById("_canvas");
_canvas.width = 1280;
_canvas.height = 800;
var _ctx = _canvas.getContext("2d");

//Audio
var navigation = new Audio('navigation.mp3');
var enter = new Audio('enter.mp3');

// Content
var uiElementTypes = { buttons:0, simpleText:1 };
var screenEnum = { main:0, options:1, credits:2, cutscene:3, game:4, pause:5, gameplay:6, controls:7, video:8, audio:9, highscores:10, 					 gameover:11, none:99 };

var screenNames = { main:"MAIN MENU", options:"OPTIONS", credits:"CREDITS", cutscene:"NEW GAME", game: "GAMEPLAY", pause: "PAUSE MENU", 				   gameplay:"GAMEPLAY OPTIONS", controls:"CONTROLS", video:"VIDEO", audio:"AUDIO", highscores:"HIGHSCORES", gameover:					 "YOU LOST! SORRY."};

var mainMenuButtons = [	{str:"JAYCE IN SPACE", targetScreen:screenEnum.none, elementType:uiElementTypes.simpleText},
						{str:screenNames.cutscene, targetScreen:screenEnum.cutscene, elementType:uiElementTypes.buttons},
						{str:"CONTINUE", targetScreen:screenEnum.cutscene, elementType:uiElementTypes.buttons },
						{str:screenNames.highscores, targetScreen:screenEnum.highscores, elementType:uiElementTypes.buttons },
						{str:screenNames.options, targetScreen:screenEnum.options, elementType:uiElementTypes.buttons },
						{str:screenNames.credits, targetScreen:screenEnum.credits, elementType:uiElementTypes.buttons}
						];
						
var optionsElements = [	{str:"GAMEPLAY", targetScreen:screenEnum.gameplay, elementType:uiElementTypes.buttons},
						{str:"CONTROLS", targetScreen:screenEnum.controls, elementType:uiElementTypes.buttons},
						{str:"VIDEO", targetScreen:screenEnum.video, elementType:uiElementTypes.buttons},
						{str:"AUDIO", targetScreen:screenEnum.audio, elementType:uiElementTypes.buttons},
						{str:"<------", targetScreen:screenEnum.main, elementType:uiElementTypes.buttons}
						];	

var creditsElements = [ {str:"PRODUCER ...", targetScreen:screenEnum.none, elementType:uiElementTypes.simpleText},
						{str:"UI PROGRAMMER ...", targetScreen:screenEnum.none, elementType:uiElementTypes.simpleText},
						{str:"<------", targetScreen:screenEnum.main, elementType:uiElementTypes.buttons} 
						];

var cutsceneElements = [ {str:"Cutscene Video", targetScreen:screenEnum.none, elementType:uiElementTypes.simpleText},
						 {str:"Enter to skip...", targetScreen:screenEnum.game, elementType:uiElementTypes.buttons} 
						];	
						
var gameElements = [ {str:"Game HUD goes in this area.", targetScreen:screenEnum.none, elementType:uiElementTypes.simpleText},
						{str:"PAUSE MENU", targetScreen:screenEnum.pause, elementType:uiElementTypes.buttons},
						{str:"GAME WON", targetScreen:screenEnum.none, elementType:uiElementTypes.buttons},
						{str:"GAME OVER", targetScreen:screenEnum.none}
						];	

var pauseElements = [ 	{str:"RESUME", targetScreen:screenEnum.game, elementType:uiElementTypes.buttons},
						{str:"JOURNAL", targetScreen:screenEnum.journal, elementType:uiElementTypes.buttons},
						{str:"OPTIONS", targetScreen:screenEnum.options, elementType:uiElementTypes.buttons}, 
						{str:"RETURN TO MAIN MENU", targetScreen:screenEnum.main, elementType:uiElementTypes.buttons},
						{str:"QUIT", targetScreen:screenEnum.none, elementType:uiElementTypes.buttons}
						];	
			
var gameplayElements = 	[   {str:"LANGUAGE", targetScreen:screenEnum.none, elementType:uiElementTypes.buttons},
							{str:"TEXT SPEED", targetScreen:screenEnum.none, elementType:uiElementTypes.buttons},
							{str:"CREDITS", targetScreen:screenEnum.credits, elementType:uiElementTypes.buttons},
							{str:"TIME OFF/ON", targetScreen:screenEnum.none, elementType:uiElementTypes.buttons},
							{str:"COLOURBLIND MODE", targetScreen:screenEnum.none, elementType:uiElementTypes.buttons},
							{str:"CHANGE CURSOR", targetScreen:screenEnum.none, elementType:uiElementTypes.buttons},
							{str:"CONFIRM", targetScreen:screenEnum.none, elementType:uiElementTypes.buttons},
							{str:"RESET TO DEFAULTS", targetScreen:screenEnum.none, elementType:uiElementTypes.buttons},
							{str:"<------", targetScreen:screenEnum.options, elementType:uiElementTypes.buttons}
							];	
						
var controlsElements = 	[   {str:"Move Right: A", targetScreen:screenEnum.none, elementType:uiElementTypes.simpleText},
						{str:"Move Left: D", targetScreen:screenEnum.none, elementType:uiElementTypes.buttons},
						{str:"Move Up: W", targetScreen:screenEnum.none, elementType:uiElementTypes.buttons}, 
						{str:"Move Down/Duck: S", targetScreen:screenEnum.none, elementType:uiElementTypes.buttons},
						{str:"Jump: Space", targetScreen:screenEnum.none, elementType:uiElementTypes.buttons},
						{str:"Action: E", targetScreen:screenEnum.none, elementType:uiElementTypes.buttons},
						{str:"Use Item: Q", targetScreen:screenEnum.none, elementType:uiElementTypes.buttons},
						{str:"Shoot: Left Click", targetScreen:screenEnum.none, elementType:uiElementTypes.buttons},
						{str:"Tab: Display", targetScreen:screenEnum.none, elementType:uiElementTypes.buttons},
						{str:"Go Back/Exit: ESC", targetScreen:screenEnum.none, elementType:uiElementTypes.buttons},
						{str:"(When clicking, the player may redfine a key to their choosing.)", targetScreen:screenEnum.none, elementType:uiElementTypes.simpleText}
						];	
						
var videoElements = [   {str:"Visual Display: Recommended", targetScreen:screenEnum.none, elementType:uiElementTypes.buttons},
						{str:"Resolution: 1920x1080", targetScreen:screenEnum.none, elementType:uiElementTypes.buttons},
						{str:"Fullscreen: On/Off", targetScreen:screenEnum.none, elementType:uiElementTypes.buttons}, 
						{str:"Gamma", targetScreen:screenEnum.none, elementType:uiElementTypes.buttons},
						{str:"Lighting Quality", targetScreen:screenEnum.none, elementType:uiElementTypes.buttons},
						{str:"Shader Quality", targetScreen:screenEnum.none, elementType:uiElementTypes.buttons},
						{str:"Debris Quality", targetScreen:screenEnum.none, elementType:uiElementTypes.buttons}
						];	
						
var audioElements = [   {str:"Music Volume", targetScreen:screenEnum.none, elementType:uiElementTypes.simpleText},
						{str:"SFX Volume", targetScreen:screenEnum.game, elementType:uiElementTypes.buttons},
						{str:"UI Volume", targetScreen:screenEnum.options, elementType:uiElementTypes.buttons}, 
						{str:"Speaker Setup: Speakers Headphones", targetScreen:screenEnum.main, elementType:uiElementTypes.buttons},
						{str:"<------", targetScreen:screenEnum.options, elementType:uiElementTypes.buttons}
						];	
						
var highscoresElements = [	{str:"WORLD", targetScreen:screenEnum.highscores, elementType:uiElementTypes.buttons},
							{str:"REGION", targetScreen:screenEnum.highscores, elementType:uiElementTypes.buttons},
							{str:"FRIENDS", targetScreen:screenEnum.highscores, elementType:uiElementTypes.buttons}, 
							{str:"1. Sergio = 31:04", targetScreen:screenEnum.none, elementType:uiElementTypes.simpleText},
							{str:"2. Mikey = 34:23", targetScreen:screenEnum.none, elementType:uiElementTypes.simpleText},
							{str:"3. Don = 36:44", targetScreen:screenEnum.none, elementType:uiElementTypes.simpleText},
							{str:"4. Raphael = 41:24", targetScreen:screenEnum.none, elementType:uiElementTypes.simpleText},
							{str:"5. Leo = 48:59", targetScreen:screenEnum.none, elementType:uiElementTypes.simpleText},
							{str:"6. Neil = 1:21:42", targetScreen:screenEnum.none, elementType:uiElementTypes.simpleText},
							{str:"7. Josh = 2:00:57", targetScreen:screenEnum.none, elementType:uiElementTypes.simpleText},
							{str:"8. Chris = 2:04:34", targetScreen:screenEnum.none, elementType:uiElementTypes.simpleText},
							{str:"9. Bob = 10:10:10", targetScreen:screenEnum.none, elementType:uiElementTypes.simpleText},
							{str:"<------", targetScreen:screenEnum.options, elementType:uiElementTypes.buttons}
							];
							
var gameoverElements = [ {str:screenNames.gameover, targetScreen:screenEnum.none, elementType:uiElementTypes.simpleText},
					 {str:"RESTART", targetScreen:screenEnum.game, elementType:uiElementTypes.buttons},
					 {str:"QUIT", targetScreen:screenEnum.main, elementType:uiElementTypes.buttons},
					 ];
						
var imgArray = [ {img:null, str:"background1", 	x:0,y:0, w:1280, h:800, over:false},
				 {img:null, str:"background2", 	x:0,y:0, w:1280, h:800, over:false},
				 {img:null, str:"background3", 	x:0,y:0, w:1280, h:800, over:false}
				 ];

var screens = [ {enter:enterMain, update:updateMain, exit:exitMain, str:screenNames.main, content:mainMenuButtons, bgImage:imgArray[0], textColor:"green"},
				{enter:enterOptions, update:updateOptions, exit:exitOptions, str:screenNames.options, content:optionsElements, bgImage:imgArray[1], textColor:"yellow"},
				{enter:enterCredits, update:updateCredits, exit:exitCredits, str:screenNames.credits, content:creditsElements, bgImage:imgArray[2], textColor:"red"},
				{enter:enterCutscene, update:updateCutscene, exit:exitCutscene, str:screenNames.cutscene, content:cutsceneElements, bgImage:imgArray[0], textColor:"cyan"},
				{enter:enterGame, update:updateGame, exit:exitGame, str:screenNames.game, content:gameElements, bgImage:imgArray[0], textColor:"green"},
				{enter:enterPause, update:updatePause, exit:exitPause, str:screenNames.pause, content:pauseElements, bgImage:imgArray[0], textColor:"yellow"},
		 		{enter:enterGameplay, update:updateGameplay, exit:exitGameplay, str:screenNames.gameplay, content:gameplayElements, bgImage:imgArray[0], textColor:"red"},
				{enter:enterControls, update:updateControls, exit:exitControls, str:screenNames.controls, content:controlsElements, bgImage:imgArray[0], textColor:"cyan"},
				{enter:enterVideo, update:updateVideo, exit:exitVideo, str:screenNames.video, content:videoElements, bgImage:imgArray[0], textColor:"green"},
				{enter:enterAudio, update:updateAudio, exit:exitAudio, str:screenNames.audio, content:audioElements, bgImage:imgArray[0], textColor:"orange"},
				{enter:enterHighscores, update:updateHighscores, exit:exitHighscores, str:screenNames.highscores, content:highscoresElements, bgImage:imgArray[0], textColor:"violet"}
				];

var screenStack = [];
var currentScreen;
						
var menuPositionY = 0;
var currentMenuItemSelection = 0;

// Execute init
initGame();

document.onkeyup = function(e)
{ 
	switch(window.event.keyCode){
		case(38): // Up Arrow
			var newValue = currentMenuItemSelection - 1;
			if ( newValue >= 0 && currentScreen.content[newValue].elementType == uiElementTypes.buttons )
			{
				currentMenuItemSelection = newValue;
				navigation.play();
			}
			break;
		case(40): // Down Arrow
			var newValue = currentMenuItemSelection + 1;
			if ( newValue < currentScreen.content.length && currentScreen.content[newValue].elementType == uiElementTypes.buttons )
			{
				currentMenuItemSelection = newValue;
				navigation.play();
			}
			break;
		case(13): // Enter
			activateButton();
			enter.play();
			break;	
		case(103 , 71): //Lowercase and Uppercase G
		if (currentScreen.content[4])
		{
			changeScreenTo(currentScreen.content[currentMenuItemSelection].gameover);
		}
   	}
};



function activateButton()
{
	changeScreenTo(currentScreen.content[currentMenuItemSelection].targetScreen);
}

function initGame()
{
	changeScreenTo(screenEnum.main);
	loadImages();
	
	setInterval(update, 1000/FPS);
	
	window.addEventListener('resize', resizeCanvas, false)
	resizeCanvas();
}

function resizeCanvas() 
{
	_canvas.width = window.innerWidth;
	_canvas.height = window.innerHeight;
}

function update()
{
	currentScreen = screenStack[screenStack.length - 1];
	
	_ctx.clearRect(0,0,_canvas.width,_canvas.height);
	
	_ctx.beginPath();
	_ctx.font = "60px Verdana";
	_ctx.lineWidth=1;
	_ctx.strokeStyle = currentScreen.textColor;
	_ctx.textAlign = "center";
	_ctx.strokeText(currentScreen.str, _canvas.width/2, _canvas.height/4);
	
	menuPositionY = _canvas.height/4 + 60;
	
	currentScreen.update();
}

function displayContent()
{
	var currentContent = currentScreen.content;
	var currentXPos = _canvas.width/2 - 150;
	var currentYPos = menuPositionY;
	
	for (var i=0; i < currentContent.length; i++)
	{
		var textX = currentXPos + BUTTON_TEXT_X_OFFSET;
		var textY = currentYPos + BUTTON_TEXT_Y_OFFSET;
		if ( currentContent[i].str == "<------" ) 
		{
			//draw <------
			// check if its current selection to draw circle
			// draw buttons
			_ctx.beginPath();
			_ctx.strokeStyle = currentScreen.textColor;
			_ctx.rect(currentXPos+400, currentYPos+100, BUTTON_WIDTH, BUTTON_HEIGHT); 
			_ctx.stroke();
			
			// draw button text
			_ctx.beginPath();
			_ctx.font = "25px Verdana";
			_ctx.lineWidth = 1;
			_ctx.strokeStyle = currentScreen.textColor;
			_ctx.textAlign = "center";
			_ctx.strokeText(currentContent[i].str, textX+400, textY+100);
		}
		else if ( currentContent[i].elementType == uiElementTypes.simpleText )
		{
			// draw Text
			_ctx.beginPath();
			_ctx.font = "40px Verdana";
			_ctx.lineWidth = 1;
			_ctx.strokeStyle = currentScreen.textColor;
			_ctx.textAlign = "center";
			_ctx.strokeText(currentContent[i].str, textX, textY);
		}
		else if ( currentContent[i].elementType == uiElementTypes.buttons )
		{
			// check if its current selection to draw circle
			// draw buttons
			_ctx.beginPath();
			_ctx.strokeStyle = currentScreen.textColor;
			_ctx.rect(currentXPos, currentYPos, BUTTON_WIDTH, BUTTON_HEIGHT); 
			_ctx.stroke();
			
			// draw button text
			_ctx.beginPath();
			_ctx.font = "30px Verdana";
			_ctx.lineWidth = 1;
			_ctx.strokeStyle = currentScreen.textColor;
			_ctx.textAlign = "center";
			_ctx.strokeText(currentContent[i].str, textX, textY);
			
			if ( currentMenuItemSelection == i )
			{
				// draw circle to indicate selection
				var radius = 10;

				_ctx.beginPath();
				_ctx.arc(currentXPos - BUTTON_SELECTION_INDICATOR_OFFSET, currentYPos + BUTTON_SELECTION_INDICATOR_OFFSET, radius, 0, 2 * Math.PI, false);
				_ctx.lineWidth = 1;
				_ctx.strokeStyle = currentScreen.textColor;
				_ctx.stroke();
			}
		}
		
		currentYPos = currentYPos + BUTTON_HEIGHT + BUTTON_OFFSET;
	}
}

function changeScreenTo(screenIdx)
{
	if ( screenStack.length > 0 )
	{
		var currentIndex = screenStack.length - 1;
		var currentScreen = screenStack[currentIndex];
	
		currentScreen.exit();
		
		var indexOfRequestedScreen = screenStack.indexOf(screens[screenIdx]);
		
		if ( indexOfRequestedScreen > -1 )
		{
			// If requested screen was already in the stack, just pop out screens until reaching it.
			for (var i = screenStack.length-1; i > indexOfRequestedScreen; i--)
			{
				screenStack.pop();
			}
		}
		else
		{
			screenStack.push(screens[screenIdx]);
		}
	}
	else
	{
		screenStack.push(screens[screenIdx]);
	}

	
	currentScreen = screenStack[screenStack.length - 1];
	
	for (var i = 0; i < currentScreen.content.length; i++)
	{
		if ( currentScreen.content[i].elementType == uiElementTypes.buttons )
		{
			currentMenuItemSelection = i;
			break;
		}
	}
	
	currentScreen.enter();
}

function loadImages()
{
	for (var i = 0; i < imgArray.length; i++)
	{
		imgArray[i].img = new Image();
		imgArray[i].img.src = "images/"+imgArray[i].str+".png";
	}
}

//MAIN MENU
function enterMain()
{	
	_canvas.style.backgroundImage = "url(images/background1.png)";
}

function updateMain()
{
	displayContent();
}

function exitMain()
{
	// exit code
}

//END OF MAIN

//OPTIONS
function enterOptions()
{
	_canvas.style.backgroundImage = "url(images/background3.png)";
}

function updateOptions()
{
	displayContent();
	
	// Add here any custom Options screen code if necessary
}

function exitOptions()
{
}
//END OF OPTIONS

// CREDITS
function enterCredits()
{
	_canvas.style.backgroundImage = "url(images/background2.png)";
}

function updateCredits()
{
	displayContent();
}

function exitCredits()
{
}
// END OF CREDITS

function enterCutscene()
{
	_canvas.style.backgroundImage = "url(images/background3.png)";
}

function updateCutscene()
{
	displayContent();
	
	// Add here any custom Settings screen code if necessary
}

function exitCutscene()
{
}
//END OF CUTSCENE

function enterGame()
{
	_canvas.style.backgroundImage = "url(images/background3.png)";
}

function updateGame()
{
	displayContent();
	
	// Add here any custom Settings screen code if necessary
}

function exitGame()
{
	
}
//END OF GAME
function enterPause()
{
	_canvas.style.backgroundImage = "url(images/background3.png)";
}

function updatePause()
{
	displayContent();
	
	// Add here any custom Settings screen code if necessary
}

function exitPause()
{
}
//END OF PAUSE
function enterGameplay()
{
	_canvas.style.backgroundImage = "url(images/background3.png)";
}

function updateGameplay()
{
	displayContent();
	
	// Add here any custom Settings screen code if necessary
}

function exitGameplay()
{
}
//END OF GAMEPLAY
function enterControls()
{
	_canvas.style.backgroundImage = "url(images/background3.png)";
}

function updateControls()
{
	displayContent();
	
	// Add here any custom Settings screen code if necessary
}

function exitControls()
{
}
//END OF CONTROLS
function enterVideo()
{
	_canvas.style.backgroundImage = "url(images/background3.png)";
}

function updateVideo()
{
	displayContent();
	
	// Add here any custom Settings screen code if necessary
}

function exitVideo()
{
}
//END OF VIDEO
function enterAudio()
{
	_canvas.style.backgroundImage = "url(images/background3.png)";
}

function updateAudio()
{
	displayContent();
	
	// Add here any custom Settings screen code if necessary
}

function exitAudio()
{
}
//END OF AUDIO

function enterHighscores()
{
	_canvas.style.backgroundImage = "url(images/background3.png)";
}

function updateHighscores()
{
	displayContent();
	
	// Add here any custom Settings screen code if necessary
}

function exitHighscores()
{
}
//END OF AUDIO