// Carrossel da Galeria - Versão Ultra Simples (migrado de index.html)
class GalleryCarousel {
	constructor() {
		this.currentIndex = 0;
		this.totalImages = 9;
		this.isMoving = false;
		this.autoPlayActive = true;
		this.autoTimer = null;
		this.pauseTimer = null;

		this.images = [
			'imagens/Obras/2_galeria1.jpg',
			'imagens/Obras/2_galeria2.jpg',
			'imagens/Obras/2_galeria3.jpg',
			'imagens/Obras/2_galeria4.jpg',
			'imagens/Obras/2_galeria5.jpg',
			'imagens/Obras/2_galeria6.jpg',
			'imagens/Obras/2_galeria7.jpg',
			'imagens/Obras/2_galeria8.jpg',
			'imagens/Obras/2_galeria9.jpg'
		];

		this.track = document.getElementById('carousel-track');
		this.prevBtn = document.getElementById('prev-btn');
		this.nextBtn = document.getElementById('next-btn');

		this.init();
	}

	init() {
		this.render();
		this.setupEvents();
		this.startAutoPlay();
	}

	render() {
		if (!this.track) return;
		this.track.innerHTML = '';
		for (let i = -3; i <= 3; i++) {
			const index = (this.currentIndex + i + this.totalImages) % this.totalImages;
			const div = document.createElement('div');
			div.style.cssText = 'min-width: 380px; min-height: 380px;';

			const img = document.createElement('img');
			img.src = this.images[index];
			img.alt = `galeria ${index + 1}`;
			img.style.cssText = `
				height: 380px;
				width: 380px;
				object-fit: cover;
				box-shadow: 0 10px 25px rgba(0,0,0,0.1);
				border-radius: 0;
				aspect-ratio: 1 / 1;
				cursor: pointer;
			`;
			img.addEventListener('click', () => window.open(this.images[index], '_blank'));

			div.appendChild(img);
			this.track.appendChild(div);
		}
		this.track.style.transform = 'translateX(-1188px)';
		this.track.style.transition = 'none';
	}

	setupEvents() {
		if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prev());
		if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.next());
	}

	next() {
		if (this.isMoving || !this.track) return;
		this.isMoving = true;
		this.stopAutoPlay();
		this.track.style.transition = 'transform 0.5s ease';
		this.track.style.transform = 'translateX(-1584px)';
		setTimeout(() => {
			this.currentIndex = (this.currentIndex + 1) % this.totalImages;
			this.render();
			this.isMoving = false;
			this.scheduleAutoPlay();
		}, 500);
	}

	prev() {
		if (this.isMoving || !this.track) return;
		this.isMoving = true;
		this.stopAutoPlay();
		this.track.style.transition = 'transform 0.5s ease';
		this.track.style.transform = 'translateX(-792px)';
		setTimeout(() => {
			this.currentIndex = (this.currentIndex - 1 + this.totalImages) % this.totalImages;
			this.render();
			this.isMoving = false;
			this.scheduleAutoPlay();
		}, 500);
	}

	startAutoPlay() {
		if (this.autoTimer) return;
		this.autoTimer = setInterval(() => {
			if (!this.isMoving && this.autoPlayActive) {
				this.next();
			}
		}, 7000);
	}

	stopAutoPlay() {
		if (this.autoTimer) {
			clearInterval(this.autoTimer);
			this.autoTimer = null;
		}
		if (this.pauseTimer) {
			clearTimeout(this.pauseTimer);
			this.pauseTimer = null;
		}
		this.autoPlayActive = false;
	}

	scheduleAutoPlay() {
		this.pauseTimer = setTimeout(() => {
			this.autoPlayActive = true;
			this.startAutoPlay();
		}, 5000);
	}
}

document.addEventListener('DOMContentLoaded', () => new GalleryCarousel());
