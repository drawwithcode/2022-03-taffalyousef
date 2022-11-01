
// 
let myImage;
let astronaut;
let mySounds;
let myNote;
let analyzer;
let mask;
let capture;
let imagex;
let imagey;
let myText;
let textX;
let textY;

function preload() {
	mySounds = loadSound("./assets/music/Astronaut.mp3");
	myImage = loadImage("./assets/images/space.jpg");
	astronaut = loadImage("./assets/images/astronaut1.png");
	myNote = loadImage("./assets/images/note.png"); 
	mask = loadImage("./assets/images/mask.png")
}


function setup() {
	createCanvas(windowWidth, windowHeight);
	imageMode(CENTER)

	capture = createCapture(VIDEO);
	capture.hide();

	analyzer = new p5.Amplitude();
	analyzer.setInput(mySounds);

}

function draw() {
	
	backgroundImage (myImage);
	imagex = width/2;
	imagey = height/1.7;

	// Astronaut video face
	push();
	translate(imagex + 9.5 , imagey- 85);
	capture.mask(mask);
	scale(-1,1);
	image(capture, 0, 0, 144, 144)
	pop();


	let volume = 0;
	volume = analyzer.getLevel();
	let volumeNotes = map(volume, 0, 1, 500, 700);
	let volumeCircle = map(volume, 0, 1, 10, 50);

	// Astronaut image
	push ();
	translate (imagex,imagey)
	image(astronaut, 0, 0, 500, 500);
	pop();
	
	// Notes Image
	push();
	translate (imagex, imagey);
	image (myNote, 0, 0, volumeNotes, volumeNotes);
	pop();
	

	// Audio Spectrums
	audioSpectrum(color(255, 114, 187, 95), volumeCircle,  imagex + 60, imagey + 160)
	audioSpectrum(color(67, 224, 247, 95), volumeCircle, imagex - 82 , imagey + 160)

	textX = width/2.3
	textY = height/10
	
	
	if (isMouseInsideText(myText, textX, textY)) {
		cursor(HAND);
		fill(0, 200, 255);
		stroke(0, 200, 255);
	} else {
		cursor(ARROW);
		fill(255);
		stroke(255);
	}

	if (mySounds.isPlaying() == false) {
		//instructions for the user
		myText = "click to play";
		textFont("Bungee");
		textSize(30);
		fill("white");
		text(myText, textX, textY);
	}
	else {
		  //instructions for the user
		  myText = "click to stop";
		  textFont("Bungee");
		  textSize(30);
		  fill("white");
		  text(myText, textX, textY);	
	}	
}

function windowResized(){
	resizeCanvas(windowWidth, windowHeight)
}

function mouseClicked() {
	if (isMouseInsideText(myText, textX, textY)) {
		if (mySounds.isPlaying() == false) {
			mySounds.play();
		} else {
			mySounds.stop();
		}
	}
}

function audioSpectrum(color , volumeCircle, x , y){
	push();
	translate(x, y);
		for( let i = 1; i < 5; i++){
		strokeWeight(1);
		stroke ('#FFFFFF')
		fill(color);
		ellipse(0, 0, volumeCircle*i);
		}
	pop();
}

function isMouseInsideText(text, x, y) {
	const textW = textWidth(text);
	const textTop = y - textAscent();
	const textBottom = y + textDescent();
  
	return mouseX > x && mouseX < x + textW &&
	  mouseY > textTop && mouseY < textBottom;
}

function backgroundImage(img) {
	push();
	translate(width/2,height/2);
	imageMode(CENTER);
	let scale = Math.max(width/img.width,height/img.height);
	image(img,0,0,img.width*scale,img.height*scale)
	pop();
}


  