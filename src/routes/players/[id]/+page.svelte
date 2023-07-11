<script>
	export let data;
	const player = data.player;
	console.log(player);
</script>

<div>
	<h3>hello, {data.player.id}</h3>
	{#if player.group == null}
		<div>you haven't been assigned to a group yet. stay tuned!</div>
	{:else}
		<div>
			{player.group.id}
		</div>
	{/if}
</div>