<script>
    import Modal from './Modal.svelte';
    import { categoryStore } from '../lib/stores.js';

    import { onDestroy } from 'svelte';
    onDestroy(() => {
        unsubscribe();
    });

    export let open = false;
    export let onClose;
    export let onSave;
    export let category = { id: '', name: '', color: '#cccccc' };

    let showCatModal = false;

    let editCategory = null;

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

    // Subscription, falls du im Modal Kategorien anzeigen willst
    let categories = [];
    const unsubscribe = categoryStore.subscribe(value => {
        categories = value;
    });

    let name = category?.name ?? '';
    let color = category?.color ?? '#cccccc';

    $: if (category) {
        name = category.name;
        color = category.color;
    }

    function save() {
        onSave({
            ...category,
            name,
            color,
        });
        onClose();
    }
</script>

<Modal {open} {onClose}>
    <h2>{category.id ? 'Edit Category' : 'Add Category'}</h2>
    <input placeholder="Name" bind:value={name} />
    <input type="color" bind:value={color} />

    <button on:click={save}>
        Save
    </button>
    <button on:click={onClose}>
        Cancel
    </button>
</Modal>

<style>
    input {
        display: block;
        margin-bottom: 1rem;
        width: 100%;
        padding: 0.5rem;
        font-size: 1rem;
    }
    button {
        margin-right: 0.5rem;
        padding: 0.5rem 1rem;
        font-size: 1rem;
    }
</style>
