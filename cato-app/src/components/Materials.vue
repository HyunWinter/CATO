<template>
    <div class="box">
        <div class="heading">
            <span class="title">Course Materials</span>
            <i class="far fa-trash-alt trash" @click="removeAllFiles()"></i>
        </div>
        <div class="row" >
            <div 
                class="file" 
                v-for="file in dbfiles" v-bind:key=file.name>
                <div class="drop-zone-header">
                    <h2>{{ file.name }}</h2>
                    <i class="far fa-trash-alt small-trash"></i>
                </div>
            </div>
            <div class="file drop-zone" v-cloak @drop.prevent="addFile" @dragover.prevent>
                <div class="drop-zone-header">
                    <h2>Files to Upload (Drag and Drop)</h2>
                    <ul>
                        <li v-for="file in files" v-bind:key=file.name>
                            {{ file.name }}
                        </li>
                        <button @click="uploadFile()" class="upload" ref="upload">Upload</button>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<!-- Scripts -->
<script src="../scripts/Materials.js"></script>

<!-- Scoped Style -->
<style scoped src="../styles/Materials.css"></style>