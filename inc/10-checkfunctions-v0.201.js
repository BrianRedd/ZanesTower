

Zincs++;
ZVERappend[10] = "10";
// ******VERSION******
ZVER[10] = 0.201
//			20040827 - monimg line 43 & 431

function NextRoom() {
	nrx = new Array(4); //Next Room X value
		nrx[0] = xx-1;
		nrx[1] = xx;
		nrx[2] = xx+1;
		nrx[3] = xx;
	nry = new Array(4); //Next Room Y value
		nry[0] = yy;
		nry[1] = yy+1;
		nry[2] = yy;
		nry[3] = yy-1;
}

function EnterRoom() {
	if (room[xx][yy][zz] == 0) {
		room[xx][yy][zz] = 1;
		newinfo+= " into an unfamiliar room";
		visitedrooms+=1;
		score += 3*difficulty;
		if (feat[xx][yy][zz] == 1) room[xx][yy][zz] = 2;
		if (floor[xx][yy][zz] == 5 || floor[xx][yy][zz] == 6) room[xx][yy][zz] = 3;
		if (room[xx][yy][zz] == 3 && feat[xx][yy][zz] == 1) room[xx][yy][zz] = 4;
		if (floor[xx][yy][zz] == 8) room[xx][yy][zz] = 5;
		if (floor[xx][yy][zz] == 9) room[xx][yy][zz] = 6;
	}
	if (mon[xx][yy][zz] != 0) { //Monsters?
		temp = 0;
		newinfo += ".";
		InfoRefresh();
		newinfo = "This room is occupied by a ";
		if (hp[xx][yy][zz] < MON[2][mon[xx][yy][zz]]) newinfo += "wounded ";
		newinfo += MON[0][mon[xx][yy][zz]];

		//TEMP: MONIMG check
		//newinfo += "("+monimg[xx][yy][zz]+")";
		
		newinfo += " with "+hp[xx][yy][zz]+" hit points";
		if (hp[xx][yy][zz] < 0) monlifechk();
	}
}

function RoomCheck() { //Combine "FallThrough", "Drowning", and various time checks from "ViewRefresh"
	//the "RoomCheck" variable should be set to "0" prior to calling this function.
	if (floor[xx][yy][zz] == 2) { //Cracked floor
		d6 = rand(6);
		if (d6 <3) { //Fall through
			floor[xx][yy][zz] = 3;
			ceil[xx][yy][zz-1] = 3;
			newinfo = "The floor cracks open";
			if (wear[3] == afgb) newinfo = newinfo + " and falls. You, however, float above the hole!"
			else {
				newinfo = newinfo + " and you fall through the hole";
				NSEW = rand(4);
				zz-=1;
				EnterRoom();
				newinfo+="!";
				ff1=-1;
				d3 = rand(3) + 1;
				gametime = gametime + d3;
				InfoRefresh();
				armorpiercing = 0;
				takeDmg(d3);
				InfoRefresh();
				newinfo = "You seem to be facing "+NSEWstr[NSEW]+".";
				roomcheck = 1;
			}
		}
		else newinfo = "The floor creaks as you move."
		ViewRefresh();
	}
	if (room[xx][yy][zz] == 6) { //Water Room
		if (wear[2] == aplr) {
			divetime = gametime;
			newinfo = "You can breath underwater!";
		}
		cc = gametime - divetime; // How long underwater?
		if (cc > 0) { //Drowning!
			fatdmg+=1;
			d3 = rand(3) + fatdmg;
			newinfo = "You swallow water and begin to drown!";
			armorpiercing = 1;
			takeDmg(d3);
			armorpiercing = 0;
			if (hitpoints<=0) hitpoints = 0;
			roomcheck = 2;
		}
		InfoRefresh();
	}
	if ((gametime - lastrest) > 239) {
		if (Math.floor((gametime-lastrest)/60) > (fatdmg + 3)) {
			fatdmg+=1;
			hitpoints-=1;
		}
	}
}

