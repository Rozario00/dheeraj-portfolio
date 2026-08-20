const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const backTop = document.querySelector('.back-top');

window.addEventListener('load', () => {
	window.setTimeout(() => document.querySelector('.preloader')?.classList.add('done'), 500);
});

window.addEventListener('scroll', () => {
	header?.classList.toggle('scrolled', window.scrollY > 24);
	backTop?.classList.toggle('visible', window.scrollY > 500);
});

menuToggle?.addEventListener('click', () => {
	const isOpen = menuToggle.classList.toggle('open');
	navLinks?.classList.toggle('open', isOpen);
	menuToggle.setAttribute('aria-expanded', String(isOpen));
	menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});

navLinks?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
	menuToggle?.classList.remove('open');
	navLinks.classList.remove('open');
	menuToggle?.setAttribute('aria-expanded', 'false');
}));

const revealObserver = new IntersectionObserver((entries, observer) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add('is-visible');
			observer.unobserve(entry.target);
		}
	});
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
document.querySelector('#year').textContent = new Date().getFullYear();

const projectData = {
	technova: { title: 'TECHNOVA — Social Media Campaign', meta: '01 / Social Media Design', type: 'Practice Project', image: 'assets/images/projects/technova-social.svg', alt: 'TECHNOVA social media campaign artwork', objective: 'Create a premium Instagram campaign for a fictional technology brand announcing a new AI-powered product.', direction: 'A futuristic visual system combining strong typography with a luminous AI device, technical details and a clear advertising hierarchy.', focus: 'Typography · Composition · Social Media Design · AI-assisted ideation' },
	frame: { title: 'CREATE YOUR OWN FRAME', meta: '02 / Poster Design', type: 'Concept Project', image: 'assets/images/projects/create-your-frame.svg', alt: 'Create Your Own Frame poster artwork', objective: 'Create an experimental promotional poster exploring creativity and visual expression.', direction: 'An editorial composition using framing, perspective, geometric depth and controlled cyan accents to make the headline feel physical.', focus: 'Typography · Poster Design · Visual Composition · Color' },
	nexora: { title: 'NEXORA — Brand Identity', meta: '03 / Brand Identity', type: 'Practice Project', image: 'assets/images/projects/nexora-branding.svg', alt: 'NEXORA brand identity presentation board', objective: 'Develop a visual identity for a fictional future-focused technology company.', direction: 'A compact identity board showing the NEXORA symbol, modern sans typography, color palette and a social application.', focus: 'Brand Identity · Color Theory · Visual System · Digital Branding' },
	'human-ai': { title: 'HUMAN × AI', meta: '04 / AI Creative + Editorial', type: 'Experimental Concept', image: 'assets/images/projects/human-ai.svg', alt: 'Human x AI editorial artwork', objective: 'Explore the relationship between human creativity and artificial intelligence.', direction: 'A cinematic editorial artwork where a human gesture meets a luminous machine network, balancing warmth, technology and visual tension.', focus: 'Art Direction · Editorial Design · AI-assisted Creativity · Concept Development' },
	'level-up': { title: 'LEVEL UP — Digital Campaign', meta: '05 / Digital Campaign', type: 'Concept Project', image: 'assets/images/projects/level-up.svg', alt: 'Level Up digital campaign artwork', objective: 'Create a promotional digital campaign for a fictional creative and technology platform.', direction: 'An energetic campaign system built from dynamic type, diagonal movement, a platform interface and a direct call to action.', focus: 'Digital Campaign · Typography · Color Theory · CTA Design' }
};

const filterButtons = document.querySelectorAll('.filter-button');
const projectCards = document.querySelectorAll('.project-grid-new .project-card');
filterButtons.forEach((button) => button.addEventListener('click', () => {
	const filter = button.dataset.filter;
	filterButtons.forEach((item) => item.classList.toggle('active', item === button));
	projectCards.forEach((card) => card.classList.toggle('is-hidden', filter !== 'all' && card.dataset.category !== filter));
}));

const modal = document.querySelector('.project-modal');
const modalArtwork = document.querySelector('#modal-artwork');
const modalMeta = document.querySelector('#modal-meta');
const modalTitle = document.querySelector('#modal-title');
const modalType = document.querySelector('#modal-type');
const modalObjective = document.querySelector('#modal-objective');
const modalDirection = document.querySelector('#modal-direction');
const modalFocus = document.querySelector('#modal-focus');
let lastProjectTrigger;

const closeProjectModal = () => {
	if (!modal) return;
	modal.hidden = true;
	document.body.style.overflow = '';
	lastProjectTrigger?.focus();
};

const openProjectModal = (projectKey, trigger) => {
	const project = projectData[projectKey];
	if (!modal || !project) return;
	lastProjectTrigger = trigger;
	modalArtwork.src = project.image;
	modalArtwork.alt = project.alt;
	modalMeta.textContent = project.meta;
	modalTitle.textContent = project.title;
	modalType.textContent = project.type;
	modalObjective.textContent = project.objective;
	modalDirection.textContent = project.direction;
	modalFocus.textContent = project.focus;
	modal.hidden = false;
	document.body.style.overflow = 'hidden';
	modal.querySelector('.modal-close').focus();
};

document.querySelectorAll('[data-project-open]').forEach((button) => button.addEventListener('click', () => openProjectModal(button.dataset.projectOpen, button)));
document.querySelectorAll('.project-art-button').forEach((button) => button.addEventListener('click', () => openProjectModal(button.closest('[data-project]')?.dataset.project, button)));
modal?.querySelectorAll('[data-modal-close]').forEach((button) => button.addEventListener('click', closeProjectModal));
document.addEventListener('keydown', (event) => {
	if (event.key === 'Escape' && modal && !modal.hidden) closeProjectModal();
});
