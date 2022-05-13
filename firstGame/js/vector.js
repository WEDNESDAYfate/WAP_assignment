var Vector2 = {
    create: function (x, y) {
        var new_vector = Object.create(this);
        new_vector.x = x;
        new_vector.y = y;

        return new_vector;
    }


};