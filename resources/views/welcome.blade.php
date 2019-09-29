<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>{{ env('APP_NAME') }}</title>
    </head>
    <body>
        Redirecting you to the website.....
        <script>
            setTimeout(() => {
                window.location.replace('{{ env("FRONTEND_URL") }}')
            }, 4000);
        </script>
    </body>
</html>
