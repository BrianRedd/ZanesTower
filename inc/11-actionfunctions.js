

Zincs++;
ZVERappend[11] = "13";
// ******VERSION******
ZVER[11] = 0.136

function PickUpItem() {
	roomcheck = 0;
	RoomCheck();
	if (roomcheck == 1) return; //Fall Through
	if (itm[xx][yy][zz] == 0) {
		newinfo = "There is nothing to pick up, so you pick your nose instead.";
		ViewRefresh();
		return;
		}
	newitem = itm[xx][yy][zz];
	if (newitem == 99) {
		newinfo = "You look into the Alien Treasure Box."
		gametime+=1;
		if (document.layers) document.layers["BoxLayer"].visibility='show';
		else document.all["BoxLayer"].style.visibility='visible';
		ViewRefresh();
		return;
		}
	if (carry >=5) {
		newinfo = "You must drop your "+ITMstr[inv[0]]+" when you take the "+ITMstr[itm[xx][yy][zz]]+".";
		temp = inv[0];
		inv[0] = itm[xx][yy][zz];
		itm[xx][yy][zz] = temp;
//		newinfo = "You have five items already. That's all you can carry!";
		gametime+=2;
		ViewRefresh();
		return;
	}
	newinfo = "You pick up a "+ITMstr[newitem]+".";
	for (i=4 ; i>0 ; i--) {
		inv[i] = inv[i-1];
		}
	inv[0] = newitem;
	carry+=1;
	itm[xx][yy][zz] = 0;
	if (newitem == otmb) {
		tbloc = 1;
		tbx = -1;
		tby = -1;
		tbz = -1;
		}
	gametime+=1;
	ViewRefresh();
	rxx = -1;
	ryy = -1;
	rzz = -1;
}

function DropItem() {
	if (carry==0) {
		newinfo = "You're not carrying anything, so you have nothing to drop!";
		alert(newinfo);
		return;
	}
	roomcheck = 0;
	RoomCheck();
	if (roomcheck == 1) return; //Fall Through
	if (hp[xx][yy][zz] != 0) {
			if (window.confirm("Do you really wish to give the "+ITMstr[inv[0]]+" to the "+MON[0][mon[xx][yy][zz]]+"?") == false) {
			newinfo = "The "+MON[0][mon[xx][yy][zz]]+" thanks you for your offer, but it would rather kill you.";
			ViewRefresh();
			return;
			}
		}
	if (feat[xx][yy][zz] == 2) { // Alien Treasure Box
		newinfo = "You drop the "+ITMstr[inv[0]]+" into the Alien Treasure Box.";
		box[inv[0]-1] = inv[0];
		if (inv[0] == otmb) {
			tbloc = 3; // box
			tbx = xx;
			tby = yy;
			tbz = zz;
			}
		score += 25*difficulty;
		if (inv[0] == oboh) BOHHideWin();
		if (inv[0] == zanepieces || inv[0] == zanepieces + 1 || inv[0] == zanepieces + 2) {
			keys+=1;
			score += 75*difficulty;
			if (keys == 3) {
				InfoRefresh();
				newinfo = "You hear a deep rumbling *click* coming from the Golden Doors.";
				}
			}
		document.images[(ibx+inv[0]-1)].src="images/items/"+inv[0]+".gif";
		for (i=0;i<4;i++) {
			inv[i] = inv[i+1];
			}
		inv[4] = 0;
		carry-=1;
		ViewRefresh();
		rxx = -1;
		ryy = -1;
		rzz = -1;
		return;
		}
	if (itm[xx][yy][zz] > 0) {
		newinfo = "Floor space is limited: Only one item per room, please.";
		alert(newinfo);
		}
	if (itm[xx][yy][zz] == 0) {
		newinfo = "You drop the "+ITMstr[inv[0]]+" on the floor";
		itm[xx][yy][zz] = inv[0];
		if (inv[0] == otmb) {
			tbloc = 0; // floor
			tbx = xx;
			tby = yy;
			tbz = zz;
			}
		if (inv[0] == oboh) BOHHideWin();
		for (i=0;i<4;i++) {
			inv[i] = inv[i+1];
		}
		inv[4] = 0;
		carry-=1;
	}
	ViewRefresh();
	rxx = -1;
	ryy = -1;
	rzz = -1;
}

function InvWindow() {
	document.all["InvWin"].style.visibility='visible';
	for (i=0; i<5; i++) {
		document.images[ica+i].src="images/items/"+inv[i]+".gif";
		document.images[iwo+i].src="images/items/"+wear[i]+".gif";
	}
}

function InvRearrange(i) {
	if (inv[i]==0) {
		alert("That's an empty slot!");
		return;
	}
	if (inv[0] == oboh) { // Put in Bag of Holding
		if (bag[9] != 0) {
			newinfo = "The "+ITMstr[inv[i]]+" won't fit in your bag. The bag is full.";
			ViewRefresh();
			return;
			}
		BagofHolding(i);
		carry = carry - 1
		inv[i] = inv[carry];
		inv[carry] = 0;
		ViewRefresh();
		return;
	}
	if (inv[0] == wrlr && inv[i] == wrkt) { //Load rocket launcher
		rlammo = rlammo + 6;
		carry = carry - 1
		inv[i] = inv[carry];
		inv[carry] = 0;
		newinfo="You load the Rocket Launcher. It now has "+rlammo+" rockets in it.";
		score += (3+rlammo)*difficulty;
		ViewRefresh();
		return;
	}
	temp = inv[i];
	inv[i] = inv[0];
	inv[0] = temp;
	document.images[ica].src="images/items/"+inv[0]+".gif";
	document.images[iih].src="images/items/"+inv[0]+".gif";
	document.images[ica+i].src="images/items/"+inv[i]+".gif";
}

function RotateInvWin() {
	temp = inv[0];
	for (i=0; i<(carry-1); i++) inv[i] = inv[i+1];
	inv[carry-1] = temp;
	newinfo = "You rotate your carried inventory.";
	ViewRefresh();
	}

