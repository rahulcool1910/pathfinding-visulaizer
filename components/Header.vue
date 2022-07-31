<template>
    <div class="navbar bg-base-300 mb-4">
        <div class="flex-1">
            <a class="btn btn-ghost normal-case text-xl">PathFinder</a>
        </div>
        <div class="flex-none">
            <ul class="menu menu-horizontal p-0 flex flex-row gap-4">
                <li>

                    <button @click="refreshNodes(false)" :disabled="disableButtons"
                        class="btn btn-secondary">Refresh</button>
                </li>
                <li tabindex="0" class="dropdown-content menu shadow bg-base-100 rounded-box w-52">
                    <a>
                        <p>
                            {{ currAlgorithm }}
                        </p>
                        <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                            viewBox="0 0 24 24">
                            <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                        </svg>
                    </a>
                    <ul class="p-2 bg-black">

                        <li v-for="algorithm of algorithms">
                            <a @click="changeAlgorithm(algorithm)" class="bg-black text-white z-10">{{ algorithm }}</a>
                        </li>

                    </ul>
                </li>
                <li>
                    <button class="btn btn-primary" :disabled="disableButtons"
                        @click="getVisitedNodes(currAlgorithm)">Visualize</button>
                </li>

            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props: {
        getVisitedNodes: Function,
        refreshNodes: Function,
        algorithms: {
            type: Array,
            default: () => {
                return []
            }
        },
        disableButtons: {
            type: Boolean,
            default: () => {
                return false
            }
        }
    },
    data() {
        return {
            currAlgorithm: '',
        }
    },
    mounted() {
        this.currAlgorithm = this.algorithms[0] as string
    },
    methods: {
        changeAlgorithm(algorithm: string) {
            this.currAlgorithm = algorithm;
        }
    }
})
</script>

<style lang="scss" scoped>
</style>