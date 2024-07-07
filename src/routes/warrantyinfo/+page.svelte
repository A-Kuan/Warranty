<script>
    import { onMount } from 'svelte';
    import { page } from '$app/stores';

    let warrantyInfo = {} ;
    let isEditable = warrantyInfo.modify === "1";

    onMount(async () => {
        const code = $page.url.searchParams.get("code");
        await fetch(`http://127.0.0.1:8080/read?code=${code}`,{
                method: 'GET',
                headers: {
                'Content-Type': 'application/json'
                },
            })
            .then(response => {
                // 检查响应的状态码，确保请求成功
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                // 将响应解析为JSON格式
                return response.json();
            })
            .then(data => {
                // 在这里处理返回的数据
                warrantyInfo = data;
                console.log(data);
            })
            .catch(error => {
                // 处理请求错误
                console.error('There has been a problem with your fetch operation:', error);
            });
    })
</script>
<main>
    <div class="warranty-info">
        <h2>质保信息</h2>
        <div class="item">
            <label for="starttime">质保开始时间:</label>
            <input id="starttime" type="date" bind:value={warrantyInfo.starttime} disabled={isEditable} />
        </div>
        <div class="item">
            <label for="endtime">质保结束时间:</label>
            <input id="endtime" type="date" bind:value={warrantyInfo.endtime} disabled={isEditable} />
        </div>
        <div class="item">
            <label for="starttime">客户:</label>
            <input id="starttime" type="date" bind:value={warrantyInfo.starttime} disabled={isEditable} />
        </div>
        <div class="item">
            <label for="starttime">手机号:</label>
            <input id="starttime" type="text" bind:value={warrantyInfo.starttime} disabled={isEditable} />
        </div>
    </div>
</main>