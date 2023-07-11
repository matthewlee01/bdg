<script>
  export let data;
  const players = data.players;
  const groups = data.groups;
</script>

<h3>story teller dash board</h3>

<form method="POST">
  <fieldset>
    <legend>players</legend>
    <ul>
      {#each players as player (player.id)}
        <li>
          <input
            type="checkbox"
            id={player.id}
            name="player"
            value={player.id}
          />
          <label for={player.id}>{player.id}</label>
        </li>
      {/each}
    </ul>
    <select name="groupId">
      {#each groups as group (group.id)}
        <option>{group.id}</option>
      {/each}
    </select>

    <button formaction="?/groupAdd">add selected to group</button>
    <button formaction="?/playerDelete">delete selected players</button>
  </fieldset>
</form>

<form method="POST">
  <fieldset>
    <legend>groups</legend>
    <ul>
      {#each groups as group (group.id)}
        <li>
          <input type="checkbox" id={group.id} name="group" value={group.id} />
          <label for={group.id}>{group.id}</label>
          <ul>
            {#each group.players as player (player.id)}
              <li>
                {player.id}
              </li>
            {/each}
          </ul>
        </li>
      {/each}
    </ul>

    <input type="text" name="groupId" />
    <button formaction="?/groupCreate">create group</button>
    <button formaction="?/groupDelete">delete selected groups</button>
  </fieldset>
</form>
