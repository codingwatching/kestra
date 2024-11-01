<template>
    <section class="d-inline-flex w-100 filters">
        <Recents :prefix @search="handleRecents" />

        <el-select
            ref="field"
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

        <Save :disabled="!Object.keys(current).length" :prefix :current />
        <slot name="refresh" />
    </section>
</template>

<script setup lang="ts">
    import {ref, computed} from "vue";
    import {ElSelect} from "element-plus";

    import {useI18n} from "vue-i18n";
    const {t} = useI18n({useScope: "global"});

    import Recents from "./components/recents/Wrapper.vue";
    import Save from "./components/Save.vue";

    const props = defineProps({
        include: {type: Array, required: true},
        prefix: {type: String, required: true},
    });

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

    const field = ref<InstanceType<typeof ElSelect> | null>(null);

    const current = ref({});
    const available = computed(() =>
        OPTIONS.filter((o) => props.include.includes(o.value)),
    );

    const handleRecents = (value) => {
        if (value) current.value = value;
        field.value?.focus();
    };
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
