<template>
	<div
		class="collapsible-container"
		:class="{'collapsible-collapsed': collapsed}"
	>
		<button
			class="collapsible-header"
			:title="`Click to ${collapsed ? 'expand' : 'collapse'} section`"
			@click="$emit('update:collapsed', !collapsed)"
		>
			{{ header }}
			<span class="collapsible-header-icon">
				<i class="fas fa-chevron-up" :title="collapsed ? 'Collapsed' : 'Expanded'" />
			</span>
		</button>

		<transition name="slide">
			<div v-if="!collapsed" class="collapsible-content">
				<slot />
			</div>
		</transition>
	</div>
</template>

<script>
export default {
	props: {
		collapsed: Boolean,
		header: {
			type: String,
			required: true,
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../scss/_variables';
$transition: 0.3s;

.collapsible-container {
	margin: 1.6rem 0;
	border-top: $size-line solid $color-primary;
	border-bottom: $size-line solid $color-primary;
}

.collapsible-header {
	display: block;
	width: 100%;
	text-align: left;
	font-size: inherit;
	font-weight: 700;
}

.collapsible-header-icon {
	float: right;
	transition: transform $transition;
}

.collapsible-content {
	height: auto;
	transform: scaleY(1);
	transform-origin: top;
	opacity: 1;
	overflow: auto;
	padding: 0 1.6rem;
	transition-property: transform, opacity;
	transition-duration: $transition;
}

.slide-enter,
.slide-leave-to {
	transform: scaleY(0);
	opacity: 0;
}

.collapsible-collapsed {
	.collapsible-header-icon {
		transform: rotate(180deg);
	}
}
</style>

