import BingTileSystem from '../../utils/BingTileSystem';

var bing = new BingTileSystem();

/**
 * 瓦片材质
 * @author tengge / https://github.com/tengge1
 * @param {*} x 
 * @param {*} y 
 * @param {*} z 
 */
function TiledMaterial(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;

    this.loaded = false;

    if (z < 1) { // 0层级没底图
        return;
    }

    this.image = document.createElement('img');
    this.image.crossOrigin = 'anonymous';

    this.image.onload = () => {
        this.image.onload = null;
        this.image.onerror = null;
        this.loaded = true;
    };

    this.image.onerror = () => {
        this.image.onload = null;
        this.image.onerror = null;
    };

    this.image.src = bing.tileXYToUrl(x, y, z);
}

export default TiledMaterial;