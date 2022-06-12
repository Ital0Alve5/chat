<template>
    <div class="message-row">
        <span class="fw-bold user">
            {{ message.user }}:
        </span>
        <span>
            {{ message.message }}
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

    .user {
        margin-right: 10px;
    }
}
</style>