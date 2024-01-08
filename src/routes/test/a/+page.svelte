<script lang="ts" context="module">
	import { z } from "zod";
	export const testASchema = z.object({
		username: z
			.string()
			.min(3, "Username must be at least 3 characters")
			.max(20, "Username must be at most 20 characters"),
		email: z.string().email("Invalid email address"),
		language: z.enum(["en", "es", "fr"], {
			required_error: "You need to select a language."
		}),
		bio: z.string().max(250, "Bio must be at most 250 characters").optional(),
		website: z.string().url("Invalid URL").optional(),
		usage: z.boolean().default(true)
	});
</script>

<script lang="ts">
	import { Form } from "$lib/index.js";
	import type { PageData } from "./$types.js";
	import { Button } from "@/components/ui/button/index.js";

	export let data: PageData;
</script>

<div class="flex flex-col h-full min-h-screen w-full items-center py-28">
	<h1 class="text-3xl font-semibold tracking-tight pb-8">Account Settings</h1>
	<Form.Root
		schema={testASchema}
		form={data.form}
		debug={true}
		let:config
		class="container max-w-[750px] mx-auto flex flex-col gap-8"
		data-testid="form"
	>
		<Form.Field {config} name="email">
			<div class="grid gap-2">
				<Form.Label data-testid="email-label">Email</Form.Label>
				<Form.Input
					data-testid="email-input"
					class="rounded bg-background border border-border h-9 text-foreground p-2"
				/>
				<Form.Validation data-testid="email-validation" class="text-destructive" />
				<Form.Description data-testid="email-description">Email description</Form.Description>
			</div>
		</Form.Field>
		<Form.Field {config} name="username">
			<div class="grid gap-2">
				<Form.Label data-testid="username-label">Username</Form.Label>
				<Form.Input
					data-testid="username-input"
					class="rounded bg-background border border-border h-9 text-foreground p-2"
				/>
				<Form.Validation data-testid="username-validation" class="text-destructive" />
				<Form.Description data-testid="username-description">username description</Form.Description>
			</div>
		</Form.Field>
		<Form.Field {config} name="bio">
			<div class="grid gap-2">
				<Form.Label data-testid="bio-label">Bio</Form.Label>
				<Form.Textarea
					rows={4}
					class="resize-none rounded bg-background border border-border text-foreground p-2"
					data-testid="bio-input"
				/>
				<Form.Validation data-testid="bio-validation" class="text-destructive" />
				<Form.Description data-testid="bio-description">bio description</Form.Description>
			</div>
		</Form.Field>
		<Form.Field {config} name="website">
			<div class="grid gap-2">
				<Form.Label data-testid="website-label">Website</Form.Label>
				<Form.Input
					data-testid="website-input"
					class="rounded bg-background border border-border h-9 text-foreground p-2"
				/>
				<Form.Description data-testid="website-description">website description</Form.Description>
				<Form.Validation data-testid="website-validation" class="text-destructive" />
			</div>
		</Form.Field>
		<Form.Field {config} name="language">
			<div class="grid gap-2">
				<Form.Label data-testid="language-label">Language</Form.Label>
				<Form.Select
					data-testid="language-input"
					class="rounded bg-background border border-border h-9 text-foreground p-2"
				>
					<option value="en">English</option>
					<option value="es">Spanish</option>
					<option value="fr">French</option>
				</Form.Select>
				<Form.Validation data-testid="language-validation" class="text-destructive" />
				<Form.Description data-testid="language-description">language description</Form.Description>
			</div>
		</Form.Field>
		<Form.Field {config} name="usage">
			<div class="grid gap-2">
				<div class="flex items-center gap-4">
					<Form.Checkbox data-testid="usage-input" />
					<Form.Label data-testid="usage-label">Send crash reports & statistics</Form.Label>
				</div>
				<Form.Validation data-testid="usage-validation" class="text-destructive" />
				<Form.Description data-testid="usage-description">usage description</Form.Description>
			</div>
		</Form.Field>
		<Button type="submit" data-testid="submit">Submit</Button>
	</Form.Root>
</div>
