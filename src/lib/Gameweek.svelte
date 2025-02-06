<script lang="ts">
	import type { GameweekData } from "./types";

	let { gameweek, date, current_gameweek, matchdays }: GameweekData = $props();

	function localTime(time: string): string {
		return new Date(time).toLocaleTimeString("en-GB", { timeStyle: "short" });
	}
</script>

<section
	data-gameweek={gameweek}
	data-current-gameweek={current_gameweek ? "" : undefined}
>
	<h2>
		Gameweek {gameweek}
		<span class="date">{date}</span>
	</h2>
	<table>
		<tbody>
		{#each matchdays as { weekday, fixtures }}
			{#each fixtures as fixture}
				<tr>
					<td class="fixture__team">{fixture.team_h.name}</td>
					<td class="fixture__score">
						{#if fixture.finished}
							{fixture.team_h.score}-{fixture.team_a.score}
						{:else}
							v
						{/if}
					</td>
					<td class="fixture__team">{fixture.team_a.name}</td>
					<td class="fixture__time"
						>{weekday} {localTime(fixture.kickoff_time)}</td
					>
					<td class="fixture__broadcaster">
						{#if fixture.finished && fixture.youtube}
							<a
								href="https://www.youtube.com/watch?v={fixture.youtube}"
								target="_blank"
								rel="noopener noreferrer">Highlights</a
							>
						{:else}
							{fixture.broadcaster || ""}
						{/if}
					</td>
				</tr>
			{/each}
		{/each}
		</tbody>
	</table>
</section>

<style>
	section {
		scroll-margin-top: 60px;
		margin-bottom: 80px;
	}

	h2 {
		font-size: inherit;
		font-weight: bold;
		margin: 0 0 20px;
	}

	table {
		border-collapse: collapse;
		width: 100%;
	}

	td {
		padding: 1px 0 0;
	}

	.fixture__team {
		width: 25%;
	}

	.fixture__score {
		width: 15%;
		text-align: center;
	}

	.fixture__time {
		width: 17.5%;
	}

	.fixture__broadcaster {
		width: 17.5%;
	}

	a {
		color: inherit;
	}

	.date {
		font-weight: normal;
	}
</style>
