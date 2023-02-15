//If you use this code, please be good enough to credit me for it at
//http://howtodrawaclock.appspot.com
//Thank you!

function paintClockNew(cvs, opt) {
	//function that draws a clock on canvas cvs with options opt
	var size, d, c, hours, mins, secs; //declare variables
	size = cvs.height / 2; //set the size of the clock to match the size of the canvas
	d = new Date(Date.now()); //use the time now to set the clock
	mins = d.getMinutes();
	hours = d.getHours();
	secs = d.getSeconds();
	
	c = cvs.getContext("2d"); //get the context of the canvas to operate with
	c.fillStyle = opt.handsColour; //set the colour and transparency of the hands
	c.strokeStyle = opt.handsColour;
	c.lineCap = "round"; //the end of the hands should be round
	c.lineWidth = size * (opt.handsWidth / 100); //set the thickness of the hands
	c.translate(size, size); //set the origin to the centre of the canvas
	
	c.beginPath();
	c.rotate(((mins / 60) + (secs / 3600)) * 2 * Math.PI); //rotate the canvas to the minute
	c.moveTo(0, opt.minOverhang * size);
	c.lineTo(0, -opt.minHandLength * size);
	c.stroke(); //draw the minute hand
	c.rotate(((mins / 60) + (secs / 3600)) * -2 * Math.PI); //rotate the canvas back to 0
	
	c.beginPath();	
	c.rotate(((hours / 12) + (mins / 720)) * 2 * Math.PI); //rotate the canvas to the hour
	c.moveTo(0, opt.hourOverhang * size);
	c.lineTo(0, -opt.hourHandLength * size);
	c.stroke(); //draw the hour hand
	c.rotate(((hours / 12) + (mins / 720)) * -2 * Math.PI); //rotate the canvas back to 0
}

//This sets everything up and is run at start up
document.addEventListener('DOMContentLoaded', function () {
    if (document.querySelector("#page2clock") !== null) {
			paintClockNew(
				document.querySelector("#page2clock"),
				{
					handsColour: "rgba(0, 0, 0, 0.8)",
					handsWidth: 7,
					minOverhang: 0.1,
					minHandLength: 0.9,
					hourOverhang: 0.2,
					hourHandLength: 0.5
				}
			);
		}
});