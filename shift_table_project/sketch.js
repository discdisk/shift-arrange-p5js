let timetableByhour=[],timetableByday=[],timetableByperson=[];
let members=["chen","toda","yokoda","kaneko","yirabe","shimasaki"];
let name=["chen","toda","yokoda","kaneko","yirabe","shimasaki"];
function setup() {
	createCanvas(900,700);
	textSize(12);
	fill(50);
	for (var x = 0; x < members.length; x++) {
	text(name[x], 20+x*100, 30);}
	for (var x = 0; x < members.length; x++) {
		for (var y = 0; y < 7; y ++) {
			for (var i = 0; i < 3; i++) {
				timetableByhour.push(new mybuttom(25+x*100+i*25,55+y*25));			
			}
			timetableByday.push(timetableByhour);
			timetableByhour=[];
		}
		timetableByperson.push(timetableByday);
		timetableByday=[];
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


function arrange(){
	textSize(12);
	strokeWeight(5);
	stroke(255);
	fill(50);
    for (var day = 0; day < 7; day++) {
        for (var time=0; time<3; time++) {
            var list = [];
            for (var i = 0; i <name.length; i++) {
                if (timetableByperson[i][day][time].status){list.push(name[i])}
            }
            var randomnum=Math.floor(Math.random() * (list.length-1));
            var randomname=list[randomnum];
            if (list.length>1) {
                list.splice(randomnum,1);
                randomnum=Math.floor(Math.random() * (list.length-1));
            }

            text((list[randomnum]+'   and  '+randomname),time*200,220+day*40);
        }
    }
}
