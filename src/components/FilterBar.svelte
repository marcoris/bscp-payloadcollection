<script>
    import { filterStore } from '../lib/stores.js';

    let filter = '';
    $: filterStore.set(filter);
</script>

<input
        type="text"
        placeholder="Filter payloads..."
        bind:value={filter}
/>

<style>
    input {
        width: 100%;
        padding: 0.5rem;
        margin-bottom: 1rem;
        font-size: 1.1rem;
    }
</style>
