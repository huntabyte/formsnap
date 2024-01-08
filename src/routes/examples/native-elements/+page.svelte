<script lang="ts">
	import { Form, type FormOptions } from "$lib/index.js";
	import type { PageData } from "./$types.js";
	import { simpleFormSchema } from "../schemas.js";
	import { Button } from "@/components/ui/button/index.js";

	export let data: PageData;

	const options: FormOptions<typeof simpleFormSchema> = {
		validators: {
			email: (v) => (!v.startsWith("a") ? 'Must start with "a"' : null)
		}
	};
</script>

<div class="flex flex-col h-full min-h-screen w-full items-center py-28">
	<h1 class="text-3xl font-semibold tracking-tight pb-8">Account Settings</h1>
	<Form.Root
		asChild
		schema={simpleFormSchema}
		form={data.form}
		debug={true}
		let:config
		let:enhance
		{options}
	>
		<form method="POST" class="container max-w-[750px] mx-auto flex flex-col gap-8" use:enhance>
			<Form.Field {config} name="email" let:actions let:errors let:value>
				<div class="flex flex-col gap-2">
					<!-- svelte-ignore a11y-label-has-associated-control / applied by action -->
					<label use:actions.label>Email</label>
					<input
						use:actions.input
						class="rounded bg-background border border-border h-9 text-foreground p-2"
					/>
					<span use:actions.validation class="text-destructive">
						{#if errors}
							{errors}
						{/if}
					</span>
				</div>
			</Form.Field>
			<Form.Field {config} name="username" let:actions let:errors>
				<div class="flex flex-col gap-2">
					<!-- svelte-ignore a11y-label-has-associated-control / applied by action -->
					<label use:actions.label>Username</label>
					<input
						use:actions.input
						class="rounded bg-background border border-border h-9 text-foreground p-2"
					/>
					<span use:actions.validation class="text-destructive">
						{#if errors}
							{errors}
						{/if}
					</span>
				</div>
			</Form.Field>
			<Form.Field {config} name="bio" let:actions let:errors>
				<div class="flex flex-col gap-2">
					<!-- svelte-ignore a11y-label-has-associated-control / applied by the action -->
					<label use:actions.label>Bio</label>
					<textarea
						use:actions.textarea
						rows="4"
						class="rounded resize-none bg-background border border-border text-foreground p-2"
					/>
					<span use:actions.validation class="text-destructive">
						{#if errors}
							{errors}
						{/if}
					</span>
				</div>
			</Form.Field>
			<Form.Field {config} name="website" let:actions let:errors>
				<div class="flex flex-col gap-2">
					<!-- svelte-ignore a11y-label-has-associated-control / applied by the action -->
					<label use:actions.label>Website</label>
					<input
						use:actions.input
						class="rounded bg-background border border-border h-9 text-foreground p-2"
					/>
					<span use:actions.validation class="text-destructive">
						{#if errors}
							{errors}
						{/if}
					</span>
				</div>
			</Form.Field>

			<Form.Field {config} name="notifications" let:actions let:errors>
				<div class="flex flex-col gap-2">
					<!-- svelte-ignore a11y-label-has-associated-control / applied by the action -->
					<label use:actions.label>Notifications</label>
					<select
						use:actions.select
						class="rounded bg-background border border-border h-9 text-foreground p-2"
					>
						<option value="all">All</option>
						<option value="mentions">Mentions</option>
						<option value="none">None</option>
					</select>
					<span use:actions.validation class="text-destructive">
						{#if errors}
							{errors}
						{/if}
					</span>
				</div>
			</Form.Field>
			<Form.Field {config} name="terms" let:actions let:errors>
				<div class="flex flex-col gap-2">
					<div class="flex items-center gap-4">
						<input
							type="checkbox"
							use:actions.checkbox
							class="rounded bg-background border border-border h-9 text-foreground p-2"
						/>
						<!-- svelte-ignore a11y-label-has-associated-control / applied by the action -->
						<label use:actions.label>Accept terms and conditions</label>
					</div>
					<span use:actions.validation class="text-destructive">
						{#if errors}
							{errors}
						{/if}
					</span>
				</div>
			</Form.Field>
			<Button type="submit">Submit</Button>
		</form>
	</Form.Root>
</div>