function BOHWindow() {
	if (document.layers) //Netscape
		document.layers["BagofHolding"].visibility="show";
	else //IE
		document.all["BagofHolding"].style.visibility='visible';
	for (i=0; i<10; i++) document.images[iba+i].src="images/items/"+bag[i]+".gif";
}

function BagofHolding(put) { //Put in Bag of Holding
	if (bag[9] != 0) return;
	if (inv[put] == otmb) {
		tbloc = 2; // in the bag
		}
	for (ii=9; ii>=0; ii--) bag[ii] = bag[ii-1];
	bag[0] = inv[put];
	newinfo = "You put the "+ITMstr[inv[put]]+" in the Bag of Holding.";
}

function BOHRemove() {
	if (bag[0] == 0) {
		newinfo = "You've nothing to remove from your bag.";
		alert(newinfo);
		return;
		}
	if (carry >= 5) {
		newinfo = "You need an empty slot before you can remove the "+ITMstr[bag[0]]+" from the bag.";
		alert(newinfo);
		return;
		}
	if (bag[0] == otmb) {
		tbloc = 1; // carried
		}
	inv[carry] = bag[0];
	newinfo = "You pull the "+ITMstr[bag[0]]+" out of the Bag of Holding.";
	carry+=1;
	for (i=0; i<9; i++) {
		bag[i] = bag[i+1];
		document.images[iba+i].src = "images/items/"+bag[i]+".gif";
		}
	bag[9] = 0;
	document.images[iba+9].src = "images/items/0.gif";
	ViewRefresh();
	}

function BOHrearrange(i) {
	if (i==0) {
		BOHRemove();
		return;
		}
	if (bag[i] == 0) {
		alert("That's an empty slot! You cannot rearrange an empty slot!");
		return;
		}
	temp = bag[0];
	bag[0] = bag[i];
	bag[i] = temp;
	document.images[iba+0].src = "images/items/"+bag[0]+".gif"
	document.images[iba+i].src = "images/items/"+bag[i]+".gif"
	}

function BOHHideWin() {
	if (document.layers) document.layers["BagofHolding"].visibility='hide';
	else document.all["BagofHolding"].style.visibility='hidden';
}

function unDonItem(i) {
	if (wear[i] == 0) alert("You've nothing to remove! Put something on first!");
	else {
		if (carry >= 5) {
			newinfo = "You need an empty slot before you can remove the "+ITMstr[wear[i]]+".";
			alert(newinfo);
		}
		else {
			newinfo = "You remove the "+ITMstr[wear[i]]+" from your "+WEARstr[i]+".";
			inv[carry] = wear[i];
			wear[i] = 0;
			carry+=1;
			gametime+=3;
		}
		ViewRefresh();
	}
}

function HideInvWin() {
	if (document.layers) document.layers["InvWin"].visibility='hide';
	else document.all["InvWin"].style.visibility='hidden';
}

function BoomBamBaby() { // Time Bomb explodes
	if (tbloc == 1) { //carried
		for (i=0; i<5; i++) {
			inv[i] = 0;
			wear[i] = 0;
			}
		tbact = 0;
		InfoRefresh();
		newinfo = "The Timb Bomb explodes spectacularly.  Unfortunately, you're carrying it at the time.";
		alert(newinfo);
		InfoRefresh();
		armorpiercing = 0;
		takeDmg(20);
		ViewRefresh();
		}
	if (tbloc == 2) { // in the bag
		tbact = 0;
		InfoRefresh();
		for (i=0; i<10; i++) bag[i] = 0;
		newinfo = "You get the funny feeling that something bad just happened in your Bag of Holding.";
		}
	if (tbloc == 3) { // in the box
		tbact = 0;
		InfoRefresh();
		for (i=0; i<25; i++) {
			if (box[i] != 0) {
				score -= 25*difficulty;
				box[i] = 0;
				}
			score -= keys * 75*difficulty;
			keys = 0;
			}
		newinfo = "You get the funny feeling that something bad just happened in the Alien Treasure Box.";
		feat[tbx][tby][tbz] = 3;
		itm[tbx][tby][tbz] = 0;
		}
	if (tbloc == 0) { // floor
		tbact = 0;
		InfoRefresh();
		newinfo = "In the distance, you hear a loud explosion.";
		tempx = xx;
		tempy = yy;
		tempz = zz;
		xx = tbx;
		yy = tby;
		zz = tbz;
		itm[xx][yy][zz] = 0;
		feat[xx][yy][zz] = 3;
		dmg = rand(10) + rand(10) + rand(10) + 12;
		if (hp[xx][yy][zz] > 0 ) {
			tempi = inv[0];
			inv[0] = 4;
			DoDmg(dmg);
			inv[0] = tempi;
			}
		NextRoom();
		// Walls:
		for (i=0; i<4; i++) {
			nrwo = i + 2; //Next Room Wall Orientation
			if (nrwo > 3) nrwo = i - 2;
			ff1 = wall[i][xx][yy][zz];
			if (ff1 == 2) {
				wall[i][xx][yy][zz] = 3;
				wall[nrwo][nrx[i]][nry[i]][zz] = 3;
				}
			if (ff1 == 3) {
				wall[i][xx][yy][zz] = 8;
				wall[nrwo][nrx[i]][nry[i]][zz] = 8;
				}
			if (ff1 == 5 || ff1 == 6 || ff1 == 10) {
				wall[i][xx][yy][zz] = 7;
				wall[nrwo][nrx[i]][nry[i]][zz] = 7;
				}
			}
		//Ceiling & Floor
		ff1 = ceil[xx][yy][zz];
			if (ff1 == 1) {
				ceil[xx][yy][zz] = 2;
				floor[xx][yy][zz+1] = 2
				}
			if (ff1 == 2) {
				ceil[xx][yy][zz] = 3;
				floor[xx][yy][zz+1] = 3
				}
			if (ff1 == 5 || ff1 == 7) {
				ceil[xx][yy][zz] = 6;
				floor[xx][yy][zz+1] = 6
				}
		ff1 = floor[xx][yy][zz];
			if (ff1 == 1) {
				floor[xx][yy][zz] = 2;
				ceil[xx][yy][zz-1] = 2
				}
			if (ff1 == 2) {
				floor[xx][yy][zz] = 3;
				ceil[xx][yy][zz-1] = 3
				}
			if (ff1 == 5 || ff1 == 7) {
				floor[xx][yy][zz] = 6;
				ceil[xx][yy][zz-1] = 6
				}
		if (tbx == tempx && tby == tempy && tbz == tempz) { // Same room
					newinfo = "The bomb on the floor explodes! You are caught in the blast.";
					dmg = rand(6) + rand(6) + rand(6) + 3;
					InfoRefresh();
					armorpiercing = 0;
					takeDmg(dmg);
					}
		xx = tempx;
		yy = tempy;
		zz = tempz;
		}
	}

