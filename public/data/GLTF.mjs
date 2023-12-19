// GLTF.js 冒頭に追加
//require = require("esm")(module /*, options*/);
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var util_1 = require("util");
var GLTFLoader_js_1 = require("three/examples/jsm/loaders/GLTFLoader.js");
var GLTFExporter_js_1 = require("three/examples/jsm/exporters/GLTFExporter.js");
var readFileAsync = (0, util_1.promisify)(fs.readFile);
// モデルのファイルパス
var noteModelPath = 'note.glb';
var penModelPath = 'pen.glb';
// モデルを読み込む関数
function loadModel(modelPath) {
    return __awaiter(this, void 0, void 0, function () {
        var loader;
        return __generator(this, function (_a) {
            loader = new GLTFLoader_js_1.GLTFLoader();
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    loader.load(modelPath, function (gltf) {
                        resolve(gltf.scene);
                    }, undefined, reject);
                })];
        });
    });
}
// メインの処理
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var noteModel, penModel, exporter;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loadModel(noteModelPath)];
                case 1:
                    noteModel = _a.sent();
                    return [4 /*yield*/, loadModel(penModelPath)];
                case 2:
                    penModel = _a.sent();
                    // モデルを結合する
                    noteModel.add(penModel);
                    exporter = new GLTFExporter_js_1.GLTFExporter();
                    exporter.parse(noteModel, function (gltf) {
                        // エクスポートが成功した場合
                        if (gltf instanceof ArrayBuffer) {
                            var outputPath = 'combinedModel.glb';
                            fs.writeFileSync(outputPath, Buffer.from(gltf));
                            console.log("Exported combined model to ".concat(outputPath));
                        }
                        else {
                            console.error('Export failed');
                        }
                    }, { binary: true }); // 追加: パラメータに binary を指定するために as any を追加
                    return [2 /*return*/];
            }
        });
    });
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
