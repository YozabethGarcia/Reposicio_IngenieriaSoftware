$(document).ready(function() {
    $('.select_bottom').click(function() {
        $('.filefield').trigger('click');
    })
    $('.filefield').change(function() {
        if ($(this).val() != '') {
            $('.overlay_uploader').show();
            $('.spinner').show();
            readURL2(this);
        }
    })
})

function readURL2(input) {
    if (input.files[0].type == 'image/jpeg' || input.files[0].type == 'image/png') {
        $.each(jQuery(input)[0].files, function(i, file) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $('.overlay_uploader').hide();
                $('.spinner').hide();
                $('.box').css('background-image', 'url(' + e.target.result + ')');
            }
            reader.readAsDataURL(input.files[0]);
        });
    } else {
        $('.overlay_uploader').hide();
        $('.spinner').hide();
        alert("Solo se permiten archivos .jpg y .png");
    }
}