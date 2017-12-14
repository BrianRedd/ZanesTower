Zincs++;
ZVERappend[16] = "16";
// ******VERSION******
ZVER[16] = 0.300

function ThiefNextRoom() {
	nthx = new Array(4); //Thief Next Room X value
		nthx[0] = thx-1;
		nthx[1] = thx;
		nthx[2] = thx+1;
		nthx[3] = thx;
	nthy = new Array(4); //Thief Next Room Y value
		nthy[0] = thy;
		nthy[1] = thy+1;
		nthy[2] = thy;
		nthy[3] = thy-1;
}

function ThiefSteal() {;
	var success = 0;
	for (i=0, i < difficulty, i++) {
		temp = rand(10)
		if (success == 0 || temp <5) {
			if (inv[temp] !=0) {
				thiefloot = inv[temp];
				for (i=temp;i<4;i++) {
					inv[i] = inv[i+1];
					}
				inv[4] = 0;					
				carry -=1;
				if (thiefloot == otmb) { // Time Bomb?
					tbloc = 4; // thief
					//tbx = xx;
					//tby = yy;
					//tbz = zz;
					}
				if (thiefloot == oboh) BOHHideWin();
				success = 1;
				}
			}
		if (success == 0 || temp >4 {
			if (wear[temp-5] !=0) {
				thiefloot = wear[temp-5];
				wear[temp-5] = 0;
				success = 1;
				}
			}
		}
	if (success == 1) {
		newinfo="You've been robbed!";
		InfoRefresh();
		ThiefRun();
		}
	else {
		newinfo="The Thief attempts to rob you, but finds nothing to steal!"
		InfoRefresh();
		}
	}
	
function ThiefMove() {
	//Anything to Steal?
	temp = rand(9);
	if (thiefloot != 0 || itm[thx][thy][thz] == 0) { // Thief Y, Room N
		if (temp < 6 || mon[thx][thy][thz] > 1) { // Thief drops (2:3 w/ monster)
			itm[thx][thy][thz] = thiefloot;
			thiefloot = 0;
			if (itm[thx][thy][thz] == otmb) { // time bomb
				tbloc = 0;
				tbx = thx;
				tby = thy;
				tbz = thz;
				}
			temp = 9;
			}
		if (temp < 3) { // Thief drops (1:3)
			itm[thx][thy][thz] = thiefloot;
			thiefloot = 0;
			if (itm[thx][thy][thz] == otmb) { // time bomb
				tbloc = 0;
				tbx = thx;
				tby = thy;
				tbz = thz;
				}
			temp = 9;
			}
		}	
	if (thiefloot != 0 || itm[thx][thy][thz] != 0) { // Thief Y, Room Y
		if (temp < 3) { // Thief trades (1:3)
			if (thiefloot == otmb) { // time bomb
				tbloc = 0;
				tbx = thx;
				tby = thy;
				tbz = thz;
				}
			if (itm[thx][thy][thz] == otmb) { // time bomb
				tbloc = 4;
				//tbx = thx;
				//tby = thy;
				//tbz = thz;
				}
			temp1 = itm[thx][thy][thz];
			itm[thx][thy][thz] = thiefloot;
			thiefloot = temp1;
			temp = 9;
			}
		}	
	if (thiefloot == 0 || itm[thx][thy][thz] !=0) { // Thief N, Room Y
		if (temp < 6) { // Thief Steals (2:3)
			if (itm[thx][thy][thz] == otmb) { // time bomb
				tbloc = 4;
				//tbx = thx;
				//tby = thy;
				//tbz = thz;
				}
			thiefloot = itm[thx][thy][thz];
			itm[thx][thy][thz] = 0;
			temp = 9;
			}
		}
	}
	// Where to Go
	temp = rand(4);
	ThiefNextRoom();
	if (temp < 1) { // straight ahead
		temp1 = wall[thface][thx][thy][thz]
		if (temp1 == 4) temp1 = 10;
		if (temp1 > 5 && temp1 < 11) { // open passage 
			if (mon[thx][thy][thz] == 1) {
				mon[thx][thy][thz] = 0;
				hp[thx][thy][thz] = 0;
				}
			thx = nthx[thface];
			thy = nthy[thface];
			if (hp[thx][thy][thz] == 0) {
				mon[thx][thy][thz] = 1;
				hp[thx][thy][thz] = MON[2][1];
				}
			}
		if (temp1
		}
	if (temp = 2) { // random direction
	

	if (temp = 3) { // up or down
