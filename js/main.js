$(window).load(function(){
     $('.preloader').fadeOut('slow');
});


/* =Main INIT Function
-------------------------------------------------------------- */
function initializeSite() {

	"use strict";

	//OUTLINE DIMENSION AND CENTER
	(function() {
	    function centerInit(){

			var sphereContent = $('.sphere'),
				sphereHeight = sphereContent.height(),
				parentHeight = $(window).height(),
				topMargin = (parentHeight - sphereHeight) / 2;

			sphereContent.css({
				"margin-top" : topMargin+"px"
			});

			var heroContent = $('.hero'),
				heroHeight = heroContent.height(),
				heroTopMargin = (parentHeight - heroHeight) / 2;

			heroContent.css({
				"margin-top" : heroTopMargin+"px"
			});

	    }

	    $(document).ready(centerInit);
		$(window).resize(centerInit);
	})();

	// Init effect 
	$('#scene').parallax();

};
/* END ------------------------------------------------------- */

/* =Document Ready Trigger
-------------------------------------------------------------- */
$(window).load(function(){

	initializeSite();
	(function() {
		setTimeout(function(){window.scrollTo(0,0);},0);
	})();

});
/* END ------------------------------------------------------- */


$('#countdown').countdown({
	date: "Mar 25 2021",
	render: function(data) {
	  var el = $(this.el);
	  el.empty()
	    //.append("<div>" + this.leadingZeros(data.years, 4) + "<span>years</span></div>")
	    .append("<div>" + this.leadingZeros(data.days, 2) + " <span>days</span></div>")
	    .append("<div>" + this.leadingZeros(data.hours, 2) + " <span>hrs</span></div>")
	    .append("<div>" + this.leadingZeros(data.min, 2) + " <span>min</span></div>")
	    .append("<div>" + this.leadingZeros(data.sec, 2) + " <span>sec</span></div>");
	}
});



// Birthday Animation
const targetDate = new Date(2025, 11, 20, 0, 0, 0).getTime();

let animationPlayed = false;

setInterval(() => {
    const now = new Date().getTime();
    const diff = targetDate - now;

    const countdownEl = document.getElementById("countdown");

    if (diff <= 0) {
        // LANCER ANIMATION 1 SEULE FOIS
        if (!animationPlayed) {
            launchExplosion();
            animationPlayed = true;
        }
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    countdownEl.innerHTML = `
    <div style="display:flex; flex-direction:column; text-align:center; line-height:1;">
        <span style="font-size:110px; font-weight:800;">${days}</span>
        <span style="font-size:28px; font-weight:600; margin-top:8px; letter-spacing:2px;">JOURS</span>
    </div>

    <div style="display:flex; flex-direction:column; text-align:center; line-height:1;">
        <span style="font-size:110px; font-weight:800;">${hours}</span>
        <span style="font-size:28px; font-weight:600; margin-top:8px; letter-spacing:2px;">HEURES</span>
    </div>

    <div style="display:flex; flex-direction:column; text-align:center; line-height:1;">
        <span style="font-size:110px; font-weight:800;">${minutes}</span>
        <span style="font-size:28px; font-weight:600; margin-top:8px; letter-spacing:2px;">MIN</span>
    </div>

    <div style="display:flex; flex-direction:column; text-align:center; line-height:1;">
        <span style="font-size:110px; font-weight:800;">${seconds}</span>
        <span style="font-size:28px; font-weight:600; margin-top:8px; letter-spacing:2px;">SEC</span>
    </div>
    `;
}, 1000);

// ============================================
// ANIMATION D'EXPLOSION SPECTACULAIRE
// ============================================

function launchExplosion() {
    addExplosionStyles();
    
    const countdownEl = document.getElementById("countdown");
    
    // Phase 1: Flash blanc intense
    createIntenseFlash();
    
    // Phase 2: Explosion du compte à rebours (après 200ms)
    setTimeout(() => {
        explodeCountdown(countdownEl);
    }, 200);
    
    // Phase 3: Onde de choc (après 300ms)
    setTimeout(() => {
        createShockwave();
    }, 300);
    
    // Phase 4: Particules explosives (après 400ms)
    setTimeout(() => {
        createExplosionParticles();
    }, 400);
    
    // Phase 5: Afficher le message (après 1.2s)
    setTimeout(() => {
        showBirthdayMessage(countdownEl);
    }, 1200);
    
    // Phase 6: Confettis continus (après 1.5s)
    setTimeout(() => {
        continuousConfetti();
    }, 1500);
    
    // Phase 7: Feux d'artifice multiples style Nouvel An (après 2s)
    setTimeout(() => {
        newYearFireworks();
    }, 2000);
}

function addExplosionStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes intense-flash {
            0% { opacity: 0; }
            50% { opacity: 1; }
            100% { opacity: 0; }
        }
        
        @keyframes explode-out {
            0% {
                transform: translate(0, 0) scale(1);
                opacity: 1;
            }
            100% {
                transform: translate(var(--ex), var(--ey)) scale(0);
                opacity: 0;
            }
        }
        
        @keyframes shockwave {
            0% {
                transform: scale(0);
                opacity: 0.8;
            }
            100% {
                transform: scale(3);
                opacity: 0;
            }
        }
        
        @keyframes particle-burst {
            0% {
                transform: translate(0, 0) scale(1);
                opacity: 1;
            }
            100% {
                transform: translate(var(--px), var(--py)) scale(0);
                opacity: 0;
            }
        }
        
        @keyframes message-appear {
            0% {
                transform: scale(0) rotate(-10deg);
                opacity: 0;
            }
            50% {
                transform: scale(1.2) rotate(5deg);
            }
            100% {
                transform: scale(1) rotate(0deg);
                opacity: 1;
            }
        }
        
        @keyframes confetti-rain {
            0% {
                transform: translateY(-100px) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(720deg);
                opacity: 0;
            }
        }
        
        .explosion-flash {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, rgba(255,255,255,1), rgba(255,200,0,0.8), transparent);
            z-index: 99999;
            animation: intense-flash 0.4s ease-out;
            pointer-events: none;
        }
        
        .shockwave-ring {
            position: fixed;
            top: 50%;
            left: 50%;
            width: 200px;
            height: 200px;
            margin: -100px 0 0 -100px;
            border: 8px solid rgba(255, 255, 255, 0.8);
            border-radius: 50%;
            z-index: 99998;
            animation: shockwave 0.8s ease-out;
            pointer-events: none;
            box-shadow: 0 0 40px rgba(255, 255, 255, 0.8);
        }
        
        .explosion-particle {
            position: fixed;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            z-index: 99997;
            animation: particle-burst 1.5s ease-out forwards;
            pointer-events: none;
            box-shadow: 0 0 20px currentColor;
        }
        
        .birthday-message {
            animation: message-appear 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
            text-shadow: 0 0 30px rgba(255, 255, 255, 0.8),
                         0 0 60px rgba(255, 200, 0, 0.6);
        }
        
        .confetti-piece {
            position: fixed;
            width: 12px;
            height: 12px;
            z-index: 99996;
            animation: confetti-rain linear forwards;
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);
}

