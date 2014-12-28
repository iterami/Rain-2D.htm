function create_drop(){
    drops.push([
      Math.floor(Math.random() * width),// X
      -99,// Y
    ]);
}

function draw(){
    buffer.clearRect(
      0,
      0,
      width,
      height
    );

    buffer.fillStyle = '#aaf';
    loop_counter = drops.length - 1;
    do{
        // Draw drop.
        buffer.fillRect(
          drops[loop_counter][0],
          drops[loop_counter][1],
          2,
          7
        );
    }while(loop_counter--);

    buffer.fillStyle = '#777';
    buffer.fillRect(
      object[0],
      object[1],
      200,
      40
    );

    canvas.clearRect(
      0,
      0,
      width,
      height
    );
    canvas.drawImage(
      document.getElementById('buffer'),
      0,
      0
    );

    window.requestAnimationFrame(draw);
}

function init(){
    resize();

    object[0] = width / 2 - 100;
    object[1] = height / 2 - 20;

    create_drop();

    window.requestAnimationFrame(draw);
    setInterval(
      'logic()',
      30
    );
}

function logic(){
    // Add 2 randomly placed drops.
    var loop_counter = 1;
    do{
        create_drop();
    }while(loop_counter--);

    buffer.fillStyle = '#aaf';
    loop_counter = drops.length - 1;
    do{
        if(drops[loop_counter][1] > height
          || !(
            drops[loop_counter][0] <= object[0]
            || drops[loop_counter][1] <= object[1]
            || drops[loop_counter][0] - 200 >= object[0]
            || drops[loop_counter][1] - 40 >= object[1]
          )){
            // Remove drop that reached bottom of screen
            //   or collided with the object.
            drops.splice(
              loop_counter,
              1
            );

        }else{
            // Update drop position.
            drops[loop_counter][1] += Math.random() * 9 + 9;
        }
    }while(loop_counter--);
}

function resize(){
    height = window.innerHeight;
    document.getElementById('buffer').height = height;
    document.getElementById('canvas').height = height;

    width = window.innerWidth;
    document.getElementById('buffer').width = width;
    document.getElementById('canvas').width = width;
}

var buffer = document.getElementById('buffer').getContext('2d');
var canvas = document.getElementById('canvas').getContext('2d');
var drops = [];
var height = 0;
var object = [
  0,
  0
];
var width = 0;

window.onload = init;

window.onmousedown =
  window.ontouchstart = function(e){
    object[0] = e.pageX - 100;
    object[1] = e.pageY - 20;
};

window.onresize = resize;