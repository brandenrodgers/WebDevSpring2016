(function(){
    angular
    .module("app", [])
    .controller("DrawingController", function($scope){
        $scope.reset = reset;

        function reset(){
            var canvas = document.getElementById('canvas');
            var context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);
        }
    })
    .directive("drawing", drawing);

    function drawing(){

        return {
            restrict: "A",
            link: function(scope, element){
                var ctx = element[0].getContext('2d');

                // variable that decides if something should be drawn on mousemove
                var drawing = false;

                // the last coordinates before the current move
                var lastX;
                var lastY;

                element.bind('touchstart', drawStart.bind(event));
                element.bind('mousedown', drawStart.bind(event));
                element.bind('touchmove', drawMove.bind(event));
                element.bind('mousemove', drawMove.bind(event));
                element.bind('touchend', drawEnd.bind(event));
                element.bind('mouseup', drawEnd.bind(event));

                function drawStart(event){
                    event.preventDefault();
                    if (event.type == "mousedown") {
                        if (event.offsetX !== undefined) {
                            lastX = event.offsetX;
                            lastY = event.offsetY;
                        } else { // Firefox compatibility
                            lastX = event.layerX - event.currentTarget.offsetLeft;
                            lastY = event.layerY - event.currentTarget.offsetTop;
                        }
                    }
                    else {
                        lastX = event.touches[0].pageX;
                        lastY = event.touches[0].pageY;
                    }

                    // begins new line
                    ctx.beginPath();

                    drawing = true;
                }

                function drawMove(event){
                    if(drawing){
                        // get current mouse position
                        if (event.type == "mousemove") {
                            if (event.offsetX !== undefined) {
                                currentX = event.offsetX;
                                currentY = event.offsetY;
                            } else {
                                currentX = event.layerX - event.currentTarget.offsetLeft;
                                currentY = event.layerY - event.currentTarget.offsetTop;
                            }
                        }
                        else {
                            currentX = event.touches[0].pageX;
                            currentY = event.touches[0].pageY;
                        }

                        draw(lastX, lastY, currentX, currentY);

                        // set current coordinates to last one
                        lastX = currentX;
                        lastY = currentY;
                    }

                }

                function drawEnd(event){
                    // stop drawing
                    drawing = false;
                }

                function draw(lX, lY, cX, cY){
                    // line from
                    ctx.moveTo(lX,lY);
                    // to
                    ctx.lineTo(cX,cY);
                    // color
                    ctx.strokeStyle = "#4bf";
                    // draw it
                    ctx.stroke();
                }
            }
        };
    }

})();
