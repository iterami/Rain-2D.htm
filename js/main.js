'use strict';

function repo_drawlogic(){
    canvas_setproperties({
      'properties': {
        'fillStyle': '#aaf',
      },
    });
    entity_group_modify({
      'groups': [
        'drop',
      ],
      'todo': function(entity){
          canvas_buffer.fillRect(
            entity_entities[entity]['x'],
            entity_entities[entity]['y'],
            2,
            7
          );
      },
    });

    canvas_setproperties({
      'properties': {
        'fillStyle': '#777',
      },
    });
    entity_group_modify({
      'groups': [
        'object',
      ],
      'todo': function(entity){
          canvas_buffer.fillRect(
            entity_entities[entity]['x'],
            entity_entities[entity]['y'],
            entity_entities[entity]['width'],
            entity_entities[entity]['height']
          );
      },
    });
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
          entity_entities[drop]['y'] += core_random_integer({
            'max': 9,
          }) + 9;

          let remove = false;

          if(entity_entities[drop]['y'] > canvas_properties['height']){
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

                if(entity_entities[drop]['x'] > entity_entities[entity]['x']
                  && entity_entities[drop]['x'] < entity_entities[entity]['x'] + entity_entities[entity]['width']
                  && entity_entities[drop]['y'] > entity_entities[entity]['y']
                  && entity_entities[drop]['y'] < entity_entities[entity]['y'] + entity_entities[entity]['height']){
                    remove = true;
                }
            },
          });

          if(remove){
              entity_remove({
                'entities': [
                  drop,
                ],
              });
          }
      },
    });
}

function repo_init(){
    core_repo_init({
      'globals': {
        'drop_counter': 0,
      },
      'keybinds': {
        83: {
          'todo': function(){
              drop_counter = Math.max(
                drop_counter - 1,
                0
              );
          },
        },
        87: {
          'todo': function(){
              drop_counter++;
          },
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
