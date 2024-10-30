<template>
    <section class="d-inline-flex filters">
        <Recents />

        <el-select
            v-model="current"
            :placeholder="t('filters.label')"
            allow-create
            filterable
            multiple
        >
            <el-option
                v-for="filter in available"
                :key="filter.value"
                :value="filter.value"
                :label="filter.label"
            />
        </el-select>

        <Save :disabled="!Object.keys(current).length" :current="current" />
        <slot name="refresh" />
    </section>
</template>

<script setup lang="ts">
    import {ref, computed} from "vue";

    import {useI18n} from "vue-i18n";
    const {t} = useI18n({useScope: "global"});

    import Recents from "./components/Recents.vue";
    import Save from "./components/Save.vue";

    const props = defineProps({include: {type: Array, required: true}});

    const OPTIONS = [
        {
            value: "namespace",
            label: t("filters.options.namespace"),
        },
        {
            value: "state",
            label: t("filters.options.state"),
        },
        {
            value: "scope",
            label: t("filters.options.scope"),
        },
        {
            value: "date",
            label: t("filters.options.date"),
        },
    ];

    const current = ref({});
    const available = computed(() =>
        OPTIONS.filter((o) => props.include.includes(o.value)),
    );
</script>

<style lang="scss">
.filters {
    & .el-select__wrapper {
        border-radius: 0;
        box-shadow:
            0 -1px 0 0 var(--el-border-color) inset,
            0 1px 0 0 var(--el-border-color) inset;
    }
}
</style>
