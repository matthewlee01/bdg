<script>
  export let data;
  const { players, groups, quests } = data;
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
    <button formaction="?/playerDelete">delete selected players</button>

    <fieldset>
      <legend>select group</legend>
      <select name="groupId">
        {#each groups as group (group.id)}
          <option>{group.id}</option>
        {/each}
      </select>
      <button formaction="?/groupAdd">add selected to group</button>
    </fieldset>
  </fieldset>
</form>

<form method="POST">
  <fieldset>
    <legend>groups</legend>
    <ul>
      {#each groups as group (group.id)}
        <li>
          <input type="checkbox" id={group.id} name="group" value={group.id} />
          <label for={group.id}><strong>{group.id}</strong></label><br />
          players:<br />
          <ul>
            {#each group.players as player (player.id)}
              <li>
                {player.id}
              </li>
            {/each}
          </ul>
          assigned quests:<br />
          <ul>
            {#each group.assignments as assignment (assignment.questId)}
              <li>
                {assignment.questId}<br />
                start: {assignment.startTime.toTimeString().slice(0, 5)}<br />
                end: {assignment.endTime.toTimeString().slice(0, 5)}<br />
              </li>
            {/each}
          </ul>
        </li>
      {/each}
    </ul>
    <button formaction="?/groupDelete">delete selected groups</button>

    <fieldset>
      <legend>new group</legend>
      <input type="text" name="groupId" required />
      <button formaction="?/groupCreate">create group</button>
    </fieldset>
  </fieldset>
</form>

<form method="POST">
  <fieldset>
    <legend>quests</legend>
    <ul>
      {#each quests as quest (quest.id)}
        <li>
          <input type="checkbox" id={quest.id} name="quest" value={quest.id} />
          <label for={quest.id}>{quest.id}</label>
          <div>
            description: {quest.description} <br />
            participants: {quest.participants || "n/a"}<br />
            reward: {quest.points} points<br />
            demerits: {quest.demerits}<br />
            {#if quest.location}
              location: <a target="_blank" href={quest.location}>link</a><br />
            {/if}
          </div>
        </li>
      {/each}
    </ul>
    <button formaction="?/questDelete">delete selected quests</button>
    <fieldset>
      <legend>assign quests</legend>
      <select name="groupId">
        {#each groups as group (group.id)}
          <option>{group.id}</option>
        {/each}
      </select>
      <br />
      <label>
        quest start time <span>(optional)</span>
        <input type="time" name="startTime" />
      </label>
      <br />
      <label>
        quest end time <span>(optional)</span>
        <input type="time" name="endTime" />
      </label>
      <input value={new Date().toDateString()} name="localDateString" hidden />
      <button formaction="?/questAssign">assign selected quests to group</button
      >
    </fieldset>
    <form method="POST">
      <fieldset>
        <legend>new quest</legend>
        <label
          >title
          <input type="text" name="questId" required />
        </label>
        <br />
        <label
          >description
          <textarea name="questDescription" required />
        </label>
        <br />
        <label>
          # of participants <span>(optional)</span>
          <input type="number" name="questParticipants" />
        </label>
        <br />
        <label>
          # points for success
          <input type="number" name="questPoints" required />
        </label>
        <br />
        <label>
          # demerits for failure
          <input type="number" name="questDemerits" required />
        </label>
        <br />
        <label>
          map link location <span>(optional)</span>
          <input type="text" name="questLocation" />
        </label>
        <br />
        <button formaction="?/questCreate">create quest</button>
      </fieldset>
    </form>
  </fieldset>
</form>
