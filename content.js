
async function setupSite() {
	const queryParams = new URLSearchParams(window.location.search);

	const page = queryParams.get("page");
	
	console.log("Page:", page);

	let pageSpecifics = {};
	if (page === "home" || page === null) {
		pageSpecifics = {
			heroBannerBackground: "assets/banner/home-hero-banner.png",
			heroBannerContentHtml: "GEMEINSAM FÜR<br>NEUE PERSPEKTIVEN",
			contentPage: "pages/home.html"
		};
	
	} else if (page === "wohnungslosigkeit") {
		pageSpecifics = {
			heroBannerBackground: "assets/banner/wohnungslosigkeit-hero-banner.jpg",
			heroBannerContentHtml: "JEDER BRAUCHT<br>EIN ZUHAUSE",
			contentPage: "pages/wohnungslosigkeit.html"
		};
	
	} else if (page === "verein") {
		pageSpecifics = {
			heroBannerBackground: "assets/banner/verein-hero-banner.png",
			heroBannerContentHtml: "UM UNBÜROKRATISCH UND<br>UNKOMPLIZIERT HELFEN ZU KÖNNEN",
			contentPage: "pages/verein.html"
		};
	
	} else if (page === "spenden") {
		pageSpecifics = {
			heroBannerBackground: "assets/banner/spenden-hero-banner.png",
			heroBannerContentHtml: "HILFE,<br>DIE ANKOMMT",
			contentPage: "pages/spenden.html"
		};

	} else if (page === "faq") {
		pageSpecifics = {
			heroBannerBackground: "assets/banner/faq-hero-banner.jpg",
			heroBannerContentHtml: "JEDE FRAGE IST EIN<br>SCHRITT RICHTING HILFE",
			contentPage: "pages/faq.html"
		};
	
	} else if (page === "kontakt") {
		pageSpecifics = {
			heroBannerBackground: "assets/banner/kontakt-hero-banner.png",
			heroBannerContentHtml: "HILFE,<br>DIE ANKOMMT",
			contentPage: "pages/kontakt.html"
		};
	}

	const heroBanner = document.querySelector(".hero-banner");
	heroBanner.style.backgroundImage = `url(${pageSpecifics.heroBannerBackground})`;
	
	const heroBannerContent = document.querySelector(".hero-banner-content-text");
	heroBannerContent.innerHTML = pageSpecifics.heroBannerContentHtml;

	const contentContainer = document.querySelector(".content");
	const content = await fetch(pageSpecifics.contentPage);
	if (!content.ok) {
		contentContainer.innerHTML = `
			<h1>404 - Seite nicht gefunden</h1>
			<p>Die angeforderte Seite konnte nicht gefunden werden.</p>
		`;
		return;
	}

	contentContainer.innerHTML = await content.text();
}

function setupMobileNavigation() {
	const navigation = document.querySelector(".main-nav");
	const navButton = document.querySelector(".main-nav-button");
	const navList = document.querySelector(".main-nav-list");

	if (!navigation || !navButton || !navList) {
		console.error("Navigation elements not found in the DOM.", { navigation, navButton, navList });
		return;
	}

	navButton.addEventListener("click", () => {
		const isOpen = navigation.classList.toggle("is-open");
		navButton.setAttribute("aria-expanded", String(isOpen));
		navButton.setAttribute("aria-label", isOpen ? "Menü schließen" : "Menü öffnen");
	});
}

window.addEventListener("DOMContentLoaded", () => {
	setupMobileNavigation();
	setupSite();
});
