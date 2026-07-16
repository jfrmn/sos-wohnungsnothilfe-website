
const template = document.createElement('template');
template.innerHTML = `
	<style>		
		.highlight-link {
			display: inline-flex;
			gap: 16px;
			margin-bottom: 24px;
		}

		.highlight-link a {
			color: #ffffff;
			background-color: var(--primary-color);
			font-size: 25px;
			text-decoration: none;
			align-self: flex-end;
			width: fit-content;
		}

		.highlight-link a:hover {
			background-color: var(--primary-color-light);
		}
	</style>

	<div class="highlight-link">
		<img src="assets/icons/link.svg" alt="Link Icon" />
		<a href="#">
			<slot></slot>
		</a>
	</div>
`;

class HighlightLink extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.appendChild(template.content.cloneNode(true));
		this.linkElement = this.shadowRoot.querySelector('a');
	}

	static get observedAttributes() {
		return ['href', 'target'];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === 'href') {
			this.linkElement.setAttribute('href', newValue);
		} else if (name === 'target') {
			this.linkElement.setAttribute('target', newValue);
		}
	}
}

customElements.define('highlight-link', HighlightLink);