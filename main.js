// import * as THREE from 'three';
// import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
// import * as CANNON from 'cannon-es';
// import vertex from './vertex.glsl'
// import fragment from './fragment.glsl'
// import Media from './media.js'

// const width = window.innerWidth
// const height = window.innerHeight
// const renderer = new THREE.WebGLRenderer({antialias: true});
// renderer.setSize(width, height);
// renderer.setClearColor('#fffdf8');
// document.body.appendChild(renderer.domElement);
// const scene = new THREE.Scene();


// const camera = new THREE.PerspectiveCamera(
//     24,
//     window.innerWidth / window.innerHeight,
//     1,
//     2000
// );

// // const orbit = new OrbitControls(camera, renderer.domElement);

// camera.position.z = 7

// const images = ['11.webp']

// // orbit.update();

// const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
// scene.add(ambientLight)

// const spotLight = new THREE.SpotLight(0xffffff, 0.9, 0, Math.PI / 8, 1);
// spotLight.position.set(-3, 3, 10);
// spotLight.target.position.set(0, 0, 0);

// scene.add(spotLight);

// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
// directionalLight.position.set(0, 0, -10);
// directionalLight.target.position.set(0, 0, 0);
// scene.add(directionalLight);

// const world = new CANNON.World({
//     gravity: new CANNON.Vec3(0, -9.81, 0)
// });

// const Nx = 15;
// const Ny = 15;
// const mass = 1;
// const clothSize = 1;
// const dist = clothSize / Nx;

// const shape = new CANNON.Particle();

// const particles = [];

// for(let i = 0; i < Nx + 1; i++) {
//     particles.push([]);
//     for(let j = 0; j < Ny + 1; j++) {
//         const particle = new CANNON.Body({
//             mass: j === Ny && i === i || i ===Ny && j ==15 ? 0 : mass,
//             shape,
//             position: new CANNON.Vec3((i - Nx * 0.5) * dist, (j - Ny * 0.5) * dist, 0),
//             velocity: new CANNON.Vec3(0, 0, 0)
//         });
//         particles[i].push(particle);
//         // world.addBody(particle);
//     }
// }

// const clothGeometry = new THREE.PlaneGeometry(1, 1, Nx, Ny);

// const textures = new THREE.TextureLoader().load('1.jpg');

// const fov = camera.fov * (Math.PI / 180);
// const vheight = 2 * Math.tan(fov / 2) * camera.position.z;
// const vwidth = height * camera.aspect;
// console.log(camera.aspect,width/height)

// const viewport = {
//   height:vheight,
//   width:vwidth,
// };


// images.map((image,idx)=>{
//     return new Media({
//         geometry:clothGeometry,
//         scene:scene,
//         image:image,
//         index:idx
//     })
// })

// function connect(i1, j1, i2, j2) {
//     world.addConstraint(new CANNON.DistanceConstraint(
//         particles[i1][j1],
//         particles[i2][j2],
//         dist*.9
//     ));
// }

// for(let i = 0; i < Nx + 1; i++) {
//     for(let j = 0; j < Ny + 1; j++) {
//         if(i < Nx)
//             connect(i, j, i + 1, j);
//         if(j < Ny)
//             connect(i, j, i, j + 1);
//     }
// }



// const clothMat = new THREE.ShaderMaterial({
//     vertexShader:vertex,
//     fragmentShader:fragment,
//     uniforms:{
//         tmap:{value:textures}
//     }
// })

// // const clothMat = new THREE.MeshPhongMaterial({
// //   side: THREE.DoubleSide,
// // });


// const clothMesh = new THREE.Mesh(clothGeometry, clothMat);
// // scene.add(clothMesh);
// // console.log(clothMesh)

// function updateParticules() {
//     for(let i = 0; i < Nx + 1; i++) {
//         for(let j = 0; j < Ny + 1; j++) {
//             const index = j * (Nx + 1) + i;

//             const positionAttribute = clothGeometry.attributes.position;

//             const position = particles[i][Ny - j].position;

//             positionAttribute.setXYZ(index, position.x, position.y, position.z);

//             positionAttribute.needsUpdate = true;
//         }
//     }
// }

// // const sphereSize = 0.1;
// // const movementRadius = 0.2;

// // const sphereGeometry = new THREE.SphereGeometry(sphereSize);
// // const sphereMat = new THREE.MeshPhongMaterial();

// // const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMat);
// // scene.add(sphereMesh);

// // const sphereShape = new CANNON.Sphere(sphereSize * 1.3);
// // const sphereBody = new CANNON.Body({
// //     shape: sphereShape
// // });
// // world.addBody(sphereBody);


