document.addEventListener('DOMContentLoaded', () => {
    
    // OBSŁUGA FORMULARZA WYCENY
    const form = document.getElementById('valuationForm');
    const feedback = document.getElementById('formFeedback');

    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Powstrzymuje przeładowanie strony

        // Pobranie danych z pól
        const model = document.getElementById('deviceModel').value;
        const issue = document.getElementById('issueDescription').value;
        const phone = document.getElementById('phoneNumber').value;

        // Tutaj w przyszłości można dodać wysyłanie przez AJAX/Fetch do serwera
        console.log('Zgłoszenie:', { model, issue, phone });

        // Wyświetlenie sukcesu na stronie
        feedback.textContent = "Dziękujemy! Otrzymaliśmy zgłoszenie. Oddzwonimy w 15 minut!";
        feedback.classList.remove('hidden');
        feedback.classList.add('success');

        // Reset pól formularza
        form.reset();

        // Ukrycie komunikatu po 5 sekundach
        setTimeout(() => {
            feedback.classList.add('hidden');
            feedback.classList.remove('success');
        }, 5000);
    });

    // PROSTA ANIMACJA POJAWIANIA SIĘ ELEMENTÓW PRZY SKROLOWANIU (Intersection Observer)
    const cards = document.querySelectorAll('.feature-card, .service-box, .step, .review-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        // Ustawienie stanu początkowego w JS, aby strona działała poprawnie nawet bez JS
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
});
    // OBSŁUGA ROZWIJANIA FAQ
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const answer = question.nextElementSibling;

            // Zamknij inne otwarte pytania (opcjonalne, dla lepszego UX)
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = null;
                }
            });

            // Przełącz obecne pytanie
            item.classList.toggle('active');
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                answer.style.maxHeight = null;
            }
        });
    });
    

    // DYNAMICZNY KALKULATOR Z REALNYMI CENAMI (POPRAWIONA WERSJA)
const usterkiDane = {
    phone: [
        { nazwa: "Wymiana szybki ekranu (dotyk działa)", cena: "od 190 zł", czas: "1-2 godziny" },
        { nazwa: "Wymiana całego wyświetlacza (LCD/OLED)", cena: "od 290 zł", czas: "1-2 godziny" },
        { nazwa: "Nowa bateria (oryginał / zamiennik HQ)", cena: "od 130 zł", czas: "30-45 minut" },
        { nazwa: "Naprawa gniazda ładowania (USB-C/Lightning)", cena: "od 140 zł", czas: "1-2 godziny" },
        { nazwa: "Wymiana pękniętej szybki tył (Plecki)", cena: "od 180 zł", czas: "2-4 godziny" },
        { nazwa: "Ratowanie i czyszczenie po zalaniu", cena: "od 150 zł", czas: "1-2 dni" }
    ],
    laptop: [
        { nazwa: "Czyszczenie wnętrza + wymiana past (Thermal Grizzly)", cena: "150 zł", czas: "2-3 godziny" },
        { nazwa: "Wymiana rozbitej matrycy (ekranu)", cena: "od 250 zł + część", czas: "1 dzień" },
        { nazwa: "Montaż dysku SSD + klonowanie/system", cena: "180 zł", czas: "3-4 godziny" },
        { nazwa: "Wymiana baterii lub gniazda zasilania", cena: "od 140 zł", czas: "1-2 godziny" },
        { nazwa: "Naprawa płyty głównej (brak reakcji, zwarcia)", cena: "od 350 zł", czas: "3-5 dni" },
        { nazwa: "Wymiana klawiatury / uszkodzonych zawiasów", cena: "od 130 zł", czas: "1 dzień" }
    ],
    pc: [
        { nazwa: "Instalacja Windows 10/11 + sterowniki + optymalizacja", cena: "150 zł", czas: "3-4 godziny" },
        { nazwa: "Konserwacja, czyszczenie i wymiana past", cena: "120 zł", czas: "2 godziny" },
        { nazwa: "Odwirusowanie systemu i usunięcie reklam", cena: "130 zł", czas: "1 dzień" },
        { nazwa: "Odzyskiwanie utraconych danych (zdjęcia, dokumenty)", cena: "od 200 zł", czas: "2-4 dni" },
        { nazwa: "Modernizacja i przyspieszanie (dobór podzespołów)", cena: "100 zł", czas: "1 dzień" }
    ]
};

