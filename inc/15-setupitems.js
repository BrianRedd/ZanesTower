Zincs++;
ZVERappend[15] = "15";
// ******VERSION******
ZVER[15] = 0.015

for (i=nitm-2; i <= nitm; i++) {
	if (i == wetitm) i+=1;
	if (i == freeB) i+=1;
	var dx = rand(x);
	var dy = rand(y);
	var dz = rand(z);
	if (itm[dx][dy][dz] == 0 && mon[dx][dy][dz] != 0) itm[dx][dy][dz] = i;
	else i-=1;
	}

for (i=1; i <= nitm-3; i++) {
	if (i == wetitm) i+=1;
	if (i == freeB) i+=1;
	if (i == wrlr && boomstick == 1) {
		box[wrlr-1] = wrlr;
		i+=1;
		}
	var dx = rand(x);
	var dy = rand(y);
	var dz = rand(z);
	if (itm[dx][dy][dz] == 0 && room[dx][dy][dz] != 7 && floor[dx][dy][dz] !=8) itm[dx][dy][dz] = i;
	else i-=1;
	}

