<template>
    <div class="message-row">
        <span class="fw-bold user" :style="{ color: message.color }">
            {{ message.user }}:
        </span>
        <span>
            {{ message.message }}
        </span>
        <span class="time">
            {{ message.time }}
        </span>
    </div>
</template>

<script>

export default {
    name: 'Received',
    props: {
        message: {
            type: Object,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
.message-row {
    display: flex;
    margin: 10px 20px;
    word-break: break-word;
    text-align: left;
    align-items: center;
    .user {
        margin-right: 10px;
        min-width: fit-content;
    }

    .time {
        margin-left: 10px;
        padding: 0px 5px;
        border-radius: 10px;
        background: #f7f7f7;
        color: #b0abab;
        min-width: 60px;
        text-align: center;
        height: 25px;
    }
}
</style>