var bars = $('.bar')
var sortOption = 'Bubble Sort';


function isSorted(bars) {
    for(var i = 0; i < bars.length - 1; i++) {
        var h1 = parseInt(bars[i].className.slice(10));
        var h2 = parseInt(bars[i + 1].className.slice(10));
        if(h1 > h2) {
            return false;
        }
    }
    return true;   
}

function shuffle() {

    var heights = [];
    for(var i = 0; i < 20; i++) {
        heights.push(i + 1);
    }

    for(var i = 0; i < bars.length; i++) {
        var randIndex = Math.floor(Math.random() * heights.length);
        var randHeight = heights[randIndex];
        if(randHeight <= 9) {
            bars[i].className = 'bar height0' + randHeight;
        }
        else {
            bars[i].className = 'bar height' + randHeight;
        }
        heights.splice(randIndex, 1);
    }

}

async function toggleHighlight(bar) {
    bar.classList.toggle('highlightedBar');
}

async function swapClasses(x, y) {
    var height1 = parseInt(x.className.slice(10));
    var height2 = parseInt(y.className.slice(10));
    if(height1 > height2) {
        await pause(100);
        var temp = x.className;
        x.className = y.className;
        y.className = temp;
    }
}

async function pause(timeout) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, timeout);
    });
}

async function bubbleSort() {
    for(var i = 0; i < bars.length; i++) {
        for(var j = 0; j < bars.length - i - 1; j++) {
            await toggleHighlight(bars[j]);
            await toggleHighlight(bars[j + 1]);
            await swapClasses(bars[j], bars[j + 1]);
            await toggleHighlight(bars[j]);
            await toggleHighlight(bars[j + 1]);
        }
    }
}

async function insertionSort() {
    for(var i = 1; i < bars.length; i++) {
        var index = i - 1;
        while(index >= 0) {
            await toggleHighlight(bars[index]);
            await toggleHighlight(bars[index + 1]);
            await swapClasses(bars[index], bars[index + 1])
            await toggleHighlight(bars[index]);
            await toggleHighlight(bars[index + 1]);
            index--;
        }
    }
}

async function bogoSort() {
    while(!isSorted(bars)) {
        shuffle();
        await pause(250);
    }
}

$('.button').hover(
    function() {
        $(this).addClass('hover');
    }, function() {
        $(this).removeClass('hover');
    }
);

$('.sort-option').click(
    function() {
        $('.active').removeClass('active');
        $(this).addClass('active');
        sortOption = $(this).text();
        shuffle();
    }
);

$('.fa-play').click(
    function() {
        switch(sortOption) {
            case 'Bubble Sort':
                bubbleSort();
                break;
            case 'Insertion Sort':
                insertionSort();
                break;
            case 'Bogo Sort':
                bogoSort();
                break;
        }
    }
)