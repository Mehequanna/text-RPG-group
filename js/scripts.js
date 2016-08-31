// Business Logic

// Problem: Design a method for moving a player object through a 2D space, serving text to page based on: player location, player health and hazard checking.

// Adventurer Constructor, defines the player variable.
function Adventurer(name, xCord, yCord, health, days, item1, item2, item3, str, dex, wit) {
  this.name = name;
  this.xCord = xCord;
  this.yCord = yCord;
  this.health = health;
  this.days = days;
  this.item1 = item1;
  this.item2 = item2;
  this.item3 = item3;
  this.str = str; // if time
  this.dex = dex; // if time
  this.wit = wit; // if time
}

Adventurer.prototype.north = function() {
  if (this.yCord > 4) {
    this.health -= 1;
    this.days += 1;
  } else {
    this.yCord += 1;
    this.days += 1;
  }
};

Adventurer.prototype.south = function() {
  if (this.yCord < 0) {
    this.health -= 1;
    this.days += 1;
  } else {
    this.yCord -= 1;
    this.days += 1;
  }
};

Adventurer.prototype.east = function() {
  if (this.xCord > 4) {
    this.health -= 1;
    this.days += 1;
  } else {
    this.xCord += 1;
    this.days += 1;
  }
};

Adventurer.prototype.west = function() {
  if (this.xCord < 0) {
    this.health -= 1;
    this.days += 1;
  } else {
    this.xCord -= 1;
    this.days += 1;
  }
};


//Player Death
Adventurer.prototype.death = function() {
  if (this.health < 1 || this.days > 30) {
    $("footer").hide();
    $("header").hide();
    $("#wrapper").hide();
    $("#death").show();
  }
};

//Items
Adventurer.prototype.itemCheck = function() {
  if (this.yCord === 4 && this.xCord === 0 && this.item1 === false) {
    this.item1 = true;
    $("#items").append("<img src='img/bluegem.png' class='gems'></img>");
  } else if (this.yCord === 0 && this.xCord === 0 && this.item2 === false) {
    this.item2 = true;
    $("#items").append("<img src='img/redgem.png' class='gems'></img>");
  } else if (this.yCord === 0 && this.xCord === 4 && this.item3 === false) {
    this.item3 = true;
    $("#items").append("<img src='img/yellowgem.png' class='gems'></img>");
  }
};


// Traps
Adventurer.prototype.forestTrap = function() {
  if (this.yCord === 4 && this.xCord === 3 || this.yCord === 3 && this.xCord === 4) {
      var trapRoll = Math.floor(Math.random() * 7) + 1;

      if (trapRoll === 7 && this.yCord === 4 && this.xCord === 3) {
      $("#east").trigger("click");
    } else if (trapRoll === 7 && this.yCord === 3 && this.xCord === 4) {
      $("#north").trigger("click");
    } else if (trapRoll <= 3) {
      this.days += 1;
      this.health -= 1;
      $("#west").trigger("click");
      $("#notices").html("<strong>You have been wondering around for 1 day. You feel more tired and your health has waned.</strong>");
    } else if (trapRoll > 3) {
      this.days += 2;
      this.health -= 2;
      $("#south").trigger("click");
      $("#notices").html("<strong>You have been wondering around for 2 days. You feel more tired and your health has waned.</strong>");
    }
  }
};

// Attribute Generator to Define Initial Player Attributes.
var attributeGen = function() {
  return 1 + Math.floor(Math.random() * 4);
};

