/*! 
 * PAX - JavaScript Application Consolidado
 * Todos os códigos customizados e funcionalidades otimizadas
 * Versão: 2.0.0
 * Dependências localizadas
 */

// =============================================================================
// CARROSSEL DA GALERIA - Versão Ultra Simples (migrado de index.html)
// =============================================================================
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

// =============================================================================
// APLICAÇÃO PRINCIPAL - Funcionalidades customizadas
// =============================================================================
var App = function() {
    return {
        init: function() {
            console.log('PAX App Inicializado');
            
            // Inicializar carrosséis se o Owl Carousel estiver disponível
            if (typeof $ !== 'undefined' && typeof $.fn.owlCarousel !== 'undefined') {
                // Carrossel do topo
                $(".slide-topo.owl-carousel").owlCarousel({
                    loop: true,
                    margin: 0,
                    nav: true,
                    items: 1,
                    autoplay: true,
                    autoplayTimeout: 3000,
                    autoplayHoverPause: true,
                    navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>']
                });

                // Carrossel da galeria
                $(".slide-galeria.owl-carousel").owlCarousel({
                    loop: true,
                    margin: 15,
                    mouseDrag: true,
                    touchDrag: true,
                    nav: true,
                    autoplay: true,
                    autoplayTimeout: 3000,
                    autoplayHoverPause: true,
                    navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
                    responsive: {
                        0: {
                            items: 1.5
                        },
                        600: {
                            items: 2.5
                        },
                        1000: {
                            items: 3.5
                        }
                    }
                });
            }

            // Sistema de abas
            this.initTabs();
            
            // Menu mobile
            this.initMobileMenu();
            
            // Animações de scroll
            this.initScrollAnimations();
            
            // Smooth scrolling para links internos
            this.initSmoothScroll();
            
            // Formulário de contato
            this.initContactForm();
            
            // FancyBox para galeria (se disponível)
            this.initFancyBox();
        },
        
        initTabs: function() {
            if (typeof $ === 'undefined') return;
            
            // Ativar primeira aba por padrão
            $("ul.tabs li:first-child").addClass("current");
            $(".content-tabs-full .tab-content").first().addClass("current");
            
            // Manipulador de clique nas abas
            $("ul.tabs li").click(function() {
                var tab_id = $(this).attr("data-tab");
                
                $("ul.tabs li").removeClass("current");
                $(".tab-content").removeClass("current");
                
                $(this).addClass("current");
                $("#" + tab_id).addClass("current");
            });
        },
        
        initMobileMenu: function() {
            if (typeof $ === 'undefined') return;
            
            $(".menu-mobile").on("click", function() {
                $(".menu-line").stop().slideToggle();
                $(this).toggleClass('active');
                
                // Animar ícone do hambúrguer
                $(this).find('span').toggleClass('active');
            });
            
            // Fechar menu ao clicar em um link
            $(".menu-line a").on("click", function() {
                $(".menu-line").slideUp();
                $(".menu-mobile").removeClass('active');
                $(".menu-mobile span").removeClass('active');
            });
            
            // Fechar menu ao redimensionar janela
            $(window).resize(function() {
                if ($(window).width() > 768) {
                    $(".menu-line").hide().removeAttr('style');
                    $(".menu-mobile").removeClass('active');
                    $(".menu-mobile span").removeClass('active');
                }
            });
        },
        
        initScrollAnimations: function() {
            var self = this;
            
            if (typeof $ !== 'undefined') {
                // Verificar elementos visíveis no carregamento
                self.checkVisible();
                
                // Verificar elementos visíveis no scroll
                $(window).on('scroll', function() {
                    self.checkVisible();
                });
            }
        },
        
        checkVisible: function() {
            if (typeof $ === 'undefined') return;
            
            $('.fade-in, .slide-in-left, .slide-in-right').each(function() {
                var elementTop = $(this).offset().top;
                var elementBottom = elementTop + $(this).outerHeight();
                var viewportTop = $(window).scrollTop();
                var viewportBottom = viewportTop + $(window).height();
                
                if (elementBottom > viewportTop && elementTop < viewportBottom) {
                    $(this).addClass('visible');
                }
            });
        },
        
        initSmoothScroll: function() {
            if (typeof $ === 'undefined') return;
            
            $('a[href*="#"]:not([href="#"])').click(function() {
                if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    
                    if (target.length) {
                        $('html, body').animate({
                            scrollTop: target.offset().top - 80
                        }, 1000);
                        return false;
                    }
                }
            });
        },
        
        initContactForm: function() {
            if (typeof $ === 'undefined') return;
            
            $('#contact-form').on('submit', function(e) {
                e.preventDefault();
                
                // Validação simples
                var isValid = true;
                var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                
                $(this).find('input[required], textarea[required]').each(function() {
                    var $field = $(this);
                    var value = $field.val().trim();
                    
                    if (value === '') {
                        isValid = false;
                        $field.addClass('error');
                        $field.next('.error-message').remove();
                        $field.after('<span class="error-message" style="color: red; font-size: 0.9rem;">Este campo é obrigatório</span>');
                    } else {
                        $field.removeClass('error');
                        $field.next('.error-message').remove();
                    }
                    
                    // Validação específica para email
                    if ($field.attr('type') === 'email' && value !== '' && !emailRegex.test(value)) {
                        isValid = false;
                        $field.addClass('error');
                        $field.next('.error-message').remove();
                        $field.after('<span class="error-message" style="color: red; font-size: 0.9rem;">Email inválido</span>');
                    }
                });
                
                if (isValid) {
                    // Simular envio (substituir por lógica real)
                    var $submitBtn = $(this).find('button[type="submit"]');
                    var originalText = $submitBtn.text();
                    
                    $submitBtn.text('Enviando...').prop('disabled', true);
                    
                    setTimeout(function() {
                        alert('Mensagem enviada com sucesso!');
                        $('#contact-form')[0].reset();
                        $submitBtn.text(originalText).prop('disabled', false);
                    }, 2000);
                }
            });
        },
        
        initFancyBox: function() {
            if (typeof $ === 'undefined' || typeof $.fancybox === 'undefined') return;
            
            // Inicializar FancyBox se disponível
            $('[data-fancybox="gallery"]').fancybox({
                buttons: [
                    "slideShow",
                    "thumbs",
                    "zoom",
                    "fullScreen",
                    "share",
                    "close"
                ],
                loop: true,
                protect: true
            });
        }
    };
}();

