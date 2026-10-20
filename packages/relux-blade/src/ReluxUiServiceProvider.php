<?php

namespace Kai\ReluxUi;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Blade;

class ReluxUiServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any package services.
     */
    public function boot(): void
    {
        $this->loadViewsFrom(__DIR__ . '/../resources/views', 'relux');

        // Publish components for overrides
        $this->publishes([
            __DIR__ . '/../resources/views' => resource_path('views/vendor/relux'),
        ], 'relux-views');

        // Publish static CSS & JS assets
        $this->publishes([
            __DIR__ . '/../../relux-css/tokens.css' => public_path('vendor/relux/tokens.css'),
            __DIR__ . '/../../relux-css/components.css' => public_path('vendor/relux/components.css'),
            __DIR__ . '/../../relux-css/relux.js' => public_path('vendor/relux/relux.js'),
        ], 'relux-assets');

        // Register blade directives if needed
        Blade::componentNamespace('Kai\\ReluxUi\\Components', 'relux');
    }
}
