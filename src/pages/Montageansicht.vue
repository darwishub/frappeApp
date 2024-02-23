<template>
    <Layout :breadcrumbs="breadcrumbs">
        <div class="mx-auto px-8 max-w-[1800px]">
            <div class="flex justify-start items-center gap-x-2 mb-6">
                <Button :variant="'solid'" theme="gray" size="md" label="Button" @click="goToPrevWeek">
                    Prev
                </Button>
                <div class="bg-white py-1 px-3 rounded">
                    KW{{ weekOfMonth }}
                </div>
                <Button :variant="'solid'" theme="gray" size="md" label="Button" @click="goToNextWeek">
                    Next
                </Button>
            </div>
            <div class="flex justify-between items-start gap-6">
                <div class="w-9/12">
                    <div class="bg-white rounded p-3">
                        <div class="relative">
                            <div class="flex" ref="timeLine">
                                <div class="flex flex-col">
                                    <div
                                        class="flex shrink-0 grow-0 overflow-hidden border-b border-r w-40 text-center h-14">
                                    </div>
                                    <div class="flex shrink-0 grow-0 overflow-hidden border-b border-r w-40 text-center"
                                        :style="`height: ${56 * employee.tasks.length}px`"
                                        v-for="(employee, employeeIndex) in mappedEmployees" :key="employeeIndex">
                                        <div class="flex justify-start items-center">
                                            <Avatar :shape="'circle'" :image="employee.avatar" label="EY" size="xl"
                                                class="mr-3" />
                                            <p class="text-sm text-left leading-4">{{ employee.name }}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex flex-col">
                                    <div class="flex">
                                        <div class="flex flex-col shrink-0 grow-0 overflow-hidden whitespace-nowrap border-b border-r w-40 text-center"
                                            v-for="(day, dayIndex) in currentWeek" :key="dayIndex">
                                            <div class="flex flex-col justify-center items-center p-2">
                                                <p class="text-sm mb-2">{{ day.dayName }}</p>
                                                <p class="text-sm">{{ day.date }}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <template v-for="(employee, employeeIndex) in mappedEmployees" :key="employeeIndex">
                                        <div class="flex overflow-hidden w-full h-14"
                                            v-for="taskCount in employee.tasks.length">
                                            <div class="flex flex-col shrink-0 grow-0 overflow-hidden whitespace-nowrap border-b border-r w-40 text-center h-full"
                                                v-for="(day, dayIndex) in currentWeek" :key="dayIndex">
                                            </div>
                                        </div>
                                    </template>
                                </div>
                            </div>
                            <div class="row-items absolute left-40 top-14 touch-none">
                                <template v-for="(employee, employeeIndex) in mappedEmployees" :key="employeeIndex">
                                    <div class="relative h-14" v-for="taskCount in employee.tasks"
                                        :style="`width: ${timeLineWidth - 160}px`">
                                        <div class="flex flex-row justify-between select-none bg-gray-300 p-1 rounded absolute top-0.5 h-12"
                                            v-if="Object.keys(taskCount).length > 0" :style="`left: ${(taskCount.startDayOfWeek - 1) * 160}px;width: ${((taskCount.endDayOfWeek - taskCount.startDayOfWeek) + 1) * 160}px;`
                                                " @click="openTaskDetail">
                                            <div class="flex justify-start gap-3">
                                                <div class="bg-white h-full w-2 rounded cursor-ew-resize"></div>
                                                <div class="flex justify-center items-start flex-col">
                                                    <p class="text-xs mb-2">{{ taskCount.title }}</p>
                                                    <p class="text-xs font-semibold">{{ taskCount.address }}</p>
                                                </div>
                                            </div>
                                            <div class="bg-white h-full w-2 rounded cursor-ew-resize"></div>
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-3/12">
                    <div class="bg-white rounded p-3">
                        <template v-if="!isTaskFormActive">
                            <p class="text-lg mb-3">Backlog</p>
                            <div class="grid grid-rows gap-3 mb-3">
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
                        </template>
                        <template v-else>
                            <div class="mb-3 flex justify-between items-center">
                                <p class="text-lg">Task 40031</p>
                                <Button :variant="'solid'" theme="gray" size="sm" label="Button" :loadingText="null"
                                    :disabled="false" :link="null" icon="arrow-left" :loading="false"
                                    @click="backToBackLog">
                                </Button>
                            </div>
                            <TaskForm />
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
</template>

