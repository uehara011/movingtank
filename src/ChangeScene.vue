<script setup lang="ts">
import { useAREngine } from './AREngine';
import { TestScene, TestScene2 } from './scene';

const ar_engine = useAREngine(); //シングルトンを取得

const scene_a = () => {
    ar_engine.replaceScene(new TestScene());
}

const scene_b = () => {
    ar_engine.replaceScene(new TestScene2());
}

</script>

<template>
    <button @click="scene_a">Scene A</button>
    <button @click="scene_b">Scene B</button>
</template>./AREngine