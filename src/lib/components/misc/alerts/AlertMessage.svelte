<script>
    //region imports
    import {onMount} from "svelte";
    import Swal from 'sweetalert2';
    import 'animate.css';
    //endregion

    //region export variables
    export let icon = 'info';
    export let alertMessage;
    export let alertTitle;
    export let alertHasLink = false;
    export let autoClose = false;
    export let closeTimer = 2000;
    //endregion

    //region local variables
    //endregion

    onMount(() => {
        if (window.matchMedia) {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                import('@sweetalert2/theme-dark/dark.css');
            } else {
                import('sweetalert2/src/sweetalert2.scss');
            }

            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change',({ matches }) => {matches ? import('@sweetalert2/theme-dark/dark.css') : import('sweetalert2/src/sweetalert2.scss');});
        }

        let parameters = {
            title: alertTitle,
            text: alertMessage,
            icon: icon,
            showClass: {
                popup: `
              animate__animated
              animate__fadeIn
              animate__faster
            `
            },
            hideClass: {
                popup: `
              animate__animated
              animate__fadeOut
              animate__faster
            `
            }
        }

        alertHasLink ? parameters = {...parameters, html: alertMessage} : parameters = {...parameters, text: alertMessage};

        if (autoClose) parameters = {
            ...parameters,
            timer: closeTimer
        }

        Swal.fire(parameters)
    })

</script>