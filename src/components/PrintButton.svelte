<script>
    export let text;
    export let handlerClick;
</script>

<section>
    <button class="print-btn" on:click={() => {
        if(handlerClick) {
            handlerClick()
        }
    }}>{text}</button>
</section>

<style>
    .print-btn:hover {
        cursor: pointer;
    }
    .print-btn {
        color: #C6C0B0;
        border-radius: .5rem;
        width: 10rem;
        height: 3rem;
        background-color: #EFEEEB;
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0px 4px 4px 2px rgba(226, 223, 215, 1),
            0px 4px 4px 1px rgba(0, 0, 0, 0.1)
        ;
    }
</style>