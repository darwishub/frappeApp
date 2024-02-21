<template>
    <div class="wrapper">
        <div class="p-3 bg-white">
            <div class="mx-auto px-8 max-w-[1800px]">
                <Breadcrumbs :items="[
                    {
                        label: 'Planner',
                        route: {
                            name: 'Planner',
                        },
                    },
                ]" />
            </div>
        </div>
        <div class="content-wrapper">
            <slot />
        </div>
    </div>
</template>

<script setup>
</script>

<style scoped></style>