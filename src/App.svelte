<script>
    import { onMount } from 'svelte';
    import { categoryStore, payloadStore } from './lib/stores.js';
    import { categories } from './lib/categories.js';
    import { payloads } from './lib/payloads.js';

    import FilterBar from './components/FilterBar.svelte';
    import PayloadGrid from './components/PayloadGrid.svelte';

    onMount(() => {
        categoryStore.set(categories);
        payloadStore.set(payloads);
    });
</script>

<main>
    <h1>Burp Payload Manager</h1>
    <FilterBar />
    <PayloadGrid />
</main>

<style>
    main {
        max-width: 900px;
        margin: 2rem auto;
        padding: 1rem;
    }
    h1 {
        text-align: center;
        margin-bottom: 2rem;
    }
</style>
