import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export interface ARScene {
    makeObjectTree(): Promise<THREE.Object3D>;
    animate(sec: number): void;
    name(): string;
}

export class TestScene implements ARScene {
    cube?: THREE.Object3D;
    loader: any;

    constructor() {
        // 初期化時に loader を作成
        this.loader = new GLTFLoader();
    }

    name() { return "test"; }

    makeObjectTree(): Promise<THREE.Object3D> {
        return new Promise((resolve) => {
            // .glb ファイルのパスを指定してロード
            this.loader.load('src/note.glb', (gltf: { scene: THREE.Object3D<THREE.Object3DEventMap> | undefined; }) => {
                // ロードが完了したら、gltf.scene を取得して利用する
                this.cube = gltf.scene;
                resolve(this.cube!); // 非同期処理が完了したので、resolve に Object3D を渡す
            });
        });
    }

    animate(sec: number): void {
        if (!this.cube) return;

        // 立方体を回転させるアニメーション
        this.cube.rotation.y += 1 * sec;
    }
}

export class TestScene2 implements ARScene {
    cube?: THREE.Object3D;
    loader: any;

    constructor() {
        // 初期化時に loader を作成
        this.loader = new GLTFLoader();
    }

    name() { return "test2"; }

    makeObjectTree(): Promise<THREE.Object3D> {
        return new Promise((resolve) => {
            // .glb ファイルのパスを指定してロード
            this.loader.load('src/note.glb', (gltf: { scene: THREE.Object3D<THREE.Object3DEventMap> | undefined; }) => {
                // ロードが完了したら、gltf.scene を取得して利用する
                this.cube = gltf.scene;
                resolve(this.cube!); // 非同期処理が完了したので、resolve に Object3D を渡す
            });
        });
    }

    animate(sec: number): void {
        if (!this.cube) return;

        // 立方体を回転させるアニメーション
        this.cube.rotation.y += 0.01;
    }
}
