<script lang="ts">
	import {
		NavHamburger,
		DarkMode,
		Avatar,
		Dropdown,
		DropdownItem,
		DropdownHeader,
	} from "flowbite-svelte";
	import Banner from "./Banner.svelte";
	import { goto } from "$app/navigation";
	import { getContext } from "svelte";
	import { userKey, type UserContext } from "$lib/context/userContext";
	import { getDashboardUrl } from "$lib/utils/dashboard";

	const { getUser, getDisplayName } = getContext<UserContext>(userKey);
	const user = getUser();
	const displayName = getDisplayName();
	const initials = displayName.split(" ").reduce((initial, name) => initial + name[0], "");

	async function logout() {
		const res = await fetch("/api/v1/auth/logout", { method: "POST" });
		if (!res.ok) return;

		const data = await res.json();
		goto(data.redirectUrl, { invalidateAll: true });
	}

	const dropdownItems = [
		{ label: "Profile", props: { href: getDashboardUrl("profile") } },
		{ label: "Acceuil", props: { href: getDashboardUrl("") } },
	];

	const dropdownTextClass = "text-xs text-start font-semibold my-1";
</script>

<header class="flex items-center p-5">
	<NavHamburger btnClass="sm:hidden" on:click />
	<Banner />
	<div class="flex">
		<button>
			<Avatar size="sm">{initials}</Avatar>
		</button>
		<Dropdown>
			<DropdownHeader>
				<p class={dropdownTextClass}>{displayName}</p>
				<p class={dropdownTextClass}>{user.email}</p>
			</DropdownHeader>
			{#each dropdownItems as { label, props } (label)}
				<DropdownItem class={dropdownTextClass} {...props}>{label}</DropdownItem>
			{/each}
			<DropdownItem slot="footer" on:click={logout}>Se déconnecter</DropdownItem>
		</Dropdown>
		<DarkMode size="lg" class="mr-2 sm:mx-3" />
	</div>
</header>
