<script>
    export let open = false;
    export let onClose;
</script>

{#if open}
    <div class="backdrop" on:click={() => onClose()}>
        <div class="modal" on:click|stopPropagation>
            <slot />
        </div>
    </div>
{/if}

<style>
    .backdrop {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 999;
    }
    .modal {
        background: white;
        padding: 2rem;
        border-radius: 8px;
        max-width: 500px;
        width: 100%;
    }
</style>
