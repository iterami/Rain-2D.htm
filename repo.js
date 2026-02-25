'use strict';

function check_collision(drop){
    let remove = false;

    entity_group_modify({
      'groups': [
        'object',
      ],
      'todo': function(entity){
          if(remove){
              return;
          }

          if(drop.x > entity.x
            && drop.x < entity.x + entity.width
            && drop.y > entity.y
            && drop.y < entity.y + entity.height){
              remove = true;
          }
      },
    });

    return remove;
}

function draw_drop(entity){
    canvas.fillRect(
      entity.x,
      entity.y,
      2,
      7
    );
}

function draw_object(entity){
    canvas.fillRect(
      entity.x,
      entity.y,
      entity.width,
      entity.height
    );
}

function move_drop(drop){
    drop.y += core_random_integer(9) + 9;

    const remove = drop.y > canvas_properties.height
      || check_collision(drop);
    if(remove){
        entity_remove({
          'entities': [
            drop.id,
          ],
        });
    }
}

function repo_drawlogic(){
    canvas_setproperties({
      'fillStyle': '#aaf',
    });
    entity_group_modify({
      'groups': [
        'drop',
      ],
      'todo': draw_drop,
    });

    canvas_setproperties({
      'fillStyle': '#777',
    });
    entity_group_modify({
      'groups': [
        'object',
      ],
      'todo': draw_object,
    });
}

function repo_init(){
    core_repo_init({
      'globals': {
        'drop_counter': 1,
      },
      'keybinds': {
        'KeyS': {
          'down': function(){
              drop_counter = Math.max(
                drop_counter - 1,
                0
              );
          },
        },
        'KeyW': {
          'down': function(){
              drop_counter++;
          },
        },
      },
      'pointerbinds': {
        'pointerdown': {
          'todo': set_position,
        },
        'pointermove': {
          'todo': set_position,
        },
      },
      'title': 'Rain-2D.htm',
    });
    entity_set({
      'properties': {
        'height': 40,
        'width': 200,
      },
      'type': 'object',
    });
    entity_set({
      'type': 'drop',
    });
    canvas_init({
      'cursor': 'pointer',
    });
}

function repo_load(){
    entity_create({
      'id': 'obstacle',
      'properties': {
        'x': canvas_properties.width_half,
        'y': canvas_properties.height_half,
      },
      'types': [
        'object',
      ],
    });
}

function repo_logic(){
    for(let i = 0; i < drop_counter; i++){
        entity_create({
          'properties': {
            'x': core_random_integer(canvas_properties.width),
            'y': -99,
          },
          'types': [
            'drop',
          ],
        });
    }

    entity_group_modify({
      'groups': [
        'drop',
      ],
      'todo': move_drop,
    });
}

function set_position(){
    if(!core_pointer.down_0){
        return;
    }

    entity_entities.obstacle.x = core_pointer.x - entity_entities.obstacle.width / 2;
    entity_entities.obstacle.y = core_pointer.y - entity_entities.obstacle.height / 2;
}