function MagicMap() {
	newinfo = "You unravel the magic map.";
	var mapwall = 5
	if (screen.width <= 900) mapwall-=1;
	if (x == 7 || y == 7) mapwall-=1;
	var maproom = 16*mapwall;
	var maptabwid = y*(2*mapwall+maproom); //y*90 w/ 80px rooms
	var mapwid = y*(3*mapwall+maproom)+5;
	var maphei = x*(3*mapwall+maproom)+150;
	var mapfeat = "toolbar=no, status=no, width="+mapwid+", height="+maphei;
	MapWin=window.open('','MapWin', mapfeat);

	mapident = window.setTimeout("MapWin.close();",120000);
	MapWin.document.write("<h2><center>ZANE'S TOWER<br>");
	MapWin.document.write("<font size='3'>Level "+(zz+1)+" of "+z+"</font></center></h2>");
	MapWin.document.write('<table width="'+maptabwid+'" border="0" align="center" cellspacing="0" cellpadding="0">');
	iz = zz;
	for (ix=0; ix<x; ix++) {
		MapWin.document.write('<tr>');
		for (iy1=0; iy1<y; iy1++) {
			// North Walls
			MapWin.document.write('<td width="'+mapwall+'" height="'+mapwall+'"><img src="images/map/corner.gif" width="'+mapwall+'" height="'+mapwall+'"></td>');
			temp = wall[0][ix][iy1][iz];
			if (room[ix][iy1][iz] == 0) temp = "unknown";
			MapWin.document.write('<td height="'+mapwall+'" width="'+maproom+'"><img src="images/map/ns'+temp+'.gif" width="'+maproom+'" height="'+mapwall+'"></td>');
			MapWin.document.write('<td height="'+mapwall+'" width="'+mapwall+'"><img src="images/map/corner.gif" width="'+mapwall+'" height="'+mapwall+'"></td>');
		}
		MapWin.document.write('</tr><tr>');
		for (iy2=0; iy2<y; iy2++) {
			// EW Walls & Rooms proper
			temp = room[ix][iy2][iz];
			if (ix == xx && iy2 == yy && iz == zz) temp = "URhere"+NSEW;
			temp1 = wall[3][ix][iy2][iz];
			temp2 = wall[1][ix][iy2][iz];
			if (room[ix][iy2][iz] == 0) {
				temp1 = "unknown";
				temp2 = "unknown";
				}
			MapWin.document.write('<td width="'+mapwall+'"><img src="images/map/ew'+temp1+	'.gif" width="'+mapwall+'" height="'+maproom+'"></td>');
			MapWin.document.write('<td width="'+maproom+'"><img src="images/map/room'+temp+'.gif" width="'+maproom+'" height="'+maproom+'"></td>');
			MapWin.document.write('<td width="'+mapwall+'"><img src="images/map/ew'+temp2+'.gif" width="'+mapwall+'" height="'+maproom+'"></td>');
		}
		MapWin.document.write('</tr><tr>');
		for (iy3=0; iy3<y; iy3++) {
			// South Walls
			MapWin.document.write('<td width="'+mapwall+'"><img src="images/map/corner.gif" width="'+mapwall+'" height="'+mapwall+'"></td>');
			temp = wall[2][ix][iy3][iz];
			if (room[ix][iy3][iz] == 0) temp = "unknown";
			MapWin.document.write('<td width="'+maproom+'"><img src="images/map/ns'+temp+'.gif" width="'+maproom+'" height="'+mapwall+'"></td>');
			MapWin.document.write('<td width="'+mapwall+'"><img src="images/map/corner.gif" width="'+mapwall+'" height="'+mapwall+'"></td>');
		}
		MapWin.document.write('</tr>');
	}
	MapWin.document.write('</table>');
	MapWin.document.write('<form name="MapForm"><center>');
	MapWin.document.write('<input type="button" value="Close Map" onClick="window.close();">');
	MapWin.document.write('</center></form>');
}

function TreasureBox(item) {
	if (box[item] == 0) {
		newinfo = "You are through looking at the Alien Treasure Box.";
		}
	if (box[item] > 0) {
		if (carry >= 5) {
			newinfo = "You need an empty slot before you can remove the "+ITMstr[box[i]]+" from the Alien Treasure Box.";
			return;
			}
		if (box[item] == oboh) {
			tbloc = 1; // carried
			}
		if (box[item] == zanepieces || box[item] == zanepieces + 1 || box[item] == zanepieces + 2) {
			keys-=1;
			score -=75*difficulty;
			}
		for (i=5; i>0; i--) {
			inv[i] = inv[i-1];
			}
		inv[0] = box[item];
		newinfo = "You pull the "+ITMstr[box[item]]+" out of the Alien Treasure Box.";
		carry+=1;
		box[item] = 0;
		score -=25*difficulty;
		document.images[ibx+item].src = "images/items/99.gif";
		}
	if (document.layers) document.layers["BoxLayer"].visibility='hide';
	else document.all["BoxLayer"].style.visibility='hidden';
	ViewRefresh();
	}

