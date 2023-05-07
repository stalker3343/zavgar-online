<template>
  <flag-autocomplete
    :repository="$vehiclesRepository"
    v-bind="$attrs"
    is-local-search
    item-text="inventory_number"
    item-value="id"
    label="Выберете ТС"
    v-on="$listeners"
  />
</template>

<script>
export default {}
</script>

<style></style>
