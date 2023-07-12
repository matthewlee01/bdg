<script>
  export let data;
  const player = data.player;
  const group = player.group;
  const assignments = group.assignments.filter(
    (assignment) => !assignment.status
  );
  const completedAssignments = group.assignments.filter(
    (assignment) => assignment.status
  );
</script>

<div>
  <h2>hello, {data.player.id}</h2>
  {#if player.group == null}
    <div>you haven't been assigned to a group yet. stay tuned!</div>
  {:else}
    <div>
      <h4>group: {group.id}</h4>
      <h4>points: {group.points}</h4>
      <h4>demerits: {group.demerits}</h4>
      <div>
        <h4>members:</h4>
        <ul>
          {#each group.players as player (player.id)}
            <li>{player.id}</li>
          {/each}
        </ul>
      </div>
      <div>
        <h4>your group's quests:</h4>
        <ul>
          {#each assignments as assignment (assignment.questId)}
            <li>
              <form method="POST">
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
                    <br />
                  {/if}
                  {#if assignment.endTime}
                    deadline: {assignment.endTime.toTimeString().slice(0, 5)}
                    <br />
                  {/if}
                  <input name="proofLink" required />
                  <input name="questId" value={assignment.questId} hidden />
                  <input name="groupId" value={group.id} hidden />
                  <input name="playerId" value={player.id} hidden />
                  <button formaction="?/questComplete">complete quest!</button>
                </fieldset>
              </form>
            </li>
          {/each}
        </ul>
      </div>
      <div>
        <h4>completed quests</h4>
        <ul>
          {#each completedAssignments as assignment (assignment.questId)}
						{#if assignment.proofLink}
            	<li>{assignment.questId} - success! points awarded: {assignment.quest.points}</li>
						{:else}
            	<li>{assignment.questId} - failed... demerits added: {assignment.quest.demerits}</li>
						{/if}
          {/each}
        </ul>
      </div>
    </div>
  {/if}
</div>
