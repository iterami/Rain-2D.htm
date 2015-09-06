'use strict';

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
          drops[drop]['x'],
          drops[drop]['y'],
          2,
          7
        );
    }

    // Draw object.
    buffer.fillStyle = '#777';
    buffer.fillRect(
      object['x'],
      object['y'],
      200,
      -40
    );

    // Draw number of particles.
    buffer.fillStyle = '#fff';
    buffer.fillText(
      drops.length,
      object['x'],
      object['y']
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
    // Add some randomly placed drops.
    var loop_counter = drop_counter;
    do{
        drops.push({
          'x': Math.floor(Math.random() * width),
          'y': -99,
        });
    }while(loop_counter--);

    // Update drop positions.
    for(var drop in drops){
        drops[drop]['y'] += Math.random() * 9 + 9;

        // Delete drops below bottom of screen
        //   or that collided with the object.
        if(drops[drop]['y'] > height
          || !(
            drops[drop]['x'] <= object['x']
            || drops[drop]['y'] + 40 <= object['y']
            || drops[drop]['x'] - 200 >= object['x']
            || drops[drop]['y'] >= object['y']
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

    buffer.font = '23pt sans-serif';
}

var buffer = document.getElementById('buffer').getContext('2d', {
  'alpha': false,
});
var canvas = document.getElementById('canvas').getContext('2d', {
  'alpha': false,
});
var drag = false;
var drop_counter = 1;
var drops = [];
var height = 0;
var object = {
  'x': 0,
  'y': 0,
};
var width = 0;

window.onkeydown = function(e){
    var key = e.keyCode || e.which;

    // +: drop_counter++;
    if(key === 187){
        drop_counter++;

    // -: drop_counter--;
    }else if(key === 189){
        drop_counter = drop_counter > 0
          ? drop_counter - 1
          : 0;
    }
};

window.onload = function(e){
    resize();

    object['x'] = width / 2 - 100;
    object['y'] = height / 2;

    window.requestAnimationFrame(draw);
    window.setInterval(
      'logic()',
      30
    );
};

window.onmousedown =
  window.ontouchstart = function(e){
    drag = true;
    object['x'] = e.pageX - 100;
    object['y'] = e.pageY;
};

window.onmousemove =
  window.ontouchmove = function(e){
    if(!drag){
        return;
    }

    object['x'] = e.pageX - 100;
    object['y'] = e.pageY;
};

window.onmouseup =
  window.ontouchend = function(e){
    drag = false;
};

window.onresize = resize;
