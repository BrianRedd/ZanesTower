Zincs++;
ZVERappend[1] = "01";
// ******VERSION******
ZVER[1] = 0.134

//var x = 3; // How many rooms North-South
//var y = 3; // How many rooms East-West
//var z = 3; // How many levels Up-Down
//var difficulty = 2;

var fancypants = parent.hiddenframe.hiddenform.fancypants.value;
var whowantssome= parent.hiddenframe.hiddenform.whowantssome.value;;
var boomstick = parent.hiddenframe.hiddenform.boomstick.value;;
var cheater = parent.hiddenframe.hiddenform.cheater.value;
cheater=cheater.length-1;
var temp = 0;

var uname = parent.hiddenframe.hiddenform.uname.value;
var x = parent.hiddenframe.hiddenform.topx.value;
x = x-0;
var y = parent.hiddenframe.hiddenform.topy.value;
y = y-0;
var z = parent.hiddenframe.hiddenform.topz.value;
z = z-0;
var difficulty = parent.hiddenframe.hiddenform.toplvl.value;
difficulty = difficulty-0;

if (difficulty == 3 && cheater > 0) {
	alert("Cheats do not work on hardest difficulty setting. Sorry!");
	fancypants = 0;
	whowantssome = 0;
	boomstick = 0;
	}
if (fancypants == 1) alert("You are IMMORTAL!");
if (whowantssome == 1) alert("Lost items return to the Alien Treasure Box!");
if (boomstick == 1) alert("Check the box for a special goodie!");
if (cheater == 3) alert("GROOOOOVY");

//alert("x = "+x+", y = "+y+" & z = "+z);
//alert("Difficulty: "+difficulty);

var totalrooms = x * y * z;


