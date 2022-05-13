function draw_grid(context, size, color) {

    context.beginPath();
    context.strokeStyle = color;
    for (var x = 0; x < width; x += size) {
        context.moveTo(x, 0);
        context.lineTo(x, height);
    }

    for (var y = 0; y < width; y += size) {
        context.moveTo(0, y);
        context.lineTo(width, y);
    }
    context.stroke();
}