var descriptions = [
  "The soot from the fires fill your lungs once again. The fires have ravaged the terrain, making it fit for no animal, especially not one as frail as yourself. You have the sudden urge to flee. You are not immediately aware of your surroundings as you know you will soon perish if you do not find a habitable clearing. As you run, you see a red glint. It's the red gem!",
  "You're trekking through the forest and you see a poorly written, unintelligible sign on a rock that points south but also has a skull drawn. One would think that you wouldn't chance imminent death, but you're not exactly rich in choices, are you? To the north is the humid wetlands and to the east is a daunting mountain peak. To the west is a clearing of trees into a valley.",
  "The foul stench chokes your lungs as you wander amidst the ash gray bog. The water is still as death all around.",
  "These moist swamplands are thick with the scent of decay.",
  "You find one as if it had called to you near the gray ghost of a dead tree. Buried deep in the muck and mud is a fist-sized blue gem with a serpentine iris. You have found the water stone.",
  "Your eyes begin to water from the dry heat coming from the east but also have respite from the sun from the towering pine trees littering the mountains. You look to the north and see the gargantuan mountain peak. To the south you can see a narrow valley leading to what you believe is a river. To the west appears to be a recently burned forest fire with creatures burned to a crisp, scattered across the valleys. To the east you see a desert, hot and water-less.",
  "You have navigated atop the treacherous mountain peak. The air is light and you gasp for air from your tired lungs. Atop to mountain is a view that one could only believe with their own eyes; forests, mountains/hills, a vast desert and wetlands. A dark layer of fog obscures your view of beyond. As you lie down for the night it surprisingly begins to rain. It's surprising because your body feels frozen atop the mountain and it's not snow. Each direction immediately around you is mountains cascading down into either forests, wetlands, or deserts.",
  "As you step into the mountains you feel the humidity of the water surrounding you from half of your directions. As you look north the trees start turning into swamps before your view is obscured by fog. Looking west doesn't seem that different than the north. To the east is the ancient stone monolith that you know holds immense purpose. To the south you see the mountains peak, which would be quite a feat for someone such as yourself to navigate.",
  "Wet heat drifts off the bog, soaking your clothing through. Your sweat doesn’t even have the chance to evaporate.",
  "Huge swarms of mosquitos, gnats and worse drift haphazardly through the air around you. They bite and sting as your proceed through the wet marsh.",
  "You stand on the outskirts of the desert, with foothills to the north and west. The heat is extreme. You can sense that if you continue to the east, you may have the hardest trek that you have ever faced. You must rely on your cunning, skills, and overall durability to try and cross the Dead Sea.",
  "The large hills are starting to turn to mountains. The land is dry and the smell of soot fills your nose. There was a fire here recently and you get the urge to move again. To the north is the ancient stone monolith that you originated from. To the east are large hills of sand appearing as if they were golden ocean waves. To the south you see a similar sight of sand and burnt trees. Westward is the mountain's peak. A daunting task for even the most seasoned travelers. ",
  "<p>You are back where you started. The empty eyes of the beast stare at you hungrily.</p>",
  "You move amidst the spongy surface here, though before long you find yourself ankle deep in brackish swamp water.",
  "As you step from the water into the forest, you realize you no longer see the water. You don't see much of anything really, just trees. To the west, trees. To the east, trees. To the north, tress. To the south, wait is that? Nope, just more trees... You have a sincerely bad feeling about this. That voice in your head tells you to turn back. Do you?",
  "After traveling for what feels like days, you stop to take a break and scan the horizon. You are right in the middle of the desert and that is all you can see around you, for miles and miles. When you look to the east, though, you see an area that seems brighter and more inviting than the other areas. Something seems to be pulling you in that direction.",
  "Just out of the foothills of the mountains that lay to the west is what starts a neverending sea of sand. To the east and south, you see that the desert just keeps sprawling on, seemingly forever. Are that answers that you seek in the deadly desert that lays beyond here?",
  "You wander into a scrubland, with only a few wastrel bushes dispersed throughout. As you look to the east, you see the area start to look more vibrant with wildlife and further in the distance you see the start of a vast forest. All you see to the north a continuation of the treeline that you see started in the east. To the south you see more of the same as where you stand.",
  "Trees. Trees, everywhere! You conclude that you are in a forest. Good for you. The sun is blocked by the trees making everything look dark and gloomy. You can't see much of anything through the dense forest in front of you. You start to wonder if you should go on. You're smart, you figured out that you were in a forest. What do you do? All signs point to, No.",
  "Leaving the oasis seemed like great a way to get terribly lost. Then you notice the faeries, cough, fireflies have lit paths through the forest to the south and west for you!", //This space is trapped.
  "As you enter this area, you are barely able to put one foot in front of the other. You can feel your willpower waning and begin to think about the forests and streams that you left behind. And for what? To find out what that glow is? Just as you curse yourself for a fool you see the glow again with the sound of music coming from the center. You feel somewhat revitalized just by looking at it and rush to find the source of such beauty. You run toward the glow, but just as you are approaching, the glow disperses and all you see is more desert. You start to curse your luck and as you are turning around to go back where you came from, you see an oasis right in front of you! You dive into the water and drink your share until you notice the glow again. In the center of the oasis is a pedestal that seems to be thrumming with power. When you look on the pedestal, you see a yellow stone that is in the shape of the sun. As you touch and pick up the stone, you feel somewhat revitalized. Your stomach does not feel great, but you feel like you can press onward.",
  "You stand in the hot sun with sand everywhere except to the north. Will you return to the forest where there may be water and wild game to catch? Or will you continue into the desert, sure of your reward? As you travel further south and are near exhaustion, you spot something in the distance. If you focus on that glowing light, you swear that you hear a choir singing. Is that your fevered mind playing tricks on you or are you nearing your goal? If you are brave enough, continue south to investigate the glow and voices.",
  "You step from the rocky terrain onto the soft forest floor. You jump twice just to feel the ground flex underneath your feet. Seriously, it's so soft you could sleep on it. You hear birds and other relaxing sounds all around you. You start to think you could stay here forever with Pooh and his friends. That's not good. You have to move on. Do you really go farther into a forest that is clearly spellbinding you?",
  "Leaving the oasis seemed like great a way to get terribly lost. Then you notice the faeries, cough, fireflies have lit paths through the forest to the south and west for you!", //This space is trapped.
  "You step out of the woods into a circular clearing! You must be one of the luckiest people ever. Do you realize how slim your chances were of finding this place? You see beautiful flowers everywhere. Are those, are those faeries?! No stupid, they are fireflies. Get your head back in the game. You see a lot of honeysuckles and drink from them. You feel your health and energy improve. That's good, because finding your way out of here isn't going to be easy."
];



