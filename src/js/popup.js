//TODO *********************************************** Модальное окно***************************************************

const popupLinks = document.querySelectorAll('._popup-link'); //Этот класс присваивается тем элементам, с которых нужно переходить на модальное окно
const body = document.querySelector('body'); //Для блокировки скрола при высове модального окна
const lockPadding = document.querySelectorAll('._lock-padding')

let unlock = true;

const timeout = 800;

//Обязательно у section модального окна должен быть класс popup

if(popupLinks.length > 0){
	for(let index = 0; index < popupLinks.length; index++){
		const popupLink = popupLinks[index];
		popupLink.addEventListener('click', function (e){
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);
			e.preventDefault();
		})
	}
}

const popupCloseIcon = document.querySelectorAll('._close-popup'); //класс _close-popup присваивается тем элементам, при нажатии на которых нужно закрыть модальное окно
if(popupCloseIcon.length > 0) {
	for(let index = 0; index < popupCloseIcon.length; index++){
		const el = popupCloseIcon[index];
		el.addEventListener('click', function(e){
			popupClose(el.closest('.popup'));
			e.preventDefault();
		});
	}
}

function popupOpen(curentPopup){
	if(curentPopup && unlock){
		const popupActive = document.querySelector('.popup._open'); 
		if(popupActive) {
			popupClose(popupActive, false);
		} else{
			bodyLock();
		}
		curentPopup.classList.add('_open');
		curentPopup.addEventListener('click', function(e){
			if(!e.target.closest('.popup__content')){
				popupClose(e.target.closest('.popup'));
			}
		});
	}
}

function popupClose(popupActive, doUnlock = true){
	if(unlock){
		popupActive.classList.remove('_open');
		if(doUnlock){
			bodyUnLock();
		}
	}
}

function bodyLock(){
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

	if(lockPadding.length > 0){
		for(let index = 0; index < lockPadding.length; index++){
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	unlock = false;
	setTimeout(function(){
		unlock = true;
	}, timeout);
}

function bodyUnLock(){
	setTimeout(function(){
		if(lockPadding.length > 0){
			for(let index = 0; index < lockPadding.length; index++){
				const el = lockPadding[index];
				el.style.paddingRight = '0px';
			}
		}
		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(function(){
		unlock = true;
	}, timeout);
}

document.addEventListener('keydown', function(e){
	if(e.which === 27){
		const popupActive = document.querySelector('.popup._open');
		popupClose(popupActive);
	}
});

(function(){
	//проверяем поддержку
	if(!Element.prototype.closest){
		//реализуем
		Element.prototype.closest = function(css){
			var node = this;
			while(node){
				if(node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();

(function () {
	//проверяем поддержку
	if(!Element.prototype.matches) {
		//определяем свойство
		Element.prototype.matches = Element.prototype.matchesSelector ||
		Element.prototype.webkitMatchesSelector ||
		Element.prototype.mozMatchesSelector ||
		Element.prototype.msMatchesSelector;
	}
})();