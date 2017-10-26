let timetableByhour=[],timetableByday=[],timetableByperson=[];
let members=["chen","toda","yokoda","kaneko","yirabe","shimasaki","takada"];
let count={"chen": 0,"toda": 0,"yokoda": 0,"kaneko": 0,"yirabe": 0,"shimasaki": 0,"takada":0};
let name=["chen","toda","yokoda","kaneko","yirabe","shimasaki","takada"];
//let ddate=['日','月','火','水','木','金','土'];
let ddate=['sun','mon','tue','wed','thu','fri','sat'];
let seltime=[];
let selday=[];
function setup() {
	createCanvas(900,700);
	textSize(12);
	fill(50);
	for (var x = 0; x < members.length; x++) {
	text(name[x], 20+x*100, 30);}
	for (var x = 0; x < members.length; x++) {
		for (var y = 0; y < 7; y ++) {
			textSize(9);
			strokeWeight(5);
			stroke(255);
			fill(120);
			text(ddate[y],x*100,57+y*25);
			for (var i = 0; i < 3; i++) {
				timetableByhour.push(new mybuttom(25+x*100+i*25,55+y*25));			
			}
			timetableByday.push(timetableByhour);
			timetableByhour=[];
		}
		timetableByperson.push(timetableByday);
		timetableByday=[];
	}
	setupselect();
	button = createButton('arrange');
	button.position(534, 257);
	button.mousePressed(arrange);
	buttonc = createButton('counttime');
	buttonc.position(534, 290);
	buttonc.mousePressed(counttime);


}

class mySelList{
	constructor(x,y,names){
		this.x=x;
		this.y=y;
		this.names=names;
		this.sel1=createSelect(0);
		this.sel1.position(x, y);
		this.sel2=createSelect(0);
		this.sel2.position(x, y+20);
		names.forEach(function(element) {
			this.sel1.option(element);
			this.sel2.option(element);
		}, this);
	}
	refresh(names){
		this.names=names;
		this.sel1.remove();
		this.sel1=createSelect(0);
		this.sel1.position(this.x, this.y);
		this.sel2.remove();
		this.sel2=createSelect(0);
		this.sel2.position(this.x, this.y+20);
		names.forEach(function(element) {
			this.sel1.option(element);
			this.sel2.option(element);
		}, this);
		if(names.length>1){
			var rand = Math.floor(Math.random() * (names.length));
			this.sel1.value(names[rand]);
			if(names.length===rand){
				this.sel2.value(names[0]);
			}	else{
				names.splice(rand,1);
				this.sel2.value(names[Math.floor(Math.random() * (names.length))])
			}
		}
	
	}
	
}
class mybuttom{
	constructor(x,y){
		this.x=x;
		this.y=y;
		this.status=true;
		this.show();

	}
	show(){
		strokeWeight(20);
		if (this.status) {
			stroke(color(0, 200, 0));
		}else{
			stroke(color(200, 0, 0));
		}
		line(this.x, this.y, this.x+5, this.y);
	}
	clicked(){
		this.status=!this.status;
		strokeWeight(20);
		if (this.status) {
			stroke(color(0, 200, 0));
		}else{
			stroke(color(200, 0, 0));
		}

		line(this.x, this.y, this.x+5, this.y);
		console.log('clicked!!',mouseX,mouseY);
	}
}

function mouseClicked() {
	console.log(mouseX,mouseY);
	if (mouseY>40 && mouseY<215) {
		if (mouseX>0 && mouseX<820) {
			var person = Math.floor((mouseX-0)/100);
			var day = Math.floor((mouseY-40)/25);
			var hour = mouseX%100;
			if(hour>12.5&&hour<87.5){
				hour=Math.floor((hour-12.5)/25);
				timetableByperson[person][day][hour].clicked();
			}
		}
	}
}



function setupselect(){
	for (var day = 0; day < 7; day++) {
		seltime=[];
        for (var time=0; time<3; time++) {
			var list = [];
            for (var i = 0; i <name.length; i++) {
                if (timetableByperson[i][day][time].status){list.push(name[i])}
			}
			seltime[time] = new mySelList(20+time*100,day*70+250,list);
		}
		selday[day]=seltime;
    }
}

function arrange(){
	for (var day = 0; day < 7; day++) {
        for (var time=0; time<3; time++) {
            var list = [];
            for (var i = 0; i <name.length; i++) {
                if (timetableByperson[i][day][time].status){list.push(name[i])}
			}
			selday[day][time].refresh(list);
			console.log(day,time);
		}
    }
}

function counttime(){
	selday.forEach(function(element) {
		element.forEach(function(ele) {
			count[ele.sel1.value()]++;
			count[ele.sel2.value()]++;
		}, this);
	}, this);
	for (var i = 0; i <members.length; i++) {
		textSize(12);
		strokeWeight(5);
		stroke(255);
		fill(120);
		text(members[i]+":"+count[members[i]].toString(),355,250+i*60)

	}
}