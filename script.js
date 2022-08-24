//ClASSES//
class RailRoad {
    constructor(name, minimumPrice, imageLink) {
      this.name = name;
      this.minimumPrice = minimumPrice;
      this.imageLink = imageLink;
      this.remainingInDeck = 4;
    }
    removeOneFromDeck() {
      this.remainingInDeck -= 1;
    }
  }
  
  class Town {
    constructor(specificPrice, specificType, anyPrice, imageLink,commodityImageLink) {
      this.specificPrice = specificPrice;
      this.specificType = specificType;
      this.anyPrice = anyPrice;
      this.imageLink = imageLink;
      this.inDeck = true;
      this.commodityImageLink = commodityImageLink;
    }
    removeFromDeck() {
      this.inDeck = false;
    }
  }
  
  class Building {
    constructor(
      name,
      price,
      numberInDeck,
      upgradable,
      pointChanger,
      turnChanger,
      playerChanger,
      imageLink,
      upgradedImageLink
    ) {
      this.name = name;
      this.price = price;
      this.numberInDeck = numberInDeck;
      this.upgradable = upgradable;
      this.pointChanger = pointChanger;
      this.turnChanger = turnChanger;
      this.playerChanger = playerChanger;
      this.imageLink = imageLink;
      this.upgradedImageLink = upgradedImageLink;
    }
    action() {
      //methods for the action eahc will if they have one
    }
  }
  
  class Stock{
    constructor(name, element, positionBottom, positionLeft,stockElement,imageLink){
      this.name = name;
      this.element = element;
      this.positionBottom = positionBottom;
      this.positionLeft = positionLeft;
      this.stockElement = stockElement; 
      this.imageLink = imageLink;
      this.value = 0;
    }
  }
  
  class Player{
    constructor(element,num,inAuction){
      this.element = element;
      this.num = num;
      this.inAuction = inAuction; 
      this.name = '';
      this.railRoads = [];
      this.towns = [];
      this.buildings = [];
      this.commodies = {
        wheat : 0,
        wood : 0,
        iron : 0,
        coal : 0,
        goods : 0,
        luxury : 0,
      };
      this.productionCards = [];
      this.money = 10;
      this.commodityMax = 10;
      this.handSize = 3;
      this.productionMax = 3;
    }
  }
  
  //GLOBAL VARIABLES//
  const railRoadStack = document.getElementById("cards-railroads-stack");
  const railRoadAvaiableOne = document.getElementById('cards-railroads-one');
  const railRoadAvaiableTwo = document.getElementById('cards-railroads-two');
  
  const townStack = document.getElementById("cards-towns-stack");
  const townAvaiable = document.getElementById('cards-towns-inplay')
  
  const buildingStack = document.getElementById("cards-buildings-stack");
  const buildingAvaiableOne = document.getElementById('cards-buildings-one');
  const buildingAvaiableTwo = document.getElementById('cards-buildings-two');
  const buildingAvaiableThree = document.getElementById('cards-buildings-three');
  const buildingAvaiableFour = document.getElementById('cards-buildings-four');
  
  const priceAndProduciton = document.getElementById('pp-card');
  
  const playerOneElement = document.getElementById('player-one');
  const playerTwoElement = document.getElementById('player-two');
  const playerThreeElement = document.getElementById('player-three');
  const playerFourElement = document.getElementById('player-four');
  
  const woodPNG = document.getElementById('woodpng');
  const wheatPNG = document.getElementById('wheatpng');
  const ironPNG = document.getElementById('ironpng');
  const coalPNG = document.getElementById('coalpng');
  const goodsPNG = document.getElementById('goodspng');
  const luxuryPNG = document.getElementById('luxurypng');
  
  const wheatStock = document.getElementById('stocks-wheat');
  const woodStock = document.getElementById('stocks-wood');
  const ironStock = document.getElementById('stocks-iron');
  const coalStock = document.getElementById('stocks-coal');
  const goodsStock = document.getElementById('stocks-goods');
  const luxuryStock = document.getElementById('stocks-luxury');
  
  let wheatPosBottom = getComputedStyle(document.documentElement)
  .getPropertyValue('--wheat-positionBottom');
  let wheatPosLeft = getComputedStyle(document.documentElement)
  .getPropertyValue('--wheat-positionLeft');
  let woodPosBottom = getComputedStyle(document.documentElement)
  .getPropertyValue('--wood-positionBottom');
  let woodPosLeft = getComputedStyle(document.documentElement)
  .getPropertyValue('--wood-positionLeft');
  let ironPosBottom = getComputedStyle(document.documentElement)
  .getPropertyValue('--iron-positionBottom');
  let ironPosLeft = getComputedStyle(document.documentElement)
  .getPropertyValue('--iron-positionLeft');
  let coalPosBottom = getComputedStyle(document.documentElement)
  .getPropertyValue('--coal-positionBottom');
  let coalPosLeft = getComputedStyle(document.documentElement) 
  .getPropertyValue('--coal-positionLeft');
  let goodsPosBottom = getComputedStyle(document.documentElement)
  .getPropertyValue('--goods-positionBottom');
  let goodsPosLeft = getComputedStyle(document.documentElement)
  .getPropertyValue('--goods-positionLeft');
  let luxuryPosBottom = getComputedStyle(document.documentElement)
  .getPropertyValue('--luxury-positionBottom');
  let luxuryPosLeft = getComputedStyle(document.documentElement)
  .getPropertyValue('--luxury-positionLeft');
  
  let confirmCancel = document.getElementById('confirm-cancel');
  let root = document.querySelector(':root');
  let startBtn = document.getElementById("start-button"); 
  let whosTurn = document.getElementById('whos-turn');
  let shownText = document.getElementById('showText');
  let confirmButton = document.getElementById('confirm-choice');
  let cancelButton = document.getElementById('cancel-choice');
  let numPlayers = 0;
  let railRoadRandomStack = [];
  let townRandomStack = [];
  let buildingRandomStackStart = []
  let buildingRandomStackEnd = [];
  let buildingRandomStack = [];
  let confirmed = 0;
  let productionArray = [];
  let priceArray = [];
  let howMany = document.createElement('input');
  howMany.id = 'how-many';
  let currTownAny = [];
  let counter = 0;
  let produceCounter = 0;
  let constructionCompanyTurnOne = false;
  
  let turnInput = document.createElement('input');
  turnInput.id = 'turnInput';
  let submitButton = document.createElement('div');
  submitButton.id = 'submit';
  submitButton.innerText = 'Enter';
  
  playerOneNameInput = document.getElementById('player-one-name-input');
  playerTwoNameInput = document.getElementById('player-two-name-input');
  playerThreeNameInput = document.getElementById('player-three-name-input');
  playerFourNameInput = document.getElementById('player-four-name-input');
  
  playerOneNameInput.addEventListener('click', () => {removeInnerText(playerOneNameInput)},{once:true})
  playerTwoNameInput.addEventListener('click',() => {removeInnerText(playerTwoNameInput)},{once:true})
  playerThreeNameInput.addEventListener('click',() => {removeInnerText(playerThreeNameInput)},{once:true})
  playerFourNameInput.addEventListener('click',() => {removeInnerText(playerFourNameInput)},{once:true})
  
  //OBJECT CONSTRUCTION//
  
  //STOCKS//
  let wheat = new Stock('wheat', wheatPNG, wheatPosBottom, wheatPosLeft,wheatStock, 'images/commodies/wheat.png');
  wheat.value = 1;
  let wood = new Stock('wood', woodPNG, woodPosBottom, woodPosLeft,woodStock,'images/commodies/wood.png');
  wood.value = 1;
  let iron = new Stock('iron', ironPNG, ironPosBottom, ironPosLeft,ironStock,'images/commodies/iron.png');
  iron.value = 2;
  let coal = new Stock('coal', coalPNG, coalPosBottom, coalPosLeft,coalStock,'images/commodies/coal.png');
  coal.value = 2;
  let goods = new Stock('goods', goodsPNG, goodsPosBottom, goodsPosLeft,goodsStock,'images/commodies/goods.png');
  goods.value = 3;
  let luxury = new Stock('luxury', luxuryPNG, luxuryPosBottom, luxuryPosLeft,luxuryStock,'images/commodies/luxury.png');
  luxury.value = 3;
  
  //RAIL ROADS//
  let rr1 = new RailRoad("Skunk Works", 2, "images/railroads/skunk.jpg");
  let rr2 = new RailRoad("Sly Fox", 3, "images/railroads/fox.jpg");
  let rr3 = new RailRoad("Fat Cat", 4, "images/railroads/cat.jpg");
  let rr4 = new RailRoad("Big Bear", 5, "images/railroads/bear.png");
  let rr5 = new RailRoad("Top Dog", 6, "images/railroads/dog.png");
  let rr6 = new RailRoad("Tycoon", 7, "images/railroads/tycoon.png");
  
  
  //TOWNS//
  let t1 = new Town(2, "wheat", 4, "images/towns/2-wheat.jpg", "images/commodies/wheat.png");
  let t2 = new Town(2, "wood", 4, "images/towns/2-wood.jpg", "images/commodies/wood.png");
  let t3 = new Town(2, "iron", 4, "images/towns/2-iron.jpg", "images/commodies/iron.png");
  let t4 = new Town(2, "coal", 4, "images/towns/2-coal.jpg", "images/commodies/coal.png");
  let t5 = new Town(3, "wheat", 4, "images/towns/3-wheat.jpg", "images/commodies/wheat.png");
  let t6 = new Town(3, "wood", 5, "images/towns/3-wood.jpg", "images/commodies/wood.png");
  let t7 = new Town(3, "goods", 5, "images/towns/3-goods.jpg", "images/commodies/goods.png");
  let t8 = new Town(3, "luxury", 5, "images/towns/3-luxury.jpg", "images/commodies/luxury.png");
  let t9 = new Town(4, "wheat", 6, "images/towns/4-wheat.jpg", "images/commodies/wheat.png");
  let t10 = new Town(4, "wood", 6, "images/towns/4-wood.jpg", "images/commodies/wood.png");
  let t11 = new Town(4, "iron", 6, "images/towns/4-iron.jpg", "images/commodies/iron.png");
  let t12 = new Town(4, "coal", 6, "images/towns/4-coal.jpg", "images/commodies/coal.png");
  let t13 = new Town(5, "wheat", 8, "images/towns/5-wheat.jpg", "images/commodies/wheat.png");
  let t14 = new Town(5, "wood", 8, "images/towns/5-wood.jpg", "images/commodies/wood.png");
  let t15 = new Town(5, "goods", 8, "images/towns/5-goods.jpg", "images/commodies/goods.png");
  let t16 = new Town(5, "luxury", 8, "images/towns/5-luxury.jpg", "images/commodies/luxury.png");
  
  //randomizes the town deck
  townRandomStack = [t1,t2,t3,t4,t5,t6,t7,t8,t9,t10,t11,t12,t13,t14,t15,t16];
  
  
  
  //PLAYERS
  let player1 = new Player(playerOneElement,1,true);
  let player2 = new Player(playerTwoElement,2,true);
  let player3 = new Player(playerThreeElement,3,true);
  let player4 = new Player(playerFourElement,4,true);
  let playerArray = [player1,player2,player3,player4];
  let currPlayer = player1;
  let inputText = '';
  let outCounter = 0;
  let currBid = 0;
  let originalCurrPlayer = player1;
  
  //BUILDINGS//
  let b1 = new Building("iron1",5,1,12,false,true,false,"images/buildings/iron.jpg","images/buildings/double iron.jpg");
  let b2 = new Building("luxury1",6,1,15,false,true,false,"images/buildings/luxury.jpg","images/buildings/doubleLuxury.jpg");
  let b3 = new Building("wood1",4,1,9,false,true,false,"images/buildings/wood.jpg","images/buildings/doubleWood.jpg");
  let b4 = new Building("wheat1",4,1,9,false,true,false,"images/buildings/wheat.jpg","images/buildings/doubleWheat.jpg");
  let b5 = new Building("coal1",5,1,12,false,true,false,"images/buildings/coal.jpg","images/buildings/doubleCoal.jpg");
  let b6 = new Building("goods1",6,1,15,false,true,false,"images/buildings/goods.jpg","images/buildings/doubleGoods.jpg");
  
  let b7 = new Building("coal&iron",10,1,false,false,true,false,"images/buildings/coal&iron.jpg",false);
  let b8 = new Building("goods&luxury",10,1,false,false,true,false,"images/buildings/good&luxury.jpg",false);
  let b9 = new Building("wheat&wood",10,1,false,false,true,false,"images/buildings/wood&wheat.jpg",false);
  
  let b10 = new Building("Cottage Industry",30,1,false,false,false,true,"images/buildings/cottageIndustry.jpg",false);
  let b11 = new Building("Warehouse",10,2,false,false,false,true,"images/buildings/warehouse.jpg",false);
  let b12 = new Building("Factory",40,2,false,false,false,true,"images/buildings/factory.jpg",false);
  let b13 = new Building("Smuggler",20,1,false,false,false,true,"images/buildings/smuggler.jpg",false);
  let b14 = new Building("Black Market",30,1,false,false,false,true,"images/buildings/blackMarket.jpg",false);
  
  let b15 = new Building("Mayors Office",30,1,false,true,false,false,"images/buildings/mayorsOffice.jpg",false);
  let b16 = new Building("Bank",30,1,false,true,false,false,"images/buildings/bank.jpg",false);
  let b17 = new Building("Rail Baron",30,1,false,true,false,false,"images/buildings/railBaron.jpg",false);
  let b18 = new Building("Govenors Mansion",30,1,false,true,false,false,"images/buildings/govenorsMansion.jpg",false);
  
  let b19 = new Building("Export Company",30,1,false,false,true,false,"images/buildings/exportCompany.jpg",false);
  let b20 = new Building("Brick Works",25,1,false,false,true,false,"images/buildings/brickWorks.jpg",false);
  let b21 = new Building("Construction Company",20,1,false,false,true,false,"images/buildings/constructionCompany.jpg",false);
  let b23 = new Building("Auction House",15,1,false,false,true,false,"images/buildings/auctionHouse.jpg",false);
  let b24 = new Building("Freight Company",25,1,false,false,true,false,"images/buildings/freightCompany.jpg",false);
  
  let b25 = new Building("Factory",40,2,false,false,false,true,"images/buildings/factory.jpg",false);
  let b26 = new Building("Warehouse",10,2,false,false,false,true,"images/buildings/warehouse.jpg",false);
  
  //FRONT END FUNCTIONS
  const removeInnerText = (element) => {
    element.value = '';
  }
  const refillSlot = (containerWithImage, endContainer, newCard) => {
  
    containerWithImage.addEventListener('animationend',function(){
      moveCardFunc(containerWithImage, endContainer, newCard)
    });
  
    //function to recieve an element with solely an image in it, and another image that will be on the reverse side
    
    //creates a new element that is an image
    let newImage = document.createElement("img");
    
    // assigns that new element an src of what ever the next railroad is
    newImage.src = newCard.imageLink;
    
    //gives the same styling to the second image as the first one has
    newImage.classList.add("flip-card-styling");
    
    //initiated the old image to the front side of the card
    containerWithImage.children[0].classList.add("front");
    
    //initiated the new image to the back side of the flip by rotating it 180 degrees;
    newImage.classList.add("back");
    
    //appends the new image to the container
    containerWithImage.appendChild(newImage);
    
    //flip both of the inside images at the same time
    containerWithImage.classList.add("flipCard");
    
  }
  const moveCardFunc = (startContainer, endContainer, newCard) => {
    startContainer.addEventListener('animationend',function(){
      setMovedCard(startContainer,endContainer,newCard);
    });
    //here is where you would add some code to make the flipped cards stay flipped/
    startContainer.children[1].classList.remove('back');
  
    //obtain the differnce between where the image is now, and where it needs to be moved to
    startRect = startContainer.getBoundingClientRect(); 
    let startPosX = startRect.x;
    let startPosY = startRect.y;
  
    endRect = endContainer.getBoundingClientRect(); 
    let endPosX = endRect.x;
    let endPosY = endRect.y;
  
    let moveX = endPosX - startPosX;
    let moveY = endPosY - startPosY;
  
    root.style.setProperty('--cardEndX', Number(moveX));
    root.style.setProperty('--cardEndY', Number(moveY));
  
    startContainer.classList.add('move-card');
  
  }
  const setMovedCard = (startContainer,endContainer,newCard) => {
    startContainer.classList.remove('flipCard', 'move-card');
  
    //removes the hidden attribute of back
    startContainer.children[1].classList.remove('back');
  
    //adds the created imaged to the end contaier post flip and move
    endContainer.appendChild(startContainer.children[1]);
  
  //  startContainer.replaceWith(startContainer.cloneNode(true));
  //  console.log('it runs');
  
  }
  const moveCommodity = (pieceObject,amount,movingUp) => {
    // INPUT: a stock element piece as a variable, and a boonlean to wether its going up or down
  for(let i = 0; i < amount; i++){
    let currBottom = Number(getComputedStyle(document.documentElement).getPropertyValue(`--${pieceObject.name}-positionBottom`).slice(0,-2));
    let currLeft = getComputedStyle(document.documentElement).getPropertyValue(`--${pieceObject.name}-positionLeft`);
    if(currBottom === 0 && !movingUp){break};
    if(currBottom > 222 && movingUp){break};
  
    //get the current positon of that commidty and store it in variables as the start position for the keyframe
  // Number(pieceObject.positionBottom.slice(0,-2));
  // pieceObject.positionLeft;
    
    //create new corresponding values based on the starting ones for the end value of the keyframe
    //if the left value === 28, make it 55.
    //if the left value === 55, make it 28.
  
    let newLeft = '';
    if(currLeft === '28px'){
      newLeft = '62px';
    }else{
      newLeft = '28px';
    }
  
    // if its going up, increase the bottom value by 15px(about)
    // if its going down , decrease the bottom value by 15px(about)
    let newBottom = '';
    if(movingUp){
      currBottom += 21;
      newBottom = `${currBottom}px`;
    }else{
      currBottom -= 21;
      newBottom = `${currBottom}px`;
    }
    
    // apply these new variables to the variables inside css
    // root.style.setProperty('--commodity-StartBottom',pieceObject.positionBottom);
    // root.style.setProperty('--commodity-StartLeft',pieceObject.positionLeft);
    // root.style.setProperty('--commodity-EndBottom',newBottom);
    // root.style.setProperty('--commodity-EndLeft',newLeft);
  
  
    //apply the moveStock class with the updated variables to the correspoidning png
    // pieceObject.element.classList.add('moveStock');
  
    //save the png's position as the end value variables
      root.style.setProperty(`--${pieceObject.name}-positionBottom`,newBottom);
      root.style.setProperty(`--${pieceObject.name}-positionLeft`,newLeft);
  
    }
  }
  function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
  const afterMoveCommodity = (pieceObject) => {
    pieceObject.element.classList.remove('moveStock');
  }
  
  
  //BACKEND FUNCTIONs
  const changeCurrPlayer = (currPlayer) =>{
    //runs when evr a full player change happens(mainly used to change player in auctions without actually changing the players turn)
    if(counter === 0){
      removeEventListeners();
      constructionCompanyTurnOne = false;
      currTownAny = [] ;
      commodityMaxCheck()
      produceCounter = 0;
      currPlayer.element.children[1].innerText = currPlayer.money;
      addEventListeners();
      revertConfirmCancel();
      revertUI();
      organizeCommodies();
      whosTurn.innerText = `${currPlayer.name} plays`; 
      }
  
      //changes the current player to the next accoring to how many players there are
    currPlayer.element.children[1].innerText = currPlayer.money;
    if(numPlayers === 2){
      if(currPlayer === player1){
        currPlayer = player2;
        player1.element.classList.replace('currPlayer','player');
        player2.element.classList.replace('player','currPlayer');
      }else{    
        currPlayer = player1;
        player2.element.classList.replace('currPlayer','player');
        player1.element.classList.replace('player','currPlayer');
      }
    }else if(numPlayers === 3){
      if(currPlayer === player1){
        currPlayer = player2;
        player1.element.classList.replace('currPlayer','player');
        player2.element.classList.replace('player','currPlayer');
      }else if(currPlayer === player2){
        currPlayer = player3;
        player2.element.classList.replace('currPlayer','player');
        player3.element.classList.replace('player','currPlayer');
      }else{
        currPlayer = player1;
        player3.element.classList.replace('currPlayer','player');
        player1.element.classList.replace('player','currPlayer');
      }
    }else{
      if(currPlayer === player1){
        currPlayer = player2;
        player1.element.classList.replace('currPlayer','player');
        player2.element.classList.replace('player','currPlayer');
      }else if(currPlayer === player2){
        currPlayer = player3;
        player2.element.classList.replace('currPlayer','player');
        player3.element.classList.replace('player','currPlayer');
      }else if(currPlayer === player3){
        currPlayer = player4;
        player3.element.classList.replace('currPlayer','player');
        player4.element.classList.replace('player','currPlayer');
      }else{
        currPlayer = player1;
        player4.element.classList.replace('currPlayer','player');
        player1.element.classList.replace('player','currPlayer');
      }
    }
  
  return currPlayer;
  }
  const submit = () =>{
    //used to delete the inside of the text boxes bnefore you typoe in it
    inputText = turnInput.value;
  }
  const gameOverCheck = () => {
    //checks for if the game ends
    if(townRandomStack.length === 0 || railRoadRandomStack.length === 0){
      return true;
    }else{return false};
  }
  const countPoints = (player) => {
  
    //adds up the poiunts of the current player
    let total = 0;
    let skunkWorks = player.railRoads.filter(rr => rr.name === 'Skunk Works');
    console.log(skunkWorks);
    if(skunkWorks.lengh === 1){total += 2}
    if(skunkWorks.lengh === 2){total += 5}
    if(skunkWorks.lengh === 3){total += 9}
    if(skunkWorks.lengh === 4){total += 15}
  
    let slyFox = player.railRoads.filter(rr => rr.name === 'Sly Fox');
    console.log(slyFox);
    if(slyFox.lengh === 1){total += 2}
    if(slyFox.lengh === 2){total += 5}
    if(slyFox.lengh === 3){total += 10}
    if(slyFox.lengh === 4){total += 17}
  
    let fatCat = player.railRoads.filter(rr => rr.name === 'Fat Cat');
    console.log(fatCat);
    if(fatCat.lengh === 1){total += 3}
    if(fatCat.lengh === 2){total += 7}
    if(fatCat.lengh === 3){total += 12}
    if(fatCat.lengh === 4){total += 19}
  
    let bigBear = player.railRoads.filter(rr => rr.name === 'Big Bear');
    console.log(bigBear);
    if(bigBear.lengh === 1){total += 3}
    if(bigBear.lengh === 2){total += 7}
    if(bigBear.lengh === 3){total += 13}
    if(bigBear.lengh === 4){total += 21}
  
    let topDog = player.railRoads.filter(rr => rr.name === 'Top Dog');
    console.log(topDog);
    if(topDog.lengh === 1){total += 4}
    if(topDog.lengh === 2){total += 9}
    if(topDog.lengh === 3){total += 15}
    if(topDog.lengh === 4){total += 23}
  
    let tycoon = player.railRoads.filter(rr => rr.name === 'Tycoon');
    console.log(tycoon);
    if(tycoon.lengh === 1){total += 4}
    if(tycoon.lengh === 2){total += 9}
    if(tycoon.lengh === 3){total += 16}
    if(tycoon.lengh === 4){total += 25}
  
    for(let i = 0; i < player.towns.length; i++){
      total += player.towns[i].specificPrice;
    }
  
    if(player.towns.length <= player.railRoads.lengh){total += (player.towns.length * 2)}
    if(player.towns.length > player.railRoads.lengh){total += (player.railRoads.length * 2)}
  
    total += player.buildings.length;
  
    if(searchForBuilding('Mayors Office')){total += player.buildings.length}
    if(searchForBuilding('Bank')){total += Math.floor(player.money / 20)}
    if(searchForBuilding('Rail Baron')){total += player.railRoads.length}
    if(searchForBuilding('Govenors Mansion')){total += player.towns.length}
  
    player.total = total;
  
  
  
  }
  const skipExtraTurn = () => {
    // skps the extra turn given to some of the buildings
    currPlayer = changeCurrPlayer(currPlayer);
  }
  const displayResults = () => {
    
    //activeates when the game is over and shows the results accdoringly
    confirmCancel.style.opacity  =  0;
    revertUI();
    document.getElementById('UI').innerHTML = '';
    removeEventListeners();
    let winningPoints = 0;
    let winner = '';
    console.log(winningPoints);
  
  
    //finds the winning players
    for(let i = 0; i < numPlayers; i++){
      currPlayer = playerArray[i];
      countPoints(currPlayer);
      if(playerArray[i].total > winningPoints){
        winner = playerArray[i]
        winningPoints = playerArray[i].total;
      };
  
    }
  
    //displays the winnning players name
    shownText.innerText = `${winner.name} Wins!`;
    shownText.style.fontSize = '50px';
    document.getElementById('UI').appendChild(shownText);
  
  
    //shows the score board depending on how many people are in the game
    if(numPlayers === 2){
      removeEventListeners();
    let playerOnePoints =   document.createElement('div');
    playerOnePoints.innerText = `${player1.name} scored ${player1.total} points`
    playerOnePoints.classList.add('playerWin')
    document.getElementById('UI').appendChild(playerOnePoints)
  
    let playerTwoPoints =   document.createElement('div');
    playerTwoPoints.innerText = `${player2.name} scored ${player2.total} points`
    playerTwoPoints.classList.add('playerWin')
    document.getElementById('UI').appendChild(playerTwoPoints)
    }
  
    if(numPlayers === 3){
      removeEventListeners();
  
      let playerOnePoints =   document.createElement('div');
      playerOnePoints.innerText = `${player1.name} scored ${player1.total} points`
      playerOnePoints.classList.add('playerWin')
      document.getElementById('UI').appendChild(playerOnePoints)
    
      let playerTwoPoints =   document.createElement('div');
      playerTwoPoints.innerText = `${player2.name} scored ${player2.total} points`
      playerTwoPoints.classList.add('playerWin')
      document.getElementById('UI').appendChild(playerTwoPoints)
  
      let playerThreePoints =   document.createElement('div');
      playerThreePoints.innerText = `${player3.name} scored ${player3.total} points`
      playerThreePoints.classList.add('playerWin')
      document.getElementById('UI').appendChild(playerThreePoints)
      }
  
      if(numPlayers === 4){
        removeEventListeners();
        let playerOnePoints =   document.createElement('div');
        playerOnePoints.innerText = `${player1.name} scored ${player1.total} points`
        playerOnePoints.classList.add('playerWin')
        document.getElementById('UI').appendChild(playerOnePoints)
      
        let playerTwoPoints =   document.createElement('div');
        playerTwoPoints.innerText = `${player2.name} scored ${player2.total} points`
        playerTwoPoints.classList.add('playerWin')
        document.getElementById('UI').appendChild(playerTwoPoints)
    
        let playerThreePoints =   document.createElement('div');
        playerThreePoints.innerText = `${player3.name} scored ${player3.total} points`
        playerThreePoints.classList.add('playerWin')
        document.getElementById('UI').appendChild(playerThreePoints)
  
        let playerFourPoints =  document.createElement('div');
        playerFourPoints.innerText = `${player4.name} scored ${player4.total} points`
        playerFourPoints.classList.add('playerWin')
        document.getElementById('UI').appendChild(playerFourPoints)
      }
  
  }
  
  
  const confirmBuyBuildingOne = () =>{
    revertConfirmCancel();
  
    //shows the option to either confirm that choice or cancel it
    confirmCancel.style.opacity = 1 ;
  
    //reoves lisenetrs from the board to avoid breaking
    removeEventListeners();
  
    //adds a listener to the confirm button that will run the auction function for the first avalable railroad
    confirmButton.addEventListener('click', () => {buyBuildings(buildingAvaiableOne, 0)},{once:true});
    cancelButton.addEventListener('click',() => {
      if(searchForBuilding('Construction Company') && constructionCompanyTurnOne){
        confirmCancel.innerHTML = '';
        let skipButton = document.createElement('div');
        skipButton.id = 'skip-button';
        confirmCancel.appendChild(skipButton);
        skipButton.innerText = 'Skip';
        skipButton.addEventListener('click', skipExtraTurn);
      }else{addEventListeners}
    });
  }
  const confirmBuyBuildingTwo = () =>{
    revertConfirmCancel();
  
    //shows the option to either confirm that choice or cancel it
    confirmCancel.style.opacity = 1 ;
  
    //reoves lisenetrs from the board to avoid breaking
    removeEventListeners();
  
    //adds a listener to the confirm button that will run the auction function for the first avalable railroad
    confirmButton.addEventListener('click', () => {buyBuildings(buildingAvaiableTwo, 1)},{once:true});
    cancelButton.addEventListener('click',() => {
      if(searchForBuilding('Construction Company') && constructionCompanyTurnOne){
        confirmCancel.innerHTML = '';
        let skipButton = document.createElement('div');
        skipButton.id = 'skip-button';
        confirmCancel.appendChild(skipButton);
        skipButton.innerText = 'Skip';
        skipButton.addEventListener('click', skipExtraTurn);
      }else{addEventListeners}
    });
  }
  const confirmBuyBuildingThree = () =>{
    revertConfirmCancel();
    //shows the option to either confirm that choice or cancel it
    confirmCancel.style.opacity = 1 ;
  
    //reoves lisenetrs from the board to avoid breaking
    removeEventListeners();
  
    //adds a listener to the confirm button that will run the auction function for the first avalable railroad
    confirmButton.addEventListener('click', () => {buyBuildings(buildingAvaiableThree, 2)},{once:true});
    cancelButton.addEventListener('click',() => {
      if(searchForBuilding('Construction Company') && constructionCompanyTurnOne){
        confirmCancel.innerHTML = '';
        let skipButton = document.createElement('div');
        skipButton.id = 'skip-button';
        confirmCancel.appendChild(skipButton);
        skipButton.innerText = 'Skip';
        skipButton.addEventListener('click', skipExtraTurn);
      }else{addEventListeners}
    });
  }
  const confirmBuyBuildingFour = () =>{
    revertConfirmCancel();
    //shows the option to either confirm that choice or cancel it
    confirmCancel.style.opacity = 1 ;
  
    //reoves lisenetrs from the board to avoid breaking
    removeEventListeners();
  
    //adds a listener to the confirm button that will run the auction function for the first avalable railroad
    confirmButton.addEventListener('click', () => {buyBuildings(buildingAvaiableFour, 3)},{once:true});
    cancelButton.addEventListener('click',() => {
      if(searchForBuilding('Construction Company') && constructionCompanyTurnOne){
        confirmCancel.innerHTML = '';
        let skipButton = document.createElement('div');
        skipButton.id = 'skip-button';
        confirmCancel.appendChild(skipButton);
        skipButton.innerText = 'Skip';
        skipButton.addEventListener('click', skipExtraTurn);
      }else{addEventListeners}
    });
  }
  const buyBuildings = (building, num) => {
  
    //ran once the confirm button is clicked on any given building\
  
    //checks if the player has enough money
    if(currPlayer.money >= buildingRandomStack[num].price){
  
      //check for special buildings and adjusts the players object accordingly
      if(buildingRandomStack[num].name === "Warehouse"){currPlayer.commodityMax += 3};
      if(buildingRandomStack[num].name === "Black Market"){
        if (currPlayer.handSize === 3){
          currPlayer.handSize = 5;
          createProductionCard();
          createProductionCard();
        }else if(currPlayer.handSize === 4){
          currPlayer.handSize = 5;
          createProductionCard();
        }
      };
      if(buildingRandomStack[num].name === "Smuggler"){
        if(currPlayer.handSize === 3){
          currPlayer.handSize = 4;
          createProductionCard();
        }
      }
      if(buildingRandomStack[num].name === "Factory"){currPlayer.productionMax = 5}
      if(buildingRandomStack[num].name === "Cottage Industry"){currPlayer.productionMax = 4}; 
  
      //increases players commodity size when evr they buy a building
      currPlayer.commodityMax += 1;
  
      //gives the purchasing player that building
      currPlayer.buildings.push(buildingRandomStack[num]);
  
      //pays foir the building
      currPlayer.money -= buildingRandomStack[num].price;
  
      //replaces the one that weas purchased with the next in the array and then removes that onbe from the array
      buildingRandomStack.splice(num, 1, buildingRandomStack[4]);
      buildingRandomStack.splice(4,1);
  
      //updates that players money
      currPlayer.element.children[1].innerText = currPlayer.money;
  
      //gives it new styling and gives the player the card on the front end
      building.children[0].classList.replace('flip-card-styling','playerBuilding');
      currPlayer.element.children[5].appendChild(building.children[0]);
  
     // adds the ability to upgrade specific buildings
      if(currPlayer.buildings[currPlayer.buildings.length-1].upgradable){
        currPlayer.element.children[5].lastElementChild.addEventListener('click', () => {upgrade(currPlayer.buildings[0],currPlayer.buildings.length-1)});
      }
  
      //checks if there are any left in the bulding deck and if so, replenishes it, if not it stops
      if(buildingRandomStack.length>4){
      let newImage = document.createElement('img'); 
      newImage.src = buildingRandomStack[num].imageLink;
      newImage.classList.add('flip-card-styling')
      building.appendChild(newImage);
      };
  
      //check for a building that would let that player buy another one and if it does, it redoes the buying building process
      if(searchForBuilding('Construction Company') && !constructionCompanyTurnOne){
        shownText.innerText = 'You may purchase a second building or click skip';
        confirmCancel.innerHTML = '';
        let skipButton = document.createElement('div');
        skipButton.id = 'skip-button';
        confirmCancel.appendChild(skipButton);
        skipButton.innerText = 'Skip';
        skipButton.addEventListener('click', skipExtraTurn);
        constructionCompanyTurnOne = true;
        buildingAvaiableOne.addEventListener('click',confirmBuyBuildingOne);
        buildingAvaiableTwo.addEventListener('click',confirmBuyBuildingTwo);
        buildingAvaiableThree.addEventListener('click',confirmBuyBuildingThree);
        buildingAvaiableFour.addEventListener('click',confirmBuyBuildingFour);
      }else{currPlayer = changeCurrPlayer(currPlayer)};
    }else{
  
      //case for when the player does not have enough money
      shownText.innerText = 'You Are Broke. Do something else.'
      addEventListeners();
      revertConfirmCancel();
      revertUI();
    }
  }
  const upgrade = (building,num,event) => {
  
  //function used to upgrade a building if allowed
    if(currPlayer.money >= building.upgradable){
    building.name = building.name.replace('1','2');
    currPlayer.element.children[5].children[0].src = building.upgradedImageLink;
    currPlayer.money -= building.upgradable;
    currPlayer = changeCurrPlayer(currPlayer);
    }else{
      shownText.innerText = 'You Are Broke. Do Something Else';
    }
  }
  const searchForBuilding = (buildingName) => {
  
    //intakes a building and retures a boolean depeing on if the current player has that building in their hand
    for(let i = 0; i < currPlayer.buildings.length; i++){
      console.log(currPlayer.buildings[i].name, buildingName)
      if(currPlayer.buildings[i].name === buildingName){
        return true;
      }
    }
    return false;
  }
  //railroads
  const confirmRailRoadOne = (event) =>{
    //saves whos started the auction
    originalCurrPlayer = currPlayer;
  
    //shows the option to either confirm that choice or cancel it
    confirmCancel.style.opacity = 1 ;
  
    //reoves lisenetrs from the board to avoid breaking
    removeEventListeners();
  
    //adds a listener to the confirm button that will run the auction function for the first avalable railroad
    confirmButton.addEventListener('click', buyRailRoadOne,{once:true});
    cancelButton.addEventListener('click',addEventListeners);
  
  }
  const buyRailRoadOne = (event) =>{
  
    //auctionHouse
    let originalCurrPlayer = currPlayer;
    for(let i = 0; i < playerArray.length; i++){
      currPlayer = playerArray[i];
      if(searchForBuilding('Auction House')){
        playerArray[i].money += 5;
        playerArray[i].element.children[1].innerText = playerArray[i].money;
      }
    }
    currPlayer = originalCurrPlayer;
    //once that comfirm buytton has been clicked, it is hidden until it is needed again 
    confirmCancel.style.opacity = 0;
  
    //chanegs the UI to show what the bid is at and whos turn it is to bid
    shownText.innerText = `Current Bid: $${currBid}
    ${currPlayer.name} Enter Your Bid Amount or Enter Out to be Out: `;
  
    document.getElementById('UI').appendChild(turnInput);
    document.getElementById('UI').appendChild(submitButton);
  
    //removes event listeners to avoid breaking
    removeEventListeners();
  
    console.log('end of buy railroad two')
    oldElement = document.getElementById('submit');
    newElement = oldElement.cloneNode(true);
    oldElement.parentNode.replaceChild(newElement, oldElement);
    // adds so that when the enter button under the input div is clicked, it runs an auction round with what evr information is inside the input div
    document.getElementById('submit').addEventListener('click', function(){auctionRound(0, railRoadAvaiableOne)});
  }
  const confirmRailRoadTwo = (event) =>{
  
    //saves whos started the auction
    originalCurrPlayer = currPlayer;
  
    //shows the option to either confirm that choice or cancel it
    confirmCancel.style.opacity = 1 ;
  
    //reoves lisenetrs from the board to avoid breaking
    removeEventListeners();
  
    //adds a listener to the confirm button that will run the auction function for the first avalable railroad
    confirmButton.addEventListener('click', buyRailRoadTwo,{once:true});
    cancelButton.addEventListener('click',addEventListeners);
  
  }
  const buyRailRoadTwo = (event) =>{
  
    //auctionHouse
    let originalCurrPlayer = currPlayer;
    for(let i = 0; i < playerArray.length; i++){
      currPlayer = playerArray[i];
      if(searchForBuilding('Auction House')){
        playerArray[i].money += 5;
        playerArray[i].element.children[1].innerText = playerArray[i].money;
      }
    }
    currPlayer = originalCurrPlayer;
  
    //once that comfirm buytton has been clicked, it is hidden until it is needed again 
    confirmCancel.style.opacity = 0;
  
    //chanegs the UI to show what the bid is at and whos turn it is to bid
    shownText.innerText = `Current Bid: $${currBid}
    ${currPlayer.name} Enter Your Bid Amount or Enter Out to be Out: `;
  
    document.getElementById('UI').appendChild(turnInput);
    document.getElementById('UI').appendChild(submitButton);
  
    //removes event listeners to avoid breaking
    removeEventListeners();
  
    console.log('end of buy railroad one')
    oldElement = document.getElementById('submit');
    newElement = oldElement.cloneNode(true);
    oldElement.parentNode.replaceChild(newElement, oldElement);
    // adds so that when the enter button under the input div is clicked, it runs an auction round with what evr information is inside the input div
    document.getElementById('submit').addEventListener('click', function(){auctionRound(1, railRoadAvaiableTwo)});
  }
  const auctionRound = (whichRailRoad,whichRailRoadElement) => {
    console.log(railRoadRandomStack)
  
    console.log('start of auctionOne')
    //takes the value inside the input div and attaches it to a variables
    inputText = turnInput.value;
    console.log(inputText);
    /// makes the input div empty so the next user doesnt have to delete it
    turnInput.value = '';
  
    //main if statment that runs each time the thew submut button is clicked and it evaluates the value inside of the input div
    if(inputText === 'out' || inputText === 'Out' || inputText === 'OUT'){ // case for when that player wants out of the bid
      console.log('first line inside of out if statment');
      // increase a counter keeping track of how many people are left in the bif
      outCounter++;
  
      //flags that player as out of the bid
      currPlayer.inAuction = false;
  
      counter = 0;
      do{
        counter++;
        console.log('inside out do whiile loop');
        currPlayer = changeCurrPlayer(currPlayer);
      }while(currPlayer.inAuction === false && counter < 5);
      counter = 0;
  
      console.log(outCounter);
        if(outCounter === numPlayers - 1){ // whenever someone drops out, this line checks if there is only one player reaming
          console.log('inside outCounter check but before for loop')
          for(let i = 0; i < numPlayers; i++){
            console.log('first line inside for loop' , playerArray[i].inAuction)
          if(playerArray[i].inAuction === true){//when there is only one remaing, it searches for the player that hasnt been flagged out, and uses them for winning actions
            
            //resets event listener for submit buitton so it doesnt run multiple times
  
            console.log('first line inside when it found a winning player')
            //makes the player pay
            playerArray[i].money -= currBid;
  
            //restes the bid for the next auction
            currBid = 0;
            outCounter = 0;
  
            //pushes the railtroad that winner won onto that players railroad array
            playerArray[i].railRoads.push(railRoadRandomStack[whichRailRoad]);
          
            railRoadRandomStack.splice(whichRailRoad, 1,railRoadRandomStack[2]);
            railRoadRandomStack.splice(2,1);
  
            //refils the available slot with a new railroad from the rest of the deck
  
            whichRailRoadElement.children[0].classList.replace('flip-card-styling','playerRailRoad');
  
            //updaes the p;layers front end mondey
            playerArray[i].element.children[1].innerText = playerArray[i].money;
  
            //moves the img div from the avaible rail road slot to the players railroads
            playerArray[i].element.children[2].appendChild(whichRailRoadElement.children[0]);
  
            //creates the new image div and adds it to the aviable railroad slot
            if(railRoadRandomStack.length > 2){
            let newImage = document.createElement('img'); 
            newImage.src = railRoadRandomStack[whichRailRoad].imageLink;
            newImage.classList.add('flip-card-styling')
            whichRailRoadElement.appendChild(newImage);
            }else{
              displayResults();
              return; 
            removeEventListeners();
          }
            addEventListeners();
            //retuns the UI to the base one
            revertUI();
  
            if(playerArray[i] === originalCurrPlayer){//case for when the player that won the auction started the auction
              console.log('first line inside turn assigment one when original player won, currPlayer and OrigianlCurrPlayer respeectively', currPlayer, originalCurrPlayer);
              currPlayer = changeCurrPlayer(originalCurrPlayer);
            }else{
              addEventListeners();
              console.log('first line inside turn assigment one when original player lost, currPlayer and OrigianlCurrPlayer respeectively', currPlayer, originalCurrPlayer);
              console.log('originalCurrPlayer:',originalCurrPlayer)
              currPlayer.element.classList.replace('currPlayer','player');
              originalCurrPlayer.element.classList.replace('player','currPlayer');
              currPlayer = originalCurrPlayer;
              console.log('newcurrPlayer', currPlayer)
              whosTurn.innerText = `${currPlayer.name} plays`; 
            }//case for when ever someone else won it and they get their turn back
          }
        }
        for(let i = 0; i < numPlayers; i++){//after some one wins, returns everyone back to the 'inAuction' state so they will all be in the next one
          console.log('inside loop to set in acution back to true')
          playerArray[i].inAuction = true;
        }
      }
    }else if(Number(inputText) > currBid && Number(inputText) <= currPlayer.money){
  
       // case when someone bids higher than the previous
      console.log('first line inside normal bid')
      //updates the current bid
      currBid = Number(inputText);
  
      //moves the player to the next player to bid
      counter = 1;
      currPlayer = changeCurrPlayer(currPlayer);
      counter = 0;
  
      //copunter to avoid an infinite loop
      //loops until it finds a player that is still in the bid
      while(currPlayer.inAuction === false && counter < 5 ){
        counter++;//counter to avoid infinte loop
        currPlayer = changeCurrPlayer(currPlayer);
          }
      counter = 0;//resets the saefty counter
  
      console.log('right before buy railroad one is called again');
      shownText.innerText = `Current Bid: $${currBid}
      ${currPlayer.name} Enter Your Bid Amount or Enter Out to be Out: `; // calls rail road one again to keep the auciton going ONLY WHEN someone hasnt won.
    }else{
      console.log('first line inside else for invalid bid')
      console.log(inputText);
      shownText.innerText = 'Invalid bid';
    }
  }
  
  //towns
  const confirmBuyTown = () => {
      //shows the option to either confirm that choice or cancel it
      let anyCommodity = document.createElement('div');
      anyCommodity.id = 'any-choice';
      anyCommodity.innerText = `Any ${townRandomStack[0].anyPrice}`
  
      confirmCancel.appendChild(anyCommodity);
  
      //confirmButton.id = 'specific-choice';
      let currTownCommodity = document.createElement('img');
      currTownCommodity.src = townRandomStack[0].commodityImageLink;
      currTownCommodity.id = 'specific-commodity'
  
      confirmButton.innerText = `${townRandomStack[0].specificPrice}`;
      confirmButton.appendChild(currTownCommodity);
  
      confirmCancel.style.opacity = 1 ;
    
      //reoves lisenetrs from the board to avoid breaking
      removeEventListeners();
    
      //adds a listener to the confirm button that will run the auction function for the first avalable railroad
      anyCommodity.addEventListener('click', buyTownRandom,{once:true});
      confirmButton.addEventListener('click', buyTownSpecific,{once:true});
      cancelButton.addEventListener('click',() => {
        confirmCancel.style.opacity = 0 ;
        confirmButton.innerText = 'Confirm';
        revertConfirmCancel();
        addEventListeners();
      },{once:true});
  }
  const buyTownSpecific = () =>{
  
    let price = townRandomStack[0].specificPrice;
    if(searchForBuilding('Brick Works')){price -= 1}
    if(currPlayer.commodies[townRandomStack[0].specificType] >= price){
  
      //removes the commodies from that player
      currPlayer.commodies[townRandomStack[0].specificType] -= price;
  
      //gives that player the town they bought while also refilling the original spot
      currPlayer.towns.push(townRandomStack.shift());
      townAvaiable.children[0].classList.replace('flip-card-styling','playerTown' )
      currPlayer.element.children[3].appendChild(townAvaiable.children[0]);
  
      //creates a new div with the image of the new on top town
      if(townRandomStack.length>1){
      let newImage = document.createElement('img');
      newImage.classList.add('flip-card-styling');
      newImage.src = townRandomStack[0].imageLink;
      townAvaiable.appendChild(newImage);
      }else{
        displayResults();
        return;
      }
  
      confirmCancel.style.opacity = 0 ;
      currPlayer = changeCurrPlayer(currPlayer);
    }else{  
    shownText.innerText = `You dont have enough ${townRandomStack[0].specificType}. Do something else.`;
    confirmCancel.style.opacity = 0 ;
    addEventListeners();
    revertConfirmCancel();
  };
  
  
  }
  const buyTownRandom = () => {
    const buyTownRandomHelper = (commodity, commodityStr) => {
      //function to display the players commodies
      for(let i = 0; i < currPlayer.commodies[commodityStr]; i++){
        let newImage = document.createElement('img');
        newImage.src = commodity.imageLink;
        newImage.classList.add('playerCommodity');
        newImage.classList.add('scale-up2');
        document.getElementById('UI-show-commodies').appendChild(newImage);
        newImage.addEventListener('click', () => {sellCommodityForTown(commodityStr)},{once:true});
      }
    }
    let total = 0;
    //adds up if that player has enough commodies to buy it for any commodity
    for (const property in currPlayer.commodies){
      total += currPlayer.commodies[property];
    }
    if(total >= townRandomStack[0].anyPrice){
      removeEventListeners();
  
      //resets the UI and displays the commodies
      document.getElementById('UI').innerHTML = '';
      document.getElementById('UI').id = 'UI-show-commodies';
      shownText.innerText = `Choose ${townRandomStack[0].anyPrice} commodies: `;
      document.getElementById('UI-show-commodies').appendChild(shownText);
  
      buyTownRandomHelper(wheat,'wheat');
      buyTownRandomHelper(wood,'wood');
      buyTownRandomHelper(iron,'iron');
      buyTownRandomHelper(coal,'coal');
      buyTownRandomHelper(goods,'goods');
      buyTownRandomHelper(luxury,'luxury');
  
    }else{
      revertConfirmCancel();
      addEventListeners();
      shownText.innerText = 'Not enough commodies. Do something else.'
    }
  }
  const sellCommodityForTown = (commodity) => {
  
    //creates aa price to buy the cmooidty
    let price = townRandomStack[0].anyPrice;
  
    //if the player has a specific building then it will reduce the price by 1
    if(searchForBuilding('Brick Works')){price -= 1 };
    currTownAny.push(commodity);
    if(currTownAny.length === price){
  
      //loop to reduce the players commodies by how many theyre paying
      for(let i = 0; i < currTownAny.length; i++){
        currPlayer.commodies[currTownAny[i]] -= 1;
      }
  
      // gives that player the town and replenishes it
      currPlayer.towns.push(townRandomStack.shift());
      townAvaiable.children[0].classList.replace('flip-card-styling','playerTown' )
      currPlayer.element.children[3].appendChild(townAvaiable.children[0]);
  
      //creates a new div with the image of the new on top town
      if(townRandomStack.length>0){
        let newImage = document.createElement('img');
        newImage.classList.add('flip-card-styling');
        newImage.src = townRandomStack[0].imageLink;
        townAvaiable.appendChild(newImage);
        }else{
          //case for when the game is over
          displayResults();
          return;
        }
      confirmCancel.style.opacity = 0 ;
  
      revertConfirmCancel();
      revertUI();
      organizeCommodies();
      currPlayer = changeCurrPlayer(currPlayer);
    }else{shownText.innerText = `Choose ${price - currTownAny.length} commodies: `}
  }
  
  //price and proiduction
  const produceChoice = () => {
    produceCounter = 0;
    removeEventListeners();
  
    let newContainer = document.createElement('div');
    let produceCancelButton = document.createElement('div');
    produceCancelButton.id = 'produce-cancel-button';
    produceCancelButton.innerText = 'Cancel';
  
    newContainer.classList.add('priceproduction-choice'); 
  
    //creates duplicates of the players hand
    let cardOne = document.createElement('div');
    let cardTwo = document.createElement('div');
    let cardThree = document.createElement('div');
    let cardFour = document.createElement('div');
    let cardFive = document.createElement('div');
    let cancelButton = document.createElement('div');
  
  
    //creates the UI dfepeiingn on what the players hand size is.
    if(currPlayer.handSize === 5){
    cardOne = currPlayer.element.children[6].children[0].cloneNode(true);
    cardTwo = currPlayer.element.children[6].children[1].cloneNode(true);
    cardThree = currPlayer.element.children[6].children[2].cloneNode(true);
    cardFour = currPlayer.element.children[6].children[3].cloneNode(true);
    cardFive = currPlayer.element.children[6].children[4].cloneNode(true);
    cardOne.classList.add('scale-up')
    cardTwo.classList.add('scale-up')
    cardThree.classList.add('scale-up')
    cardFour.classList.add('scale-up')
    cardFive.classList.add('scale-up')
    newContainer.appendChild(cardOne);
    newContainer.appendChild(cardTwo);
    newContainer.appendChild(cardThree);
    newContainer.appendChild(cardFour);
    newContainer.appendChild(cardFive);
    newContainer.appendChild(cancelButton);
  
    }else if(currPlayer.handSize === 4){
      cardOne = currPlayer.element.children[6].children[0].cloneNode(true);
      cardTwo = currPlayer.element.children[6].children[1].cloneNode(true);
      cardThree = currPlayer.element.children[6].children[2].cloneNode(true);
      cardFour = currPlayer.element.children[6].children[3].cloneNode(true);
      cardOne.classList.add('scale-up')
      cardTwo.classList.add('scale-up')
      cardThree.classList.add('scale-up')
      cardFour.classList.add('scale-up')
      newContainer.appendChild(cardOne);
      newContainer.appendChild(cardTwo);
      newContainer.appendChild(cardThree);
      newContainer.appendChild(cardFour);
      newContainer.appendChild(cancelButton);
      
      }else if(currPlayer.handSize === 3){
        cardOne = currPlayer.element.children[6].children[0].cloneNode(true);
        cardTwo = currPlayer.element.children[6].children[1].cloneNode(true);
        cardThree = currPlayer.element.children[6].children[2].cloneNode(true);
        cardOne.classList.add('scale-up')
        cardTwo.classList.add('scale-up')
        cardThree.classList.add('scale-up')
        newContainer.appendChild(cardOne);
        newContainer.appendChild(cardTwo);
        newContainer.appendChild(cardThree);
        newContainer.appendChild(cancelButton);
      };
  
  
      //adds evcent listeners to the cards to produce that respective card
      cardOne.addEventListener('click',() => {produce(0)});
      cardTwo.addEventListener('click',() => {produce(1)});
      cardThree.addEventListener('click',() => {produce(2)});
      cardFour.addEventListener('click',() => {produce(3)});
      cardFive.addEventListener('click',() => {produce(4)});
      cancelButton.addEventListener('click',produceCancel);
  
      //gives theoptions to cancel and resets it
    document.getElementById('UI').innerHTML = '';
    shownText.innerText = 'Choose a Card to Play: '
    document.getElementById('UI').appendChild(shownText);
    document.getElementById('UI').appendChild(newContainer);
    document.getElementById('UI').appendChild(produceCancelButton);
  
  }
  const createProductionCard = () => {
  //function to create a new production card and give it to the current player
    //creates 2 empty arrays
    newCardProduction = [];
    newCardPrice = [];
  
    //creates a new array size 100 with the respective probablilties
    let randomNumber = (3 + Math.floor(Math.random()*3));
    for(let i = 1; i <= randomNumber; i++){
      newCardProduction.push(productionArray[Math.floor(Math.random()*101)]);
    }
  
    randomNumber = (2 + Math.floor(Math.random()*4));
    for(let i = 1; i <= randomNumber; i++){
      newCardPrice.push(priceArray[Math.floor(Math.random()*101)]);
    }
  
  //filters the amount of each in the array to get the value in the back end
    let newCard = {
      production: {
        wheat: newCardProduction.filter((j) => j === 'wheat').length,
        wood: newCardProduction.filter((j) => j === 'wood').length,
        iron: newCardProduction.filter((j) => j === 'iron').length,
        coal: newCardProduction.filter((j) => j === 'coal').length,
        goods: newCardProduction.filter((j) => j === 'goods').length,
        luxury: newCardProduction.filter((j) => j === 'luxury').length
      },
      price:{
        wheat: newCardPrice.filter((j) => j === 'wheat').length,
        wood: newCardPrice.filter((j) => j === 'wood').length,
        iron: newCardPrice.filter((j) => j === 'iron').length,
        coal: newCardPrice.filter((j) => j === 'coal').length,
        goods: newCardPrice.filter((j) => j === 'goods').length,
        luxury: newCardPrice.filter((j) => j === 'luxury').length
      }
    }
  
    //create the whol div for the new card element
    newCardElement = document.createElement('div');
    newCardElement.classList.add('priceproduction-card');
  
    //create the top of the wnew card (price)
    priceCard = document.createElement('div');
    priceCard.classList.add('price-card');
    priceCard.innerText = 'Raises Price:'
  
    //create the bottom of the new card (production)
    productionCard = document.createElement('div');
    productionCard.classList.add('production-card');
    productionCard.innerText = 'You Produce: '
  
  
    //creates the image for the new card
    const createNewCardHelper = (commodity, commodityStr) => {
      for(let i = 1; i <= newCard.price[commodityStr]; i++){
        let newImage = document.createElement('img');
        newImage.src = commodity.imageLink;
        newImage.classList.add('cardCommodity');
        priceCard.appendChild(newImage);
    }
      for(let i = 1; i <= newCard.production[commodityStr]; i++){
        let newImage = document.createElement('img');
        newImage.src = commodity.imageLink;
        newImage.classList.add('cardCommodity');
        productionCard.appendChild(newImage);
      }
    }
  
  createNewCardHelper(wheat,'wheat');
  createNewCardHelper(wood,'wood');
  createNewCardHelper(iron,'iron');
  createNewCardHelper(coal,'coal');
  createNewCardHelper(goods,'goods');
  createNewCardHelper(luxury,'luxury');
  
  newCardElement.appendChild(priceCard);
  newCardElement.appendChild(productionCard);
  
  //adds the new card to the curreny player on the front end and back end
    currPlayer.productionCards.push(newCard); 
    currPlayer.element.children[6].appendChild(newCardElement);
  
  }
  const produce = (num) =>{
  
  
    //run when the player click on the of their production cards
    let totalProduce = 0;
  
    //find out how many prodction commodies there are to see if they can produce all or if they have to choose
    for (const property in currPlayer.productionCards[num].production){
      totalProduce += currPlayer.productionCards[num].production[property];
    }
  
    //checlk that players productipon size and compares it to the cards production amount
    if(totalProduce > currPlayer.productionMax){
  
      //when they have to choose which commodies to produce
      document.getElementById('UI').innerHTML = '';
      document.getElementById('UI').id = 'UI-show-commodies';
      shownText.innerText = `Choose ${currPlayer.productionMax} commodies to produce.`;
      document.getElementById('UI-show-commodies').appendChild(shownText);
  
      //gives them extra commodies based on if they have specific buildings
      produceHelper4(wheat,'wheat',num);
      produceHelper4(wood,'wood',num);
      produceHelper4(iron,'iron',num);
      produceHelper4(coal,'coal',num);
      produceHelper4(goods,'goods',num);
      produceHelper4(luxury,'luxury',num);
  
      //gfives them the commodies
      produceHelper2(wheat,'wheat',num);
      produceHelper2(wood,'wood',num);
      produceHelper2(iron,'iron',num);
      produceHelper2(coal,'coal',num);
      produceHelper2(goods,'goods',num);
      produceHelper2(luxury,'luxury',num);
  
      //raisies prices
      produceHelper3(num);
  
    }else{
  
          //when they get to produce all of them
  
      produceHelper1(wheat,'wheat',num);
      produceHelper1(wood,'wood',num);
      produceHelper1(iron,'iron',num);
      produceHelper1(coal,'coal',num);
      produceHelper1(goods,'goods',num);
      produceHelper1(luxury,'luxury',num);
    
      produceHelper3(num);
  
  
      //takes that card and replaces it
      currPlayer.element.children[6].children[num].remove();
      createProductionCard()
      currPlayer.productionCards.splice(num,1);
  
      //checks to see if they have too many commodies, it will run until they have as many as their max commodity size
      if(commodityMaxCheck()){
        currPlayer = changeCurrPlayer(currPlayer)
      };
      
    }
  }
  const produceHelper1 = (commodity, commodityStr,num) => {
    console.log(commodity);
      for(let i = 0; i < currPlayer.buildings.length; i++){
        if(currPlayer.buildings[i].name === `${commodityStr}1`){currPlayer.commodies[commodityStr]++}
        if(currPlayer.buildings[i].name === `${commodityStr}2`){currPlayer.commodies[commodityStr]+= 2}
      }
    currPlayer.commodies[commodityStr] += currPlayer.productionCards[num].production[commodityStr];
      for(let i = 0; i < currPlayer.productionCards[num].production[commodityStr]; i++){
        let newImage = document.createElement('img');
        newImage.src = commodity.imageLink;
        newImage.classList.add('playerCommodity');
        currPlayer.element.children[4].appendChild(newImage);
      }
  }
  const produceHelper2 = (commodity, commodityStr, num) =>{
    console.log(commodity);
    for(let i = 0; i < currPlayer.productionCards[num].production[commodityStr]; i++){
      let newImage = document.createElement('img');
      newImage.src = commodity.imageLink;
      newImage.classList.add('playerCommodity');
      newImage.classList.add('scale-up2');
      document.getElementById('UI-show-commodies').appendChild(newImage);
      newImage.addEventListener('click', () => {produceCommodity(commodityStr,num)},{once:true});
    }
  }
  const produceHelper3 = (num) => {
    wheat.value += currPlayer.productionCards[num].price.wheat;
    moveCommodity(wheat, currPlayer.productionCards[num].price.wheat, true);
    wood.value += currPlayer.productionCards[num].price.wood;
    moveCommodity(wood, currPlayer.productionCards[num].price.wood, true);
    iron.value += currPlayer.productionCards[num].price.iron;
    moveCommodity(iron, currPlayer.productionCards[num].price.iron, true);
    coal.value += currPlayer.productionCards[num].price.coal;
    moveCommodity(coal, currPlayer.productionCards[num].price.coal, true);
    goods.value += currPlayer.productionCards[num].price.goods;
    moveCommodity(goods, currPlayer.productionCards[num].price.goods, true);
    luxury.value += currPlayer.productionCards[num].price.luxury;
    moveCommodity(luxury, currPlayer.productionCards[num].price.luxury, true);
  }
  const produceHelper4 = (commodity, commodityStr) => {
    for(let i = 0; i < currPlayer.buildings.length; i++){
      if(currPlayer.buildings[i].name === `${commodityStr}1`){currPlayer.commodies[commodityStr]++}
      if(currPlayer.buildings[i].name === `${commodityStr}2`){currPlayer.commodies[commodityStr]+= 2}
    }
  }
  const produceCommodity = (commodityStr,num) =>{
  
    //helper function for when they have to choose which commodies to produce
    currPlayer.commodies[commodityStr] += 1;
    currPlayer.productionCards[num].production[commodityStr] -= 1;
  
    document.getElementById('UI-show-commodies').innerHTML = '';
    shownText.innerText = `Choose ${currPlayer.productionMax} commodies to produce.`;
    document.getElementById('UI-show-commodies').appendChild(shownText);
  
    produceHelper2(wheat,'wheat',num);
    produceHelper2(wood,'wood',num);
    produceHelper2(iron,'iron',num);
    produceHelper2(coal,'coal',num);
    produceHelper2(goods,'goods',num);
    produceHelper2(luxury,'luxury',num);
  
    //reduces how many more they have to discard
    if(produceCounter === currPlayer.productionMax - 1){
      currPlayer.element.children[6].children[num].remove();
      createProductionCard()
      currPlayer.productionCards.splice(num,1);
      if(commodityMaxCheck()){
        currPlayer = changeCurrPlayer(currPlayer);
      }
    }
    produceCounter++;
    organizeCommodies();
  }
  const produceCancel = () =>{
    //when they choose to not produce;
    revertConfirmCancel;
    revertUI;
  }
  const commodityMaxCheck = () => {
  
    //creates a total for how many commodies they have
    let total = 0;
  
    for (const property in currPlayer.commodies){
      total += currPlayer.commodies[property];
    }
    if(total <= currPlayer.commodityMax){ // compares the amount they have to their max
      return true;
    }else{
      //when they have to many it runs it again until it passes 
      removeEventListeners();
  
      if(document.getElementById('UI-show-commodies')){document.getElementById('UI-show-commodies').id = 'UI'};
      document.getElementById('UI').innerHTML = '';
      document.getElementById('UI').id = 'UI-show-commodies';
      shownText.innerText = `discard ${currPlayer.name} back at it again. Please click ${total - currPlayer.commodityMax} commodity to discard: `;
      document.getElementById('UI-show-commodies').appendChild(shownText);
  
      commodityMaxCheckHelper(wheat,'wheat');
      commodityMaxCheckHelper(wood,'wood');
      commodityMaxCheckHelper(iron,'iron');
      commodityMaxCheckHelper(coal,'coal');
      commodityMaxCheckHelper(goods,'goods');
      commodityMaxCheckHelper(luxury,'luxury');
  
      return false
    };
  }
  const commodityMaxCheckHelper = (commodity, commodityStr) =>{
  
    //helper funtion for commodity so the code isnt too long
    for(let i = 0; i < currPlayer.commodies[commodityStr]; i++){
      let newImage = document.createElement('img');
      newImage.src = commodity.imageLink;
      newImage.classList.add('playerCommodity');
      newImage.classList.add('scale-up2');
      document.getElementById('UI-show-commodies').appendChild(newImage);
      newImage.addEventListener('click', () => {discardCommodity(commodityStr)},{once:true});
    }
  }
  const discardCommodity = (commodity) => {
    //helper function that is inside an atlclick of its correctiong commodity to remove it from that players possession
    currPlayer.commodies[commodity] -= 1;
    document.getElementById('UI-show-commodies').id = 'UI';
    if(commodityMaxCheck()){
      currPlayer = changeCurrPlayer(currPlayer);
    }
    organizeCommodies();
  }
  const organizeCommodies = () =>{
    //orgainzes that respective players commodies
    currPlayer.element.children[4].innerHTML = '';
    organizeCommodiesHelper(wheat,'wheat');
    organizeCommodiesHelper(wood,'wood');
    organizeCommodiesHelper(iron,'iron');
    organizeCommodiesHelper(coal,'coal');
    organizeCommodiesHelper(goods,'goods');
    organizeCommodiesHelper(luxury,'luxury');
  }
  const organizeCommodiesHelper = (commodity, commodityStr) => {
    for(let i = 0; i < currPlayer.commodies[commodityStr]; i++){
      let newImage = document.createElement('img');
      newImage.src = commodity.imageLink;
      newImage.classList.add('playerCommodity');
      currPlayer.element.children[4].appendChild(newImage);
    }
  }
  
  //sellign and commodies
  const confirmSellWheat = () => {
    revertConfirmCancel();
  
    confirmCancel.style.opacity = 1 ;
  
    //reoves lisenetrs from the board to avoid breaking
    removeEventListeners();
  
    //adds a listener to the confirm button that will run the auction function for the first avalable railroad
    confirmButton.addEventListener('click', () => {sell(wheat,'wheat')},{once:true});
    cancelButton.addEventListener('click',() => {
      revertConfirmCancel();
      addEventListeners();
    },{once:true});  
    confirmCancel.appendChild(howMany);
    document.getElementById('how-many').value = 'Enter Amount';
    document.getElementById('how-many').addEventListener('click',() => {removeInnerText(howMany)},{once:true});
  }
  const confirmSellWood = () => {
    revertConfirmCancel();
  
    confirmCancel.style.opacity = 1 ;
  
    //reoves lisenetrs from the board to avoid breaking
    removeEventListeners();
  
    //adds a listener to the confirm button that will run the auction function for the first avalable railroad
    confirmButton.addEventListener('click', () => {sell(wood,'wood')},{once:true});
    cancelButton.addEventListener('click',() => {
      revertConfirmCancel();
      addEventListeners();
    },{once:true});
    confirmCancel.appendChild(howMany);
    document.getElementById('how-many').value = 'Enter Amount';
    document.getElementById('how-many').addEventListener('click',() => {removeInnerText(howMany)},{once:true});
  }
  const confirmSellIron = () => {
    revertConfirmCancel();
  
    confirmCancel.style.opacity = 1 ;
  
    //reoves lisenetrs from the board to avoid breaking
    removeEventListeners();
  
    //adds a listener to the confirm button that will run the auction function for the first avalable railroad
    confirmButton.addEventListener('click', () => {sell(iron,'iron')},{once:true});
    cancelButton.addEventListener('click',() => {
      revertConfirmCancel();
      addEventListeners();
    },{once:true}); 
    confirmCancel.appendChild(howMany);
    document.getElementById('how-many').value = 'Enter Amount';
    document.getElementById('how-many').addEventListener('click',() => {removeInnerText(howMany)},{once:true});
  }
  const confirmSellCoal = () => {
    revertConfirmCancel();
  
    confirmCancel.style.opacity = 1 ;
  
    //reoves lisenetrs from the board to avoid breaking
    removeEventListeners();
  
    //adds a listener to the confirm button that will run the auction function for the first avalable railroad
    confirmButton.addEventListener('click', () => {sell(coal,'coal')},{once:true});
    cancelButton.addEventListener('click',() => {
      revertConfirmCancel();
      addEventListeners();
    },{once:true}); 
    confirmCancel.appendChild(howMany);
    document.getElementById('how-many').value = 'Enter Amount';
    document.getElementById('how-many').addEventListener('click',() => {removeInnerText(howMany)},{once:true});
  }
  const confirmSellGoods = () => {
    revertConfirmCancel();
  
    confirmCancel.style.opacity = 1 ;
  
    //reoves lisenetrs from the board to avoid breaking
    removeEventListeners();
  
    //adds a listener to the confirm button that will run the auction function for the first avalable railroad
    confirmButton.addEventListener('click', () => {sell(goods,'goods')},{once:true});
    cancelButton.addEventListener('click',() => {
      revertConfirmCancel();
      addEventListeners();
    },{once:true});
    confirmCancel.appendChild(howMany);
    document.getElementById('how-many').value = 'Enter Amount';
    document.getElementById('how-many').addEventListener('click',() => {removeInnerText(howMany)},{once:true});
  }
  const confirmSellLuxury = () => {
    revertConfirmCancel();
    confirmCancel.style.opacity = 1 ;
  
    //reoves lisenetrs from the board to avoid breaking
    removeEventListeners();
  
    //adds a listener to the confirm button that will run the auction function for the first avalable railroad
    confirmButton.addEventListener('click', () => {sell(luxury,'luxury')},{once:true});
    cancelButton.addEventListener('click',() => {
      constructionCompanyTurnOne = false;
      currTownAny = [] ;
      commodityMaxCheck()
      produceCounter = 0;
      currPlayer.element.children[1].innerText = currPlayer.money;
      revertUI();
      organizeCommodies();
      revertConfirmCancel();
      addEventListeners();
    },{once:true});
    confirmCancel.appendChild(howMany);
    document.getElementById('how-many').value = 'Enter Amount';
    document.getElementById('how-many').addEventListener('click',() => {removeInnerText(howMany)},{once:true});
  }
  const sell = (commodity,commodityStr) =>{ 
    //once that comfirm buytton has been clicked, it is hidden until it is needed again 
    confirmCancel.style.opacity = 0;
  
    //inmtakes the value in sell amount
    sellAmount = Number(howMany.value);
  
    //check if any player have a specil buoilding that gives them moneyper commooidty sold
    for(let i = 0; i < numPlayers; i++){
      for(let j = 0; j < playerArray[i].buildings.length; j++){
        if(commodityStr === 'coal' || commodityStr === 'iron'){
          if(playerArray[i].buildings[j].name === 'coal&iron'){
            //if they do have that, and they commodity is sold, then it pays them andupdates themoney
            playerArray[i].money += sellAmount;
            playerArray[i].element.children[1].innerText = playerArray[i].money;
          }
        }
        if(commodityStr === 'wheat' || commodityStr === 'wood'){
          if(playerArray[i].buildings[j].name === 'wheat&wood'){
            playerArray[i].money += sellAmount;
            playerArray[i].element.children[1].innerText = playerArray[i].money;
          }
        }
        if(commodityStr === 'goods' || commodityStr === 'luxury'){
          if(playerArray[i].buildings[j].name === 'goods&luxury'){
            playerArray[i].money += sellAmount;
            playerArray[i].element.children[1].innerText = playerArray[i].money;
          }
        }
      }
    }
  
    //compares selk amount to how many they have to make sure theyure allowed to seell that many
  
    if(sellAmount > currPlayer.commodies[commodityStr]){
      shownText.innerText = 'You Dont Have That Many!'
      addEventListeners();
    }else if(sellAmount <= currPlayer.commodies[commodityStr] ){
      //checks for a special buildings that increases the price by 3 before you sell
      if(searchForBuilding('Export Company')){
        commodity.value += 3
        moveCommodity(commodity,3,true);
      };
  
      //moves the commodtty to its new poisitin
      moveCommodity(commodity,sellAmount,false);
      currPlayer.money += commodity.value * sellAmount;
      currPlayer.commodies[commodityStr] -= sellAmount;
      commodity.value -= sellAmount;
      if(commodity.value < 1 ){
        commodity.value = 1;
      }
      if(searchForBuilding('Freight Company')  && !constructionCompanyTurnOne){
  
        //check for a special building that allows for that player to sell 2 commodies and changes the board accordingly
        revertUI();
        shownText.innerText = 'You may sell another commodity, or skip';
        let skipButton = document.createElement('div');
        skipButton.id = 'skip-button';
        confirmCancel.innerHTML = '';
        confirmCancel.appendChild(skipButton);
        confirmCancel.style.opacity = 1;
        skipButton.addEventListener('click', skipExtraTurn,{once:true});
        skipButton.innerText = 'Skip';
        removeEventListeners();
        wheat.stockElement.addEventListener('click',confirmSellWheat);
        wood.stockElement.addEventListener('click',confirmSellWood);
        iron.stockElement.addEventListener('click',confirmSellIron);
        coal.stockElement.addEventListener('click',confirmSellCoal);
        goods.stockElement.addEventListener('click',confirmSellGoods);
        luxury.stockElement.addEventListener('click',confirmSellLuxury);
        constructionCompanyTurnOne = true;
      }else{currPlayer = changeCurrPlayer(currPlayer)}; 
    }else{shownText.innerText = 'Error'}
    
  }
  const revertConfirmCancel = () => {
  
    //reverts confiorm cancel back to base game this happens each time a new turn i stsarted
    confirmCancel.innerHTML = '';
    confirmButton.innerHTML = '';
    confirmButton.innerText = 'Confirm';
    confirmButton.id = 'confirm-choice';
    cancelButton.innerText = 'Cancel';
    cancelButton.id = 'cancel-choice';
    confirmCancel.appendChild(confirmButton);
    confirmCancel.appendChild(cancelButton);
  }
  const revertUI = () =>{
  
    //sresets the ui back to base game this happens each time a new turn i stsrated
    document.getElementById('body-middle').children[2].id = 'UI';
    document.getElementById('UI').innerHTML = '';
    document.getElementById('UI').appendChild(shownText);
    shownText.innerText = "Click on a card to purchase it. Click on a commodity to sell it. Click the Price And Production Card to Produce."
  
  
  }
  const removeEventListeners = () => {
    //removes all the event listeners on the page
    confirmButton.removeEventListener('click',confirmRailRoadOne);
    railRoadAvaiableOne.removeEventListener('click',confirmRailRoadOne);
    railRoadAvaiableTwo.removeEventListener('click',confirmRailRoadTwo);
    townAvaiable.removeEventListener('click',confirmBuyTown);
    buildingAvaiableOne.removeEventListener('click',confirmBuyBuildingOne);
    buildingAvaiableTwo.removeEventListener('click',confirmBuyBuildingTwo);
    buildingAvaiableThree.removeEventListener('click',confirmBuyBuildingThree);
    buildingAvaiableFour.removeEventListener('click',confirmBuyBuildingFour);
    priceAndProduciton.removeEventListener('click',produceChoice);
    wheat.stockElement.removeEventListener('click',confirmSellWheat);
    wood.stockElement.removeEventListener('click',confirmSellWood);
    iron.stockElement.removeEventListener('click',confirmSellIron);
    coal.stockElement.removeEventListener('click',confirmSellCoal);
    goods.stockElement.removeEventListener('click',confirmSellGoods);
    luxury.stockElement.removeEventListener('click',confirmSellLuxury);
  }
  const addEventListeners = () => {
    //adds back all the base turn event listeners
    railRoadAvaiableOne.addEventListener('click',confirmRailRoadOne);
    railRoadAvaiableTwo.addEventListener('click',confirmRailRoadTwo);
    townAvaiable.addEventListener('click',confirmBuyTown);
    buildingAvaiableOne.addEventListener('click',confirmBuyBuildingOne);
    buildingAvaiableTwo.addEventListener('click',confirmBuyBuildingTwo);
    buildingAvaiableThree.addEventListener('click',confirmBuyBuildingThree);
    buildingAvaiableFour.addEventListener('click',confirmBuyBuildingFour);
    priceAndProduciton.addEventListener('click',produceChoice);
    wheat.stockElement.addEventListener('click',confirmSellWheat);
    wood.stockElement.addEventListener('click',confirmSellWood);
    iron.stockElement.addEventListener('click',confirmSellIron);
    coal.stockElement.addEventListener('click',confirmSellCoal);
    goods.stockElement.addEventListener('click',confirmSellGoods);
    luxury.stockElement.addEventListener('click',confirmSellLuxury);
    cancelButton.addEventListener('click',addEventListeners);
    confirmCancel.style.opacity = 0 ;
  }
  
  const initalizeBoard = () => {
  
    //prepares the board
  
    //priceArray
    for(let i = 1; i <= 15; i++){priceArray.push('wood')}
    for(let i = 1; i <= 12; i++){priceArray.push('wheat')}
    for(let i = 1; i <= 18; i++){priceArray.push('iron')}
    for(let i = 1; i <= 16; i++){priceArray.push('coal')}
    for(let i = 1; i <= 21; i++){priceArray.push('goods')}
    for(let i = 1; i <= 18; i++){priceArray.push('luxury')}
  
    // productionArray
    for(let i = 1; i <= 17; i++){productionArray.push('wood')}
    for(let i = 1; i <= 19; i++){productionArray.push('wheat')}
    for(let i = 1; i <= 15; i++){productionArray.push('iron')}
    for(let i = 1; i <= 17; i++){productionArray.push('coal')}
    for(let i = 1; i <= 15; i++){productionArray.push('goods')}
    for(let i = 1; i <= 17; i++){productionArray.push('luxury')}
  
    shownText.innerText = "Click on a card to purchase it. Click on a commodity to sell it. Click the Price And Production Card to Produce."
  
    //figures out hwo many players are in the game
    if(playerOneNameInput.value != '' 
    && playerOneNameInput.value != 'Player 1' 
    && playerTwoNameInput.value != '' 
    && playerTwoNameInput.value != 'Player 2'
    && playerThreeNameInput.value != '' 
    && playerThreeNameInput.value != 'Player 3' 
    && playerFourNameInput.value != '' 
    && playerFourNameInput.value != 'Player 4')
    {
      numPlayers = 4;
    }else if(playerOneNameInput.value != '' 
    && playerOneNameInput.value != 'Player 1' 
    && playerTwoNameInput.value != '' 
    && playerTwoNameInput.value != 'Player 2'
    && playerThreeNameInput.value != '' 
    && playerThreeNameInput.value != 'Player 3'){
      if(playerFourNameInput.value === '' 
          ||  playerFourNameInput.value === 'Player 4'){
            numPlayers = 3;
          }
    }else if(playerOneNameInput.value != '' 
    && playerOneNameInput.value != 'Player 1' 
    && playerTwoNameInput.value != '' 
    && playerTwoNameInput.value != 'Player 2'){
      if(playerFourNameInput.value === '' 
          ||  playerFourNameInput.value === 'Player 4'){
            if(playerThreeNameInput.value === '' 
             || playerThreeNameInput.value === 'Player 3'){
              numPlayers = 2;
             }
          }
    }else{shownText.innerText = 'Invalid Players. Reset'};
  
  //shuffles the first 6 buildings becuase base game
  buildingRandomStackStart = shuffle([b1,b2,b3,b4,b5,b6]);
  //reduces it to the size of players there are in the game
  buildingRandomStackStart = buildingRandomStackStart.slice(0,numPlayers);
  //shuffles the remaining
  buildingRandomStackEnd = shuffle([b7,b8,b9,b10,b11,b12,b13,b14,b15,b16,b17,b18,b19,b20,b21,b23,b24,b25,b26]);
  //combines the beginning buildings to the end building to create the buldings array;
  buildingRandomStack = buildingRandomStackStart.concat(buildingRandomStackEnd);
  
    if(numPlayers === 0 || numPlayers === 1){
      shownText.innerText = 'Not enough Players. Reset'
      return;
    }else if(numPlayers === 2){
      document.getElementById('player-three').remove();
      document.getElementById('player-four').remove();
    }else if(numPlayers === 3){
      document.getElementById('player-four').remove();
    }else if(numPlayers === 4){
    }else{
      shownText.innerText = 'Too Many Players Somehow, Must Restart'
    }
  
    //creates railroad stack accordingly with the number of players
    if(numPlayers === 2){
      railRoadRandomStack = shuffle([rr3,rr3,rr3,rr3,rr4,rr4,rr4,rr4,rr2,rr2,rr2,rr2,rr5,rr5,rr5,rr5]);
      player1.name = playerOneNameInput.value;
      document.getElementById('player-one-name').innerText = player1.name;
      currPlayer = player1;
      createProductionCard();
      createProductionCard();
      createProductionCard();
  
      player2.name = playerTwoNameInput.value; 
      document.getElementById('player-two-name').innerText = player2.name;
      currPlayer = player2;
      createProductionCard();
      createProductionCard();
      createProductionCard();
  
    }else if(numPlayers === 3 ){
      railRoadRandomStack = shuffle([rr3,rr3,rr3,rr3,rr4,rr4,rr4,rr4,rr2,rr2,rr2,rr2,rr5,rr5,rr5,rr5,rr1,rr1,rr1,rr1]);
      player1.name = playerOneNameInput.value;
      document.getElementById('player-one-name').innerText = player1.name;
      currPlayer = player1;
      createProductionCard();
      createProductionCard();
      createProductionCard();
  
      player2.name = playerTwoNameInput.value; 
      document.getElementById('player-two-name').innerText = player2.name;
      currPlayer = player2;
      createProductionCard();
      createProductionCard();
      createProductionCard();
  
      player3.name = playerThreeNameInput.value;
      document.getElementById('player-three-name').innerText = player3.name;
      currPlayer = player3;
      createProductionCard();
      createProductionCard();
      createProductionCard();
  
    }else if(numPlayers === 4){
      railRoadRandomStack = shuffle([rr3,rr3,rr3,rr3,rr4,rr4,rr4,rr4,rr2,rr2,rr2,rr2,rr5,rr5,rr5,rr5,rr1,rr1,rr1,rr1,rr6,rr6,rr6,rr6]);
      player1.name = playerOneNameInput.value;
      document.getElementById('player-one-name').innerText = player1.name;
      currPlayer = player1;
      createProductionCard();
      createProductionCard();
      createProductionCard();
  
      player2.name = playerTwoNameInput.value; 
      document.getElementById('player-two-name').innerText = player2.name;
      currPlayer = player2;
      createProductionCard();
      createProductionCard();
      createProductionCard();
  
      player3.name = playerThreeNameInput.value;
      document.getElementById('player-three-name').innerText = player3.name;
      currPlayer = player3;
      createProductionCard();
      createProductionCard();
      createProductionCard();
  
      player4.name = playerFourNameInput.value;
      document.getElementById('player-four-name').innerText = player4.name;
      currPlayer = player4;
      createProductionCard();
      createProductionCard();
      createProductionCard();
    }
  
      //initiates the first few shown of the deck
      refillSlot(railRoadStack, railRoadAvaiableOne, railRoadRandomStack[0]);
      refillSlot(railRoadStack, railRoadAvaiableTwo, railRoadRandomStack[1]);
      refillSlot(townStack,townAvaiable ,townRandomStack[0]);
      refillSlot(buildingStack,buildingAvaiableOne, buildingRandomStack[0]);
      refillSlot(buildingStack,buildingAvaiableTwo, buildingRandomStack[1]);
      refillSlot(buildingStack,buildingAvaiableThree, buildingRandomStack[2]);
      refillSlot(buildingStack,buildingAvaiableFour, buildingRandomStack[3]);
  
      currPlayer = player1;
      whosTurn.innerText = `${currPlayer.name} plays`; 
  
      revertUI();
  
  
  //EVENT LISTENERS
  railRoadAvaiableOne.addEventListener('click',confirmRailRoadOne);
  railRoadAvaiableTwo.addEventListener('click',confirmRailRoadTwo);
  townAvaiable.addEventListener('click',confirmBuyTown);
  buildingAvaiableOne.addEventListener('click',confirmBuyBuildingOne);
  buildingAvaiableTwo.addEventListener('click',confirmBuyBuildingTwo);
  buildingAvaiableThree.addEventListener('click',confirmBuyBuildingThree);
  buildingAvaiableFour.addEventListener('click',confirmBuyBuildingFour);
  priceAndProduciton.addEventListener('click',produceChoice);
  wheat.stockElement.addEventListener('click',confirmSellWheat);
  wood.stockElement.addEventListener('click',confirmSellWood);
  iron.stockElement.addEventListener('click',confirmSellIron);
  coal.stockElement.addEventListener('click',confirmSellCoal);
  goods.stockElement.addEventListener('click',confirmSellGoods);
  luxury.stockElement.addEventListener('click',confirmSellLuxury);
  cancelButton.addEventListener('click',addEventListeners);
  
  }
  
  
  //when you load thew webpage this is the only event listener used to start the game
  startBtn.addEventListener("click", initalizeBoard);
  
  // RUN TIME//