function useItem() {
	ff1 = 0;
	rxx = -1; // no retreat
	ryy = -1;
	rzz = -1;
	roomcheck = 0;
	RoomCheck();
	if (roomcheck == 1) { //Fall Through
		ViewRefresh();
		return;
		}
	var i = inv[0];
	if (hp[xx][yy][zz] > 0) {
		if (ITMcls[i] == "w") {
			MonKombat();
			return;
			}
		else {
			hpck = hitpoints;
			MonAttack();
			InfoRefresh();
			if (hpck != hitpoints) {
				newinfo = "The "+MON[0][mon[xx][yy][zz]]+" hit distracts you from using the "+ITMstr[inv[0]]+"!";
				ViewRefresh();
				return;
				}
			}
		}
	newinfo = "You can't really use the "+ITMstr[i]+" here.";
	var goaway = 0; // does item go away after "use"
	if (ITMcls[i] == "n") newinfo = "You have nothing to use! Pick up something first.";
	if (ITMcls[i] == "w") { //weapons
		newinfo = "You brandish your "+ITMstr[i]+" menacingly!";
		gametime+=1;
		}
	if (ITMcls[i] == "a") { //armor
		newinfo = "You put the "+ITMstr[i]+" on your "+WEARstr[ITMspc[i]]+".";
		gametime+=3;
		goaway=1;
		wear[ITMspc[i]]=i;
		document.images[ITMspc[i]+iwo].src="images/items/"+i+".gif";
		}
	if (i == scroll) { // Start Scroll
		newinfo = "You read the scroll.";
		scrollfeat = 'alwaysRaised=yes,location=no,menubar=no,titlebar=no,toolbar=no';
		scrollfeat += ',screenX='+(screen.width-400)/2;
		scrollfeat += ',width=400,height=450';
		ScrollWin=window.open('scroll.html','ScrollWin',scrollfeat);
		scrollident = window.setTimeout("ScrollWin.close();",30000);
		gametime+=1;
		}
	if (i == wslh) { // Sledge Hammer!
		ff1 = wall[NSEW][xx][yy][zz];
		if (ff1 == 10) ff1 = 6;
		if (ff1 == 4) { // Secret Door
			newinfo = "You swing the hammer at the Brick Wall, but it stays firm.";
			gametime+=14;
			}
		if (ff1 == 3 || ff1 == 6 || ff1 == 5) {//Cracked Brick Wall/Closed Door/Locked Door
			newinfo = "You swing the hammer at the "+WALLstr[ff1]+", but it stays firm.";
			gametime+=14;
			d8 = rand(8) + 1 - fatdmg;
			if (d8 > 6 && ff1 == 3) { // Hammer vs Cracked Brick Wall
				NextRoom();
				nrwo = NSEW + 2;
				if (nrwo > 3) nrwo = NSEW - 2;
				newinfo = "You swing the hammer at the wall and it crashes down!";
				score += 7*difficulty;
				wall[NSEW][xx][yy][zz] = 8;
				wall[nrwo][nrx[NSEW]][nry[NSEW]][zz] = 8;
				}
			if (d8 > 3 && ff1 == 6) { // Hammer vs Closed Door
				NextRoom();
				nrwo = NSEW + 2;
				if (nrwo > 3) nrwo = NSEW - 2;
				newinfo = "You open the closed door with a large swing from your hammer.";
				wall[NSEW][xx][yy][zz] = 7;
				wall[nrwo][nrx[NSEW]][nry[NSEW]][zz] = 7;
				}
			if (d8 > 5 && ff1 == 5) { // Hammer vs Locked Door
				NextRoom();
				nrwo = NSEW + 2;
				if (nrwo > 3) nrwo = NSEW - 2;
				newinfo = "Your swing of the hammer breaks the locked door down!";
				score += 5*difficulty;
				wall[NSEW][xx][yy][zz] = 7;
				wall[nrwo][nrx[NSEW]][nry[NSEW]][zz] = 7;
				}
			}
		}
	if (i == wskn) { // Silver Knife
		if (wall[NSEW][xx][yy][zz] == 5) { // Unlock Locked Door
			NextRoom();
			nrwo = NSEW + 2;
			if (nrwo > 3) nrwo = NSEW - 2;
			gametime+=15;
			d6 = rand(6) - fatdmg;
			if (d6 >= 4) {
				newinfo = "*Click* You use the silver knife to pick the lock.  The door is now unlocked.";
				score += 7*difficulty;
				wall[NSEW][xx][yy][zz] = 6;
				wall[nrwo][nrx[NSEW]][nry[NSEW]][zz] = 6;
				}
			else newinfo = "You attempt to pick the lock with the silver knife, but are unsuccessful."
			}
		}
	if (i == wryg) { //Ray Gun
		newinfo = "The ray gun is ";
		if (raycharge == raymax) newinfo +="fully charged.";
		else newinfo += Math.round((raycharge/raymax)*100)+"% charged.";
		newinfo += " It is set to "+RSstr[rayset]+".";
		InfoRefresh();
		if (window.confirm(newinfo + " Would you like to change settings?") == true) {
			var temp = window.prompt('Which setting: 0=OFF, 1=MIN, 2=MED, 3=MAX?',rayset);
			temp = parseInt(temp);
			if (isNaN(temp) == true) temp = rayset;
			if (temp == rayset) {
				newinfo = "Ray gun power setting unchanged."
				ViewRefresh();
				return;
				}
			rayset = temp;
			newinfo = "You set the ray gun to "+RSstr[rayset]+"."
			ViewRefresh();
			return;
			}
		else {
			newinfo = "Ray gun power setting unchanged."
			}
		}
	if (i == wrlr) { // Rocket Launcher
		boom = 0;
		if (rlammo <= 0) {
			newinfo = "The rocket launcher is empty. Try finding some ammo, or being less trigger happy next time around.";
			InfoRefresh();
			return;
			}
		if (window.confirm("You have "+rlammo+" rockets. Fire rocket launcher?") == true) {
			boom = 1;
			ff1 = wall[NSEW][xx][yy][zz];
			if (ff1 == 10) ff1 = 6;
			rlammo-=1;
			newinfo = "PHOOM! WHOOSH! *KABLAMO!* You fire the rocket launcher at the "+WALLstr[ff1]+". It doesn't notice.";
			gametime+=4;
			NextRoom();
			nrwo = NSEW + 2;
			if (nrwo > 3) nrwo = NSEW - 2;
			dmg = 0;
			d20 = rand(10) + rand(10) + 2;
			dmg = Math.floor((d20/2) - 5);
			if (dmg <=0) dmg = 0;
			if (ff1 == 2 && d20 > 12) { // Rocket vs Solid Brick Wall
				newinfo = "PHOOM! WHOOSH! *KABLAMO!* The rocket slams into the wall: dust flies and  bricks crumble!";
				score += 7*difficulty;
				wall[NSEW][xx][yy][zz] = 3;
				wall[nrwo][nrx[NSEW]][nry[NSEW]][zz] = 3;
				}
			if (ff1 == 3 && d20 > 6) { // Rocket vs Cracked Brick Wall
				score += 5*difficulty;
				newinfo = "PHOOM! WHOOSH! *KABLAMO!* The rocket you fire brings the crumbling wall down!";
				wall[NSEW][xx][yy][zz] = 8;
				wall[nrwo][nrx[NSEW]][nry[NSEW]][zz] = 8;
				}
			if (ff1 == 4) { // Secret Door
				newinfo = "PHOOM! WHOOSH! *KABLAMO!* You fire the rocket launcher at the Brick Wall. It doesn't notice.";
				}
			if (ff1 == 5 && d20 > 5) { // Rocket vs Locked Door
				score += 5*difficulty;
				newinfo = "PHOOM! WHOOSH! *KABLAMO!* The rocket reduces the fine locked door to splinters and slag!";
				wall[NSEW][xx][yy][zz] = 7;
				wall[nrwo][nrx[NSEW]][nry[NSEW]][zz] = 7;
				}
			if (ff1 == 6 && d20 > 3) { // Rocket vs Closed Door
				newinfo = "PHOOM! WHOOSH! *KABLAMO!* The closed door never had a chance. There's not even kindling left!";
				wall[NSEW][xx][yy][zz] = 7;
				wall[nrwo][nrx[NSEW]][nry[NSEW]][zz] = 7;
				}
			if (ff1 >= 7 && ff1 <= 9) { // Open Passage
				newinfo = "PHOOM! WHOOSH! ... The rocket flies through the "+WALLstr[ff1]+" into the next room.";
				boom = 0;
				// apply dmg to any monster in the next room...
				if (hp[nrx[NSEW]][nry[NSEW]][zz] > 0) {
					tempx = xx;
					tempy = yy;
					xx = nrx[NSEW];
					yy = nry[NSEW];
					d10 = rand(10);
					if ((d10 + 2 + MON[3][mon[xx][yy][zz]]) <= ITMspc[inv[0]]) {
						dmg = rand(10) + rand(10) + 2;
						}
					DoDmg(dmg); // dmg is the dmg
					xx = tempx;
					yy = tempy;
					}
				dmg = 0
				}
			if (dmg > 0) {
				InfoRefresh();
				newinfo = "Unfortunately, you are hit by the edge of the blast!";
				armorpiercing = 0;
				takeDmg(dmg);
				}
			}
			if (boom == 1) {
					document.images[iac].src='images/action/boom.gif';
					if (document.layers) {
						document.layers["ActionLayer"].zIndex = '8';
						document.layers["ActionLayer"].visibility='show';
						indent=window.setTimeout("document.layers['ActionLayer'].visibility='hide'", 3000);
					}
					else { //IE
						document.all["ActionLayer"].style.zIndex = '8';
						document.all["ActionLayer"].style.visibility='visible';
						indent=window.setTimeout("document.all['ActionLayer'].style.visibility = 'hidden'", 3000);
					}
			}
		}
	if (i == otmb) { // Timb Bomb
		if (tbact == 0) { // inactive bomb
			bombtime = 0;
			if (window.confirm("Would you like to set timer on the Time Bomb?") == true) {
				var bombtime = window.prompt('How many minutes would you like to set it for (zero will cancel)?','5');
				bombtime = parseInt(bombtime);
				if (isNaN(bombtime) == true) bombtime = 0;
				if (bombtime == 0) {
					newinfo = "You cancel the operation and put the bomb away."
					ViewRefresh();
					return;
					}
				newinfo = "You set the bomb for "+bombtime+" minutes. It is now ACTIVE."
				tbact = 1;
				tbtime = gametime + bombtime;
				ViewRefresh();
				return;
				}
			else {
				newinfo = "You carefully put the bomb away for future use."
				}
			}
		else { // active bomb
			newinfo = "The bomb is set to go off in "+(tbtime - gametime)+" minutes.";
			if (window.confirm(newinfo+" Would you like to deactivate it?") == true) {
				newinfo = "You deactivate the bomb with "+(tbtime - gametime)+" minutes remaining."
				tbact = 0;
				tbtime = 0;
				bombtime = 0;
				}
			else {
				ViewRefresh();
				return;
				}
			}
		}
	if (i == orng) { // Rope & Grapple
		if (ceil[xx][yy][zz] == 3 || ceil[xx][yy][zz] == 6) { // Open Ceiling Passage
			newinfo = "You climb your rope through the "+CEILstr[ceil[xx][yy][zz]]+" ";
			gametime+=5;
			rxx = xx;
			ryy = yy;
			rzz = zz;
			zz+=1;
			EnterRoom();
			newinfo = newinfo +".";
			}
		else newinfo = "You swing the grapple around your head. Now, don't you feel better!";
		}
	if (i == ommp) { // Magic Map
		MagicMap();
		}
	if (i == oboh) { // Bag of Holding
		BOHWindow();
		newinfo = "You look in your bag of holding.";
		}
	if (i == osky) { // Skeliton Key
		newinfo = "The only thing around here worth picking is your nose. Go to town!";
		temp = wall[NSEW][xx][yy][zz];
		if (temp <= 1) return;
		NextRoom();
		nrwo = NSEW + 2;
		if (nrwo > 3) nrwo = NSEW - 2;
		if (wall[NSEW][xx][yy][zz] == 5) { // Unlock Locked Door
			newinfo = "*Click* You use the key to unlock the locked door.";
			score += 2*difficulty;
			gametime+=5;
			temp = 6;
			}
		if (wall[NSEW][xx][yy][zz] == 6) { // Lock Unlocked Door
			newinfo = "*Click* You use the key to lock the unlocked door.";
			score -= 2*difficulty;
			gametime+=5;
			temp = 5;
			}
		wall[NSEW][xx][yy][zz] = temp;
		wall[nrwo][nrx[NSEW]][nry[NSEW]][zz] = temp;
		}
	if (i == ocro) { // Crystal Orb
		newinfo = "You gaze into the Crystal Orb. ";
		gametime+=5;
		marker = 0;
		for (i=0; i<4; i++) {
			if (wall[i][xx][yy][zz] == 4) { // check for secret doors
				marker += 1;
				wall[i][xx][yy][zz] = 10;
				}
			}
		if (floor[xx][yy][zz] == 4) {
			marker +=1;
			floor[xx][yy][zz] = 7;
			}
		if (marker > 0) {
			newinfo += "It reveals "+marker+" previously undiscovered secret entrance"
			if (marker > 1) newinfo += "s";
			newinfo += ".";
			score += marker * difficulty;
			}
		else newinfo += "It reveals nothing hidden within the room."
		}
	if (i == phlt) { //Healing Potion
		temp1 = ITMspc[i]; // doses
		if (temp1 == 0) {
			newinfo = "This potion appears to be empty.";
			ViewRefresh();
			return;
			}
		else {
			if (window.confirm("This potion has "+temp1+" doses left. Do you wish to drink?") == true) {
				newinfo = "You drink from the potion. You feel warm and fuzzy inside.";
				InfoRefresh();
				hitpoints += fatdmg;
				fatdmg = 0;
				temp2 = hpmax - hitpoints; // amount of damage
				if (temp2 == 0) {
					ITMspc[i]-=1;
					newinfo = "To take full advantage of this potion, you may want to wound yourself first.";
					gametime+=1;
					}
				else {
					if (temp1 >= temp2) {
						ITMspc[i] -= temp2;
						}
					else {
						temp2 = temp1;
						ITMspc[i] = 0;
						}
					hitpoints += temp2;
					newinfo = "You heal "+temp2+" points of damage. You are now at "+hitpoints+" hit points.";
					gametime+=temp2;
					}
				}
			else newinfo = "You put the potion away for future use.";
			}
		}
	if (i == pstm) { //Potion of Stimulation
		temp1 = ITMspc[i]; // doses
		if (temp1 == 0) {
			newinfo = "This potion appears to be empty.";
			ViewRefresh();
			return;
			}
		newinfo = "You put the potion away for future use.";
		if (window.confirm("This potion has "+temp1+" does left. Do you wish to drink?") == true) {
			ITMspc[i]-=1;
			newinfo = "You drink from the potion. Your heart races and energy flows through you!";
			if (hitpoints > hpmax) {
				newinfo = "Alchemist's Rule #1: Don't Overdose on Potions. The dosage has a reverse effect!";
				InfoRefresh();
				armorpiercing = 1;
				dmg = rand(5)+5;
				takeDmg(5);
				armorpiercing = 0;
				ViewRefresh();
				return;
				}
			hitpoints += 5;
			gametime += 5;
			}
		}

	if (goaway > 0) {
		carry-=1;
		for (i=0;i<4;i++) {
			inv[i] = inv[i+1];
			}
		inv[4] = 0;
		}
	ViewRefresh();
	}

