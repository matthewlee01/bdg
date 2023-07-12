<script>
  export let data;
  const player = data.player;
  const group = player.group;
  const assignments = group.assignments;

  console.log(player);
</script>

<div>
  <h3>hello, {data.player.id}</h3>
  {#if player.group == null}
    <div>you haven't been assigned to a group yet. stay tuned!</div>
  {:else}
    <div>
      <h5>group: {group.id}</h5>
      <h5>points: {group.points}</h5>
      <h5>demerits: {group.demerits}</h5>
      <div>
        <h5>members:</h5>
        <ul>
          {#each group.players as player (player.id)}
            <li>{player.id}</li>
          {/each}
        </ul>
      </div>
      <div>
        <h5>your group's quests!</h5>
        <ul>
          {#each assignments as assignment (assignment.questId)}
            <li>
              <field>
                <fieldset>
                  <legend>{assignment.questId}</legend>
                  {assignment.quest.description}
                  <br />
                  # of participants: {assignment.quest.participants || "n/a"}
                  <br />
                  # of points awarded on completion: {assignment.quest.points}
                  <br />
                  # of demerits on failure: {assignment.quest.demerits}
                  <br />
                  {#if assignment.quest.location}
                    <a href={assignment.quest.location} target="_blank"
                      >link to map location</a
                    >
                  {/if}
                </fieldset>
              </field>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  {/if}
</div>