function takeDmg(temp) {
	if (armorpiercing == 0) {
		if (wear[1] == apta) temp=Math.floor(temp/2);
		if (wear[0] == asth) temp-=1;
		if (temp<=0) temp=0;
		}
	newinfo = "You take "+temp+" point";
	if (temp != 1) newinfo=newinfo+"s";
	newinfo = newinfo +" of damage!";
	hitpoints -= temp;
	document.images[iac].src='images/action/dmg.gif';
	if (document.layers) {
		document.layers["DmgLayer"].visibility='show';
		indent=window.setTimeout("document.layers['DmgLayer'].visibility='hide'", 500);
	}
	else { //IE
		document.all["DmgLayer"].style.visibility='visible';
		indent=window.setTimeout("document.all['DmgLayer'].style.visibility = 'hidden'", 500);
	}
	if (fancypants == 1 && hitpoints < 0) hitpoints = 0;
	if (hitpoints < 0) {
		ViewRefresh();
		GameOver(0);
		}
}

function KnockOut() {
		if (room[xx][yy][zz] == 6) zz=zz + 1;
		InfoRefresh();
		newinfo = "YOU FALL UNCONSCIOUS!";
		score -= 5*difficulty;
		if (hp[xx][yy][zz] > 0) {
			newinfo = "THE "+MON[0][mon[xx][yy][zz]]+" KNOCKS YOU OUT!";
			if (itm[xx][yy][zz] == 0) {
				itm[xx][yy][zz] = inv[0];
				for (i=0; i<4; i++) inv[i] = inv[i+1]
				inv[4] = 0;
				}
			xx = x7;
			yy = y7;
			zz = z7;
			NSEW = rand(4);
			for (i=0; i<5; i++) {
				dx = rand(x);
				dy = rand(y);
				dz = rand(z);
				if (inv[i] != 0) {
					backtobox = 0;
					if (itm[dx][dy][dz] != 0 || whowantssome == 1) backtobox = 1;
					if (backtobox == 0) {
						itm[dx][dy][dz] = inv[i];
						if (inv[i] == otmb) {
							tbloc = "floor";
							tbx = dx;
							tby = dy;
							tbz = dz;
							}
						inv[i] = 0;
						}
					else {
						if (difficulty > 1 && whowantssome == 0) {
							i-=1;
							}
						if (difficulty == 1 || whowantssome == 1) {
							box[inv[i]-1] = inv[i];
							if (inv[i] == otmb) tbloc = "box";
							document.images[ibx+inv[i]-1].src = "images/items/"+inv[i]+".gif";
							inv[i] = 0;
							}
						}
					}
				}
				carry = 0;
			for (i=0; i<5; i++) {
				dx = rand(x);
				dy = rand(y);
				dz = rand(z);
				if (wear[i] != 0) {
					backtobox = 0;
					if (itm[dx][dy][dz] != 0 || whowantssome == 1) backtobox = 1;
					if (backtobox == 0) {
						itm[dx][dy][dz] = wear[i];
						wear[i] = 0;
						}
					else {
						if (difficulty > 1 && whowantssome == 0) {
							i-=1;
							}
						if (difficulty == 1 || whowantssome == 1) {
							box[wear[i]-1] = wear[i];
							document.images[ibx+wear[i]-1].src = "images/items/"+wear[i]+".gif";
							wear[i] = 0;
							}
						}
					}
				}
			}
		InfoRefresh();
		nap();
	}