function nap() {
	roomcheck = 0;
	gametime+=1;
	RoomCheck();
	if (roomcheck != 0) return; //Fall Through
	if (hp[xx][yy][zz] > 0) {
		newinfo = "You attempt to rest, but the "+MON[0][mon[xx][yy][zz]]+"'s loud "+MON[1][mon[xx][yy][zz]]+" keeps you awake.";
		InfoRefresh();
		MonAttack();
		return;
		}
	document.images[iac].src='images/action/zzz.gif';
	if (document.layers) {
		document.layers["ActionLayer"].zIndex = '8';
		document.layers["ActionLayer"].visibility='show';
		indent=window.setTimeout("document.layers['ActionLayer'].visibility='hide'", 4500);
	}
	else { //IE
		document.all["ActionLayer"].style.visibility='visible';
		document.all["ActionLayer"].style.zIndex = '8';
		indent=window.setTimeout("document.all['ActionLayer'].style.visibility = 'hidden'", 4500);
	}
	time = rand(20) + 20;
	gametime+=time;
	lastrest = gametime;
	hitpoints+=fatdmg;
	if (hitpoints < (2*(4-difficulty)-1)) {
		hitpoints+=1;
		gametime += time;
		}
	fatdmg = 0;
	NSEW = rand(4);
	newinfo = "You sleep for "+time+" minutes, and feel refreshed! You wake up facing "+NSEWstr[NSEW]+".";
	ViewRefresh();
}

