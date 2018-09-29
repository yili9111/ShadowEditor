import UI from '../../ui/UI';
import AddObjectCommand from '../../command/AddObjectCommand';
import StringUtils from '../../utils/StringUtils';

import Group from '../../object/geometry/Group';
import Plane from '../../object/geometry/Plane';
import Box from '../../object/geometry/Box';
import Circle from '../../object/geometry/Circle';
import Cylinder from '../../object/geometry/Cylinder';
import Sphere from '../../object/geometry/Sphere';
import Icosahedron from '../../object/geometry/Icosahedron';
import Torus from '../../object/geometry/Torus';
import TorusKnot from '../../object/geometry/TorusKnot';
import Teapot from '../../object/geometry/Teapot';
import Lathe from '../../object/geometry/Lathe';

import PointLight from '../../object/light/PointLight';
import HemisphereLight from '../../object/light/HemisphereLight';
import RectAreaLight from '../../object/light/RectAreaLight';

/**
 * 添加菜单
 * @author tengge / https://github.com/tengge1
 * @param {*} options 
 */
function AddMenu(options) {
    UI.Control.call(this, options);
    this.app = options.app;
}

AddMenu.prototype = Object.create(UI.Control.prototype);
AddMenu.prototype.constructor = AddMenu;

AddMenu.prototype.render = function () {
    var container = UI.create({
        xtype: 'div',
        parent: this.parent,
        cls: 'menu',
        children: [{
            xtype: 'div',
            cls: 'title',
            html: '添加'
        }, {
            xtype: 'div',
            cls: 'options',
            children: [{
                xtype: 'div',
                html: '组',
                cls: 'option',
                onClick: this.addGroup.bind(this)
            }, {
                xtype: 'hr'
            }, {
                xtype: 'div',
                html: '平板',
                cls: 'option',
                onClick: this.addPlane.bind(this)
            }, {
                xtype: 'div',
                html: '正方体',
                cls: 'option',
                onClick: this.addBox.bind(this)
            }, {
                xtype: 'div',
                html: '圆',
                cls: 'option',
                onClick: this.addCircle.bind(this)
            }, {
                xtype: 'div',
                html: '圆柱体',
                cls: 'option',
                onClick: this.addCylinder.bind(this)
            }, {
                xtype: 'div',
                html: '球体',
                cls: 'option',
                onClick: this.addSphere.bind(this)
            }, {
                xtype: 'div',
                html: '二十面体',
                cls: 'option',
                onClick: this.addIcosahedron.bind(this)
            }, {
                xtype: 'div',
                html: '轮胎',
                cls: 'option',
                onClick: this.addTorus.bind(this)
            }, {
                xtype: 'div',
                html: '扭结',
                cls: 'option',
                onClick: this.addTorusKnot.bind(this)
            }, {
                xtype: 'div',
                html: '茶壶',
                cls: 'option',
                onClick: this.addTeaport.bind(this)
            }, {
                xtype: 'div',
                html: '酒杯',
                cls: 'option',
                onClick: this.addLathe.bind(this)
            }, {
                xtype: 'div',
                id: 'mAddSprite',
                html: '精灵',
                cls: 'option',
                onClick: this.addSprite.bind(this)
            }, {
                xtype: 'div',
                html: '文本',
                cls: 'option',
                onClick: this.addText.bind(this)
            }, {
                xtype: 'hr'
            }, {
                xtype: 'div',
                html: '环境光',
                cls: 'option',
                onClick: this.addAmbientLight.bind(this)
            }, {
                xtype: 'div',
                html: '平行光',
                cls: 'option',
                onClick: this.addDirectionalLight.bind(this)
            }, {
                xtype: 'div',
                html: '点光源',
                cls: 'option',
                onClick: this.addPointLight.bind(this)
            }, {
                xtype: 'div',
                html: '聚光灯',
                cls: 'option',
                onClick: this.addSpotLight.bind(this)
            }, {
                xtype: 'div',
                html: '半球光',
                cls: 'option',
                onClick: this.addHemisphereLight.bind(this)
            }, {
                xtype: 'div',
                html: '矩形光',
                cls: 'option',
                onClick: this.addRectAreaLight.bind(this)
            }]
        }]
    });

    container.render();
}

// ------------------------- 组 ---------------------------------

AddMenu.prototype.addGroup = function () {
    this.app.editor.execute(new AddObjectCommand(new Group()));
};

// ------------------------- 平板 -------------------------------

AddMenu.prototype.addPlane = function () {
    this.app.editor.execute(new AddObjectCommand(new Plane()));
};

// ------------------------ 正方体 -----------------------------

AddMenu.prototype.addBox = function () {
    this.app.editor.execute(new AddObjectCommand(new Box()));
};

// ------------------------ 圆 ----------------------------------

AddMenu.prototype.addCircle = function () {
    this.app.editor.execute(new AddObjectCommand(new Circle()));
};

// ------------------------圆柱体 -------------------------------

AddMenu.prototype.addCylinder = function () {
    this.app.editor.execute(new AddObjectCommand(new Cylinder()));
};

// ------------------------ 球体 -------------------------------

AddMenu.prototype.addSphere = function () {
    this.app.editor.execute(new AddObjectCommand(new Sphere()));
};

// ----------------------- 二十面体 -----------------------------

