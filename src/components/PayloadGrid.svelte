<script>
    import { payloadStore, filterStore, categoryStore } from '../lib/stores.js';
    import PayloadCard from './PayloadCard.svelte';

    let payloads = [];
    let filter = '';
    let categories = [];

    $: payloadStore.subscribe(val => payloads = val);
    $: filterStore.subscribe(val => filter = val);
    $: categoryStore.subscribe(val => categories = val);

    $: filteredPayloads = payloads.filter(p =>
        p.payload.toLowerCase().includes(filter.toLowerCase()) ||
        p.level.toLowerCase().includes(filter.toLowerCase())
    );
</script>

<div class="grid">
    {#each filteredPayloads as p}
        <PayloadCard {p} {categories} />
    {/each}
</div>

<style>
    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 1rem;
    }
</style>
