<template>
    <div class="warning">
        <span :class="message.status == 'left' ? 'warning__left' : 'warning__on'">{{ message.user }} {{ message.status
        }}</span>
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
.warning {
    position: relative;

    &__left {
        color: #dddddd;
        font-weight: 700;

        &::before {
            content: ' ';
            width: 100px;
            height: 2px;
            background: #dddddd;
            position: absolute;
            bottom: 50%;
            right: 50%;
            transform: translate(-50%, 100%);
        }

        &::after {
            content: ' ';
            width: 100px;
            height: 2px;
            background: #dddddd;
            position: absolute;
            bottom: 50%;
            left: 50%;
            transform: translate(50%, 100%);
        }
    }

    &__on {
        color: #94de94;
        font-weight: 700;

        &::before {
            content: ' ';
            width: 100px;
            height: 2px;
            background: #94de94;
            position: absolute;
            bottom: 50%;
            right: 50%;
            transform: translate(-50%, 100%);
        }

        &::after {
            content: ' ';
            width: 100px;
            height: 2px;
            background: #94de94;
            position: absolute;
            bottom: 50%;
            left: 50%;
            transform: translate(50%, 100%);
        }
    }
}
</style>