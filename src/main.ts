import * as THREE from 'three'

import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

const width = window.innerWidth
const height = window.innerHeight

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('app') as HTMLCanvasElement
})
renderer.setSize(width, height)

const mainCamera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
mainCamera.position.set(0, 1.4, -10)

const scene = new THREE.Scene()

const light = new THREE.PointLight()
light.position.set(0.8, 1.4, 1.0)
scene.add(light)

const fbxLoader = new FBXLoader()
fbxLoader.load(
  'assets/oko.fbx',
  (object) => {
      object.traverse(function (child) {
          if ((child as THREE.Mesh).isMesh) {
              // (child as THREE.Mesh).material = material
              if ((child as THREE.Mesh).material) {
                  ((child as THREE.Mesh).material as THREE.MeshBasicMaterial).transparent = false
              }
          }
      })
      object.scale.set(1, 1, 1)
    scene.add(object)
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
  },
  (error) => {
    console.log(error)
  }
)

function tick() {
  renderer.render(scene, mainCamera)
  requestAnimationFrame(tick)
}

tick()
