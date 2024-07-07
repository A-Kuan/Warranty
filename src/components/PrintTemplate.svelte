<!-- PrintTemplate.svelte -->
<script>
    export let printData;
</script>
<style>

    /* 样式控制打印时的布局 */
    @media print {
        /* 设置页面样式，比如页面边距和背景色等 */
        body {
            margin: 0;
            background-color: white;
        }
    
        /* 隐藏不需要打印的元素 */
        .no-print {
            display: none;
        }
    }
</style>
<section>
    <div class="print-template">
        <h1>{printData?.title}</h1>
        {#if printData?.content}
            <img class="qr-code" id="qr-code" src={printData?.content} alt="QR Code" />
        {/if}
    </div>
</section>

