<template>
    <div class="box" id="app">
        <div class="row">
            <div 
                class="card" 
                v-for="course in courses" v-bind:key=course.id
                v-on:click="SelectCourse(course.id)">
                <div class="card-header">
                    <h1>{{ course.code }}</h1>
                </div>
                <div class="card-body">
                    <p>
                        {{ course.name }}
                        <br/>
                        {{ course.term }}
                    </p>
                </div>
            </div>
            <div 
                class="card new-card" 
                v-on:click="doSomethingOnHidden()">
                <div class="new-card-header">
                    <h1>+</h1>
                </div>
            </div>
        </div>
        <!-- <div class="modal fade" tabindex="-1" role="dialog" id="myModal" ref="vuemodal">
            <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title">Add New Course</h4>
                </div>
                <div class="modal-body">
                    <p>Please enter a course id:&hellip;</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
            </div>
        </div> -->
    </div>
</template>

<!-- Scripts -->
<script src="../scripts/Home.js"></script>

<!-- Scoped Style -->
<style scoped src="../styles/Home.css"></style>