AddMenu.prototype.addIcosahedron = function () {
    this.app.editor.execute(new AddObjectCommand(new Icosahedron()));
};

// ----------------------- 轮胎 ---------------------------------

AddMenu.prototype.addTorus = function () {
    this.app.editor.execute(new AddObjectCommand(new Torus()));
};

// ----------------------- 纽结 ---------------------------------

AddMenu.prototype.addTorusKnot = function () {
    this.app.editor.execute(new AddObjectCommand(new TorusKnot()));
};

// ---------------------- 茶壶 ----------------------------------

AddMenu.prototype.addTeaport = function () {
    this.app.editor.execute(new AddObjectCommand(new Teapot()));
};

// ---------------------- 酒杯 ----------------------------------

AddMenu.prototype.addLathe = function () {
    this.app.editor.execute(new AddObjectCommand(new Lathe()));
};

// ---------------------- 精灵 -----------------------------------

AddMenu.prototype.addSprite = function () {
    var editor = this.app.editor;

    var sprite = new THREE.Sprite(new THREE.SpriteMaterial());
    sprite.name = '精灵';

    editor.execute(new AddObjectCommand(sprite));
};

// ---------------------- 文本 ----------------------------------

AddMenu.prototype.addText = function () {
    UI.prompt('请输入', null, '一些文字', (event, value) => {
        this.drawText(value);
    });
};

AddMenu.prototype.drawText = function (text) {
    var canvas = document.createElement('canvas');

    var fontSize = 64;

    var ctx = canvas.getContext('2d');
    ctx.font = `${fontSize}px sans-serif`;

    var textMetrics = ctx.measureText(text);
    canvas.width = StringUtils.makePowOfTwo(textMetrics.width);
    canvas.height = fontSize;
    ctx.textBaseline = 'hanging';
    ctx.font = `${fontSize}px sans-serif`; // 重新设置画布大小，前面设置的ctx属性全部失效

    ctx.fillStyle = 'rgba(0,0,0,0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(255,255,255,1)';
    ctx.fillText(text, (canvas.width - textMetrics.width) / 2, 0);

    var map = new THREE.CanvasTexture(canvas, );

    var geometry = new THREE.PlaneBufferGeometry(canvas.width / 10, canvas.height / 10);
    var material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        map: map,
        transparent: true
    });

    var mesh = new THREE.Mesh(geometry, material);
    mesh.name = text;

    var editor = this.app.editor;

    editor.execute(new AddObjectCommand(mesh));
};

// ------------------------- 环境光 ------------------------------

AddMenu.prototype.addAmbientLight = function () {
    var editor = this.app.editor;

    var color = 0xaaaaaa;

    var light = new THREE.AmbientLight(color);
    light.name = '环境光';

    editor.execute(new AddObjectCommand(light));
};

// ------------------------- 平行光 ------------------------------

AddMenu.prototype.addDirectionalLight = function () {
    var editor = this.app.editor;

    var color = 0xffffff;
    var intensity = 1;

    var light = new THREE.DirectionalLight(color, intensity);
    light.name = '平行光';
    light.castShadow = true;
    light.shadow.mapSize.x = 2048;
    light.shadow.mapSize.y = 2048;
    light.shadow.camera.left = -100;
    light.shadow.camera.right = 100;
    light.shadow.camera.top = 100;
    light.shadow.camera.bottom = -100;
    light.position.set(5, 10, 7.5);

    editor.execute(new AddObjectCommand(light));
};

// ------------------------- 点光源 ------------------------------

AddMenu.prototype.addPointLight = function () {
    var editor = this.app.editor;

    var color = 0xffffff;
    var intensity = 1;
    var distance = 0;

    var light = new PointLight(color, intensity, distance);
    light.name = '点光源';
    light.position.y = 5;
    light.castShadow = true;

    editor.execute(new AddObjectCommand(light));
};

// ------------------------- 聚光灯 ------------------------------

AddMenu.prototype.addSpotLight = function () {
    var editor = this.app.editor;

    var color = 0xffffff;
    var intensity = 1;
    var distance = 0;
    var angle = Math.PI * 0.1;
    var penumbra = 0;

    var light = new THREE.SpotLight(color, intensity, distance, angle, penumbra);

    light.name = '聚光灯';
    light.castShadow = true;

    light.position.set(5, 10, 7.5);

    editor.execute(new AddObjectCommand(light));
};

// ------------------------- 半球光 ------------------------------

AddMenu.prototype.addHemisphereLight = function () {

    var editor = this.app.editor;
    var skyColor = 0x00aaff;
    var groundColor = 0xffaa00;
    var intensity = 1;

    var light = new HemisphereLight(skyColor, groundColor, intensity);
    light.name = '半球光';

    light.position.set(0, 10, 0);

    editor.execute(new AddObjectCommand(light));
};

// ------------------------- 矩形光 ------------------------------

AddMenu.prototype.addRectAreaLight = function () {
    var editor = this.app.editor;

    var color = 0xffffff;
    var intensity = 1;
    var width = 20;
    var height = 10;

    var light = new RectAreaLight(color, intensity, width, height);
    light.name = '矩形光';

    light.position.set(0, 6, 0);

    editor.execute(new AddObjectCommand(light));
};

export default AddMenu;