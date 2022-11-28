let mix = require('laravel-mix');

mix.setPublicPath('./public');
mix.setResourceRoot('./../');

mix
    .sass('resources/styles/growtype-carousel.scss', 'styles');

mix
    .js('resources/scripts/growtype-carousel.js', 'scripts');

mix
    .copyDirectory('resources/plugins', 'public/plugins')
    .copyDirectory('resources/images', 'public/images');

mix
    .sourceMaps()
    .version();

mix.copy('node_modules/jquery/', 'public/vendor/jquery')
    .copy('node_modules/slick-carousel/', 'public/vendor/slick-carousel');
