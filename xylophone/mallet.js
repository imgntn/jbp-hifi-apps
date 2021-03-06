(function() {

    var MALLET_MODEL_URL = Script.resolvePath('mallet.fbx');
    var MALLET_COLLISION_HULL_URL = Script.resolvePath('mallet_collision_hull.obj');
    var SPRING_MALLET_SCRIPT_URL = Script.resolvePath('springMallet.js');

    var _this;

    function Mallet() {
        _this = this;
    }

    function createSpringMallet() {
        var originalProps = Entities.getEntityProperties(_this.entityID);
        var props = {
            type: 'Model',
            name: 'Xylophone SpringMallet',
            modelURL: MALLET_MODEL_URL,
            dimensions: {
                x: 0.56,
                y: 0.06,
                z: 0.06
            },
            description: _this.hand,
            restitution: 0,
            dynamic: true,
            collidesWith: 'dynamic,static,kinematic',
            rotation: originalProps.rotation,
            position: originalProps.position,
            shapeType: 'compound',
            compoundShapeURL: MALLET_COLLISION_HULL_URL,
            visible: true,
            script: SPRING_MALLET_SCRIPT_URL,
            userData:JSON.stringify({
                grabbableKey:{
                    grabbable:false
                }
            })
        }
        _this.springMallet = Entities.addEntity(props);
    }

    function destroySpringMallet() {
       
        Entities.deleteEntity(_this.springMallet);
    }

    function enterPlayingMode() {

        if(Entities.getEntityProperties(_this.entityID).description.indexOf('playing')>-1){
            // print('already playing dont duplicate')
            return
        }

        Entities.editEntity(_this.entityID,{
            description:'playing'
        });
        makeOriginalInvisible();
        createSpringMallet();
        createSpringAction();

    }

    function exitPlayingMode() {
        Entities.editEntity(_this.entityID,{
            description:''
        });
        _this.lastSpringMalletProps = Entities.getEntityProperties(_this.springMallet);
        makeOriginalVisible();
        deleteSpringAction();
        destroySpringMallet();
    
    }

    function makeOriginalInvisible() {
        Entities.editEntity(_this.entityID, {
            visible: false,
            collisionless: true
        });
    }

    function makeOriginalVisible() {
        Entities.editEntity(_this.entityID, {
            visible: true,
            collisionless: false,
            position: _this.lastSpringMalletProps.position,
            rotation: _this.lastSpringMalletProps.rotation,
            angularVelocity: {
                x: 0,
                y: 0,
                z: 0
            },
            velocity: {
                x: 0,
                y: 0,
                z: 0
            }
        });
    }

    function createSpringAction() {
        var targetProps = Entities.getEntityProperties(_this.entityID);

        var ACTION_TTL = 10; // seconds

        var props = {
            // targetPosition: getControllerLocation().position,
            // targetRotation: getControllerLocation().rotation,
            targetPosition: targetProps.position,
            targetRotation: targetProps.rotation,
            linearTimeScale: 0.001,
            angularTimeScale: 0.001,
            tag: getTag(),
            ttl: ACTION_TTL
        };

        _this.actionID = Entities.addAction("spring", _this.springMallet, props);


        return;
    }

    function getControllerLocation() {

        var standardControllerValue = (_this.hand === 'right') ? Controller.Standard.RightHand : Controller.Standard.LeftHand;

        var position = Vec3.sum(Vec3.multiplyQbyV(MyAvatar.orientation, Controller.getPoseValue(standardControllerValue).translation), MyAvatar.position);

        var rotation = Quat.multiply(MyAvatar.orientation, Controller.getPoseValue(standardControllerValue).rotation)

        rotation = Quat.multiply(rotation, Quat.angleAxis(90, {
            x: 0,
            y: 0,
            z: 1
        }));


        return {
            position: position,
            rotation: rotation
        }
    }

    function updateSpringAction() {
        // print('updating spring action::' + _this.actionID)
        var targetProps = Entities.getEntityProperties(_this.entityID);
        var ACTION_TTL = 10; // seconds

        var props = {
            // targetPosition: getControllerLocation().position,
            // targetRotation: getControllerLocation().rotation,
            targetPosition: targetProps.position,
            targetRotation: targetProps.rotation,
            linearTimeScale: 0.001,
            angularTimeScale: 0.001,
            tag: getTag(),
            ttl: ACTION_TTL
        };

        var success = Entities.updateAction(_this.springMallet, _this.actionID, props);
        return;
    }

    function deleteSpringAction() {
        Entities.deleteAction(_this.springMallet, _this.actionID);

    }

    function getTag() {
        return "mallet-" + MyAvatar.sessionUUID;
    }


    Mallet.prototype = {
        springAction: null,
        springMallet: null,
        hand: null,
        preload: function(entityID) {
            _this.entityID = entityID;

        },
        startNearGrab: function(entityID, data) {
            _this.hand = data[0]
            enterPlayingMode();
        },
        continueNearGrab: function() {
            updateSpringAction();
        },
        releaseGrab: function() {
            exitPlayingMode();
        }
    };



    return new Mallet();
});