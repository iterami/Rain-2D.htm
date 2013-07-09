function draw(){
    buffer.clearRect(
        0,
        0,
        width,
        height
    );

    /* add 2 randomly placed drops */
    i = 1;
    do{
        drops.push([
            random_number(width),/* x */
            0,/* y */
            2,/* width */
            7/* height */
        ]);
    }while(i--);

    i = drops.length - 1;
    buffer.fillStyle = '#aaf';
    do{
        if(drops[i][1] > height){
            /* remove drop that reached bottom of screen */
            drops.splice(i, 1);

        }else{
            /* update drop position */
            drops[i][1] += Math.random() * 9 + 9;

            /* draw drop */
            buffer.fillRect(
                drops[i][0],
                drops[i][1],
                drops[i][2],
                drops[i][3]
            );
        }
    }while(i--);

    canvas.clearRect(
        0,
        0,
        width,
        height
    );
    canvas.drawImage(
        get('buffer'),
        0,
        0
    );
}

function get(i){
    return document.getElementById(i);
}

function random_number(i){
    return Math.floor(Math.random() * i);
}

function resize(){
    width = window.innerWidth;
    get('buffer').width = width;
    get('canvas').width = width;

    height = window.innerHeight;
    get('buffer').height = height;
    get('canvas').height = height;
}

var buffer = get('buffer').getContext('2d');
var canvas = get('canvas').getContext('2d');
var drops = [];
var height = 0;
var i = 0;
var width = 0;

resize();

setInterval('draw()', 30);

window.onresize = resize;
