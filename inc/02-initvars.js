Zincs++;
ZVERappend[2] = "02";
// ******VERSION******
ZVER[2] = 0.301

var ico = 0; // Compass
var ihp = 1; // Hit Points -	ihp & ihp+1 + SPACER
var irm = 4; // Rooms -  		irm, irm+1, irm+2 + SPACER
var iks = 8; // Kills -			iks, iks+1 + SPACER
var itl = 11; // Tower Level - 	itl & itl+1 + SPACER
var iaw = 14; // Awake Timer -  iaw + SPACER
var ilw = 16; // Left Wall
var ice = 17; //Ceiling
var ifw = 18; //Front Wall
var ifl = 19; //Floor
var irw = 20; //Right Wall
var igc = 21; //Game Clock -	igc, igc+1, igc+2, igc+3, igc+4
var isc = 26; //Score Board -	isc, isc+1, isc+2, isc+3, isc+4
var iih = 31; //Item in Hand
var ibu = 32; //Buttons - 		ibu, ibu+1, ibu+2, ibu+3, ibu+4, ibu+5, ibu+6
var ife = 41; //Feature graphic*
var iir = 42; //Item in Room*
var ica = 43; //Items Carried*-	ica, ica+1, ica+2, ica+3, ica+4
var iwo = 48; //Items Worn*-	iwo, iwo+1, iwo+2, iwo+3, iwo+4
var inc = 53; //Number Items Carried*
var iba = 54; //Bag of Holding*-iba to iba+9;
var idm = 64; //Damage Layer*
var iac = 65; //Action Layer*
var ibx = 66; //Treasure Box Layer*- ibx to ibx+24
var imo = 91; // Monsters*

var victory = 0;
var carry = 0; //number of items carried
var rlammo = 3; // Rocket Launcher Ammo
if (difficulty == 3) rlammo = 1;
var raycharge = 0;
var raymax = 5;
var rayset = 1;
if (difficulty > 1) rayset = 0;
RSstr = new Array("OFF", "MIN", "MED", "MAX");
var lastcharge = 0;
if (boomstick == 1) {
	rlammo +=3;
	raymax = 10;
	}
var tbloc = 0 //"floor"; time bomb location; other opts: "carried(1)","bag(2)","box(3)",thief(4)"
var tbx = 0; //time bomb x cooridinate
var tby = 0; //time bomb y cooridinate
var tbz = 0; //time bomb z cooridinate
var tbact = 0; //"1" means time bomb is active
var tbtime = 0; //when active, is time bomb detonation time
var bombtime = 0;
var NSEW = rand(4);
var zz = rand(z-1)+1;
var GLvl = zz;
var gametime = 0;
var lastrest = 0; // you take damage if gametime-lastrest => 240 minutes; resting resets this value
var fatdmg = 0; // fatigue damage; 1pt per hour over 4; resting heals; also subtracts from rolls
var visitedrooms = 1;
var rxx = -1; // retreat value
var ryy = -1; // retreat value
var rzz = -1; // retreat value
var keys = 0; // Number of Keys in the box
var kills = 0; // Number of Kills
var armorpiercing = 0;
var totalmons = Math.floor(totalrooms/3);
var hpmax = 5 + Math.floor(totalmons/3);
if (hpmax < 10) hpmax = 10;
if (difficulty > 1) hpmax = 10;
var hitpoints = hpmax;
var score = 0;

inv = new Array(5); //CAN carry no more than 5 items.
	for (i=0; i<5; i++) inv[i]=0;
wear = new Array(5); //CAN wear no more than 5 items.
	for (i=0; i<5; i++) wear[i]=0;
bag = new Array(10); //Bag of Holding can carry no more than 10 items.
	for (i=0; i<10; i++) bag[i]=0;

// Thief Variables
var thx = 0; // Thief X
var thy = 0; // Thief Y
var thz = 0; // Thief Z
var thface = rand(4); // Thief facing
var thiefloot = 0; //What thief carries
var thiefmove = 10; //When thief moves (typically, every 10 minutes)

var fsmsg1 = "";
var fsmsg2 = "";
var fsmsg3 = "";