function shhhh() {
	roomcheck = 0;
	gametime+=1;
	RoomCheck();
	if (roomcheck != 0) return; //Fall Through
	gametime += 5;
	ff1 = wall[NSEW][xx][yy][zz];
	if (ff1 == 4) ff1 = 2;
	d6 = rand(6);
	newinfo = "You listen at the "+WALLstr[ff1];
	temp = " and hear nothing";
	if (wear[0] != 0) {
		d6 = 6;
		temp += " because you're wearing a "+ITMstr[wear[0]];
		}
	if (d6 < 3 && ff1 >= 5 && ff1 <= 10) {
		NextRoom();
		temp = " and hear "+MON[1][mon[nrx[NSEW]][nry[NSEW]][zz]];
		//if (mon[nrx[NSEW]][nry[NSEW]][zz] != 0) score += 2*difficulty; //REMOVED 20091201 - no points for listening
		}
	newinfo += temp + ".";
	ViewRefresh();
}

function quitbutton() {
	if (window.confirm("Do you really want to quit the game?") == true) {
		armorpiercing=1;
		fancypants =0; //Disables fancypants cheat (else you can't kill yourself)
		takeDmg(hitpoints+1);
		//GameOver(0);
		}
	else {
	newinfo = "You ponder suicide, but change your mind."
	ViewRefresh();
	}
}

