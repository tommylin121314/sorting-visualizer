var bars = $('.bar')
var sortOption = 'Bubble Sort';


function shuffle() {

    for(var i = 0; i < bars.length; i++) {
        var randInt = (Math.ceil(Math.random() * 20));
        if(randInt <= 9) {
            bars[i].className = 'bar height0' + randInt;
        }
        else {
            bars[i].className = 'bar height' + randInt;
        }
    }

}

async function swapClasses(x, y) {
    await pause();
    var height1 = parseInt(x.className.slice(10));
    var height2 = parseInt(y.className.slice(10));
    if(height1 > height2) {
        var temp = x.className;
        x.className = y.className;
        y.className = temp;
    }
}

async function pause() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, 100);
    });
}

async function bubbleSort() {
    for(var i = 0; i < bars.length; i++) {
        for(var j = 0; j < bars.length - i - 1; j++) {
            await swapClasses(bars[j], bars[j + 1]);
        }
    }
}

async function insertionSort() {
    for(var i = 1; i < bars.length; i++) {
        var index = i - 1;
        while(index >= 0) {
            await swapClasses(bars[index], bars[index + 1])
            index--;
        }
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
        }
    }
)