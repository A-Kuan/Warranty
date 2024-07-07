<script>
  import { onMount,onDestroy } from 'svelte';
  import QRCode from 'qrcode';
  import PrintButton from './PrintButton.svelte';
  import PrintTemplate from './PrintTemplate.svelte';
  import { v4 as uuidv4 } from 'uuid';

  let loadingState = "none";
  let printTemplateRef;
  const url = "http://localhost:5173/warrantyinfo?code=";
  let code = ""
  let text = url; // 要生成二维码的文本
  let qrCodeDataURL = ''; // QR码的data URL
  let reportData = {
      title: '撕毁质保失效',
      content: ''
  };

  onMount(() => {
    code = uuidv4();
    text = `${url}${code}`;
    generateQRCode(text);
    if (typeof window !== 'undefined') {
      window.addEventListener('afterprint', () => {
        // text = `${uuidv4()}`;
        // generateQRCode(text);
      });
    }
  });
  onDestroy(() => {
    if (typeof window !== 'undefined') { 
      window.removeEventListener('afterprint', () =>{

      });
    }
  });

  function getCurrentDateWithYearOffset(yearsOffset) {
    const date = new Date();
    date.setFullYear(date.getFullYear() + yearsOffset);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  //生成二维码
  async function generateQRCode() {
    code = uuidv4()
    text = `${url}${code}`;
    try {
      qrCodeDataURL = await QRCode.toDataURL(text);
    } catch (err) {
      console.error(err);
    }
  }
  //调用打印机打印
  function printQRCode() {
    let printContents = printTemplateRef.innerHTML;

    const printWindow = window.open('', '', 'width=100,height=100');

    printWindow.document.write('<html><head><title></title>');
    printWindow.document.write('<style>@media print {@page { margin: 0; } body { margin: 0; }}</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write(printContents);
    printWindow.document.write('</body></html>');

    printWindow.document.close();

    printWindow.onload = function() {
        printWindow.print();
        printWindow.close();
    };
    
  }
</script>
  
<style>
  .qr-code {
    width: 10rem;
    height: auto;
  }
  .loading {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 4rem;
  }
</style>
  
<div>
  <div class="loading" style={`display: ${loadingState};`}>loading...</div>
  <span style="display: none;" bind:this={printTemplateRef}>
    <PrintTemplate  printData={{...reportData,content: qrCodeDataURL}} />
  </span>
  {#if qrCodeDataURL}
    <img class="qr-code" id="qr-code" src={qrCodeDataURL} alt="QR Code" />
  {/if}
  <br><br>
  <PrintButton handlerClick = {generateQRCode} text = "生成二维码"/>
  <br>
  <PrintButton handlerClick = {printQRCode} text = "打印" />
  <br>
  <PrintButton handlerClick = {async () => {
    
    loadingState = "flex";
    
    try {
      const response = await fetch('http://127.0.0.1:8080/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "code": code,
          "url": text,
          "enabled": "1",
          "modify": "1",
          "starttime": getCurrentDateWithYearOffset(0),
          "endtime": getCurrentDateWithYearOffset(2)
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      console.log(responseData);
    } catch (err) {
      console.log(err);
      loadingState = "none";
      
    } 
    loadingState = "none";
    // alert("质保码已生效")
    code = uuidv4();
    text = url + code;
    generateQRCode()
  }} text = "使用质保码" />

</div>