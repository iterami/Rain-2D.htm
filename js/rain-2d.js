function draw(){
    buffer.clearRect(
      0,
      0,
      width,
      height
    );

    // Draw drops.
    buffer.fillStyle = '#aaf';
    for(var drop in drops){
        buffer.fillRect(
          drops[drop][0],
          drops[drop][1],
          2,
          7
        );
    }

    // Draw object.
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

function logic(){
    // Add 2 randomly placed drops.
    var loop_counter = 1;
    do{
        drops.push([
          Math.floor(Math.random() * width),// X
          -99,// Y
        ]);
    }while(loop_counter--);

    // Update drop positions.
    for(var drop in drops){
        drops[drop][1] += Math.random() * 9 + 9;

        // Delete drops below bottom of screen
        //   or that collided with the object.
        if(drops[drop][1] > height
          || !(
            drops[drop][0] <= object[0]
            || drops[drop][1] <= object[1]
            || drops[drop][0] - 200 >= object[0]
            || drops[drop][1] - 40 >= object[1]
          )){
            drops.splice(
              drop,
              1
            );
        }
    }
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
var drag = false;
var drops = [];
var height = 0;
var object = [
  0,
  0,
];
var width = 0;

window.onload = function(){
    resize();

    object[0] = width / 2 - 100;
    object[1] = height / 2 - 20;

    window.requestAnimationFrame(draw);
    window.setInterval(
      'logic()',
      30
    );
};

window.onmousedown =
  window.ontouchstart = function(e){
    drag = true;
    object[0] = e.pageX - 100;
    object[1] = e.pageY - 20;
};

window.onmousemove =
  window.ontouchmove = function(e){
    if(!drag){
        return;
    }

    object[0] = e.pageX - 100;
    object[1] = e.pageY - 20;
}

window.onmouseup =
  window.ontouchend = function(e){
    drag = false;
};

window.onresize = resize;
