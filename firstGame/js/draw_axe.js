function draw_axis(context, color) {

    context.beginPath();
    context.strokeStyle = color;

    context.moveTo(0, height / 2);
    context.lineTo(width, height / 2);
    context.stroke();

    context.moveTo(width / 2, 0);
    context.lineTo(width / 2, height);
    context.stroke();

}