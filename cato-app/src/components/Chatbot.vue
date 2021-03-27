<template>
    <div class="box">
        <div class="heading">
            <span class="title">Chatbot</span>
            <i class="far fa-trash-alt trash" @click="removeAllFiles()"></i>
        </div>
        <div class="chatbot" id="chatbot">
            <div class="chatbot__wrapper">
                <div id="massage-list" v-for="chat in chats" v-bind:key=chat.id>
                    <div class='sender-chatbot' v-if='chat.sentBy == "chatbot"'>
                        <div class='message-chatbot'>{{ chat.message }}</div>
                        <div class='sent-at'>{{ chat.sentAt }}</div>
                        <div class='doc-id'>{{ chat.id }}</div>
                    </div>
                    <div class='sender-user' v-if='chat.sentBy == "user"'>
                        <div class='message-user'>{{ chat.message }}</div>
                        <div class='sent-at'>{{ chat.sentAt }}</div>
                        <div class='doc-id'>{{ chat.id }}</div>
                    </div>
                </div>
                <div class='sender-chatbot' v-if="isLoading == true">
                    <div class='message-chatbot'>
                        <MDBSpinner color="primary" class="mt-1"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="message-form">
            <form>
                <input
                    id="message-box" 
                    type="text" 
                    placeholder="Enter message"
                    value="Who was the executive producer?"
                    autocomplete="off">
                <input 
                    id="submit-button" 
                    type="button" 
                    value="Submit"
                    v-on:click="SendMessages()">
            </form>
        </div>
    </div>
</template>

<!-- Scripts -->
<script src="../scripts/Chatbot.js"></script>

<!-- Scoped Style -->
<style scoped src="../styles/Chatbot.css"></style>