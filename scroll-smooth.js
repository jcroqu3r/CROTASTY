(function () {
	"use strict";

	const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	const hasFinePointer = window.matchMedia("(pointer: fine)").matches;

	if (prefersReducedMotion || !hasFinePointer) {
		return;
	}

	const state = {
		currentY: window.scrollY,
		targetY: window.scrollY,
		rafId: 0,
	};

	const ease = 0.055;
	const wheelMultiplier = 1.25;

	const maxScrollY = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

	const clampTarget = () => {
		const limit = maxScrollY();
		state.targetY = Math.max(0, Math.min(limit, state.targetY));
	};

	const animate = () => {
		const diff = state.targetY - state.currentY;
		state.currentY += diff * ease;

		if (Math.abs(diff) < 0.5) {
			state.currentY = state.targetY;
		}

		window.scrollTo(0, state.currentY);

		if (Math.abs(state.targetY - state.currentY) < 0.5) {
			state.rafId = 0;
			return;
		}

		state.rafId = window.requestAnimationFrame(animate);
	};

	const requestAnimate = () => {
		if (!state.rafId) {
			state.rafId = window.requestAnimationFrame(animate);
		}
	};

	const shouldUseNativeScroll = (event) => {
		if (event.defaultPrevented || event.ctrlKey) {
			return true;
		}

		let el = event.target instanceof Element ? event.target : null;

		while (el && el !== document.body) {
			const style = window.getComputedStyle(el);
			const canScrollY = /(auto|scroll|overlay)/.test(style.overflowY) && el.scrollHeight > el.clientHeight;

			if (canScrollY) {
				const atTop = el.scrollTop <= 0;
				const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;

				if ((event.deltaY < 0 && !atTop) || (event.deltaY > 0 && !atBottom)) {
					return true;
				}
			}

			el = el.parentElement;
		}

		return false;
	};

	window.addEventListener(
		"wheel",
		(event) => {
			if (shouldUseNativeScroll(event)) {
				return;
			}

			event.preventDefault();
			state.targetY += event.deltaY * wheelMultiplier;
			clampTarget();
			requestAnimate();
		},
		{ passive: false }
	);

	window.addEventListener(
		"keydown",
		(event) => {
			if (event.defaultPrevented) {
				return;
			}

			const active = document.activeElement;
			if (
				active &&
				(active.tagName === "INPUT" ||
					active.tagName === "TEXTAREA" ||
					active.tagName === "SELECT" ||
					active.isContentEditable)
			) {
				return;
			}

			let delta = 0;
			switch (event.key) {
				case "ArrowDown":
					delta = 110;
					break;
				case "ArrowUp":
					delta = -110;
					break;
				case "PageDown":
					delta = window.innerHeight * 0.9;
					break;
				case "PageUp":
					delta = -window.innerHeight * 0.9;
					break;
				case "Home":
					event.preventDefault();
					state.targetY = 0;
					clampTarget();
					requestAnimate();
					return;
				case "End":
					event.preventDefault();
					state.targetY = maxScrollY();
					requestAnimate();
					return;
				case " ":
					delta = event.shiftKey ? -window.innerHeight * 0.9 : window.innerHeight * 0.9;
					break;
				default:
					return;
			}

			event.preventDefault();
			state.targetY += delta;
			clampTarget();
			requestAnimate();
		},
		{ passive: false }
	);

	window.addEventListener(
		"scroll",
		() => {
			if (!state.rafId) {
				state.currentY = window.scrollY;
				state.targetY = window.scrollY;
			}
		},
		{ passive: true }
	);

	window.addEventListener("resize", () => {
		clampTarget();
	});
})();

(function () {
	"use strict";

	const body = document.body;

	if (!body) {
		return;
	}

	const markPageEntered = () => {
		if (body.classList.contains("page-entered")) {
			return;
		}

		body.classList.add("page-entered");
		body.dispatchEvent(new CustomEvent("page-entered"));
	};

	const pageIntro = document.querySelector(".page-intro");

	if (!pageIntro) {
		markPageEntered();
		return;
	}

	const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	const fallbackDelay = prefersReducedMotion ? 32 : 1700;
	const fallbackId = window.setTimeout(markPageEntered, fallbackDelay);

	pageIntro.addEventListener(
		"animationend",
		(event) => {
			if (event.animationName !== "intro-overlay-out") {
				return;
			}

			window.clearTimeout(fallbackId);
			markPageEntered();
		},
		{ once: true }
	);
})();

(function () {
	"use strict";

	const body = document.body;
	const revealItems = document.querySelectorAll(".editorial-reveal");

	if (!body || !revealItems.length) {
		return;
	}

	const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	revealItems.forEach((item) => {
		item.classList.add("editorial-reveal--ready");
	});

	const startRevealAnimations = () => {
		window.requestAnimationFrame(() => {
			if (prefersReducedMotion || !("IntersectionObserver" in window)) {
				revealItems.forEach((item) => {
					item.classList.add("editorial-reveal--visible");
				});
				return;
			}

			const observer = new IntersectionObserver(
				(entries, currentObserver) => {
					entries.forEach((entry) => {
						if (!entry.isIntersecting) {
							return;
						}

						entry.target.classList.add("editorial-reveal--visible");
						currentObserver.unobserve(entry.target);
					});
				},
				{
					threshold: 0.18,
					rootMargin: "0px 0px -10% 0px",
				}
			);

			revealItems.forEach((item) => {
				observer.observe(item);
			});
		});
	};

	if (body.classList.contains("page-entered")) {
		startRevealAnimations();
		return;
	}

	body.addEventListener("page-entered", startRevealAnimations, { once: true });
})();
