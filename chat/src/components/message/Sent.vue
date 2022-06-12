<template>
    <div class="message-row">
        <span>
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
    margin: 10px 20px;
}
</style>