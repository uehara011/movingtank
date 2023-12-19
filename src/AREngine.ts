import type { ARScene } from "./scene";
import useLogger from './logger';
import * as THREE from "three";
import { THREEx, ARjs } from "@ar-js-org/ar.js-threejs"
import type { ArMarkerControls } from "@ar-js-org/ar.js-threejs/types/ArMarkerControls";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';  
import { moveObject } from './game';

THREEx.ArToolkitContext.baseURL = "./";

const log = useLogger();
export const group = new THREE.Group();

export interface AREngineDelegate {
    onRender?(renderer: THREE.Renderer): void;
    onMarkerFound?(marker: ArMarkerControls): void;
}

export const useAREngine = (): AREngine => {
    return AREngine.getSingleton();
}

export class AREngine {
    scene = new THREE.Scene();
    baseNode?: THREE.Object3D;
    delegate?: AREngineDelegate;
    arScene?: ARScene;

    private static instance: AREngine | null = null;

    public static getSingleton(): AREngine {
        if (!AREngine.instance) {
            AREngine.instance = new AREngine();
        }
        return AREngine.instance;
    }

    private constructor() { }

    async replaceScene(ar_scene: ARScene) {
        const nodes = ar_scene.makeObjectTree();

        if (this.baseNode) {
            this.scene.remove(this.baseNode);
        }
        this.baseNode = new THREE.Object3D();
        this.baseNode.add(await nodes);
        this.scene.add(this.baseNode!);

        this.arScene = ar_scene;
    }
    

<<<<<<< HEAD
    async start(video_canvas: string) {
=======
    start(video_canvas: string) {

>>>>>>> 1db0de91c501093896d9830f9be1fff8bd57fb59
        const ar_base_element = document.getElementById(video_canvas)

        if (!ar_base_element) {
            console.log(`${video_canvas} is not found`);
            return;
        }

        /* RENDERER */
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        ar_base_element.appendChild(renderer.domElement);

        /* Scene */
        const scene = this.scene;
        const camera = new THREE.Camera();
        scene.add(camera);

        const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
        light.position.set(0.5, 1, 0.25);
        scene.add(light);

        //GTLF
        async function loadAndAddModel(url: string, position: THREE.Vector3, rotation: THREE.Euler, scale: THREE.Vector3) {
            try {
                const Model: THREE.Object3D = await new Promise((resolve, reject) => {
                    const loader = new GLTFLoader();
                    loader.load(url, (gltf) => {
                        const model = gltf.scene;
                        model.position.copy(position);
                        model.rotation.copy(rotation);
                        model.scale.copy(scale);
                        group.add(model);
                        resolve(model);
                    }, undefined, reject);
                });
            } catch (error) {
                console.error('Error loading GLB model:', error);
            }
        }
        //groupにaddされる
        loadAndAddModel.call(this, './src/pen.glb', new THREE.Vector3(0, 0.3, 0), new THREE.Euler(0, 0, 0), new THREE.Vector3(2, 2, 2));
        loadAndAddModel.call(this, './src/note.glb', new THREE.Vector3(0, 0.1, 0), new THREE.Euler(0, 0, 0), new THREE.Vector3(2, 2, 2));
        loadAndAddModel.call(this, './src/erasel.glb', new THREE.Vector3(0, 0.2, 0), new THREE.Euler(0, 0, 0), new THREE.Vector3(2, 2, 2));
        loadAndAddModel.call(this, './src/caterpillar.glb', new THREE.Vector3(0, 0, 0), new THREE.Euler(0, 0, 0), new THREE.Vector3(0.1, 0.1, 0.1));
        //表示
        scene.add(group);
        moveObject();

        //AR.jsのマーカー検出エンジンの初期化
        const arToolkitSource = new THREEx.ArToolkitSource({
            sourceType: 'webcam',
            sourceWidth: window.innerWidth > window.innerHeight ? 640 * 2 : 480 * 2,
            sourceHeight: window.innerWidth > window.innerHeight ? 480 * 2 : 640 * 2,
        })

        //ARtoolkitのカメラ(webcamera)パラメータの読み込み
        const arToolkitContext = new THREEx.ArToolkitContext({
            cameraParametersUrl: THREEx.ArToolkitContext.baseURL + './data/camera_para.dat',
            detectionMode: 'mono',
        })

<<<<<<< HEAD
        const initARContext = () => {
            arToolkitContext.init(() => {
=======
        // ARToolkitの初期化が終了してから呼び出される
        const initARContext = () => { // create atToolkitContext

            //ここは変更の必要なし
            // initialize it
            arToolkitContext.init(() => { // copy projection matrix to camera
>>>>>>> 1db0de91c501093896d9830f9be1fff8bd57fb59
                camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
                arToolkitContext.arController.orientatio = getSourceOrientation();
                window.arToolkitContext = arToolkitContext;
            })

            var arMarkerControls = new THREEx.ArMarkerControls(arToolkitContext, camera, {
                type: 'pattern',
                // マーカーの内側のマークに対応するパターンファイル
                patternUrl: THREEx.ArToolkitContext.baseURL + './data/hiro.armarker',
<<<<<<< HEAD
=======
                // patternUrl : THREEx.ArToolkitContext.baseURL + '../data/data/patt.kanji',
                // as we controls the camera, set changeMatrixMode: 'cameraTransformMatrix'
                // カメラを制御する設定。マーカーの中心が、ワールドの原点になる。
>>>>>>> 1db0de91c501093896d9830f9be1fff8bd57fb59
                changeMatrixMode: 'cameraTransformMatrix',
                // マーカー識別の閾値。
                minConfidence: 0.001,
            })

            //マーカーが見つかった時に実行されるコールバック
            arMarkerControls.addEventListener("markerFound", () => {
                this.delegate?.onMarkerFound?.(arMarkerControls);
            })

            scene.visible = false
<<<<<<< HEAD
=======

            console.log('ArMarkerControls', arMarkerControls);

            //マーカー検出オブジェクトをグローバルに保存
>>>>>>> 1db0de91c501093896d9830f9be1fff8bd57fb59
            window.arMarkerControls = arMarkerControls;
        }

        // ARtoolkitの初期化
        arToolkitSource.init(function onReady() {
            arToolkitSource.domElement.addEventListener('canplay', () => {
                initARContext();
            }) as unknown as HTMLVideoElement;
            window.arToolkitSource = arToolkitSource;
            setTimeout(() => {
                onResize()
            }, 2000);
        }, function onError() { })

<<<<<<< HEAD
=======

        //ブラウザをリサイズした時の処理
        // handle resize
>>>>>>> 1db0de91c501093896d9830f9be1fff8bd57fb59
        window.addEventListener('resize', function () {
            onResize()
        })
        function onResize() {
            arToolkitSource.onResizeElement()
            arToolkitSource.copyElementSizeTo(renderer.domElement)
            if (window.arToolkitContext.arController !== null) {
                arToolkitSource.copyElementSizeTo(window.arToolkitContext.arController.canvas)
            }
        }

<<<<<<< HEAD
=======
        // スマホの向きを検出している？
>>>>>>> 1db0de91c501093896d9830f9be1fff8bd57fb59
        function getSourceOrientation(): string {
            if (!arToolkitSource) {
                return '';
            }

            if (arToolkitSource.domElement.videoWidth > arToolkitSource.domElement.videoHeight) {
                return 'landscape';
            } else {
                return 'portrait';
            }
        }

<<<<<<< HEAD
=======

        // レンダリングループ。Three.jsのシーンが更新される度に実行
>>>>>>> 1db0de91c501093896d9830f9be1fff8bd57fb59
        const render = (delta_sec: number) => {
            this.arScene?.animate(delta_sec); // 設定したシーンのアニメーションの実行
            this.delegate?.onRender?.(renderer); //カスタムルーチンを実行
            renderer.render(scene, camera); //Three.jsのシーンを描画

        }

        // artoolkitの処理（フレームごとの処理）
        const update_ar = () => {
            if (!arToolkitContext || !arToolkitSource || !arToolkitSource.ready) {
                return;
            }

            //ここで、マーカーの検出が行われる（多分）
            arToolkitContext.update(arToolkitSource.domElement)
            scene.visible = camera.visible
        }

        var lastTimeMsec: number;
        const animate = (nowMsec: number) => {
            requestAnimationFrame(animate);
            lastTimeMsec = lastTimeMsec || nowMsec - 1000 / 60;
            var deltaMsec = Math.min(200, nowMsec - lastTimeMsec);
            lastTimeMsec = nowMsec;

            update_ar();
            render(deltaMsec / 1000);
        }
        requestAnimationFrame(animate);
    }
};


