<script>
    import Modal from './Modal.svelte';
    import { payloadStore } from '../lib/stores.js';

    export let open = false;
    export let onClose;
    export let onSave;
    export let payload = {
        id: '',
        payload: '',
        categories: ['xss'],
        level: 'Apprentice'
    };

    let categories = [];
    payloadStore.subscribe(val => categories = val);

    let text = payload?.payload;
    let selectedCategories = [...(payload?.categories ?? [])];
    let level = payload?.level;

    function toggleCategory(id) {
        if (selectedCategories.includes(id)) {
            selectedCategories = selectedCategories.filter(c => c !== id);
        } else {
            selectedCategories.push(id);
        }
    }

    function save() {
        onSave({
            ...payload,
            payload: text,
            categories: selectedCategories,
            level
        });
        onClose();
    }
</script>

<Modal {open} {onClose}>
    <h2>{payload.id ? 'Edit Payload' : 'Add Payload'}</h2>

    <textarea rows="5" bind:value={text}></textarea>

    <div>
        <h4>Categories:</h4>
        {#each categories as cat}
            <label style="background: {cat.color}; padding: 0.3rem; margin-right: 0.5rem;">
                <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat.id)}
                        on:change={() => toggleCategory(cat.id)}
                />
                {cat.name}
            </label>
        {/each}
    </div>

    <div>
        <h4>Level:</h4>
        <select bind:value={level}>
            <option>Apprentice</option>
            <option>Practitioner</option>
            <option>Expert</option>
        </select>
    </div>

    <button on:click={save}>
        Save
    </button>
    <button on:click={onClose}>
        Cancel
    </button>
</Modal>

<style>
    textarea {
        width: 100%;
        margin-bottom: 1rem;
        padding: 0.5rem;
    }
    select {
        width: 100%;
        padding: 0.5rem;
        margin-bottom: 1rem;
    }
    button {
        margin-right: 0.5rem;
    }
</style>
