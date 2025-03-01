import { Mesh, TextureLoader, ShaderMaterial} from "three"
import vertex from './vertex.glsl'
import fragment from './fragment.glsl'

export default class Media {
    constructor({
        geometry,
        scene,
        image,
        screen,
        viewport,
        index
    }) {
        this.geometry = geometry
        this.scene = scene
        this.image = image
        this.screen = screen
        this.viewport = viewport
        this.index = index
        this.createMesh()
        this.setPosition()
        this.createScene()
    }

    createMesh(){
        const textures = new TextureLoader().load(this.image);
        const geometry = this.geometry;
        
        // Assign material to `this.mat`
        this.mat = new ShaderMaterial({
            vertexShader: vertex,
            fragmentShader: fragment,
            uniforms: {
                tmap: { value: textures },
                uPlaneSize: { value: [0, 0] },
                uImageSize: { value: [0, 0] },
            }
        });
    
        this.plane = new Mesh(geometry, this.mat);
    
        // // Load image and update uniform once it's loaded
        // const image = new Image();
        // image.src = this.image;
        // image.onload = () => {

        //     console.log(image.naturalWidth)

    
        //     // Access `this.mat` correctly
        //     this.mat.uniforms.uImageSize.value = [
        //         image.naturalWidth,
        //         image.naturalHeight,
        //     ];

        // };
        this.plane = new Mesh(geometry,this.mat)
        
    }
    createScene(){
        this.scene = this.scene;
        this.scene.add(this.plane)
    }
    setPosition(){
        this.padding = 0.1
        this.plane.position.x = (this.plane.scale.x  + this.padding) * this.index - 3
        this.plane.material.uniforms.uPlaneSize.value = [
            this.plane.scale.x,
            this.plane.scale.y,
        ];        
        console.log(this.plane.material.uniforms.uImageSize.value)
    }
} 