Adventurer.prototype.spaceCheck = function() {
  if (this.yCord === 0 && this.xCord === 0) {
    $("#description").html(descriptions[0]);
    // The Earth Stone
    this.itemCheck();
    $("#notices").html("<strong>You have picked up the earth stone!</strong>");
  } else if (this.yCord === 1 && this.xCord === 0) {
    $("#description").html(descriptions[1]);
  } else if (this.yCord === 2 && this.xCord === 0) {
    $("#description").html(descriptions[2]);
  } else if (this.yCord === 3 && this.xCord === 0) {
    $("#description").html(descriptions[3]);
  } else if (this.yCord === 4 && this.xCord === 0) {
    $("#description").html(descriptions[4]);
    // The Water Stone Location
    this.itemCheck();
    $("#notices").html("<strong>You have picked up the water stone!</strong>");
  } else if (this.yCord === 0 && this.xCord === 1) {
    $("#description").html(descriptions[5]);
  } else if (this.yCord === 1 && this.xCord === 1) {
    $("#description").html(descriptions[6]);
  } else if (this.yCord === 2 && this.xCord === 1) {
    $("#description").html(descriptions[7]);
  } else if (this.yCord === 3 && this.xCord === 1) {
    $("#description").html(descriptions[8]);
  } else if (this.yCord === 4 && this.xCord === 1) {
    $("#description").html(descriptions[9]);
  } else if (this.yCord === 0 && this.xCord === 2) {
    $("#description").html(descriptions[10]);
  } else if (this.yCord === 1 && this.xCord === 2) {
    $("#description").html(descriptions[11]);
  } else if (this.yCord === 2 && this.xCord === 2) {
    $("#description").html(descriptions[12]);
    this.winCheck();
  } else if (this.yCord === 3 && this.xCord === 2) {
    $("#description").html(descriptions[13]);
  } else if (this.yCord === 4 && this.xCord === 2) {
    $("#description").html(descriptions[14]);
  } else if (this.yCord === 0 && this.xCord === 3) {
    $("#description").html(descriptions[15]);
  } else if (this.yCord === 1 && this.xCord === 3) {
    $("#description").html(descriptions[16]);
  } else if (this.yCord === 2 && this.xCord === 3) {
    $("#description").html(descriptions[17]);
  } else if (this.yCord === 3 && this.xCord === 3) {
    $("#description").html(descriptions[18]);
  } else if (this.yCord === 4 && this.xCord === 3) {
    $("#description").html(descriptions[19]);
    // Forest Trap
  } else if (this.yCord === 0 && this.xCord === 4) {
    $("#description").html(descriptions[20]);
    // The Sun Stone
    this.itemCheck();
    $("#notices").html("<strong>You have picked up the sun stone!</strong>");
  } else if (this.yCord === 1 && this.xCord === 4) {
    $("#description").html(descriptions[21]);
  } else if (this.yCord === 2 && this.xCord === 4) {
    $("#description").html(descriptions[22]);
  } else if (this.yCord === 3 && this.xCord === 4) {
    $("#description").html(descriptions[23]);
    // Forest Trap
  } else if (this.yCord === 4 && this.xCord === 4) {
    $("#description").html(descriptions[24]);
    this.health += 5;
    this.days -= 5;
  } else if (this.yCord === 5 && this.xCord === 3) {
    $("#west").trigger("click");
  } else if (this.yCord === 3 && this.xCord === 5) {
    $("#south").trigger("click");
  } else {
    $("#description").html("You're incredibly lost!");
  }
};

