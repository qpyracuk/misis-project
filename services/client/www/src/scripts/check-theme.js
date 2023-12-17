window.matchMedia('(prefers-color-scheme: dark)')
.addEventListener('change', (event) => {
    console.log( 'Тема изменилась на : ' + ( event.matches ? "dark" : "light" ) );
});