function ViewRefresh() {// Refresh View
	// Check Time Bomb Status
	if (tbact == 1) {
		if (gametime >= tbtime) {
			BoomBamBaby();
			}
		}
	// Check Ray Gun recharging
	if (gametime >= lastcharge+30) {
		raycharge += Math.floor((gametime-lastcharge)/30);
		if (raycharge > raymax) raycharge = raymax;
		lastcharge = gametime;
		}
	// Check Hit Points
	if (hitpoints == 0) KnockOut();
	// Leftmost Column
	// Images[ico] belongs to Compass
	document.images[ico].src = "images/compass/"+NSEW+".gif"; // Compass
	// Images[ihp] & [ihp+1] belong to HitPoints
	var hpdig1 = 0;
	var hpdig2 = 0;
	hpcolor = "g";
	if (hitpoints > hpmax) hpcolor = "w";
	if (hitpoints < hpmax) hpcolor = "a";
	if (hitpoints < (hpmax/2)) hpcolor = "r";
	if (hitpoints <= -9) hitpoints = -9;
	if (fancypants == 1) hpcolor = "w";
	hpdig1 = Math.floor(hitpoints/10);
	hpdig2 = hitpoints - 10*hpdig1;
	if (hitpoints < 0) {
		hpdig1 = 0;
		hpdig2 = Math.abs(hitpoints);
		if (hpdig2 > 9) hpdig = 2;
		}
	if (hitpoints < 0) document.images[ihp].src = "images/numbers/rmin.gif";
	else document.images[ihp].src = "images/numbers/"+hpcolor+hpdig1+".gif";
	document.images[ihp+1].src = "images/numbers/"+hpcolor+hpdig2+".gif";
	// Room Counter
	// Images[irm] - [irm+2] belongs to Room Counter
	var rcdig1 = 0;
	var rcdig2 = 0;
	var rcdig3 = 0;
	rccolor = "r";
	if (visitedrooms > (totalrooms/3)) rccolor = "a";
	if (visitedrooms > 2*(totalrooms/3)) rccolor = "g";
	if (visitedrooms == totalrooms) rccolor = "w";
	rcdig1 = Math.floor(visitedrooms/100);
	i = visitedrooms - 100*rcdig1;
	rcdig2 = Math.floor(i/10);
	rcdig3 = visitedrooms - 10*rcdig2;
	document.images[irm].src = "images/numbers/"+rccolor+rcdig1+".gif";
	document.images[irm+1].src = "images/numbers/"+rccolor+rcdig2+".gif";
	document.images[irm+2].src = "images/numbers/"+rccolor+rcdig3+".gif";
	// Monsters Killed
	// Images[iks] - [iks+1] belongs to Kill Counter
	var ksdig1 = 0;
	var ksdig2 = 0;
	kscolor = "r";
	if (kills > 0) kscolor = "a";
	if (kills > 2*totalmons/3) kscolor = "g";
	if (kills == totalmons) kscolor = "w";
	ksdig1 = Math.floor(kills/10);
	ksdig2 = kills - 10*ksdig1;
	document.images[iks].src = "images/numbers/"+kscolor+ksdig1+".gif";
	document.images[iks+1].src = "images/numbers/"+kscolor+ksdig2+".gif";
	// Tower Level
	// Images[itl] & [itl+1] belong to Tower Level
	var Lvl = 0;
	var lvldig1 = 0;
	var lvldig2 = 0;
	if (zz == GLvl) {
		levelcolor = "g";
		Lvl = "1";
	}
	if (zz > GLvl) {
		levelcolor = "a";
		Lvl = zz - GLvl + 1;
	}
	if (zz < GLvl) {
		levelcolor = "r";
		Lvl = zz - GLvl;
	}
	lvldig1 = Math.floor(Lvl/10);
	lvldig2 = Lvl - 10*lvldig1;
	if (Lvl < 0) {
		document.images[itl].src = "images/numbers/"+levelcolor+"min.gif";
		document.images[itl+1].src = "images/numbers/"+levelcolor+Math.abs(Lvl)+".gif";
	}
	else {
		document.images[itl].src = "images/numbers/"+levelcolor+lvldig1+".gif";
		document.images[itl+1].src = "images/numbers/"+levelcolor+lvldig2+".gif";
	}
	// Awake Timer
	// Image[iaw] belongs to awake timer
	awaketime = Math.floor((gametime - lastrest) / 60);
	atcolor = "g";
	if (awaketime > 3) atcolor = "a";
	if (awaketime > 7) atcolor = "r";
	if (awaketime > 8) {
		newinfo = "You fall unconscious do to exhaustion!";
		InfoRefresh();
		nap();
		return;
		}
	document.images[iaw].src = "images/numbers/"+atcolor+awaketime+".gif";
	InfoRefresh();
	// Left Wall Column
	// Images[ilw] belongs to Left Wall
	var lg = NSEW - 1; // left graphic
		if (lg < 0) lg = 3;
	document.images[ilw].src = "images/left/"+wall[lg][xx][yy][zz]+".gif"; // Left Wall
	if (wall[lg][xx][yy][zz] == 4) document.images[ilw].src = "images/left/2.gif"; // Secret?
	// Center Column
	// Images[ice], [ifw], & [ifl] belong to Front Graphics
	document.images[ice].src = "images/up/"+ceil[xx][yy][zz]+".gif"; // Ceiling
	document.images[ifw].src = "images/front/"+wall[NSEW][xx][yy][zz]+".gif"; // Front Wall
	if (wall[NSEW][xx][yy][zz] == 5 && wallmark == 0) document.images[ifw].src = "images/front/6.gif"; // Locked?
	if (wall[NSEW][xx][yy][zz] == 4) document.images[ifw].src = "images/front/2.gif"; // Secret?
	document.images[ifl].src = "images/down/"+NSEW+floor[xx][yy][zz]+".gif"; // Floor
	wallmark = 0;
	// Right Wall Column
	// images[irw] belongs to Right Wall
	var rg = NSEW + 1; // right graphic
		if (rg > 3) rg = 0;
	document.images[irw].src = "images/right/"+wall[rg][xx][yy][zz]+".gif"; // Right Wall
	if (wall[rg][xx][yy][zz] == 4) document.images[irw].src = "images/right/2.gif"; // Secret?
	// Rightmost Column
	// Game Clock
	// Images[igc] - [igc+4] belong to the game clock
	var clockhrs = 0;
	var clockmins = 0;
	dig0 = 0; // 1st Digit
	dig1 = 0; // 2nd Digit
	dig2 = 0; // 3rd Digit
	dig3 = 0; // 4th Digit
	clockcolor = "g";
	if (difficulty == 1) clockcolor = "a";
	if (difficulty == 3) clockcolor = "r";
	clockhrs = Math.floor(gametime/60);
	clockmins = gametime - (clockhrs*60);
	dig0 = Math.floor(clockhrs/10);
	dig1 = clockhrs - dig0*10;
	dig2 = Math.floor(clockmins/10);
	dig3 = clockmins - dig2*10;
	document.images[igc].src = "images/numbers/"+clockcolor+dig0+".gif";
	document.images[igc+1].src = "images/numbers/"+clockcolor+dig1+".gif";
	document.images[igc+2].src = "images/numbers/"+clockcolor+"dot.gif";
	document.images[igc+3].src = "images/numbers/"+clockcolor+dig2+".gif";
	document.images[igc+4].src = "images/numbers/"+clockcolor+dig3+".gif";
	// Score Board
	// Images[isc] - [isc+4] belong to the score board
	scdig0 = 0; // 1st Digit
	scdig1 = 0; // 2nd Digit
	scdig2 = 0; // 3rd Digit
	scdig3 = 0; // 4th Digit
	scdig4 = 0; // 5th Digit
	scorecolor = "g";
	if (score < 0) scorecolor = "r";
	scdig0 = Math.abs(parseInt(score/10000));
	scdig1 = parseInt((Math.abs(score)-(scdig0*10000))/1000);
	scdig2 = parseInt((Math.abs(score)-(scdig0*10000)-(scdig1*1000))/100);
	scdig3 = parseInt((Math.abs(score)-(scdig0*10000)-(scdig1*1000)-(scdig2*100))/10);
	scdig4 = Math.abs(score)-(scdig0*10000)-(scdig1*1000)-(scdig2*100)-(scdig3*10);
	if (score < 0) document.images[isc].src = "images/numbers/rmin.gif";
	else document.images[isc].src = "images/numbers/"+scorecolor+scdig0+".gif";
	document.images[isc+1].src = "images/numbers/"+scorecolor+scdig1+".gif";
	document.images[isc+2].src = "images/numbers/"+scorecolor+scdig2+".gif";
	document.images[isc+3].src = "images/numbers/"+scorecolor+scdig3+".gif";
	document.images[isc+4].src = "images/numbers/"+scorecolor+scdig4+".gif";
	// Inventory
	// Images[iih] belong to Item in hand
	document.images[iih].src = "images/items/"+inv[0]+".gif";
	//FEATURES?
	// Images[ife] belong to Features in Room
	if (feat[xx][yy][zz] > 0) { //Netscape
		if (document.layers) {
			document.layers["FeatLayer"].visibility='show';
		}
		else { //IE
			document.all["FeatLayer"].style.visibility='visible';
		}
		document.images[ife].src='images/features/'+feat[xx][yy][zz]+NSEW+'.gif';
	}
	if (feat[xx][yy][zz] == 0) {
		if (document.layers) document.layers["FeatLayer"].visibility='hide';
		else document.all["FeatLayer"].style.visibility='hidden';
	}
	//ITEMS?
	// Images[iir] belong to Item in room(?)
	if (itm[xx][yy][zz] > 0) { //Netscape
		if (document.layers) {
			document.layers["itemlayer"].visibility='show';
		}
		else { //IE
			document.all["itemlayer"].style.visibility='visible';
		}
		document.images[iir].src='images/items/'+itm[xx][yy][zz]+'.gif';
	}
	if (itm[xx][yy][zz] == 0) {
		if (document.layers) document.layers["itemlayer"].visibility='hide';
		else document.all["itemlayer"].style.visibility='hidden';
	}
	// Images[ica]-[ica+4] belong to Items carried
	// Images[iwo]-[iwo+4] belong to Items worn
	for (i=0;i<5;i++) {
		document.images[ica+i].src="images/items/"+inv[i]+".gif";
		document.images[iwo+i].src="images/items/"+wear[i]+".gif";
	}
	// Images[inc] belongs to number of items carried
	carcol = "g";
	if (carry > 3) carcol = "a";
	if (carry == 5) carcol = "r";
	document.images[inc].src="images/numbers/"+carcol+carry+".gif";
	// Images[iba] - [iba+9] belong to Bag of Holding
	for (i=0; i<10; i++) document.images[iba+i].src="images/items/"+bag[i]+".gif";

	//MONSTERS?
	// Images[imo] belong to Monster in Room
	if (mon[xx][yy][zz] > 0) { //Netscape
		if (document.layers) {
			document.layers["MonLayer"].visibility='show';
		}
		else { //IE
			document.all["MonLayer"].style.visibility='visible';
		}
		document.images[imo].src='images/monsters/'+mon[xx][yy][zz]+"-"+monimg[xx][yy][zz]+'.gif';
		// Added Monster Image designation
	}
	if (mon[xx][yy][zz] == 0) {
		if (document.layers) document.layers["MonLayer"].visibility='hide';
		else document.all["MonLayer"].style.visibility='hidden';
	}
}

function InfoRefresh() {
	if (newinfo == info[5]) return;
	for (i=0;i<5;i++) {
		info[i] = info[i+1];
		}
	info[5] = newinfo;
	document.InfoForm.TopLine.value = info[0];
	document.InfoForm.SecondLine.value = info[1];
	document.InfoForm.ThirdLine.value = info[2];
	document.InfoForm.ForthLine.value = info[3];
	document.InfoForm.FifthLine.value = info[4];
	document.InfoForm.LastLine.value = info[5];
}

