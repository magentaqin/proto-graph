<script>
  import { onMount } from 'svelte';
  import Socket from './Socket.svelte';
  import Control from './Control.svelte';
  import { kebab } from './utils';
  export let node = {
    name: '',
    outputs: new Map(),
    controls: new Map(),
    inputs: new Map()
  }
  export let editor = {
    selected: {
      list: [],
    }
  }
  export let bindSocket, bindControl;

  let outputs = [], controls = [], inputs = [], selected = '';

  onMount(() => {
    outputs = Array.from(node.outputs.values());
    controls = Array.from(node.controls.values());
    inputs = Array.from(node.inputs.values());
    selected = editor.selected.list.includes(node) ? 'selected' : ''
  });

</script>

<div class={`node ${selected} ${kebab(node.name)}`}>
  <div class="title">{node.name}</div>
  {#each outputs as output}
    <div class="output" key={output.key}>
      <div class="output-title">{output.name}</div>
      <Socket type="output" socket={output.socket} io={output} innerRef={bindSocket} />
    </div>
  {/each}
  {#each controls as control}
    <Control class="control" key={control.key} control={control} innerRef={bindControl} />
  {/each}
  {#each inputs as input}
    <div class="input" key={input.key}>
      <Socket type="input" socket={input.socket} io={input} innerRef={bindSocket} />
      {#if input.showControl()}
        <Control class="input-control" control={input.control} innerRef={bindControl} />
        {:else}
        <div class="input-title">{input.name}</div>
      {/if}
    </div>
  {/each}
</div>

<style lang="less">
  @import './styles.less';
</style>