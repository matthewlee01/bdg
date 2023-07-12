<script>
  import "@fontsource/eb-garamond";
</script>

<slot />

<style>
  :global(body) {
    background-color: #47585c;
    color: #c8d5bb;
    font-family: "EB Garamond";
  }

	:global(button) {
		font-family: "EB Garamond";
		background-color: black;
		color: #c8d5bb;
		border: 1px solid #c8d5bb;
		padding: 4px;
	}

	:global(input), :global(textarea) {
		font-family: "EB Garamond";
	}

	:global(a) {
		color: white;
	}

	:global(a:visited) {
		color: black;
	}
</style>
