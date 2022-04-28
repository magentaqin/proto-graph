<script>
  import { onMount } from 'svelte';
  const jsonReviver = (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (value.dataType === 'Map') {
        return new Map(value.value);
      }
    }
    return value;
  };
  onMount(() => {
    fetch('/info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.text())
      .then(data => console.log('sucess', JSON.parse(data, jsonReviver)))
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
