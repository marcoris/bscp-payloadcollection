<script>
    import { onMount } from 'svelte';
    import { categoryStore, payloadStore } from './lib/stores.js';
    import { categories } from './lib/categories.js';
    import { payloads } from './lib/payloads.js';

    import FilterBar from './components/FilterBar.svelte';
    import PayloadGrid from './components/PayloadGrid.svelte';
    import CategoryModal from './components/CategoryModal.svelte';
    import PayloadModal from './components/PayloadModal.svelte';

    let showCatModal = false;
    let showPayloadModal = false;

    let editCategory = null;
    let editPayload = null;

    function openNewCategory() {
        editCategory = { id: '', name: '', color: '#cccccc' };
        showCatModal = true;
    }

    function openEditCategory(cat) {
        editCategory = { ...cat };
        showCatModal = true;
    }

    function saveCategory(cat) {
        categoryStore.update(cats => {
            if (cat.id) {
                return cats.map(c => c.id === cat.id ? cat : c);
            } else {
                return [...cats, { ...cat, id: Date.now().toString() }];
            }
        });
    }

    function openNewPayload() {
        editPayload = {
            id: '',
            payload: '',
            categories: [],
            level: 'Apprentice'
        };
        showPayloadModal = true;
    }

    function openEditPayload(p) {
        editPayload = { ...p };
        showPayloadModal = true;
    }

    function savePayload(p) {
        payloadStore.update(list => {
            if (p.id) {
                return list.map(x => x.id === p.id ? p : x);
            } else {
                return [...list, { ...p, id: Date.now().toString() }];
            }
        });
    }

    onMount(() => {
        categoryStore.set(categories);
        payloadStore.set(payloads);
    });
</script>

<main>
    <h1>Burp Payload Manager</h1>

    <button on:click={openNewCategory}>Add Category</button>
    <button on:click={openNewPayload}>Add Payload</button>

    <FilterBar />

    <PayloadGrid />

    <CategoryModal
            open={showCatModal}
            onClose={() => (showCatModal = false)}
            onSave={saveCategory}
            category={editCategory}
    />

    <PayloadModal
            open={showPayloadModal}
            onClose={() => (showPayloadModal = false)}
            onSave={savePayload}
            payload={editPayload}
    />
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
    button {
        margin-right: 1rem;
        margin-bottom: 1rem;
    }
</style>
