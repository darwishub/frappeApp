<template>
    <layout>
        <div class="mx-auto px-8 max-w-[1800px]">
            <div class="flex justify-start items-center gap-x-2 mt-12 mb-6">
                <Button :variant="'solid'" theme="gray" size="md" label="Button" @click="goToPrevWeek">
                    Prev
                </Button>
                <div class="bg-white py-1 px-3 rounded">
                    KW40
                </div>
                <Button :variant="'solid'" theme="gray" size="md" label="Button" @click="goToNextWeek">
                    Next
                </Button>
            </div>
            <div class="flex justify-between items-start gap-6">
                <div class="w-9/12">
                    <div class="bg-white rounded p-3 overflow-x-auto">
                        <div class="relative rounded-xl overflow-auto">
                            <div class="bg-white dark:bg-slate-800 shadow-xl overflow-hidden">
                                <div
                                    class="overflow-scroll grid grid-rows-[auto,repeat(100,auto)] grid-cols-[150px,repeat(7,150px)] max-h-[350px]">
                                    <!-- Calendar frame -->
                                    <div
                                        class="row-start-[1] col-start-[1] sticky top-0 z-10 bg-white dark:bg-gradient-to-b dark:from-slate-600 dark:to-slate-700 border-slate-100 dark:border-black/10 bg-clip-padding text-slate-900 dark:text-slate-200 border-b text-sm font-medium py-2">
                                    </div>

                                    <div v-for="(day, index) in currentWeek" :key="index"
                                        class="row-start-[1] sticky top-0 z-10 bg-white dark:bg-gradient-to-b dark:from-slate-600 dark:to-slate-700 border-slate-100 dark:border-black/10 bg-clip-padding text-slate-900 dark:text-slate-200 border-b border-r text-sm font-medium py-2 text-center"
                                        :class="`col-start-[${index + 2}]`">
                                        <p class="text-sm mb-2">{{ day.dayName }}</p>
                                        <p class="text-sm">{{ day.date }}</p>
                                    </div>

                                    <template v-for="(employee, employeeIndex) in employees" :key="employeeIndex">
                                        <div class="flex justify-start items-center border-slate-100 dark:border-slate-200/5 border-b border-r text-base p-1.5 text-right text-slate-400 sticky left-0 bg-white dark:bg-slate-800 font-medium"
                                            :class="`row-start-[${employeeIndex + 2}] col-start-[1]`">
                                            <div class="flex justify-start items-center">
                                                <Avatar :shape="'circle'" :image="employee.avatar" label="EY" size="xl"
                                                    :class="{ 'mr-3': isProfileChecked }" />
                                                <p class="text-sm text-left leading-4">{{ employee.name }}</p>
                                            </div>
                                        </div>
                                        <template v-for="(day, dayIndex) in currentWeek.length">
                                            <div class="border-slate-100 dark:border-slate-200/5 border-b"
                                                :class="`row-start-[${employeeIndex + 2}] col-start-[${dayIndex + 2}]`">
                                                
                                            </div>
                                        </template>
                                    </template>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-3/12">
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
let currentDate = ref(new Date().toISOString());

const toggleProfile = () => {
    isProfileChecked.value = !isProfileChecked.value;
};

const columnProfileWidth = computed(() => {
    return isProfileChecked.value ? '250px' : 'auto';
});

const getWeek = (startFrom) => {
    let week = [];
    for (let i = 0; i < 7; i++) {
        let day = {
            fullDate: new Date(startFrom),
            date: `${String(startFrom.getDate()).padStart(2, '0')}/${String(startFrom.getMonth() + 1).padStart(2, '0')}/${String(startFrom.getFullYear()).slice(-2)}`,
            dayName: startFrom.toLocaleDateString('en-US', { weekday: 'long' })
        };
        week.push(day);
        startFrom.setDate(startFrom.getDate() + 1);
    }
    return week;
};

const currentWeek = computed(() => {
    let curr = new Date(currentDate.value);
    // Starting Monday
    curr.setDate(curr.getDate() - (curr.getDay() || 7) + 1);
    return getWeek(curr);
});

const goToPrevWeek = () => {
    currentDate.value = new Date(new Date(currentDate.value).getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
};

const goToNextWeek = () => {
    currentDate.value = new Date(new Date(currentDate.value).getTime() + 7 * 24 * 60 * 60 * 1000).toISOString();
};

const employees = [
    {
        id: 1,
        name: "Muhammad Darwis Arifin",
        avatar: "https://i.pravatar.cc/400?img=70",
        tasks: [
            {
                title: "P-ANL-20222024-01-Montage",
                duration: "6 Tage",
                address: "Hofnerstrasse 4, Haus B, 8888 Unterageri",
                startDate: "2024-02-21T01:55:26.115Z",
                endDate: "2024-02-23T01:55:26.115Z",
            },
        ],
    },
    {
        id: 2,
        name: "Christoph Diethelm",
        avatar: "https://i.pravatar.cc/400?img=69",
        tasks: [],
    },
    {
        id: 3,
        name: "John Doe",
        avatar: "https://i.pravatar.cc/400?img=68",
        tasks: [],
    },
    {
        id: 4,
        name: "Marco Simeone",
        avatar: "https://i.pravatar.cc/400?img=64",
        tasks: [],
    },
    {
        id: 5,
        name: "Joao Schmid",
        avatar: "https://i.pravatar.cc/400?img=61",
        tasks: [],
    },
    {
        id: 6,
        name: "Lucas Aeneas",
        avatar: "https://i.pravatar.cc/400?img=56",
        tasks: [],
    },
];

</script>

<style scoped></style>