// =============================================================================
// UTILITÁRIOS
// =============================================================================
var Utils = {
    // Debounce function
    debounce: function(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    },
    
    // Throttle function
    throttle: function(func, limit) {
        var inThrottle;
        return function() {
            var args = arguments;
            var context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(function() {
                    inThrottle = false;
                }, limit);
            }
        };
    },
    
    // Verificar se elemento está visível
    isInViewport: function(element) {
        var rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    
    // Formatar telefone
    formatPhone: function(phone) {
        return phone.replace(/\D/g, '').replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    },
    
    // Validar email
    isValidEmail: function(email) {
        var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
};

// =============================================================================
// PLUGINS E EXTENSÕES JQUERY
// =============================================================================
if (typeof $ !== 'undefined') {
    $.fn.extend({
        // Plugin para animação de contadores
        animateNumbers: function(options) {
            var settings = $.extend({
                from: 0,
                to: 100,
                duration: 1000,
                ease: 'swing'
            }, options);
            
            return this.each(function() {
                var $this = $(this);
                var counter = { value: settings.from };
                
                $(counter).animate({ value: settings.to }, {
                    duration: settings.duration,
                    easing: settings.ease,
                    step: function() {
                        $this.text(Math.floor(this.value));
                    },
                    complete: function() {
                        $this.text(settings.to);
                    }
                });
            });
        }
    });
}

// =============================================================================
// INICIALIZAÇÃO E EVENT LISTENERS
// =============================================================================
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar carrossel da galeria
    new GalleryCarousel();
    
    // Inicializar aplicação principal se jQuery estiver disponível
    if (typeof $ !== 'undefined') {
        App.init();
        
        // Header fixo com efeito
        var header = $('header');
        var headerHeight = header.outerHeight();
        
        $(window).scroll(Utils.throttle(function() {
            var scrollTop = $(window).scrollTop();
            
            if (scrollTop > headerHeight) {
                header.addClass('header-scrolled');
            } else {
                header.removeClass('header-scrolled');
            }
        }, 100));
        
        // Lazy loading para imagens
        $('img[data-src]').each(function() {
            var $img = $(this);
            var src = $img.attr('data-src');
            
            if (Utils.isInViewport(this)) {
                $img.attr('src', src).removeAttr('data-src');
            }
        });
        
        // Scroll spy para navegação
        $(window).scroll(Utils.throttle(function() {
            var scrollTop = $(window).scrollTop();
            
            $('nav a[href*="#"]').each(function() {
                var $link = $(this);
                var target = $($link.attr('href'));
                
                if (target.length) {
                    var targetTop = target.offset().top - headerHeight - 50;
                    var targetBottom = targetTop + target.outerHeight();
                    
                    if (scrollTop >= targetTop && scrollTop < targetBottom) {
                        $('nav a').removeClass('active');
                        $link.addClass('active');
                    }
                }
            });
        }, 100));
        
        // Máscara para telefone
        $('input[type="tel"]').on('input', function() {
            var value = $(this).val().replace(/\D/g, '');
            if (value.length <= 11) {
                $(this).val(Utils.formatPhone(value));
            }
        });
        
        // Prevenir envio de formulários vazios
        $('form').on('submit', function(e) {
            var hasRequired = $(this).find('[required]').length > 0;
            var allFilled = true;
            
            if (hasRequired) {
                $(this).find('[required]').each(function() {
                    if ($(this).val().trim() === '') {
                        allFilled = false;
                        return false;
                    }
                });
                
                if (!allFilled) {
                    e.preventDefault();
                    alert('Por favor, preencha todos os campos obrigatórios.');
                }
            }
        });
        
        // Carregar scripts externos se necessário
        $(window).on('load', function() {
            // Remover classes de carregamento
            $('body').removeClass('loading');
            
            // Inicializar contadores animados
            $('.counter').each(function() {
                var $counter = $(this);
                var countTo = $counter.data('count');
                
                if (Utils.isInViewport(this)) {
                    $counter.animateNumbers({
                        to: countTo,
                        duration: 2000
                    });
                }
            });
            
            // Otimizar imagens
            $('img').each(function() {
                var $img = $(this);
                if (!$img.attr('alt')) {
                    $img.attr('alt', $img.attr('title') || 'Imagem PAX');
                }
            });
        });
    }
});

// =============================================================================
// EXPORT PARA USO GLOBAL
// =============================================================================
window.App = App;
window.Utils = Utils;
window.GalleryCarousel = GalleryCarousel;
