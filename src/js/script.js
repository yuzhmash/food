document.addEventListener('DOMContentLoaded', () => {
    'uese strict';

    // Tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsParent = document.querySelector('.tabheader__items'),
          tabsContent = document.querySelectorAll('.tabcontent');


    const hideTabsContent = () => {
        tabs.forEach(elem => {
            elem.classList.remove('tabheader__item_active')
        });
        tabsContent.forEach(elem => {
            elem.classList.remove('show', 'fade');
            elem.classList.add('hide');
        })
    };

    const showTabsContent = (i = 0) => {
        tabs[i].classList.add('tabheader__item_active');
        tabsContent[i].classList.remove('hide')
        tabsContent[i].classList.add('show', 'fade');
    };


    hideTabsContent();
    showTabsContent();


    tabsParent.addEventListener('click', (e) => {
        const target = e.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((elem, i) => {
                if (target === elem) {
                    hideTabsContent();
                    showTabsContent(i);
                }
            })
        }
    })
    
    // Timer

    const deadLine = '2024-5-20';

    function getTimeRemaning(endtime) {
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date());

        if (t <= 0) {
            days = 0;
            hours = 0;
            minuteminutesns = 0;
            seconds = 0;
        } else {
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60) % 24)),
              minutes = Math.floor((t / 1000 / 60 ) % 60),
              seconds = Math.floor((t / 1000) % 60);
        }


        return {'total': t, days, hours, minutes, seconds};
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`
        } else {
            return num
        }
    }


    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaning(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }

    }

    setClock('.timer', deadLine)


    // Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal'),
          modalTriggerClose = document.querySelector('[data-close]');

    const openModel = () => {
        modal.classList.remove('hide');
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }    
    
    modalTrigger.forEach(elem => {elem.addEventListener('click', openModel)})

    const closeModal = () => {
        modal.classList.remove('show');
        modal.classList.add('hide');
        document.body.style.overflow = ''
    }

    modalTriggerClose.addEventListener('click', closeModal);
    modal.addEventListener('click', e => {if (e.target === modal)closeModal()});
    document.addEventListener('keydown', e => {if(e.code === "Escape" && modal.classList.contains('show'))closeModal()});

    // const modalTimerId = setTimeout(openModel, 10000);

    const showModalByScroll = () =>{
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
            openModel();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    // Menu

    const menuWrapper = document.querySelector('.menu__field .container');

    class Menu {
        constructor(img, title, descr, price) {
            this.img = img;
            this.title = title;
            this.descr = descr;
            this.price = price;
        }

        showContent() {
            console.log(this.title[0]);
            return menuWrapper.innerHTML += `
                <div class="menu__item">
                    <img src="img/tabs/${this.img}.jpg" alt="vegy">
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                </div>
            `
        }
    }

    new Menu('post', 'Меню “Премиум”', 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан и тупых вопросов официанту!', 550).showContent();
    new Menu('elite', 'Меню "Постное"', 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 430).showContent();
    new Menu('hamburger', 'Меню "Фитнес"', 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 229).showContent();

});



