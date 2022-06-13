<template>
    <div class="message-row">
        <span class="time">
            {{ message.time }}
        </span>
        <span class="message__sent">
            {{ message.message }}
        </span>
    </div>
</template>

<script>

export default {
    name: 'Sent',
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
    justify-content: flex-end;
    margin: 5px 20px;
    word-break: break-word;
    text-align: right;
    align-items: center;
    .time {
        margin-right: 10px;
        padding: 0px 5px;
        border-radius: 10px;
        background: #f7f7f7;
        color: #b0abab;
        min-width: 60px;
        text-align: center;
        height: 25px;
    }
}

.message__sent {
    padding: 10px;
    background: #f3f3f3;
    border-radius: 10px;
}
</style>