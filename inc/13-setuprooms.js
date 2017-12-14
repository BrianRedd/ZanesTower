

Zincs++;
ZVERappend[13] = "13";
// ******VERSION******
ZVER[13] = 0.013

for (iz=0;iz<z;iz++) {

for (i=0; i<x; i++) { // Stone Out EW Edge Walls
	wall[1][i][y-1][iz] = 0;
	wall[3][i][0][iz] = 0;
}

for (i=0; i<y; i++) { // Stone Out NS Edge Walls
	wall[0][0][i][iz] = 0;
	wall[2][x-1][i][iz] = 0;
}

for (ix=0; ix<x; ix++) { // Randomize East-West doors
	for (iy=0; iy<(y-1); iy++) {
		d8 = rand(8);
		d6 = rand(6);
		if (d8 < 4 && d6 == 5) wall[1][ix][iy][iz] = 4;	// Secret Door
		if (d8 < 4 && d6 < 5) wall[1][ix][iy][iz] = 5;	// Locked Door
		if (d8 < 4 && d6 < 3) wall[1][ix][iy][iz] = 6;	// Closed Door
		if (d8 == 4) wall[1][ix][iy][iz] = 9; 			// Archway
		if (d8 > 4 && d6 > 3) wall[1][ix][iy][iz] = 3;	// Cracked Brick Wall
		wall[3][ix][iy+1][iz] = wall[1][ix][iy][iz];
	}
}

for (ix=0; ix<(x-1); ix++) { // Randomize North-South doors
	for (iy=0; iy<y; iy++) {
		d8 = rand(8);
		d6 = rand(6);
		if (d8 < 4 && d6 == 5) wall[2][ix][iy][iz] = 4;	// Secret Door
		if (d8 < 4 && d6 < 5) wall[2][ix][iy][iz] = 5;	// Locked Door
		if (d8 < 4 && d6 < 3) wall[2][ix][iy][iz] = 6;	// Closed Door
		if (d8 == 4) wall[2][ix][iy][iz] = 9; 			// Archway
		if (d8 > 4 && d6 > 3) wall[2][ix][iy][iz] = 3;	// Cracked Brick Wall
		wall[0][ix+1][iy][iz] = wall[2][ix][iy][iz];
	}
}
} // for z

for (iz=0; iz<(z-1); iz++) {//Randomize Ceilings & Floors
	floorspc = 0;
	for (ix=0; ix<x; ix++) {
		for (iy=0; iy<y; iy++) {
			d12 = rand(12);
			cc = 1;
			if (d12 == 7 || d12 == 8) cc = 2; // Cracked Door
			if (d12 == 9 || d12 == 10) {
				cc = 5; // Closed Trap Door
				feat[ix][iy][iz] = 1;
				}
			if (d12 == 11) {
				cc = 4; // Closed Secret Trap Door
				feat[ix][iy][iz] = 1;
				}
			ceil[ix][iy][iz] = cc;
			floor[ix][iy][iz+1] = cc;
			if (cc > 2) floorspc+=1;
		}
	}
	if (floorspc < 2) {
		for (i=0; i<3; i++) {
			dx = rand(x);
			dy = rand(y);
			if (ceil[dx][dy][iz] == 1) {
				ceil[dx][dy][iz] = 4;
				floor[dx][dy][iz+1] = 4;
				feat[dx][dy][iz] = 1;
			}
		}
	}
}

// Randomize the Water Room

xx = rand(x);
yy = rand(y);
NextRoom();
	for (i=0; i<4; i++) {
		marker = 0;
		nrwo=i+2;
		if (nrwo>3) nrwo=i-2;
		if (wall[i][xx][yy][0] == 0) marker = 1;
		else {
			wall[i][xx][yy][0] = 11;
			wall[nrwo][nrx[i]][nry[i]][0]=12; // stone walls around the waterroom

		}
		if (marker == 1) {
			wall[i][xx][yy][0] = 11;
 			marker = 0;
		}
	floor[xx][yy][0] = 9;
	ceil[xx][yy][0] = 8;
	floor[xx][yy][1] = 8;
	var wetitm = rand(nitm-1)+2;
	itm[xx][yy][0] = wetitm;
}

for (iz=0;iz<z;iz++) {// Make Sure Each Room as Entrances - secret doors
	for (xx=0; xx<x; xx++) {
		for (yy=0; yy<y; yy++) {
		var cc=0;
			for (iw=0; iw<4; iw++) {
			if (wall[iw][xx][yy][iz] > 3 && wall[iw][xx][yy][iz] <11) cc+=1;
			}
			if (cc==0) {
				NextRoom();
				for (iw=0; iw<4; iw++) {
					if (wall[iw][xx][yy][iz] == 2 || wall[iw][xx][yy][iz] == 3) {
						wall[iw][xx][yy][iz] = 4;
						nrw = iw + 2;
						if (nrw > 3) nrw = iw - 2;
						wall[nrw][nrx[iw]][nry[iw]][iz] = 4;
					}
				}
			}
		}
	}
}

// Randomize starting position and golden doors

var xx = 0;
var yy = 0;

var d4 = rand(4);
var dx = rand(x);
var dy = rand(y);

if (d4 == 0) {
	var xx = 0;
	var yy = dy;
	}
if (d4 == 1) {
	var xx = dx;
	var yy = y-1;
	}
if (d4 == 2) {
	var xx = x-1;
	var yy = dy;
	}
if (d4 == 3) {
	var xx = dx;
	var yy = 0;
	}



if (floor[xx][yy][zz] == 9) {
	zz = zz + 1;
	}

if (floor[xx][yy][zz] == 8) {
	zz = zz + 1;
	}

room[xx][yy][zz] = 7;
var x7 = xx;
var y7 = yy;
var z7 = zz;

if (zz != 0) {
	floor[xx][yy][zz] = 1;
	ceil[xx][yy][zz-1] = 1;
}
if (zz != z-1) {
	ceil[xx][yy][zz] = 1;
	floor[xx][yy][zz+1] = 1;
}

feat[xx][yy][zz] = 2;
itm[xx][yy][zz] = 99;

// Set Up Start Room
NextRoom();
marker = 0;
for (i=0; i < 4; i++) {
	nrwo = i + 2; //Next Room Wall Orientation
	if (nrwo > 3) nrwo = i - 2;
	if (wall[i][xx][yy][zz] != 0) {
		if (wall[nrwo][nrx[i]][nry[i]][zz] != 11) {
			wall[i][xx][yy][zz] = 9;
			wall[nrwo][nrx[i]][nry[i]][zz] = 9;
		}
	}
	if (wall[i][xx][yy][zz] == 0 && marker == 0) {
		wall[i][xx][yy][zz] = 1;
		marker = 1;
	}
}

