//If you use this code, please be good enough to credit me for it at
//http://howtodrawaclock.appspot.com
//Thank you!

function updateClock() {
 paintClockNew(document.querySelector("#clockcanvas"), 
    {size: document.querySelector("#size").value,
    borderWidth: document.querySelector("#borderWidth").value,
    hourlength: document.querySelector("#hourlength").value,
    hourwidth: document.querySelector("#hourwidth").value,
    houroverh: document.querySelector("#houroverh").value,
    minlength: document.querySelector("#minlength").value,
    minwidth: document.querySelector("#minwidth").value,
    minoverh: document.querySelector("#minhang").value,
    seclength: document.querySelector("#seclength").value,
    secwidth: document.querySelector("#secwidth").value,
    secoverh: document.querySelector("#sechang").value,
    ticknumber: document.querySelector("#ticknumber").value,
    ticklen: document.querySelector("#ticklen").value,
    tickgap: document.querySelector("#tickgap").value,
    tickwidth: document.querySelector("#tickwidth").value,
    colour: document.querySelector("#colour").value,
    numbersze: document.querySelector("#numbersze").value}
  ); 
}

function paintClockNew(cvs, opt) {
	//function that draws a clock on canvas cvs with options opt
	var size, d, c, hours, mins, secs; //declare variables
	size = opt.size; //size is set by input, usually we'd set it to be cvs.width / 2
	d = new Date(); //use the time now to set the clock
	mins = d.getMinutes();
	hours = d.getHours();
	secs = d.getSeconds();
	
	//Hands style
	c = cvs.getContext("2d"); //get the context of the canvas to operate with
	c.clearRect(0,0,cvs.width,cvs.height);
	c.fillStyle = opt.colour; //set the colour and transparency of the hands
	c.strokeStyle = opt.colour;
	c.lineCap = "round"; //the end of the hands should be round
	c.translate(size, size); //set the origin to the centre of the canvas
	
	//Minute Hand
	c.beginPath();
	c.rotate(((mins / 60) + (secs / 3600)) * 2 * Math.PI); //rotate the canvas to the minute
	c.moveTo(0, (opt.minoverh / 100) * size);
	c.lineWidth = size * (opt.minwidth / 100); //set the thickness of the hands
	c.lineTo(0, (-opt.minlength / 100) * size);
	c.stroke(); //draw the minute hand
	c.rotate(((mins / 60) + (secs / 3600)) * -2 * Math.PI); //rotate the canvas back to 0
	
	//Hour Hand
	c.beginPath();	
	c.rotate(((hours / 12) + (mins / 720)) * 2 * Math.PI); //rotate the canvas to the hour
	c.moveTo(0, (opt.houroverh / 100) * size);
	c.lineWidth = size * (opt.hourwidth / 100); //set the thickness of the hands
	c.lineTo(0, (-opt.hourlength / 100) * size);
	c.stroke(); //draw the hour hand
	c.rotate(((hours / 12) + (mins / 720)) * -2 * Math.PI); //rotate the canvas back to 0
	
	//Second Hand
	if (opt.seclength > 0) {
    c.beginPath();	
    c.rotate((secs / 60) * 2 * Math.PI); //rotate the canvas to the second
    c.moveTo(0, (opt.secoverh / 100) * size);
    c.lineWidth = size * (opt.secwidth / 100); //set the thickness of the hands
    c.lineTo(0, (-opt.seclength / 100) * size);
    c.stroke(); //draw the hour hand
    c.rotate((secs / 60) * -2 * Math.PI); //rotate the canvas back to 0
	}
	
	//Border
	if (opt.borderWidth > 0) {
    c.beginPath();
    c.lineWidth = size * opt.borderWidth / 100;
    c.arc(0, 0, size - (size * opt.borderWidth / 100), 0, 2 * Math.PI);
    c.stroke();
  }
	
	//Tick Marks
	if (parseInt(opt.ticknumber, 10) > 0) {
    for (i = 0; i < parseInt(opt.ticknumber, 10); i++) {
      c.beginPath();
      c.lineWidth = size * opt.tickwidth / 100;
      c.moveTo(0, size  - (size * opt.borderWidth / 100) - (size * opt.tickgap / 100));
      c.lineTo(0, size  - (size * opt.borderWidth / 100) - (size * opt.tickgap / 100) - (size * opt.ticklen / 100));
      c.stroke();
      c.rotate((2 * Math.PI) / opt.ticknumber);
    }
  }
	
	//Numbers
	if (parseInt(opt.numbersze, 10) > 0) {
    fontheight = size * (opt.numbersze / 100);
    c.font = fontheight + "px sans-serif";
    fontcent39 = size  - (size * opt.borderWidth / 100) - (size * opt.tickgap / 100) - (size * opt.ticklen / 100) - (size * opt.tickgap / 100) - c.measureText("9").width / 2;
    //fontsize = fontheight / 4;
    fontcent126 = size  - (size * opt.borderWidth / 100) - (size * opt.tickgap / 100) - (size * opt.ticklen / 100) - (size * opt.tickgap / 100) - (fontheight / 2);
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText("12", 0, -fontcent126);
    c.fillText("6", 0, fontcent126);
    c.fillText("9", -fontcent39, 0);
    c.fillText("3", fontcent39, 0);
  }
  
  //reset the canvas for next time
  c.translate(-size,-size);
  
  //update the script render on the page
  document.querySelector("#coderender").innerHTML = "paintClock(document.querySelector('#clockcanvas') , <br />" + JSON.stringify(opt).replace(/,/g , ",<br />") + "<br />);";
}

