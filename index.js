var bars = $('.bar')
var sortOption = 'Bubble Sort';
var isPlaying = false;
var timeouts = [100, 250, 500, 750, 1000];
var timeoutIndex = 2;


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

function toggleDisable(button) {
    console.log("Toggle");
    if(button.getAttribute('disabled')) {
        button.removeAttribute('disabled');
    }
    else {
        button.setAttribute('disabled', 'disabled');
    }
    button.classList.toggle('disabled');
    button.classList.remove('hover');
}

async function swapClasses(x, y) {
    var height1 = parseInt(x.className.slice(10));
    var height2 = parseInt(y.className.slice(10));
    if(height1 > height2) {
        await pause();
        var temp = x.className;
        x.className = y.className;
        y.className = temp;
    }
}

async function pause() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, timeouts[timeoutIndex]);
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
    async function() {
        switch(sortOption) {
            case 'Bubble Sort':
                isPlaying = true;
                toggleDisable(this);
                for(var i = 0; i < $('.sort-option').length; i++) {
                    toggleDisable($('.sort-option')[i]);
                }
                await bubbleSort();
                toggleDisable(this);
                for(var i = 0; i < $('.sort-option').length; i++) {
                    toggleDisable($('.sort-option')[i]);
                }
                break;
            case 'Insertion Sort':
                toggleDisable(this);
                await insertionSort();
                toggleDisable(this);
                break;
            case 'Bogo Sort':
                toggleDisable(this);
                await bogoSort();
                toggleDisable(this);
                break;
        }
    }
)

$('.fa-backward').click(
    function() {
        if(timeoutIndex < timeouts.length - 1) {
            timeoutIndex++;
        }
        if(timeoutIndex == timeouts.length - 1) {
            toggleDisable(this);
        }
    }
)