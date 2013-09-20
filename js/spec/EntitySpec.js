describe("Entity2d", function () {
    var entity;
    var position;
    var velocity;
    var acceleration;
    var sprite;

    beforeEach(function () {
        position = jasmine.createSpyObj('vector2d', ['getX', 'getY', 'setX', 'setY', 'addX', 'addY']);
        velocity = jasmine.createSpyObj('vector2d', ['getX', 'getY', 'setX', 'setY', 'addX', 'addY']);
        acceleration = jasmine.createSpyObj('vector2d', ['getX', 'getY', 'setX', 'setY', 'addX', 'addY']);
        sprite = jasmine.createSpyObj('sprite', ['draw']);
        entity = new Entity2d(position, velocity, acceleration, sprite);
    });

    it("should draw its sprite", function () {
        entity.draw();
        expect(sprite.draw).toHaveBeenCalledWith(position);
    });

    it("should move right when it has velocity of positive X", function () {
        velocity.getX = jasmine.createSpy("getX() spy").andReturn(1);
        entity.update();
        expect(position.addX).toHaveBeenCalledWith(1);
    });

    it("should move down when it has velocity of positive Y", function () {
        velocity.getY = jasmine.createSpy("getY() spy").andReturn(1);
        entity.update();
        expect(position.addY).toHaveBeenCalledWith(1);
    });

    it("should have positive velocity when it has acceleration of positive Y", function () {
        acceleration.getY = jasmine.createSpy("getY() spy").andReturn(1);
        entity.update();
        expect(velocity.addY).toHaveBeenCalledWith(1);
    });

    it("should have negative velocity when it jumps", function () {
        entity.jump();
        expect(velocity.setY).toHaveBeenCalledWith(-5);
    });
});