function helpbutton() {
	newinfo = "You request help.";
	//helpfeat = 'alwaysRaised=yes,location=no,menubar=no,titlebar=no,toolbar=no';
	HelpWin=window.open('instructions.html','HelpWin','');
	}

function left() {
	roomcheck = 0;
	RoomCheck();
	NSEW = NSEW - 1;
	if (NSEW<0) NSEW = 3;
	gametime+=1;
	newinfo = "You turn left.  You now face "+NSEWstr[NSEW]+".";
	ViewRefresh();
	rxx = -1;
	ryy = -1;
	rzz = -1;
}

function right() {
	roomcheck = 0;
	RoomCheck();
	NSEW = NSEW + 1;
	if (NSEW>3) NSEW = 0;
	gametime+=1;
	newinfo = "You turn right.  You now face "+NSEWstr[NSEW]+".";
	ViewRefresh();
	rxx = -1;
	ryy = -1;
	rzz = -1;
}

function aboutface() {
	if (mon[xx][yy][zz] > 0) {
		MonAbout();
//		return;
		}
	roomcheck = 0;
	RoomCheck();
	NSEW = NSEW + 2;
	if (NSEW>3) NSEW = NSEW - 4;
	gametime+=2;
	newinfo = "You turn complete around.  You now face "+NSEWstr[NSEW]+".";
	ViewRefresh();
	rxx = -1;
	ryy = -1;
	rzz = -1;
}

function forward() {
	rxx = -1;
	ryy = -1;
	rzz = -1;
	ff1 = wall[NSEW][xx][yy][zz];
	roomcheck = 0;
	RoomCheck();
	if (roomcheck == 1) return; //Fall Through
	NextRoom();
	nrwo = NSEW + 2; //Next Room Wall Orientation
		if (nrwo > 3) nrwo = NSEW - 2;
	if (ff1 == 0) { //Stone Wall
		newinfo = "Try as you might, the Stone Wall doesn't give.";
		gametime+=5;
	}
	if (ff1 == 99) { // FREEDOM!
		newinfo = "You walk through the open doors to FREEDOM!  YOU WIN!"
		ViewRefresh();
		GameOver(1);
		}
	if (ff1 == 1) { //Golden Doors
		victory = 0;
		if (visitedrooms == totalrooms) victory +=1;
		if (kills == totalmons) victory +=1;
		if (keys == 3) victory +=1;
		if (victory > 0 && difficulty < 3) {
			wall[NSEW][xx][yy][zz] = 98;
			newinfo = "The massive golden doors fly open to FREEDOM!";
			ViewRefresh();
			indent=window.setTimeout("wall[NSEW][xx][yy][zz] = 99", 1000);
			newinfo = "Take a step forward and you're free!";
			}
		if (victory > 1 && difficulty == 3) {
			wall[NSEW][xx][yy][zz] = 98;
			newinfo = "The massive golden doors fly open to FREEDOM!";
			ViewRefresh();
			indent=window.setTimeout("wall[NSEW][xx][yy][zz] = 99", 1000);
			newinfo = "Take a step forward and you're free!";
			}
		if (victory == 0) {
			newinfo = "These golden doors open only for Heros and the Completers of Quests.";
			}
		if (victory == 1 && difficulty ==3) {
			newinfo = "What makes Level 3 Difficulty so difficult? Try 2 or more victory conditions!";
			}
		gametime+=5;
		}
	if (ff1 == 2) {//Brick Wall
		newinfo = "You search the Brick Wall thoroughly, but find nothing.";
		gametime+=15;
	}
	if (ff1 == 3) {//Damaged Brick Wall
		newinfo = "This Brick Wall is damaged. Perhaps a hard enough hit with the right tool can crack it.";
		gametime+=5;
	}
	if (ff1 == 4) {//Secret Door
		d6 = rand(6) - fatdmg;
		if (d6 > 3) {
			newinfo = "You search the Brick Wall thoroughly, and find a Secret Door!";
			score += 5*difficulty;
			wall[NSEW][xx][yy][zz] = 10;
			wall[nrwo][nrx[NSEW]][nry[NSEW]][zz] = 10;
			gametime+=10;
		}
		else {
			newinfo = "You search the Brick Wall thoroughly, but find nothing.";
			gametime+=15;
		}
	}
	if (ff1 == 5) { // Locked Door
		newinfo = "The door appears to be locked!";
		document.images[ifw].src = "images/front/"+wall[NSEW][xx][yy][zz]+".gif";
		wallmark = 1; // Has this door been looked at before? Yes, it has.
		gametime+=2;
	}
	if (ff1 == 6 || ff1 == 10) { // Closed Door
		newinfo = "The door was closed, but now you've opened it.";
		wall[NSEW][xx][yy][zz] = 7;
		wall[nrwo][nrx[NSEW]][nry[NSEW]][zz] = 7;
		gametime+=1;
	}
	if (ff1 > 6 && ff1 <10) { // Open Passage
		newinfo = "You walk " +NSEWstr[NSEW]+ " through the " +WALLstr[wall[NSEW][xx][yy][zz]];
		gametime+=3;
		rxx = xx;
		ryy = yy;
		rzz = zz;
		xx = nrx[NSEW];
		yy = nry[NSEW];
		EnterRoom();
		newinfo = newinfo +".";
	}
	if (ff1 == 11) { // Swim Up
		newinfo = "You swim up through the "+CEILstr[ceil[xx][yy][zz]]+".";
		gametime+=1;
		rxx = xx;
		ryy = yy;
		rzz = zz;
		zz+=1;
	}
	if (ff1 == 12) { // Pool Wall
		newinfo = "This Wall is cool to the touch, and somewhat damp. Otherwise, it is unremarkable.";
		gametime+=5;
	}
	if (ff1 >= 0) ViewRefresh();
}

