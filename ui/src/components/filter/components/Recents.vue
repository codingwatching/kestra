<template>
    <el-dropdown
        trigger="click"
        placement="bottom-start"
        @visible-change="loadAll"
        class="recents"
    >
        <el-button :icon="History" class="rounded-0 rounded-start" />
        <template #dropdown>
            <el-dropdown-menu class="py-2" style="width: 400px">
                <p class="title">
                    {{ t("filters.recent.label") }}
                </p>
                <el-dropdown-item
                    v-if="!recents.length"
                    @click="emits('search', {})"
                >
                    <small>{{ t("filters.recent.empty") }}</small>
                </el-dropdown-item>
                <el-dropdown-item
                    v-else
                    v-for="recent in recents"
                    :key="recent"
                    @click="emits('search', recent.value)"
                >
                    <div class="d-flex justify-content-between w-100">
                        <span class="w-25">{{ recent.name }}</span>
                        <div class="w-75 ms-3 overflow-x-auto tags">
                            <el-tag
                                v-for="value in recent.value"
                                :key="value"
                                type="info"
                                class="me-2"
                            >
                                {{ value }}
                            </el-tag>
                        </div>
                    </div>
                </el-dropdown-item>

                <template v-if="saved.length">
                    <p class="pt-3 title">
                        {{ t("filters.save.label") }}
                    </p>
                    <el-dropdown-item
                        v-for="save in saved"
                        :key="save"
                        @click="emits('search', save.value)"
                    >
                        <div class="d-flex justify-content-between w-100">
                            <span class="w-25">{{ save.name }}</span>
                            <div class="w-75 ms-3 overflow-x-auto tags">
                                <el-tag
                                    v-for="value in save.value"
                                    :key="value"
                                    type="info"
                                    class="me-2"
                                >
                                    {{ value }}
                                </el-tag>
                            </div>
                        </div>
                    </el-dropdown-item>
                </template>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang="ts">
    import {useI18n} from "vue-i18n";
    const {t} = useI18n({useScope: "global"});

    import {getRecents, getSaved} from "../filters";

    import History from "vue-material-design-icons/History.vue";

    const emits = defineEmits(["search"]);
    const props = defineProps({prefix: {type: String, required: true}});

    let recents: { name: string; value: object }[] = [];
    let saved: { name: string; value: object }[] = [];

    const loadAll = () => {
        recents = getRecents(props.prefix);
        saved = getSaved(props.prefix);
    };

    loadAll();
</script>

<style lang="scss">
.title {
    margin: 0;
    padding: calc(1rem / 4) 0 0 1rem;
    font-size: var(--el-font-size-extra-small);
    color: var(--el-color-info);
}

.tags {
    &::-webkit-scrollbar {
        height: 5px;
    }

    &::-webkit-scrollbar-track {
        background: var(--card-bg);
    }

    &::-webkit-scrollbar-thumb {
        background: var(--bs-border-color);
        border-radius: 0px;
    }
}
</style>
