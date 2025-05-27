'use strict';

function load_data(){
    entity_create({
      'id': 'obstacle',
      'properties': {
        'x': canvas_properties['width-half'],
        'y': canvas_properties['height-half'],
      },
      'types': [
        'object',
      ],
    });
}

function repo_drawlogic(){
    canvas_setproperties({
      'fillStyle': '#aaf',
    });
    entity_group_modify({
      'groups': [
        'drop',
      ],
      'todo': function(entity){
          canvas.fillRect(
            entity['x'],
            entity['y'],
            2,
            7
          );
      },
    });

    canvas_setproperties({
      'fillStyle': '#777',
    });
    entity_group_modify({
      'groups': [
        'object',
      ],
      'todo': function(entity){
          canvas.fillRect(
            entity['x'],
            entity['y'],
            entity['width'],
            entity['height']
          );
      },
    });
}

function repo_init(){
    core_repo_init({
      'globals': {
        'drop_counter': 0,
      },
      'keybinds': {
        'KeyS': {
          'todo': function(){
              drop_counter = Math.max(
                drop_counter - 1,
                0
              );
          },
        },
        'KeyW': {
          'todo': function(){
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
    canvas_init();
}

function repo_logic(){
    let loop_counter = drop_counter;
    do{
        entity_create({
          'properties': {
            'x': core_random_integer({
              'max': canvas_properties['width'],
            }),
            'y': -99,
          },
          'types': [
            'drop',
          ],
        });
    }while(loop_counter--);

    entity_group_modify({
      'groups': [
        'drop',
      ],
      'todo': function(drop){
          drop['y'] += core_random_integer({
            'max': 9,
          }) + 9;

          let remove = false;

          if(drop['y'] > canvas_properties['height']){
              remove = true;
          }

          entity_group_modify({
            'groups': [
              'object',
            ],
            'todo': function(entity){
                if(remove){
                    return;
                }

                if(drop['x'] > entity['x']
                  && drop['x'] < entity['x'] + entity['width']
                  && drop['y'] > entity['y']
                  && drop['y'] < entity['y'] + entity['height']){
                    remove = true;
                }
            },
          });

          if(remove){
              entity_remove({
                'entities': [
                  drop['id'],
                ],
              });
          }
      },
    });
}

function set_position(){
    if(!core_pointer['down-0']){
        return;
    }

    entity_entities['obstacle']['x'] = core_pointer['x'] - entity_entities['obstacle']['width'] / 2;
    entity_entities['obstacle']['y'] = core_pointer['y'] - entity_entities['obstacle']['height'] / 2;
}