function up() {
	ff1 = ceil[xx][yy][zz];
	roomcheck = 0;
	RoomCheck();
	if (roomcheck == 1) return; //Fall Through
	if (ff1 >= 0 && ff1 < 3) { // Impassable Ceiling
		newinfo = "You look up and examine the "+CEILstr[ceil[xx][yy][zz]]+".";
		gametime+=1;
		rxx = -1;
		ryy = -1;
		rzz = -1;
		}
	if (ff1 == 3 || ff1 == 6) { // Open Passage
		newinfo = "You jump up but can't reach the "+CEILstr[ceil[xx][yy][zz]]+" from here.";
		gametime+=1;
		d6 = rand(6);
		if (feat[xx][yy][zz] == 1) {
			newinfo = "You climb the ladder through the "+CEILstr[ceil[xx][yy][zz]];
			gametime+=2;
			rxx = xx;
			ryy = yy;
			rzz = zz;
			zz+=1;
			EnterRoom();
			newinfo = newinfo +".";
			d6 = 7;
			}
		if (inv[0] == orng && d6 != 7) {
			newinfo = "Using the grapple, you climb through the "+CEILstr[ceil[xx][yy][zz]];
			gametime+=4;
			rxx = xx;
			ryy = yy;
			rzz = zz;
			zz+=1;
			EnterRoom();
			newinfo = newinfo +".";
			d6 = 6;
			}
		if (wear[3] == afgb && d6 <=2) {
			newinfo = "You jump up and your belt lifts you through the "+CEILstr[ceil[xx][yy][zz]];
			gametime+=1;
			rxx = xx;
			ryy = yy;
			rzz = zz;
			zz+=1;
			EnterRoom();
			newinfo = newinfo +".";
			}
		}
	if (ff1 == 4 || ff1 == 5 || ff1 == 7) { // Closed Trap Door
		newinfo = "You can't reach the latch from here.";
		d6 = rand(6);
		if (feat[xx][yy][zz] == 1) {
			newinfo = "You climb the ladder and open the trap door.";
			ceil[xx][yy][zz] = 6;
			floor[xx][yy][zz+1] = 6;
			gametime+=3;
			rxx = -1;
			ryy = -1;
			rzz = -1;
			d6 = 6;
			}
		if (inv[0] == orng && wear[3] == afgb) {
			newinfo = "Your belt makes light enough that you easily pop the trap door open with the grapple.";
			score += 3*difficulty;
			ceil[xx][yy][zz] = 6;
			floor[xx][yy][zz+1] = 6;
			gametime+=3;
			rxx = -1;
			ryy = -1;
			rzz = -1;
			d6 = 6;
			}
		if (inv[0] == orng && d6 <=2) {
			newinfo = "Using the grapple, you hit the closed door and it pops open.";
			score += 3*difficulty;
			ceil[xx][yy][zz] = 6;
			floor[xx][yy][zz+1] = 6;
			gametime+=3;
			rxx = -1;
			ryy = -1;
			rzz = -1;
			d6 = 6;
			}
		if (wear[3] == afgb && d6 <=2) {
			newinfo = "You jump up to open the trap door, and your belt lifts you to success.";
			score += 3*difficulty;
			ceil[xx][yy][zz] = 6;
			floor[xx][yy][zz+1] = 6;
			gametime+=3;
			rxx = -1;
			ryy = -1;
			rzz = -1;
			d6 = 6;
			}
		}
	if (ff1 == 8) { // Swim up
		newinfo = "You swim up through the "+CEILstr[ceil[xx][yy][zz]];
		gametime+=1;
		rxx = xx;
		ryy = yy;
		rzz = zz;
		zz+=1;
		EnterRoom();
		newinfo = newinfo +".";
		}
	if (ff1 >= 0) ViewRefresh();
	}

function down() {
	rxx = -1;
	ryy = -1;
	rzz = -1;
	ff1 = floor[xx][yy][zz];
	if (ff1 < 2) { // Impassable Floor
		newinfo = "You search the floor, but find nothing of interest.";
		gametime+=15;
	}
	if (ff1 == 2) { // Cracked Floor
		newinfo = "You prod and poke at the unstable floor. "
		d6 = rand(6);
		if (d6 < 2 || inv[0] == wslh) {
			floor[xx][yy][zz] = 3;
			ceil[xx][yy][zz-1] = 3;
			newinfo+= "It cracks open revealing a room below you!"
			score += 3*difficulty;
		}
		else newinfo+= "It creaks as you move but remains intact."
		gametime +=1;
	}

	if (ff1 == 3 || ff1 == 6 || ff1 == 8) { // Open Passage
		climbstr = "climb";
		if (ff1 == 8) {
			climbstr = "dive";
			divetime = gametime + 1;
			rxx = xx;
			ryy = yy;
			rzz = zz;
		}
		newinfo = "You "+climbstr+" down into the "+FLOORstr[floor[xx][yy][zz]];
		gametime+=1;
		zz-=1;
		EnterRoom();
		newinfo = newinfo +".";
	}
	if (ff1 == 4) { //Secret Trap Door
		d6 = rand(6) - fatdmg;
		if (d6 > 3) {
			newinfo = "You search the floor thoroughly, and find a Secret Trap Door!";
			score += 5*difficulty;
			floor[xx][yy][zz] = 7;
			ceil[xx][yy][zz-1] = 7;
			gametime+=10;
		}
		else {
			newinfo = "You search the floor, but find nothing of interest.";
			gametime+=15;
		}
	}
	if (ff1 == 5 || ff1 == 7) { // Closed Trap Door
		newinfo = "The trap door was closed, but now you've opened it.";
		floor[xx][yy][zz] = 6;
		ceil[xx][yy][zz-1] = 6;
		gametime+=3;
	}
	ViewRefresh();
}

function retreat() {
	if (mon[xx][yy][zz] != 0) {
		MonRetreat();
//		return;
	}
	if (rxx < 0 || ryy < 0 || rzz < 0) newinfo = "You can't retreat now.";
	else {
		xx = rxx;
		yy = ryy;
		zz = rzz;
		rxx = -1;
		ryy = -1;
		rzz = -1;
		newinfo = "After a quick look around, you retreat back where you came from.";
		}
ViewRefresh();
}
