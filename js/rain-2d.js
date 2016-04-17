'use strict';

function draw_logic(){
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

function resize_logic(){
    buffer.font = '23pt sans-serif';
}

var drag = false;
var drop_counter = 1;
var drops = [];
var object = {
  'x': 0,
  'y': 0,
};

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
    init_canvas();

    object['x'] = width / 2 - 100;
    object['y'] = height / 2;
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
