

Zincs++;
ZVERappend[14] = "14";
// ******VERSION******
ZVER[14] = 0.201
//			20040827

temp1 = totalmons;
temp2 = 0;
if (totalmons > nmon) {
	temp1 = nmon;
	temp2 = 1;
	}
for (i=1; i <= temp1; i++) {
	var dx = rand(x);
	var dy = rand(y);
	var dz = rand(z);
	if (mon[dx][dy][dz] == 0 && room[dx][dy][dz] != 7 && floor[dx][dy][dz] !=9) {
		mon[dx][dy][dz] = i;
		hp[dx][dy][dz] = MON[2][i];
		//Random Monster Image
			var temp3 = rand(2);
			if (temp3 != 1) monimg[dx][dy][dz] = "b";
		}
	else i-=1;
	}

if (temp2 != 0) {
	for (i=temp1+1; i <= totalmons; i++) {
	rndmon = rand(nmon-2)+2;
	var dx = rand(x);
	var dy = rand(y);
	var dz = rand(z);
	if (mon[dx][dy][dz] == 0 && room[dx][dy][dz] != 7 && floor[dx][dy][dz] !=9) {
		mon[dx][dy][dz] = rndmon;
		hp[dx][dy][dz] = MON[2][rndmon];
		//Random Monster Image
			var temp3 = rand(2);
			if (temp3 != 1) monimg[dx][dy][dz] =2;
		}
	else i-=1;
	}
}

