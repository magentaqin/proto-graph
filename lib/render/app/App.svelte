<script>
  import { onMount } from 'svelte';
  onMount(() => {
    fetch('/info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => console.log('sucess', data))
      .catch(err => console.log('error', err));
    });
</script>

<main>
	<p>Proto Graph Page</p>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