// Winning!
Adventurer.prototype.winCheck = function() {
  if (this.yCord === 2 && this.xCord === 2 && this.item1 === true && this.item2 === true && this.item3 === true) {
    $("#description").html("<h3 class='text-center'>You have returned to the stone idol with your prize. Your stomach twists again in pain as you approach the monolith. The pain eases as you place the three gems into the empty sockets. Your vision blurs and time seems to stand still. When you open them again, you look through colors of blue, red and yellow down at yourself. The colors begin to merge as you go blind, because the gems are slowing returning to their homes. The thing that now posseses your body only smiles, before turning its back to you and leaving you alone in the darkness. <br><br>You have won.</h3><br><br><h3 class='text-center'>You won with <span id='health'></span> health and it took you <span id='days'></span> days</h3>");
    $("#footer").hide();
  }
};



// User Interface Logic


$(document).ready(function() {
  var items = [];
  var player = new Adventurer("Sierra Von Grey", 2, 2, 10, 0, false, false, false, attributeGen(), attributeGen(), attributeGen());

  $("#wit").html(player.wit);
  $("#dexterity").html(player.dex);
  $("#strength").html(player.str);

  $("#north").click(function() {
    player.north();
    $("#notices").html("");
    player.spaceCheck();
    player.forestTrap();
    player.death();
    $("#health").html(player.health);
    $("#days").html(player.days);
  });

  $("#east").click(function() {
    player.east();
    $("#notices").html("");
    player.spaceCheck();
    player.forestTrap();
    player.death();
    $("#health").html(player.health);
    $("#days").html(player.days);
  });

  $("#south").click(function() {
    player.south();
    $("#notices").html("");
    player.spaceCheck();
    player.death();
    $("#health").html(player.health);
    $("#days").html(player.days);
  });

  $("#west").click(function() {
    player.west();
    $("#notices").html("");
    player.spaceCheck();
    player.death();
    $("#health").html(player.health);
    $("#days").html(player.days);
  });



}); // End Document.Ready