// const timeStep = 1 / 60;
// function animate(time) {
//     updateParticules();
//     world.step(timeStep);
//     // sphereBody.position.set(
//     //     movementRadius * Math.sin(time / 1000),
//     //     0,
//     //     movementRadius * Math.cos(time / 1000)
//     // );
//     // sphereMesh.position.copy(sphereBody.position);
//     renderer.render(scene, camera);
// }

// renderer.setAnimationLoop(animate);

// window.addEventListener('resize', function() {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
// });

// // window.addEventListener('click', onClick, false);

// function applyForceAtPosition(clickPosition) {
//     const forceStrength = 100; // Adjust force magnitude
//     const radius = 2; // Radius around click to affect particles
  
//     // Convert Three.js Vector3 to Cannon.js Vec3
//     const cannonClickPos = new CANNON.Vec3(
//       clickPosition.x,
//       clickPosition.y,
//       clickPosition.z
//     );
  
//     // Apply force to all particles within radius
//     particles.forEach(row => {
//       row.forEach(particle => {
//         const distance = particle.position.distanceTo(cannonClickPos);
//         if (distance < radius) {
//           // Calculate force direction (away from click)
//           const force = new CANNON.Vec3().copy(particle.position);
//           force.vsub(cannonClickPos, force);
//           force.normalize();
//           force.scale(forceStrength, force);
  
//           // Apply force
//           particle.applyForce(force, particle.position);
//         }
//       });
//     });
//   }

// function onClick(event) {
//   // Convert mouse click to 3D world coordinates
//   const mouse = new THREE.Vector2();
//   mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//   mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

//   // Raycast to find clicked position in 3D space
//   const raycaster = new THREE.Raycaster();
//   raycaster.setFromCamera(mouse, camera);
//   const intersects = raycaster.intersectObjects(scene.children);

//   if (intersects.length > 0) {
//     const clickPosition = intersects[0].point;
//     applyForceAtPosition(clickPosition);
//   }
// }
















import * as THREE from 'three';
import vertex from './vertex.glsl';
import fragment from './fragment.glsl';


class App{
    constructor(){
        this.createCamera()
        this.createMesh()
        this.createScene()
        this.createRenderer()
        this.update()
    }
    createRenderer(){
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.setPixelRatio(window.devicePixelRatio); // Or set to 1 for testing
        document.body.append(this.renderer.domElement)
    }

    createMesh(){
        this.geometry = new THREE.PlaneGeometry();
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load('1.jpg', (tex) => {
          tex.generateMipmaps = true;
          tex.minFilter = THREE.LinearMipmapLinearFilter;
          tex.magFilter = THREE.LinearFilter;
          // tex.anisotropy = this.renderer.capabilities.getMaxAnisotropy();

        });
        this.material = new THREE.MeshBasicMaterial({map:texture})
        this.plane = new THREE.PlaneGeometry()

        const height = 2 * Math.tan(45 / 2) * this.camera.position.z;
        const width = height * this.camera.aspect;
    
        this.viewport = {
          height,
          width,
        };
        console.log(this.viewport,window.innerWidth,window.innerHeight)
        this.program = new THREE.ShaderMaterial({
            vertexShader: vertex,    // your vertex shader code
            fragmentShader: fragment, // your fragment shader code
            uniforms: {
              tMap: { value: texture },
              uPlaneSizes: { value: [0, 0] },
              uImageSizes: { value: [0, 0] },
              uViewportSizes: { value: [this.viewport.width, this.viewport.height] },
              uStrength: { value: 0 }
            },
            transparent: true,
          });

          const image = new Image();

          image.src = '1.jpg';
          image.onload = (_) => {
            texture.image = image;
      
            this.program.uniforms.uImageSizes.value = [
              image.naturalWidth,
              image.naturalHeight,
            ];
          };
          
          this.plane.scale.x = (this.viewport.width * 300) / window.innerWidth;
          this.plane.scale.y = (this.viewport.height * 320) / window.innerHeight;
      
          this.program.uniforms.uPlaneSizes.value = [
            this.plane.scale.x,
            this.plane.scale.y,
          ];


        this.mesh = new THREE.Mesh(this.plane,this.program)
    }

    createScene(){
        this.scene = new THREE.Scene()
        this.scene.background = new THREE.Color(0xfffdf8); // Using a hex number
        this.scene.add(this.camera,this.mesh)
    }

    createCamera(){
        this.camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight)
        this.camera.position.z = 2.5
        console.log('red')
    }

    update(){
        this.renderer.render(this.scene,this.camera)
        window.requestAnimationFrame(this.update.bind(this))
      }
}

new App();