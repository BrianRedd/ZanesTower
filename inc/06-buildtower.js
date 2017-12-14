Zincs++;
ZVERappend[6] = "06";
// ******VERSION******
ZVER[6] = 0.201
//		20040827
//				Adding Random Monster Image

room = new Array(x); // Zero Out All Rooms, Features, Items, & Monsters
feat = new Array(x);
itm = new Array(x);
mon = new Array(x);
monimg = new Array(x); //new with v0.100
hp = new Array(x);
	for (ix=0;ix<x;ix++) {
		room[ix] = new Array(y);
		feat[ix] = new Array(y);
		itm[ix] = new Array(y);
		mon[ix] = new Array(y);
		monimg[ix] = new Array(y);
		hp[ix] = new Array(y);
		for (iy=0;iy<y;iy++) {
			room[ix][iy] = new Array(z);
			feat[ix][iy] = new Array(z);
			itm[ix][iy] = new Array(z);
			mon[ix][iy] = new Array(z);
			monimg[ix][iy] = new Array(z)
			hp[ix][iy] = new Array(z);
			for (iz=0;iz<z;iz++) {
				room[ix][iy][iz] =0;
				feat[ix][iy][iz] =0;
				itm[ix][iy][iz] =0;
				mon[ix][iy][iz] =0;
				monimg[ix][iy][iz] =0; 
				hp[ix][iy][iz] =0;
			}
		}
	}
wall = new Array(4); // Brick Out All Walls
	for (i=0; i<4; i++) {
		wall[i] = new Array(x);
		for (ix=0; ix<x; ix++) {
			wall[i][ix] = new Array(y);
			for (iy=0; iy<y; iy++) {
				wall[i][ix][iy] = new Array(z);
				for (iz=0;iz<z;iz++) {
					wall[i][ix][iy][iz] = 2;
				}
			}
		}
	}
floor = new Array(x);// Zero Out all Floors
	for (ix=0; ix<x; ix++) {
		floor[ix] = new Array(y);
		for (iy=0; iy<y; iy++) {
			floor[ix][iy] = new Array(z);
			for (iz=0;iz<z;iz++) {
				floor[ix][iy][iz] =0;
			}
		}
	}
ceil = new Array(x);// Zero Out all Ceilings
	for (ix=0; ix<x; ix++) {
		ceil[ix] = new Array(y);
		for (iy=0; iy<y; iy++) {
			ceil[ix][iy] = new Array(z);
			for (iz=0;iz<z;iz++) {
				ceil[ix][iy][iz] =0;
			}
		}
	}

