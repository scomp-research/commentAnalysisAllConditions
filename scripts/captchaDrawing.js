var oc= document.getElementById('c1');
var ogc=oc.getContext('2d');
window.onload= function(){
    var left = $('#c1').offset().left;
    var top = $('#c1').offset().top;
    ogc.lineWidth = 2;
    oc.onmousedown = function(ev){
        var ev = ev || window.event;
            ogc.moveTo(ev.pageX - left ,ev.pageY - top);
            document.onmousemove = function(ev){
                var ev = ev || window.event;
                ogc.lineTo(ev.pageX - left ,ev.pageY - top);
                ogc.stroke();
            };
            document.onmouseup = function(){
                document.onmousemove = null;
                document.onmouseup = null;
            };
    }

};
// eraser
function clearImg() {
        ogc.fillStyle="#fff";
        ogc.beginPath();
        ogc.fillRect(0,0,316,306);
        ogc.closePath();
}

// submit canvas 
function validation() {
    $('#c1').parent('div').append('<div style="width: 100%;height: 100%;background-color: #ddd;position: absolute;top: 0;left: 0;opacity: 0.4"></div>');
    $('.verifybtn>a>img').attr('src', 'img/button-submitting.png');
    setTimeout(function () {
        $('.verifybtn>a>img').attr('src', 'img/button-submitted.png');
    }, 1500);
    var caxvas = document.getElementById('c1');
    var imgBase = caxvas.toDataURL("image/png");
    console.log(imgBase)
    return imgBase; // imgBase = 64base string for the png
}
