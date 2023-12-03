const slides = document.querySelectorAll( ".slide" );
const dotsContainer = document.querySelector( ".dots" );
const nextSlide = document.querySelector( ".btn-next" );
const prevSlide = document.querySelector( ".btn-prev" );
const playPauseButton = document.querySelector( ".play-pause" );
let currentSlide = 0;
let maxSlide = slides.length - 1;
let interval;

slides.forEach( ( slide, index ) => {
	slide.style.transform = `translateX(${index * 100}%)`;
	createDot( index );
} );

nextSlide.addEventListener( "click", handleNextSlide );
prevSlide.addEventListener( "click", handlePrevSlide );
dotsContainer.addEventListener( "click", handleSkipToSlide );

function handleNextSlide() {

	if ( currentSlide === maxSlide ) {
		currentSlide = 0;
	} else {
		currentSlide++;
	}

	handleDotsChangeOfState( currentSlide );


	slides.forEach( ( slide, index ) => {
		slide.style.transform = `translateX(${100 * ( index - currentSlide )}%)`;
	} );
}

function handlePrevSlide() {

	if ( currentSlide === 0 ) {
		currentSlide = maxSlide;
	} else {
		currentSlide--;
	}

	handleDotsChangeOfState( currentSlide );

	slides.forEach( ( slide, index ) => {
		slide.style.transform = `translateX(${100 * ( index - currentSlide )}%)`;
	} );
}

function handleSkipToSlide( e ) {
	currentSlide = e.target.dataset.slide - 1;
	handleDotsChangeOfState( currentSlide );
	slides.forEach( ( slide, index ) => {
		slide.style.transform = `translateX(${100 * ( index - currentSlide )}%)`;
	} );
}

playPauseButton.addEventListener( "click", function ( e ) {
	e.target.ariaPressed = e.target.ariaPressed === "true" ? "false" : "true";
	e.target.ariaLabel = e.target.ariaLabel === "pause" ? "play" : "pause";
	e.target.innerHTML = e.target.ariaLabel === "pause" ? "&#x23f8;" : "&#x25b6;";

	if ( e.target.ariaLabel === "pause" ) {
		interval = setInterval( handleNextSlide, 4000 );
	} else {
		clearInterval( interval );
	}
} );

function createDot( index ) {
	const dot = document.createElement( "button" );
	dot.classList.add( "dot" );
	dot.setAttribute( "data-slide", index + 1 );
	dot.setAttribute( "aria-label", `slide ${index + 1}` );
	dot.setAttribute( "aria-pressed", ( index === 0 ) ? "true" : "false" );
	dot.setAttribute( "tabindex", "0" );
	dotsContainer.appendChild( dot );
}

function handleDotsChangeOfState( slideIndex ) {
	const dots = document.querySelectorAll( ".dot" );
	dots.forEach( ( dot ) => {
		dot.ariaPressed = "false";
	} );

	dots[slideIndex].ariaPressed = "true";
}
