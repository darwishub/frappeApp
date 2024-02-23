<template>
    <form>
        <div class="flex flex-col">
            <div class="mb-3">
                <label class="block text-xs text-gray-600 mb-2">Assigned to</label>
                <div class="flex justify-start items-center">
                    <Avatar :shape="'circle'" :image="avatar" label="EY" size="md" v-for="(avatar, index) in avatars"
                        :key="index" />
                </div>
            </div>
            <FormControl :type="'text'" size="sm" variant="subtle" placeholder="Subject" :disabled="false" label="Subject"
                v-model="name" class="mb-3" />
            <div class="mb-3">
                <label class="block text-xs text-gray-600 mb-2">Project</label>
                <div
                    class="flex justify-between items-center text-gray-800 bg-gray-100 rounded py-2 h-7 cursor-pointer px-2">
                    <span class="text-sm">P-ANL-20022024-01</span>
                    <FeatherIcon class="w-4" name="arrow-right" />
                </div>
            </div>
            <div class="mb-3">
                <label class="block text-xs text-gray-600 mb-2">Elevator</label>
                <div
                    class="flex justify-between items-center text-gray-800 bg-gray-100 rounded py-2 h-7 cursor-pointer px-2">
                    <span class="text-sm">ANL-20022024-01</span>
                    <FeatherIcon class="w-4" name="arrow-right" />
                </div>
            </div>
            <div class="mb-3">
                <label class="block text-xs text-gray-600 mb-2">Type</label>
                <div
                    class="flex justify-between items-center text-gray-800 bg-gray-100 rounded py-2 h-7 cursor-pointer px-2">
                    <span class="text-sm">Bonus</span>
                    <FeatherIcon class="w-4" name="arrow-right" />
                </div>
            </div>
            <div class="mb-3">
                <label class="block text-xs text-gray-600 mb-2">Status</label>
                <Select :options="[
                    {
                        label: 'Open',
                        value: true,
                    },
                    {
                        label: 'Close',
                        value: false,
                    },
                ]" v-model="status" />
            </div>
            <div class="mb-3">
                <label class="block text-xs text-gray-600 mb-2">Priority</label>
                <Select :options="[
                    {
                        label: 'Low',
                        value: 'low',
                    },
                    {
                        label: 'High',
                        value: 'high',
                    },
                ]" v-model="priority" />
            </div>
            <div class="mb-3">
                <label class="block text-xs text-gray-600 mb-2">Parent Task</label>
                <div
                    class="flex justify-between items-center text-gray-800 bg-gray-100 rounded py-2 h-7 cursor-pointer px-2">
                    <span class="text-sm">Montageanlieferung</span>
                    <FeatherIcon class="w-4" name="arrow-right" />
                </div>
            </div>
            <FormControl :type="'date'" size="sm" variant="subtle" placeholder="Expected Start Date" :disabled="false"
                label="Expected Start Date" v-model="expectedStartDate" class="mb-3" />
            <FormControl :type="'date'" size="sm" variant="subtle" placeholder="Expected End Date" :disabled="false"
                label="Expected End Date" v-model="expectedEndDate" class="mb-3" />
            <FormControl :type="'number'" size="sm" variant="subtle" placeholder="Expected Time" :disabled="false"
                label="Expected Time (in hours)" v-model="expectedTime" class="mb-3" />
            <FormControl :type="'number'" size="sm" variant="subtle" placeholder="Actual Time in Hours" :disabled="false"
                label="Actual Time in Hours (via Timesheet)" v-model="actualTime" class="mb-3" />
        </div>
    </form>
</template>

<script setup>
import { ref } from "vue";

let avatars = [
    "https://i.pravatar.cc/400?img=69",
    "https://i.pravatar.cc/400?img=70",
    "https://i.pravatar.cc/400?img=68"
];

let name = ref();
let status = ref();
let priority = ref();
let expectedStartDate = ref();
let expectedEndDate = ref();
let expectedTime = ref();
let actualTime = ref();

</script>