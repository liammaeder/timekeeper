<script>
    //region imports
    import {onMount} from "svelte";
    import Swal from "sweetalert2";
    //endregion

    //region export variables
    export let confirm;
    export let cancel;
    export let icon = 'info';
    export let alertMessage;
    export let alertTitle;
    export let alertHasLink = false;
    //endregion

    onMount(() => {
        let confirmBtnColor;
        let cancelBtnColor;

        if (window.matchMedia) {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                import('@sweetalert2/theme-dark/dark.css');
                confirmBtnColor = "#374151";
                cancelBtnColor = "#ff2424"
            } else {
                import('sweetalert2/src/sweetalert2.scss');
                confirmBtnColor = "#cecece";
                cancelBtnColor = "#ff0000"
            }

            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change',({ matches }) => {matches ? import('@sweetalert2/theme-dark/dark.css') : import('sweetalert2/src/sweetalert2.scss');});
        }

        let parameters = {
            title: alertTitle,
            showDenyButton: true,
            confirmButtonText: "Cancel",
            denyButtonText: "Continue",
            confirmButtonColor: confirmBtnColor,
            cancelButtonColor: cancelBtnColor,
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

        Swal.fire(parameters).then((result) => {
            if (result.isConfirmed) {
                cancel();
            } else {
                confirm();
            }
        })
    })
</script>

