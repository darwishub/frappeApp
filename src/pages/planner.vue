<template>
    <layout>
        <div class="container mx-auto">
            <div class="flex justify-start items-center gap-x-2 mt-12 mb-6">
                <Button :variant="'solid'" theme="gray" size="md" label="Button">
                    Prev
                </Button>
                <div class="bg-white py-1 px-3 rounded">
                    KW40
                </div>
                <Button :variant="'solid'" theme="gray" size="md" label="Button">
                    Next
                </Button>
            </div>

            <div class="grid grid-cols-12 gap-6">
                <div class="col-span-8">
                    <div class="bg-white rounded p-3 overflow-x-auto">
                        <div class="relative rounded-xl overflow-auto">
                            <div class="bg-white dark:bg-slate-800 shadow-xl overflow-hidden">
                                <div class="overflow-scroll grid grid-rows-[auto,repeat(4,50px)] max-h-[350px]"
                                    :class="`grid-cols-[${columnProfileWidth},repeat(7,150px)]`">
                                    <!-- Calendar frame -->
                                    <div
                                        class="row-start-[1] col-start-[1] sticky top-0 z-10 bg-white dark:bg-gradient-to-b dark:from-slate-600 dark:to-slate-700 border-slate-100 dark:border-black/10 bg-clip-padding text-slate-900 dark:text-slate-200 border-b text-sm font-medium py-2">
                                        <Switch size="md" description="" :disabled="false" v-model="isProfileChecked" />
                                    </div>

                                    <div
                                        class="row-start-[1] col-start-[2] sticky top-0 z-10 bg-white dark:bg-gradient-to-b dark:from-slate-600 dark:to-slate-700 border-slate-100 dark:border-black/10 bg-clip-padding text-slate-900 dark:text-slate-200 border-b text-sm font-medium py-2 text-center">
                                        Mon</div>
                                    <div
                                        class="row-start-[1] col-start-[3] sticky top-0 z-10 bg-white dark:bg-gradient-to-b dark:from-slate-600 dark:to-slate-700 border-slate-100 dark:border-black/10 bg-clip-padding text-slate-900 dark:text-slate-200 border-b text-sm font-medium py-2 text-center">
                                        Tue</div>
                                    <div
                                        class="row-start-[1] col-start-[4] sticky top-0 z-10 bg-white dark:bg-gradient-to-b dark:from-slate-600 dark:to-slate-700 border-slate-100 dark:border-black/10 bg-clip-padding text-slate-900 dark:text-slate-200 border-b text-sm font-medium py-2 text-center">
                                        Wed</div>
                                    <div
                                        class="row-start-[1] col-start-[5] sticky top-0 z-10 bg-white dark:bg-gradient-to-b dark:from-slate-600 dark:to-slate-700 border-slate-100 dark:border-black/10 bg-clip-padding text-slate-900 dark:text-slate-200 border-b text-sm font-medium py-2 text-center">
                                        Thu</div>
                                    <div
                                        class="row-start-[1] col-start-[6] sticky top-0 z-10 bg-white dark:bg-gradient-to-b dark:from-slate-600 dark:to-slate-700 border-slate-100 dark:border-black/10 bg-clip-padding text-slate-900 dark:text-slate-200 border-b text-sm font-medium py-2 text-center">
                                        Fri</div>
                                    <div
                                        class="row-start-[1] col-start-[7] sticky top-0 z-10 bg-white dark:bg-gradient-to-b dark:from-slate-600 dark:to-slate-700 border-slate-100 dark:border-black/10 bg-clip-padding text-slate-900 dark:text-slate-200 border-b text-sm font-medium py-2 text-center">
                                        Sat</div>
                                    <div
                                        class="row-start-[1] col-start-[8] sticky top-0 z-10 bg-white dark:bg-gradient-to-b dark:from-slate-600 dark:to-slate-700 border-slate-100 dark:border-black/10 bg-clip-padding text-slate-900 dark:text-slate-200 border-b text-sm font-medium py-2 text-center">
                                        Sun</div>

                                    <template v-for="(employee, employeeIndex) in employees" :key="employeeIndex">
                                        <div class="border-slate-100 dark:border-slate-200/5 border-b border-r text-base p-1.5 text-right text-slate-400 sticky left-0 bg-white dark:bg-slate-800 font-medium"
                                            :class="`row-start-[${employeeIndex + 2}] col-start-[1]`">
                                            <div class="flex justify-start items-center">
                                                <Avatar :shape="'circle'" :image="employee.avatar" label="EY" size="2xl"
                                                    :class="{ 'mr-3': isProfileChecked }" />
                                                <p v-if="isProfileChecked">{{ employee.name }}</p>
                                            </div>
                                        </div>
                                        <template v-for="(task, taskIndex) in employee.tasks">

                                            <div class="border-slate-100 dark:border-slate-200/5 border-b border-r"
                                                :class="`row-start-[${employeeIndex + 2}] col-start-[${taskIndex + 1}]`"
                                              v-if="taskIndex + 1 != 1"
                                            >
                                            <div class="flex flex-col bg-gray-300 p-3 rounded gap-2" v-if="task != null">
                                                task card test
                                            </div>
                                            </div>
                                        </template>

                                    </template>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-span-4">
                    <div class="bg-white rounded p-3">
                        <p class="text-lg mb-3">Backlog</p>
                        <div class="grid grid-rows gap-3">
                            <div class="flex flex-col bg-gray-300 p-3 rounded gap-2">
                                <div class="flex justify-between items-center">
                                    <p class="text-xs">P-ANL-20222024-01-Montage</p>
                                    <p class="text-xs">6 Tage</p>
                                </div>
                                <div class="flex justify-start items-center">
                                    <p class="text-xs">Hofnerstrasse 4, Haus B, 8888 Unterageri</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </layout>
</template>

<script setup>
import Layout from "@/pages/shared/layout.vue";
import { computed, ref } from "vue";

let isProfileChecked = ref(true);
let currentDate = ref(new Date());

const columnProfileWidth = computed(() => {
    return isProfileChecked.value ? '250px' : 'auto';
});

const employees = [
    {
        id: 1,
        name: "Muhammad Darwis Arifin",
        avatar: "https://i.pravatar.cc/400?img=70",
        tasks: [
            null,
            {
                title: "P-ANL-20222024-01-Montage",
                duration: "6 Tage",
                address: "Hofnerstrasse 4, Haus B, 8888 Unterageri",
            },
            null,
            null,
            null,
            null,
            null,
            null,
        ]
    },
    {
        id: 2,
        name: "Christoph Diethelm",
        avatar: "https://i.pravatar.cc/400?img=69",
        tasks: [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
        ]
    },
    {
        id: 3,
        name: "John Doe",
        avatar: "https://i.pravatar.cc/400?img=68",
        tasks: [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
        ]
    },
    {
        id: 4,
        name: "Marco Simeone",
        avatar: "https://i.pravatar.cc/400?img=64",
        tasks: [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
        ]
    },
    {
        id: 5,
        name: "Joao Schmid",
        avatar: "https://i.pravatar.cc/400?img=61",
        tasks: [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
        ]
    },
    {
        id: 6,
        name: "Lucas Aeneas",
        avatar: "https://i.pravatar.cc/400?img=56",
        tasks: [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
        ]
    },
];

</script>

<style scoped></style>
