<script>
    export let p;
    export let categories;

    const preview = p.payload.slice(0, 50) + (p.payload.length > 50 ? '…' : '');

    const levelColors = {
        Apprentice: '#4caf50',
        Practitioner: '#ff9800',
        Expert: '#f44336'
    };

    $: catColors = p.categories.map(cid => {
        let cat = categories.find(c => c.id === cid);
        return cat?.color || '#ccc';
    });

    $: gradient = catColors.length > 1
        ? `linear-gradient(45deg, ${catColors.join(', ')})`
        : catColors[0] || '#ccc';
</script>

<div class="card" style="border-image: {gradient} 1;">
    <div class="preview">{preview}</div>
    <div class="level" style="background: {levelColors[p.level]}">{p.level}</div>
    <div class="cats">
        {#each p.categories as cid}
      <span
              class="cat"
              style="background: {categories.find(c => c.id === cid)?.color}"
      >
        {categories.find(c => c.id === cid)?.name}
      </span>
        {/each}
    </div>
</div>

<style>
    .card {
        border-width: 3px;
        border-style: solid;
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 1rem;
    }
    .level {
        color: white;
        padding: 0.3rem 0.5rem;
        border-radius: 4px;
        display: inline-block;
        margin-top: 0.5rem;
    }
    .cats {
        margin-top: 0.5rem;
    }
    .cat {
        display: inline-block;
        color: white;
        padding: 0.2rem 0.5rem;
        border-radius: 3px;
        margin-right: 0.3rem;
        font-size: 0.8rem;
    }
</style>
