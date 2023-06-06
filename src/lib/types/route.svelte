<script context="module" lang="ts">
	export type Route = {
		label: string;
		href: string;
		icon: string;
	};

	export type DropdownRoute = Omit<Route, "href"> & { subItems: Array<Omit<Route, "icon">> };

	// main navigation routes
	export const routes: Route[] = [
		{
			label: "Clients",
			href: "clients",
			icon: "material-symbols:supervised-user-circle",
		},
		{ label: "Statistiques", href: "stats", icon: "nimbus:stats" },
		{ label: "Marketing", href: "marketing", icon: "nimbus:marketing" },
		{ label: "Externes", href: "external", icon: "nimbus:external-link" },
	];

	export const dropdownRoutes: DropdownRoute[] = [
		{
			label: "Inventaire",
			icon: "material-symbols:inventory-2-outline",
			subItems: [{ label: "Produits", href: "products" }],
		},
		{
			label: "Commandes",
			icon: "material-symbols:local-shipping-outline",
			subItems: [
				{ label: "Prêtes à Livrer", href: "orders/ready-to-ship" },
				{ label: "Prêtes à Receuillir", href: "orders/ready-to-pickup" },
				{ label: "À venir", href: "orders/upcoming" },
				{ label: "Par Catégories", href: "orders/categories" },
			],
		},
		{
			label: "Admins",
			icon: "material-symbols:person",
			subItems: [{ label: "Créer", href: "admins/create" }],
		},
	];
</script>