<script setup>
import Layout from "@/pages/shared/Layout.vue";
import { computed, ref, onMounted } from "vue";
import { useElementBounding } from '@vueuse/core';
import TaskForm from "@/components/Task/TaskForm.vue";

let breadcrumbs = [
    {
        label: 'Dashboard',
        route: {
            name: 'Dashboard',
        },
    },
    {
        label: 'Montageansicht',
        route: {
            name: 'Montageansicht',
        },
    },
];
let currentDate = ref(new Date().toISOString());
let isTaskFormActive = ref(false);
const timeLine = ref();
const { width: timeLineWidth } = useElementBounding(timeLine);

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

const weekOfMonth = computed(() => {
    let date = new Date(currentDate.value);
    let adjustedDate = date.getDate() + date.getDay();
    let prefixes = [-1, 0, 1, 2, 3, 4, 5];
    return prefixes[0 | adjustedDate / 7] + 1;
});

const employees = ref([
    {
        id: 1,
        name: "Muhammad Darwis Arifin",
        avatar: "https://i.pravatar.cc/400?img=70",
        tasks: [
            {
                id: '1-a',
                title: "P-ANL-20222024-01-Montage",
                duration: "6 Tage",
                address: "Hofnerstrasse 4, Haus B, 8888 Unterageri",
                startDate: "2024-02-21T01:55:26.115Z",
                endDate: "2024-02-23T01:55:26.115Z",
            },
            {
                id: '1-b',
                title: "P-ANL-20222024-01-Montage",
                duration: "6 Tage",
                address: "Hofnerstrasse 4, Haus B, 8888 Unterageri",
                startDate: "2024-02-23T01:55:26.115Z",
                endDate: "2024-02-25T01:55:26.115Z",
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
        tasks: [
            {
                id: '1-b',
                title: "P-ANL-20222024-01-Montage",
                duration: "6 Tage",
                address: "Hofnerstrasse 4, Haus B, 8888 Unterageri",
                startDate: "2024-02-23T01:55:26.115Z",
                endDate: "2024-02-25T01:55:26.115Z",
            },
            {
                id: '1-b',
                title: "P-ANL-20222024-01-Montage",
                duration: "6 Tage",
                address: "Hofnerstrasse 4, Haus B, 8888 Unterageri",
                startDate: "2024-02-23T01:55:26.115Z",
                endDate: "2024-02-25T01:55:26.115Z",
            },
        ],
    },
    {
        id: 4,
        name: "Marco Simeone",
        avatar: "https://i.pravatar.cc/400?img=64",
        tasks: [
            {
                id: '1-b',
                title: "P-ANL-20222024-01-Montage",
                duration: "6 Tage",
                address: "Hofnerstrasse 4, Haus B, 8888 Unterageri",
                startDate: "2024-02-20T01:55:26.115Z",
                endDate: "2024-02-22T01:55:26.115Z",
            },
        ],
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
]);

function getMappedWeek(date) {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

const mappedEmployees = computed(() => {
    const currentWeek = getMappedWeek(new Date());

    return employees.value.map(employee => {
        if (employee.tasks.length === 0) {
            return { ...employee, tasks: [{}] };
        } else {
            return {
                ...employee,
                tasks: employee.tasks.map(task => {
                    if (task.startDate && task.endDate) {
                        const startDate = new Date(task.startDate);
                        const endDate = new Date(task.endDate);
                        const taskStartWeek = getMappedWeek(startDate);
                        const taskEndWeek = getMappedWeek(endDate);
                        const taskStartDay = startDate.getDay();
                        const taskEndDay = endDate.getDay() === 0 ? 7 : endDate.getDay();

                        let updatedTask = { ...task, endDayOfWeek: taskEndDay };

                        if (taskStartWeek === currentWeek) {
                            updatedTask = { ...updatedTask, startDayOfWeek: taskStartDay };
                        }

                        return updatedTask;
                    }

                    return task;
                })
            };
        }
    });
});

const openTaskDetail = () => {
    isTaskFormActive.value = true;
};

const backToBackLog = () => {
    isTaskFormActive.value = false;
};

</script>

<style scoped></style>
