import * as fs from 'fs';
import { promisify } from 'util';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';

const readFileAsync = promisify(fs.readFile);

// モデルのファイルパス
const noteModelPath = 'note.glb';
const penModelPath = 'pen.glb';

// モデルを読み込む関数
async function loadModel(modelPath: string) {
  const loader = new GLTFLoader();
  return new Promise<THREE.Group>((resolve, reject) => {
    loader.load(modelPath, (gltf) => {
      resolve(gltf.scene);
    }, undefined, reject);
  });
}

// メインの処理
async function main() {
  // モデルを読み込む
  const noteModel = await loadModel(noteModelPath);
  const penModel = await loadModel(penModelPath);

  // モデルを結合する
  noteModel.add(penModel);

  // GLTFExporter を使用してエクスポート
  const exporter = new GLTFExporter();
  exporter.parse(noteModel, (gltf) => {
    // エクスポートが成功した場合
    if (gltf instanceof ArrayBuffer) {
      const outputPath = 'combinedModel.glb';
      fs.writeFileSync(outputPath, Buffer.from(gltf));
      console.log(`Exported combined model to ${outputPath}`);
    } else {
      console.error('Export failed');
    }
  }, { binary: true } as any); // 追加: パラメータに binary を指定するために as any を追加
}

main().catch(console.error);

/*
import * as fs from 'fs';
import { promisify } from 'util';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';

const readFileAsync = promisify(fs.readFile);

// モデルのファイルパス
const noteModelPath = 'note.glb';
const penModelPath = 'pen.glb';

// モデルを読み込む関数
async function loadModel(modelPath: string) {
  const loader = new GLTFLoader();
  return new Promise<THREE.Group>((resolve, reject) => {
    loader.load(modelPath, (gltf) => {
      resolve(gltf.scene);
    }, undefined, reject);
  });
}

// メインの処理
async function main() {
  // モデルを読み込む
  const noteModel = await loadModel(noteModelPath);
  const penModel = await loadModel(penModelPath);

  // モデルを結合する
  noteModel.add(penModel);

  // GLTFExporter を使用してエクスポート
  const exporter = new GLTFExporter();
  exporter.parse(noteModel, (gltf) => {
    // エクスポートが成功した場合
    if (gltf instanceof ArrayBuffer) {
      const outputPath = 'combinedModel.glb';
      fs.writeFileSync(outputPath, Buffer.from(gltf));
      console.log(`Exported combined model to ${outputPath}`);
    } else {
      console.error('Export failed');
    }
  }, { binary: true } as any); // パラメータに binary を指定するために as any を追加
}

main().catch(console.error);
*/