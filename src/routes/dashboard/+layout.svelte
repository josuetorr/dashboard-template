<script lang="ts">
	import "iconify-icon";

	import { setContext } from "svelte";
	import { sineIn } from "svelte/easing";
	import type { LayoutData } from "./$types";
	import {
		SidebarDropdownWrapper,
		SidebarItem,
		SidebarGroup,
		SidebarWrapper,
		Sidebar,
		Drawer,
	} from "flowbite-svelte";
	import Header from "$lib/components/company/Header.svelte";

	import { routes, dropdownRoutes } from "$lib/types/route.svelte";
	import { userKey, type UserContext } from "$lib/context/userContext";
	import { capitalizeWords } from "$lib/utils/string";
	import { getDashboardUrl } from "$lib/utils/dashboard";

	export let data: LayoutData;

	setContext<UserContext>(userKey, {
		getUser: () => data.user,
		getDisplayName: () => capitalizeWords(`${data.user.firstname} ${data.user.lastname}`),
	});

	let drawerHidden = true;

	function handleMouseMove(e: MouseEvent) {
		if (!drawerHidden) return;
		drawerHidden = !(e.clientX <= 15);
	}

	function closeDrawer() {
		drawerHidden = true;
	}
</script>

<svelte:window on:mousemove={handleMouseMove} />

<Header on:click={() => (drawerHidden = !drawerHidden)} />
<Drawer
	transitionParams={{
		x: -320,
		duration: 200,
		easing: sineIn,
	}}
	width="w-76"
	class="overflow-scroll pb-32"
	bind:hidden={drawerHidden}
	transitionType="fly"
	id="sidebar"
>
	<Sidebar>
		<SidebarWrapper>
			<SidebarGroup>
				{#each dropdownRoutes as dropdownRoute (dropdownRoute.label)}
					<SidebarDropdownWrapper label={dropdownRoute.label}>
						<svelte:fragment slot="icon">
							<iconify-icon icon={dropdownRoute.icon} />
						</svelte:fragment>
						{#each dropdownRoute.subItems as subItem (subItem.label)}
							<SidebarItem
								spanClass="dark:text-slate-400 mx-5"
								label={subItem.label}
								href={getDashboardUrl(subItem.href)}
								on:click={closeDrawer}
							/>
						{/each}
					</SidebarDropdownWrapper>
				{/each}
				{#each routes as { label, href, icon } (label)}
					<SidebarItem {label} href={getDashboardUrl(href)} on:click={closeDrawer}>
						<svelte:fragment slot="icon">
							<iconify-icon {icon} />
						</svelte:fragment>
					</SidebarItem>
				{/each}
			</SidebarGroup>
		</SidebarWrapper>
	</Sidebar>
</Drawer>
<main class="p-10">
	<slot />
</main>
