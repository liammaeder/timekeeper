<script>
    //region imports
    import { onMount } from "svelte";
    import Swal from 'sweetalert2';
    //endregion

    //region export variables
    export let icon = 'info';
    export let toastPosition = 'bottom-end';
    export let toastTitle;
    export let toastMessage;
    export let closeTimer = 2000;
    //endregion

    //region local variables
    //endregion

    onMount(() => {
        if (window.matchMedia) {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                import('./toast-dark.css');
            } else {
                import('./toast-light.css');
            }

            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change',({ matches }) => {matches ? import('./toast-dark.css') : import('./toast-light.css');});
        }

        const Toast = Swal.mixin({
            toast: true,
            position: toastPosition,
            showCloseButton: true,
            iconColor: 'white',
            customClass: {
                popup: 'colored-toast',
            },
            showConfirmButton: false,
            timer: closeTimer,
            timerProgressBar: true,
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
        });

        Toast.fire({
            icon: icon,
            title: toastTitle,
            html: toastMessage
        })
    })
</script>