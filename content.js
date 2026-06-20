
async function setupSite() {
	const queryParams = new URLSearchParams(window.location.search);

	const page = queryParams.get("page");
	
	console.log("Page:", page);

	let pageSpecifics = {};
	if (page === "home" || page === null) {
		pageSpecifics = {
			heroBannerBackground: "assets/Bildwelt/PageBilder/Homepage_Hausschlüssel.png",
			heroBannerContentHtml: "GEMEINSAM FÜR<br>NEUE PERSPEKTIVEN",
			contentPage: "pages/home.html"
		};
	} else if (page === "wohnungslosigkeit") {
		pageSpecifics = {
			heroBannerBackground: "assets/Bildwelt/PageBilder/dimi-katsavaris-N3m2hKNc1j0-unsplash.jpg",
			heroBannerContentHtml: "JEDER BRAUCHT<br>EIN ZUHAUSE",
			contentPage: "pages/wohnungslosigkeit.html"
		};
	} else if (page === "verein") {
		pageSpecifics = {
			heroBannerBackground: "assets/Bildwelt/PageBilder/Gemini_Generated_Image_cdg9pmcdg9pmcdg9.png",
			heroBannerContentHtml: "UM UNBÜROKRATISCH UND<br>UNKOMPLIZIERT HELFEN ZU KÖNNEN",
			contentPage: "pages/verein.html"
		};
	} else if (page === "spenden") {
		// @TODO

	} else if (page === "faq") {
		pageSpecifics = {
			heroBannerBackground: "assets/Bildwelt/Sonstiges/Foto%20Moin.jpg",
			heroBannerContentHtml: "JEDE FRAGE IST EIN<br>SCHRITT RICHTING HILFE",
			contentPage: "pages/faq.html"
		};
	
	} else if (page === "kontakt") {
		pageSpecifics = {
			heroBannerBackground: "assets/Bildwelt/PageBilder/Gemini_Generated_Image_n0ohyan0ohyan0oh.png",
			heroBannerContentHtml: "HILFE,<br>DIE ANKOMMT",
			contentPage: "pages/kontakt.html"
		};
	}

	const heroBanner = document.querySelector(".hero-banner");
	heroBanner.style.backgroundImage = `url(${pageSpecifics.heroBannerBackground})`;
	console.log("Hero Banner Background:", pageSpecifics.heroBannerBackground);
	
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

window.addEventListener("DOMContentLoaded", setupSite);
