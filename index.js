
document.querySelector('.control span').onclick=function(){
    let name=prompt("what is your name ?");

    if(name==''){
       document.querySelector('.info-container .name span').innerHTML='Unknown';
    }else{
        document.querySelector('.info-container .name span').innerHTML=name;
    }
    document.querySelector('.control').remove();
}

let duration=1000;

let cardsContainer=document.querySelector('.cards-container');
let blocks=Array.from(cardsContainer.children);
let orderRange=[...blocks.keys()];





shuffleArray(orderRange);

blocks.forEach((block,index)=>{
    block.style.order=orderRange[index];
    block.addEventListener('click',function(){
        flipBlock(block);
    })
});


function shuffleArray(array){
    let current=array.length,temp,random;

    while(current>0){

        random=Math.floor(Math.random()*current);
        current--;
        temp=array[current];
        array[current]=array[random];
        array[random]=temp;

    }
    return array;
}

function flipBlock(selectedBlock) {

    // Add Class is-flipped
    selectedBlock.classList.add('is-flipped');
  
    // Collect All Flipped Cards
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));
    if(allFlippedBlocks.length===2)
    {
        stopClicking();
        matchedBlocks(allFlippedBlocks[0],allFlippedBlocks[1]);
    }
    
}

function stopClicking(){

    cardsContainer.classList.add('no-clicking');

    setTimeout(() => {
        cardsContainer.classList.remove('no-clicking');
    }, duration);
}

function matchedBlocks(firstBlock,secondBlock){
    let trying = document.querySelector('.tries span');
    console.log(firstBlock.dataset.tech)
    console.log(secondBlock.dataset.tech)
    if(firstBlock.dataset.tech===secondBlock.dataset.tech){
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');
        firstBlock.classList.add('matched');
        secondBlock.classList.add('matched');
    }else{
        trying.innerHTML=parseInt(trying.innerHTML)+1;
        console.log(trying)
        setTimeout(() => {
            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');
            document.querySelector('#fail').play();
        }, duration);
    }
}