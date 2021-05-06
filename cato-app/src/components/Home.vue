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
                aria-controls="addModalLabel"
                @click="addModal = true">
                <div class="new-card-header mt-2">
                    <h1>+</h1>
                </div>
            </div>
        </div>
    </div>

    <MDBModal
        class="modal fade"
        id="addModal"
        tabindex="-1"
        labelledby="addModalLabel"
        v-model="addModal"
        centered
    >
        <MDBModalHeader>
            <MDBModalTitle id="addModalLabel"> Add a New Course </MDBModalTitle>
        </MDBModalHeader>
        <MDBModalBody> 
            <MDBInput class="mb-4" label="Code" v-model="modal_code" size="lg"/>
            <MDBInput class="mb-4" label="Title" v-model="modal_title" size="lg"/>
            <MDBInput class="mb-4" label="Term" v-model="modal_term" size="lg"/>
        </MDBModalBody>
        <MDBModalFooter class="ml-2">
            <MDBBtn @click="addModal = false"> Cancel </MDBBtn>
            <div class="mr-2"/>
            <MDBBtn @click="AddNewCourse()" color="primary"> Create </MDBBtn>
        </MDBModalFooter>
    </MDBModal>
</template>

<!-- Scripts -->
<script src="../scripts/Home.js"></script>

<!-- Scoped Style -->
<style scoped src="../styles/Home.css"></style>