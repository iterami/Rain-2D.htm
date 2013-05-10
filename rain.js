function draw(){
    buffer.clearRect(0,0,width,height);

    /*add 2 randomly placed drops*/
    i=1;
    do{
        drops.push([random_number(width),0,2,7])
    }while(i--);

    i=drops.length-1;
    buffer.fillStyle='#aaf';
    do{
        if(drops[i][1]>height){
            /*remove drop that reached bottom of screen*/
            drops.splice(i,1)
        }else{
            /*update drop position*/
            drops[i][1]+=Math.random()*9+9;

            /*draw drop*/
            buffer.fillRect(drops[i][0],drops[i][1],drops[i][2],drops[i][3])
        }
    }while(i--)

    canvas.clearRect(0,0,width,height);
    canvas.drawImage(get('buffer'),0,0)
}
function get(i){
    return document.getElementById(i)
}
function random_number(i){
    return Math.floor(Math.random()*i)
}
function resize(){
    width=get('buffer').width=get('canvas').width=window.innerWidth;
    height=get('buffer').height=get('canvas').height=window.innerHeight
}
var buffer=canvas=height=i=width=0,
drops=[];

buffer=get('buffer').getContext('2d');
canvas=get('canvas').getContext('2d');

resize();

setInterval('draw()',30);

window.onresize=resize
