<script>
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    onMount(() => {
       console.log($page.url.searchParams.get("code")); 
    })
</script>
<main>
    hello warranty
</main>