function createIntenseFlash() {
    const flash = document.createElement('div');
    flash.className = 'explosion-flash';
    document.body.appendChild(flash);
    
    setTimeout(() => flash.remove(), 400);
}

function explodeCountdown(countdownEl) {
    // Récupérer tous les chiffres et les faire exploser
    const numbers = countdownEl.querySelectorAll('span');
    
    numbers.forEach((num, index) => {
        const clone = num.cloneNode(true);
        const rect = num.getBoundingClientRect();
        
        clone.style.position = 'fixed';
        clone.style.top = rect.top + 'px';
        clone.style.left = rect.left + 'px';
        clone.style.margin = '0';
        clone.style.zIndex = '99999';
        
        // Direction aléatoire pour l'explosion
        const angle = Math.random() * Math.PI * 2;
        const distance = 300 + Math.random() * 500;
        const ex = Math.cos(angle) * distance;
        const ey = Math.sin(angle) * distance;
        
        clone.style.setProperty('--ex', ex + 'px');
        clone.style.setProperty('--ey', ey + 'px');
        clone.style.animation = 'explode-out 1s ease-out forwards';
        
        document.body.appendChild(clone);
        
        setTimeout(() => clone.remove(), 1000);
    });
    
    // Vider le compte à rebours
    countdownEl.innerHTML = '';
}

function createShockwave() {
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const shockwave = document.createElement('div');
            shockwave.className = 'shockwave-ring';
            document.body.appendChild(shockwave);
            
            setTimeout(() => shockwave.remove(), 800);
        }, i * 150);
    }
}

function createExplosionParticles() {
    const colors = ['#ff0080', '#ffaa00', '#00ffff', '#ff00ff', '#ffff00', '#ff3300'];
    const particleCount = 100;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'explosion-particle';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.top = '50%';
        particle.style.left = '50%';
        
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 200 + Math.random() * 400;
        const px = Math.cos(angle) * velocity;
        const py = Math.sin(angle) * velocity;
        
        particle.style.setProperty('--px', px + 'px');
        particle.style.setProperty('--py', py + 'px');
        
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 1500);
    }
}

function showBirthdayMessage(countdownEl) {
    countdownEl.innerHTML = `
        <span class="birthday-message" style="font-size: 0.5em; font-weight: 100; letter-spacing: 2px;">
            🎉 JOYEUX ANNIVERSAIRE Didi 🩵! 🎉
        </span>
    `;
}

function continuousConfetti() {
    const colors = ['#ff0080', '#ffaa00', '#00ffff', '#ff00ff', '#ffff00', '#00ff00'];
    
    setInterval(() => {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti-piece';
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.top = '-20px';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.animationDuration = (2 + Math.random() * 2) + 's';
                
                if (Math.random() > 0.5) {
                    confetti.style.borderRadius = '50%';
                }
                
                document.body.appendChild(confetti);
                
                setTimeout(() => confetti.remove(), 4000);
            }, i * 50);
        }
    }, 200);
}