//This sets everything up and is run at start up
document.addEventListener('DOMContentLoaded', function () {
  updateClock();
  //Onchange events for every control
  var inputs = document.querySelectorAll("input");
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('change', updateClock);
  }
  document.querySelector("#classic").addEventListener('click', function () {
    document.querySelector("#size").value = 100;
    document.querySelector("#borderWidth").value = 2;
    document.querySelector("#hourlength").value = 60;
    document.querySelector("#hourwidth").value = 5;
    document.querySelector("#houroverh").value = 10;
    document.querySelector("#minlength").value = 80;
    document.querySelector("#minwidth").value = 3;
    document.querySelector("#minhang").value = 10;
    document.querySelector("#seclength").value = 0;
    document.querySelector("#secwidth").value = 0;
    document.querySelector("#sechang").value = 0;
    document.querySelector("#ticknumber").value = 4;
    document.querySelector("#ticklen").value = 4;
    document.querySelector("#tickgap").value = 2;
    document.querySelector("#tickwidth").value = 1;
    document.querySelector("#colour").value = "#000000";
    document.querySelector("#numbersze").value = 15;
    updateClock();
  });
  document.querySelector("#eighties").addEventListener('click', function () {
    document.querySelector("#size").value = 180;
    document.querySelector("#borderWidth").value = 20;
    document.querySelector("#hourlength").value = 42;
    document.querySelector("#hourwidth").value = 10;
    document.querySelector("#houroverh").value = 10;
    document.querySelector("#minlength").value = 58;
    document.querySelector("#minwidth").value = 7.4;
    document.querySelector("#minhang").value = 10;
    document.querySelector("#seclength").value = 0;
    document.querySelector("#secwidth").value = 0;
    document.querySelector("#sechang").value = 0;
    document.querySelector("#ticknumber").value = 0;
    document.querySelector("#ticklen").value = 4;
    document.querySelector("#tickgap").value = 6;
    document.querySelector("#tickwidth").value = 1;
    document.querySelector("#colour").value = "#b56caf";
    document.querySelector("#numbersze").value = 28;
    updateClock();
  });
  document.querySelector("#wacky").addEventListener('click', function () {
    document.querySelector("#size").value = 200;
    document.querySelector("#borderWidth").value = 0;
    document.querySelector("#hourlength").value = 60;
    document.querySelector("#hourwidth").value = 4;
    document.querySelector("#houroverh").value = 10;
    document.querySelector("#minlength").value = 95;
    document.querySelector("#minwidth").value = 2;
    document.querySelector("#minhang").value = 10;
    document.querySelector("#seclength").value = 100;
    document.querySelector("#secwidth").value = 0.1;
    document.querySelector("#sechang").value = 0;
    document.querySelector("#ticknumber").value = 12;
    document.querySelector("#ticklen").value = 6.3;
    document.querySelector("#tickgap").value = 80;
    document.querySelector("#tickwidth").value = 4.6;
    document.querySelector("#colour").value = "#ff0000";
    document.querySelector("#numbersze").value = 0;
    updateClock();
  });  
});