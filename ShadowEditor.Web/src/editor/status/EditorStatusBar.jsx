import './css/EditorStatusBar.css';
import { Toolbar, ToolbarSeparator, Label, Select } from '../../third_party';

/**
 * 状态栏
 * @author tengge / https://github.com/tengge1
 */
class EditorStatusBar extends React.Component {
    constructor(props) {
        super(props);

        this.selectMode = {
            whole: _t('Select Whole'),
            part: _t('Select Part')
        };

        this.controlMode = {
            EditorControls: _t('Editor Controls'),
            FreeControls: _t('Free Controls')
        };

        this.state = {
            objects: 0,
            vertices: 0,
            triangles: 0
        };

        this.handleUpdateSceneInfo = this.handleUpdateSceneInfo.bind(this);
        this.handleChangeSelectMode = this.handleChangeSelectMode.bind(this);
        this.handleChangeControlMode = this.handleChangeControlMode.bind(this);
    }

    render() {
        const { objects, vertices, triangles } = this.state;

        const selectMode = app.storage.selectMode;
        const controlMode = app.storage.controlMode;

        const isLogin = !app.server.enableAuthority || app.server.isLogin;

        return <Toolbar className={'EditorStatusBar'}>
            <Label>{`r${THREE.REVISION}`}</Label>
            <ToolbarSeparator />
            <Label>{_t('Object')}</Label>
            <Label className={'value'}>{objects}</Label>
            <Label>{_t('Vertex')}</Label>
            <Label className={'value'}>{vertices}</Label>
            <Label>{_t('Triangle')}</Label>
            <Label className={'value'}>{triangles}</Label>
            <ToolbarSeparator />
            {isLogin && <>
                <Label>{_t('Selected Mode')}</Label>
                <Select name={'selectMode'}
                    options={this.selectMode}
                    value={selectMode}
                    onChange={this.handleChangeSelectMode}
                />
                <ToolbarSeparator />
            </>}
            {isLogin && <>
                <Label>{_t('Control Mode')}</Label>
                <Select name={'controlMode'}
                    options={this.controlMode}
                    value={controlMode}
                    onChange={this.handleChangeControlMode}
                />
                <ToolbarSeparator />
            </>}
        </Toolbar>;
    }

    componentDidMount() {
        app.on(`objectAdded.EditorStatusBar`, this.handleUpdateSceneInfo);
        app.on(`objectRemoved.EditorStatusBar`, this.handleUpdateSceneInfo);
        app.on(`geometryChanged.EditorStatusBar`, this.handleUpdateSceneInfo);
    }

    handleUpdateSceneInfo() {
        var editor = app.editor;

        var scene = editor.scene;

        var objects = 0,
            vertices = 0,
            triangles = 0;

        for (var i = 0, l = scene.children.length; i < l; i++) {
            var object = scene.children[i];

            object.traverseVisible(function (object) {
                objects++;

                if (object instanceof THREE.Mesh) {
                    var geometry = object.geometry;

                    if (geometry instanceof THREE.Geometry) {
                        vertices += geometry.vertices.length;
                        triangles += geometry.faces.length;
                    } else if (geometry instanceof THREE.BufferGeometry) {
                        if (geometry.index !== null) {
                            vertices += geometry.index.count * 3;
                            triangles += geometry.index.count;
                        } else if (geometry.attributes.position) {
                            vertices += geometry.attributes.position.count;
                            triangles += geometry.attributes.position.count / 3;
                        }
                    }
                }
            });
        }

        this.setState({
            objects: objects.format(),
            vertices: vertices.format(),
            triangles: triangles.format()
        });
    }

    handleChangeSelectMode(value) {
        app.storage.selectMode = value;
        this.forceUpdate();
    }

    handleChangeControlMode(value) {
        app.editor.controls.changeMode(value);
        app.storage.controlMode = value;
        this.forceUpdate();
    }
}

export default EditorStatusBar;